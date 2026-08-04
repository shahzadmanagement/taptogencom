const fs = require('fs');
const path = require('path');

const filePath = path.resolve(__dirname, '../src/data/tools.ts');
let content = fs.readFileSync(filePath, 'utf8');

// Replace stray `{ \n }, \n slug:` with `  }, \n  { \n    slug:`
content = content.replace(/\s*\{\s*\}\s*,?\s*slug:/g, '\n  },\n  {\n    slug:');
content = content.replace(/relatedSlugs:[^\n]+\n\s*\{\s*\}\s*slug:/g, (match) => {
  return match.replace(/relatedSlugs:([^\n]+)\n\s*\{\s*\}\s*slug:/, 'relatedSlugs:$1\n  },\n  {\n    slug:');
});

fs.writeFileSync(filePath, content, 'utf8');
console.log('Cleaned tool object boundaries in tools.ts');
