import { searchIndexer, type IndexDocument } from './indexer';
import { parseQuery } from './queryParser';
import { rankDocuments, type RankedResult } from './ranking';
import { searchCache } from './cache';

/**
 * Searches the indexed documents matching query and filters parameters
 * @param query text query string
 * @param filterCategory category parameter
 * @returns RankedResult list
 */
export function search(query: string, filterCategory?: string): RankedResult[] {
  const cacheKey = `${query}_cat:${filterCategory || 'any'}`;
  const cached = searchCache.get(cacheKey);
  if (cached) return cached;

  const parsed = parseQuery(query);
  const matchedIds = new Set<string>();

  // If no terms are queried, get all matching documents
  if (parsed.terms.length === 0) {
    return [];
  }

  parsed.terms.forEach(term => {
    const ids = searchIndexer.searchToken(term);
    ids.forEach(id => matchedIds.add(id));
  });

  const matchingDocs: IndexDocument[] = [];
  matchedIds.forEach(id => {
    const doc = searchIndexer.getDocument(id);
    if (doc) {
      if (filterCategory && doc.category !== filterCategory) return;
      matchingDocs.push(doc);
    }
  });

  const ranked = rankDocuments(matchingDocs, parsed.terms);
  searchCache.set(cacheKey, ranked);
  return ranked;
}
