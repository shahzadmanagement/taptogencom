import fs from 'fs';
import path from 'path';

const slugNativeReplacements: Record<string, { generator: string; tool: string; maker: string; creator: string; builder: string; online: string; free: string }> = {
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

function normalizeSlugToAscii(slug: string): string {
  let str = slug.toLowerCase();
  str = str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  str = str.replace(/æ/g, 'ae').replace(/œ/g, 'oe').replace(/ø/g, 'o').replace(/ß/g, 'ss');
  str = str.replace(/[^a-z0-9\-]/g, '-');
  str = str.replace(/\-+/g, '-').replace(/^\-+|\-+$/g, '');
  return str;
}

async function fixAllSlugsAndMetadata() {
  const locales = ['es', 'fr', 'de', 'pt', 'it', 'pl', 'ru', 'tr', 'id', 'sv', 'ms', 'bg', 'hi', 'bn', 'nl', 'ja', 'ko', 'ar'];
  const langNames: Record<string, string> = {
    es: 'spanish', fr: 'french', de: 'german', pt: 'portuguese', it: 'italian', pl: 'polish',
    ru: 'russian', tr: 'turkish', id: 'indonesian', sv: 'swedish', ms: 'malay', bg: 'bulgarian',
    hi: 'hindi', bn: 'bengali', nl: 'dutch', ja: 'japanese', ko: 'korean', ar: 'arabic'
  };

  for (const lang of locales) {
    const fileName = `localization-${langNames[lang]}-data.ts`;
    const filePath = path.join(process.cwd(), 'src/data', fileName);
    if (!fs.existsSync(filePath)) continue;

    let content = fs.readFileSync(filePath, 'utf-8');
    const mapping = slugNativeReplacements[lang];
    const usedSlugs = new Set<string>();

    // Parse array of objects in file
    content = content.replace(/localizedSlug:\s*['"`]([^'"`]+)['"`]/g, (match, originalSlug) => {
      let slug = originalSlug;

      // In non-English locales, replace loanwords if language has direct native translation
      if (['tr', 'id', 'ms', 'hi', 'bn', 'ja', 'ko', 'ar', 'fr', 'es', 'pt', 'it'].includes(lang)) {
        if (slug.includes('generator')) slug = slug.replace(/\bgenerator\b/g, mapping.generator);
        if (slug.includes('tool')) slug = slug.replace(/\btool\b/g, mapping.tool);
        if (slug.includes('maker')) slug = slug.replace(/\bmaker\b/g, mapping.maker);
        if (slug.includes('creator')) slug = slug.replace(/\bcreator\b/g, mapping.creator);
        if (slug.includes('builder')) slug = slug.replace(/\bbuilder\b/g, mapping.builder);
        if (slug.includes('online')) slug = slug.replace(/\bonline\b/g, mapping.online);
        if (slug.includes('free')) slug = slug.replace(/\bfree\b/g, mapping.free);
      } else if (['de', 'pl', 'ru', 'sv', 'bg', 'nl'].includes(lang)) {
        // Remove duplicate prefix/suffix like generator-glitch-text-generator -> glitch-text-generator or generator-name -> generator-name
        if (slug.startsWith('generator-') && slug.includes('generator', 10)) {
          slug = slug.replace(/^generator-/, '');
        }
        if (slug.endsWith('-generator-hi') || slug.endsWith('-generator-bn')) {
          slug = slug.replace(/-generator-/, `-${mapping.generator}-`);
        }
      }

      // ASCII normalize diacritics
      slug = normalizeSlugToAscii(slug);

      // Ensure uniqueness within locale
      let finalSlug = slug;
      let counter = 1;
      while (usedSlugs.has(finalSlug)) {
        finalSlug = `${slug}-${counter}`;
        counter++;
      }
      usedSlugs.add(finalSlug);

      return `localizedSlug: '${finalSlug}'`;
    });

    fs.writeFileSync(filePath, content, 'utf-8');
    console.log(`Cleaned slugs for ${fileName}`);
  }
}

fixAllSlugsAndMetadata().catch(console.error);
