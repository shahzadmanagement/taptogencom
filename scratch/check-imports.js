import fs from 'fs';
import path from 'path';

function getFiles(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat && stat.isDirectory()) {
      results = results.concat(getFiles(fullPath));
    } else if (file.endsWith('.ts') || file.endsWith('.astro')) {
      results.push(fullPath);
    }
  });
  return results;
}

const srcFiles = getFiles(path.join(process.cwd(), 'src'));
console.log(`Checking imports across ${srcFiles.length} files...`);

let errorsCount = 0;

srcFiles.forEach(filePath => {
  const content = fs.readFileSync(filePath, 'utf-8');
  const importLines = content.match(/import\s+.*from\s+['\"].*['\"]/g) || [];
  
  importLines.forEach(line => {
    const match = line.match(/from\s+['\"](.*)['\"]/);
    if (!match) return;
    const importPath = match[1];
    
    // We only validate relative imports
    if (importPath.startsWith('.')) {
      const targetPath = path.resolve(path.dirname(filePath), importPath);
      // Check if it's a file directly, or has extension added
      const possibleExtensions = ['.ts', '.tsx', '.d.ts', '.js', '.mjs', '.astro', '/index.ts', ''];
      let found = false;
      for (const ext of possibleExtensions) {
        const check = targetPath + ext;
        if (fs.existsSync(check) && !fs.statSync(check).isDirectory()) {
          found = true;
          break;
        }
      }
      if (!found) {
        console.error(`Broken Import in ${filePath}: "${importPath}"`);
        errorsCount++;
      }
    }
  });
});

if (errorsCount > 0) {
  console.error(`Verification Failed: Found ${errorsCount} broken relative imports.`);
  process.exit(1);
} else {
  console.log('Verification Passed: All relative imports are valid and resolved.');
}
