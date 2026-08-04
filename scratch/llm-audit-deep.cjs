const fs = require('fs');
const path = require('path');

console.log(`=== AUDIT 5: AI SEARCH & LLM ENGINE VISIBILITY AUDIT ===\n`);

const llmIssues = [];

// 1. Audit public/llms.txt
const llmsTxtPath = path.resolve(__dirname, '../public/llms.txt');
if (!fs.existsSync(llmsTxtPath)) {
  llmIssues.push({ type: 'MISSING_LLMS_TXT', detail: 'public/llms.txt file does not exist.' });
} else {
  const content = fs.readFileSync(llmsTxtPath, 'utf8');
  if (!content.includes('# TapToGen') && !content.includes('# ')) {
    llmIssues.push({ type: 'INVALID_LLMS_TXT_FORMAT', detail: 'public/llms.txt missing top h1 header "# TapToGen".' });
  }
  if (!content.includes('https://taptogen.com') && !content.includes('http')) {
    llmIssues.push({ type: 'MISSING_LLMS_TXT_URLS', detail: 'public/llms.txt contains no canonical URLs for AI crawlers.' });
  }
}

// 2. Audit public/llms-full.txt
const llmsFullTxtPath = path.resolve(__dirname, '../public/llms-full.txt');
if (!fs.existsSync(llmsFullTxtPath)) {
  llmIssues.push({ type: 'MISSING_LLMS_FULL_TXT', detail: 'public/llms-full.txt file does not exist.' });
} else {
  const content = fs.readFileSync(llmsFullTxtPath, 'utf8');
  if (content.length < 500) {
    llmIssues.push({ type: 'THIN_LLMS_FULL_TXT', detail: `public/llms-full.txt is too thin (${content.length} chars). Expected full site content dump.` });
  }
}

// 3. Verify Schema Builder Module
const schemaLibPath = path.resolve(__dirname, '../src/lib/search-schema.ts');
if (!fs.existsSync(schemaLibPath)) {
  llmIssues.push({ type: 'MISSING_SCHEMA_LIB', detail: 'src/lib/search-schema.ts does not exist.' });
} else {
  const content = fs.readFileSync(schemaLibPath, 'utf8');
  const requiredSchemas = ['WebApplication', 'FAQPage', 'BreadcrumbList', 'Organization'];
  requiredSchemas.forEach(sch => {
    if (!content.includes(sch)) {
      llmIssues.push({ type: 'MISSING_SCHEMA_TYPE', schemaType: sch, detail: `Schema builder missing "${sch}" schema type.` });
    }
  });
}

console.log(`AI Search & LLM Audit Complete. Found ${llmIssues.length} issues:\n`);
console.log(JSON.stringify(llmIssues, null, 2));
