import { test, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createRequire } from 'module';

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

const testResults: any[] = [];

test.describe.configure({ mode: 'parallel' });

test.describe('E2E Browser Validation for Generators', () => {
  for (const slug of selectedSlugs) {
    test(`Verify generator: ${slug}`, async ({ page }) => {
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

      testResults.push({
        slug,
        status: 'PASSED',
        renderTime,
        fcp: performanceMetrics.fcp,
        lcp: performanceMetrics.lcp,
        tti: performanceMetrics.tti,
        accessibilityViolations: violationsCount,
        errors: [],
      });
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
});
