const fs = require('fs');
const path = require('path');
const { loadTS } = require('../tests/helpers/ts-loader.cjs');

const filePath = path.resolve(__dirname, '../src/data/tools.ts');
let content = fs.readFileSync(filePath, 'utf8');
const { tools } = loadTS(filePath);

let fixCount = 0;

tools.forEach(tool => {
  if (tool.toolOptions && Array.isArray(tool.toolOptions)) {
    tool.toolOptions.forEach(opt => {
      if (opt.default === undefined || opt.default === null) {
        let defaultValue = '';
        if (opt.type === 'select' && opt.options && opt.options.length > 0) {
          defaultValue = opt.options[0].value;
        } else if (opt.type === 'number') {
          defaultValue = opt.min !== undefined ? opt.min : 5;
        } else if (opt.type === 'checkbox') {
          defaultValue = false;
        }
        
        if (defaultValue !== '') {
          // Replace option in content
          const optIdEscaped = opt.id.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&');
          const optRegex = new RegExp(`({\\s*id:\\s*['"\`]${optIdEscaped}['"\`][^}]+)`, 'g');
          content = content.replace(optRegex, (match) => {
            if (!match.includes('default:')) {
              fixCount++;
              return match.replace(`id: '${opt.id}',`, `id: '${opt.id}', default: ${JSON.stringify(defaultValue)},`);
            }
            return match;
          });
        }
      }
    });
  }
});

fs.writeFileSync(filePath, content, 'utf8');
console.log(`Batch 1 Fix Complete. Added default values to ${fixCount} tool options.`);
