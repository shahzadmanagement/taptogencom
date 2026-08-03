const fs = require('fs');
const { loadTS } = require('../tests/helpers/ts-loader.cjs');
const { tools } = loadTS('src/data/tools.ts');

const techCategoryTools = tools.filter(t => t.categorySlug === 'developer-tools' || t.category === 'Developer Tools' || t.slug.includes('code') || t.slug.includes('generator'));
console.log(techCategoryTools.map(t => ({ slug: t.slug, name: t.name, category: t.category })));
