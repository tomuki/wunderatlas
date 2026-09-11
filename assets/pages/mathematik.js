/* Mathematik page: lesson list + lesson detail.
   Vlada's version: a tiny welcome row with the pony in the corner of
   the header, sticker-shaped lesson cards, decorative motifs.  The
   lesson body stays clean — formulas and the SequentialExercises
   runner are the focus, as the brand asks. */
(function (root) {
    async function render(container, params) {
        const s = Store.load();
        const lessons = ContentMATH.list;
        const ref = (params && params.ref) ? params.ref : null;
        if (ref) {
            const lesson = ContentMATH.byId[ref];
            if (lesson) return renderLesson(container, lesson, s);
        }
        renderList(container, lessons, s);
    }

    function renderList(container, lessons, s) {
        const completed = (s.completed || []).map(c => c.taskId);
        const dueTopics = (Review.dueToday(s.errors || [])).map(e => e.topic);
        const dueCount = (dueTopics || []).filter(t => t && lessons.some(l => t.includes(l.id))).length;
        const doneCount = lessons.filter(l => completed.includes('lesson:math:' + l.id)).length;

        const flourishTL = window.Motifs ? window.Motifs.render('star', { color: 'var(--math)', size: 30 }) : null;
        const flourishTR = window.Motifs ? window.Motifs.render('sparkle', { color: 'var(--butter)', size: 28 }) : null;
        const flourishBL = window.Motifs ? window.Motifs.render('heart', { color: 'var(--primary)', size: 24 }) : null;

        container.innerHTML = `
            <div class="page-header surface-with-flourish">
                <div>
                    <h1>Mathematik</h1>
                    <div class="page-header__meta">${lessons.length} Lektionen · Funktionen, Differential- und Integralrechnung, Vektoren, Matrizen, Trigonometrie, Stochastik</div>
                </div>
                <div class="welcome-row__mascot" data-mascot-math-corner aria-hidden="true"></div>
                <span class="flourish flourish--star flourish--tl" data-flourish="tl" aria-hidden="true"></span>
                <span class="flourish flourish--star flourish--tr" data-flourish="tr" aria-hidden="true"></span>
                <span class="flourish flourish--heart flourish--bl" data-flourish="bl" aria-hidden="true"></span>
            </div>

            <div class="grid grid--stat" style="margin-bottom:16px">
                <div class="stat card--sticker">
                    <div class="stat__label">Lektionen</div>
                    <div class="stat__value" style="color:var(--math)">${doneCount} / ${lessons.length}</div>
                </div>
                <div class="stat card--sticker card--right">
                    <div class="stat__label">Wiederholungen</div>
                    <div class="stat__value stat__value--butter">${dueCount}</div>
                </div>
            </div>

            <div class="grid grid--2">
                ${lessons.map(l => renderLessonCard(l, completed, dueTopics)).join('')}
            </div>
        `;

        const ponySlot = container.querySelector('[data-mascot-math-corner]');
        if (ponySlot && window.Mascot) {
            const state = dueCount > 0 ? 'rest' : 'greeting';
            window.Mascot.set(ponySlot, state, { size: 72 });
        }

        const flourishMap = { tl: flourishTL, tr: flourishTR, bl: flourishBL };
        container.querySelectorAll('[data-flourish]').forEach(slot => {
            const node = flourishMap[slot.getAttribute('data-flourish')];
            if (node) slot.appendChild(node);
        });
    }

    function renderLessonCard(l, completed, dueTopics) {
        const hasReview = (dueTopics || []).some(t => t && l.id && t.includes(l.id));
        const isDone = (completed || []).includes('lesson:math:' + l.id);
        const doneClass = isDone ? ' is-done' : '';
        return `
            <a class="card lesson card--sticker${doneClass}" href="#/mathematik/${l.id}">
                <div class="card__title row">
                    <span style="flex:1">${escapeHtml(l.title)}</span>
                    <span class="tag tag--math">Mathematik</span>
                </div>
                <p class="muted">${escapeHtml(l.summary || '')}</p>
                <div class="row" style="margin-top:8px">
                    <span class="muted" style="font-size:0.85em">${(l.sections || []).length} Abschnitte · ${(l.exercises || []).length} Übungen</span>
                    ${hasReview ? '<span class="tag" style="background:var(--warning-soft); color:var(--warning)">' + Icons.icon('alert') + ' Wiederholung fällig</span>' : ''}
                    ${isDone ? '<span class="tag tag--mint">' + Icons.icon('check') + ' erledigt</span>' : ''}
                </div>
            </a>
        `;
    }

    function renderLesson(container, lesson, s) {
        const completed = (s.completed || []).map(c => c.taskId);
        const isDone = (completed || []).includes('lesson:math:' + lesson.id);
        const sections = (lesson.sections || []).map(sec => `
            <section class="lesson__section">
                <h3>${escapeHtml(sec.h || sec.title || '')}</h3>
                <div>${sec.html || ''}</div>
                ${(sec.examples || []).length ? `<div class="example">${sec.examples.map(e => `<div>${escapeHtml(e)}</div>`).join('')}</div>` : ''}
            </section>
        `).join('');

        container.innerHTML = `
            <div class="page-header surface-with-flourish">
                <div>
                    <a class="muted" href="#/mathematik">← Zurück zur Übersicht</a>
                    <h1>${escapeHtml(lesson.title)}</h1>
                    <div class="page-header__meta">${escapeHtml(lesson.summary || '')}</div>
                </div>
                <div class="welcome-row__mascot" data-mascot-math-stamp aria-hidden="true"></div>
                <span class="flourish flourish--star flourish--tr" data-flourish="tr" aria-hidden="true"></span>
                <span class="flourish flourish--sparkle flourish--bl" data-flourish="bl" aria-hidden="true"></span>
            </div>
            <div class="lesson">${sections}</div>
            <div id="lesson-exercises" data-lesson-id="${escapeHtml(lesson.id)}"></div>
            <div class="row" style="margin-top:24px">
                <button class="btn btn--ghost" id="markComplete">${Icons.icon('check')} Lektion als erledigt markieren</button>
                <a class="btn btn--ghost" href="#/mathematik">${Icons.icon('book')} Übersicht</a>
            </div>
        `;

        const stampSlot = container.querySelector('[data-mascot-math-stamp]');
        if (stampSlot && window.Mascot) {
            window.Mascot.set(stampSlot, isDone ? 'streak' : 'greeting', { size: 72 });
        }

        const fTR = window.Motifs ? window.Motifs.render('sparkle', { color: 'var(--math)', size: 24 }) : null;
        const fBL = window.Motifs ? window.Motifs.render('heart', { color: 'var(--butter)', size: 22 }) : null;
        const flourishMap = { tr: fTR, bl: fBL };
        container.querySelectorAll('[data-flourish]').forEach(slot => {
            const node = flourishMap[slot.getAttribute('data-flourish')];
            if (node) slot.appendChild(node);
        });

        const exerciseMount = container.querySelector('#lesson-exercises');
        const exercises = (lesson.exercises || []).map(ex => Object.assign({ subject: 'math' }, ex));
        SequentialExercises.run({
            mount: exerciseMount,
            exercises,
            subject: 'math',
            topic: lesson.id,
            lessonId: lesson.id,
            adaptive: true,
            lang: 'de',
            heading: 'Übungen',
            backHref: '#/mathematik',
            onBackToList: () => { location.hash = '#/mathematik'; },
            onNextUnit: () => { location.hash = '#/plan'; }
        });
        container.querySelector('#markComplete').addEventListener('click', () => {
            Store.update(state => {
                const id = 'lesson:math:' + lesson.id;
                if (!state.completed.find(c => c.taskId === id)) {
                    state.completed.push({ taskId: id, subject: 'math', date: new Date().toISOString() });
                }
                return state;
            });
            ExerciseEngine.toast('Lektion als erledigt markiert', 'ok');
        });
    }
    function escapeHtml(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c])); }

    root.Pages = root.Pages || {};
    root.Pages.mathematik = render;
})(window);
