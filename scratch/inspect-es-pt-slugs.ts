import fs from 'fs';
import path from 'path';

function inspectSlugs() {
  const esFile = path.join(process.cwd(), 'src/data/localization-spanish-data.ts');
  const esText = fs.readFileSync(esFile, 'utf-8');
  
  const matches = esText.match(/canonicalToolId:\s*'town-name-generator'[\s\S]*?metaTitle:\s*'([^']*)'/);
  console.log('SPANISH TOWN ENTRY MATCH:', matches ? matches[1] : 'NOT FOUND');

  const matches2 = esText.match(/metaTitle:\s*'(Generador de Nombres de Ciudades[^']*)'/g);
  console.log('SPANISH CITY TITLES:', matches2);

  const ptFile = path.join(process.cwd(), 'src/data/localization-portuguese-data.ts');
  const ptText = fs.readFileSync(ptFile, 'utf-8');
  const matches3 = ptText.match(/metaTitle:\s*'(Gerador de Nomes Artísticos[^']*)'/g);
  console.log('PORTUGUESE ARTIST TITLES:', matches3);
}

inspectSlugs();
