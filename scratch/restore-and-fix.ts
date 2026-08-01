import fs from 'fs';
import path from 'path';
import { tools } from '../src/data/tools';

const langMapNames: Record<string, string> = {
  es: 'spanish', fr: 'french', de: 'german', pt: 'portuguese', it: 'italian', pl: 'polish',
  ru: 'russian', tr: 'turkish', id: 'indonesian', sv: 'swedish', ms: 'malay', bg: 'bulgarian',
  hi: 'hindi', bn: 'bengali', nl: 'dutch', ja: 'japanese', ko: 'korean', ar: 'arabic'
};

const slugTranslations: Record<string, Record<string, string>> = {
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

const metaReplacements: Record<string, [RegExp, string][]> = {
  de: [
    [/Kostenloser\s+Kostenloser/gi, 'Kostenloser'],
    [/Online-Tool\s+Online-Tool/gi, 'Online-Tool'],
    [/Free Tool/gi, 'Kostenloses Tool'],
    [/Online Tool/gi, 'Online-Tool'],
    [/Copy & Paste/gi, 'Kopieren und Einfügen'],
    [/Convert Plain Text/gi, 'Text umwandeln']
  ],
  ru: [
    [/Fantasy Name Generator/gi, 'Генератор фэнтези имен'],
    [/Generator/gi, 'Генератор'],
    [/Free Tool/gi, 'Бесплатный инструмент'],
    [/Online Tool/gi, 'Онлайн инструмент'],
    [/Copy & Paste/gi, 'Копировать и вставить']
  ],
  tr: [
    [/Online Tool/gi, 'Çevrimiçi Araç'],
    [/Free Tool/gi, 'Ücretsiz Araç'],
    [/Generator/gi, 'Oluşturucu']
  ],
  es: [
    [/Online Tool/gi, 'Herramienta en línea'],
    [/Free Tool/gi, 'Herramienta gratuita']
  ],
  fr: [
    [/Online Tool/gi, 'Outil en ligne'],
    [/Free Tool/gi, 'Outil gratuit']
  ],
  pt: [
    [/Online Tool/gi, 'Ferramenta online'],
    [/Free Tool/gi, 'Ferramenta gratuita']
  ],
  it: [
    [/Online Tool/gi, 'Strumento online'],
    [/Free Tool/gi, 'Strumento gratuito']
  ],
  pl: [
    [/Online Tool/gi, 'Narzędzie online'],
    [/Free Tool/gi, 'Darmowe narzędzie']
  ],
  id: [
    [/Online Tool/gi, 'Alat Online'],
    [/Free Tool/gi, 'Alat Gratis']
  ],
  sv: [
    [/Online Tool/gi, 'Onlineverktyg'],
    [/Free Tool/gi, 'Gratis verktyg']
  ],
  ms: [
    [/Online Tool/gi, 'Alat Dalam Talian'],
    [/Free Tool/gi, 'Alat Percuma']
  ],
  bg: [
    [/Online Tool/gi, 'Онлайн инструмент'],
    [/Free Tool/gi, 'Безплатен инструмент']
  ],
  hi: [
    [/Online Tool/gi, 'ऑनलाइन टूल'],
    [/Free Tool/gi, 'मुफ्त टूल']
  ],
  bn: [
    [/Online Tool/gi, 'অনলাইন টুল'],
    [/Free Tool/gi, 'বিনামূল্যে টুল']
  ],
  nl: [
    [/Online Tool/gi, 'Online tool'],
    [/Free Tool/gi, 'Gratis tool']
  ],
  ja: [
    [/Online Tool/gi, 'オンラインツール'],
    [/Free Tool/gi, '無料ツール']
  ],
  ko: [
    [/Online Tool/gi, '온라인 툴'],
    [/Free Tool/gi, '무료 툴']
  ],
  ar: [
    [/Online Tool/gi, 'أداة أونلاين'],
    [/Free Tool/gi, 'أداة مجانية']
  ]
};

async function processFixes() {
  for (const [lang, langName] of Object.entries(langMapNames)) {
    const filePath = path.join(process.cwd(), 'src/data', `localization-${langName}-data.ts`);
    if (!fs.existsSync(filePath)) continue;

    let content = fs.readFileSync(filePath, 'utf-8');

    // Re-ensure canonicalToolId matches actual tool slugs in tools.ts
    // Extract array items using regex or JSON parser safely
    const usedSlugs = new Set<string>();
    const dict = slugTranslations[lang] || {};

    // 1. Restore any misnamed canonicalToolId
    content = content.replace(/canonicalToolId:\s*['"`]([^'"`]+)['"`]/g, (match, id) => {
      // Find matching tool in tools.ts
      const matchTool = tools.find(t => t.slug === id || toAscii(t.slug) === toAscii(id));
      const validId = matchTool ? matchTool.slug : id;
      return `canonicalToolId: '${validId}'`;
    });

    // 2. Fix localizedSlug entries
    content = content.replace(/localizedSlug:\s*['"`]([^'"`]+)['"`]/g, (match, originalSlug) => {
      let slug = originalSlug;

      // Translate loanwords for target language
      if (dict.generator) slug = slug.replace(/\bgenerator\b/g, dict.generator);
      if (dict.tool) slug = slug.replace(/\btool\b/g, dict.tool);
      if (dict.maker) slug = slug.replace(/\bmaker\b/g, dict.maker);
      if (dict.creator) slug = slug.replace(/\bcreator\b/g, dict.creator);
      if (dict.builder) slug = slug.replace(/\bbuilder\b/g, dict.builder);
      if (dict.online) slug = slug.replace(/\bonline\b/g, dict.online);
      if (dict.free) slug = slug.replace(/\bfree\b/g, dict.free);

      // Normalize diacritics to ASCII
      slug = toAscii(slug);

      // Deduplicate per locale
      let finalSlug = slug;
      let count = 1;
      while (usedSlugs.has(finalSlug)) {
        finalSlug = `${slug}-${count}`;
        count++;
      }
      usedSlugs.add(finalSlug);

      return `localizedSlug: '${finalSlug}'`;
    });

    // 3. Replace English terms in meta
    const terms = metaReplacements[lang] || [];
    for (const [regex, replacement] of terms) {
      content = content.replace(regex, replacement);
    }

    fs.writeFileSync(filePath, content, 'utf-8');
    console.log(`Processed ${langName}`);
  }
}

processFixes().catch(console.error);
