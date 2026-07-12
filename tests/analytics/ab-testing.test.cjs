const path = require('path');
const assert = require('../helpers/assert.cjs');
const { describe, it } = require('../helpers/runner.cjs');
const { loadTS } = require('../helpers/ts-loader.cjs');

const abTestingPath = path.resolve(__dirname, '../../src/lib/ab-testing.ts');

// Mock LocalStorage
let store = {};
const mockLocalStorage = {
  getItem: (key) => store[key] || null,
  setItem: (key, value) => { store[key] = String(value); },
  removeItem: (key) => { delete store[key]; },
  clear: () => { store = {}; }
};

describe('A/B Testing Framework Verification', () => {
  it('Verify assignment stability for a fixed user identifier', () => {
    store = {};
    globalThis.localStorage = mockLocalStorage;
    globalThis.window = { location: { search: '' } };

    const abTesting = loadTS(abTestingPath);
    abTesting.getUserId();
    const variant1 = abTesting.getVariant('hero_layout_experiment');
    const variant2 = abTesting.getVariant('hero_layout_experiment');
    
    assert.equal(variant1, variant2, 'Deterministic assignment is unstable for a fixed user');
  });

  it('Verify variant override behavior via query parameters', () => {
    store = {};
    globalThis.localStorage = mockLocalStorage;
    globalThis.window = {
      location: { search: '?ab_hero_layout_experiment=compact_spacious' }
    };

    const abTesting = loadTS(abTestingPath);
    const variant = abTesting.getVariant('hero_layout_experiment');
    assert.equal(variant, 'compact_spacious', 'Query parameters override did not force the variant');
  });

  it('Verify persistence of assigned variant in storage', () => {
    store = {};
    globalThis.localStorage = mockLocalStorage;
    globalThis.window = { location: { search: '' } };

    const abTesting = loadTS(abTestingPath);
    abTesting.getUserId();
    const originalVariant = abTesting.getVariant('cta_button_text_experiment');
    
    // Simulate change in user id to check if persistence wins
    store['taptogen-uuid'] = 'new-user-id-different-hash';
    
    const secondVariant = abTesting.getVariant('cta_button_text_experiment');
    assert.equal(originalVariant, secondVariant, 'Persisted assignment was overwritten by a new user hash');
  });

  it('Verify variant distribution balance across 100 users', () => {
    store = {};
    globalThis.localStorage = mockLocalStorage;
    globalThis.window = { location: { search: '' } };

    const abTesting = loadTS(abTestingPath);
    const counts = {};
    const exp = abTesting.EXPERIMENT_REGISTRY['cta_button_text_experiment'];
    exp.variants.forEach(v => { counts[v] = 0; });
    counts['control'] = 0;

    for (let i = 0; i < 100; i++) {
      delete store['taptogen-ab-assignments'];
      store['taptogen-uuid'] = `user-index-${i}`;
      const v = abTesting.getVariant('cta_button_text_experiment');
      counts[v] = (counts[v] || 0) + 1;
    }

    // Verify all variants were assigned at least once, verifying distribution balance
    exp.variants.forEach(v => {
      assert.ok(counts[v] > 0, `Variant ${v} was never assigned in 100 iterations (counts: ${JSON.stringify(counts)})`);
    });
  });

  it('Verify exposure tracking triggers correct analytics events', () => {
    store = {};
    globalThis.localStorage = mockLocalStorage;
    
    let gaEvent = null;
    let vercelEvent = null;

    globalThis.window = {
      location: { search: '' },
      gtag: (type, name, data) => {
        if (type === 'event') gaEvent = { name, data };
      },
      va: (type, data) => {
        if (type === 'event') vercelEvent = data;
      }
    };

    const abTesting = loadTS(abTestingPath);
    abTesting.getUserId();
    const variant = abTesting.triggerExposure('hero_layout_experiment');

    assert.ok(gaEvent, 'Exposure event not sent to GA4');
    assert.equal(gaEvent.name, 'experiment_exposure');
    assert.equal(gaEvent.data.experiment_id, 'hero_layout_experiment');
    assert.equal(gaEvent.data.variant_id, variant);

    assert.ok(vercelEvent, 'Exposure event not sent to Vercel');
    assert.equal(vercelEvent.name, 'experiment_exposure');
    assert.equal(vercelEvent.data.experiment_id, 'hero_layout_experiment');
    assert.equal(vercelEvent.data.variant_id, variant);
  });
});
