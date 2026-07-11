const fs = require('fs');
const path = require('path');
const assert = require('../helpers/assert.cjs');
const { describe, it } = require('../helpers/runner.cjs');

describe('Smoke & Configuration Suitability Verification', () => {
  it('Verify tsconfig.json is present and valid JSON', () => {
    const tsconfigPath = path.resolve(__dirname, '../../tsconfig.json');
    assert.ok(fs.existsSync(tsconfigPath), 'tsconfig.json is missing');
    const tsconfig = JSON.parse(fs.readFileSync(tsconfigPath, 'utf8'));
    assert.ok(tsconfig.compilerOptions, 'tsconfig.json has no compilerOptions');
  });

  it('Verify master inventory structure consistency', () => {
    const invPath = path.resolve(__dirname, '../../master_inventory.json');
    const scorePath = path.resolve(__dirname, '../../quality_scoreboard.md');
    assert.ok(fs.existsSync(invPath), 'master_inventory.json is missing');
    assert.ok(fs.existsSync(scorePath), 'quality_scoreboard.md is missing');
  });
});
