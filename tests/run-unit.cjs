const { runSuites } = require('./helpers/runner.cjs');

// Require unit-specific test suites
require('./generators/runtime.test.cjs');
require('./datasets/datasets.test.cjs');
require('./smoke/smoke.test.cjs');

// Execute them
runSuites();
