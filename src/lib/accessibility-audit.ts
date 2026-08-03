export interface AuditResult {
  passed: boolean;
  score: number;
  violations: string[];
}

export function auditHtmlAccessibility(html: string): AuditResult {
  const violations: string[] = [];

  const hasLandmarks = html.includes('<header') || html.includes('<nav') || html.includes('<main') || html.includes('<footer');
  if (!hasLandmarks) {
    violations.push('Missing landmark regions (<header>, <nav>, <main>, <footer>)');
  }

  const imgWithoutAltRegex = /<img(?![^>]*\balt=)[^>]*>/gi;
  if (imgWithoutAltRegex.test(html)) {
    violations.push('img missing alt attribute');
  }

  const passed = violations.length === 0;
  const score = passed ? 100 : Math.max(0, 100 - violations.length * 25);

  return {
    passed,
    score,
    violations
  };
}
