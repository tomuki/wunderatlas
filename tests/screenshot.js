/* Take desktop + mobile screenshots of all key routes.
   Run after the server is up on port 3456.  Outputs to .impeccable/review/. */
const path = require('path');
const fs = require('fs');
const PW = require('/Users/tsukinoakari/.npm/_npx/e41f203b7505f1fb/node_modules/playwright');

const OUT = path.join(__dirname, '..', '.impeccable', 'review');
fs.mkdirSync(OUT, { recursive: true });

const ROUTES = [
    ['dashboard', '01-dashboard'],
    ['plan', '02-plan'],
    ['onboarding', '03-onboarding'],
    ['deutsch', '04-deutsch'],
    ['englisch', '05-englisch'],
    ['mathematik', '06-mathematik'],
    ['grafik', '07-grafik'],
    ['pruefung', '08-pruefung'],
    ['fehler', '09-fehler'],
    ['notizen', '10-notizen'],
    ['fortschritt', '11-fortschritt'],
    ['profil', '12-profil'],
    ['quellen', '13-quellen'],
    ['lernkarten', '14-lernkarten'],
];

const DESKTOP = { width: 1280, height: 900 };
const MOBILE = { width: 390, height: 844 };

async function snap(page, viewport, label) {
    const errors = [];
    page.on('pageerror', e => errors.push('pageerror: ' + e.message));
    page.on('console', m => {
        if (m.type() === 'error') errors.push('console: ' + m.text());
    });
    page.on('requestfailed', r => {
        const url = r.url();
        if (url.includes('/api/')) return; // expected 401
        errors.push('requestfailed: ' + url);
    });

    for (const [route, slug] of ROUTES) {
        const url = `http://localhost:3456/#/${route}`;
        await page.goto(url, { waitUntil: 'networkidle' });
        await page.waitForTimeout(500);
        const out = path.join(OUT, `${slug}.${label}.png`);
        await page.screenshot({ path: out, fullPage: true });
        console.log(`saved ${out}`);
    }
    return errors;
}

(async () => {
    const browser = await PW.chromium.launch({ executablePath: '/Users/tsukinoakari/.cache/puppeteer/chrome-headless-shell/mac_arm-152.0.7977.75/chrome-headless-shell-mac-arm64/chrome-headless-shell' });
    const ctxDesktop = await browser.newContext({ viewport: DESKTOP });
    const pageDesktop = await ctxDesktop.newPage();
    console.log('=== DESKTOP ===');
    const errsDesktop = await snap(pageDesktop, DESKTOP, 'desktop');

    const ctxMobile = await browser.newContext({ viewport: MOBILE });
    const pageMobile = await ctxMobile.newPage();
    console.log('=== MOBILE ===');
    const errsMobile = await snap(pageMobile, MOBILE, 'mobile');

    await browser.close();

    const allErrs = [...errsDesktop, ...errsMobile];
    const filtered = allErrs.filter(e => !e.includes('401') && !e.includes('Unauthorized') && !e.includes('/api/'));
    if (filtered.length) {
        console.log('--- unexpected errors ---');
        filtered.forEach(e => console.log(' ', e));
        process.exit(1);
    }
    console.log(`OK — ${ROUTES.length} routes x 2 viewports = ${ROUTES.length * 2} screenshots, no unexpected errors`);
})();
