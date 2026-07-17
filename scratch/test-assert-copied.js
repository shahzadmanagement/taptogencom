import { chromium } from 'playwright';

(async () => {
  console.log('Launching browser...');
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  
  page.on('console', msg => console.log('[BROWSER CONSOLE]:', msg.text()));
  page.on('pageerror', err => console.error('[BROWSER EXCEPTION]:', err));

  console.log('Navigating to clan-name-generator...');
  await page.goto('http://localhost:4321/tools/clan-name-generator/', { waitUntil: 'load' });
  
  await page.evaluate(() => {
    // Inject clipboard mock
    let clipboardData = '';
    Object.defineProperty(navigator, 'clipboard', {
      value: {
        writeText: async (text) => { clipboardData = text; },
        readText: async () => clipboardData
      },
      configurable: true
    });
  });

  const input = page.locator('#tool-input');
  await input.fill('test text');
  
  const generateBtn = page.locator('#generate-btn');
  await generateBtn.click({ force: true });
  
  const output = page.locator('#tool-output');
  await output.evaluate(async (el) => {
    while (el.classList.contains('empty')) {
      await new Promise(resolve => setTimeout(resolve, 50));
    }
  });

  const copyBtn = page.locator('#copy-btn');
  console.log('Copy button visible:', await copyBtn.isVisible());
  console.log('Copy button class BEFORE click:', await copyBtn.evaluate(el => el.className));
  
  console.log('Clicking copy button...');
  await copyBtn.click({ force: true });
  
  console.log('Asserting copy button has class copied...');
  try {
    // Wait for the class copied to be present
    await copyBtn.evaluate(async (el) => {
      let retries = 0;
      while (!el.classList.contains('copied') && retries < 20) {
        await new Promise(resolve => setTimeout(resolve, 50));
        retries++;
      }
      console.log('[BROWSER EVAL]: Copy button class during check:', el.className);
    });
    console.log('Class copied is present! Class name:', await copyBtn.evaluate(el => el.className));
  } catch (err) {
    console.error('Assertion failed! Error:', err);
  }

  await browser.close();
})();
