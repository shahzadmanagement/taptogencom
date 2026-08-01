import fs from 'fs';
import path from 'path';

function fixExactLines() {
  const esFile = path.join(process.cwd(), 'src/data/localization-spanish-data.ts');
  let esText = fs.readFileSync(esFile, 'utf-8');
  esText = esText.replace('"metaTitle": "Generador de Nombres de Ciudades - Pueblos y Villas",', '"metaTitle": "Generador de Nombres de Ciudades",');
  esText = esText.replace('"metaTitle": "Generador de Nombres de Ciudades - Pueblos y Ciudades",', '"metaTitle": "Generador de Nombres de Pueblos",');
  fs.writeFileSync(esFile, esText, 'utf-8');
  console.log('Fixed Spanish exact metaTitles');

  const ptFile = path.join(process.cwd(), 'src/data/localization-portuguese-data.ts');
  let ptText = fs.readFileSync(ptFile, 'utf-8');
  ptText = ptText.replace('"metaTitle": "Gerador de Nomes Artísticos - Pseudónimos de Palco Web",', '"metaTitle": "Gerador de Nomes de Palco",');
  ptText = ptText.replace('"metaTitle": "Gerador de Nomes Artísticos - Nomes de Palco e Shows",', '"metaTitle": "Gerador de Nomes Artísticos",');
  ptText = ptText.replace('"metaTitle": "Gerador de Nomes Artísticos - Pseudónimos de Autores",', '"metaTitle": "Gerador de Pseudónimos de Autor",');
  fs.writeFileSync(ptFile, ptText, 'utf-8');
  console.log('Fixed Portuguese exact metaTitles');
}

fixExactLines();
