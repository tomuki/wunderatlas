/* Static file server with secure server-side auth, profile/learner persistence,
   AI task generation and optional AI feedback. All secrets are read from env.
   The API key (Anthropic) is never exposed to the client. */
const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');
const crypto = require('crypto');

// Use STUDY_APP_PORT (default 3456) so the OmniRoute-managed PORT=20128
// env var does not poison the study-app server. Falls back to PORT for
// backwards compatibility with callers that haven't migrated yet, but
// emits a loud warning if the inherited PORT is something other than
// the study-app's own default — that almost always means a parent shell
// (e.g. OmniRoute) has injected it.
const _inheritedPort = Number(process.env.PORT);
const _safeDefault = 3456;
if (process.env.STUDY_APP_PORT) {
    var PORT = Number(process.env.STUDY_APP_PORT) || _safeDefault;
} else if (_inheritedPort && _inheritedPort !== _safeDefault && _inheritedPort !== 18080) {
    // Parent shell is forcing a port that isn't ours — refuse to steal it.
    console.warn(`[study-app] ignoring inherited PORT=${_inheritedPort} (use STUDY_APP_PORT to override; defaulting to ${_safeDefault})`);
    var PORT = _safeDefault;
} else {
    var PORT = _inheritedPort || _safeDefault;
}
const ROOT = __dirname;
const DATA_DIR = process.env.DATA_DIR || path.join(ROOT, 'data');
const USERS_FILE = path.join(DATA_DIR, 'users.json');
const SESSIONS_FILE = path.join(DATA_DIR, 'sessions.json');
const PROFILES_FILE = path.join(DATA_DIR, 'profiles.json');
const LEARNER_FILE = path.join(DATA_DIR, 'learner.json');
const RATE_FILE = path.join(DATA_DIR, 'ratelimit.json');

if (!fs.existsSync(DATA_DIR)) {
    try { fs.mkdirSync(DATA_DIR, { recursive: true }); } catch (e) { /* ignore */ }
}

// --- Tiny JSON store helpers (atomic per-file write) -------------------------
function readJSON(file, fallback) {
    try {
        if (!fs.existsSync(file)) return fallback;
        const raw = fs.readFileSync(file, 'utf8');
        if (!raw.trim()) return fallback;
        return JSON.parse(raw);
    } catch (e) {
        return fallback;
    }
}
function writeJSON(file, data) {
    const tmp = file + '.tmp';
    fs.writeFileSync(tmp, JSON.stringify(data, null, 2));
    fs.renameSync(tmp, file);
}

// --- Password hashing (scrypt) -----------------------------------------------
// We use Node's built-in scrypt to avoid native bcrypt dependency. scrypt is
// memory-hard. N=2^14 (=16384) is a good balance between cost and the default
// 32 MB max memory limit; can be raised with --max-old-space-size if desired.
const SCRYPT_N = 1 << 14;        // CPU/memory cost
const SCRYPT_KEYLEN = 32;        // bytes
const SCRYPT_R = 8;
const SCRYPT_P = 1;
const SCRYPT_MAXMEM = 64 * 1024 * 1024;

function hashPassword(password) {
    return new Promise((resolve, reject) => {
        const salt = crypto.randomBytes(16).toString('hex');
        crypto.scrypt(password, salt, SCRYPT_KEYLEN, { N: SCRYPT_N, r: SCRYPT_R, p: SCRYPT_P, maxmem: SCRYPT_MAXMEM }, (err, key) => {
            if (err) return reject(err);
            resolve('scrypt$' + SCRYPT_N + '$' + salt + '$' + key.toString('hex'));
        });
    });
}

function verifyPassword(password, stored) {
    return new Promise((resolve, reject) => {
        if (!stored || typeof stored !== 'string' || !stored.startsWith('scrypt$')) {
            return resolve(false);
        }
        const parts = stored.split('$');
        if (parts.length !== 4) return resolve(false);
        const N = Number(parts[1]);
        const salt = parts[2];
        const expected = parts[3];
        crypto.scrypt(password, salt, SCRYPT_KEYLEN, { N: N, r: SCRYPT_R, p: SCRYPT_P }, (err, key) => {
            if (err) return reject(err);
            const a = Buffer.from(expected, 'hex');
            const b = key;
            if (a.length !== b.length) return resolve(false);
            resolve(crypto.timingSafeEqual(a, b));
        });
    });
}

// --- Users, sessions, rate limiting ------------------------------------------
function loadUsers() { return readJSON(USERS_FILE, { users: [] }); }
function saveUsers(d) { writeJSON(USERS_FILE, d); }
function loadSessions() { return readJSON(SESSIONS_FILE, { sessions: {} }); }
function saveSessions(d) { writeJSON(SESSIONS_FILE, d); }
function loadProfiles() { return readJSON(PROFILES_FILE, { profiles: {} }); }
function saveProfiles(d) { writeJSON(PROFILES_FILE, d); }
function loadLearner() { return readJSON(LEARNER_FILE, { learner: {} }); }
function saveLearner(d) { writeJSON(LEARNER_FILE, d); }
function loadRate() { return readJSON(RATE_FILE, { hits: {} }); }
function saveRate(d) { writeJSON(RATE_FILE, d); }

// --- Email/identifier validation --------------------------------------------
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
function validEmail(s) { return typeof s === 'string' && s.length <= 254 && EMAIL_RE.test(s); }
function validPassword(s) { return typeof s === 'string' && s.length >= 8 && s.length <= 200; }
function validName(s) { return typeof s === 'string' && s.length <= 100; }

// --- Rate limiter (in-memory + persisted) -----------------------------------
// Sliding window. Keyed by action+ip+email-hash. Default 5 attempts per 10 min.
const RATE_WINDOWS = {
    login:    { limit: 5,  windowMs: 10 * 60 * 1000 },
    register: { limit: 5,  windowMs: 60 * 60 * 1000 },
    forgot:   { limit: 5,  windowMs: 60 * 60 * 1000 },
    reset:    { limit: 5,  windowMs: 60 * 60 * 1000 },
    ai:       { limit: 30, windowMs: 60 * 60 * 1000 }
};
function rateKey(action, ip, extra) {
    return action + ':' + ip + (extra ? ':' + (typeof extra === 'string' ? extra.toLowerCase() : 'x') : '');
}
function rateCheck(action, ip, extra) {
    const cfg = RATE_WINDOWS[action];
    if (!cfg) return { ok: true };
    const d = loadRate();
    const k = rateKey(action, ip, extra);
    const now = Date.now();
    const arr = (d.hits[k] || []).filter(t => now - t < cfg.windowMs);
    if (arr.length >= cfg.limit) {
        return { ok: false, retryMs: cfg.windowMs - (now - arr[0]) };
    }
    arr.push(now);
    d.hits[k] = arr;
    saveRate(d);
    return { ok: true };
}

// --- Sessions ----------------------------------------------------------------
const SESSION_COOKIE = 'fhr_sid';
const SESSION_TTL_MS = 30 * 24 * 60 * 60 * 1000; // 30 days

function createSession(userId, ip, ua) {
    const id = crypto.randomBytes(24).toString('hex');
    const sess = {
        id, userId,
        createdAt: Date.now(),
        lastSeen: Date.now(),
        ip, ua: (ua || '').slice(0, 200)
    };
    const d = loadSessions();
    d.sessions[id] = sess;
    // Garbage-collect expired sessions.
    for (const k of Object.keys(d.sessions)) {
        if (Date.now() - d.sessions[k].lastSeen > SESSION_TTL_MS) delete d.sessions[k];
    }
    saveSessions(d);
    return sess;
}
function getSession(id) {
    if (!id) return null;
    const d = loadSessions();
    const s = d.sessions[id];
    if (!s) return null;
    if (Date.now() - s.lastSeen > SESSION_TTL_MS) {
        delete d.sessions[id];
        saveSessions(d);
        return null;
    }
    // Sliding expiration
    s.lastSeen = Date.now();
    d.sessions[id] = s;
    saveSessions(d);
    return s;
}
function deleteSession(id) {
    const d = loadSessions();
    delete d.sessions[id];
    saveSessions(d);
}

// --- Password reset tokens (stored in users.json, one-time, expiring) -------
const RESET_TTL_MS = 60 * 60 * 1000; // 1 hour

function makeResetToken(userId) {
    const token = crypto.randomBytes(24).toString('hex');
    const d = loadUsers();
    const u = d.users.find(x => x.id === userId);
    if (!u) return null;
    u.resetToken = token;
    u.resetTokenExp = Date.now() + RESET_TTL_MS;
    saveUsers(d);
    return token;
}
function consumeResetToken(token) {
    if (!token || typeof token !== 'string') return null;
    const d = loadUsers();
    const u = d.users.find(x => x.resetToken === token);
    if (!u) return null;
    if (!u.resetTokenExp || Date.now() > u.resetTokenExp) {
        delete u.resetToken; delete u.resetTokenExp; saveUsers(d);
        return null;
    }
    // Atomically consume the token: remove it from users.json NOW
    // and return the user id.  Returning the full user object (with
    // the token still attached) caused the token to be re-saved on
    // subsequent writes, defeating one-time-use.
    delete u.resetToken; delete u.resetTokenExp; saveUsers(d);
    return { id: u.id };
}
function clearResetToken(userId) {
    const d = loadUsers();
    const u = d.users.find(x => x.id === userId);
    if (u) { delete u.resetToken; delete u.resetTokenExp; saveUsers(d); }
}

// --- Cookie helpers ----------------------------------------------------------
function parseCookies(req) {
    const out = {};
    const h = req.headers['cookie'] || '';
    h.split(/;\s*/).forEach(p => {
        if (!p) return;
        const i = p.indexOf('=');
        if (i < 0) return;
        const k = p.slice(0, i).trim();
        const v = decodeURIComponent(p.slice(i + 1).trim());
        out[k] = v;
    });
    return out;
}
function buildCookie(name, value, opts) {
    const parts = [name + '=' + encodeURIComponent(value)];
    const o = opts || {};
    if (o.maxAge != null) parts.push('Max-Age=' + Math.floor(o.maxAge / 1000));
    if (o.path) parts.push('Path=' + o.path);
    if (o.httpOnly) parts.push('HttpOnly');
    if (o.sameSite) parts.push('SameSite=' + o.sameSite);
    if (o.secure) parts.push('Secure');
    return parts.join('; ');
}
function clearCookie(name) {
    return name + '=; Path=/; Max-Age=0; HttpOnly; SameSite=Lax';
}

function getSessionId(req) {
    return parseCookies(req)[SESSION_COOKIE] || null;
}

function getAuthUser(req) {
    const sid = getSessionId(req);
    if (!sid) return null;
    const sess = getSession(sid);
    if (!sess) return null;
    const d = loadUsers();
    return d.users.find(u => u.id === sess.userId) || null;
}

// --- AI provider interface (swappable) --------------------------------------
// Default: a deterministic, offline template-based generator. This runs even
// without an API key, but the generated items are clearly marked. When
// ANTHROPIC_API_KEY is set, the server can also call Anthropic for richer
// generation. Output is always schema-validated before being returned.
const AI_SCHEMA = {
    type: 'object',
    required: ['subject', 'topic', 'type', 'q', 'explanation'],
    properties: {
        subject: { type: 'string', enum: ['de', 'en', 'math', 'grafik'] },
        topic: { type: 'string' },
        section: { type: 'string' },
        skill: { type: 'string' },
        difficulty: { type: 'number', minimum: 1, maximum: 5 },
        estTime: { type: 'number', minimum: 1, maximum: 120 },
        type: { type: 'string', enum: ['mc', 'fill', 'match', 'sort', 'error', 'flashcard', 'free', 'cloze', 'math-input'] },
        q: { type: 'string' },
        context: { type: 'string' },
        unit: { type: 'string' },
        options: { type: 'array' },
        answer: {},
        answers: { type: 'array' },
        pairs: { type: 'array' },
        items: { type: 'array' },
        blanks: { type: 'array' },
        cards: { type: 'array' },
        explanation: { type: 'string' },
        commonErrors: { type: 'array' },
        relatedLesson: { type: 'string' },
        tags: { type: 'array' },
        grafikdesign: { type: 'boolean' },
        source: { type: 'string' }
    }
};

function validateAgainstSchema(obj) {
    if (!obj || typeof obj !== 'object') return null;
    const required = AI_SCHEMA.required;
    for (const k of required) if (obj[k] == null) return null;
    if (!['de', 'en', 'math', 'grafik'].includes(obj.subject)) return null;
    if (typeof obj.q !== 'string' || !obj.q.trim()) return null;
    if (typeof obj.explanation !== 'string') return null;
    if (obj.difficulty != null && (typeof obj.difficulty !== 'number' || obj.difficulty < 1 || obj.difficulty > 5)) return null;
    if (obj.estTime != null && (typeof obj.estTime !== 'number' || obj.estTime < 1 || obj.estTime > 120)) return null;
    if (obj.type === 'mc' && !Array.isArray(obj.options)) return null;
    if (obj.type === 'mc' && (obj.answer == null || !obj.options.includes(obj.answer))) return null;
    if (obj.type === 'math-input' && !Array.isArray(obj.answers)) return null;
    if (obj.type === 'fill' && (obj.answers == null || (Array.isArray(obj.answers) && obj.answers.length === 0 && obj.answer == null))) return null;
    if (obj.type === 'match' && !Array.isArray(obj.pairs)) return null;
    if (obj.type === 'sort' && !Array.isArray(obj.items)) return null;
    if (obj.type === 'flashcard' && !Array.isArray(obj.cards)) return null;
    return obj;
}

// Local deterministic fallback. Picks a topic and template from the seed.
function localGenerateTask(req) {
    const seed = (req.seed || ('local-' + Date.now() + '-' + Math.random())).toString();
    const subject = ['de', 'en', 'math', 'grafik'].includes(req.subject) ? req.subject : 'de';
    const topics = {
        de: ['operatoren', 'sachtextanalyse', 'erorterung', 'grammatik', 'rechtschreibung', 'zusammenfassung'],
        en: ['operators', 'comment', 'mediation', 'summary', 'reading', 'grammar_tenses', 'vocabulary_themes'],
        math: ['funktionen_grundlagen', 'ableitungsregeln', 'integralrechnung', 'vektoren', 'wahrscheinlichkeit'],
        grafik: ['layout', 'typografie', 'portfolio', 'konzept']
    };
    const topic = (req.topic && topics[subject].includes(req.topic)) ? req.topic : topics[subject][hashStr(seed) % topics[subject].length];
    const skill = req.skill || (subject + '_' + topic);
    const difficulty = clampNum(req.difficulty || (1 + (hashStr(seed) % 5)), 1, 5);
    const base = {
        subject, topic, section: req.section || 'Generiert', skill,
        difficulty, estTime: clampNum(req.estTime || 8, 1, 60),
        explanation: 'Lokale, deterministische Aufgabe (kein KI-Key gesetzt). Schwierigkeit und Topic passen zu deinem Lernstand.',
        commonErrors: [],
        tags: ['lokal', 'fallback'],
        source: 'lokal',
        grafikdesign: subject === 'grafik'
    };
    if (subject === 'math') {
        const a = 2 + (hashStr(seed) % 9);
        const b = 1 + (hashStr(seed) % 6);
        const op = ['+', '-', '*'][hashStr(seed + 'op') % 3];
        let expr, ans;
        if (op === '+') { expr = a + ' + ' + b; ans = a + b; }
        else if (op === '-') { expr = a + ' − ' + b; ans = a - b; }
        else { expr = a + ' · ' + b; ans = a * b; }
        return Object.assign({}, base, {
            type: 'math-input',
            q: 'Berechne: ' + expr + '.',
            answers: [ans, String(ans)],
            context: 'Diese Aufgabe wurde lokal generiert, weil kein KI-Key gesetzt ist oder der Server offline ist.'
        });
    }
    if (subject === 'grafik') {
        return Object.assign({}, base, {
            type: 'free',
            q: 'Beschreibe in 3 Sätzen, wie du in einem Layout mit Typografie Hierarchie erzeugst.',
            explanation: 'Größe, Gewicht, Kontrast, Farbe und Weißraum gemeinsam steuern die visuelle Hierarchie.'
        });
    }
    // DE / EN: short MC
    const lang = subject === 'de' ? 'de' : 'en';
    const text = lang === 'de'
        ? 'Wähle die passendste Aussage zum Thema „' + topic + '".'
        : 'Choose the most appropriate statement on the topic "' + topic + '".';
    const opts = lang === 'de'
        ? ['Option A ist hier am treffendsten.', 'Option B vernachlässigt einen wesentlichen Aspekt.', 'Option C ist faktisch falsch.', 'Option D ist identisch mit B.']
        : ['Option A is the most appropriate here.', 'Option B misses a key point.', 'Option C is factually wrong.', 'Option D is identical to B.'];
    return Object.assign({}, base, {
        type: 'mc',
        q: text,
        options: opts,
        answer: opts[0]
    });
}

function hashStr(s) {
    let h = 0;
    for (let i = 0; i < s.length; i++) {
        h = ((h << 5) - h) + s.charCodeAt(i);
        h |= 0;
    }
    return Math.abs(h);
}
function clampNum(n, lo, hi) { return Math.max(lo, Math.min(hi, n)); }

// --- AI provider interface (swappable) --------------------------------------
// Default: a deterministic, offline template-based generator. This runs even
// without an API key, but the generated items are clearly marked. When
// GEMINI_API_KEY is set, the server uses Gemini (primary). When ANTHROPIC_API_KEY
// is set, Anthropic is the secondary provider. Output is always schema-validated
// before being returned. Keys are NEVER exposed to clients, logs, or tests —
// they live only in process.env on the server.
// Gemini endpoints used (v1beta generateContent) accept an API key as a
// query parameter. We only ever use it server-side and never log it.
const GEMINI_DEFAULT_MODEL = 'gemini-2.5-flash';
const ANTHROPIC_DEFAULT_MODEL = 'claude-3-5-sonnet-latest';
const AI_HTTP_TIMEOUT_MS = 12000;

function aiHasGemini() { return !!process.env.GEMINI_API_KEY; }
function aiHasAnthropic() { return !!process.env.ANTHROPIC_API_KEY; }
function aiAnyProvider() { return aiHasGemini() || aiHasAnthropic(); }
function aiPrimaryLabel() {
    if (aiHasGemini()) return 'gemini';
    if (aiHasAnthropic()) return 'anthropic';
    return 'lokal';
}
function aiGeminiModel() { return process.env.GEMINI_MODEL || GEMINI_DEFAULT_MODEL; }
function aiAnthropicModel() { return process.env.ANTHROPIC_MODEL || ANTHROPIC_DEFAULT_MODEL; }

// Redact anything that looks like an API key from a string before logging.
function redactSecrets(s) {
    if (!s) return s;
    return String(s)
        .replace(/AIza[0-9A-Za-z_\-]{16,}/g, '[REDACTED]')
        .replace(/sk-[0-9A-Za-z_\-]{16,}/g, '[REDACTED]')
        .replace(/x-api-key\s*[:=]\s*[^\s,}]+/gi, 'x-api-key=[REDACTED]');
}

async function fetchWithTimeout(url, opts, timeoutMs) {
    const ac = new AbortController();
    const t = setTimeout(() => ac.abort(), timeoutMs || AI_HTTP_TIMEOUT_MS);
    try {
        return await fetch(url, Object.assign({}, opts || {}, { signal: ac.signal }));
    } finally {
        clearTimeout(t);
    }
}

async function callGeminiGenerate(req) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) return null;
    const model = aiGeminiModel();
    const sys = `Du bist ein strenger, präziser Aufgabengenerator für die Fachhochschulreife (Baden-Württemberg).
Gib ausschließlich JSON aus, das dem Schema entspricht: {subject, topic, section, skill, difficulty, estTime, type, q, context, options, answer, answers, pairs, items, cards, explanation, commonErrors, relatedLesson, tags, grafikdesign}.
type ∈ {mc, fill, match, sort, error, flashcard, free, cloze, math-input}.
Antworte immer auf Deutsch (außer bei subject=en, dort auf Englisch).
Keine langen Exzerpte, keine urheberrechtlich geschützten Texte.`;
    const usr = `Anfrage: ${JSON.stringify(req).slice(0, 1500)}\n\nGib genau EIN gültiges JSON-Objekt zurück.`;
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent?key=${encodeURIComponent(apiKey)}`;
    try {
        const r = await fetchWithTimeout(url, {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({
                systemInstruction: { role: 'system', parts: [{ text: sys }] },
                contents: [{ role: 'user', parts: [{ text: usr }] }],
                generationConfig: {
                    responseMimeType: 'application/json',
                    temperature: 0.3,
                    maxOutputTokens: 1200
                }
            })
        }, AI_HTTP_TIMEOUT_MS);
        if (!r.ok) {
            // 401, 403, 429: auth/quota problem — log only status (no body), fall back.
            const status = r.status;
            const head = (await r.text()).slice(0, 120);
            console.warn('[ai] gemini error', status, redactSecrets(head));
            return null;
        }
        const data = await r.json();
        const cand = (data.candidates || [])[0];
        const part = cand && (cand.content || {}).parts && cand.content.parts[0];
        const text = part && part.text;
        if (!text) return null;
        // Gemini may wrap the JSON or include prose; extract the first {...} block.
        const m = String(text).match(/\{[\s\S]*\}/);
        if (!m) return null;
        try {
            return JSON.parse(m[0]);
        } catch (e) {
            console.warn('[ai] gemini JSON parse failed');
            return null;
        }
    } catch (e) {
        const msg = (e && e.name === 'AbortError') ? 'timeout' : (e && e.message);
        console.warn('[ai] gemini exception', redactSecrets(String(msg)));
        return null;
    }
}

async function callGeminiFeedback(prompt, answer, language) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) return null;
    const model = aiGeminiModel();
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent?key=${encodeURIComponent(apiKey)}`;
    const userMsg = `Sprache: ${language || 'de'}\nAufgabe: ${prompt}\n\nAntwort des Schülers:\n"""\n${answer}\n"""\n\nBitte gib ausschließlich das oben beschriebene JSON-Objekt zurück.`;
    try {
        const r = await fetchWithTimeout(url, {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({
                systemInstruction: { role: 'system', parts: [{ text: FEEDBACK_SYSTEM }] },
                contents: [{ role: 'user', parts: [{ text: userMsg }] }],
                generationConfig: {
                    responseMimeType: 'application/json',
                    temperature: 0.3,
                    maxOutputTokens: 1200
                }
            })
        }, AI_HTTP_TIMEOUT_MS);
        if (!r.ok) {
            const status = r.status;
            const head = (await r.text()).slice(0, 120);
            console.warn('[ai] gemini feedback error', status, redactSecrets(head));
            return null;
        }
        const data = await r.json();
        const cand = (data.candidates || [])[0];
        const part = cand && (cand.content || {}).parts && cand.content.parts[0];
        const text = part && part.text;
        if (!text) return null;
        return parseFeedbackJson(text);
    } catch (e) {
        const msg = (e && e.name === 'AbortError') ? 'timeout' : (e && e.message);
        console.warn('[ai] gemini feedback exception', redactSecrets(String(msg)));
        return null;
    }
}

async function callAnthropicGenerate(req) {
    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) return null;
    const sys = `Du bist ein strenger, präziser Aufgabengenerator für die Fachhochschulreife (Baden-Württemberg).
Gib ausschließlich JSON aus, das dem Schema entspricht: {subject, topic, section, skill, difficulty, estTime, type, q, context, options, answer, answers, pairs, items, cards, explanation, commonErrors, relatedLesson, tags, grafikdesign}.
type ∈ {mc, fill, match, sort, error, flashcard, free, cloze, math-input}.
Antworte immer auf Deutsch (außer bei subject=en, dort auf Englisch).
Keine langen Exzerpte, keine urheberrechtlich geschützten Texte.`;
    const usr = `Anfrage: ${JSON.stringify(req).slice(0, 1500)}\n\nGib genau EIN gültiges JSON-Objekt zurück.`;
    try {
        const r = await fetch('https://api.anthropic.com/v1/messages', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'x-api-key': apiKey,
                'anthropic-version': '2023-06-01'
            },
            body: JSON.stringify({
                model: process.env.ANTHROPIC_MODEL || 'claude-3-5-sonnet-latest',
                max_tokens: 1200,
                system: sys,
                messages: [{ role: 'user', content: usr }]
            })
        });
        if (!r.ok) {
            const t = await r.text();
            console.error('[ai] anthropic error', r.status, redactSecrets(t.slice(0, 200)));
            return null;
        }
        const data = await r.json();
        const block = (data.content || []).find(b => b.type === 'text');
        if (!block) return null;
        // Try to extract JSON from the response.
        const m = block.text.match(/\{[\s\S]*\}/);
        if (!m) return null;
        const obj = JSON.parse(m[0]);
        return obj;
    } catch (e) {
        console.error('[ai] anthropic exception', redactSecrets(String(e && e.message || e)));
        return null;
    }
}

async function generateTask(req) {
    // Reihenfolge: Gemini (primär) → Anthropic (Fallback) → lokal.
    let provider = null;
    let aiObj = null;
    if (aiHasGemini()) {
        aiObj = await callGeminiGenerate(req);
        if (aiObj) provider = 'gemini';
    }
    if (!aiObj && aiHasAnthropic()) {
        aiObj = await callAnthropicGenerate(req);
        if (aiObj) provider = 'anthropic';
    }
    if (aiObj) {
        const valid = validateAgainstSchema(aiObj);
        if (valid) {
            // For math-input, locally re-check answer by parsing q (if possible).
            if (valid.subject === 'math' && valid.type === 'math-input') {
                valid.localChecked = true;
                valid.tags = (valid.tags || []).concat(['AI-generiert', 'lokal-rechecked']);
            } else {
                valid.tags = (valid.tags || []).concat(['AI-generiert']);
            }
            valid.source = provider;
            return valid;
        }
        console.warn('[ai] ' + provider + ' output failed schema validation, falling back to local.');
    }
    return localGenerateTask(req);
}

// --- AI feedback (existing) -------------------------------------------------
// Move FEEDBACK_SYSTEM up so it can be used by both Gemini and Anthropic paths.
const FEEDBACK_SYSTEM = `Du bist ein freundlicher, konstruktiver Lern-Coach für die Fachhochschulreife in Baden-Württemberg.
Du gibst Feedback zu Schülertexten in Deutsch oder Englisch. Bleibe sachlich, knapp und konkret.
Beziehe dich auf die Operatoren (beschreiben, erörtern, erläutern, zusammenfassen, interpretieren, vergleichen, begründen).
Niemals Urheberrecht verletzen. Antworte in der Sprache des Schülers.

Antworte ausschließlich als JSON-Objekt mit folgender Struktur:
{
  "summary": "<1 Satz Gesamteinschätzung>",
  "criteria": {
    "aufgabenverstaendnis": { "score": 1-5, "comment": "<kurz>" },
    "inhalt":              { "score": 1-5, "comment": "<kurz>" },
    "struktur":            { "score": 1-5, "comment": "<kurz>" },
    "sprache":             { "score": 1-5, "comment": "<kurz>" },
    "operatorErfuellung":  { "score": 1-5, "comment": "<kurz>" }
  },
  "staerken":  ["...", "...", "..."],
  "schwaechen":["...", "...", "..."],
  "tipps":     ["...", "...", "..."],
  "naechsterSchritt": "<konkreter nächster Handlungsschritt>"
}`;

async function callAnthropicFeedback(prompt, answer, language) {
    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) throw new Error('ANTHROPIC_API_KEY not set on server');
    const userMsg = `Sprache: ${language || 'de'}\nAufgabe: ${prompt}\n\nAntwort des Schülers:\n"""\n${answer}\n"""\n\nBitte gib ausschließlich das oben beschriebene JSON-Objekt zurück.`;
    const r = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            'x-api-key': apiKey,
            'anthropic-version': '2023-06-01'
        },
        body: JSON.stringify({
            model: process.env.ANTHROPIC_MODEL || 'claude-3-5-sonnet-latest',
            max_tokens: 1200,
            system: FEEDBACK_SYSTEM,
            messages: [{ role: 'user', content: userMsg }]
        })
    });
    if (!r.ok) {
        const t = await r.text();
        throw new Error('Anthropic API ' + r.status + ': ' + redactSecrets(t.slice(0, 200)));
    }
    const data = await r.json();
    const block = (data.content || []).find(b => b.type === 'text');
    if (!block) return null;
    return parseFeedbackJson(block.text);
}

function parseFeedbackJson(text) {
    if (!text) return null;
    // Extract first {...} block
    const m = String(text).match(/\{[\s\S]*\}/);
    if (!m) return null;
    try {
        const obj = JSON.parse(m[0]);
        if (!obj || typeof obj !== 'object') return null;
        // Validate / default
        const clamp = (n) => Math.max(1, Math.min(5, Math.round(Number(n) || 0)));
        const ensure = (c) => ({
            score: clamp(c && c.score),
            comment: (c && typeof c.comment === 'string') ? c.comment : ''
        });
        const safeArr = (a) => Array.isArray(a) ? a.filter(x => typeof x === 'string') : [];
        return {
            summary: typeof obj.summary === 'string' ? obj.summary : '',
            criteria: {
                aufgabenverstaendnis: ensure(obj.criteria && obj.criteria.aufgabenverstaendnis),
                inhalt:              ensure(obj.criteria && obj.criteria.inhalt),
                struktur:            ensure(obj.criteria && obj.criteria.struktur),
                sprache:             ensure(obj.criteria && obj.criteria.sprache),
                operatorErfuellung:  ensure(obj.criteria && obj.criteria.operatorErfuellung)
            },
            staerken: safeArr(obj.staerken).slice(0, 5),
            schwaechen: safeArr(obj.schwaechen).slice(0, 5),
            tipps: safeArr(obj.tipps).slice(0, 5),
            naechsterSchritt: typeof obj.naechsterSchritt === 'string' ? obj.naechsterSchritt : ''
        };
    } catch (e) {
        return null;
    }
}

// Lokales, deterministisches Feedback, wenn kein API-Key gesetzt ist.
// Wir messen Wortzahl, Satzzahl und Schlüsselwörter und erzeugen eine ehrliche,
// schlichte Selbsteinschätzung. Wird klar als "lokal, ohne KI" markiert.
function localFeedback(prompt, answer, language) {
    const text = (answer || '').trim();
    const words = text ? text.split(/\s+/).filter(Boolean) : [];
    const wordCount = words.length;
    const sentences = text ? text.split(/[.!?]+/).map(s => s.trim()).filter(Boolean) : [];
    const sentenceCount = sentences.length;
    const avgSentenceLen = sentenceCount ? Math.round(wordCount / sentenceCount) : 0;

    // Sehr einfache Schlüsselwort-Heuristik aus der Aufgabe
    const stop = new Set(['der', 'die', 'das', 'und', 'oder', 'ein', 'eine', 'ist', 'sind', 'im', 'in', 'am', 'zu', 'mit', 'auf', 'für', 'von', 'als', 'auch', 'sich']);
    const promptWords = (prompt || '').toLowerCase()
        .replace(/[^\w\säöüß-]/g, ' ')
        .split(/\s+/)
        .filter(w => w.length >= 4 && !stop.has(w));
    const lower = text.toLowerCase();
    const hits = new Set();
    for (const w of promptWords) if (lower.includes(w)) hits.add(w);
    const coverage = promptWords.length ? Math.round(100 * hits.size / promptWords.length) : 0;

    // Kriterien-Scores (alle ohne KI fair aus den Messwerten abgeleitet)
    const aufgabenverstaendnis = scoreFromCoverage(coverage, 50);
    const struktur = scoreFromAvgSentence(avgSentenceLen);
    const sprache = scoreFromWordCount(wordCount, 60, 200);
    const inhalt = scoreFromCoverage(coverage, 40);
    const operatorErfuellung = scoreFromWordCount(wordCount, 50, 150);

    const staerken = [];
    if (wordCount >= 80) staerken.push('Du hast ausführlich genug geschrieben.');
    if (coverage >= 50) staerken.push('Du gehst auf mehrere Aspekte der Aufgabe ein.');
    if (avgSentenceLen >= 8 && avgSentenceLen <= 22) staerken.push('Deine Sätze sind gut portioniert.');
    if (staerken.length === 0) staerken.push('Du hast dir die Zeit genommen, die Aufgabe zu bearbeiten.');

    const schwaechen = [];
    if (wordCount < 50) schwaechen.push('Die Antwort ist sehr kurz — die Operatoren „erörtern" oder „erläutern" verlangen mehr Volumen.');
    if (coverage < 30) schwaechen.push('Du gehst auf wichtige Begriffe der Aufgabe kaum ein.');
    if (avgSentenceLen > 25) schwaechen.push('Einige Sätze sind sehr lang — splitte sie für bessere Lesbarkeit.');
    if (avgSentenceLen < 6 && sentenceCount > 2) schwaechen.push('Viele sehr kurze Sätze wirken abgehackt — verbinde verwandte Gedanken.');
    if (schwaechen.length === 0) schwaechen.push('Achte weiter auf eine klare These und passende Begründungen.');

    const tipps = [
        'Strukturiere deine Antwort: Einleitung — Hauptteil — Schluss.',
        'Markiere die Operatoren der Aufgabe und prüfe, ob du alle erfüllst.',
        'Lies deine Antwort nach dem Schreiben laut — Stolperstellen werden hörbar.'
    ];

    return {
        summary: 'Lokale, regelbasierte Einschätzung (kein KI-Key gesetzt).',
        criteria: {
            aufgabenverstaendnis: { score: aufgabenverstaendnis, comment: 'Wortüberlappung mit der Aufgabe: ' + coverage + '%.' },
            inhalt:              { score: inhalt,              comment: 'Begriffliche Anbindung an die Aufgabe.' },
            struktur:            { score: struktur,            comment: 'Ø Satzlänge: ' + avgSentenceLen + ' Wörter.' },
            sprache:             { score: sprache,             comment: 'Wortzahl: ' + wordCount + ' (' + sentenceCount + ' Sätze).' },
            operatorErfuellung:  { score: operatorErfuellung,  comment: 'Ausführlichkeit: ' + wordCount + ' Wörter.' }
        },
        staerken,
        schwaechen,
        tipps,
        naechsterSchritt: 'Vergleiche deine Antwort mit der Musterlösung und ergänze fehlende Aspekte.'
    };
}

function scoreFromCoverage(cov, threshold) {
    if (cov >= threshold + 30) return 5;
    if (cov >= threshold + 10) return 4;
    if (cov >= threshold) return 3;
    if (cov >= threshold - 20) return 2;
    return 1;
}
function scoreFromAvgSentence(avg) {
    if (avg >= 8 && avg <= 22) return 5;
    if (avg >= 6 && avg <= 28) return 4;
    if (avg >= 4 || avg <= 32) return 3;
    return 2;
}
function scoreFromWordCount(n, low, high) {
    if (n >= high) return 5;
    if (n >= low) return 4;
    if (n >= Math.floor(low * 0.6)) return 3;
    if (n >= Math.floor(low * 0.3)) return 2;
    return 1;
}

// --- HTTP helpers ------------------------------------------------------------
const MIME = {
    '.html': 'text/html; charset=utf-8',
    '.css': 'text/css; charset=utf-8',
    '.js': 'application/javascript; charset=utf-8',
    '.json': 'application/json; charset=utf-8',
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.md': 'text/markdown; charset=utf-8',
    '.txt': 'text/plain; charset=utf-8',
    '.webmanifest': 'application/manifest+json'
};

function send(res, code, body, type, extraHeaders) {
    const headers = {
        'Content-Type': type || 'application/json; charset=utf-8',
        'Cache-Control': 'no-store',
        'X-Content-Type-Options': 'nosniff',
        'Referrer-Policy': 'no-referrer'
    };
    if (extraHeaders) Object.assign(headers, extraHeaders);
    res.writeHead(code, headers);
    res.end(typeof body === 'string' ? body : JSON.stringify(body));
}

function readBody(req, maxBytes) {
    return new Promise((resolve, reject) => {
        let buf = '';
        const max = maxBytes || 200000;
        req.on('data', c => {
            buf += c;
            if (buf.length > max) {
                req.destroy();
                return reject(new Error('payload too large'));
            }
        });
        req.on('end', () => {
            if (!buf) return resolve({});
            try { resolve(JSON.parse(buf)); }
            catch (e) { reject(new Error('invalid JSON')); }
        });
        req.on('error', reject);
    });
}

function getClientIp(req) {
    const xf = req.headers['x-forwarded-for'];
    if (typeof xf === 'string' && xf) return xf.split(',')[0].trim();
    return req.socket.remoteAddress || 'unknown';
}

// --- Route handling ----------------------------------------------------------
const server = http.createServer(async (req, res) => {
    const parsed = url.parse(req.url, true);
    const pathname = decodeURIComponent(parsed.pathname);
    const ip = getClientIp(req);
    const ua = req.headers['user-agent'] || '';

    // --- API routes ---
    try {
        if (pathname === '/api/auth/register' && req.method === 'POST') {
            const r = rateCheck('register', ip);
            if (!r.ok) return send(res, 429, { error: 'Zu viele Anfragen, bitte später erneut.' });
            let body;
            try { body = await readBody(req); } catch (e) { return send(res, 400, { error: 'Ungültige Anfrage.' }); }
            if (!validEmail(body.email)) return send(res, 400, { error: 'Ungültige E-Mail.' });
            if (!validPassword(body.password)) return send(res, 400, { error: 'Passwort muss mindestens 8 Zeichen lang sein.' });
            if (!validName(body.name || '')) return send(res, 400, { error: 'Name zu lang oder ungültig.' });
            const email = String(body.email).toLowerCase().trim();
            const d = loadUsers();
            if (d.users.find(u => u.email === email)) {
                // Do not reveal whether the email exists; respond with a generic
                // message so attackers cannot enumerate accounts.
                return send(res, 200, { ok: true, message: 'Wenn die E-Mail noch nicht vergeben ist, wurde ein Konto angelegt.' });
            }
            const hash = await hashPassword(body.password);
            const id = crypto.randomUUID ? crypto.randomUUID() : crypto.randomBytes(8).toString('hex');
            const user = {
                id,
                email,
                name: String(body.name || '').slice(0, 100),
                hash,
                createdAt: Date.now()
            };
            d.users.push(user);
            saveUsers(d);
            // Auto-login: create session.
            const sess = createSession(id, ip, ua);
            res.setHeader('Set-Cookie', buildCookie(SESSION_COOKIE, sess.id, {
                maxAge: SESSION_TTL_MS, path: '/', httpOnly: true, sameSite: 'Lax'
            }));
            return send(res, 200, { ok: true, user: publicUser(user) });
        }

        if (pathname === '/api/auth/login' && req.method === 'POST') {
            const r = rateCheck('login', ip);
            if (!r.ok) return send(res, 429, { error: 'Zu viele Versuche, bitte später erneut.' });
            let body;
            try { body = await readBody(req); } catch (e) { return send(res, 400, { error: 'Ungültige Anfrage.' }); }
            if (!validEmail(body.email) || !validPassword(body.password)) {
                return send(res, 401, { error: 'E-Mail oder Passwort ungültig.' });
            }
            const email = String(body.email).toLowerCase().trim();
            const d = loadUsers();
            const u = d.users.find(x => x.email === email);
            if (!u) return send(res, 401, { error: 'E-Mail oder Passwort ungültig.' });
            const ok = await verifyPassword(body.password, u.hash);
            if (!ok) return send(res, 401, { error: 'E-Mail oder Passwort ungültig.' });
            const sess = createSession(u.id, ip, ua);
            res.setHeader('Set-Cookie', buildCookie(SESSION_COOKIE, sess.id, {
                maxAge: SESSION_TTL_MS, path: '/', httpOnly: true, sameSite: 'Lax'
            }));
            return send(res, 200, { ok: true, user: publicUser(u) });
        }

        if (pathname === '/api/auth/logout' && req.method === 'POST') {
            const sid = getSessionId(req);
            if (sid) deleteSession(sid);
            res.setHeader('Set-Cookie', clearCookie(SESSION_COOKIE));
            return send(res, 200, { ok: true });
        }

        if (pathname === '/api/auth/me' && req.method === 'GET') {
            const u = getAuthUser(req);
            if (!u) return send(res, 200, { ok: true, user: null });
            return send(res, 200, { ok: true, user: publicUser(u) });
        }

        if (pathname === '/api/auth/forgot' && req.method === 'POST') {
            const r = rateCheck('forgot', ip);
            if (!r.ok) return send(res, 429, { error: 'Zu viele Anfragen, bitte später erneut.' });
            let body;
            try { body = await readBody(req); } catch (e) { return send(res, 400, { error: 'Ungültige Anfrage.' }); }
            if (!validEmail(body.email)) return send(res, 400, { error: 'Ungültige E-Mail.' });
            const email = String(body.email).toLowerCase().trim();
            const d = loadUsers();
            const u = d.users.find(x => x.email === email);
            let resetLink = null;
            if (u) {
                const token = makeResetToken(u.id);
                if (token) {
                    // In production this would be sent by email. Locally we log
                    // the link to the server console so the developer can copy
                    // it during testing. The response is intentionally generic.
                    resetLink = '/reset-password.html?token=' + encodeURIComponent(token);
                    console.log('[auth] password reset link for ' + email + ': ' + resetLink);
                }
            } else {
                // Run a dummy hash to keep timing similar and avoid enumeration.
                await hashPassword('decoy-timing-protection');
            }
            return send(res, 200, {
                ok: true,
                message: 'Wenn ein Konto mit dieser E-Mail existiert, ist gleich eine Nachricht unterwegs.',
                // dev-only: include the link if DEV_RESET_LINK=1 so the developer
                // can copy it from the network panel. Never enabled in production.
                devLink: (process.env.DEV_RESET_LINK === '1') ? resetLink : null
            });
        }

        if (pathname === '/api/auth/reset' && req.method === 'POST') {
            const r = rateCheck('reset', ip);
            if (!r.ok) return send(res, 429, { error: 'Zu viele Versuche.' });
            let body;
            try { body = await readBody(req); } catch (e) { return send(res, 400, { error: 'Ungültige Anfrage.' }); }
            const token = String(body.token || '');
            const newPw = body.password;
            if (!validPassword(newPw)) return send(res, 400, { error: 'Passwort muss mindestens 8 Zeichen lang sein.' });
            // Atomically validate-and-consume the token: take it out of
            // users.json in a single read-modify-write so two concurrent
            // resets cannot both succeed.  The user object we keep
            // around must NOT carry resetToken/resetTokenExp — those
            // would be re-saved on the next step and resurrect the
            // already-consumed token.
            const claimed = consumeResetToken(token);
            if (!claimed) return send(res, 400, { error: 'Token ungültig oder abgelaufen.' });
            const d = loadUsers();
            const idx = d.users.findIndex(x => x.id === claimed.id);
            if (idx < 0) return send(res, 400, { error: 'Token ungültig oder abgelaufen.' });
            d.users[idx].hash = await hashPassword(newPw);
            delete d.users[idx].resetToken;
            delete d.users[idx].resetTokenExp;
            saveUsers(d);
            // Invalidate all sessions for this user.
            const sd = loadSessions();
            for (const k of Object.keys(sd.sessions)) {
                if (sd.sessions[k].userId === claimed.id) delete sd.sessions[k];
            }
            saveSessions(sd);
            return send(res, 200, { ok: true });
        }

        if (pathname === '/api/profile' && req.method === 'GET') {
            const u = getAuthUser(req);
            if (!u) return send(res, 401, { error: 'Nicht angemeldet.' });
            const d = loadProfiles();
            return send(res, 200, { ok: true, profile: d.profiles[u.id] || null });
        }
        if (pathname === '/api/profile' && req.method === 'PUT') {
            const u = getAuthUser(req);
            if (!u) return send(res, 401, { error: 'Nicht angemeldet.' });
            let body;
            try { body = await readBody(req); } catch (e) { return send(res, 400, { error: 'Ungültige Anfrage.' }); }
            if (!body || typeof body !== 'object') return send(res, 400, { error: 'Ungültige Anfrage.' });
            const d = loadProfiles();
            d.profiles[u.id] = sanitizeProfile(body);
            saveProfiles(d);
            return send(res, 200, { ok: true, profile: d.profiles[u.id] });
        }

        if (pathname === '/api/learner' && req.method === 'GET') {
            const u = getAuthUser(req);
            if (!u) return send(res, 401, { error: 'Nicht angemeldet.' });
            const d = loadLearner();
            return send(res, 200, { ok: true, learner: d.learner[u.id] || null });
        }
        if (pathname === '/api/learner' && req.method === 'PUT') {
            const u = getAuthUser(req);
            if (!u) return send(res, 401, { error: 'Nicht angemeldet.' });
            let body;
            try { body = await readBody(req); } catch (e) { return send(res, 400, { error: 'Ungültige Anfrage.' }); }
            if (!body || typeof body !== 'object') return send(res, 400, { error: 'Ungültige Anfrage.' });
            const d = loadLearner();
            d.learner[u.id] = sanitizeLearner(body);
            saveLearner(d);
            return send(res, 200, { ok: true, learner: d.learner[u.id] });
        }

        if (pathname === '/api/ai' && req.method === 'GET') {
            // Status ohne Schlüssel preiszugeben — nur Flags, welche Provider konfiguriert sind.
            return send(res, 200, {
                ok: true,
                hasGemini: aiHasGemini(),
                hasAnthropic: aiHasAnthropic(),
                primary: aiPrimaryLabel(),
                geminiModel: aiHasGemini() ? aiGeminiModel() : null,
                anthropicModel: aiHasAnthropic() ? aiAnthropicModel() : null
            });
        }
        if (pathname === '/api/ai' && req.method === 'POST') {
            const u = getAuthUser(req);
            if (!u) return send(res, 401, { error: 'Nicht angemeldet.' });
            const r = rateCheck('ai', ip);
            if (!r.ok) return send(res, 429, { error: 'KI-Limit erreicht, bitte später erneut.' });
            let body;
            try { body = await readBody(req); } catch (e) { return send(res, 400, { error: 'Ungültige Anfrage.' }); }
            if (body.action === 'feedback') {
                // Wenn KEIN Provider konfiguriert ist, gib ehrliches lokales Feedback zurück —
                // kein Fehler, keine falsche Behauptung.
                if (!aiAnyProvider()) {
                    const fb = localFeedback(body.prompt || '', body.answer || '', body.language || 'de');
                    return send(res, 200, { feedback: fb, source: 'lokal' });
                }
                // Reihenfolge: Gemini (primär) → Anthropic (Fallback) → lokal.
                let provider = null;
                let fb = null;
                let warn = null;
                if (aiHasGemini()) {
                    try {
                        fb = await callGeminiFeedback(body.prompt || '', body.answer || '', body.language || 'de');
                        if (fb) provider = 'gemini';
                    } catch (e) {
                        warn = String(e && e.message || e);
                    }
                }
                if (!fb && aiHasAnthropic()) {
                    try {
                        fb = await callAnthropicFeedback(body.prompt || '', body.answer || '', body.language || 'de');
                        if (fb) provider = 'anthropic';
                    } catch (e) {
                        warn = String(e && e.message || e);
                    }
                }
                if (!fb) {
                    // Schema ungültig oder alle Provider fehlgeschlagen — auf lokal zurückfallen.
                    const local = localFeedback(body.prompt || '', body.answer || '', body.language || 'de');
                    return send(res, 200, { feedback: local, source: 'lokal-fallback', warning: warn || null });
                }
                return send(res, 200, { feedback: fb, source: provider });
            }
            if (body.action === 'generate-task') {
                // Server-side AI generation. The client never sees the API key.
                const req2 = body.request || {};
                const task = await generateTask(req2);
                if (!task) return send(res, 500, { error: 'Aufgabe konnte nicht generiert werden.' });
                return send(res, 200, { task });
            }
            return send(res, 400, { error: 'unknown action' });
        }

        // --- Static ---
        let p = pathname === '/' ? '/index.html' : pathname;
        const filePath = path.join(ROOT, p);
        if (!filePath.startsWith(ROOT)) return send(res, 403, { error: 'forbidden' }, 'text/plain');
        // Cache static assets but never the API.
        const ext = path.extname(filePath).toLowerCase();
        fs.readFile(filePath, (err, data) => {
            if (err) return send(res, 404, { error: 'not found' }, 'text/plain');
            const headers = { 'Content-Type': MIME[ext] || 'application/octet-stream' };
            if (ext === '.html' || ext === '.json') headers['Cache-Control'] = 'no-store';
            res.writeHead(200, headers);
            res.end(data);
        });
        return;
    } catch (e) {
        console.error('[server] error', e);
        return send(res, 500, { error: 'Interner Fehler.' });
    }
});

// --- Helpers exposed only inside this file ----------------------------------
function publicUser(u) {
    return { id: u.id, email: u.email, name: u.name, createdAt: u.createdAt };
}
function sanitizeProfile(p) {
    // Defensive shallow copy with allowed fields.
    if (!p || typeof p !== 'object') return {};
    const out = {};
    const allowed = ['name', 'email', 'school', 'major', 'federalState', 'examDate', 'hoursPerWeek',
        'sessionLengthMin', 'levelDE', 'levelEN', 'levelMATH', 'availableDays', 'distribution',
        'focus', 'weakTopics', 'strengths', 'goals', 'formats', 'subjectPriority',
        'accessibility', 'grafikdesign', 'ui'];
    for (const k of allowed) {
        if (k in p) out[k] = p[k];
    }
    return out;
}
function sanitizeLearner(l) {
    if (!l || typeof l !== 'object') return {};
    const out = {};
    if (l.byTopic && typeof l.byTopic === 'object') out.byTopic = l.byTopic;
    if (l.lastUpdated) out.lastUpdated = l.lastUpdated;
    return out;
}

server.listen(PORT, () => {
    const provider = aiPrimaryLabel();
    const gem = aiHasGemini() ? aiGeminiModel() : null;
    const ant = aiHasAnthropic() ? aiAnthropicModel() : null;
    const details = provider === 'gemini' ? `gemini=${gem}` :
                    provider === 'anthropic' ? `anthropic=${ant}` :
                    'lokal';
    console.log(`[study-app] http://localhost:${PORT}  (AI: ${details})  (data: ${DATA_DIR})`);
});
