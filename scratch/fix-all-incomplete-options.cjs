const fs = require('fs');
const path = require('path');

const filePath = path.resolve(__dirname, '../src/data/tools.ts');
let content = fs.readFileSync(filePath, 'utf8');

const lines = content.split('\n');
const fixedLines = lines.map(line => {
  if (line.includes('toolOptions:')) {
    line = line.replace(/\[\{"type":"checkbox","default":true\],/g, '[{"type":"checkbox","id":"opt-enable","label":"Enable Option","default":true}],');
    line = line.replace(/\[\{"type":"checkbox","default":false\],/g, '[{"type":"checkbox","id":"opt-enable","label":"Enable Option","default":false}],');
    line = line.replace(/\[\{"type":"number"\],/g, '[{"type":"number","id":"opt-count","label":"Count","default":5,"min":1,"max":10}],');
  }
  return line;
});

fs.writeFileSync(filePath, fixedLines.join('\n'), 'utf8');
console.log('Fixed incomplete options in tools.ts');
