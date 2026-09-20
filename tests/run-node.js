/* Headless test runner for the FHR app. Loads modules in a sandboxed global,
   stubs localStorage/window, and reports test results. Run: node tests/run-node.js */
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ROOT = path.resolve(__dirname, '..');
const SANDBOX = {
    console,
    setTimeout, clearTimeout, setInterval, clearInterval,
    Math, Date, JSON, Array, Object, Number, String, Boolean, RegExp, Error, Map, Set, Symbol, Promise,
    document: {
        readyState: 'complete',
        addEventListener: () => {},
        documentElement: { setAttribute: () => {}, getAttribute: () => null },
        getElementById: () => null,
        querySelectorAll: () => [],
        createElement: () => ({ setAttribute: () => {}, appendChild: () => {}, addEventListener: () => {}, classList: { add: () => {}, remove: () => {} } })
    },
    location: { hash: '' },
    localStorage: makeLocalStorage(),
    navigator: { userAgent: 'node-test' },
    matchMedia: () => ({ matches: false, addEventListener: () => {} }),
    URL: { createObjectURL: () => 'blob:test', revokeObjectURL: () => {} },
    Blob: function (parts) { this.parts = parts; }
};
SANDBOX.window = SANDBOX;
vm.createContext(SANDBOX);

function makeLocalStorage() {
    const store = {};
    return {
        getItem: (k) => (k in store ? store[k] : null),
        setItem: (k, v) => { store[k] = String(v); },
        removeItem: (k) => { delete store[k]; },
        clear: () => { for (const k in store) delete store[k]; },
        key: (i) => Object.keys(store)[i] || null,
        get length() { return Object.keys(store).length; }
    };
}

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
    'INLINE:apply-extras',
    'assets/data/plan-template.js',
    'assets/learner.js',
    'assets/ai.js',
    'assets/exercises/engine.js',
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
    'assets/tests.js'
];

for (const f of files) {
    if (f.startsWith('INLINE:')) {
        const tag = f.slice(7);
        vm.runInContext('if (typeof ContentExtras !== "undefined" && ContentExtras.apply) ContentExtras.apply();', SANDBOX, { filename: tag });
        continue;
    }
    const p = path.join(ROOT, f);
    const code = fs.readFileSync(p, 'utf8');
    try {
        vm.runInContext(code, SANDBOX, { filename: f });
    } catch (e) {
        console.error('Error loading', f, e && e.message);
        process.exit(1);
    }
}

// Override tests.js assertion to also push to a sink in the sandbox.
SANDBOX.__results = [];
const origAssert = SANDBOX.TestResults;
const r = SANDBOX.TestResults || { results: [] };
console.log('\n=== TEST RESULTS ===');
const failed = r.results ? r.results.filter(x => !x.ok) : [];
r.results.forEach(x => {
    console.log((x.ok ? 'PASS' : 'FAIL') + '  ' + x.name + (x.msg ? '  — ' + x.msg : ''));
});
console.log('\n' + (r.banner || ('Passed: ' + (r.results||[]).filter(x=>x.ok).length + '/' + (r.results||[]).length)));
if (failed.length) {
    console.error('\n' + failed.length + ' tests failed.');
    process.exit(1);
}
process.exit(0);
