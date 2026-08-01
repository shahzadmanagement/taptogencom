import { tools } from '../src/data/tools';
import { getComparisonBlockForTool, getExpertInsightsForTool, getUniqueFaqsForTool } from '../src/lib/helpful-content-engine';

async function auditAllTextFontTools() {
  console.log('=== MASTER FORENSIC AUDIT: ALL 37 TEXT & FONT GENERATORS ===\n');

  const textFontTools = tools.filter(t => t.categorySlug === 'text-font-generators');
  console.log(`Auditing ${textFontTools.length} tools...\n`);

  let passedCount = 0;
  for (const tool of textFontTools) {
    const faqs = getUniqueFaqsForTool(tool, 'en');
    const insights = getExpertInsightsForTool(tool);
    const comparison = getComparisonBlockForTool(tool);

    const hasFaqs = faqs.length >= 6;
    const hasInsights = insights.professionalTips.length >= 2 && !!insights.privacyNotes;
    const hasComparison = comparison.title.includes(' vs ') && comparison.comparisonRows.length >= 4;

    if (hasFaqs && hasInsights && hasComparison) {
      passedCount++;
      console.log(`✓ PASSED [${tool.slug}]: ${tool.name} (${faqs.length} FAQs, Matrix: "${comparison.title.slice(0, 50)}...")`);
    } else {
      console.error(`❌ FAILED [${tool.slug}]: FAQs=${faqs.length}, Insights=${hasInsights}, Matrix=${hasComparison}`);
    }
  }

  console.log(`\n=== RESULT: ${passedCount} / ${textFontTools.length} Text & Font Generators Fully Verified ===`);
  if (passedCount !== textFontTools.length) {
    throw new Error('Some text-font-generators tools failed the master audit');
  }
}

auditAllTextFontTools();
