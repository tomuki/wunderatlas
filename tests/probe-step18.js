// Probe Step 18: simulate what the test does, find when data-start disappears
const PW_PATH = '/Users/tsukinoakari/.npm/_npx/e41f203b7505f1fb/node_modules/playwright';
const { chromium } = require(PW_PATH);

(async () => {
    const browser = await chromium.launch({
        headless: true,
        executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
        args: ['--no-sandbox', '--disable-dev-shm-usage']
    });
    const ctx = await browser.newContext({ viewport: { width: 1280, height: 800 } });
    const page = await ctx.newPage();
    page.on('console', msg => { if (msg.type() === 'error') console.log('[ERR]', msg.text().slice(0, 150)); });
    page.on('pageerror', e => console.log('[PAGEERROR]', e.message.slice(0, 150)));

    const BASE = 'http://localhost:3456';

    // Register fresh
    const ts = Date.now();
    const email = `probe2_${ts}@x.com`;
    await page.goto(BASE + '/register.html', { waitUntil: 'networkidle' });
    await page.fill('#name', 'Probe2');
    await page.fill('#email', email);
    await page.fill('#password', 'pw12345678');
    await page.fill('#password2', 'pw12345678');
    await page.click('#submit');
    await page.waitForTimeout(2000);

    // Mark onboarded
    await page.goto(BASE + '/index.html#/dashboard', { waitUntil: 'networkidle' });
    await page.waitForTimeout(500);
    await page.evaluate(() => {
        const s = JSON.parse(localStorage.getItem('fhr-app') || '{}');
        s.profile = s.profile || {};
        s.profile.onboardedAt = new Date().toISOString();
        localStorage.setItem('fhr-app', JSON.stringify(s));
    });

    // Now visit /plan and check buttons
    console.log('--- visit /plan (1st time) ---');
    await page.goto(BASE + '/index.html#/plan', { waitUntil: 'networkidle' });
    await page.waitForTimeout(1000);
    const first = await page.evaluate(() => {
        const buttons = Array.from(document.querySelectorAll('[data-start]'));
        return {
            count: buttons.length,
            first5: buttons.slice(0, 5).map(b => b.getAttribute('data-start')),
            planState: JSON.parse(localStorage.getItem('fhr-app') || '{}').plan ? 'has plan' : 'no plan',
            planWeeks: (JSON.parse(localStorage.getItem('fhr-app') || '{}').plan || {}).weeks ? JSON.parse(localStorage.getItem('fhr-app') || '{}').plan.weeks.length : 0
        };
    });
    console.log('first visit:', JSON.stringify(first, null, 2));

    // Now simulate Step 18 inventory behavior: navigate to each route, expand details, look up
    await page.evaluate(() => {
        document.querySelectorAll('details').forEach(d => { d.open = true; });
    });
    await page.waitForTimeout(200);

    const afterExpand = await page.$$eval('[data-start]', els => els.map(e => e.getAttribute('data-start')));
    console.log('after expand, count:', afterExpand.length);
    console.log('first 5:', afterExpand.slice(0, 5));

    // Now navigate AWAY and back
    console.log('--- navigate to /dashboard then back to /plan ---');
    await page.goto(BASE + '/index.html#/dashboard', { waitUntil: 'networkidle' });
    await page.waitForTimeout(500);
    await page.goto(BASE + '/index.html#/plan', { waitUntil: 'networkidle' });
    await page.waitForTimeout(1000);

    const second = await page.evaluate(() => {
        const buttons = Array.from(document.querySelectorAll('[data-start]'));
        return {
            count: buttons.length,
            first5: buttons.slice(0, 5).map(b => b.getAttribute('data-start'))
        };
    });
    console.log('second visit:', JSON.stringify(second, null, 2));

    // Try clicking the first start button to see if state changes
    await page.evaluate(() => {
        document.querySelectorAll('details').forEach(d => { d.open = true; });
    });
    await page.waitForTimeout(200);

    const sel = '[data-start="w0-s3-en"]';
    const el = await page.$(sel);
    console.log('looking up w0-s3-en:', !!el);

    if (el) {
        await el.click();
        await page.waitForTimeout(500);
        const afterClick = await page.evaluate(() => {
            const buttons = Array.from(document.querySelectorAll('[data-start]'));
            return {
                hash: location.hash,
                count: buttons.length,
                first5: buttons.slice(0, 5).map(b => b.getAttribute('data-start'))
            };
        });
        console.log('after click:', JSON.stringify(afterClick, null, 2));
    }

    await browser.close();
})();
