/* Exercise engine: shared helpers for all exercise types.
   Each exercise renders into a container element and provides a check() function.
   The engine tracks results and reports to the journal. */
(function (root) {
    const TYPES = ['mc', 'fill', 'match', 'sort', 'error', 'flashcard', 'cloze', 'free', 'timed-writing', 'math-input', 'mini-exam', 'mock-exam'];

    function getType(name) {
        return (root.Exercises && root.Exercises[name]) || null;
    }

    function isCorrect(type, exercise, answer) {
        const mod = getType(type);
        if (!mod) return false;
        return mod.isCorrect(exercise, answer);
    }

    // registerResult(subject, topic, correct, exercise, answer)
    // subject: 'de' | 'en' | 'math' | null (null = legacy/external)
    //
    // Idempotency: each call records at most once per (subject+topic+exerciseId)
    // tuple.  A second call for the same exercise (e.g. page reload, "Zurück"
    // + re-submit, double-click before disabled) is a no-op for stats — but
    // it still returns the cached outcome so callers can show feedback.
    function exerciseKey(subject, topic, exercise) {
        const id = (exercise && (exercise.id || exercise.ref)) || (exercise && exercise.q ? 'q-' + String(exercise.q).slice(0, 40) : exercise ? 'content-'+JSON.stringify([exercise.type,exercise.title,exercise.text,exercise.items,exercise.pairs]) : null);
        if (!id) return null; // no idempotency key — caller can't dedupe
        return [subject || '_', topic || '_', String(id)].join('|');
    }
    function registerResult(subject, topic, correct, exercise, answer) {
        const key = exerciseKey(subject, topic, exercise);
        // Idempotency check: if this exercise was already recorded, skip the
        // stats update but still return the previously stored outcome.
        if (key) {
            const s = root.Store.load();
            if (s.stats && s.stats._recorded && s.stats._recorded[key] != null) {
                return { dedup: true, correct: !!s.stats._recorded[key] };
            }
        }
        const ts = new Date();
        Store.update(state => {
            // Defensive: if stats are missing (e.g. legacy data without
            // ensureShape run), rehydrate.  Otherwise the next line throws
            // "Cannot read properties of undefined".
            if (!state.stats) state.stats = {};
            if (!state.stats.perTopic || typeof state.stats.perTopic !== 'object') state.stats.perTopic = {};
            if (!state.stats.perSubject) {
                state.stats.perSubject = {
                    de: { attempted: 0, correct: 0, last: null, perTopic: {} },
                    en: { attempted: 0, correct: 0, last: null, perTopic: {} },
                    math: { attempted: 0, correct: 0, last: null, perTopic: {} }
                };
            }
            // Mark as recorded first so a re-entrant call inside this update
            // is a no-op.
            if (key) {
                if (!state.stats._recorded) state.stats._recorded = {};
                state.stats._recorded[key] = !!correct;
            }
            state.stats.totalAttempted = (state.stats.totalAttempted || 0) + 1;
            if (correct) state.stats.totalCorrect = (state.stats.totalCorrect || 0) + 1;

            // Always update legacy perTopic for backwards compat.
            const t = state.stats.perTopic[topic] || { attempted: 0, correct: 0 };
            t.attempted++;
            if (correct) t.correct++;
            t.last = ts.toISOString();
            t.accuracy = t.correct / t.attempted;
            state.stats.perTopic[topic] = t;

            // Subject-grouped stats.
            if (subject && state.stats.perSubject[subject]) {
                const ss = state.stats.perSubject[subject];
                ss.attempted++;
                if (correct) ss.correct++;
                ss.last = ts.toISOString();
                const st = ss.perTopic[topic] || { attempted: 0, correct: 0 };
                st.attempted++;
                if (correct) st.correct++;
                st.last = ts.toISOString();
                st.accuracy = st.correct / st.attempted;
                ss.perTopic[topic] = st;
            }

            // Update streak
            const today = Store.todayISO();
            if (state.stats.lastActiveDate !== today) {
                const last = state.stats.lastActiveDate ? new Date(state.stats.lastActiveDate) : null;
                if (last) {
                    const diff = Math.round((new Date(today) - last) / 86400000);
                    if (diff === 1) state.stats.streak = (state.stats.streak || 0) + 1;
                    else if (diff > 1) state.stats.streak = 1;
                } else {
                    state.stats.streak = 1;
                }
                state.stats.lastActiveDate = today;
            }
            // Update daily activity
            const day = state.activity.find(a => a.date === today);
            if (day) {
                day.tasksDone = (day.tasksDone || 0) + 1;
                if (correct) day.correct = (day.correct || 0) + 1;
            } else {
                state.activity.push({ date: today, tasksDone: 1, correct: correct ? 1 : 0 });
            }
            return state;
        });

        if (!correct) {
            // Add to error journal — but only once per exercise, too.
            const s2 = root.Store.load();
            const errors = s2.errors || [];
            const alreadyErr = errors.some(e => e.exerciseKey === key);
            if (!alreadyErr) {
                const err = {
                    id: 'e' + Date.now() + '-' + Math.floor(Math.random() * 1000),
                    exerciseKey: key,
                    subject: subject || null,
                    topic,
                    question: exercise.q || exercise.title || '',
                    correctAnswer: JSON.stringify(exercise.answer !== undefined ? exercise.answer : (exercise.corrections || '')),
                    explanation: exercise.explanation || '',
                    userAnswer: JSON.stringify(answer),
                    date: ts.toISOString().slice(0, 10),
                    repeats: 0,
                    nextReview: ts.toISOString().slice(0, 10),
                    status: 'review-today'
                };
                Store.update(state => {
                    state.errors.unshift(err);
                    // Cap to 200 entries
                    if (state.errors.length > 200) state.errors = state.errors.slice(0, 200);
                    return state;
                });
            }
        }
        return { dedup: false, correct: !!correct };
    }

    function toast(msg, kind) {
        const root = document.getElementById('toast-root');
        if (!root) return;
        const el = document.createElement('div');
        el.className = 'toast' + (kind ? ' toast--' + kind : '');
        el.textContent = msg;
        root.appendChild(el);
        setTimeout(() => { el.style.opacity = '0'; el.style.transform = 'translateY(8px)'; }, 2200);
        setTimeout(() => el.remove(), 2500);
    }

    let closeActiveModal=null;
    function showModal({title,bodyHtml,footerHtml,wide}){
        if(closeActiveModal)closeActiveModal();
        const host=document.getElementById('modal-root'),previous=document.activeElement;
        host.innerHTML='';host.classList.add('is-open');host.setAttribute('aria-hidden','false');
        const dialog=document.createElement('div');dialog.className='modal'+(wide?' modal--wide':'');dialog.setAttribute('role','dialog');dialog.setAttribute('aria-modal','true');dialog.setAttribute('aria-label',title||'Dialog');dialog.tabIndex=-1;
        dialog.innerHTML=`<div class="modal__header"><h3>${escapeHtml(title||'')}</h3><button class="icon-btn" type="button" data-modal-close aria-label="Schließen">${Icons.icon('x')}</button></div><div class="modal__body">${bodyHtml||''}</div><div class="modal__footer">${footerHtml||''}</div>`;host.appendChild(dialog);
        let closed=false;
        function close(){if(closed)return;closed=true;host.innerHTML='';host.classList.remove('is-open');host.setAttribute('aria-hidden','true');host.removeEventListener('click',outside);document.removeEventListener('keydown',keyboard);closeActiveModal=null;if(previous?.isConnected)previous.focus();}
        function outside(e){if(e.target===host)close();}
        function keyboard(e){if(e.key==='Escape'){e.preventDefault();close();}if(e.key==='Tab'){const items=[...dialog.querySelectorAll('button,input,select,textarea,a[href]')].filter(x=>!x.disabled&&x.offsetParent!==null);if(!items.length){e.preventDefault();dialog.focus();return;}if(e.shiftKey&&document.activeElement===items[0]){e.preventDefault();items.at(-1).focus();}else if(!e.shiftKey&&document.activeElement===items.at(-1)){e.preventDefault();items[0].focus();}}}
        host.addEventListener('click',outside);document.addEventListener('keydown',keyboard);dialog.querySelector('[data-modal-close]').addEventListener('click',close);closeActiveModal=close;
        (dialog.querySelector('input,textarea,select')||dialog).focus();return close;
    }

    function svgChart(values, opts) {
        const width = 320, height = 120;
        const pad = 8;
        // Defensive: coerce to array of {value:number, label:string} so a
        // bad caller doesn't poison the SVG with NaN coordinates (which
        // the browser reports as console errors).
        const safe = Array.isArray(values) ? values : [];
        const norm = safe.map(v => ({
            value: Number(v && v.value) || 0,
            label: (v && v.label) || ''
        }));
        const max = Math.max(1, ...norm.map(v => v.value));
        const min = 0;
        const xStep = norm.length > 1 ? (width - pad * 2) / (norm.length - 1) : 0;
        const yScale = (v) => height - pad - ((v - min) / (max - min || 1)) * (height - pad * 2);
        const xScale = (i) => pad + i * xStep;
        const points = norm.map((v, i) => `${xScale(i)},${yScale(v.value)}`).join(' ');
        const areaPoints = `${pad},${height - pad} ${points} ${width - pad},${height - pad}`;
        const gridY = [0, 0.5, 1].map(f => pad + (height - pad * 2) * f);
        return `
            <svg class="chart" viewBox="0 0 ${width} ${height}" preserveAspectRatio="none" role="img" aria-label="Verlauf">
                ${gridY.map(y => `<line class="chart__grid" x1="${pad}" y1="${y}" x2="${width - pad}" y2="${y}"/>`).join('')}
                <polygon class="chart__area" points="${areaPoints}"/>
                <polyline class="chart__line" points="${points}"/>
                ${norm.map((v, i) => `<circle class="chart__dot" cx="${xScale(i)}" cy="${yScale(v.value)}" r="2.5"><title>${escapeHtml(v.label)}: ${v.value}</title></circle>`).join('')}
            </svg>`;
    }

    function escapeHtml(s) {
        return String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
    }

    // Tiny helper used by every exercise's submit handler. Wraps the click
    // listener so a rapid second click (before `disabled = true` lands) is
    // a no-op. Belt-and-braces alongside the idempotency map in
    // registerResult — both must be present for the stats to be safe.
    function once(handler) {
        let fired = false;
        return function (e) {
            if (fired) return;
            fired = true;
            try { return handler.call(this, e); } catch (err) { fired = false; throw err; }
        };
    }

    /* Explicit state machine for the exercise lifecycle.
       States (per spec):
           unanswered       - fresh exercise, no answer yet
           selected         - user has entered/changed an answer
           checking         - submit handler running; ignore further clicks
           checked-correct  - answer was right; show feedback, hide Pruefen
           checked-wrong    - answer was wrong; show feedback, hide Pruefen
           next             - checked + pager shown its single Weiter button
           completed        - last exercise in sequence; recap, no Weiter
       Transitions:
           unanswered  --select-->  selected
           selected    --reset-->   unanswered
           selected    --check-->   checking --(auto)--> checked-correct | checked-wrong
           checked-*   --next-->    (host decides; if last, -> completed)
           checked-*   --reset-->   unanswered  (keeps the same exercise)
       The lifecycle also exposes:
           setState(name)            - move to a new state, run hook if provided
           transition(event)         - dispatch by name
           reset()                   - jump back to `unanswered`, rebuild UI
           on(name, fn)              - register a state hook
       Button visibility is computed from the state and applied via inline
       style.display (forces the action area to stay deterministic even when
       CSS uses flex/grid).  The original buttons are NOT removed from DOM
       so reset can flip them back on.  `unanswered` is the only state where
       Pruefen is visible (and disabled until `selected`).
    */
    const STATES = ['unanswered', 'selected', 'checking',
                    'checked-correct', 'checked-wrong', 'next', 'completed'];
    function visibilityFor(state, hasBtns) {
        switch (state) {
            case 'unanswered':
                return {
                    check: { visible: hasBtns.check, enabled: false },
                    reset: { visible: hasBtns.reset, enabled: hasBtns.reset },
                    next:  { visible: false,         enabled: false }
                };
            case 'selected':
                return {
                    check: { visible: hasBtns.check, enabled: hasBtns.check },
                    reset: { visible: hasBtns.reset, enabled: hasBtns.reset },
                    next:  { visible: false,         enabled: false }
                };
            case 'checking':
                return {
                    check: { visible: hasBtns.check, enabled: false },
                    reset: { visible: hasBtns.reset, enabled: false },
                    next:  { visible: false,         enabled: false }
                };
            case 'checked-correct':
            case 'checked-wrong':
                return {
                    check: { visible: false,         enabled: false },
                    reset: { visible: hasBtns.reset, enabled: hasBtns.reset },
                    next:  { visible: false,         enabled: false }
                };
            case 'next':
                return {
                    check: { visible: false,         enabled: false },
                    reset: { visible: hasBtns.reset, enabled: hasBtns.reset },
                    next:  { visible: hasBtns.next,  enabled: hasBtns.next }
                };
            case 'completed':
                return {
                    check: { visible: false,         enabled: false },
                    reset: { visible: false,         enabled: false },
                    next:  { visible: false,         enabled: false }
                };
            default:
                return { check: { visible: false }, reset: { visible: false }, next: { visible: false } };
        }
    }
    function applyVisibility(buttons, vis) {
        const apply = (el, v) => {
            if (!el) return;
            if (v && v.visible) {
                el.style.display = '';
                el.hidden = false;
            } else {
                el.style.display = 'none';
                el.hidden = true;
            }
            if (el.tagName === 'BUTTON' || el.tagName === 'INPUT') {
                el.disabled = !(v && v.enabled);
            }
        };
        apply(buttons.checkBtn, vis.check);
        apply(buttons.resetBtn, vis.reset);
        apply(buttons.nextBtn,  vis.next);
    }
    function createLifecycle(rootEl, opts) {
        opts = opts || {};
        const buttons = {
            checkBtn: opts.checkBtn || (rootEl && rootEl.querySelector && rootEl.querySelector('[data-action="check"]')) || null,
            resetBtn: opts.resetBtn || (rootEl && rootEl.querySelector && rootEl.querySelector('[data-action="reset"]')) || null,
            nextBtn:  opts.nextBtn  || null
        };
        const feedback = opts.feedbackEl || (rootEl && rootEl.querySelector && rootEl.querySelector('[data-feedback]')) || null;
        // The host can swap in a `nextBtn` later (e.g. when a sequential
        // runner builds its pager AFTER the exercise is bound).  Re-evaluate
        // `hasBtns.next` per call to applyVisibility so the new button is
        // honoured without a fresh createLifecycle.
        function getHasBtns() {
            return { check: !!buttons.checkBtn, reset: !!buttons.resetBtn, next: !!buttons.nextBtn };
        }
        const hooks = {};
        let state = 'unanswered';
        applyVisibility(buttons, visibilityFor('unanswered', getHasBtns()));
        function on(name, fn) { hooks[name] = fn; return api; }
        function setState(next) {
            if (STATES.indexOf(next) < 0) {
                console.warn('lifecycle: unknown state', next);
                return;
            }
            state = next;
            applyVisibility(buttons, visibilityFor(state, getHasBtns()));
            if (feedback) {
                if (state === 'unanswered' || state === 'selected' || state === 'checking') {
                    feedback.hidden = true;
                    feedback.innerHTML = '';
                    feedback.className = 'exercise__feedback';
                }
            }
            if (hooks[next]) {
                try { hooks[next](); } catch (e) { console.error('lifecycle hook', next, e); }
            }
        }
        function getState() { return state; }
        function reset() {
            // Run the host's reset hook BEFORE flipping to `unanswered` so
            // the host can clear inputs, restore DOM order, re-shuffle items.
            if (hooks['__reset']) {
                try { hooks['__reset'](); } catch (e) { console.error('lifecycle reset hook', e); }
            }
            setState('unanswered');
        }
        // Capture-phase guard: a click on Pruefen that arrives in any state
        // other than `selected` is suppressed.  This is the second line of
        // defence alongside ExerciseEngine.once() and registerResult's
        // idempotency map.
        if (buttons.checkBtn) {
            buttons.checkBtn.addEventListener('click', (e) => {
                if (state !== 'selected') {
                    e.stopImmediatePropagation();
                    e.preventDefault();
                }
            }, true);
        }
        const api = { setState, getState, reset, on, buttons, feedback, STATES,
            setNextBtn(btn) { buttons.nextBtn = btn; applyVisibility(buttons, visibilityFor(state, getHasBtns())); }
        };
        // Expose the lifecycle on the root element so a host like the
        // sequential exercise runner can hand it a dynamically-built
        // Weiter button after the exercise is already bound.
        if (rootEl) rootEl.__lifecycle = api;
        return api;
    }

    /* Render a generic exercise based on its type */
    function renderExercise(exercise, opts) {
        const mod = getType(exercise.type);
        if (!mod) return '<div class="exercise"><p>Unbekannter Aufgabentyp: ' + escapeHtml(exercise.type) + '</p></div>';
        return mod.render(exercise, opts || {});
    }

    // Render an exercise (or a list) into a mount selector. When a single
    // task object is passed, it's rendered once. When an array is passed,
    // a "Aufgabe N von M" pager is used.
    //
    // The exercise's own bind() is responsible for calling
    // ExerciseEngine.registerResult() (each exercise module does this
    // inside its check handler).  This wrapper does NOT call registerResult
    // again — doing so would double-count stats.  It only handles
    // Learner.record() and invokes opts.onResult().
    function renderOne(mountSel, exercise, opts) {
        const mount = typeof mountSel === 'string' ? document.querySelector(mountSel) : mountSel;
        if (!mount) return;
        const mod = getType(exercise.type);
        if (!mod) {
            mount.innerHTML = '<p class="form-error">Unbekannter Aufgabentyp: ' + escapeHtml(exercise.type) + '</p>';
            return;
        }
        mount.innerHTML = '';
        // Inject the exercise HTML.  Template-literal renders commonly start
        // with whitespace (newline after the backtick), which makes the
        // first child of the wrapper a text node.  Move ALL children across
        // so the actual element ends up in `mount` regardless of leading
        // whitespace.
        const html = mod.render(exercise, opts || {});
        const wrap = document.createElement('div');
        wrap.innerHTML = html;
        while (wrap.firstChild) mount.appendChild(wrap.firstChild);
        // Bind the resulting element.
        const host = mount.querySelector('.exercise') || mount.firstChild;
        if (mod.bind) {
            const subject = (opts && opts.subject) || exercise.subject || null;
            const topic = (opts && opts.topic) || exercise.topic || exercise.ref || '_';
            const onResult = (correct, answer) => {
                if (root.Learner && typeof correct === 'boolean') {
                    try {
                        Store.update(state => {
                            const key = exerciseKey(subject, topic, exercise);
                            state.stats._learnerRecorded = state.stats._learnerRecorded || {};
                            if (key && state.stats._learnerRecorded[key]) return state;
                            Learner.record(state, {
                                subject,
                                topic,
                                type: exercise.type,
                                correct: !!correct,
                                timeSec: null,
                                exerciseId: exercise.id || exercise.ref || null,
                                question: exercise.q || exercise.title || null
                            });
                            if (key) state.stats._learnerRecorded[key] = true;
                            return state;
                        });
                        Promise.resolve(Learner.pushToServer()).catch(() => {});
                    } catch (e) { console.warn('Learner.record failed', e); }
                }
                if (opts && opts.onResult) opts.onResult(correct, answer);
            };
            try {
                // Plumb an optional next button through to the module so the
                // lifecycle helper can manage its visibility when the
                // exercise reaches the `next` state.  Modules are free to
                // ignore this — they just won't get the auto-show behaviour.
                const bindOpts = (opts && opts.bindOpts) || {};
                mod.bind(mount, exercise, onResult, bindOpts);
            } catch (e) { console.error('exercise bind failed', e); }
        }
    }

    function renderMany(mountSel, exercises, opts) {
        const mount = typeof mountSel === 'string' ? document.querySelector(mountSel) : mountSel;
        if (!mount) return;
        mount.innerHTML = '';
        let idx = 0;
        const pager = document.createElement('div');
        pager.className = 'pager';
        const host = document.createElement('div');
        const counter = document.createElement('div');
        counter.className = 'muted';
        counter.style.marginTop = '6px';
        mount.appendChild(host);
        mount.appendChild(pager);
        mount.appendChild(counter);
        function show(i) {
            idx = Math.max(0, Math.min(exercises.length - 1, i));
            renderOne(host, exercises[idx], opts);
            counter.textContent = (idx + 1) + ' / ' + exercises.length;
            pager.innerHTML = '';
            const prev = document.createElement('button');
            prev.className = 'btn btn--sm btn--ghost'; prev.textContent = '← Zurück'; prev.type = 'button';
            prev.disabled = idx === 0;
            prev.addEventListener('click', () => show(idx - 1));
            const next = document.createElement('button');
            next.className = 'btn btn--sm btn--primary'; next.textContent = 'Weiter →'; next.type = 'button';
            next.disabled = idx === exercises.length - 1;
            next.addEventListener('click', () => show(idx + 1));
            pager.appendChild(prev); pager.appendChild(next);
        }
        show(0);
    }


    // Translate interface literals only. Learner answers and lesson data stay untouched.
    const ENGLISH_UI = {"Antwort prüfen": "Check answer", "Zurücksetzen": "Reset", "Lösung anzeigen": "Show answer", "Lösung:": "Answer:", "Lösungen:": "Answers:", "Empfehlung:": "Next step:", "Wiederhole das Thema im Lernplan.": "Review this topic in your learning plan.", "Richtig.": "Correct.", "Nicht ganz.": "Not quite.", "Antwortmöglichkeiten": "Answer choices", "Lückentext": "Fill in the gaps", "Ergänze die Lücken.": "Complete the gaps.", "Lücke": "Gap", "Reihenfolge": "Order", "Reihenfolge prüfen": "Check order", "Bringe die Bausteine in die richtige Reihenfolge.": "Put the parts in the correct order.", "Nach oben": "Move up", "Nach unten": "Move down", "Richtige Reihenfolge:": "Correct order:", "Zuordnung": "Matching", "Zuordnungen prüfen": "Check matches", "Ordne die Paare zu.": "Match the pairs.", "Alle Zuordnungen korrekt.": "All matches are correct.", "Noch nicht alle richtig.": "Some matches are not correct yet.", "Fehlerkorrektur": "Error correction", "Korrigiere die Fehler im Text.": "Correct the mistakes in the text.", "Klicke auf die markierten Stellen, um die Korrekturen vorzunehmen.": "Select the marked parts to correct them.", "Korrektur prüfen": "Check corrections", "Ersetze:": "Replace:", "Korrektur eingeben": "Enter your correction", "Abbrechen": "Cancel", "Übernehmen": "Apply", "Alle Korrekturen richtig.": "All corrections are correct.", "Einige Korrekturen fehlen oder sind noch falsch.": "Some corrections are missing or still incorrect.", "Karteikarten": "Flashcards", "Karte umdrehen": "Flip card", "Vorderseite": "Front", "Rückseite": "Back", "Zurück": "Back", "Weiter": "Next", "Umdrehen": "Flip", "Schwer": "Hard", "Wiederholen": "Review", "Kann ich": "I know this", "Freie Antwort": "Written response", "Deine Antwort (4–8 Sätze)": "Your response (4–8 sentences)", "Selbst bewerten": "Self-check", "Selbstbewertung": "Self-assessment", "Musterlösung": "Model answer", "KI-Feedback wird angefragt …": "Requesting AI feedback …", "KI-Feedback nicht verfügbar": "AI feedback unavailable", "KI-Feedback": "AI feedback", "Wortzahl:": "Word count:", "Empfehlung: mind.": "Suggested minimum:", "Länge ausreichend": "Suitable length", "Mehr Wörter schreiben": "Develop your response", "Tipp: Vergleiche deine Antwort mit der Musterlösung. Notiere dir, was du ergänzen würdest.": "Compare your response with the model. Note what you would add.", "Hinweis: KI-Feedback ist eine Hilfe, keine offizielle Bewertung.": "AI feedback is a learning aid, not an official grade.", "(keine hinterlegt)": "(no model provided)", "Unbekannter Fehler.": "Unknown error.", "Aufgabenverständnis": "Understanding the task", "Inhalt": "Content", "Struktur": "Structure", "Sprache": "Language", "Operatorerfüllung": "Following the instruction", "Quelle:": "Source:", "Stärken": "Strengths", "Schwächen": "Areas to improve", "Tipps": "Tips", "Nächster Schritt:": "Next step:", "KI-Feedback ist eine Lernhilfe, keine offizielle Bewertung.": "AI feedback is a learning aid, not an official grade.", "Schreibaufgabe mit Timer": "Timed writing", "Operator-Hinweise:": "Task guidance:", "Hier schreiben …": "Write here …", "Entwurf wird automatisch gespeichert.": "Your draft is saved automatically.", "Timer starten": "Start timer", "Abgeben": "Submit", "Läuft": "Running", "Pausiert": "Paused", "Abgegeben": "Submitted", "Aufgabe beendet": "Task finished", "Bearbeitungszeit:": "Time spent:", "Minuten": "minutes", "Wörter": "words", "Selbstkontrolle: Beachte die Operator-Hinweise und vergleiche mit einer Musterlösung, falls verfügbar.": "Self-check: follow the task guidance and compare with a model if available.", "Entwurf geladen (": "Draft loaded (", "Entwurf gespeichert (": "Draft saved (", " Zeichen).": " characters).", " Zeichen, ": " characters, ", "Reihenfolge korrekt.": "Correct order.", "Reihenfolge überprüfen.": "Check the order again.", "Noch nicht alle korrekt.": "Some corrections are not correct yet.", "Ordne die Begriffe den Bedeutungen zu.": "Match the terms with their meanings.", "Klicke zuerst links, dann rechts.": "Choose an item on the left, then one on the right.", "Prüfen": "Check", "Schreibaufgabe": "Writing task", "Wird vorbereitet …": "Getting ready …", "Schwierigkeit": "Difficulty", "Leicht": "Easy", "← Zurück zur Übersicht": "← Back to overview", "Leertaste zum Umdrehen · Pfeiltasten zum Navigieren": "Space to flip · Arrow keys to navigate", "Vorherige": "Previous", "Nächste": "Next", "Wiederholung: ": "Review: ", "neu": "new", "DEIN ATLAS / ": "YOUR ATLAS / ", "DEIN INHALTSVERZEICHNIS": "YOUR CONTENTS", "Was möchtest<br> du <em>entdecken?</em>": "What would you<br> like to <em>discover?</em>", "Lektionen zum Verstehen, Anwenden und Wiederholen.": "lessons to understand, practise and review.", "Deine Wiederholungen": "Your reviews", "Lektionen durchsuchen": "Search lessons", "Ein Thema finden …": "Find a topic …", "Alle Kapitel": "All chapters", "Noch offen": "Not completed", "Abgeschlossen": "Completed", "Noch kein Treffer. Probiere einen anderen Begriff oder zeige alle Kapitel.": "No matches yet. Try another term or show all chapters."};
    const UI_KEYS = Object.keys(ENGLISH_UI).sort((a,b)=>b.length-a.length);
    function text(ex, value) { return ex?.subject === 'en' ? (ENGLISH_UI[value] || value) : value; }
    function ui(ex) {
        return (parts,...values) => parts.map((part,i)=>{
            if(ex?.subject === 'en') {
                // One pass avoids translating a word twice inside a longer label.
                const pattern=new RegExp(UI_KEYS.map(k=>k.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')).join('|'),'g');
                part=part.replace(pattern,key=>ENGLISH_UI[key]);
            }
            return part+(i<values.length?values[i]:'');
        }).join('');
    }

    root.ExerciseEngine = {
        text, ui,
        TYPES, isCorrect, registerResult, toast, showModal, svgChart, escapeHtml, renderExercise, renderOne, renderMany, getType, once, createLifecycle
    };
})(window);
