import { tools, type Tool } from '../data/tools';

export interface RecommendationResult {
  relatedTools: Tool[];
  youMayAlsoLike: Tool[];
  frequentlyUsedTogether: Tool[];
}

const cache = new Map<string, RecommendationResult>();

export function clearRecommendationCache(): void {
  cache.clear();
}

export function getRecommendations(slug: string): RecommendationResult {
  if (cache.has(slug)) {
    return cache.get(slug)!;
  }

  const indexableTools = tools.filter(t => t.slug !== slug);
  const relatedTools = indexableTools.slice(0, 4);
  const youMayAlsoLike = indexableTools.slice(4, 8);
  const frequentlyUsedTogether = indexableTools.slice(8, 12);

  const result: RecommendationResult = {
    relatedTools,
    youMayAlsoLike,
    frequentlyUsedTogether
  };

  cache.set(slug, result);
  return result;
}
