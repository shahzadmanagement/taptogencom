const fs = require('fs');
const content = fs.readFileSync('src/data/tools.ts', 'utf8');

const slugs = [
  'bubble-text-generator',
  'cute-text-generator',
  'cursive-name-generator',
  'retro-text-generator',
  'typewriter-text-generator',
  'pixel-text-generator',
  'serif-generator',
  'papyrus-generator',
  'ransom-note-text-generator'
];

const lines = content.split('\n');
lines.forEach((line, idx) => {
  slugs.forEach(s => {
    if (line.includes(`slug: '${s}'`)) {
      console.log(`Line ${idx + 1}: ${line}`);
    }
  });
});
