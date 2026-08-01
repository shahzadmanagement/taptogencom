import fs from 'fs';
import { tools } from '../src/data/tools';
import { categories } from '../src/data/categories';
import { toolHubs } from '../src/data/hubs';
import { noindexToolSlugs } from '../src/data/tool-page-data';
import {
  supportedLanguages,
  getLocalizedToolByCanonicalId,
  getLocalizedToolBySlug,
  getToolRoute,
  getToolLanguageAlternates,
  getLocalizedUiLabel,
  LocalizedLanguageCode,
  SupportedLanguageCode
} from '../src/data/localization';
import { resolveCanonicalUrl } from '../src/lib/search-canonical';
import { getHreflangAlternates } from '../src/lib/search-hreflang';
import { buildMetadata } from '../src/lib/search-metadata';
import { getBreadcrumbs } from '../src/lib/search-breadcrumb';
import { getInternalLinks } from '../src/lib/search-internal-links';
import { getSitemapData } from '../src/lib/search-sitemap';

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

async function runAudit() {
  const nonEnLangs = supportedLanguages.filter(l => l.code !== 'en') as { code: LocalizedLanguageCode; label: string }[];
  const enSlugsSet = new Set(tools.map(t => t.slug));

  // CHECK 1: Record Count
  const check1: any[] = [];
  for (const langObj of nonEnLangs) {
    const code = langObj.code;
    const records = dataMap[code] || [];
    check1.push({ locale: code, expected: 430, actual: records.length, status: records.length === 430 ? 'PASS' : 'FAIL' });
  }

  // CHECK 2: Slugs containing English keywords (generator, tool, maker, creator, builder)
  const check2: any[] = [];
  const englishWordsRegex = /\b(generator|tool|maker|creator|builder)\b/i;
  for (const langObj of nonEnLangs) {
    const code = langObj.code;
    const records = dataMap[code] || [];
    for (const r of records) {
      if (englishWordsRegex.test(r.localizedSlug)) {
        check2.push({ locale: code, toolId: r.canonicalToolId, slug: r.localizedSlug });
      }
    }
  }

  // CHECK 3: Double hyphen '--'
  const check3: any[] = [];
  for (const langObj of nonEnLangs) {
    const code = langObj.code;
    const records = dataMap[code] || [];
    for (const r of records) {
      if (r.localizedSlug.includes('--')) {
        check3.push({ locale: code, toolId: r.canonicalToolId, slug: r.localizedSlug });
      }
    }
  }

  // CHECK 4: Trailing hyphen '-'
  const check4: any[] = [];
  for (const langObj of nonEnLangs) {
    const code = langObj.code;
    const records = dataMap[code] || [];
    for (const r of records) {
      if (r.localizedSlug.endsWith('-')) {
        check4.push({ locale: code, toolId: r.canonicalToolId, slug: r.localizedSlug });
      }
    }
  }

  // CHECK 5: Leading hyphen '-'
  const check5: any[] = [];
  for (const langObj of nonEnLangs) {
    const code = langObj.code;
    const records = dataMap[code] || [];
    for (const r of records) {
      if (r.localizedSlug.startsWith('-')) {
        check5.push({ locale: code, toolId: r.canonicalToolId, slug: r.localizedSlug });
      }
    }
  }

  // CHECK 6: Spaces, underscores, uppercase, non-url-safe characters
  const check6: any[] = [];
  const urlUnsafeRegex = /[^a-z0-9\-\%]/;
  for (const langObj of nonEnLangs) {
    const code = langObj.code;
    const records = dataMap[code] || [];
    for (const r of records) {
      const slug = r.localizedSlug;
      if (/\s/.test(slug) || /_/.test(slug) || /[A-Z]/.test(slug) || urlUnsafeRegex.test(slug)) {
        check6.push({ locale: code, toolId: r.canonicalToolId, slug: r.localizedSlug, reason: 'Invalid URL character/formatting' });
      }
    }
  }

  // CHECK 7: Duplicate Slugs
  const check7: any[] = [];
  for (const langObj of nonEnLangs) {
    const code = langObj.code;
    const records = dataMap[code] || [];
    const slugMap = new Map<string, string[]>();

    for (const r of records) {
      const slug = r.localizedSlug;
      if (!slugMap.has(slug)) slugMap.set(slug, []);
      slugMap.get(slug)!.push(r.canonicalToolId);
    }

    for (const [slug, ids] of slugMap.entries()) {
      if (ids.length > 1) {
        check7.push({ locale: code, slug, toolIds: ids });
      }
    }
  }

  // CHECK 8: Routes that resolve to /tools/ instead of /{locale}/tools/
  const check8: any[] = [];
  for (const tool of tools) {
    if (noindexToolSlugs.has(tool.slug)) continue;
    for (const langObj of nonEnLangs) {
      const code = langObj.code;
      const route = getToolRoute(tool.slug, code);
      if (!route.startsWith(`/${code}/tools/`)) {
        check8.push({ locale: code, toolId: tool.slug, resolvedRoute: route });
      }
    }
  }

  // CHECK 9: Random 100 tools sample inspection
  const check9: any[] = [];
  const sampleIndices: number[] = [];
  for (let i = 0; i < 100; i++) {
    sampleIndices.push(Math.floor((i * tools.length) / 100));
  }
  for (let i = 0; i < 100; i++) {
    const tool = tools[sampleIndices[i]];
    const langObj = nonEnLangs[i % nonEnLangs.length];
    const code = langObj.code;
    const record = (dataMap[code] || []).find(r => r.canonicalToolId === tool.slug);
    const generatedUrl = getToolRoute(tool.slug, code);
    const canonical = resolveCanonicalUrl(generatedUrl);
    const hreflangs = getHreflangAlternates(generatedUrl);
    const meta = buildMetadata({ pathname: generatedUrl, lang: code });

    check9.push({
      toolId: tool.slug,
      locale: code,
      localizedSlug: record?.localizedSlug || 'N/A',
      generatedUrl,
      canonical,
      hreflangCount: hreflangs.length,
      metaTitle: meta.title,
      metaDescription: meta.description
    });
  }

  // CHECK 10: Metadata containing English in non-English locales
  const check10: any[] = [];
  const englishMetaPattern = /\b(Generator|Free Tool|Online Tool|Copy & Paste|Convert Plain Text|Browse All)\b/;
  for (const tool of tools) {
    if (noindexToolSlugs.has(tool.slug)) continue;
    for (const langObj of nonEnLangs) {
      const code = langObj.code;
      const url = getToolRoute(tool.slug, code);
      const meta = buildMetadata({ pathname: url, lang: code });
      
      const titleMatch = englishMetaPattern.exec(meta.title);
      const descMatch = englishMetaPattern.exec(meta.description);
      if (titleMatch || descMatch) {
        check10.push({
          locale: code,
          toolId: tool.slug,
          matchedTerm: titleMatch ? titleMatch[0] : descMatch![0],
          field: titleMatch ? 'metaTitle' : 'metaDescription',
          text: titleMatch ? meta.title : meta.description
        });
      }
    }
  }

  // CHECK 11: Untranslated UI strings
  const check11: any[] = [];
  const testUiLabels = ['Generate', 'Copy', 'Clear', 'Copied!', 'Options', 'Category', 'Related Tools', 'Share', 'Download'];
  for (const langObj of nonEnLangs) {
    const code = langObj.code;
    for (const label of testUiLabels) {
      const translated = getLocalizedUiLabel(label, code);
      if (translated === label && !['es', 'fr', 'de', 'pt', 'it', 'pl', 'sv', 'ms'].includes(code)) {
        check11.push({ locale: code, label, translated });
      }
    }
  }

  // CHECK 12: Hreflang mismatches
  const check12: any[] = [];
  for (const tool of tools) {
    if (noindexToolSlugs.has(tool.slug)) continue;
    for (const langObj of nonEnLangs) {
      const code = langObj.code;
      const url = getToolRoute(tool.slug, code);
      const hreflangs = getHreflangAlternates(url);
      if (hreflangs.length !== 20) {
        check12.push({ locale: code, toolId: tool.slug, hreflangCount: hreflangs.length });
      }
    }
  }

  // CHECK 13: Canonical mismatches
  const check13: any[] = [];
  for (const tool of tools) {
    if (noindexToolSlugs.has(tool.slug)) continue;
    for (const langObj of nonEnLangs) {
      const code = langObj.code;
      const url = getToolRoute(tool.slug, code);
      const canonical = resolveCanonicalUrl(url);
      const expectedCanonical = `https://taptogen.com${url}`;
      if (canonical !== expectedCanonical) {
        check13.push({ locale: code, toolId: tool.slug, actual: canonical, expected: expectedCanonical });
      }
    }
  }

  // CHECK 14: Sitemap mismatches
  const check14: any[] = [];
  const sitemapData = getSitemapData();
  const sitemapLocalesSet = new Set(sitemapData.locales.map(u => u.loc));
  for (const tool of tools) {
    if (noindexToolSlugs.has(tool.slug)) continue;
    for (const langObj of nonEnLangs) {
      const code = langObj.code;
      const url = getToolRoute(tool.slug, code);
      const fullUrl = resolveCanonicalUrl(url);
      if (!sitemapLocalesSet.has(fullUrl)) {
        check14.push({ locale: code, toolId: tool.slug, missingSitemapUrl: fullUrl });
      }
    }
  }

  // CHECK 15: Orphan localized tools
  const check15: any[] = [];
  for (const langObj of nonEnLangs) {
    const code = langObj.code;
    const records = dataMap[code] || [];
    for (const r of records) {
      if (!enSlugsSet.has(r.canonicalToolId)) {
        check15.push({ locale: code, canonicalToolId: r.canonicalToolId, localizedSlug: r.localizedSlug });
      }
    }
  }

  // CHECK 16: Missing localized pages
  const check16: any[] = [];
  for (const tool of tools) {
    for (const langObj of nonEnLangs) {
      const code = langObj.code;
      const record = (dataMap[code] || []).find(r => r.canonicalToolId === tool.slug);
      if (!record) {
        check16.push({ locale: code, toolId: tool.slug });
      }
    }
  }

  // CHECK 17: Broken breadcrumbs
  const check17: any[] = [];
  for (const tool of tools) {
    if (noindexToolSlugs.has(tool.slug)) continue;
    for (const langObj of nonEnLangs) {
      const code = langObj.code;
      const url = getToolRoute(tool.slug, code);
      const items = getBreadcrumbs(url, code);
      if (!items || items.length < 3) {
        check17.push({ locale: code, toolId: tool.slug, itemCount: items ? items.length : 0 });
      }
    }
  }

  // CHECK 18: Broken internal localized links
  const check18: any[] = [];
  for (const tool of tools) {
    if (noindexToolSlugs.has(tool.slug)) continue;
    for (const langObj of nonEnLangs) {
      const code = langObj.code;
      const url = getToolRoute(tool.slug, code);
      const links = getInternalLinks(url, code);
      if (!links || links.length < 5) {
        check18.push({ locale: code, toolId: tool.slug, linkCount: links ? links.length : 0 });
      }
    }
  }

  // CHECK 19: Title duplicates per locale
  const check19: any[] = [];
  for (const langObj of nonEnLangs) {
    const code = langObj.code;
    const titleMap = new Map<string, string[]>();
    for (const tool of tools) {
      if (noindexToolSlugs.has(tool.slug)) continue;
      const url = getToolRoute(tool.slug, code);
      const meta = buildMetadata({ pathname: url, lang: code });
      if (!titleMap.has(meta.title)) titleMap.set(meta.title, []);
      titleMap.get(meta.title)!.push(tool.slug);
    }
    for (const [title, ids] of titleMap.entries()) {
      if (ids.length > 1) {
        check19.push({ locale: code, title, toolIds: ids });
      }
    }
  }

  // CHECK 20: Description duplicates per locale
  const check20: any[] = [];
  for (const langObj of nonEnLangs) {
    const code = langObj.code;
    const descMap = new Map<string, string[]>();
    for (const tool of tools) {
      if (noindexToolSlugs.has(tool.slug)) continue;
      const url = getToolRoute(tool.slug, code);
      const meta = buildMetadata({ pathname: url, lang: code });
      if (!descMap.has(meta.description)) descMap.set(meta.description, []);
      descMap.get(meta.description)!.push(tool.slug);
    }
    for (const [desc, ids] of descMap.entries()) {
      if (ids.length > 1) {
        check20.push({ locale: code, description: desc, toolIds: ids });
      }
    }
  }

  const results = {
    check1, check2, check3, check4, check5, check6, check7, check8, check9, check10,
    check11, check12, check13, check14, check15, check16, check17, check18, check19, check20
  };

  fs.writeFileSync('scratch/forensic-results.json', JSON.stringify(results, null, 2));

  console.log("FORENSIC_AUDIT_COMPLETE");
  console.log(`C1 Failures: ${check1.filter(c => c.status === 'FAIL').length}`);
  console.log(`C2 English Slugs: ${check2.length}`);
  console.log(`C3 Double Hyphens: ${check3.length}`);
  console.log(`C4 Trailing Hyphens: ${check4.length}`);
  console.log(`C5 Leading Hyphens: ${check5.length}`);
  console.log(`C6 Unsafe Slugs: ${check6.length}`);
  console.log(`C7 Duplicate Slugs: ${check7.length}`);
  console.log(`C8 Unresolved Routes: ${check8.length}`);
  console.log(`C9 100 Sample Inspected: ${check9.length}`);
  console.log(`C10 English Metadata Terms: ${check10.length}`);
  console.log(`C11 Untranslated UI Strings: ${check11.length}`);
  console.log(`C12 Hreflang Mismatches: ${check12.length}`);
  console.log(`C13 Canonical Mismatches: ${check13.length}`);
  console.log(`C14 Sitemap Mismatches: ${check14.length}`);
  console.log(`C15 Orphan Tools: ${check15.length}`);
  console.log(`C16 Missing Pages: ${check16.length}`);
  console.log(`C17 Broken Breadcrumbs: ${check17.length}`);
  console.log(`C18 Broken Links: ${check18.length}`);
  console.log(`C19 Title Duplicates: ${check19.length}`);
  console.log(`C20 Description Duplicates: ${check20.length}`);
}

runAudit().catch(console.error);
