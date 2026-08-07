const fs = require('fs');
const path = require('path');
const { loadTS } = require('../tests/helpers/ts-loader.cjs');

const toolsPath = path.resolve(__dirname, '../src/data/tools.ts');
let content = fs.readFileSync(toolsPath, 'utf8');
const { tools } = loadTS(toolsPath);

let count = 0;
tools.forEach(t => {
  if (t.relatedSlugs && t.relatedSlugs.includes(t.slug)) {
    const oldArrStr = JSON.stringify(t.relatedSlugs);
    const newArr = t.relatedSlugs.filter(r => r !== t.slug);
    const newArrStr = JSON.stringify(newArr);
    
    // Convert to formatted string or search exact pattern in content
    const targetSubstring = `"slug": "${t.slug}"`;
    const targetIdx = content.indexOf(targetSubstring);
    if (targetIdx !== -1) {
      const nextRelatedIdx = content.indexOf('"relatedSlugs":', targetIdx);
      const closeBracketIdx = content.indexOf(']', nextRelatedIdx);
      if (nextRelatedIdx !== -1 && closeBracketIdx !== -1) {
        const oldBlock = content.slice(nextRelatedIdx, closeBracketIdx + 1);
        const formattedNewArr = newArr.map(s => `\n      "${s}"`).join(',');
        const newBlock = `"relatedSlugs": [${formattedNewArr}\n    ]`;
        content = content.slice(0, nextRelatedIdx) + newBlock + content.slice(closeBracketIdx + 1);
        count++;
      }
    }
  }
});

fs.writeFileSync(toolsPath, content, 'utf8');
console.log(`Cleaned ${count} self-referential relatedSlugs.`);
