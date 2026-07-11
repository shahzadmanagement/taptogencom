const { runSuites } = require('./helpers/runner.cjs');

// Require options coverage suite
require('./options/options.test.cjs');

// Execute them
runSuites();
