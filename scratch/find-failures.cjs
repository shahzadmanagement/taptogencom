const runner = require('../tests/helpers/runner.cjs');

// Run all test files and print failing test info clearly at the end
const failures = [];
const origIt = globalThis.it;

// Require all test files
require('../tests/generators/runtime.test.cjs');
require('../tests/options/options.test.cjs');
require('../tests/inventory/inventory.test.cjs');
require('../tests/datasets/datasets.test.cjs');
require('../tests/integration/integration.test.cjs');
require('../tests/smoke/smoke.test.cjs');
require('../tests/analytics/analytics.test.cjs');
require('../tests/analytics/ab-testing.test.cjs');
require('../tests/analytics/feature-flags.test.cjs');
require('../tests/analytics/event-bus.test.cjs');
require('../tests/analytics/product-analytics.test.cjs');
require('../tests/analytics/error-monitor.test.cjs');
require('../tests/analytics/performance-monitor.test.cjs');
require('../tests/search/search-engine.test.cjs');
require('../tests/search/search-ui.test.cjs');
require('../tests/search/search-semantic.test.cjs');
require('../tests/search/search-ranking.test.cjs');
require('../tests/search/search-recommendations.test.cjs');
require('../tests/search/ai-search-assistant.test.cjs');
require('../tests/search/search-analytics.test.cjs');
require('../tests/search/search-performance.test.cjs');
require('../tests/search/search-intelligence.test.cjs');
require('../tests/search/search-sitemap.test.cjs');
require('../tests/search/search-robots.test.cjs');
require('../tests/search/search-canonical.test.cjs');
require('../tests/search/search-schema.test.cjs');
require('../tests/search/search-breadcrumb.test.cjs');
require('../tests/search/search-hreflang.test.cjs');
require('../tests/search/search-metadata.test.cjs');
require('../tests/search/search-internal-links.test.cjs');
require('../tests/search/search-image-seo.test.cjs');
require('../tests/performance/performance.test.cjs');
require('../tests/content/content-quality.test.cjs');
require('../tests/product/product-domination.test.cjs');
require('../tests/schema/schema-rich-results.test.cjs');
require('../tests/ai/ai-engine.test.cjs');
require('../tests/accessibility/accessibility.test.cjs');
require('../tests/monitoring/analytics.test.cjs');
require('../tests/production/launch.test.cjs');
require('../tests/product/tool-excellence.test.cjs');

// Intercept runSuites by replacing process.exit or logging failures
process.on('exit', () => {
  console.log('Finished suite run check');
});

runner.runSuites();
