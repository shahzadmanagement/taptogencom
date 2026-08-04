const fs = require('fs');
const path = require('path');

const filePath = path.resolve(__dirname, '../src/data/tools.ts');
let content = fs.readFileSync(filePath, 'utf8');

// Replace `toolOptions: [], "id": ...` with `toolOptions: []`
content = content.replace(/toolOptions:\s*\[\s*\]\s*,?\s*"id":[\s\S]*?\](?=,?\s*\n\s*outputFormat)/g, 'toolOptions: []');

// Replace `toolOptions: [..."id": "option-type"...]` with valid array JSON
content = content.replace(/toolOptions:\s*\[[\s\S]*?("id":\s*"option-type"|"id":\s*"opt-style"|"id":\s*"opt-enable"|"id":\s*"opt-count")[\s\S]*?\](?=,?\s*\n\s*outputFormat)/g, (match) => {
  if (match.includes('toolOptions: [],')) return match;
  // If it's broken single line, fix it or revert to clean array
  try {
    const jsonStr = match.replace(/toolOptions:\s*/, '').trim();
    JSON.parse(jsonStr);
    return match;
  } catch (e) {
    return 'toolOptions: []';
  }
});

fs.writeFileSync(filePath, content, 'utf8');
console.log('Fixed invalid toolOptions line artifacts in tools.ts');
