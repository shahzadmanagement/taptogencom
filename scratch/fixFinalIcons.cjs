/**
 * Final icon fix — targeted replacements for the remaining 42 tools
 */
const fs = require('fs');
const path = require('path');
const { loadTS } = require('../tests/helpers/ts-loader.cjs');

const toolsPath = path.resolve(__dirname, '../src/data/tools.ts');
const { tools } = loadTS(toolsPath);

// Direct slug→icon for all remaining ⚡ tools
const finalIconMap = {
  'passphrase-generator': '🔑',
  'pin-generator': '🔢',
  'youtube-description-generator': '▶️',
  'box-shadow-generator': '🌫️',
  'border-radius-generator': '◻️',
  'regex-generator': '🔍',
  'cron-expression-generator': '⏱️',
  'random-letter-generator': '🔤',
  'random-question-generator': '❓',
  'would-you-rather-generator': '🤔',
  'gradient-generator': '🌈',
  'font-pairing-generator': '🔤',
  'call-to-action-generator': '📣',
  'random-emoji-generator': '😀',
  'random-country-generator': '🌍',
  'random-choice-generator': '🎯',
  'game-idea-generator': '💡',
  'rpg-character-generator': '⚔️',
  'npc-generator': '🤖',
  'quest-generator': '📜',
  'dungeon-generator': '🗝️',
  'encounter-generator': '⚔️',
  'loot-generator': '💎',
  'map-generator': '🗺️',
  'world-builder-generator': '🌍',
  'magic-system-generator': '✨',
  'mythology-generator': '⚡',
  'legend-generator': '📜',
  'folklore-generator': '📖',
  'prophecy-generator': '🔮',
  'omen-generator': '⚠️',
  'dream-generator': '💭',
  'nightmare-generator': '👻',
  'paranormal-generator': '👁️',
  'mystery-plot-generator': '🔍',
  'horror-story-generator': '😱',
  'romance-plot-generator': '💕',
  'comedy-plot-generator': '😄',
  'action-plot-generator': '💥',
  'adventure-plot-generator': '🗺️',
  'thriller-plot-generator': '😰',
  'science-fiction-plot-generator': '🚀',
};

// Category-based fallbacks for truly unknown tools
const categoryIconFallback = {
  'name-generators': '👤',
  'text-font-generators': '✨',
  'social-media-generators': '📱',
  'bio-caption-generators': '📝',
  'seo-marketing-generators': '🔍',
  'gaming-creative-generators': '🎮',
  'creative-story-generators': '📚',
  'writing-generators': '✍️',
  'business-brand-generators': '💼',
  'developer-web-generators': '💻',
  'utility-generators': '⚙️',
  'random-generators': '🎲',
};

let fixed = 0;
const stillNeeded = [];

const fixedTools = tools.map(tool => {
  if (tool.icon !== '⚡' && tool.icon !== '🛠️') return tool;

  // Direct match
  if (finalIconMap[tool.slug]) {
    fixed++;
    return { ...tool, icon: finalIconMap[tool.slug] };
  }

  // Keyword matching within slug
  const keywords = {
    'passphrase': '🔑', 'pin': '🔢', 'description': '📝',
    'shadow': '🌫️', 'radius': '◻️', 'regex': '🔍',
    'cron': '⏱️', 'letter': '🔤', 'question': '❓',
    'gradient': '🌈', 'font': '🔤', 'action': '📣',
    'emoji': '😀', 'country': '🌍', 'choice': '🎯',
    'idea': '💡', 'rpg': '⚔️', 'npc': '🤖',
    'quest': '📜', 'dungeon': '🗝️', 'encounter': '⚔️',
    'loot': '💎', 'world': '🌍', 'magic': '✨',
    'myth': '📜', 'legend': '📜', 'folk': '📖',
    'prophecy': '🔮', 'dream': '💭', 'mystery': '🔍',
    'horror': '😱', 'romance': '💕', 'comedy': '😄',
    'thriller': '😰', 'fiction': '🚀', 'adventure': '🗺️',
    'paranormal': '👁️', 'nightmare': '👻',
  };

  for (const [kw, icon] of Object.entries(keywords)) {
    if (tool.slug.includes(kw)) {
      fixed++;
      return { ...tool, icon };
    }
  }

  // Category fallback
  const catIcon = categoryIconFallback[tool.categorySlug];
  if (catIcon) {
    fixed++;
    return { ...tool, icon: catIcon };
  }

  stillNeeded.push(tool.slug);
  return tool;
});

// Write back safely using string replacement
let content = fs.readFileSync(toolsPath, 'utf8');

// Replace each icon in the JSON objects directly by slug
fixedTools.forEach((tool, i) => {
  const original = tools[i];
  if (original.icon !== tool.icon) {
    // Replace "slug": "X", ... "icon": "⚡" pattern
    const escapedSlug = tool.slug.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const pattern = new RegExp(`("slug":\\s*"${escapedSlug}"[\\s\\S]*?"icon":\\s*)"[^"]*"`, '');
    content = content.replace(pattern, `$1"${tool.icon}"`);
  }
});

fs.writeFileSync(toolsPath, content, 'utf8');

console.log(`✅ Final icon pass complete`);
console.log(`   Icons fixed this pass: ${fixed}`);
console.log(`   Tools still with ⚡: ${stillNeeded.length}`);
if (stillNeeded.length > 0) {
  console.log(`   Remaining slugs:`, stillNeeded.join(', '));
}
