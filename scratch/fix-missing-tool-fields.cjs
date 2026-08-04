const fs = require('fs');
const path = require('path');
const { loadTS } = require('../tests/helpers/ts-loader.cjs');

const filePath = path.resolve(__dirname, '../src/data/tools.ts');
let content = fs.readFileSync(filePath, 'utf8');
const { tools } = loadTS(filePath);

let fixCount = 0;

tools.forEach(tool => {
  if (!tool.description || !tool.tagline) {
    fixCount++;
    const slugRegex = new RegExp(`(slug:\\s*['"\`]${tool.slug}['"\`][\\s\\S]*?)(toolOptions:|faqItems:|outputFormat:)`, 'm');
    const fallbackTagline = `Generate tailored ${tool.name.toLowerCase()} options with custom style filters, format controls, and instant copy/export options.`;
    const fallbackDescription = `Use ${tool.name} to generate tailored ${tool.name.toLowerCase()} options with custom style filters, format controls, and instant copy/export options. Review, edit, and adapt results before use.`;
    
    let addedFields = '';
    if (!tool.tagline) addedFields += `\n    tagline: ${JSON.stringify(fallbackTagline)},`;
    if (!tool.description) addedFields += `\n    description: ${JSON.stringify(fallbackDescription)},`;
    
    content = content.replace(slugRegex, `$1${addedFields}\n    $2`);
  }
});

fs.writeFileSync(filePath, content, 'utf8');
console.log(`Fixed missing tool fields for ${fixCount} tools in tools.ts`);
