import { type Experiment, EXPERIMENT_REGISTRY } from './ab-testing';

export interface HealthCheckWarning {
  type: 'error' | 'warning';
  experimentId: string;
  message: string;
}

export interface ValidationResult {
  isValid: boolean;
  warnings: HealthCheckWarning[];
}

export function validateExperiment(exp: Experiment): HealthCheckWarning[] {
  const warnings: HealthCheckWarning[] = [];

  // 1. Variant names validator
  if (!exp.variants || exp.variants.length === 0) {
    warnings.push({
      type: 'error',
      experimentId: exp.id,
      message: 'Variants list is empty or missing.'
    });
  } else {
    exp.variants.forEach(v => {
      if (!/^[a-z0-9_]+$/.test(v)) {
        warnings.push({
          type: 'warning',
          experimentId: exp.id,
          message: `Variant name "${v}" should be snake_case (lowercase, alphanumeric, underscores).`
        });
      }
    });
  }

  // 2. Traffic allocation validator
  if (exp.trafficAllocation < 0 || exp.trafficAllocation > 1.0) {
    warnings.push({
      type: 'error',
      experimentId: exp.id,
      message: `Traffic allocation ${exp.trafficAllocation} is outside allowed range of [0.0, 1.0].`
    });
  }

  // 3. Expiry date check
  if (exp.endDate) {
    const end = new Date(exp.endDate);
    if (end < new Date()) {
      warnings.push({
        type: 'warning',
        experimentId: exp.id,
        message: `Experiment has expired on ${exp.endDate}.`
      });
    }
  }

  // 4. Weights verification
  if (exp.weights) {
    if (exp.weights.length !== exp.variants.length) {
      warnings.push({
        type: 'error',
        experimentId: exp.id,
        message: `Weights array length (${exp.weights.length}) must match variants array length (${exp.variants.length}).`
      });
    }
    const sum = exp.weights.reduce((a, b) => a + b, 0);
    if (Math.abs(sum - 1.0) > 0.001) {
      warnings.push({
        type: 'error',
        experimentId: exp.id,
        message: `Sum of variant weights must equal 1.0 (currently ${sum}).`
      });
    }
  }

  return warnings;
}

export function runGlobalHealthChecks(registry: Record<string, Experiment> = EXPERIMENT_REGISTRY): ValidationResult {
  const warnings: HealthCheckWarning[] = [];
  const activeIds = new Set<string>();

  Object.keys(registry).forEach(id => {
    const exp = registry[id];
    
    // Duplicate ID check
    if (activeIds.has(exp.id)) {
      warnings.push({
        type: 'error',
        experimentId: exp.id,
        message: `Duplicate experiment identifier detected: "${exp.id}".`
      });
    }
    activeIds.add(exp.id);

    // Validate single experiment rules
    warnings.push(...validateExperiment(exp));

    // Conflict & Mutual Exclusion checks
    Object.keys(registry).forEach(otherId => {
      if (otherId === id) return;
      const other = registry[otherId];

      // Check overlap targets
      const overlapTools = exp.targetTools?.some(t => other.targetTools?.includes(t)) || false;
      const overlapCats = exp.targetCategories?.some(c => other.targetCategories?.includes(c)) || false;

      if (exp.status === 'active' && other.status === 'active' && (overlapTools || overlapCats)) {
        // If they overlap, check if mutual exclusion is declared
        const isExcluded = exp.mutualExclusions?.includes(other.id) || other.mutualExclusions?.includes(exp.id);
        if (!isExcluded) {
          warnings.push({
            type: 'warning',
            experimentId: exp.id,
            message: `Conflict hazard: overlaps targeting with active experiment "${other.id}" but mutual exclusion is not configured.`
          });
        }
      }
    });

    // Check dependency chain validation
    if (exp.dependencies) {
      exp.dependencies.forEach(depId => {
        const dep = registry[depId];
        if (!dep) {
          warnings.push({
            type: 'error',
            experimentId: exp.id,
            message: `Dependency error: depends on missing experiment "${depId}".`
          });
        } else if (dep.status === 'archived' || dep.status === 'paused') {
          warnings.push({
            type: 'warning',
            experimentId: exp.id,
            message: `Dependency warning: prerequisites experiment "${depId}" is not active (status: ${dep.status}).`
          });
        }
      });
    }
  });

  return {
    isValid: !warnings.some(w => w.type === 'error'),
    warnings
  };
}

// Compute mock performance and significance metrics for visual reports
export function computeSignificance(exposure: number, conversion: number, baselineExposure: number, baselineConversion: number) {
  const rate = conversion / (exposure || 1);
  const baseRate = baselineConversion / (baselineExposure || 1);
  const lift = ((rate - baseRate) / (baseRate || 1)) * 100;
  
  // Z-Score approximation for significance
  const p = (conversion + baselineConversion) / (exposure + baselineExposure || 1);
  const se = Math.sqrt(p * (1 - p) * (1 / (exposure || 1) + 1 / (baselineExposure || 1)));
  const z = (rate - baseRate) / (se || 1);
  
  // Simple confidence map approximation
  const confidence = Math.min(100, Math.max(0, Math.round((1 - Math.exp(-Math.abs(z))) * 100)));
  
  return {
    rate: (rate * 100).toFixed(2) + '%',
    lift: (lift >= 0 ? '+' : '') + lift.toFixed(2) + '%',
    confidence: confidence.toFixed(0) + '%',
    significant: Math.abs(z) > 1.96
  };
}
