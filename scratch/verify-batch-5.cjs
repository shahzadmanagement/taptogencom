const fs = require('fs');
const path = require('path');
const { loadTS } = require('../tests/helpers/ts-loader.cjs');

const toolsPath = path.resolve(__dirname, '../src/data/tools.ts');
const { tools } = loadTS(toolsPath);

const workspaceCode = fs.readFileSync(path.resolve(__dirname, '../src/scripts/tool-workspace.ts'), 'utf8');

const subBatch5A = [
  'instagram-bio-generator',
  'twitter-bio-generator',
  'tiktok-bio-generator',
  'linkedin-headline-generator',
  'youtube-name-generator',
  'tiktok-name-generator',
  'instagram-name-generator',
  'twitter-name-generator',
  'display-name-generator',
  'funny-name-generator'
];

const subBatch5B = [
  'instagram-caption-generator',
  'tiktok-caption-generator',
  'youtube-description-generator',
  'linkedin-post-generator',
  'x-post-generator',
  'facebook-post-generator',
  'youtube-hook-generator',
  'comeback-generator',
  'roast-generator',
  'shakespeare-insult-generator'
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

checkTools(subBatch5A, 'SUB-BATCH 5A');
checkTools(subBatch5B, 'SUB-BATCH 5B');
