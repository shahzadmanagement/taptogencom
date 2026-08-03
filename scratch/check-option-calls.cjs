const fs = require('fs');
const content = fs.readFileSync('src/scripts/tool-workspace.ts', 'utf8');

const matches = content.match(/option[A-Za-z0-9_]*\(.*?\)/g) || [];
const unique = [...new Set(matches.map(m => m.split('(')[0]))];
console.log('Option function calls:', unique);
