const fs = require('fs');
const path = require('path');
const { loadTS } = require('../tests/helpers/ts-loader.cjs');

const locPath = path.resolve(__dirname, '../src/data/localization.ts');
const { supportedLanguages } = loadTS(locPath);

console.log(`=== AUDIT 4: MULTI-LANGUAGE (i18n) INTEGRITY AUDIT ===\n`);

const i18nIssues = [];

// 1. Verify language code count
if (!supportedLanguages || supportedLanguages.length < 18) {
  i18nIssues.push({ type: 'SUBPAR_SUPPORTED_LANGUAGES', detail: `Only ${supportedLanguages ? supportedLanguages.length : 0} languages configured (expected 18+).` });
}

// 2. Check localized route templates for every language
supportedLanguages.forEach(lang => {
  if (lang.code === 'en') return;
  const langRoute = path.resolve(__dirname, `../src/pages/${lang.code}/tools/[slug].astro`);
  if (!fs.existsSync(langRoute)) {
    i18nIssues.push({ type: 'MISSING_LOCALIZED_ROUTE_FILE', langCode: lang.code, detail: `Route file src/pages/${lang.code}/tools/[slug].astro missing.` });
  }
});

console.log(`i18n Audit Complete. Found ${i18nIssues.length} issues:\n`);
console.log(JSON.stringify(i18nIssues, null, 2));
