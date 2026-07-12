import { search } from './search-engine';
import { getSynonymsForTerm } from './search-synonyms';
import type { SearchableDocument, SearchResult, SearchOptions } from './search-types';

export function semanticSearch(
  query: string,
  options?: SearchOptions,
  customIndex?: SearchableDocument[]
): SearchResult[] {
  const normalized = query.toLowerCase().trim();
  if (!normalized) return [];

  // 1. Gather original results
  const originalResults = search(query, options, customIndex);

  // 2. Resolve synonyms and run expanded queries
  const synonymTerms = getSynonymsForTerm(normalized);
  const expandedResults: SearchResult[] = [];

  synonymTerms.forEach(synonym => {
    const res = search(synonym, { ...options, limit: 5 }, customIndex);
    res.forEach(item => {
      // Apply a Synonym Match boost of 7.5 (positioned between Title and Keyword matches)
      const boostedScore = Math.max(item.score, 7.5);
      expandedResults.push({
        ...item,
        score: boostedScore,
        matches: [...item.matches, `synonym:${synonym}`]
      });
    });
  });

  // 3. Merge, de-duplicate, and rank results deterministically
  const mergedMap = new Map<string, SearchResult>();

  originalResults.forEach(r => {
    mergedMap.set(r.document.id, r);
  });

  expandedResults.forEach(r => {
    const existing = mergedMap.get(r.document.id);
    if (!existing || r.score > existing.score) {
      mergedMap.set(r.document.id, r);
    }
  });

  const limit = options?.limit ?? 10;
  const sorted = Array.from(mergedMap.values()).sort((a, b) => {
    if (Math.abs(a.score - b.score) > 0.0001) {
      return b.score - a.score;
    }
    const titleA = a.document.title.toLowerCase();
    const titleB = b.document.title.toLowerCase();
    if (titleA !== titleB) return titleA < titleB ? -1 : 1;
    return a.document.id < b.document.id ? -1 : 1;
  });

  return sorted.slice(0, limit);
}
export default semanticSearch;
