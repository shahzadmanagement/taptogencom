import fs from 'fs';

const filePath = 'src/data/localization-spanish-data.ts';
let content = fs.readFileSync(filePath, 'utf-8');

const match = content.match(/export const spanishMasterToolData: LocalizedToolContent\[\] = (\[[\s\S]*\]);/);
if (match) {
  const items: any[] = eval(match[1]);
  const fancyItem = items.find(i => i.canonicalToolId === 'fancy-text-generator');
  if (fancyItem) {
    fancyItem.localizedSlug = 'letras-bonitas';
    fancyItem.h1 = 'Generador de Letras bonitas';
    fancyItem.metaTitle = 'Generador de Letras bonitas - Copiar y Pegar Texto — TapToGen';
    fancyItem.metaDescription = 'Convierte tu texto normal en fuentes decorativas y letras bonitas para copiar en Instagram, WhatsApp y TikTok. Gratis e instantáneo online.';
  }

  const nameItem = items.find(i => i.canonicalToolId === 'name-generator');
  if (nameItem) {
    nameItem.localizedSlug = 'generador-de-nombres';
    nameItem.h1 = 'Generador de nombres';
    nameItem.metaTitle = 'Generador de Nombres Gratis - Ideas Creativas Online';
    nameItem.metaDescription = 'Genera nombres originales y creativos para proyectos, personajes, marcas y empresas al instante. Herramienta gratuita online sin registro.';
  }

  const newContent = `import type { LocalizedToolContent } from './localization';\n\nexport const spanishMasterToolData: LocalizedToolContent[] = ${JSON.stringify(items, null, 2)};\n\nexport const spanishLocalizedToolData = spanishMasterToolData;\n`;
  fs.writeFileSync(filePath, newContent, 'utf-8');
  console.log('Fixed Spanish fancy-text-generator metadata alignment');
}
