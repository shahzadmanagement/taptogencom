const { execSync } = require('child_process');
const path = require('path');

console.log('Starting full verification pipeline...\n');

function runCmd(cmd) {
  console.log(`Running: ${cmd}`);
  try {
    execSync(cmd, { stdio: 'inherit', cwd: path.resolve(__dirname, '..') });
    console.log(`\x1b[32m✓ Success:\x1b[0m ${cmd}\n`);
  } catch (err) {
    console.error(`\x1b[31m✗ Failed:\x1b[0m ${cmd}`);
    process.exit(1);
  }
}

const isCI = process.env.GITHUB_ACTIONS === 'true';

if (isCI) {
  // On CI environment, run full typecheck, build, and tests
  runCmd('npm run typecheck');
  runCmd('npm run build');
  runCmd('npm run test');
} else {
  // Local environment constraints: run test suites directly
  console.log('Local environment: Running test suites directly.');
  runCmd('agy-node.cmd tests/run-all.cjs');
}
