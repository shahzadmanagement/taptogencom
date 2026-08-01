import fs from 'fs';
import path from 'path';

const langNames: Record<string, string> = {
  es: 'spanish', fr: 'french', de: 'german', pt: 'portuguese', it: 'italian', pl: 'polish',
  ru: 'russian', tr: 'turkish', id: 'indonesian', sv: 'swedish', ms: 'malay', bg: 'bulgarian',
  hi: 'hindi', bn: 'bengali', nl: 'dutch', ja: 'japanese', ko: 'korean', ar: 'arabic'
};

function trimTitle(title: string): string {
  if (title.length <= 68) return title;
  const brandSuffix = ' — TapToGen';
  let mainPart = title.endsWith(brandSuffix) ? title.slice(0, -brandSuffix.length) : title;
  
  if (mainPart.length > 55) {
    mainPart = mainPart.slice(0, 52).trim() + '...';
  }
  return mainPart + brandSuffix;
}

function normalizeDesc(desc: string): string {
  if (desc.length >= 125 && desc.length <= 165) return desc;
  if (desc.length > 165) {
    return desc.slice(0, 160).trim() + '...';
  }
  return desc + ' Free, instant, and secure browser-based utility tool.';
}

async function fixP2MetaAndSlugs() {
  // 1. Fix English tools.ts meta titles
  const toolsPath = 'src/data/tools.ts';
  let toolsContent = fs.readFileSync(toolsPath, 'utf-8');
  let toolsFixed = 0;

  toolsContent = toolsContent.replace(/metaTitle:\s*['"`]([^'"`]+)['"`]/g, (match, title) => {
    const trimmed = trimTitle(title);
    if (trimmed !== title) toolsFixed++;
    return `metaTitle: '${trimmed}'`;
  });
  fs.writeFileSync(toolsPath, toolsContent, 'utf-8');
  console.log(`Trimmed ${toolsFixed} English meta titles in tools.ts`);

  // 2. Fix Localized datasets meta titles, descriptions & German slugs
  for (const [code, langName] of Object.entries(langNames)) {
    const fileName = `localization-${langName}-data.ts`;
    const filePath = path.join(process.cwd(), 'src/data', fileName);
    if (!fs.existsSync(filePath)) continue;

    let content = fs.readFileSync(filePath, 'utf-8');
    const match = content.match(/export const \w+: LocalizedToolContent\[\] = (\[[\s\S]*\]);/);
    if (!match) continue;

    const items: any[] = eval(match[1]);
    let fileFixed = 0;

    for (const item of items) {
      if (item.metaTitle) {
        const newTitle = trimTitle(item.metaTitle);
        if (newTitle !== item.metaTitle) {
          item.metaTitle = newTitle;
          fileFixed++;
        }
      }
      if (item.metaDescription) {
        item.metaDescription = normalizeDesc(item.metaDescription);
      }
      // Fix German repetitive slug
      if (code === 'de' && item.localizedSlug && item.localizedSlug.startsWith('ersteller-') && item.localizedSlug.endsWith('-ersteller')) {
        item.localizedSlug = item.localizedSlug.replace(/^ersteller-/, '');
      }
    }

    const exportVarName = `${langName}MasterToolData`;
    let aliases = '';
    if (code === 'fr') aliases = `\nexport const frenchOptimizedBatch1ToolData = frenchMasterToolData;\n`;
    if (code === 'es') aliases = `\nexport const spanishLocalizedToolData = spanishMasterToolData;\n`;

    const newContent = `import type { LocalizedToolContent } from './localization';\n\nexport const ${exportVarName}: LocalizedToolContent[] = ${JSON.stringify(items, null, 2)};\n${aliases}`;
    fs.writeFileSync(filePath, newContent, 'utf-8');
    console.log(`Cleaned meta and slugs for ${fileName} (${fileFixed} titles adjusted)`);
  }
}

fixP2MetaAndSlugs().catch(console.error);
