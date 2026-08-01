import fs from 'fs';
import path from 'path';

function findToolTemplates(dir: string): string[] {
  let results: string[] = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat && stat.isDirectory()) {
      results = results.concat(findToolTemplates(filePath));
    } else if (file === '[slug].astro' && filePath.includes('tools')) {
      results.push(filePath);
    }
  });
  return results;
}

const templates = findToolTemplates('src/pages');
console.log('FOUND_TOOL_TEMPLATES:', templates);
