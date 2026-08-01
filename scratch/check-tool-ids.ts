import { tools } from '../src/data/tools';
import { supportedLanguages } from '../src/data/localization';
import type { LocalizedLanguageCode } from '../src/data/localization';

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

async function main() {
  const enSlugs = tools.map(t => t.slug);
  const enSet = new Set(enSlugs);
  console.log(`Total English Tool Slugs: ${enSlugs.length}`);

  const nonEnLangs = supportedLanguages.filter(l => l.code !== 'en') as { code: LocalizedLanguageCode; label: string }[];

  for (const langObj of nonEnLangs) {
    const code = langObj.code;
    const records = dataMap[code] || [];
    const recordIds = records.map(r => r.canonicalToolId);
    const recordSet = new Set(recordIds);

    const missingInDataset = enSlugs.filter(slug => !recordSet.has(slug));
    const extraInDataset = recordIds.filter(id => !enSet.has(id));

    if (missingInDataset.length > 0 || extraInDataset.length > 0) {
      console.log(`\n--- Locale '${code}' Mismatches ---`);
      console.log(`Missing in '${code}' dataset (${missingInDataset.length}):`, missingInDataset);
      console.log(`Extra in '${code}' dataset (${extraInDataset.length}):`, extraInDataset);
    }
  }
}

main().catch(console.error);
