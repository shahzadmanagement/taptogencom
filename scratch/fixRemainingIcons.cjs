/**
 * Fix remaining 68 placeholder icons and 10 wrong generator types
 * that weren't caught by the first pass.
 */
const fs = require('fs');
const path = require('path');
const { loadTS } = require('../tests/helpers/ts-loader.cjs');

const toolsPath = path.resolve(__dirname, '../src/data/tools.ts');
const { tools } = loadTS(toolsPath);

// Extended icon map for remaining tools
const extendedIconMap = {
  // Text tools missed in first pass
  'schema-tag-generator': '📊',
  'text-to-binary-generator': '01',
  'morse-code-generator': '·—',
  'random-phrase-generator': '🗣️',
  'special-character-generator': '★',
  'ascii-text-generator': '▓',
  'creepy-text-generator': '👻',
  'old-english-text-generator': '𝔄',
  'uwu-text-generator': '🥺',
  'leet-text-generator': '1337',
  'random-text-generator': '🔀',
  'discord-timestamp-generator': '⏰',
  'gibberish-generator': '🌀',
  'pinterest-tag-generator': '📌',
  'soundcloud-tag-generator': '☁️',
  'error-message-generator': '⚠️',
  'cipher-generator': '🔐',
  'repeat-text-generator': '🔁',
  'hex-color-generator': '#',
  'rgb-generator': '🎨',
  // More text style tools
  'qr-code-text-generator': '⬛',
  'meme-text-generator': '😂',
  'graffiti-text-generator': '✏️',
  // Name tools
  'app-name-generator': '📱',
  'game-name-generator': '🎮',
  'clan-name-generator': '⚔️',
  'guild-name-generator': '🛡️',
  'faction-name-generator': '⚔️',
  'kingdom-name-generator': '👑',
  'tribe-name-generator': '🪶',
  'empire-name-generator': '🏛️',
  'continent-name-generator': '🌍',
  'moon-name-generator': '🌙',
  'star-name-generator': '⭐',
  'galaxy-name-generator': '🌌',
  'constellation-name-generator': '✨',
  'island-name-generator': '🏝️',
  'mountain-name-generator': '⛰️',
  'forest-name-generator': '🌲',
  'river-name-generator': '🏞️',
  'sword-name-generator': '⚔️',
  'potion-name-generator': '🧪',
  'spell-name-generator': '🪄',
  'ability-name-generator': '💫',
  'weapon-name-generator': '🗡️',
  'armor-name-generator': '🛡️',
  'artifact-name-generator': '🏺',
  'tavern-name-generator': '🍺',
  'inn-name-generator': '🏠',
  'shop-name-generator': '🏪',
  'guild-hall-name-generator': '🏛️',
  'dungeon-name-generator': '🗝️',
  'quest-name-generator': '📜',
  'mythological-name-generator': '⚡',
  'norse-name-generator': '⚡',
  'greek-name-generator': '🏛️',
  'roman-name-generator': '🏛️',
  'celtic-name-generator': '☘️',
  'japanese-name-generator': '🗾',
  'chinese-name-generator': '🐉',
  'arabic-name-generator': '🌙',
  'indian-name-generator': '🪷',
  'african-name-generator': '🌍',
  'native-american-name-generator': '🪶',
  'medieval-name-generator': '⚔️',
  'steampunk-name-generator': '⚙️',
  'cyberpunk-name-generator': '🤖',
  'dystopian-name-generator': '🌆',
  'post-apocalyptic-name-generator': '☢️',
  'sci-fi-name-generator': '🚀',
  'superhero-team-name-generator': '🦸',
  'villain-team-name-generator': '🦹',
  'sports-team-name-generator': '🏆',
  'esports-team-name-generator': '🎮',
  'debate-team-name-generator': '🎙️',
  'book-club-name-generator': '📚',
  'study-group-name-generator': '📖',
  'startup-name-generator': '🚀',
  'company-name-generator': '🏢',
  'product-name-generator': '📦',
  'project-name-generator': '📋',
  'code-name-generator': '💻',
  'operation-name-generator': '🎯',
  'event-name-generator': '🎉',
  'festival-name-generator': '🎪',
  'concert-name-generator': '🎵',
  'tour-name-generator': '🌍',
  'album-name-generator': '💿',
  'song-name-generator': '🎵',
  'movie-name-generator': '🎬',
  'show-name-generator': '📺',
  'series-name-generator': '📺',
  'game-title-generator': '🎮',
  'book-title-generator': '📚',
  'blog-name-generator': '📝',
  'newsletter-name-generator': '📧',
  'magazine-name-generator': '📰',
  // Missing utility/dev tools
  'dummy-data-generator': '🗄️',
  'random-address-generator': '📍',
  'random-phone-generator': '📱',
  'random-date-generator': '📅',
  'random-email-generator': '📧',
  'random-username-generator': '👤',
  'random-password-generator': '🔐',
  'random-color-generator': '🎨',
  'random-word-generator': '📖',
  'random-sentence-generator': '✍️',
  'random-paragraph-generator': '📝',
  'random-quote-generator': '💬',
  'random-name-and-address': '📍',
  'credit-card-generator': '💳',
  'social-security-generator': '🔒',
  'ip-address-generator': '🌐',
  'mac-address-generator': '💻',
  'isbn-generator': '📚',
  'imei-generator': '📱',
  'ssn-generator': '🔒',
  'ein-generator': '🏢',
  'npi-generator': '🏥',
  // SEO/Marketing missed
  'press-release-generator': '📰',
  'newsletter-generator': '📧',
  'social-media-post-generator': '📱',
  'email-subject-line-generator': '📧',
  'linkedin-headline-generator': '💼',
  'google-ads-generator': '📢',
  'facebook-ads-generator': '📢',
  'tweet-generator': '🐦',
  'instagram-post-generator': '📷',
  // Writing tools missed
  'thesis-statement-generator': '📝',
  'introduction-generator': '📝',
  'conclusion-generator': '📝',
  'outline-generator': '📋',
  'summary-generator': '📋',
  'paraphrase-generator': '🔄',
  'sentence-rewriter': '✏️',
  'word-changer': '🔤',
  'essay-title-generator': '📚',
  'research-title-generator': '🔬',
  'argument-generator': '💭',
  'counterargument-generator': '⚖️',
  'hook-generator': '🎣',
  'anecdote-generator': '💬',
  'analogy-generator': '🔗',
  'metaphor-generator': '🌊',
  'simile-generator': '✨',
  // Business missed
  'mission-statement-generator': '🎯',
  'vision-statement-generator': '👁️',
  'core-values-generator': '💎',
  'company-description-generator': '🏢',
  'elevator-pitch-generator': '🎤',
  'swot-analysis-generator': '📊',
  'business-plan-generator': '📋',
  'marketing-plan-generator': '📢',
  'budget-generator': '💰',
  'expense-report-generator': '📊',
  'employee-review-generator': '⭐',
  'performance-review-generator': '📊',
  'reference-letter-generator': '✉️',
  'recommendation-letter-generator': '✉️',
  'resignation-letter-generator': '✉️',
  'thank-you-letter-generator': '🙏',
  'apology-letter-generator': '🙏',
  'complaint-letter-generator': '📝',
  'demand-letter-generator': '⚖️',
  'cease-and-desist-generator': '⚖️',
  'power-of-attorney-generator': '⚖️',
  'affidavit-generator': '⚖️',
  'will-generator': '📜',
  'trust-generator': '🔏',
  'lease-agreement-generator': '🏠',
  'rental-agreement-generator': '🏠',
  'freelance-contract-generator': '📝',
};

// Additional generator type corrections
const textTransformAdditional = [
  'qr-code-text-generator', 'ascii-text-generator', 'creepy-text-generator',
  'old-english-text-generator', 'uwu-text-generator', 'leet-text-generator',
  'random-text-generator', 'repeat-text-generator', 'meme-text-generator',
  'graffiti-text-generator', 'morse-code-generator', 'text-to-binary-generator',
  'cipher-generator', 'special-character-generator', 'gibberish-generator',
  'hex-color-generator'
];

const utilityAdditional = [
  'random-phrase-generator', 'discord-timestamp-generator', 'error-message-generator',
  'rgb-generator', 'schema-tag-generator', 'hex-color-generator',
  'random-address-generator', 'dummy-data-generator', 'credit-card-generator',
  'social-security-generator', 'ip-address-generator', 'mac-address-generator',
  'isbn-generator', 'random-color-generator', 'random-date-generator',
  'random-email-generator'
];

const visualAdditional = [
  'graffiti-text-generator', 'rgb-generator', 'hex-color-generator'
];

let fixedIcons = 0;
let fixedTypes = 0;

const enrichedTools = tools.map(tool => {
  const enriched = { ...tool };
  let changed = false;

  // Fix remaining placeholder icons
  if (tool.icon === '⚡' || tool.icon === '🛠️' || tool.icon === '01' || tool.icon === '·—' || tool.icon === '1337' || tool.icon === '#') {
    // Try extended icon map first
    let newIcon = null;
    for (const [key, icon] of Object.entries(extendedIconMap)) {
      if (tool.slug === key) {
        newIcon = icon;
        break;
      }
    }
    // Try keyword matching on slug
    if (!newIcon) {
      for (const [keyword, icon] of Object.entries(extendedIconMap)) {
        if (tool.slug.includes(keyword.replace('-generator', '').replace('-', ''))) {
          newIcon = icon;
          break;
        }
      }
    }
    if (newIcon && newIcon !== '⚡' && newIcon !== '🛠️') {
      enriched.icon = newIcon;
      fixedIcons++;
      changed = true;
    }
  }

  // Fix wrong generator types
  if (textTransformAdditional.includes(tool.slug) && tool.generatorType !== 'text-transform') {
    enriched.generatorType = 'text-transform';
    fixedTypes++;
    changed = true;
  } else if (utilityAdditional.includes(tool.slug) && tool.generatorType !== 'utility') {
    enriched.generatorType = 'utility';
    fixedTypes++;
    changed = true;
  }

  return enriched;
});

// Write back
const toolsContent = fs.readFileSync(toolsPath, 'utf8');

// Find the tools array and replace it
const toolsArrayStart = toolsContent.indexOf('export const tools: Tool[] = [');
const toolsArrayEnd = toolsContent.lastIndexOf('];\n');
const afterTools = toolsContent.substring(toolsArrayEnd + 3);

const toolStrings = enrichedTools.map(t => `  ${JSON.stringify(t, null, 2).replace(/\n/g, '\n  ')}`);
const newToolsArray = `export const tools: Tool[] = [\n${toolStrings.join(',\n')}\n];\n`;
const beforeTools = toolsContent.substring(0, toolsArrayStart);

const newContent = beforeTools + newToolsArray + afterTools;
fs.writeFileSync(toolsPath, newContent, 'utf8');

console.log(`\n✅ REMAINING FIXES COMPLETE`);
console.log(`   Additional icons fixed: ${fixedIcons}`);
console.log(`   Additional generator types fixed: ${fixedTypes}`);
console.log(`   Tools still with ⚡: ${enrichedTools.filter(t => t.icon === '⚡').length}`);
