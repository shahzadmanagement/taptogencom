const fs = require('fs');
const path = require('path');

const filePath = path.resolve(__dirname, '../src/data/tools.ts');
let content = fs.readFileSync(filePath, 'utf8');

// Fix primary keyword for dj-name-generator
content = content.replace(/slug:\s*'dj-name-generator'[\s\S]*?primaryKeyword:\s*'dj name generator'/, (m) => {
  return m.replace("primaryKeyword: 'dj name generator'", "primaryKeyword: 'dj stage name generator'");
});

// Targeted 4th FAQs for the remaining 10 tools
const targetedFaqs = [
  { slug: 'discord-name-generator', q: 'Can I change my Discord username or display name anytime?', a: 'Yes, Discord allows you to update your display name for free on servers and your account settings without losing your original friends list or chat history.' },
  { slug: 'couple-name-generator', q: 'How are ship names and couple nicknames formatted?', a: 'Couple names combine the beginning syllables of one name with the ending syllables of another, creating memorable portmanteau nicknames for social media tags.' },
  { slug: 'cat-name-generator', q: 'What type of cat names respond best during training?', a: 'Short, one or two-syllable names with hard consonant sounds (like k, t, or p) are easiest for felines to recognize and respond to quickly.' },
  { slug: 'horse-name-generator', q: 'Are registered horse show names different from barn names?', a: 'Yes, official registered names often reference bloodlines or sire names for pedigree tracking, while barn names are short everyday call-names used by trainers.' },
  { slug: 'japanese-name-generator', q: 'Do Japanese names have specific kanji meanings?', a: 'Yes, traditional Japanese names are written in kanji characters representing natural elements, virtues, seasons, or family heritage.' },
  { slug: 'korean-name-generator', q: 'How are traditional Korean given names structured?', a: 'Korean given names typically consist of two syllables, with one syllable shared among family generation members and the second chosen for individual meaning.' },
  { slug: 'sibling-name-generator', q: 'How can I choose matching sibling names that sound cohesive?', a: 'Pair names with complementary origins, matching syllable counts, or shared style themes without making them sound overly identical or rhyming.' },
  { slug: 'last-name-and-first-name-generator', q: 'How do I match first and last names for fictional characters?', a: 'Consider historical era, cultural background, and phonetic rhythm so the full name flows naturally in storytelling and dialogue.' },
  { slug: 'baby-name-generator-with-last-name', q: 'Why should I test baby names with my full surname before deciding?', a: 'Testing first and middle names with your surname ensures there are no unintended awkward acronyms or repetitive rhyming syllables.' },
  { slug: 'nickname-generator-based-on-name', q: 'How can I create an endearing nickname from a long first name?', a: 'Take the initial syllable or soft middle sound and add friendly diminutives or aesthetic endings suitable for casual handles.' }
];

targetedFaqs.forEach(item => {
  const regex = new RegExp(`(slug:\\s*'${item.slug}'[\\s\\S]*?faqItems:\\s*\\[[^\\]]*)\\]`, 'm');
  if (regex.test(content)) {
    content = content.replace(regex, `$1, {"q":${JSON.stringify(item.q)},"a":${JSON.stringify(item.a)}}]`);
    console.log(`Updated ${item.slug}`);
  } else {
    console.log(`FAILED TO MATCH ${item.slug}`);
  }
});

fs.writeFileSync(filePath, content, 'utf8');
console.log('Saved tools.ts fixes');
