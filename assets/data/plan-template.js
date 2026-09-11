/* Plan generator: produces a study schedule from today → exam.
   Distributes hoursPerWeek across available days, cycles through 3 subjects
   (DE / EN / MATH), respects phase structure, ends with a mock-exam week. */
(function (root) {
    const DAY_LABELS = ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'];

    function startOfDay(d) { const x = new Date(d); x.setHours(0,0,0,0); return x; }
    function addDays(d, n) { const x = new Date(d); x.setDate(x.getDate() + n); return x; }
    function fmtDate(d) { return d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0'); }
    function isoWeek(d) {
        const t = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
        const day = t.getUTCDay() || 7;
        t.setUTCDate(t.getUTCDate() + 4 - day);
        const yearStart = new Date(Date.UTC(t.getUTCFullYear(), 0, 1));
        return Math.ceil((((t - yearStart) / 86400000) + 1) / 7);
    }
    // Monday = 0, Sunday = 6
    function weekStart(d) {
        const x = startOfDay(d);
        const day = (x.getDay() + 6) % 7;
        x.setDate(x.getDate() - day);
        return x;
    }

    // Return the indices (0..6) of days the user has selected as available.
    // Falls back to Mon–Sat if nothing is set.
    function availableDayIndices(profile) {
        const days = Array.isArray(profile.availableDays) && profile.availableDays.length > 0
            ? profile.availableDays.slice(0, 7)
            : [0, 1, 2, 3, 4, 5]; // Mon–Sat
        return days.filter(d => d >= 0 && d <= 6);
    }

    // Subject distribution in percent. Defaults: 30/30/40 (DE/EN/MATH).
    function distribution(profile) {
        const d = profile && profile.distribution;
        if (d && typeof d === 'object'
            && isFinite(d.de) && isFinite(d.en) && isFinite(d.math)
            && (d.de + d.en + d.math) > 0) {
            const sum = d.de + d.en + d.math;
            return { de: d.de / sum, en: d.en / sum, math: d.math / sum };
        }
        return { de: 0.30, en: 0.30, math: 0.40 };
    }

    // Build the weekly rotation order: distribute subjects across the whole
    // week's slots according to the distribution. Returns an array of length
    // `slotsPerWeek` (e.g. 10 for 5h/week with 5 days of 2 slots/day), cycling.
    function weeklyOrder(slotsPerWeek, dist) {
        const subs = ['de', 'en', 'math'];
        const targets = subs.map(s => Math.round(slotsPerWeek * dist[s]));
        let diff = slotsPerWeek - targets.reduce((a, b) => a + b, 0);
        let i = 0;
        while (diff !== 0 && i < 100) {
            const idx = i % subs.length;
            if (diff > 0 && targets[idx] < slotsPerWeek) { targets[idx]++; diff--; }
            else if (diff < 0 && targets[idx] > 0) { targets[idx]--; diff++; }
            i++;
        }
        const order = [];
        for (let k = 0; k < subs.length; k++) {
            for (let n = 0; n < targets[k]; n++) order.push(subs[k]);
        }
        return order;
    }

    // Returns subject for the given day-slot, using a global week-slot index
    // so that distribution is correct even when slotsPerDay < 3.
    function subjectFor(globalSlot, weeklySlots) {
        return weeklySlots[globalSlot % weeklySlots.length] || 'de';
    }

    function phaseFor(weekIndex, totalWeeks) {
        if (totalWeeks <= 0) return 'foundation';
        if (weekIndex < Math.max(1, Math.floor(totalWeeks * 0.4))) return 'foundation';
        if (weekIndex < Math.max(2, Math.floor(totalWeeks * 0.75))) return 'practice';
        return 'consolidation';
    }

    function weekGoalFor(weekIndex, totalWeeks) {
        if (weekIndex < totalWeeks * 0.2) {
            return { goal: 'Grundlagen schaffen', outcome: 'Operatoren, Textsorten-Basics und Kerngrammatik verstanden.' };
        }
        if (weekIndex < totalWeeks * 0.45) {
            return { goal: 'Inhalte vertiefen', outcome: 'Sachtextanalyse, Erörterung, Comment, Mediation, Ableitungsregeln sicher anwenden.' };
        }
        if (weekIndex < totalWeeks * 0.75) {
            return { goal: 'Üben unter Zeitdruck', outcome: 'Mini-Klausuren, Wiederholung schwacher Themen, Wortschatz und Mathe-Formeln aktivieren.' };
        }
        if (weekIndex < totalWeeks * 0.95) {
            return { goal: 'Prüfungssimulation', outcome: 'Komplette Übungsklausur DE/EN/MATH, Auswertung, Wiederholung.' };
        }
        return { goal: 'Letzte Wiederholung & Ruhe', outcome: 'Kurze Wiederholungen, Operatoren-Check, Schlaf und Selbstvertrauen.' };
    }

    // Per-subject, per-phase task catalogs. Each entry has title + ref (lesson/exam id).
    const DE_TASKS = {
        foundation: [
            { title: 'Operatoren wiederholen', type: 'lesson', ref: 'operatoren' },
            { title: 'Sachtextanalyse – Aufbau', type: 'lesson', ref: 'textanalyse_sachtext' },
            { title: 'Grammatik: Konjunktiv', type: 'lesson', ref: 'grammatik' },
            { title: 'Rechtschreibung: ss/ß', type: 'lesson', ref: 'rechtschreibung' }
        ],
        practice: [
            { title: 'Erörterung: Aufbau üben', type: 'lesson', ref: 'erorterung' },
            { title: 'Literarische Textanalyse', type: 'lesson', ref: 'textanalyse_literarisch' },
            { title: 'Materialgestütztes Schreiben', type: 'lesson', ref: 'materialgestuetztes_schreiben' },
            { title: 'Zusammenfassung üben', type: 'lesson', ref: 'zusammenfassung' }
        ],
        consolidation: [
            { title: 'Mini-Klausur DE (60 min)', type: 'timed-writing', ref: 'mini-exam:de-60' },
            { title: 'Schwache Themen wiederholen', type: 'review', ref: 'review:de' }
        ]
    };

    const EN_TASKS = {
        foundation: [
            { title: 'Operatoren (Englisch)', type: 'lesson', ref: 'operators' },
            { title: 'Reading Comprehension', type: 'lesson', ref: 'reading' },
            { title: 'Grammar: tenses', type: 'lesson', ref: 'grammar_tenses' },
            { title: 'Vocabulary: themed lists', type: 'lesson', ref: 'vocabulary_themes' }
        ],
        practice: [
            { title: 'Writing a Comment', type: 'lesson', ref: 'comment' },
            { title: 'Mediation', type: 'lesson', ref: 'mediation' },
            { title: 'Summary', type: 'lesson', ref: 'summary' },
            { title: 'Formal vs informal', type: 'lesson', ref: 'formal_informal' }
        ],
        consolidation: [
            { title: 'Mini-Klausur EN (60 min)', type: 'timed-writing', ref: 'mini-exam:en-60' },
            { title: 'Schwache Themen wiederholen', type: 'review', ref: 'review:en' }
        ]
    };

    const MATH_TASKS = {
        foundation: [
            { title: 'Funktionen – Grundlagen', type: 'lesson', ref: 'funktionen_grundlagen' },
            { title: 'Lineare Funktionen', type: 'lesson', ref: 'lineare_funktionen' },
            { title: 'Quadratische Funktionen', type: 'lesson', ref: 'quadratische_funktionen' },
            { title: 'Potenzen & Wurzeln', type: 'lesson', ref: 'potenzen_wurzeln' }
        ],
        practice: [
            { title: 'Ableitungsregeln', type: 'lesson', ref: 'ableitungsregeln' },
            { title: 'Kurvendiskussion', type: 'lesson', ref: 'kurvendiskussion' },
            { title: 'Vektoren & Geraden', type: 'lesson', ref: 'gerade_im_raum' },
            { title: 'Trigonometrie', type: 'lesson', ref: 'trigonometrie' }
        ],
        consolidation: [
            { title: 'Mini-Klausur MA (60 min)', type: 'timed-writing', ref: 'mini-exam:math-60' },
            { title: 'Schwache Themen wiederholen', type: 'review', ref: 'review:math' }
        ]
    };

    const TASK_CATALOGS = { de: DE_TASKS, en: EN_TASKS, math: MATH_TASKS };
    const SUBJECT_LABELS = { de: 'Deutsch', en: 'Englisch', math: 'Mathematik' };
    const SUBJECT_TONE = { de: 'tag--de', en: 'tag--en', math: 'tag--math' };

    function buildTask({ subject, weekIndex, slotIndex, isMockExamWeek, phase }) {
        const id = 'w' + weekIndex + '-s' + slotIndex + '-' + subject;
        if (isMockExamWeek) {
            return {
                id,
                subject,
                type: 'mock-exam',
                title: 'Übungsklausur ' + SUBJECT_LABELS[subject],
                durationMin: 240,
                ref: 'mini-exam:' + subject + '-final'
            };
        }
        const list = (TASK_CATALOGS[subject] && TASK_CATALOGS[subject][phase]) || TASK_CATALOGS[subject].foundation;
        const t = list[slotIndex % list.length];
        return {
            id,
            subject,
            type: t.type,
            title: t.title,
            durationMin: 30,
            ref: t.ref
        };
    }

    function generate(profile) {
        profile = profile || {};
        const today = startOfDay(new Date());
        const exam = startOfDay(new Date(profile.examDate || addDays(today, 90).toISOString()));
        const totalDays = Math.max(7, Math.round((exam - today) / 86400000));
        const totalWeeks = Math.max(1, Math.ceil(totalDays / 7));
        const hoursPerWeek = Math.max(1, profile.hoursPerWeek || 5);

        // Distribute minutes across the user's available days. If hoursPerWeek
        // is, say, 5 and the user has 5 available days, that is ~60 min/day.
        const avail = availableDayIndices(profile);
        const dist = distribution(profile);

        // 1 slot = ~30 min
        const minutesPerWeek = hoursPerWeek * 60;
        const slotsPerWeek = Math.max(2, Math.round(minutesPerWeek / 30));
        const slotsPerDay = Math.max(1, Math.round(slotsPerWeek / Math.max(1, avail.length)));

        // Build a stable day-pattern: only include days the user has selected.
        // The base day = Monday. We keep DAY_LABELS aligned with index.
        const dayPattern = [];
        for (let i = 0; i < 7; i++) {
            if (avail.includes(i)) {
                dayPattern.push({ day: i, slots: slotsPerDay });
            } else {
                dayPattern.push({ day: i, slots: 0 });
            }
        }

        // If total slots are too small/large, fine-tune by adding/subtracting from
        // the first available day to match slotsPerWeek.
        const patternTotal = dayPattern.reduce((a, b) => a + b.slots, 0);
        if (patternTotal !== slotsPerWeek && dayPattern.length > 0) {
            const firstAvail = dayPattern.find(d => d.slots > 0) || dayPattern[0];
            firstAvail.slots += (slotsPerWeek - patternTotal);
            if (firstAvail.slots < 1) firstAvail.slots = 1;
        }

        const weeklySlots = weeklyOrder(slotsPerWeek, dist);

        const weeks = [];
        for (let w = 0; w < totalWeeks; w++) {
            // Each week starts on Monday. We compute the start as the Monday of
            // the week containing (today + w*7). This guarantees Monday-based weeks.
            const weekAnchor = addDays(today, w * 7);
            const start = weekStart(weekAnchor);
            const phase = phaseFor(w, totalWeeks);
            const weekGoal = weekGoalFor(w, totalWeeks);
            const isMockExamWeek = (w === totalWeeks - 1);

            let globalSlot = 0;
            const days = dayPattern.map(dp => {
                const date = addDays(start, dp.day);
                const dateStr = fmtDate(date);
                if (dp.slots === 0) {
                    return {
                        date: dateStr,
                        weekday: DAY_LABELS[dp.day],
                        rest: true,
                        tasks: []
                    };
                }
                const tasks = [];
                for (let s = 0; s < dp.slots; s++) {
                    const subject = subjectFor(globalSlot, weeklySlots);
                    const task = buildTask({
                        subject,
                        weekIndex: w,
                        slotIndex: globalSlot,
                        isMockExamWeek,
                        phase
                    });
                    tasks.push(task);
                    globalSlot++;
                }
                return {
                    date: dateStr,
                    weekday: DAY_LABELS[dp.day],
                    rest: dp.slots === 0,
                    tasks
                };
            });

            weeks.push({
                weekIndex: w,
                weekNumber: isoWeek(start),
                start: fmtDate(start),
                phase,
                goal: weekGoal.goal,
                outcome: weekGoal.outcome,
                days
            });
        }

        return {
            generatedAt: new Date().toISOString(),
            totalWeeks,
            hoursPerWeek,
            profile: {
                examDate: profile.examDate,
                hoursPerWeek: profile.hoursPerWeek,
                availableDays: avail,
                distribution: dist,
                levelDE: profile.levelDE,
                levelEN: profile.levelEN,
                levelMATH: profile.levelMATH
            },
            weeks
        };
    }

    // Aggregate per-plan / per-week stats. completed is the array of
    // { taskId, date, ... } stored in state.completed.
    function planStats(plan, completed) {
        const done = new Set((completed || []).map(c => c.taskId || c));
        let totalTasks = 0, deTasks = 0, enTasks = 0, maTasks = 0;
        let completedCount = 0, deCompleted = 0, enCompleted = 0, maCompleted = 0;
        let totalMinutes = 0, completedMinutes = 0;
        for (const w of plan.weeks) {
            for (const d of w.days) {
                for (const t of d.tasks) {
                    totalTasks++;
                    if (t.subject === 'de') deTasks++;
                    else if (t.subject === 'en') enTasks++;
                    else if (t.subject === 'math') maTasks++;
                    const dur = t.durationMin || 30;
                    totalMinutes += dur;
                    if (done.has(t.id)) {
                        completedCount++;
                        if (t.subject === 'de') deCompleted++;
                        else if (t.subject === 'en') enCompleted++;
                        else if (t.subject === 'math') maCompleted++;
                        completedMinutes += dur;
                    }
                }
            }
        }
        return {
            totalTasks,
            completed: completedCount,
            remaining: totalTasks - completedCount,
            deTasks,
            deCompleted,
            enTasks,
            enCompleted,
            maTasks,
            maCompleted,
            totalMinutes,
            completedMinutes,
            remainingMinutes: totalMinutes - completedMinutes
        };
    }

    // Find next planned task (first not-yet-completed, today or future).
    function nextTask(plan, completedTaskIds) {
        if (!plan) return null;
        const today = Store.todayISO();
        const done = new Set(completedTaskIds || []);
        for (const w of plan.weeks) {
            for (const d of w.days) {
                if (d.rest) continue;
                if (d.date < today) continue;
                for (const t of d.tasks) {
                    if (done.has(t.id)) continue;
                    return { task: t, date: d.date, weekday: d.weekday };
                }
            }
        }
        return null;
    }

    // Roll over incomplete past tasks into today's day.
    // Returns a NEW plan (does not mutate the input).
    function rollOver(plan) {
        if (!plan) return plan;
        const today = Store.todayISO();
        // Deep clone so we never mutate the source plan in state.
        const newPlan = JSON.parse(JSON.stringify(plan));
        const todayWeek = newPlan.weeks.find(w => w.days.some(d => d.date === today));
        if (!todayWeek) return newPlan;
        const todayDay = todayWeek.days.find(d => d.date === today);
        if (!todayDay) return newPlan;
        for (const w of newPlan.weeks) {
            for (const d of w.days) {
                if (d.date < today) {
                    for (const t of d.tasks) {
                        if (!t.done && !t.completed) {
                            todayDay.tasks.push({ ...t, rolledOver: true });
                            t.moved = true;
                        }
                    }
                }
            }
        }
        return newPlan;
    }

    // Verify that the final week can hold the 240-min mock exam, given the
    // user's available days and slots. Returns { ok, availableMin, requiredMin, dayCount }.
    function mockExamFits(plan) {
        if (!plan || !plan.weeks || plan.weeks.length === 0) return { ok: false };
        const lastWeek = plan.weeks[plan.weeks.length - 1];
        let availableMin = 0;
        let dayCount = 0;
        for (const d of lastWeek.days) {
            if (d.rest) continue;
            const dayMin = (d.tasks || []).reduce((a, t) => a + (t.durationMin || 30), 0);
            availableMin += Math.max(0, dayMin);
            dayCount++;
        }
        return { ok: dayCount > 0, availableMin, requiredMin: 240, dayCount };
    }

    root.PlanTemplate = {
        generate, planStats, nextTask, rollOver,
        weekStart, isoWeek, mockExamFits, availableDayIndices, distribution,
        DAY_LABELS, SUBJECT_LABELS, SUBJECT_TONE
    };
})(window);
