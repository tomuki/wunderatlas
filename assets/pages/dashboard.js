/* Dashboard page — the hero surface.
   Vlada opens the app: the pony greets her, the next lesson is the loudest
   thing, the next 16 lessons form the candy step row, and the corner holds
   a quiet subject progress strip. A clear hierarchy, a single primary action,
   calm decorative composition. */
(function (root) {
    async function render(container) {
        const s = Store.load();
        const today = Store.todayISO();
        const examDate = s.profile.examDate;
        const daysLeft = Math.max(0, Store.daysBetween(today, examDate));
        const completedIds = (s.completed || []).map(c => c.taskId);
        const next = PlanTemplate.nextTask(s.plan, completedIds);
        const stats = s.stats || { totalAttempted: 0, totalCorrect: 0, streak: 0, perTopic: {}, perSubject: {} };
        const accuracy = stats.totalAttempted ? Math.round(100 * stats.totalCorrect / stats.totalAttempted) : 0;
        const deStats = subjectStats(stats, 'de');
        const enStats = subjectStats(stats, 'en');
        const maStats = subjectStats(stats, 'math');
        const due = Review.dueToday(s.errors || []);
        const achievements = computeAchievements(s);
        const name = (s.profile && s.profile.name) || 'Vlada';
        const greeting = greet();

        const subjectTone = (sub) => sub === 'de' ? 'tag--de' : (sub === 'en' ? 'tag--en' : 'tag--math');
        const subjectLabel = (sub) => sub === 'de' ? 'Deutsch' : (sub === 'en' ? 'Englisch' : 'Mathematik');

        // The 16-step next-row, the same signature as the Lernplan page
        // so the dashboard previews the journey. Tap a step to mark it done.
        const next16 = collectNext16(s.plan);
        const todayKey = todayIndex(s.plan);

        // Pre-render flourishes
        const flourishTL = window.Motifs ? window.Motifs.render('sparkle', { color: 'var(--butter)', size: 28 }) : null;
        const flourishTR = window.Motifs ? window.Motifs.render('flower', { color: 'var(--primary)', size: 36 }) : null;

        container.innerHTML = `
            <section class="hero surface-with-flourish" aria-label="Tagesüberblick">
                <span class="flourish flourish--star flourish--tl" data-flourish="tl" aria-hidden="true"></span>
                <span class="flourish flourish--flower flourish--tr" data-flourish="tr" aria-hidden="true"></span>

                <div class="hero__left">
                    <div class="welcome-row__mascot" aria-hidden="true">
                        <div class="mascot mascot--xl mascot--float" data-mascot-hero="greeting"></div>
                    </div>
                </div>

                <div class="hero__copy">
                    <div class="hero__eyebrow">${greeting}, ${escapeHtml(name)}</div>
                    <h1 class="hero__title">${daysLeft > 0
                        ? `noch ${daysLeft} Tage bis zur Prüfung`
                        : `heute ist Prüfungstag — du schaffst das!`}</h1>
                    <div class="hero__meta">
                        <span class="stamp stamp--butter">${Icons.icon('calendar')} Prüfung: ${formatDateDE(examDate)}</span>
                        <span class="muted">${next
                            ? `Nächste Einheit: <strong>${escapeHtml(subjectLabel(next.task.subject))}</strong> · ${formatDateDE(next.date)}`
                            : `Du hast alles im Plan erledigt — gönn dir eine Tasse Tee.`}</span>
                    </div>
                    <div class="hero__actions">
                        ${next
                            ? `<button class="btn btn--primary btn--lg" data-start-task="${escapeAttr(next.task.id)}">${Icons.icon('play')} Jetzt loslegen</button>
                               <button class="btn btn--ghost" type="button" id="regen">${Icons.icon('refresh')} Plan neu schnitzen</button>`
                            : `<a class="btn btn--primary btn--lg" href="#/pruefung">${Icons.icon('target')} Prüfungssimulation</a>`}
                    </div>
                </div>
            </section>

            <section class="next-card card has-corner-mascot" aria-label="Nächste Lerneinheit">
                <div class="mascot mascot--corner mascot--sm" data-mascot-stamp="exam" aria-hidden="true"></div>
                <div class="next-card__head">
                    <div>
                        <div class="next-card__eyebrow">Deine nächste Lerneinheit</div>
                        <h2 class="next-card__title">${next ? escapeHtml(next.task.title) : 'Alles erledigt'}</h2>
                    </div>
                    ${next ? `<span class="tag ${subjectTone(next.task.subject)}">${subjectLabel(next.task.subject)}</span>` : ''}
                </div>

                ${next ? `
                    <div class="next-card__meta">
                        <span>${Icons.icon('clock')} ca. ${next.task.durationMin || 30} min</span>
                        <span>${Icons.icon('calendar')} ${formatDateDE(next.date)} · ${escapeHtml(next.weekday)}</span>
                    </div>
                    <div class="explainer" id="whyBlock">${buildWhyBlock(s, next.task, subjectLabel)}</div>
                    <div class="next-card__actions">
                        <button class="btn btn--primary" data-start-task="${escapeAttr(next.task.id)}">${Icons.icon('play')} Starten</button>
                        <button class="btn btn--mint" id="personalTask" type="button">${Icons.icon('sparkles')} Persönliche Aufgabe</button>
                        <a class="btn btn--ghost" href="#/plan">${Icons.icon('calendar')} Lernplan ansehen</a>
                    </div>
                    <div class="next-card__tweaks">
                        <span class="muted next-card__tweaks-label">Stattdessen:</span>
                        <button class="chip" data-action="similar" type="button">Ähnliche Aufgabe</button>
                        <button class="chip" data-action="easier" type="button">Leichter</button>
                        <button class="chip" data-action="harder" type="button">Schwerer</button>
                        <button class="chip" data-action="other-type" type="button">Anderer Aufgabentyp</button>
                        <button class="chip" data-action="from-error" type="button">Aus meinem Fehler</button>
                    </div>
                    <div id="personalMount"></div>
                ` : `
                    <p class="muted">Alle geplanten Aufgaben erledigt. Generiere einen neuen Plan oder übe im Bereich „Prüfung".</p>
                    <div class="row" style="margin-top:12px">
                        <a class="btn btn--primary" href="#/pruefung">${Icons.icon('target')} Prüfungssimulation</a>
                        <button class="btn btn--ghost" id="regen2" type="button">${Icons.icon('refresh')} Neuen Plan generieren</button>
                    </div>
                `}
            </section>

            <section class="step-strip card" aria-label="Deine nächsten 16 Einheiten">
                <div class="step-strip__head">
                    <div>
                        <div class="step-strip__eyebrow">Dein Lernplan</div>
                        <h2 class="step-strip__title">Die nächsten 16 Einheiten</h2>
                    </div>
                    <a class="step-strip__link" href="#/plan">${Icons.icon('arrow')} Lernplan ansehen</a>
                </div>
                <div class="step-row step-row--compact" id="step-row-dashboard" role="list">
                    ${next16.map((entry, i) => renderStepKey(entry, i, todayKey, s)).join('')}
                </div>
                <div class="step-strip__legend">
                    <span><span class="dot dot--de"></span>DE</span>
                    <span><span class="dot dot--en"></span>EN</span>
                    <span><span class="dot dot--math"></span>MA</span>
                    <span><span class="dot dot--butter"></span>Pause</span>
                    <span class="muted step-strip__count">${stats.streak || 0}-Tage-Streak · ${(s.completed || []).length} erledigt</span>
                </div>
            </section>

            <section class="progress-strip" aria-label="Fortschritt nach Fach">
                ${renderSubjectProgress(deStats, enStats, maStats)}
            </section>

            <section class="grid grid--2 utility-row">
                <div class="card">
                    <div class="card__title">${Icons.icon('refresh')} Heute fällig</div>
                    ${due.length === 0
                        ? '<p class="muted">Aktuell keine Wiederholungen fällig — gut gemacht.</p>'
                        : `<ul class="list">
                            ${due.slice(0, 4).map(e => `
                                <li class="list__item">
                                    <span class="tag ${subjectTone(e.subject)}">${subjectLabel(e.subject)}</span>
                                    <span class="list__title">${escapeHtml(e.topic)}</span>
                                    <span class="list__spacer"></span>
                                    <a class="btn btn--sm btn--ghost" href="#/fehler">${Icons.icon('arrow')} öffnen</a>
                                </li>
                            `).join('')}
                        </ul>`}
                </div>
                <div class="card">
                    <div class="card__title">${Icons.icon('star')} Auszeichnungen</div>
                    <div class="ach-row">
                        ${achievements.map(a => `
                            <div class="ach ${a.locked ? 'ach--locked' : ''}" title="${escapeAttr(a.desc)}">
                                <span class="ach__icon">${Icons.icon(a.icon)}</span>
                                <span class="ach__title">${escapeHtml(a.title)}</span>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </section>
        `;

        // Hydrate mascots
        const heroSlot = container.querySelector('[data-mascot-hero]');
        if (heroSlot && window.Mascot) {
            const state = (s.stats && s.stats.streak >= 3) ? 'streak' : 'greeting';
            window.Mascot.set(heroSlot, state, { size: 120 });
        }
        const stampSlot = container.querySelector('[data-mascot-stamp]');
        if (stampSlot && window.Mascot) {
            window.Mascot.set(stampSlot, 'exam', { size: 36 });
        }

        // Hydrate corner flourishes
        const flourishMap = { tl: flourishTL, tr: flourishTR };
        container.querySelectorAll('[data-flourish]').forEach(slot => {
            const node = flourishMap[slot.getAttribute('data-flourish')];
            if (node && window.Motifs) slot.appendChild(node);
        });

        // Bind events
        const regen = container.querySelector('#regen') || container.querySelector('#regen2');
        if (regen) regen.addEventListener('click', regeneratePlan);
        container.querySelectorAll('[data-start-task]').forEach(b => {
            b.addEventListener('click', () => {
                const id = b.dataset.startTask;
                const t = findTask(s.plan, id);
                if (t) startTask(t);
            });
        });
        const personal = container.querySelector('#personalTask');
        if (personal) personal.addEventListener('click', () => generatePersonalTask(next && next.task, 'personal'));
        container.querySelectorAll('[data-action]').forEach(btn => {
            btn.addEventListener('click', () => generatePersonalTask(next && next.task, btn.dataset.action));
        });

        // Step row: tap to mark done
        container.querySelectorAll('#step-row-dashboard .step-key').forEach(el => {
            el.addEventListener('click', () => {
                const taskId = el.getAttribute('data-task-id');
                if (!taskId) return;
                if (el.classList.contains('is-done')) {
                    ExerciseEngine.toast('Schon erledigt — gut gemacht!', 'ok');
                    return;
                }
                markDone(taskId);
            });
        });
    }

    // -- progress strip (subject pills, with mini progress) --
    function renderSubjectProgress(de, en, ma) {
        const items = [
            { id: 'de', label: 'Deutsch', value: de.percent, color: 'var(--de)' },
            { id: 'en', label: 'Englisch', value: en.percent, color: 'var(--en)' },
            { id: 'math', label: 'Mathematik', value: ma.percent, color: 'var(--math)' }
        ];
        return `
            <div class="progress-strip__head">
                <div class="card__title" style="margin:0">${Icons.icon('bar')} Fortschritt nach Fach</div>
                <a class="step-strip__link" href="#/fortschritt">${Icons.icon('arrow')} Details</a>
            </div>
            <div class="progress-strip__grid">
                ${items.map(it => `
                    <div class="prog-pill" data-prog="${it.id}">
                        <div class="prog-pill__head">
                            <span class="prog-pill__label">${it.label}</span>
                            <span class="prog-pill__value" style="color:${it.color}">${it.value}%</span>
                        </div>
                        <div class="progress progress--thin"><div class="progress__fill" style="width:${it.value}%; background:${it.color}"></div></div>
                    </div>
                `).join('')}
            </div>
        `;
    }

    // -- 16-step helpers (mirror plan.js, kept inline so the dashboard is self-contained) --
    function collectNext16(plan) {
        const done = new Set(((Store.load()).completed || []).map(c => c.taskId));
        const out = [];
        if (!plan || !plan.weeks) {
            for (let i = 0; i < 16; i++) out.push({ kind: 'empty' });
            return out;
        }
        for (const w of plan.weeks) {
            for (const d of (w.days || [])) {
                if (d.rest) {
                    out.push({ kind: 'rest', weekday: d.weekday, date: d.date, id: null });
                } else {
                    for (const t of (d.tasks || [])) {
                        out.push({ kind: 'task', task: t, done: done.has(t.id) });
                    }
                }
                if (out.length >= 16) return out.slice(0, 16);
            }
        }
        while (out.length < 16) out.push({ kind: 'empty' });
        return out.slice(0, 16);
    }
    function todayIndex(plan) {
        if (!plan) return -1;
        const today = new Date().toISOString().slice(0, 10);
        let i = 0;
        for (const w of plan.weeks) {
            for (const d of (w.days || [])) {
                if (d.date === today) return i;
                if (!d.rest) i += (d.tasks || []).length;
                if (i >= 16) return -1;
            }
        }
        return -1;
    }
    function renderStepKey(entry, i, todayKey, s) {
        if (!entry || entry.kind === 'empty') {
            return `<div class="step-key is-rest" aria-hidden="true">·</div>`;
        }
        if (entry.kind === 'rest') {
            return `<div class="step-key is-rest" title="Pausentag ${formatDateDE(entry.date)}">${entry.weekday || '·'}</div>`;
        }
        const t = entry.task;
        const isDone = entry.done;
        const colorIdx = subjectColorIdx(t.subject);
        const subjectLabel = subjectShort(t.subject);
        const todayClass = i === todayKey ? ' is-today' : '';
        const doneClass = isDone ? ' is-done' : '';
        return `<button type="button"
                    class="step-key${todayClass}${doneClass}"
                    data-color="${colorIdx}"
                    data-task-id="${escapeAttr(t.id)}"
                    title="${escapeAttr(t.title)} · ${t.durationMin} min"
                    aria-label="${escapeAttr(t.title)}, ${t.durationMin} Minuten${isDone ? ', erledigt' : ''}">
                    <span>${subjectLabel}</span>
                    <span style="font-size:0.6em; opacity:0.7">${t.durationMin}m</span>
                </button>`;
    }
    function subjectColorIdx(subj) {
        if (subj === 'de') return 0;
        if (subj === 'en') return 1;
        if (subj === 'math') return 2;
        return 3;
    }
    function subjectShort(subj) {
        if (subj === 'de') return 'DE';
        if (subj === 'en') return 'EN';
        if (subj === 'math') return 'MA';
        return '·';
    }

    // -- shared helpers --
    function greet() {
        const h = new Date().getHours();
        if (h < 11) return 'Guten Morgen';
        if (h < 17) return 'Hallo';
        return 'Guten Abend';
    }
    function escapeHtml(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c])); }
    function escapeAttr(s) { return escapeHtml(s); }
    function formatDateDE(iso) {
        if (!iso) return '';
        const d = new Date(iso);
        return d.toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit', year: 'numeric' });
    }
    function findTask(plan, id) {
        if (!plan || !plan.weeks) return null;
        for (const w of plan.weeks) for (const d of w.days) for (const t of d.tasks) if (t.id === id) return t;
        return null;
    }
    function startTask(task) {
        if (!task) return;
        if (task.type === 'mini-exam' || task.type === 'mock-exam') {
            location.hash = '#/pruefung?subject=' + task.subject;
            return;
        }
        if (task.type === 'review') {
            location.hash = '#/fehler';
            return;
        }
        if (task.subject === 'de') location.hash = '#/deutsch/' + (task.ref || 'operatoren');
        else if (task.subject === 'en') location.hash = '#/englisch/' + (task.ref || 'operators');
        else if (task.subject === 'math') location.hash = '#/mathematik/' + (task.ref || 'funktionen_grundlagen');
        else location.hash = '#/dashboard';
    }
    function regeneratePlan() {
        const s = Store.load();
        const completedCount = (s.completed || []).length;
        const stats = s.stats || { totalAttempted: 0 };
        const msg = (completedCount > 0 || stats.totalAttempted > 0)
            ? 'Du hast bereits ' + completedCount + ' Aufgabe(n) erledigt. Beim Neu-Generieren bleibt dein Lernstand erhalten, aber der Plan wird neu geschnitten (alle offenen Aufgaben verschieben sich auf neue Tage). Bereits erledigte Aufgaben zählen weiterhin als erledigt. Fortfahren?'
            : 'Lernplan jetzt auf Basis deines Profils neu erstellen?';
        if (!window.confirm(msg)) return;
        const plan = PlanTemplate.generate(s.profile);
        Store.update(state => { state.plan = plan; return state; });
        ExerciseEngine.toast('Lernplan neu generiert — dein Lernstand bleibt erhalten.', 'ok');
        Router.go('dashboard');
    }
    function subjectStats(stats, subject) {
        const ps = stats.perSubject && stats.perSubject[subject];
        if (ps && ps.attempted > 0) {
            return { percent: Math.round(100 * (ps.correct || 0) / ps.attempted), count: Object.keys(ps.perTopic || {}).length };
        }
        return { percent: 0, count: 0 };
    }
    function computeAchievements(s) {
        const a = [];
        const tasks = (s.completed || []).length;
        a.push({ icon: 'zap', title: 'Erste Schritte', desc: 'Erste Aufgabe abgeschlossen', locked: tasks < 1 });
        a.push({ icon: 'flame', title: '7-Tage-Streak', desc: '7 Tage am Stück gelernt', locked: (s.stats?.streak || 0) < 7 });
        a.push({ icon: 'book', title: '10 Themen', desc: 'In 10 verschiedenen Themen geübt', locked: Object.keys(s.stats?.perTopic || {}).length < 10 });
        a.push({ icon: 'target', title: 'Erste Mini-Klausur', desc: 'Eine Übungsklausur gestartet', locked: (s.examAttempts || []).length < 1 });
        a.push({ icon: 'math', title: 'Mathe-Start', desc: 'Erste Mathematik-Übung gemacht', locked: !(s.stats?.perSubject?.math?.attempted > 0) });
        return a;
    }
    function buildWhyBlock(state, task, subjectLabel) {
        const sub = task.subject;
        const topic = task.ref || task.title || 'Grundlagen';
        const lr = state.learner || {};
        const bucket = (lr.byKey || {})[sub + '/' + topic];
        const reasons = [];
        const hints = [];
        if (bucket) {
            if (bucket.mastery < 0.5) reasons.push(`Dein aktueller Wissensstand in <b>${escapeHtml(subjectLabel(sub))} / ${escapeHtml(topic)}</b> liegt bei <b>${Math.round(bucket.mastery * 100)}%</b>.`);
            else if (bucket.mastery < 0.8) reasons.push(`Du bist in <b>${escapeHtml(subjectLabel(sub))} / ${escapeHtml(topic)}</b> schon bei <b>${Math.round(bucket.mastery * 100)}%</b> — eine Übung festigt das.`);
            else reasons.push(`In <b>${escapeHtml(subjectLabel(sub))} / ${escapeHtml(topic)}</b> erreichst du bereits <b>${Math.round(bucket.mastery * 100)}%</b>.`);
            if (bucket.attempts > 0) hints.push(`${bucket.attempts} Versuche · ${Math.round((bucket.accuracy || 0) * 100)}% richtig`);
            if (bucket.nextReview) hints.push(`nächste Wiederholung: ${formatDateDE(bucket.nextReview)}`);
        } else {
            reasons.push(`Du hast in <b>${escapeHtml(subjectLabel(sub))} / ${escapeHtml(topic)}</b> noch keine Daten — die Aufgabe hilft, dein Profil zu schärfen.`);
        }
        const weak = (state.errors || []).filter(e => e.subject === sub && (e.topic === topic || !e.topic)).slice(0, 3);
        if (weak.length) hints.push(`${weak.length} ähnliche(r) Fehler im Journal`);
        const today = Store.todayISO();
        const dueCount = ((Object.values(lr.byKey || {}))).filter(b => b.nextReview && b.nextReview <= today).length;
        if (dueCount > 0) hints.push(`${dueCount} Wiederholung${dueCount === 1 ? '' : 'en'} heute fällig`);
        const subjectDist = (state.profile && state.profile.distribution) || { de: 30, en: 30, math: 40 };
        const target = subjectDist[sub] || 30;
        const curShare = computeSubjectShare(state, sub);
        if (curShare < target - 5) hints.push(`du liegst ${Math.round(target - curShare)}% unter deinem Wochenziel ${target}%`);
        return `
            <h4>${Icons.icon('lightbulb')} Warum diese Aufgabe?</h4>
            <p>${reasons.join(' ')}</p>
            <p class="muted" style="margin:0">${hints.join(' · ')}</p>
        `;
    }
    function computeSubjectShare(state, subject) {
        const minutesBySub = { de: 0, en: 0, math: 0 };
        for (const c of (state.completed || [])) {
            const t = c.taskId && findTask(state.plan, c.taskId);
            if (t) minutesBySub[t.subject] = (minutesBySub[t.subject] || 0) + (t.durationMin || 30);
        }
        const total = (minutesBySub.de || 0) + (minutesBySub.en || 0) + (minutesBySub.math || 0);
        if (!total) return 33;
        return 100 * (minutesBySub[subject] || 0) / total;
    }
    async function generatePersonalTask(task, action) {
        const mount = document.getElementById('personalMount');
        if (!mount) return;
        if (!window.AI) {
            mount.innerHTML = '<p class="form-error">KI-Modul nicht verfügbar.</p>';
            return;
        }
        mount.innerHTML = '<div class="empty"><div class="spinner"></div><div class="muted">Aufgabe wird erstellt …</div></div>';
        const s = Store.load();
        const subj = (task && task.subject) || 'de';
        const topic = (task && task.ref) || 'operatoren';
        const bucket = (s.learner && s.learner.byKey) ? s.learner.byKey[subj + '/' + topic] : null;
        const suggested = window.Learner ? window.Learner.suggestedDifficulty(bucket) : 2;
        const opts = {
            subject: subj, topic, type: (task && task.type) || 'mc',
            difficulty: (suggested - 1) / 4, difficultyLevel: suggested,
            learnerHint: bucket || null, mode: action || 'personal'
        };
        if (action === 'easier') {
            opts.difficultyLevel = Math.max(1, suggested - 1);
            opts.difficulty = (opts.difficultyLevel - 1) / 4;
        } else if (action === 'harder') {
            opts.difficultyLevel = Math.min(5, suggested + 1);
            opts.difficulty = (opts.difficultyLevel - 1) / 4;
        }
        if (action === 'other-type') {
            const types = ['mc', 'fill', 'match', 'sort', 'flashcard', 'cloze', 'math-input'];
            const avoided = (bucket && bucket.avoidedExerciseTypes) || [];
            const candidates = types.filter(t => !avoided.includes(t));
            const pool = candidates.length ? candidates : types;
            opts.type = pool[(pool.indexOf(opts.type) + 1) % pool.length];
        }
        if (action === 'from-error') {
            const err = (s.errors || []).find(e => e.subject === opts.subject);
            if (err) {
                opts.topic = err.topic || opts.topic;
                opts.fromError = { question: err.question, correct: err.correct, wrong: err.wrong };
            }
        }
        try {
            const r = await window.AI.generateTask(opts);
            const meta = r.ai ? '<span class="tag tag--ai">KI-generiert</span>' : '<span class="tag tag--local">lokal</span>';
            const lvlLabel = '<span class="tag">Stufe ' + opts.difficultyLevel + '/5</span>';
            mount.innerHTML = `
                <div class="card" style="margin-top:12px">
                    <div class="card__title row"><span>${escapeHtml(r.title || 'Persönliche Aufgabe')}</span> ${meta} ${lvlLabel}</div>
                    <p>${escapeHtml(r.prompt || '')}</p>
                    <div id="personalEngine"></div>
                </div>
            `;
            ExerciseEngine.renderOne('#personalEngine', r, { subject: opts.subject, topic: opts.topic });
        } catch (e) {
            mount.innerHTML = '<p class="form-error">Konnte keine Aufgabe erstellen: ' + escapeHtml(e.message) + '</p>';
        }
    }
    function markDone(taskId) {
        Store.update(state => {
            state.completed = state.completed || [];
            const exists = state.completed.some(c => c.taskId === taskId);
            if (!exists) {
                state.completed.push({ taskId, completedAt: new Date().toISOString() });
                if (window.Review) { try { window.Review.onTaskCompleted(state, taskId); } catch (e) { /* noop */ } }
            }
            const today = new Date().toISOString().slice(0, 10);
            if (state.lastStudyDate !== today) {
                const last = state.lastStudyDate;
                const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
                if (last === yesterday) state.streak = (state.streak || 0) + 1;
                else state.streak = 1;
                state.lastStudyDate = today;
            }
            return state;
        });
        ExerciseEngine.toast('Erledigt — weiter so!', 'ok');
        Router.go('dashboard');
    }

    root.Pages = root.Pages || {};
    root.Pages.dashboard = render;
    root.Pages.dashboard.crumbs = () => [{ label: 'Dashboard' }];
})(window);
