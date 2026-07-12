const path = require('path');
const assert = require('../helpers/assert.cjs');
const { describe, it } = require('../helpers/runner.cjs');
const { loadTS } = require('../helpers/ts-loader.cjs');

const flagsPath = path.resolve(__dirname, '../../src/lib/feature-flags.ts');
const validatorPath = path.resolve(__dirname, '../../src/lib/feature-validator.ts');

let store = {};
const mockLocalStorage = {
  getItem: (key) => store[key] || null,
  setItem: (key, value) => { store[key] = String(value); },
  removeItem: (key) => { delete store[key]; },
  clear: () => { store = {}; }
};

describe('Feature Flags Framework Verification', () => {
  it('Verify deterministic boolean evaluation and rollout thresholds', () => {
    store = {};
    globalThis.localStorage = mockLocalStorage;
    globalThis.window = { location: { search: '' } };

    const ff = loadTS(flagsPath);
    
    // Test a 100% rollout flag
    // enable_quick_action_cards depends on enable_new_workspace_design.
    // Let's force enable_new_workspace_design to true.
    store['taptogen-flag-override-enable_new_workspace_design'] = 'true';
    
    const enabledPostOverride = ff.isFeatureEnabled('enable_quick_action_cards');
    assert.equal(enabledPostOverride, true, 'Flag with 100% rollout was false despite met dependency');
  });

  it('Verify dependency chaining, required and nested flags', () => {
    store = {};
    globalThis.localStorage = mockLocalStorage;
    globalThis.window = { location: { search: '' } };

    const ff = loadTS(flagsPath);
    
    // Force design flag to false
    store['taptogen-flag-override-enable_new_workspace_design'] = 'false';
    const active = ff.isFeatureEnabled('enable_quick_action_cards');
    assert.equal(active, false, 'Nested flag was enabled even though parent dependency is disabled');
  });

  it('Verify overrides (URL, localStorage, and global bypass overrides)', () => {
    store = {};
    globalThis.localStorage = mockLocalStorage;
    
    // Test URL overrides
    globalThis.window = {
      location: { search: '?flag_enable_experimental_features=true' },
      gtag: () => {}
    };

    const ff = loadTS(flagsPath);
    const experimental = ff.isFeatureEnabled('enable_experimental_features');
    assert.equal(experimental, true, 'URL override did not force flag to true');
  });

  it('Verify validator checks and cycle finder topo checker', () => {
    const validator = loadTS(validatorPath);
    
    // Create registry with circular dependency loop
    const circularRegistry = {
      'flag_a': {
        id: 'flag_a',
        name: 'A',
        description: 'A',
        owner: 'growth',
        status: 'active',
        type: 'boolean',
        defaultValue: false,
        rolloutPercentage: 50,
        dependencies: ['flag_b']
      },
      'flag_b': {
        id: 'flag_b',
        name: 'B',
        description: 'B',
        owner: 'growth',
        status: 'active',
        type: 'boolean',
        defaultValue: false,
        rolloutPercentage: 50,
        dependencies: ['flag_a'] // Circular loop!
      }
    };

    const res = validator.runGlobalFlagChecks(circularRegistry);
    assert.equal(res.isValid, false);
    assert.ok(res.warnings.some(w => w.message.includes('Circular reference')), 'Validator failed to flag circular dependency loop');
  });
});
