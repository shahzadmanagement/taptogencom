import { trackExperimentExposure } from './analytics';

export type ExperimentStatus = 'draft' | 'active' | 'paused' | 'archived';

export interface Experiment {
  id: string;
  name: string;
  description: string;
  status: ExperimentStatus;
  variants: string[];
  trafficAllocation: number; // 0.0 to 1.0
  startDate: string;
  endDate: string;
}

// 1. Experiment Registry
export const EXPERIMENT_REGISTRY: Record<string, Experiment> = {
  'hero_layout_experiment': {
    id: 'hero_layout_experiment',
    name: 'Hero Layout Experiment',
    description: 'Test hero copy variations (A: control, B: benefit_first, C: outcome_proof)',
    status: 'active',
    variants: ['control', 'benefit_first', 'outcome_proof'],
    trafficAllocation: 1.0,
    startDate: '2026-07-12',
    endDate: '2026-08-12'
  },
  'output_cards_experiment': {
    id: 'output_cards_experiment',
    name: 'Output Cards Experiment',
    description: 'Test output card UI variations (A: control, B: large_copy, C: always_visible)',
    status: 'active',
    variants: ['control', 'large_copy', 'always_visible'],
    trafficAllocation: 1.0,
    startDate: '2026-07-12',
    endDate: '2026-08-12'
  },
  'related_tools_experiment': {
    id: 'related_tools_experiment',
    name: 'Related Tools Placement Experiment',
    description: 'Test related tool link layouts (A: control, B: below_output, C: sticky_sidebar)',
    status: 'active',
    variants: ['control', 'below_output', 'sticky_sidebar'],
    trafficAllocation: 1.0,
    startDate: '2026-07-12',
    endDate: '2026-08-12'
  },
  'examples_experiment': {
    id: 'examples_experiment',
    name: 'Examples Display & Interaction Experiment',
    description: 'Test examples widget designs (A: control, B: expanded, C: interactive)',
    status: 'active',
    variants: ['control', 'expanded', 'interactive'],
    trafficAllocation: 1.0,
    startDate: '2026-07-12',
    endDate: '2026-08-12'
  },
  'cta_buttons_experiment': {
    id: 'cta_buttons_experiment',
    name: 'CTA Button Wording Experiment',
    description: 'Test primary button texts (control: Generate, create: Create, generate_now: Generate Now, create_instantly: Create Instantly)',
    status: 'active',
    variants: ['control', 'create', 'generate_now', 'create_instantly'],
    trafficAllocation: 1.0,
    startDate: '2026-07-12',
    endDate: '2026-08-12'
  }
};

const USER_ID_KEY = 'taptogen-uuid';
const ASSIGNMENTS_KEY = 'taptogen-ab-assignments';
const DISABLED_KEY = 'taptogen-ab-disabled';

// Helper to generate a stable mock UUID
function generateUUID(): string {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

// Stable deterministic string hash (FNV-1a)
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
    id = generateUUID();
    localStorage.setItem(USER_ID_KEY, id);
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

// Main variant resolver
export function getVariant(experimentId: string): string {
  const exp = EXPERIMENT_REGISTRY[experimentId];
  if (!exp) return 'control';

  // 1. Check QA URL overrides (e.g. ?ab_cta_button_text_experiment=create_now)
  if (typeof window !== 'undefined') {
    const urlParams = new URLSearchParams(window.location.search);
    const urlOverride = urlParams.get(`ab_${experimentId}`);
    if (urlOverride && exp.variants.includes(urlOverride)) {
      saveAssignment(experimentId, urlOverride);
      return urlOverride;
    }
  }

  // 2. Check global enable state
  if (!isFrameworkEnabled()) return 'control';

  // 3. Status checks
  if (exp.status === 'paused' || exp.status === 'archived' || exp.status === 'draft') {
    return 'control';
  }

  // 4. Return persisted assignment if it exists
  const persisted = getAssignmentsMap()[experimentId];
  if (persisted && exp.variants.includes(persisted)) {
    return persisted;
  }

  // 5. Deterministic variant allocation
  const userId = getUserId();
  const seedString = `${userId}:${experimentId}`;
  const hash = hashString(seedString);

  // Check traffic allocation
  const bucket = (hash % 100) / 100;
  if (bucket >= exp.trafficAllocation) {
    saveAssignment(experimentId, 'control');
    return 'control';
  }

  // Assign variant
  const index = hash % exp.variants.length;
  const assignedVariant = exp.variants[index];
  saveAssignment(experimentId, assignedVariant);

  return assignedVariant;
}

// Track exposure
export function triggerExposure(experimentId: string, toolSlug?: string): string {
  const variant = getVariant(experimentId);
  trackExperimentExposure(experimentId, variant, toolSlug);
  
  if (typeof window !== 'undefined' && (window as any).__ab_debug_log) {
    console.log(`[A/B Exposure]: Experiment: "${experimentId}" Assigned Variant: "${variant}"`);
  }
  return variant;
}

// Development debug helper panel injection
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
    background: #1e293b;
    color: #f8fafc;
    padding: 16px;
    border-radius: 8px;
    box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06);
    font-family: monospace;
    font-size: 11px;
    max-width: 320px;
    border: 1px solid #334155;
  `;

  let html = `<h4 style="margin: 0 0 8px 0; color: #38bdf8;">🔬 A/B Test Sandbox Debug</h4>`;
  
  Object.keys(EXPERIMENT_REGISTRY).forEach(id => {
    const exp = EXPERIMENT_REGISTRY[id];
    const current = getVariant(id);
    html += `
      <div style="margin-bottom: 8px; border-bottom: 1px solid #334155; padding-bottom: 6px;">
        <strong>${exp.name}</strong> (${exp.status})<br/>
        Active: <span style="color: #4ade80;">${current}</span><br/>
        Force: 
        <select onchange="window.__ab_force('${id}', this.value)" style="background: #0f172a; color: #fff; border: 1px solid #475569; font-size: 10px; border-radius: 2px;">
          ${exp.variants.map(v => `<option value="${v}" ${v === current ? 'selected' : ''}>${v}</option>`).join('')}
        </select>
      </div>
    `;
  });

  html += `
    <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 8px;">
      <button onclick="window.__ab_toggle_framework()" style="background: #ef4444; color: #fff; border: none; padding: 4px 8px; border-radius: 4px; cursor: pointer;">Toggle Framework</button>
      <button onclick="this.parentElement.parentElement.remove()" style="background: #475569; color: #fff; border: none; padding: 4px 8px; border-radius: 4px; cursor: pointer;">Close</button>
    </div>
  `;

  panel.innerHTML = html;
  document.body.appendChild(panel);

  // Attach global handlers
  (window as any).__ab_force = (id: string, variant: string) => {
    forceVariant(id, variant);
    window.location.reload();
  };

  (window as any).__ab_toggle_framework = () => {
    const enabled = isFrameworkEnabled();
    setFrameworkEnabled(!enabled);
    alert(`A/B Testing Framework is now ${!enabled ? 'ENABLED' : 'DISABLED'}. Reloading page...`);
    window.location.reload();
  };
}
