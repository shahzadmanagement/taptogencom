const fs = require('fs');
const path = require('path');
const { loadTS } = require('../tests/helpers/ts-loader.cjs');

const toolsPath = path.resolve(__dirname, '../src/data/tools.ts');
const { tools } = loadTS(toolsPath);

const workspaceCode = fs.readFileSync(path.resolve(__dirname, '../src/scripts/tool-workspace.ts'), 'utf8');

console.log(`=== RUNNING DEEP RUNTIME AUDIT ON ALL ${tools.length} TOOLS ===\n`);

const issues = [];

// Test 1: Check for handlers with un-escaped innerHTML or XSS vectors in resultHtml
tools.forEach(t => {
  const handlerMatch = workspaceCode.match(new RegExp(`case '${t.slug}':([\\s\\S]*?)(break;|return;|})`, 'm'));
  if (handlerMatch) {
    const code = handlerMatch[1];
    // Check if user text is interpolated into resultHtml without escapeHtml, compactSeed, or sanitization
    if (code.includes('resultHtml =') && code.includes('text') && !code.includes('escapeHtml') && !code.includes('compactSeed') && !code.includes('toSafeHandle') && !code.includes('renderSectionSuite') && !code.includes('renderPreviewCodeSuite')) {
      issues.push({
        type: 'POTENTIAL_XSS_RISK',
        slug: t.slug,
        detail: 'Direct interpolation of raw `text` input into `resultHtml` without explicit escaping.'
      });
    }
  }
});

// Test 2: Check for meta titles & descriptions length issues
tools.forEach(t => {
  if (t.metaTitle && t.metaTitle.length > 70) {
    issues.push({ type: 'SEO_META_TITLE_TOO_LONG', slug: t.slug, detail: `Meta title is ${t.metaTitle.length} chars (recommended < 60)` });
  }
  if (t.metaDescription && t.metaDescription.length > 170) {
    issues.push({ type: 'SEO_META_DESC_TOO_LONG', slug: t.slug, detail: `Meta description is ${t.metaDescription.length} chars (recommended < 160)` });
  }
  if (!t.metaDescription || t.metaDescription.length < 30) {
    issues.push({ type: 'SEO_META_DESC_TOO_SHORT', slug: t.slug, detail: `Meta description is too short (${(t.metaDescription || '').length} chars)` });
  }
});

// Test 3: Check for empty or duplicate keywords
const keywordsMap = new Map();
tools.forEach(t => {
  const kw = (t.primaryKeyword || '').toLowerCase().trim();
  if (!kw) {
    issues.push({ type: 'MISSING_PRIMARY_KEYWORD', slug: t.slug, detail: 'Primary keyword is empty.' });
  } else {
    if (keywordsMap.has(kw)) {
      issues.push({ type: 'DUPLICATE_PRIMARY_KEYWORD', slug: t.slug, detail: `Duplicate keyword "${kw}" shared with ${keywordsMap.get(kw)}` });
    } else {
      keywordsMap.set(kw, t.slug);
    }
  }
});

// Test 4: Check FAQ quality & answer depth
tools.forEach(t => {
  const faqs = t.faqItems || [];
  if (faqs.length < 4) {
    issues.push({ type: 'FAQ_COUNT_SUBPAR', slug: t.slug, detail: `Tool has ${faqs.length} FAQs (recommended >= 4)` });
  }
  faqs.forEach((faq, idx) => {
    if (!faq.a || faq.a.length < 40) {
      issues.push({ type: 'FAQ_THIN_ANSWER', slug: t.slug, detail: `FAQ #${idx + 1} ("${faq.q}") answer is thin (${(faq.a || '').length} chars)` });
    }
  });
});

console.log(`Audit Complete. Found ${issues.length} potential issues/improvement areas:\n`);
console.log(JSON.stringify(issues, null, 2));
