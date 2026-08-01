import fs from 'fs';
import path from 'path';

function searchTitleDefs() {
  const dataDir = path.join(process.cwd(), 'src/data');
  const files = fs.readdirSync(dataDir);

  for (const f of files) {
    if (f.endsWith('.ts') || f.endsWith('.json')) {
      const p = path.join(dataDir, f);
      const text = fs.readFileSync(p, 'utf-8');
      if (text.includes('Generador de Nombres de Ciudades')) {
        console.log(`FOUND_SPANISH_CITY_TITLE in ${f}`);
      }
      if (text.includes('Gerador de Nomes Artísticos')) {
        console.log(`FOUND_PORTUGUESE_ARTIST_TITLE in ${f}`);
      }
    }
  }
}

searchTitleDefs();
