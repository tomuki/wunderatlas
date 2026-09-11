/* Timed writing exercise: a timer with a textarea, autosave, and a result view.
   Used for both standalone practice and the mock exam. */
(function (root) {
    function render(ex) {
        return ExerciseEngine.ui(ex)`
            <div class="exercise" data-topic="${ExerciseEngine.escapeHtml(ex.topic || '')}">
                <div class="exercise__header">
                    <div class="exercise__type">Schreibaufgabe (${ex.durationMin || 60} min)</div>
                    <div class="muted" data-status>Wird vorbereitet …</div>
                </div>
                <div class="timer" data-display>${formatTime((ex.durationMin || 60) * 60)}</div>
                <div class="timer__bar" data-bar><div class="timer__fill" data-fill style="width:100%"></div></div>
                <div class="exercise__q">${ExerciseEngine.escapeHtml(ex.q)}</div>
                ${ex.context ? `<div class="example" style="margin-bottom:8px">${ExerciseEngine.escapeHtml(ex.context)}</div>` : ''}
                ${ex.operatorHints ? ExerciseEngine.ui(ex)`<p class="muted" style="font-size:0.9em">Operator-Hinweise: ${ex.operatorHints.map(h => `<span class="tag" style="margin-right:4px">${ExerciseEngine.escapeHtml(h)}</span>`).join('')}</p>` : ''}
                <textarea class="textarea" data-input style="min-height:240px" placeholder="Hier schreiben …"></textarea>
                <div class="muted" data-saved style="font-size:0.8rem; margin-top:4px">Entwurf wird automatisch gespeichert.</div>
                <div class="exercise__actions">
                    <button class="btn btn--primary" data-action="start">Timer starten</button>
                    <button class="btn btn--ghost" data-action="pause">Pause</button>
                    <button class="btn btn--ghost" data-action="finish" disabled>Abgeben</button>
                    <button class="btn btn--ghost" data-action="ai">KI-Feedback</button>
                </div>
                <div class="exercise__feedback" data-feedback hidden></div>
            </div>
        `;
    }

    function formatTime(s) {
        const m = Math.floor(s / 60);
        const sec = s % 60;
        return String(m).padStart(2, '0') + ':' + String(sec).padStart(2, '0');
    }

    function isCorrect(ex, answer) {
        // We can't auto-grade a writing task. Mark as completed if length > 0.
        return typeof answer === 'string' && answer.trim().length > 0;
    }

    function bind(container, ex, onResult) {
        const root = container.querySelector('.exercise');
        const display = root.querySelector('[data-display]');
        const fill = root.querySelector('[data-fill]');
        const bar = root.querySelector('[data-bar]');
        const status = root.querySelector('[data-status]');
        const input = root.querySelector('[data-input]');
        const saved = root.querySelector('[data-saved]');
        const startBtn = root.querySelector('[data-action="start"]');
        const pauseBtn = root.querySelector('[data-action="pause"]');
        const finishBtn = root.querySelector('[data-action="finish"]');
        const aiBtn = root.querySelector('[data-action="ai"]');
        const feedback = root.querySelector('[data-feedback]');
        const total = (ex.durationMin || 60) * 60;
        let remaining = total;
        let interval = null;
        let draftKey = 'fhr-draft-' + (ex.id || 'tw');
        const initial = localStorage.getItem(draftKey) || '';
        input.value = initial;
        if (initial) saved.textContent = ExerciseEngine.text(ex, 'Entwurf geladen (') + initial.length + ExerciseEngine.text(ex, ' Zeichen).');

        function update() {
            display.textContent = formatTime(remaining);
            const pct = (remaining / total) * 100;
            fill.style.width = pct + '%';
            bar.classList.toggle('is-warn', remaining < total * 0.25 && remaining > total * 0.1);
            bar.classList.toggle('is-danger', remaining <= total * 0.1);
            if (remaining <= 0) finish();
        }

        function tick() {
            remaining--;
            update();
        }

        startBtn.addEventListener('click', () => {
            if (interval) return;
            interval = setInterval(tick, 1000);
            status.textContent = ExerciseEngine.text(ex, 'Läuft');
            finishBtn.disabled = false;
        });
        pauseBtn.addEventListener('click', () => {
            clearInterval(interval); interval = null;
            status.textContent = ExerciseEngine.text(ex, 'Pausiert');
        });
        finishBtn.addEventListener('click', finish);

        // Autosave every 5s
        setInterval(() => {
            localStorage.setItem(draftKey, input.value);
            saved.textContent = ExerciseEngine.text(ex, 'Entwurf gespeichert (') + input.value.length + ExerciseEngine.text(ex, ' Zeichen, ') + new Date().toLocaleTimeString() + ').';
        }, 5000);

        aiBtn.addEventListener('click', async () => {
            feedback.hidden = false;
            feedback.className = 'exercise__feedback';
            feedback.innerHTML = ExerciseEngine.ui(ex)`<div class="row"><span class="spinner"></span><span class="muted">KI-Feedback wird angefragt …</span></div>`;
            try {
                const out = await AI.feedbackFreeText({ prompt: ex.q, answer: input.value, language: ex.subject === 'en' ? 'en' : (ex.lang || 'de') });
                feedback.innerHTML = ExerciseEngine.ui(ex)`<div><strong>KI-Feedback</strong></div><div style="margin-top:6px; white-space:pre-wrap">${ExerciseEngine.escapeHtml(out)}</div>`;
            } catch (e) {
                feedback.innerHTML = ExerciseEngine.ui(ex)`<div><strong>KI-Feedback nicht verfügbar</strong></div><div class="muted">${ExerciseEngine.escapeHtml(e.message)}</div>`;
            }
        });

        function finish() {
            if (status.textContent === ExerciseEngine.text(ex, 'Abgegeben')) return; // idempotent: timer reaching 0 also calls finish()
            clearInterval(interval); interval = null;
            const words = (input.value || '').trim().split(/\s+/).filter(Boolean).length;
            const mins = Math.round((total - remaining) / 60);
            status.textContent = ExerciseEngine.text(ex, 'Abgegeben');
            feedback.hidden = false;
            feedback.className = 'exercise__feedback';
            feedback.innerHTML = ExerciseEngine.ui(ex)`
                <div><strong>Aufgabe beendet</strong></div>
                <div class="muted" style="margin-top:6px">Bearbeitungszeit: ${mins} Minuten · ${words} Wörter</div>
                <div style="margin-top:6px">${ExerciseEngine.escapeHtml(ex.explanation || '')}</div>
                <hr>
                <div class="muted">Selbstkontrolle: Beachte die Operator-Hinweise und vergleiche mit einer Musterlösung, falls verfügbar.</div>
            `;
            localStorage.removeItem(draftKey);
            ExerciseEngine.registerResult(ex.subject || null, ex.topic || 'timed-writing', words > 30, ex, input.value);
            if (onResult) onResult(true);
        }

        update();
    }

    root.Exercises = root.Exercises || {};
    root.Exercises['timed-writing'] = { render, isCorrect, bind };
})(window);
