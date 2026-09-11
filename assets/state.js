/* State management with versioned localStorage schema.
   Single source of truth for the entire app. */
(function (root) {
    const KEY = 'fhr-app';
    const SCHEMA_VERSION = 2;

    // Returns ISO date string YYYY-MM-DD in local timezone.
    function isoDate(d) {
        const yyyy = d.getFullYear();
        const mm = String(d.getMonth() + 1).padStart(2, '0');
        const dd = String(d.getDate()).padStart(2, '0');
        return yyyy + '-' + mm + '-' + dd;
    }

    function defaultState() {
        // Prüfungsziel: Standardtermin schriftliche FHR BW in der Regel Mai.
        const examDate = new Date('2027-05-15');
        return {
            version: SCHEMA_VERSION,
            profile: {
                name: '',
                examDate: isoDate(examDate),
                hoursPerWeek: 5,
                sessionLengthMin: 120,
                school: 'Carl-Hofer-Schule Karlsruhe',
                major: 'Grafikdesign',
                federalState: 'Baden-Württemberg',
                levelDE: 'B1',
                levelEN: 'B1',
                levelMATH: 'B1',
                focus: ['writing', 'vocabulary', 'time'],
                weakTopics: { de: [], en: [], math: [] },
                // Day-of-week availability (0=Mo, 6=So). Default: Mo–Fr + Sa.
                availableDays: [0, 1, 2, 3, 4, 5],
                // Share of weekly minutes per subject. Must sum to 100. Defaults reflect FHR weights.
                distribution: { de: 30, en: 30, math: 40 },
                grafikdesign: {
                    enabled: true,
                    tools: ['Adobe Illustrator', 'Adobe Photoshop', 'Adobe InDesign', 'Figma'],
                    portfolioDeadline: '2027-04-30',
                    projectCount: 4
                }
            },
            tasks: [],            // planned/active tasks
            completed: [],        // [{ taskId, subject, date }]
            errors: [],           // error journal entries
            notes: [],            // {id, title, body, tags, updated}
            dictionary: [],       // {id, lang, term, translation, example, status}
            plan: null,           // generated study plan
            examAttempts: [],     // {id, date, subject, score, breakdown, ...}
            activity: [],         // {date, tasksDone, minutes} - daily aggregates
            stats: {
                streak: 0,
                lastActiveDate: null,
                totalAttempted: 0,
                totalCorrect: 0,
                // Legacy v1 top-level perTopic — still updated by engine.js
                // for backwards compat.  Engine.registerResult reads and
                // writes this unconditionally, so it must always be an
                // object, otherwise the engine crashes with
                // "Cannot read properties of undefined (reading 'topic')"
                // on the very first exercise of a freshly created account.
                perTopic: {},
                perSubject: {
                    de: { attempted: 0, correct: 0, last: null, perTopic: {} },
                    en: { attempted: 0, correct: 0, last: null, perTopic: {} },
                    math: { attempted: 0, correct: 0, last: null, perTopic: {} }
                },
                // Idempotency map: key (subject|topic|exerciseId) -> boolean
                // outcome. ExerciseEngine.registerResult uses this to dedupe
                // stats when the same exercise is submitted twice (reload,
                // back-then-resubmit, double-click). Engine writes here on
                // first record; reads on subsequent.
                _recorded: {}
            },
            ui: {
                theme: 'auto',    // 'light' | 'dark' | 'auto'
                lastVisited: null,
                density: 'cozy',  // 'compact' | 'cozy' | 'comfortable'
                fontSize: 'base', // 'sm' | 'base' | 'lg'
                reduceMotion: false,
                highContrast: false
            },
            learner: { byKey: {}, bySubject: {}, updatedAt: null }
        };
    }

    // Migrate v1 (or any older) state into v2 without losing user data.
    function migrateV1ToV2(old) {
        const v2 = defaultState();
        if (!old || typeof old !== 'object') return v2;

        // Profile: keep what is shared, fill in new fields with sensible defaults.
        if (old.profile && typeof old.profile === 'object') {
            for (const k of Object.keys(old.profile)) {
                if (k in v2.profile) v2.profile[k] = old.profile[k];
            }
            // v1 didn't track levelMATH, major, sessionLengthMin, weakTopics, availableDays, distribution, grafikdesign.
            // Defaults from defaultState() already cover those.
        }

        // Lists: shallow-copy if present.
        for (const listKey of ['tasks', 'completed', 'errors', 'notes', 'dictionary', 'examAttempts', 'activity']) {
            if (Array.isArray(old[listKey])) v2[listKey] = old[listKey];
        }
        if (old.plan) v2.plan = old.plan;

        // Stats: re-derive perSubject from v1 perTopic by subject heuristics.
        if (old.stats && typeof old.stats === 'object') {
            const v1stats = old.stats;
            v2.stats.streak = Number(v1stats.streak) || 0;
            v2.stats.lastActiveDate = v1stats.lastActiveDate || null;
            v2.stats.totalAttempted = Number(v1stats.totalAttempted) || 0;
            v2.stats.totalCorrect = Number(v1stats.totalCorrect) || 0;
            const deTopics = new Set(['operatoren', 'textanalyse_sachtext', 'erorterung', 'grammatik',
                'rechtschreibung', 'zusammenfassung', 'textanalyse_literarisch',
                'materialgestuetztes_schreiben']);
            const enTopics = new Set(['operators', 'comment', 'mediation', 'summary', 'reading',
                'grammar_tenses', 'formal_informal', 'vocabulary_themes']);
            const pt = v1stats.perTopic || {};
            for (const topic of Object.keys(pt)) {
                const subj = deTopics.has(topic) ? 'de' : (enTopics.has(topic) ? 'en' : null);
                if (!subj) continue;
                const entry = pt[topic] || {};
                v2.stats.perSubject[subj].attempted += Number(entry.attempted) || 0;
                v2.stats.perSubject[subj].correct += Number(entry.correct) || 0;
                v2.stats.perSubject[subj].perTopic[topic] = {
                    attempted: Number(entry.attempted) || 0,
                    correct: Number(entry.correct) || 0,
                    last: entry.last || null
                };
            }
        }

        if (old.ui && typeof old.ui === 'object') {
            for (const k of Object.keys(old.ui)) {
                if (k in v2.ui) v2.ui[k] = old.ui[k];
            }
        }
        v2.version = SCHEMA_VERSION;
        return v2;
    }

    function load() {
        try {
            const raw = localStorage.getItem(KEY);
            if (raw) {
                const data = JSON.parse(raw);
                if (data && data.version === SCHEMA_VERSION) {
                    return ensureShape(data);
                }
                // Current v2 key exists but wrong version (future). Reset.
                if (data && data.version !== SCHEMA_VERSION) {
                    console.warn('Unbekannte Schema-Version, setze zurück.');
                    return defaultState();
                }
            }
            // Try to migrate from v1. Legacy v1 keys may live under 'fhr-app/v1'
            // (older versioned storage) or under a single legacy 'fhr-app' key
            // written by pre-versioning code. Check both.
            let v1Raw = localStorage.getItem('fhr-app/v1');
            if (!v1Raw) v1Raw = localStorage.getItem('__legacy__/fhr-app');
            if (v1Raw) {
                const v1 = JSON.parse(v1Raw);
                if (v1 && (v1.version === 1 || v1.version == null)) {
                    const migrated = migrateV1ToV2(v1);
                    save(migrated);
                    return ensureShape(migrated);
                }
            }
            return defaultState();
        } catch (e) {
            console.warn('State konnte nicht geladen werden, setze zurück.', e);
            return defaultState();
        }
    }

    // Ensure required top-level / nested keys exist. Adds missing fields without
    // overwriting valid user data (e.g. when new fields are added in a minor upgrade).
    function ensureShape(data) {
        const def = defaultState();
        for (const k of Object.keys(def)) {
            if (data[k] === undefined) data[k] = def[k];
        }
        // Nested profile
        for (const k of Object.keys(def.profile)) {
            if (data.profile[k] === undefined) data.profile[k] = def.profile[k];
        }
        if (!data.profile.weakTopics || typeof data.profile.weakTopics !== 'object') {
            data.profile.weakTopics = { de: [], en: [], math: [] };
        }
        if (!data.profile.distribution || typeof data.profile.distribution !== 'object') {
            data.profile.distribution = { de: 30, en: 30, math: 40 };
        }
        if (!data.profile.grafikdesign || typeof data.profile.grafikdesign !== 'object') {
            data.profile.grafikdesign = def.profile.grafikdesign;
        }
        // stats.perSubject
        for (const subj of ['de', 'en', 'math']) {
            if (!data.stats.perSubject[subj] || typeof data.stats.perSubject[subj] !== 'object') {
                data.stats.perSubject[subj] = { attempted: 0, correct: 0, last: null, perTopic: {} };
            }
            if (!data.stats.perSubject[subj].perTopic) data.stats.perSubject[subj].perTopic = {};
        }
        // _recorded: idempotency map for engine.registerResult. Created
        // lazily by the engine, but make sure it exists on every load.
        if (!data.stats._recorded || typeof data.stats._recorded !== 'object') {
            data.stats._recorded = {};
        }
        return data;
    }

    function save(state) {
        try {
            localStorage.setItem(KEY, JSON.stringify(state));
        } catch (e) {
            console.warn('State konnte nicht gespeichert werden.', e);
        }
    }

    function update(mutator) {
        const s = load();
        const result = mutator(s);
        save(s);
        notify(s);
        return typeof result === 'undefined' ? s : result;
    }

    // Pub-sub for UI updates
    const subscribers = new Set();
    function subscribe(fn) { subscribers.add(fn); return () => subscribers.delete(fn); }
    function notify(s) { for (const fn of subscribers) { try { fn(s); } catch (e) { console.error(e); } } }

    function reset() {
        localStorage.removeItem(KEY);
        const s = defaultState();
        save(s);
        notify(s);
        return s;
    }

    function exportData() {
        return JSON.stringify(load(), null, 2);
    }

    function importData(json) {
        const data = typeof json === 'string' ? JSON.parse(json) : json;
        if (!data || data.version !== SCHEMA_VERSION) {
            throw new Error('Unbekanntes Datenformat oder Version.');
        }
        save(data);
        notify(data);
        return data;
    }

    // Today's date helpers
    function todayISO() {
        return isoDate(new Date());
    }
    function daysBetween(a, b) {
        const ms = (new Date(b) - new Date(a));
        return Math.round(ms / 86400000);
    }

    root.Store = {
        load, save, update, reset, exportData, importData,
        subscribe, todayISO, daysBetween, defaultState, SCHEMA_VERSION
    };
})(window);
