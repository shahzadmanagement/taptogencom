const fs = require('fs');
const path = require('path');

const filePath = path.resolve(__dirname, '../src/data/tools.ts');
const content = fs.readFileSync(filePath, 'utf8');

const lines = content.split('\n');
const newLines = lines.map(line => {
  if (line.includes('toolOptions:') && line.includes('"options":') && line.endsWith('],')) {
    // If line has single `[` open and missing `}]`
    const opens = (line.match(/\[/g) || []).length;
    const closes = (line.match(/\]/g) || []).length;
    if (opens > closes) {
      return line.replace(/\],$/, '}], "id": "opt-style", "label": "Style", "default": "default"}],');
    }
  }
  return line;
});

fs.writeFileSync(filePath, newLines.join('\n'), 'utf8');
console.log('Fixed unclosed single-line toolOptions in tools.ts');
