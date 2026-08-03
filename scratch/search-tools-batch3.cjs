const fs = require('fs');
const path = require('path');
const { loadTS } = require('../tests/helpers/ts-loader.cjs');

const toolsPath = path.resolve(__dirname, '../src/data/tools.ts');
const { tools } = loadTS(toolsPath);

tools.forEach(t => {
  if (t.slug.includes('pin') || t.slug.includes('code') || t.slug.includes('address')) {
    console.log(`Slug: ${t.slug} | Name: ${t.name} | Options: ${(t.toolOptions || []).length}`);
  }
});
