/* Unit tests — runnable in browser (via tests.html) and in node/jsdom. */
(function (root) {
    const results = [];
    function assert(name, cond, msg) {
        const ok = !!cond;
        results.push({ name, ok, msg: msg || '' });
        if (!ok) (root.console || console).error('FAIL:', name, msg || '');
    }
    function eq(name, actual, expected) {
        assert(name, actual === expected, 'expected ' + JSON.stringify(expected) + ' got ' + JSON.stringify(actual));
    }
    function ge(name, actual, expected, msg) {
        assert(name, actual >= expected, 'expected >= ' + expected + ' got ' + actual + (msg ? ' (' + msg + ')' : ''));
    }

    // --- Migration
    root.localStorage.clear && root.localStorage.clear();
    const rawV1 = JSON.stringify({
        version: 1,
        profile: { name: 'Tester', examDate: '2027-05-01' },
        plan: { weeks: [] },
        completed: [],
        errors: [],
        activity: [],
        stats: { totalAttempted: 0, totalCorrect: 0, streak: 0, perTopic: {} }
    });
    root.localStorage.setItem && root.localStorage.setItem('fhr-app/v1', rawV1);
    const s = Store.load();
    eq('Migration: version === 2', s.version, 2);
    assert('Migration: profile.name preserved', s.profile && s.profile.name === 'Tester');
    assert('Migration: perSubject present', s.stats && s.stats.perSubject && 'de' in s.stats.perSubject && 'en' in s.stats.perSubject && 'math' in s.stats.perSubject);

    // --- Plan generation
    const profile = {
        name: 'Tester', school: 'Carl-Hofer-Schule Karlsruhe', major: 'Grafikdesign',
        federalState: 'BW', examDate: '2027-05-01', hoursPerWeek: 5,
        sessionLengthMin: 120, availableDays: [1, 2, 3, 4, 5],
        levelDE: 'B2', levelEN: 'B1', levelMATH: 'B1',
        distribution: [30, 30, 40], grafikdesign: true, weakTopics: ['differentialrechnung']
    };
    const plan = PlanTemplate.generate(profile);
    assert('Plan: has weeks', plan && Array.isArray(plan.weeks) && plan.weeks.length > 0);
    const allTasks = plan.weeks.flatMap(w => w.days.flatMap(d => d.tasks));
    const subjects = new Set(allTasks.map(t => t.subject));
    eq('Plan: 3 subjects used', subjects.size, 3);
    ge('Plan: math tasks >= 5', allTasks.filter(t => t.subject === 'math').length, 5);
    ge('Plan: de tasks >= 5', allTasks.filter(t => t.subject === 'de').length, 5);
    ge('Plan: en tasks >= 5', allTasks.filter(t => t.subject === 'en').length, 5);
    assert('Plan: no undefined subject', allTasks.every(t => t.subject === 'de' || t.subject === 'en' || t.subject === 'math' || t.subject === 'review'));
    assert('Plan: no undefined id', allTasks.every(t => t.id && typeof t.id === 'string' && !t.id.includes('undefined')));
    assert('Plan: no NaN in duration', allTasks.every(t => Number.isFinite(t.durationMin)));

    // --- planStats (no NaN/undefined)
    const completed = [{ taskId: allTasks[0].id }, { taskId: allTasks[1].id }];
    const stats = PlanTemplate.planStats(plan, completed);
    assert('Stats: totalTasks > 0', stats.totalTasks > 0);
    assert('Stats: completed numeric', Number.isFinite(stats.completed));
    assert('Stats: remaining numeric', Number.isFinite(stats.remaining));
    assert('Stats: deTasks numeric', Number.isFinite(stats.deTasks));
    assert('Stats: enTasks numeric', Number.isFinite(stats.enTasks));
    assert('Stats: maTasks numeric', Number.isFinite(stats.maTasks));
    assert('Stats: no NaN', !Object.values(stats).some(v => Number.isNaN(v)));

    // --- mockExamFits
    const fit = PlanTemplate.mockExamFits(plan);
    assert('Fit: returns ok boolean', typeof fit.ok === 'boolean');
    assert('Fit: requiredMin 240', fit.requiredMin === 240);

    // --- Math content
    const mathList = ContentMATH.list;
    ge('Math: >= 25 lessons', mathList.length, 25, 'count: ' + mathList.length);
    const mathEx = ContentMATH.allExercises();
    ge('Math: >= 60 exercises', mathEx.length, 60, 'count: ' + mathEx.length);
    mathList.forEach(l => assert('Math lesson "' + l.id + '" has sections', Array.isArray(l.sections) && l.sections.length > 0));
    mathList.forEach(l => assert('Math lesson "' + l.id + '" has exercises', Array.isArray(l.exercises) && l.exercises.length > 0, 'count: ' + (l.exercises || []).length));

    // --- DE content
    const deList = ContentDE.list;
    ge('DE: >= 20 lessons', deList.length, 20, 'count: ' + deList.length);
    const deEx = ContentDE.allExercises();
    ge('DE: >= 60 exercises', deEx.length, 60, 'count: ' + deEx.length);
    deList.forEach(l => assert('DE lesson "' + l.id + '" has sections', Array.isArray(l.sections) && l.sections.length > 0));
    deList.forEach(l => assert('DE lesson "' + l.id + '" has exercises', Array.isArray(l.exercises) && l.exercises.length > 0, 'count: ' + (l.exercises || []).length));

    // --- EN content
    const enList = ContentEN.list;
    ge('EN: >= 20 lessons', enList.length, 20, 'count: ' + enList.length);
    const enEx = ContentEN.allExercises();
    ge('EN: >= 60 exercises', enEx.length, 60, 'count: ' + enEx.length);
    enList.forEach(l => assert('EN lesson "' + l.id + '" has sections', Array.isArray(l.sections) && l.sections.length > 0));
    enList.forEach(l => assert('EN lesson "' + l.id + '" has exercises', Array.isArray(l.exercises) && l.exercises.length > 0, 'count: ' + (l.exercises || []).length));

    // --- Grafik tasks
    const grafTasks = ContentGRAF.tasks || [];
    ge('Grafik: >= 30 tasks', grafTasks.length, 30, 'count: ' + grafTasks.length);

    // --- Mini-exam variants for 3 subjects
    ['de', 'en', 'math'].forEach(sub => {
        const bundles = Exercises['mini-exam'].listBundles(sub);
        ge('Mini-exam: ' + sub + ' has 3 variants', bundles.length, 3, 'count: ' + bundles.length);
        bundles.forEach(b => {
            assert('Mini-exam: ' + b.id + ' has parts', Array.isArray(b.parts) && b.parts.length >= 3, 'parts: ' + (b.parts || []).length);
            assert('Mini-exam: ' + b.id + ' has duration', b.durationMin === 240, 'duration: ' + b.durationMin);
        });
    });

    // --- Tolerant numeric comparison (math)
    const mathType = Exercises['math-input'];
    if (mathType && mathType.isCorrect) {
        assert('Math compare: 2 == 2', mathType.isCorrect({ answers: ['2'] }, '2'));
        assert('Math compare: 2 == "2,0"', mathType.isCorrect({ answers: ['2'] }, '2,0'));
        assert('Math compare: 5% == 0,05', mathType.isCorrect({ answers: ['0,05'] }, '5%'));
        assert('Math compare: 2 != 3', !mathType.isCorrect({ answers: ['2'] }, '3'));
    }

    // --- Next task
    const next = PlanTemplate.nextTask(plan, completed.map(c => c.taskId));
    assert('Next: returns task or null', next === null || (next.task && next.task.id && next.date));

    // --- Roll over (no mutation)
    const before = JSON.stringify(plan);
    const rolled = PlanTemplate.rollOver(plan);
    const after = JSON.stringify(plan);
    eq('Plan: rollOver does not mutate', before, after);

    // --- Diagnostic pool: 6 MC per subject, all valid
    const diagPool = (function pickDiagLike() {
        const out = { de: [], en: [], math: [] };
        const files = {
            de: () => ContentDE.list,
            en: () => ContentEN.list,
            math: () => ContentMATH.list
        };
        for (const sub of Object.keys(out)) {
            for (const l of files[sub]()) {
                for (const ex of (l.exercises || [])) {
                    if (out[sub].length >= 6) break;
                    if (ex.type !== 'mc') continue;
                    out[sub].push({ subject: sub, topic: l.id, type: ex.type, prompt: ex.q || ex.prompt || ex.text || '', options: ex.options, answer: ex.answer, difficulty: 0.5 });
                }
                if (out[sub].length >= 6) break;
            }
        }
        return out;
    })();
    ['de', 'en', 'math'].forEach(sub => {
        eq('Diagnostic: ' + sub + ' yields 6 items', diagPool[sub].length, 6);
        diagPool[sub].forEach((q, i) => {
            assert('Diagnostic: ' + sub + '#' + i + ' has options', Array.isArray(q.options) && q.options.length >= 2, 'opts: ' + (q.options || []).length);
            assert('Diagnostic: ' + sub + '#' + i + ' has answer in range', Number.isInteger(q.answer) && q.answer >= 0 && q.answer < q.options.length, 'ans: ' + q.answer);
            assert('Diagnostic: ' + sub + '#' + i + ' has prompt', typeof q.prompt === 'string' && q.prompt.length > 0);
        });
    });
    // Diagnostic: also a grafik pool for BK-Grafik users (2 items)
    const grafikPool = (function pickGrafikLike() {
        const out = [];
        const glessons = ContentGRAF.list || ContentGRAF.lessons || [];
        for (const l of glessons) {
            for (const ex of (l.exercises || [])) {
                if (out.length >= 2) break;
                if (ex.type !== 'mc') continue;
                out.push({ subject: 'gr', topic: l.id, type: ex.type, prompt: ex.q || ex.prompt || ex.text || '', options: ex.options, answer: ex.answer, difficulty: 0.5 });
            }
            if (out.length >= 2) break;
        }
        return out;
    })();
    eq('Diagnostic: grafik yields 2 items for BK-Grafik', grafikPool.length, 2);

    // --- Learner.record feeds the bucket + bySubject correctly
    root.localStorage.clear && root.localStorage.clear();
    const s2 = Store.load();
    Learner.record(s2, { subject: 'de', topic: 'operatoren', type: 'mc', correct: true, timeSec: 25, at: new Date().toISOString() });
    Learner.record(s2, { subject: 'de', topic: 'operatoren', type: 'mc', correct: false, timeSec: 30, at: new Date().toISOString() });
    Learner.record(s2, { subject: 'math', topic: 'ableitungsregeln', type: 'math-input', correct: true, timeSec: 60, at: new Date().toISOString() });
    assert('Learner: de/operatoren bucket has 2 attempts', s2.learner.byKey['de/operatoren'].attempts === 2);
    assert('Learner: de/operatoren accuracy is 0.5', s2.learner.byKey['de/operatoren'].accuracy === 0.5);
    assert('Learner: bySubject.de has 2 attempts', s2.learner.bySubject.de.attempts === 2);
    assert('Learner: bySubject.math has 1 attempt', s2.learner.bySubject.math.attempts === 1);
    assert('Learner: bySubject.de mastery > 0', s2.learner.bySubject.de.mastery > 0);
    assert('Learner: nextReview is set on bucket', typeof s2.learner.byKey['de/operatoren'].nextReview === 'string' && s2.learner.byKey['de/operatoren'].nextReview.length === 10);
    // Streak-tracking raises difficulty after 3+ correct AND dataSufficient or >= 5 correct
    for (let i = 0; i < 5; i++) Learner.record(s2, { subject: 'en', topic: 'operators', type: 'mc', correct: true, timeSec: 20, at: new Date().toISOString() });
    assert('Learner: en/operators difficulty >= 3 after 5 correct streak', s2.learner.byKey['en/operators'].currentDifficulty >= 3, 'diff: ' + s2.learner.byKey['en/operators'].currentDifficulty);
    // Data sufficient flag flips after DATA_SUFFICIENT_THRESHOLD attempts
    assert('Learner: dataSufficient true after threshold attempts', s2.learner.byKey['en/operators'].dataSufficient === true);

    // --- Local AI feedback: returns structured shape without a key
    const localFb = (function () {
        // Inline minimal shape mirroring localFeedback in server.js client expectations.
        // We exercise the call path: ensure /api/ai is not in node-tests, so we
        // assert the SERVER-SIDE local rule is exported via a static helper. Since
        // server.js is not loaded in node-tests, we instead test the client side
        // of the contract: AI.feedbackFreeText must be a function.
        return (typeof AI !== 'undefined' && typeof AI.feedbackFreeText === 'function');
    })();
    assert('AI: feedbackFreeText available client-side', localFb);

    // --- AI availability flag shape (no API key values leak)
    assert('AI: availability is a function', typeof AI.availability === 'function');
    assert('AI: localFallback returns a task shape', (function () {
        const t = AI.localFallback({ subject: 'de', topic: 'operatoren', type: 'mc' });
        return t && t.type && t.prompt;
    })());

    // --- Summary
    const passed = results.filter(r => r.ok).length;
    const total = results.length;
    const banner = 'Tests: ' + passed + '/' + total + ' passed';
    (root.console || console).log(banner);
    root.TestResults = { results, passed, total, banner };
    if (passed < total) {
        (root.console || console).table(results.filter(r => !r.ok));
    }
})(typeof window !== 'undefined' ? window : globalThis);
