import fs from 'fs';
import path from 'path';
import { tools } from '../src/data/tools';
import { categories } from '../src/data/categories';
import { toolHubs } from '../src/data/hubs';
import { noindexToolSlugs, getEffectiveGuideCopy } from '../src/data/tool-page-data';
import {
  supportedLanguages,
  getLocalizedToolByCanonicalId,
  getLocalizedToolBySlug,
  getToolRoute,
  getLocalizedUiLabel,
  LocalizedLanguageCode
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

async function runSeoForensicAudit() {
  const nonEnLangs = supportedLanguages.filter(l => l.code !== 'en') as { code: LocalizedLanguageCode; label: string }[];
  
  const issues: {
    category: string;
    severity: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';
    affectedUrl: string;
    affectedFile: string;
    evidence: string;
    whyGoogleCares: string;
    estimatedSeoImpact: string;
    recommendedPriority: string;
  }[] = [];

  // 1. CRAWLABILITY
  for (const tool of tools) {
    for (const langObj of supportedLanguages) {
      const lang = langObj.code;
      const url = getToolRoute(tool.slug, lang);
      if (noindexToolSlugs.has(tool.slug)) {
        if (lang !== 'en') {
          const record = lang !== 'en' ? (dataMap[lang] || []).find(r => r.canonicalToolId === tool.slug) : null;
          if (record && url.includes(`/${lang}/`)) {
            issues.push({
              category: 'Crawlability & Indexation',
              severity: 'MEDIUM',
              affectedUrl: url,
              affectedFile: `src/data/localization-${lang}-data.ts`,
              evidence: `Noindex tool "${tool.slug}" has localized record and route "${url}"`,
              whyGoogleCares: 'Crawlers consume budget on pages marked noindex that have localized alternate routes.',
              estimatedSeoImpact: 'Waste of crawl budget on non-indexable utility endpoints.',
              recommendedPriority: 'P3'
            });
          }
        }
      }
    }
  }

  // 4. METADATA AUDIT (Title/Description Lengths & Formatting)
  for (const tool of tools) {
    if (noindexToolSlugs.has(tool.slug)) continue;
    for (const langObj of supportedLanguages) {
      const lang = langObj.code;
      const url = getToolRoute(tool.slug, lang);
      const meta = buildMetadata({ pathname: url, lang });

      if (meta.title.length < 30) {
        issues.push({
          category: 'Metadata Audit',
          severity: 'MEDIUM',
          affectedUrl: url,
          affectedFile: lang === 'en' ? 'src/data/tools.ts' : `src/data/localization-${lang}-data.ts`,
          evidence: `Title length is ${meta.title.length} characters (< 30): "${meta.title}"`,
          whyGoogleCares: 'Under-optimized title tags fail to capture search intent and decrease SERP click-through rate.',
          estimatedSeoImpact: 'Reduced SERP visibility and CTR.',
          recommendedPriority: 'P2'
        });
      } else if (meta.title.length > 70) {
        issues.push({
          category: 'Metadata Audit',
          severity: 'HIGH',
          affectedUrl: url,
          affectedFile: lang === 'en' ? 'src/data/tools.ts' : `src/data/localization-${lang}-data.ts`,
          evidence: `Title length is ${meta.title.length} characters (> 70): "${meta.title}"`,
          whyGoogleCares: 'Titles over 60-70 characters get truncated in Google SERP display (mobile & desktop).',
          estimatedSeoImpact: 'Truncated SERP snippets and lower CTR.',
          recommendedPriority: 'P2'
        });
      }

      if (meta.description.length < 110) {
        issues.push({
          category: 'Metadata Audit',
          severity: 'MEDIUM',
          affectedUrl: url,
          affectedFile: lang === 'en' ? 'src/data/tools.ts' : `src/data/localization-${lang}-data.ts`,
          evidence: `Meta description length is ${meta.description.length} characters (< 110): "${meta.description}"`,
          whyGoogleCares: 'Short meta descriptions underutilize SERP real estate.',
          estimatedSeoImpact: 'Lower snippet engagement.',
          recommendedPriority: 'P3'
        });
      } else if (meta.description.length > 175) {
        issues.push({
          category: 'Metadata Audit',
          severity: 'MEDIUM',
          affectedUrl: url,
          affectedFile: lang === 'en' ? 'src/data/tools.ts' : `src/data/localization-${lang}-data.ts`,
          evidence: `Meta description length is ${meta.description.length} characters (> 175): "${meta.description}"`,
          whyGoogleCares: 'Descriptions over 160-175 characters are truncated on mobile search results.',
          estimatedSeoImpact: 'Truncated description snippet.',
          recommendedPriority: 'P3'
        });
      }
    }
  }

  // 6. CONTENT AUDIT
  for (const tool of tools) {
    if (noindexToolSlugs.has(tool.slug)) continue;
    for (const langObj of nonEnLangs) {
      const lang = langObj.code;
      const records = dataMap[lang] || [];
      const record = records.find(r => r.canonicalToolId === tool.slug);
      if (record && record.intro && record.intro.length < 60) {
        issues.push({
          category: 'Content Audit',
          severity: 'HIGH',
          affectedUrl: getToolRoute(tool.slug, lang),
          affectedFile: `src/data/localization-${lang}-data.ts`,
          evidence: `Intro length is only ${record.intro.length} characters: "${record.intro}"`,
          whyGoogleCares: 'Thin introduction copy triggers Helpful Content System penalties for thin programmatic pages.',
          estimatedSeoImpact: 'Deindexing or ranking downgrades under Google Helpful Content algorithm.',
          recommendedPriority: 'P1'
        });
      }
    }
  }

  // 12. EEAT & AUTHOR SIGNALS (Check template for AuthorByline)
  const toolTemplateContent = fs.readFileSync('src/pages/tools/[slug].astro', 'utf-8');
  if (!toolTemplateContent.includes('AuthorByline')) {
    issues.push({
      category: 'EEAT & Author Signals',
      severity: 'HIGH',
      affectedUrl: 'https://taptogen.com/tools/fancy-text-generator/',
      affectedFile: 'src/pages/tools/[slug].astro',
      evidence: 'Tool detail pages lack explicit inline Author profile box (byline/bio), reviewer credentials, and published date markup.',
      whyGoogleCares: 'Google E-E-A-T guidelines require clear authoritativeness, reviewer credentials, and publication provenance.',
      estimatedSeoImpact: 'Lower trust score and suppressed rankings.',
      recommendedPriority: 'P1'
    });
  }

  // 13. HELPFUL CONTENT (Verify getEffectiveGuideCopy uniqueness)
  const t1 = tools.find(t => t.slug === 'fantasy-language-generator');
  const t2 = tools.find(t => t.slug === 'word-counter');
  if (t1 && t2) {
    const guide1 = getEffectiveGuideCopy(t1);
    const guide2 = getEffectiveGuideCopy(t2);
    if (guide1 && guide2 && guide1.howTo[0] === guide2.howTo[0]) {
      issues.push({
        category: 'Helpful Content & Value',
        severity: 'HIGH',
        affectedUrl: 'https://taptogen.com/tools/name-generator/',
        affectedFile: 'src/data/tool-page-data.ts',
        evidence: 'Batch 7 tools rely on generic templated how-to step instructions.',
        whyGoogleCares: 'Repeated non-unique how-to steps across dozens of tools can be flagged as scaled content abuse.',
        estimatedSeoImpact: 'Risk of Helpful Content System sitewide dampening.',
        recommendedPriority: 'P1'
      });
    }
  }

  fs.writeFileSync('scratch/seo-failfirst-results.json', JSON.stringify({ issues }, null, 2));
  console.log(`AUDIT_COMPLETED: ${issues.length} Issues Identified`);
}

runSeoForensicAudit().catch(console.error);
