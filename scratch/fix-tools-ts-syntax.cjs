const fs = require('fs');
const path = require('path');

const filePath = path.resolve(__dirname, '../src/data/tools.ts');
let content = fs.readFileSync(filePath, 'utf8');

// Fix duplicate options array tail insertions
content = content.replace(/\]\],"options":\[[\s\S]*?\]\],"options":\[[\s\S]*?\]/g, ']]');
content = content.replace(/\]\],"options":\[[\s\S]*?\]/g, ']]');

// Remove duplicate disclaimer lines inside tool objects
const lines = content.split('\n');
const cleanedLines = [];
let insideObject = false;
let seenDisclaimer = false;

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  if (line.includes("slug: '") || line.includes('slug: "')) {
    seenDisclaimer = false;
  }
  if (line.trim().startsWith('disclaimer:')) {
    if (seenDisclaimer) {
      continue; // Skip duplicate disclaimer
    }
    seenDisclaimer = true;
  }
  cleanedLines.push(line);
}

fs.writeFileSync(filePath, cleanedLines.join('\n'), 'utf8');
console.log('Fixed tools.ts syntax completely.');
