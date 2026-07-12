import { semanticSearch } from './search-semantic';
import type { SearchableDocument, SearchResult, SearchOptions } from './search-types';

export interface AiSearchResult extends SearchResult {
  confidence: number; // 0 to 100
  detectedIntent?: string;
}

export interface IntentGroup {
  name: string;
  keywords: string[];
  suggestions: string[];
}

export const INTENT_GROUPS: IntentGroup[] = [
  {
    name: 'Fancy Text',
    keywords: ['font', 'fonts', 'letters', 'stylish', 'style', 'fancy', 'aesthetic', 'gothic', 'cursive', 'bold', 'italic', 'upside down', 'reverse'],
    suggestions: ['cool fonts', 'cursive letters', 'bold converter']
  },
  {
    name: 'Nickname Generator',
    keywords: ['nickname', 'name', 'names', 'handle', 'gamertag', 'ign', 'gamer', 'nickname generator', 'cool names', 'baby name'],
    suggestions: ['cool name generator', 'gaming nickname', 'middle name finder']
  },
  {
    name: 'Bio Generator',
    keywords: ['bio', 'bios', 'about me', 'tagline', 'status', 'tiktok bio', 'instagram bio', 'profile bio', 'linkedin bio'],
    suggestions: ['cute TikTok bio', 'LinkedIn profile bio', 'short status quotes']
  },
  {
    name: 'Text Utilities',
    keywords: ['remove', 'duplicate', 'uppercase', 'lowercase', 'replace', 'clean', 'lines', 'count', 'sorting', 'trim', 'word count'],
    suggestions: ['remove duplicate lines', 'word counter', 'lowercase converter']
  },
  {
    name: 'Emoji Tools',
    keywords: ['emoji', 'emojis', 'symbols', 'symbol', 'smiley', 'sparkles', 'icons'],
    suggestions: ['unicode emojis', 'aesthetic symbols list']
  }
];

const FILLER_WORDS = new Set([
  'i', 'want', 'to', 'generate', 'make', 'a', 'an', 'the', 'for', 'please', 'can', 'you', 'show', 'find', 'me', 'some', 'cool', 'nice'
]);

const intentCache = new Map<string, { intent: string; confidence: number; normalized: string }>();

export function parseNaturalLanguage(query: string): { intent: string; confidence: number; normalized: string } {
  const queryLower = query.toLowerCase().trim();
  if (intentCache.has(queryLower)) {
    return intentCache.get(queryLower)!;
  }

  // 1. Remove filler words to extract core terms
  const terms = queryLower
    .split(/[\s,.\-_\/\\#?!:;()\[\]{}*+&|=]+/g)
    .filter(t => t && !FILLER_WORDS.has(t));

  const normalized = terms.join(' ');

  // 2. Identify Intent Group matches
  let bestIntent = 'General Search';
  let bestScore = 0;

  INTENT_GROUPS.forEach(group => {
    let matchesCount = 0;
    terms.forEach(term => {
      if (group.keywords.includes(term)) {
        matchesCount++;
      }
    });

    // Score based on matches density
    if (matchesCount > 0) {
      const score = (matchesCount / terms.length) * 100;
      if (score > bestScore) {
        bestScore = score;
        bestIntent = group.name;
      }
    }
  });

  const confidence = Math.min(100, Math.round(bestScore > 0 ? bestScore : 30));
  const result = { intent: bestIntent, confidence, normalized };
  intentCache.set(queryLower, result);

  return result;
}

export function aiSearch(
  query: string,
  options?: SearchOptions,
  customIndex?: SearchableDocument[]
): { results: AiSearchResult[]; detectedIntent: string; confidence: number; suggestions: string[] } {
  const { intent, confidence, normalized } = parseNaturalLanguage(query);

  // Perform semantic search query
  const rawResults = semanticSearch(normalized || query, options, customIndex);

  // Apply Intent Alignment Boost (up to +2.5 for aligned categories)
  const results = rawResults.map(res => {
    let matchConfidence = confidence;

    // Check category matches intent
    const categoryLower = res.document.category.toLowerCase();
    const intentLower = intent.toLowerCase().replace(' tools', '').replace(' generator', '');

    if (categoryLower.includes(intentLower)) {
      matchConfidence = Math.min(100, matchConfidence + 15);
    }

    return {
      ...res,
      confidence: matchConfidence,
      detectedIntent: intent
    };
  });

  // Fetch suggestions based on detected intent
  const group = INTENT_GROUPS.find(g => g.name === intent);
  const suggestions = group ? group.suggestions : ['fancy text generator', 'baby name generator', 'tiktok bio generator'];

  return {
    results,
    detectedIntent: intent,
    confidence,
    suggestions
  };
}
