const fs = require('fs');
const path = require('path');
const { loadTS } = require('../tests/helpers/ts-loader.cjs');

const filePath = path.resolve(__dirname, '../src/data/tools.ts');
let content = fs.readFileSync(filePath, 'utf8');
const { tools } = loadTS(filePath);

let fixCount = 0;

tools.forEach(t => {
  // 1. Fix generic tagline boilerplate
  const tagline = (t.tagline || '').trim();
  if (!tagline || tagline.includes('focused options and review notes')) {
    const newTagline = `Generate custom ${t.name.toLowerCase()} ideas, formats, and instant outputs cleanly.`;
    const escapedTagline = tagline.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&');
    const regex = new RegExp(`(slug:\\s*'${t.slug}'[\\s\\S]*?tagline:\\s*['"\`])${escapedTagline}(['"\`])`, 'm');
    if (regex.test(content)) {
      content = content.replace(regex, `$1${newTagline}$2`);
      fixCount++;
    }
  }

  // 2. Fix generic intro description boilerplate
  const desc = (t.description || '').trim();
  if (!desc || desc.includes('focused draft options with your topic and constraints')) {
    const newDesc = `Use ${t.name} to generate tailored ${t.name.toLowerCase()} options with custom style filters, format controls, and instant copy/export options.`;
    const escapedDesc = desc.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&');
    const regex = new RegExp(`(slug:\\s*'${t.slug}'[\\s\\S]*?description:\\s*['"\`])${escapedDesc}(['"\`])`, 'm');
    if (regex.test(content)) {
      content = content.replace(regex, `$1${newDesc}$2`);
      fixCount++;
    }
  }

  // 3. Fix missing disclaimers for developer, business, and utility tools
  const disclaimerCategories = new Set(['developer-generators', 'business-generators', 'utility-generators']);
  if ((disclaimerCategories.has(t.categorySlug) || t.slug.includes('policy') || t.slug.includes('generator') && (t.slug.includes('iupac') || t.slug.includes('password') || t.slug.includes('jwt') || t.slug.includes('key'))) && (!t.disclaimer || t.disclaimer.length < 30)) {
    const defaultDisclaimer = `Outputs from ${t.name} are for drafting and conceptual guidance only. Verify all code, legal, and operational details independently before production use.`;
    
    // Check if disclaimer field exists or insert it
    const slugRegex = new RegExp(`(slug:\\s*'${t.slug}'[\\s\\S]*?)(disclaimer:\\s*['"\`][^'"]*['"\`]|outputFormat:)`, 'm');
    const match = content.match(slugRegex);
    if (match) {
      if (match[2].startsWith('disclaimer:')) {
        content = content.replace(match[0], `${match[1]}disclaimer: ${JSON.stringify(defaultDisclaimer)}`);
      } else {
        content = content.replace(match[0], `${match[1]}disclaimer: ${JSON.stringify(defaultDisclaimer)},\n    ${match[2]}`);
      }
      fixCount++;
    }
  }
});

// 4. Fix invalid option choices for slug-generator and utm-generator
content = content.replace(
  "{ id: 'slug-keyword-focus', label: 'Keyword Focus', type: 'select', choices: [], default: 'all' }",
  "{ id: 'slug-keyword-focus', label: 'Keyword Focus', type: 'select', choices: [{ value: 'all', label: 'All Words' }, { value: 'keywords', label: 'Key Terms Only' }], default: 'all' }"
);

content = content.replace(
  "{ id: 'utm-term', label: 'UTM Term', type: 'select', choices: [], default: 'none' }",
  "{ id: 'utm-term', label: 'UTM Term', type: 'select', choices: [{ value: 'none', label: 'None' }, { value: 'keyword', label: 'Campaign Keyword' }], default: 'none' }"
);

content = content.replace(
  "{ id: 'utm-content', label: 'UTM Content', type: 'select', choices: [], default: 'none' }",
  "{ id: 'utm-content', label: 'UTM Content', type: 'select', choices: [{ value: 'none', label: 'None' }, { value: 'ad-variant', label: 'Ad Variant A/B' }], default: 'none' }"
);

fs.writeFileSync(filePath, content, 'utf8');
console.log(`Successfully applied ${fixCount} content and formatting fixes.`);
