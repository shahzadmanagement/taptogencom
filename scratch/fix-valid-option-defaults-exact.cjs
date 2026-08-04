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
    // Remove dummy injected options with id: 'option-type' or id: 'opt-style' if default === 'default'
    let cleanOptions = tool.toolOptions.filter(opt => {
      if ((opt.id === 'option-type' || opt.id === 'opt-style' || opt.id === 'opt-enable' || opt.id === 'opt-count') && opt.default === 'default') {
        modified = true;
        return false;
      }
      return true;
    });

    // Fix default values to be inside opt.options[].value
    cleanOptions = cleanOptions.map(opt => {
      if (opt.type === 'select' && opt.options && opt.options.length > 0) {
        const validValues = opt.options.map(o => o.value);
        if (!validValues.includes(String(opt.default))) {
          fixCount++;
          modified = true;
          return { ...opt, default: opt.options[0].value };
        }
      }
      return opt;
    });

    if (modified) {
      // Find tool entry block by slug
      const escapedSlug = tool.slug.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&');
      const slugRegex = new RegExp(`(slug:\\s*['"\`]${escapedSlug}['"\`][\\s\\S]*?toolOptions:\\s*)\\[[\\s\\S]*?\\](\\s*,)`, 'm');
      if (slugRegex.test(content)) {
        content = content.replace(slugRegex, `$1${JSON.stringify(cleanOptions)}$2`);
      }
    }
  }
});

fs.writeFileSync(filePath, content, 'utf8');
console.log(`Fixed valid option defaults for ${fixCount} options in tools.ts`);
