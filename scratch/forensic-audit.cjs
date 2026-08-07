const fs = require('fs');
const path = require('path');
const { loadTS } = require('../tests/helpers/ts-loader.cjs');

console.log('====================================================');
console.log('      BRUTAL FORENSIC AUDIT - TAPTOGEN PLATFORM     ');
console.log('====================================================\n');

const results = {
  tools: { Total: 0, Issues: [] },
  seo: { Total: 0, Issues: [] },
  content: { Total: 0, Issues: [] },
  internalLinks: { Total: 0, Issues: [] },
  codeQuality: { Total: 0, Issues: [] }
};

// Load data
const toolsPath = path.resolve(__dirname, '../src/data/tools.ts');
const categoriesPath = path.resolve(__dirname, '../src/data/categories.ts');
const { tools } = loadTS(toolsPath);
const { categories } = loadTS(categoriesPath);

const toolSlugsSet = new Set(tools.map(t => t.slug));
const categorySlugsSet = new Set(categories.map(c => c.slug));

results.tools.Total = tools.length;

// ----------------------------------------------------
// 1. TOOLS & ENGINE AUDIT
// ----------------------------------------------------
tools.forEach(t => {
  // Slug check
  if (!t.slug || t.slug !== t.slug.toLowerCase() || t.slug.includes(' ')) {
    results.tools.Issues.push({ slug: t.slug, type: 'INVALID_SLUG', detail: `Slug "${t.slug}" is invalid or un-normalized` });
  }

  // Icon check
  if (!t.icon || t.icon.trim() === '') {
    results.tools.Issues.push({ slug: t.slug, type: 'MISSING_ICON', detail: `Tool has no icon` });
  }

  // Category slug validity
  if (!categorySlugsSet.has(t.categorySlug)) {
    results.tools.Issues.push({ slug: t.slug, type: 'BROKEN_CATEGORY', detail: `Category slug "${t.categorySlug}" does not exist in categories.ts` });
  }

  // Tool options validation
  if (t.toolOptions) {
    t.toolOptions.forEach(opt => {
      if (opt.type === 'select') {
        const choices = opt.options || opt.choices;
        if (!choices || choices.length === 0) {
          results.tools.Issues.push({ slug: t.slug, type: 'SELECT_NO_CHOICES', detail: `Select option "${opt.id}" has no choices` });
        } else if (opt.default !== undefined) {
          const valMatch = choices.some(c => (typeof c === 'object' ? c.value : c) === opt.default);
          if (!valMatch) {
            results.tools.Issues.push({ slug: t.slug, type: 'OPTION_DEFAULT_MISMATCH', detail: `Default "${opt.default}" for option "${opt.id}" not found in choices` });
          }
        }
      }
    });
  }
});

// ----------------------------------------------------
// 2. SEO & METADATA AUDIT
// ----------------------------------------------------
const metaTitles = new Map();
const metaDescriptions = new Map();

tools.forEach(t => {
  // Title checks
  if (!t.metaTitle) {
    results.seo.Issues.push({ slug: t.slug, type: 'MISSING_META_TITLE', detail: 'Missing metaTitle' });
  } else {
    if (t.metaTitle.length < 30) {
      results.seo.Issues.push({ slug: t.slug, type: 'SHORT_META_TITLE', detail: `Meta title too short (${t.metaTitle.length} chars): "${t.metaTitle}"` });
    } else if (t.metaTitle.length > 70) {
      results.seo.Issues.push({ slug: t.slug, type: 'LONG_META_TITLE', detail: `Meta title too long (${t.metaTitle.length} chars): "${t.metaTitle}"` });
    }

    if (metaTitles.has(t.metaTitle)) {
      results.seo.Issues.push({ slug: t.slug, type: 'DUPLICATE_META_TITLE', detail: `Duplicate metaTitle shared with "${metaTitles.get(t.metaTitle)}"` });
    } else {
      metaTitles.set(t.metaTitle, t.slug);
    }
  }

  // Description checks
  if (!t.metaDescription) {
    results.seo.Issues.push({ slug: t.slug, type: 'MISSING_META_DESC', detail: 'Missing metaDescription' });
  } else {
    if (t.metaDescription.length < 90) {
      results.seo.Issues.push({ slug: t.slug, type: 'SHORT_META_DESC', detail: `Meta description too short (${t.metaDescription.length} chars)` });
    } else if (t.metaDescription.length > 165) {
      results.seo.Issues.push({ slug: t.slug, type: 'LONG_META_DESC', detail: `Meta description too long (${t.metaDescription.length} chars)` });
    }

    // Truncated sentence check (ends with 'for.', 'and.', incomplete sentence, etc.)
    if (/\b(for|and|with|the|in|of|a|an)\.\s*$/i.test(t.metaDescription)) {
      results.seo.Issues.push({ slug: t.slug, type: 'TRUNCATED_META_DESC', detail: `Meta description appears truncated: "${t.metaDescription}"` });
    }

    if (metaDescriptions.has(t.metaDescription)) {
      results.seo.Issues.push({ slug: t.slug, type: 'DUPLICATE_META_DESC', detail: `Duplicate metaDescription shared with "${metaDescriptions.get(t.metaDescription)}"` });
    } else {
      metaDescriptions.set(t.metaDescription, t.slug);
    }
  }

  // Keywords check
  if (!t.primaryKeyword || t.primaryKeyword.trim() === '') {
    results.seo.Issues.push({ slug: t.slug, type: 'MISSING_PRIMARY_KEYWORD', detail: 'Primary keyword is missing' });
  }
  if (!t.secondaryKeywords || t.secondaryKeywords.length < 3) {
    results.seo.Issues.push({ slug: t.slug, type: 'FEW_SECONDARY_KEYWORDS', detail: `Only ${t.secondaryKeywords ? t.secondaryKeywords.length : 0} secondary keywords (recommended >= 3)` });
  }
});

// ----------------------------------------------------
// 3. CONTENT & EEAT AUDIT
// ----------------------------------------------------
const placeholdersRegex = /\b(Lorem ipsum|TODO|FIXME|XXX|sample output|your text here|undefined|null|\[object Object\])\b/i;

tools.forEach(t => {
  // Description length / EEAT check
  const rawDescText = (t.description || '').replace(/<[^>]*>/g, '');
  if (rawDescText.length < 120) {
    results.content.Issues.push({ slug: t.slug, type: 'THIN_DESCRIPTION', detail: `Description text is only ${rawDescText.length} characters (recommended > 150)` });
  }

  // FAQ check
  if (!t.faqItems || t.faqItems.length < 4) {
    results.content.Issues.push({ slug: t.slug, type: 'FEW_FAQS', detail: `Only ${t.faqItems ? t.faqItems.length : 0} FAQ items (recommended >= 4-5)` });
  } else {
    t.faqItems.forEach((faq, idx) => {
      if (!faq.q || faq.q.length < 10) {
        results.content.Issues.push({ slug: t.slug, type: 'THIN_FAQ_QUESTION', detail: `FAQ #${idx+1} question too short ("${faq.q}")` });
      }
      if (!faq.a || faq.a.length < 25) {
        results.content.Issues.push({ slug: t.slug, type: 'THIN_FAQ_ANSWER', detail: `FAQ #${idx+1} answer too short ("${faq.a}")` });
      }
    });
  }

  // Check for placeholder text
  if (placeholdersRegex.test(t.description)) {
    results.content.Issues.push({ slug: t.slug, type: 'PLACEHOLDER_IN_DESC', detail: `Placeholder text found in description` });
  }
});

// ----------------------------------------------------
// 4. INTERNAL LINK INTEGRITY AUDIT
// ----------------------------------------------------
tools.forEach(t => {
  // Related slugs check
  if (t.relatedSlugs) {
    t.relatedSlugs.forEach(rel => {
      if (rel === t.slug) {
        results.internalLinks.Issues.push({ slug: t.slug, type: 'SELF_REFERENTIAL_RELATED', detail: `Tool links to itself in relatedSlugs` });
      } else if (!toolSlugsSet.has(rel)) {
        results.internalLinks.Issues.push({ slug: t.slug, type: 'BROKEN_RELATED_SLUG', detail: `Related slug "${rel}" does not exist` });
      }
    });
  }

  // Links embedded in description text
  const linkRegex = /href=["']\/tools\/([a-z0-9-]+)\/?["']/g;
  let match;
  while ((match = linkRegex.exec(t.description)) !== null) {
    const targetSlug = match[1];
    if (!toolSlugsSet.has(targetSlug)) {
      results.internalLinks.Issues.push({ slug: t.slug, type: 'BROKEN_EMBEDDED_LINK', detail: `Embedded link to /tools/${targetSlug}/ points to missing tool` });
    }
  }
});

// ----------------------------------------------------
// OUTPUT SUMMARY
// ----------------------------------------------------
console.log('=== AUDIT RESULTS SUMMARY ===');
console.log(`Total Tools Scanned: ${results.tools.Total}`);
console.log(`Tools Config Issues: ${results.tools.Issues.length}`);
console.log(`SEO & Meta Issues:   ${results.seo.Issues.length}`);
console.log(`Content Quality Issues: ${results.content.Issues.length}`);
console.log(`Internal Links Issues: ${results.internalLinks.Issues.length}\n`);

console.log('--- DETAILED ISSUE LISTING ---');
const allIssues = [
  ...results.tools.Issues,
  ...results.seo.Issues,
  ...results.content.Issues,
  ...results.internalLinks.Issues
];

console.log(JSON.stringify(allIssues, null, 2));

// Save output to scratch/audit_findings.json
fs.writeFileSync(path.resolve(__dirname, 'audit_findings.json'), JSON.stringify(allIssues, null, 2));
console.log(`\nDetailed findings saved to scratch/audit_findings.json`);
