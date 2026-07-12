import { searchIndex as defaultIndex } from './search-index';
import type { SearchableDocument, SearchResult, SearchOptions } from './search-types';

const STOP_WORDS = new Set([
  'a', 'about', 'above', 'after', 'again', 'against', 'all', 'am', 'an', 'and', 'any', 'are', 'arent',
  'as', 'at', 'be', 'because', 'been', 'before', 'being', 'below', 'between', 'both', 'but', 'by',
  'cant', 'cannot', 'could', 'couldnt', 'did', 'didnt', 'do', 'does', 'doesnt', 'doing', 'dont', 'down',
  'during', 'each', 'few', 'for', 'from', 'further', 'had', 'hadnt', 'has', 'hasnt', 'have', 'havent',
  'having', 'he', 'hed', 'hell', 'hes', 'her', 'here', 'heres', 'hers', 'herself', 'him', 'himself',
  'his', 'how', 'hows', 'i', 'id', 'ill', 'im', 'ive', 'if', 'in', 'into', 'is', 'isnt', 'it', 'its',
  'itself', 'lets', 'me', 'more', 'most', 'mustnt', 'my', 'myself', 'no', 'nor', 'not', 'of', 'off',
  'on', 'once', 'only', 'or', 'other', 'ought', 'our', 'ours', 'ourselves', 'out', 'over', 'own',
  'same', 'shant', 'she', 'shed', 'shell', 'shes', 'should', 'shouldnt', 'so', 'some', 'such', 'than',
  'that', 'thats', 'the', 'their', 'theirs', 'them', 'themselves', 'then', 'there', 'theres', 'these',
  'they', 'theyd', 'theyll', 'theyre', 'theyve', 'this', 'those', 'through', 'to', 'too', 'under',
  'until', 'up', 'very', 'was', 'wasnt', 'we', 'wed', 'well', 'were', 'weve', 'werent', 'what', 'whats',
  'when', 'whens', 'where', 'wheres', 'which', 'while', 'who', 'whos', 'whom', 'why', 'whys', 'with',
  'wont', 'would', 'wouldnt', 'you', 'youd', 'youll', 'youre', 'youve', 'your', 'yours', 'yourself',
  'yourselves'
]);

const searchCache = new Map<string, SearchResult[]>();
const MAX_CACHE_SIZE = 500;

export function normalizeQuery(query: string): string {
  if (!query) return '';
  return query.toLowerCase().normalize('NFKD').trim();
}

export function tokenize(normalized: string): string[] {
  if (!normalized) return [];
  const tokens = normalized
    .split(/[\s,.\-_\/\\#?!:;()\[\]{}*+&|=]+/g)
    .filter(t => t);

  const filtered = tokens.filter(t => !STOP_WORDS.has(t));
  return filtered.length > 0 ? filtered : tokens;
}

export function levenshteinDistance(a: string, b: string): number {
  const tmp: number[][] = [];
  for (let i = 0; i <= a.length; i++) {
    tmp[i] = [i];
  }
  for (let j = 0; j <= b.length; j++) {
    tmp[0][j] = j;
  }
  for (let i = 1; i <= a.length; i++) {
    for (let j = 1; j <= b.length; j++) {
      tmp[i][j] = Math.min(
        tmp[i - 1][j] + 1,
        tmp[i][j - 1] + 1,
        tmp[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1)
      );
    }
  }
  return tmp[a.length][b.length];
}

export function scoreResult(
  doc: SearchableDocument,
  queryTokens: string[],
  fuzzyEnabled = true,
  customWeights?: SearchOptions['weights']
): { score: number; matches: string[] } {
  const weights = {
    title: customWeights?.title ?? 1.0,
    keywords: customWeights?.keywords ?? 0.8,
    category: customWeights?.category ?? 0.5,
    description: customWeights?.description ?? 0.2
  };

  let score = 0;
  const matches = new Set<string>();

  queryTokens.forEach(token => {
    // 1. Title matching
    const titleNorm = normalizeQuery(doc.title);
    if (titleNorm === token) {
      score += weights.title * 10;
      matches.add(token);
    } else if (titleNorm.startsWith(token)) {
      score += weights.title * 5;
      matches.add(token);
    } else if (titleNorm.includes(token)) {
      score += weights.title * 2;
      matches.add(token);
    }

    // 2. Keywords matching
    doc.keywords.forEach(kw => {
      const kwNorm = normalizeQuery(kw);
      if (kwNorm === token) {
        score += weights.keywords * 8;
        matches.add(token);
      } else if (kwNorm.includes(token)) {
        score += weights.keywords * 3;
        matches.add(token);
      }
    });

    // 3. Category matching
    const catNorm = normalizeQuery(doc.category);
    if (catNorm.includes(token)) {
      score += weights.category * 4;
      matches.add(token);
    }

    // 4. Description matching
    const descNorm = normalizeQuery(doc.description);
    if (descNorm.includes(token)) {
      score += weights.description * 1.5;
      matches.add(token);
    }

    // 5. Typo Tolerance / Fuzzy Match check
    if (fuzzyEnabled && token.length >= 4) {
      const docWords = [
        ...tokenize(titleNorm),
        ...doc.keywords.flatMap(k => tokenize(normalizeQuery(k)))
      ];

      docWords.forEach(word => {
        const maxDist = token.length > 6 ? 2 : 1;
        const dist = levenshteinDistance(token, word);
        if (dist > 0 && dist <= maxDist) {
          score += (weights.title * 2) / (dist + 1);
          matches.add(word);
        }
      });
    }
  });

  return { score, matches: Array.from(matches) };
}

export function rankResults(results: SearchResult[]): SearchResult[] {
  return results.sort((a, b) => {
    if (Math.abs(a.score - b.score) > 0.0001) {
      return b.score - a.score;
    }
    // Deterministic tie-breaker
    const titleA = a.document.title.toLowerCase();
    const titleB = b.document.title.toLowerCase();
    if (titleA !== titleB) {
      return titleA < titleB ? -1 : 1;
    }
    return a.document.id < b.document.id ? -1 : 1;
  });
}

export function createSearchIndex(customDocs?: SearchableDocument[]): SearchableDocument[] {
  return customDocs ?? defaultIndex;
}

export function search(
  query: string,
  options?: SearchOptions,
  customIndex?: SearchableDocument[]
): SearchResult[] {
  const normQuery = normalizeQuery(query);
  if (!normQuery) return [];

  const limit = options?.limit ?? 10;
  const fuzzy = options?.fuzzy ?? true;
  const threshold = options?.threshold ?? 0.1;

  // Check query cache
  const cacheKey = `${normQuery}:${limit}:${fuzzy}:${threshold}:${customIndex ? 'custom' : 'default'}`;
  if (searchCache.has(cacheKey)) {
    return searchCache.get(cacheKey)!;
  }

  const index = customIndex ?? defaultIndex;
  const tokens = tokenize(normQuery);
  if (tokens.length === 0) return [];

  const results: SearchResult[] = [];

  index.forEach(doc => {
    const { score, matches } = scoreResult(doc, tokens, fuzzy, options?.weights);
    if (score >= threshold) {
      results.push({ document: doc, score, matches });
    }
  });

  const sorted = rankResults(results).slice(0, limit);

  // Maintain cache size limits
  if (searchCache.size >= MAX_CACHE_SIZE) {
    searchCache.clear();
  }
  searchCache.set(cacheKey, sorted);

  return sorted;
}

export function searchSuggestions(
  query: string,
  limit = 5,
  customIndex?: SearchableDocument[]
): string[] {
  const matches = search(query, { limit, fuzzy: true }, customIndex);
  return matches.map(m => m.document.title);
}

export function clearSearchCache(): void {
  searchCache.clear();
}
