import fs from 'fs';
import path from 'path';

const toolsContent = fs.readFileSync(path.join(process.cwd(), 'src/data/tools.ts'), 'utf-8');
const datasetContent = fs.readFileSync(path.join(process.cwd(), 'src/scripts/data/generator-datasets.ts'), 'utf-8');

// Match all: slug: '...' in tools.ts
const toolSlugs = [...toolsContent.matchAll(/slug:\s*'([^']+)'/g)].map(m => m[1]);

// Match all keys in pass19NameConfigs
// e.g. 'fantasy-name-generator': {
const configKeys = [...datasetContent.matchAll(/'([^']+)'\s*:\s*\{/g)].map(m => m[1]);

console.log(`Found ${toolSlugs.length} tool slugs and ${configKeys.length} config keys.`);

let missing = 0;
// Verify name generators
toolSlugs.forEach(slug => {
  if (slug.endsWith('-generator') && !configKeys.includes(slug)) {
    const typeRegex = new RegExp(`slug:\\s*'${slug}',(?:[\\s\\S]*?)generatorType:\\s*'([^']+)'`);
    const match = toolsContent.match(typeRegex);
    if (match && match[1] === 'random-combo') {
      console.warn(`Warning: random-combo generator slug "${slug}" has no configuration!`);
      missing++;
    }
  }
});

console.log(`Verification Complete. Missing config count: ${missing}`);
