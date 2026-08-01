import fs from 'fs';
import path from 'path';

function findTruncatedTitles() {
  const distDir = path.join(process.cwd(), 'dist');
  const results: { file: string; title: string; length: number }[] = [];

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
        if (m && m[1].trim().length > 70) {
          results.push({
            file: path.relative(distDir, filePath).replace(/\\/g, '/'),
            title: m[1].trim(),
            length: m[1].trim().length
          });
        }
      }
    }
  }

  scan(distDir);
  console.log(JSON.stringify(results, null, 2));
}

findTruncatedTitles();
