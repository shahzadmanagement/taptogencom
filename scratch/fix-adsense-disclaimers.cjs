const fs = require('fs');
const path = require('path');

const filePath = path.resolve(__dirname, '../src/data/tools.ts');
let content = fs.readFileSync(filePath, 'utf8');

const disclaimerUpdates = [
  { slug: 'dalle-prompt-generator', disc: 'Independent draft tool. Not affiliated with, endorsed by, or sponsored by OpenAI or DALL-E. Generated prompts are for creative guidance.' },
  { slug: 'tiktok-caption-generator', disc: 'Independent caption generator tool. Not affiliated with or endorsed by TikTok or ByteDance. Generated captions are original drafts.' },
  { slug: 'instagram-caption-generator', disc: 'Independent caption generator tool. Not affiliated with or endorsed by Instagram or Meta. Generated text is for creative guidance.' },
  { slug: 'linkedin-post-generator', disc: 'Independent drafting tool. Not affiliated with or endorsed by LinkedIn or Microsoft. Post drafts are original suggestions for business use.' },
  { slug: 'facebook-post-generator', disc: 'Independent content drafting tool. Not affiliated with or endorsed by Facebook or Meta. Generated posts are original creative drafts.' },
  { slug: 'ao3-tag-generator', disc: 'Independent fan-fiction drafting tool. Not affiliated with or endorsed by Archive of Our Own (AO3) or OTW. Tags are original suggestions.' },
  { slug: 'dnd-name-generator', disc: 'Independent tabletop character name generator. Not affiliated with or endorsed by Wizards of the Coast or D&D. All names are original creative drafts.' }
];

let fixCount = 0;

disclaimerUpdates.forEach(item => {
  const regex = new RegExp(`(slug:\\s*'${item.slug}'[\\s\\S]*?disclaimer:\\s*['"\`])[^'"\`]+(['"\`])`, 'm');
  if (regex.test(content)) {
    content = content.replace(regex, `$1${item.disc}$2`);
    fixCount++;
  } else {
    // Insert disclaimer field if missing
    const slugRegex = new RegExp(`(slug:\\s*'${item.slug}'[\\s\\S]*?)(outputFormat:|faqItems:)`, 'm');
    if (slugRegex.test(content)) {
      content = content.replace(slugRegex, `$1disclaimer: ${JSON.stringify(item.disc)},\n    $2`);
      fixCount++;
    } else {
      console.log(`FAILED TO MATCH ${item.slug}`);
    }
  }
});

fs.writeFileSync(filePath, content, 'utf8');
console.log(`Successfully updated ${fixCount} AdSense trademark disclaimers.`);
