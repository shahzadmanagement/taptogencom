const fs = require('fs');
const path = require('path');
const { loadTS } = require('../tests/helpers/ts-loader.cjs');

const toolsPath = path.resolve(__dirname, '../src/data/tools.ts');
const { tools } = loadTS(toolsPath);

const workspaceCode = fs.readFileSync(path.resolve(__dirname, '../src/scripts/tool-workspace.ts'), 'utf8');
const datasetsCode = fs.readFileSync(path.resolve(__dirname, '../src/scripts/data/generator-datasets.ts'), 'utf8');

const unwired = [];

for (const tool of tools) {
  if (!tool.toolOptions) continue;

  for (const opt of tool.toolOptions) {
    const isWired = workspaceCode.includes(`'${opt.id}'`) || 
                    workspaceCode.includes(`"${opt.id}"`) ||
                    datasetsCode.includes(`'${opt.id}'`) ||
                    datasetsCode.includes(`"${opt.id}"`);
    if (!isWired) {
      unwired.push({ tool: tool.slug, option: opt.id, type: opt.type });
    }
  }
}

console.log('UNWIRED OPTIONS:', JSON.stringify(unwired, null, 2));
