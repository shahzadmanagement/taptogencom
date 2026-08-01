import fs from 'fs';
import path from 'path';

async function fixAllNineTitles() {
  // 1. Fix src/pages/index.astro
  const indexFile = path.join(process.cwd(), 'src/pages/index.astro');
  let indexContent = fs.readFileSync(indexFile, 'utf-8');
  indexContent = indexContent.replace(
    'title="TapToGen - Free Online Generator Tools for Names, Text, Writing, SEO and More"',
    'title="TapToGen — Free Online Generator Tools for Names, Text & SEO"'
  );
  fs.writeFileSync(indexFile, indexContent, 'utf-8');
  console.log('Fixed index.astro title');

  // 2. Fix src/data/categories.ts
  const catFile = path.join(process.cwd(), 'src/data/categories.ts');
  let catContent = fs.readFileSync(catFile, 'utf-8');
  catContent = catContent.replace(
    "metaTitle: 'Gaming & Fantasy Name Generators — D&D, RPG & More'",
    "metaTitle: 'Gaming & Fantasy Name Generators'"
  );
  catContent = catContent.replace(
    "metaTitle: 'Bio & Caption Generators — Instagram, Twitter & More'",
    "metaTitle: 'Bio & Caption Generators'"
  );
  fs.writeFileSync(catFile, catContent, 'utf-8');
  console.log('Fixed categories.ts titles');

  // 3. Fix src/data/localization-french-data.ts
  const frFile = path.join(process.cwd(), 'src/data/localization-french-data.ts');
  let frContent = fs.readFileSync(frFile, 'utf-8');
  frContent = frContent.replace(
    "Générateur d'Accroches Virales - Phrases d'Impact SEO",
    "Générateur d'Accroches Virales SEO"
  );
  frContent = frContent.replace(
    "Générateur d'Étiquettes d'Animaux - Médailles SEO",
    "Générateur d'Étiquettes d'Animaux SEO"
  );
  frContent = frContent.replace(
    "Générateur d'Idées d'Écriture - Prompts de Récit SEO",
    "Générateur d'Idées d'Écriture SEO"
  );
  frContent = frContent.replace(
    "Générateur d'Objets d'E-Mail - Accroches E-Mails SEO",
    "Générateur d'Objets d'E-Mail SEO"
  );
  frContent = frContent.replace(
    "Générateur de Noms d'Œuvres d'Art - Titres Tableau SEO",
    "Générateur de Noms d'Œuvres d'Art SEO"
  );
  frContent = frContent.replace(
    "Générateur de \"Tu Préfères\" - Dilemmes et Jeux SEO",
    "Générateur de \"Tu Préfères\" SEO"
  );
  fs.writeFileSync(frFile, frContent, 'utf-8');
  console.log('Fixed localization-french-data.ts titles');

  // 4. Update src/lib/search-metadata.ts to strictly cap titles at 48 chars before appending brand suffix
  const metaFile = path.join(process.cwd(), 'src/lib/search-metadata.ts');
  let metaContent = fs.readFileSync(metaFile, 'utf-8');
  metaContent = metaContent.replace(
    "if (title.length > 55) {\n      title = title.slice(0, 52).trim() + '...';\n    }",
    "if (title.length > 48) {\n      title = title.slice(0, 45).trim() + '...';\n    }"
  );
  fs.writeFileSync(metaFile, metaContent, 'utf-8');
  console.log('Fixed search-metadata.ts capping logic');
}

fixAllNineTitles().catch(console.error);
