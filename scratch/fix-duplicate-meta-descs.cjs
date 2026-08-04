const fs = require('fs');
const path = require('path');
const { loadTS } = require('../tests/helpers/ts-loader.cjs');

const filePath = path.resolve(__dirname, '../src/data/tools.ts');
let content = fs.readFileSync(filePath, 'utf8');
const { tools } = loadTS(filePath);

const seen = new Map();
let fixCount = 0;

tools.forEach(t => {
  const desc = (t.metaDescription || '').trim();
  if (seen.has(desc)) {
    // Generate a unique meta description for this tool
    const newDesc = `Generate ${t.name.toLowerCase()} ideas, custom options, and instant outputs. Free online ${t.name.toLowerCase()} tool.`;
    
    // Replace exact occurrence in content
    const escapedDesc = desc.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&');
    const regex = new RegExp(`(slug:\\s*'${t.slug}'[\\s\\S]*?metaDescription:\\s*['"\`])${escapedDesc}(['"\`])`, 'm');
    if (regex.test(content)) {
      content = content.replace(regex, `$1${newDesc}$2`);
      fixCount++;
    } else {
      console.log(`Could not replace duplicate desc for ${t.slug}`);
    }
  } else {
    seen.set(desc, t.slug);
  }
});

fs.writeFileSync(filePath, content, 'utf8');
console.log(`Successfully resolved ${fixCount} duplicate meta descriptions.`);
