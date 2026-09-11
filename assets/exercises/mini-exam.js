/* Mini-exam / mock exam: bundles multiple sub-tasks.
   Three full variants per subject (variant 1/2/3) to allow repeat practice.
   Parts are bound DURING the exam so user answers are recorded at any time. */
(function (root) {
    const BUNDLES = {
        de: {
            'mini-exam:de-1': {
                id: 'mini-exam:de-1', title: 'Übungsklausur Deutsch – Variante 1', durationMin: 240,
                parts: [
                    { type: 'mc', topic: 'operatoren', q: 'Welcher Operator verlangt eine eigene begründete Stellungnahme?',
                      options: ['zusammenfassen', 'erörtern', 'nacherzählen', 'wiedergeben'], answer: 1, explanation: 'Erörtern verlangt eine eigene begründete Position.' },
                    { type: 'sort', topic: 'textanalyse_sachtext', items: [
                        'Einleitung: Textsorte, Quelle, Thema, Kernaussage',
                        'Hauptteil: Inhalt und Argumentation',
                        'Hauptteil: sprachliche Mittel mit Wirkung',
                        'Schluss: Intention und Fazit'
                    ], explanation: 'Schema der Sachtextanalyse.' },
                    { type: 'fill', topic: 'grammatik', text: '___ Jugendliche Informationen niedrigschwellig erhalten, ist das ein Argument für soziale Medien.',
                      answers: [['weil', 'da', 'denn']], explanation: 'Begründung mit Konjunktor.' },
                    { type: 'error', topic: 'rechtschreibung', text: 'Wegen dem schlechten Wetter, fanden die Spiele nicht statt. Er sagte das er morgen kommt.',
                      corrections: [
                        { find: 'Wegen dem', replace: 'Wegen des', why: 'Wegen + Genitiv.' },
                        { find: 'das er morgen kommt', replace: 'dass er morgen kommt', why: 'Konjunktion „dass" (zwei s).' }
                      ] },
                    { type: 'timed-writing', topic: 'erorterung', q: 'Erörtern Sie: Sollte die Nutzung sozialer Medien für Jugendliche unter 16 Jahren eingeschränkt werden?',
                      durationMin: 60, lang: 'de', explanation: 'Schreibe eine lineare Erörterung: Pro, Contra, eigene Position.' }
                ]
            },
            'mini-exam:de-2': {
                id: 'mini-exam:de-2', title: 'Übungsklausur Deutsch – Variante 2', durationMin: 240,
                parts: [
                    { type: 'mc', topic: 'operatoren', q: 'Welcher Operator gehört zu AFB II?',
                      options: ['nennen', 'analysieren', 'erörtern', 'beurteilen'], answer: 1, explanation: 'Analysieren ist Reorganisation/Analyse.' },
                    { type: 'mc', topic: 'textanalyse_literarisch', q: 'Was untersucht eine literarische Analyse NICHT primär?',
                      options: ['Sprachbilder', 'Erzählperspektive', 'Aktienkurs der Autorin', 'Figurenkonstellation'], answer: 2, explanation: 'Aktienkurse sind wirtschaftlich, nicht literarisch.' },
                    { type: 'fill', topic: 'grammatik', text: 'Der Autor ___, den Roman in drei Teile ___.', answers: [['gliedert', 'gliederte'], ['teilt', 'teilte']], explanation: 'Passende Zeitform (Präsens oder Präteritum).' },
                    { type: 'error', topic: 'rechtschreibung', text: 'Das Buch, das ich letztens gekauft habe, ist sehr spannend. Er hat sich gut erholt, weil er viel geschlafen hat.', corrections: [
                        { find: 'weil er viel geschlafen hat', replace: ', weil er viel geschlafen hat', why: 'Komma vor „weil" als Nebensatz-Einleitung.' }
                    ] },
                    { type: 'timed-writing', topic: 'erorterung', q: 'Erörtern Sie, ob künstliche Intelligenz an Schulen eingesetzt werden sollte.',
                      durationMin: 60, lang: 'de', explanation: 'Pro/Contra mit Beispielen, eigene Position.' }
                ]
            },
            'mini-exam:de-3': {
                id: 'mini-exam:de-3', title: 'Übungsklausur Deutsch – Variante 3', durationMin: 240,
                parts: [
                    { type: 'mc', topic: 'textanalyse_sachtext', q: 'Was gehört typischerweise in die Einleitung einer Sachtextanalyse?',
                      options: ['Eine ausführliche eigene Meinung', 'Autor, Quelle, Textsorte, Thema, Kernaussage', 'Eine wörtliche Nacherzählung', 'Eine Liste aller Argumente'], answer: 1, explanation: 'Knappe, sachliche Einleitung.' },
                    { type: 'match', topic: 'grammatik', title: 'Begriff und Beispiel', pairs: [['Subjekt','Die Schülerin'],['Prädikat','liest'],['Dativobjekt','dem Buch'],['Akkusativobjekt','den Roman']] },
                    { type: 'cloze', topic: 'textanalyse_literarisch', text: 'Der Erzähler schildert das Geschehen aus der Sicht einer ___.', answers: [['Ich-Perspektive', 'personalen', 'auktorialen']], explanation: 'Perspektivwahl.' },
                    { type: 'timed-writing', topic: 'materialgestuetztes_schreiben', q: 'Verfasse einen materialgestützten Text zum Thema „Mobilität der Zukunft".',
                      durationMin: 60, lang: 'de', explanation: 'Material sinnvoll einbinden, eigene Meinung kennzeichnen.' }
                ]
            }
        },
        en: {
            'mini-exam:en-1': {
                id: 'mini-exam:en-1', title: 'Übungsklausur Englisch – Variante 1', durationMin: 240,
                parts: [
                    { type: 'mc', topic: 'operators', q: 'Which operator requires a personal opinion with reasons?',
                      options: ['outline', 'comment on', 'summarise', 'list'], answer: 1, explanation: '„Comment on" asks for your opinion, supported by reasons.' },
                    { type: 'match', topic: 'formal_informal', pairs: [
                        ['want', 'would like'],
                        ['get', 'receive'],
                        ['a lot of', 'numerous'],
                        ['don\'t', 'do not']
                    ], explanation: 'Formal English avoids contractions and uses precise verbs.' },
                    { type: 'fill', topic: 'grammar_tenses', text: 'If I ___ more time, I ___ Spanish.',
                      answers: [['had'], ['would learn']], explanation: 'Conditional Type 2.' },
                    { type: 'error', topic: 'grammar_tenses', text: 'Yesterday I have went to the library and I have read a book.',
                      corrections: [
                        { find: 'have went', replace: 'went', why: 'Irregular past participle; finished time → Past Simple.' }
                      ] },
                    { type: 'timed-writing', topic: 'comment', q: 'Comment on the following statement: “Social media does more harm than good to teenagers.” (about 200 words)',
                      durationMin: 60, lang: 'en', explanation: 'Reference the statement, give reasons, conclude with your opinion.' }
                ]
            },
            'mini-exam:en-2': {
                id: 'mini-exam:en-2', title: 'Übungsklausur Englisch – Variante 2', durationMin: 240,
                parts: [
                    { type: 'mc', topic: 'grammar_tenses', q: 'Choose the correct sentence.',
                      options: ['I have been to Italy last summer.', 'I went to Italy last summer.', 'I have went to Italy last summer.', 'I was going to Italy last summer.'], answer: 1, explanation: 'With a finished time, use Past Simple.' },
                    { type: 'fill', topic: 'grammar_tenses', text: 'If she ___ harder, she ___ the exam.', answers: [['had studied'], ['would have passed']], explanation: 'Conditional Type 3.' },
                    { type: 'mc', topic: 'mediation', q: 'What is the main goal of mediation?',
                      options: ['Translate word for word', 'Adapt content for a different audience', 'Give your own opinion', 'Invent new information'], answer: 1, explanation: 'Mediation adapts content and register.' },
                    { type: 'sort', topic: 'comment', items: ['Introduction: reference the text and your opinion', 'Main body: reasons and examples', 'Conclusion: summary and final thought'], explanation: 'Order a comment.' },
                    { type: 'timed-writing', topic: 'mediation', q: 'Mediate the following German article about Karlsruhe into an English email for exchange students (about 150 words).',
                      durationMin: 60, lang: 'en', explanation: 'Adapt audience, keep facts, neutral tone.' }
                ]
            },
            'mini-exam:en-3': {
                id: 'mini-exam:en-3', title: 'Übungsklausur Englisch – Variante 3', durationMin: 240,
                parts: [
                    { type: 'mc', topic: 'reading', q: 'When reading an article, the best first step is to …',
                      options: ['Look at the pictures', 'Skim the text to find the main claim', 'Write your own opinion', 'Translate the article'], answer: 1, explanation: 'Skim first to understand structure.' },
                    { type: 'match', topic: 'vocabulary_themes', title: 'Word and synonym', pairs: [['big','enormous'],['start','commence'],['end','conclude'],['show','demonstrate']] },
                    { type: 'error', topic: 'grammar_tenses', text: 'If I would have more time, I will learn Spanish. She don\'t like coffee.', corrections: [
                        { find: 'If I would have more time', replace: 'If I had more time', why: 'Type 2: „If + past simple".' },
                        { find: 'will learn', replace: 'would learn', why: 'Type 2 main clause.' },
                        { find: 'don\'t', replace: 'doesn\'t', why: 'Third person singular needs -s.' }
                    ] },
                    { type: 'timed-writing', topic: 'summary', q: 'Summarise the article in about 120 words and give your opinion in a final sentence.',
                      durationMin: 60, lang: 'en', explanation: 'Summary: neutral, no own opinion in body. Final sentence may give opinion.' }
                ]
            }
        },
        math: {
            'mini-exam:math-1': {
                id: 'mini-exam:math-1', title: 'Übungsklausur Mathematik – Variante 1', durationMin: 240,
                parts: [
                    { type: 'mc', topic: 'funktionen', q: 'Welche Funktion ist achsensymmetrisch zur y-Achse?',
                      options: ['f(x) = x³', 'f(x) = sin(x)', 'f(x) = x²', 'f(x) = eˣ'], answer: 2, explanation: 'Gerade Exponenten → achsensymmetrisch.' },
                    { type: 'math-input', topic: 'funktionen', q: 'Löse x² - 5x + 6 = 0. Gib die kleinere Lösung an.', answers: ['2'], explanation: 'x = 2 oder x = 3.' },
                    { type: 'math-input', topic: 'differentialrechnung', q: 'Ableitung von f(x) = 3x² an der Stelle x = 2. f′(2) = ?', answers: ['12'], explanation: 'f′(x) = 6x → f′(2) = 12.' },
                    { type: 'fill', topic: 'lineare_funktionen', q: 'Steigung der Geraden durch (1,2) und (4,8).', text: 'm = ___', answers: [['2']], explanation: 'm = (8-2)/(4-1) = 2.' },
                    { type: 'mc', topic: 'trigonometrie', q: 'sin(30°) = ?', options: ['0','0,5','1','√2/2'], answer: 1, explanation: 'sin(30°) = 0,5.' },
                    { type: 'mc', topic: 'vektoren', q: 'Wie berechnet man den Betrag des Vektors (3,4)?', options: ['3 + 4 = 7','3² + 4² = 25','√(3² + 4²) = 5','3·4 = 12'], answer: 2, explanation: '|v| = √(x² + y²).' },
                    { type: 'mc', topic: 'stochastik', q: 'P(A ∪ B) = ?', options: ['P(A) + P(B)','P(A) + P(B) - P(A∩B)','P(A)·P(B)','1'], answer: 1, explanation: 'Additionssatz.' }
                ]
            },
            'mini-exam:math-2': {
                id: 'mini-exam:math-2', title: 'Übungsklausur Mathematik – Variante 2', durationMin: 240,
                parts: [
                    { type: 'mc', topic: 'quadratische_funktionen', q: 'Wie viele Nullstellen hat f(x) = x² - 4?', options: ['0','1','2','3'], answer: 2, explanation: 'x = ±2.' },
                    { type: 'math-input', topic: 'quadratische_funktionen', q: 'Löse x² - 9 = 0. Gib die positive Lösung an.', answers: ['3'], explanation: 'x = 3.' },
                    { type: 'mc', topic: 'ableitungsregeln', q: 'Ableitung von f(x) = sin(x)?', options: ['cos(x)','-cos(x)','-sin(x)','tan(x)'], answer: 0, explanation: 'd/dx sin(x) = cos(x).' },
                    { type: 'mc', topic: 'integralrechnung', q: '∫ 2x dx = ?', options: ['2','x²','x² + C','2x² + C'], answer: 2, explanation: 'Stammfunktion + Konstante.' },
                    { type: 'math-input', topic: 'integralrechnung', q: 'Bestimme die Fläche unter f(x) = 2x von 0 bis 3.', answers: ['9'], explanation: '∫₀³ 2x dx = x²|₀³ = 9.' },
                    { type: 'mc', topic: 'matrizen', q: 'Determinante der 2x2-Einheitsmatrix?', options: ['0','1','2','-1'], answer: 1, explanation: 'det(I) = 1.' }
                ]
            },
            'mini-exam:math-3': {
                id: 'mini-exam:math-3', title: 'Übungsklausur Mathematik – Variante 3', durationMin: 240,
                parts: [
                    { type: 'mc', topic: 'logarithmus', q: 'log_2(8) = ?', options: ['2','3','4','8'], answer: 1, explanation: '2³ = 8.' },
                    { type: 'fill', topic: 'logarithmus', q: 'log(100) (Basis 10) = ___', text: 'log(100) = ___', answers: [['2']], explanation: '10² = 100.' },
                    { type: 'mc', topic: 'trigonometrie', q: 'cos(0°) = ?', options: ['0','0,5','1','-1'], answer: 2, explanation: 'cos(0°) = 1.' },
                    { type: 'mc', topic: 'vektoren', q: 'Skalarprodukt (1,2)·(3,4) = ?', options: ['5','11','7','10'], answer: 1, explanation: '1·3 + 2·4 = 11.' },
                    { type: 'mc', topic: 'stochastik', q: 'Würfelwurf: P(Gerade) = ?', options: ['1/6','1/3','1/2','2/3'], answer: 2, explanation: '3 von 6 = 1/2.' },
                    { type: 'mc', topic: 'binomialverteilung', q: 'Bei n = 10, p = 0,5, Erwartungswert = ?', options: ['1','5','10','0,5'], answer: 1, explanation: 'E(X) = n·p = 5.' }
                ]
            }
        }
    };

    // Map final exam ref used in the plan to a specific variant.
    function resolveBundleId(subject, variant) {
        const v = variant || 1;
        return 'mini-exam:' + subject + '-' + v;
    }
    function listBundles(subject) {
        return Object.values(BUNDLES[subject] || {});
    }
    function buildBundle(subject, variant) {
        if (!BUNDLES[subject]) return null;
        const id = resolveBundleId(subject, variant);
        return BUNDLES[subject][id] || listBundles(subject)[0];
    }

    function render(ex) {
        const subject = ex.subject;
        const variant = ex.variant || 1;
        const bundle = buildBundle(subject, variant);
        if (!bundle) return '<div class="empty">Keine Übungsklausur gefunden.</div>';
        const label = subject === 'de' ? 'Deutsch' : (subject === 'en' ? 'Englisch' : 'Mathematik');
        return `
            <div class="exercise" data-bundle-id="${bundle.id}" data-subject="${subject}">
                <div class="exercise__header">
                    <div>
                        <div class="exercise__type">${label} – Übungsklausur</div>
                        <h3 style="margin:4px 0 0">${escapeAttr(bundle.title)}</h3>
                    </div>
                    <div class="muted" data-status>Dauer: ${bundle.durationMin} min · ${bundle.parts.length} Aufgaben</div>
                </div>
                <p class="muted">Bearbeite die Aufgaben nacheinander. Der Timer beginnt, sobald du startest. Eine Lösung wird erst nach Abgabe sichtbar.</p>
                <div class="row" style="margin:8px 0">
                    <label>Variante:&nbsp;</label>
                    <select class="input" data-variant style="max-width:120px">
                        <option value="1" ${variant===1?'selected':''}>Variante 1</option>
                        <option value="2" ${variant===2?'selected':''}>Variante 2</option>
                        <option value="3" ${variant===3?'selected':''}>Variante 3</option>
                    </select>
                </div>
                <div class="timer" data-display>${formatTime(bundle.durationMin * 60)}</div>
                <div class="timer__bar" data-bar><div class="timer__fill" data-fill style="width:100%"></div></div>
                <div class="exercise__actions">
                    <button class="btn btn--primary" data-action="start">Klausur starten</button>
                    <button class="btn btn--ghost" data-action="finish" disabled>Abgeben & auswerten</button>
                </div>
                <div data-parts></div>
                <div class="exercise__feedback" data-result hidden></div>
            </div>
        `;
    }
    function formatTime(s) {
        const m = Math.floor(s / 60);
        const sec = s % 60;
        return String(m).padStart(2, '0') + ':' + String(sec).padStart(2, '0');
    }
    function isCorrect(ex, answer) { return true; }

    function escapeAttr(s) {
        return String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
    }

    // Auto-save draft to localStorage so reloads don't lose work.
    function draftKey(bundleId) { return 'fhr-app/draft/' + bundleId; }
    function loadDraft(bundleId) {
        try { return JSON.parse(localStorage.getItem(draftKey(bundleId)) || 'null'); } catch (_) { return null; }
    }
    function saveDraft(bundleId, answers) {
        try { localStorage.setItem(draftKey(bundleId), JSON.stringify({ answers, savedAt: Date.now() })); } catch (_) {}
    }
    function clearDraft(bundleId) {
        try { localStorage.removeItem(draftKey(bundleId)); } catch (_) {}
    }

    function bind(container, ex, onResult) {
        const subject = ex.subject;
        let variant = ex.variant || 1;
        let bundle = buildBundle(subject, variant);

        function rerender() {
            // Re-render with current variant, preserving any started state.
            container.innerHTML = render(Object.assign({}, ex, { variant }));
            attach();
        }

        function attach() {
            const root = container.querySelector('[data-bundle-id]');
            if (!root) return;
            const display = root.querySelector('[data-display]');
            const fill = root.querySelector('[data-fill]');
            const bar = root.querySelector('[data-bar]');
            const startBtn = root.querySelector('[data-action="start"]');
            const finishBtn = root.querySelector('[data-action="finish"]');
            const partsRoot = root.querySelector('[data-parts]');
            const result = root.querySelector('[data-result]');
            const status = root.querySelector('[data-status]');
            const variantSel = root.querySelector('[data-variant]');

            const total = bundle.durationMin * 60;
            let remaining = total;
            let interval = null;
            const started = { at: null };
            const draft = loadDraft(bundle.id);

            // Render parts but keep them disabled until started.
            partsRoot.innerHTML = bundle.parts.map((p, i) => {
                const ex2 = Object.assign({}, p, {
                    subject,
                    topic: p.topic || bundle.id,
                    id: bundle.id + ':' + i
                });
                return '<div style="margin-top:12px; opacity:0.55" data-part="' + i + '">' + ExerciseEngine.renderExercise(ex2) + '</div>';
            }).join('');

            function lock(disabled) {
                partsRoot.querySelectorAll('input, textarea, button').forEach(b => {
                    if (b !== startBtn && b !== finishBtn) b.disabled = disabled;
                });
            }
            lock(true);

            // Restore draft answers if present.
            if (draft && Array.isArray(draft.answers)) {
                partsRoot.querySelectorAll('[data-part]').forEach((pe, i) => {
                    const answer = draft.answers[i];
                    if (answer == null) return;
                    if (typeof answer === 'string') {
                        const inp = pe.querySelector('input, textarea');
                        if (inp) inp.value = answer;
                    } else if (Array.isArray(answer)) {
                        const inputs = pe.querySelectorAll('input[data-blank]');
                        inputs.forEach((inp, k) => { if (answer[k] != null) inp.value = answer[k]; });
                    }
                });
            }

            function update() {
                display.textContent = formatTime(remaining);
                const pct = (remaining / total) * 100;
                fill.style.width = pct + '%';
                bar.classList.toggle('is-warn', remaining < total * 0.2);
                bar.classList.toggle('is-danger', remaining <= total * 0.1);
            }

            function readAnswers() {
                const out = [];
                partsRoot.querySelectorAll('[data-part]').forEach((pe) => {
                    const txt = pe.querySelector('textarea');
                    if (txt) { out.push(txt.value); return; }
                    const inputs = pe.querySelectorAll('input[data-blank]');
                    if (inputs.length) {
                        out.push(Array.from(inputs).map(i => i.value));
                        return;
                    }
                    const inps = pe.querySelectorAll('input[type="text"]');
                    if (inps.length) { out.push(inps[0].value); return; }
                    out.push(null);
                });
                return out;
            }

            // Auto-save on input.
            partsRoot.addEventListener('input', () => {
                saveDraft(bundle.id, readAnswers());
            });

            variantSel.addEventListener('change', () => {
                variant = Number(variantSel.value) || 1;
                clearInterval(interval); interval = null;
                rerender();
            });

            startBtn.addEventListener('click', () => {
                lock(false);
                started.at = Date.now();
                interval = setInterval(() => {
                    remaining--;
                    saveDraft(bundle.id, readAnswers());
                    update();
                    if (remaining <= 0) finish();
                }, 1000);
                status.textContent = 'Läuft';
                finishBtn.disabled = false;
                startBtn.disabled = true;
            });

            finishBtn.addEventListener('click', finish);

            function finish() {
                clearInterval(interval); interval = null;
                const elapsed = total - remaining;
                // Bind all parts to record results (so each answer is graded).
                const partEls = partsRoot.querySelectorAll('[data-part]');
                partEls.forEach((pe, i) => {
                    const ex2 = Object.assign({}, bundle.parts[i], { subject, topic: bundle.parts[i].topic || bundle.id });
                    const mod = ExerciseEngine.getType(ex2.type);
                    if (mod && mod.bind) {
                        try { mod.bind(pe, ex2, () => {}); } catch (e) { /* ignore individual part errors */ }
                    }
                });
                Store.update(state => {
                    state.examAttempts = state.examAttempts || [];
                    state.examAttempts.unshift({
                        id: 'exam-' + Date.now(),
                        subject,
                        bundleId: bundle.id,
                        date: new Date().toISOString(),
                        elapsedSec: elapsed,
                        parts: bundle.parts.length
                    });
                    return state;
                });
                clearDraft(bundle.id);
                result.hidden = false;
                result.className = 'exercise__feedback exercise__feedback--ok';
                result.innerHTML = `
                    <div><strong>Klausur beendet</strong></div>
                    <div class="muted" style="margin-top:6px">Bearbeitungszeit: ${Math.round(elapsed/60)} Minuten · ${bundle.parts.length} Aufgaben</div>
                    <div style="margin-top:6px">Vergleiche deine Antworten jetzt oder später mit den Musterlösungen. Operatorenlisten und typische Aufgabenstellungen findest du in den jeweiligen Lektionen.</div>
                `;
                status.textContent = 'Abgegeben';
                if (onResult) onResult(true);
            }

            update();
        }

        attach();
    }

    root.Exercises = root.Exercises || {};
    root.Exercises['mini-exam'] = { render, isCorrect, bind, buildBundle, listBundles };
    root.Exercises['mock-exam'] = { render, isCorrect, bind, buildBundle, listBundles };
})(window);
