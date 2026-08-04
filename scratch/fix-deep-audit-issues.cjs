const fs = require('fs');
const path = require('path');

const toolsFilePath = path.resolve(__dirname, '../src/data/tools.ts');
let content = fs.readFileSync(toolsFilePath, 'utf8');

// 1. Fix duplicate primary keyword
content = content.replace(
  "slug: 'dj-name-generator',\n    name: 'DJ Name Generator',\n    description: 'Generate electronic music stage names, DJ aliases, and performer handles with customizable style filters.',\n    category: 'Creative & Story Generators',\n    categorySlug: 'creative-generators',\n    icon: '🎧',\n    metaTitle: 'DJ Name Generator — Electronic Performer & Stage Names',\n    metaDescription: 'Generate electronic music stage names, DJ aliases, and performer handles. Free instant DJ name generator with style filters.',\n    primaryKeyword: 'dj name generator',",
  "slug: 'dj-name-generator',\n    name: 'DJ Name Generator',\n    description: 'Generate electronic music stage names, DJ aliases, and performer handles with customizable style filters.',\n    category: 'Creative & Story Generators',\n    categorySlug: 'creative-generators',\n    icon: '🎧',\n    metaTitle: 'DJ Name Generator — Electronic Performer & Stage Names',\n    metaDescription: 'Generate electronic music stage names, DJ aliases, and performer handles. Free instant DJ name generator with style filters.',\n    primaryKeyword: 'dj stage name generator',"
);

// 2. Map of 4th FAQs for the 18 tools
const extraFaqs = {
  'username-generator': {
    q: 'How do I choose an available username across multiple platforms?',
    a: 'Use generated handles that combine unique prefix or suffix modifiers. Check availability on your target social networks or gaming platforms before finalizing.'
  },
  'discord-name-generator': {
    q: 'Can I change my Discord username or display name anytime?',
    a: 'Yes, Discord allows you to update your display name for free on servers and your account settings without losing your original friends list or chat history.'
  },
  'couple-name-generator': {
    q: 'How are ship names and couple nicknames formatted?',
    a: 'Couple names combine the beginning syllables of one name with the ending syllables of another, creating memorable portmanteau nicknames for social media tags.'
  },
  'cat-name-generator': {
    q: 'What type of cat names respond best during training?',
    a: 'Short, one or two-syllable names with hard consonant sounds (like k, t, or p) are easiest for felines to recognize and respond to quickly.'
  },
  'horse-name-generator': {
    q: 'Are registered horse show names different from barn names?',
    a: 'Yes, official registered names often reference bloodlines or sire names for pedigree tracking, while barn names are short everyday call-names used by trainers.'
  },
  'japanese-name-generator': {
    q: 'Do Japanese names have specific kanji meanings?',
    a: 'Yes, traditional Japanese names are written in kanji characters representing natural elements, virtues, seasons, or family heritage.'
  },
  'korean-name-generator': {
    q: 'How are traditional Korean given names structured?',
    a: 'Korean given names typically consist of two syllables, with one syllable shared among family generation members and the second chosen for individual meaning.'
  },
  'sibling-name-generator': {
    q: 'How can I choose matching sibling names that sound cohesive?',
    a: 'Pair names with complementary origins, matching syllable counts, or shared style themes without making them sound overly identical or rhyming.'
  },
  'last-name-and-first-name-generator': {
    q: 'How do I match first and last names for fictional characters?',
    a: 'Consider historical era, cultural background, and phonetic rhythm so the full name flows naturally in storytelling and dialogue.'
  },
  'baby-name-generator-with-last-name': {
    q: 'Why should I test baby names with my full surname before deciding?',
    a: 'Testing first and middle names with your surname ensures there are no unintended awkward acronyms or repetitive rhyming syllables.'
  },
  'nickname-generator-based-on-name': {
    q: 'How can I create an endearing nickname from a long first name?',
    a: 'Take the initial syllable or soft middle sound and add friendly diminutives or aesthetic endings suitable for casual handles.'
  },
  'club-name-generator': {
    q: 'What makes a club or organization name memorable?',
    a: 'Combine your core activity or mission with a distinct location, collective noun, or aspirational adjective that reflects your community spirit.'
  },
  'dinosaur-name-generator': {
    q: 'How are real dinosaur scientific names formed?',
    a: 'Paleontologists create dinosaur names using Greek and Latin roots describing physical traits, discovery locations, or honoring famous researchers.'
  },
  'pen-name-generator': {
    q: 'Can I publish books commercially under a pseudonym?',
    a: 'Yes, authors frequently use pen names to protect personal privacy, test new literary genres, or build distinct brand identities for different book series.'
  },
  'pet-name-generator': {
    q: 'Should I choose a pet name based on personality or appearance?',
    a: 'Both work great! Personality traits (playful, energetic, calm) and physical markers (color, coat pattern, size) yield charming call-names.'
  },
  'sports-team-name-generator': {
    q: 'What elements create strong sports team names?',
    a: 'Powerful team names feature fierce animals, meteorological phenomena, local historical landmarks, or high-energy action verbs.'
  },
  'victorian-name-generator': {
    q: 'What characterized Victorian era naming conventions?',
    a: 'Victorian names reflected royal tradition, classic biblical literature, and botanical flowers popular during 19th-century Britain and America.'
  },
  'racehorse-name-generator': {
    q: 'What rules govern official Thoroughbred racehorse names?',
    a: 'The Jockey Club requires racehorse names to be 18 characters or fewer, unique within active racing registries, and free from trademarked brand terms.'
  }
};

let fixedCount = 0;

Object.entries(extraFaqs).forEach(([slug, faq]) => {
  const toolPattern = new RegExp(`(slug:\\s*'${slug}',[\\s\\S]*?faqItems:\\s*\\[[\\s\\S]*?\\{\\s*q:[^\\}]+\\}\\s*)(\\])`, 'm');
  const match = content.match(toolPattern);
  if (match) {
    const replacement = `${match[1]},\n      { q: '${faq.q.replace(/'/g, "\\'")}', a: '${faq.a.replace(/'/g, "\\'")}' }\n    ]`;
    content = content.replace(match[0], replacement);
    fixedCount++;
  } else {
    console.warn(`Could not match FAQ array for ${slug}`);
  }
});

fs.writeFileSync(toolsFilePath, content, 'utf8');
console.log(`Successfully updated ${fixedCount} tools with 4th EEAT FAQs and fixed duplicate primary keyword.`);
