export interface ToolMetadata {
  slug: string;
  tags: string[];
  intro: string;
  compatibility: string;
  useCases: string[];
}

export const contentRegistry: Record<string, ToolMetadata> = {
  'fancy-text-generator': {
    slug: 'fancy-text-generator',
    tags: ['fancy', 'social', 'aesthetic'],
    intro: 'Transform plain text into fancy styles with cursive, bold, double-struck, and bubble letters for social media Bios.',
    compatibility: 'Compatible with Instagram, TikTok, Twitter, Facebook, and Discord.',
    useCases: [
      'Styling Instagram and TikTok Bios',
      'Creating eye-catching tweets',
      'Formatting messages in Discord servers'
    ]
  },
  'bold-text-generator': {
    slug: 'bold-text-generator',
    tags: ['bold', 'emphasis', 'unicode'],
    intro: 'Instantly convert your text into bold unicode styles (serif, sans-serif, gothic, double-struck) for formatting posts.',
    compatibility: 'Compatible with LinkedIn posts, Twitter, and major online chat platforms.',
    useCases: [
      'Adding bold weight to LinkedIn posts without markdown formatting support',
      'Highlighting important phrases in tweets',
      'Formatting bold weights in Discord chat messages'
    ]
  }
};
