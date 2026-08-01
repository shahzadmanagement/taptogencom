import { tools } from '../src/data/tools';

const textFontTools = tools.filter(t => t.categorySlug === 'text-font-generators');
console.log('Total Text & Font Generators:', textFontTools.length);
textFontTools.forEach((t, i) => console.log(`${i + 1}. ${t.slug} (${t.name})`));
