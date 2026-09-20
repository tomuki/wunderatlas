/* Browser smoke test: load index.html scripts in a DOM-like sandbox, capture
   console errors, render each page, and assert there are no errors.
   Run: node tests/browser-smoke.js */
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ROOT = path.resolve(__dirname, '..');

function makeElement() {
    const children = [];
    const attrs = {};
    const listeners = {};
    const el = {
        _children: children,
        _attrs: attrs,
        _listeners: listeners,
        _innerHTML: '',
        _textContent: '',
        classList: {
            _set: new Set(),
            add(c) { this._set.add(c); },
            remove(c) { this._set.delete(c); },
            contains(c) { return this._set.has(c); },
            toggle(c) { this._set.has(c) ? this._set.delete(c) : this._set.add(c); return this._set.has(c); }
        },
        style: {},
        dataset: {},
        childNodes: children,
        children,
        appendChild(c) { children.push(c); return c; },
        removeChild(c) { const i = children.indexOf(c); if (i >= 0) children.splice(i, 1); return c; },
        insertBefore(c, before) { const i = children.indexOf(before); if (i < 0) children.push(c); else children.splice(i, 0, c); return c; },
        replaceChild(n, o) { const i = children.indexOf(o); if (i >= 0) children[i] = n; return o; },
        remove() { /* no-op */ },
        setAttribute(k, v) { attrs[k] = v; },
        getAttribute(k) { return attrs[k] == null ? null : attrs[k]; },
        removeAttribute(k) { delete attrs[k]; },
        hasAttribute(k) { return k in attrs; },
        addEventListener(ev, fn) { (listeners[ev] = listeners[ev] || []).push(fn); },
        removeEventListener(ev, fn) {
            const arr = listeners[ev] || [];
            const i = arr.indexOf(fn);
            if (i >= 0) arr.splice(i, 1);
        },
        dispatchEvent(ev) {
            const arr = listeners[ev.type] || [];
            for (const fn of arr) try { fn(ev); } catch (e) { console.error('listener error', e); }
        },
        focus() {},
        click() { this.dispatchEvent({ type: 'click' }); },
        querySelector(sel) {
            // Very simple selector support: tag, .class, #id, [data-foo]
            return findFirst(children, sel);
        },
        querySelectorAll(sel) {
            const out = [];
            findAll(children, sel, out);
            return out;
        },
        get innerHTML() { return this._innerHTML; },
        set innerHTML(v) {
            this._innerHTML = String(v);
            this._children.length = 0;
        },
        get textContent() {
            if (children.length === 0) return this._textContent;
            return children.map(c => c.textContent || '').join('');
        },
        set textContent(v) {
            this._textContent = String(v);
            this._children.length = 0;
        }
    };
    return el;
}

function matches(el, sel) {
    if (!sel) return false;
    if (sel.startsWith('.')) return (el.classList._set || new Set()).has(sel.slice(1));
    if (sel.startsWith('#')) return el.getAttribute('id') === sel.slice(1);
    if (sel.startsWith('[')) {
        const m = sel.match(/^\[([a-zA-Z0-9_-]+)(?:=([^\]]+))?\]$/);
        if (m) {
            const v = el.getAttribute(m[1]);
            if (m[2] == null) return v != null;
            return v === m[2].replace(/^["']|["']$/g, '');
        }
        return false;
    }
    return el.tagName === sel.toUpperCase() || el.tagName === sel;
}

function findFirst(els, sel) {
    for (const e of els) {
        if (matches(e, sel)) return e;
        const sub = findFirst(e._children || [], sel);
        if (sub) return sub;
    }
    return null;
}

function findAll(els, sel, out) {
    for (const e of els) {
        if (matches(e, sel)) out.push(e);
        findAll(e._children || [], sel, out);
    }
}

function makeDocument() {
    const documentElement = makeElement();
    documentElement.tagName = 'HTML';
    const body = makeElement();
    body.tagName = 'BODY';
    documentElement.appendChild(body);
    const head = makeElement();
    head.tagName = 'HEAD';
    documentElement.appendChild(head);
    return {
        readyState: 'complete',
        documentElement,
        head,
        body,
        getElementById(id) {
            return findFirst(documentElement._children, '#' + id);
        },
        querySelector(sel) { return findFirst(documentElement._children, sel); },
        querySelectorAll(sel) { const o = []; findAll(documentElement._children, sel, o); return o; },
        createElement(tag) {
            const e = makeElement();
            e.tagName = String(tag).toUpperCase();
            return e;
        },
        createTextNode(text) {
            const e = makeElement();
            e.tagName = '#text';
            e._textContent = String(text);
            return e;
        },
        addEventListener(ev, fn) { documentElement.addEventListener(ev, fn); }
    };
}

const document = makeDocument();

const errors = [];
const warnings = [];
const logs = [];

const consoleProxy = {
    log: (...a) => logs.push(['log', a]),
    info: (...a) => logs.push(['info', a]),
    warn: (...a) => warnings.push(a.map(x => x && x.message || String(x)).join(' ')),
    error: (...a) => errors.push(a.map(x => x && x.message || String(x)).join(' ')),
    debug: (...a) => logs.push(['debug', a]),
    table: () => {}
};

const localStorage = {
    _store: {},
    getItem(k) { return k in this._store ? this._store[k] : null; },
    setItem(k, v) { this._store[k] = String(v); },
    removeItem(k) { delete this._store[k]; },
    clear() { for (const k in this._store) delete this._store[k]; },
    key(i) { return Object.keys(this._store)[i] || null; },
    get length() { return Object.keys(this._store).length; }
};

const SANDBOX = {
    console: consoleProxy,
    setTimeout, clearTimeout, setInterval, clearInterval,
    Math, Date, JSON, Array, Object, Number, String, Boolean, RegExp, Error, Map, Set, Symbol, Promise, URL,
    document,
    location: { hash: '#/dashboard' },
    localStorage,
    navigator: { userAgent: 'node-smoke' },
    matchMedia: () => ({ matches: false, addEventListener: () => {} }),
    URL: { createObjectURL: () => 'blob:test', revokeObjectURL: () => {} },
    Blob: function (parts) { this.parts = parts; },
    fetch: () => Promise.reject(new Error('fetch disabled in smoke test')),
    HTMLElement: class {},
    Event: class { constructor(t) { this.type = t; } }
};
SANDBOX.window = SANDBOX;
SANDBOX.globalThis = SANDBOX;
SANDBOX.addEventListener = (ev, fn) => SANDBOX.document.documentElement.addEventListener(ev, fn);
SANDBOX.removeEventListener = SANDBOX.addEventListener;
SANDBOX.window = SANDBOX;
SANDBOX.globalThis = SANDBOX;
vm.createContext(SANDBOX);

const files = [
    'assets/icons.js',
    'assets/i18n.js',
    'assets/state.js',
    'assets/router.js',
    'assets/review.js',
    'assets/data/sources.js',
    'assets/data/content-de.js',
    'assets/data/content-en.js',
    'assets/data/content-math.js',
    'assets/data/content-grafik.js',
    'assets/data/content-extra.js',
    'assets/data/plan-template.js',
    'assets/learner.js',
    'assets/exercises/engine.js',
    'assets/exercises/sequential.js',
    'assets/exercises/multiple-choice.js',
    'assets/exercises/fill-blank.js',
    'assets/exercises/error-correction.js',
    'assets/exercises/match-pairs.js',
    'assets/exercises/sort-order.js',
    'assets/exercises/free-text.js',
    'assets/exercises/flashcards.js',
    'assets/exercises/timed-writing.js',
    'assets/exercises/math-input.js',
    'assets/exercises/cloze.js',
    'assets/exercises/mini-exam.js',
    'assets/pages/dashboard.js',
    'assets/pages/plan.js',
    'assets/pages/deutsch.js',
    'assets/pages/englisch.js',
    'assets/pages/mathematik.js',
    'assets/pages/grafik.js',
    'assets/pages/pruefung.js',
    'assets/pages/fehler.js',
    'assets/pages/notizen.js',
    'assets/pages/fortschritt.js',
    'assets/pages/profil.js',
    'assets/pages/quellen.js',
    'assets/pages/onboarding.js',
    'assets/ai.js',
    'assets/app.js'
];

let loadFailed = null;
for (const f of files) {
    const p = path.join(ROOT, f);
    const code = fs.readFileSync(p, 'utf8');
    try {
        vm.runInContext(code, SANDBOX, { filename: f });
    } catch (e) {
        loadFailed = { file: f, err: e };
        break;
    }
}
if (loadFailed) {
    console.error('LOAD FAIL:', loadFailed.file, loadFailed.err && loadFailed.err.message);
    process.exit(1);
}

// Apply extras
try {
    vm.runInContext('if (typeof ContentExtras !== "undefined" && ContentExtras.apply) ContentExtras.apply();', SANDBOX, { filename: 'inline:apply' });
} catch (e) {
    errors.push('apply extras: ' + (e && e.message));
}

// Now render each page and ensure no errors.
const routes = [
    { name: 'dashboard', title: /Dashboard/i },
    { name: 'plan', title: /Lernplan/i },
    { name: 'deutsch', title: /Deutsch/i },
    { name: 'englisch', title: /Englisch/i },
    { name: 'mathematik', title: /Mathematik/i },
    { name: 'grafik', title: /Grafik/i },
    { name: 'pruefung', title: /Pr.üfung|Klausur|Simulation/i },
    { name: 'fehler', title: /Fehler/i },
    { name: 'notizen', title: /Notizen/i },
    { name: 'fortschritt', title: /Fortschritt/i },
    { name: 'profil', title: /Profil/i },
    { name: 'quellen', title: /Quellen/i }
];

const mount = SANDBOX.document.getElementById('app') || SANDBOX.document.createElement('div');
SANDBOX.document.body.appendChild(mount);

for (const route of routes) {
    const before = errors.length;
    try {
        // Set hash and trigger route.
        SANDBOX.location.hash = '#/' + route.name;
        SANDBOX.document.body._innerHTML = '';
        SANDBOX.document.body._children = [];
        SANDBOX.document.body.appendChild(mount);
        // Render the page via Router if present, else via Pages[route.name].
        if (SANDBOX.Pages && SANDBOX.Pages[route.name]) {
            SANDBOX.Pages[route.name](mount, {});
        } else {
            errors.push('No Pages.' + route.name + ' registered');
        }
    } catch (e) {
        errors.push('Route ' + route.name + ': ' + (e && e.message));
    }
    const newErrs = errors.length - before;
    if (newErrs > 0) {
        console.log('FAIL ' + route.name + ' — ' + newErrs + ' errors');
    } else {
        console.log('OK   ' + route.name);
    }
}

// Filter known noise (e.g. app-init deprecation warnings)
const realErrors = errors.filter(e => !/Unbekannte Schema-Version|fetch is not defined/i.test(e));

console.log('\nTotal console errors: ' + realErrors.length);
if (realErrors.length > 0) {
    realErrors.forEach(e => console.log('  - ' + e));
    process.exit(1);
}
console.log('All ' + routes.length + ' routes rendered without console errors.');
process.exit(0);
