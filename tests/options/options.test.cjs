const fs = require('fs');
const path = require('path');
const { loadTS } = require('../helpers/ts-loader.cjs');
const assert = require('../helpers/assert.cjs');
const { describe, it } = require('../helpers/runner.cjs');

const toolsPath = path.resolve(__dirname, '../../src/data/tools.ts');
const { tools } = loadTS(toolsPath);

const workspaceCode = fs.readFileSync(path.resolve(__dirname, '../../src/scripts/tool-workspace.ts'), 'utf8');
const datasetsCode = fs.readFileSync(path.resolve(__dirname, '../../src/scripts/data/generator-datasets.ts'), 'utf8');

describe('Option Coverage & Validation Tests', () => {
  const seenOptionIds = new Set();

  for (const tool of tools) {
    if (!tool.toolOptions) continue;

    for (const opt of tool.toolOptions) {
      it(`Validate option "${opt.id}" in tool "${tool.slug}"`, () => {
        const uniqueKey = `${tool.slug}:${opt.id}`;
        assert.ok(!seenOptionIds.has(uniqueKey), `Duplicate option ID "${opt.id}" detected in tool "${tool.slug}"`);
        seenOptionIds.add(uniqueKey);

        if (opt.default !== undefined) {
          if (opt.type === 'select') {
            assert.ok(opt.options && opt.options.length > 0, `Select option "${opt.id}" has no choices`);
            const values = opt.options.map(o => o.value);
            assert.ok(values.includes(opt.default), `Default value "${opt.default}" for option "${opt.id}" is not in list of options: [${values.join(', ')}]`);
          } else if (opt.type === 'number') {
            assert.ok(typeof opt.default === 'number' || !isNaN(Number(opt.default)), `Default value for number option "${opt.id}" must be a number`);
            if (opt.min !== undefined) {
              assert.ok(Number(opt.default) >= opt.min, `Default "${opt.default}" is less than min limit ${opt.min}`);
            }
            if (opt.max !== undefined) {
              assert.ok(Number(opt.default) <= opt.max, `Default "${opt.default}" is greater than max limit ${opt.max}`);
            }
          } else if (opt.type === 'checkbox') {
            assert.ok(typeof opt.default === 'boolean' || opt.default === 'true' || opt.default === 'false', `Default value for checkbox option "${opt.id}" must be boolean-like`);
          }
        }

        const isWired = workspaceCode.includes(`'${opt.id}'`) || 
                        workspaceCode.includes(`"${opt.id}"`) ||
                        datasetsCode.includes(`'${opt.id}'`) ||
                        datasetsCode.includes(`"${opt.id}"`);
                        
        assert.ok(isWired, `Option "${opt.id}" in tool "${tool.slug}" is declared but not referenced in runtime code`);
      });
    }
  }
});
