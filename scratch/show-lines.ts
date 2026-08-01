import fs from 'fs';
import path from 'path';

function showLines() {
  const esFile = path.join(process.cwd(), 'src/data/localization-spanish-data.ts');
  const esLines = fs.readFileSync(esFile, 'utf-8').split('\n');
  esLines.forEach((line, idx) => {
    if (line.includes('Generador de Nombres de Ciudades')) {
      console.log(`SPANISH L${idx + 1}: ${line}`);
    }
  });

  const ptFile = path.join(process.cwd(), 'src/data/localization-portuguese-data.ts');
  const ptLines = fs.readFileSync(ptFile, 'utf-8').split('\n');
  ptLines.forEach((line, idx) => {
    if (line.includes('Gerador de Nomes Artísticos')) {
      console.log(`PORTUGUESE L${idx + 1}: ${line}`);
    }
  });
}

showLines();
