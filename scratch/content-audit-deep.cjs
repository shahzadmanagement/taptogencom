const fs = require('fs');
const path = require('path');
const { loadTS } = require('../tests/helpers/ts-loader.cjs');

const toolsPath = path.resolve(__dirname, '../src/data/tools.ts');
const { tools } = loadTS(toolsPath);

console.log(`=== RUNNING DEEP CONTENT & FORMATTING AUDIT ON ALL ${tools.length} TOOLS ===\n`);

const contentIssues = [];

// 1. Tagline Audit
tools.forEach(t => {
  const tagline = (t.tagline || '').trim();
  if (!tagline) {
    contentIssues.push({ type: 'MISSING_TAGLINE', slug: t.slug, detail: 'Tagline is completely missing.' });
  } else if (tagline.length < 15) {
    contentIssues.push({ type: 'TAGLINE_TOO_SHORT', slug: t.slug, detail: `Tagline is too short (${tagline.length} chars): "${tagline}"` });
  } else if (tagline.includes('focused options and review notes')) {
    contentIssues.push({ type: 'GENERIC_BOILERPLATE_TAGLINE', slug: t.slug, detail: `Tagline contains generic placeholder boilerplate: "${tagline}"` });
  }
});

// 2. Intro Description Boilerplate Audit
tools.forEach(t => {
  const desc = (t.description || '').trim();
  if (!desc) {
    contentIssues.push({ type: 'MISSING_DESCRIPTION', slug: t.slug, detail: 'Description is completely missing.' });
  } else if (desc.length < 80) {
    contentIssues.push({ type: 'THIN_DESCRIPTION', slug: t.slug, detail: `Description is too short (${desc.length} chars): "${desc}"` });
  } else if (desc.includes('focused draft options with your topic and constraints. Review, edit, and adapt results before use.')) {
    contentIssues.push({ type: 'GENERIC_BOILERPLATE_DESC', slug: t.slug, detail: `Description contains generic placeholder boilerplate: "${desc}"` });
  }
});

// 3. User Intent Statement Audit
tools.forEach(t => {
  const intent = (t.userIntent || '').trim();
  if (!intent) {
    contentIssues.push({ type: 'MISSING_USER_INTENT', slug: t.slug, detail: 'User intent statement is completely missing.' });
  } else if (intent.length < 25) {
    contentIssues.push({ type: 'USER_INTENT_TOO_SHORT', slug: t.slug, detail: `User intent statement is too short (${intent.length} chars): "${intent}"` });
  }
});

// 4. Option Labels & Choices Formatting Audit
tools.forEach(t => {
  (t.toolOptions || []).forEach(opt => {
    if (!opt.label || opt.label.length < 2) {
      contentIssues.push({ type: 'INVALID_OPTION_LABEL', slug: t.slug, optionId: opt.id, detail: `Option "${opt.id}" has missing or invalid label.` });
    }
    if (opt.type === 'select') {
      const choices = opt.choices || opt.options || [];
      if (!choices || choices.length === 0) {
        contentIssues.push({ type: 'SELECT_OPTION_EMPTY_CHOICES', slug: t.slug, optionId: opt.id, detail: `Select option "${opt.id}" has empty choices array.` });
      } else {
        choices.forEach(c => {
          if (c.value === undefined || c.label === undefined) {
            contentIssues.push({ type: 'INVALID_OPTION_CHOICE', slug: t.slug, optionId: opt.id, detail: `Option choice in "${opt.id}" missing value or label.` });
          }
        });
      }
    }
  });
});

console.log(`Content Audit Complete. Found ${contentIssues.length} issues:\n`);
console.log(JSON.stringify(contentIssues, null, 2));
