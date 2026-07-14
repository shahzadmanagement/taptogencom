export interface LaunchAuditResult {
  score: number; // 0 to 100
  passedChecksCount: number;
  failedChecksCount: number;
  warningsCount: number;
  securityIssuesCount: number;
  seoIssuesCount: number;
  performanceIssuesCount: number;
  accessibilityIssuesCount: number;
  goRecommendation: boolean;
  issues: string[];
}

export function runLaunchAudit(html: string): LaunchAuditResult {
  const issues: string[] = [];
  let passedChecksCount = 0;
  let failedChecksCount = 0;
  let warningsCount = 0;
  let securityIssuesCount = 0;
  let seoIssuesCount = 0;
  let performanceIssuesCount = 0;
  let accessibilityIssuesCount = 0;

  // 1. Check SEO Metadata
  if (html.includes('<title>')) {
    passedChecksCount++;
  } else {
    failedChecksCount++;
    seoIssuesCount++;
    issues.push('SEO: Missing page title element');
  }

  if (html.includes('name="description"')) {
    passedChecksCount++;
  } else {
    failedChecksCount++;
    seoIssuesCount++;
    issues.push('SEO: Missing meta description element');
  }

  if (html.includes('rel="canonical"')) {
    passedChecksCount++;
  } else {
    failedChecksCount++;
    seoIssuesCount++;
    issues.push('SEO: Missing canonical URL definition');
  }

  if (html.includes('hreflang="')) {
    passedChecksCount++;
  } else {
    warningsCount++;
    issues.push('SEO warning: No regional hreflang attributes mapped');
  }

  // 2. Check Security Header Metas
  if (html.includes('http-equiv="Content-Security-Policy"')) {
    passedChecksCount++;
  } else {
    warningsCount++;
    securityIssuesCount++;
    issues.push('Security warning: Inline Content-Security-Policy http-equiv meta tag is absent (Recommend CDN layer injection)');
  }

  if (html.includes('X-Frame-Options') || html.includes('x-frame-options')) {
    passedChecksCount++;
  } else {
    warningsCount++;
    securityIssuesCount++;
    issues.push('Security warning: Frame options elements missing (Confirm CDN header configurations)');
  }

  // Calculate score
  const totalWeight = passedChecksCount + failedChecksCount + warningsCount;
  const score = totalWeight > 0 ? Math.round((passedChecksCount / (passedChecksCount + failedChecksCount)) * 100) : 100;
  
  // Go / No-Go logic: failed checks count determines blocking gates
  const goRecommendation = failedChecksCount === 0;

  return {
    score,
    passedChecksCount,
    failedChecksCount,
    warningsCount,
    securityIssuesCount,
    seoIssuesCount,
    performanceIssuesCount,
    accessibilityIssuesCount,
    goRecommendation,
    issues
  };
}
