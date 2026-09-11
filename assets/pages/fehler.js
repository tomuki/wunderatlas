/* Fehlerjournal (error journal) page.
   Vlada's version: a welcome row with the pony in rest-state (we're
   reviewing past mistakes — gentle), sticker-shaped cards for
   Wiederholungsplan and Schwächen, decorative flourishes.  The
   error list itself stays a list — no decoration crowding the
   review content. */
(function (root) {
    async function render(container) {
        const s = Store.load();
        const errors = s.errors || [];
        const due = Review.dueToday(errors);
        const upcoming = Review.upcomingCounts(errors);
        const byTopic = groupByTopic(errors);
        const filter = container.dataset.filter || 'all';

        const fTL = window.Motifs ? window.Motifs.render('heart', { color: 'var(--primary)', size: 30 }) : null;
        const fTR = window.Motifs ? window.Motifs.render('sparkle', { color: 'var(--butter)', size: 28 }) : null;

        container.innerHTML = `
            <div class="page-header surface-with-flourish">
                <div>
                    <h1>Fehlerjournal</h1>
                    <div class="page-header__meta">${errors.length} Einträge · ${due.length} heute fällig · automatische Wiederholung nach Spaced-Repetition-Schema (1, 3, 7, 14, 30 Tage).</div>
                </div>
                <div class="welcome-row__mascot" data-mascot-fehler-corner aria-hidden="true"></div>
                <span class="flourish flourish--heart flourish--tl" data-flourish="tl" aria-hidden="true"></span>
                <span class="flourish flourish--star flourish--tr" data-flourish="tr" aria-hidden="true"></span>
            </div>

            <div class="row" style="margin-bottom:16px; gap:8px; flex-wrap:wrap">
                <button class="btn btn--ghost" data-filter="all" id="f-all">Alle</button>
                <button class="btn btn--ghost" data-filter="due" id="f-due">Heute fällig</button>
                <button class="btn btn--ghost" data-filter="topic" id="f-topic">Nach Thema</button>
            </div>

            <div class="grid grid--2">
                <div class="card card--sticker">
                    <div class="card__title">Wiederholungsplan</div>
                    <p class="muted">Basiert auf deinen Fehlern und dem Spaced-Repetition-Algorithmus.</p>
                    <ul class="list">
                        <li class="list__item">
                            <span class="list__title">Heute fällig</span>
                            <span class="list__spacer"></span>
                            <span class="tag tag--butter">${upcoming.today || 0}</span>
                        </li>
                        <li class="list__item">
                            <span class="list__title">Diese Woche fällig</span>
                            <span class="list__spacer"></span>
                            <span class="tag">${upcoming.week || 0}</span>
                        </li>
                    </ul>
                </div>
                <div class="card card--sticker card--right">
                    <div class="card__title">Schwächen nach Thema</div>
                    <ul class="list">
                        ${byTopic.map(t => `
                            <li class="list__item">
                                <span class="list__title">${escapeHtml(t.topic)}</span>
                                <span class="list__spacer"></span>
                                <span class="tag" style="background:var(--warning-soft); color:var(--warning)">${t.count} Fehler</span>
                            </li>
                        `).join('') || '<li class="muted">Noch keine Daten.</li>'}
                    </ul>
                </div>
            </div>

            <h2 style="margin-top:24px">Einträge</h2>
            <div class="card">
                ${errors.length === 0
                    ? '<div class="empty"><div class="empty__icon">' + Icons.icon('check') + '</div><div class="empty__title">Keine Fehler erfasst</div><p class="muted">Fehler werden beim Bearbeiten der Aufgaben automatisch gespeichert.</p></div>'
                    : renderList(filtered(errors, due, filter))
                }
            </div>
        `;

        const ponySlot = container.querySelector('[data-mascot-fehler-corner]');
        if (ponySlot && window.Mascot) {
            // Rest state when there are due reviews, otherwise greeting
            const state = due.length > 0 ? 'rest' : 'greeting';
            window.Mascot.set(ponySlot, state, { size: 72 });
        }
        const flourishMap = { tl: fTL, tr: fTR };
        container.querySelectorAll('[data-flourish]').forEach(slot => {
            const node = flourishMap[slot.getAttribute('data-flourish')];
            if (node) slot.appendChild(node);
        });

        container.querySelectorAll('[data-filter]').forEach(b => b.addEventListener('click', () => {
            container.dataset.filter = b.dataset.filter;
            render(container);
        }));
    }
    function renderList(list) {
        return `<ul class="list">${list.map(e => `
            <li class="list__item error-item">
                <div style="flex:1">
                    <div class="row" style="margin-bottom:4px">
                        <span class="tag">${escapeHtml(e.topic)}</span>
                        <span class="muted" style="font-size:0.8em">${formatDateDE(e.date)}</span>
                        ${isDue(e) ? '<span class="tag" style="background:var(--warning-soft); color:var(--warning)">fällig</span>' : '<span class="tag" style="background:var(--success-soft); color:var(--success)">wiederholt</span>'}
                        <span class="muted" style="font-size:0.8em">Wdh. ${e.repeats || 0} · nächste: ${formatDateDE(e.nextReview)}</span>
                    </div>
                    <div><strong>Frage:</strong> ${escapeHtml(e.question || '')}</div>
                    <div class="muted" style="margin-top:4px"><strong>Deine Antwort:</strong> ${escapeHtml(e.userAnswer || '')}</div>
                    <div style="margin-top:4px"><strong>Lösung:</strong> ${escapeHtml(e.correctAnswer || '')}</div>
                    ${e.explanation ? `<div class="muted" style="margin-top:4px">${escapeHtml(e.explanation)}</div>` : ''}
                </div>
                <div class="row">
                    ${isDue(e) ? `<button class="btn btn--sm btn--primary" data-repeat="${e.id}">${Icons.icon('check')} Wiederholt</button>` : ''}
                    <button class="btn btn--sm btn--danger" data-del="${e.id}">${Icons.icon('trash')}</button>
                </div>
            </li>
        `).join('')}</ul>`;
    }
    function bind(container) {
        container.addEventListener('click', e => {
            const rep = e.target.closest('[data-repeat]');
            const del = e.target.closest('[data-del]');
            if (rep) {
                const id = rep.dataset.repeat;
                Store.update(state => {
                    const en = state.errors.find(x => x.id === id);
                    if (en) {
                        const next = Review.scheduleNextReview(en, true);
                        en.repeats = next.repeats;
                        en.nextReview = next.nextReview;
                    }
                    return state;
                });
                ExerciseEngine.toast('Als wiederholt markiert', 'ok');
                Router.go('fehler');
            }
            if (del) {
                const id = del.dataset.del;
                if (!confirm('Diesen Fehlereintrag löschen?')) return;
                Store.update(state => { state.errors = state.errors.filter(x => x.id !== id); return state; });
                ExerciseEngine.toast('Eintrag gelöscht', 'ok');
                Router.go('fehler');
            }
        });
    }
    function isDue(e) { return new Date(e.nextReview) <= new Date(); }
    function filtered(errors, due, filter) {
        if (filter === 'due') return due;
        if (filter === 'topic') {
            return [...errors].sort((a, b) => (a.topic || '').localeCompare(b.topic || ''));
        }
        return [...errors].sort((a, b) => new Date(b.date) - new Date(a.date));
    }
    function groupByTopic(errors) {
        const map = {};
        errors.forEach(e => { map[e.topic] = (map[e.topic] || 0) + 1; });
        return Object.entries(map).map(([topic, count]) => ({ topic, count })).sort((a, b) => b.count - a.count);
    }
    function formatDateDE(iso) {
        if (!iso) return '';
        const d = new Date(iso);
        return d.toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit', year: 'numeric' });
    }
    function escapeHtml(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c])); }

    const origRender = render;
    async function wrapped(container) { await origRender(container); bind(container); }
    root.Pages = root.Pages || {};
    root.Pages.fehler = wrapped;
})(window);
