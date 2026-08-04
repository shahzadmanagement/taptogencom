const fs = require('fs');
const path = require('path');
const { loadTS } = require('../tests/helpers/ts-loader.cjs');

const filePath = path.resolve(__dirname, '../src/data/tools.ts');
let content = fs.readFileSync(filePath, 'utf8');
const { tools } = loadTS(filePath);

const disclaimerUpdates = {
  'dalle-prompt-generator': 'Independent draft tool. Not affiliated with, endorsed by, or sponsored by OpenAI or DALL-E. Generated prompts are for creative guidance.',
  'tiktok-caption-generator': 'Independent caption generator tool. Not affiliated with or endorsed by TikTok or ByteDance. Generated captions are original drafts.',
  'instagram-caption-generator': 'Independent caption generator tool. Not affiliated with or endorsed by Instagram or Meta. Generated text is for creative guidance.',
  'linkedin-post-generator': 'Independent drafting tool. Not affiliated with or endorsed by LinkedIn or Microsoft. Post drafts are original suggestions for business use.',
  'facebook-post-generator': 'Independent content drafting tool. Not affiliated with or endorsed by Facebook or Meta. Generated posts are original creative drafts.',
  'ao3-tag-generator': 'Independent fan-fiction drafting tool. Not affiliated with or endorsed by Archive of Our Own (AO3) or OTW. Tags are original suggestions.',
  'dnd-name-generator': 'Independent tabletop character name generator. Not affiliated with or endorsed by Wizards of the Coast or D&D. All names are original creative drafts.'
};

let fixCount = 0;

Object.entries(disclaimerUpdates).forEach(([slug, disc]) => {
  const tool = tools.find(t => t.slug === slug);
  if (tool) {
    if (tool.disclaimer) {
      // Replace existing disclaimer
      const escapedOldDisc = tool.disclaimer.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&');
      const regex = new RegExp(`(slug:\\s*'${slug}'[\\s\\S]*?disclaimer:\\s*['"\`])${escapedOldDisc}(['"\`])`, 'm');
      if (regex.test(content)) {
        content = content.replace(regex, `$1${disc}$2`);
        fixCount++;
      } else {
        console.log(`Could not replace disclaimer for ${slug}`);
      }
    } else {
      // Insert disclaimer
      const slugRegex = new RegExp(`(slug:\\s*'${slug}'[\\s\\S]*?)(outputFormat:|faqItems:)`, 'm');
      if (slugRegex.test(content)) {
        content = content.replace(slugRegex, `$1disclaimer: ${JSON.stringify(disc)},\n    $2`);
        fixCount++;
      } else {
        console.log(`Could not insert disclaimer for ${slug}`);
      }
    }
  }
});

fs.writeFileSync(filePath, content, 'utf8');
console.log(`Successfully updated ${fixCount} AdSense trademark disclaimers.`);
