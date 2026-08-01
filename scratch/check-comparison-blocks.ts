import { tools } from '../src/data/tools';
import { getComparisonBlockForTool } from '../src/lib/helpful-content-engine';

const textFontTools = tools.filter(t => t.categorySlug === 'text-font-generators');
console.log('=== CHECKING DEDICATED COMPETITOR COMPARISON BLOCKS ===\n');

textFontTools.forEach((t) => {
  const block = getComparisonBlockForTool(t);
  const isDedicated = block.title.includes(' vs ');
  console.log(`${t.slug.padEnd(32)} => ${isDedicated ? 'DEDICATED Matrix' : 'Generic Matrix'}`);
});
