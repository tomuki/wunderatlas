/* Grafik page: portfolio overview + project tasks.
   Vlada's version: a welcome row with the pony holding her palette,
   sticker-shaped lesson cards, and palette-themed flourishes — this
   is Vlada's own design school, so the page can lean colorful.  The
   task list itself stays scannable. */
(function (root) {
    async function render(container, params) {
        const s = Store.load();
        const lessons = ContentGRAF.list;
        const tasks = ContentGRAF.tasks;
        const completed = (s.completed || []).map(c => c.taskId);
        const doneCount = tasks.filter(t => completed.includes('grafik:' + t.id)).length;
        const doneLessons = lessons.filter(l => completed.includes('lesson:graf:' + l.id)).length;

        const fTL = window.Motifs ? window.Motifs.render('flower', { color: 'var(--primary)', size: 32 }) : null;
        const fTR = window.Motifs ? window.Motifs.render('sparkle', { color: 'var(--butter)', size: 28 }) : null;
        const fBL = window.Motifs ? window.Motifs.render('star', { color: 'var(--mint)', size: 26 }) : null;

        container.innerHTML = `
            <div class="page-header surface-with-flourish">
                <div>
                    <h1>Grafikdesign / Portfolio</h1>
                    <div class="page-header__meta">${lessons.length} Lektionen · ${tasks.length} Portfolio-Aufgaben · ${doneCount} erledigt</div>
                </div>
                <div class="welcome-row__mascot" data-mascot-graf-corner aria-hidden="true"></div>
                <span class="flourish flourish--flower flourish--tl" data-flourish="tl" aria-hidden="true"></span>
                <span class="flourish flourish--star flourish--tr" data-flourish="tr" aria-hidden="true"></span>
                <span class="flourish flourish--star flourish--bl" data-flourish="bl" aria-hidden="true"></span>
            </div>

            <div class="grid grid--stat" style="margin-bottom:16px">
                <div class="stat card--sticker">
                    <div class="stat__label">Lektionen</div>
                    <div class="stat__value stat__value--berry">${doneLessons} / ${lessons.length}</div>
                </div>
                <div class="stat card--sticker card--right">
                    <div class="stat__label">Portfolio</div>
                    <div class="stat__value stat__value--mint">${doneCount} / ${tasks.length}</div>
                </div>
            </div>

            <div class="card">
                <div class="card__title">Lektionen</div>
                <div class="grid grid--2">
                    ${lessons.map(l => `
                        <a class="card lesson card--sticker" href="#/grafik/${l.id}">
                            <div class="card__title row">
                                <span style="flex:1">${escapeHtml(l.title)}</span>
                                <span class="tag">Portfolio</span>
                            </div>
                            <p class="muted">${escapeHtml(l.summary || '')}</p>
                            <div class="muted" style="font-size:0.85em; margin-top:8px">${(l.sections || []).length} Abschnitte · ${(l.exercises || []).length} Übungen</div>
                        </a>
                    `).join('')}
                </div>
            </div>

            <div class="card" style="margin-top:16px">
                <div class="card__title">Portfolio-Aufgaben</div>
                <p class="muted">Markiere Aufgaben als erledigt, um deinen Fortschritt zu sehen.</p>
                <ul class="list" style="margin-top:8px">
                    ${tasks.map(t => {
                        const done = completed.includes('grafik:' + t.id);
                        return `
                            <li class="list__item">
                                <span class="tag" style="background:var(--primary-soft); color:var(--primary)">${escapeHtml(t.id)}</span>
                                <div style="flex:1">
                                    <div class="list__title">${escapeHtml(t.title)}</div>
                                    <div class="muted" style="font-size:0.85em">${t.minutes} min · ${escapeHtml(t.topic)}</div>
                                </div>
                                <button class="btn btn--sm ${done ? 'btn--ghost' : 'btn--primary'}" data-graf-task="${t.id}">
                                    ${done ? Icons.icon('check') + ' erledigt' : Icons.icon('play') + ' starten'}
                                </button>
                            </li>
                        `;
                    }).join('')}
                </ul>
            </div>
        `;

        const ponySlot = container.querySelector('[data-mascot-graf-corner]');
        if (ponySlot && window.Mascot) {
            window.Mascot.set(ponySlot, 'greeting', { size: 80 });
        }
        const flourishMap = { tl: fTL, tr: fTR, bl: fBL };
        container.querySelectorAll('[data-flourish]').forEach(slot => {
            const node = flourishMap[slot.getAttribute('data-flourish')];
            if (node) slot.appendChild(node);
        });

        container.querySelectorAll('[data-graf-task]').forEach(b => {
            b.addEventListener('click', () => {
                const id = 'grafik:' + b.dataset.grafTask;
                Store.update(state => {
                    if (!state.completed.find(c => c.taskId === id)) {
                        state.completed.push({ taskId: id, subject: 'grafik', date: new Date().toISOString() });
                    }
                    return state;
                });
                ExerciseEngine.toast('Aufgabe erledigt', 'ok');
                render(container);
            });
        });
    }
    function escapeHtml(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c])); }
    root.Pages = root.Pages || {};
    root.Pages.grafik = render;
})(window);
