const path = require('path');
const assert = require('../helpers/assert.cjs');
const { describe, it } = require('../helpers/runner.cjs');
const { loadTS } = require('../helpers/ts-loader.cjs');

const aiEnginePath = path.resolve(__dirname, '../../src/lib/ai-engine.ts');
const promptEnginePath = path.resolve(__dirname, '../../src/lib/prompt-engine.ts');
const cachePath = path.resolve(__dirname, '../../src/lib/ai-cache.ts');

describe('Enterprise AI Engine & Real Intelligence Platform Verification', () => {
  it('Verify prompt generation compiles variables', () => {
    const promptEngine = loadTS(promptEnginePath);
    const compiled = promptEngine.compilePrompt('Name Generator', 'names', { theme: 'cyberpunk' });

    assert.ok(compiled.includes('Name Generator'));
    assert.ok(compiled.includes('cyberpunk'));
  });

  it('Verify cache storage set and get checks', () => {
    const cacheEngine = loadTS(cachePath);
    const cache = new cacheEngine.AiCache(10, 1000);

    cache.set('test-key', 'cached-value');
    assert.equal(cache.get('test-key'), 'cached-value');

    // Test LRU clear behavior
    cache.clear();
    assert.equal(cache.get('test-key'), null);
  });

  it('Verify provider switching configuration execution', async () => {
    const aiEngine = loadTS(aiEnginePath);
    const engine = new aiEngine.AiEngine('gemini');

    const geminiRes = await engine.generate({
      toolName: 'Tag Generator',
      category: 'general',
      variables: {},
      provider: 'gemini'
    });
    assert.ok(geminiRes.includes('[Gemini]'));

    const openaiRes = await engine.generate({
      toolName: 'Tag Generator',
      category: 'general',
      variables: {},
      provider: 'openai'
    });
    assert.ok(openaiRes.includes('[OpenAI]'));
  });

  it('Verify streaming chunks async resolution', async () => {
    const aiEngine = loadTS(aiEnginePath);
    const engine = new aiEngine.AiEngine('gemini');

    const stream = engine.generateStream({
      toolName: 'Tag Generator',
      category: 'general',
      variables: {}
    });

    const chunks = [];
    for await (const chunk of stream) {
      chunks.push(chunk);
    }

    assert.ok(chunks.length > 0);
    assert.ok(chunks.join('').includes('[Gemini]'));
  });
});
