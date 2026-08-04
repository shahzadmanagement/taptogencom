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
          defaultValue = typeof opt.min === 'number' ? opt.min : 5;
        } else if (opt.type === 'checkbox') {
          defaultValue = false;
        }
        
        if (defaultValue !== '') {
          // Exact string match for id: 'opt.id'
          const targetStr = `id: '${opt.id}',`;
          const targetDoubleStr = `id: "${opt.id}",`;
          const replacementStr = `id: '${opt.id}', default: ${JSON.stringify(defaultValue)},`;
          
          if (content.includes(targetStr)) {
            content = content.replace(targetStr, replacementStr);
            fixCount++;
          } else if (content.includes(targetDoubleStr)) {
            content = content.replace(targetDoubleStr, replacementStr);
            fixCount++;
          }
        }
      }
    });
  }
});

fs.writeFileSync(filePath, content, 'utf8');
console.log(`Batch 1 TS Fix Complete. Added default values to ${fixCount} tool options.`);
