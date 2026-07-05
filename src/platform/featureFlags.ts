import type { ToolConfig } from '../config';

export interface FeatureFlags {
  enableFavorites: boolean;
  enableHistory: boolean;
  enableExport: boolean;
  enablePreviews: boolean;
  enableSearch: boolean;
  enableShuffle: boolean;
  enableMetrics: boolean;
  enableShortcuts: boolean;
}

const DEFAULT_FLAGS: FeatureFlags = {
  enableFavorites: false,
  enableHistory: false,
  enableExport: false,
  enablePreviews: false,
  enableSearch: false,
  enableShuffle: false,
  enableMetrics: true,
  enableShortcuts: false
};

export function getFeatureFlags(config: ToolConfig): FeatureFlags {
  return {
    enableFavorites: config.favorites ?? DEFAULT_FLAGS.enableFavorites,
    enableHistory: config.history ?? DEFAULT_FLAGS.enableHistory,
    enableExport: (config.exporters && config.exporters.length > 0) ?? DEFAULT_FLAGS.enableExport,
    enablePreviews: (config.previews && config.previews.length > 0) ?? DEFAULT_FLAGS.enablePreviews,
    enableSearch: config.search ?? DEFAULT_FLAGS.enableSearch,
    enableShuffle: config.shuffle ?? DEFAULT_FLAGS.enableShuffle,
    enableMetrics: (config.counters && Object.values(config.counters).some(Boolean)) ?? DEFAULT_FLAGS.enableMetrics,
    enableShortcuts: config.shortcuts ?? DEFAULT_FLAGS.enableShortcuts
  };
}
