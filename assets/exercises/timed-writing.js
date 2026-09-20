/* Timed writing exercise: a timer with a textarea, autosave, and a result view.
   Used for both standalone practice and the mock exam. */
(function (root) {
    function render(ex) {
        return ExerciseEngine.ui(ex)`
            <div class="exercise" data-topic="${ExerciseEngine.escapeHtml(ex.topic || '')}">
                <div class="exercise__header">
                    <div class="exercise__type">Schreibaufgabe (${ex.durationMin || 60} min)</div>
                    <div class="muted" data-status>Wird vorbereitet …</div>
                </div>
                <div class="timer" data-display>${formatTime((ex.durationMin || 60) * 60)}</div>
                <div class="timer__bar" data-bar><div class="timer__fill" data-fill style="width:100%"></div></div>
                <div class="exercise__q">${ExerciseEngine.escapeHtml(ex.q)}</div>
                ${ex.context ? `<div class="example" style="margin-bottom:8px">${ExerciseEngine.escapeHtml(ex.context)}</div>` : ''}
                ${ex.operatorHints ? ExerciseEngine.ui(ex)`<p class="muted" style="font-size:0.9em">Operator-Hinweise: ${ex.operatorHints.map(h => `<span class="tag" style="margin-right:4px">${ExerciseEngine.escapeHtml(h)}</span>`).join('')}</p>` : ''}
                <textarea class="textarea" data-input style="min-height:240px" placeholder="Hier schreiben …"></textarea>
                <div class="muted" data-saved style="font-size:0.8rem; margin-top:4px">Entwurf wird automatisch gespeichert.</div>
                <div class="exercise__actions">
                    <button class="btn btn--primary" data-action="start">Timer starten</button>
                    <button class="btn btn--ghost" data-action="pause">${ex.subject==='en'?'Pause':'Pause'}</button>
                    <button class="btn btn--ghost" data-action="finish" disabled>Abgeben</button>
                    <button class="btn btn--ghost" data-action="ai">KI-Feedback</button>
                </div>
                <div class="exercise__feedback" data-feedback hidden></div>
            </div>
        `;
    }

    function formatTime(s) {
        const m = Math.floor(s / 60);
        const sec = s % 60;
        return String(m).padStart(2, '0') + ':' + String(sec).padStart(2, '0');
    }

    function isCorrect(ex, answer) {
        // We can't auto-grade a writing task. Mark as completed if length > 0.
        return null;
    }

    function bind(container,ex,onResult){
        const el=container.querySelector('.exercise'),en=ex.subject==='en',t=(d,e)=>en?e:d;
        const input=el.querySelector('[data-input]'),status=el.querySelector('[data-status]'),feedback=el.querySelector('[data-feedback]'),start=el.querySelector('[data-action=start]'),pause=el.querySelector('[data-action=pause]'),finishBtn=el.querySelector('[data-action=finish]'),ai=el.querySelector('[data-action=ai]');
        const key=Assessment.key('timed-'+(ex.id||ex.q)),total=(ex.durationMin||60)*60;let draft={};try{draft=JSON.parse(localStorage.getItem(key)||'{}');}catch{}
        if(!Object.keys(draft).length){try{if(!JSON.parse(localStorage.getItem('fhr-auth')||'null')?.id)draft.answer=localStorage.getItem('fhr-draft-'+(ex.id||'tw'))||'';}catch{}}
        let remaining=draft.remaining??total,deadline=draft.deadline||null,finished=!!draft.finished,started=!!draft.started,version=0;
        input.value=draft.answer||'';
        const retry=document.createElement('button');retry.className='btn';retry.dataset.action='retry';retry.textContent=t('Neuer Versuch','New attempt');retry.hidden=!finished;el.querySelector('.exercise__actions').appendChild(retry);
        function save(){try{localStorage.setItem(key,JSON.stringify({answer:input.value,remaining,deadline,finished,started}));el.querySelector('[data-saved]').textContent=t('Entwurf gespeichert.','Draft saved.');}catch{el.querySelector('[data-saved]').textContent=t('Speichern nicht möglich. Bitte Text kopieren.','Could not save. Please copy your text.');}}
        function paint(){if(deadline)remaining=Math.max(0,Math.ceil((deadline-Date.now())/1000));el.querySelector('[data-display]').textContent=formatTime(remaining);el.querySelector('[data-fill]').style.width=(remaining/total*100)+'%';start.disabled=finished||!!deadline;pause.disabled=finished||!deadline;finishBtn.disabled=finished||!started;input.disabled=finished;retry.hidden=!finished;status.textContent=finished?t('Abgegeben','Submitted'):deadline?t('Läuft','Running'):t('Pausiert / bereit','Paused / ready');if(deadline&&remaining===0&&!finished)finish();}
        function finish(){if(finished||!started)return;finished=true;deadline=null;version++;save();feedback.hidden=false;Assessment.writingReview(feedback,ex,input.value);paint();if(onResult)onResult(null,input.value);}
        const interval=setInterval(()=>{if(!el.isConnected){clearInterval(interval);return;}paint();},1000);
        start.addEventListener('click',()=>{if(finished||deadline)return;started=true;deadline=Date.now()+remaining*1000;save();paint();});
        pause.addEventListener('click',()=>{if(!deadline)return;remaining=Math.max(0,Math.ceil((deadline-Date.now())/1000));deadline=null;save();paint();});
        input.addEventListener('input',()=>{version++;save();});finishBtn.addEventListener('click',finish);
        retry.addEventListener('click',()=>{finished=false;started=false;deadline=null;remaining=total;input.value='';feedback.hidden=true;version++;save();paint();});
        ai.addEventListener('click',async()=>{if(!input.value.trim()){feedback.hidden=false;feedback.textContent=t('Schreibe zuerst eine Antwort.','Write a response first.');return;}const request=++version;ai.disabled=true;feedback.hidden=false;feedback.textContent=t('Feedback wird angefragt …','Requesting feedback …');try{const out=await AI.feedbackFreeText({prompt:ex.q+'\n'+(ex.context||'')+'\n'+Assessment.rubric(ex,ex.subject).map(c=>c.label+': '+c.description).join('\n'),answer:input.value,subject:ex.subject,language:en?'en':'de'});if(request!==version||!el.isConnected)return;feedback.innerHTML=out.feedback?Exercises.free.renderStructuredFeedback(out.feedback,out.source,ex):`<p>${ExerciseEngine.escapeHtml(out.text||t('Feedback nicht verfügbar. Vergleiche deine Antwort mit den Kriterien.','Feedback unavailable. Compare your response with the criteria.'))}</p>${Assessment.criteriaHTML(ex,ex.subject)}`;}catch{if(request===version&&el.isConnected)feedback.textContent=t('Feedback nicht verfügbar. Deine Antwort bleibt erhalten.','Feedback unavailable. Your response is preserved.');}finally{ai.disabled=false;}});
        if(finished){feedback.hidden=false;const prior=Store.load().writingAttempts?.find(a=>a.taskKey===(ex.id||ex.q)&&a.results?.[0]?.answer===input.value);if(prior){feedback.innerHTML=Assessment.resultHTML(prior);Assessment.bindReview(feedback,prior);}else feedback.innerHTML=`<p>${t('Abgegebener Text wiederhergestellt.','Submitted response restored.')}</p>${Assessment.criteriaHTML(ex,ex.subject)}<p>${ExerciseEngine.escapeHtml(ex.modelAnswer||ex.explanation||'')}</p>`;}
        paint();
    }

    root.Exercises = root.Exercises || {};
    root.Exercises['timed-writing'] = { render, isCorrect, bind };
})(window);
