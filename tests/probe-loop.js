// Click data-start buttons in order, see if any fail
const PW_PATH = '/Users/tsukinoakari/.npm/_npx/e41f203b7505f1fb/node_modules/playwright';
const { chromium } = require(PW_PATH);
const path = require('path');
const fs = require('fs');

(async () => {
    // Reset server
    try {
        const dataDir = path.resolve(__dirname, '../data');
        if (fs.existsSync(dataDir)) {
            const shapes = { users: 'users.json', rateLimits: 'rate-limits.json', tokens: 'tokens.json', profiles: 'profiles.json' };
            for (const [k, f] of Object.entries(shapes)) {
                const p = path.join(dataDir, f);
                if (fs.existsSync(p)) { try { fs.unlinkSync(p); } catch (e) {} }
            }
        }
    } catch (e) {}

    const browser = await chromium.launch({
        headless: true,
        executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
        args: ['--no-sandbox']
    });
    const ctx = await browser.newContext({ viewport: { width: 1280, height: 800 } });
    const page = await ctx.newPage();
    page.on('pageerror', e => console.log('[PAGEERROR]', e.message.slice(0, 150)));

    const BASE = 'http://localhost:3456';
    const PAGES = ['dashboard', 'plan', 'deutsch', 'englisch', 'mathematik', 'grafik', 'pruefung', 'fehler', 'notizen', 'fortschritt', 'profil', 'quellen'];

    // Quick path
    await page.goto(BASE + '/index.html', { waitUntil: 'domcontentloaded' });
    for (const r of PAGES) {
        await page.goto(BASE + '/index.html#/' + r, { waitUntil: 'networkidle' });
        await page.waitForTimeout(500);
    }

    const ts = Date.now();
    const email = `probe5_${ts}@x.com`;
    await page.goto(BASE + '/register.html', { waitUntil: 'networkidle' });
    await page.fill('#name', 'P5');
    await page.fill('#email', email);
    await page.fill('#password', 'pw12345678');
    await page.fill('#password2', 'pw12345678');
    await page.click('#submit');
    await page.waitForTimeout(2000);

    await page.goto(BASE + '/index.html#/dashboard', { waitUntil: 'networkidle' });
    await page.waitForTimeout(500);
    await page.evaluate(() => {
        const s = JSON.parse(localStorage.getItem('fhr-app') || '{}');
        s.profile = s.profile || {};
        s.profile.onboardedAt = new Date().toISOString();
        localStorage.setItem('fhr-app', JSON.stringify(s));
    });

    // Step 4
    await page.goto(BASE + '/index.html#/dashboard', { waitUntil: 'networkidle' });
    await page.waitForTimeout(500);
    const dashButtons = await page.$$('button, a.btn, [role="button"]');
    let clicked = 0;
    for (let i = 0; i < Math.min(10, dashButtons.length); i++) {
        try {
            await dashButtons[i].click({ timeout: 1000, trial: false });
            await page.waitForTimeout(150);
            clicked++;
        } catch (e) {}
    }

    // Step 5
    await page.goto(BASE + '/index.html#/deutsch/operatoren', { waitUntil: 'networkidle' });
    await page.waitForTimeout(500);
    const markBtn = await page.$('#markComplete');
    if (markBtn) await markBtn.click();
    await page.waitForTimeout(500);

    // Step 8
    await page.goto(BASE + '/index.html#/profil', { waitUntil: 'networkidle' });
    await page.waitForTimeout(800);
    const hpw = await page.$('#p-hours');
    if (hpw) {
        await hpw.fill('7');
        await page.waitForTimeout(100);
        const saveBtn = await page.$('[data-save="exam"]');
        if (saveBtn) await saveBtn.click();
        await page.waitForTimeout(500);
    }

    // Step 10 notizen add
    await page.goto(BASE + '/index.html#/notizen', { waitUntil: 'networkidle' });
    await page.waitForTimeout(500);
    const newNote = await page.$('#newNote');
    if (newNote) {
        await newNote.click();
        await page.waitForTimeout(300);
        const titleInput = await page.$('#noteTitle');
        if (titleInput) await titleInput.fill('Test Note');
        const saveBtn = await page.$('#save');
        if (saveBtn) await saveBtn.click();
        await page.waitForTimeout(300);
    }

    // Step 15 logout
    await page.evaluate(async (base) => {
        await fetch(base + '/api/auth/logout', { method: 'POST', credentials: 'same-origin' });
    }, BASE);

    // Step 16 login
    await page.goto(BASE + '/login.html', { waitUntil: 'networkidle' });
    await page.fill('#email', email);
    await page.fill('#password', 'pw12345678');
    const submit = await page.$('button[type="submit"], #submit');
    if (submit) await submit.click();
    await page.waitForTimeout(800);

    // Now collect inventory
    const inventory = {};
    for (const route of PAGES) {
        await page.goto(BASE + '/index.html#/' + route, { waitUntil: 'networkidle' });
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
                return { sel, text: (el.innerText || '').trim().slice(0, 40) };
            })
        );
        inventory[route] = items;
    }

    // Click every plan data-start button in order, log when fails occur
    const planItems = inventory.plan.filter(i => i.sel.startsWith('[data-start='));
    console.log('Total data-start:', planItems.length);

    let fails = 0;
    let firstFailAt = -1;
    for (let i = 0; i < planItems.length; i++) {
        const it = planItems[i];
        await page.goto(BASE + '/index.html#/plan', { waitUntil: 'networkidle' });
        await page.waitForTimeout(200);
        await page.evaluate(() => {
            document.querySelectorAll('details').forEach(d => { d.open = true; });
        });
        const el = await page.$(it.sel);
        if (!el) {
            fails++;
            if (firstFailAt === -1) firstFailAt = i;
            if (fails <= 5) {
                console.log(`  FAIL #${fails} at iter ${i}: ${it.sel} text="${it.text}"`);
                const dom = await page.$$eval('[data-start]', els => els.slice(0, 5).map(e => e.getAttribute('data-start')));
                console.log(`    DOM first 5: ${JSON.stringify(dom)}`);
            }
        } else {
            await el.click({ force: true, timeout: 2000 });
            await page.waitForTimeout(60);
        }
    }
    console.log('Total fails:', fails, 'first fail at:', firstFailAt);

    await browser.close();
})();
