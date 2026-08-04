const fs = require('fs');
const path = require('path');

const filePath = path.resolve(__dirname, '../src/data/tools.ts');
let content = fs.readFileSync(filePath, 'utf8');

const lines = content.split('\n');
const fixedLines = lines.map(line => {
  if (line.includes('toolOptions:')) {
    // If it ends with `]]],` or `]]],` fix to `}],` or `[]`
    line = line.replace(/\]\]\]+,?/g, '}],');
    line = line.replace(/\]\],/g, '],');
    // Ensure every `[{"type":"select","options":[{...}]]` becomes `[{"type":"select","options":[{...}], "id": "select-opt", "label": "Option", "default": "default"}]`
    if (line.includes('"options":') && !line.includes('"id":')) {
      line = line.replace(/\]\],/g, '}], "id": "style-opt", "label": "Style", "default": "default"}],');
    }
  }
  return line;
});

fs.writeFileSync(filePath, fixedLines.join('\n'), 'utf8');
console.log('Fixed all toolOptions line syntax in tools.ts');
