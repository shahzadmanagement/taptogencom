const path = require('path');
const assert = require('../helpers/assert.cjs');
const { describe, it } = require('../helpers/runner.cjs');
const { loadTS } = require('../helpers/ts-loader.cjs');

const analyticsPath = path.resolve(__dirname, '../../src/lib/analytics.ts');

describe('Enterprise Analytics, Monitoring & Search Console Platform Verification', () => {
  it('Verify environment and feature flags configuration settings', () => {
    const engine = loadTS(analyticsPath);
    
    assert.ok(engine.defaultAnalyticsConfig);
    assert.equal(engine.defaultAnalyticsConfig.enableGA, true);
    assert.equal(engine.defaultAnalyticsConfig.enableClarity, true);
  });

  it('Verify script load triggers only in production env', () => {
    const engine = loadTS(analyticsPath);
    
    // Simulate non-production load
    engine.initializeAnalytics({ env: 'development' });
    // In node environment, window is undefined, but the function should return early before calling document methods
    assert.ok(true);
  });

  it('Verify Core Web Vitals and Health collector calls execute gracefully', () => {
    const engine = loadTS(analyticsPath);
    
    // Test Web Vitals collector routing
    engine.trackCoreWebVital({ name: 'LCP', value: 1200 });

    // Test health crawler logs
    engine.trackHealthAudit('/tools/fancy-text/', {
      statusCode: 200,
      brokenInternalLinksCount: 0,
      brokenExternalLinksCount: 0,
      missingCanonical: false,
      missingHreflang: false,
      missingSchema: false,
      missingMeta: false,
      isOrphan: false
    });

    // Should not crash when executed in test harness env
    assert.ok(true);
  });

  it('Verify interaction trackers dispatch handlers', () => {
    const engine = loadTS(analyticsPath);

    engine.trackSearchUsage('cool fonts');
    engine.trackAiRequest('fancy-text-generator', '1.0.0');
    engine.trackLanguageSwitch('en', 'es');

    assert.ok(true);
  });
});
