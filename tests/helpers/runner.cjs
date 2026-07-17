const suites = [];

function describe(name, fn) {
  suites.push({ name, fn, tests: [] });
}

function it(name, fn) {
  const currentSuite = suites[suites.length - 1];
  if (!currentSuite) {
    throw new Error('it() must be called inside describe()');
  }
  currentSuite.tests.push({ name, fn });
}

async function runSuites() {
  console.log('\n==================================================');
  console.log('         RUNNING QUALITY AUTOMATION SUITE');
  console.log('==================================================\n');

  let totalTests = 0;
  let passedTests = 0;
  let failedTests = 0;
  const failures = [];

  for (const suite of suites) {
    console.log(`Suite: ${suite.name}`);
    suite.fn(); // Register tests for this suite
    for (const test of suite.tests) {
      totalTests++;
      try {
        await test.fn();
        passedTests++;
        console.log(`  \x1b[32m✓\x1b[0m ${test.name}`);
      } catch (err) {
        failedTests++;
        console.log(`  \x1b[31m✗\x1b[0m ${test.name}`);
        console.error(`    \x1b[33mError:\x1b[0m ${err.message}`);
        if (err.stack) {
          console.error(`    ${err.stack.split('\n').slice(1, 4).join('\n    ')}`);
        }
        failures.push({ suite: suite.name, test: test.name, error: err });
      }
    }
    console.log('');
  }

  console.log('==================================================');
  console.log(`Summary: ${passedTests} passed, ${failedTests} failed, ${totalTests} total`);
  console.log('==================================================\n');

  if (failedTests > 0) {
    process.exit(1);
  } else {
    process.exit(0);
  }
}

globalThis.describe = describe;
globalThis.it = it;

module.exports = { runSuites, describe, it };
