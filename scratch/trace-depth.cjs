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
  const oldDepth = depth;
  depth += (opens - closes);
  
  if (line.trim().startsWith('slug:')) {
    console.log(`Line ${i + 1} (${line.trim()}): depth went from ${oldDepth} to ${depth}`);
    if (depth > 2) {
      // Print preceding 5 lines
      for (let j = Math.max(0, i - 5); j <= i; j++) {
        console.log(`  [${j + 1}] ${lines[j]}`);
      }
      break;
    }
  }
}
