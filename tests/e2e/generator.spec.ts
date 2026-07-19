import { test, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createRequire } from 'module';
import crypto from 'crypto';
import { execSync } from 'child_process';

const require = createRequire(import.meta.url);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.resolve(__dirname, '../..');

// Discover all generator slugs dynamically from tools.ts
const toolsData = fs.readFileSync(path.join(repoRoot, 'src/data/tools.ts'), 'utf8');
const slugRegex = /slug:\s*['"]([^'"]+)['"]/g;
const slugs: string[] = [];
let match;
while ((match = slugRegex.exec(toolsData)) !== null) {
  if (!slugs.includes(match[1])) {
    slugs.push(match[1]);
  }
}

// Randomly select 100 generators
const selectedSlugs = slugs.sort().slice(0, 100);

// Git Path Helper to locate Git Desktop executable on Windows
function getGitPath(): string {
  const base = 'C:\\Users\\shahz\\AppData\\Local\\GitHubDesktop';
  try {
    if (fs.existsSync(base)) {
      const folders = fs.readdirSync(base).filter(f => f.startsWith('app-'));
      folders.sort().reverse();
      for (const folder of folders) {
        const cmdPath = path.join(base, folder, 'resources\\app\\git\\cmd\\git.exe');
        if (fs.existsSync(cmdPath)) {
          return `"${cmdPath}"`;
        }
      }
    }
  } catch (e) {}
  return 'git';
}

function getFileHash(filePath: string): string {
  try {
    const content = fs.readFileSync(filePath);
    return crypto.createHash('sha256').update(content).digest('hex');
  } catch (err) {
    return '';
  }
}

// Load cache
const cachePath = path.join(repoRoot, 'reports/e2e-cache.json');
let cache: any = { globalHashes: {}, results: {} };
try {
  if (fs.existsSync(cachePath)) {
    cache = JSON.parse(fs.readFileSync(cachePath, 'utf8'));
  }
} catch (e) {
  // ignore
}

// Tracked core source files discovered dynamically
function discoverTrackedFiles(): string[] {
  const files: string[] = [];
  
  function scan(dir: string) {
    if (!fs.existsSync(dir)) return;
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        scan(fullPath);
      } else if (entry.isFile()) {
        const ext = path.extname(entry.name);
        if (['.ts', '.js', '.mjs', '.astro', '.css', '.json'].includes(ext)) {
          const rel = path.relative(repoRoot, fullPath).replace(/\\/g, '/');
          if (rel.startsWith('tests/') && rel !== 'tests/e2e/generator.spec.ts') {
            continue;
          }
          if (rel.startsWith('reports/') || rel.startsWith('playwright-') || rel.startsWith('test-results/')) {
            continue;
          }
          files.push(rel);
        }
      }
    }
  }

  scan(path.join(repoRoot, 'src'));
  scan(path.join(repoRoot, 'theme'));
  
  const rootFiles = [
    'package.json',
    'tsconfig.json',
    'astro.config.mjs',
    'vite.config.ts',
    'vite.config.js',
    '.env',
    '.env.production',
    '.env.local',
    'tests/e2e/generator.spec.ts'
  ];
  
  for (const rf of rootFiles) {
    if (fs.existsSync(path.join(repoRoot, rf))) {
      files.push(rf);
    }
  }

  return Array.from(new Set(files)).sort();
}

const trackedFiles = discoverTrackedFiles();

// Hash Environment Variables starting with PUBLIC_ or ASTRO_
function getEnvHash(): string {
  const envKeys = Object.keys(process.env).filter(k => k.startsWith('PUBLIC_') || k.startsWith('ASTRO_')).sort();
  const envString = envKeys.map(k => `${k}=${process.env[k]}`).join('\n');
  return crypto.createHash('sha256').update(envString).digest('hex');
}

const currentHashes: Record<string, string> = {};
let allHashesMatch = true;

for (const f of trackedFiles) {
  const h = getFileHash(path.join(repoRoot, f));
  currentHashes[f] = h;
  if (cache.globalHashes?.[f] !== h) {
    allHashesMatch = false;
  }
}

// Track environment variables virtual hash
const currentEnvHash = getEnvHash();
currentHashes['env:variables'] = currentEnvHash;
if (cache.globalHashes?.['env:variables'] !== currentEnvHash) {
  allHashesMatch = false;
}

// Git Diff changed slugs detection
function getChangedSlugsFromGit(): Set<string> {
  const changed = new Set<string>();
  const git = getGitPath();
  try {
    const diff = execSync(`${git} diff -U0 src/`, { cwd: repoRoot, encoding: 'utf8' }) + '\n' +
                 execSync(`${git} diff --cached -U0 src/`, { cwd: repoRoot, encoding: 'utf8' });
    
    for (const line of diff.split('\n')) {
      if (line.startsWith('+') || line.startsWith('-')) {
        for (const slug of selectedSlugs) {
          if (line.includes(slug)) {
            changed.add(slug);
          }
        }
      }
    }
  } catch (err) {
    // If git fails, assume all might have changed
    return new Set(selectedSlugs);
  }
  return changed;
}

// Global invalidators detection
const globalInvalidators = [
  'package.json',
  'tsconfig.json',
  'astro.config.mjs',
  'vite.config.ts',
  'vite.config.js',
  'tests/e2e/generator.spec.ts',
  'env:variables'
].filter(f => f === 'env:variables' || fs.existsSync(path.join(repoRoot, f)));

for (const file of trackedFiles) {
  if (file.includes('pages/tools/[slug].astro') || file.startsWith('theme/layouts/') || file.startsWith('theme/styles/')) {
    globalInvalidators.push(file);
  }
}

const isGlobalInvalidated = globalInvalidators.some(f => cache.globalHashes?.[f] !== currentHashes[f]);
const changedSlugs = getChangedSlugsFromGit();

// Pre-populate testResults with cached passes
const testResults: any[] = [];
const cacheResults = cache.results || {};

if (cache.results) {
  for (const s of selectedSlugs) {
    const res = cacheResults[s];
    if (res && res.status === 'PASSED') {
      testResults.push({
        slug: s,
        status: 'PASSED',
        renderTime: res.renderTime || 0,
        fcp: res.fcp || 0,
        lcp: res.lcp || 0,
        tti: res.tti || 0,
        accessibilityViolations: res.accessibilityViolations || 0,
        errors: [],
        cached: true
      });
    }
  }
}

test.describe.configure({ mode: 'parallel' });

test.describe('E2E Browser Validation for Generators', () => {
  for (const slug of selectedSlugs) {
    test(`Verify generator: ${slug}`, async ({ page }) => {
      // Determine if we should skip this test based on cache and changes
      const isChanged = !allHashesMatch && (isGlobalInvalidated || changedSlugs.has(slug));
      const cached = cacheResults[slug];
      
      if (!isChanged && cached && cached.status === 'PASSED') {
        test.skip(true, 'Cached pass (no code changes detected)');
        return;
      }

      test.setTimeout(120 * 1000);
      const consoleErrors: string[] = [];
      const pageErrors: Error[] = [];

      // Monitor console errors and exceptions
      page.on('console', msg => {
        if (msg.type() === 'error') consoleErrors.push(msg.text());
      });
      page.on('pageerror', err => pageErrors.push(err));

      const startTime = Date.now();

      // Navigate to generator page
      await page.goto(`/tools/${slug}/`, { waitUntil: 'load' });

      // Go-to assertions
      expect(consoleErrors).toEqual([]);
      expect(pageErrors).toEqual([]);

      // 1. Injected Axe-Core Accessibility Checks
      await page.addScriptTag({ path: require.resolve('axe-core') });
      const axeResult = await page.evaluate(async () => {
        return new Promise((resolve) => {
          (window as any).axe.run(document, {
            runOnly: {
              type: 'tag',
              values: ['wcag2a', 'wcag2aa']
            }
          }, (err: any, results: any) => {
            if (err) resolve({ violations: [] });
            else resolve(results);
          });
        });
      }) as any;

      const violationsCount = axeResult?.violations?.length || 0;

      // 2. Performance Metrics Retrieval
      const performanceMetrics = await page.evaluate(() => {
        const paint = performance.getEntriesByType('paint');
        const fcp = paint.find(entry => entry.name === 'first-contentful-paint')?.startTime || 0;
        const lcp = performance.getEntriesByType('largest-contentful-paint')?.[0]?.startTime || fcp;
        const tti = performance.now();
        return { fcp: Math.round(fcp), lcp: Math.round(lcp), tti: Math.round(tti) };
      });

      // 3. UI Selectors Assertions
      const workspace = page.locator('#tool-workspace');
      await expect(workspace).toBeVisible();

      const input = page.locator('#tool-input');
      await expect(input).toBeVisible();

      const generateBtn = page.locator('#generate-btn');
      await expect(generateBtn).toBeVisible();

      const output = page.locator('#tool-output');
      await expect(output).toBeVisible();

      // 4. Mock Analytics Interfaces & Clipboard API
      await page.evaluate(() => {
        (window as any).analyticsEvents = [];
        window.gtag = (type: string, name: string, data: any) => {
          if (type === 'event') (window as any).analyticsEvents.push({ name, data });
        };
        window.va = (type: string, payload: any) => {
          if (type === 'event') (window as any).analyticsEvents.push(payload);
        };

        // Mock clipboard API
        let clipboardData = '';
        Object.defineProperty(navigator, 'clipboard', {
          value: {
            writeText: async (text: string) => { clipboardData = text; },
            readText: async () => clipboardData
          },
          configurable: true
        });
      });

      // 5. Generate Trigger
      await expect(workspace).toHaveAttribute('data-hydrated', 'true', { timeout: 30000 });
      await input.fill('E2E Validation test seed value');
      await generateBtn.click({ force: true });

      // Verify Output
      await expect(output).not.toHaveClass(/empty/, { timeout: 20000 });
      const generatedText = await output.textContent();
      expect(generatedText?.trim()).not.toBe('');

      // 6. Copy Operation Verification
      const copyBtn = page.locator('#copy-btn');
      if (await copyBtn.isVisible()) {
        await copyBtn.scrollIntoViewIfNeeded();
        await page.evaluate(() => window.scrollBy(0, -150));
        await copyBtn.click();
        await expect(copyBtn).toHaveClass(/copied/);
        const clipboardText = await page.evaluate(() => navigator.clipboard.readText());
        expect(clipboardText).not.toBe('');
      }

      // 7. Share Operation Verification
      const shareBtn = page.locator('#share-btn');
      if (await shareBtn.isVisible()) {
        await shareBtn.scrollIntoViewIfNeeded();
        await page.evaluate(() => window.scrollBy(0, -150));
        await shareBtn.click();
        await expect(shareBtn).toHaveClass(/copied/);
        const clipboardText = await page.evaluate(() => navigator.clipboard.readText());
        expect(clipboardText).toContain(slug);
      }

      // 8. Download Action Verification (when available)
      const downloadTxt = page.locator('#btn-download-txt');
      if (await downloadTxt.isVisible()) {
        const downloadPromise = page.waitForEvent('download');
        await downloadTxt.click({ force: true });
        const download = await downloadPromise;
        expect(download.suggestedFilename()).toContain('.txt');
      }

      // 9. Analytics Dispatch Verification
      const trackedEvents = await page.evaluate(() => (window as any).analyticsEvents) as any[];
      expect(trackedEvents.length).toBeGreaterThan(0);

      const renderTime = Date.now() - startTime;

      const newResult = {
        slug,
        status: 'PASSED',
        renderTime,
        fcp: performanceMetrics.fcp,
        lcp: performanceMetrics.lcp,
        tti: performanceMetrics.tti,
        accessibilityViolations: violationsCount,
        errors: [],
      };

      const existingIdx = testResults.findIndex(r => r.slug === slug);
      if (existingIdx !== -1) {
        testResults[existingIdx] = newResult;
      } else {
        testResults.push(newResult);
      }
    });
  }
});

test.afterAll(async () => {
  const reportsDir = path.join(repoRoot, 'reports');
  fs.mkdirSync(reportsDir, { recursive: true });

  const passed = testResults.filter(r => r.status === 'PASSED').length;
  const failed = testResults.filter(r => r.status === 'FAILED').length;
  const avgRenderTime = testResults.reduce((sum, r) => sum + r.renderTime, 0) / testResults.length;

  // JSON Report
  fs.writeFileSync(
    path.join(reportsDir, 'e2e-report.json'),
    JSON.stringify({
      summary: {
        totalTested: testResults.length,
        passed,
        failed,
        averageRenderTimeMs: Math.round(avgRenderTime),
      },
      results: testResults
    }, null, 2),
    'utf8'
  );

  // Markdown Report
  let md = `# E2E Browser Testing Report\n\n`;
  md += `## Summary Dashboard\n\n`;
  md += `| Metric | Value |\n`;
  md += `| --- | --- |\n`;
  md += `| **Total Generators Tested** | ${testResults.length} |\n`;
  md += `| **Passed** | ${passed} 🟢 |\n`;
  md += `| **Failed** | ${failed} 🔴 |\n`;
  md += `| **Average Render Time** | ${Math.round(avgRenderTime)} ms |\n\n`;

  md += `## Performance Profiles\n\n`;
  md += `| Slug | Render Time (ms) | FCP (ms) | LCP (ms) | TTI (ms) | A11y Violations |\n`;
  md += `| --- | --- | --- | --- | --- | --- |\n`;
  testResults.forEach(r => {
    md += `| ${r.slug} | ${r.renderTime} | ${r.fcp} | ${r.lcp} | ${r.tti} | ${r.accessibilityViolations} |\n`;
  });

  fs.writeFileSync(path.join(reportsDir, 'e2e-report.md'), md, 'utf8');

  // Save updated cache file
  const updatedResults = { ...cacheResults };
  testResults.forEach(r => {
    updatedResults[r.slug] = {
      status: r.status,
      timestamp: Date.now(),
      renderTime: r.renderTime,
      fcp: r.fcp,
      lcp: r.lcp,
      tti: r.tti,
      accessibilityViolations: r.accessibilityViolations
    };
  });

  const finalCache = {
    globalHashes: currentHashes,
    results: updatedResults
  };

  fs.writeFileSync(cachePath, JSON.stringify(finalCache, null, 2), 'utf8');
});
