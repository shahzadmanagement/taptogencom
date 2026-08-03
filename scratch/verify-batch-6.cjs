const fs = require('fs');
const path = require('path');
const { loadTS } = require('../tests/helpers/ts-loader.cjs');

const toolsPath = path.resolve(__dirname, '../src/data/tools.ts');
const { tools } = loadTS(toolsPath);

const workspaceCode = fs.readFileSync(path.resolve(__dirname, '../src/scripts/tool-workspace.ts'), 'utf8');

const subBatch6A = [
  'html-code-generator',
  'css-code-generator',
  'short-code-generator',
  'sitemap-generator',
  'slug-generator',
  'token-generator',
  'jwt-generator',
  'api-key-generator',
  'pin-generator',
  'password-generator'
];

const subBatch6B = [
  'chatgpt-prompt-generator',
  'midjourney-prompt-generator',
  'dalle-prompt-generator',
  'qr-code-generator',
  'barcode-generator',
  'uuid-generator',
  'dummy-data-generator',
  'random-address-generator',
  'recovery-code-generator',
  'acceptable-use-policy-generator'
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

checkTools(subBatch6A, 'SUB-BATCH 6A');
checkTools(subBatch6B, 'SUB-BATCH 6B');
