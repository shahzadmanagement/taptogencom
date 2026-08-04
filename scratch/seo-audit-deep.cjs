const fs = require('fs');
const path = require('path');
const { loadTS } = require('../tests/helpers/ts-loader.cjs');

const toolsPath = path.resolve(__dirname, '../src/data/tools.ts');
const { tools } = loadTS(toolsPath);

console.log(`=== RUNNING UNCOMPROMISING DEEP SEO AUDIT ON ALL ${tools.length} TOOLS ===\n`);

const seoIssues = [];

// 1. Meta Title Length & Duplicates
const metaTitleMap = new Map();
tools.forEach(t => {
  const title = (t.metaTitle || '').trim();
  if (!title) {
    seoIssues.push({ type: 'MISSING_META_TITLE', slug: t.slug, detail: 'Meta title is completely missing.' });
  } else {
    if (title.length > 60) {
      seoIssues.push({ type: 'META_TITLE_TOO_LONG', slug: t.slug, detail: `Meta title is ${title.length} chars (recommended max 60): "${title}"` });
    }
    if (title.length < 25) {
      seoIssues.push({ type: 'META_TITLE_TOO_SHORT', slug: t.slug, detail: `Meta title is ${title.length} chars (recommended min 25): "${title}"` });
    }
    if (metaTitleMap.has(title)) {
      seoIssues.push({ type: 'DUPLICATE_META_TITLE', slug: t.slug, detail: `Duplicate meta title shared with ${metaTitleMap.get(title)}` });
    } else {
      metaTitleMap.set(title, t.slug);
    }
  }
});

// 2. Meta Description Length & Duplicates
const metaDescMap = new Map();
tools.forEach(t => {
  const desc = (t.metaDescription || '').trim();
  if (!desc) {
    seoIssues.push({ type: 'MISSING_META_DESC', slug: t.slug, detail: 'Meta description is completely missing.' });
  } else {
    if (desc.length > 160) {
      seoIssues.push({ type: 'META_DESC_TOO_LONG', slug: t.slug, detail: `Meta description is ${desc.length} chars (recommended max 160): "${desc}"` });
    }
    if (desc.length < 70) {
      seoIssues.push({ type: 'META_DESC_TOO_SHORT', slug: t.slug, detail: `Meta description is ${desc.length} chars (recommended min 70): "${desc}"` });
    }
    if (metaDescMap.has(desc)) {
      seoIssues.push({ type: 'DUPLICATE_META_DESC', slug: t.slug, detail: `Duplicate meta description shared with ${metaDescMap.get(desc)}` });
    } else {
      metaDescMap.set(desc, t.slug);
    }
  }
});

// 3. Related Slugs Validity Audit
const allSlugs = new Set(tools.map(t => t.slug));
tools.forEach(t => {
  const related = t.relatedSlugs || [];
  if (related.length < 3) {
    seoIssues.push({ type: 'THIN_RELATED_LINKS', slug: t.slug, detail: `Tool has only ${related.length} related links (recommended >= 3 for internal linking)` });
  }
  related.forEach(relSlug => {
    if (!allSlugs.has(relSlug)) {
      seoIssues.push({ type: 'BROKEN_RELATED_LINK', slug: t.slug, detail: `Related link slug "${relSlug}" does not exist in tools.ts` });
    }
  });
});

// 4. Secondary Keywords Audit
tools.forEach(t => {
  const sec = t.secondaryKeywords || [];
  if (sec.length < 3) {
    seoIssues.push({ type: 'THIN_SECONDARY_KEYWORDS', slug: t.slug, detail: `Tool has only ${sec.length} secondary keywords (recommended >= 3 for LSI depth)` });
  }
});

console.log(`SEO Audit Complete. Found ${seoIssues.length} issues:\n`);
console.log(JSON.stringify(seoIssues, null, 2));
