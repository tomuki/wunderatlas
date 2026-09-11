/* Flashcards: spaced-repetition review. The "Pruefen/Weiter" lifecycle here
   is simpler than other exercises: there's no Pruefen button — the user
   grades themselves via Schwer / Wiederholen / Kann ich.  Once a card is
   graded, the next-card button is the "Weiter" of this exercise.
   Lifecycle per card:
     unanswered   --flip-->    selected
     selected     --grade-->   checked-correct | checked-wrong
     checked-*    --next-->    unanswered (next card)
   The lifecycle helper is still used so visibility/disabled are
   deterministic and a double-click on a grade button can't double-record.
*/
(function (root) {
    function render(ex) {
        return ExerciseEngine.ui(ex)`
            <div class="exercise" data-topic="${ExerciseEngine.escapeHtml(ex.topic || '')}" data-card-idx="0">
                <div class="exercise__header">
                    <div class="exercise__type">Karteikarten</div>
                    <div class="muted" data-progress></div>
                </div>
                <div class="flashcard" data-flip role="button" tabindex="0" aria-label="Karte umdrehen">
                    <div class="flashcard__hint" data-side>Vorderseite</div>
                    <div data-text></div>
                </div>
                <div class="flashcard__actions">
                    <button class="btn btn--ghost" data-action="prev">${Icons.icon('chevron_left')} Zurück</button>
                    <button class="btn btn--primary" data-action="flip">Umdrehen</button>
                    <button class="btn btn--ghost" data-action="next">Weiter ${Icons.icon('chevron_right')}</button>
                </div>
                <div class="exercise__actions" data-grade hidden>
                    <button class="btn" data-grade="hard" style="background:var(--danger-soft); color:var(--danger)">Schwer</button>
                    <button class="btn" data-grade="ok" style="background:var(--warning-soft); color:var(--warning)">Wiederholen</button>
                    <button class="btn" data-grade="easy" style="background:var(--success-soft); color:var(--success)">Kann ich</button>
                </div>
            </div>
        `;
    }

    function isCorrect(ex, answer) {
        // For flashcards, the user self-grades. Return true for "easy".
        return answer === 'easy';
    }

    function bind(container, ex, onResult) {
        const root = container.querySelector('.exercise');
        const flipBtn = root.querySelector('[data-action="flip"]');
        const card = root.querySelector('[data-flip]');
        const textEl = root.querySelector('[data-text]');
        const sideEl = root.querySelector('[data-side]');
        const prevBtn = root.querySelector('[data-action="prev"]');
        const nextBtn = root.querySelector('[data-action="next"]');
        const progress = root.querySelector('[data-progress]');
        const gradeBox = root.querySelector('[data-grade]');
        // The lifecycle helper manages visibility of the four action buttons
        // (prev / flip / next) and the grade box.  We pass them as the
        // "check" / "reset" / "next" slots of the helper by re-using the
        // existing structure: flip = check, prev = reset, next = next.
        // Flashcards don't have a feedback panel.
        const lifecycle = ExerciseEngine.createLifecycle(root, {
            checkBtn: flipBtn,
            resetBtn: prevBtn,
            nextBtn: nextBtn,
            feedbackEl: null
        });

        let idx = 0, flipped = false;
        let lastGradedIdx = -1;

        function show() {
            flipped = false;
            const c = ex.cards[idx];
            textEl.textContent = c.front;
            sideEl.textContent = ExerciseEngine.text(ex, 'Vorderseite');
            gradeBox.hidden = true;
            // Allow grading the new card.
            lastGradedIdx = -1;
            progress.textContent = (idx + 1) + ' / ' + ex.cards.length;
            lifecycle.setState('unanswered');
        }

        function flip() {
            const s = lifecycle.getState();
            if (s === 'checked-correct' || s === 'checked-wrong' || s === 'next') return;
            flipped = !flipped;
            const c = ex.cards[idx];
            textEl.textContent = flipped ? c.back : c.front;
            sideEl.textContent = flipped ? ExerciseEngine.text(ex, 'Rückseite') : ExerciseEngine.text(ex, 'Vorderseite');
            gradeBox.hidden = !flipped;
            // Show grade buttons as soon as the card is flipped open.
            if (flipped) lifecycle.setState('selected');
        }

        flipBtn.addEventListener('click', flip);
        card.addEventListener('click', flip);
        card.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); flip(); } });
        prevBtn.addEventListener('click', () => { idx = (idx - 1 + ex.cards.length) % ex.cards.length; show(); });
        nextBtn.addEventListener('click', () => { idx = (idx + 1) % ex.cards.length; show(); });

        const gradeBoxHandler = (e) => {
            const btn = e.target.closest('[data-grade]');
            if (!btn) return;
            if (lastGradedIdx === idx) return; // double-click guard
            const s = lifecycle.getState();
            // Only allow grading in selected/flip-open state.
            if (s !== 'selected') return;
            lastGradedIdx = idx;
            const grade = btn.dataset.grade;
            const c = ex.cards[idx];
            lifecycle.setState(grade === 'easy' ? 'checked-correct' : 'checked-wrong');
            ExerciseEngine.registerResult(ex.subject || null, c.topic || ex.topic || 'flashcard', grade !== 'hard', ex, grade);
            ExerciseEngine.toast(grade === 'easy' ? 'Als bekannt markiert' : (grade === 'hard' ? 'Wird morgen wiederholt' : 'In 3 Tagen erneut'), grade === 'easy' ? 'ok' : (grade === 'hard' ? 'err' : null));
            // Update spaced repetition
            Store.update(state => {
                const word = (state.dictionary || []).find(w => w.term === c.front || w.term === c.back);
                if (word) {
                    if (grade === 'easy') word.status = 'kann';
                    else if (grade === 'ok') word.status = 'wiederholen';
                    else word.status = 'schwer';
                }
                return state;
            });
            // Advance to the next card after a short pause so the user sees
            // the result of their self-grade.
            setTimeout(() => { idx = (idx + 1) % ex.cards.length; show(); }, 250);
            if (onResult) onResult(grade !== 'hard');
        };
        gradeBox.addEventListener('click', gradeBoxHandler);

        show();
    }

    root.Exercises = root.Exercises || {};
    root.Exercises['flashcard'] = { render, isCorrect, bind };
})(window);
