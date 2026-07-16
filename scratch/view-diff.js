import { execSync } from 'child_process';

const gitPath = 'C:\\Users\\shahz\\AppData\\Local\\GitHubDesktop\\app-3.6.2\\resources\\app\\git\\cmd\\git.exe';
const command = `"${gitPath}" diff 148d150~1 148d150 -- src/scripts/tool-workspace.ts`;
const diff = execSync(command, { maxBuffer: 15 * 1024 * 1024 }).toString();

const lines = diff.split('\n');
let chunkIndex = 0;
let currentBlock = [];

lines.forEach(line => {
  if (line.startsWith('@@')) {
    if (currentBlock.length > 0) {
      if (chunkIndex === 0) {
        console.log(`\n--- CHUNK ${chunkIndex} ---`);
        console.log(currentBlock.join('\n'));
      }
      chunkIndex++;
      currentBlock = [];
    }
  }
  currentBlock.push(line);
});

if (currentBlock.length > 0 && chunkIndex === 0) {
  console.log(`\n--- CHUNK ${chunkIndex} ---`);
  console.log(currentBlock.join('\n'));
}
