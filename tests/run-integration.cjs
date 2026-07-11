const { runSuites } = require('./helpers/runner.cjs');

// Require integration suite
require('./integration/integration.test.cjs');

// Execute them
runSuites();
