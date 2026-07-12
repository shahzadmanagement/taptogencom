import { type FeatureFlag, FLAG_REGISTRY } from './feature-flags';

export interface FlagWarning {
  type: 'error' | 'warning';
  flagId: string;
  message: string;
}

export function validateFlag(flag: FeatureFlag): FlagWarning[] {
  const warnings: FlagWarning[] = [];

  // Rollout check
  if (flag.rolloutPercentage < 0 || flag.rolloutPercentage > 100) {
    warnings.push({
      type: 'error',
      flagId: flag.id,
      message: `Rollout percentage ${flag.rolloutPercentage} is outside [0, 100].`
    });
  }

  // Expired check
  if (flag.endDate) {
    const end = new Date(flag.endDate);
    if (end < new Date()) {
      warnings.push({
        type: 'warning',
        flagId: flag.id,
        message: `Feature flag expired on ${flag.endDate}.`
      });
    }
  }

  return warnings;
}

export function runGlobalFlagChecks(registry: Record<string, FeatureFlag> = FLAG_REGISTRY) {
  const warnings: FlagWarning[] = [];
  const activeIds = new Set<string>();

  Object.keys(registry).forEach(id => {
    const flag = registry[id];
    if (activeIds.has(flag.id)) {
      warnings.push({
        type: 'error',
        flagId: flag.id,
        message: `Duplicate feature identifier detected: "${flag.id}".`
      });
    }
    activeIds.add(flag.id);

    warnings.push(...validateFlag(flag));

    // Dependency exists checks
    if (flag.dependencies) {
      flag.dependencies.forEach(depId => {
        const dep = registry[depId];
        if (!dep) {
          warnings.push({
            type: 'error',
            flagId: flag.id,
            message: `Dependency error: depends on missing flag "${depId}".`
          });
        }
      });
    }
  });

  // Circular Dependency Check via DFS Graph cycle detection
  const visited = new Set<string>();
  const recStack = new Set<string>();

  function hasCycle(flagId: string): boolean {
    if (recStack.has(flagId)) return true;
    if (visited.has(flagId)) return false;

    visited.add(flagId);
    recStack.add(flagId);

    const flag = registry[flagId];
    if (flag && flag.dependencies) {
      for (const depId of flag.dependencies) {
        if (hasCycle(depId)) return true;
      }
    }

    recStack.delete(flagId);
    return false;
  }

  Object.keys(registry).forEach(id => {
    visited.clear();
    recStack.clear();
    if (hasCycle(id)) {
      warnings.push({
        type: 'error',
        flagId: id,
        message: 'Circular reference loop detected in flag dependencies path.'
      });
    }
  });

  return {
    isValid: !warnings.some(w => w.type === 'error'),
    warnings
  };
}
export function computeFlagMetrics(evalCount: number, enabledCount: number) {
  const rate = (enabledCount / (evalCount || 1)) * 100;
  return {
    rate: rate.toFixed(2) + '%',
    evalCount,
    enabledCount
  };
}
