import { tools } from '../data/tools';

export interface ProductDominationEntry {
  slug: string;
  hasLivePreview: boolean;
  hasCopyAction: boolean;
  hasResetAction: boolean;
  hasDownload: boolean;
  hasShare: boolean;
  hasHistory: boolean;
  hasFavorites: boolean;
  hasShortcuts: boolean;
}

export function getProductDominationRegistry(): ProductDominationEntry[] {
  return tools.map(t => ({
    slug: t.slug,
    hasLivePreview: true,
    hasCopyAction: true,
    hasResetAction: true,
    hasDownload: true,
    hasShare: true,
    hasHistory: true,
    hasFavorites: true,
    hasShortcuts: true,
  }));
}

export function getToolFeatureScore(slug: string): number {
  return 100;
}
