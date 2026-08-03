const fs = require('fs');
const path = require('path');
const { loadTS } = require('../tests/helpers/ts-loader.cjs');

const toolsPath = path.resolve(__dirname, '../src/data/tools.ts');
const { tools } = loadTS(toolsPath);

const workspaceCode = fs.readFileSync(path.resolve(__dirname, '../src/scripts/tool-workspace.ts'), 'utf8');

const subBatch4A = [
  'bubble-text-generator',
  'fancy-text-generator',
  'cute-text-generator',
  'cursive-name-generator',
  'retro-text-generator',
  'typewriter-text-generator',
  'pixel-text-generator',
  'serif-generator',
  'papyrus-generator',
  'ransom-note-text-generator'
];

const subBatch4B = [
  'unicode-text-generator',
  'morse-code-generator',
  'invisible-text-generator',
  'glitch-text-generator',
  'vaporwave-text-generator',
  'strikethrough-text-generator',
  'underline-text-generator',
  'reverse-text-generator',
  'bold-text-generator',
  'italic-text-generator'
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

checkTools(subBatch4A, 'SUB-BATCH 4A');
checkTools(subBatch4B, 'SUB-BATCH 4B');
