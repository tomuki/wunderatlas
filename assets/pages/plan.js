/* Plan page: the signature learning surface.
   The candy step row is the centerpiece. The 16 keys light up to "today"
   with a soft chase, tapping a key marks the lesson done. The pony stamp
   lives in the corner as a quiet witness. Below, the week timeline
   scrolls as a horizontal ribbon — not a uniform card grid. */
(function (root) {
    async function render(container) {
        const s = Store.load();
        const plan = s.plan;
        if (!plan || !plan.weeks || plan.weeks.length === 0) {
            container.innerHTML = `
                <div class="page-header">
                    <div>
                        <h1>Dein Lernplan</h1>
                        <div class="page-header__meta">Persönlicher Wochenplan bis zur Prüfung am ${formatDateDE(s.profile.examDate)}.</div>
                    </div>
                    <button class="btn btn--primary" id="gen">${Icons.icon('refresh')} Lernplan generieren</button>
                </div>
                <div class="empty">
                    <div class="empty__icon">${Icons.icon('plan')}</div>
                    <div class="empty__title">Noch kein Lernplan</div>
                    <p>Erzeuge deinen persönlichen Plan auf Basis deines Profils (${s.profile.hoursPerWeek || 5} h/Woche, Stufen DE ${s.profile.levelDE || 'B2'} / EN ${s.profile.levelEN || 'B1'} / MA ${s.profile.levelMATH || 'B1'}).</p>
                    <button class="btn btn--primary" id="gen2">${Icons.icon('play')} Jetzt generieren</button>
                </div>
            `;
            container.querySelector('#gen').addEventListener('click', generate);
            container.querySelector('#gen2').addEventListener('click', generate);
            return;
        }

        const stats = PlanTemplate.planStats(plan, s.completed || []);
        const fit = PlanTemplate.mockExamFits(plan);
        const next16 = collectNext16(plan);
        const todayKey = todayIndex(plan);
        const lastDoneKey = lastDoneIndex(plan);
        const nextKey = nextUndoneIndex(plan);
        const journey = computeJourney(plan, s.completed || []);

        container.innerHTML = `
            <div class="page-header">
                <div class="page-header__title-row">
                    <h1>Dein Lernplan</h1>
                    <div class="page-header__meta">${plan.weeks.length} Wochen bis zur Prüfung · ${stats.totalTasks} Aufgaben · ${(stats.totalMinutes/60).toFixed(1)} h gesamt</div>
                </div>
                <div class="row">
                    <button class="btn btn--ghost" id="regen">${Icons.icon('refresh')} Neu generieren</button>
                    <button class="btn btn--ghost" id="export">${Icons.icon('download')} Export</button>
                </div>
            </div>

            <section class="journey-bar" aria-label="Reise zur Prüfung">
                <div class="journey-bar__rail" aria-hidden="true">
                    <div class="journey-bar__fill" style="width:${journey.percent}%"></div>
                </div>
                <div class="journey-bar__milestones">
                    <div class="journey-bar__milestone is-done">
                        <span class="dot"></span><span>Start</span>
                    </div>
                    ${journey.weeks.map((w, i) => `
                        <div class="journey-bar__milestone ${w.state}">
                            <span class="dot"></span>
                            <span class="muted">W${i + 1}</span>
                        </div>
                    `).join('')}
                    <div class="journey-bar__milestone ${journey.percent >= 100 ? 'is-done' : ''}">
                        <span class="dot dot--butter"></span><span>Prüfung</span>
                    </div>
                </div>
                <div class="journey-bar__count">
                    <span class="stat__value stat__value--mint" style="font-size:1.6rem">${stats.completed}</span>
                    <span class="muted">von ${stats.totalTasks} erledigt</span>
                </div>
            </section>

            <section class="step-card card" aria-label="Die nächsten 16 Einheiten">
                <div class="mascot mascot--corner mascot--md" data-mascot-stamp aria-hidden="true"></div>
                <div class="step-card__head">
                    <div>
                        <div class="step-card__eyebrow">Das Lernmuster</div>
                        <h2 class="step-card__title">Deine nächsten 16 Einheiten</h2>
                        <p class="step-card__subtitle">Tippe eine Kachel, um sie als erledigt zu markieren. Heute leuchtet Kachel ${todayKey >= 0 && todayKey < 16 ? (todayKey + 1) : '—'}.</p>
                    </div>
                    <div class="step-card__legend">
                        <span><span class="dot dot--de"></span>DE</span>
                        <span><span class="dot dot--en"></span>EN</span>
                        <span><span class="dot dot--math"></span>MA</span>
                        <span><span class="dot dot--butter"></span>Pause</span>
                    </div>
                </div>
                <div class="step-row" id="step-row" role="list">
                    ${next16.map((entry, i) => renderStepKey(entry, i, todayKey, s, lastDoneKey, nextKey)).join('')}
                </div>
                <div class="step-card__footnote">
                    <span>${nextKey >= 0 ? `Nächste offene Kachel: <strong>${nextKey + 1}</strong>.` : 'Alle 16 erledigt — super!'}</span>
                    <span class="muted">${stats.completed} / ${stats.totalTasks} insgesamt.</span>
                </div>
            </section>

            <section class="plan-stats" aria-label="Übersicht nach Fach">
                <div class="plan-stat plan-stat--de">
                    <div class="plan-stat__label">Deutsch</div>
                    <div class="plan-stat__value">${stats.deCompleted}<span class="plan-stat__of"> / ${stats.deTasks}</span></div>
                    <div class="progress progress--thin"><div class="progress__fill" style="width:${stats.deTasks ? (100*stats.deCompleted/stats.deTasks).toFixed(0) : 0}%; background: var(--de)"></div></div>
                </div>
                <div class="plan-stat plan-stat--en">
                    <div class="plan-stat__label">Englisch</div>
                    <div class="plan-stat__value">${stats.enCompleted}<span class="plan-stat__of"> / ${stats.enTasks}</span></div>
                    <div class="progress progress--thin"><div class="progress__fill" style="width:${stats.enTasks ? (100*stats.enCompleted/stats.enTasks).toFixed(0) : 0}%; background: var(--en)"></div></div>
                </div>
                <div class="plan-stat plan-stat--math">
                    <div class="plan-stat__label">Mathematik</div>
                    <div class="plan-stat__value">${stats.maCompleted}<span class="plan-stat__of"> / ${stats.maTasks}</span></div>
                    <div class="progress progress--thin"><div class="progress__fill" style="width:${stats.maTasks ? (100*stats.maCompleted/stats.maTasks).toFixed(0) : 0}%; background: var(--math)"></div></div>
                </div>
                <div class="plan-stat plan-stat--butter">
                    <div class="plan-stat__label">Gesamtdauer</div>
                    <div class="plan-stat__value">${(stats.totalMinutes/60).toFixed(1)}<span class="plan-stat__of"> h</span></div>
                    <div class="muted plan-stat__hint">${fit.ok ? 'Prüfungssimulation passt' : 'Mehr Zeit einplanen'}</div>
                </div>
            </section>

            ${fit.ok
                ? ''
                : '<p class="muted plan-fit-warn">${Icons.icon("alert")} Hinweis: Die 240-min-Prüfungssimulation passt nicht vollständig in die letzte Woche. Erhöhe die Stunden pro Woche oder die Anzahl der Lerntage.</p>'
            }

            <section class="week-rail" aria-label="Wochen-Timeline">
                <div class="week-rail__head">
                    <div class="card__title" style="margin:0">${Icons.icon('calendar')} Wochen im Überblick</div>
                    <span class="muted">${plan.weeks.length} Wochen bis zur Prüfung</span>
                </div>
                <div class="week-rail__scroller">
                    ${plan.weeks.map((w, i) => renderWeekRail(w, i, s, todayKey)).join('')}
                </div>
            </section>

            <section class="week-list" aria-label="Wochen im Detail">
                ${plan.weeks.map((w, i) => renderWeek(w, i, s)).join('')}
            </section>
        `;

        // Place the mascot into the step row's corner stamp slot
        const stampEl = container.querySelector('[data-mascot-stamp]');
        if (stampEl && window.Mascot) {
            window.Mascot.set(stampEl, 'streak', { size: 48 });
        }

        container.querySelector('#regen').addEventListener('click', generate);
        container.querySelector('#export').addEventListener('click', () => {
            const data = JSON.stringify(plan, null, 2);
            const blob = new Blob([data], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'lernplan.json';
            a.click();
            URL.revokeObjectURL(url);
            ExerciseEngine.toast('Lernplan exportiert', 'ok');
        });

        // Step row: tap a key to mark its task done
        container.querySelectorAll('.step-key').forEach(el => {
            el.addEventListener('click', () => {
                const taskId = el.getAttribute('data-task-id');
                if (!taskId) return;
                const t = findTask(plan, taskId);
                if (!t) return;
                if (el.classList.contains('is-done')) {
                    ExerciseEngine.toast('Schon erledigt — gut gemacht!', 'ok');
                    return;
                }
                markDone(taskId);
            });
        });

        // Bind every "Starten" button to navigate to its lesson / review / exam.
        container.querySelectorAll('[data-start]').forEach(btn => {
            btn.addEventListener('click', () => {
                const id = btn.dataset.start;
                const t = findTask(plan, id);
                if (t) startTask(t);
            });
        });
    }

    // ---- journey / progress rail ----
    function computeJourney(plan, completed) {
        const done = new Set(completed.map(c => c.taskId));
        let total = 0; let doneCount = 0;
        const weeks = plan.weeks.map(w => {
            let wTotal = 0; let wDone = 0;
            for (const d of (w.days || [])) {
                for (const t of (d.tasks || [])) {
                    wTotal++; total++;
                    if (done.has(t.id)) { wDone++; doneCount++; }
                }
            }
            return { total: wTotal, done: wDone, state: wDone === 0 ? '' : (wDone === wTotal ? 'is-done' : 'is-partial') };
        });
        const percent = total ? Math.round(100 * doneCount / total) : 0;
        return { percent, weeks };
    }

    function collectNext16(plan) {
        const done = new Set(((Store.load()).completed || []).map(c => c.taskId));
        const out = [];
        if (!plan || !plan.weeks) { for (let i = 0; i < 16; i++) out.push({ kind: 'empty' }); return out; }
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
    function lastDoneIndex(plan) {
        if (!plan) return -1;
        const done = new Set(((Store.load()).completed || []).map(c => c.taskId));
        let i = 0; let lastDone = -1;
        for (const w of plan.weeks) {
            for (const d of (w.days || [])) {
                if (d.rest) continue;
                for (const t of (d.tasks || [])) {
                    if (done.has(t.id)) lastDone = i;
                    i++;
                    if (i > 16) return lastDone;
                }
            }
        }
        return lastDone;
    }
    function nextUndoneIndex(plan) {
        if (!plan) return -1;
        const done = new Set(((Store.load()).completed || []).map(c => c.taskId));
        let i = 0;
        for (const w of plan.weeks) {
            for (const d of (w.days || [])) {
                if (d.rest) continue;
                for (const t of (d.tasks || [])) {
                    if (!done.has(t.id)) return i;
                    i++;
                    if (i >= 16) return -1;
                }
            }
        }
        return -1;
    }

    function renderStepKey(entry, i, todayKey, s, lastDone, nextKey) {
        if (!entry || entry.kind === 'empty') {
            return `<div class="step-key is-rest" aria-hidden="true">·</div>`;
        }
        if (entry.kind === 'rest') {
            return `<div class="step-key is-rest" title="Pausentag ${formatDateDE(entry.date)}" aria-label="Pausentag ${formatDateDE(entry.date)}">${entry.weekday || '·'}</div>`;
        }
        const t = entry.task;
        const isDone = entry.done;
        const colorIdx = subjectColorIdx(t.subject);
        const subjectLabel = subjectShort(t.subject);
        const todayClass = i === todayKey ? ' is-today' : '';
        const doneClass = isDone ? ' is-done' : '';
        const nextClass = !isDone && i === nextKey ? ' is-next' : '';
        const lastClass = isDone && i === lastDone ? ' is-last-done' : '';
        return `<button type="button"
                    class="step-key${todayClass}${doneClass}${nextClass}${lastClass}"
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

    function findTask(plan, id) {
        if (!plan || !plan.weeks) return null;
        for (const w of plan.weeks) {
            for (const d of (w.days || [])) {
                for (const t of (d.tasks || [])) {
                    if (t.id === id) return t;
                }
            }
        }
        return null;
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
        Router.go('plan');
    }

    function startTask(task) {
        if (!task) return;
        if (task.type === 'review') { location.hash = '#/fehler'; return; }
        if (task.type === 'mini-exam' || task.type === 'mock-exam') {
            const subj = task.subject || 'de';
            location.hash = '#/pruefung/' + subj;
            return;
        }
        if (task.subject === 'de') location.hash = '#/deutsch/' + (task.ref || 'operatoren');
        else if (task.subject === 'en') location.hash = '#/englisch/' + (task.ref || 'operators');
        else if (task.subject === 'math') location.hash = '#/mathematik/' + (task.ref || 'funktionen_grundlagen');
        else location.hash = '#/dashboard';
    }

    // Horizontal week rail — each week is a small bookmark.
    function renderWeekRail(week, idx, s, todayKey) {
        const stats = PlanTemplate.planStats({ weeks: [week] }, s.completed || []);
        const phase = week.phase || 'foundation';
        const phaseClass = phase === 'foundation' ? 'is-foundation' : (phase === 'practice' ? 'is-practice' : 'is-consolidation');
        const phaseLabel = phase === 'foundation' ? 'Grundlagen' : (phase === 'practice' ? 'Übung' : 'Konsolidierung');
        const todayDate = new Date().toISOString().slice(0, 10);
        const isCurrent = (week.days || []).some(d => d.date === todayDate);
        const allDone = stats.completed === stats.totalTasks && stats.totalTasks > 0;
        const statusClass = allDone ? 'is-done' : (isCurrent ? 'is-current' : '');
        return `
            <div class="rail-week ${phaseClass} ${statusClass}">
                <div class="rail-week__num">W${idx + 1}</div>
                <div class="rail-week__date">${formatDateDE(week.days[0].date)}</div>
                <div class="rail-week__phase">${phaseLabel}</div>
                <div class="rail-week__bar"><div class="rail-week__bar-fill" style="width:${stats.totalTasks ? (100*stats.completed/stats.totalTasks).toFixed(0) : 0}%"></div></div>
                <div class="rail-week__count">${stats.completed}/${stats.totalTasks}</div>
            </div>
        `;
    }

    function renderWeek(week, idx, s) {
        const stats = PlanTemplate.planStats({ weeks: [week] }, s.completed || []);
        const phase = week.phase || 'foundation';
        const phaseTag = phase === 'foundation'
            ? '<span class="tag" style="background:var(--primary-soft); color:var(--primary)">Grundlagen</span>'
            : phase === 'practice'
                ? '<span class="tag tag--butter">Übung</span>'
                : '<span class="tag tag--mint">Konsolidierung</span>';
        return `
            <details class="week" ${idx === 0 ? 'open' : ''}>
                <summary>
                    <div>
                        <strong>Woche ${idx + 1}</strong> – ${formatDateDE(week.days[0].date)} bis ${formatDateDE(week.days[week.days.length-1].date)}
                        <div class="muted" style="font-size:0.85em; margin-top:2px">${escapeHtml(week.goal)}</div>
                    </div>
                    <div class="row">${phaseTag} <span class="muted">${stats.completed}/${stats.totalTasks} · ${(stats.totalMinutes/60).toFixed(1)} h</span></div>
                </summary>
                <div class="week__days">
                    ${week.days.map(d => renderDay(d, s)).join('')}
                </div>
            </details>
        `;
    }
    function renderDay(day, s) {
        const done = new Set((s.completed || []).map(c => c.taskId));
        const tasks = day.tasks.map(t => {
            const isDone = done.has(t.id);
            const isReview = t.type === 'review';
            const isExam = t.type === 'mini-exam' || t.type === 'mock-exam';
            const tone = isReview ? 'tag--butter' : (PlanTemplate.SUBJECT_TONE[t.subject] || '');
            const label = isReview ? 'Wiederholung' : (isExam ? 'Klausur' : (PlanTemplate.SUBJECT_LABELS[t.subject] || t.subject));
            return `
                <div class="day__task ${isDone ? 'is-done' : ''}">
                    <div class="day__task-main">
                        <span class="tag ${tone}">${label}</span>
                        <div style="flex:1">${escapeHtml(t.title)}</div>
                        <div class="muted" style="font-size:0.8em">${t.durationMin} min</div>
                    </div>
                    <div class="row">
                        ${isDone
                            ? `<span class="tag tag--mint">${Icons.icon('check')} erledigt</span>`
                            : `<button class="btn btn--sm btn--primary" data-start="${t.id}">${Icons.icon('play')} Starten</button>`
                        }
                    </div>
                </div>
            `;
        }).join('');
        return `
            <div class="day">
                <div class="day__header">
                    <div><strong>${escapeHtml(day.weekday)}</strong> <span class="muted">${formatDateDE(day.date)}</span></div>
                </div>
                <div class="day__tasks">${tasks || '<div class="muted" style="padding:6px">Keine Aufgabe geplant (Pausentag).</div>'}</div>
            </div>
        `;
    }
    function generate() {
        const s = Store.load();
        const plan = PlanTemplate.generate(s.profile);
        Store.update(state => { state.plan = plan; return state; });
        ExerciseEngine.toast('Lernplan generiert', 'ok');
        Router.go('plan');
    }
    function formatDateDE(iso) {
        if (!iso) return '';
        const d = new Date(iso);
        return d.toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit', year: 'numeric' });
    }
    function escapeHtml(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c])); }
    function escapeAttr(s) { return escapeHtml(s); }

    root.Pages = root.Pages || {};
    root.Pages.plan = render;
})(window);
