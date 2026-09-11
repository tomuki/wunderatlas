/* Math input exercise: user enters a numeric/algebraic answer.
   Auto-grading is numeric (tolerant) or string match against an array.
   Lifecycle:
     unanswered  --type into input-->  selected  (Pruefen enabled)
     selected    --click Pruefen-->    checking  -> checked-correct | checked-wrong
     any state   --click Zuruecksetzen-->  unanswered  (clears input, restores Pruefen)
   Reset is a real state transition, NOT location.reload().
*/
(function (root) {
    function render(ex) {
        return `
            <div class="exercise" data-topic="${ExerciseEngine.escapeHtml(ex.topic || '')}">
                <div class="exercise__header"><div class="exercise__type">Rechenaufgabe</div></div>
                <div class="exercise__q">${ExerciseEngine.escapeHtml(ex.q || '')}</div>
                ${ex.context ? `<div class="example" style="margin-bottom:8px">${ExerciseEngine.escapeHtml(ex.context)}</div>` : ''}
                ${ex.hint ? `<p class="muted" style="font-size:0.9em">Tipp: ${ExerciseEngine.escapeHtml(ex.hint)}</p>` : ''}
                <div class="row" style="align-items:center; gap:6px">
                    <input type="text" class="input" data-input placeholder="Antwort eingeben" style="max-width:200px" autocomplete="off">
                    <span class="muted" data-unit>${ex.unit || ''}</span>
                </div>
                <div class="exercise__actions">
                    <button class="btn btn--primary" data-action="check" disabled>Antwort prüfen</button>
                    <button class="btn btn--ghost" data-action="reset">Zurücksetzen</button>
                    <button class="btn btn--ghost" data-action="show">Lösung anzeigen</button>
                </div>
                <div class="exercise__feedback" data-feedback hidden></div>
            </div>
        `;
    }

    // Tolerant numeric comparison: strip whitespace, treat comma as decimal
    // separator, and interpret a trailing percent sign as a value in 0..1
    // (so "5%" becomes 0.05, matching the convention used in answer keys).
    function normalizeNum(s) {
        if (s == null) return null;
        const raw = String(s).trim().replace(/[ \s]/g, '').replace(',', '.');
        const isPercent = /%$/.test(raw);
        const t = raw.replace(/%$/, '');
        const n = Number(t);
        if (isNaN(n)) return null;
        return isPercent ? n / 100 : n;
    }

    function isCorrect(ex, answer) {
        if (Array.isArray(ex.answers)) {
            const userStr = String(answer == null ? '' : answer).trim();
            return ex.answers.some(a => {
                if (typeof a === 'number') {
                    const u = normalizeNum(answer);
                    return u != null && Math.abs(u - a) < 1e-6;
                }
                if (typeof a === 'string') {
                    if (a === userStr) return true;
                    const u = normalizeNum(answer);
                    const an = normalizeNum(a);
                    if (u != null && an != null) return Math.abs(u - an) < 1e-6;
                }
                return false;
            });
        }
        return false;
    }

    function bind(container, ex, onResult) {
        const root = container.querySelector('.exercise');
        const input = root.querySelector('[data-input]');
        const checkBtn = root.querySelector('[data-action="check"]');
        const resetBtn = root.querySelector('[data-action="reset"]');
        const showBtn = root.querySelector('[data-action="show"]');
        const feedback = root.querySelector('[data-feedback]');

        const lifecycle = ExerciseEngine.createLifecycle(root, { checkBtn, resetBtn, feedbackEl: feedback });

        let submitted = false;

        function updateCheckEnabled() {
            const s = lifecycle.getState();
            if (s === 'checked-correct' || s === 'checked-wrong' || s === 'next') return;
            const v = (input.value || '').trim();
            lifecycle.setState(v ? 'selected' : 'unanswered');
        }

        input.addEventListener('input', updateCheckEnabled);
        input.addEventListener('keydown', e => {
            if (e.key === 'Enter' && lifecycle.getState() === 'selected') {
                // Enter submits exactly like the button; capture-phase guard
                // in the lifecycle does the rest.
                checkBtn.click();
            }
        });

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
            const v = input.value;
            const correct = isCorrect(ex, v);
            feedback.hidden = false;
            feedback.className = 'exercise__feedback ' + (correct ? 'exercise__feedback--ok' : 'exercise__feedback--bad');
            const sol = Array.isArray(ex.answers) ? ex.answers[0] : '';
            feedback.innerHTML = `
                <div><strong>${correct ? 'Richtig.' : 'Nicht ganz.'}</strong></div>
                <div style="margin-top:6px">${ExerciseEngine.escapeHtml(ex.explanation || '')}</div>
                ${!correct ? `<div style="margin-top:6px">Lösung: <em>${ExerciseEngine.escapeHtml(String(sol))}</em></div>` : ''}
            `;
            input.disabled = true;
            const record = ExerciseEngine.registerResult(ex.subject || 'math', ex.topic || 'math', correct, ex, v);
            lifecycle.setState(correct ? 'checked-correct' : 'checked-wrong');
            if (!(record && record.dedup) && onResult) onResult(correct);
        });

        showBtn.addEventListener('click', () => {
            const sol = Array.isArray(ex.answers) ? ex.answers[0] : '';
            input.value = sol;
            feedback.hidden = false;
            feedback.className = 'exercise__feedback';
            feedback.innerHTML = `<div><strong>Lösung</strong></div><div class="muted">${ExerciseEngine.escapeHtml(ex.explanation || '')}</div>`;
            submitted = true;
            lifecycle.setState('checked-correct');
        });

        resetBtn.addEventListener('click', () => {
            lifecycle.reset();
        });
    }

    root.Exercises = root.Exercises || {};
    root.Exercises['math-input'] = { render, isCorrect, bind };
})(window);
