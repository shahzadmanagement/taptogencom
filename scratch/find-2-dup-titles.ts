import fs from 'fs';
import path from 'path';

function findDupTitles() {
  const distDir = path.join(process.cwd(), 'dist');
  const titleMap = new Map<string, string[]>();

  function scan(dir: string) {
    const list = fs.readdirSync(dir);
    for (const file of list) {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);
      if (stat && stat.isDirectory()) {
        scan(filePath);
      } else if (file === 'index.html') {
        const html = fs.readFileSync(filePath, 'utf-8');
        const m = html.match(/<title>([\s\S]*?)<\/title>/i);
        if (m) {
          const t = m[1].trim();
          if (!titleMap.has(t)) titleMap.set(t, []);
          titleMap.get(t)!.push(path.relative(distDir, filePath).replace(/\\/g, '/'));
        }
      }
    }
  }

  scan(distDir);
  for (const [t, paths] of titleMap.entries()) {
    if (paths.length > 1) {
      console.log(`DUPLICATE TITLE ("${t}"):`, paths);
    }
  }
}

findDupTitles();
