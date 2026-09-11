/* Sequential exercise runner.
   Renders ONE exercise at a time from a list, with a "Weiter" button that
   only appears after the user has checked their answer.  Used by the
   Deutsch/Englisch/Mathematik lesson pages so the learner works through
   the lesson step-by-step instead of seeing all exercises at once.

   Public API:
       window.SequentialExercises.run(opts)
   where opts = {
       mount: HTMLElement,                    // container
       exercises: [...],                      // ordered list of exercise objects
       subject: 'de' | 'en' | 'math',         // for stats/adaptive model
       topic:  string,                        // bucket key
       labels: { back, next, finish, showAll, whyTitle, ... },
       onFinish: function (summary) { ... }   // called after the last exercise
   }

   Adaptive behaviour:
       - If window.Learner and window.Learner.pickNext are available, the
         runner sorts the candidate list by adaptive score and surfaces the
         "Warum diese Aufgabe?" reason.
       - On result, Learner.record is called inside ExerciseEngine.renderOne.

   Acceptance:
       - Only one exercise is visible at a time
       - The "Antwort prüfen" / check button is a real <button> Playwright
         can click; after it fires the answer is locked (inputs/buttons
         disabled) and the "Weiter" button appears
       - The "Zurück" button does NOT re-count stats — it just re-renders
         the previous exercise without re-recording
       - On the last exercise, "Weiter" becomes "Lerneinheit abschließen"
   */
(function (root) {

    function escapeHtml(s) {
        return String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
    }

    function defaultLabels(lang) {
        if (lang === 'en') {
            return {
                counter: (i, n) => `Exercise ${i + 1} of ${n}`,
                back: '← Back',
                next: 'Next →',
                finish: 'Finish lesson',
                showAll: 'Show all exercises',
                showLess: 'Hide all exercises',
                whyTitle: 'Why this exercise?',
                recapTitle: 'Lesson complete',
                recapCorrect: (k, n) => `You answered ${k} of ${n} correctly.`,
                nextRecommended: 'Next recommendation',
                backToList: '← Back to overview',
                markComplete: 'Mark as completed',
                overview: 'Overview'
            };
        }
        return {
            counter: (i, n) => `Aufgabe ${i + 1} von ${n}`,
            back: '← Zurück',
            next: 'Weiter →',
            finish: 'Lerneinheit abschließen',
            showAll: 'Alle Aufgaben anzeigen',
            showLess: 'Weniger anzeigen',
            whyTitle: 'Warum diese Aufgabe?',
            recapTitle: 'Lerneinheit abgeschlossen',
            recapCorrect: (k, n) => `Du hast ${k} von ${n} Aufgaben richtig.`,
            nextRecommended: 'Nächste Empfehlung',
            backToList: '← Zurück zur Übersicht',
            markComplete: 'Lektion als erledigt markieren',
            overview: 'Übersicht'
        };
    }

    function buildAdaptiveOrder(state, exercises) {
        // If Learner is available and has a meaningful state, sort candidates
        // by pickNext-style score so the strongest candidate comes first.
        // We keep the original order as the fallback (the lesson is curated).
        if (!root.Learner || !root.Learner.pickNext) return { order: null, reason: null };
        try {
            const cands = exercises.map((ex, i) => ({
                id: ex.id || ex.ref || ('ex-' + i),
                subject: ex.subject || null,
                topic: ex.topic || '_',
                type: ex.type,
                difficulty: ex.difficulty || 2,
                ref: ex
            }));
            // pickNext returns the SINGLE best.  We approximate "sorted
            // candidates" by repeatedly calling pickNext with the remaining
            // list.  For short lessons (<= 25 items) this is cheap.
            const order = [];
            const reasons = {};
            let pool = cands.slice();
            let used = new Set();
            const maxIters = Math.min(pool.length, 25);
            for (let i = 0; i < maxIters && pool.length; i++) {
                const res = root.Learner.pickNext(state, pool);
                if (!res || !res.task) break;
                order.push(res.task);
                reasons[res.task.id] = res.reason;
                pool = pool.filter(c => c !== res.task);
                used.add(res.task);
            }
            // Append any remaining (e.g. when pool was over 25).
            for (const c of pool) { order.push(c); reasons[c.id] = reasons[c.id] || 'festigt deinen aktuellen Stand'; }
            return { order, reason: reasons };
        } catch (e) { return { order: null, reason: null }; }
    }

    function run(opts) {
        const mount = opts.mount;
        if (!mount) return;
        const exercises = (opts.exercises || []).slice();
        const labels = Object.assign(defaultLabels(opts.lang), opts.labels || {});
        const subject = opts.subject || null;
        const topic = opts.topic || '_';

        if (!exercises.length) {
            mount.innerHTML = `<p class="muted">Keine Übungen in dieser Lerneinheit.</p>`;
            return;
        }

        // Adaptive ordering: only if explicitly requested and state.learner
        // is "sufficient" (i.e. the user has done some work).  This keeps
        // the curated order for first-time users.
        const state = (root.Store && root.Store.load) ? root.Store.load() : null;
        let ordered = exercises;
        let reasons = {};
        if (opts.adaptive && state) {
            const adapt = buildAdaptiveOrder(state, exercises);
            if (adapt.order) {
                ordered = adapt.order.map(c => c.ref).filter(Boolean);
                reasons = adapt.reason || {};
            }
        }

        let idx = 0;
        // Track which exercise indices have been answered (for the recap)
        const results = exercises.map(() => null); // null = not answered yet, true/false = outcome
        const cached = new Map();
        let finished = false;
        // View mode: 'single' (one exercise at a time) | 'all' (all shown)
        let viewMode = 'single';

        // ---------- DOM scaffolding ----------
        mount.innerHTML = '';
        const introEl = document.createElement('div');
        const counterEl = document.createElement('div');
        counterEl.className = 'muted seq-counter';
        const whyEl = document.createElement('div');
        whyEl.className = 'muted seq-why';
        const exerciseHost = document.createElement('div');
        const pagerEl = document.createElement('div');
        pagerEl.className = 'seq-pager row';
        const showAllWrap = document.createElement('div');
        showAllWrap.className = 'seq-showall-wrap';
        mount.appendChild(introEl);
        mount.appendChild(counterEl);
        mount.appendChild(whyEl);
        mount.appendChild(exerciseHost);
        mount.appendChild(pagerEl);
        mount.appendChild(showAllWrap);

        // ---------- Renderers ----------
        function renderIntro() {
            introEl.innerHTML = `<h2 style="margin-top:24px">${opts.heading || 'Übungen'}</h2>` +
                (opts.lessonId ? `<input type="hidden" data-lesson-id="${escapeHtml(opts.lessonId)}">` : '');
        }
        function renderWhy(i) {
            const ex = ordered[i];
            if (!ex) { whyEl.innerHTML = ''; return; }
            const exId = ex.id || ex.ref || ('ex-' + i);
            const reason = reasons[exId];
            if (reason) {
                whyEl.innerHTML = `<div class="explainer" style="margin-bottom:12px"><span class="explainer__title">${escapeHtml(labels.whyTitle)}</span><div class="explainer__reason">${escapeHtml(reason)}</div></div>`;
            } else { whyEl.innerHTML = ''; }
        }
        function renderCounter() {
            counterEl.textContent = labels.counter(idx, ordered.length);
            counterEl.style.marginBottom = '6px';
        }
        function disableHostInputs() {
            // Block resubmission after answer.
            const ex = exerciseHost.querySelector('.exercise');
            if (!ex) return;
            ex.querySelectorAll('input, textarea, select').forEach(el => { el.disabled = true; });
            ex.querySelectorAll('[data-action="check"]').forEach(b => {
                // Hide the original Submit/Prüfen button completely after
                // answer — the pager's "Weiter" / "Lerneinheit abschließen"
                // button is the only forward action now.  Use an inline
                // style with `!important` to defeat any class-based display
                // rules (e.g. `.exercise__actions { display: flex }` makes
                // the user-agent's `[hidden] { display: none }` lose the
                // specificity fight on its own).
                b.hidden = true;
                b.disabled = true;
                b.style.display = 'none';
            });
            // Reset button stays enabled so the learner can try the same
            // exercise again if they want to.
            ex.querySelectorAll('[data-action="reset"]').forEach(b => { b.disabled = false; });
        }
        function renderExercise() {
            const ex = ordered[idx];
            if (!ex) return;
            exerciseHost.innerHTML = '';
            if (cached.has(ex)) {
                exerciseHost.appendChild(cached.get(ex));
                return;
            }
            const exerciseMount = document.createElement('div');
            exerciseHost.appendChild(exerciseMount);
            cached.set(ex, exerciseMount);
            exerciseMount.addEventListener('click', event => {
                if (!event.target.closest('[data-action="reset"]')) return;
                results[exercises.indexOf(ex)] = null;
                queueMicrotask(() => {
                    showPagerBeforeAnswer();
                    const check = exerciseMount.querySelector('[data-action="check"]');
                    if (check) { check.hidden = false; check.style.removeProperty('display'); }
                });
            });
            try {
                root.ExerciseEngine.renderOne(exerciseMount, ex, {
                    subject: ex.subject || subject,
                    topic: ex.topic || topic,
                    onResult: (correct) => {
                        // Save the result; don't re-record on "Zurück".
                        const origIdx = exercises.indexOf(ex);
                        if (origIdx >= 0) results[origIdx] = !!correct;
                        disableHostInputs();
                        showPagerAfterAnswer();
                    }
                });
            } catch (e) {
                exerciseHost.innerHTML = `<p class="form-error">Fehler beim Laden der Aufgabe: ${escapeHtml(e.message || String(e))}</p>`;
            }
        }
        function showPagerAfterAnswer() {
            pagerEl.innerHTML = '';
            const back = document.createElement('button');
            back.className = 'btn btn--ghost btn--sm';
            back.type = 'button';
            back.textContent = labels.back;
            back.disabled = idx === 0;
            back.addEventListener('click', () => { if (idx > 0) { idx--; rerender(); } });
            const next = document.createElement('button');
            next.className = 'btn btn--primary btn--sm';
            next.type = 'button';
            const isLast = idx === ordered.length - 1;
            next.textContent = isLast ? labels.finish : labels.next;
            // For Playwright / E2E reliability, set stable data-action so
            // step 18 can find the button by data attribute.
            next.dataset.action = isLast ? 'finish' : 'next';
            next.dataset.seqNext = String(idx);
            next.addEventListener('click', () => {
                if (isLast) {
                    finishLesson();
                } else {
                    idx++;
                    rerender();
                }
            });
            pagerEl.appendChild(back);
            pagerEl.appendChild(next);
            // Hand the freshly-built next button to the inner exercise's
            // lifecycle (if it has one) so the engine can manage its
            // visibility.  We call setState('next') so the lifecycle
            // applies the `next` state's visibility rules immediately.
            const innerEx = exerciseHost.querySelector('.exercise');
            if (innerEx && innerEx.__lifecycle) {
                try {
                    innerEx.__lifecycle.setNextBtn(next);
                    innerEx.__lifecycle.setState('next');
                } catch (e) { /* lifecycle is optional */ }
            }
        }
        function showPagerBeforeAnswer() {
            pagerEl.innerHTML = '';
            const back = document.createElement('button');
            back.className = 'btn btn--ghost btn--sm';
            back.type = 'button';
            back.textContent = labels.back;
            back.disabled = idx === 0;
            back.addEventListener('click', () => { if (idx > 0) { idx--; rerender(); } });
            pagerEl.appendChild(back);
        }
        function showShowAllToggle() {
            showAllWrap.innerHTML = '';
            const btn = document.createElement('button');
            btn.className = 'btn btn--ghost btn--sm';
            btn.type = 'button';
            btn.dataset.action = 'show-all';
            btn.textContent = viewMode === 'single' ? labels.showAll : labels.showLess;
            btn.addEventListener('click', () => {
                viewMode = viewMode === 'single' ? 'all' : 'single';
                rerender();
            });
            showAllWrap.appendChild(btn);
        }
        function rerender() {
            if (viewMode === 'all') renderAll();
            else renderOne();
        }
        function renderOne() {
            renderCounter();
            renderWhy(idx);
            renderExercise();
            // Decide which pager to show: the "before answer" pager only
            // shows the back button (no Weiter without answering).  The
            // "after answer" pager shows back + next/finish and is wired
            // up in showPagerAfterAnswer() once onResult fires.
            const ex = ordered[idx];
            const origIdx = exercises.indexOf(ex);
            if (origIdx >= 0 && results[origIdx] != null) {
                showPagerAfterAnswer();
            } else {
                showPagerBeforeAnswer();
            }
            showShowAllToggle();
            scrollIntoViewOnMobile();
        }
        function renderAll() {
            counterEl.textContent = '';
            whyEl.innerHTML = '';
            exerciseHost.innerHTML = '';
            const list = document.createElement('div');
            list.className = 'seq-all';
            // The overview navigates between existing attempts; it never
            // creates a second set of live forms or loses selected answers.
            ordered.forEach((ex, i) => {
                const result = results[exercises.indexOf(ex)];
                const entry = document.createElement('button');
                entry.type = 'button';
                entry.className = 'seq-overview-item';
                entry.innerHTML = `<span>${escapeHtml(labels.counter(i, ordered.length))}<br>${escapeHtml(ex.q || ex.title || ex.topic || 'Übung')}</span><small>${result == null ? 'Offen ↗' : result ? '✓ Richtig' : '↺ Noch üben'}</small>`;
                entry.addEventListener('click', () => { idx = i; viewMode = 'single'; rerender(); });
                list.appendChild(entry);
            });
            exerciseHost.appendChild(list);
            pagerEl.innerHTML = '';
            const back = document.createElement('button');
            back.className = 'btn btn--ghost btn--sm';
            back.type = 'button';
            back.textContent = labels.back;
            back.disabled = true;
            pagerEl.appendChild(back);
            showShowAllToggle();
        }
        function scrollIntoViewOnMobile() {
            // Only auto-scroll on narrow viewports so desktop users keep
            // their scroll position.
            if (typeof window === 'undefined' || !window.matchMedia) return;
            const isMobile = window.matchMedia('(max-width: 700px)').matches;
            if (!isMobile) return;
            try {
                counterEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
            } catch (e) {}
        }
        function finishLesson() {
            if (finished) return;
            if (results.some(result => result == null)) {
                idx = ordered.findIndex(ex => results[exercises.indexOf(ex)] == null);
                viewMode = 'single';
                rerender();
                return;
            }
            finished = true;
            const correctCount = results.filter(r => r === true).length;
            // Auto-mark the lesson as completed (mirrors the old "Lektion als
            // erledigt markieren" button).  We do this once at the end so
            // a learner who finishes the whole sequence gets the credit.
            if (root.Store && opts.lessonId) {
                try {
                    root.Store.update(state => {
                        const id = 'lesson:' + (subject || 'x') + ':' + opts.lessonId;
                        if (!state.completed.find(c => c.taskId === id)) {
                            state.completed.push({ taskId: id, subject, date: new Date().toISOString() });
                        }
                        return state;
                    });
                } catch (e) {}
            }
            counterEl.textContent = '';
            whyEl.innerHTML = '';
            exerciseHost.innerHTML = '';
            pagerEl.innerHTML = '';
            showAllWrap.innerHTML = '';
            const summary = document.createElement('div');
            summary.className = 'card card--quiet seq-recap';
            summary.innerHTML = `
                <h3>${escapeHtml(labels.recapTitle)}</h3>
                <p>${escapeHtml(labels.recapCorrect(correctCount, exercises.length))}</p>
                <div class="row" style="margin-top:8px">
                    <button class="btn btn--ghost" type="button" data-action="back-to-list">${escapeHtml(labels.backToList)}</button>
                    <button class="btn btn--primary" type="button" data-action="next-unit">${escapeHtml(labels.nextRecommended)}</button>
                </div>
            `;
            exerciseHost.appendChild(summary);
            // Wire the recap buttons.
            const backBtn = summary.querySelector('[data-action="back-to-list"]');
            if (backBtn) backBtn.addEventListener('click', () => {
                if (opts.onBackToList) opts.onBackToList();
                else if (opts.backHref) location.hash = opts.backHref;
            });
            const nextBtn = summary.querySelector('[data-action="next-unit"]');
            if (nextBtn) nextBtn.addEventListener('click', () => {
                if (opts.onNextUnit) opts.onNextUnit({ subject, topic, correctCount, total: exercises.length });
                else if (opts.nextHref) location.hash = opts.nextHref;
            });
            // Tell the host page we're done.
            if (opts.onFinish) opts.onFinish({ correctCount, total: exercises.length, results });
        }

        // ---------- Bootstrap ----------
        renderIntro();
        renderOne();
    }

    root.SequentialExercises = { run };
})(window);
