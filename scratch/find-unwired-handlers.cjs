const fs = require('fs');
const content = fs.readFileSync('src/scripts/tool-workspace.ts', 'utf8');

const unwiredSlugs = [
  'youtube-tag-generator',
  'pinterest-tag-generator',
  'soundcloud-tag-generator',
  'shipping-policy-generator',
  'fake-text-generator',
  'return-policy-generator'
];

content.split('\n').forEach((line, idx) => {
  unwiredSlugs.forEach(s => {
    if (line.includes(`case '${s}':`)) {
      console.log(`Line ${idx + 1}: ${line}`);
    }
  });
});
