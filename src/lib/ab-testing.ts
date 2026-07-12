import { trackExperimentExposure } from './analytics';

export type ExperimentStatus = 'draft' | 'active' | 'paused' | 'completed' | 'archived';

export interface Experiment {
  id: string;
  name: string;
  description: string;
  owner?: string;
  status: ExperimentStatus;
  variants: string[];
  weights?: number[]; // Fraction array (e.g. [0.5, 0.3, 0.2]), sums to 1.0
  trafficAllocation: number; // 0.0 to 1.0 (gradual rollout mode)
  targetTools?: string[];
  targetCategories?: string[];
  targetLanguages?: string[];
  targetLocales?: string[]; // e.g. ['mobile_only', 'desktop_only', 'tablet_only', 'new_only', 'returning_only']
  startDate: string;
  endDate: string;
  priority?: number; // Higher is processed first
  dependencies?: string[]; // prerequisite experiment IDs
  mutualExclusions?: string[]; // mutually exclusive experiment IDs
}

// 1. Production Experiment Registry
export const EXPERIMENT_REGISTRY: Record<string, Experiment> = {
  'hero_layout_experiment': {
    id: 'hero_layout_experiment',
    name: 'Hero Layout Experiment',
    description: 'Test hero copy variations (A: control, B: benefit_first, C: outcome_proof)',
    owner: 'growth-team',
    status: 'active',
    variants: ['control', 'benefit_first', 'outcome_proof'],
    weights: [0.5, 0.3, 0.2], // Weighted allocation
    trafficAllocation: 1.0,
    targetLocales: ['desktop_only'],
    startDate: '2026-07-12',
    endDate: '2026-08-12',
    priority: 10
  },
  'output_cards_experiment': {
    id: 'output_cards_experiment',
    name: 'Output Cards Experiment',
    description: 'Test output card UI variations (A: control, B: large_copy, C: always_visible)',
    owner: 'ux-team',
    status: 'active',
    variants: ['control', 'large_copy', 'always_visible'],
    weights: [0.34, 0.33, 0.33],
    trafficAllocation: 0.5, // 50% rollout mode
    startDate: '2026-07-12',
    endDate: '2026-08-12',
    priority: 5,
    mutualExclusions: ['cta_buttons_experiment'] // mutually exclusive
  },
  'related_tools_experiment': {
    id: 'related_tools_experiment',
    name: 'Related Tools Placement Experiment',
    description: 'Test related tool link layouts (A: control, B: below_output, C: sticky_sidebar)',
    owner: 'growth-team',
    status: 'active',
    variants: ['control', 'below_output', 'sticky_sidebar'],
    trafficAllocation: 1.0,
    startDate: '2026-07-12',
    endDate: '2026-08-12',
    priority: 3
  },
  'examples_experiment': {
    id: 'examples_experiment',
    name: 'Examples Display & Interaction Experiment',
    description: 'Test examples widget designs (A: control, B: expanded, C: interactive)',
    owner: 'product-team',
    status: 'active',
    variants: ['control', 'expanded', 'interactive'],
    trafficAllocation: 1.0,
    startDate: '2026-07-12',
    endDate: '2026-08-12',
    priority: 2
  },
  'cta_buttons_experiment': {
    id: 'cta_buttons_experiment',
    name: 'CTA Button Wording Experiment',
    description: 'Test primary button texts (control: Generate, create: Create, generate_now: Generate Now, create_instantly: Create Instantly)',
    owner: 'growth-team',
    status: 'active',
    variants: ['control', 'create', 'generate_now', 'create_instantly'],
    weights: [0.25, 0.25, 0.25, 0.25],
    trafficAllocation: 1.0,
    startDate: '2026-07-12',
    endDate: '2026-08-12',
    priority: 4,
    mutualExclusions: ['output_cards_experiment']
  }
};

const USER_ID_KEY = 'taptogen-uuid';
const ASSIGNMENTS_KEY = 'taptogen-ab-assignments';
const DISABLED_KEY = 'taptogen-ab-disabled';

// Unsigned 32-bit FNV-1a Hash helper
function hashString(str: string): number {
  let h = 2166136261 >>> 0;
  for (let i = 0; i < str.length; i++) {
    h = Math.imul(h ^ str.charCodeAt(i), 16777619);
  }
  return h >>> 0;
}

export function getUserId(): string {
  if (typeof window === 'undefined' || typeof localStorage === 'undefined') return 'server';
  let id = localStorage.getItem(USER_ID_KEY);
  if (!id) {
    id = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    localStorage.setItem(USER_ID_KEY, id);
    localStorage.setItem('taptogen-returning-visitor', 'false');
  } else {
    localStorage.setItem('taptogen-returning-visitor', 'true');
  }
  return id;
}

export function isFrameworkEnabled(): boolean {
  if (typeof window === 'undefined' || typeof localStorage === 'undefined') return false;
  return localStorage.getItem(DISABLED_KEY) !== 'true';
}

export function setFrameworkEnabled(enabled: boolean): void {
  if (typeof window === 'undefined' || typeof localStorage === 'undefined') return;
  localStorage.setItem(DISABLED_KEY, enabled ? 'false' : 'true');
}

// Emergency Kill Switch Resolver
export function isKillSwitchActive(experimentId: string, categorySlug?: string, toolSlug?: string): boolean {
  if (typeof window === 'undefined' || typeof localStorage === 'undefined') return false;
  if (localStorage.getItem('taptogen-ab-kill-global') === 'true') return true;
  if (categorySlug && localStorage.getItem(`taptogen-ab-kill-category-${categorySlug}`) === 'true') return true;
  if (toolSlug && localStorage.getItem(`taptogen-ab-kill-tool-${toolSlug}`) === 'true') return true;
  if (localStorage.getItem(`taptogen-ab-kill-experiment-${experimentId}`) === 'true') return true;
  return false;
}

export function getAssignmentsMap(): Record<string, string> {
  if (typeof window === 'undefined' || typeof localStorage === 'undefined') return {};
  try {
    return JSON.parse(localStorage.getItem(ASSIGNMENTS_KEY) || '{}');
  } catch {
    return {};
  }
}

export function saveAssignment(experimentId: string, variant: string): void {
  if (typeof window === 'undefined' || typeof localStorage === 'undefined') return;
  const assignments = getAssignmentsMap();
  assignments[experimentId] = variant;
  localStorage.setItem(ASSIGNMENTS_KEY, JSON.stringify(assignments));
}

export function forceVariant(experimentId: string, variant: string): void {
  saveAssignment(experimentId, variant);
}

// Targeting Rules Validation Helper
export function matchesTargeting(exp: Experiment, toolSlug?: string, categorySlug?: string, locale?: string): boolean {
  if (typeof window === 'undefined') return true;

  // 1. Tool targeting
  if (exp.targetTools && exp.targetTools.length > 0) {
    if (!toolSlug || !exp.targetTools.includes(toolSlug)) return false;
  }

  // 2. Category targeting
  if (exp.targetCategories && exp.targetCategories.length > 0) {
    if (!categorySlug || !exp.targetCategories.includes(categorySlug)) return false;
  }

  // 3. Language / locale targeting
  if (exp.targetLanguages && exp.targetLanguages.length > 0) {
    if (!locale || !exp.targetLanguages.includes(locale)) return false;
  }

  // 4. Device size qualifiers
  if (typeof window !== 'undefined') {
    const width = window.innerWidth;
    const isMobile = width < 768;
    const isTablet = width >= 768 && width < 1024;
    const isDesktop = width >= 1024;

    if (exp.targetLocales && exp.targetLocales.includes('mobile_only') && !isMobile) return false;
    if (exp.targetLocales && exp.targetLocales.includes('tablet_only') && !isTablet) return false;
    if (exp.targetLocales && exp.targetLocales.includes('desktop_only') && !isDesktop) return false;
  }

  // 5. Visitor cohort checks
  if (typeof localStorage !== 'undefined') {
    const isReturning = localStorage.getItem('taptogen-returning-visitor') === 'true';
    if (exp.targetLocales && exp.targetLocales.includes('new_only') && isReturning) return false;
    if (exp.targetLocales && exp.targetLocales.includes('returning_only') && !isReturning) return false;
  }

  return true;
}

// Main Variant Bucketer Engine
export function getVariant(experimentId: string, toolSlug?: string, categorySlug?: string, locale?: string): string {
  const exp = EXPERIMENT_REGISTRY[experimentId];
  if (!exp) return 'control';

  // 1. Overrides precedence (QA check via URL)
  if (typeof window !== 'undefined') {
    const urlParams = new URLSearchParams(window.location.search);
    const urlOverride = urlParams.get(`ab_${experimentId}`);
    if (urlOverride && exp.variants.includes(urlOverride)) {
      saveAssignment(experimentId, urlOverride);
      return urlOverride;
    }
  }

  // 2. Global framework kill switch
  if (!isFrameworkEnabled()) return 'control';

  // 3. Emergency Kill Switch checks (Global, Cat, Tool, or Exp Level)
  if (isKillSwitchActive(experimentId, categorySlug, toolSlug)) {
    return 'control';
  }

  // 4. Experiment state checks
  if (exp.status === 'paused' || exp.status === 'archived' || exp.status === 'draft') {
    return 'control';
  }

  // 5. Check dependencies
  if (exp.dependencies) {
    const hasUnmet = exp.dependencies.some(depId => getVariant(depId, toolSlug, categorySlug, locale) === 'control');
    if (hasUnmet) return 'control';
  }

  // 6. Check targeting rules
  if (!matchesTargeting(exp, toolSlug, categorySlug, locale)) {
    return 'control';
  }

  // 7. Retain persisted assignment if present
  const persisted = getAssignmentsMap()[experimentId];
  if (persisted && exp.variants.includes(persisted)) {
    return persisted;
  }

  // 8. Deterministic bucketing assignment
  const userId = getUserId();
  const seedString = `${userId}:${experimentId}`;
  const hash = hashString(seedString);

  // Check gradual traffic allocation threshold
  const bucket = (hash % 100) / 100;
  if (bucket >= exp.trafficAllocation) {
    saveAssignment(experimentId, 'control');
    return 'control';
  }

  // Check weighted allocation ranges
  let assignedVariant = exp.variants[0];
  if (exp.weights && exp.weights.length === exp.variants.length) {
    const scale = hash % 10000;
    let accumulated = 0;
    for (let i = 0; i < exp.weights.length; i++) {
      accumulated += exp.weights[i] * 10000;
      if (scale < accumulated) {
        assignedVariant = exp.variants[i];
        break;
      }
    }
  } else {
    const index = hash % exp.variants.length;
    assignedVariant = exp.variants[index];
  }

  saveAssignment(experimentId, assignedVariant);
  return assignedVariant;
}

export function triggerExposure(experimentId: string, toolSlug?: string, categorySlug?: string, locale?: string): string {
  const variant = getVariant(experimentId, toolSlug, categorySlug, locale);
  trackExperimentExposure(experimentId, variant, toolSlug);
  
  if (typeof window !== 'undefined' && (window as any).__ab_debug_log) {
    console.log(`[A/B Exposure]: ID: "${experimentId}" Assigned Variant: "${variant}"`);
  }
  return variant;
}

// Development Dashboard Panel Inspector Injection
export function injectDebugPanel(): void {
  if (typeof window === 'undefined' || typeof document === 'undefined') return;
  if (document.getElementById('ab-testing-debug-panel')) return;

  const panel = document.createElement('div');
  panel.id = 'ab-testing-debug-panel';
  panel.style.cssText = `
    position: fixed;
    bottom: 12px;
    right: 12px;
    z-index: 10000;
    background: #0f172a;
    color: #f8fafc;
    padding: 16px;
    border-radius: 12px;
    box-shadow: 0 10px 15px -3px rgba(0,0,0,0.3), 0 4px 6px -4px rgba(0,0,0,0.3);
    font-family: system-ui, -apple-system, sans-serif;
    font-size: 11px;
    width: 360px;
    max-height: 480px;
    overflow-y: auto;
    border: 1px solid #334155;
  `;

  let html = `
    <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #334155; padding-bottom: 8px; margin-bottom: 10px;">
      <h4 style="margin: 0; color: #38bdf8; font-size: 12px; font-weight: bold;">🔬 Enterprise Experiment Manager</h4>
      <span style="font-size: 9px; padding: 2px 6px; background: #1e293b; border-radius: 4px; color: #94a3b8;">v2.0.0</span>
    </div>
    <div style="display: flex; gap: 4px; margin-bottom: 10px;">
      <button onclick="window.__ab_set_tab('experiments')" id="tab-btn-experiments" style="flex: 1; padding: 4px; background: #38bdf8; border: none; border-radius: 4px; color: #000; cursor: pointer; font-size: 10px; font-weight: 600;">Tests</button>
      <button onclick="window.__ab_set_tab('killswitches')" id="tab-btn-killswitches" style="flex: 1; padding: 4px; background: #1e293b; border: none; border-radius: 4px; color: #fff; cursor: pointer; font-size: 10px; font-weight: 600;">Kills</button>
      <button onclick="window.__ab_set_tab('health')" id="tab-btn-health" style="flex: 1; padding: 4px; background: #1e293b; border: none; border-radius: 4px; color: #fff; cursor: pointer; font-size: 10px; font-weight: 600;">Health</button>
    </div>
    
    <div id="debug-tab-content-experiments">
  `;
  
  Object.keys(EXPERIMENT_REGISTRY).forEach(id => {
    const exp = EXPERIMENT_REGISTRY[id];
    const current = getVariant(id);
    html += `
      <div style="margin-bottom: 8px; background: #1e293b; padding: 8px; border-radius: 6px; border: 1px solid #334155;">
        <div style="display: flex; justify-content: space-between; font-weight: bold; margin-bottom: 4px;">
          <span>${exp.name}</span>
          <span style="color: #94a3b8; font-size: 9px;">${exp.status}</span>
        </div>
        <p style="margin: 0 0 6px 0; color: #cbd5e1; font-size: 10px;">${exp.description}</p>
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <span>Active: <span style="color: #4ade80; font-weight: 600;">${current}</span></span>
          <select onchange="window.__ab_force('${id}', this.value)" style="background: #0f172a; color: #fff; border: 1px solid #475569; font-size: 10px; padding: 2px 4px; border-radius: 4px;">
            ${exp.variants.map(v => `<option value="${v}" ${v === current ? 'selected' : ''}>${v}</option>`).join('')}
          </select>
        </div>
      </div>
    `;
  });

  html += `
    </div>
    
    <div id="debug-tab-content-killswitches" style="display: none;">
      <div style="margin-bottom: 8px; background: #1e293b; padding: 8px; border-radius: 6px; border: 1px solid #334155;">
        <strong>Global Kill Switch</strong><br/>
        <button onclick="window.__ab_toggle_kill('global')" style="width: 100%; margin-top: 4px; background: ${localStorage.getItem('taptogen-ab-kill-global') === 'true' ? '#ef4444' : '#10b981'}; color: #fff; border: none; padding: 4px; border-radius: 4px; cursor: pointer;">
          ${localStorage.getItem('taptogen-ab-kill-global') === 'true' ? 'ACTIVE - CLICK TO RESTORE' : 'DISABLE EXPERIMENTATION'}
        </button>
      </div>
      <div style="margin-bottom: 8px; background: #1e293b; padding: 8px; border-radius: 6px; border: 1px solid #334155;">
        <strong>Category Kills (Font Style)</strong><br/>
        <button onclick="window.__ab_toggle_kill('category-text-font-generators')" style="width: 100%; margin-top: 4px; background: ${localStorage.getItem('taptogen-ab-kill-category-text-font-generators') === 'true' ? '#ef4444' : '#475569'}; color: #fff; border: none; padding: 4px; border-radius: 4px; cursor: pointer;">
          ${localStorage.getItem('taptogen-ab-kill-category-text-font-generators') === 'true' ? 'MUTED' : 'MUTE CATEGORY'}
        </button>
      </div>
    </div>

    <div id="debug-tab-content-health" style="display: none; font-size: 10px;">
      <div id="health-warnings-list" style="background: #1e293b; padding: 8px; border-radius: 6px; border: 1px solid #334155;">
        <span style="color: #4ade80;">✓ All configurations valid. Zero diagnostics alerts.</span>
      </div>
    </div>

    <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 12px; border-top: 1px solid #334155; padding-top: 8px;">
      <button onclick="window.__ab_toggle_framework()" style="background: #ef4444; color: #fff; border: none; padding: 4px 8px; border-radius: 4px; cursor: pointer; font-weight: 600;">Disable AB Framework</button>
      <button onclick="this.parentElement.parentElement.remove()" style="background: #475569; color: #fff; border: none; padding: 4px 8px; border-radius: 4px; cursor: pointer;">Minimize</button>
    </div>
  `;

  panel.innerHTML = html;
  document.body.appendChild(panel);

  // Attach global handlers
  (window as any).__ab_force = (id: string, variant: string) => {
    forceVariant(id, variant);
    window.location.reload();
  };

  (window as any).__ab_toggle_kill = (type: string) => {
    const key = `taptogen-ab-kill-${type}`;
    const active = localStorage.getItem(key) === 'true';
    localStorage.setItem(key, active ? 'false' : 'true');
    window.location.reload();
  };

  (window as any).__ab_set_tab = (tabName: string) => {
    ['experiments', 'killswitches', 'health'].forEach(t => {
      const el = document.getElementById(`debug-tab-content-${t}`);
      const btn = document.getElementById(`tab-btn-${t}`);
      if (el) el.style.display = t === tabName ? 'block' : 'none';
      if (btn) btn.style.background = t === tabName ? '#38bdf8' : '#1e293b';
      if (btn) btn.style.color = t === tabName ? '#000' : '#fff';
    });
  };

  (window as any).__ab_toggle_framework = () => {
    const enabled = isFrameworkEnabled();
    setFrameworkEnabled(!enabled);
    window.location.reload();
  };

  // Run dynamic validator inside debug pane
  import('./ab-validator').then(({ runGlobalHealthChecks }) => {
    const res = runGlobalHealthChecks();
    const list = document.getElementById('health-warnings-list');
    if (list) {
      if (res.warnings.length > 0) {
        list.innerHTML = res.warnings.map(w => `
          <div style="margin-bottom: 4px; color: ${w.type === 'error' ? '#f87171' : '#fbbf24'};">
            <strong>[${w.type.toUpperCase()}] ${w.experimentId}</strong>: ${w.message}
          </div>
        `).join('');
      } else {
        list.innerHTML = '<span style="color: #4ade80;">✓ All configurations valid. Zero diagnostics alerts.</span>';
      }
    }
  });
}
