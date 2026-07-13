const path = require('path');
const assert = require('../helpers/assert.cjs');
const { describe, it } = require('../helpers/runner.cjs');
const { loadTS } = require('../helpers/ts-loader.cjs');

const intelligencePath = path.resolve(__dirname, '../../src/lib/search-intelligence.ts');
const analyticsPath = path.resolve(__dirname, '../../src/lib/search-analytics.ts');

let store = {};
const mockLocalStorage = {
  getItem: (key) => store[key] || null,
  setItem: (key, value) => { store[key] = String(value); },
  removeItem: (key) => { delete store[key]; },
  clear: () => { store = {}; }
};

describe('Search Quality, SEO & Intelligence Verification', () => {
  it('Verify search quality scoring calculations', () => {
    const intelligence = loadTS(intelligencePath);

    const scores = intelligence.evaluateSearchQuality('cool fonts', 8, 1, 1.5);
    
    assert.ok(scores.overall > 50, 'Overall quality score calculation was zero or too low');
    assert.equal(scores.ctrScore, 100, 'CTR score must be 100 on result click count > 0');
  });

  it('Verify synonym suggestions, tool discovery, and SEO health scoring parameters', () => {
    store = {};
    globalThis.localStorage = mockLocalStorage;
    globalThis.window = {
      __taptogen_session_id: 'sess-123'
    };

    const sa = loadTS(analyticsPath);
    const intelligence = loadTS(intelligencePath);

    sa.clearEventsLog();

    sa.trackSearchEvent({
      eventType: 'ZeroResults',
      query: 'missing tools search',
      normalizedQuery: 'missing tools search',
      detectedIntent: 'General Search',
      resultCount: 0,
      searchLatency: 1.0,
      confidenceScore: 30,
      searchSource: 'spotlight',
      locale: 'en',
      deviceType: 'desktop'
    });

    const synonyms = intelligence.suggestAutoSynonyms();
    assert.ok(synonyms.length > 0, 'Auto synonym suggestions array is empty');

    const missing = intelligence.discoverMissingTools();
    assert.ok(missing.length > 0, 'Missing tools discovery list is empty');

    const dashboard = intelligence.computeSearchHealthMetrics();
    assert.ok(dashboard.searchQualityPercent > 0);
    assert.ok(dashboard.seoOpportunityScore > 0);
  });
});
