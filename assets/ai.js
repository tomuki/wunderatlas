/* AI client. Only used when the user explicitly clicks a "KI"-button.
   Talks to the local proxy at /api/ai which keeps the API key server-side.
   The client NEVER receives the API key. When the server has no key, it
   returns a deterministic local task (clearly tagged), not a fake AI
   response. */
(function (root) {
    async function call(path,body){
        const controller=new AbortController(),timeout=setTimeout(()=>controller.abort(),65000);
        try{const r=await fetch(path,{method:'POST',signal:controller.signal,credentials:'same-origin',headers:{'Content-Type':'application/json'},body:JSON.stringify(body||{})});
            const text=await r.text();let data;try{data=JSON.parse(text);}catch{throw new Error('Invalid feedback response');}
            if(!r.ok)throw Object.assign(new Error('Feedback request failed'),{code:data.code||(r.status===401?'sign_in_required':r.status===429?'quota':'provider_failed')});return data;
        }finally{clearTimeout(timeout);}
    }

    function feedbackError(code,language){const en=language==='en';const messages={not_configured:['Gemini ist noch nicht verbunden. Nutze vorerst Musterlösung und Selbstkontrolle.','Gemini is not connected yet. Use the model and self-assessment.'],invalid_key:['Gemini hat den Schlüssel abgelehnt. Prüfe die lokale Konfiguration und starte den Server neu.','Gemini rejected the key. Check local configuration and restart the server.'],quota:['Gemini-Limit erreicht. Versuche es später erneut; deine Lösung bleibt gespeichert.','Gemini quota reached. Try later; your response remains saved.'],model_unavailable:['Das konfigurierte Gemini-Modell ist nicht verfügbar.','The configured Gemini model is unavailable.'],sign_in_required:['Melde dich an, um KI-Feedback auf diesem Server zu nutzen.','Sign in to use AI feedback on this server.'],timeout:['Die Auswertung dauert zu lange. Versuche es erneut oder nutze die Selbstkontrolle.','The review timed out. Retry or use self-assessment.']};return (messages[code]||['KI-Feedback ist momentan nicht verfügbar. Deine Lösung bleibt erhalten.','AI feedback is currently unavailable. Your response is preserved.'])[en?1:0];}
    async function feedbackFreeText({ prompt, answer, language, subject }) {
        try {
            const out = await call('/api/ai', {
                action: 'feedback',
                prompt: prompt,
                answer: answer,
                language: subject==='math'?'de':(language || 'de'),
                subject:subject|| (language==='en'?'en':'de')
            });
            // Neue strukturierte Form: { feedback: {summary, criteria, staerken, ...}, source }
            if (out && out.feedback) {
                return { feedback: out.feedback, source: out.source || 'lokal' };
            }
            // Fallback: alte Textform
            if (out && typeof out.text === 'string') {
                return { feedback: null, source: 'text', text: out.text };
            }
            return {feedback:null,source:'unavailable',code:out?.code||'invalid_response',error:feedbackError(out?.code,language)};
        } catch (e) {
            if(e.code==='access_denied') return {feedback:null,source:'unavailable',code:e.code,error:language==='en'?'AI access has not been enabled for this account.':'KI-Zugang ist für dieses Konto noch nicht freigeschaltet.'};
            return {
                feedback: null,
                source: 'fehler',code:e.code|| (e.name==='AbortError'?'timeout':'network'),
                error:feedbackError(e.code||(e.name==='AbortError'?'timeout':'network'),language)
            };
        }
    }

    async function generateTask(opts) {
        // opts: { subject, topic, type, difficulty, mode, learnerHint, fromError }
        try {
            const out = await call('/api/ai', { action: 'generate-task', request:opts });
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
        opts=opts||{};
        const sub = (opts && opts.subject) || 'de';
        const topic = (opts && opts.topic) || 'operatoren';
        const banks = {
            de: () => (root.ContentDE && (root.ContentDE.list||root.ContentDE.lessons)) || [],
            en: () => (root.ContentEN && (root.ContentEN.list||root.ContentEN.lessons)) || [],
            math: () => (root.ContentMATH && (root.ContentMATH.list||root.ContentMATH.lessons)) || []
        };
        const lessons = (banks[sub] || banks.de)();
        const lesson = lessons.find(l => l.id === topic) || lessons[0] || {};
        const ex = (lesson.exercises || []).find(e => e.type === (opts.type || 'mc')) || (lesson.exercises || [])[0];
        if (!ex) return {type:'free',subject:sub,topic,q:sub==='en'?'Explain a topic you have studied using one example. Identify one point you still need to check.':'Erkläre ein gelerntes Thema an einem Beispiel. Benenne einen Punkt, den du noch überprüfen musst.',explanation:sub==='en'?'Check the explanation and example against your lesson.':'Prüfe Erklärung und Beispiel anhand deiner Lektion.',local:true,ai:false};
        return {...ex,subject:sub,topic,q:ex.q||ex.prompt||lesson.title,prompt:ex.q||ex.prompt||lesson.title,title:(sub==='en'?'Practice from your library: ':'Übung aus deiner Bibliothek: ')+(lesson.title||topic),local:true,ai:false};
    }

    async function availability() {
        try {
            const r = await fetch('/api/ai', { method: 'GET', signal:AbortSignal.timeout(10000) });
            if (!r.ok) return { ok: false };
            const data = await r.json();
            return {
                ok: true,
                hasGemini: !!(data && data.hasGemini),
                primary: (data && data.primary) || 'lokal',
                geminiModel: (data && data.geminiModel) || null,
            };
        } catch (e) { return { ok: false }; }
    }

    root.AI = { feedbackError, feedbackFreeText, generateTask, availability, localFallback };
})(window);
