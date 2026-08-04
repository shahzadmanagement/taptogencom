const fs = require('fs');
const path = require('path');
const { loadTS } = require('../tests/helpers/ts-loader.cjs');

const toolsPath = path.resolve(__dirname, '../src/data/tools.ts');
const inventoryPath = path.resolve(__dirname, '../master_inventory.json');

const inventory = JSON.parse(fs.readFileSync(inventoryPath, 'utf8'));
const { tools: existingTools } = loadTS(toolsPath);

console.log(`Inventory has ${inventory.length} tools. Existing tools.ts has ${existingTools.length} tools.`);

const existingSlugMap = new Map();
existingTools.forEach(t => existingSlugMap.set(t.slug, t));

const fullTools = inventory.map(item => {
  const existing = existingSlugMap.get(item.slug);
  if (existing) {
    return {
      slug: existing.slug,
      name: existing.name || item.slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
      icon: existing.icon || '🛠️',
      tagline: existing.tagline || `Tailored ${item.slug.replace(/-/g, ' ')} with custom style filters and instant copy options.`,
      description: existing.description || `Use ${item.slug.replace(/-/g, ' ')} to create focused draft options with your topic and constraints. Review, edit, and adapt results before use.`,
      category: existing.category || item.category || 'General Generators',
      categorySlug: existing.categorySlug || item.categorySlug || 'general-generators',
      primaryKeyword: existing.primaryKeyword || item.slug.replace(/-/g, ' '),
      secondaryKeywords: existing.secondaryKeywords || [item.slug.replace(/-/g, ' '), `free ${item.slug.replace(/-/g, ' ')}`],
      metaTitle: existing.metaTitle || `${existing.name || item.slug} - Practical Generator Tool`,
      metaDescription: existing.metaDescription || `Use ${item.slug.replace(/-/g, ' ')} to create focused draft options. Review, edit, and adapt results before use.`,
      userIntent: existing.userIntent || `User wants ${item.slug.replace(/-/g, ' ')}.`,
      generatorType: existing.generatorType || 'random-combo',
      popular: existing.popular || false,
      toolOptions: existing.toolOptions || [],
      outputFormat: existing.outputFormat || 'list',
      disclaimer: existing.disclaimer,
      faqItems: existing.faqItems && existing.faqItems.length >= 4 ? existing.faqItems : [
        { q: `What is the ${existing?.name || item.slug}?`, a: `The ${existing?.name || item.slug} is a free client-side tool to generate tailored outputs instantly in your browser.` },
        { q: `How do I customize the output?`, a: `Use the built-in option controls to select specific genres, themes, and formats for your project needs.` },
        { q: `Does this tool collect or store my data?`, a: `No. All computation executes 100% locally inside your web browser via JavaScript. Zero input data is stored on external servers.` },
        { q: `Can I use generated outputs in commercial projects?`, a: `Yes. All output code, text, and generated assets are free to use in personal and commercial projects without licensing fees.` }
      ],
      relatedSlugs: existing.relatedSlugs || ["name-generator","username-generator","team-name-generator","baby-name-generator"]
    };
  }
  
  // Reconstruct missing tool object from inventory entry
  const name = item.slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
  return {
    slug: item.slug,
    name: name,
    icon: '⚡',
    tagline: `${name} with focused options and review notes`,
    description: `Use ${name} to generate tailored ${name.toLowerCase()} options with custom style filters, format controls, and instant copy/export options.`,
    category: item.category || 'General Generators',
    categorySlug: item.categorySlug || 'general-generators',
    primaryKeyword: item.slug.replace(/-/g, ' '),
    secondaryKeywords: [item.slug.replace(/-/g, ' '), `free ${item.slug.replace(/-/g, ' ')}`, `${item.slug.replace(/-/g, ' ')} online`],
    metaTitle: `${name} - Practical Generator Tool`,
    metaDescription: `Use ${name} to create focused draft options with your topic and constraints. Review, edit, and adapt results before use.`,
    userIntent: `User wants ${item.slug.replace(/-/g, ' ')}.`,
    generatorType: 'random-combo',
    popular: false,
    toolOptions: [],
    outputFormat: 'list',
    faqItems: [
      { q: `What is the ${name}?`, a: `The ${name} is a free client-side utility that generates custom outputs directly in your browser.` },
      { q: `How do I customize the results?`, a: `Adjust the style filters and format controls to generate tailored outputs matching your constraints.` },
      { q: `Is my data private when using this tool?`, a: `Yes. All processing happens 100% locally in your web browser using JavaScript. No input data is sent to external servers.` },
      { q: `Are outputs free for commercial use?`, a: `Yes. All generated ideas, text, and assets are 100% free for personal and commercial projects.` }
    ],
    relatedSlugs: ["name-generator","username-generator","team-name-generator","baby-name-generator"]
  };
});

// Write to tools.ts
const header = `export interface ToolOption {
  id: string;
  label: string;
  type: 'select' | 'checkbox' | 'radio' | 'number' | 'text';
  options?: { value: string; label: string }[];
  default?: string | boolean | number;
  min?: number;
  max?: number;
}

export interface Tool {
  slug: string;
  name: string;
  icon: string;
  tagline: string;
  description: string;
  category: string;
  categorySlug: string;
  primaryKeyword: string;
  secondaryKeywords: string[];
  metaTitle: string;
  metaDescription: string;
  userIntent: string;
  generatorType: 'text-transform' | 'random-combo' | 'template' | 'utility' | 'converter' | 'visual';
  popular?: boolean;
  faqItems: { q: string; a: string }[];
  relatedSlugs: string[];
  toolOptions?: ToolOption[];
  outputFormat?: 'text' | 'html' | 'image' | 'list' | 'ui';
  disclaimer?: string;
}

export const tools: Tool[] = [`;

const toolStrings = fullTools.map(t => {
  return `  ${JSON.stringify(t, null, 2).replace(/\n/g, '\n  ')}`;
});

const finalContent = `${header}\n${toolStrings.join(',\n')}\n];\n`;

fs.writeFileSync(toolsPath, finalContent, 'utf8');
console.log(`Successfully rebuilt tools.ts with ALL ${fullTools.length} tools!`);
