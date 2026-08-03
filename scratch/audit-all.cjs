const fs = require('fs');
const path = require('path');
const { loadTS } = require('../tests/helpers/ts-loader.cjs');

const toolsPath = path.resolve(__dirname, '../src/data/tools.ts');
const { tools } = loadTS(toolsPath);

const workspaceCode = fs.readFileSync(path.resolve(__dirname, '../src/scripts/tool-workspace.ts'), 'utf8');

console.log(`Total tools in tools.ts: ${tools.length}`);

let totalOptions = 0;
let totalUnwired = 0;
let totalMissingHandlers = 0;
let totalFaqCount = 0;

tools.forEach(t => {
  const options = t.toolOptions || [];
  totalOptions += options.length;
  
  options.forEach(opt => {
    const isWired = workspaceCode.includes(`'${opt.id}'`) || workspaceCode.includes(`"${opt.id}"`);
    if (!isWired) {
      totalUnwired++;
      console.log(`Unwired option: ${t.slug} -> ${opt.id}`);
    }
  });

  const hasHandler = workspaceCode.includes(`case '${t.slug}':`);
  if (!hasHandler) {
    totalMissingHandlers++;
    console.log(`Missing handler: ${t.slug}`);
  }

  totalFaqCount += (t.faqItems || []).length;
});

console.log(`=== AUDIT SUMMARY ===`);
console.log(`Total Tools: ${tools.length}`);
console.log(`Total Configured Options: ${totalOptions}`);
console.log(`Total Unwired Options: ${totalUnwired}`);
console.log(`Total Missing Handlers: ${totalMissingHandlers}`);
console.log(`Average FAQs per Tool: ${(totalFaqCount / tools.length).toFixed(2)}`);
