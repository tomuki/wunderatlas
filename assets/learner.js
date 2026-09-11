/* Adaptive learner model.
   Tracks per-subject × per-topic mastery, confidence, attempts, accuracy,
   average time, last activity, repeat-errors, format preference, next review
   and a data-sufficiency flag. The model is persisted in state.learner
   and (if signed in) synced to /api/learner.

   The model is intentionally additive: every interaction (an exercise
   result, a completed lesson, a flagged error) updates the corresponding
   entry. The model never throws — unknown subjects/topics are added
   on demand.

   Pick a next task: pickNext({ subject, candidates }) returns the
   best candidate together with a human-readable "Warum diese Aufgabe?"
   explanation. */
(function (root) {
    const DEFAULT_CONFIDENCE = 0.5;
    const MASTERY_GAIN_CORRECT = 0.10;
    const MASTERY_LOSS_WRONG = 0.15;
    const CONFIDENCE_GAIN_CORRECT = 0.07;
    const CONFIDENCE_LOSS_WRONG = 0.10;
    const MIN_CONFIDENCE = 0.05;
    const MAX_CONFIDENCE = 0.99;
    const DATA_SUFFICIENT_THRESHOLD = 5; // attempts before the model trusts itself

    function key(subject, topic) { return subject + '/' + (topic || '_'); }

    function emptyBucket() {
        return {
            mastery: 0.5,
            confidence: DEFAULT_CONFIDENCE,
            attempts: 0,
            correct: 0,
            accuracy: 0,
            totalTimeSec: 0,
            avgTimeSec: 0,
            lastAt: null,
            lastISO: null,
            errors: 0,
            lastErrorAt: null,
            formatPref: null,    // { type: { correct, attempts } }
            nextReview: null,    // ISO date
            streak: 0,
            dataSufficient: false,
            // v2: more fields for adaptive selection
            currentDifficulty: 2, // 1..5; grows only with consistent success
            hintsUsed: 0,
            repeatedMistakes: [], // [{ question, count, lastAt }]
            preferredExerciseTypes: [], // [type] ordered by accuracy
            avoidedExerciseTypes: [],   // [type] ordered low
            recentExerciseIds: [],      // last 10 to avoid repetition
            // accumulated stats
            bestStreak: 0,
            longestTimeSec: 0,
            shortestTimeSec: null
        };
    }

    function ensure(state, subject, topic) {
        state.learner = state.learner || { byKey: {}, bySubject: {}, updatedAt: null };
        state.learner.byKey = state.learner.byKey || {};
        state.learner.bySubject = state.learner.bySubject || {};
        const k = key(subject, topic);
        if (!state.learner.byKey[k]) {
            state.learner.byKey[k] = emptyBucket();
        }
        if (!state.learner.bySubject[subject]) {
            state.learner.bySubject[subject] = {
                attempts: 0, correct: 0, accuracy: 0,
                mastery: 0.5, confidence: DEFAULT_CONFIDENCE
            };
        }
        return state.learner.byKey[k];
    }

    function record(state, opts) {
        const { subject, topic, type, correct, timeSec, at, errorFlagged, exerciseId, hintUsed, question } = opts || {};
        if (!subject) return;
        const b = ensure(state, subject, topic);
        b.attempts += 1;
        const wasStreak = b.streak || 0;
        if (correct) {
            b.correct += 1;
            b.streak = wasStreak + 1;
            if (b.streak > (b.bestStreak || 0)) b.bestStreak = b.streak;
            b.mastery = clamp(b.mastery + MASTERY_GAIN_CORRECT * (1 - b.mastery));
            b.confidence = clamp(b.confidence + CONFIDENCE_GAIN_CORRECT);
            // Schwierigkeit nur erhöhen, wenn der Lerner wirklich konsistent ist
            // (mindestens 3 richtige Antworten in Folge UND dataSufficient ODER
            // 5 richtige insgesamt in diesem Bucket).
            if (b.streak >= 3 && (b.dataSufficient || b.correct >= 5)) {
                b.currentDifficulty = Math.min(5, (b.currentDifficulty || 2) + 1);
            }
        } else {
            b.streak = 0;
            b.mastery = clamp(b.mastery - MASTERY_LOSS_WRONG * b.mastery);
            b.confidence = clamp(b.confidence - CONFIDENCE_LOSS_WRONG);
            b.errors += 1;
            b.lastErrorAt = at || new Date().toISOString();
            // Schwierigkeit senken bei wiederholten Fehlern
            b.currentDifficulty = Math.max(1, (b.currentDifficulty || 2) - 1);
            // Repeated mistake tracking
            if (question) {
                const normQ = String(question).trim().slice(0, 200);
                let m = (b.repeatedMistakes || []).find(x => x.question === normQ);
                if (m) {
                    m.count += 1;
                    m.lastAt = at || new Date().toISOString();
                } else {
                    b.repeatedMistakes = b.repeatedMistakes || [];
                    b.repeatedMistakes.push({ question: normQ, count: 1, lastAt: at || new Date().toISOString() });
                    if (b.repeatedMistakes.length > 20) b.repeatedMistakes.shift();
                }
            }
        }
        b.accuracy = b.correct / b.attempts;
        if (typeof timeSec === 'number' && timeSec >= 0) {
            b.totalTimeSec += timeSec;
            b.avgTimeSec = b.totalTimeSec / b.attempts;
            if (timeSec > (b.longestTimeSec || 0)) b.longestTimeSec = timeSec;
            if (b.shortestTimeSec == null || timeSec < b.shortestTimeSec) b.shortestTimeSec = timeSec;
        }
        b.lastAt = at || new Date().toISOString();
        b.lastISO = b.lastAt;
        b.dataSufficient = b.attempts >= DATA_SUFFICIENT_THRESHOLD;
        if (errorFlagged) b.lastErrorAt = at || new Date().toISOString();
        if (hintUsed) b.hintsUsed = (b.hintsUsed || 0) + 1;
        if (type) {
            b.formatPref = b.formatPref || {};
            const fp = b.formatPref[type] || { correct: 0, attempts: 0 };
            fp.attempts += 1;
            if (correct) fp.correct += 1;
            fp.accuracy = fp.attempts > 0 ? fp.correct / fp.attempts : 0;
            b.formatPref[type] = fp;
            // preferred/avoided listen neu berechnen
            const all = Object.entries(b.formatPref).map(([k, v]) => ({ type: k, acc: v.accuracy, attempts: v.attempts }));
            const qualifying = all.filter(x => x.attempts >= 2);
            qualifying.sort((x, y) => y.acc - x.acc);
            b.preferredExerciseTypes = qualifying.filter(x => x.acc >= 0.7).map(x => x.type);
            b.avoidedExerciseTypes = qualifying.filter(x => x.acc < 0.4).map(x => x.type);
        }
        if (exerciseId) {
            b.recentExerciseIds = b.recentExerciseIds || [];
            b.recentExerciseIds = [exerciseId].concat(b.recentExerciseIds.filter(x => x !== exerciseId)).slice(0, 10);
        }
        // Next review: 1, 3, 7, 14, 30 days by streak
        const days = correct ? [1, 3, 7, 14, 30][Math.min(4, b.streak - 1)] : 1;
        const next = new Date(b.lastAt);
        next.setDate(next.getDate() + (isFinite(days) ? days : 1));
        b.nextReview = next.toISOString().slice(0, 10);

        const s = state.learner.bySubject[subject];
        s.attempts += 1;
        if (correct) s.correct += 1;
        s.accuracy = s.correct / s.attempts;
        s.mastery = b.mastery;
        s.confidence = b.confidence;
        s.currentDifficulty = b.currentDifficulty;
        state.learner.updatedAt = new Date().toISOString();
        return b;
    }

    function clamp(v) {
        if (!isFinite(v)) return DEFAULT_CONFIDENCE;
        if (v < 0) return 0;
        if (v > 1) return 1;
        return v;
    }

    // Find the topic bucket with the lowest mastery × confidence for a subject.
    function weakest(state, subject, exclude) {
        const out = [];
        for (const k of Object.keys(state.learner.byKey || {})) {
            const b = state.learner.byKey[k];
            if (!k.startsWith(subject + '/')) continue;
            if (exclude && exclude.includes(k)) continue;
            out.push({ key: k, score: b.mastery * (0.5 + 0.5 * b.confidence), b });
        }
        out.sort((a, b) => a.score - b.score);
        return out[0] || null;
    }

    // Subject whose overall mastery × confidence is lowest.
    function weakestSubject(state) {
        const subs = state.learner.bySubject || {};
        const list = Object.keys(subs).map(k => ({
            subject: k, score: subs[k].mastery * (0.5 + 0.5 * subs[k].confidence), b: subs[k]
        }));
        list.sort((a, b) => a.score - b.score);
        return list[0] || null;
    }

    function dueToday(state) {
        const today = (root.Store && root.Store.todayISO) ? root.Store.todayISO() : new Date().toISOString().slice(0, 10);
        const out = [];
        for (const k of Object.keys(state.learner.byKey || {})) {
            const b = state.learner.byKey[k];
            if (b.nextReview && b.nextReview <= today) out.push({ key: k, b });
        }
        return out;
    }

    // Smart difficulty: never bump up after a single lucky answer.
    // Returns an integer 1..5 that reflects the bucket's stable state.
    function suggestedDifficulty(bucket) {
        if (!bucket) return 2; // start in the middle
        if (!bucket.dataSufficient && (bucket.attempts || 0) < 2) return 2;
        // Base on mastery but require evidence
        const m = bucket.mastery || 0.5;
        const c = bucket.confidence || 0.5;
        // Map mastery/confidence product to 1..5
        const score = m * (0.5 + 0.5 * c); // 0..1
        let lvl;
        if (score < 0.30) lvl = 1;
        else if (score < 0.50) lvl = 2;
        else if (score < 0.70) lvl = 3;
        else if (score < 0.85) lvl = 4;
        else lvl = 5;
        // Cap at currentDifficulty unless we have at least 3 correct in a row
        if (lvl > (bucket.currentDifficulty || 2) && (bucket.streak || 0) < 3) {
            lvl = bucket.currentDifficulty || 2;
        }
        // Sanity: never go below currentDifficulty by more than 1 unless we
        // just got a wrong answer (currentDifficulty is already decreased then).
        return Math.max(1, Math.min(5, lvl));
    }

    // List exercise types the user is currently best at / struggles with.
    function typeTendencies(bucket) {
        return {
            preferred: (bucket && bucket.preferredExerciseTypes) || [],
            avoided: (bucket && bucket.avoidedExerciseTypes) || []
        };
    }

    // Choose the best candidate task. The candidate shape:
    //   { id, subject, topic, type, ref, title, difficulty? }
    // We score by:
    //   1. weak-topic boost (lowest mastery gets highest priority)
    //   2. due review boost
    //   3. format preference match
    //   4. data-sufficiency: if the model has too little data, return the
    //      candidate with the highest information gain (topic never tried)
    //   5. difficulty: prefer the one matching the bucket's currentDifficulty
    //      (rounded to 1..5). Never bump up after a single lucky answer —
    //      a topic only advances once dataSufficient + 3-in-a-row.
    //   6. avoid immediate repetition (recentExerciseIds).
    function pickNext(state, candidates) {
        if (!candidates || candidates.length === 0) return null;
        const today = (root.Store && root.Store.todayISO) ? root.Store.todayISO() : new Date().toISOString().slice(0, 10);

        let best = null;
        let bestScore = -Infinity;
        let bestReason = '';
        for (const c of candidates) {
            const b = ensure(state, c.subject, c.topic);
            const reasons = [];
            // 1. weakness
            const weakBoost = (1 - b.mastery) * 2 + (1 - b.confidence) * 1;
            // 2. due review
            let dueBoost = 0;
            if (b.nextReview && b.nextReview <= today) { dueBoost = 1.5; reasons.push('steht zur Wiederholung an'); }
            // 3. new topic
            let noveltyBoost = 0;
            if (b.attempts === 0) { noveltyBoost = 0.5; reasons.push('Thema noch ungeübt'); }
            // 4. format pref
            let fmtBoost = 0;
            if (c.type && b.formatPref && b.formatPref[c.type]) {
                const fp = b.formatPref[c.type];
                if (fp.accuracy >= 0.7) { fmtBoost = 0.4; reasons.push('passt zu deinem Lieblings-Aufgabentyp'); }
                else if (fp.accuracy < 0.4 && fp.attempts >= 2) { fmtBoost = -0.3; reasons.push('wechselt das Format, weil der letzte Typ nicht gut lief'); }
            }
            // 5. difficulty: prefer the one matching currentDifficulty (1..5)
            const lvl = b.currentDifficulty || 2;
            const candDiff = typeof c.difficulty === 'number' ? c.difficulty : Math.round((lvl - 1) * 0.25 * 4) / 4 + 0.25;
            const lvlDiff = Math.abs(Math.round(candDiff * 4 + 1) - lvl);
            const diffPenalty = -lvlDiff * 0.6;
            // 6. avoid immediate repetition
            let repeatPenalty = 0;
            if (c.id && (b.recentExerciseIds || []).includes(c.id)) {
                repeatPenalty = -1.0;
            }
            const score = weakBoost + dueBoost + noveltyBoost + fmtBoost + diffPenalty + repeatPenalty;
            if (score > bestScore) {
                bestScore = score;
                best = c;
                if (reasons.length === 0) {
                    if (b.attempts < DATA_SUFFICIENT_THRESHOLD) reasons.push('wir sammeln noch Daten — bitte bearbeite sie, damit dein Profil schärfer wird');
                    else reasons.push('festigt deinen aktuellen Stand in diesem Thema');
                }
                bestReason = reasons.join('; ');
            }
        }
        if (!best) best = candidates[0];
        return { task: best, reason: bestReason || 'passt gut in deinen Lernplan', score: bestScore };
    }

    // Persist to state.learner (in-memory + localStorage via Store.update).
    function syncFromServer(profile) {
        // Pull the server learner model into local state if present.
        if (!profile) return;
        Store.update(state => {
            state.learner = profile.learner || state.learner || { byKey: {}, bySubject: {}, updatedAt: null };
            if (profile.profile) Object.assign(state.profile || {}, profile.profile);
            return state;
        });
    }
    function pushToServer() {
        if (!window.Auth || !window.Auth.saveLearner || !window.Auth.readUser()) return Promise.resolve(null);
        const s = Store.load();
        return window.Auth.saveLearner({ learner: s.learner || { byKey: {}, bySubject: {} }, profile: s.profile || {} })
            .catch(e => { console.warn('learner sync failed', e); return null; });
    }

    root.Learner = {
        record, ensure, clamp, pickNext, weakest, weakestSubject, dueToday,
        suggestedDifficulty, typeTendencies,
        syncFromServer, pushToServer, emptyBucket, key,
        KEY: 'fhr-app', DATA_SUFFICIENT_THRESHOLD
    };
})(window);
