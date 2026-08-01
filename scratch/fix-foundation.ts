import fs from 'fs';
import path from 'path';

// Mapping of English loanwords in localized slugs per language
const slugReplacementMap: Record<string, Record<string, string>> = {
  es: {
    'generator': 'generador',
    'tool': 'herramienta',
    'maker': 'creador',
    'creator': 'creador',
    'builder': 'constructor',
    'online': 'en-linea',
    'free': 'gratis'
  },
  fr: {
    'generator': 'generateur',
    'tool': 'outil',
    'maker': 'createur',
    'creator': 'createur',
    'builder': 'constructeur',
    'online': 'en-ligne',
    'free': 'gratuit'
  },
  de: {
    'generator': 'generator',
    'tool': 'werkzeug',
    'maker': 'ersteller',
    'creator': 'ersteller',
    'builder': 'bauplaner',
    'online': 'online',
    'free': 'kostenlos'
  },
  pt: {
    'generator': 'gerador',
    'tool': 'ferramenta',
    'maker': 'criador',
    'creator': 'criador',
    'builder': 'construtor',
    'online': 'online',
    'free': 'gratis'
  },
  it: {
    'generator': 'generatore',
    'tool': 'strumento',
    'maker': 'creatore',
    'creator': 'creatore',
    'builder': 'costruttore',
    'online': 'online',
    'free': 'gratis'
  },
  pl: {
    'generator': 'generator',
    'tool': 'narzedzie',
    'maker': 'tworca',
    'creator': 'tworca',
    'builder': 'kreator',
    'online': 'online',
    'free': 'darmowy'
  },
  ru: {
    'generator': 'generator',
    'tool': 'instrument',
    'maker': 'sozdatel',
    'creator': 'sozdatel',
    'builder': 'kreator',
    'online': 'online',
    'free': 'besplatno'
  },
  tr: {
    'generator': 'olusturucu',
    'tool': 'arac',
    'maker': 'yapici',
    'creator': 'yaratici',
    'builder': 'kurucu',
    'online': 'cevrimici',
    'free': 'ucretsiz'
  },
  id: {
    'generator': 'pembuat',
    'tool': 'alat',
    'maker': 'pembuat',
    'creator': 'pencipta',
    'builder': 'penyusun',
    'online': 'online',
    'free': 'gratis'
  },
  sv: {
    'generator': 'generator',
    'tool': 'verktyg',
    'maker': 'skapare',
    'creator': 'skapare',
    'builder': 'byggare',
    'online': 'online',
    'free': 'gratis'
  },
  ms: {
    'generator': 'penjana',
    'tool': 'alat',
    'maker': 'pereka',
    'creator': 'pencipta',
    'builder': 'bina',
    'online': 'dalam-talian',
    'free': 'percuma'
  },
  bg: {
    'generator': 'generator',
    'tool': 'instrument',
    'maker': 'sazdatel',
    'creator': 'sazdatel',
    'builder': 'kreator',
    'online': 'online',
    'free': 'bezplaten'
  },
  hi: {
    'generator': 'generator',
    'tool': 'upkaran',
    'maker': 'nirmata',
    'creator': 'nirmata',
    'builder': 'nirmata',
    'online': 'online',
    'free': 'mufat'
  },
  bn: {
    'generator': 'generator',
    'tool': 'yantra',
    'maker': 'tairi-karok',
    'creator': 'tairi-karok',
    'builder': 'tari-karok',
    'online': 'online',
    'free': 'binamulye'
  },
  nl: {
    'generator': 'generator',
    'tool': 'hulpmiddel',
    'maker': 'maker',
    'creator': 'maker',
    'builder': 'bouwer',
    'online': 'online',
    'free': 'gratis'
  },
  ja: {
    'generator': 'jenereta',
    'tool': 'tsuru',
    'maker': 'sakusei',
    'creator': 'sakusei',
    'builder': 'sakusei',
    'online': 'onrain',
    'free': 'muryo'
  },
  ko: {
    'generator': 'saengseonggi',
    'tool': 'dogu',
    'maker': 'mandyulgi',
    'creator': 'mandyulgi',
    'builder': 'saengseonggi',
    'online': 'online',
    'free': 'muryo'
  },
  ar: {
    'generator': 'muwallid',
    'tool': 'adat',
    'maker': 'sane',
    'creator': 'sane',
    'builder': 'mubni',
    'online': 'online',
    'free': 'majjani'
  }
};

// ASCII diacritics removal function
function normalizeSlugToAscii(slug: string): string {
  let str = slug.toLowerCase();
  str = str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  str = str.replace(/æ/g, 'ae').replace(/œ/g, 'oe').replace(/ø/g, 'o').replace(/ß/g, 'ss');
  str = str.replace(/[^a-z0-9\-]/g, '-');
  str = str.replace(/\-+/g, '-').replace(/^\-+|\-+$/g, '');
  return str;
}

// Meta marketing terms replacement map per locale
const metaTermsReplacements: Record<string, [RegExp, string][]> = {
  de: [
    [/Free Tool/gi, 'Kostenloses Tool'],
    [/Online Tool/gi, 'Kostenloses Online-Tool'],
    [/Tool/gi, 'Werkzeug'],
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
    [/Online Tool/gi, 'Ücretsiz Çevrimiçi Araç'],
    [/Free Tool/gi, 'Ücretsiz Araç'],
    [/Generator/gi, 'Oluşturucu'],
    [/Word Counter/gi, 'Kelime Sayacı']
  ],
  pl: [
    [/Generator/gi, 'Generator'],
    [/Free Tool/gi, 'Darmowe narzędzie'],
    [/Online Tool/gi, 'Narzędzie online']
  ],
  es: [
    [/Online Tool/gi, 'Herramienta en línea'],
    [/Free Tool/gi, 'Herramienta gratuita']
  ],
  fr: [
    [/Online Tool/gi, 'Outil en ligne gratuit'],
    [/Free Tool/gi, 'Outil gratuit']
  ],
  pt: [
    [/Online Tool/gi, 'Ferramenta online gratuita'],
    [/Free Tool/gi, 'Ferramenta gratuita']
  ],
  it: [
    [/Online Tool/gi, 'Strumento online gratuito'],
    [/Free Tool/gi, 'Strumento gratuito']
  ],
  id: [
    [/Online Tool/gi, 'Alat Online Gratis'],
    [/Free Tool/gi, 'Alat Gratis']
  ],
  sv: [
    [/Online Tool/gi, 'Gratis onlineverktyg'],
    [/Free Tool/gi, 'Gratis verktyg']
  ],
  ms: [
    [/Online Tool/gi, 'Alat Dalam Talian Percuma'],
    [/Free Tool/gi, 'Alat Percuma']
  ],
  bg: [
    [/Online Tool/gi, 'Безплатен онлайн инструмент'],
    [/Free Tool/gi, 'Безплатен инструмент']
  ],
  hi: [
    [/Online Tool/gi, 'मुफ्त ऑनलाइन टूल'],
    [/Free Tool/gi, 'मुफ्त टूल']
  ],
  bn: [
    [/Online Tool/gi, 'ফ্রি অনলাইন টুল'],
    [/Free Tool/gi, 'বিনামূল্যে টুল']
  ],
  nl: [
    [/Online Tool/gi, 'Gratis online tool'],
    [/Free Tool/gi, 'Gratis tool']
  ],
  ja: [
    [/Online Tool/gi, '無料オンラインツール'],
    [/Free Tool/gi, '無料ツール']
  ],
  ko: [
    [/Online Tool/gi, '무료 온라인 툴'],
    [/Free Tool/gi, '무료 툴']
  ],
  ar: [
    [/Online Tool/gi, 'أداة مجانية أونلاين'],
    [/Free Tool/gi, 'أداة مجانية']
  ]
};

async function fixDatasetFiles() {
  const locales = ['es', 'fr', 'de', 'pt', 'it', 'pl', 'ru', 'tr', 'id', 'sv', 'ms', 'bg', 'hi', 'bn', 'nl', 'ja', 'ko', 'ar'];
  const langNames: Record<string, string> = {
    es: 'spanish', fr: 'french', de: 'german', pt: 'portuguese', it: 'italian', pl: 'polish',
    ru: 'russian', tr: 'turkish', id: 'indonesian', sv: 'swedish', ms: 'malay', bg: 'bulgarian',
    hi: 'hindi', bn: 'bengali', nl: 'dutch', ja: 'japanese', ko: 'korean', ar: 'arabic'
  };

  for (const lang of locales) {
    const fileName = `localization-${langNames[lang]}-data.ts`;
    const filePath = path.join(process.cwd(), 'src/data', fileName);

    if (!fs.existsSync(filePath)) {
      console.warn(`File not found: ${filePath}`);
      continue;
    }

    let content = fs.readFileSync(filePath, 'utf-8');
    let modificationsCount = 0;

    // 1. ASCII Normalize all localizedSlug entries & replace double English loanwords if redundant
    content = content.replace(/localizedSlug:\s*['"`]([^'"`]+)['"`]/g, (match, slug) => {
      let newSlug = slug;

      // Replace duplicate prefix 'generator-glitch-text-generator' -> 'generator-glitch-text' or native replacements
      if (newSlug.startsWith('generator-') && newSlug.endsWith('-generator')) {
        newSlug = newSlug.replace(/--generator$/, '').replace(/-generator$/, '');
      }

      // ASCII normalize diacritics
      newSlug = normalizeSlugToAscii(newSlug);

      if (newSlug !== slug) {
        modificationsCount++;
      }
      return `localizedSlug: '${newSlug}'`;
    });

    // 2. Clean English marketing terms in metaTitle and metaDescription
    const replacements = metaTermsReplacements[lang] || [];
    for (const [regex, replacement] of replacements) {
      content = content.replace(regex, replacement);
    }

    fs.writeFileSync(filePath, content, 'utf-8');
    console.log(`Updated ${fileName} (modifications made)`);
  }
}

fixDatasetFiles().catch(console.error);
