const { runGenerator } = require('../helpers/ts-loader.cjs');
const assert = require('../helpers/assert.cjs');
const { describe, it } = require('../helpers/runner.cjs');

describe('Representative Integration Testing', () => {
  const cases = [
    { slug: 'fancy-text-generator', input: 'Hello World', expectHtml: 'intent-style-card' },
    { slug: 'baby-name-generator-with-last-name', input: 'Smith', expectHtml: 'intent-idea-card' },
    { slug: 'facebook-post-generator', input: 'New Launch', expectHtml: 'intent-section-card' },
    { slug: 'slug-generator', input: 'My Blog Post Title', expectHtml: 'intent-section-card' },
    { slug: 'token-generator', input: '', expectHtml: 'intent-grouped-output' },
    { slug: 'receipt-generator', input: 'Coffee Shop', expectHtml: 'intent-section-card' },
    { slug: 'villain-name-generator', input: 'Shadow', expectHtml: 'intent-idea-card' },
    { slug: 'chatgpt-prompt-generator', input: 'How to code', expectHtml: 'intent-section-card' }
  ];

  for (const c of cases) {
    it(`Integration run for category representative: "${c.slug}"`, async () => {
      const res = await runGenerator(c.slug, c.input, {});
      assert.ok(res.htmlOutput, `Integration run for ${c.slug} returned empty HTML`);
      assert.ok(res.htmlOutput.includes(c.expectHtml) || res.htmlOutput.includes('intent-'), `Expected HTML structure "${c.expectHtml}" not found in output`);
    });
  }
});
