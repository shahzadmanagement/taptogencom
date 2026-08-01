import fs from 'fs';
import path from 'path';
import { tools } from '../src/data/tools';

const langMapNames: Record<string, string> = {
  es: 'spanish', fr: 'french', de: 'german', pt: 'portuguese', it: 'italian', pl: 'polish',
  ru: 'russian', tr: 'turkish', id: 'indonesian', sv: 'swedish', ms: 'malay', bg: 'bulgarian',
  hi: 'hindi', bn: 'bengali', nl: 'dutch', ja: 'japanese', ko: 'korean', ar: 'arabic'
};

const nativeSlugTerms: Record<string, Record<string, string>> = {
  es: { generator: 'generador', tool: 'herramienta', maker: 'creador', creator: 'creador', builder: 'constructor', online: 'en-linea', free: 'gratis' },
  fr: { generator: 'generateur', tool: 'outil', maker: 'createur', creator: 'createur', builder: 'constructeur', online: 'en-ligne', free: 'gratuit' },
  de: { generator: 'generator', tool: 'werkzeug', maker: 'ersteller', creator: 'ersteller', builder: 'planer', online: 'online', free: 'kostenlos' },
  pt: { generator: 'gerador', tool: 'ferramenta', maker: 'criador', creator: 'criador', builder: 'construtor', online: 'online', free: 'gratis' },
  it: { generator: 'generatore', tool: 'strumento', maker: 'creatore', creator: 'creatore', builder: 'costruttore', online: 'online', free: 'gratis' },
  pl: { generator: 'generator', tool: 'narzedzie', maker: 'tworca', creator: 'tworca', builder: 'kreator', online: 'online', free: 'darmowy' },
  ru: { generator: 'generator', tool: 'instrument', maker: 'sozdatel', creator: 'sozdatel', builder: 'kreator', online: 'online', free: 'besplatno' },
  tr: { generator: 'olusturucu', tool: 'arac', maker: 'yapici', creator: 'yaratici', builder: 'kurucu', online: 'cevrimici', free: 'ucretsiz' },
  id: { generator: 'pembuat', tool: 'alat', maker: 'pembuat', creator: 'pencipta', builder: 'penyusun', online: 'online', free: 'gratis' },
  sv: { generator: 'generator', tool: 'verktyg', maker: 'skapare', creator: 'skapare', builder: 'byggare', online: 'online', free: 'gratis' },
  ms: { generator: 'penjana', tool: 'alat', maker: 'pereka', creator: 'pencipta', builder: 'bina', online: 'dalam-talian', free: 'percuma' },
  bg: { generator: 'generator', tool: 'instrument', maker: 'sazdatel', creator: 'sazdatel', builder: 'kreator', online: 'online', free: 'bezplaten' },
  hi: { generator: 'janaratar', tool: 'upkaran', maker: 'nirmata', creator: 'nirmata', builder: 'nirmata', online: 'online', free: 'mufat' },
  bn: { generator: 'janaratar', tool: 'yantra', maker: 'tairi', creator: 'tairi', builder: 'tairi', online: 'online', free: 'binamulye' },
  nl: { generator: 'generator', tool: 'hulpmiddel', maker: 'maker', creator: 'maker', builder: 'bouwer', online: 'online', free: 'gratis' },
  ja: { generator: 'jenereta', tool: 'tsuru', maker: 'sakusei', creator: 'sakusei', builder: 'sakusei', online: 'onrain', free: 'muryo' },
  ko: { generator: 'saengseonggi', tool: 'dogu', maker: 'mandyulgi', creator: 'mandyulgi', builder: 'saengseonggi', online: 'online', free: 'muryo' },
  ar: { generator: 'muwallid', tool: 'adat', maker: 'sane', creator: 'sane', builder: 'mubni', online: 'online', free: 'majjani' }
};

function toAscii(str: string): string {
  let res = str.toLowerCase();
  res = res.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  res = res.replace(/æ/g, 'ae').replace(/œ/g, 'oe').replace(/ø/g, 'o').replace(/ß/g, 'ss');
  res = res.replace(/[^a-z0-9\-]/g, '-');
  res = res.replace(/\-+/g, '-').replace(/^\-+|\-+$/g, '');
  return res;
}

async function syncAllDatasets() {
  for (const [code, langName] of Object.entries(langMapNames)) {
    const fileName = `localization-${langName}-data.ts`;
    const filePath = path.join(process.cwd(), 'src/data', fileName);
    if (!fs.existsSync(filePath)) continue;

    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const arrayMatch = fileContent.match(/export const \w+: LocalizedToolContent\[\] = (\[[\s\S]*\]);/);
    if (!arrayMatch) continue;

    const items: any[] = eval(arrayMatch[1]);
    const terms = nativeSlugTerms[code] || {};
    const usedSlugs = new Set<string>();

    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      const targetTool = tools[i];
      if (targetTool) {
        item.canonicalToolId = targetTool.slug;
      }
      
      let slug = item.localizedSlug || targetTool.slug;

      // Normalize diacritics to ASCII
      slug = toAscii(slug);

      // Replace English loanwords where native term exists
      if (['tr', 'id', 'ms', 'hi', 'bn', 'ja', 'ko', 'ar', 'fr', 'es', 'pt', 'it'].includes(code)) {
        if (slug.includes('generator')) slug = slug.replace(/\bgenerator\b/g, terms.generator || 'generador');
        if (slug.includes('tool')) slug = slug.replace(/\btool\b/g, terms.tool || 'herramienta');
        if (slug.includes('maker')) slug = slug.replace(/\bmaker\b/g, terms.maker || 'creador');
        if (slug.includes('creator')) slug = slug.replace(/\bcreator\b/g, terms.creator || 'creador');
        if (slug.includes('builder')) slug = slug.replace(/\bbuilder\b/g, terms.builder || 'constructor');
        if (slug.includes('online')) slug = slug.replace(/\bonline\b/g, terms.online || 'en-linea');
        if (slug.includes('free')) slug = slug.replace(/\bfree\b/g, terms.free || 'gratis');
      }

      slug = toAscii(slug);

      let finalSlug = slug;
      let counter = 1;
      while (usedSlugs.has(finalSlug)) {
        finalSlug = `${slug}-${counter}`;
        counter++;
      }
      usedSlugs.add(finalSlug);
      item.localizedSlug = finalSlug;
    }

    const exportVarName = `${langName}MasterToolData`;
    let aliases = '';
    if (code === 'fr') aliases = `\nexport const frenchOptimizedBatch1ToolData = frenchMasterToolData;\n`;
    if (code === 'es') aliases = `\nexport const spanishLocalizedToolData = spanishMasterToolData;\n`;

    const newContent = `import type { LocalizedToolContent } from './localization';\n\nexport const ${exportVarName}: LocalizedToolContent[] = ${JSON.stringify(items, null, 2)};\n${aliases}`;
    fs.writeFileSync(filePath, newContent, 'utf-8');
    console.log(`Successfully synced and saved ${fileName}`);
  }
}

syncAllDatasets().catch(console.error);
