import { tools, type Tool } from '../data/tools';

export interface RecommendationWeights {
  category: number;
  keywords: number;
  intent: number;
  popularity: number;
  generator: number;
}

export interface RecommendationsResult {
  relatedTools: Tool[];
  youMayAlsoLike: Tool[];
  frequentlyUsedTogether: Tool[];
}

const DEFAULT_WEIGHTS: RecommendationWeights = {
  category: 5.0,
  keywords: 1.5,
  intent: 0.5,
  popularity: 1.0,
  generator: 2.5
};

const recommendationCache = new Map<string, RecommendationsResult>();

function getOverlappingKeywordsCount(kw1: string[], kw2: string[]): number {
  const set1 = new Set(kw1.map(k => k.toLowerCase().trim()));
  let count = 0;
  kw2.forEach(k => {
    if (set1.has(k.toLowerCase().trim())) {
      count++;
    }
  });
  return count;
}

function getOverlappingTokensCount(s1: string, s2: string): number {
  if (!s1 || !s2) return 0;
  const tokens1 = new Set(s1.toLowerCase().split(/\s+/).filter(t => t.length > 3));
  let count = 0;
  s2.toLowerCase().split(/\s+/).filter(t => t.length > 3).forEach(t => {
    if (tokens1.has(t)) {
      count++;
    }
  });
  return count;
}

export function getRecommendations(
  slug: string,
  customWeights?: Partial<RecommendationWeights>
): RecommendationsResult {
  if (recommendationCache.has(slug)) {
    return recommendationCache.get(slug)!;
  }

  const target = tools.find(t => t.slug === slug);
  if (!target) {
    return { relatedTools: [], youMayAlsoLike: [], frequentlyUsedTogether: [] };
  }

  const weights = { ...DEFAULT_WEIGHTS, ...customWeights };
  const candidates: { tool: Tool; score: number }[] = [];

  const targetKeywords = [target.primaryKeyword, ...(target.secondaryKeywords || [])];

  tools.forEach(candidate => {
    if (candidate.slug === slug) return; // Skip target itself

    let score = 0;

    // 1. Category similarity
    if (candidate.categorySlug === target.categorySlug) {
      score += weights.category;
    }

    // 2. Keywords overlaps
    const candidateKeywords = [candidate.primaryKeyword, ...(candidate.secondaryKeywords || [])];
    const kwOverlap = getOverlappingKeywordsCount(targetKeywords, candidateKeywords);
    score += kwOverlap * weights.keywords;

    // 3. User intent token similarity
    const intentOverlap = getOverlappingTokensCount(target.userIntent, candidate.userIntent);
    score += intentOverlap * weights.intent;

    // 4. Popularity boost
    if (candidate.popular) {
      score += weights.popularity;
    }

    // 5. Generator type matching
    if (candidate.generatorType === target.generatorType) {
      score += weights.generator;
    }

    candidates.push({ tool: candidate, score });
  });

  // Sort candidates deterministically by score DESC, name ASC, slug ASC
  candidates.sort((a, b) => {
    if (Math.abs(a.score - b.score) > 0.0001) {
      return b.score - a.score;
    }
    const nameA = a.tool.name.toLowerCase();
    const nameB = b.tool.name.toLowerCase();
    if (nameA !== nameB) return nameA < nameB ? -1 : 1;
    return a.tool.slug < b.tool.slug ? -1 : 1;
  });

  // Distribute tools to prevent duplication
  const sortedTools = candidates.map(c => c.tool);

  const relatedTools = sortedTools.slice(0, 4);
  const youMayAlsoLike = sortedTools.slice(4, 8);
  const frequentlyUsedTogether = sortedTools.slice(8, 12);

  const result = {
    relatedTools,
    youMayAlsoLike,
    frequentlyUsedTogether
  };

  recommendationCache.set(slug, result);
  return result;
}

export function clearRecommendationCache(): void {
  recommendationCache.clear();
}
