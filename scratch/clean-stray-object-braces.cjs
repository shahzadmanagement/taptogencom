const fs = require('fs');
const path = require('path');

const filePath = path.resolve(__dirname, '../src/data/tools.ts');
const content = fs.readFileSync(filePath, 'utf8');

const lines = content.split('\n');
const newLines = [];

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  const nextLine = lines[i + 1] || '';
  
  if (line.trim() === '},' && (nextLine.trim() === '{' || nextLine.trim().startsWith('{ q:') || nextLine.trim().startsWith('{"q":'))) {
    // Skip stray closing brace before array item
    continue;
  }
  newLines.push(line);
}

fs.writeFileSync(filePath, newLines.join('\n'), 'utf8');
console.log('Cleaned stray braces in tools.ts');
