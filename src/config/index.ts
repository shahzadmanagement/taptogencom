export * from './base';

import { config as fancy } from './fancy';
import { config as bold } from './bold';
import { config as cursive } from './cursive';
import { config as italic } from './italic';
import { config as underline } from './underline';
import { config as vaporwave } from './vaporwave';
import { config as unicode } from './unicode';

import type { ToolConfig } from './base';

export const toolConfigs: Record<string, ToolConfig> = {
  'fancy-text-generator': fancy,
  'bold-text-generator': bold,
  'cursive-text-generator': cursive,
  'italic-text-generator': italic,
  'underline-text-generator': underline,
  'vaporwave-text-generator': vaporwave,
  'unicode-text-generator': unicode
};
