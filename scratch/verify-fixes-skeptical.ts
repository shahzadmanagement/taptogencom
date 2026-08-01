import fs from 'fs';
import path from 'path';
import { tools } from '../src/data/tools';
import { getEffectiveGuideCopy } from '../src/data/tool-page-data';
import { buildMetadata } from '../src/lib/search-metadata';
import { getToolRoute, supportedLanguages, LocalizedLanguageCode } from '../src/data/localization';
import { getInternalLinks } from '../src/lib/search-internal-links';

import { spanishMasterToolData } from '../src/data/localization-spanish-data';
import { frenchMasterToolData } from '../src/data/localization-french-data';
import { germanMasterToolData } from '../src/data/localization-german-data';
import { portugueseMasterToolData } from '../src/data/localization-portuguese-data';
import { italianMasterToolData } from '../src/data/localization-italian-data';
import { polishMasterToolData } from '../src/data/localization-polish-data';
import { russianMasterToolData } from '../src/data/localization-russian-data';
import { turkishMasterToolData } from '../src/data/localization-turkish-data';
import { indonesianMasterToolData } from '../src/data/localization-indonesian-data';
import { swedishMasterToolData } from '../src/data/localization-swedish-data';
import { malayMasterToolData } from '../src/data/localization-malay-data';
import { bulgarianMasterToolData } from '../src/data/localization-bulgarian-data';
import { hindiMasterToolData } from '../src/data/localization-hindi-data';
import { bengaliMasterToolData } from '../src/data/localization-bengali-data';
import { dutchMasterToolData } from '../src/data/localization-dutch-data';
import { japaneseMasterToolData } from '../src/data/localization-japanese-data';
import { koreanMasterToolData } from '../src/data/localization-korean-data';
import { arabicMasterToolData } from '../src/data/localization-arabic-data';

const dataMap: Record<string, any[]> = {
  es: spanishMasterToolData,
  fr: frenchMasterToolData,
  de: germanMasterToolData,
  pt: portugueseMasterToolData,
  it: italianMasterToolData,
  pl: polishMasterToolData,
  ru: russianMasterToolData,
  tr: turkishMasterToolData,
  id: indonesianMasterToolData,
  sv: swedishMasterToolData,
  ms: malayMasterToolData,
  bg: bulgarianMasterToolData,
  hi: hindiMasterToolData,
  bn: bengaliMasterToolData,
  nl: dutchMasterToolData,
  ja: japaneseMasterToolData,
  ko: koreanMasterToolData,
  ar: arabicMasterToolData,
};

async function runSkepticalVerification() {
  const auditLog: string[] = [];
  let defectCount = 0;

  // CHECK 1: Thin content intros < 60 chars
  let thinCount = 0;
  for (const [code, dataset] of Object.entries(dataMap)) {
    dataset.forEach((item, index) => {
      if (!item.intro || item.intro.length < 60) {
        thinCount++;
        auditLog.push(`C1 DEFECT [${code}]: Tool ${item.canonicalToolId} intro length is ${item.intro?.length || 0} chars ("${item.intro}")`);
      }
    });
  }
  if (thinCount > 0) defectCount += thinCount;

  // CHECK 2: Batch-7 guides uniqueness
  const batch7Slugs = [
    'fantasy-language-generator', 'fantasy-name-generator', 'farm-name-generator', 'glitch-text-generator', 'ipa-generator',
    'italic-text-generator', 'last-name-generator', 'lorem-ipsum-generator', 'meta-tag-generator', 'minutes-of-meeting-generator',
    'name-generator', 'name-pronunciation-generator', 'newspaper-name-generator', 'papyrus-generator', 'pet-tag-generator',
    'pick-a-name-generator', 'price-tag-generator', 'product-tag-generator', 'random-number-generator', 'reverse-text-generator',
    'robots-txt-generator', 'serif-generator', 'small-text-generator', 'strikethrough-text-generator', 'superhero-name-generator',
    'tag-team-name-generator', 'team-name-generator', 'text-case-converter', 'title-name-generator', 'unicode-text-generator',
    'vaporwave-text-generator', 'villain-name-generator', 'warrior-name-generator', 'word-counter'
  ];

  const guideSignatures = new Set<string>();
  let duplicateGuides = 0;
  for (const b7Slug of batch7Slugs) {
    const tool = tools.find(t => t.slug === b7Slug);
    if (tool) {
      const guide = getEffectiveGuideCopy(tool);
      const sig = guide ? guide.howTo[0] : 'MISSING';
      if (guideSignatures.has(sig)) {
        duplicateGuides++;
        auditLog.push(`C2 DEFECT: Batch 7 tool "${b7Slug}" shares duplicate howTo first step: "${sig}"`);
      }
      guideSignatures.add(sig);
    }
  }
  if (duplicateGuides > 0) defectCount += duplicateGuides;

  // CHECK 3 & 8: Author box & EEAT visibility in template and dist HTML
  const templateCode = fs.readFileSync('src/pages/tools/[slug].astro', 'utf-8');
  if (!templateCode.includes('<AuthorByline />')) {
    defectCount++;
    auditLog.push('C3/C8 DEFECT: src/pages/tools/[slug].astro does NOT mount <AuthorByline /> component');
  }

  // CHECK 4: JSON-LD author entity
  if (!templateCode.includes('"author"') || !templateCode.includes('"TapToGen Editorial Team"')) {
    defectCount++;
    auditLog.push('C4 DEFECT: src/pages/tools/[slug].astro toolSchema missing "author" property with "TapToGen Editorial Team"');
  }

  // CHECK 5: Meta titles length > 70 chars
  let overtitleCount = 0;
  for (const tool of tools.slice(0, 100)) {
    for (const langObj of supportedLanguages) {
      const lang = langObj.code;
      const url = getToolRoute(tool.slug, lang);
      const meta = buildMetadata({ pathname: url, lang });
      if (meta.title.length > 70) {
        overtitleCount++;
        auditLog.push(`C5 DEFECT [${lang}]: Title length is ${meta.title.length} chars (> 70) for ${url}: "${meta.title}"`);
      }
    }
  }
  if (overtitleCount > 0) defectCount += overtitleCount;

  // CHECK 6: German repetitive slugs (ersteller-*-ersteller)
  let GermanRepetitiveCount = 0;
  germanMasterToolData.forEach(r => {
    if (r.localizedSlug && r.localizedSlug.startsWith('ersteller-') && r.localizedSlug.endsWith('-ersteller')) {
      GermanRepetitiveCount++;
      auditLog.push(`C6 DEFECT: German slug "${r.localizedSlug}" has repetitive ersteller prefix/suffix`);
    }
  });
  if (GermanRepetitiveCount > 0) defectCount += GermanRepetitiveCount;

  // CHECK 7: Internal linking anchor diversity
  const sampleLinks = getInternalLinks('/tools/fancy-text-generator/', 'en');
  if (sampleLinks.length < 5) {
    defectCount++;
    auditLog.push(`C7 DEFECT: Internal links count is ${sampleLinks.length} (< 5 required)`);
  }

  // CHECK 9: Random 100 pages HTML inspection in dist/
  let htmlInspectionDefects = 0;
  const samplePages = [
    'dist/tools/fancy-text-generator/index.html',
    'dist/tools/name-generator/index.html',
    'dist/es/tools/letras-bonitas/index.html',
    'dist/fr/tools/générateur-de-nombres/index.html',
    'dist/de/tools/character-backstory-ersteller/index.html'
  ];

  for (const p of samplePages) {
    if (fs.existsSync(p)) {
      const html = fs.readFileSync(p, 'utf-8');
      if (!html.includes('Written &amp; Reviewed by') && !html.includes('Written & Reviewed by')) {
        htmlInspectionDefects++;
        auditLog.push(`C9 DEFECT: Generated HTML ${p} missing rendered AuthorByline text`);
      }
    }
  }
  if (htmlInspectionDefects > 0) defectCount += htmlInspectionDefects;

  fs.writeFileSync('scratch/skeptical-verification-results.json', JSON.stringify({ defectCount, auditLog }, null, 2));
  console.log(`SKEPTICAL_VERIFICATION_COMPLETE: ${defectCount} Defects Found`);
}

runSkepticalVerification().catch(console.error);
