import fs from 'fs';
import path from 'path';

const pages = [
  'index.html',
  'tools/fancy-text-generator/index.html',
  'tools/bold-text-generator/index.html'
];

async function run() {
  console.log('Verifying Local Production Build Output...');
  let allHealthy = true;
  for (const page of pages) {
    const filePath = path.join('dist', page);
    const exists = fs.existsSync(filePath);
    console.log(`- Check file ${filePath}: ${exists ? 'EXISTS' : 'NOT FOUND'}`);
    if (!exists) allHealthy = false;
  }
  if (!allHealthy) {
    console.error('Production Verification Failed!');
    process.exit(1);
  } else {
    console.log('Production Verification Passed!');
  }
}

run();
