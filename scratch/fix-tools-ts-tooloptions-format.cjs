const fs = require('fs');
const path = require('path');

const filePath = path.resolve(__dirname, '../src/data/tools.ts');
let content = fs.readFileSync(filePath, 'utf8');

// Replace `}}]],` with `}], id: 'opt-style', label: 'Style', default: 'personal' }],` if missing id
content = content.replace(/\}\}\]\];/g, '}]}]');
content = content.replace(/\}\}\]\],/g, '}], "id": "option-type", "label": "Option Type", "default": "default"}]],');

fs.writeFileSync(filePath, content, 'utf8');
console.log('Fixed tooloptions format in tools.ts');
