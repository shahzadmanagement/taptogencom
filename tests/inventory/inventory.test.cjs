const fs = require('fs');
const path = require('path');
const { loadTS } = require('../helpers/ts-loader.cjs');
const assert = require('../helpers/assert.cjs');
const { describe, it } = require('../helpers/runner.cjs');

const toolsPath = path.resolve(__dirname, '../../src/data/tools.ts');
const { tools } = loadTS(toolsPath);
const inventoryPath = path.resolve(__dirname, '../../master_inventory.json');
const inventory = JSON.parse(fs.readFileSync(inventoryPath, 'utf8'));

describe('Inventory Integrity Validation', () => {
  it('Verify master_inventory.json loads and matches tools list size', () => {
    assert.equal(inventory.length, tools.length, 'Inventory count does not match tools count in tools.ts');
  });

  const seenSlugs = new Set();
  for (const item of inventory) {
    it(`Validate inventory entry for slug: "${item.slug}"`, () => {
      assert.ok(!seenSlugs.has(item.slug), `Duplicate slug "${item.slug}" in master_inventory.json`);
      seenSlugs.add(item.slug);

      const matchingTool = tools.find(t => t.slug === item.slug);
      assert.ok(matchingTool, `Slug "${item.slug}" in inventory does not exist in tools.ts`);

      const validStatuses = ['🟢 Production Ready', '🟡 Needs Polish', '🟠 Partially Implemented', '🔴 Broken'];
      assert.ok(validStatuses.includes(item.status), `Invalid status "${item.status}" for slug "${item.slug}"`);

      assert.ok(item.score >= 0 && item.score <= 10, `Invalid score ${item.score} for slug "${item.slug}" (must be 0-10)`);
    });
  }
});
