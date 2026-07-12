const path = require('path');
const assert = require('../helpers/assert.cjs');
const { describe, it } = require('../helpers/runner.cjs');
const { loadTS } = require('../helpers/ts-loader.cjs');

const analyticsPath = path.resolve(__dirname, '../../src/lib/search-analytics.ts');
const trendingPath = path.resolve(__dirname, '../../src/lib/search-trending.ts');

let store = {};
const mockLocalStorage = {
  getItem: (key) => store[key] || null,
  setItem: (key, value) => { store[key] = String(value); },
  removeItem: (key) => { delete store[key]; },
  clear: () => { store = {}; }
};

describe('Search Analytics & Trending Engine Verification', () => {
  it('Verify search tracking log entries, aggregation metrics, trending calculations, and export functions', () => {
    store = {};
    globalThis.localStorage = mockLocalStorage;
    globalThis.window = {
      __taptogen_session_id: 'sess-123'
    };

    const sa = loadTS(analyticsPath);
    const trending = loadTS(trendingPath);

    sa.clearEventsLog();

    // 1. Log search events
    sa.trackSearchEvent({
      eventType: 'Started',
      query: 'cool fonts',
      normalizedQuery: 'cool fonts',
      detectedIntent: 'Fancy Text',
      resultCount: 0,
      searchLatency: 0,
      confidenceScore: 0,
      searchSource: 'spotlight',
      locale: 'en',
      deviceType: 'desktop'
    });

    sa.trackSearchEvent({
      eventType: 'Completed',
      query: 'cool fonts',
      normalizedQuery: 'cool fonts',
      detectedIntent: 'Fancy Text',
      resultCount: 8,
      searchLatency: 2.1,
      confidenceScore: 85,
      searchSource: 'spotlight',
      locale: 'en',
      deviceType: 'desktop'
    });

    sa.trackSearchEvent({
      eventType: 'ZeroResults',
      query: 'unknown terms',
      normalizedQuery: 'unknown terms',
      detectedIntent: 'General Search',
      resultCount: 0,
      searchLatency: 1.2,
      confidenceScore: 30,
      searchSource: 'spotlight',
      locale: 'en',
      deviceType: 'desktop'
    });

    // 2. Verify metrics calculation
    const metrics = sa.computeSearchMetrics();
    assert.equal(metrics.totalSearches, 1, 'Total searches calculation mismatch');
    assert.equal(metrics.failedSearches, 1, 'Failed zero-results count mismatch');

    // 3. Verify trending calculations
    const today = trending.getTrendingToday();
    assert.ok(today.length > 0, 'Trending today queries list is empty');
    assert.equal(today[0].query, 'cool fonts');

    // 4. Verify CSV/JSON exporting format
    const csvStr = sa.exportAnalytics('csv');
    assert.ok(csvStr.includes('eventType,timestamp,query'), 'CSV header headers block is missing');
    assert.ok(csvStr.includes('cool fonts'), 'CSV exported rows data is missing');

    const jsonStr = sa.exportAnalytics('json');
    const parsed = JSON.parse(jsonStr);
    assert.equal(parsed.length, 3);
  });
});
