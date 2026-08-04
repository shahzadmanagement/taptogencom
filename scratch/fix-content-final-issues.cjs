const fs = require('fs');
const path = require('path');
const { loadTS } = require('../tests/helpers/ts-loader.cjs');

const filePath = path.resolve(__dirname, '../src/data/tools.ts');
let content = fs.readFileSync(filePath, 'utf8');
const { tools } = loadTS(filePath);

const shortIntents = [
  { slug: 'dragon-name-generator', intent: 'User wants epic dragon names, titles, and lair concepts for fantasy writing or RPG games.' },
  { slug: 'orc-name-generator', intent: 'User wants fierce orc names, clan titles, and warrior handles for fantasy storytelling or gaming.' },
  { slug: 'goblin-name-generator', intent: 'User wants mischievous goblin names, tribe titles, and fantasy character concepts.' },
  { slug: 'island-name-generator', intent: 'User wants tropical, mythical, or realistic island names for fictional maps and worldbuilding.' },
  { slug: 'ai-prompt-generator', intent: 'User wants optimized AI prompts for ChatGPT, Midjourney, or DALL-E content generation.' },
  { slug: 'open-graph-generator', intent: 'User wants valid OpenGraph meta tags for social media link sharing previews.' },
  { slug: 'joke-generator', intent: 'User wants funny jokes, one-liners, and humorous puns for social posts or speeches.' },
  { slug: 'call-to-action-generator', intent: 'User wants compelling call-to-action (CTA) button copy and headline prompts.' },
  { slug: 'random-date-generator', intent: 'User wants random calendar dates within specific date ranges for testing or scheduling.' },
  { slug: 'game-idea-generator', intent: 'User wants video game mechanics, story premises, and game jam inspiration.' },
  { slug: 'npc-generator', intent: 'User wants tabletop RPG non-player character profiles, traits, and dialogue hooks.' },
  { slug: 'riddle-generator', intent: 'User wants clever riddles, brain teasers, and puzzle questions with hidden answers.' },
  { slug: 'sku-generator', intent: 'User wants structured product SKU identifiers for inventory and e-commerce stores.' },
  { slug: 'faq-generator', intent: 'User wants structured FAQ questions and answers for website help centers or product pages.' },
  { slug: 'coupon-code-generator', intent: 'User wants promotional discount codes and voucher strings for marketing campaigns.' },
  { slug: 'synonym-generator', intent: 'User wants alternative word choices, synonyms, and vocabulary variations for writing.' },
  { slug: 'random-word-generator', intent: 'User wants random English words for brainstorming, writing exercises, or games.' },
  { slug: 'tag-cloud-generator', intent: 'User wants keyword density lists and formatted tag cloud text summaries.' },
  { slug: 'study-plan-generator', intent: 'User wants organized study schedules, exam prep timelines, and learning milestone lists.' },
  { slug: 'korean-name-generator', intent: 'User wants authentic Korean given names, family names, and hangul romanizations.' }
];

let fixCount = 0;

shortIntents.forEach(item => {
  const regex = new RegExp(`(slug:\\s*'${item.slug}'[\\s\\S]*?userIntent:\\s*['"\`])[^'"\`]+(['"\`])`, 'm');
  if (regex.test(content)) {
    content = content.replace(regex, `$1${item.intent}$2`);
    fixCount++;
  }
});

// Fix options property key for slug-generator and utm-generator
content = content.replace(
  "{ id: 'slug-keyword-focus', label: 'Keyword Focus', type: 'select', choices: [{ value: 'all', label: 'All Words' }, { value: 'keywords', label: 'Key Terms Only' }], default: 'all' }",
  "{ id: 'slug-keyword-focus', label: 'Keyword Focus', type: 'select', options: [{ value: 'all', label: 'All Words' }, { value: 'keywords', label: 'Key Terms Only' }], default: 'all' }"
);

content = content.replace(
  "{ id: 'utm-term', label: 'UTM Term', type: 'select', choices: [{ value: 'none', label: 'None' }, { value: 'keyword', label: 'Campaign Keyword' }], default: 'none' }",
  "{ id: 'utm-term', label: 'UTM Term', type: 'select', options: [{ value: 'none', label: 'None' }, { value: 'keyword', label: 'Campaign Keyword' }], default: 'none' }"
);

content = content.replace(
  "{ id: 'utm-content', label: 'UTM Content', type: 'select', choices: [{ value: 'none', label: 'None' }, { value: 'ad-variant', label: 'Ad Variant A/B' }], default: 'none' }",
  "{ id: 'utm-content', label: 'UTM Content', type: 'select', options: [{ value: 'none', label: 'None' }, { value: 'ad-variant', label: 'Ad Variant A/B' }], default: 'none' }"
);

fs.writeFileSync(filePath, content, 'utf8');
console.log(`Successfully fixed ${fixCount} short user intents and option choices.`);
