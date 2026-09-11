/* Multiple choice exercise.
   Lifecycle:
     unanswered  --select option-->  selected
     selected    --click Pruefen-->  checking  --(evaluate)-->  checked-correct | checked-wrong
     checked-*   --click Weiter-->    next  (host calls onResult which advances the pager)
     any state   --click Zuruecksetzen-->  unanswered  (clears pick, restores Pruefen)
*/
(function (root) {
    function render(ex) {
        const id = 'mc-' + Math.random().toString(36).slice(2, 8);
        const choices = ex.options.map((opt, i) => `
            <button type="button" class="exercise__choice" data-idx="${i}" role="radio" aria-checked="false">${ExerciseEngine.escapeHtml(opt)}</button>
        `).join('');
        return ExerciseEngine.ui(ex)`
            <div class="exercise" data-exercise-id="${id}" data-topic="${ExerciseEngine.escapeHtml(ex.topic || '')}">
                <div class="exercise__header">
                    <div class="exercise__type">Multiple Choice</div>
                </div>
                <div class="exercise__q">${ExerciseEngine.escapeHtml(ex.q)}</div>
                <div class="exercise__choices" role="radiogroup" aria-label="Antwortmöglichkeiten">${choices}</div>
                <div class="exercise__actions">
                    <button class="btn btn--primary" data-action="check" disabled>Antwort prüfen</button>
                    <button class="btn btn--ghost" data-action="reset">Zurücksetzen</button>
                </div>
                <div class="exercise__feedback" data-feedback hidden></div>
            </div>
        `;
    }

    function isCorrect(ex, answer) {
        if (answer == null) return false;
        return Number(answer) === Number(ex.answer);
    }

    function bind(container, ex, onResult) {
        const root = container.querySelector('[data-exercise-id]');
        if (!root) {
            console.warn('multiple-choice bind: no [data-exercise-id] root in container; skipping');
            return;
        }
        const choices = Array.from(root.querySelectorAll('.exercise__choice'));
        const checkBtn = root.querySelector('[data-action="check"]');
        const resetBtn = root.querySelector('[data-action="reset"]');
        const feedback = root.querySelector('[data-feedback]');

        const lifecycle = ExerciseEngine.createLifecycle(root, { checkBtn, resetBtn, feedbackEl: feedback });

        let picked = null;
        let submitted = false; // extra belt-and-braces against double-submit

        // Wire choice buttons.  In `checked-*` states, ignore further picks
        // (the user must click Zurücksetzen to try again).
        choices.forEach(btn => {
            btn.tabIndex = choices.indexOf(btn) === 0 ? 0 : -1;
            btn.addEventListener('keydown', event => {
                if (!['ArrowDown','ArrowUp','ArrowLeft','ArrowRight','Home','End'].includes(event.key)) return;
                if (btn.disabled) return;
                event.preventDefault();
                const i = choices.indexOf(btn);
                const next = event.key === 'Home' ? 0 : event.key === 'End' ? choices.length-1 : (i + (['ArrowRight','ArrowDown'].includes(event.key) ? 1 : -1) + choices.length) % choices.length;
                choices[next].click(); choices[next].focus();
            });
            btn.addEventListener('click', () => {
                if (lifecycle.getState() === 'checked-correct' ||
                    lifecycle.getState() === 'checked-wrong' ||
                    lifecycle.getState() === 'next') return;
                choices.forEach(b => { b.classList.remove('is-selected'); b.setAttribute('aria-checked', 'false'); b.tabIndex = -1; });
                btn.tabIndex = 0;
                btn.classList.add('is-selected');
                btn.setAttribute('aria-checked', 'true');
                picked = btn.dataset.idx;
                lifecycle.setState('selected');
            });
        });

        // Reset hook runs before the lifecycle flips back to `unanswered`
        // so the host can clear class lists and re-enable inputs.
        lifecycle.on('__reset', () => {
            picked = null;
            submitted = false;
            choices.forEach(b => {
                b.classList.remove('is-selected', 'is-correct', 'is-wrong');
                b.setAttribute('aria-checked', 'false');
                b.disabled = false;
                b.tabIndex = choices.indexOf(b) === 0 ? 0 : -1;
            });
        });

        checkBtn.addEventListener('click', () => {
            // Re-check guard: capture-phase listener in the lifecycle will
            // already have stopped events outside `selected`, but be explicit.
            if (lifecycle.getState() !== 'selected') return;
            if (picked == null) return;
            if (submitted) return;
            submitted = true;
            lifecycle.setState('checking');
            const correct = Number(picked) === Number(ex.answer);
            // Lock the choices and apply outcome classes BEFORE the visible
            // state change so feedback is fully populated when shown.
            choices.forEach((b, i) => {
                b.disabled = true;
                if (i === Number(ex.answer)) b.classList.add('is-correct');
                if (i === Number(picked) && !correct) b.classList.add('is-wrong');
            });
            feedback.hidden = false;
            feedback.className = 'exercise__feedback ' + (correct ? 'exercise__feedback--ok' : 'exercise__feedback--bad');
            feedback.innerHTML = ExerciseEngine.ui(ex)`
                <div><strong>${correct ? ExerciseEngine.text(ex, 'Richtig.') : ExerciseEngine.text(ex, 'Nicht ganz.')}</strong></div>
                <div style="margin-top:6px">${ExerciseEngine.escapeHtml(ex.explanation || '')}</div>
                ${!correct ? ExerciseEngine.ui(ex)`<div style="margin-top:6px">Lösung: <em>${ExerciseEngine.escapeHtml(ex.options[ex.answer])}</em></div>` : ''}
                <div class="muted" style="margin-top:6px">Empfehlung: ${ExerciseEngine.escapeHtml(ex.recommendation || ExerciseEngine.text(ex, 'Wiederhole das Thema im Lernplan.'))}</div>
            `;
            // recordResult is idempotent on its own, but we also guard via
            // the `submitted` flag so a same-tick double-click never even
            // calls it twice.
            const record = ExerciseEngine.registerResult(ex.subject || null, ex.topic || 'mc', correct, ex, picked);
            lifecycle.setState(correct ? 'checked-correct' : 'checked-wrong');
            // Tell the host so the pager can show its Weiter button.
            // onResult is called EXACTLY ONCE per attempt (the `submitted`
            // flag + idempotency map + capture-phase guard all agree).
            // Scoring deduplication must never suppress the UI transition.
            if (onResult) onResult(correct);
        });

        // Note: Zurücksetzen is wired by the lifecycle's capture-phase
        // handler indirectly through the buttons.resetBtn listener we'll
        // add below.  Reset is a real state transition, NOT location.reload.
        resetBtn.addEventListener('click', () => {
            lifecycle.reset();
        });
    }

    root.Exercises = root.Exercises || {};
    root.Exercises['mc'] = { render, isCorrect, bind };
})(window);
