import { tools } from '../src/data/tools';
import { getComparisonBlockForTool, getExpertInsightsForTool, getUniqueFaqsForTool } from '../src/lib/helpful-content-engine';

async function auditAll430Tools() {
  console.log(`=== MASTER FORENSIC AUDIT: ALL ${tools.length} TOOLS IN TAPTOGEN ===\n`);

  let passed = 0;
  let failed = 0;

  for (const tool of tools) {
    const faqs = getUniqueFaqsForTool(tool, 'en');
    const insights = getExpertInsightsForTool(tool);
    const comp = getComparisonBlockForTool(tool);

    const hasFaqs = faqs.length >= 4;
    const hasInsights = insights.professionalTips.length >= 1 && !!insights.privacyNotes;
    const hasComparison = comp.title.length > 10;

    if (hasFaqs && hasInsights && hasComparison) {
      passed++;
    } else {
      failed++;
      console.error(`❌ Defect in [${tool.slug}]: FAQs=${faqs.length}, Insights=${hasInsights}, Matrix=${hasComparison}`);
    }
  }

  console.log(`\nAudit Results: ${passed} Passed, ${failed} Failed out of ${tools.length} total tools.`);
  if (failed > 0) {
    throw new Error(`${failed} tools failed the master forensic audit!`);
  } else {
    console.log('=== ALL TOOLS SATISFY ENTERPRISE TOOL DOMINATION v4.0 STANDARDS ===');
  }
}

auditAll430Tools();
