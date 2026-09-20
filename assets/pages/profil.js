/* Full profile page. Sections:
   - Persönliche Daten (Name, E-Mail, Schule, Schwerpunkt, Bundesland, Klasse)
   - Prüfung & Zeitbudget (Termin, Stunden/Woche, Sitzungslänge, Tage, Verteilung)
   - Niveau (DE/EN/MATH)
   - Lernpräferenzen (Stärken, Schwächen, Formate, Fokus, Ziel, Intensität)
   - Barrierefreiheit & UI (Theme, Dichte, Schriftgröße, Motion, Kontrast)
   - Konto (Anzeige des angemeldeten Nutzers, Logout, Daten-Export/-Import, Reset)
   Each section is a card with its own Save button. Saves are incremental
   and write to state.profile, the server (if signed in), and the local
   learner model. */
(function (root) {
    function escapeHtml(s) {
        return String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
    }
    function escapeAttr(s) { return escapeHtml(s); }
    function $(sel, ctx) { return (ctx || document).querySelector(sel); }
    function $$(sel, ctx) { return Array.from((ctx || document).querySelectorAll(sel)); }

    function saveAccountFields(card, fields) {
        const s = Store.update(state => {
            const u = window.Auth && window.Auth.readUser ? window.Auth.readUser() : null;
            state.profile = state.profile || {};
            if (fields.name !== undefined) state.profile.name = fields.name;
            if (fields.school !== undefined) state.profile.school = fields.school;
            if (fields.major !== undefined) state.profile.major = fields.major;
            if (fields.federalState !== undefined) state.profile.federalState = fields.federalState;
            state.profile.userId = u ? u.id : null;
            state.profile.email = u ? u.email : null;
            return state;
        });
        if (window.Auth && window.Auth.saveProfile) {
            window.Auth.saveProfile(s.profile).catch(e => console.warn('saveProfile', e));
        }
    }
    function saveExamFields(card, fields) {
        const s = Store.update(state => {
            state.profile = state.profile || {};
            if (fields.examDate !== undefined) state.profile.examDate = fields.examDate;
            if (fields.hoursPerWeek !== undefined) state.profile.hoursPerWeek = fields.hoursPerWeek;
            if (fields.sessionLengthMin !== undefined) state.profile.sessionLengthMin = fields.sessionLengthMin;
            if (fields.availableDays !== undefined) state.profile.availableDays = fields.availableDays;
            if (fields.distribution !== undefined) state.profile.distribution = fields.distribution;
            return state;
        });
        if (window.Auth && window.Auth.saveProfile) {
            window.Auth.saveProfile(s.profile).catch(e => console.warn('saveProfile', e));
        }
    }
    function saveLevelFields(card, fields) {
        Store.update(state => {
            state.profile = state.profile || {};
            if (fields.levelDE !== undefined) state.profile.levelDE = fields.levelDE;
            if (fields.levelEN !== undefined) state.profile.levelEN = fields.levelEN;
            if (fields.mathReadiness !== undefined) state.profile.mathReadiness = fields.mathReadiness;
            return state;
        });
        if (window.Auth && window.Auth.saveProfile) {
            window.Auth.saveProfile(Store.load().profile).catch(e => console.warn('saveProfile', e));
        }
    }
    function savePrefFields(card, fields) {
        Store.update(state => {
            state.profile = state.profile || {};
            if (fields.strengths !== undefined) state.profile.strengths = fields.strengths;
            if (fields.weakTopics !== undefined) state.profile.weakTopics = fields.weakTopics;
            if (fields.formatPrefs !== undefined) state.profile.formatPrefs = fields.formatPrefs;
            if (fields.focus !== undefined) state.profile.focus = fields.focus;
            if (fields.goal !== undefined) state.profile.goal = fields.goal;
            if (fields.intensity !== undefined) state.profile.intensity = fields.intensity;
            return state;
        });
        if (window.Auth && window.Auth.saveProfile) {
            window.Auth.saveProfile(Store.load().profile).catch(e => console.warn('saveProfile', e));
        }
    }
    function saveUiFields(card, fields) {
        const s = Store.update(state => {
            state.ui = state.ui || {};
            if (fields.theme !== undefined) state.ui.theme = fields.theme;
            if (fields.density !== undefined) state.ui.density = fields.density;
            if (fields.fontSize !== undefined) state.ui.fontSize = fields.fontSize;
            if (fields.reduceMotion !== undefined) state.ui.reduceMotion = fields.reduceMotion;
            if (fields.highContrast !== undefined) state.ui.highContrast = fields.highContrast;
            return state;
        });
        if (fields.theme !== undefined) document.documentElement.setAttribute('data-theme', fields.theme);
        if (fields.density !== undefined) document.documentElement.setAttribute('data-density', fields.density);
        if (fields.fontSize !== undefined) document.documentElement.setAttribute('data-fontsize', fields.fontSize);
        if (fields.reduceMotion !== undefined) document.documentElement.setAttribute('data-reduce-motion', String(!!fields.reduceMotion));
        if (fields.highContrast !== undefined) document.documentElement.setAttribute('data-high-contrast', String(!!fields.highContrast));
    }

    function personalCard(p) {
        const schools = ['Carl-Hofer-Schule Karlsruhe', 'Eichendorff-Gymnasium', 'Lessing-Gymnasium', 'Helmholtz-Gymnasium', 'Andere'];
        const states = ['Baden-Württemberg', 'Bayern', 'Berlin', 'Brandenburg', 'Bremen', 'Hamburg', 'Hessen', 'Mecklenburg-Vorpommern', 'Niedersachsen', 'Nordrhein-Westfalen', 'Rheinland-Pfalz', 'Saarland', 'Sachsen', 'Sachsen-Anhalt', 'Schleswig-Holstein', 'Thüringen'];
        const majors = [
            { id: 'BK-Grafikdesign', label: 'Berufskolleg – Grafikdesign' },
            { id: 'BK-Gestaltung', label: 'Berufskolleg – Gestaltung' },
            { id: 'BK-Wirtschaft', label: 'Berufskolleg – Wirtschaft' },
            { id: 'BK-Technik', label: 'Berufskolleg – Technik' },
            { id: 'BK-Sozialwesen', label: 'Berufskolleg – Sozialwesen' }
        ];
        const u = (window.Auth && window.Auth.readUser) ? window.Auth.readUser() : null;
        return `
        <div class="card" data-section="account">
            <div class="card__title">Persönliche Daten</div>
            <div class="form-grid form-grid--3">
                <label>Name
                    <input class="input" id="p-name" value="${escapeAttr(p.name || '')}" autocomplete="name">
                </label>
                <label>E-Mail ${u ? '' : '<span class="muted">(nach Anmeldung)</span>'}
                    <input class="input" id="p-email" value="${escapeAttr(u ? u.email : (p.email || ''))}" readonly>
                </label>
                <label>Schule
                    <input class="input" id="p-school" list="school-list" value="${escapeAttr(p.school || 'Carl-Hofer-Schule Karlsruhe')}" autocomplete="organization">
                    <datalist id="school-list">${schools.map(s => `<option value="${escapeAttr(s)}">`).join('')}</datalist>
                </label>
                <label>Schwerpunkt / Bildungsgang
                    <select class="input" id="p-major">${majors.map(m => `<option value="${escapeAttr(m.id)}" ${p.major === m.id ? 'selected' : ''}>${escapeHtml(m.label)}</option>`).join('')}</select>
                </label>
                <label>Bundesland
                    <select class="input" id="p-state">${states.map(s => `<option ${p.federalState === s ? 'selected' : ''}>${escapeHtml(s)}</option>`).join('')}</select>
                </label>
            </div>
            <div class="row" style="margin-top:12px"><button class="btn btn--primary" data-save="account" type="button">Speichern</button></div>
        </div>`;
    }

    function examCard(p) {
        const days = ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'];
        const sel = p.availableDays || [0, 1, 2, 3, 4];
        const dist = p.distribution || { de: 30, en: 30, math: 40 };
        return `
        <div class="card" data-section="exam">
            <div class="card__title">Prüfung & Zeitbudget</div>
            <div class="form-grid form-grid--3">
                <label>Prüfungstermin
                    <input class="input" id="p-exam" type="date" value="${escapeAttr(p.examDate || '')}">
                </label>
                <label>Stunden pro Woche
                    <input class="input" id="p-hours" type="number" min="1" max="40" step="0.5" value="${p.hoursPerWeek || 5}">
                </label>
                <label>Sitzungslänge (Min.)
                    <input class="input" id="p-sess" type="number" min="15" max="240" step="5" value="${p.sessionLengthMin || 90}">
                </label>
            </div>
            <h3 style="margin-top:14px">Verfügbare Wochentage</h3>
            <div class="wizard__options">${days.map((d, i) => `<label class="wizard__option ${sel.includes(i) ? 'is-selected' : ''}" style="flex:0 0 80px"><input type="checkbox" data-day="${i}" ${sel.includes(i) ? 'checked' : ''}> <span>${d}</span></label>`).join('')}</div>
            <h3 style="margin-top:14px">Fach-Verteilung (%)</h3>
            <div class="form-grid form-grid--3">
                <label>Deutsch<input class="input" id="p-dde" type="number" min="0" max="100" value="${dist.de}"></label>
                <label>Englisch<input class="input" id="p-den" type="number" min="0" max="100" value="${dist.en}"></label>
                <label>Mathematik<input class="input" id="p-dma" type="number" min="0" max="100" value="${dist.math}"></label>
            </div>
            <p class="muted">Die drei Zahlen addieren sich zu 100. Standard: 30 / 30 / 40.</p>
            <div class="row" style="margin-top:12px"><button class="btn btn--primary" data-save="exam" type="button">Speichern</button></div>
        </div>`;
    }

    function levelCard(p) {
        const levels = ['A1', 'A2', 'B1', 'B2', 'C1'];
        const opts = (sub) => levels.map(l => `<option value="${l}" ${(p['level' + sub] === l) ? 'selected' : ''}>${l}</option>`).join('');
        return `
        <div class="card" data-section="levels">
            <div class="card__title">Niveau nach Fach</div>
            <div class="form-grid form-grid--3">
                <label>Deutsch<select class="input" id="p-lv-de">${opts('DE')}</select></label>
                <label>Englisch<select class="input" id="p-lv-en">${opts('EN')}</select></label>
                <label>Mathematik<select class="input" id="p-lv-math">${[['foundation','Grundlagen aufbauen'],['developing','Mit Unterstützung anwenden'],['secure','Selbstständig begründen']].map(([v,l])=>`<option value="${v}" ${p.mathReadiness===v?'selected':''}>${l}</option>`).join('')}</select></label>
            </div>
            <div class="row" style="margin-top:12px"><button class="btn btn--primary" data-save="levels" type="button">Speichern</button></div>
        </div>`;
    }

    function prefCard(p) {
        const all = [
            { id: 'de-ortho', label: 'Deutsch: Rechtschreibung', sub: 'de' },
            { id: 'de-gram', label: 'Deutsch: Grammatik', sub: 'de' },
            { id: 'de-text', label: 'Deutsch: Textanalyse', sub: 'de' },
            { id: 'en-tense', label: 'Englisch: Tenses', sub: 'en' },
            { id: 'en-vocab', label: 'Englisch: Wortschatz', sub: 'en' },
            { id: 'en-write', label: 'Englisch: Schreiben', sub: 'en' },
            { id: 'ma-func', label: 'Mathematik: Funktionen', sub: 'math' },
            { id: 'ma-calc', label: 'Mathematik: Ableitung/Integral', sub: 'math' },
            { id: 'math', label: 'Mathematik: Modellierung und Transfer', sub: 'math' },
            { id: 'gr-plakat', label: 'Gestaltung: Analyse', sub: 'grafik' },
            { id: 'gr-typografie', label: 'Gestaltung: Typografie', sub: 'grafik' },
            { id: 'gr-briefing', label: 'Gestaltung: Konzept', sub: 'grafik' },
            { id: 'gr-portfolio', label: 'Gestaltung: Portfolio', sub: 'grafik' }
        ];
        const strengths = p.strengths || [];
        // weakTopics in state is an object {de:[], en:[], math:[]}; merge for includes() checks.
        const wt = p.weakTopics || {};
        const weak = Array.isArray(wt) ? wt : [].concat(wt.de || [], wt.en || [], wt.math || []);
        const formats = [
            { id: 'analysis', label: 'Analyse und Vergleich' },
            { id: 'project', label: 'Projekte und eigene Ergebnisse' },
            { id: 'argumentation', label: 'Argumentation' },
            { id: 'error', label: 'Fehleranalyse' },
            { id: 'fill', label: 'Lückentext' },
            { id: 'match', label: 'Zuordnung' },
            { id: 'sort', label: 'Reihenfolge' },
            { id: 'flashcard', label: 'Karteikarten' },
            { id: 'cloze', label: 'Cloze' },
            { id: 'free', label: 'Freitext' },
            { id: 'math-input', label: 'Mathematik-Eingabe' }
        ];
        const formatSel = p.formatPrefs || [];
        const focusOpts = [
            { id: 'writing', label: 'Schreiben' },
            { id: 'vocabulary', label: 'Wortschatz' },
            { id: 'grammar', label: 'Grammatik' },
            { id: 'time', label: 'Zeitmanagement' },
            { id: 'math', label: 'Mathematik' },
            { id: 'analysis', label: 'Textanalyse' },
            { id: 'plakat', label: 'Plakat-Analyse' },
            { id: 'typografie', label: 'Typografie' },
            { id: 'portfolio', label: 'Portfolio' }
        ];
        const focus = p.focus || [];
        const goal = p.goal || 'pass';
        const intensity = p.intensity || 'normal';
        const renderChip = (id, label, sel, group) => `<button type="button" class="wizard__chip ${sel ? 'is-selected' : ''}" data-pref-chip="${escapeAttr(id)}" data-pref-group="${group}" aria-pressed="${sel}">${escapeHtml(label)}</button>`;
        return `
        <div class="card" data-section="prefs">
            <div class="card__title">Stärken & Schwächen</div>
            <h3>Stärken</h3>
            <div class="wizard__chips">${all.map(t => renderChip(t.id, t.label, strengths.includes(t.id), 's')).join('')}</div>
            <h3>Schwächen</h3>
            <div class="wizard__chips">${all.map(t => renderChip(t.id, t.label, weak.includes(t.id), 'w')).join('')}</div>

            <h3 style="margin-top:14px">Lieblingsformate</h3>
            <div class="wizard__chips">${formats.map(f => renderChip(f.id, f.label, formatSel.includes(f.id), 'f')).join('')}</div>

            <h3 style="margin-top:14px">Fokus</h3>
            <div class="wizard__chips">${focusOpts.map(o => renderChip(o.id, o.label, focus.includes(o.id), 'c')).join('')}</div>

            <h3 style="margin-top:14px">Ziel & Intensität</h3>
            <div class="form-grid form-grid--2">
                <label>Ziel
                    <select class="input" id="p-goal">
                        <option value="pass" ${goal === 'pass' ? 'selected' : ''}>Bestehen</option>
                        <option value="good" ${goal === 'good' ? 'selected' : ''}>Gute Note (2 oder besser)</option>
                        <option value="best" ${goal === 'best' ? 'selected' : ''}>Bestnote (1)</option>
                        <option value="study" ${goal === 'study' ? 'selected' : ''}>Studium vorbereiten</option>
                    </select>
                </label>
                <label>Intensität
                    <select class="input" id="p-intens">
                        <option value="soft" ${intensity === 'soft' ? 'selected' : ''}>Sanft</option>
                        <option value="normal" ${intensity === 'normal' ? 'selected' : ''}>Normal (5–7 h/Woche)</option>
                        <option value="intense" ${intensity === 'intense' ? 'selected' : ''}>Intensiv (8–12 h/Woche)</option>
                        <option value="sprint" ${intensity === 'sprint' ? 'selected' : ''}>Sprint (>12 h/Woche)</option>
                    </select>
                </label>
            </div>
            <div class="row" style="margin-top:12px"><button class="btn btn--primary" data-save="prefs" type="button">Speichern</button></div>
        </div>`;
    }

    function grafikCard(p) {
        // Personalisierung für BK Grafikdesign (Carl-Hofer-Schule Karlsruhe)
        const isGrafik = (p.major || '').startsWith('BK-Grafik') || (p.major || '').startsWith('BK-Gestalt');
        const g = p.grafik || {};
        const projects = [
            { id: 'markenrelaunch', label: 'Markenrelaunch', topics: ['Logo', 'Wortmarke', 'Anwendungen'] },
            { id: 'editorial', label: 'Editorial (Magazin/Buch)', topics: ['Layout', 'Typografie', 'Bildauswahl'] },
            { id: 'plakat', label: 'Plakat / Kampagne', topics: ['Print', 'Digital', 'Social'] },
            { id: 'freiesprojekt', label: 'Freies Projekt', topics: ['Motion', 'Verpackung', 'Type-Design'] }
        ];
        const selProjects = g.projects || [];
        const tools = ['Adobe Illustrator', 'Adobe InDesign', 'Adobe Photoshop', 'Figma', 'Affinity Designer', 'Procreate'];
        const selTools = g.tools || [];
        const styles = ['Editorial Design', 'Corporate Design', 'Plakat', 'Type-Design', 'Branding', 'Illustration'];
        const selStyles = g.styles || [];
        const renderChip = (id, label, sel, group) => `<button type="button" class="wizard__chip ${sel ? 'is-selected' : ''}" data-grafik-chip="${escapeAttr(id)}" data-grafik-group="${group}" aria-pressed="${sel}">${escapeHtml(label)}</button>`;
        return `
        <div class="card" data-section="grafik">
            <div class="card__title">Grafikdesign-Personalisierung</div>
            <p class="muted">${isGrafik ? 'Diese Angaben helfen uns, Aufgaben aus dem begleitenden Portfolio mit deinen Schulfächern zu verknüpfen.' : 'Aktiviere den Schwerpunkt „Berufskolleg – Grafikdesign" oben, um diese Personalisierung zu nutzen.'}</p>

            <h3 style="margin-top:8px">Portfolio-Projekte</h3>
            <div class="wizard__chips">${projects.map(p => renderChip(p.id, p.label, selProjects.includes(p.id), 'p')).join('')}</div>

            <h3 style="margin-top:14px">Lieblings-Werkzeuge</h3>
            <div class="wizard__chips">${tools.map(t => renderChip(t, t, selTools.includes(t), 't')).join('')}</div>

            <h3 style="margin-top:14px">Stilrichtungen</h3>
            <div class="wizard__chips">${styles.map(t => renderChip(t, t, selStyles.includes(t), 's')).join('')}</div>

            <div class="row" style="margin-top:14px">
                <a class="btn btn--ghost" href="#/grafik">Grafik-Lektionen ansehen</a>
                <button class="btn btn--primary" data-save="grafik" type="button" ${isGrafik ? '' : 'disabled'}>Speichern</button>
            </div>
        </div>`;
    }

    function onboardingCard(p) {
        const lastDiag = p.onboardedAt ? new Date(p.onboardedAt).toLocaleDateString('de-DE') : '—';
        return `
        <div class="card" data-section="onboarding">
            <div class="card__title">Diagnostischer Test</div>
            <p class="muted">Zuletzt ausgeführt: <b>${escapeHtml(lastDiag)}</b>. Du kannst den Test jederzeit wiederholen, um dein Profil zu schärfen.</p>
            <div class="row" style="margin-top:8px">
                <a class="btn btn--primary" href="#/onboarding">Test wiederholen</a>
                <a class="btn btn--ghost" href="#/dashboard">Zurück zum Dashboard</a>
            </div>
        </div>`;
    }

    function uiCard() {
        const s = Store.load();
        const ui = s.ui || {};
        const themes = ['light', 'dark', 'auto'];
        const densities = ['compact', 'cozy', 'comfortable'];
        const sizes = ['sm', 'base', 'lg'];
        return `
        <div class="card" data-section="ui">
            <div class="card__title">Barrierefreiheit & Anzeige</div>
            <div class="form-grid form-grid--3">
                <label>Dichte
                    <select class="input" id="p-density">${densities.map(d => `<option value="${d}" ${ui.density === d ? 'selected' : ''}>${d}</option>`).join('')}</select>
                </label>
                <label>Schriftgröße
                    <select class="input" id="p-fontsize">${sizes.map(z => `<option value="${z}" ${ui.fontSize === z ? 'selected' : ''}>${z}</option>`).join('')}</select>
                </label>
            </div>
            <div class="row" style="margin-top:8px">
                <label class="row" style="gap:6px"><input type="checkbox" id="p-reduce" ${ui.reduceMotion ? 'checked' : ''}> <span>Animationen reduzieren</span></label>
                <label class="row" style="gap:6px"><input type="checkbox" id="p-contrast" ${ui.highContrast ? 'checked' : ''}> <span>Hoher Kontrast</span></label>
            </div>
            <div class="row" style="margin-top:12px"><button class="btn btn--primary" data-save="ui" type="button">Anwenden</button></div>
        </div>`;
    }

    function accountCard() {
        const u = (window.Auth && window.Auth.readUser) ? window.Auth.readUser() : null;
        return `
        <div class="card" data-section="account-extra">
            <div class="card__title">Konto & Daten</div>
            <p class="muted">${u ? 'Angemeldet als <b>' + escapeHtml(u.name || u.email) + '</b>.' : 'Nicht angemeldet. Daten liegen nur lokal.'}</p>
            <div class="row" style="margin-top:8px">
                ${u ? '<button class="btn btn--ghost" id="p-logout" type="button">Abmelden</button>' : '<a class="btn btn--primary" href="login.html">Anmelden</a>'}
                <button class="btn btn--ghost" id="p-export" type="button">Daten exportieren</button>
                <label class="btn btn--ghost" style="cursor:pointer">Daten importieren<input id="p-import" type="file" accept="application/json" hidden></label>
                <button class="btn btn--ghost" id="p-regen" type="button">Lernplan neu generieren</button>
                <button class="btn btn--ghost" id="p-reset" type="button">Profil zurücksetzen</button>
            </div>
            <div id="p-export-output" class="form-dev" hidden></div>
        </div>`;
    }

    function bind(container) {
        // Strengths/weaknesses/formats/focus chips
        container.querySelectorAll('[data-pref-chip]').forEach(btn => {
            btn.addEventListener('click', () => {
                btn.classList.toggle('is-selected');
                btn.setAttribute('aria-pressed', String(btn.classList.contains('is-selected')));
            });
        });
        // Grafik-Personalisierungschips
        container.querySelectorAll('[data-grafik-chip]').forEach(btn => {
            btn.addEventListener('click', () => {
                btn.classList.toggle('is-selected');
                btn.setAttribute('aria-pressed', String(btn.classList.contains('is-selected')));
            });
        });
        container.querySelectorAll('[data-day]').forEach(cb => {
            cb.addEventListener('change', () => {
                const lbl = cb.closest('label');
                if (lbl) lbl.classList.toggle('is-selected', cb.checked);
            });
        });

        container.querySelectorAll('[data-save]').forEach(btn => {
            btn.addEventListener('click', () => {
                const which = btn.dataset.save;
                if (which === 'account') {
                    saveAccountFields(null, {
                        name: ($('#p-name', container) || {}).value || '',
                        school: ($('#p-school', container) || {}).value || '',
                        major: ($('#p-major', container) || {}).value || 'BK-Grafikdesign',
                        federalState: ($('#p-state', container) || {}).value || 'Baden-Württemberg'
                    });
                    ExerciseEngine.toast('Persönliche Daten gespeichert.', 'ok');
                } else if (which === 'exam') {
                    const days = $$('[data-day]', container).filter(c => c.checked).map(c => Number(c.dataset.day));
                    saveExamFields(null, {
                        examDate: ($('#p-exam', container) || {}).value || '',
                        hoursPerWeek: Number(($('#p-hours', container) || {}).value) || 5,
                        sessionLengthMin: Number(($('#p-sess', container) || {}).value) || 90,
                        availableDays: days,
                        distribution: {
                            de: Number(($('#p-dde', container) || {}).value) || 30,
                            en: Number(($('#p-den', container) || {}).value) || 30,
                            math: Number(($('#p-dma', container) || {}).value) || 40
                        }
                    });
                    ExerciseEngine.toast('Prüfung & Zeitbudget gespeichert.', 'ok');
                } else if (which === 'levels') {
                    saveLevelFields(null, {
                        levelDE: ($('#p-lv-de', container) || {}).value || 'B1',
                        levelEN: ($('#p-lv-en', container) || {}).value || 'B1',
                        mathReadiness: ($('#p-lv-math', container) || {}).value || 'developing'
                    });
                    ExerciseEngine.toast('Niveau gespeichert.', 'ok');
                } else if (which === 'prefs') {
                    const s = $$('[data-pref-group="s"]', container).filter(x => x.classList.contains('is-selected')).map(x => x.dataset.prefChip);
                    const w = $$('[data-pref-group="w"]', container).filter(x => x.classList.contains('is-selected')).map(x => x.dataset.prefChip);
                    const f = $$('[data-pref-group="f"]', container).filter(x => x.classList.contains('is-selected')).map(x => x.dataset.prefChip);
                    const c = $$('[data-pref-group="c"]', container).filter(x => x.classList.contains('is-selected')).map(x => x.dataset.prefChip);
                    savePrefFields(null, {
                        strengths: s, weakTopics: w, formatPrefs: f, focus: c,
                        goal: ($('#p-goal', container) || {}).value || 'pass',
                        intensity: ($('#p-intens', container) || {}).value || 'normal'
                    });
                    ExerciseEngine.toast('Präferenzen gespeichert.', 'ok');
                } else if (which === 'ui') {
                    saveUiFields(null, {
                        theme: Store.load().ui.theme,
                        density: ($('#p-density', container) || {}).value || 'cozy',
                        fontSize: ($('#p-fontsize', container) || {}).value || 'base',
                        reduceMotion: !!($('#p-reduce', container) || {}).checked,
                        highContrast: !!($('#p-contrast', container) || {}).checked
                    });
                    ExerciseEngine.toast('Anzeige angewendet.', 'ok');
                } else if (which === 'grafik') {
                    const p = $$('[data-grafik-group="p"]', container).filter(x => x.classList.contains('is-selected')).map(x => x.dataset.grafikChip);
                    const t = $$('[data-grafik-group="t"]', container).filter(x => x.classList.contains('is-selected')).map(x => x.dataset.grafikChip);
                    const s = $$('[data-grafik-group="s"]', container).filter(x => x.classList.contains('is-selected')).map(x => x.dataset.grafikChip);
                    Store.update(state => {
                        state.profile = state.profile || {};
                        state.profile.grafik = { projects: p, tools: t, styles: s };
                        return state;
                    });
                    if (window.Auth && window.Auth.saveProfile) {
                        window.Auth.saveProfile(Store.load().profile).catch(e => console.warn('saveProfile', e));
                    }
                    ExerciseEngine.toast('Grafik-Profil gespeichert.', 'ok');
                }
            });
        });

        const logoutBtn = container.querySelector('#p-logout');
        if (logoutBtn) logoutBtn.addEventListener('click', async () => {
            if (window.Auth) await window.Auth.logout();
            ExerciseEngine.toast('Abgemeldet.', 'ok');
            Router.go('dashboard');
        });
        const exportBtn = container.querySelector('#p-export');
        if (exportBtn) exportBtn.addEventListener('click', () => {
            const url=URL.createObjectURL(new Blob([Store.exportData()],{type:'application/json'}));
            const a=document.createElement('a');a.href=url;a.download='wunderatlas-backup.json';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);
            const out=container.querySelector('#p-export-output');if(out){out.hidden=false;out.textContent='Sicherung als Datei heruntergeladen.';}
            ExerciseEngine.toast('Sicherung heruntergeladen.', 'ok');
        });
        const importInput = container.querySelector('#p-import');
        if (importInput) importInput.addEventListener('change', async (e) => {
            const file = e.target.files && e.target.files[0];
            if (!file) return;
            try {
                const text = await file.text();
                Store.importData(text);
                ExerciseEngine.toast('Daten importiert.', 'ok');
                Router.go('profil');
            } catch (err) {
                ExerciseEngine.toast('Import fehlgeschlagen: ' + err.message, 'err');
            }
        });
        const regen = container.querySelector('#p-regen');
        if (regen) regen.addEventListener('click', () => {
            const s2 = Store.load();
            const plan = PlanTemplate.generate(s2.profile);
            Store.update(state => { state.plan = plan; return state; });
            ExerciseEngine.toast('Lernplan neu generiert.', 'ok');
            Router.go('plan');
        });
        const reset = container.querySelector('#p-reset');
        if (reset) reset.addEventListener('click', () => {
            if (!confirm('Profil auf Standardwerte zurücksetzen?')) return;
            Store.update(s=>{s.profile=Store.defaultState().profile;return s;});
            ExerciseEngine.toast('Profil zurückgesetzt.', 'ok');
            Router.go('profil');
        });
    }

    function applyUiPrefs() {
        const ui = (Store.load() && Store.load().ui) || {};
        document.documentElement.setAttribute('data-theme', ui.theme || 'light');
        document.documentElement.setAttribute('data-density', ui.density || 'cozy');
        document.documentElement.setAttribute('data-fontsize', ui.fontSize || 'base');
        document.documentElement.setAttribute('data-reduce-motion', String(!!ui.reduceMotion));
        document.documentElement.setAttribute('data-high-contrast', String(!!ui.highContrast));
    }

    async function render(container) {
        applyUiPrefs();
        Router.renderBreadcrumbs([{ label: 'Dashboard', href: '#/dashboard' }, { label: 'Profil' }]);
        const s = Store.load();
        const p = window.PracticeSystem ? PracticeSystem.normalise(s.profile) : (s.profile || {});

        // Decorative corner flourishes for the header
        const fTL = window.Motifs ? window.Motifs.render('flower', { color: 'var(--primary)', size: 30 }) : null;
        const fTR = window.Motifs ? window.Motifs.render('sparkle', { color: 'var(--butter)', size: 26 }) : null;

        container.innerHTML = `
            <div class="page-header surface-with-flourish">
                <div>
                    <h1>Profil &amp; Einstellungen</h1>
                    <div class="page-header__meta">Persönliche Daten, Prüfung, Niveau, Lernpräferenzen und Konto.</div>
                </div>
                <div class="welcome-row__mascot" data-mascot-profil-corner aria-hidden="true"></div>
                <span class="flourish flourish--flower flourish--tl" data-flourish="tl" aria-hidden="true"></span>
                <span class="flourish flourish--star flourish--tr" data-flourish="tr" aria-hidden="true"></span>
            </div>
            ${personalCard(p)}
            ${examCard(p)}
            ${levelCard(p)}
            ${prefCard(p)}
            ${grafikCard(p)}
            ${onboardingCard(p)}
            ${uiCard()}
            ${accountCard()}
        `;

        // Place the pony in the corner — greeting state for the profile
        const ponySlot = container.querySelector('[data-mascot-profil-corner]');
        if (ponySlot && window.Mascot) {
            window.Mascot.set(ponySlot, 'greeting', { size: 80 });
        }
        const flourishMap = { tl: fTL, tr: fTR };
        container.querySelectorAll('[data-flourish]').forEach(slot => {
            const node = flourishMap[slot.getAttribute('data-flourish')];
            if (node) slot.appendChild(node);
        });

        bind(container);
    }
    root.Pages = root.Pages || {};
    root.Pages.profil = render;
    root.Pages.profil.crumbs = () => [{ label: 'Dashboard', href: '#/dashboard' }, { label: 'Profil' }];
})(window);
