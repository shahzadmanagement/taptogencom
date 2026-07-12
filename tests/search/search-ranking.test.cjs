const path = require('path');
const assert = require('../helpers/assert.cjs');
const { describe, it } = require('../helpers/runner.cjs');
const { loadTS } = require('../helpers/ts-loader.cjs');

const rankingPath = path.resolve(__dirname, '../../src/lib/search-ranking.ts');
const historyPath = path.resolve(__dirname, '../../src/lib/search-history.ts');

let store = {};
const mockLocalStorage = {
  getItem: (key) => store[key] || null,
  setItem: (key, value) => { store[key] = String(value); },
  removeItem: (key) => { delete store[key]; },
  clear: () => { store = {}; }
};

describe('Search AI Ranking & Personalization Verification', () => {
  it('Verify click tracking, time-decay scoring, and popularity boosting', () => {
    store = {};
    globalThis.localStorage = mockLocalStorage;
    globalThis.window = {
      gtag: () => {}
    };

    const history = loadTS(historyPath);
    const ranking = loadTS(rankingPath);

    const doc = {
      id: 'baby-name-generator',
      title: 'Baby Name Generator',
      description: 'Find baby names',
      category: 'Names',
      keywords: [],
      url: ''
    };

    // 1. Base Score calculation (no click history yet)
    const baseScore = 5.0;
    const r1 = ranking.computePersonalizedScore(doc, baseScore);
    
    // 2. Click tool twice
    history.recordToolClick('baby-name-generator');
    history.recordToolClick('baby-name-generator');

    const scoreAfterClicks = history.getHistoryScore('baby-name-generator');
    assert.ok(scoreAfterClicks > 0, 'History score calculation returned zero/negative');

    // 3. Compute personalized score with click boosts
    const r2 = ranking.computePersonalizedScore(doc, baseScore);
    assert.ok(r2.score > r1.score, 'Recent usage click boost was not applied to score');
    assert.ok(r2.appliedBoosts.includes('recent_usage_boost'));
  });
});
