/* Free-text exercise: rule-based local grading for short answers.
   For longer answers, the user can self-evaluate and an AI feedback
   button is available (uses /api/ai if available).
   Lifecycle:
     unanswered  --type in textarea-->  selected
     selected    --click Selbst bewerten-->  checking -> checked-correct | checked-wrong
     any state   --click Zuruecksetzen-->  unanswered  (clears textarea, restores Pruefen)
*/
(function (root) {
    function render(ex) {
        return ExerciseEngine.ui(ex)`
            <div class="exercise" data-topic="${ExerciseEngine.escapeHtml(ex.topic || '')}">
                <div class="exercise__header"><div class="exercise__type">Freie Antwort</div></div>
                <div class="exercise__q">${ExerciseEngine.escapeHtml(ex.q)}</div>
                ${ex.context ? `<div class="example" style="margin-bottom:8px">${ExerciseEngine.escapeHtml(ex.context)}</div>` : ''}
                <textarea class="textarea" data-input placeholder="Deine Antwort (4–8 Sätze)"></textarea>
                <div class="exercise__actions">
                    <button class="btn btn--primary" data-action="check" disabled>Selbst bewerten</button>
                    <button class="btn btn--ghost" data-action="revise" hidden>${ex.subject==='en'?'Revise response':'Antwort überarbeiten'}</button>
                    <button class="btn btn--ghost" data-action="reset">Zurücksetzen</button>
                    <button class="btn btn--ghost" data-action="model">Musterlösung</button>
                    <button class="btn btn--ghost" data-action="ai" title="Optional: KI-Feedback">KI-Feedback</button>
                </div>
                <div class="exercise__feedback" data-feedback hidden></div>
            </div>
        `;
    }

    function isCorrect(ex, answer) {
        if (!answer || typeof answer !== 'string') return false;
        return null; // Written work needs a rubric, not keyword matching.
    }

    // Baut das Markup für strukturiertes Feedback (Aufgabenverständnis, Inhalt,
    // Struktur, Sprache, Operatorerfüllung + Stärken/Schwächen/Tipps).
    function renderStructuredFeedback(fb, source, ex) {
        if (!fb) return '';
        const isAi = source === 'anthropic' || source === 'gemini';
        const isLocal = (source && String(source).startsWith('lokal'));
        const label = isAi
            ? ExerciseEngine.ui(ex)`<span class="tag tag--en">KI-Feedback</span>`
            : '<span class="tag tag--warn">Lokale Einschätzung</span>';
        const note = ExerciseEngine.text(ex, 'KI-Feedback ist eine Lernhilfe, keine offizielle Bewertung.');
        if(!isAi) return `<p>${ex.subject==='en'?'Automatic feedback is unavailable. Use the task-specific criteria below; word count cannot assess quality.':'Automatisches Feedback ist nicht verfügbar. Nutze die Kriterien unten; die Wortzahl bewertet keine Qualität.'}</p>${Assessment.criteriaHTML(ex,ex.subject)}`;
        if(ex.subject==='math'&&fb.mathReview&&root.MathWork)return root.MathWork.feedbackHTML({feedback:fb,source});
        if(fb.taskCriteria?.length)return `<p>${ExerciseEngine.escapeHtml(fb.summary||'')}</p>${fb.taskCriteria.map(c=>`<section><h4>${ExerciseEngine.escapeHtml(c.label)} · ${c.score}/3</h4><p>${ExerciseEngine.escapeHtml(c.evidence)}</p><p>${ExerciseEngine.escapeHtml(c.revision)}</p></section>`).join('')}<p>${ExerciseEngine.escapeHtml(fb.naechsterSchritt||'')}</p><p>${note}</p>`;
        const c = fb.criteria || {};
        const order = [
            ['aufgabenverstaendnis', ExerciseEngine.text(ex, 'Aufgabenverständnis')],
            ['inhalt', ExerciseEngine.text(ex, 'Inhalt')],
            ['struktur', ExerciseEngine.text(ex, 'Struktur')],
            ['sprache', ExerciseEngine.text(ex, 'Sprache')],
            ['operatorErfuellung', ExerciseEngine.text(ex, 'Operatorerfüllung')]
        ];
        const criteriaHtml = order.map(([key, label]) => {
            const item = c[key] || { score: 0, comment: '' };
            const dots = renderScoreDots(item.score);
            return ExerciseEngine.ui(ex)`<div class="criteria">
                <div class="criteria__head">
                    <span class="criteria__label">${label}</span>
                    <span class="criteria__score">${dots} <span class="muted">${item.score || '–'}/5</span></span>
                </div>
                ${item.comment ? `<div class="criteria__comment">${ExerciseEngine.escapeHtml(item.comment)}</div>` : ''}
            </div>`;
        }).join('');
        const list = (arr) => Array.isArray(arr) && arr.length
            ? '<ul class="fb-list">' + arr.map(x => `<li>${ExerciseEngine.escapeHtml(x)}</li>`).join('') + '</ul>'
            : '<div class="muted">–</div>';
        return ExerciseEngine.ui(ex)`<div class="structured-feedback">
            <div class="row" style="justify-content:space-between">${label}<span class="muted" style="font-size:0.85em">Quelle: ${ExerciseEngine.escapeHtml(source || 'lokal')}</span></div>
            ${fb.summary ? `<div class="fb-summary">${ExerciseEngine.escapeHtml(fb.summary)}</div>` : ''}
            <div class="fb-criteria">${criteriaHtml}</div>
            <div class="fb-section"><h4>Stärken</h4>${list(fb.staerken)}</div>
            <div class="fb-section"><h4>Schwächen</h4>${list(fb.schwaechen)}</div>
            <div class="fb-section"><h4>Tipps</h4>${list(fb.tipps)}</div>
            ${fb.naechsterSchritt ? `<div class="fb-next"><strong>Nächster Schritt:</strong> ${ExerciseEngine.escapeHtml(fb.naechsterSchritt)}</div>` : ''}
            <div class="muted" style="margin-top:10px; font-size:0.85em">${note}</div>
        </div>`;
    }

    function renderScoreDots(score) {
        const n = Math.max(0, Math.min(5, Math.round(Number(score) || 0)));
        let html = '';
        for (let i = 1; i <= 5; i++) html += '<span class="dot' + (i <= n ? ' dot--on' : '') + '"></span>';
        return html;
    }

    function bind(container, ex, onResult) {
        const root = container.querySelector('.exercise');
        const input = root.querySelector('[data-input]');
        const checkBtn = root.querySelector('[data-action="check"]');
        const resetBtn = root.querySelector('[data-action="reset"]');
        const modelBtn = root.querySelector('[data-action="model"]');
        const aiBtn = root.querySelector('[data-action="ai"]');
        const feedback = root.querySelector('[data-feedback]');

        const lifecycle = ExerciseEngine.createLifecycle(root, { checkBtn, resetBtn, feedbackEl: feedback });

        let submitted = false, requestVersion=0;
        const draftKey=Assessment.key('free-'+(ex.id||ex.topic||'')+'-'+ex.q);
        try{input.value=localStorage.getItem(draftKey)||'';}catch{}
        input.addEventListener('input',()=>{submitted=false;requestVersion++;try{localStorage.setItem(draftKey,input.value);}catch{feedback.hidden=false;feedback.textContent=ex.subject==='en'?'Could not save your draft.':'Entwurf konnte nicht gespeichert werden.';}});

        function updateCheckEnabled() {
            const s = lifecycle.getState();
            if (s === 'checked-correct' || s === 'checked-wrong' || s === 'next') return;
            const has = (input.value || '').trim().length > 0;
            lifecycle.setState(has ? 'selected' : 'unanswered');
        }

        input.addEventListener('input', updateCheckEnabled);

        lifecycle.on('__reset', () => {
            submitted = false;requestVersion++;try{localStorage.removeItem(draftKey);}catch{}
            input.value = '';
            input.disabled = false;
        });

        checkBtn.addEventListener('click', () => {
            if (lifecycle.getState() !== 'selected') return;
            if (submitted) return;
            submitted = true;
            lifecycle.setState('checking');
            const txt = input.value || '';
            feedback.hidden = false;
            feedback.className = 'exercise__feedback';
            Assessment.writingReview(feedback,ex,txt);
            lifecycle.setState('completed');
            resetBtn.hidden=false;resetBtn.style.display='';resetBtn.disabled=false;root.querySelector('[data-action=revise]').hidden=false;
            if(onResult)onResult(null,txt);
        });

        root.querySelector('[data-action=revise]').addEventListener('click',()=>{submitted=false;requestVersion++;input.disabled=false;lifecycle.setState(input.value.trim()?'selected':'unanswered');root.querySelector('[data-action=revise]').hidden=true;input.focus();});
        resetBtn.addEventListener('click', () => {
            lifecycle.reset();
        });

        modelBtn.addEventListener('click', () => {
            feedback.hidden = false;
            feedback.className = 'exercise__feedback';
            feedback.innerHTML = ExerciseEngine.ui(ex)`<div><strong>Musterlösung</strong></div>
                <div style="margin-top:6px; white-space:pre-wrap">${ExerciseEngine.escapeHtml(ex.modelAnswer || ExerciseEngine.text(ex, '(keine hinterlegt)'))}</div>`;
        });

        updateCheckEnabled();
        const prior=Store.load().writingAttempts?.find(a=>a.taskKey===(ex.id||ex.q)&&a.results?.[0]?.answer===input.value);
        if(prior){feedback.hidden=false;feedback.innerHTML=Assessment.resultHTML(prior);Assessment.bindReview(feedback,prior);}
        aiBtn.addEventListener('click', async () => {
            if(!input.value.trim()){feedback.hidden=false;feedback.textContent=ex.subject==='en'?'Write a response first.':'Schreibe zuerst eine Antwort.';return;}
            const version=++requestVersion;
            feedback.hidden = false;
            feedback.className = 'exercise__feedback';
            feedback.innerHTML = ExerciseEngine.ui(ex)`<div class="row"><span class="spinner"></span><span class="muted">KI-Feedback wird angefragt …</span></div>`;
            aiBtn.disabled = true;
            try {
                const out = await AI.feedbackFreeText({ prompt: ex.q+'\n'+(ex.context||'')+'\n'+Assessment.rubric(ex,ex.subject).map(c=>c.label+': '+c.description).join('\n'), answer: input.value, subject:ex.subject, language: ex.subject === 'en' ? 'en' : (ex.lang || 'de') });
                if(version!==requestVersion||!root.isConnected)return;
                if (out && out.feedback) {
                    feedback.innerHTML = renderStructuredFeedback(out.feedback, out.source, ex);
                } else if (out && out.text) {
                    feedback.innerHTML = ExerciseEngine.ui(ex)`<div><strong>KI-Feedback</strong></div>
                        <div style="margin-top:6px; white-space:pre-wrap">${ExerciseEngine.escapeHtml(out.text)}</div>
                        <div class="muted" style="margin-top:6px">Hinweis: KI-Feedback ist eine Hilfe, keine offizielle Bewertung.</div>`;
                } else {
                    feedback.innerHTML = ExerciseEngine.ui(ex)`<div><strong>KI-Feedback nicht verfügbar</strong></div>
                        <div class="muted" style="margin-top:6px">${ex.subject==='en'?'Automatic feedback is unavailable. Use the self-assessment criteria.':'Automatisches Feedback ist nicht verfügbar. Nutze die Selbstbewertung.'}</div>
                        <div class="muted" style="margin-top:6px">${ex.subject==='en'?'Your response stays here. Try again later.':'Deine Antwort bleibt erhalten. Versuche es später erneut.'}</div>`;
                }
            } catch (e) {
                feedback.innerHTML = ExerciseEngine.ui(ex)`<div><strong>KI-Feedback nicht verfügbar</strong></div>
                    <div class="muted" style="margin-top:6px">${ExerciseEngine.escapeHtml(e.message || String(e))}</div>
                    <div class="muted" style="margin-top:6px">${ex.subject==='en'?'Your response stays here. Try again later.':'Deine Antwort bleibt erhalten. Versuche es später erneut.'}</div>`;
            } finally {
                aiBtn.disabled = false;
            }
        });
    }

    root.Exercises = root.Exercises || {};
    root.Exercises['free'] = { render, isCorrect, bind, renderStructuredFeedback };
})(window);
