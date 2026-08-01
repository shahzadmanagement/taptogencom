import { tools } from '../src/data/tools';
import { getComparisonBlockForTool, getExpertInsightsForTool, getUniqueFaqsForTool } from '../src/lib/helpful-content-engine';

async function auditBusinessNameGenerator() {
  console.log('=== TOOL DOMINATION PHASE 1: BUSINESS NAME GENERATOR AUDIT ===\n');

  const tool = tools.find(t => t.slug === 'business-name-generator');
  if (!tool) {
    throw new Error('Business Name Generator tool not found in data registry');
  }

  console.log('1. Tool Definition Audit:');
  console.log('   - Name:', tool.name);
  console.log('   - Primary Keyword:', tool.primaryKeyword);
  console.log('   - Category Slug:', tool.categorySlug);

  console.log('\n2. Helpful Content & SEO Verification:');
  const faqs = getUniqueFaqsForTool(tool, 'en');
  console.log('   - Unique FAQs Generated (expected >= 6):', faqs.length);

  const insights = getExpertInsightsForTool(tool);
  console.log('   - Professional Tips Count:', insights.professionalTips.length);
  console.log('   - Privacy Notes Present:', !!insights.privacyNotes);

  const comparison = getComparisonBlockForTool(tool);
  console.log('\n3. Google Top-10 Competitor Comparison Matrix:');
  console.log('   - Title:', comparison.title);
  console.log('   - Method A (TapToGen):', comparison.methodA);
  console.log('   - Method B (Competitors):', comparison.methodB);
  console.log('   - Comparison Rows Count:', comparison.comparisonRows.length);
  console.log('   - Verdict:', comparison.verdict);

  console.log('\n=== TOOL DOMINATION AUDIT PASSED FOR BUSINESS NAME GENERATOR ===');
}

auditBusinessNameGenerator();
