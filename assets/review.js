/* Spaced repetition scheduler.
   Used by the Fehlerjournal to schedule when a mistake should be reviewed again.
   Intervals: 1d → 3d → 7d → 14d → 30d, with light randomization. */
(function (root) {
    const INTERVALS = [1, 3, 7, 14, 30]; // days

    function nextInterval(repeats) {
        const idx = Math.min(repeats, INTERVALS.length - 1);
        const base = INTERVALS[idx];
        // small jitter ±10% so reviews don't all stack on the same day
        const jitter = Math.round(base * 0.1 * (Math.random() * 2 - 1));
        return Math.max(1, base + jitter);
    }

    function scheduleNextReview(entry, correct) {
        const now = new Date();
        const next = new Date(now);
        if (correct) {
            next.setDate(next.getDate() + nextInterval(entry.repeats || 0));
            entry.repeats = (entry.repeats || 0) + 1;
            entry.status = 'review-later';
        } else {
            // re-queue to tomorrow
            next.setDate(next.getDate() + 1);
            entry.repeats = Math.max(0, (entry.repeats || 1) - 1);
            entry.status = 'review-today';
        }
        entry.lastReviewed = now.toISOString();
        entry.nextReview = next.toISOString().slice(0, 10);
        return entry;
    }

    function dueToday(entries) {
        const today = Store.todayISO();
        return entries.filter(e => !e.nextReview || e.nextReview <= today);
    }

    function upcomingCounts(entries) {
        const today = Store.todayISO();
        let todayCount = 0, weekCount = 0;
        const inAWeek = new Date();
        inAWeek.setDate(inAWeek.getDate() + 7);
        for (const e of entries) {
            if (!e.nextReview) { todayCount++; continue; }
            if (e.nextReview <= today) todayCount++;
            if (e.nextReview <= inAWeek.toISOString().slice(0, 10)) weekCount++;
        }
        return { today: todayCount, week: weekCount };
    }

    root.Review = { scheduleNextReview, dueToday, upcomingCounts, INTERVALS };
})(window);
