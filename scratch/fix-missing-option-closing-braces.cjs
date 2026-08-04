const fs = require('fs');
const path = require('path');

const filePath = path.resolve(__dirname, '../src/data/tools.ts');
const content = fs.readFileSync(filePath, 'utf8');

const lines = content.split('\n');
const newLines = [];

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  const nextLine = lines[i + 1] || '';
  
  if ((line.trim().startsWith('max:') || line.trim().startsWith('default:') || line.trim().startsWith('label:')) && nextLine.trim() === '{') {
    newLines.push(line);
    newLines.push('      },');
    continue;
  }
  newLines.push(line);
}

fs.writeFileSync(filePath, newLines.join('\n'), 'utf8');
console.log('Fixed missing option closing braces in tools.ts');
