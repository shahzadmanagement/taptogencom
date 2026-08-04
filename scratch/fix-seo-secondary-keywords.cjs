const fs = require('fs');
const path = require('path');
const { loadTS } = require('../tests/helpers/ts-loader.cjs');

const toolsFilePath = path.resolve(__dirname, '../src/data/tools.ts');
let content = fs.readFileSync(filePath = toolsFilePath, 'utf8');

const { tools } = loadTS(toolsFilePath);

let fixedCount = 0;

tools.forEach(t => {
  const sec = t.secondaryKeywords || [];
  if (sec.length < 3) {
    const slugName = t.name || t.slug.replace(/-/g, ' ');
    const kw = t.primaryKeyword || slugName.toLowerCase();
    
    const extra1 = `${kw} online`;
    const extra2 = `free ${kw}`;
    const extra3 = `${t.category ? t.category.toLowerCase() : 'online tool'} helper`;
    
    const newSec = Array.from(new Set([...sec, extra1, extra2, extra3])).slice(0, 4);
    
    const slugRegex = new RegExp(`(slug:\\s*'${t.slug}'[\\s\\S]*?secondaryKeywords:\\s*\\[)([^\\]]*)(\\])`, 'm');
    const match = content.match(slugRegex);
    if (match) {
      const formatted = newSec.map(s => `'${s.replace(/'/g, "\\'")}'`).join(', ');
      content = content.replace(match[0], `${match[1]}${formatted}${match[3]}`);
      fixedCount++;
    }
  }
});

fs.writeFileSync(toolsFilePath, content, 'utf8');
console.log(`Successfully augmented secondary keywords for ${fixedCount} tools.`);
