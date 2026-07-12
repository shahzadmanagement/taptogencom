const path = require('path');
const assert = require('../helpers/assert.cjs');
const { describe, it } = require('../helpers/runner.cjs');
const { loadTS } = require('../helpers/ts-loader.cjs');

const analyticsPath = path.resolve(__dirname, '../../src/lib/analytics.ts');
const analytics = loadTS(analyticsPath);

describe('Analytics System Verification', () => {
  it('Verify trackGeneratorOpen dispatches GA4 & Vercel events correctly', () => {
    let gaEvent = null;
    let vercelEvent = null;

    globalThis.window = {
      gtag: (type, name, data) => {
        if (type === 'event') gaEvent = { name, data };
      },
      va: (type, data) => {
        if (type === 'event') vercelEvent = data;
      }
    };

    analytics.trackGeneratorOpen('test-slug');

    assert.ok(gaEvent, 'GA4 event was not tracked');
    assert.equal(gaEvent.name, 'generator_open');
    assert.equal(gaEvent.data.generator_slug, 'test-slug');

    assert.ok(vercelEvent, 'Vercel event was not tracked');
    assert.equal(vercelEvent.name, 'generator_open');
    assert.equal(vercelEvent.data.generator_slug, 'test-slug');
  });

  it('Verify trackGenerate dispatches events correctly', () => {
    let gaEvent = null;
    globalThis.window = {
      gtag: (type, name, data) => {
        if (type === 'event') gaEvent = { name, data };
      }
    };

    analytics.trackGenerate('test-slug');
    assert.equal(gaEvent.name, 'generator_generate');
    assert.equal(gaEvent.data.generator_slug, 'test-slug');
  });

  it('Verify trackCopy dispatches events correctly', () => {
    let gaEvent = null;
    globalThis.window = {
      gtag: (type, name, data) => {
        if (type === 'event') gaEvent = { name, data };
      }
    };

    analytics.trackCopy('test-slug');
    assert.equal(gaEvent.name, 'generator_copy');
    assert.equal(gaEvent.data.generator_slug, 'test-slug');
  });

  it('Verify trackDownload dispatches events correctly', () => {
    let gaEvent = null;
    globalThis.window = {
      gtag: (type, name, data) => {
        if (type === 'event') gaEvent = { name, data };
      }
    };

    analytics.trackDownload('test-slug');
    assert.equal(gaEvent.name, 'generator_download');
    assert.equal(gaEvent.data.generator_slug, 'test-slug');
  });

  it('Verify trackShare dispatches events correctly', () => {
    let gaEvent = null;
    globalThis.window = {
      gtag: (type, name, data) => {
        if (type === 'event') gaEvent = { name, data };
      }
    };

    analytics.trackShare('test-slug');
    assert.equal(gaEvent.name, 'generator_share');
    assert.equal(gaEvent.data.generator_slug, 'test-slug');
  });

  it('Verify trackOptionChange dispatches option state payload correctly', () => {
    let gaEvent = null;
    globalThis.window = {
      gtag: (type, name, data) => {
        if (type === 'event') gaEvent = { name, data };
      }
    };

    analytics.trackOptionChange('test-slug', 'opt-id', 'opt-val');
    assert.equal(gaEvent.name, 'generator_option_change');
    assert.equal(gaEvent.data.generator_slug, 'test-slug');
    assert.equal(gaEvent.data.option_id, 'opt-id');
    assert.equal(gaEvent.data.option_value, 'opt-val');
  });

  it('Verify graceful fallback when window, gtag, and va are undefined', () => {
    delete globalThis.window;

    try {
      analytics.trackGeneratorOpen('test-slug');
      analytics.trackGenerate('test-slug');
      analytics.trackCopy('test-slug');
      analytics.trackDownload('test-slug');
      analytics.trackShare('test-slug');
      analytics.trackOptionChange('test-slug', 'opt-id', 'opt-val');
    } catch (e) {
      assert.ok(false, `Fallback check threw exception: ${e.message}`);
    }
  });
});
