const { runGenerator, loadTS } = require('../helpers/ts-loader.cjs');
const assert = require('../helpers/assert.cjs');
const path = require('path');
const { describe, it } = require('../helpers/runner.cjs');

const toolsPath = path.resolve(__dirname, '../../src/data/tools.ts');
const { tools } = loadTS(toolsPath);

describe('Generator Runtime Verification', () => {
  for (const tool of tools) {
    it(`Verify generator "${tool.slug}" can execute and returns output`, async () => {
      const res = await runGenerator(tool.slug, 'https://example.com', {});
      assert.ok(res.rawOutput || res.htmlOutput, `Generator ${tool.slug} returned empty output`);
      
      const isPlaceholder = res.htmlOutput.includes('This generator is coming soon!');
      assert.ok(!isPlaceholder, `Generator ${tool.slug} returned "coming soon" placeholder`);
    });
  }
});
