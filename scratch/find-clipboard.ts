import fs from 'fs';
import path from 'path';

function findClipboardCalls(dir: string) {
  const list = fs.readdirSync(dir);
  for (const file of list) {
    const full = path.join(dir, file);
    if (fs.statSync(full).isDirectory()) {
      findClipboardCalls(full);
    } else if (file.endsWith('.ts') || file.endsWith('.js') || file.endsWith('.astro')) {
      const content = fs.readFileSync(full, 'utf-8');
      if (content.includes('clipboard') || content.includes('writeText')) {
        const lines = content.split('\n');
        lines.forEach((line, index) => {
          if (line.includes('clipboard') || line.includes('writeText')) {
            console.log(`${path.relative(process.cwd(), full)}:${index + 1}: ${line.trim()}`);
          }
        });
      }
    }
  }
}

findClipboardCalls('src');
