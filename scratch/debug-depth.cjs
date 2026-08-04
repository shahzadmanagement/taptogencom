const fs = require('fs');
const path = require('path');

const filePath = path.resolve(__dirname, '../src/data/tools.ts');
const content = fs.readFileSync(filePath, 'utf8');

const lines = content.split('\n');
let depth = 0;

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  const opens = (line.match(/\{/g) || []).length;
  const closes = (line.match(/\}/g) || []).length;
  depth += (opens - closes);
  if (line.trim().startsWith('slug:')) {
    if (depth !== 2) {
      console.log(`Line ${i + 1} (slug: ${line.trim()}): depth is ${depth} (expected 2)`);
    }
  }
}
