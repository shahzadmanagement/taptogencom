import type { IndexDocument } from './indexer';

export interface RankedResult {
  doc: IndexDocument;
  score: number;
}

/**
 * Calculates keyword match scores and sorts results descending
 * @param docs matching documents
 * @param queryTerms query tokens
 * @returns scored results
 */
export function rankDocuments(docs: IndexDocument[], queryTerms: string[]): RankedResult[] {
  const results = docs.map(doc => {
    let score = 0;
    const titleLower = doc.title.toLowerCase();
    const bodyLower = doc.body.toLowerCase();

    queryTerms.forEach(term => {
      // Score matches in Title
      if (titleLower.includes(term)) {
        score += 15;
        if (titleLower.startsWith(term)) score += 5; // prefix bonus
      }
      // Score matches in Body
      if (bodyLower.includes(term)) {
        score += 5;
      }
    });

    return { doc, score };
  });

  return results.filter(r => r.score > 0).sort((a, b) => b.score - a.score);
}
