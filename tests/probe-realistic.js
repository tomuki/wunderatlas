// Simulate exactly what the e2e test does
const PW_PATH = '/Users/tsukinoakari/.npm/_npx/e41f203b7505f1fb/node_modules/playwright';
const { chromium } = require(PW_PATH);

(async () => {
    const browser = await chromium.launch({
        headless: true,
        executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
        args: ['--no-sandbox']
    });
    const ctx = await browser.newContext({ viewport: { width: 1280, height: 800 } });
    const page = await ctx.newPage();
    page.on('console', msg => { if (msg.type() === 'error') console.log('[ERR]', msg.text().slice(0, 150)); });
    page.on('pageerror', e => console.log('[PAGEERROR]', e.message.slice(0, 150)));

    const BASE = 'http://localhost:3456';

    // Register
    const ts = Date.now();
    const email = `probe3_${ts}@x.com`;
    await page.goto(BASE + '/register.html', { waitUntil: 'networkidle' });
    await page.fill('#name', 'P3');
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

    // Visit all pages like the inventory phase
    const PAGES = ['dashboard', 'plan', 'deutsch', 'englisch', 'mathematik', 'grafik', 'pruefung', 'fehler', 'notizen', 'fortschritt', 'profil', 'quellen'];
    for (const r of PAGES) {
        await page.goto(BASE + '/index.html#/' + r, { waitUntil: 'networkidle' });
        await page.waitForTimeout(800);
    }

    // Now inventory /plan
    await page.goto(BASE + '/index.html#/plan', { waitUntil: 'networkidle' });
    await page.waitForTimeout(800);
    const items = await page.$$eval(
        'button:not([role="radio"]):not([role="tab"]), a.btn',
        els => els.map(el => {
            let sel = '';
            if (el.id) sel = '#' + CSS.escape(el.id);
            else {
                const dataAttrs = {};
                for (const a of el.attributes) if (a.name.startsWith('data-')) dataAttrs[a.name] = a.value;
                const dKeys = Object.keys(dataAttrs);
                if (dKeys.length >= 1) sel = dKeys.map(k => `[${k}="${dataAttrs[k]}"]`).join('');
            }
            return { sel, tag: el.tagName.toLowerCase(), text: (el.innerText || '').trim().slice(0, 40) };
        })
    );
    console.log('Inventory collected:', items.length, 'buttons');
    const dataStartItems = items.filter(i => i.sel.startsWith('[data-start='));
    console.log('Data-start buttons:', dataStartItems.length);
    console.log('First 5:', dataStartItems.slice(0, 5).map(x => x.sel));

    // Now simulate per-button click: for each data-start, navigate fresh
    let failCount = 0;
    for (let i = 0; i < Math.min(20, dataStartItems.length); i++) {
        const it = dataStartItems[i];
        await page.goto(BASE + '/index.html#/plan', { waitUntil: 'networkidle' });
        await page.waitForTimeout(200);
        await page.evaluate(() => {
            document.querySelectorAll('details').forEach(d => { d.open = true; });
        });
        const el = await page.$(it.sel);
        if (!el) {
            console.log(`FAIL on iter ${i}: ${it.sel}`);
            failCount++;
            if (failCount > 3) break;
        } else {
            await el.click({ force: true, timeout: 2000 });
            await page.waitForTimeout(60);
        }
    }
    console.log('Total fails:', failCount);

    await browser.close();
})();
