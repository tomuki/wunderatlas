/* Fill-in-the-blank exercise. Accepts an array of accepted answers per blank.
   Lifecycle:
     unanswered  --type into blank-->  selected  (Pruefen enabled)
     selected    --click Pruefen-->    checking  -> checked-correct | checked-wrong
     any state   --click Zuruecksetzen-->  unanswered  (clears inputs, restores Pruefen)
   Reset is a real state transition, NOT location.reload().
*/
(function (root) {
    function render(ex) {
        const parts = ex.text.split('___');
        let html = '<div class="cloze-text">';
        parts.forEach((p, i) => {
            html += ExerciseEngine.escapeHtml(p);
            if (i < parts.length - 1) {
                html += `<span class="cloze-blank"><input type="text" data-blank="${i}" aria-label="Lücke ${i + 1}" autocomplete="off" autocapitalize="off" spellcheck="false"></span>`;
            }
        });
        html += '</div>';
        return ExerciseEngine.ui(ex)`
            <div class="exercise" data-topic="${ExerciseEngine.escapeHtml(ex.topic || '')}">
                <div class="exercise__header"><div class="exercise__type">Lückentext</div></div>
                <div class="exercise__q">${ExerciseEngine.escapeHtml(ex.q || ExerciseEngine.text(ex, 'Ergänze die Lücken.'))}</div>
                ${html}
                <div class="exercise__actions">
                    <button class="btn btn--primary" data-action="check" disabled>Antwort prüfen</button>
                    <button class="btn btn--ghost" data-action="reset">Zurücksetzen</button>
                    <button class="btn btn--ghost" data-action="show">Lösung anzeigen</button>
                </div>
                <div class="exercise__feedback" data-feedback hidden></div>
            </div>
        `;
    }

    function isCorrect(ex, userAnswers) {
        if (!Array.isArray(userAnswers) || !Array.isArray(ex.answers)) return false;
        return ex.answers.every((opts, i) => {
            const u = (userAnswers[i] || '').trim().toLowerCase();
            return Array.isArray(opts)
                ? opts.some(o => String(o).trim().toLowerCase() === u)
                : String(opts).trim().toLowerCase() === u;
        });
    }

    function bind(container, ex, onResult) {
        const root = container.querySelector('.exercise');
        const inputs = Array.from(root.querySelectorAll('input[data-blank]'));
        const checkBtn = root.querySelector('[data-action="check"]');
        const resetBtn = root.querySelector('[data-action="reset"]');
        const showBtn = root.querySelector('[data-action="show"]');
        const feedback = root.querySelector('[data-feedback]');

        const lifecycle = ExerciseEngine.createLifecycle(root, { checkBtn, resetBtn, feedbackEl: feedback });

        let submitted = false;

        function updateCheckEnabled() {
            const s = lifecycle.getState();
            if (s === 'checked-correct' || s === 'checked-wrong' || s === 'next') return;
            const anyFilled = inputs.some(i => (i.value || '').trim() !== '');
            lifecycle.setState(anyFilled ? 'selected' : 'unanswered');
        }

        inputs.forEach(inp => {
            inp.addEventListener('input', () => updateCheckEnabled());
        });

        lifecycle.on('__reset', () => {
            submitted = false;
            inputs.forEach(inp => {
                inp.value = '';
                inp.disabled = false;
                inp.parentElement.classList.remove('is-correct', 'is-wrong');
            });
        });

        checkBtn.addEventListener('click', () => {
            if (lifecycle.getState() !== 'selected') return;
            if (submitted) return;
            submitted = true;
            lifecycle.setState('checking');
            const values = inputs.map(i => i.value);
            const correct = isCorrect(ex, values);
            inputs.forEach((inp, i) => {
                const opts = Array.isArray(ex.answers[i]) ? ex.answers[i] : [ex.answers[i]];
                const userVal = (values[i] || '').trim().toLowerCase();
                const ok = opts.some(o => String(o).trim().toLowerCase() === userVal);
                inp.parentElement.classList.add(ok ? 'is-correct' : 'is-wrong');
                inp.disabled = true;
            });
            feedback.hidden = false;
            feedback.className = 'exercise__feedback ' + (correct ? 'exercise__feedback--ok' : 'exercise__feedback--bad');
            const correctAnswers = ex.answers.map(a => Array.isArray(a) ? a[0] : a).join(' / ');
            feedback.innerHTML = ExerciseEngine.ui(ex)`
                <div><strong>${correct ? ExerciseEngine.text(ex, 'Richtig.') : ExerciseEngine.text(ex, 'Nicht ganz.')}</strong></div>
                <div style="margin-top:6px">${ExerciseEngine.escapeHtml(ex.explanation || '')}</div>
                ${!correct ? ExerciseEngine.ui(ex)`<div style="margin-top:6px">Lösung: <em>${ExerciseEngine.escapeHtml(correctAnswers)}</em></div>` : ''}
            `;
            const record = ExerciseEngine.registerResult(ex.subject || null, ex.topic || 'fill', correct, ex, values);
            lifecycle.setState(correct ? 'checked-correct' : 'checked-wrong');
            if (onResult) onResult(correct);
        });

        showBtn.addEventListener('click', () => {
            // "Lösung anzeigen" is a separate path that reveals the model
            // answer without recording a result.  Lock the inputs and hide
            // Pruefen.
            const correctAnswers = ex.answers.map(a => Array.isArray(a) ? a[0] : a);
            inputs.forEach((inp, i) => {
                inp.value = correctAnswers[i] || '';
                inp.parentElement.classList.add('is-correct');
                inp.disabled = true;
            });
            feedback.hidden = false;
            feedback.className = 'exercise__feedback';
            feedback.innerHTML = ExerciseEngine.ui(ex)`<div><strong>Lösung</strong></div><div class="muted">${ExerciseEngine.escapeHtml(ex.explanation || '')}</div>`;
            submitted = true;
            lifecycle.setState('checked-correct');
        });

        resetBtn.addEventListener('click', () => {
            lifecycle.reset();
        });
    }

    root.Exercises = root.Exercises || {};
    root.Exercises['fill'] = { render, isCorrect, bind };
})(window);
