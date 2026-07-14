export interface AccessibilityAuditOptions {
  html: string;
}

export interface AccessibilityAuditResult {
  passed: boolean;
  score: number; // 0 to 100
  violations: string[];
}

export function auditHtmlAccessibility(html: string): AccessibilityAuditResult {
  const violations: string[] = [];
  
  // 1. Check landmarks
  const landmarks = ['<header', '<nav', '<main', '<footer'];
  landmarks.forEach(l => {
    if (!html.toLowerCase().includes(l)) {
      violations.push(`Missing landmark region: ${l.replace('<', '')}`);
    }
  });

  // 2. Check skip links
  if (!html.includes('href="#main"') && !html.includes('href="#main-content"') && !html.includes('id="main"') && !html.includes('id="main-content"')) {
    violations.push('Missing skip-to-content link or main content container anchor target');
  }

  // 3. Check image alt tags
  const imgMatches = html.match(/<img[^>]*>/gi) || [];
  imgMatches.forEach(img => {
    if (!img.toLowerCase().includes('alt=')) {
      violations.push(`Image tag missing alt attribute: ${img}`);
    }
  });

  // 4. Check form elements labels
  const inputMatches = html.match(/<input[^>]*>/gi) || [];
  inputMatches.forEach(input => {
    // Exclude button inputs or hidden fields
    const isHidden = input.includes('type="hidden"');
    const isSubmit = input.includes('type="submit"');
    const isButton = input.includes('type="button"');
    if (!isHidden && !isSubmit && !isButton) {
      const hasId = input.match(/id="([^"]+)"/i);
      const hasLabel = input.includes('aria-label=') || input.includes('aria-labelledby=');
      if (!hasLabel && (!hasId || !html.includes(`for="${hasId[1]}"`))) {
        violations.push(`Input element missing label association or aria-label: ${input}`);
      }
    }
  });

  // 5. Check SVG accessibility
  const svgMatches = html.match(/<svg[^>]*>/gi) || [];
  svgMatches.forEach(svg => {
    const hasRole = svg.toLowerCase().includes('role=');
    const hasAria = svg.toLowerCase().includes('aria-label=') || svg.toLowerCase().includes('aria-hidden=');
    if (!hasRole && !hasAria) {
      violations.push(`SVG element missing role or aria-hidden attributes: ${svg}`);
    }
  });

  // Calculate score
  const totalChecks = 10;
  const deduc = violations.length * 10;
  const score = Math.max(0, 100 - deduc);

  return {
    passed: violations.length === 0,
    score,
    violations
  };
}
