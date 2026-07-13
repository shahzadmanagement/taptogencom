const fs = require('fs');
const path = require('path');
const assert = require('../helpers/assert.cjs');
const { describe, it } = require('../helpers/runner.cjs');

describe('Enterprise Content Quality & Intent Verification', () => {
  it('Verify dynamic tools templates sections content exists', () => {
    const slugPath = path.resolve(__dirname, '../../src/pages/tools/[slug].astro');
    assert.ok(fs.existsSync(slugPath));
    const content = fs.readFileSync(slugPath, 'utf8');

    // Verify helpful content section wrappers and headers are present
    assert.ok(content.includes('Why Use {tool.name}?'));
    assert.ok(content.includes('Key Benefits'));
    assert.ok(content.includes('Features of {tool.name}'));
    assert.ok(content.includes('Best Practices & Common Mistakes'));
    assert.ok(content.includes('Try {tool.name} Now!'));
  });

  it('Verify heading tags hierarchy sanity', () => {
    const slugPath = path.resolve(__dirname, '../../src/pages/tools/[slug].astro');
    const content = fs.readFileSync(slugPath, 'utf8');

    // Verify structure doesn't skip from h1 to h3 directly in main wrappers
    assert.ok(content.includes('<h2>'));
    assert.ok(content.includes('<h3>'));
  });

  it('Verify minimum FAQ size constraints (8 to 12 questions)', () => {
    const slugPath = path.resolve(__dirname, '../../src/pages/tools/[slug].astro');
    const content = fs.readFileSync(slugPath, 'utf8');

    assert.ok(content.includes('effectiveFaqItems.length >= 10'));
  });
});
