const fs = require('fs');
const path = require('path');
const { loadTS } = require('../tests/helpers/ts-loader.cjs');

const toolsPath = path.resolve(__dirname, '../src/data/tools.ts');
let content = fs.readFileSync(toolsPath, 'utf8');

const subParSlugs = [
  'username-generator',
  'discord-name-generator',
  'couple-name-generator',
  'cat-name-generator',
  'horse-name-generator',
  'japanese-name-generator',
  'korean-name-generator',
  'sibling-name-generator',
  'last-name-and-first-name-generator',
  'baby-name-generator-with-last-name',
  'nickname-generator-based-on-name',
  'club-name-generator',
  'dinosaur-name-generator',
  'pen-name-generator',
  'pet-name-generator',
  'sports-team-name-generator',
  'victorian-name-generator',
  'racehorse-name-generator'
];

console.log(`Checking line locations of ${subParSlugs.length} tools...`);
subParSlugs.forEach(slug => {
  content.split('\n').forEach((line, idx) => {
    if (line.includes(`slug: '${slug}'`)) {
      console.log(`Tool ${slug} at Line ${idx + 1}`);
    }
  });
});
