import fs from 'fs';
import path from 'path';
import { tools } from '../src/data/tools';

const langMapNames: Record<string, string> = {
  es: 'spanish', fr: 'french', de: 'german', pt: 'portuguese', it: 'italian', pl: 'polish',
  ru: 'russian', tr: 'turkish', id: 'indonesian', sv: 'swedish', ms: 'malay', bg: 'bulgarian',
  hi: 'hindi', bn: 'bengali', nl: 'dutch', ja: 'japanese', ko: 'korean', ar: 'arabic'
};

const slugNativeTerms: Record<string, string> = {
  es: 'generador',
  fr: 'generateur',
  de: 'ersteller',
  pt: 'gerador',
  it: 'generatore',
  pl: 'kreator',
  ru: 'sozdatel',
  tr: 'olusturucu',
  id: 'pembuat',
  sv: 'skapare',
  ms: 'penjana',
  bg: 'sazdatel',
  hi: 'janaratar',
  bn: 'janaratar',
  nl: 'maker',
  ja: 'jenereta',
  ko: 'saengseonggi',
  ar: 'muwallid'
};

const metaCleaners: Record<string, [RegExp, string][]> = {
  es: [
    [/Generator/gi, 'Generador'], [/Free Tool/gi, 'Herramienta gratuita'], [/Online Tool/gi, 'Herramienta en línea'],
    [/Copy & Paste/gi, 'Copiar y pegar'], [/Convert Plain Text/gi, 'Convertir texto']
  ],
  fr: [
    [/Générateur/gi, 'Générateur'], [/Generator/gi, 'Générateur'], [/Free Tool/gi, 'Outil gratuit'], [/Online Tool/gi, 'Outil en ligne'],
    [/Copy & Paste/gi, 'Copier et coller'], [/Convert Plain Text/gi, 'Convertir le texte']
  ],
  de: [
    [/Generator/gi, 'Ersteller'], [/Free Tool/gi, 'Kostenloses Werkzeug'], [/Online Tool/gi, 'Online-Werkzeug'],
    [/Copy & Paste/gi, 'Kopieren und Einfügen'], [/Convert Plain Text/gi, 'Text umwandeln']
  ],
  pt: [
    [/Generator/gi, 'Gerador'], [/Free Tool/gi, 'Ferramenta gratuita'], [/Online Tool/gi, 'Ferramenta online'],
    [/Copy & Paste/gi, 'Copiar e colar'], [/Convert Plain Text/gi, 'Converter texto']
  ],
  it: [
    [/Generator/gi, 'Generatore'], [/Free Tool/gi, 'Strumento gratuito'], [/Online Tool/gi, 'Strumento online'],
    [/Copy & Paste/gi, 'Copia e incolla'], [/Convert Plain Text/gi, 'Converti testo']
  ],
  pl: [
    [/Generator/gi, 'Kreator'], [/Free Tool/gi, 'Darmowe narzędzie'], [/Online Tool/gi, 'Narzędzie online'],
    [/Copy & Paste/gi, 'Kopiuj i wklej'], [/Convert Plain Text/gi, 'Konwertuj tekst']
  ],
  ru: [
    [/Generator/gi, 'Создатель'], [/Free Tool/gi, 'Бесплатный инструмент'], [/Online Tool/gi, 'Онлайн инструмент'],
    [/Copy & Paste/gi, 'Копировать и вставить'], [/Convert Plain Text/gi, 'Конвертировать текст']
  ],
  tr: [
    [/Generator/gi, 'Oluşturucu'], [/Free Tool/gi, 'Ücretsiz Araç'], [/Online Tool/gi, 'Çevrimiçi Araç'],
    [/Copy & Paste/gi, 'Kopyala ve Yapıştır'], [/Convert Plain Text/gi, 'Metni Dönüştür']
  ],
  id: [
    [/Generator/gi, 'Pembuat'], [/Free Tool/gi, 'Alat Gratis'], [/Online Tool/gi, 'Alat Online'],
    [/Copy & Paste/gi, 'Salin & Tempel'], [/Convert Plain Text/gi, 'Ubah Teks']
  ],
  sv: [
    [/Generator/gi, 'Skapare'], [/Free Tool/gi, 'Gratis verktyg'], [/Online Tool/gi, 'Onlineverktyg'],
    [/Copy & Paste/gi, 'Kopiera och klistra in'], [/Convert Plain Text/gi, 'Konvertera text']
  ],
  ms: [
    [/Generator/gi, 'Penjana'], [/Free Tool/gi, 'Alat Percuma'], [/Online Tool/gi, 'Alat Dalam Talian'],
    [/Copy & Paste/gi, 'Salin & Tampal'], [/Convert Plain Text/gi, 'Tukar Teks']
  ],
  bg: [
    [/Generator/gi, 'Създател'], [/Free Tool/gi, 'Безплатен инструмент'], [/Online Tool/gi, 'Онлайн инструмент'],
    [/Copy & Paste/gi, 'Копирай и залепи'], [/Convert Plain Text/gi, 'Преобразувай текст']
  ],
  hi: [
    [/Generator/gi, 'जनरेटर'], [/Free Tool/gi, 'मुफ्त टूल'], [/Online Tool/gi, 'ऑनलाइन टूल'],
    [/Copy & Paste/gi, 'कॉपी और पेस्ट'], [/Convert Plain Text/gi, 'टेक्स्ट बदलें']
  ],
  bn: [
    [/Generator/gi, 'জেনারেটর'], [/Free Tool/gi, 'বিনামূল্যে টুল'], [/Online Tool/gi, 'অনলাইন টুল'],
    [/Copy & Paste/gi, 'কপি এবং পেস্ট'], [/Convert Plain Text/gi, 'টেক্সট রুপান্তর']
  ],
  nl: [
    [/Generator/gi, 'Maker'], [/Free Tool/gi, 'Gratis tool'], [/Online Tool/gi, 'Online tool'],
    [/Copy & Paste/gi, 'Kopiëren en plakken'], [/Convert Plain Text/gi, 'Tekst omzetten']
  ],
  ja: [
    [/Generator/gi, 'ジェネレーター'], [/Free Tool/gi, '無料ツール'], [/Online Tool/gi, 'オンラインツール'],
    [/Copy & Paste/gi, 'コピー＆ペースト'], [/Convert Plain Text/gi, 'テキスト変換']
  ],
  ko: [
    [/Generator/gi, '생성기'], [/Free Tool/gi, '무료 툴'], [/Online Tool/gi, '온라인 툴'],
    [/Copy & Paste/gi, '복사 및 붙여넣기'], [/Convert Plain Text/gi, '텍스트 변환']
  ],
  ar: [
    [/Generator/gi, 'مولد'], [/Free Tool/gi, 'أداة مجانية'], [/Online Tool/gi, 'أداة أونلاين'],
    [/Copy & Paste/gi, 'نسخ ولصق'], [/Convert Plain Text/gi, 'تحويل النص']
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

async function fixFinalSlugsAndMeta() {
  for (const [code, langName] of Object.entries(langMapNames)) {
    const fileName = `localization-${langName}-data.ts`;
    const filePath = path.join(process.cwd(), 'src/data', fileName);
    if (!fs.existsSync(filePath)) continue;

    let content = fs.readFileSync(filePath, 'utf-8');
    const term = slugNativeTerms[code] || 'generador';
    const usedSlugs = new Set<string>();

    // Parse array
    const match = content.match(/export const \w+: LocalizedToolContent\[\] = (\[[\s\S]*\]);/);
    if (!match) continue;

    const items: any[] = eval(match[1]);
    const metaRules = metaCleaners[code] || [];

    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      const targetTool = tools[i];
      if (targetTool) {
        item.canonicalToolId = targetTool.slug;
      }

      let slug = item.localizedSlug || targetTool.slug;

      // Replace generator / tool / maker / creator / builder / online / free in slugs
      slug = slug.replace(/\bgenerator\b/g, term);
      slug = slug.replace(/\btool\b/g, code === 'fr' ? 'outil' : code === 'es' ? 'herramienta' : code === 'de' ? 'werkzeug' : code === 'pt' ? 'ferramenta' : code === 'it' ? 'strumento' : 'arac');
      slug = slug.replace(/\bmaker\b/g, code === 'fr' ? 'createur' : 'creador');
      slug = slug.replace(/\bcreator\b/g, code === 'fr' ? 'createur' : 'creador');
      slug = slug.replace(/\bbuilder\b/g, code === 'fr' ? 'constructeur' : 'constructor');
      slug = slug.replace(/\bonline\b/g, code === 'fr' ? 'en-ligne' : code === 'es' ? 'en-linea' : 'online');
      slug = slug.replace(/\bfree\b/g, code === 'fr' ? 'gratuit' : code === 'es' ? 'gratis' : 'kostenlos');

      // ASCII normalize
      slug = toAscii(slug);

      // Unique slug
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
    console.log(`Final cleaned ${fileName}`);
  }
}

fixFinalSlugsAndMeta().catch(console.error);
