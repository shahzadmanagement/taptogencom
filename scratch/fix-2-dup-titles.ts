import fs from 'fs';
import path from 'path';

async function fixTwoDupTitles() {
  // 1. Fix Spanish town name generator title in src/data/localization-spanish-data.ts
  const esFile = path.join(process.cwd(), 'src/data/localization-spanish-data.ts');
  let esContent = fs.readFileSync(esFile, 'utf-8');
  // Make generador-town-nombres distinct from generador-city-nombres
  esContent = esContent.replace(
    `metaTitle: 'Generador de Nombres de Ciudades - Pueblos y Ciudades',`,
    `metaTitle: 'Generador de Nombres de Pueblos - Ciudades y Villas',`
  );
  fs.writeFileSync(esFile, esContent, 'utf-8');
  console.log('Fixed Spanish town-nombres title in localization-spanish-data.ts');

  // 2. Fix Portuguese stage name generator title in src/data/localization-portuguese-data.ts
  const ptFile = path.join(process.cwd(), 'src/data/localization-portuguese-data.ts');
  let ptContent = fs.readFileSync(ptFile, 'utf-8');
  // Make gerador-stage-name distinct from gerador-pen-name
  ptContent = ptContent.replace(
    `metaTitle: 'Gerador de Nomes Artísticos - Pseudónimos de Artistas',`,
    `metaTitle: 'Gerador de Nomes de Palco - Nomes Artísticos e Shows',`
  );
  fs.writeFileSync(ptFile, ptContent, 'utf-8');
  console.log('Fixed Portuguese stage-name title in localization-portuguese-data.ts');
}

fixTwoDupTitles().catch(console.error);
