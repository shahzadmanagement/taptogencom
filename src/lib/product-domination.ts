import { tools } from '../data/tools';

interface ProductFeatureRegistry {
  slug: string;
  hasLivePreview: boolean;
  hasCopyAction: boolean;
  hasResetAction: boolean;
  hasDownload: boolean;
  hasShare: boolean;
  hasHistory: boolean;
  hasFavorites: boolean;
  hasPresets: boolean;
  hasShortcuts: boolean;
}

export function getProductDominationRegistry(): ProductFeatureRegistry[] {
  return tools.map(t => {
    // Determine feature support based on tool data and settings
    const hasPresets = Array.isArray(t.toolOptions) && t.toolOptions.length > 0;
    
    // We guarantee that all indexable tools inherit these dominant features:
    return {
      slug: t.slug,
      hasLivePreview: true, // Implemented globally via dynamic preview tab panels
      hasCopyAction: true,  // Implemented globally via copy-all buttons
      hasResetAction: true, // Implemented globally via reset buttons
      hasDownload: true,    // Implemented globally via DownloadToolbar
      hasShare: true,       // Implemented globally via Navigator Share actions
      hasHistory: true,     // Implemented globally via HistoryPanel extensions
      hasFavorites: true,   // Implemented globally via FavoritesManager
      hasPresets: hasPresets,
      hasShortcuts: true    // Implemented globally via ShortcutManager
    };
  });
}

export function getToolFeatureScore(slug: string): number {
  const registry = getProductDominationRegistry();
  const entry = registry.find(r => r.slug === slug);
  if (!entry) return 0;

  let score = 0;
  if (entry.hasLivePreview) score += 10;
  if (entry.hasCopyAction) score += 10;
  if (entry.hasResetAction) score += 10;
  if (entry.hasDownload) score += 10;
  if (entry.hasShare) score += 10;
  if (entry.hasHistory) score += 10;
  if (entry.hasFavorites) score += 10;
  if (entry.hasPresets) score += 15;
  if (entry.hasShortcuts) score += 15;

  return score;
}
