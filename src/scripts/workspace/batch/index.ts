import type { ToolConfig } from '../../../config';
import { setupBatchUI } from './ui';
import type { TransformFunction } from './processor';

export function initBatchProcessing(config: ToolConfig, transformFn: TransformFunction) {
  if (typeof document === 'undefined') return;
  setupBatchUI(config.slug, transformFn);
}
