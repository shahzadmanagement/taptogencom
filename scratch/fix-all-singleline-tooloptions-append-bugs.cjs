const fs = require('fs');
const path = require('path');

const filePath = path.resolve(__dirname, '../src/data/tools.ts');
let content = fs.readFileSync(filePath, 'utf8');

const lines = content.split('\n');
const newLines = lines.map(line => {
  if (line.includes('toolOptions: [')) {
    let optStr = line.substring(line.indexOf('toolOptions:') + 12).trim();
    if (optStr.endsWith(',')) optStr = optStr.slice(0, -1).trim();
    
    // Find the ending bracket of the first valid JSON array
    let depth = 0;
    let endIdx = -1;
    for (let i = 0; i < optStr.length; i++) {
      if (optStr[i] === '[') depth++;
      else if (optStr[i] === ']') {
        depth--;
        if (depth === 0) {
          endIdx = i;
          break;
        }
      }
    }
    
    if (endIdx !== -1) {
      const validArrayStr = optStr.substring(0, endIdx + 1);
      try {
        JSON.parse(validArrayStr);
        return `    toolOptions: ${validArrayStr},`;
      } catch (e) {
        // Fallback
        return `    toolOptions: [],`;
      }
    }
  }
  return line;
});

fs.writeFileSync(filePath, newLines.join('\n'), 'utf8');
console.log('Cleaned all toolOptions append bugs in tools.ts');
