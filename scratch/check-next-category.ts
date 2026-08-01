import { tools } from '../src/data/tools';
import { getComparisonBlockForTool } from '../src/lib/helpful-content-engine';

const categoriesMap = new Map<string, { categoryName: string; total: number; dedicated: number; slugs: string[] }>();

for (const t of tools) {
  const catSlug = t.categorySlug || 'uncategorized';
  const catName = t.category || 'Uncategorized';
  if (!categoriesMap.has(catSlug)) {
    categoriesMap.set(catSlug, { categoryName: catName, total: 0, dedicated: 0, slugs: [] });
  }
  const entry = categoriesMap.get(catSlug)!;
  entry.total++;
  entry.slugs.push(t.slug);

  const comp = getComparisonBlockForTool(t);
  if (comp.title.includes(' vs ')) {
    entry.dedicated++;
  }
}

console.log('=== CATEGORY DOMINATION AUDIT ===\n');
for (const [catSlug, data] of categoriesMap.entries()) {
  console.log(`[${catSlug.padEnd(30)}] Name: "${data.categoryName.padEnd(35)}" | Total: ${String(data.total).padStart(3)} | Dedicated Matrix: ${String(data.dedicated).padStart(3)}`);
}
