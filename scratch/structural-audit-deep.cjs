const fs = require('fs');
const path = require('path');
const { loadTS } = require('../tests/helpers/ts-loader.cjs');

const toolsPath = path.resolve(__dirname, '../src/data/tools.ts');
const categoriesPath = path.resolve(__dirname, '../src/data/categories.ts');

const { tools } = loadTS(toolsPath);
const { categories } = loadTS(categoriesPath);

console.log(`=== RUNNING UNCOMPROMISING DEEP STRUCTURAL & ARCHITECTURAL AUDIT ===\n`);

const structIssues = [];

// 1. Tool Data Structure Completeness Audit
const requiredFields = [
  'slug', 'name', 'icon', 'tagline', 'description',
  'category', 'categorySlug', 'primaryKeyword', 'secondaryKeywords',
  'metaTitle', 'metaDescription', 'userIntent', 'generatorType',
  'toolOptions', 'outputFormat', 'faqItems', 'relatedSlugs'
];

tools.forEach(t => {
  requiredFields.forEach(field => {
    if (t[field] === undefined || t[field] === null) {
      structIssues.push({ type: 'MISSING_REQUIRED_FIELD', slug: t.slug, field, detail: `Tool missing required field "${field}".` });
    }
  });
});

// 2. Category Mapping Integrity
const categorySlugSet = new Set(categories.map(c => c.slug));
tools.forEach(t => {
  if (!categorySlugSet.has(t.categorySlug)) {
    structIssues.push({ type: 'UNINDEXED_CATEGORY_SLUG', slug: t.slug, categorySlug: t.categorySlug, detail: `Category slug "${t.categorySlug}" not registered in categories.ts` });
  }
});

// Check if any category has 0 tools mapped
categories.forEach(c => {
  const mappedTools = tools.filter(t => t.categorySlug === c.slug);
  if (mappedTools.length === 0) {
    structIssues.push({ type: 'EMPTY_CATEGORY', categorySlug: c.slug, detail: `Category "${c.name}" has 0 mapped tools.` });
  }
});

// 3. Switch Case Coverage in tool-workspace.ts
const workspaceCode = fs.readFileSync(path.resolve(__dirname, '../src/scripts/tool-workspace.ts'), 'utf8');
tools.forEach(t => {
  if (!workspaceCode.includes(`case '${t.slug}':`) && !workspaceCode.includes(`case "${t.slug}":`)) {
    // Check if category engine or fallback engine handles it
    if (!workspaceCode.includes('buildGenericFallback') && !workspaceCode.includes('category-engines')) {
      structIssues.push({ type: 'UNHANDLED_WORKSPACE_SLUG', slug: t.slug, detail: `Tool slug "${t.slug}" missing switch-case handler in tool-workspace.ts.` });
    }
  }
});

// 4. Public Assets & Core File Integrity
const publicFiles = [
  'public/manifest.webmanifest',
  'public/sw.js',
  'public/sw-register.js',
  'public/offline.html',
  'public/llms.txt',
  'public/llms-full.txt',
  'public/sitemap-index.xml',
  'public/robots.txt'
];

publicFiles.forEach(file => {
  const fullPath = path.resolve(__dirname, '../', file);
  if (!fs.existsSync(fullPath)) {
    structIssues.push({ type: 'MISSING_CORE_PUBLIC_FILE', file, detail: `Critical public asset "${file}" does not exist.` });
  } else {
    const stat = fs.statSync(fullPath);
    if (stat.size < 50) {
      structIssues.push({ type: 'EMPTY_CORE_PUBLIC_FILE', file, detail: `Critical public asset "${file}" is practically empty (${stat.size} bytes).` });
    }
  }
});

// 5. Component Contracts Audit
const componentFiles = [
  'src/components/LocalizedToolPage.astro',
  'src/components/HubPage.astro',
  'src/components/DownloadToolbar.astro',
  'src/components/PreviewTabs.astro',
  'src/components/CommandPalette.astro',
  'src/components/PwaInstallBanner.astro',
  'src/components/UniversalLinkingEngine.astro',
  'src/components/SchemaMarkup.astro'
];

componentFiles.forEach(comp => {
  const fullPath = path.resolve(__dirname, '../', comp);
  if (!fs.existsSync(fullPath)) {
    structIssues.push({ type: 'MISSING_CORE_COMPONENT', file: comp, detail: `Core component "${comp}" does not exist.` });
  }
});

console.log(`Structural Audit Complete. Found ${structIssues.length} issues:\n`);
console.log(JSON.stringify(structIssues, null, 2));
