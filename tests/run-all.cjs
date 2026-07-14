const { runSuites } = require('./helpers/runner.cjs');

// Require all test files to register their suites
require('./generators/runtime.test.cjs');
require('./options/options.test.cjs');
require('./inventory/inventory.test.cjs');
require('./datasets/datasets.test.cjs');
require('./integration/integration.test.cjs');
require('./smoke/smoke.test.cjs');
require('./analytics/analytics.test.cjs');
require('./analytics/ab-testing.test.cjs');
require('./analytics/feature-flags.test.cjs');
require('./analytics/event-bus.test.cjs');
require('./analytics/product-analytics.test.cjs');
require('./analytics/error-monitor.test.cjs');
require('./analytics/performance-monitor.test.cjs');
require('./search/search-engine.test.cjs');
require('./search/search-ui.test.cjs');
require('./search/search-semantic.test.cjs');
require('./search/search-ranking.test.cjs');
require('./search/search-recommendations.test.cjs');
require('./search/ai-search-assistant.test.cjs');
require('./search/search-analytics.test.cjs');
require('./search/search-performance.test.cjs');
require('./search/search-intelligence.test.cjs');
require('./search/search-sitemap.test.cjs');
require('./search/search-robots.test.cjs');
require('./search/search-canonical.test.cjs');
require('./search/search-schema.test.cjs');
require('./search/search-breadcrumb.test.cjs');
require('./search/search-hreflang.test.cjs');
require('./search/search-metadata.test.cjs');
require('./search/search-internal-links.test.cjs');
require('./search/search-image-seo.test.cjs');
require('./performance/performance.test.cjs');
require('./content/content-quality.test.cjs');
require('./product/product-domination.test.cjs');
require('./schema/schema-rich-results.test.cjs');
require('./ai/ai-engine.test.cjs');
require('./accessibility/accessibility.test.cjs');

// Execute them
runSuites();
