import { execSync } from 'child_process';
import fs from 'fs';

const gitPath = 'C:\\Users\\shahz\\AppData\\Local\\GitHubDesktop\\app-3.6.2\\resources\\app\\git\\cmd\\git.exe';
const command = `"${gitPath}" diff 148d150~1 148d150 -- src/scripts/tool-workspace.ts`;

console.log('Running git diff...');
const diff = execSync(command, { maxBuffer: 15 * 1024 * 1024 }).toString();
const lines = diff.split('\n');

const targets = ['username-generator', 'text-case-converter', 'rap-name-generator'];

targets.forEach(target => {
  console.log(`\n=================== DIFF FOR ${target} ===================`);
  let matchedLines = [];
  let recording = false;
  let count = 0;
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (line.includes(`case '${target}':`)) {
      recording = true;
      // capture some context before
      matchedLines = lines.slice(Math.max(0, i - 3), i);
    }
    
    if (recording) {
      matchedLines.push(line);
      if (line.startsWith('@@') || line.startsWith('diff --git') || (line.startsWith('+') && line.includes('break;') && count > 5)) {
        // Stop recording on next diff section or after we find break
      }
      // If we find a break; on a added line or original line, stop recording soon
      if (line.includes('break;') && !line.includes('case')) {
        recording = false;
        // add 2 more lines of context
        matchedLines.push(lines[i+1] || '');
        matchedLines.push(lines[i+2] || '');
        console.log(matchedLines.join('\n'));
      }
    }
  }
});
