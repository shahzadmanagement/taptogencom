import fs from 'fs';
import path from 'path';
import esbuild from 'esbuild';
import { fileURLToPath } from 'url';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.resolve(__dirname, '..');

// Helper to compile TypeScript files dynamically
function loadTS(filePath) {
  const code = fs.readFileSync(filePath, 'utf8');
  const result = esbuild.transformSync(code, {
    loader: 'ts',
    format: 'cjs'
  });
  const m = { exports: {} };
  const fn = new Function('module', 'exports', 'require', '__dirname', '__filename', result.code);
  fn(m, m.exports, (id) => {
    if (id.startsWith('.')) return loadTS(path.resolve(path.dirname(filePath), id));
    return require(id);
  }, path.dirname(filePath), filePath);
  return m.exports;
}

// Setup paths
const toolsPath = path.join(repoRoot, 'src/data/tools.ts');
const dsPath = path.join(repoRoot, 'src/scripts/data/generator-datasets.ts');
const wsPath = path.join(repoRoot, 'src/scripts/tool-workspace.ts');
const tempCombinedPath = path.join(repoRoot, 'src/scripts/temp-workspace-combined.ts');

console.log('Compiling workspace script bundle for regression tests...');
const dsCode = fs.readFileSync(dsPath, 'utf8');
let wsCode = fs.readFileSync(wsPath, 'utf8');

// Expose helpers globally within the entry scope
const exposeBlock = `
  globalThis.capturedGenerate = generate;
  globalThis.toUnicode = toUnicode;
  globalThis.escapeHtml = escapeHtml;
  globalThis.renderSections = renderSections;
  globalThis.renderGroupedTags = renderGroupedTags;
  globalThis.renderList = renderList;
  globalThis.renderCards = renderCards;
  globalThis.renderBusinessCards = renderBusinessCards;
  globalThis.renderRaw = renderRaw;
  globalThis.slugWords = slugWords;
  globalThis.titleCase = titleCase;
  globalThis.compactSeed = compactSeed;
  globalThis.toSafeHandle = toSafeHandle;
  globalThis.unicodeMap = unicodeMap;
  globalThis.transformSquared = transformSquared;
  globalThis.transformFullwidth = transformFullwidth;
  globalThis.renderSectionSuite = renderSectionSuite;
`;
wsCode += '\n' + exposeBlock;

const combined = dsCode + '\n\n' + wsCode;
fs.writeFileSync(tempCombinedPath, combined, 'utf8');

let compiledCode = '';
try {
  const buildResult = esbuild.buildSync({
    entryPoints: [tempCombinedPath],
    bundle: true,
    write: false,
    format: 'cjs',
    platform: 'node',
    external: ['astro']
  });
  compiledCode = buildResult.outputFiles[0].text;
} finally {
  if (fs.existsSync(tempCombinedPath)) {
    fs.unlinkSync(tempCombinedPath);
  }
}

// Load tools list from tools.ts
const { tools } = loadTS(toolsPath);

// Setup Mock DOM Element Class
class MockHtmlElement {
  constructor() {
    this.classList = {
      add: () => {},
      remove: () => {},
      contains: () => false
    };
    this.style = {};
    this.innerHTML = '';
    this.dataset = {};
  }
  addEventListener() {}
  cloneNode() {
    return new MockHtmlElement();
  }
}

// Global Mocks
globalThis.HTMLElement = MockHtmlElement;
globalThis.HTMLInputElement = MockHtmlElement;
globalThis.HTMLTextAreaElement = MockHtmlElement;
globalThis.MutationObserver = class {
  observe() {}
  disconnect() {}
};

globalThis.window = {
  location: { href: 'https://example.com/tools/' },
  addEventListener: () => {}
};

Object.defineProperty(globalThis, 'navigator', {
  value: {
    clipboard: {
      writeText: async () => {}
    }
  },
  configurable: true,
  writable: true
});

const results = [];
const startOverall = Date.now();

console.log(`Running regression tests on all ${tools.length} generators...`);

for (const tool of tools) {
  const slug = tool.slug;
  const start = performance.now();
  let status = 'PASSED';
  let executionTime = 0;
  const errors = [];
  const warnings = [];
  const missingSections = [];
  let rawOutput = '';
  let htmlOutput = '';

  try {
    // Setup mock input and output elements
    const mockInput = {
      value: slug.includes('generator') && (slug.includes('url') || slug.includes('canonical') || slug.includes('hreflang')) 
        ? 'https://example.com' 
        : 'Regression Test Seed',
      addEventListener: () => {}
    };
    const mockOutput = new MockHtmlElement();

    // Setup document mock
    globalThis.document = {
      querySelectorAll: () => [],
      querySelector: () => null,
      addEventListener: () => {},
      removeEventListener: () => {},
      getElementById: (id) => {
        if (id === 'tool-workspace') {
          return {
            dataset: { tool: slug, type: 'utility', format: 'text' },
            addEventListener: () => {}
          };
        }
        if (id === 'tool-input') return mockInput;
        if (id === 'tool-output') return mockOutput;
        
        // Handle options
        const opt = tool.toolOptions?.find(o => o.id === id);
        const val = opt?.default !== undefined ? opt.default : '';
        const el = new MockHtmlElement();
        el.value = String(val);
        el.checked = val === 'true' || val === true;
        return el;
      }
    };

    globalThis.window.location.href = `https://example.com/tools/${slug}/`;

    // Evaluate workspace logic in CommonJS module scope
    const m = { exports: {} };
    const fn = new Function('module', 'exports', 'require', '__dirname', '__filename', compiledCode);
    fn(m, m.exports, require, repoRoot, wsPath);

    // Call generator runtime
    await globalThis.capturedGenerate();

    rawOutput = mockOutput.dataset.copyText || '';
    htmlOutput = mockOutput.innerHTML || '';
    executionTime = performance.now() - start;

    // Quality Gates & Validation

    // 1. empty output
    if (!rawOutput && !htmlOutput) {
      status = 'FAILED';
      errors.push('Generator produced empty output');
    }

    // 2. placeholder text
    const phCheck = (ph) => {
      const isStrict = ph === 'coming soon' || ph === 'todo';
      const hasMatch = isStrict 
        ? rawOutput.toLowerCase().includes(ph) 
        : rawOutput.toLowerCase().match(new RegExp(`\\b${ph}\\b`));
      
      if (hasMatch) {
        if (ph === 'lorem ipsum' || ph === 'lorem') {
          const allowedLorem = [
            'lorem-ipsum-generator', 'fake-text-generator', 'random-text-generator', 
            'uwu-text-generator', 'big-text-generator', 'bubble-text-generator',
            'creepy-text-generator', 'brat-text-generator', 'typewriter-text-generator'
          ];
          if (allowedLorem.includes(slug)) return;
        }
        if (ph === 'placeholder') {
          const allowedPlaceholder = [
            'lorem-ipsum-generator', 'fake-text-generator', 'random-text-generator', 
            'testimonial-generator', 'api-key-generator', 'license-key-generator', 
            'recovery-code-generator', 'jwt-generator', 'token-generator', 
            'name-tag-generator', 'breadcrumb-generator', 'purchase-order-generator', 
            'quotation-generator', 'schema-tag-generator', 'ai-prompt-generator',
            'essay-title-generator', 'press-release-generator', 'x-post-generator',
            'sales-email-generator', 'productivity-prompt-generator', 'assignment-generator',
            'typewriter-text-generator', 'worldbuilding-generator', 'random-address-generator',
            'landing-page-copy-generator', 'tattoo-name-generator', 'character-prompt-generator'
          ];
          if (allowedPlaceholder.includes(slug)) return;
        }

        status = 'FAILED';
        errors.push(`Generator output contains placeholder text: "${ph}"`);
      }
    };

    phCheck('coming soon');
    phCheck('todo');
    phCheck('placeholder');
    phCheck('lorem ipsum');
    phCheck('lorem');

    // 3. undefined / null leakage
    if (htmlOutput.includes('undefined') || rawOutput.includes('undefined')) {
      if (htmlOutput.match(/\bundefined\b/) || rawOutput.match(/\bundefined\b/)) {
        status = 'FAILED';
        errors.push('Generator output contains leaky "undefined" string literal');
      }
    }
    if (htmlOutput.includes('null') || rawOutput.includes('null')) {
      if (htmlOutput.match(/\bnull\b/) || rawOutput.match(/\bnull\b/)) {
        status = 'FAILED';
        errors.push('Generator output contains leaky "null" string literal');
      }
    }

    // 4. HTML structure & tag balance checks
    const tagsToCheck = ['div', 'article', 'section', 'span', 'p'];
    tagsToCheck.forEach(tag => {
      const openCount = (htmlOutput.match(new RegExp(`<${tag}\\b`, 'g')) || []).length;
      const closeCount = (htmlOutput.match(new RegExp(`</${tag}>`, 'g')) || []).length;
      if (openCount !== closeCount) {
        status = 'FAILED';
        errors.push(`Malformed HTML: Unbalanced tag <${tag}> (open: ${openCount}, close: ${closeCount})`);
      }
    });

    // 5. copy controls check
    const hasCopy = htmlOutput.includes('copy-btn') || htmlOutput.includes('copy-layout') || htmlOutput.includes('result-card-tools');
    if (!hasCopy) {
      warnings.push('No copy buttons or copy controls found in generated output');
    }

    // 6. download controls check (optional verification)
    const hasDownload = htmlOutput.includes('download-btn') || htmlOutput.includes('download-layout') || htmlOutput.includes('action-btn');
    if (!hasDownload && (slug.includes('policy') || slug.includes('agreement') || slug.includes('receipt') || slug.includes('invoice') || slug.includes('contract'))) {
      warnings.push('No download controls found for document template style generator');
    }

    // 7. expected output layout sections
    if (tool.generatorType === 'intent-based' || htmlOutput.includes('intent-')) {
      const hasCards = htmlOutput.includes('intent-style-card') || htmlOutput.includes('intent-idea-card') || htmlOutput.includes('intent-section-card') || htmlOutput.includes('intent-grouped-output');
      if (!hasCards) {
        missingSections.push('Expected structured layout sections (intent-style-card, intent-idea-card, intent-section-card, etc.)');
      }
    }

  } catch (err) {
    status = 'FAILED';
    errors.push(`Uncaught exception: ${err.message}`);
    if (err.stack) {
      errors.push(err.stack.split('\n').slice(0, 3).join(' | '));
    }
    executionTime = performance.now() - start;
  }

  // Score computation (out of 10)
  let score = 10;
  if (status === 'FAILED') {
    score = 0;
  } else {
    score -= (warnings.length * 1.0);
    score -= (missingSections.length * 2.0);
    score = Math.max(1, score);
  }

  results.push({
    slug,
    name: tool.name,
    status,
    executionTime: parseFloat(executionTime.toFixed(2)),
    errors,
    warnings,
    missingSections,
    score
  });
}

const totalRuntime = Date.now() - startOverall;

// Summary calculations
const total = results.length;
const passed = results.filter(r => r.status === 'PASSED').length;
const failed = results.filter(r => r.status === 'FAILED').length;
const totalWarnings = results.reduce((acc, r) => acc + r.warnings.length, 0);
const avgTime = results.reduce((acc, r) => acc + r.executionTime, 0) / total;
const sortedByTime = [...results].sort((a, b) => b.executionTime - a.executionTime);
const slowest = sortedByTime.slice(0, 5);

// Produce JSON Report
fs.mkdirSync(path.join(repoRoot, 'reports'), { recursive: true });
fs.writeFileSync(path.join(repoRoot, 'reports/regression-report.json'), JSON.stringify({
  summary: {
    totalGeneratorsTested: total,
    passed,
    failed,
    warnings: totalWarnings,
    averageExecutionTimeMs: parseFloat(avgTime.toFixed(2)),
    totalRuntimeMs: totalRuntime
  },
  generators: results
}, null, 2), 'utf8');

// Produce Markdown Report
let mdReport = `# Regression Test Suite Report\n\n`;
mdReport += `## Summary Dashboard\n\n`;
mdReport += `| Metric | Value |\n`;
mdReport += `| --- | --- |\n`;
mdReport += `| **Total Generators Tested** | ${total} |\n`;
mdReport += `| **Passed** | ${passed} 🟢 |\n`;
mdReport += `| **Failed** | ${failed} 🔴 |\n`;
mdReport += `| **Total Warnings** | ${totalWarnings} 🟡 |\n`;
mdReport += `| **Average Execution Time** | ${avgTime.toFixed(2)} ms |\n`;
mdReport += `| **Total Suite Runtime** | ${(totalRuntime / 1000).toFixed(2)} seconds |\n\n`;

mdReport += `## Slowest Generators\n\n`;
mdReport += `| Slug | Execution Time |\n`;
mdReport += `| --- | --- |\n`;
slowest.forEach(s => {
  mdReport += `| [${s.slug}](file:///src/scripts/tool-workspace.ts) | ${s.executionTime} ms |\n`;
});
mdReport += `\n`;

if (failed > 0) {
  mdReport += `## Failed Generators Details\n\n`;
  results.filter(r => r.status === 'FAILED').forEach(f => {
    mdReport += `### 🔴 ${f.slug} (Score: ${f.score}/10)\n`;
    mdReport += `* **Errors**:\n`;
    f.errors.forEach(e => { mdReport += `  * ${e}\n`; });
    if (f.warnings.length > 0) {
      mdReport += `* **Warnings**:\n`;
      f.warnings.forEach(w => { mdReport += `  * ${w}\n`; });
    }
    mdReport += `\n`;
  });
} else {
  mdReport += `## 🟢 All generators passed quality gates!\n\n`;
}

fs.writeFileSync(path.join(repoRoot, 'reports/regression-report.md'), mdReport, 'utf8');

console.log('\n==================================================');
console.log('         REGRESSION RUN COMPLETE');
console.log('==================================================');
console.log(`Total Generators Tested: ${total}`);
console.log(`Passed: ${passed}`);
console.log(`Failed: ${failed}`);
console.log(`Warnings: ${totalWarnings}`);
console.log(`Average Execution Time: ${avgTime.toFixed(2)} ms`);
console.log(`Total Runtime: ${(totalRuntime / 1000).toFixed(2)} s`);
console.log('==================================================\n');
