/* AI client. Only used when the user explicitly clicks a "KI"-button.
   Talks to the local proxy at /api/ai which keeps the API key server-side.
   The client NEVER receives the API key. When the server has no key, it
   returns a deterministic local task (clearly tagged), not a fake AI
   response. */
(function (root) {
    async function call(path, body) {
        const r = await fetch(path, {
            method: 'POST',
            credentials: 'same-origin',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body || {})
        });
        const text = await r.text();
        let data = null;
        try { data = JSON.parse(text); } catch (e) { data = { error: text }; }
        if (!r.ok) {
            const msg = (data && (data.error || data.message)) || ('HTTP ' + r.status);
            throw new Error(msg);
        }
        return data;
    }

    async function feedbackFreeText({ prompt, answer, language }) {
        try {
            const out = await call('/api/ai', {
                action: 'feedback',
                prompt: prompt,
                answer: answer,
                language: language || 'de'
            });
            // Neue strukturierte Form: { feedback: {summary, criteria, staerken, ...}, source }
            if (out && out.feedback) {
                return { feedback: out.feedback, source: out.source || 'lokal' };
            }
            // Fallback: alte Textform
            if (out && typeof out.text === 'string') {
                return { feedback: null, source: 'text', text: out.text };
            }
            return { feedback: null, source: 'leer', error: 'Server lieferte kein Feedback.' };
        } catch (e) {
            return {
                feedback: null,
                source: 'fehler',
                error: 'KI-Feedback nicht verfügbar. ' + e.message +
                    ' Hinweis: Der lokale AI-Server (server.js) ist optional. ' +
                    'Lege GEMINI_API_KEY in .env an und starte den Server mit ' +
                    '"node --env-file=.env server.js", um Gemini-Feedback zu aktivieren. ' +
                    'Ohne Schlüssel funktionieren alle anderen Übungen weiterhin normal. Siehe README.'
            };
        }
    }

    async function generateTask(opts) {
        // opts: { subject, topic, type, difficulty, mode, learnerHint, fromError }
        try {
            const out = await call('/api/ai', { action: 'generate-task', ...opts });
            // Server already validates schema, but we attach a default id
            // and ensure the shape renders cleanly.
            if (!out.task) throw new Error('Server lieferte keine Aufgabe.');
            out.task.id = out.task.id || ('ai-' + Date.now());
            return out.task;
        } catch (e) {
            // Fallback: produce a deterministic local MC task from the
            // lesson bank, clearly marked. Never pretend this is AI.
            const fallback = localFallback(opts);
            fallback.ai = false;
            fallback.local = true;
            return fallback;
        }
    }

    function localFallback(opts) {
        const sub = (opts && opts.subject) || 'de';
        const topic = (opts && opts.topic) || 'operatoren';
        const banks = {
            de: () => (root.ContentDE && root.ContentDE.lessons) || [],
            en: () => (root.ContentEN && root.ContentEN.lessons) || [],
            math: () => (root.ContentMATH && root.ContentMATH.lessons) || []
        };
        const lessons = (banks[sub] || banks.de)();
        const lesson = lessons.find(l => l.id === topic) || lessons[0] || {};
        const ex = (lesson.exercises || []).find(e => e.type === (opts.type || 'mc')) || (lesson.exercises || [])[0];
        if (!ex) {
            return { type: 'mc', title: 'Lokale Aufgabe', prompt: 'Wiederhole das Thema ' + topic + '.', options: ['A', 'B', 'C', 'D'], answer: 0, explanation: 'Lokal generiert – das KI-Backend ist nicht erreichbar.' };
        }
        return {
            type: ex.type,
            title: 'Lokale Aufgabe: ' + (lesson.title || topic),
            prompt: ex.prompt,
            options: ex.options,
            answer: ex.answer,
            explanation: ex.explanation || 'Lokale Aufgabe aus dem Themenkatalog (KI nicht verfügbar).'
        };
    }

    async function availability() {
        try {
            const r = await fetch('/api/ai', { method: 'GET' });
            if (!r.ok) return { ok: false };
            const data = await r.json();
            return {
                ok: true,
                hasGemini: !!(data && data.hasGemini),
                hasAnthropic: !!(data && data.hasAnthropic),
                primary: (data && data.primary) || 'lokal',
                geminiModel: (data && data.geminiModel) || null,
                anthropicModel: (data && data.anthropicModel) || null
            };
        } catch (e) { return { ok: false }; }
    }

    root.AI = { feedbackFreeText, generateTask, availability, localFallback };
})(window);
