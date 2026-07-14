const path = require('path');
const assert = require('../helpers/assert.cjs');
const { describe, it } = require('../helpers/runner.cjs');
const { loadTS } = require('../helpers/ts-loader.cjs');

const auditPath = path.resolve(__dirname, '../../src/lib/production-audit.ts');

describe('Enterprise Production Launch Audit & Go-Live Verification', () => {
  it('Verify dynamic audits flags missing page title tags', () => {
    const engine = loadTS(auditPath);
    const htmlSample = '<html><body>Missing title and details</body></html>';
    const result = engine.runLaunchAudit(htmlSample);

    assert.equal(result.goRecommendation, false);
    assert.ok(result.score < 100);
    assert.ok(result.issues.some(i => i.includes('Missing page title')));
  });

  it('Verify compliant HTML passes launch audit checks', () => {
    const engine = loadTS(auditPath);
    const htmlSample = `
      <html>
        <head>
          <title>Compliant title</title>
          <meta name="description" content="Compliant description text" />
          <link rel="canonical" href="https://taptogen.com/" />
        </head>
        <body>
          Content body
        </body>
      </html>
    `;
    const result = engine.runLaunchAudit(htmlSample);

    assert.equal(result.goRecommendation, true);
    assert.equal(result.score, 100);
  });
});
