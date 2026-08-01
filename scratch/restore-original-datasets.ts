import fs from 'fs';
import path from 'path';
import { tools } from '../src/data/tools';

const langMapNames: Record<string, string> = {
  es: 'spanish', fr: 'french', de: 'german', pt: 'portuguese', it: 'italian', pl: 'polish',
  ru: 'russian', tr: 'turkish', id: 'indonesian', sv: 'swedish', ms: 'malay', bg: 'bulgarian',
  hi: 'hindi', bn: 'bengali', nl: 'dutch', ja: 'japanese', ko: 'korean', ar: 'arabic'
};

const slugNativeTerms: Record<string, Record<string, string>> = {
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

const metaTermsReplacements: Record<string, [RegExp, string][]> = {
  es: [
    [/\bFree Tool\b/gi, 'Herramienta gratuita'],
    [/\bOnline Tool\b/gi, 'Herramienta en línea'],
    [/\bCopy & Paste\b/gi, 'Copiar y pegar']
  ],
  fr: [
    [/\bFree Tool\b/gi, 'Outil gratuit'],
    [/\bOnline Tool\b/gi, 'Outil en ligne'],
    [/\bCopy & Paste\b/gi, 'Copier et coller']
  ],
  de: [
    [/\bFree Tool\b/gi, 'Kostenloses Werkzeug'],
    [/\bOnline Tool\b/gi, 'Online-Werkzeug'],
    [/\bCopy & Paste\b/gi, 'Kopieren und Einfügen']
  ],
  pt: [
    [/\bFree Tool\b/gi, 'Ferramenta gratuita'],
    [/\bOnline Tool\b/gi, 'Ferramenta online']
  ],
  it: [
    [/\bFree Tool\b/gi, 'Strumento gratuito'],
    [/\bOnline Tool\b/gi, 'Strumento online']
  ],
  pl: [
    [/\bFree Tool\b/gi, 'Darmowe narzędzie'],
    [/\bOnline Tool\b/gi, 'Narzędzie online']
  ],
  ru: [
    [/\bFree Tool\b/gi, 'Бесплатный инструмент'],
    [/\bOnline Tool\b/gi, 'Онлайн инструмент']
  ],
  tr: [
    [/\bFree Tool\b/gi, 'Ücretsiz Araç'],
    [/\bOnline Tool\b/gi, 'Çevrimiçi Araç']
  ],
  id: [
    [/\bFree Tool\b/gi, 'Alat Gratis'],
    [/\bOnline Tool\b/gi, 'Alat Online']
  ],
  sv: [
    [/\bFree Tool\b/gi, 'Gratis verktyg'],
    [/\bOnline Tool\b/gi, 'Onlineverktyg']
  ],
  ms: [
    [/\bFree Tool\b/gi, 'Alat Percuma'],
    [/\bOnline Tool\b/gi, 'Alat Dalam Talian']
  ],
  bg: [
    [/\bFree Tool\b/gi, 'Безплатен инструмент'],
    [/\bOnline Tool\b/gi, 'Онлайн инструмент']
  ],
  hi: [
    [/\bFree Tool\b/gi, 'मुफ्त टूल'],
    [/\bOnline Tool\b/gi, 'ऑनलाइन टूल']
  ],
  bn: [
    [/\bFree Tool\b/gi, 'বিনামূল্যে টুল'],
    [/\bOnline Tool\b/gi, 'অনলাইন টুল']
  ],
  nl: [
    [/\bFree Tool\b/gi, 'Gratis tool'],
    [/\bOnline Tool\b/gi, 'Online tool']
  ],
  ja: [
    [/\bFree Tool\b/gi, '無料ツール'],
    [/\bOnline Tool\b/gi, 'オンラインツール']
  ],
  ko: [
    [/\bFree Tool\b/gi, '무료 툴'],
    [/\bOnline Tool\b/gi, '온라인 툴']
  ],
  ar: [
    [/\bFree Tool\b/gi, 'أداة مجانية'],
    [/\bOnline Tool\b/gi, 'أداة أونلاين']
  ]
};

function toAscii(str: string): string {
  let res = str.toLowerCase();
  res = res.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  res = res.replace(/æ/g, 'ae').replace(/œ/g, 'oe').replace(/ø/g, 'o').replace(/ß/g, 'ss');
  res = res.replace(/[^a-z0-9\-]/g, '-');
  res = res.replace(/\-+/g, '-').replace(/^\-+|\-+$/g, '');
  return res;
}

async function restoreAndCleanDatasets() {
  for (const [code, langName] of Object.entries(langMapNames)) {
    const fileName = `localization-${langName}-data.ts`;
    const filePath = path.join(process.cwd(), 'src/data', fileName);
    if (!fs.existsSync(filePath)) continue;

    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const match = fileContent.match(/export const \w+: LocalizedToolContent\[\] = (\[[\s\S]*\]);/);
    if (!match) continue;

    const items: any[] = eval(match[1]);
    const terms = slugNativeTerms[code] || {};
    const metaRules = metaTermsReplacements[code] || [];
    const usedSlugs = new Set<string>();

    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      const targetTool = tools.find(t => t.slug === item.canonicalToolId) || tools[i];
      if (targetTool) {
        item.canonicalToolId = targetTool.slug;
      }

      let slug = item.localizedSlug || targetTool.slug;

      // Preserve special test overrides for es
      if (code === 'es' && targetTool.slug === 'fancy-text-generator') {
        slug = 'letras-bonitas';
      }

      // ASCII normalize diacritics
      slug = toAscii(slug);

      // Translate loanwords for target language (only if not explicit pilot slug)
      if (code !== 'es' || targetTool.slug !== 'fancy-text-generator') {
        if (['tr', 'id', 'ms', 'hi', 'bn', 'ja', 'ko', 'ar', 'fr', 'es', 'pt', 'it'].includes(code)) {
          if (slug.includes('generator')) slug = slug.replace(/\bgenerator\b/g, terms.generator || 'generador');
          if (slug.includes('tool')) slug = slug.replace(/\btool\b/g, terms.tool || 'herramienta');
          if (slug.includes('maker')) slug = slug.replace(/\bmaker\b/g, terms.maker || 'creador');
          if (slug.includes('creator')) slug = slug.replace(/\bcreator\b/g, terms.creator || 'creador');
          if (slug.includes('builder')) slug = slug.replace(/\bbuilder\b/g, terms.builder || 'constructor');
          if (slug.includes('online')) slug = slug.replace(/\bonline\b/g, terms.online || 'en-linea');
          if (slug.includes('free')) slug = slug.replace(/\bfree\b/g, terms.free || 'gratis');
        }
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

      // Clean metaTitle and metaDescription
      for (const [regex, rep] of metaRules) {
        if (item.metaTitle) item.metaTitle = item.metaTitle.replace(regex, rep);
        if (item.metaDescription) item.metaDescription = item.metaDescription.replace(regex, rep);
      }
    }

    const exportVarName = `${langName}MasterToolData`;
    let aliases = '';
    if (code === 'fr') aliases = `\nexport const frenchOptimizedBatch1ToolData = frenchMasterToolData;\n`;
    if (code === 'es') aliases = `\nexport const spanishLocalizedToolData = spanishMasterToolData;\n`;

    const newContent = `import type { LocalizedToolContent } from './localization';\n\nexport const ${exportVarName}: LocalizedToolContent[] = ${JSON.stringify(items, null, 2)};\n${aliases}`;
    fs.writeFileSync(filePath, newContent, 'utf-8');
    console.log(`Cleaned and restored alignment for ${fileName}`);
  }
}

restoreAndCleanDatasets().catch(console.error);
