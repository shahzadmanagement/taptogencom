const path = require('path');
const assert = require('../helpers/assert.cjs');
const { describe, it } = require('../helpers/runner.cjs');
const { loadTS } = require('../helpers/ts-loader.cjs');

const auditPath = path.resolve(__dirname, '../../src/lib/accessibility-audit.ts');

describe('Enterprise Accessibility & WCAG 2.2 AA Platform Verification', () => {
  it('Verify accessibility audit flags missing landmark regions', () => {
    const engine = loadTS(auditPath);
    const htmlSample = '<html><body><div>No landmarks</div></body></html>';
    const result = engine.auditHtmlAccessibility(htmlSample);

    assert.equal(result.passed, false);
    assert.ok(result.violations.some(v => v.includes('Missing landmark')));
  });

  it('Verify accessibility audit passes compliant HTML', () => {
    const engine = loadTS(auditPath);
    const htmlSample = `
      <header></header>
      <nav></nav>
      <main id="main-content">
        <label for="username">Username</label>
        <input id="username" type="text" />
        <img src="avatar.png" alt="User avatar" />
        <svg role="img" aria-label="Brand logo"></svg>
      </main>
      <footer></footer>
    `;
    const result = engine.auditHtmlAccessibility(htmlSample);

    assert.equal(result.passed, true);
    assert.equal(result.score, 100);
  });

  it('Verify safety filter checks for image alt attributes', () => {
    const engine = loadTS(auditPath);
    const htmlSample = '<header></header><nav></nav><main id="main"><img src="missing.png" /></main><footer></footer>';
    const result = engine.auditHtmlAccessibility(htmlSample);

    assert.equal(result.passed, false);
    assert.ok(result.violations.some(v => v.includes('missing alt')));
  });
});
