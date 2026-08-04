const fs = require('fs');
const path = require('path');

const filePath = path.resolve(__dirname, '../src/data/tools.ts');
const content = fs.readFileSync(filePath, 'utf8');

const lines = content.split('\n');
const newLines = [];
let skipping = false;

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  const prevLine = newLines[newLines.length - 1] || '';
  
  if (prevLine.includes('toolOptions:') && prevLine.includes('],')) {
    // If previous line defined toolOptions completely on single line, skip leftover lines until outputFormat or faqItems
    if (line.trim().startsWith('id:') || line.trim().startsWith('label:') || line.trim().startsWith('default:') || line.trim().startsWith('min:') || line.trim().startsWith('max:') || line.trim() === '},' || line.trim() === '{' || line.trim() === '],') {
      continue;
    }
  }
  newLines.push(line);
}

fs.writeFileSync(filePath, newLines.join('\n'), 'utf8');
console.log('Fixed leftover option lines in tools.ts');
