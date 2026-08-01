import fs from 'fs';
import path from 'path';
import { tools } from '../src/data/tools';

const langMapNames: Record<string, string> = {
  es: 'spanish', fr: 'french', de: 'german', pt: 'portuguese', it: 'italian', pl: 'polish',
  ru: 'russian', tr: 'turkish', id: 'indonesian', sv: 'swedish', ms: 'malay', bg: 'bulgarian',
  hi: 'hindi', bn: 'bengali', nl: 'dutch', ja: 'japanese', ko: 'korean', ar: 'arabic'
};

// Original Spanish/French pilot slug overrides for specific tests (e.g. fancy-text-generator in Spanish is letras-bonitas)
const explicitSlugOverrides: Record<string, Record<string, string>> = {
  es: {
    'fancy-text-generator': 'letras-bonitas',
    'name-generator': 'generador-de-nombres',
    'username-generator': 'generador-de-nombres-de-usuario',
    'business-name-generator': 'generador-de-nombres-para-empresas',
    'fantasy-name-generator': 'generador-de-nombres-de-fantasia',
    'character-name-generator': 'generador-de-nombres-para-personajes',
    'baby-name-generator': 'nombres-de-bebe',
    'last-name-generator': 'generador-de-apellidos',
    'middle-name-generator': 'generador-de-segundo-nombre',
    'team-name-generator': 'generador-de-nombres-de-equipo',
    'domain-name-generator': 'generador-de-nombres-de-dominio',
    'product-name-generator': 'nombres-para-productos',
    'project-name-generator': 'nombres-para-proyectos'
  }
};

function toAscii(str: string): string {
  let res = str.toLowerCase();
  res = res.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  res = res.replace(/æ/g, 'ae').replace(/œ/g, 'oe').replace(/ø/g, 'o').replace(/ß/g, 'ss');
  res = res.replace(/[^a-z0-9\-]/g, '-');
  res = res.replace(/\-+/g, '-').replace(/^\-+|\-+$/g, '');
  return res;
}

async function fixCanonicalAlignment() {
  for (const [code, langName] of Object.entries(langMapNames)) {
    const fileName = `localization-${langName}-data.ts`;
    const filePath = path.join(process.cwd(), 'src/data', fileName);
    if (!fs.existsSync(filePath)) continue;

    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const match = fileContent.match(/export const \w+: LocalizedToolContent\[\] = (\[[\s\S]*\]);/);
    if (!match) continue;

    const items: any[] = eval(match[1]);
    const overrides = explicitSlugOverrides[code] || {};
    const usedSlugs = new Set<string>();

    // Map items by matching canonicalToolId
    const itemMap = new Map<string, any>();
    for (const item of items) {
      if (item.canonicalToolId) {
        itemMap.set(item.canonicalToolId, item);
      }
    }

    const alignedItems: any[] = [];
    for (const tool of tools) {
      let item = itemMap.get(tool.slug);
      if (!item) {
        // Fallback: create default item if missing
        item = {
          canonicalToolId: tool.slug,
          language: code,
          primaryKeyword: tool.primaryKeyword,
          localizedSlug: overrides[tool.slug] || tool.slug,
          h1: tool.name,
          metaTitle: tool.metaTitle,
          metaDescription: tool.metaDescription,
          intro: tool.description,
          faqTopics: ['FAQ 1', 'FAQ 2', 'FAQ 3'],
          searchIntentNote: 'Utility search intent.',
          riskSafetyNote: 'Check trademarks before commercial use.'
        };
      } else {
        item.canonicalToolId = tool.slug;
      }

      if (overrides[tool.slug]) {
        item.localizedSlug = overrides[tool.slug];
      }

      let slug = toAscii(item.localizedSlug || tool.slug);

      let finalSlug = slug;
      let counter = 1;
      while (usedSlugs.has(finalSlug)) {
        finalSlug = `${slug}-${counter}`;
        counter++;
      }
      usedSlugs.add(finalSlug);
      item.localizedSlug = finalSlug;

      alignedItems.push(item);
    }

    const exportVarName = `${langName}MasterToolData`;
    let aliases = '';
    if (code === 'fr') aliases = `\nexport const frenchOptimizedBatch1ToolData = frenchMasterToolData;\n`;
    if (code === 'es') aliases = `\nexport const spanishLocalizedToolData = spanishMasterToolData;\n`;

    const newContent = `import type { LocalizedToolContent } from './localization';\n\nexport const ${exportVarName}: LocalizedToolContent[] = ${JSON.stringify(alignedItems, null, 2)};\n${aliases}`;
    fs.writeFileSync(filePath, newContent, 'utf-8');
    console.log(`Aligned 430 canonical records for ${fileName}`);
  }
}

fixCanonicalAlignment().catch(console.error);
