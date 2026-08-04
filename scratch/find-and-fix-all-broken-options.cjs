const fs = require('fs');
const path = require('path');

const filePath = path.resolve(__dirname, '../src/data/tools.ts');
let content = fs.readFileSync(filePath, 'utf8');

const lines = content.split('\n');
let fixCount = 0;

const fixedLines = lines.map(line => {
  if (line.includes('toolOptions:') && line.includes('"options":') && !line.includes('"id":')) {
    // Replace `}}],` or `}}],` with `}],"id":"opt-style","label":"Style","default":"default"}]`
    fixCount++;
    return line.replace(/\}\}\],?/g, '}], "id": "opt-style", "label": "Style", "default": "default"}],');
  }
  return line;
});

fs.writeFileSync(filePath, fixedLines.join('\n'), 'utf8');
console.log(`Fixed ${fixCount} broken toolOptions lines in tools.ts`);
