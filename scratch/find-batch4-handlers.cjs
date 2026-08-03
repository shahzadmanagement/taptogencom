const fs = require('fs');
const content = fs.readFileSync('src/scripts/tool-workspace.ts', 'utf8');

const slugs = [
  'bubble-text-generator',
  'cute-text-generator',
  'cursive-name-generator',
  'retro-text-generator',
  'typewriter-text-generator',
  'pixel-text-generator',
  'ransom-note-text-generator'
];

content.split('\n').forEach((line, idx) => {
  slugs.forEach(s => {
    if (line.includes(`case '${s}':`)) {
      console.log(`Line ${idx + 1}: ${line}`);
    }
  });
});
