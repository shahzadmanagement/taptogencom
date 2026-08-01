import { tools, type Tool } from '../data/tools';
import { categories, type Category } from '../data/categories';
import { toolHubs, type ToolHub } from '../data/hubs';
import { noindexToolSlugs } from '../data/tool-page-data';
import { getToolRoute, getLocalizedToolByCanonicalId, type SupportedLanguageCode } from '../data/localization';

export interface LinkedToolCard {
  slug: string;
  name: string;
  tagline: string;
  category: string;
  categorySlug: string;
  icon: string;
  url: string;
}

export interface CollectionCard {
  title: string;
  description: string;
  icon: string;
  url: string;
  toolCount: number;
}

export interface UniversalLinkingData {
  relatedTools: LinkedToolCard[];
  sameCategoryTools: LinkedToolCard[];
  parentHub: {
    categoryName: string;
    categorySlug: string;
    categoryIcon: string;
    categoryUrl: string;
    hubTitle?: string;
    hubDescription?: string;
    hubUrl?: string;
  } | null;
  popularTools: LinkedToolCard[];
  recentlyUpdatedTools: LinkedToolCard[];
  peopleAlsoUse: LinkedToolCard[];
  continueExploring: LinkedToolCard[];
  topCollections: CollectionCard[];
}

const universalCache = new Map<string, UniversalLinkingData>();

const indexableTools = tools.filter(t => !noindexToolSlugs.has(t.slug));
const indexableToolsMap = new Map<string, Tool>(indexableTools.map(t => [t.slug, t]));

function toCard(tool: Tool, lang: SupportedLanguageCode = 'en'): LinkedToolCard {
  const route = getToolRoute(tool.slug, lang);
  let name = tool.name;
  let tagline = tool.tagline;

  if (lang !== 'en') {
    const loc = getLocalizedToolByCanonicalId(tool.slug, lang);
    if (loc) {
      if (loc.primaryKeyword) {
        name = loc.primaryKeyword.charAt(0).toUpperCase() + loc.primaryKeyword.slice(1);
      }
      if (loc.metaDescription) {
        tagline = loc.metaDescription;
      }
    }
  }

  return {
    slug: tool.slug,
    name,
    tagline,
    category: tool.category,
    categorySlug: tool.categorySlug,
    icon: tool.icon,
    url: route,
  };
}

function getKeywordOverlap(kw1: string[], kw2: string[]): number {
  const set1 = new Set(kw1.map(k => k.toLowerCase().trim()));
  let count = 0;
  kw2.forEach(k => {
    if (set1.has(k.toLowerCase().trim())) count++;
  });
  return count;
}

function getIntentOverlap(intent1: string, intent2: string): number {
  if (!intent1 || !intent2) return 0;
  const tokens1 = new Set(intent1.toLowerCase().split(/\s+/).filter(t => t.length > 3));
  let count = 0;
  intent2.toLowerCase().split(/\s+/).filter(t => t.length > 3).forEach(t => {
    if (tokens1.has(t)) count++;
  });
  return count;
}

export function getUniversalLinkingBlocks(
  toolSlug: string,
  lang: SupportedLanguageCode = 'en'
): UniversalLinkingData {
  const cacheKey = `${toolSlug}:${lang}`;
  if (universalCache.has(cacheKey)) {
    return universalCache.get(cacheKey)!;
  }

  const target = indexableToolsMap.get(toolSlug) || tools.find(t => t.slug === toolSlug);
  if (!target) {
    return {
      relatedTools: [],
      sameCategoryTools: [],
      parentHub: null,
      popularTools: [],
      recentlyUpdatedTools: [],
      peopleAlsoUse: [],
      continueExploring: [],
      topCollections: [],
    };
  }

  const targetKeywords = [target.primaryKeyword, ...(target.secondaryKeywords || [])];

  // 1. Calculate Scores for candidates
  const scoredCandidates: { tool: Tool; score: number; intentScore: number; keywordScore: number }[] = [];

  indexableTools.forEach(candidate => {
    if (candidate.slug === target.slug) return;

    let score = 0;
    const catMatch = candidate.categorySlug === target.categorySlug;
    if (catMatch) score += 4.0;

    const candKeywords = [candidate.primaryKeyword, ...(candidate.secondaryKeywords || [])];
    const kwOverlap = getKeywordOverlap(targetKeywords, candKeywords);
    score += kwOverlap * 2.5;

    const intentScore = getIntentOverlap(target.userIntent, candidate.userIntent);
    score += intentScore * 1.5;

    if (candidate.popular) score += 1.0;
    if (candidate.generatorType === target.generatorType) score += 2.0;

    scoredCandidates.push({
      tool: candidate,
      score,
      intentScore,
      keywordScore: kwOverlap,
    });
  });

  // Sort candidates by total score DESC
  scoredCandidates.sort((a, b) => b.score - a.score);

  const usedSlugs = new Set<string>([target.slug]);

  // Block 1: Related Tools (8 tools)
  const relatedTools = scoredCandidates
    .slice(0, 8)
    .map(c => {
      usedSlugs.add(c.tool.slug);
      return toCard(c.tool, lang);
    });

  // Block 2: Same Category Tools (8 tools in same category not already used)
  const sameCatCandidates = indexableTools.filter(
    t => t.categorySlug === target.categorySlug && !usedSlugs.has(t.slug)
  );
  const sameCategoryTools = sameCatCandidates.slice(0, 8).map(t => {
    usedSlugs.add(t.slug);
    return toCard(t, lang);
  });

  // Block 3: Parent Hub & Category info
  const cat = categories.find(c => c.slug === target.categorySlug);
  const hub = toolHubs.find(h => h.slug === target.categorySlug);
  const parentHub = cat
    ? {
        categoryName: cat.name,
        categorySlug: cat.slug,
        categoryIcon: cat.icon,
        categoryUrl: `/categories/${cat.slug}/`,
        hubTitle: hub?.h1,
        hubDescription: hub?.description,
        hubUrl: hub ? `/tools/${hub.slug}/` : undefined,
      }
    : null;

  // Block 4: Popular Tools (8 globally popular tools not already used)
  const popularCandidates = indexableTools.filter(t => t.popular && !usedSlugs.has(t.slug));
  const popularTools = popularCandidates.slice(0, 8).map(t => {
    usedSlugs.add(t.slug);
    return toCard(t, lang);
  });

  // Block 5: Recently Updated / High Value Tools (8 tools)
  const highValueSlugs = [
    'name-generator',
    'fancy-text-generator',
    'paragraph-generator',
    'writing-prompt-generator',
    'meta-tag-generator',
    'seo-title-generator',
    'business-name-generator',
    'domain-name-generator',
    'story-plot-generator',
    'character-name-generator',
    'blog-outline-generator',
    'content-brief-generator',
  ];
  const recentlyUpdatedTools = indexableTools
    .filter(t => highValueSlugs.includes(t.slug) && !usedSlugs.has(t.slug))
    .slice(0, 8)
    .map(t => {
      usedSlugs.add(t.slug);
      return toCard(t, lang);
    });

  // Block 6: People Also Use (Intent-matched recommendations)
  const intentCandidates = scoredCandidates
    .filter(c => !usedSlugs.has(c.tool.slug))
    .sort((a, b) => b.intentScore - a.intentScore);

  const peopleAlsoUse = intentCandidates.slice(0, 8).map(c => {
    usedSlugs.add(c.tool.slug);
    return toCard(c.tool, lang);
  });

  // Block 7: Continue Exploring (Cross-category semantic workflow tools)
  const crossCategoryCandidates = indexableTools.filter(
    t => t.categorySlug !== target.categorySlug && !usedSlugs.has(t.slug)
  );
  const continueExploring = crossCategoryCandidates.slice(0, 8).map(t => {
    usedSlugs.add(t.slug);
    return toCard(t, lang);
  });

  // Block 8: Top Collections (Curated category hubs)
  const topCollections: CollectionCard[] = categories.slice(0, 6).map(c => {
    const catToolsCount = indexableTools.filter(t => t.categorySlug === c.slug).length;
    return {
      title: c.name,
      description: c.description,
      icon: c.icon,
      url: `/categories/${c.slug}/`,
      toolCount: catToolsCount,
    };
  });

  const result: UniversalLinkingData = {
    relatedTools,
    sameCategoryTools,
    parentHub,
    popularTools,
    recentlyUpdatedTools,
    peopleAlsoUse,
    continueExploring,
    topCollections,
  };

  universalCache.set(cacheKey, result);
  return result;
}

export function clearUniversalCache(): void {
  universalCache.clear();
}
