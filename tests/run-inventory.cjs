const { runSuites } = require('./helpers/runner.cjs');

// Require inventory suite
require('./inventory/inventory.test.cjs');

// Execute them
runSuites();
