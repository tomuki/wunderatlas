// Test: does page.goto same-URL hash trigger reload?
const PW_PATH = '/Users/tsukinoakari/.npm/_npx/e41f203b7505f1fb/node_modules/playwright';
const { chromium } = require(PW_PATH);

(async () => {
    const browser = await chromium.launch({
        headless: true,
        executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
        args: ['--no-sandbox']
    });
    const ctx = await browser.newContext();
    const page = await ctx.newPage();

    // Track navigation events
    page.on('framenavigated', f => console.log('[NAV]', f.url()));

    await page.goto('http://localhost:3456/index.html#/dashboard', { waitUntil: 'networkidle' });
    await page.waitForTimeout(500);

    // Now navigate to /plan
    console.log('--- goto /plan ---');
    await page.goto('http://localhost:3456/index.html#/plan', { waitUntil: 'networkidle' });
    await page.waitForTimeout(500);

    // Now navigate to /plan AGAIN (same hash)
    console.log('--- goto /plan AGAIN (same hash) ---');
    await page.goto('http://localhost:3456/index.html#/plan', { waitUntil: 'networkidle' });
    await page.waitForTimeout(500);

    // Now navigate to /plan from /plan (force reload)
    console.log('--- goto /plan with reload ---');
    await page.goto('http://localhost:3456/index.html#/plan', { waitUntil: 'networkidle' });
    await page.waitForTimeout(500);

    // Try a different page first then back
    console.log('--- goto /dashboard then /plan ---');
    await page.goto('http://localhost:3456/index.html#/dashboard', { waitUntil: 'networkidle' });
    await page.waitForTimeout(500);
    await page.goto('http://localhost:3456/index.html#/plan', { waitUntil: 'networkidle' });
    await page.waitForTimeout(500);

    await browser.close();
})();
