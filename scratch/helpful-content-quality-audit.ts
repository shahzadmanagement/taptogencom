import fs from 'fs';
import { tools } from '../src/data/tools';
import { noindexToolSlugs, getEffectiveGuideCopy, pass20ControlMap } from '../src/data/tool-page-data';

async function runHelpfulContentAudit() {
  const sampledTools = tools.slice(0, 260); // Inspect 260 tools
  const issues: {
    category: string;
    severity: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';
    affectedTools: string[];
    evidence: string;
    whyGoogleDislikesIt: string;
    estimatedSeoImpact: string;
    exactPriority: string;
  }[] = [];

  // Track text repetitions across tools
  const introMap = new Map<string, string[]>();
  const faqQuestionMap = new Map<string, string[]>();
  const faqAnswerMap = new Map<string, string[]>();
  const guideHowToMap = new Map<string, string[]>();
  const guideTipMap = new Map<string, string[]>();
  const descMap = new Map<string, string[]>();

  for (const tool of sampledTools) {
    if (noindexToolSlugs.has(tool.slug)) continue;

    // 1. Thin Content & Short Description Check
    if (tool.description.length < 90) {
      issues.push({
        category: 'Thin Content',
        severity: 'HIGH',
        affectedTools: [tool.slug],
        evidence: `Tool description is under 90 characters (${tool.description.length} chars): "${tool.description}"`,
        whyGoogleDislikesIt: 'Google Helpful Content System flags pages with minimal explanatory text as thin transactional utility pages.',
        estimatedSeoImpact: 'Sub-optimal ranking in long-tail search queries.',
        exactPriority: 'P1'
      });
    }

    // 2. AI-written Patterns (Generic boilerplate phrases)
    const aiPhrases = [
      'whether you are a beginner or professional',
      'in today’s digital world',
      'seamlessly generate',
      'look no further',
      'revolutionize your workflow',
      'unlock the power of'
    ];
    for (const phrase of aiPhrases) {
      if (tool.description.toLowerCase().includes(phrase)) {
        issues.push({
          category: 'AI-Written Patterns',
          severity: 'HIGH',
          affectedTools: [tool.slug],
          evidence: `Contains AI boilerplate phrase: "${phrase}"`,
          whyGoogleDislikesIt: 'Google Quality Raters penalize generic LLM-generated marketing fluff that lacks original human insight.',
          estimatedSeoImpact: 'Helpful Content System algorithmic down-ranking.',
          exactPriority: 'P1'
        });
      }
    }

    // 3. Repetitive Introductions
    const firstSentence = tool.description.split('.')[0].trim();
    if (!introMap.has(firstSentence)) introMap.set(firstSentence, []);
    introMap.get(firstSentence)!.push(tool.slug);

    // 5. FAQ Repetition
    for (const faq of tool.faqItems) {
      if (!faqQuestionMap.has(faq.q)) faqQuestionMap.set(faq.q, []);
      faqQuestionMap.get(faq.q)!.push(tool.slug);

      if (!faqAnswerMap.has(faq.a)) faqAnswerMap.set(faq.a, []);
      faqAnswerMap.get(faq.a)!.push(tool.slug);
    }

    // 6. How-To & Tips Repetition
    const guide = getEffectiveGuideCopy(tool);
    if (guide) {
      const firstHowTo = guide.howTo[0];
      if (!guideHowToMap.has(firstHowTo)) guideHowToMap.set(firstHowTo, []);
      guideHowToMap.get(firstHowTo)!.push(tool.slug);
    }

    // 9. Missing Examples
    if (!tool.examples || tool.examples.length === 0) {
      issues.push({
        category: 'Missing Examples',
        severity: 'MEDIUM',
        affectedTools: [tool.slug],
        evidence: `Tool registry lacks explicit preset input/output example pairs in 'examples' array.`,
        whyGoogleDislikesIt: 'Utility tools without concrete input/output examples increase user friction and fail to satisfy transactional search intent.',
        estimatedSeoImpact: 'Lower user engagement signals and higher bounce rate.',
        exactPriority: 'P2'
      });
    }

    // 11. FAQ Size Constraints
    if (tool.faqItems.length < 3) {
      issues.push({
        category: 'Missing FAQs',
        severity: 'MEDIUM',
        affectedTools: [tool.slug],
        evidence: `Tool defines only ${tool.faqItems.length} custom FAQ items (fewer than 3).`,
        whyGoogleDislikesIt: 'Pages with sparse FAQ sections fail to capture long-tail question intent and voice search queries.',
        estimatedSeoImpact: 'Missed People Also Ask (PAA) rich snippet opportunities.',
        exactPriority: 'P2'
      });
    }
  }

  // Aggregate Repetitive Pattern Issues
  for (const [intro, slugs] of introMap.entries()) {
    if (slugs.length > 3) {
      issues.push({
        category: 'Repetitive Introductions',
        severity: 'HIGH',
        affectedTools: slugs,
        evidence: `Identical introductory sentence used across ${slugs.length} tools: "${intro}"`,
        whyGoogleDislikesIt: 'Scaled repetition of identical opening sentences across multiple tool pages triggers duplicate content algorithms.',
        estimatedSeoImpact: 'Potential sitewide Helpful Content classifier penalty.',
        exactPriority: 'P1'
      });
    }
  }

  for (const [q, slugs] of faqQuestionMap.entries()) {
    if (slugs.length > 5) {
      issues.push({
        category: 'Duplicate FAQs',
        severity: 'HIGH',
        affectedTools: slugs,
        evidence: `Identical FAQ question repeated across ${slugs.length} tools: "${q}"`,
        whyGoogleDislikesIt: 'Duplicated FAQ questions dilute page-level keyword intent and trigger template spam warnings.',
        estimatedSeoImpact: 'Suppression of FAQPage rich snippets in Search Console.',
        exactPriority: 'P1'
      });
    }
  }

  for (const [howTo, slugs] of guideHowToMap.entries()) {
    if (slugs.length > 5) {
      issues.push({
        category: 'Duplicate How-To Sections',
        severity: 'CRITICAL',
        affectedTools: slugs,
        evidence: `Identical How-To instruction step repeated across ${slugs.length} tools: "${howTo}"`,
        whyGoogleDislikesIt: 'Google March 2024 Spam Update explicitly targets websites with scaled content patterns that copy identical how-to instructions.',
        estimatedSeoImpact: 'High risk of algorithmic deindexing under Scaled Content Abuse policy.',
        exactPriority: 'P0'
      });
    }
  }

  fs.writeFileSync('scratch/helpful-content-audit-results.json', JSON.stringify({ sampledCount: sampledTools.length, issues }, null, 2));
  console.log(`AUDIT_COMPLETED: ${issues.length} Quality Issues Identified across ${sampledTools.length} tools.`);
}

runHelpfulContentAudit().catch(console.error);
