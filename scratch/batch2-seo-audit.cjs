const fs = require('fs');
const path = require('path');
const { loadTS } = require('../tests/helpers/ts-loader.cjs');

const toolsPath = path.resolve(__dirname, '../src/data/tools.ts');
const { tools } = loadTS(toolsPath);

console.log(`=== BATCH 2: ADVANCED TECHNICAL SEO & SCHEMA AUDIT ===\n`);

const seoIssues = [];

// 1. Audit Meta Titles & Descriptions across all 430 tools
tools.forEach(tool => {
  if (!tool.metaTitle || tool.metaTitle.length < 20) {
    seoIssues.push({ type: 'SHORT_META_TITLE', slug: tool.slug, detail: `Meta title is under 20 chars (${(tool.metaTitle || '').length}).` });
  }
  if (!tool.metaDescription || tool.metaDescription.length < 50) {
    seoIssues.push({ type: 'SHORT_META_DESCRIPTION', slug: tool.slug, detail: `Meta description is under 50 chars (${(tool.metaDescription || '').length}).` });
  }
  if (!tool.primaryKeyword) {
    seoIssues.push({ type: 'MISSING_PRIMARY_KEYWORD', slug: tool.slug, detail: 'Tool missing primaryKeyword field.' });
  }
});

// 2. Audit BaseLayout for OpenGraph, Twitter Cards, & Canonical Tags
const layoutPath = path.resolve(__dirname, '../theme/layouts/BaseLayout.astro');
if (fs.existsSync(layoutPath)) {
  const content = fs.readFileSync(layoutPath, 'utf8');
  if (!content.includes('og:image')) {
    seoIssues.push({ type: 'MISSING_OG_IMAGE_TAG', detail: 'BaseLayout.astro missing og:image meta tag.' });
  }
  if (!content.includes('twitter:card')) {
    seoIssues.push({ type: 'MISSING_TWITTER_CARD_TAG', detail: 'BaseLayout.astro missing twitter:card meta tag.' });
  }
  if (!content.includes('rel="canonical"')) {
    seoIssues.push({ type: 'MISSING_CANONICAL_TAG', detail: 'BaseLayout.astro missing rel="canonical" tag.' });
  }
}

console.log(`Batch 2 Technical SEO Audit Complete. Found ${seoIssues.length} issues:\n`);
console.log(JSON.stringify(seoIssues, null, 2));
