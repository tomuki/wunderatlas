/* Prüfung (Exam simulation) page.
   Vlada's version: a hero row with the pony in exam-state (focused
   and ready), subject tab strip styled as sticker pills, decorative
   flourishes in the corners.  The exam card itself stays the
   working surface — decoration stops at its border. */
(function (root) {
    const SUBJECT_LABEL = { de: 'Deutsch', en: 'Englisch', math: 'Mathematik' };
    const SUBJECT_TONE = { de: 'tag--de', en: 'tag--en', math: 'tag--math' };

    async function render(container, params) {
        const s = Store.load();
        const subject = (params && params.subject) || 'de';
        const variant = Number(params && params.variant) || 1;
        const pastAttempts = (s.examAttempts || []).filter(a => a.subject === subject);
        const bundle = Exercises['mini-exam'].buildBundle(subject, variant);
        const allBundles = Exercises['mini-exam'].listBundles(subject);
        if (!bundle) {
            container.innerHTML = `<div class="page-header"><h1>Prüfungssimulation</h1></div><div class="empty">Keine Übungsklausur für ${subject} gefunden.</div>`;
            return;
        }

        const fTL = window.Motifs ? window.Motifs.render('star', { color: 'var(--butter)', size: 30 }) : null;
        const fTR = window.Motifs ? window.Motifs.render('sparkle', { color: 'var(--primary)', size: 28 }) : null;

        container.innerHTML = `
            <div class="page-header surface-with-flourish">
                <div>
                    <h1>Prüfungssimulation</h1>
                    <div class="page-header__meta">Realistische Übungsklausur unter Prüfungsbedingungen · ${bundle.durationMin} Minuten · ${bundle.parts.length} Aufgaben</div>
                </div>
                <div class="welcome-row__mascot" data-mascot-exam-corner aria-hidden="true"></div>
                <span class="flourish flourish--star flourish--tl" data-flourish="tl" aria-hidden="true"></span>
                <span class="flourish flourish--star flourish--tr" data-flourish="tr" aria-hidden="true"></span>
            </div>

            <div class="row" style="margin-bottom:16px; gap:8px; flex-wrap:wrap">
                <button class="btn btn--ghost ${subject==='de'?'is-active':''}" data-sub="de" id="tab-de">${Icons.icon('book')} Deutsch</button>
                <button class="btn btn--ghost ${subject==='en'?'is-active':''}" data-sub="en" id="tab-en">${Icons.icon('book')} Englisch</button>
                <button class="btn btn--ghost ${subject==='math'?'is-active':''}" data-sub="math" id="tab-math">${Icons.icon('math')} Mathematik</button>
            </div>

            <div class="card card--sticker" style="margin-bottom:16px">
                <div class="card__title row">
                    <span style="flex:1">${escapeHtml(bundle.title)}</span>
                    <span class="tag ${SUBJECT_TONE[subject]}">${SUBJECT_LABEL[subject]}</span>
                </div>
                <p class="muted">Bearbeite alle Aufgaben in der vorgegebenen Reihenfolge. Eine Lösung wird erst nach Abgabe sichtbar. Der Timer zählt herunter und speichert Entwürfe automatisch.</p>
                <div class="row" style="margin-top:8px">
                    <label class="muted">Variante:</label>
                    ${allBundles.map((b, i) => `<button class="btn btn--sm ${i+1===variant?'btn--primary':'btn--ghost'}" data-variant="${i+1}">Variante ${i+1}</button>`).join('')}
                </div>
                <ul style="margin-top:8px; padding-left:18px">
                    ${bundle.parts.map((p, i) => `<li><strong>Aufgabe ${i+1}</strong> (${labelForType(p.type)}): <span class="muted">${escapeHtml(p.q || '').slice(0, 90)}${(p.q||'').length > 90 ? '…' : ''}</span></li>`).join('')}
                </ul>
            </div>

            <div data-exam-mount></div>

            <h2 style="margin-top:24px">Bisherige Versuche</h2>
            ${pastAttempts.length === 0 ? '<p class="muted">Noch keine Versuche aufgezeichnet.</p>' : `
                <ul class="list">
                    ${pastAttempts.map(a => `
                        <li class="list__item">
                            <span class="tag ${SUBJECT_TONE[a.subject] || ''}">${SUBJECT_LABEL[a.subject] || a.subject}</span>
                            <span class="list__title">${formatDateDE(a.date)}</span>
                            <span class="muted" style="margin-left:8px; font-size:0.85em">${a.parts} Aufgaben · ${Math.round(a.elapsedSec/60)} min bearbeitet</span>
                            <span class="list__spacer"></span>
                            <span class="muted" style="font-size:0.8em">${escapeHtml((a.bundleId || '').split(':').pop() || '')}</span>
                        </li>
                    `).join('')}
                </ul>
            `}
        `;
        // Place the pony in the corner — exam state since this IS exam mode
        const ponySlot = container.querySelector('[data-mascot-exam-corner]');
        if (ponySlot && window.Mascot) {
            window.Mascot.set(ponySlot, 'exam', { size: 80 });
        }
        const flourishMap = { tl: fTL, tr: fTR };
        container.querySelectorAll('[data-flourish]').forEach(slot => {
            const node = flourishMap[slot.getAttribute('data-flourish')];
            if (node) slot.appendChild(node);
        });
        // Subject tabs
        container.querySelector('#tab-de').addEventListener('click', () => Router.go('pruefung', { subject: 'de', variant: 1 }));
        container.querySelector('#tab-en').addEventListener('click', () => Router.go('pruefung', { subject: 'en', variant: 1 }));
        container.querySelector('#tab-math').addEventListener('click', () => Router.go('pruefung', { subject: 'math', variant: 1 }));
        // Variant tabs
        container.querySelectorAll('[data-variant]').forEach(b => {
            b.addEventListener('click', () => {
                Router.go('pruefung', { subject, variant: Number(b.dataset.variant) || 1 });
            });
        });
        // Mount mini-exam
        const mount = container.querySelector('[data-exam-mount]');
        const ex = { type: 'mini-exam', subject: subject, variant: variant };
        mount.innerHTML = ExerciseEngine.renderExercise(ex);
        Exercises['mini-exam'].bind(mount, ex, () => {
            ExerciseEngine.toast('Prüfung beendet', 'ok');
        });
    }
    function labelForType(t) {
        switch (t) {
            case 'mc': return 'Multiple Choice';
            case 'fill': return 'Lückentext';
            case 'sort': return 'Sortieren';
            case 'match': return 'Zuordnung';
            case 'error': return 'Fehlerkorrektur';
            case 'timed-writing': return 'Schreibaufgabe';
            case 'free': return 'Freitext';
            case 'cloze': return 'Lückentext';
            case 'math-input': return 'Rechenaufgabe';
            default: return t;
        }
    }
    function formatDateDE(iso) {
        const d = new Date(iso);
        return d.toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' });
    }
    function escapeHtml(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c])); }
    root.Pages = root.Pages || {};
    root.Pages.pruefung = render;
})(window);
