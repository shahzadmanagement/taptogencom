export interface LaunchAuditResult {
  goRecommendation: boolean;
  score: number;
  issues: string[];
}

export function runLaunchAudit(html: string): LaunchAuditResult {
  const issues: string[] = [];

  if (!html.includes('<title>') || !html.includes('</title>')) {
    issues.push('Missing page title tag');
  }

  const goRecommendation = issues.length === 0;
  const score = goRecommendation ? 100 : Math.max(0, 100 - issues.length * 50);

  return {
    goRecommendation,
    score,
    issues
  };
}
