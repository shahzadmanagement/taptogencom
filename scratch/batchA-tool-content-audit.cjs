const fs = require('fs');
const path = require('path');
const { loadTS } = require('../tests/helpers/ts-loader.cjs');

const toolsPath = path.resolve(__dirname, '../src/data/tools.ts');
const { tools } = loadTS(toolsPath);

const issues = [];

// Categorize findings
const placeholderIcons = [];
const thinFaqs = [];
const boilerplateTaglines = [];
const genericDescriptions = [];
const wrongGeneratorType = [];
const duplicateFaqs = new Map();

const faqAnswersSeen = new Map();

tools.forEach(tool => {
  // 1. Placeholder icon
  if (tool.icon === '⚡' || tool.icon === '🛠️') {
    placeholderIcons.push({ slug: tool.slug, icon: tool.icon });
  }

  // 2. Thin FAQ answers (generic boilerplate under 80 chars)
  const boilerplateAnswers = [
    'is a free client-side tool to generate tailored outputs instantly in your browser',
    'Use the built-in option controls to select specific genres, themes, and formats',
    'All computation executes 100% locally inside your web browser via JavaScript',
    'All output code, text, and generated assets are free to use in personal and commercial',
    'is a free client-side utility that generates custom outputs directly in your browser',
    'Adjust the style filters and format controls to generate tailored outputs matching',
    'All processing happens 100% locally in your web browser using JavaScript',
    'All generated ideas, text, and assets are 100% free for personal and commercial'
  ];

  if (tool.faqItems) {
    tool.faqItems.forEach(faq => {
      const isBoilerplate = boilerplateAnswers.some(b => faq.a.includes(b));
      if (isBoilerplate) {
        if (!thinFaqs.find(f => f.slug === tool.slug)) {
          thinFaqs.push({ slug: tool.slug, name: tool.name });
        }
      }
    });
  }

  // 3. Boilerplate tagline (contains "with focused options and review notes" or "generate tailored ... options")
  if (tool.tagline && (
    tool.tagline.includes('with focused options and review notes') ||
    tool.tagline.includes('generate tailored') ||
    tool.tagline.includes('Practical Generator Tool')
  )) {
    boilerplateTaglines.push({ slug: tool.slug, tagline: tool.tagline });
  }

  // 4. Generic description (contains "Use X to generate tailored X options with custom style filters")
  if (tool.description && (
    tool.description.includes('to generate tailored') && 
    tool.description.includes('custom style filters, format controls, and instant copy/export options')
  )) {
    genericDescriptions.push({ slug: tool.slug, name: tool.name });
  }

  // 5. All reconstructed tools defaulted to random-combo (check if it makes sense)
  // Tools that are clearly text-transform but tagged random-combo
  const textTransformKeywords = ['text generator', 'font generator', 'text converter', 'case converter', 'text transform', 'text style'];
  const isTextTool = textTransformKeywords.some(k => tool.slug.includes(k.replace(' ', '-')) || tool.name.toLowerCase().includes(k));
  if (isTextTool && tool.generatorType === 'random-combo') {
    wrongGeneratorType.push({ slug: tool.slug, name: tool.name, current: tool.generatorType, suggested: 'text-transform' });
  }
});

console.log(`=== BATCH A: TOOL CONTENT QUALITY DEEP-AUDIT ===\n`);
console.log(`Total tools: ${tools.length}`);
console.log(`\n--- Placeholder Icons (⚡ or 🛠️) ---`);
console.log(`Count: ${placeholderIcons.length}`);
placeholderIcons.slice(0, 20).forEach(t => console.log(`  ${t.icon} ${t.slug}`));
if (placeholderIcons.length > 20) console.log(`  ... and ${placeholderIcons.length - 20} more`);

console.log(`\n--- Boilerplate Taglines ---`);
console.log(`Count: ${boilerplateTaglines.length}`);
boilerplateTaglines.slice(0, 10).forEach(t => console.log(`  [${t.slug}]: ${t.tagline.substring(0, 80)}...`));
if (boilerplateTaglines.length > 10) console.log(`  ... and ${boilerplateTaglines.length - 10} more`);

console.log(`\n--- Generic/Thin Descriptions ---`);
console.log(`Count: ${genericDescriptions.length}`);
genericDescriptions.slice(0, 10).forEach(t => console.log(`  [${t.slug}]: ${t.name}`));
if (genericDescriptions.length > 10) console.log(`  ... and ${genericDescriptions.length - 10} more`);

console.log(`\n--- Boilerplate FAQs (tools using generic placeholders) ---`);
console.log(`Count: ${thinFaqs.length}`);
thinFaqs.slice(0, 10).forEach(t => console.log(`  [${t.slug}]: ${t.name}`));
if (thinFaqs.length > 10) console.log(`  ... and ${thinFaqs.length - 10} more`);

console.log(`\n--- Wrong Generator Type (text tools labeled random-combo) ---`);
console.log(`Count: ${wrongGeneratorType.length}`);
wrongGeneratorType.slice(0, 10).forEach(t => console.log(`  [${t.slug}]: ${t.current} → ${t.suggested}`));

const summary = {
  totalTools: tools.length,
  placeholderIcons: placeholderIcons.length,
  boilerplateTaglines: boilerplateTaglines.length,
  genericDescriptions: genericDescriptions.length,
  thinFaqs: thinFaqs.length,
  wrongGeneratorType: wrongGeneratorType.length,
  placeholderIconSlugs: placeholderIcons.map(t => t.slug),
  boilerplateTaglineSlugs: boilerplateTaglines.map(t => t.slug),
  genericDescSlugs: genericDescriptions.map(t => t.slug),
  thinFaqSlugs: thinFaqs.map(t => t.slug),
  wrongTypeSlugs: wrongGeneratorType.map(t => ({ slug: t.slug, suggested: t.suggested }))
};

fs.writeFileSync(path.join(__dirname, 'batchA-results.json'), JSON.stringify(summary, null, 2));
console.log(`\n✅ Results saved to scratch/batchA-results.json`);
