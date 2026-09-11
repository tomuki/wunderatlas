/* Error correction: user rewrites a flawed text. Locally checks each
   correction entry by string match (case-insensitive, ignoring extra spaces).
   Lifecycle:
     unanswered  --open popover + save-->  selected  (Pruefen enabled)
     selected    --Pruefen-->  checking -> checked-correct|wrong
     any state   --Zuruecksetzen-->  unanswered (clears answers, restores Pruefen)
*/
(function (root) {
    function render(ex) {
        return ExerciseEngine.ui(ex)`
            <div class="exercise" data-topic="${ExerciseEngine.escapeHtml(ex.topic || '')}">
                <div class="exercise__header"><div class="exercise__type">Fehlerkorrektur</div></div>
                <div class="exercise__q">${ExerciseEngine.escapeHtml(ex.q || ExerciseEngine.text(ex, 'Korrigiere die Fehler im Text.'))}</div>
                <p class="muted" style="margin-top:-4px; margin-bottom:8px">Klicke auf die markierten Stellen, um die Korrekturen vorzunehmen.</p>
                <div class="error-text" id="errText-${Math.random().toString(36).slice(2,7)}">${renderMarkedText(ex.text, ex.corrections || [])}</div>
                <div class="exercise__actions">
                    <button class="btn btn--primary" data-action="check">Korrektur prüfen</button>
                    <button class="btn btn--ghost" data-action="reset">Zurücksetzen</button>
                </div>
                <div class="exercise__feedback" data-feedback hidden></div>
            </div>
        `;
    }

    function renderMarkedText(text, corrections) {
        let html = ExerciseEngine.escapeHtml(text);
        for (let i = 0; i < corrections.length; i++) {
            const find = ExerciseEngine.escapeHtml(corrections[i].find);
            const re = new RegExp(escapeRegex(find), 'g');
            html = html.replace(re, `<mark class="err-mark" data-idx="${i}" tabindex="0" role="button" aria-label="Fehler ${i + 1}">${find}</mark>`);
        }
        return html;
    }
    function escapeRegex(s) { return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); }

    function isCorrect(ex, userAnswers) {
        if (!Array.isArray(userAnswers) || !Array.isArray(ex.corrections)) return false;
        return ex.corrections.every((c, i) => {
            const u = (userAnswers[i] || '').trim().toLowerCase();
            return String(c.replace).trim().toLowerCase() === u;
        });
    }

    function bind(container, ex, onResult) {
        const root = container.querySelector('.exercise');
        const marks = root.querySelectorAll('.err-mark');
        const checkBtn = root.querySelector('[data-action="check"]');
        const resetBtn = root.querySelector('[data-action="reset"]');
        const feedback = root.querySelector('[data-feedback]');
        const answers = new Array(ex.corrections.length).fill('');
        let submitted = false;

        const lifecycle = ExerciseEngine.createLifecycle(root, { checkBtn, resetBtn, feedbackEl: feedback });

        function updateCheckEnabled() {
            const s = lifecycle.getState();
            if (s === 'checked-correct' || s === 'checked-wrong' || s === 'next') return;
            const anyFilled = answers.some(a => (a || '').trim() !== '');
            lifecycle.setState(anyFilled ? 'selected' : 'unanswered');
        }

        marks.forEach(m => {
            const idx = Number(m.dataset.idx);
            m.addEventListener('click', () => {
                const s = lifecycle.getState();
                if (s === 'checked-correct' || s === 'checked-wrong' || s === 'next') return;
                openEditor(ex, m, idx, ex.corrections[idx], val => {
                    answers[idx] = val;
                    if (val.trim()) {
                        m.innerHTML = ExerciseEngine.ui(ex)`<span class="err-fix">${ExerciseEngine.escapeHtml(val)}</span>`;
                    } else {
                        // restore original
                        m.innerHTML = ExerciseEngine.escapeHtml(ex.corrections[idx].find);
                    }
                    updateCheckEnabled();
                });
            });
        });

        lifecycle.on('__reset', () => {
            for (let i = 0; i < answers.length; i++) answers[i] = '';
            submitted = false;
            // restore each mark to its original text
            marks.forEach((m, i) => {
                m.innerHTML = ExerciseEngine.escapeHtml(ex.corrections[i].find);
            });
            // close any popovers that might be open
            const open = document.querySelector('.err-popover');
            if (open) open.remove();
        });

        checkBtn.addEventListener('click', () => {
            if (lifecycle.getState() !== 'selected') return;
            if (submitted) return;
            submitted = true;
            lifecycle.setState('checking');
            const correct = isCorrect(ex, answers);
            feedback.hidden = false;
            feedback.className = 'exercise__feedback ' + (correct ? 'exercise__feedback--ok' : 'exercise__feedback--bad');
            const list = ex.corrections.map((c, i) => {
                const ok = (answers[i] || '').trim().toLowerCase() === String(c.replace).trim().toLowerCase();
                return ExerciseEngine.ui(ex)`<li class="${ok ? 'is-correct' : 'is-wrong'}"><strong>${ExerciseEngine.escapeHtml(c.find)}</strong> → <em>${ExerciseEngine.escapeHtml(c.replace)}</em><div class="muted" style="font-size:0.85em">${ExerciseEngine.escapeHtml(c.why || '')}</div></li>`;
            }).join('');
            feedback.innerHTML = ExerciseEngine.ui(ex)`
                <div><strong>${correct ? ExerciseEngine.text(ex, 'Alle Korrekturen richtig.') : ExerciseEngine.text(ex, 'Noch nicht alle korrekt.')}</strong></div>
                <ol style="margin:8px 0 0 1.2em; padding:0">${list}</ol>
            `;
            const record = ExerciseEngine.registerResult(ex.subject || null, ex.topic || 'error-correction', correct, ex, answers);
            lifecycle.setState(correct ? 'checked-correct' : 'checked-wrong');
            if (!(record && record.dedup) && onResult) onResult(correct);
        });

        resetBtn.addEventListener('click', () => {
            lifecycle.reset();
        });
    }

    function openEditor(ex, mark, idx, correction, onSave) {
        const existing = document.querySelector('.err-popover');
        if (existing) existing.remove();
        const pop = document.createElement('div');
        pop.className = 'err-popover';
        pop.style.cssText = 'position:absolute; background:var(--bg-elev); border:1px solid var(--border); border-radius:8px; padding:8px; box-shadow:var(--shadow-md); z-index:10; min-width:220px;';
        pop.innerHTML = ExerciseEngine.ui(ex)`
            <div class="muted" style="font-size:0.8rem; margin-bottom:4px">Ersetze: <em>${ExerciseEngine.escapeHtml(correction.find)}</em></div>
            <input class="input" type="text" value="" placeholder="Korrektur eingeben" />
            <div style="display:flex; gap:6px; margin-top:6px; justify-content:flex-end">
                <button class="btn btn--sm btn--ghost" data-pop="cancel">Abbrechen</button>
                <button class="btn btn--sm btn--primary" data-pop="save">Übernehmen</button>
            </div>
        `;
        const rect = mark.getBoundingClientRect();
        pop.style.top = (rect.bottom + window.scrollY + 4) + 'px';
        pop.style.left = (rect.left + window.scrollX) + 'px';
        document.body.appendChild(pop);
        const input = pop.querySelector('input');
        input.focus();
        const close = () => pop.remove();
        pop.querySelector('[data-pop="cancel"]').addEventListener('click', close);
        pop.querySelector('[data-pop="save"]').addEventListener('click', () => {
            onSave(input.value || '');
            close();
        });
        input.addEventListener('keydown', e => {
            if (e.key === 'Enter') { onSave(input.value || ''); close(); }
            if (e.key === 'Escape') close();
        });
    }

    root.Exercises = root.Exercises || {};
    root.Exercises['error'] = { render, isCorrect, bind };
})(window);
