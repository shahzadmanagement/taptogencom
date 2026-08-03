const fs = require('fs');
const path = require('path');
const { loadTS } = require('../tests/helpers/ts-loader.cjs');

const toolsPath = path.resolve(__dirname, '../src/data/tools.ts');
const { tools } = loadTS(toolsPath);

const workspaceCode = fs.readFileSync(path.resolve(__dirname, '../src/scripts/tool-workspace.ts'), 'utf8');

const subBatch3A = [
  'password-generator',
  'lorem-ipsum-generator',
  'text-case-converter',
  'word-counter',
  'qr-code-text-generator',
  'dummy-data-generator',
  'color-palette-generator-from-name',
  'short-code-generator',
  'name-pronunciation-generator',
  'phonetic-spelling-of-name-generator'
];

const subBatch3B = [
  'random-number-generator',
  'coin-flip',
  'dice-roller',
  'secret-santa-name-generator',
  'color-palette-generator',
  'random-address-generator',
  'pin-generator',
  'api-key-generator',
  'recovery-code-generator'
];

function checkTools(toolList, batchName) {
  const results = [];
  for (const slug of toolList) {
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
  console.log(`=== ${batchName} STATUS ===`);
  console.log(JSON.stringify(results, null, 2));
}

checkTools(subBatch3A, 'SUB-BATCH 3A');
checkTools(subBatch3B, 'SUB-BATCH 3B');
