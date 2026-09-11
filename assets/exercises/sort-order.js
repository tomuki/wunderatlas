/* Sort-order: drag & drop (or arrow buttons) to arrange items in the correct order.
   Lifecycle:
     unanswered  --move item-->  selected  (Pruefen enabled)
     selected    --Pruefen-->    checking -> checked-correct|wrong
     any state   --Zuruecksetzen-->  unanswered (restores initial order, clears feedback, restores Pruefen)
*/
(function (root) {
    function render(ex) {
        const shuffled = shuffle(ex.items.slice());
        return ExerciseEngine.ui(ex)`
            <div class="exercise" data-topic="${ExerciseEngine.escapeHtml(ex.topic || '')}">
                <div class="exercise__header"><div class="exercise__type">Reihenfolge</div></div>
                <div class="exercise__q">${ExerciseEngine.escapeHtml(ex.q || ex.title || ExerciseEngine.text(ex, 'Bringe die Bausteine in die richtige Reihenfolge.'))}</div>
                <ol class="sort-list" id="sortList">
                    ${shuffled.map((it, i) => `
                        <li class="sort-item" draggable="true" data-idx="${i}">
                            <span class="sort-item__handle">${Icons.icon('drag')}</span>
                            <span style="flex:1">${ExerciseEngine.escapeHtml(it)}</span>
                            <button class="icon-btn" data-move="up" aria-label="Nach oben">${Icons.icon('chevron_left')}</button>
                            <button class="icon-btn" data-move="down" aria-label="Nach unten">${Icons.icon('chevron_right')}</button>
                        </li>
                    `).join('')}
                </ol>
                <div class="exercise__actions">
                    <button class="btn btn--primary" data-action="check">Reihenfolge prüfen</button>
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

    function isCorrect(ex, currentOrder) {
        if (!Array.isArray(currentOrder)) return false;
        return currentOrder.every((it, i) => String(it).trim() === String(ex.items[i]).trim());
    }

    function bind(container, ex, onResult) {
        const root = container.querySelector('.exercise');
        const list = root.querySelector('.sort-list');
        const checkBtn = root.querySelector('[data-action="check"]');
        const resetBtn = root.querySelector('[data-action="reset"]');
        const feedback = root.querySelector('[data-feedback]');
        const initial = Array.from(list.children).map(li => li.cloneNode(true));

        const lifecycle = ExerciseEngine.createLifecycle(root, { checkBtn, resetBtn, feedbackEl: feedback });

        let moved = false; // becomes true on the first move
        let submitted = false;

        function readOrder() {
            return Array.from(list.children).map(li => {
                const text = li.querySelector('span:not(.sort-item__handle)');
                return text ? text.textContent.trim() : li.textContent.trim();
            });
        }

        list.addEventListener('click', e => {
            const s = lifecycle.getState();
            if (s === 'checked-correct' || s === 'checked-wrong' || s === 'next') return;
            const btn = e.target.closest('[data-move]');
            if (!btn) return;
            const li = btn.closest('li');
            if (!li) return;
            if (btn.dataset.move === 'up' && li.previousElementSibling) {
                list.insertBefore(li, li.previousElementSibling);
            } else if (btn.dataset.move === 'down' && li.nextElementSibling) {
                list.insertBefore(li.nextElementSibling, li);
            }
            moved = true;
            lifecycle.setState('selected');
        });

        // Drag and drop
        let dragEl = null;
        list.querySelectorAll('.sort-item').forEach(li => {
            li.addEventListener('dragstart', e => {
                const s = lifecycle.getState();
                if (s === 'checked-correct' || s === 'checked-wrong' || s === 'next') {
                    e.preventDefault();
                    return;
                }
                dragEl = li;
                e.dataTransfer.effectAllowed = 'move';
                e.dataTransfer.setData('text/plain', li.dataset.idx);
                li.style.opacity = '0.4';
            });
            li.addEventListener('dragend', () => { li.style.opacity = '1'; dragEl = null; });
            li.addEventListener('dragover', e => { e.preventDefault(); e.dataTransfer.dropEffect = 'move'; });
            li.addEventListener('drop', e => {
                e.preventDefault();
                if (!dragEl || dragEl === li) return;
                const rect = li.getBoundingClientRect();
                const after = (e.clientY - rect.top) > rect.height / 2;
                if (after) list.insertBefore(dragEl, li.nextElementSibling);
                else list.insertBefore(dragEl, li);
                moved = true;
                lifecycle.setState('selected');
            });
        });

        lifecycle.on('__reset', () => {
            // Restore the initial DOM order.
            list.innerHTML = '';
            initial.forEach(li => list.appendChild(li.cloneNode(true)));
            // Re-bind drag handlers to the freshly cloned items.
            list.querySelectorAll('.sort-item').forEach(li => {
                li.addEventListener('dragstart', e => {
                    const s = lifecycle.getState();
                    if (s === 'checked-correct' || s === 'checked-wrong' || s === 'next') {
                        e.preventDefault();
                        return;
                    }
                    dragEl = li;
                    e.dataTransfer.effectAllowed = 'move';
                    e.dataTransfer.setData('text/plain', li.dataset.idx);
                    li.style.opacity = '0.4';
                });
                li.addEventListener('dragend', () => { li.style.opacity = '1'; dragEl = null; });
                li.addEventListener('dragover', e => { e.preventDefault(); e.dataTransfer.dropEffect = 'move'; });
                li.addEventListener('drop', e => {
                    e.preventDefault();
                    if (!dragEl || dragEl === li) return;
                    const rect = li.getBoundingClientRect();
                    const after = (e.clientY - rect.top) > rect.height / 2;
                    if (after) list.insertBefore(dragEl, li.nextElementSibling);
                    else list.insertBefore(dragEl, li);
                    moved = true;
                    lifecycle.setState('selected');
                });
            });
            moved = false;
            submitted = false;
        });

        checkBtn.addEventListener('click', () => {
            if (lifecycle.getState() !== 'selected') return;
            if (submitted) return;
            submitted = true;
            lifecycle.setState('checking');
            const cleanOrder = readOrder();
            const correct = isCorrect(ex, cleanOrder);
            feedback.hidden = false;
            feedback.className = 'exercise__feedback ' + (correct ? 'exercise__feedback--ok' : 'exercise__feedback--bad');
            feedback.innerHTML = ExerciseEngine.ui(ex)`<div><strong>${correct ? ExerciseEngine.text(ex, 'Reihenfolge korrekt.') : ExerciseEngine.text(ex, 'Reihenfolge überprüfen.')}</strong></div>
                <div class="muted" style="margin-top:6px">${ExerciseEngine.escapeHtml(ex.explanation || '')}</div>
                ${!correct ? `<ol style="margin:8px 0 0 1.2em"><li>${ex.items.map(i => ExerciseEngine.escapeHtml(i)).join('</li><li>')}</li></ol>` : ''}`;
            const record = ExerciseEngine.registerResult(ex.subject || null, ex.topic || 'sort', correct, ex, cleanOrder);
            lifecycle.setState(correct ? 'checked-correct' : 'checked-wrong');
            if (onResult) onResult(correct);
        });

        resetBtn.addEventListener('click', () => {
            lifecycle.reset();
        });
    }

    root.Exercises = root.Exercises || {};
    root.Exercises['sort'] = { render, isCorrect, bind };
})(window);
