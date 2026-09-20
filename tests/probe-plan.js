// Quick probe to check plan button presence
const PW_PATH = '/Users/tsukinoakari/.npm/_npx/e41f203b7505f1fb/node_modules/playwright';
const { chromium } = require(PW_PATH);
const path = require('path');

(async () => {
    const browser = await chromium.launch({
        headless: true,
        executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
        args: ['--no-sandbox', '--disable-dev-shm-usage']
    });
    const ctx = await browser.newContext();
    const page = await ctx.newPage();
    page.on('console', msg => console.log('[CONSOLE]', msg.type(), msg.text().slice(0, 200)));
    page.on('pageerror', e => console.log('[PAGEERROR]', e.message));

    // Register a user first
    const ts = Date.now();
    const email = `probe_${ts}@x.com`;
    await page.goto('http://localhost:3456/register.html', { waitUntil: 'networkidle' });
    await page.fill('#name', 'Probe');
    await page.fill('#email', email);
    await page.fill('#password', 'pw12345678');
    await page.fill('#password2', 'pw12345678');
    await page.click('#submit');
    await page.waitForTimeout(2000);

    // Mark onboarded
    await page.goto('http://localhost:3456/index.html#/dashboard', { waitUntil: 'networkidle' });
    await page.waitForTimeout(500);
    await page.evaluate(() => {
        const s = JSON.parse(localStorage.getItem('fhr-app') || '{}');
        s.profile = s.profile || {};
        s.profile.onboardedAt = new Date().toISOString();
        localStorage.setItem('fhr-app', JSON.stringify(s));
    });

    // Navigate to plan
    await page.goto('http://localhost:3456/index.html#/plan', { waitUntil: 'networkidle' });
    await page.waitForTimeout(1000);

    // Check buttons
    const result = await page.evaluate(() => {
        const buttons = Array.from(document.querySelectorAll('[data-start]'));
        const first10 = buttons.slice(0, 10).map(b => b.getAttribute('data-start'));
        const total = buttons.length;
        // Also check the raw HTML for the first 500 chars
        const planHTML = document.querySelector('.week-list') ? document.querySelector('.week-list').innerHTML.length : 0;
        return { total, first10, planHTML };
    });
    console.log('Total data-start buttons:', result.total);
    console.log('First 10 IDs:', result.first10);
    console.log('plan-list HTML chars:', result.planHTML);

    // Look up specific selectors
    const w0s3en = await page.$('[data-start="w0-s3-en"]');
    const w1s3en = await page.$('[data-start="w1-s3-en"]');
    const w5s3en = await page.$('[data-start="w5-s3-en"]');
    console.log('w0-s3-en found:', !!w0s3en);
    console.log('w1-s3-en found:', !!w1s3en);
    console.log('w5-s3-en found:', !!w5s3en);

    // Take screenshot
    await page.screenshot({ path: '/tmp/probe-plan.png', fullPage: true });
    console.log('Screenshot saved');

    await browser.close();
})();
