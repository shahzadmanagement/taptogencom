const fs = require('fs');
const path = require('path');
const { loadTS } = require('../tests/helpers/ts-loader.cjs');

const toolsPath = path.resolve(__dirname, '../src/data/tools.ts');
const { tools } = loadTS(toolsPath);

const issues = [];

tools.forEach(tool => {
  // 1. metaTitle over 60 chars
  if (tool.metaTitle && tool.metaTitle.length > 60) {
    issues.push({ slug: tool.slug, type: 'TITLE_TOO_LONG', value: tool.metaTitle.length, text: tool.metaTitle });
  }

  // 2. metaDescription under 100 or over 160 chars
  if (tool.metaDescription) {
    if (tool.metaDescription.length < 100) {
      issues.push({ slug: tool.slug, type: 'DESC_TOO_SHORT', value: tool.metaDescription.length, text: tool.metaDescription });
    } else if (tool.metaDescription.length > 165) {
      issues.push({ slug: tool.slug, type: 'DESC_TOO_LONG', value: tool.metaDescription.length, text: tool.metaDescription });
    }
  }

  // 3. primaryKeyword not in metaTitle
  if (tool.primaryKeyword && tool.metaTitle) {
    const kw = tool.primaryKeyword.toLowerCase();
    const title = tool.metaTitle.toLowerCase();
    if (!title.includes(kw)) {
      issues.push({ slug: tool.slug, type: 'KW_NOT_IN_TITLE', value: tool.primaryKeyword, text: tool.metaTitle });
    }
  }

  // 4. metaDescription ending abruptly (ends with comma or mid-sentence indicators)
  if (tool.metaDescription && /[,;]$/.test(tool.metaDescription.trim())) {
    issues.push({ slug: tool.slug, type: 'DESC_TRUNCATED', text: tool.metaDescription });
  }

  // 5. Generic/identical metaDescription patterns
  const genericDescPatterns = [
    'create focused draft options with your topic and constraints. Review, edit, and adapt results before use.',
    'Practical Generator Tool'
  ];
  if (tool.metaDescription && genericDescPatterns.some(p => tool.metaDescription.includes(p))) {
    issues.push({ slug: tool.slug, type: 'GENERIC_DESC', text: tool.metaDescription });
  }
  if (tool.metaTitle && genericDescPatterns.some(p => tool.metaTitle.includes(p))) {
    issues.push({ slug: tool.slug, type: 'GENERIC_TITLE', text: tool.metaTitle });
  }

  // 6. secondaryKeywords - too few (< 3)
  if (!tool.secondaryKeywords || tool.secondaryKeywords.length < 3) {
    issues.push({ slug: tool.slug, type: 'FEW_KEYWORDS', value: tool.secondaryKeywords?.length || 0 });
  }
});

console.log(`=== BATCH B: SEO METADATA QUALITY AUDIT ===\n`);
console.log(`Total tools audited: ${tools.length}`);
console.log(`Total issues found: ${issues.length}\n`);

const byType = {};
issues.forEach(issue => {
  if (!byType[issue.type]) byType[issue.type] = [];
  byType[issue.type].push(issue);
});

Object.entries(byType).forEach(([type, list]) => {
  console.log(`\n[${type}] — ${list.length} occurrences`);
  list.slice(0, 5).forEach(i => console.log(`  ${i.slug}: ${JSON.stringify(i.text || i.value || '').substring(0, 80)}`));
  if (list.length > 5) console.log(`  ... and ${list.length - 5} more`);
});

const summary = {
  totalTools: tools.length,
  totalIssues: issues.length,
  byType: Object.fromEntries(Object.entries(byType).map(([k, v]) => [k, v.length])),
  issues
};

fs.writeFileSync(path.join(__dirname, 'batchB-results.json'), JSON.stringify(summary, null, 2));
console.log(`\n✅ Results saved to scratch/batchB-results.json`);
