import { tools } from '../src/data/tools';
import { getUniversalLinkingBlocks } from '../src/lib/universal-internal-linking-engine';

console.log('=== VERIFYING UNIVERSAL INTERNAL LINKING ENGINE (PHASE 1) ===\n');

const testSlugs = [
  'fancy-text-generator',
  'name-generator',
  'paragraph-generator',
  'meta-tag-generator',
  'business-name-generator',
  'gaming-name-generator',
];

let totalLinksChecked = 0;

for (const slug of testSlugs) {
  const tool = tools.find(t => t.slug === slug);
  if (!tool) throw new Error(`Tool not found: ${slug}`);

  const blocks = getUniversalLinkingBlocks(slug, 'en');

  const totalToolLinks =
    blocks.relatedTools.length +
    blocks.sameCategoryTools.length +
    blocks.popularTools.length +
    blocks.recentlyUpdatedTools.length +
    blocks.peopleAlsoUse.length +
    blocks.continueExploring.length;

  totalLinksChecked += totalToolLinks;

  console.log(`Tool [${slug}]:`);
  console.log(`  - Block 1 (Related Tools): ${blocks.relatedTools.length} cards`);
  console.log(`  - Block 2 (Same Category): ${blocks.sameCategoryTools.length} cards`);
  console.log(`  - Block 3 (Parent Hub & Category): ${blocks.parentHub ? blocks.parentHub.categoryName : 'None'}`);
  console.log(`  - Block 4 (Popular Generators): ${blocks.popularTools.length} cards`);
  console.log(`  - Block 5 (Featured & Trending): ${blocks.recentlyUpdatedTools.length} cards`);
  console.log(`  - Block 6 (People Also Use): ${blocks.peopleAlsoUse.length} cards`);
  console.log(`  - Block 7 (Continue Exploring): ${blocks.continueExploring.length} cards`);
  console.log(`  - Block 8 (Top Collections): ${blocks.topCollections.length} collections`);
  console.log(`  -> TOTAL INTERNAL LINKS: ${totalToolLinks} contextual tool cards!\n`);

  if (totalToolLinks < 40) {
    throw new Error(`Insufficient internal links generated for ${slug}: expected >= 40, got ${totalToolLinks}`);
  }
}

console.log(`✅ VERIFICATION PASSED: Tested ${testSlugs.length} tools. Total internal links verified: ${totalLinksChecked}.`);
