const fs = require('fs');
const path = require('path');

const filePath = path.resolve(__dirname, '../src/data/tools.ts');
const content = fs.readFileSync(filePath, 'utf8');

const lines = content.split('\n');
const newLines = [];

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  
  // If next line starts a new tool object with `slug:` or `  {` or `relatedSlugs:` and current line doesn't end with `},` or `}`
  const nextLine = lines[i + 1] || '';
  if (nextLine.trim().startsWith('slug:') || (nextLine.trim() === '{' || nextLine.trim().startsWith('{ slug:'))) {
    if (!line.trim().endsWith('},') && !line.trim().endsWith('}')) {
      newLines.push(line);
      newLines.push('  },');
      continue;
    }
  }
  newLines.push(line);
}

fs.writeFileSync(filePath, newLines.join('\n'), 'utf8');
console.log('Restored tool object closing braces in tools.ts');
