const fs = require('fs');
const path = require('path');
const { loadTS } = require('../tests/helpers/ts-loader.cjs');

const toolsPath = path.resolve(__dirname, '../src/data/tools.ts');
const { tools } = loadTS(toolsPath);

console.log(`=== RUNNING EXTENDED DEEP AUDIT ===\n`);

const issues = [];

// Audit 1: Description depth (EEAT depth)
tools.forEach(t => {
  if (!t.description || t.description.length < 80) {
    issues.push({ type: 'THIN_DESCRIPTION', slug: t.slug, detail: `Description is only ${(t.description || '').length} chars (recommended > 100)` });
  }
});

// Audit 2: Option choices completeness
tools.forEach(t => {
  (t.toolOptions || []).forEach(opt => {
    if (opt.type === 'select' && (!opt.choices || opt.choices.length === 0)) {
      issues.push({ type: 'SELECT_OPTION_NO_CHOICES', slug: t.slug, optionId: opt.id, detail: `Select option "${opt.id}" has no choices array.` });
    }
  });
});

// Audit 3: Category Slug Validity
const validCategorySlugs = new Set([
  'name-generators',
  'font-generators',
  'social-media-generators',
  'bio-generators',
  'seo-generators',
  'gaming-generators',
  'creative-generators',
  'ai-generators',
  'business-generators',
  'developer-tools',
  'utility-generators',
  'random-generators'
]);

tools.forEach(t => {
  if (!t.categorySlug || !validCategorySlugs.has(t.categorySlug)) {
    issues.push({ type: 'INVALID_CATEGORY_SLUG', slug: t.slug, categorySlug: t.categorySlug, detail: `Invalid or un-indexed categorySlug "${t.categorySlug}"` });
  }
});

console.log(`Found ${issues.length} additional extended issues:\n`);
console.log(JSON.stringify(issues, null, 2));
