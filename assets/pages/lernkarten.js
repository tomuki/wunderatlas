/* Lernkarten (flashcards) — full section.
   Features:
   - Sets: built-in (per topic), from the error journal, custom user cards, AI-suggested.
   - Each card: front / back, self-rating (Hard / OK / Easy), spaced repetition (1/3/7/14/30 days).
   - Search, filter by subject/topic, sort, shuffle.
   - Statistics: due today, learned, retention, by subject.
   - Import / Export JSON.
   - Keyboard: Space flips, 1/2/3 rates, ←/→ navigates.
   - Mobile: tap to flip, swipe next/prev via buttons. */
(function (root) {
    const LS_KEY = 'fhr-cards';
    let activeKey=null;
    function storageKey(){try{const u=JSON.parse(localStorage.getItem('fhr-auth')||'null');return u?.id?LS_KEY+'/user/'+encodeURIComponent(u.id):LS_KEY;}catch{return LS_KEY;}}
    const PREBUILT_SETS = buildPrebuiltSets().concat(root.VladaLearningSets || []);
    const SUBJECT_LABELS = { de: 'Deutsch', en: 'Englisch', math: 'Mathematik', grafik: 'Gestaltung' };

    function buildPrebuiltSets() {
        // Curated flashcard sets. We pick high-yield items from each
        // subject's vocabulary / rule list.
        return [
            {
                id: 'de-ortho', subject: 'de', topic: 'rechtschreibung', title: 'Deutsch: Rechtschreibung',
                description: 'ss/ß, Groß-/Kleinschreibung, Getrennt-/Zusammenschreibung.',
                cards: [
                    { id: 'de-ortho-1', front: 'Wann schreibt man ss?', back: 'Nach kurzem Vokal: Fluss, Wasser, müssen. Nach langem Vokal oder Diphthong: ß (Straße, Fuß, groß).' },
                    { id: 'de-ortho-2', front: 'Seit oder seid?', back: 'seit = zeitlich (seit gestern); seid = Verbform von „sein" (ihr seid).' },
                    { id: 'de-ortho-3', front: 'Standart oder Standard?', back: 'Standard (mit d).' },
                    { id: 'de-ortho-4', front: 'Groß oder klein? — „im Allgemeinen"', back: 'Groß — Substantivierung.' },
                    { id: 'de-ortho-5', front: 'Tipps zur Kommasetzung', back: 'Klauseln mit „weil/da/obwohl" → Komma. Infinitivgruppen mit „um/ohne/statt" → Komma. Aufzählungen → Komma.' },
                    { id: 'de-ortho-6', front: 'Wann das Komma vor „und"?', back: 'Zwischen zwei selbstständigen Hauptsätzen kann ein Komma die Gliederung verdeutlichen: „Ich lerne, und sie schläft." Es ist hier nicht verpflichtend. Bei Aufzählungen gleicher Wortarten in der Regel kein Komma vor „und".' }
                ]
            },
            {
                id: 'de-gram', subject: 'de', topic: 'grammatik', title: 'Deutsch: Grammatik — Konjunktiv',
                description: 'Konjunktiv I und II — Formen und typische Auslöser.',
                cards: [
                    { id: 'de-gram-1', front: 'Wann benutzt man den Konjunktiv I?', back: 'In der indirekten Rede (Standardsprache): „Er sagte, er komme morgen."' },
                    { id: 'de-gram-2', front: 'Bildung Konjunktiv II', back: 'Präteritumstamm + Umlaut + Endung (ich käme, du gingest).' },
                    { id: 'de-gram-3', front: 'Konjunktiv II — irreale Wünsche', back: '„Wenn ich Zeit hätte, würde ich kommen."' }
                ]
            },
            {
                id: 'en-tenses', subject: 'en', topic: 'grammar_tenses', title: 'English: Tenses',
                description: 'Present / Past / Future — Simple, Continuous, Perfect.',
                cards: [
                    { id: 'en-tenses-1', front: 'Present Perfect vs Past Simple', back: 'Present perfect: a connection to now, with no finished past time (I have lived here for years). Past simple: a completed event at a finished past time (I lived in Paris in 2010).' },
                    { id: 'en-tenses-2', front: 'Common time expressions with the past continuous', back: 'while, when, all day long, at 5 pm yesterday.' },
                    { id: 'en-tenses-3', front: 'Will-Future vs Going-to-Future', back: 'Will: a decision made now or a prediction. Going to: an existing plan or a prediction based on evidence.' },
                    { id: 'en-tenses-4', front: 'Past Perfect', back: 'An event before another past event: After he had left, I called him.' }
                ]
            },
            {
                id: 'en-vocab', subject: 'en', topic: 'vocabulary_themes', title: 'English: Vocabulary — Comment',
                description: 'Useful phrases for comments.',
                cards: [
                    { id: 'en-vocab-1', front: 'In my opinion …', back: 'Introduce your own opinion.' },
                    { id: 'en-vocab-2', front: 'It is widely believed that …', back: 'Refer to a common belief.' },
                    { id: 'en-vocab-3', front: 'On the one hand … on the other hand …', back: 'Introduce two sides of an argument.' },
                    { id: 'en-vocab-4', front: 'All things considered, …', back: 'Introduce a balanced conclusion.' }
                ]
            },
            {
                id: 'ma-formulas', subject: 'math', topic: 'funktionen_grundlagen', title: 'Mathematik: Funktionen — Formeln',
                description: 'Lineare, quadratische und allgemeine Funktionen.',
                cards: [
                    { id: 'ma-formulas-1', front: 'Lineare Funktion: Normalform', back: 'f(x) = m·x + b. m = Steigung, b = y-Achsenabschnitt.' },
                    { id: 'ma-formulas-2', front: 'Scheitelpunktform quadratisch', back: 'f(x) = a·(x − d)² + e. Scheitel bei (d, e).' },
                    { id: 'ma-formulas-3', front: 'p-q-Formel', back: 'x² + p·x + q = 0 → x = −p/2 ± √((p/2)² − q).' },
                    { id: 'ma-formulas-4', front: 'Ableitung f(x) = xⁿ', back: "f'(x) = n·xⁿ⁻¹." }
                ]
            },
            {
                id: 'ma-vec', subject: 'math', topic: 'gerade_im_raum', title: 'Mathematik: Vektoren & Geraden',
                description: 'Parameterform, Skalarprodukt, Orthogonalität.',
                cards: [
                    { id: 'ma-vec-1', front: 'Parameterform Gerade', back: 'g: x = p + t·v. p = Stützvektor, v = Richtungsvektor.' },
                    { id: 'ma-vec-2', front: 'Skalarprodukt orthogonal', back: 'a·b = 0 → a und b sind senkrecht.' },
                    { id: 'ma-vec-3', front: 'Winkel zwischen Vektoren', back: 'cos(φ) = (a·b) / (|a|·|b|).' }
                ]
            },
            {
                id: 'ma-trig', subject: 'math', topic: 'trigonometrie', title: 'Mathematik: Trigonometrie',
                description: 'Sinus, Cosinus, Tangens am rechtwinkligen Dreieck.',
                cards: [
                    { id: 'ma-trig-1', front: 'sin(α) im rechtwinkligen Dreieck', back: 'Gegenkathete / Hypotenuse.' },
                    { id: 'ma-trig-2', front: 'cos(α) im rechtwinkligen Dreieck', back: 'Ankathete / Hypotenuse.' },
                    { id: 'ma-trig-3', front: 'tan(α) im rechtwinkligen Dreieck', back: 'Gegenkathete / Ankathete.' }
                ]
            }
        ];
    }

    function load() {
        try {
            const raw = localStorage.getItem(storageKey());
            if (!raw) return { custom: [], learned: {}, fromErrors: {} };
            return JSON.parse(raw);
        } catch (e) { return { custom: [], learned: {}, fromErrors: {} }; }
    }
    function save(s) { try { localStorage.setItem(storageKey(), JSON.stringify(s)); } catch (e) {} }

    function escapeHtml(s) {
        return String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
    }
    function escapeAttr(s) { return escapeHtml(s); }

    function allSets(state) {
        const s = load();
        const fromErrs = (state.errors || []).map((e, i) => ({
            id: 'err-' + e.id, subject: e.subject, topic: e.topic || 'Fehler',
            title: 'Aus Fehler: ' + (e.topic || e.subject),
            description: 'Karte basiert auf einem Eintrag im Fehlerjournal.',
            cards: [{
                id: 'errc-' + e.id,
                front: e.question || (e.topic || 'Frage'),
                back: (e.correctAnswer || '—') + (e.explanation ? '\n\n' + e.explanation : '')
            }]
        })).filter(x => x.cards[0].front && x.cards[0].front.length > 2);
        const custom = s.custom.map((c, i) => ({
            id: 'cu-' + c.id, subject: c.subject, topic: c.topic || 'Eigene', title: c.setTitle || 'Eigene Karten',
            description: 'Eigene Karten dieses Sets.', cards: c.cards
        }));
        return { prebuilt: PREBUILT_SETS, fromErrs, custom };
    }

    function spacedDays(rating) {
        // 1, 3, 7, 14, 30 days based on rating + previous streak
        if (rating === 'hard') return 1;
        if (rating === 'ok') return 3;
        return 7;
    }

    function getLearned(cardId) {
        const s = load();
        return s.learned[cardId] || null;
    }
    function setLearned(cardId, info) {
        const s = load();
        s.learned[cardId] = info;
        save(s);
    }

    function ratingButtons(card, opts) {
        const ex=opts||{};
        const r = getLearned(card.id);
        const next = r ? spacedDays(ratingFromLast(r)) : 1;
        return ExerciseEngine.ui(ex)`
            <div class="lk-rating" role="group" aria-label="Schwierigkeit">
                <button class="btn btn--sm btn--ghost" data-rate="hard" type="button">Schwer (${next === 1 ? 1 : 1}d)</button>
                <button class="btn btn--sm" data-rate="ok" type="button">OK (3d)</button>
                <button class="btn btn--sm btn--primary" data-rate="easy" type="button">Leicht (7d)</button>
            </div>
        `;
    }
    function ratingFromLast(r) { return r.lastRating || 'ok'; }

    function dueCount(cards) {
        const today = (root.Store && root.Store.todayISO) ? root.Store.todayISO() : new Date().toISOString().slice(0, 10);
        let due = 0, total = 0;
        for (const c of cards) {
            total++;
            const r = getLearned(c.id);
            if (!r) { due++; continue; }
            if (!r.nextReview || r.nextReview <= today) due++;
        }
        return { due, total };
    }

    function renderList(container, state, filter) {
        const sets = allSets(state);
        const sub = filter.subject;
        const search = (filter.search || '').toLowerCase();
        const all = [...sets.prebuilt, ...sets.fromErrs, ...sets.custom];
        const filtered = all.filter(s => (!sub || s.subject === sub) && (!search || (s.title + ' ' + s.description).toLowerCase().includes(search)));
        const fTL = window.Motifs ? window.Motifs.render('flower', { color: 'var(--primary)', size: 30 }) : null;
        const fTR = window.Motifs ? window.Motifs.render('sparkle', { color: 'var(--mint)', size: 28 }) : null;

        container.innerHTML = `
            <div class="page-header surface-with-flourish">
                <div>
                    <h1>Lernkarten</h1>
                    <div class="page-header__meta">Karteikarten mit Space Repetition, aus deinen Themen, deinen Fehlern oder eigenen Karten.</div>
                </div>
                <div class="welcome-row__mascot" data-mascot-lk-corner aria-hidden="true"></div>
                <span class="flourish flourish--flower flourish--tl" data-flourish="tl" aria-hidden="true"></span>
                <span class="flourish flourish--star flourish--tr" data-flourish="tr" aria-hidden="true"></span>
                <div class="row">
                    <button class="btn btn--primary" id="lk-new-set" type="button">+ Eigenes Set</button>
                </div>
            </div>
            <div class="card">
                <div class="row" style="gap:8px;flex-wrap:wrap">
                    <label class="row" style="gap:6px">Suche
                        <input class="input" id="lk-search" type="search" value="${escapeAttr(filter.search || '')}" placeholder="Begriff, z. B. Konjunktiv">
                    </label>
                    <div class="filter-chips" role="tablist" aria-label="Fach-Filter">
                        ${['', 'de', 'en', 'math', 'grafik'].map(s => `<button class="filter-chip ${(sub || '') === s ? 'is-active' : ''}" data-filter-sub="${s}" role="tab" aria-selected="${(sub || '') === s}">${s ? SUBJECT_LABELS[s] : 'Alle'}</button>`).join('')}
                    </div>
                    <button class="btn btn--ghost" id="lk-shuffle" type="button">Mischen</button>
                    <button class="btn btn--ghost" id="lk-export" type="button">Export</button>
                    <label class="btn btn--ghost" style="cursor:pointer">Import<input id="lk-import" type="file" accept="application/json" hidden></label>
                </div>
            </div>
            <div class="grid grid--3" style="margin-top:16px">
                ${filtered.map(s => renderSetCard(s)).join('') || '<p class="muted">Keine Sets gefunden.</p>'}
            </div>
        `;
        const ponySlot = container.querySelector('[data-mascot-lk-corner]');
        if (ponySlot && window.Mascot) {
            window.Mascot.set(ponySlot, 'greeting', { size: 80 });
        }
        const flourishMap = { tl: fTL, tr: fTR };
        container.querySelectorAll('[data-flourish]').forEach(slot => {
            const node = flourishMap[slot.getAttribute('data-flourish')];
            if (node) slot.appendChild(node);
        });
        bindList(container, state, filter);
    }
    function renderSetCard(s) {
        const c = dueCount(s.cards);
        return `
            <div class="lk-set card card--sticker card--link" data-set-id="${escapeAttr(s.id)}" tabindex="0" role="button" aria-label="Set öffnen: ${escapeAttr(s.title)}">
                <div class="card__title">${escapeHtml(s.title)}</div>
                <p class="muted" style="margin:4px 0 8px">${escapeHtml(s.description || '')}</p>
                <div class="row">
                    <span class="tag ${s.subject === 'math' ? 'tag--math' : s.subject === 'de' ? 'tag--de' : 'tag--en'}">${SUBJECT_LABELS[s.subject] || s.subject || '—'}</span>
                    <span class="status-pill ${c.due > 0 ? 'status-pill--warn' : 'status-pill--ok'}">${c.due} fällig / ${c.total}</span>
                </div>
            </div>
        `;
    }
    function bindList(container, state, filter) {
        const search = container.querySelector('#lk-search');
        if (search) {
            let to = null;
            search.addEventListener('input', () => {
                clearTimeout(to);
                to = setTimeout(() => { if(!search.isConnected)return;const focused=document.activeElement===search,pos=search.selectionStart;filter.search = search.value; renderList(container, state, filter);if(focused){const next=container.querySelector('#lk-search');next.focus();next.setSelectionRange(pos,pos);} }, 200);
            });
        }
        container.querySelectorAll('[data-filter-sub]').forEach(b => b.addEventListener('click', () => {
            filter.subject = b.dataset.filterSub || null;
            renderList(container, state, filter);
        }));
        const shuf = container.querySelector('#lk-shuffle');
        if (shuf) shuf.addEventListener('click', () => {
            filter.shuffle = !filter.shuffle;
            ExerciseEngine.toast(filter.shuffle ? 'Karten werden gemischt.' : 'Reihenfolge zurückgesetzt.', 'ok');
            renderList(container, state, filter);
        });
        const exp = container.querySelector('#lk-export');
        if (exp) exp.addEventListener('click', () => exportCards(state));
        const imp = container.querySelector('#lk-import');
        if (imp) imp.addEventListener('change', async (e) => {
            const file = e.target.files && e.target.files[0];
            if (!file) return;
            try {
                const txt = await file.text();
                importCards(txt);
                ExerciseEngine.toast('Import erfolgreich.', 'ok');
                renderList(container, state, filter);
            } catch (err) { ExerciseEngine.toast('Import fehlgeschlagen: ' + err.message, 'err'); }
        });
        const ns = container.querySelector('#lk-new-set');
        if (ns) ns.addEventListener('click', () => newSetModal(container, state, filter));
        container.querySelectorAll('[data-set-id]').forEach(el => {
            const open = () => openSet(container, state, filter, el.dataset.setId);
            el.addEventListener('click', open);
            el.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(); } });
        });
    }

    function exportCards(state) {
        const s = load();
        const data = { prebuilt: PREBUILT_SETS.map(s => ({ id: s.id, title: s.title })), custom: s.custom, learned: s.learned };
        const json = JSON.stringify(data, null, 2);
        const blob = new Blob([json], { type: 'application/json' });
        const a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        setTimeout(()=>URL.revokeObjectURL(a.href),1000);
        a.download = 'fhr-lernkarten-' + new Date().toISOString().slice(0, 10) + '.json';
        document.body.appendChild(a); a.click(); a.remove();
        ExerciseEngine.toast('Export gestartet.', 'ok');
    }
    function importCards(txt) {
        const data = JSON.parse(txt);
        if (!data || typeof data !== 'object') throw new Error('Ungültiges Format');
        const s = load();
        if(data.custom!==undefined&&(!Array.isArray(data.custom)||data.custom.some(set=>!set||typeof set.id!=='string'||!Array.isArray(set.cards)||!set.cards.length||set.cards.some(c=>!c||typeof c.id!=='string'||typeof c.front!=='string'||typeof c.back!=='string'))))throw new Error('Ungültiges Kartenset.');
        if (Array.isArray(data.custom)) {const ids=new Set(s.custom.map(c=>c.id));s.custom=s.custom.concat(data.custom.filter(c=>!ids.has(c.id)));}
        if (data.learned && typeof data.learned === 'object') s.learned = Object.assign({}, s.learned, data.learned);
        save(s);
    }

    function newSetModal(container, state, filter) {
        const close = ExerciseEngine.showModal({
            title: 'Eigenes Karten-Set',
            bodyHtml: `
                <label>Set-Titel<input class="input" id="lk-set-title" placeholder="z. B. Englisch Vokabeln Unit 1"></label>
                <label>Fach
                    <select class="input" id="lk-set-sub">
                        <option value="de">Deutsch</option>
                        <option value="en">Englisch</option>
                        <option value="math">Mathematik</option>
                        <option value="grafik">Gestaltung</option>
                    </select>
                </label>
                <label>Thema (optional)<input class="input" id="lk-set-topic" placeholder="z. B. tenses"></label>
                <h3 style="margin-top:14px">Karten</h3>
                <div id="lk-set-cards"></div>
                <div class="row" style="margin-top:8px">
                    <button class="btn btn--ghost" id="lk-add-card" type="button">+ Karte</button>
                </div>
            `,
            footerHtml: '<button class="btn btn--primary" id="lk-save-set" type="button">Speichern</button>'
        });
        const cardsHost = document.getElementById('lk-set-cards');
        const addRow = (front, back) => {
            const idx = cardsHost.children.length;
            const row = document.createElement('div');
            row.className = 'form-grid form-grid--2';
            row.style.marginTop = '8px';
            row.innerHTML = `
                <input class="input" placeholder="Vorderseite" value="${escapeAttr(front || '')}">
                <textarea class="input" placeholder="Rückseite" rows="2">${escapeHtml(back || '')}</textarea>
            `;
            cardsHost.appendChild(row);
        };
        addRow(); addRow();
        const addBtn = document.getElementById('lk-add-card');
        if (addBtn) addBtn.addEventListener('click', () => addRow());
        const saveButton = document.getElementById('lk-save-set');
        if (saveButton) saveButton.addEventListener('click', () => {
            const title = (document.getElementById('lk-set-title') || {}).value || 'Eigene Karten';
            const subject = (document.getElementById('lk-set-sub') || {}).value || 'de';
            const topic = (document.getElementById('lk-set-topic') || {}).value || 'eigene';
            const cards = [];
            Array.from(cardsHost.children).forEach((row) => {
                const [front, back] = row.querySelectorAll('input, textarea');
                if (front && back && front.value.trim() && back.value.trim()) {
                    cards.push({ id: 'c-' + Date.now() + '-' + Math.random().toString(36).slice(2, 6), front: front.value.trim(), back: back.value.trim() });
                }
            });
            if (cards.length === 0) { ExerciseEngine.toast('Mindestens eine Karte nötig.', 'err'); return; }
            const s = load();
            s.custom.push({ id: 'cs-' + Date.now(), setTitle: title, subject, topic, cards });
            save(s);
            close();
            ExerciseEngine.toast('Set gespeichert.', 'ok');
            renderList(container, state, filter);
        });
    }

    function openSet(container, state, filter, setId) {
        const sets = allSets(state);
        const set = [...sets.prebuilt, ...sets.fromErrs, ...sets.custom].find(s => s.id === setId);
        if (!set) return;
        const ex={subject:set.subject};
        container.lang=set.subject==='en'?'en':'de';
        Router.renderBreadcrumbs([{ label: 'Dashboard', href: '#/dashboard' }, { label: 'Lernkarten', href: '#/lernkarten' }, { label: set.title }]);
        let cards = set.cards.slice();
        if (filter.shuffle) {
            for (let i = cards.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [cards[i], cards[j]] = [cards[j], cards[i]];
            }
        }
        let idx = 0;
        let flipped = false;
        function show() {
            const c = cards[idx];
            const due = getLearned(c.id);
            const fTL = window.Motifs ? window.Motifs.render('heart', { color: 'var(--primary)', size: 26 }) : null;
            const fTR = window.Motifs ? window.Motifs.render('sparkle', { color: 'var(--butter)', size: 24 }) : null;

            container.innerHTML = ExerciseEngine.ui(ex)`
                <div class="page-header surface-with-flourish">
                    <div>
                        <h1>${escapeHtml(set.title)}</h1>
                        <div class="page-header__meta">${escapeHtml(set.description || '')}</div>
                    </div>
                    <div class="welcome-row__mascot" data-mascot-lk-card-corner aria-hidden="true"></div>
                    <span class="flourish flourish--heart flourish--tl" data-flourish="tl" aria-hidden="true"></span>
                    <span class="flourish flourish--star flourish--tr" data-flourish="tr" aria-hidden="true"></span>
                    <div class="row">
                        <button class="btn btn--ghost" id="lk-back" type="button">← Zurück zur Übersicht</button>
                    </div>
                </div>
                <div class="card card--sticker" style="text-align:center;min-height:260px">
                    <div class="lk-card" id="lkCard" tabindex="0" role="button" aria-label="Karte umdrehen">
                        <div class="lk-card__face">
                            <div class="lk-card__meta muted">${idx + 1} / ${cards.length} · ${due ? (ExerciseEngine.text(ex, 'Wiederholung: ') + new Date(due.nextReview).toLocaleDateString(set.subject==='en'?'en-GB':'de-DE')) : ExerciseEngine.text(ex, 'neu')}</div>
                            <div class="lk-card__text">${escapeHtml(flipped ? c.back : c.front)}</div>
                        </div>
                    </div>
                    <div class="muted" style="margin-top:8px">Leertaste zum Umdrehen · Pfeiltasten zum Navigieren</div>
                </div>
                <div class="row" style="margin-top:12px;justify-content:center;gap:8px">
                    <button class="btn btn--ghost" id="lk-prev" type="button" ${idx === 0 ? 'disabled' : ''}>← Vorherige</button>
                    ${flipped ? ratingButtons(c, ex) : ExerciseEngine.ui(ex)`<button class="btn btn--primary" id="lk-flip" type="button">Umdrehen</button>`}
                    <button class="btn btn--ghost" id="lk-next" type="button" ${idx === cards.length - 1 ? 'disabled' : ''}>Nächste →</button>
                </div>
            `;
            const ponySlot = container.querySelector('[data-mascot-lk-card-corner]');
            if (ponySlot && window.Mascot) {
                window.Mascot.set(ponySlot, 'greeting', { size: 64 });
            }
            const flourishMap = { tl: fTL, tr: fTR };
            container.querySelectorAll('[data-flourish]').forEach(slot => {
                const node = flourishMap[slot.getAttribute('data-flourish')];
                if (node) slot.appendChild(node);
            });
            bindSet();
        }
        function bindSet() {
            container.querySelector('#lk-back').addEventListener('click', () => { Router.renderBreadcrumbs([{ label: 'Dashboard', href: '#/dashboard' }, { label: 'Lernkarten' }]); renderList(container, state, filter); });
            container.querySelector('#lk-prev').addEventListener('click', () => { if (idx > 0) { idx--; flipped = false; show(); } });
            container.querySelector('#lk-next').addEventListener('click', () => { if (idx < cards.length - 1) { idx++; flipped = false; show(); } });
            const flip = container.querySelector('#lk-flip') || container.querySelector('#lkCard');
            if (flip) flip.addEventListener('click', () => { flipped = !flipped; show(); });
            container.querySelectorAll('[data-rate]').forEach(b => b.addEventListener('click', () => {
                const rating = b.dataset.rate;
                const days = rating === 'hard' ? 1 : rating === 'ok' ? 3 : 7;
                const today = new Date();
                const next = new Date(today.getTime() + days * 86400000);
                const info = { lastRating: rating, lastISO: today.toISOString(), nextReview: next.toISOString().slice(0, 10) };
                setLearned(cards[idx].id, info);
                if (root.Learner) {
                    Store.update(st => {
                        Learner.record(st, { subject: set.subject, topic: set.topic || set.id, type: 'flashcard', correct: rating !== 'hard', timeSec: 30, at: today.toISOString() });
                        return st;
                    });
                    Promise.resolve(Learner.pushToServer()).catch(() => {});
                }
                if (idx < cards.length - 1) { idx++; flipped = false; }
                show();
            }));
        }
        function onKey(e) {
            if(!container.querySelector('#lkCard')){document.removeEventListener('keydown',onKey);return;}
            if(e.target.closest('input,textarea,select,button,a'))return;
            if(e.key==='Escape'){document.removeEventListener('keydown',onKey);renderList(container,state,filter);return;}
            if (e.key === ' ') { e.preventDefault(); flipped = !flipped; show(); }
            else if (e.key === 'ArrowRight') { if (idx < cards.length - 1) { idx++; flipped = false; show(); } }
            else if (e.key === 'ArrowLeft') { if (idx > 0) { idx--; flipped = false; show(); } }
            else if (e.key === '1') rate(0);
            else if (e.key === '2') rate(1);
            else if (e.key === '3') rate(2);
        }
        function rate(n) {
            const rating = ['hard', 'ok', 'easy'][n];
            if (!rating) return;
            const btn = container.querySelector(`[data-rate="${rating}"]`);
            if (btn) btn.click();
        }
        if(activeKey)document.removeEventListener('keydown',activeKey);activeKey=onKey;
        document.addEventListener('keydown', onKey);
        show();
    }

    function formatDateDE(iso) {
        if (!iso) return '';
        const d = new Date(iso);
        return d.toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit', year: 'numeric' });
    }

    async function render(container) {
        const state = Store.load();
        const filter = { subject: null, search: '', shuffle: false };
        Router.renderBreadcrumbs([{ label: 'Dashboard', href: '#/dashboard' }, { label: 'Lernkarten' }]);
        renderList(container, state, filter);
    }
    root.Pages = root.Pages || {};
    root.Pages.lernkarten = render;
    root.Pages.lernkarten.crumbs = () => [{ label: 'Dashboard', href: '#/dashboard' }, { label: 'Lernkarten' }];
})(window);
