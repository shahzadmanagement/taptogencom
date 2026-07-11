const path = require('path');
const { loadTS } = require('../helpers/ts-loader.cjs');
const assert = require('../helpers/assert.cjs');
const { describe, it } = require('../helpers/runner.cjs');

const datasetsPath = path.resolve(__dirname, '../../src/scripts/data/generator-datasets.ts');
const datasets = loadTS(datasetsPath);

describe('Generator Datasets Validation', () => {
  it('Verify all primary datasets are exported and non-empty', () => {
    const primaryKeys = [
      'firstNames', 'lastNames', 'fantasyPrefixes', 'fantasySuffixes',
      'teamAdjectives', 'teamNouns', 'babyBoyNames', 'babyGirlNames',
      'middleNames', 'discordAdj', 'discordNouns', 'clanPrefixes', 'clanSuffixes'
    ];

    for (const key of primaryKeys) {
      assert.ok(datasets[key], `Dataset "${key}" is missing from exports`);
      assert.ok(Array.isArray(datasets[key]) || typeof datasets[key] === 'object', `Dataset "${key}" is not array/object`);
      if (Array.isArray(datasets[key])) {
        assert.ok(datasets[key].length > 0, `Dataset "${key}" is empty`);
      }
    }
  });

  it('Verify no duplicate keys exist in key mappings', () => {
    const mappings = ['morseMap', 'leetMap'];
    for (const key of mappings) {
      const map = datasets[key];
      assert.ok(map, `Mapping "${key}" is missing`);
      const keys = Object.keys(map);
      assert.ok(keys.length > 0, `Mapping "${key}" is empty`);
      
      const seen = new Set();
      for (const k of keys) {
        assert.ok(!seen.has(k), `Duplicate key "${k}" in mapping "${key}"`);
        seen.add(k);
      }
    }
  });
});
