/* Wunderatlas: editorial views over the existing curriculum and state model. */
(function (root) {
    'use strict';
    const esc = value => String(value == null ? '' : value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
    const subjects = [
        {id:'de', route:'deutsch', title:'Deutsch', motif:'Aa', desc:'Gedanken finden. Worte formen.', content:()=>root.ContentDE, color:'rose'},
        {id:'en', route:'englisch', title:'English', motif:'&', desc:'New words. New perspectives.', content:()=>root.ContentEN, color:'sage'},
        {id:'math', route:'mathematik', title:'Mathematik', motif:'ƒ', desc:'Muster entdecken. Zusammenhänge verstehen.', content:()=>root.ContentMATH, color:'blue'},
        {id:'grafik', route:'grafik', title:'Gestaltung', motif:'✳', desc:'Dein Blick macht den Unterschied.', content:()=>root.ContentGRAF, color:'ochre'}
    ];
    const label = id => (subjects.find(s=>s.id===id)||{}).title || id || 'Lernen';
    const dateLabel = iso => new Date(iso+'T12:00:00').toLocaleDateString('de-DE',{day:'numeric',month:'long'});
    const isoDate = d => `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
    function href(task) {
        if (!task) return '#/deutsch';
        if (task.type==='mock-exam' || task.type==='mini-exam' || String(task.ref||'').startsWith('mini-exam:')) return '#/pruefung?subject='+encodeURIComponent(task.subject);
        if (task.type==='review') return '#/fehler';
        const sub=subjects.find(s=>s.id===task.subject);
        const validRef=sub?.content()?.byId?.[task.ref];
        return '#/'+(sub?sub.route:'plan')+(validRef?'/'+encodeURIComponent(task.ref):'');
    }
    function completed(s, task) {
        return s.completed.some(c=>c.taskId===task.id || (task.ref && c.taskId==='lesson:'+task.subject+':'+task.ref));
    }
    function next(s) {
        for(const week of (s.plan?.weeks||[])) for(const day of week.days) for(const task of day.tasks) {
            if(!completed(s,task)) return {task,day,week};
        }
        return null;
    }
    const kicker = text => '<div class="atlas-kicker">'+text+'</div>';
    const head = (n,title,desc) => `<header class="atlas-heading">${kicker('KAPITEL '+n+' / DEIN WUNDERATLAS')}<h1>${title}</h1><p>${esc(desc)}</p></header>`;
    function dashboard(container) {
        const s=Store.load(), recommendation=next(s), task=recommendation?.task;
        const due=Review.dueToday(s.errors||[]).length;
        const days=Math.max(0,Math.ceil((new Date(s.profile.examDate+'T12:00:00')-new Date())/86400000));
        const name=s.profile.name?.trim() || 'Vlada';
        const total=subjects.slice(0,3).reduce((n,x)=>n+(x.content()?.list?.length||0),0);
        const finished=s.completed.filter(c=>c.taskId.startsWith('lesson:')).length;
        container.innerHTML=`
        <div class="atlas-dateline"><span>DEIN KLEINES UNIVERSUM DES WISSENS</span><span>${new Date().toLocaleDateString('de-DE',{day:'2-digit',month:'long',year:'numeric'}).toUpperCase()}</span></div>
        <section class="atlas-hero">
          <div class="atlas-hero-copy">${kicker('SCHÖN, DASS DU DA BIST, '+esc(name.toUpperCase()))}
            <h1>Die Welt ist<br> voller <em>Wunder.</em><br> Du auch.</h1>
            <p>Ein Gedanke, der bleibt. Eine Aufgabe, die gelingt.<br class="desktop-break"> Dein Weg zur Fachhochschulreife beginnt hier.</p>
            <a class="atlas-button" href="${href(task)}">${finished?'Weiterlernen':'Meine Lernreise starten'} <span aria-hidden="true">↗</span></a>
            <div class="atlas-hero-note"><span aria-hidden="true">✧</span> In deinem Tempo. Auf deine Art.</div>
          </div>
          <figure class="atlas-hero-art"><img src="assets/atlas-garden.svg" alt="Ein Pony auf einem gewundenen Weg zwischen Blumen und grünen Hügeln"><div class="atlas-seal"><strong>${days}</strong><span>TAGE BIS ZU<br> DEINEM ZIEL</span></div><figcaption>FIG. 01 — AUCH KLEINE SCHRITTE FÜHREN WEIT.</figcaption></figure>
        </section>
        <section class="atlas-today" aria-labelledby="today-title"><div class="atlas-section-label"><span>01 / HEUTE</span><h2 id="today-title">Ein guter<br> <em>nächster Schritt.</em></h2><a href="#/plan" class="atlas-text-link">Zum Wochenplan ↗</a></div>
         <a class="atlas-next" href="${href(task)}"><span class="atlas-kicker">${task?esc(label(task.subject))+' · '+esc(task.durationMin||30)+' MINUTEN':'DEINE LERNREISE'}</span><h3>${esc(task?.title||'Zeit für eine neue Entdeckung')}</h3><p>${task?'Eine noch offene Einheit aus deinem persönlichen Lernplan.':'Deine geplanten Einheiten sind abgeschlossen. Entdecke ein Thema neu.'}</p><span class="atlas-arrow" aria-hidden="true">↗</span></a>
         <a class="atlas-review-note" href="#/fehler"><span aria-hidden="true">✳</span><h3>${due?'Noch einmal,<br> ganz in Ruhe.':'Fehler sind<br> Wegweiser.'}</h3><p>${due?due+' Wiederholungen warten auf dich.':'Hier sammelst du, was du noch besser verstehen möchtest.'}</p><span class="atlas-text-link">Fehlerjournal öffnen ↗</span></a></section>
        <section class="atlas-subjects" aria-labelledby="subject-title"><div class="atlas-section-bar"><h2 id="subject-title">Vier Türen. <em>Deine Möglichkeiten.</em></h2><span>02 / ENTDECKEN</span></div><div class="atlas-books">${subjects.map((sub,i)=>`<a href="#/${sub.route}" class="atlas-book atlas-book--${sub.color}"><span class="atlas-book-no">BAND 0${i+1}</span><span class="atlas-book-symbol" aria-hidden="true">${sub.motif}</span><h3>${sub.title}</h3><p>${sub.desc}</p><span class="atlas-book-foot">${sub.content()?.list?.length?sub.content().list.length+' KAPITEL':'KREATIVWERKSTATT'} <b aria-hidden="true">↗</b></span></a>`).join('')}</div></section>
        <section class="atlas-bottom"><div><span class="atlas-kicker">DEIN FORTSCHRITT IST MEHR ALS EINE ZAHL</span><h2>Du wächst.<br> <em>Seite für Seite.</em></h2></div><div class="atlas-big-stat"><strong>${finished}<small> / ${total}</small></strong><span>abgeschlossene Lektionen</span><a href="#/fortschritt" class="atlas-text-link">Deinen Weg ansehen ↗</a></div><a href="#/notizen" class="atlas-scribble">Platz für<br> deine Gedanken.<span>Notizbuch öffnen ↗</span></a></section>`;
    }
    function plan(container) {
        const s=Store.load(), weeks=s.plan?.weeks||[];
        if(!weeks.length) { container.innerHTML=head('02','Dein Lernplan','Lege zuerst dein Lernziel fest.')+'<a class="atlas-button" href="#/profil">Lernziel einstellen ↗</a>';return; }
        const today=isoDate(new Date());
        let current=weeks.findIndex(w=>w.days.some(d=>d.date===today));
        if(current<0) current=0;
        container.innerHTML=head('02','Gute Dinge<br> <em>brauchen ihren Rhythmus.</em>','Dein Wochenplan. Genug Struktur, um anzufangen. Genug Luft, um du selbst zu bleiben.')+`
        <div class="atlas-plan-toolbar"><label for="atlas-week">Deine Woche</label><select id="atlas-week">${weeks.map((w,i)=>`<option value="${i}" ${i===current?'selected':''}>Woche ${i+1} · ${dateLabel(w.start)}</option>`).join('')}</select><span>${s.profile.hoursPerWeek} Stunden / Woche</span><a href="#/profil" class="atlas-text-link">Rhythmus anpassen ↗</a></div><div id="atlas-week-body"></div>`;
        const body=container.querySelector('#atlas-week-body');
        function show(i){const w=weeks[i];body.innerHTML=`<div class="atlas-week-title"><span>WOCHE ${String(i+1).padStart(2,'0')}</span><h2>${esc(w.goal)}</h2><p>${esc(w.outcome)}</p></div><div class="atlas-days">${w.days.map(d=>`<section class="atlas-day ${d.date===today?'is-today':''}"><header><span>${esc(new Date(d.date+'T12:00:00').toLocaleDateString('de-DE',{weekday:'short'}))}</span><strong>${new Date(d.date+'T12:00:00').getDate()}</strong>${d.date===today?'<b>HEUTE</b>':''}</header><div>${d.tasks.length?d.tasks.map(t=>`<a class="atlas-plan-task ${completed(s,t)?'is-done':''}" href="${href(t)}"><span class="atlas-kicker">${esc(label(t.subject))} · ${t.durationMin||30} MIN.</span><h3>${esc(t.title)}</h3><span>${completed(s,t)?'✓ Gelernt · Noch einmal ansehen':'Einheit öffnen ↗'}</span></a>`).join(''):'<p class="atlas-rest">Ein bisschen Raum.<br> Für alles andere. <span aria-hidden="true">✧</span></p>'}</div></section>`).join('')}</div>`;}
        container.querySelector('#atlas-week').addEventListener('change',e=>show(Number(e.target.value)));show(current);
    }
    function subjectList(container,sub) {
        const ex={subject:sub.id};
        const s=Store.load(), lessons=sub.content()?.list||[], done=new Set(s.completed.map(x=>x.taskId));
        container.innerHTML=ExerciseEngine.ui(ex)`<div class="atlas-subject-heading atlas-tint-${sub.color}"><div>${kicker((sub.id==='en'?'YOUR ATLAS / ':'DEIN ATLAS / ')+sub.title.toUpperCase())}<h1>${sub.title}<em>.</em></h1><p>${sub.desc}</p></div><span class="atlas-subject-monogram" aria-hidden="true">${sub.motif}</span></div><div class="atlas-library"><aside><span class="atlas-kicker">DEIN INHALTSVERZEICHNIS</span><h2>Was möchtest<br> du <em>entdecken?</em></h2><p>${lessons.length} Lektionen zum Verstehen, Anwenden und Wiederholen.</p><a href="#/fehler" class="atlas-text-link">Deine Wiederholungen ↗</a></aside><div><div class="atlas-search-row"><label class="sr-only" for="atlas-search">Lektionen durchsuchen</label><input id="atlas-search" type="search" placeholder="Ein Thema finden …"><label class="sr-only" for="atlas-filter">Status</label><select id="atlas-filter"><option value="all">Alle Kapitel</option><option value="open">Noch offen</option><option value="done">Abgeschlossen</option></select></div><div id="atlas-results" role="status" class="atlas-kicker"></div><div class="atlas-chapters"></div></div></div>`;
        const list=container.querySelector('.atlas-chapters'), search=container.querySelector('#atlas-search'),filter=container.querySelector('#atlas-filter');
        function update(){let count=0;list.innerHTML=lessons.map((l,i)=>{const isDone=done.has('lesson:'+sub.id+':'+l.id);if(!(l.title+' '+l.summary).toLocaleLowerCase('de').includes(search.value.toLocaleLowerCase('de')) || filter.value==='done'&&!isDone || filter.value==='open'&&isDone)return '';count++;return `<a class="atlas-chapter" href="#/${sub.route}/${encodeURIComponent(l.id)}"><span class="atlas-chapter-no">${String(i+1).padStart(2,'0')}</span><div><span class="atlas-kicker">${isDone?(sub.id==='en'?'✓ COMPLETED':'✓ ABGESCHLOSSEN'):(l.exercises||[]).length+(sub.id==='en'?' EXERCISES':' ÜBUNGEN')}</span><h3>${esc(l.title)}</h3><p>${esc(l.summary||'')}</p></div><span aria-hidden="true">↗</span></a>`;}).join('')||ExerciseEngine.ui(ex)`<p class="atlas-empty">Noch kein Treffer. Probiere einen anderen Begriff oder zeige alle Kapitel.</p>`;container.querySelector('#atlas-results').textContent=count+(sub.id==='en'?' chapters':' Kapitel');}
        search.addEventListener('input',update);filter.addEventListener('change',update);update();
    }
    function learningTools(article) {
        const lab=article.querySelector('[data-argument-lab]');
        if(lab){
            const steps=[
                ['Position · What do I suggest?','We should use a digital invitation and a few printed posters.','A clear proposal: two formats with different jobs.'],
                ['Reason · Why?','A digital invitation is easy to update.','The reason names a useful feature instead of repeating a preference.'],
                ['Example · In what situation?','If the date changes, we can edit the invitation.','A specific situation shows why that feature is useful.'],
                ['Link · How does it help?','We do not need to print a new version each time.','Connect the example to paper use. This does not prove that digital is always greener.']
            ];
            lab.innerHTML=`<div class="atlas-argument"><span class="atlas-kicker">BUILD AN ARGUMENT</span><ol class="atlas-argument-track" aria-label="Structure of the argument">${steps.map((s,i)=>`<li data-argument-step="${i}" ${i?'hidden':''}><span>${esc(s[0])}</span><p lang="en">${esc(s[1])}</p><small>${esc(s[2])}</small></li>`).join('')}</ol><p data-step-status role="status"></p><div class="atlas-tool-actions"><button type="button" class="btn btn--primary" data-step-next>Reveal the next step</button><button type="button" class="btn btn--ghost" data-step-reset>Start again</button></div><fieldset class="atlas-reason-choice"><legend>Which reason helps the team?</legend><button type="button" aria-pressed="false" data-reason="circular">It is good because it is better.</button><button type="button" aria-pressed="false" data-reason="concrete">We can update the date without printing again.</button></fieldset><p data-reason-feedback role="status">Choose a sentence and check what it explains.</p><p class="atlas-tool-note">Guided practice · no score or completion points.</p></div>`;
            let step=0;
            const next=lab.querySelector('[data-step-next]');
            function paint(){lab.querySelectorAll('[data-argument-step]').forEach((el,i)=>{el.hidden=i>step;});next.disabled=step===steps.length-1;lab.querySelector('[data-step-status]').textContent=`${step+1} / ${steps.length} · ${steps[step][0]}`;}
            next.addEventListener('click',()=>{step=Math.min(step+1,steps.length-1);paint();});
            lab.querySelector('[data-step-reset]').addEventListener('click',()=>{step=0;paint();lab.querySelectorAll('[data-reason]').forEach(b=>b.setAttribute('aria-pressed','false'));lab.querySelector('[data-reason-feedback]').textContent='Choose a sentence and check what it explains.';});
            lab.querySelectorAll('[data-reason]').forEach(button=>button.addEventListener('click',()=>{lab.querySelectorAll('[data-reason]').forEach(b=>b.setAttribute('aria-pressed',String(b===button)));lab.querySelector('[data-reason-feedback]').textContent=button.dataset.reason==='concrete'?'Yes: the reason names a specific action and its benefit. Now think of another example.':'Good and better repeat an opinion. The team still does not know the benefit. Compare the other option.';}));
            paint();
        }
        const draft=article.querySelector('[data-comment-draft]');
        if(draft){
            const key='sustainable_design_b1',saved=Store.load().learningDrafts?.[key]||{};
            const criteria=['My position answers the question about using only digital invitations.','I have explained a reason and given a specific example.','I have considered an opposing point and suggested a solution.','I have checked my connectors and avoided invented facts.'];
            draft.innerHTML=`<div class="atlas-writing"><label for="atlas-comment-text">Your draft</label><textarea id="atlas-comment-text" rows="8" placeholder="I think our class should …" spellcheck="true" lang="en" aria-describedby="atlas-word-count"></textarea><p id="atlas-word-count"></p><fieldset><legend>Self-check · tick after checking</legend>${criteria.map((c,i)=>`<label><input type="checkbox" data-criterion="${i}"><span>${esc(c)}</span></label>`).join('')}</fieldset><div class="atlas-tool-actions"><button type="button" class="btn btn--primary" data-save-draft>Save draft</button></div><p data-draft-status role="status"></p><p class="atlas-tool-note">Your draft and self-check are saved in this browser. Word count and ticks do not assess your English or award exercise points.</p></div>`;
            const input=draft.querySelector('textarea'),checks=[...draft.querySelectorAll('[data-criterion]')],status=draft.querySelector('[data-draft-status]');
            input.value=typeof saved.text==='string'?saved.text:'';
            checks.forEach((el,i)=>{el.checked=!!saved.checks?.[i];});
            function count(){const n=input.value.trim().split(/\s+/).filter(Boolean).length;draft.querySelector('#atlas-word-count').textContent=`${n} words · Suggested range: 80–110. ${n<80?'Develop your reason and example.':n>110?'Check what you can shorten.':'The length is suitable; now check your ideas.'}`;}
            function changed(){status.textContent='You have unsaved changes.';count();}
            input.addEventListener('input',()=>{checks.forEach(el=>{el.checked=false;});changed();});
            checks.forEach(el=>el.addEventListener('change',changed));
            draft.querySelector('[data-save-draft]').addEventListener('click',()=>{const value={text:input.value,checks:checks.map(el=>el.checked)};Store.update(s=>{s.learningDrafts=s.learningDrafts||{};s.learningDrafts[key]=value;return s;});status.textContent=JSON.stringify(Store.load().learningDrafts?.[key])===JSON.stringify(value)?'Draft and self-check saved.':'Could not save. Copy your text before leaving this page, then try again.';});
            status.textContent=saved.text?'Your saved draft has been restored.':'Write your response, then save it.';count();
        }
    }
    function lessonWorkspace(container) {
        const article=container.querySelector('.lesson'),practice=container.querySelector('#lesson-exercises');
        const english=container.dataset.learningLanguage==='en';
        if(!article||!practice)return;
        article.lang=english?'en':'de';practice.lang=english?'en':'de';
        learningTools(article);
        const manual=container.querySelector('#markComplete');
        if(manual) manual.parentElement.remove();
        const header=container.querySelector('.page-header');
        const controls=document.createElement('div');controls.className='atlas-study-tabs';controls.setAttribute('role','tablist');controls.setAttribute('aria-label','Lernmodus');
        controls.innerHTML='<button type="button" id="atlas-read-tab" role="tab" aria-selected="true" aria-controls="atlas-reading">01 · Verstehen</button><button type="button" id="atlas-practice-tab" role="tab" aria-selected="false" aria-controls="lesson-exercises" tabindex="-1">02 · Anwenden</button><span>Wissen wird durch Ausprobieren lebendig.</span>';
        if(english){controls.setAttribute('aria-label','Learning mode');controls.querySelector('#atlas-read-tab').textContent='01 · Understand';controls.querySelector('#atlas-practice-tab').textContent='02 · Practise';controls.querySelector('span').textContent='Turn understanding into practice.';}
        header.after(controls);article.id='atlas-reading';article.setAttribute('role','tabpanel');article.setAttribute('aria-labelledby','atlas-read-tab');practice.setAttribute('role','tabpanel');practice.setAttribute('aria-labelledby','atlas-practice-tab');practice.hidden=true;
        const cta=document.createElement('button');cta.className='atlas-button atlas-read-cta';cta.textContent=english?'Try it yourself ↗':'Jetzt selbst ausprobieren ↗';article.appendChild(cta);
        function select(index){article.hidden=index===1;practice.hidden=index===0;controls.querySelectorAll('[role=tab]').forEach((b,i)=>{b.setAttribute('aria-selected',String(i===index));b.tabIndex=i===index?0:-1;});}
        controls.querySelectorAll('button').forEach((b,i)=>{b.addEventListener('click',()=>select(i));b.addEventListener('keydown',e=>{if(['ArrowLeft','ArrowRight','Home','End'].includes(e.key)){e.preventDefault();const n=e.key==='Home'?0:e.key==='End'?1:1-i;select(n);controls.querySelectorAll('button')[n].focus();}});});
        cta.addEventListener('click',()=>{select(1);controls.querySelectorAll('button')[1].focus();controls.scrollIntoView({block:'start'});});
    }
    const originals={...root.Pages};
    root.Pages.dashboard=dashboard;root.Pages.plan=plan;
    root.Pages.grafik=(container,params)=>{
        const lessons=ContentGRAF.list, task=ContentGRAF.tasks.find(t=>t.id===params?.ref), lesson=ContentGRAF.byId[task?.topic||params?.ref];
        if(lesson){
            container.innerHTML=`<header class="page-header"><a class="atlas-text-link" href="#/grafik">← Zurück ins Atelier</a><h1>${esc(task?.title||lesson.title)}</h1><p>${esc(lesson.summary||'')}</p></header><div class="lesson">${(lesson.sections||[]).map(sec=>`<section class="lesson__section"><h3>${esc(sec.h||sec.title||'')}</h3>${sec.html||''}</section>`).join('')}</div><div id="lesson-exercises"></div>`;
            if(task){
                const s=Store.load(),isDone=s.completed.some(c=>c.taskId==='grafik:'+task.id);
                const form=document.createElement('section');form.className='atlas-project-form';form.innerHTML=`${kicker('DEIN WERKSTÜCK · '+task.minutes+' MINUTEN')}<h2>Von der Idee<br> <em>zum eigenen Entwurf.</em></h2><p>Bearbeite das Projekt in deinem Gestaltungsprogramm. Halte hier deine Idee, Entscheidungen und nächsten Schritte fest.</p><label for="project-note">Deine Arbeitsnotiz</label><textarea id="project-note" rows="5" placeholder="Meine Idee, meine Entscheidungen …">${esc(s.portfolioNotes?.[task.id]||'')}</textarea><div class="row"><button class="btn btn--primary" data-save-project>Notiz speichern</button><button class="btn btn--ghost" data-complete-project>${isDone?'Wieder als offen markieren':'Projekt als abgeschlossen markieren'}</button></div><p role="status" id="project-status">${isDone?'✓ Von dir als abgeschlossen markiert.':'Dein Projekt ist offen. Öffnen zählt nicht als Abschluss.'}</p>`;
                container.appendChild(form);
                form.querySelector('[data-save-project]').addEventListener('click',()=>{Store.update(s=>{s.portfolioNotes=s.portfolioNotes||{};s.portfolioNotes[task.id]=form.querySelector('textarea').value;return s;});form.querySelector('#project-status').textContent='Arbeitsnotiz gespeichert.';});
                form.querySelector('[data-complete-project]').addEventListener('click',e=>{let done;Store.update(s=>{const id='grafik:'+task.id;done=!s.completed.some(c=>c.taskId===id);if(done)s.completed.push({taskId:id,subject:'grafik',date:new Date().toISOString()});else s.completed=s.completed.filter(c=>c.taskId!==id);return s;});e.target.textContent=done?'Wieder als offen markieren':'Projekt als abgeschlossen markieren';form.querySelector('#project-status').textContent=done?'✓ Von dir als abgeschlossen markiert.':'Projekt wieder offen.';});
                container.querySelector('.lesson').classList.add('atlas-studio-reading');
                return;
            }
            SequentialExercises.run({mount:container.querySelector('#lesson-exercises'),exercises:(lesson.exercises||[]).map(ex=>({...ex,subject:'graf'})),subject:'graf',topic:lesson.id,lessonId:lesson.id,backHref:'#/grafik',onNextUnit:()=>{location.hash='#/grafik';}});lessonWorkspace(container);return;
        }
        container.innerHTML=`<div class="atlas-studio-hero">${kicker('BAND 04 / DAS ATELIER')}<h1>Es darf<br> <em>anders</em> sein.</h1><p>Dein Raum für Farbe, Form und eigene Ideen.</p><span aria-hidden="true">✳</span></div><section class="atlas-studio-content"><div><h2>Das Handwerk.</h2>${lessons.map((l,i)=>`<a class="atlas-chapter" href="#/grafik/${l.id}"><span class="atlas-chapter-no">${String(i+1).padStart(2,'0')}</span><div><h3>${esc(l.title)}</h3><p>${esc(l.summary)}</p></div><span>↗</span></a>`).join('')}</div><aside><h2>Deine Werkstücke.</h2><p class="muted">Öffne einen Arbeitsauftrag. Fertig ist er erst, wenn du ihn selbst abschließt.</p>${ContentGRAF.tasks.map(t=>`<a class="atlas-studio-task" href="#/grafik/${t.id}"><span>${esc(t.title)}</span><small>${Store.load().completed.some(c=>c.taskId==='grafik:'+t.id)?'✓ Abgeschlossen':t.minutes+' min · Öffnen ↗'}</small></a>`).join('')}</aside></section>`;
    };
    root.Pages.fortschritt=container=>{
        const s=Store.load(),stats=s.stats||{},days=Array.from({length:28},(_,i)=>{const d=new Date();d.setDate(d.getDate()-27+i);const date=isoDate(d);return {date,n:s.activity.filter(a=>a.date===date).reduce((n,a)=>n+(Number(a.tasksDone)||0),0)};});
        container.innerHTML=head('06','Schau, wie weit<br> <em>du schon gekommen bist.</em>','Keine erfundene Prüfungsprognose. Hier siehst du, was du tatsächlich bearbeitet hast.')+`<div class="atlas-progress-ledger"><div><strong>${stats.totalAttempted||0}</strong><span>gewertete Aufgaben</span></div><div><strong>${stats.totalCorrect||0}</strong><span>davon richtig</span></div><div><strong>${stats.totalAttempted?Math.round(100*stats.totalCorrect/stats.totalAttempted)+'%':'—'}</strong><span>richtige Antworten</span></div><div><strong>${stats.streak||0}</strong><span>Tage in Folge</span></div></div><section class="atlas-library"><aside><span class="atlas-kicker">DIE LETZTEN VIER WOCHEN</span><h2>Ein kleines<br> <em>Stück jeden Tag.</em></h2><p>Ein gefülltes Feld steht für einen Tag mit Lernaktivität. Freie Tage gehören dazu.</p></aside><div class="atlas-calendar" aria-label="Lernaktivität der letzten 28 Tage">${days.map(d=>`<div class="${d.n?'is-active':''}" title="${d.date}: ${d.n} Aufgaben"><span>${dateLabel(d.date)}</span><strong>${d.n?'✳':'·'}</strong><small>${d.n?d.n+' Aufgaben':'Pause'}</small></div>`).join('')}</div></section><section><div class="atlas-section-bar"><h2>Deine Fächer. <em>Dein Stand.</em></h2><a href="#/fehler" class="atlas-text-link">Wiederholen ↗</a></div>${subjects.slice(0,3).map(sub=>{const ps=stats.perSubject?.[sub.id]||{},n=ps.attempted||0,p=n?Math.round(100*ps.correct/n):0;return `<a class="atlas-progress-subject" href="#/${sub.route}"><span class="atlas-book-symbol">${sub.motif}</span><div><h3>${sub.title}</h3><p>${n} gewertete Aufgaben · ${ps.correct||0} richtig</p><div class="progress" role="progressbar" aria-label="Richtige Antworten in ${sub.title}" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${p}"><div class="progress__fill" style="width:${p}%"></div></div></div><strong>${n?p+'%':'—'}</strong><span>↗</span></a>`;}).join('')}</section><p class="atlas-score-note">Wiederholte Bearbeitung derselben Aufgabe zählt in dieser Übersicht nicht mehrfach. Diese Zahlen beschreiben deine bisherigen Antworten, nicht deine zukünftige Prüfungsnote.</p>`;
    };
    subjects.slice(0,3).forEach(sub=>{root.Pages[sub.route]=async (container,params)=>{
        if(!params?.ref && sub.content()?.list){subjectList(container,sub);return;}
        container.dataset.learningLanguage=sub.id==='en'?'en':'de';
        await originals[sub.route](container,params);lessonWorkspace(container);
    };});
    Object.keys(root.Pages).forEach(name=>{const render=root.Pages[name];root.Pages[name]=async (container,params)=>{container.dataset.page=name;container.classList.add('atlas-page');await render(container,params);};});
})(window);
