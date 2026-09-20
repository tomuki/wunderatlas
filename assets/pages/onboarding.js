/* 9-stage onboarding wizard. Combines subjective input (school, levels,
   time, formats, strengths/weaknesses) with an objective diagnostic test
   that scores and feeds the adaptive learner model. Progress is saved
   to state.profile and to the server (if signed in). */
(function (root) {
    const STAGES = [
        { id: 'school', title: 'Schule & Bundesland', desc: 'Damit wir Inhalte und Operatoren passend wählen.' },
        { id: 'exam', title: 'Prüfungstermin', desc: 'Wir berechnen deinen Lernplan ab heute.' },
        { id: 'selfassess', title: 'Selbsteinschätzung', desc: 'Wie schätzt du dein Niveau ein?' },
        { id: 'strengths', title: 'Stärken & Schwächen', desc: 'Wähle Themen, in denen du dich sicher oder unsicher fühlst.' },
        { id: 'formats', title: 'Lernformate', desc: 'Welche Aufgabentypen magst du?' },
        { id: 'time', title: 'Zeit & Tage', desc: 'Wie viele Stunden pro Woche und an welchen Tagen?' },
        { id: 'goals', title: 'Ziele & Intensität', desc: 'Was willst du erreichen?' },
        { id: 'diag', title: 'Diagnostischer Test', desc: '18 Multiple-Choice-Aufgaben, 6 pro Fach. Dauer ca. 12 Minuten.' },
        { id: 'done', title: 'Bereit', desc: 'Dein Lernplan wird jetzt erstellt.' }
    ];
    const STORAGE_KEY = 'fhr-onboarding-draft';
    const DIAG_PER_SUBJECT = 6;
    const draftKey = () => STORAGE_KEY + '/' + (window.Auth?.readUser()?.id || 'guest');

    function draft() { try { return JSON.parse(sessionStorage.getItem(draftKey()) || '{}'); } catch (e) { return {}; } }
    function saveDraft(d) { try { sessionStorage.setItem(draftKey(), JSON.stringify(d)); } catch (e) {} }
    function clearDraft() { try { sessionStorage.removeItem(draftKey()); } catch (e) {} }

    function current() {
        const s = Store.load();
        const d = draft();
        const merged = Object.assign({}, s.profile || {}, d);
        return window.PracticeSystem ? PracticeSystem.normalise(merged) : merged;
    }

    function escapeHtml(s) {
        return String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
    }
    function escapeAttr(s) { return escapeHtml(s); }

    function selectedIn(arr, sel) { return (arr || []).filter(x => (sel || []).includes(x)); }

    function progressBar(step) {
        const dots = STAGES.map((st, i) => {
            const cls = i < step ? 'is-done' : (i === step ? 'is-current' : '');
            return `<span class="wizard__step-dot ${cls}" aria-hidden="true"></span>`;
        }).join('');
        return `<div class="wizard__progress" role="progressbar" aria-valuemin="0" aria-valuemax="${STAGES.length}" aria-valuenow="${step + 1}">
            <div class="wizard__progress-text">Schritt ${step + 1} von ${STAGES.length} · ${escapeHtml(STAGES[step].title)}</div>
            <div class="wizard__progress-dots">${dots}</div>
        </div>`;
    }

    function step0(c, data) {
        const schools = ['Carl-Hofer-Schule Karlsruhe', 'Eichendorff-Gymnasium', 'Lessing-Gymnasium', 'Helmholtz-Gymnasium', 'Andere'];
        const states = ['Baden-Württemberg', 'Bayern', 'Berlin', 'Brandenburg', 'Bremen', 'Hamburg', 'Hessen', 'Mecklenburg-Vorpommern', 'Niedersachsen', 'Nordrhein-Westfalen', 'Rheinland-Pfalz', 'Saarland', 'Sachsen', 'Sachsen-Anhalt', 'Schleswig-Holstein', 'Thüringen'];
        const majors = [
            { id: 'BK-Grafikdesign', label: 'Berufskolleg – Grafikdesign' },
            { id: 'BK-Gestaltung', label: 'Berufskolleg – Gestaltung' },
            { id: 'BK-Wirtschaft', label: 'Berufskolleg – Wirtschaft' },
            { id: 'BK-Technik', label: 'Berufskolleg – Technik' },
            { id: 'BK-Sozialwesen', label: 'Berufskolleg – Sozialwesen' }
        ];
        return `
            <div class="wizard__grid">
                <label>Schule
                    <select class="input" id="o-school">${schools.map(s => `<option ${data.school === s ? 'selected' : ''}>${escapeHtml(s)}</option>`).join('')}</select>
                </label>
                <label>Bundesland
                    <select class="input" id="o-state">${states.map(s => `<option ${data.federalState === s ? 'selected' : ''}>${escapeHtml(s)}</option>`).join('')}</select>
                </label>
                <label>Schwerpunkt / Bildungsgang
                    <select class="input" id="o-major">${majors.map(m => `<option value="${escapeAttr(m.id)}" ${data.major === m.id ? 'selected' : ''}>${escapeHtml(m.label)}</option>`).join('')}</select>
                </label>
            </div>
            <div id="o-grafik-hint" class="muted" hidden></div>
        `;
    }
    function step1(c, data) {
        const today = new Date().toISOString().slice(0, 10);
        const def = data.examDate || (new Date(Date.now() + 240 * 86400000)).toISOString().slice(0, 10);
        return `
            <p class="muted">Die zentrale FHR-Prüfung in Baden-Württemberg findet Ende April / Anfang Mai statt. Du kannst das Datum jederzeit anpassen.</p>
            <label>Prüfungstermin
                <input class="input" id="o-exam" type="date" min="${today}" value="${escapeAttr(def)}">
            </label>
            <p class="muted" id="o-exam-info"></p>
        `;
    }
    function step2(c, data) {
        const levels = ['A1', 'A2', 'B1', 'B2', 'C1'];
        const opts = (sub) => levels.map(l => `<option value="${l}" ${(data['level' + sub] === l) ? 'selected' : ''}>${l}</option>`).join('');
        return `
            <p class="muted">Schätze ehrlich ein — die adaptive Auswahl nutzt dein Niveau, um Aufgaben zu wählen.</p>
            <div class="form-grid form-grid--3">
                <label>Deutsch
                    <select class="input" id="o-lv-de">${opts('DE')}</select>
                </label>
                <label>Englisch
                    <select class="input" id="o-lv-en">${opts('EN')}</select>
                </label>
                <label>Mathematik
                    <select class="input" id="o-lv-math">${[['foundation','Grundlagen aufbauen'],['developing','Verfahren mit Unterstützung anwenden'],['secure','Verfahren selbstständig begründen']].map(([v,l])=>`<option value="${v}" ${data.mathReadiness===v?'selected':''}>${l}</option>`).join('')}</select>
                </label>
            </div>
        `;
    }
    function step3(c, data) {
        const isGrafik = /grafik|gestalt/i.test(data.major || '');
        const all = [
            { id: 'de-ortho', label: 'Deutsch: Rechtschreibung', sub: 'de' },
            { id: 'de-gram', label: 'Deutsch: Grammatik', sub: 'de' },
            { id: 'de-text', label: 'Deutsch: Textanalyse', sub: 'de' },
            { id: 'en-tense', label: 'Englisch: Tenses', sub: 'en' },
            { id: 'en-vocab', label: 'Englisch: Wortschatz', sub: 'en' },
            { id: 'en-write', label: 'Englisch: Schreiben', sub: 'en' },
            { id: 'ma-func', label: 'Mathematik: Funktionen', sub: 'math' },
            { id: 'ma-calc', label: 'Mathematik: Ableitung/Integral', sub: 'math' },
            { id: 'math', label: 'Mathematik: Modellierung und Transfer', sub: 'math' }
        ];
        const grafikAll = isGrafik ? [
            { id: 'gr-plakat', label: 'Grafik: Plakat-Analyse', sub: 'gr' },
            { id: 'gr-typografie', label: 'Grafik: Typografie', sub: 'gr' },
            { id: 'gr-portfolio', label: 'Grafik: Portfolio', sub: 'gr' },
            { id: 'gr-briefing', label: 'Grafik: Briefing & Konzept', sub: 'gr' }
        ] : [];
        const allWithG = all.concat(grafikAll);
        const strengths = data.strengths || [];
        const weaknesses = data.weakTopics || [];
        const renderChip = (t, group) => {
            const sel = (group === 's' ? strengths : weaknesses).includes(t.id);
            return `<button class="wizard__chip ${sel ? 'is-selected' : ''}" data-chip="${escapeAttr(t.id)}" data-group="${group}" type="button" aria-pressed="${sel}">${escapeHtml(t.label)}</button>`;
        };
        return `
            <p class="muted">Wähle mehrere aus. Wir nutzen das für die Wiederholungs-Warteschlange und für passende Aufgaben.</p>
            <h3>Stärken</h3>
            <div class="wizard__chips">${allWithG.map(t => renderChip(t, 's')).join('')}</div>
            <h3>Schwächen</h3>
            <div class="wizard__chips">${allWithG.map(t => renderChip(t, 'w')).join('')}</div>
        `;
    }
    function step4(c, data) {
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
        const sel = data.formatPrefs || [];
        return `
            <p class="muted">Markiere Formate, die dir liegen. Wir priorisieren sie in der Auswahl, ohne andere auszuschließen.</p>
            <div class="wizard__chips">${formats.map(f => `<button class="wizard__chip ${sel.includes(f.id) ? 'is-selected' : ''}" data-format="${escapeAttr(f.id)}" type="button" aria-pressed="${sel.includes(f.id)}">${escapeHtml(f.label)}</button>`).join('')}</div>
        `;
    }
    function step5(c, data) {
        const days = ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'];
        const sel = data.availableDays || [0, 1, 2, 3, 4];
        return `
            <div class="form-grid form-grid--3">
                <label>Stunden pro Woche
                    <input class="input" id="o-hours" type="number" min="1" max="40" step="0.5" value="${data.hoursPerWeek || 5}">
                </label>
                <label>Sitzungslänge (Min.)
                    <input class="input" id="o-sess" type="number" min="15" max="240" step="5" value="${data.sessionLengthMin || 90}">
                </label>
                <label>Verteilung DE / EN / MATH (%)
                    <div class="form-grid form-grid--3" style="grid-gap:6px;margin-top:6px">
                        <input class="input" id="o-dde" type="number" min="0" max="100" value="${(data.distribution && data.distribution.de) || 30}">
                        <input class="input" id="o-den" type="number" min="0" max="100" value="${(data.distribution && data.distribution.en) || 30}">
                        <input class="input" id="o-dma" type="number" min="0" max="100" value="${(data.distribution && data.distribution.math) || 40}">
                    </div>
                </label>
            </div>
            <h3>Wochentage</h3>
            <div class="wizard__options">${days.map((d, i) => `<label class="wizard__option ${sel.includes(i) ? 'is-selected' : ''}" style="flex:0 0 90px"><input type="checkbox" data-day="${i}" ${sel.includes(i) ? 'checked' : ''}> <span>${d}</span></label>`).join('')}</div>
        `;
    }
    function step6(c, data) {
        const goals = [
            { id: 'pass', label: 'Bestehen', desc: 'Ich will die FHR schaffen.' },
            { id: 'good', label: 'Gute Note', desc: 'Note 2 oder besser anstreben.' },
            { id: 'best', label: 'Bestnote', desc: 'Note 1 anstreben.' },
            { id: 'study', label: 'Studium vorbereiten', desc: 'Schwerpunkt: nahtloser Übergang in ein Studium.' }
        ];
        const intensities = [
            { id: 'soft', label: 'Sanft', desc: 'Locker, ohne Druck.' },
            { id: 'normal', label: 'Normal', desc: '5–7 Stunden pro Woche.' },
            { id: 'intense', label: 'Intensiv', desc: '8–12 Stunden pro Woche.' },
            { id: 'sprint', label: 'Sprint', desc: 'Mehr als 12 Stunden pro Woche.' }
        ];
        const goal = data.goal || 'pass';
        const intens = data.intensity || 'normal';
        return `
            <h3>Ziel</h3>
            <div class="wizard__options">${goals.map(g => `<label class="wizard__option ${goal === g.id ? 'is-selected' : ''}"><input type="radio" name="o-goal" value="${g.id}" ${goal === g.id ? 'checked' : ''}> <span><b>${escapeHtml(g.label)}</b><br><span class="muted">${escapeHtml(g.desc)}</span></span></label>`).join('')}</div>
            <h3>Intensität</h3>
            <div class="wizard__options">${intensities.map(g => `<label class="wizard__option ${intens === g.id ? 'is-selected' : ''}"><input type="radio" name="o-intens" value="${g.id}" ${intens === g.id ? 'checked' : ''}> <span><b>${escapeHtml(g.label)}</b><br><span class="muted">${escapeHtml(g.desc)}</span></span></label>`).join('')}</div>
        `;
    }
    function pickDiag() {
        // 6 questions per subject. We pick the first 6 from each content file,
        // preferring short, level-appropriate items. Wenn BK-Grafik aktiv ist,
        // ergänzen wir 2 Fragen aus dem Grafik-Katalog.
        const out = { de: [], en: [], math: [] };
        const s = Store.load();
        const isGrafik = /grafik|gestalt/i.test(s.profile?.major || '');
        const files = {
            de: () => (root.ContentDE && root.ContentDE.list) || [],
            en: () => (root.ContentEN && root.ContentEN.list) || [],
            math: () => (root.ContentMATH && root.ContentMATH.list) || []
        };
        for (const sub of Object.keys(out)) {
            const lessons = files[sub]();
            for (const l of lessons) {
                for (const ex of (l.exercises || [])) {
                    if (out[sub].length >= DIAG_PER_SUBJECT) break;
                    if (ex.type !== 'mc') continue;
                    out[sub].push({
                        subject: sub,
                        topic: l.id,
                        lessonTitle: l.title,
                        type: ex.type,
                        prompt: ex.q || ex.prompt || ex.text || '',
                        options: ex.options,
                        answer: ex.answer,
                        difficulty: 0.5
                    });
                }
                if (out[sub].length >= DIAG_PER_SUBJECT) break;
            }
        }
        // Optional: 2 Grafik-Fragen hinzufügen, als „gr" subject (wird im UI als GRAF getaggt).
        if (isGrafik && root.ContentGRAF) {
            const glessons = root.ContentGRAF.list || root.ContentGRAF.lessons || [];
            out.gr = [];
            for (const l of glessons) {
                for (const ex of (l.exercises || [])) {
                    if (out.gr.length >= 2) break;
                    if (ex.type !== 'mc') continue;
                    out.gr.push({
                        subject: 'gr',
                        topic: l.id,
                        lessonTitle: l.title,
                        type: ex.type,
                        prompt: ex.q || ex.prompt || ex.text || '',
                        options: ex.options,
                        answer: ex.answer,
                        difficulty: 0.5
                    });
                }
                if (out.gr.length >= 2) break;
            }
        }
        return out;
    }
    function step7(c, data) {
        const diag = data._diag || (data._diag = pickDiag());
        saveDraft(data);
        const all = [...diag.de, ...diag.en, ...diag.math, ...(diag.gr || [])];
        return `
            <p class="muted">Beantworte die 18${diag.gr ? '+2' : ''} Fragen ehrlich. Du kannst jederzeit überspringen — unbeantwortete Fragen werden nicht gewertet.</p>
            <div id="o-diag">
                ${all.map((q, i) => renderDiag(q, i)).join('')}
            </div>
            <div class="row" style="margin-top:16px">
                <button class="btn btn--ghost" id="o-skip" type="button">Test überspringen</button>
                <button class="btn btn--primary" id="o-grade" type="button">Test auswerten</button>
            </div>
            <div id="o-result" class="explainer" hidden></div>
        `;
    }
    function renderDiag(q, i) {
        const opts = (q.options || []).map((o, j) => `<label class="wizard__option diag-q__option"><input type="radio" name="dq${i}" value="${j}"> <span>${escapeHtml(o)}</span></label>`).join('');
        const tag = q.subject === 'math' ? 'MATH' :
                    q.subject === 'gr' ? 'GRAFIK' :
                    q.subject.toUpperCase();
        return `<div class="diag-q" data-i="${i}" data-sub="${q.subject}">
            <div class="diag-q__head"><span class="tag tag--${q.subject === 'math' ? 'math' : q.subject}">${tag}</span> <span class="muted">${escapeHtml(q.lessonTitle || q.topic)}</span></div>
            <div class="diag-q__prompt">${i + 1}. ${escapeHtml(q.prompt)}</div>
            <div class="wizard__options">${opts}</div>
        </div>`;
    }
    function step8(c, data) {
        return `
            <div class="card" style="text-align:center">
                <h2>Alles bereit.</h2>
                <p class="muted">Dein Lernplan wird jetzt aus deinen Angaben und dem Diagnose-Test berechnet. Du kannst alle Angaben später unter <a href="#/profil">Profil</a> ändern.</p>
                <div id="o-summary"></div>
                <div class="row" style="justify-content:center;margin-top:16px">
                    <a class="btn btn--ghost" href="#/plan">Lernplan ansehen</a>
                    <a class="btn btn--primary" href="#/dashboard">Zum Dashboard</a>
                </div>
            </div>
        `;
    }

    function renderStep(container, step, data) {
        const d = data || current();
        saveDraft(d);
        let body = '';
        switch (step) {
            case 0: body = step0(container, d); break;
            case 1: body = step1(container, d); break;
            case 2: body = step2(container, d); break;
            case 3: body = step3(container, d); break;
            case 4: body = step4(container, d); break;
            case 5: body = step5(container, d); break;
            case 6: body = step6(container, d); break;
            case 7: body = step7(container, d); break;
            case 8: body = step8(container, d); break;
        }
        const isFirst = step === 0;
        const isLast = step === STAGES.length - 1;
        // Pre-render flourishes (Motifs returns SVG elements, not strings)
        const flourishTL = window.Motifs ? window.Motifs.render('sparkle', { color: 'var(--butter)', size: 28 }) : null;
        const flourishBR = window.Motifs ? window.Motifs.render('flower', { color: 'var(--primary)', size: 36 }) : null;
        // The pony is loudest on the welcome step, smaller on the rest.
        const mascotHtml = isFirst
            ? `<div class="welcome-row" style="margin-bottom: var(--space-4)">
                   <div class="welcome-row__mascot">
                       <div class="mascot mascot--lg mascot--float" data-mascot-onboard="greeting" aria-hidden="true"></div>
                   </div>
                   <div class="welcome-row__copy">
                       <h1 class="welcome-row__greeting" style="font-size:2.4rem">Hallo, ich bin's!</h1>
                       <p class="muted" style="font-size:1.05rem; margin-top:4px">Lass uns gemeinsam deinen Lernplan bauen — versprochen, ich beiße nicht und du musst heute nichts auswendig lernen.</p>
                   </div>
               </div>`
            : `<div class="welcome-row" style="margin-bottom: var(--space-4); align-items: center">
                   <div class="welcome-row__mascot">
                       <div class="mascot mascot--md" data-mascot-onboard="${step === 7 ? 'exam' : 'greeting'}" aria-hidden="true"></div>
                   </div>
                   <div class="welcome-row__copy">
                       <h2 class="wizard__title" style="font-size:1.8rem; margin:0">${escapeHtml(STAGES[step].title)}</h2>
                       <p class="wizard__desc muted" style="margin:4px 0 0">${escapeHtml(STAGES[step].desc)}</p>
                   </div>
               </div>`;
        container.innerHTML = `
            ${progressBar(step)}
            <div class="wizard surface-with-flourish">
                <span class="flourish flourish--star flourish--tl" data-flourish="tl" aria-hidden="true"></span>
                <span class="flourish flourish--flower flourish--br" data-flourish="br" aria-hidden="true"></span>
                ${mascotHtml}
                <div class="wizard__body" data-step="${step}">${body}</div>
            </div>
            <div class="wizard__actions">
                <button class="btn btn--ghost" id="o-prev" type="button" ${step === 0 ? 'disabled' : ''}>Zurück</button>
                <button class="btn btn--primary" id="o-next" type="button">${isLast ? 'Abschließen' : 'Weiter'}</button>
            </div>
        `;
        // Hydrate the pony into the slot
        if (window.Mascot) {
            const heroSlot = container.querySelector('[data-mascot-onboard]');
            if (heroSlot) {
                const state = heroSlot.getAttribute('data-mascot-onboard') || 'greeting';
                // Welcome step used a 140px pony which dwarfed the heading on
                // mobile. 96px keeps the welcome character prominent while
                // letting the title breathe (matches .mascot--lg in styles.css).
                const size = isFirst ? 96 : 64;
                window.Mascot.set(heroSlot, state, { size });
            }
        }
        // Hydrate corner flourishes
        const flourishes = { tl: flourishTL, br: flourishBR };
        container.querySelectorAll('[data-flourish]').forEach(slot => {
            const node = flourishes[slot.getAttribute('data-flourish')];
            if (node && window.Motifs) slot.appendChild(node);
        });
        bindStep(container, step, d);
        if (step === 1) updateExamInfo(container, d);
    }
    function updateExamInfo(container, data) {
        if (!data.examDate) return;
        const days = Math.max(0, Math.round((new Date(data.examDate) - new Date()) / 86400000));
        const weeks = Math.floor(days / 7);
        const info = document.getElementById('o-exam-info');
        if (info) info.textContent = `Noch ${days} Tage (≈ ${weeks} Wochen) bis zur Prüfung.`;
    }
    function bindStep(container, step, data) {
        if (step === 0) {
            const maj = container.querySelector('#o-major');
            const hint = container.querySelector('#o-grafik-hint');
            function updateHint() {
                if (!hint || !maj) return;
                const v = maj.value || '';
                if (v.startsWith('BK-Grafik') || v.startsWith('BK-Gestalt')) {
                    hint.hidden = false;
                    hint.innerHTML = 'Schwerpunkt Grafikdesign erkannt. Wir passen Aufgaben mit Plakat-Analyse, Typografie und Portfolio-Bezug an. Diese Optionen erscheinen in Schritt 4 (Stärken/Schwächen).';
                } else {
                    hint.hidden = true;
                }
            }
            if (maj) maj.addEventListener('change', updateHint);
            updateHint();
        }
        if (step === 1) {
            const exam = container.querySelector('#o-exam');
            if (exam) exam.addEventListener('change', () => { data.examDate = exam.value; updateExamInfo(container, data); saveDraft(data); });
        }
        if (step === 3) {
            container.querySelectorAll('[data-chip]').forEach(btn => {
                btn.addEventListener('click', () => {
                    const id = btn.dataset.chip; const group = btn.dataset.group;
                    const arr = group === 's' ? (data.strengths = data.strengths || []) : (data.weakTopics = data.weakTopics || []);
                    const idx = arr.indexOf(id);
                    if (idx >= 0) { arr.splice(idx, 1); btn.classList.remove('is-selected'); btn.setAttribute('aria-pressed', 'false'); }
                    else { arr.push(id); btn.classList.add('is-selected'); btn.setAttribute('aria-pressed', 'true'); }
                    saveDraft(data);
                });
            });
        }
        if (step === 4) {
            container.querySelectorAll('[data-format]').forEach(btn => {
                btn.addEventListener('click', () => {
                    const id = btn.dataset.format;
                    data.formatPrefs = data.formatPrefs || [];
                    const idx = data.formatPrefs.indexOf(id);
                    if (idx >= 0) { data.formatPrefs.splice(idx, 1); btn.classList.remove('is-selected'); btn.setAttribute('aria-pressed', 'false'); }
                    else { data.formatPrefs.push(id); btn.classList.add('is-selected'); btn.setAttribute('aria-pressed', 'true'); }
                    saveDraft(data);
                });
            });
        }
        if (step === 5) {
            container.querySelectorAll('[data-day]').forEach(cb => {
                cb.addEventListener('change', () => {
                    data.availableDays = Array.from(container.querySelectorAll('[data-day]')).filter(x => x.checked).map(x => Number(x.dataset.day));
                    saveDraft(data);
                });
            });
        }
        if (step === 7) {
            const skip = container.querySelector('#o-skip');
            if (skip) skip.addEventListener('click', () => { stepForward(container, step, data, true); });
            const grade = container.querySelector('#o-grade');
            if (grade) grade.addEventListener('click', () => gradeDiag(container, data));
        }
        const prev = container.querySelector('#o-prev');
        if (prev) prev.addEventListener('click', () => stepBack(container, step, data));
        const next = container.querySelector('#o-next');
        if (next) next.addEventListener('click', () => stepForward(container, step, data, false));
    }
    function collectInputs(container, step, data) {
        if (step === 0) {
            data.school = (container.querySelector('#o-school') || {}).value || data.school;
            data.federalState = (container.querySelector('#o-state') || {}).value || data.federalState;
            data.major = (container.querySelector('#o-major') || {}).value || data.major;
        }
        if (step === 1) {
            data.examDate = (container.querySelector('#o-exam') || {}).value || data.examDate;
        }
        if (step === 2) {
            data.levelDE = (container.querySelector('#o-lv-de') || {}).value || data.levelDE || 'B1';
            data.levelEN = (container.querySelector('#o-lv-en') || {}).value || data.levelEN || 'B1';
            data.mathReadiness = (container.querySelector('#o-lv-math') || {}).value || data.mathReadiness || 'developing';
        }
        if (step === 5) {
            data.hoursPerWeek = Number((container.querySelector('#o-hours') || {}).value) || data.hoursPerWeek || 5;
            data.sessionLengthMin = Number((container.querySelector('#o-sess') || {}).value) || data.sessionLengthMin || 90;
            const d = (container.querySelector('#o-dde') || {}).value;
            const e = (container.querySelector('#o-den') || {}).value;
            const m = (container.querySelector('#o-dma') || {}).value;
            data.distribution = { de: Number(d) || 30, en: Number(e) || 30, math: Number(m) || 40 };
        }
        if (step === 6) {
            const g = container.querySelector('input[name="o-goal"]:checked');
            if (g) data.goal = g.value;
            const i = container.querySelector('input[name="o-intens"]:checked');
            if (i) data.intensity = i.value;
        }
    }
    function stepBack(container, step, data) {
        if (step === 0) return;
        collectInputs(container, step, data);
        saveDraft(data);
        renderStep(container, step - 1, data);
    }
    function stepForward(container, step, data, skipping) {
        collectInputs(container, step, data);
        saveDraft(data);
        if (step === STAGES.length - 1) { finish(container, data); return; }
        renderStep(container, step + 1, data);
        if (step + 1 === 7) { /* diagnostic just rendered */ }
    }
    function gradeDiag(container, data) {
        const diag = data._diag || pickDiag();
        const all = [...diag.de, ...diag.en, ...diag.math, ...(diag.gr || [])];
        let correct = 0, total = 0;
        const perSub = { de: { c: 0, t: 0 }, en: { c: 0, t: 0 }, math: { c: 0, t: 0 } };
        if (diag.gr) perSub.gr = { c: 0, t: 0 };
        for (let i = 0; i < all.length; i++) {
            const q = all[i];
            const sel = container.querySelector(`input[name="dq${i}"]:checked`);
            if (!sel) continue;
            total += 1;
            const choice = Number(sel.value);
            const ok = choice === q.answer;
            if (!perSub[q.subject]) perSub[q.subject] = { c: 0, t: 0 };
            perSub[q.subject].t += 1;
            if (ok) { perSub[q.subject].c += 1; correct += 1; }
            // Feed the learner model
            Store.update(state => {
                state.diagnosticRecorded = state.diagnosticRecorded || {};
                const key = q.subject + '/' + q.topic + '/' + q.prompt;
                if (!state.diagnosticRecorded[key]) {
                    Learner.record(state, { subject: q.subject, topic: q.topic, type: q.type, correct: ok, at: new Date().toISOString() });
                    state.diagnosticRecorded[key] = true;
                }
                return state;
            });
        }
        const result = container.querySelector('#o-result');
        if (result) {
            result.hidden = false;
            result.innerHTML = `
                <h3>Ergebnis</h3>
                <p><b>${correct}/${total}</b> richtig. Deine Fächer-Auswertung:</p>
                <ul class="list--compact">
                    <li>Deutsch: <b>${perSub.de.c}/${perSub.de.t}</b></li>
                    <li>Englisch: <b>${perSub.en.c}/${perSub.en.t}</b></li>
                    <li>Mathematik: <b>${perSub.math.c}/${perSub.math.t}</b></li>
                    ${perSub.gr ? `<li>Grafikdesign: <b>${perSub.gr.c}/${perSub.gr.t}</b></li>` : ''}
                </ul>
                <p class="muted">Diese Werte fließen direkt in die Auswahl der nächsten Aufgaben ein.</p>
            `;
        }
        ExerciseEngine.toast('Diagnose gespeichert. Klicke Weiter.', 'ok');
        // After grading, allow advancing to done.
        const next = container.querySelector('#o-next');
        if (next) { next.focus(); }
    }
    function finish(container, data) {
        data.onboardedAt = new Date().toISOString();
        delete data._diag;
        Store.update(state => { Object.assign(state.profile || (state.profile = {}), data); return state; });
        // Generate plan from new profile
        const s = Store.load();
        const plan = PlanTemplate.generate(s.profile);
        Store.update(state => { state.plan = plan; return state; });
        // Persist to server
        if (window.Auth) {
            Promise.resolve(window.Auth.saveProfile(s.profile)).catch(e => console.warn(e));
            Promise.resolve(window.Auth.saveLearner({ learner: s.learner, profile: s.profile })).catch(e => console.warn(e));
        }
        clearDraft();
        ExerciseEngine.toast('Onboarding abgeschlossen.', 'ok');
        renderStep(container, STAGES.length - 1, data);
        clearDraft();
        const finishButton = container.querySelector('#o-next');
        if (finishButton) { const button = finishButton.cloneNode(true); finishButton.replaceWith(button); button.textContent = 'Zum Lernplan'; button.onclick = () => Router.go('plan'); }
        // Auto-render the summary
        const sum = container.querySelector('#o-summary');
        if (sum) {
            sum.innerHTML = `
                <ul class="list--compact">
                    <li>Prüfung: <b>${escapeHtml(data.examDate || '—')}</b></li>
                    <li>Wochenstunden: <b>${data.hoursPerWeek || 5}</b>, Sitzungslänge: <b>${data.sessionLengthMin || 90} Min.</b></li>
                    <li>Niveau: DE <b>${data.levelDE || 'B1'}</b>, EN <b>${data.levelEN || 'B1'}</b>, MATH <b>${escapeHtml(data.mathReadiness || 'developing')}</b></li>
                    <li>Stärken: <b>${(data.strengths || []).length}</b>, Schwächen: <b>${(data.weakTopics || []).length}</b></li>
                    <li>Ziel: <b>${escapeHtml(data.goal || 'pass')}</b>, Intensität: <b>${escapeHtml(data.intensity || 'normal')}</b></li>
                </ul>
            `;
        }
    }

    async function render(container) {
        Router.renderBreadcrumbs([{ label: 'Dashboard', href: '#/dashboard' }, { label: 'Onboarding' }]);
        const d = current();
        renderStep(container, 0, d);
    }
    root.Pages = root.Pages || {};
    root.Pages.onboarding = render;
    root.Pages.onboarding.crumbs = () => [{ label: 'Dashboard', href: '#/dashboard' }, { label: 'Onboarding' }];
})(window);
