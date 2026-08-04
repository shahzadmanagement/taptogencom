const fs = require('fs');
const path = require('path');
const { loadTS } = require('../tests/helpers/ts-loader.cjs');

const toolsPath = path.resolve(__dirname, '../src/data/tools.ts');
const { tools } = loadTS(toolsPath);

console.log(`=== BATCH 3: DEEP CONTENT READABILITY & EEAT AUDIT ===\n`);

const contentIssues = [];

tools.forEach(tool => {
  if (!tool.faqItems || tool.faqItems.length < 4) {
    contentIssues.push({ type: 'SUBPAR_FAQ_COUNT', slug: tool.slug, detail: `Tool has only ${(tool.faqItems || []).length} FAQs.` });
  } else {
    tool.faqItems.forEach((faq, idx) => {
      if (!faq.q || faq.q.length < 15) {
        contentIssues.push({ type: 'SHORT_FAQ_QUESTION', slug: tool.slug, index: idx, detail: 'FAQ question is under 15 characters.' });
      }
      if (!faq.a || faq.a.length < 40) {
        contentIssues.push({ type: 'SHORT_FAQ_ANSWER', slug: tool.slug, index: idx, detail: 'FAQ answer is under 40 characters.' });
      }
    });
  }
  
  if (!tool.description || tool.description.length < 80) {
    contentIssues.push({ type: 'THIN_DESCRIPTION', slug: tool.slug, detail: 'Tool description is under 80 characters.' });
  }
});

console.log(`Batch 3 Content EEAT Audit Complete. Found ${contentIssues.length} issues:\n`);
console.log(JSON.stringify(contentIssues, null, 2));
