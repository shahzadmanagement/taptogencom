const path = require('path');
const assert = require('../helpers/assert.cjs');
const { describe, it } = require('../helpers/runner.cjs');
const { loadTS } = require('../helpers/ts-loader.cjs');

const analyticsPath = path.resolve(__dirname, '../../src/lib/product-analytics.ts');

let store = {};
const mockLocalStorage = {
  getItem: (key) => store[key] || null,
  setItem: (key, value) => { store[key] = String(value); },
  removeItem: (key) => { delete store[key]; },
  clear: () => { store = {}; }
};

const mockSessionStorage = {
  getItem: (key) => store[key] || null,
  setItem: (key, value) => { store[key] = String(value); },
  removeItem: (key) => { delete store[key]; }
};

describe('Product Analytics Platform Verification', () => {
  it('Verify session data initialization and visitor tracking properties', () => {
    store = {};
    globalThis.localStorage = mockLocalStorage;
    globalThis.sessionStorage = mockSessionStorage;
    globalThis.window = {
      location: { pathname: '/tools/fancy-text-generator' },
      addEventListener: () => {}
    };
    globalThis.document = { referrer: '' };

    const pa = loadTS(analyticsPath).productAnalytics;
    pa.initSession();

    const session = pa.getSession();
    assert.ok(session.sessionId, 'Session identifier was not generated');
    assert.equal(session.visitNumber, 1);
    assert.equal(session.isReturning, false);
    assert.ok(session.pagesViewed.includes('/tools/fancy-text-generator'));
  });
});
