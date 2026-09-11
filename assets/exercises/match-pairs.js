/* Match-pairs: connect terms with definitions.
   Lifecycle:
     unanswered  --pick match pair-->  selected  (Pruefen enabled)
     selected    --click Pruefen-->    checking -> checked-correct|wrong
     any state   --Zuruecksetzen-->    unanswered  (clears matches, restores Pruefen)
   Reset is a real state transition.  We do NOT call location.reload().
*/
(function (root) {
    function render(ex) {
        const left = ex.pairs.map((p, i) => ({ key: 'L' + i, text: p[0], match: p[1] }));
        const right = shuffle(left.map(p => ({ key: p.key, text: p.match })));
        const cells = [...left.map(p => ({ side: 'L', ...p })), ...right.map(p => ({ side: 'R', ...p }))];
        return ExerciseEngine.ui(ex)`
            <div class="exercise" data-topic="${ExerciseEngine.escapeHtml(ex.topic || '')}">
                <div class="exercise__header"><div class="exercise__type">Zuordnung</div></div>
                <div class="exercise__q">${ExerciseEngine.escapeHtml(ex.q || ExerciseEngine.text(ex, 'Ordne die Begriffe den Bedeutungen zu.'))}</div>
                <p class="muted" style="margin-top:-4px">Klicke zuerst links, dann rechts.</p>
                <div class="match-grid">${cells.map(c => `<div class="match-cell" data-side="${c.side}" data-key="${c.key}">${ExerciseEngine.escapeHtml(c.text)}</div>`).join('')}</div>
                <div class="exercise__actions">
                    <button class="btn btn--primary" data-action="check" disabled>Prüfen</button>
                    <button class="btn btn--ghost" data-action="reset">Zurücksetzen</button>
                </div>
                <div class="exercise__feedback" data-feedback hidden></div>
            </div>
        `;
    }

    function shuffle(arr) {
        const a = arr.slice();
        for (let i = a.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [a[i], a[j]] = [a[j], a[i]];
        }
        return a;
    }

    function isCorrect(ex, userMatches) {
        if (!userMatches) return false;
        return ex.pairs.every((p, i) => userMatches['L' + i] === 'L' + i);
    }

    function bind(container, ex, onResult) {
        const root = container.querySelector('.exercise');
        const cells = Array.from(root.querySelectorAll('.match-cell'));
        const checkBtn = root.querySelector('[data-action="check"]');
        const resetBtn = root.querySelector('[data-action="reset"]');
        const feedback = root.querySelector('[data-feedback]');

        const lifecycle = ExerciseEngine.createLifecycle(root, { checkBtn, resetBtn, feedbackEl: feedback });

        const picked = { L: null, R: null };
        const matches = {};
        let submitted = false;
        let wrongTimeout = null;

        function updateCheckEnabled() {
            // Enable Pruefen when the user has at least one match.  Drives
            // the `selected` -> ready transition.
            if (lifecycle.getState() === 'unanswered' ||
                lifecycle.getState() === 'selected') {
                if (Object.keys(matches).length > 0) lifecycle.setState('selected');
                else lifecycle.setState('unanswered');
            }
        }

        cells.forEach(c => {
            c.addEventListener('click', () => {
                const s = lifecycle.getState();
                if (s === 'checked-correct' || s === 'checked-wrong' || s === 'next') return;
                if (c.classList.contains('is-matched')) return;
                const side = c.dataset.side;
                if (picked[side] === c) {
                    c.classList.remove('is-picked');
                    picked[side] = null;
                    return;
                }
                cells.forEach(x => { if (x.dataset.side === side) x.classList.remove('is-picked'); });
                c.classList.add('is-picked');
                picked[side] = c;
                if (picked.L && picked.R) {
                    const lKey = picked.L.dataset.key;
                    const rKey = picked.R.dataset.key;
                    if (lKey === rKey) {
                        picked.L.classList.remove('is-picked');
                        picked.R.classList.remove('is-picked');
                        picked.L.classList.add('is-matched');
                        picked.R.classList.add('is-matched');
                        matches[lKey] = rKey;
                        picked.L = null;
                        picked.R = null;
                    } else {
                        picked.L.classList.add('is-wrong');
                        picked.R.classList.add('is-wrong');
                        if (wrongTimeout) clearTimeout(wrongTimeout);
                        wrongTimeout = setTimeout(() => {
                            if (picked.L) picked.L.classList.remove('is-wrong', 'is-picked');
                            if (picked.R) picked.R.classList.remove('is-wrong', 'is-picked');
                            picked.L = null;
                            picked.R = null;
                        }, 600);
                    }
                }
                updateCheckEnabled();
            });
        });

        lifecycle.on('__reset', () => {
            // Cancel any pending wrong-flash timeout so it doesn't fire on
            // an already-reset exercise.
            if (wrongTimeout) { clearTimeout(wrongTimeout); wrongTimeout = null; }
            picked.L = null;
            picked.R = null;
            for (const k of Object.keys(matches)) delete matches[k];
            submitted = false;
            cells.forEach(c => {
                c.classList.remove('is-picked', 'is-matched', 'is-wrong', 'is-correct');
            });
        });

        checkBtn.addEventListener('click', () => {
            if (lifecycle.getState() !== 'selected') return;
            if (submitted) return;
            submitted = true;
            lifecycle.setState('checking');
            const correct = isCorrect(ex, matches);
            feedback.hidden = false;
            feedback.className = 'exercise__feedback ' + (correct ? 'exercise__feedback--ok' : 'exercise__feedback--bad');
            feedback.innerHTML = ExerciseEngine.ui(ex)`<div><strong>${correct ? ExerciseEngine.text(ex, 'Alle Zuordnungen korrekt.') : ExerciseEngine.text(ex, 'Noch nicht alle richtig.')}</strong></div>
                <div class="muted" style="margin-top:6px">${ExerciseEngine.escapeHtml(ex.explanation || '')}</div>`;
            // Mark each match's outcome visually.
            cells.forEach(c => {
                if (!c.classList.contains('is-matched')) return;
                const lKey = c.dataset.side === 'L' ? c.dataset.key : null;
                if (lKey != null) {
                    const ok = matches[lKey] === lKey;
                    c.classList.add(ok ? 'is-correct' : 'is-wrong');
                }
            });
            const record = ExerciseEngine.registerResult(ex.subject || null, ex.topic || 'match', correct, ex, matches);
            lifecycle.setState(correct ? 'checked-correct' : 'checked-wrong');
            if (!(record && record.dedup) && onResult) onResult(correct);
        });

        resetBtn.addEventListener('click', () => {
            lifecycle.reset();
        });
    }

    root.Exercises = root.Exercises || {};
    root.Exercises['match'] = { render, isCorrect, bind };
})(window);
