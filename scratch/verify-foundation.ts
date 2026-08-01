import fs from 'fs';
import { tools } from '../src/data/tools';
import { supportedLanguages, getLocalizedToolByCanonicalId, getToolRoute, getLocalizedToolBySlug } from '../src/data/localization';
import { noindexToolSlugs } from '../src/data/tool-page-data';
import { resolveCanonicalUrl } from '../src/lib/search-canonical';
import { getHreflangAlternates } from '../src/lib/search-hreflang';
import { buildMetadata } from '../src/lib/search-metadata';
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
  const nonEnLangs = supportedLanguages.filter(l => l.code !== 'en') as { code: LocalizedLanguageCode; label: string }[];

  // CHECK 1: Record Counts
  const check1: any[] = [];
  for (const langObj of nonEnLangs) {
    const code = langObj.code;
    const records = dataMap[code] || [];
    const expected = 430;
    const actual = records.length;
    const status = actual === expected ? 'PASS' : 'FAIL';
    check1.push({ Locale: code, Expected: expected, Actual: actual, Status: status });
  }

  // CHECK 2: Duplicate Slugs
  const check2: any[] = [];
  for (const langObj of nonEnLangs) {
    const code = langObj.code;
    const records = dataMap[code] || [];
    const slugMap = new Map<string, string[]>();

    for (const item of records) {
      const slug = item.localizedSlug;
      if (!slugMap.has(slug)) slugMap.set(slug, []);
      slugMap.get(slug)!.push(item.canonicalToolId);
    }

    for (const [slug, ids] of slugMap.entries()) {
      if (ids.length > 1) {
        check2.push({ Locale: code, Slug: slug, ToolIDs: ids });
      }
    }
  }

  // CHECK 3: English Slugs Remaining
  const check3: any[] = [];
  const enToolSlugs = new Map<string, string>();
  for (const t of tools) {
    enToolSlugs.set(t.slug, t.slug);
  }

  for (const langObj of nonEnLangs) {
    const code = langObj.code;
    const records = dataMap[code] || [];
    for (const item of records) {
      const enSlug = enToolSlugs.get(item.canonicalToolId);
      if (enSlug && item.localizedSlug === enSlug) {
        check3.push({ Locale: code, ToolID: item.canonicalToolId, Slug: item.localizedSlug });
      }
    }
  }

  // CHECK 4: Broken Route IDs
  const check4: any[] = [];
  for (const tool of tools) {
    for (const langObj of nonEnLangs) {
      const code = langObj.code;
      const records = dataMap[code] || [];
      const record = records.find(r => r.canonicalToolId === tool.slug);

      if (!record) {
        check4.push({
          Type: 'Missing Content Record',
          Locale: code,
          ToolSlug: tool.slug,
          Details: `No localized record in dataset for tool ${tool.slug}`
        });
      } else {
        if (!record.localizedSlug) {
          check4.push({
            Type: 'Missing Localized Slug',
            Locale: code,
            ToolSlug: tool.slug,
            Details: `Localized record for tool ${tool.slug} has empty localizedSlug`
          });
        }
        // Test resolution behavior
        if (!noindexToolSlugs.has(tool.slug)) {
          const resolvedById = getLocalizedToolByCanonicalId(tool.slug, code);
          if (!resolvedById) {
            check4.push({
              Type: 'Broken Indexable Lookup',
              Locale: code,
              ToolSlug: tool.slug,
              Details: `getLocalizedToolByCanonicalId('${tool.slug}', '${code}') returned undefined for indexable tool`
            });
          }
          const resolvedBySlug = getLocalizedToolBySlug(record.localizedSlug, code);
          if (!resolvedBySlug || resolvedBySlug.canonicalToolId !== tool.slug) {
            check4.push({
              Type: 'Broken Slug Resolution',
              Locale: code,
              ToolSlug: `${tool.slug} -> ${record.localizedSlug}`,
              Details: `getLocalizedToolBySlug('${record.localizedSlug}', '${code}') failed to resolve`
            });
          }
        }
      }
    }
  }

  // CHECK 5: Forensic Verification (20 Tools)
  const sampleIndices = [0, 21, 45, 78, 102, 134, 156, 189, 210, 245, 267, 289, 312, 335, 356, 378, 399, 412, 425, 429];
  const sampleLangs: LocalizedLanguageCode[] = ['es', 'fr', 'de', 'pt', 'it', 'pl', 'ru', 'tr', 'id', 'sv', 'ms', 'bg', 'hi', 'bn', 'nl', 'ja', 'ko', 'ar', 'es', 'fr'];
  const check5: any[] = [];

  for (let i = 0; i < 20; i++) {
    const tool = tools[sampleIndices[i]];
    const lang = sampleLangs[i];
    const records = dataMap[lang] || [];
    const record = records.find(r => r.canonicalToolId === tool.slug);
    const generatedUrl = getToolRoute(tool.slug, lang);
    const canonicalUrl = resolveCanonicalUrl(generatedUrl);
    const hreflangs = getHreflangAlternates(generatedUrl);
    const meta = buildMetadata({ pathname: generatedUrl, lang });

    const isNoindex = noindexToolSlugs.has(tool.slug);
    const hasTitle = Boolean(meta.title);
    const hasDesc = Boolean(meta.description);
    const hasCanonical = Boolean(canonicalUrl);
    const hasHreflangs = isNoindex ? hreflangs.length >= 2 : hreflangs.length >= 19;
    const hasSlug = Boolean(record?.localizedSlug);
    const routeResolves = Boolean(record);

    const pass = hasTitle && hasDesc && hasCanonical && hasHreflangs && hasSlug && routeResolves;

    check5.push({
      ToolID: tool.slug,
      Locale: lang,
      LocalizedSlug: record?.localizedSlug || 'N/A',
      GeneratedURL: generatedUrl,
      CanonicalURL: canonicalUrl,
      HreflangCount: hreflangs.length,
      MetaTitle: meta.title,
      MetaDescription: meta.description,
      RouteResolution: routeResolves ? 'OK' : 'BROKEN',
      Status: pass ? 'PASS' : 'FAIL'
    });
  }

  const results = { check1, check2, check3, check4, check5 };
  fs.writeFileSync('scratch/verification-results.json', JSON.stringify(results, null, 2));

  console.log("=== RESULTS SUMMARY ===");
  console.log(`Check 1 Failed Locales: ${check1.filter(c => c.Status === 'FAIL').length}`);
  console.log(`Check 2 Duplicate Count: ${check2.length}`);
  console.log(`Check 3 English Slugs Count: ${check3.length}`);
  console.log(`Check 4 Broken Routes Count: ${check4.length}`);
  console.log(`Check 5 Failed Forensic URLs: ${check5.filter(c => c.Status === 'FAIL').length}`);
}

main().catch(console.error);
