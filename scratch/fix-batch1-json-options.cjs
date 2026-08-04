const fs = require('fs');
const path = require('path');
const { loadTS } = require('../tests/helpers/ts-loader.cjs');

const filePath = path.resolve(__dirname, '../src/data/tools.ts');
let content = fs.readFileSync(filePath, 'utf8');
const { tools } = loadTS(filePath);

let fixCount = 0;

tools.forEach(tool => {
  if (tool.toolOptions && Array.isArray(tool.toolOptions)) {
    let modified = false;
    const updatedOptions = tool.toolOptions.map(opt => {
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
          fixCount++;
          modified = true;
          return { ...opt, default: defaultValue };
        }
      }
      return opt;
    });

    if (modified) {
      // Find the toolOptions line for this slug in content
      const slugRegex = new RegExp(`(slug:\\s*['"\`]${tool.slug}['"\`][\\s\\S]*?toolOptions:\\s*)([^,\\n]+|\\[[\\s\\S]*?\\])(,)`, 'm');
      const match = content.match(slugRegex);
      if (match) {
        content = content.replace(slugRegex, `$1${JSON.stringify(updatedOptions)}$3`);
      }
    }
  }
});

fs.writeFileSync(filePath, content, 'utf8');
console.log(`Batch 1 JSON Fix Complete. Added default values to ${fixCount} tool options.`);
