import type { SearchableDocument, SearchResult } from './search-types';
import { getHistoryScore } from './search-history';
import { tools } from '../data/tools';

export interface RankingSignals {
  popularity: number; // 0.0 to 1.0
  ctr: number;        // Click-through rate proxy
  freshness: number;  // 0.0 to 1.0 based on update dates
}

// Statically mapping popularity & CTR signals for tools to prevent external server requests
const POPULAR_SLUGS = new Set(['fancy-text-generator', 'bold-text-generator', 'cursive-text-generator']);

export function getRankingSignals(slug: string): RankingSignals {
  const tool = tools.find(t => t.slug === slug);
  const isPopular = POPULAR_SLUGS.has(slug) || (tool?.popular ?? false);

  return {
    popularity: isPopular ? 1.0 : 0.2,
    ctr: isPopular ? 0.12 : 0.02,
    freshness: 0.8 // default static freshness
  };
}

export function computePersonalizedScore(doc: SearchableDocument, baseScore: number): { score: number; appliedBoosts: string[] } {
  let score = baseScore;
  const appliedBoosts: string[] = [];

  // 1. Popularity Boost (up to +1.5)
  const signals = getRankingSignals(doc.id);
  if (signals.popularity > 0.5) {
    score += 1.5;
    appliedBoosts.push('popularity_boost');
  }

  // 2. Click History Time-Decay Boost (up to +3.0 based on usage)
  const usageScore = getHistoryScore(doc.id);
  if (usageScore > 0) {
    const boost = Math.min(3.0, usageScore * 1.5);
    score += boost;
    appliedBoosts.push('recent_usage_boost');
  }

  // 3. CTR Boost (up to +1.0)
  if (signals.ctr > 0.08) {
    score += 1.0;
    appliedBoosts.push('ctr_boost');
  }

  // 4. Freshness Boost
  if (signals.freshness > 0.7) {
    score += 0.5;
    appliedBoosts.push('freshness_boost');
  }

  return { score, appliedBoosts };
}

export function rankPersonalizedResults(results: SearchResult[]): SearchResult[] {
  const ranked = results.map(res => {
    const { score, appliedBoosts } = computePersonalizedScore(res.document, res.score);
    
    // Emit analytics event if personalization is applied
    if (appliedBoosts.length > 0) {
      trackPersonalization(res.document.id, appliedBoosts);
    }

    return {
      ...res,
      score
    };
  });

  // Sort results deterministically using the personalized score
  return ranked.sort((a, b) => {
    if (Math.abs(a.score - b.score) > 0.0001) {
      return b.score - a.score;
    }
    const titleA = a.document.title.toLowerCase();
    const titleB = b.document.title.toLowerCase();
    if (titleA !== titleB) return titleA < titleB ? -1 : 1;
    return a.document.id < b.document.id ? -1 : 1;
  });
}

function trackPersonalization(toolSlug: string, boosts: string[]) {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') return;
  window.gtag('event', 'personalization_applied', {
    tool_slug: toolSlug,
    applied_boosts: boosts.join(','),
    timestamp: new Date().toISOString()
  });
}
