const fs = require('fs');
const path = require('path');

const filePath = path.resolve(__dirname, '../src/data/tools.ts');
let content = fs.readFileSync(filePath, 'utf8');

// Fix duplicate options insertion on line 203
content = content.replace(/"emoji-level","label":"Emoji Level","default":"light"}\],"options":\[[\s\S]*?\],"options":\[[\s\S]*?default":"light"}\]/g, '"emoji-level","label":"Emoji Level","default":"light"}]');
content = content.replace(/"emoji-level","label":"Emoji Level","default":"light"}\],"options":\[[\s\S]*?default":"light"}\]/g, '"emoji-level","label":"Emoji Level","default":"light"}]');

fs.writeFileSync(filePath, content, 'utf8');
console.log('Cleaned syntax in tools.ts');
