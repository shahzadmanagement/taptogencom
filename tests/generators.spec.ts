import { test, expect } from '@playwright/test';

const tools = [
  'fancy-text-generator',
  'bold-text-generator',
  'cursive-text-generator',
  'italic-text-generator',
  'underline-text-generator',
  'strikethrough-text-generator',
  'vaporwave-text-generator',
  'unicode-text-generator'
];

test.describe('Typography Generators E2E Tests', () => {
  for (const slug of tools) {
    test(`Verify ${slug} operates correctly`, async ({ page }) => {
      // Go to page
      await page.goto(`/tools/${slug}/`);
      
      // Confirm page loaded correctly
      const h1 = page.locator('h1');
      await expect(h1).toBeVisible();

      // Enter value in input
      const textarea = page.locator('#tool-input');
      await expect(textarea).toBeVisible();
      await textarea.fill('Testing Live Conversion');

      // Verify character counts update
      const charCounter = page.locator('#char-counter');
      if (await charCounter.count() > 0) {
        await expect(charCounter).toContainText('23 chars');
      }

      // Verify that previews elements contain generated conversions
      const previewText = page.locator('.intent-preview-text').first();
      if (await previewText.count() > 0) {
        await expect(previewText).toBeVisible();
      }

      // Toggle mockup preview tab if visible
      const igTab = page.locator('[data-tab="ig"]');
      if (await igTab.count() > 0) {
        await igTab.click();
        const igPanel = page.locator('#mockup-panel-ig');
        await expect(igPanel).toBeVisible();
      }
    });
  }
});
