export * from './base';

import { config as fancy } from './fancy';
import { config as bold } from './bold';
import { config as cursive } from './cursive';
import { config as italic } from './italic';
import { config as underline } from './underline';
import { config as strikethrough } from './strikethrough';
import { config as vaporwave } from './vaporwave';
import { config as unicode } from './unicode';

import { mergeConfig, type ToolConfig } from './base';

export const toolConfigs: Record<string, ToolConfig> = {
  'fancy-text-generator': fancy,
  'bold-text-generator': bold,
  'cursive-text-generator': cursive,
  'italic-text-generator': italic,
  'underline-text-generator': underline,
  'strikethrough-text-generator': strikethrough,
  'vaporwave-text-generator': vaporwave,
  'unicode-text-generator': unicode,
  'tiktok-name-generator': mergeConfig('tiktok-name-generator', { previews: ['tt'] }),
  'instagram-name-generator': mergeConfig('instagram-name-generator', { previews: ['ig'] }),
  'twitter-name-generator': mergeConfig('twitter-name-generator', { previews: ['tw'] }),
  'snapchat-name-generator': mergeConfig('snapchat-name-generator', { previews: ['ig'] }),
  'linkedin-headline-generator': mergeConfig('linkedin-headline-generator', { previews: ['ig'] }),
  'bio-generator': mergeConfig('bio-generator', { previews: ['ig', 'tw', 'fb'] }),
  'youtube-description-generator': mergeConfig('youtube-description-generator', { previews: ['yt'] }),
  'tiktok-caption-generator': mergeConfig('tiktok-caption-generator', { previews: ['tt'] })
};
