/* Notizen & Wörterbuch (notes & dictionary) page.
   Vlada's version: a welcome row with the pony in greeting state,
   decorative flourishes in the corners.  The notes/dictionary forms
   stay practical — decoration never overlaps a textarea. */
(function (root) {
    async function render(container) {
        const s = Store.load();
        const tab = container.dataset.tab || 'notes';
        const noteCount = (s.notes || []).length;
        const dictCount = (s.dictionary || []).length;

        const fTL = window.Motifs ? window.Motifs.render('flower', { color: 'var(--primary)', size: 30 }) : null;
        const fTR = window.Motifs ? window.Motifs.render('sparkle', { color: 'var(--butter)', size: 28 }) : null;

        container.innerHTML = `
            <div class="page-header surface-with-flourish">
                <div>
                    <h1>Notizen & Wörterbuch</h1>
                    <div class="page-header__meta">Persönliche Aufzeichnungen und Vokabeltrainer mit Status und Beispielen.</div>
                </div>
                <div class="welcome-row__mascot" data-mascot-notizen-corner aria-hidden="true"></div>
                <span class="flourish flourish--flower flourish--tl" data-flourish="tl" aria-hidden="true"></span>
                <span class="flourish flourish--star flourish--tr" data-flourish="tr" aria-hidden="true"></span>
            </div>

            <div class="grid grid--stat" style="margin-bottom:16px">
                <div class="stat card--sticker">
                    <div class="stat__label">Notizen</div>
                    <div class="stat__value stat__value--berry">${noteCount}</div>
                </div>
                <div class="stat card--sticker card--right">
                    <div class="stat__label">Vokabeln</div>
                    <div class="stat__value stat__value--mint">${dictCount}</div>
                </div>
            </div>

            <div class="row" style="margin-bottom:16px; gap:8px; flex-wrap:wrap">
                <button class="btn btn--ghost ${tab==='notes'?'is-active':''}" data-tab="notes" id="t-notes">Notizen</button>
                <button class="btn btn--ghost ${tab==='dict'?'is-active':''}" data-tab="dict" id="t-dict">Wörterbuch</button>
                <button class="btn btn--ghost" id="export">${Icons.icon('download')} Export</button>
                <label class="btn btn--ghost" style="cursor:pointer">${Icons.icon('upload')} Import<input type="file" id="import" accept="application/json" style="display:none"></label>
            </div>
            <div data-mount></div>
        `;
        const ponySlot = container.querySelector('[data-mascot-notizen-corner]');
        if (ponySlot && window.Mascot) {
            window.Mascot.set(ponySlot, 'greeting', { size: 72 });
        }
        const flourishMap = { tl: fTL, tr: fTR };
        container.querySelectorAll('[data-flourish]').forEach(slot => {
            const node = flourishMap[slot.getAttribute('data-flourish')];
            if (node) slot.appendChild(node);
        });

        container.querySelectorAll('[data-tab]').forEach(b => b.addEventListener('click', () => {
            container.dataset.tab = b.dataset.tab;
            render(container);
        }));
        container.querySelector('#export').addEventListener('click', () => {
            const s = Store.load();
            const data = { notes: s.notes || [], dictionary: s.dictionary || [] };
            const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url; a.download = 'notizen.json'; a.click();
            URL.revokeObjectURL(url);
            ExerciseEngine.toast('Export erstellt', 'ok');
        });
        container.querySelector('#import').addEventListener('change', e => {
            const file = e.target.files[0];
            if (!file) return;
            const r = new FileReader();
            r.onload = () => {
                try {
                    const obj = JSON.parse(r.result);
                    if(!obj||typeof obj!=='object'||(!Array.isArray(obj.notes)&&!Array.isArray(obj.dictionary)))throw new Error('Keine Notizen oder Vokabeln gefunden.');
                    if(obj.notes!==undefined&&(!Array.isArray(obj.notes)||obj.notes.some(n=>!n||typeof n.id!=='string'||typeof n.title!=='string'||typeof n.body!=='string'||(n.tags!==undefined&&(!Array.isArray(n.tags)||n.tags.some(t=>typeof t!=='string'))))))throw new Error('Ungültige Notizen.');
                    if(obj.dictionary!==undefined&&(!Array.isArray(obj.dictionary)||obj.dictionary.some(n=>!n||typeof n.id!=='string'||typeof n.term!=='string'||typeof n.translation!=='string')))throw new Error('Ungültige Vokabeln.');
                    Store.update(state => {
                        if (Array.isArray(obj.notes)) state.notes = obj.notes;
                        if (Array.isArray(obj.dictionary)) state.dictionary = obj.dictionary;
                        return state;
                    });
                    ExerciseEngine.toast('Import erfolgreich', 'ok');
                    Router.go('notizen');
                } catch (err) {
                    ExerciseEngine.toast('Import fehlgeschlagen: ' + err.message, 'err');
                }
            };
            r.readAsText(file);
        });
        if (tab === 'dict') renderDict(container, s);
        else renderNotes(container, s);
    }
    function renderNotes(container, s) {
        const notes = s.notes || [];
        const mount = container.querySelector('[data-mount]');
        mount.innerHTML = `
            <div class="grid grid--2">
                <div>
                    <div class="card card--sticker">
                        <div class="card__title row">
                            <span style="flex:1">Notizen</span>
                            <button class="btn btn--sm btn--primary" id="newNote">${Icons.icon('plus')} Neu</button>
                        </div>
                        <input class="input" id="search" placeholder="Suche nach Titel oder Inhalt …" style="width:100%; margin-bottom:8px">
                        <ul class="list" id="list">
                            ${notes.length === 0 ? '<li class="muted">Noch keine Notizen.</li>' : notes.map(n => `
                                <li class="list__item" data-id="${escapeHtml(n.id)}">
                                    <div style="flex:1">
                                        <div class="list__title">${escapeHtml(n.title || '(ohne Titel)')}</div>
                                        <div class="muted" style="font-size:0.8em">${(n.tags || []).map(t => '#' + escapeHtml(t)).join(' ')} · ${formatDateDE(n.updated)}</div>
                                    </div>
                                    <button class="btn btn--sm" data-edit="${escapeHtml(n.id)}">${Icons.icon('edit')}</button>
                                    <button class="btn btn--sm btn--danger" data-del="${escapeHtml(n.id)}">${Icons.icon('trash')}</button>
                                </li>
                            `).join('')}
                        </ul>
                    </div>
                </div>
                <div>
                    <div class="card card--sticker card--right">
                        <div class="card__title" id="formTitle">Neue Notiz</div>
                        <div style="display:flex; flex-direction:column; gap:8px">
                            <input class="input" id="title" placeholder="Titel">
                            <input class="input" id="tags" placeholder="Tags (Komma-getrennt)">
                            <textarea class="textarea" id="body" style="min-height:240px" placeholder="Inhalt"></textarea>
                            <div class="row">
                                <button class="btn btn--primary" id="save">${Icons.icon('save')} Speichern</button>
                                <button class="btn btn--ghost" id="cancel">Abbrechen</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        const search = mount.querySelector('#search');
        const noMatch=document.createElement('li');noMatch.className='muted';noMatch.hidden=true;noMatch.textContent='Keine passenden Notizen.';mount.querySelector('#list').appendChild(noMatch);
        search.addEventListener('input', () => {
            const q = search.value.toLowerCase();
            mount.querySelectorAll('#list .list__item').forEach(li => {
                const n = notes.find(x => x.id === li.dataset.id);
                const match = !q || (n.title || '').toLowerCase().includes(q) || (n.body || '').toLowerCase().includes(q) || (n.tags || []).some(t => t.toLowerCase().includes(q));
                li.style.display = match ? '' : 'none';
            });
            noMatch.hidden=!q||[...mount.querySelectorAll('#list .list__item')].some(li=>li.style.display!=='none');
        });
        mount.querySelector('#newNote').addEventListener('click', () => editForm(null));
        mount.querySelectorAll('[data-edit]').forEach(b => b.addEventListener('click', () => {
            const n = notes.find(x => x.id === b.dataset.edit);
            editForm(n);
        }));
        mount.querySelectorAll('[data-del]').forEach(b => b.addEventListener('click', () => {
            if (!confirm('Notiz löschen?')) return;
            Store.update(state => { state.notes = (state.notes || []).filter(x => x.id !== b.dataset.del); return state; });
            ExerciseEngine.toast('Notiz gelöscht', 'ok');
            Router.go('notizen');
        }));
        mount.querySelector('#save').addEventListener('click', () => {
            const title = mount.querySelector('#title').value.trim();
            const body = mount.querySelector('#body').value;
            const tags = mount.querySelector('#tags').value.split(',').map(t => t.trim()).filter(Boolean);
            const editId = mount.querySelector('#save').dataset.editId;
            if (!title && !body) { ExerciseEngine.toast('Bitte Titel oder Inhalt eingeben', 'err'); return; }
            Store.update(state => {
                state.notes = state.notes || [];
                if (editId) {
                    const n = state.notes.find(x => x.id === editId);
                    if (n) { n.title = title; n.body = body; n.tags = tags; n.updated = new Date().toISOString(); }
                } else {
                    state.notes.push({ id: 'note-' + Date.now(), title, body, tags, updated: new Date().toISOString() });
                }
                return state;
            });
            ExerciseEngine.toast('Gespeichert', 'ok');
            Router.go('notizen');
        });
        mount.querySelector('#cancel').addEventListener('click',()=>editForm(null));
        function editForm(n) {
            mount.querySelector('#title').value = n ? n.title : '';
            mount.querySelector('#body').value = n ? n.body : '';
            mount.querySelector('#tags').value = n ? (n.tags || []).join(', ') : '';
            mount.querySelector('#save').dataset.editId = n ? n.id : '';
            mount.querySelector('#formTitle').textContent = n ? 'Notiz bearbeiten' : 'Neue Notiz';
        }
    }
    function renderDict(container, s) {
        const dict = s.dictionary || [];
        const mount = container.querySelector('[data-mount]');
        const filter = container.dataset.dictFilter || 'all';
        mount.innerHTML = `
            <div class="card card--sticker">
                <div class="card__title row">
                    <span style="flex:1">Wörterbuch (${dict.length} Einträge)</span>
                </div>
                <div class="row" style="margin-bottom:8px">
                    <input class="input" id="search" placeholder="Suche …" style="flex:1">
                    <button class="btn btn--sm" data-filter="all">Alle</button>
                    <button class="btn btn--sm" data-filter="kann">Kann ich</button>
                    <button class="btn btn--sm" data-filter="wiederholen">Wiederholen</button>
                    <button class="btn btn--sm" data-filter="schwer">Schwer</button>
                </div>
                <div class="card" style="background:var(--bg-elev); margin-bottom:8px">
                    <div class="row" style="margin-bottom:4px"><strong>Neuer Eintrag</strong></div>
                    <div class="row">
                        <select class="input" id="lang" style="max-width:120px"><option value="en">EN</option><option value="de">DE</option></select>
                        <input class="input" id="term" placeholder="Begriff" style="flex:1">
                        <input class="input" id="trans" placeholder="Übersetzung" style="flex:1">
                        <input class="input" id="ex" placeholder="Beispielsatz" style="flex:2">
                        <button class="btn btn--primary" id="add">${Icons.icon('plus')} Hinzufügen</button>
                    </div>
                </div>
                <ul class="list" id="dlist">
                    ${dict.filter(w => filter === 'all' || w.status === filter).map(w => `
                        <li class="list__item" data-id="${escapeHtml(w.id)}">
                            <div style="flex:1">
                                <div><strong>${escapeHtml(w.term)}</strong> <span class="muted">→ ${escapeHtml(w.translation)}</span> <span class="tag">${w.lang.toUpperCase()}</span></div>
                                ${w.example ? `<div class="muted" style="font-size:0.85em">${escapeHtml(w.example)}</div>` : ''}
                            </div>
                            <select class="input" data-status="${escapeHtml(w.id)}" style="max-width:140px">
                                <option value="kann" ${w.status==='kann'?'selected':''}>Kann ich</option>
                                <option value="wiederholen" ${w.status==='wiederholen'?'selected':''}>Wiederholen</option>
                                <option value="schwer" ${w.status==='schwer'?'selected':''}>Schwer</option>
                            </select>
                            <button class="btn btn--sm btn--danger" data-del="${escapeHtml(w.id)}">${Icons.icon('trash')}</button>
                        </li>
                    `).join('') || '<li class="muted">Keine Einträge.</li>'}
                </ul>
            </div>
        `;
        mount.querySelector('#search').addEventListener('input', e => {
            const q = e.target.value.toLowerCase();
            mount.querySelectorAll('#dlist .list__item').forEach(li => {
                const w = dict.find(x => x.id === li.dataset.id);
                const match = !q || (w.term||'').toLowerCase().includes(q) || (w.translation||'').toLowerCase().includes(q) || (w.example||'').toLowerCase().includes(q);
                li.style.display = match ? '' : 'none';
            });
            noMatch.hidden=!q||[...mount.querySelectorAll('#list .list__item')].some(li=>li.style.display!=='none');
        });
        mount.querySelectorAll('[data-filter]').forEach(b => b.addEventListener('click', () => {
            container.dataset.dictFilter = b.dataset.filter;
            render(container);
        }));
        mount.querySelector('#add').addEventListener('click', () => {
            const term = mount.querySelector('#term').value.trim();
            const trans = mount.querySelector('#trans').value.trim();
            const lang = mount.querySelector('#lang').value;
            const example = mount.querySelector('#ex').value.trim();
            if (!term || !trans) { ExerciseEngine.toast('Bitte Begriff und Übersetzung', 'err'); return; }
            Store.update(state => {
                state.dictionary = state.dictionary || [];
                state.dictionary.push({ id: 'w-' + Date.now(), lang, term, translation: trans, example, status: 'wiederholen' });
                return state;
            });
            ExerciseEngine.toast('Eintrag gespeichert', 'ok');
            Router.go('notizen');
        });
        mount.querySelectorAll('[data-del]').forEach(b => b.addEventListener('click', () => {
            if (!confirm('Eintrag löschen?')) return;
            Store.update(state => { state.dictionary = (state.dictionary || []).filter(x => x.id !== b.dataset.del); return state; });
            ExerciseEngine.toast('Gelöscht', 'ok');
            Router.go('notizen');
        }));
        mount.querySelectorAll('[data-status]').forEach(sel => sel.addEventListener('change', () => {
            const id = sel.dataset.status;
            const status = sel.value;
            Store.update(state => {
                const w = (state.dictionary || []).find(x => x.id === id);
                if (w) w.status = status;
                return state;
            });
            ExerciseEngine.toast('Status aktualisiert', 'ok');
        }));
    }
    function formatDateDE(iso) {
        if (!iso) return '';
        const d = new Date(iso);
        return d.toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit', year: 'numeric' });
    }
    function escapeHtml(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c])); }
    root.Pages = root.Pages || {};
    root.Pages.notizen = render;
})(window);
