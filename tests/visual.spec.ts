import { test, expect } from '@playwright/test';
import { injectAxe, checkA11y } from 'axe-playwright';

const targetPages = [
  'fancy-text-generator',
  'bold-text-generator',
  'cursive-text-generator'
];

test.describe('Visual & Accessibility Validation Suite', () => {
  for (const pageName of targetPages) {
    test(`Validate ${pageName} layouts and WCAG standards`, async ({ page }) => {
      // 1. Visit target utility page
      await page.goto(`/tools/${pageName}/`);
      await page.waitForLoadState('networkidle');

      // 2. Perform axe-core accessibility injection
      await injectAxe(page);
      
      // 3. Assert WCAG 2.2 AA standards
      await checkA11y(page, undefined, {
        axeOptions: {
          runOnly: {
            type: 'tag',
            values: ['wcag2aa', 'wcag22aa']
          }
        },
        detailedReport: true,
        detailedReportOptions: { html: true }
      });

      // 4. Capture screenshot check
      await expect(page).toHaveScreenshot(`${pageName}-baseline.png`, {
        maxDiffPixelRatio: 0.05,
        threshold: 0.2
      });
    });
  }
});
