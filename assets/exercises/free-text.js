/* Free-text exercise: rule-based local grading for short answers.
   For longer answers, the user can self-evaluate and an AI feedback
   button is available (uses /api/ai if available).
   Lifecycle:
     unanswered  --type in textarea-->  selected
     selected    --click Selbst bewerten-->  checking -> checked-correct | checked-wrong
     any state   --click Zuruecksetzen-->  unanswered  (clears textarea, restores Pruefen)
*/
(function (root) {
    function render(ex) {
        return ExerciseEngine.ui(ex)`
            <div class="exercise" data-topic="${ExerciseEngine.escapeHtml(ex.topic || '')}">
                <div class="exercise__header"><div class="exercise__type">Freie Antwort</div></div>
                <div class="exercise__q">${ExerciseEngine.escapeHtml(ex.q)}</div>
                ${ex.context ? `<div class="example" style="margin-bottom:8px">${ExerciseEngine.escapeHtml(ex.context)}</div>` : ''}
                <textarea class="textarea" data-input placeholder="Deine Antwort (4–8 Sätze)"></textarea>
                <div class="exercise__actions">
                    <button class="btn btn--primary" data-action="check" disabled>Selbst bewerten</button>
                    <button class="btn btn--ghost" data-action="reset">Zurücksetzen</button>
                    <button class="btn btn--ghost" data-action="model">Musterlösung</button>
                    <button class="btn btn--ghost" data-action="ai" title="Optional: KI-Feedback">KI-Feedback</button>
                </div>
                <div class="exercise__feedback" data-feedback hidden></div>
            </div>
        `;
    }

    function isCorrect(ex, answer) {
        if (!answer || typeof answer !== 'string') return false;
        // Local rule: must include at least one keyword from the model answer
        const keywords = ex.keywords || [];
        if (keywords.length === 0) return false;
        const lower = answer.toLowerCase();
        return keywords.some(k => lower.includes(String(k).toLowerCase()));
    }

    // Baut das Markup für strukturiertes Feedback (Aufgabenverständnis, Inhalt,
    // Struktur, Sprache, Operatorerfüllung + Stärken/Schwächen/Tipps).
    function renderStructuredFeedback(fb, source, ex) {
        if (!fb) return '';
        const isAi = source === 'anthropic' || source === 'gemini';
        const isLocal = (source && String(source).startsWith('lokal'));
        const label = isAi
            ? ExerciseEngine.ui(ex)`<span class="tag tag--en">KI-Feedback</span>`
            : '<span class="tag tag--warn">Lokale Einschätzung</span>';
        const note = isAi
            ? ExerciseEngine.text(ex, 'KI-Feedback ist eine Lernhilfe, keine offizielle Bewertung.')
            : 'Ohne gesetzten <code>GEMINI_API_KEY</code> (oder <code>ANTHROPIC_API_KEY</code>) wird das ' +
              'Feedback aus Wortzahl, Satzlänge und Schlüsselwörtern abgeleitet. Lege den Schlüssel in ' +
              '<code>.env</code> an und starte <code>node --env-file=.env server.js</code>, um echte ' +
              'KI-Auswertung zu erhalten.';
        if(ex?.subject === 'en' && !isAi) return '<p><strong>Local self-check</strong></p><p>Automatic feedback is unavailable. Compare your response with the model: check your position, reasons, examples and sentence structure. Word count alone cannot assess your English.</p>';
        const c = fb.criteria || {};
        const order = [
            ['aufgabenverstaendnis', ExerciseEngine.text(ex, 'Aufgabenverständnis')],
            ['inhalt', ExerciseEngine.text(ex, 'Inhalt')],
            ['struktur', ExerciseEngine.text(ex, 'Struktur')],
            ['sprache', ExerciseEngine.text(ex, 'Sprache')],
            ['operatorErfuellung', ExerciseEngine.text(ex, 'Operatorerfüllung')]
        ];
        const criteriaHtml = order.map(([key, label]) => {
            const item = c[key] || { score: 0, comment: '' };
            const dots = renderScoreDots(item.score);
            return ExerciseEngine.ui(ex)`<div class="criteria">
                <div class="criteria__head">
                    <span class="criteria__label">${label}</span>
                    <span class="criteria__score">${dots} <span class="muted">${item.score || '–'}/5</span></span>
                </div>
                ${item.comment ? `<div class="criteria__comment">${ExerciseEngine.escapeHtml(item.comment)}</div>` : ''}
            </div>`;
        }).join('');
        const list = (arr) => Array.isArray(arr) && arr.length
            ? '<ul class="fb-list">' + arr.map(x => `<li>${ExerciseEngine.escapeHtml(x)}</li>`).join('') + '</ul>'
            : '<div class="muted">–</div>';
        return ExerciseEngine.ui(ex)`<div class="structured-feedback">
            <div class="row" style="justify-content:space-between">${label}<span class="muted" style="font-size:0.85em">Quelle: ${ExerciseEngine.escapeHtml(source || 'lokal')}</span></div>
            ${fb.summary ? `<div class="fb-summary">${ExerciseEngine.escapeHtml(fb.summary)}</div>` : ''}
            <div class="fb-criteria">${criteriaHtml}</div>
            <div class="fb-section"><h4>Stärken</h4>${list(fb.staerken)}</div>
            <div class="fb-section"><h4>Schwächen</h4>${list(fb.schwaechen)}</div>
            <div class="fb-section"><h4>Tipps</h4>${list(fb.tipps)}</div>
            ${fb.naechsterSchritt ? `<div class="fb-next"><strong>Nächster Schritt:</strong> ${ExerciseEngine.escapeHtml(fb.naechsterSchritt)}</div>` : ''}
            <div class="muted" style="margin-top:10px; font-size:0.85em">${note}</div>
        </div>`;
    }

    function renderScoreDots(score) {
        const n = Math.max(0, Math.min(5, Math.round(Number(score) || 0)));
        let html = '';
        for (let i = 1; i <= 5; i++) html += '<span class="dot' + (i <= n ? ' dot--on' : '') + '"></span>';
        return html;
    }

    function bind(container, ex, onResult) {
        const root = container.querySelector('.exercise');
        const input = root.querySelector('[data-input]');
        const checkBtn = root.querySelector('[data-action="check"]');
        const resetBtn = root.querySelector('[data-action="reset"]');
        const modelBtn = root.querySelector('[data-action="model"]');
        const aiBtn = root.querySelector('[data-action="ai"]');
        const feedback = root.querySelector('[data-feedback]');

        const lifecycle = ExerciseEngine.createLifecycle(root, { checkBtn, resetBtn, feedbackEl: feedback });

        let submitted = false;

        function updateCheckEnabled() {
            const s = lifecycle.getState();
            if (s === 'checked-correct' || s === 'checked-wrong' || s === 'next') return;
            const has = (input.value || '').trim().length > 0;
            lifecycle.setState(has ? 'selected' : 'unanswered');
        }

        input.addEventListener('input', updateCheckEnabled);

        lifecycle.on('__reset', () => {
            submitted = false;
            input.value = '';
            input.disabled = false;
        });

        checkBtn.addEventListener('click', () => {
            if (lifecycle.getState() !== 'selected') return;
            if (submitted) return;
            submitted = true;
            lifecycle.setState('checking');
            const txt = input.value || '';
            const len = txt.trim().split(/\s+/).filter(Boolean).length;
            const meets = len >= (ex.minWords || 20);
            feedback.hidden = false;
            feedback.className = 'exercise__feedback';
            feedback.innerHTML = ExerciseEngine.ui(ex)`
                <div><strong>Selbstbewertung</strong></div>
                <div class="muted" style="margin-top:6px">Wortzahl: ${len} (Empfehlung: mind. ${ex.minWords || 30})</div>
                <div style="margin-top:6px">${meets ? '<span class="tag tag--en">Länge ausreichend</span>' : '<span class="tag tag--warn">Mehr Wörter schreiben</span>'}</div>
                <div style="margin-top:8px">${ExerciseEngine.escapeHtml(ex.explanation || '')}</div>
                <div class="muted" style="margin-top:6px">Tipp: Vergleiche deine Antwort mit der Musterlösung. Notiere dir, was du ergänzen würdest.</div>
            `;
            // We count self-evaluation as a successful "attempt" so progress is tracked
            const record = ExerciseEngine.registerResult(ex.subject || null, ex.topic || 'free-text', meets, ex, txt);
            lifecycle.setState(meets ? 'checked-correct' : 'checked-wrong');
            if (!(record && record.dedup) && onResult) onResult(meets);
        });

        resetBtn.addEventListener('click', () => {
            lifecycle.reset();
        });

        modelBtn.addEventListener('click', () => {
            feedback.hidden = false;
            feedback.className = 'exercise__feedback';
            feedback.innerHTML = ExerciseEngine.ui(ex)`<div><strong>Musterlösung</strong></div>
                <div style="margin-top:6px; white-space:pre-wrap">${ExerciseEngine.escapeHtml(ex.modelAnswer || ExerciseEngine.text(ex, '(keine hinterlegt)'))}</div>`;
        });

        aiBtn.addEventListener('click', async () => {
            feedback.hidden = false;
            feedback.className = 'exercise__feedback';
            feedback.innerHTML = ExerciseEngine.ui(ex)`<div class="row"><span class="spinner"></span><span class="muted">KI-Feedback wird angefragt …</span></div>`;
            aiBtn.disabled = true;
            try {
                const out = await AI.feedbackFreeText({ prompt: ex.q, answer: input.value, language: ex.subject === 'en' ? 'en' : (ex.lang || 'de') });
                if (out && out.feedback) {
                    feedback.innerHTML = renderStructuredFeedback(out.feedback, out.source, ex);
                } else if (out && out.text) {
                    feedback.innerHTML = ExerciseEngine.ui(ex)`<div><strong>KI-Feedback</strong></div>
                        <div style="margin-top:6px; white-space:pre-wrap">${ExerciseEngine.escapeHtml(out.text)}</div>
                        <div class="muted" style="margin-top:6px">Hinweis: KI-Feedback ist eine Hilfe, keine offizielle Bewertung.</div>`;
                } else {
                    feedback.innerHTML = ExerciseEngine.ui(ex)`<div><strong>KI-Feedback nicht verfügbar</strong></div>
                        <div class="muted" style="margin-top:6px">${ExerciseEngine.escapeHtml(ex.subject==='en'?'Automatic feedback is unavailable.':((out && out.error) || 'Unbekannter Fehler.'))}</div>
                        <div class="muted" style="margin-top:6px">Lege einen <code>GEMINI_API_KEY</code> in <code>.env</code> an und starte <code>node --env-file=.env server.js</code>, um diese Funktion zu aktivieren.</div>`;
                }
            } catch (e) {
                feedback.innerHTML = ExerciseEngine.ui(ex)`<div><strong>KI-Feedback nicht verfügbar</strong></div>
                    <div class="muted" style="margin-top:6px">${ExerciseEngine.escapeHtml(e.message || String(e))}</div>
                    <div class="muted" style="margin-top:6px">Lege einen <code>GEMINI_API_KEY</code> in <code>.env</code> an und starte <code>node --env-file=.env server.js</code>, um diese Funktion zu aktivieren.</div>`;
            } finally {
                aiBtn.disabled = false;
            }
        });
    }

    root.Exercises = root.Exercises || {};
    root.Exercises['free'] = { render, isCorrect, bind };
})(window);
