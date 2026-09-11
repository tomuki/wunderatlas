/* Fortschritt (progress) page.
   Vlada's version: a welcome row with the pony (in streak-state when
   she's been studying, greeting otherwise), sticker-shaped stat
   cards, subject progress cards, decorative flourishes.  The
   activity chart, topic list, and achievement grid stay
   scannable. */
(function (root) {
    async function render(container) {
        const s = Store.load();
        const stats = Object.assign({ totalAttempted: 0, totalCorrect: 0, streak: 0, perTopic: {}, perSubject: {} }, s.stats || {});
        if (!stats.perTopic) stats.perTopic = {};
        if (!stats.perSubject) stats.perSubject = {};
        const accuracy = stats.totalAttempted ? Math.round(100 * stats.totalCorrect / stats.totalAttempted) : 0;
        const topics = Object.entries(stats.perTopic).sort((a, b) => (b[1].attempted || 0) - (a[1].attempted || 0));
        const activity = (s.activity || []).slice(-30).map(a => ({
            value: Number(a.tasksDone) || 0,
            label: a.date || ''
        }));
        const totalTopics = (ContentDE.list.length + ContentEN.list.length + ContentMATH.list.length);
        const covered = topics.length;
        const readiness = Math.min(100, Math.round((accuracy * 0.6) + ((covered / totalTopics) * 100 * 0.4)));
        const streak = s.streak || 0;

        const fTL = window.Motifs ? window.Motifs.render('star', { color: 'var(--butter)', size: 30 }) : null;
        const fTR = window.Motifs ? window.Motifs.render('sparkle', { color: 'var(--mint)', size: 28 }) : null;

        container.innerHTML = `
            <div class="page-header surface-with-flourish">
                <div>
                    <h1>Fortschritt</h1>
                    <div class="page-header__meta">Übersicht über Lernaktivität, Genauigkeit pro Thema und geschätzte Prüfungsreife.</div>
                </div>
                <div class="welcome-row__mascot" data-mascot-fortschritt-corner aria-hidden="true"></div>
                <span class="flourish flourish--star flourish--tl" data-flourish="tl" aria-hidden="true"></span>
                <span class="flourish flourish--star flourish--tr" data-flourish="tr" aria-hidden="true"></span>
            </div>

            <div class="grid grid--stat">
                <div class="stat card--sticker">
                    <div class="stat__label">Bearbeitete Aufgaben</div>
                    <div class="stat__value">${stats.totalAttempted || 0}</div>
                </div>
                <div class="stat card--sticker card--right">
                    <div class="stat__label">Davon richtig</div>
                    <div class="stat__value stat__value--mint">${stats.totalCorrect || 0}</div>
                </div>
                <div class="stat card--sticker">
                    <div class="stat__label">Genauigkeit</div>
                    <div class="stat__value stat__value--berry">${accuracy}%</div>
                </div>
                <div class="stat card--sticker card--right">
                    <div class="stat__label">Streak</div>
                    <div class="stat__value stat__value--butter">${streak} Tage</div>
                </div>
            </div>

            <div class="grid grid--3" style="margin-top:24px">
                ${renderSubjectBlock('Deutsch', stats.perSubject && stats.perSubject.de, 'tag--de')}
                ${renderSubjectBlock('Englisch', stats.perSubject && stats.perSubject.en, 'tag--en')}
                ${renderSubjectBlock('Mathematik', stats.perSubject && stats.perSubject.math, 'tag--math')}
            </div>

            <div class="grid grid--2" style="margin-top:24px">
                <div class="card">
                    <div class="card__title">Aktivität (letzte ${activity.length || 30} Tage)</div>
                    ${activity.length === 0 ? '<p class="muted">Noch keine Aktivität. Beginne mit einer Lerneinheit.</p>' : `<div class="chart">${ExerciseEngine.svgChart(activity)}</div>`}
                </div>
                <div class="card card--sticker card--right">
                    <div class="card__title">Geschätzte Prüfungsreife</div>
                    <p>Berechnet aus Genauigkeit (60 %) und Themenabdeckung (40 %).</p>
                    <div class="row" style="align-items:center">
                        <div style="font-size:2.5rem; font-weight:600">${readiness}%</div>
                        <div style="flex:1">
                            <div class="progress" style="height:14px"><div class="progress__fill" style="width:${readiness}%"></div></div>
                            <p class="muted" style="margin-top:4px; font-size:0.85em">${covered} von ${totalTopics} Themen abgedeckt</p>
                        </div>
                    </div>
                </div>
            </div>

            <h2 style="margin-top:24px">Themen</h2>
            <div class="card">
                ${topics.length === 0 ? '<p class="muted">Noch keine Themen erfasst.</p>' : `
                    <ul class="list">
                        ${topics.map(([topic, t]) => {
                            const acc = t.attempted ? Math.round(100 * t.correct / t.attempted) : 0;
                            const stars = '★★★★★'.slice(0, Math.round(acc / 20)) + '☆☆☆☆☆'.slice(0, 5 - Math.round(acc / 20));
                            return `
                                <li class="list__item">
                                    <div style="flex:1">
                                        <div class="list__title">${escapeHtml(topic)}</div>
                                        <div class="muted" style="font-size:0.8em">${t.attempted || 0} Versuche · ${t.correct || 0} richtig</div>
                                        <div class="progress" style="margin-top:4px"><div class="progress__fill" style="width:${acc}%"></div></div>
                                    </div>
                                    <div class="muted" style="font-family:var(--font-mono); letter-spacing:2px">${stars}</div>
                                </li>
                            `;
                        }).join('')}
                    </ul>
                `}
            </div>

            <h2 style="margin-top:24px">Auszeichnungen</h2>
            <div class="card">
                <div class="grid grid--2">
                    ${computeAchievements(s).map(a => `
                        <div class="achievement ${a.locked ? 'achievement--locked' : ''}">
                            <div class="achievement__icon">${Icons.icon(a.icon)}</div>
                            <div>
                                <div class="achievement__title">${escapeHtml(a.title)}</div>
                                <div class="achievement__desc">${escapeHtml(a.desc)}</div>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;

        const ponySlot = container.querySelector('[data-mascot-fortschritt-corner]');
        if (ponySlot && window.Mascot) {
            // Streak state when she's been working steadily, otherwise greeting
            const state = streak >= 3 ? 'streak' : 'greeting';
            window.Mascot.set(ponySlot, state, { size: 80 });
        }
        const flourishMap = { tl: fTL, tr: fTR };
        container.querySelectorAll('[data-flourish]').forEach(slot => {
            const node = flourishMap[slot.getAttribute('data-flourish')];
            if (node) slot.appendChild(node);
        });
    }
    function renderSubjectBlock(label, ps, tone) {
        const attempted = ps ? (ps.attempted || 0) : 0;
        const correct = ps ? (ps.correct || 0) : 0;
        const acc = attempted ? Math.round(100 * correct / attempted) : 0;
        return `
            <div class="card card--sticker">
                <div class="card__title row">
                    <span style="flex:1">${label}</span>
                    <span class="tag ${tone}">${acc}%</span>
                </div>
                <p class="muted">${attempted} Versuche · ${correct} richtig</p>
                <div class="progress" style="margin-top:6px"><div class="progress__fill" style="width:${acc}%"></div></div>
            </div>
        `;
    }
    function computeAchievements(s) {
        const a = [];
        const tasks = (s.completed || []).length;
        a.push({ icon: 'zap', title: 'Erste Schritte', desc: 'Erste Aufgabe abgeschlossen', locked: tasks < 1 });
        a.push({ icon: 'flame', title: '3-Tage-Streak', desc: '3 Tage am Stück gelernt', locked: (s.stats?.streak || 0) < 3 });
        a.push({ icon: 'flame', title: '7-Tage-Streak', desc: '7 Tage am Stück gelernt', locked: (s.stats?.streak || 0) < 7 });
        a.push({ icon: 'book', title: 'Vielfältig', desc: 'In mindestens 5 Themen geübt', locked: Object.keys(s.stats?.perTopic || {}).length < 5 });
        a.push({ icon: 'target', title: 'Prüfungssimulation', desc: 'Eine Übungsklausur absolviert', locked: (s.examAttempts || []).length < 1 });
        a.push({ icon: 'math', title: 'Drei Fächer', desc: 'In DE, EN und Mathematik geübt', locked: !(s.stats?.perSubject?.de?.attempted > 0 && s.stats?.perSubject?.en?.attempted > 0 && s.stats?.perSubject?.math?.attempted > 0) });
        a.push({ icon: 'award', title: '90 % Genauigkeit', desc: 'Über alle Themen 90 % richtig', locked: ((s.stats?.totalAttempted ? (100 * (s.stats?.totalCorrect || 0) / s.stats.totalAttempted) : 0) < 90) });
        return a;
    }
    function escapeHtml(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c])); }
    root.Pages = root.Pages || {};
    root.Pages.fortschritt = render;
})(window);
