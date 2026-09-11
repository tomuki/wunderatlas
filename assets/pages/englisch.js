/* Englisch page: lesson list + lesson detail.
   Vlada's version: a tiny welcome row with the pony in the corner of
   the header, sticker-shaped lesson cards, decorative motifs.  The
   lesson content itself stays clean so the English texts and
   SequentialExercises runner are the focus, as the brand asks. */
(function (root) {
    async function render(container, params) {
        const s = Store.load();
        const lessons = ContentEN.list;
        const ref = (params && params.ref) ? params.ref : null;
        if (ref) {
            const lesson = ContentEN.byId[ref];
            if (lesson) return renderLesson(container, lesson, s);
        }
        renderList(container, lessons, s);
    }

    function renderList(container, lessons, s) {
        const completed = (s.completed || []).map(c => c.taskId);
        const dueTopics = (Review.dueToday(s.errors || [])).map(e => e.topic);
        const dueCount = (dueTopics || []).filter(t => t && lessons.some(l => t.includes(l.id))).length;
        const doneCount = lessons.filter(l => completed.includes('lesson:en:' + l.id)).length;

        const flourishTL = window.Motifs ? window.Motifs.render('flower', { color: 'var(--en)', size: 32 }) : null;
        const flourishTR = window.Motifs ? window.Motifs.render('sparkle', { color: 'var(--butter)', size: 28 }) : null;
        const flourishBL = window.Motifs ? window.Motifs.render('heart', { color: 'var(--primary)', size: 24 }) : null;

        container.innerHTML = `
            <div class="page-header surface-with-flourish">
                <div>
                    <h1>Englisch</h1>
                    <div class="page-header__meta">${lessons.length} Lektionen · Reading, Writing (Comment, Mediation, Summary), Grammar, Vocabulary, Übungsklausur</div>
                </div>
                <div class="welcome-row__mascot" data-mascot-en-corner aria-hidden="true"></div>
                <span class="flourish flourish--flower flourish--tl" data-flourish="tl" aria-hidden="true"></span>
                <span class="flourish flourish--star flourish--tr" data-flourish="tr" aria-hidden="true"></span>
                <span class="flourish flourish--heart flourish--bl" data-flourish="bl" aria-hidden="true"></span>
            </div>

            <div class="grid grid--stat" style="margin-bottom:16px">
                <div class="stat card--sticker">
                    <div class="stat__label">Lektionen</div>
                    <div class="stat__value stat__value--mint">${doneCount} / ${lessons.length}</div>
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

        const ponySlot = container.querySelector('[data-mascot-en-corner]');
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
        const isDone = (completed || []).includes('lesson:en:' + l.id);
        const doneClass = isDone ? ' is-done' : '';
        return `
            <a class="card lesson card--sticker${doneClass}" href="#/englisch/${l.id}">
                <div class="card__title row">
                    <span style="flex:1">${escapeHtml(l.title)}</span>
                    <span class="tag tag--en">${escapeHtml(l.type || 'Thema')}</span>
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
        const isDone = (completed || []).includes('lesson:en:' + lesson.id);
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
                    <a class="muted" href="#/englisch">← Back to overview</a>
                    <h1>${escapeHtml(lesson.title)}</h1>
                    <div class="page-header__meta">${escapeHtml(lesson.summary || '')}</div>
                </div>
                <div class="welcome-row__mascot" data-mascot-en-stamp aria-hidden="true"></div>
                <span class="flourish flourish--star flourish--tr" data-flourish="tr" aria-hidden="true"></span>
                <span class="flourish flourish--sparkle flourish--bl" data-flourish="bl" aria-hidden="true"></span>
            </div>
            <div class="lesson">${sections}</div>
            <div id="lesson-exercises" data-lesson-id="${escapeHtml(lesson.id)}"></div>
            <div class="row" style="margin-top:24px">
                <button class="btn btn--ghost" id="markComplete">${Icons.icon('check')} Mark lesson as complete</button>
                <a class="btn btn--ghost" href="#/englisch">${Icons.icon('book')} Übersicht</a>
            </div>
        `;

        const stampSlot = container.querySelector('[data-mascot-en-stamp]');
        if (stampSlot && window.Mascot) {
            window.Mascot.set(stampSlot, isDone ? 'streak' : 'greeting', { size: 72 });
        }

        const fTR = window.Motifs ? window.Motifs.render('sparkle', { color: 'var(--en)', size: 24 }) : null;
        const fBL = window.Motifs ? window.Motifs.render('heart', { color: 'var(--butter)', size: 22 }) : null;
        const flourishMap = { tr: fTR, bl: fBL };
        container.querySelectorAll('[data-flourish]').forEach(slot => {
            const node = flourishMap[slot.getAttribute('data-flourish')];
            if (node) slot.appendChild(node);
        });

        // The lesson content (English text) is shown as-is, but the chrome
        // around it is in German — same as the rest of the app.  The
        // SequentialExercises runner gets `lang: 'en'` so the exercise
        // UI itself is in English.
        const exerciseMount = container.querySelector('#lesson-exercises');
        const exercises = (lesson.exercises || []).map(ex => Object.assign({ subject: 'en' }, ex));
        SequentialExercises.run({
            mount: exerciseMount,
            exercises,
            subject: 'en',
            topic: lesson.id,
            lessonId: lesson.id,
            adaptive: true,
            lang: 'en',
            heading: 'Exercises',
            backHref: '#/englisch',
            onBackToList: () => { location.hash = '#/englisch'; },
            onNextUnit: () => { location.hash = '#/plan'; }
        });
        container.querySelector('#markComplete').addEventListener('click', () => {
            Store.update(state => {
                const id = 'lesson:en:' + lesson.id;
                if (!state.completed.find(c => c.taskId === id)) {
                    state.completed.push({ taskId: id, subject: 'en', date: new Date().toISOString() });
                }
                return state;
            });
            ExerciseEngine.toast('Lesson marked as complete', 'ok');
        });
    }
    function escapeHtml(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c])); }
    root.Pages = root.Pages || {};
    root.Pages.englisch = render;
})(window);
