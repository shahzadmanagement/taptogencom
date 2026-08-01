import fs from 'fs';
import path from 'path';

function fixExactDuplicates() {
  // 1. Spanish
  const esFile = path.join(process.cwd(), 'src/data/localization-spanish-data.ts');
  let esText = fs.readFileSync(esFile, 'utf-8');
  
  // Find town-nombres entry
  const townIdx = esText.indexOf("'generador-town-nombres'");
  if (townIdx !== -1) {
    const section = esText.slice(townIdx, townIdx + 500);
    console.log('SPANISH TOWN ENTRY:', section);
    // Replace metaTitle within town section
    esText = esText.slice(0, townIdx) + esText.slice(townIdx).replace("metaTitle: 'Generador de Nombres de Ciudades - Pueblos y Ciudades'", "metaTitle: 'Generador de Nombres de Pueblos y Villas'");
    fs.writeFileSync(esFile, esText, 'utf-8');
    console.log('Replaced Spanish town metaTitle');
  }

  // 2. Portuguese
  const ptFile = path.join(process.cwd(), 'src/data/localization-portuguese-data.ts');
  let ptText = fs.readFileSync(ptFile, 'utf-8');
  const stageIdx = ptText.indexOf("'gerador-stage-name'");
  if (stageIdx !== -1) {
    const section = ptText.slice(stageIdx, stageIdx + 500);
    console.log('PORTUGUESE STAGE ENTRY:', section);
    ptText = ptText.slice(0, stageIdx) + ptText.slice(stageIdx).replace("metaTitle: 'Gerador de Nomes Artísticos - Pseudónimos de Artistas'", "metaTitle: 'Gerador de Nomes de Palco e Shows'");
    fs.writeFileSync(ptFile, ptText, 'utf-8');
    console.log('Replaced Portuguese stage metaTitle');
  }
}

fixExactDuplicates();
