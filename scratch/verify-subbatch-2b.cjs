const fs = require('fs');
const path = require('path');
const { loadTS } = require('../tests/helpers/ts-loader.cjs');

const toolsPath = path.resolve(__dirname, '../src/data/tools.ts');
const { tools } = loadTS(toolsPath);

const workspaceCode = fs.readFileSync(path.resolve(__dirname, '../src/scripts/tool-workspace.ts'), 'utf8');

const subBatch2B = [
  'service-agreement-generator',
  'contract-generator',
  'proposal-generator',
  'estimate-generator',
  'quotation-generator',
  'purchase-order-generator',
  'receipt-generator',
  'dmca-policy-generator',
  'privacy-policy-generator',
  'terms-generator'
];

const results = [];

for (const slug of subBatch2B) {
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

console.log('SUB-BATCH 2B STATUS:', JSON.stringify(results, null, 2));
