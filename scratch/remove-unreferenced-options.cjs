const fs = require('fs');
const path = require('path');
const { loadTS } = require('../tests/helpers/ts-loader.cjs');

const toolsPath = path.resolve(__dirname, '../src/data/tools.ts');
const { tools } = loadTS(toolsPath);

const targetSlugs = ['htaccess-generator', 'flashcard-generator', 'random-list-generator', 'wheel-spinner-generator', 'wave-generator'];
let fixCount = 0;

tools.forEach(tool => {
  if (targetSlugs.includes(tool.slug) && tool.toolOptions) {
    const cleanOptions = tool.toolOptions.filter(opt => opt.id !== 'opt-enable' && opt.id !== 'opt-count');
    tool.toolOptions = cleanOptions;
    fixCount++;
  }
});

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

const toolStrings = tools.map(t => {
  return `  ${JSON.stringify(t, null, 2).replace(/\n/g, '\n  ')}`;
});

const finalContent = `${header}\n${toolStrings.join(',\n')}\n];\n`;

fs.writeFileSync(toolsPath, finalContent, 'utf8');
console.log(`Cleaned ${fixCount} unreferenced options in tools.ts`);
