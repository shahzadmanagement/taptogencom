import fs from 'fs';
import path from 'path';

interface Issue {
  severity: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW' | 'INFORMATIONAL';
  category: string;
  exactFile: string;
  exactLine?: number;
  affectedUrls: string[];
  whyGoogleDislikesIt: string;
  violatedGuideline: string;
  expectedSeoImpact: string;
  recommendedFix: string;
}

function runUltraForensicAudit() {
  const distDir = path.join(process.cwd(), 'dist');
  const issues: Issue[] = [];

  if (!fs.existsSync(distDir)) {
    console.error('dist/ directory does not exist! Run npm run build first.');
    process.exit(1);
  }

  const allFiles: string[] = [];

  function collectHtmlFiles(dir: string) {
    const list = fs.readdirSync(dir);
    for (const file of list) {
      const fullPath = path.join(dir, file);
      const stat = fs.statSync(fullPath);
      if (stat && stat.isDirectory()) {
        collectHtmlFiles(fullPath);
      } else if (file === 'index.html') {
        allFiles.push(fullPath);
      }
    }
  }

  collectHtmlFiles(distDir);
  console.log(`Starting Ultra Zero-Trust Forensic Audit across ${allFiles.length} pages in dist/...\n`);

  const titleMap = new Map<string, string[]>();
  const descMap = new Map<string, string[]>();
  const canonicalMap = new Map<string, string[]>();
  const slugLocaleMap = new Map<string, string[]>();

  let totalToolPages = 0;
  let totalHubPages = 0;

  for (const filePath of allFiles) {
    const relativePath = path.relative(distDir, filePath).replace(/\\/g, '/');
    const pageUrl = `https://taptogen.com/${relativePath.replace('/index.html', '').replace('index.html', '')}`;
    const html = fs.readFileSync(filePath, 'utf-8');
    const isToolPage = relativePath.includes('/tools/');

    if (isToolPage) totalToolPages++;
    else totalHubPages++;

    // 1. Meta Title Checks
    const titleMatch = html.match(/<title>([\s\S]*?)<\/title>/i);
    if (!titleMatch || !titleMatch[1].trim()) {
      issues.push({
        severity: 'CRITICAL',
        category: 'Titles',
        exactFile: relativePath,
        affectedUrls: [pageUrl],
        whyGoogleDislikesIt: 'Missing title tag prevents search engines from understanding page intent and rendering SERP snippets.',
        violatedGuideline: 'Google Search Essentials - Title Tag Best Practices',
        expectedSeoImpact: 'Severe ranking drop or total de-indexing of the affected page.',
        recommendedFix: 'Ensure every page generates a descriptive, unique title tag.'
      });
    } else {
      const rawTitle = titleMatch[1].trim();
      // Unescape entity expansion for width calculation
      const decodedTitle = rawTitle.replace(/&amp;/g, '&').replace(/&#39;/g, "'").replace(/&quot;/g, '"');
      
      if (!titleMap.has(decodedTitle)) titleMap.set(decodedTitle, []);
      titleMap.get(decodedTitle)!.push(relativePath);

      if (rawTitle.length > 70) {
        issues.push({
          severity: 'HIGH',
          category: 'Titles',
          exactFile: relativePath,
          affectedUrls: [pageUrl],
          whyGoogleDislikesIt: `Title tag is ${rawTitle.length} characters long and will be truncated with ellipsis in SERPs.`,
          violatedGuideline: 'Google Search Essentials - Title Length Guidelines (50-60 chars max)',
          expectedSeoImpact: 'Sub-optimal click-through rate (CTR) due to truncated SERP snippet titles.',
          recommendedFix: 'Shorten title tag to under 60-65 characters.'
        });
      }
    }

    // 2. Meta Description Checks
    const descMatch = html.match(/<meta\s+name=["']description["']\s+content=["']([\s\S]*?)["']/i);
    if (!descMatch || !descMatch[1].trim()) {
      issues.push({
        severity: 'HIGH',
        category: 'Descriptions',
        exactFile: relativePath,
        affectedUrls: [pageUrl],
        whyGoogleDislikesIt: 'Missing meta description forces Google to generate arbitrary text snippets from page content.',
        violatedGuideline: 'Google Search Essentials - Meta Description Control',
        expectedSeoImpact: 'Lower SERP CTR due to unoptimized snippet text.',
        recommendedFix: 'Provide a compelling, unique meta description for every page.'
      });
    } else {
      const desc = descMatch[1].trim();
      if (!descMap.has(desc)) descMap.set(desc, []);
      descMap.get(desc)!.push(relativePath);

      if (desc.length < 50 || desc.length > 175) {
        issues.push({
          severity: 'LOW',
          category: 'Descriptions',
          exactFile: relativePath,
          affectedUrls: [pageUrl],
          whyGoogleDislikesIt: `Meta description length (${desc.length} chars) is outside optimal SERP range (70-160 chars).`,
          violatedGuideline: 'Google SERP Snippet Optimization Rules',
          expectedSeoImpact: 'Possible truncation or snippet replacement by Google.',
          recommendedFix: 'Adjust description length to stay between 120 and 155 characters.'
        });
      }
    }

    // 3. Canonical Tag Checks
    const canonicalMatch = html.match(/<link\s+rel=["']canonical["']\s+href=["']([\s\S]*?)["']/i);
    if (!canonicalMatch || !canonicalMatch[1].trim()) {
      issues.push({
        severity: 'CRITICAL',
        category: 'Canonicals',
        exactFile: relativePath,
        affectedUrls: [pageUrl],
        whyGoogleDislikesIt: 'Missing canonical tag leaves the page vulnerable to duplicate content indexing.',
        violatedGuideline: 'Google Search Guidelines - Canonicalization',
        expectedSeoImpact: 'Duplicate URL indexing and diluted Link Equity.',
        recommendedFix: 'Add explicit self-referencing canonical URL tag.'
      });
    } else {
      const cUrl = canonicalMatch[1].trim();
      if (!canonicalMap.has(cUrl)) canonicalMap.set(cUrl, []);
      canonicalMap.get(cUrl)!.push(relativePath);
    }

    // 4. H1 Tag Checks
    const h1Matches = html.match(/<h1[\s>]/gi);
    const h1Count = h1Matches ? h1Matches.length : 0;
    if (h1Count !== 1) {
      issues.push({
        severity: h1Count === 0 ? 'HIGH' : 'MEDIUM',
        category: 'H1',
        exactFile: relativePath,
        affectedUrls: [pageUrl],
        whyGoogleDislikesIt: `Page contains ${h1Count} H1 tags. Google expects exactly one primary heading per document.`,
        violatedGuideline: 'W3C HTML5 Specification & Google Semantic Structure Guidance',
        expectedSeoImpact: 'Confused document topic hierarchy and degraded accessibility score.',
        recommendedFix: 'Ensure every page renders exactly one <h1> heading.'
      });
    }

    // 5. Hreflang Tag Checks (for tool pages)
    if (isToolPage) {
      const hreflangMatches = html.match(/<link\s+rel=["']alternate["']\s+hreflang=["']([\s\S]*?)["']/gi);
      const hreflangCount = hreflangMatches ? hreflangMatches.length : 0;
      if (hreflangCount < 18) {
        issues.push({
          severity: 'HIGH',
          category: 'hreflang',
          exactFile: relativePath,
          affectedUrls: [pageUrl],
          whyGoogleDislikesIt: `Tool page contains only ${hreflangCount} hreflang tags (expected 19 for 18 locales + x-default).`,
          violatedGuideline: 'Google Internationalization & Multi-regional SEO Guidelines',
          expectedSeoImpact: 'Incorrect regional SERP targeting and potential international duplicate content penalty.',
          recommendedFix: 'Render all 18 localized alternates plus x-default on every tool page.'
        });
      }
    }

    // 6. E-E-A-T & Author Schema / HTML Checks
    if (isToolPage) {
      if (!html.includes('"author"') || !html.includes('Shahzad Ali')) {
        issues.push({
          severity: 'HIGH',
          category: 'E-E-A-T',
          exactFile: relativePath,
          affectedUrls: [pageUrl],
          whyGoogleDislikesIt: 'Missing JSON-LD Author entity. Google E-E-A-T guidelines require explicit content authorship attribution.',
          violatedGuideline: 'Google Search Quality Rater Guidelines Section 2.6 (E-E-A-T & Author Identity)',
          expectedSeoImpact: 'Reduced E-E-A-T score under Helpful Content System evaluation.',
          recommendedFix: 'Inject Person author JSON-LD schema into structured metadata.'
        });
      }

      if (!html.includes('id="author-byline"') && !html.includes('AuthorByline')) {
        issues.push({
          severity: 'HIGH',
          category: 'E-E-A-T',
          exactFile: relativePath,
          affectedUrls: [pageUrl],
          whyGoogleDislikesIt: 'Missing visible Author Card HTML. Google Quality Raters must see visible author attribution.',
          violatedGuideline: 'Google Search Quality Rater Guidelines Section 4.3 (Who Created the Content)',
          expectedSeoImpact: 'Lower E-E-A-T transparency evaluation.',
          recommendedFix: 'Render visible AuthorByline component above or below the generator.'
        });
      }

      if (!html.includes('/about-us/')) {
        issues.push({
          severity: 'MEDIUM',
          category: 'Trust Signals',
          exactFile: relativePath,
          affectedUrls: [pageUrl],
          whyGoogleDislikesIt: 'Missing editorial/about link within content card. Google relies on internal links to author/about pages.',
          violatedGuideline: 'Google Search Quality Rater Guidelines (Website Reputation & Background)',
          expectedSeoImpact: 'Reduced trust pass-through from content pages to identity hubs.',
          recommendedFix: 'Include explicit link to /about-us/ in the E-E-A-T author metadata card.'
        });
      }
    }

    // 7. Helpful Content Systems (Engines)
    if (isToolPage) {
      if (!html.includes('engine-example') && !html.includes('Interactive Example Engine')) {
        issues.push({
          severity: 'HIGH',
          category: 'Google Helpful Content System',
          exactFile: relativePath,
          affectedUrls: [pageUrl],
          whyGoogleDislikesIt: 'Missing Interactive Example Engine. Pages without concrete demonstration examples provide low utility.',
          violatedGuideline: 'Google Helpful Content System - Practical Utility Requirement',
          expectedSeoImpact: 'Classification as thin or generic tool page.',
          recommendedFix: 'Ensure Example Engine renders unique interactive demonstration data.'
        });
      }

      if (!html.includes('engine-insight') && !html.includes('Expert Insight')) {
        issues.push({
          severity: 'HIGH',
          category: 'Information Gain',
          exactFile: relativePath,
          affectedUrls: [pageUrl],
          whyGoogleDislikesIt: 'Missing Expert Insight Engine. Pure boilerplate content without expert commentary fails Information Gain score.',
          violatedGuideline: 'Google Search Patent - Information Gain Score Calculation',
          expectedSeoImpact: 'Demotion in ranking compared to high-gain competitor content.',
          recommendedFix: 'Render Expert Insight Engine with technical commentary and advice.'
        });
      }

      if (!html.includes('engine-comparison') && !html.includes('Comparison Matrix')) {
        issues.push({
          severity: 'HIGH',
          category: 'Originality',
          exactFile: relativePath,
          affectedUrls: [pageUrl],
          whyGoogleDislikesIt: 'Missing Tool Comparison Engine. Lack of comparative context diminishes user decision support.',
          violatedGuideline: 'Google Core Update Quality Guidelines - Comprehensive Subject Coverage',
          expectedSeoImpact: 'Reduced topic authority score.',
          recommendedFix: 'Render Comparison Engine showing feature trade-offs and alternatives.'
        });
      }

      if (!html.includes('engine-faq') && !html.includes('Frequently Asked Questions')) {
        issues.push({
          severity: 'HIGH',
          category: 'Search Intent Satisfaction',
          exactFile: relativePath,
          affectedUrls: [pageUrl],
          whyGoogleDislikesIt: 'Missing Unique FAQ Engine. Tools without structured FAQs fail to answer secondary search intents.',
          violatedGuideline: 'Google Helpful Content Guidance - Direct Question Answering',
          expectedSeoImpact: 'Missed PAA (People Also Ask) SERP feature opportunities.',
          recommendedFix: 'Render FAQ Engine with schema-backed Q&A pairs.'
        });
      }
    }

    // 8. OpenGraph & Twitter Cards
    const ogTitle = html.match(/<meta\s+property=["']og:title["']\s+content=["']([\s\S]*?)["']/i);
    const ogDesc = html.match(/<meta\s+property=["']og:description["']\s+content=["']([\s\S]*?)["']/i);
    const ogImage = html.match(/<meta\s+property=["']og:image["']\s+content=["']([\s\S]*?)["']/i);

    if (!ogTitle || !ogDesc || !ogImage) {
      issues.push({
        severity: 'LOW',
        category: 'OpenGraph',
        exactFile: relativePath,
        affectedUrls: [pageUrl],
        whyGoogleDislikesIt: 'Missing complete OpenGraph social tags (og:title, og:description, og:image).',
        violatedGuideline: 'OpenGraph Protocol & Social Sharing SEO Standards',
        expectedSeoImpact: 'Poor rich media preview generation when shared on social media and messaging platforms.',
        recommendedFix: 'Ensure head tags inject complete OpenGraph meta attributes.'
      });
    }

    // 9. Image SEO (alt attributes)
    const imgMatches = html.match(/<img\s+[^>]*>/gi);
    if (imgMatches) {
      for (const imgTag of imgMatches) {
        if (!imgTag.includes('alt=') || imgTag.includes('alt=""') || imgTag.includes("alt=''")) {
          issues.push({
            severity: 'LOW',
            category: 'Image SEO',
            exactFile: relativePath,
            affectedUrls: [pageUrl],
            whyGoogleDislikesIt: `Image element missing descriptive alt text attribute: ${imgTag.slice(0, 80)}`,
            violatedGuideline: 'Google Image SEO Best Practices & WCAG 2.2 Accessibility Guideline 1.1.1',
            expectedSeoImpact: 'Lost Image Search traffic opportunities and accessibility score reduction.',
            recommendedFix: 'Add descriptive, non-empty alt text to all informative images.'
          });
        }
      }
    }
  }

  // Check global duplicate maps
  for (const [title, files] of titleMap.entries()) {
    if (files.length > 1) {
      issues.push({
        severity: 'CRITICAL',
        category: 'Titles',
        exactFile: files[0],
        affectedUrls: files.map(f => `https://taptogen.com/${f.replace('/index.html', '')}`),
        whyGoogleDislikesIt: `Duplicate title tag "${title}" shared across ${files.length} distinct URLs.`,
        violatedGuideline: 'Google Search Essentials - Unique Title Rule',
        expectedSeoImpact: 'Keyword cannibalization and canonical ambiguity penalties.',
        recommendedFix: 'Ensure every page title is uniquely parameterized based on tool category and locale.'
      });
    }
  }

  for (const [desc, files] of descMap.entries()) {
    if (files.length > 1) {
      issues.push({
        severity: 'HIGH',
        category: 'Descriptions',
        exactFile: files[0],
        affectedUrls: files.map(f => `https://taptogen.com/${f.replace('/index.html', '')}`),
        whyGoogleDislikesIt: `Duplicate meta description shared across ${files.length} URLs.`,
        violatedGuideline: 'Google Search Essentials - Unique Meta Description Guidelines',
        expectedSeoImpact: 'Reduced snippet uniqueness and lower CTR.',
        recommendedFix: 'Differentiate meta descriptions per tool intent.'
      });
    }
  }

  for (const [canonical, files] of canonicalMap.entries()) {
    if (files.length > 1) {
      issues.push({
        severity: 'CRITICAL',
        category: 'Canonicals',
        exactFile: files[0],
        affectedUrls: files.map(f => `https://taptogen.com/${f.replace('/index.html', '')}`),
        whyGoogleDislikesIt: `Multiple distinct pages set their canonical tag to the exact same URL "${canonical}".`,
        violatedGuideline: 'Google Search Guidelines - Correct Canonical Usage',
        expectedSeoImpact: 'Forced indexing deduplication where Google ignores secondary pages entirely.',
        recommendedFix: 'Ensure canonical tags point self-referentially to each page\'s canonical URL.'
      });
    }
  }

  // Output Full Forensic Summary
  console.log('==================================================');
  console.log('ULTRA ZERO-TRUST FORENSIC AUDIT SUMMARY');
  console.log(`- Total Pages Inspected: ${allFiles.length} (${totalToolPages} tool endpoints, ${totalHubPages} hub/static pages)`);
  
  const critical = issues.filter(i => i.severity === 'CRITICAL');
  const high = issues.filter(i => i.severity === 'HIGH');
  const medium = issues.filter(i => i.severity === 'MEDIUM');
  const low = issues.filter(i => i.severity === 'LOW');

  console.log(`- Critical Issues: ${critical.length}`);
  console.log(`- High Issues: ${high.length}`);
  console.log(`- Medium Issues: ${medium.length}`);
  console.log(`- Low Issues: ${low.length}`);
  console.log('==================================================\n');

  if (issues.length > 0) {
    console.log('Top Reported Issues:');
    issues.slice(0, 10).forEach((issue, idx) => {
      console.log(`\n[#${idx + 1}] Severity: ${issue.severity} | Category: ${issue.category}`);
      console.log(`File: ${issue.exactFile}`);
      console.log(`Why Google Dislikes It: ${issue.whyGoogleDislikesIt}`);
      console.log(`Guideline Violated: ${issue.violatedGuideline}`);
    });
  }
}

runUltraForensicAudit();
