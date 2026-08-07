const fs = require('fs');
const path = require('path');
const { loadTS } = require('../tests/helpers/ts-loader.cjs');

const toolsPath = path.resolve(__dirname, '../src/data/tools.ts');
const categoriesPath = path.resolve(__dirname, '../src/data/categories.ts');
const blogPath = path.resolve(__dirname, '../src/data/blog-posts.ts');

const { tools } = loadTS(toolsPath);
const { categories } = loadTS(categoriesPath);
const { blogPosts } = loadTS(blogPath);

const toolSlugsSet = new Set(tools.map(t => t.slug));
const categorySlugsSet = new Set(categories.map(c => c.slug));

const categoryNameToSlug = {
  'Name Generators': 'name-generators',
  'Font & Text Style Generators': 'text-font-generators',
  'Social Media & Tag Generators': 'social-media-tools',
  'SEO & Marketing Generators': 'seo-generators',
  'Business & Brand Generators': 'business-generators',
  'Business Generators': 'business-generators',
  'Gaming & Fantasy Generators': 'gaming-generators',
  'AI Text & Writing Generators': 'ai-writing-generators',
  'Bio & Caption Generators': 'bio-caption-generators',
  'Creative & Story Generators': 'creative-generators',
  'Utility Generators': 'utility-generators',
  'Random Generators': 'random-generators',
  'Developer & Web Generators': 'developer-generators'
};

const issues = {
  brokenCategorySlugs: [],
  truncatedMetaDesc: [],
  shortMetaTitle: [],
  longMetaTitle: [],
  duplicateMetaTitles: [],
  shortMetaDesc: [],
  longMetaDesc: [],
  duplicateMetaDesc: [],
  selfReferentialRelated: [],
  brokenRelatedSlugs: [],
  thinDescriptions: [],
  fewFaqs: [],
  thinFaqs: []
};

tools.forEach(t => {
  // Category Slug
  if (!categorySlugsSet.has(t.categorySlug)) {
    const expected = categoryNameToSlug[t.category] || 'utility-generators';
    issues.brokenCategorySlugs.push({ slug: t.slug, current: t.categorySlug, category: t.category, expected });
  }

  // Meta Title
  if (!t.metaTitle || t.metaTitle.length < 30) {
    issues.shortMetaTitle.push({ slug: t.slug, metaTitle: t.metaTitle, len: t.metaTitle ? t.metaTitle.length : 0 });
  } else if (t.metaTitle.length > 70) {
    issues.longMetaTitle.push({ slug: t.slug, metaTitle: t.metaTitle, len: t.metaTitle.length });
  }

  // Meta Description
  if (!t.metaDescription || t.metaDescription.length < 90) {
    issues.shortMetaDesc.push({ slug: t.slug, len: t.metaDescription ? t.metaDescription.length : 0 });
  } else if (t.metaDescription.length > 165) {
    issues.longMetaDesc.push({ slug: t.slug, len: t.metaDescription.length });
  }

  if (/\b(for|and|with|the|in|of|a|an)\.\s*$/i.test(t.metaDescription || '')) {
    issues.truncatedMetaDesc.push({ slug: t.slug, metaDescription: t.metaDescription });
  }

  // Related Slugs
  (t.relatedSlugs || []).forEach(rel => {
    if (rel === t.slug) {
      issues.selfReferentialRelated.push({ slug: t.slug, rel });
    } else if (!toolSlugsSet.has(rel)) {
      issues.brokenRelatedSlugs.push({ slug: t.slug, rel });
    }
  });

  // FAQs
  if (!t.faqItems || t.faqItems.length < 4) {
    issues.fewFaqs.push({ slug: t.slug, count: t.faqItems ? t.faqItems.length : 0 });
  }
});

console.log('=== DEEP BRUTAL ISSUES SUMMARY ===');
console.log('Broken Category Slugs:', issues.brokenCategorySlugs.length);
console.log('Truncated Meta Descriptions:', issues.truncatedMetaDesc.length);
console.log('Short Meta Titles (<30):', issues.shortMetaTitle.length);
console.log('Long Meta Titles (>70):', issues.longMetaTitle.length);
console.log('Short Meta Descriptions (<90):', issues.shortMetaDesc.length);
console.log('Long Meta Descriptions (>165):', issues.longMetaDesc.length);
console.log('Self-Referential Related Slugs:', issues.selfReferentialRelated.length);
console.log('Broken Related Slugs:', issues.brokenRelatedSlugs.length);
console.log('Few FAQs (<4):', issues.fewFaqs.length);

fs.writeFileSync(path.resolve(__dirname, 'deep_issues.json'), JSON.stringify(issues, null, 2));
