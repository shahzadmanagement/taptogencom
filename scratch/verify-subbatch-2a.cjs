const fs = require('fs');
const path = require('path');
const { loadTS } = require('../tests/helpers/ts-loader.cjs');

const toolsPath = path.resolve(__dirname, '../src/data/tools.ts');
const { tools } = loadTS(toolsPath);

const workspaceCode = fs.readFileSync(path.resolve(__dirname, '../src/scripts/tool-workspace.ts'), 'utf8');

const subBatch2A = [
  'business-name-generator',
  'domain-name-generator',
  'product-name-generator',
  'shop-name-generator',
  'startup-name-generator',
  'app-name-generator',
  'bakery-name-generator',
  'salon-name-generator',
  'farm-name-generator',
  'food-truck-name-generator'
];

const results = [];

for (const slug of subBatch2A) {
  const tool = tools.find(t => t.slug === slug);
  if (!tool) {
    results.push({ slug, status: 'MISSING TOOL DEFINITION' });
    continue;
  }

  const options = tool.toolOptions || [];
  const unwired = [];
  for (const opt of options) {
    const isWired = workspaceCode.includes(`'${opt.id}'`) || workspaceCode.includes(`"${opt.id}"`);
    if (!isWired) unwired.push(opt.id);
  }

  const hasHandler = workspaceCode.includes(`case '${slug}':`);
  results.push({
    slug,
    name: tool.name,
    optionCount: options.length,
    unwiredOptions: unwired,
    hasHandler,
    faqCount: (tool.faqItems || []).length
  });
}

console.log('SUB-BATCH 2A STATUS:', JSON.stringify(results, null, 2));
