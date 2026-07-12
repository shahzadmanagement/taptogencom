const path = require('path');
const assert = require('../helpers/assert.cjs');
const { describe, it } = require('../helpers/runner.cjs');
const { loadTS } = require('../helpers/ts-loader.cjs');

const aiPath = path.resolve(__dirname, '../../src/lib/ai-search-assistant.ts');

describe('AI Search Assistant & Intent Verification', () => {
  it('Verify natural language parsing and intent matching', () => {
    const ai = loadTS(aiPath);

    // Test case 1: Natural language query parsing
    const res1 = ai.parseNaturalLanguage('I want stylish Instagram fonts');
    assert.equal(res1.intent, 'Fancy Text');
    assert.ok(res1.confidence >= 50);

    // Test case 2: Ignored filler words
    assert.equal(res1.normalized, 'stylish instagram fonts');

    // Test case 3: Low confidence query fallback
    const res2 = ai.parseNaturalLanguage('something completely unrelated');
    assert.equal(res2.intent, 'General Search');
    assert.ok(res2.confidence <= 30);
  });
});
