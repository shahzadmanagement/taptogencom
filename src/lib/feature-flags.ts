import { trackExperimentExposure } from './analytics';

export type FlagStatus = 'draft' | 'active' | 'paused' | 'deprecated' | 'archived';
export type FlagType = 'boolean' | 'string' | 'number';

export interface FeatureFlag {
  id: string;
  name: string;
  description: string;
  owner: string;
  status: FlagStatus;
  type: FlagType;
  defaultValue: any;
  rolloutPercentage: number; // 0 to 100
  dependencies?: string[];
  mutualExclusions?: string[];
  startDate?: string;
  endDate?: string;
  targetTools?: string[];
  targetCategories?: string[];
  targetLocales?: string[]; // e.g. ['mobile_only', 'desktop_only', 'tablet_only']
  targetDevices?: string[]; // e.g. ['hi', 'pt'] languages
}

// 1. Flag Registry
export const FLAG_REGISTRY: Record<string, FeatureFlag> = {
  'enable_new_workspace_design': {
    id: 'enable_new_workspace_design',
    name: 'New Workspace Design',
    description: 'Activates the modern spacious workspace layout with layout-shift mitigation',
    owner: 'growth-team',
    status: 'active',
    type: 'boolean',
    defaultValue: false,
    rolloutPercentage: 10, // 10% progressive rollout
    targetCategories: ['text-font-generators'],
    startDate: '2026-07-12',
    endDate: '2026-08-12'
  },
  'enable_quick_action_cards': {
    id: 'enable_quick_action_cards',
    name: 'Quick Action Cards',
    description: 'Enables quick copy and favorite buttons inside outputs',
    owner: 'ux-team',
    status: 'active',
    type: 'boolean',
    defaultValue: true,
    rolloutPercentage: 100, // 100% rolled out
    dependencies: ['enable_new_workspace_design'], // depends on workspace design
    startDate: '2026-07-12',
    endDate: '2026-08-12'
  },
  'enable_experimental_features': {
    id: 'enable_experimental_features',
    name: 'Experimental Features',
    description: 'Beta workspace components (Developer tools and early integrations)',
    owner: 'growth-team',
    status: 'draft',
    type: 'boolean',
    defaultValue: false,
    rolloutPercentage: 0,
    startDate: '2026-07-12',
    endDate: '2026-08-12'
  }
};

const OVERRIDE_PREFIX = 'taptogen-flag-override-';

// Unsigned 32-bit FNV-1a Hash helper
function hashString(str: string): number {
  let h = 2166136261 >>> 0;
  for (let i = 0; i < str.length; i++) {
    h = Math.imul(h ^ str.charCodeAt(i), 16777619);
  }
  return h >>> 0;
}

export function saveFlagOverride(flagId: string, val: boolean | null): void {
  if (typeof window === 'undefined' || typeof localStorage === 'undefined') return;
  if (val === null) {
    localStorage.removeItem(OVERRIDE_PREFIX + flagId);
  } else {
    localStorage.setItem(OVERRIDE_PREFIX + flagId, val ? 'true' : 'false');
  }
}

// Deterministic flag evaluator
export function isFeatureEnabled(flagId: string, toolSlug?: string, categorySlug?: string, locale?: string): boolean {
  const flag = FLAG_REGISTRY[flagId];
  if (!flag) return false;

  // 1. URL overrides precedence (e.g. ?flag_enable_new_workspace_design=true)
  if (typeof window !== 'undefined') {
    const urlParams = new URLSearchParams(window.location.search);
    const urlOverride = urlParams.get(`flag_${flagId}`);
    if (urlOverride !== null) {
      const val = urlOverride === 'true';
      saveFlagOverride(flagId, val);
      trackFlagEvent('feature_override', flagId, toolSlug, locale);
      return val;
    }
  }

  // 2. LocalStorage override checks
  if (typeof localStorage !== 'undefined') {
    const override = localStorage.getItem(OVERRIDE_PREFIX + flagId);
    if (override !== null) {
      return override === 'true';
    }
  }

  // 3. Status checks
  if (flag.status === 'paused' || flag.status === 'archived' || flag.status === 'deprecated') {
    trackFlagEvent('feature_disabled', flagId, toolSlug, locale);
    return false;
  }

  // 4. Expiry validation
  if (flag.endDate) {
    if (new Date(flag.endDate) < new Date()) {
      trackFlagEvent('feature_disabled', flagId, toolSlug, locale);
      return false;
    }
  }

  // 5. Dependency checks
  if (flag.dependencies && flag.dependencies.length > 0) {
    const hasUnmet = flag.dependencies.some(depId => !isFeatureEnabled(depId, toolSlug, categorySlug, locale));
    if (hasUnmet) {
      trackFlagEvent('feature_disabled', flagId, toolSlug, locale);
      return false;
    }
  }

  // 6. Targeting checks
  if (flag.targetTools && flag.targetTools.length > 0) {
    if (!toolSlug || !flag.targetTools.includes(toolSlug)) return false;
  }
  if (flag.targetCategories && flag.targetCategories.length > 0) {
    if (!categorySlug || !flag.targetCategories.includes(categorySlug)) return false;
  }
  if (flag.targetDevices && flag.targetDevices.length > 0) { // targetDevices maps to languages
    if (!locale || !flag.targetDevices.includes(locale)) return false;
  }
  if (typeof window !== 'undefined' && flag.targetLocales) {
    const width = window.innerWidth;
    const isMobile = width < 768;
    const isTablet = width >= 768 && width < 1024;
    const isDesktop = width >= 1024;

    if (flag.targetLocales.includes('mobile_only') && !isMobile) return false;
    if (flag.targetLocales.includes('tablet_only') && !isTablet) return false;
    if (flag.targetLocales.includes('desktop_only') && !isDesktop) return false;
  }

  // 7. Deterministic percentage rollout
  let uuid = 'server';
  if (typeof localStorage !== 'undefined') {
    uuid = localStorage.getItem('taptogen-uuid') || 'anonymous';
  }
  const hash = hashString(`${uuid}:${flagId}`);
  const bucket = hash % 100;
  if (bucket >= flag.rolloutPercentage) {
    trackFlagEvent('feature_disabled', flagId, toolSlug, locale);
    return false;
  }

  trackFlagEvent('feature_enabled', flagId, toolSlug, locale);
  return true;
}

function trackFlagEvent(name: string, flagId: string, toolSlug?: string, locale?: string) {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') return;
  
  const width = window.innerWidth;
  const device = width < 768 ? 'mobile' : width < 1024 ? 'tablet' : 'desktop';
  const session = localStorage.getItem('taptogen-uuid') || 'anonymous';

  window.gtag('event', name, {
    feature_id: flagId,
    tool_slug: toolSlug || 'global',
    locale: locale || 'en',
    device,
    session_id: session,
    timestamp: new Date().toISOString()
  });
}

// Extends debugger panel dynamically at runtime
export function injectFlagsTab(): void {
  if (typeof window === 'undefined' || typeof document === 'undefined') return;
  const panel = document.getElementById('ab-testing-debug-panel');
  if (!panel) return;
  if (document.getElementById('tab-btn-flags')) return;

  // 1. Inject Tab Button
  const tabRow = panel.querySelector('div[style*="display: flex; gap: 4px;"]');
  if (tabRow) {
    const btn = document.createElement('button');
    btn.id = 'tab-btn-flags';
    btn.type = 'button';
    btn.style.cssText = 'flex: 1; padding: 4px; background: #1e293b; border: none; border-radius: 4px; color: #fff; cursor: pointer; font-size: 10px; font-weight: 600;';
    btn.textContent = 'Flags';
    btn.onclick = () => (window as any).__ab_set_tab('flags');
    tabRow.appendChild(btn);
  }

  // 2. Inject Content Pane
  const lastPane = document.getElementById('debug-tab-content-health');
  if (lastPane) {
    const pane = document.createElement('div');
    pane.id = 'debug-tab-content-flags';
    pane.style.display = 'none';

    let html = `
      <div style="margin-bottom: 8px; font-weight: bold; color: #38bdf8;">🚩 Progressive Feature Flags</div>
      <input type="text" id="flag-search-box" placeholder="Search flags..." style="width: 100%; box-sizing: border-box; padding: 4px 8px; margin-bottom: 8px; border-radius: 4px; border: 1px solid #334155; background: #0f172a; color: #fff; font-size: 10px; outline: none;" />
      <div id="flags-list-container" style="display: flex; flex-direction: column; gap: 6px;"></div>
    `;
    pane.innerHTML = html;
    lastPane.parentNode?.insertBefore(pane, lastPane.nextSibling);

    const searchBox = document.getElementById('flag-search-box') as HTMLInputElement;
    searchBox?.addEventListener('input', () => {
      renderFlagsList(searchBox.value);
    });

    renderFlagsList();
  }
}

function renderFlagsList(filterStr = '') {
  const container = document.getElementById('flags-list-container');
  if (!container) return;

  const search = filterStr.toLowerCase();
  let html = '';

  Object.keys(FLAG_REGISTRY).forEach(id => {
    const flag = FLAG_REGISTRY[id];
    if (search && !flag.name.toLowerCase().includes(search) && !flag.id.toLowerCase().includes(search)) return;

    const enabled = isFeatureEnabled(id);
    const hasOverride = localStorage.getItem(OVERRIDE_PREFIX + id) !== null;

    html += `
      <div style="background: #1e293b; padding: 8px; border-radius: 6px; border: 1px solid #334155;">
        <div style="display: flex; justify-content: space-between; font-weight: bold; margin-bottom: 4px;">
          <span>${flag.name}</span>
          <span style="color: ${enabled ? '#4ade80' : '#f87171'}; font-size: 9px;">${enabled ? 'ON' : 'OFF'}</span>
        </div>
        <p style="margin: 0 0 6px 0; color: #cbd5e1; font-size: 9px;">${flag.description}</p>
        <div style="display: flex; justify-content: space-between; align-items: center; font-size: 10px;">
          <span>Rollout: <strong>${flag.rolloutPercentage}%</strong></span>
          <select onchange="window.__flag_override('${id}', this.value)" style="background: #0f172a; color: #fff; border: 1px solid #475569; font-size: 9px; padding: 2px 4px; border-radius: 4px;">
            <option value="default" ${!hasOverride ? 'selected' : ''}>Default</option>
            <option value="true" ${hasOverride && localStorage.getItem(OVERRIDE_PREFIX + id) === 'true' ? 'selected' : ''}>Force ON</option>
            <option value="false" ${hasOverride && localStorage.getItem(OVERRIDE_PREFIX + id) === 'false' ? 'selected' : ''}>Force OFF</option>
          </select>
        </div>
      </div>
    `;
  });

  container.innerHTML = html || '<span style="color: #94a3b8;">No matching feature flags found.</span>';
}

if (typeof window !== 'undefined') {
  (window as any).__flag_override = (id: string, value: string) => {
    if (value === 'default') {
      saveFlagOverride(id, null);
    } else {
      saveFlagOverride(id, value === 'true');
    }
    window.location.reload();
  };
}
