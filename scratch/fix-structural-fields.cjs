const fs = require('fs');
const path = require('path');
const { loadTS } = require('../tests/helpers/ts-loader.cjs');

const filePath = path.resolve(__dirname, '../src/data/tools.ts');
let content = fs.readFileSync(filePath, 'utf8');
const { tools } = loadTS(filePath);

let fixCount = 0;

tools.forEach(t => {
  let modified = false;
  let addition = '';

  if (!t.toolOptions) {
    addition += `\n    toolOptions: [],`;
    modified = true;
  }

  if (!t.outputFormat) {
    const fmt = t.slug.includes('code') || t.slug.includes('html') || t.slug.includes('css') ? 'code' : (t.slug.includes('policy') || t.slug.includes('generator') && (t.slug.includes('text') || t.slug.includes('bio') || t.slug.includes('prompt')) ? 'text' : 'list');
    addition += `\n    outputFormat: '${fmt}',`;
    modified = true;
  }

  if (modified) {
    const slugRegex = new RegExp(`(slug:\\s*'${t.slug}'[\\s\\S]*?)(faqItems:|relatedSlugs:)`, 'm');
    const match = content.match(slugRegex);
    if (match) {
      content = content.replace(match[0], `${match[1]}${addition.trim()}\n    ${match[2]}`);
      fixCount++;
    } else {
      console.log(`Could not match location for ${t.slug}`);
    }
  }
});

fs.writeFileSync(filePath, content, 'utf8');
console.log(`Successfully fixed structural fields for ${fixCount} tools.`);
