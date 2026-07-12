const { runSuites } = require('./helpers/runner.cjs');

// Require all test files to register their suites
require('./generators/runtime.test.cjs');
require('./options/options.test.cjs');
require('./inventory/inventory.test.cjs');
require('./datasets/datasets.test.cjs');
require('./integration/integration.test.cjs');
require('./smoke/smoke.test.cjs');
require('./analytics/analytics.test.cjs');

// Execute them
runSuites();
