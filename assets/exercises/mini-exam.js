/* Mini-exam / mock exam: bundles multiple sub-tasks.
   Three practice variants per subject, not complete official exam papers.
   Parts are bound DURING the exam so user answers are recorded at any time. */
(function (root) {
    const BUNDLES = {
        de: {
            'mini-exam:de-1': {
                id: 'mini-exam:de-1', title: 'Übungsklausur Deutsch – Variante 1', durationMin: 75,
                parts: [
                    { type: 'mc', topic: 'operatoren', q: 'Welcher Operator verlangt eine eigene begründete Stellungnahme?',
                      options: ['zusammenfassen', 'erörtern', 'nacherzählen', 'wiedergeben'], answer: 1, explanation: 'Erörtern verlangt eine eigene begründete Position.' },
                    { type: 'sort', topic: 'textanalyse_sachtext', items: [
                        'Einleitung: Textsorte, Quelle, Thema, Kernaussage',
                        'Hauptteil: Inhalt und Argumentation',
                        'Hauptteil: sprachliche Mittel mit Wirkung',
                        'Schluss: Intention und Fazit'
                    ], explanation: 'Schema der Sachtextanalyse.' },
                    { type: 'fill', topic: 'grammatik', text: '___ Jugendliche Informationen niedrigschwellig erhalten, ist das ein Argument für soziale Medien.',
                      answers: [['Weil', 'Da']], explanation: 'Begründung mit Konjunktor.' },
                    { type: 'error', topic: 'rechtschreibung', text: 'Wegen dem schlechten Wetter fanden die Spiele nicht statt. Er sagte, das er morgen kommt.',
                      corrections: [
                        { find: 'Wegen dem schlechten Wetter', replace: 'Wegen des schlechten Wetters', why: 'Wegen + Genitiv.' },
                        { find: 'das er morgen kommt', replace: 'dass er morgen kommt', why: 'Konjunktion „dass" (zwei s).' }
                      ] },
                    { type: 'timed-writing', topic: 'erorterung', q: 'Erörtern Sie: Sollte die Nutzung sozialer Medien für Jugendliche unter 16 Jahren eingeschränkt werden?',
                      durationMin: 60, lang: 'de', explanation: 'Schreibe eine dialektische Erörterung mit Einleitung, begründeten Pro- und Contra-Argumenten, Beispielen und abgewogenem Schluss. Trainingsumfang: etwa 230–300 Wörter.' }
                ]
            },
            'mini-exam:de-2': {
                id: 'mini-exam:de-2', title: 'Übungsklausur Deutsch – Variante 2', durationMin: 75,
                parts: [
                    { type: 'mc', topic: 'operatoren', q: 'Welcher Operator gehört zu AFB II?',
                      options: ['nennen', 'analysieren', 'erörtern', 'beurteilen'], answer: 1, explanation: 'Analysieren ist Reorganisation/Analyse.' },
                    { type: 'mc', topic: 'textanalyse_literarisch', q: 'Was untersucht eine literarische Analyse NICHT primär?',
                      options: ['Sprachbilder', 'Erzählperspektive', 'Aktienkurs der Autorin', 'Figurenkonstellation'], answer: 2, explanation: 'Aktienkurse sind wirtschaftlich, nicht literarisch.' },
                    { type: 'fill', topic: 'grammatik', q: 'Setze gliedern und beschreiben im Präsens ein.', text: 'Der Autor ___ den Roman in drei Teile. Im zweiten Teil ___ er die Hauptfigur genauer.', answers: [['gliedert'], ['beschreibt']], explanation: 'Eine Textanalyse verwendet das Präsens: gliedert und beschreibt.' },
                    { type: 'error', topic: 'rechtschreibung', text: 'Das Buch, das ich letztens gekauft habe, ist sehr spannend. Er hat sich gut erholt weil er viel geschlafen hat.', corrections: [
                        { find: 'weil er viel geschlafen hat', replace: ', weil er viel geschlafen hat', why: 'Komma vor „weil" als Nebensatz-Einleitung.' }
                    ] },
                    { type: 'timed-writing', topic: 'erorterung', q: 'Erörtern Sie, ob künstliche Intelligenz an Schulen eingesetzt werden sollte.',
                      durationMin: 60, lang: 'de', explanation: 'Pro/Contra mit Beispielen, eigene Position.' }
                ]
            },
            'mini-exam:de-3': {
                id: 'mini-exam:de-3', title: 'Übungsklausur Deutsch – Variante 3', durationMin: 75,
                parts: [
                    { type: 'mc', topic: 'textanalyse_sachtext', q: 'Was gehört typischerweise in die Einleitung einer Sachtextanalyse?',
                      options: ['Eine ausführliche eigene Meinung', 'Autor, Quelle, Textsorte, Thema, Kernaussage', 'Eine wörtliche Nacherzählung', 'Eine Liste aller Argumente'], answer: 1, explanation: 'Knappe, sachliche Einleitung.' },
                    { type: 'match', topic: 'grammatik', title: 'Begriff und Beispiel', pairs: [['Subjekt','Die Schülerin'],['Prädikat','liest'],['Dativobjekt','dem Freund'],['Akkusativobjekt','den Roman']] },
                    { type: 'cloze', topic: 'textanalyse_literarisch', text: 'Eine Erzählung aus der Sicht einer beteiligten Ich-Figur nutzt die ___.', answers: [['Ich-Perspektive']], explanation: 'Eine Ich-Figur erzählt aus ihrer eigenen Sicht.' },
                    { type: 'timed-writing', topic: 'materialgestuetztes_schreiben', q: 'Verfasse einen begründeten Text: Wie könnte der Schulweg umweltfreundlicher werden? Nutze beide Materialien.', context: 'Eigene Übungsmaterialien, keine Studie. Material A: Eine Schülerin fährt Rad und wünscht sich sichere Radwege. Material B: Ein Schüler hat einen langen Schulweg. Sein Bus fährt nur einmal pro Stunde. Er wünscht sich eine Verbindung passend zum Unterrichtsbeginn.',
                      durationMin: 60, lang: 'de', explanation: 'Material sinnvoll einbinden, eigene Meinung kennzeichnen.' }
                ]
            }
        },
        en: {
            'mini-exam:en-1': {
                id: 'mini-exam:en-1', title: 'English practice simulation – version 1', durationMin: 45,
                parts: [
                    { type: 'mc', topic: 'operators', q: 'Which operator requires a personal opinion with reasons?',
                      options: ['outline', 'comment on', 'summarise', 'list'], answer: 1, explanation: '„Comment on" asks for your opinion, supported by reasons.' },
                    { type: 'match', topic: 'formal_informal', pairs: [
                        ['want', 'would like'],
                        ['get', 'receive'],
                        ['a lot of', 'numerous'],
                        ['don\'t', 'do not']
                    ], explanation: 'These are possible more formal alternatives. Check the meaning in context; contractions are not forbidden in every formal text.' },
                    { type: 'fill', topic: 'grammar_tenses', q: 'Complete the second conditional with have and learn.', text: 'If I ___ more time, I ___ Spanish.',
                      answers: [['had'], ['would learn']], explanation: 'Conditional Type 2.' },
                    { type: 'error', topic: 'grammar_tenses', text: 'Yesterday I have went to the library and read a book.',
                      corrections: [
                        { find: 'have went', replace: 'went', why: 'Yesterday is a finished past time: use the past simple went.' }
                      ] },
                    { type: 'timed-writing', topic: 'comment', q: 'Comment on the following statement: “Social media does more harm than good to teenagers.” (about 200 words)',
                      durationMin: 60, lang: 'en', explanation: 'Reference the statement, give reasons, conclude with your opinion.' }
                ]
            },
            'mini-exam:en-2': {
                id: 'mini-exam:en-2', title: 'English practice simulation – version 2', durationMin: 45,
                parts: [
                    { type: 'mc', topic: 'grammar_tenses', q: 'Choose the past simple sentence reporting a completed trip last summer.',
                      options: ['I have been to Italy last summer.', 'I went to Italy last summer.', 'I have went to Italy last summer.', 'I was going to Italy last summer.'], answer: 1, explanation: 'With a finished time, use Past Simple.' },
                    { type: 'fill', topic: 'grammar_tenses', q: 'Use study and pass in the third conditional to imagine a different result in the past.', text: 'If she ___ harder, she ___ the exam.', answers: [['had studied'], ['would have passed']], explanation: 'Conditional Type 3.' },
                    { type: 'mc', topic: 'mediation', q: 'What is the main goal of mediation?',
                      options: ['Translate word for word', 'Adapt content for a different audience', 'Give your own opinion', 'Invent new information'], answer: 1, explanation: 'Mediation adapts content and register.' },
                    { type: 'sort', topic: 'comment', items: ['Introduction: reference the text and your opinion', 'Main body: reasons and examples', 'Conclusion: summary and final thought'], explanation: 'Order a comment.' },
                    { type: 'timed-writing', topic: 'mediation', q: 'Use the information below to write an English email for exchange students (80–100 words). Explain the invitation and the change of date.', context: 'Original practice notice: Our design class will hold an exhibition in the school studio. The event was planned for Thursday, but it will now take place on Friday from 14:00 to 17:00. Entry is free. Visitors can see posters, drawings and photographs. Please arrive by bus or bicycle if possible. No booking is needed. Students will answer questions about their work.',
                      durationMin: 60, lang: 'en', explanation: 'Adapt audience, keep facts, neutral tone.' }
                ]
            },
            'mini-exam:en-3': {
                id: 'mini-exam:en-3', title: 'English practice simulation – version 3', durationMin: 45,
                parts: [
                    { type: 'mc', topic: 'reading', q: 'When reading an article, the best first step is to …',
                      options: ['Look at the pictures', 'Skim the text to find the main claim', 'Write your own opinion', 'Translate the article'], answer: 1, explanation: 'Skim first to understand structure.' },
                    { type: 'match', topic: 'vocabulary_themes', title: 'Word and synonym', pairs: [['big','enormous'],['start','commence'],['end','conclude'],['show','demonstrate']] },
                    { type: 'error', topic: 'grammar_tenses', text: 'If I would have more time, I will learn Spanish. She don\'t like coffee.', corrections: [
                        { find: 'If I would have more time', replace: 'If I had more time', why: 'Type 2: „If + past simple".' },
                        { find: 'will learn', replace: 'would learn', why: 'Type 2 main clause.' },
                        { find: 'don\'t', replace: 'doesn\'t', why: 'Third person singular needs -s.' }
                    ] },
                    { type: 'timed-writing', topic: 'summary', q: 'Summarise the practice text in 40–60 words. Keep your opinion out of the summary.', context: 'A design class wanted to reduce paper waste during its exhibition. At first, students planned to print a new programme for every visitor. They then decided to display a large programme near the entrance and share a digital version. A few printed copies were still available for visitors who needed them. When a workshop time changed, the class updated the display and the digital version instead of printing everything again. The students did not measure the total environmental impact, so they reported only the reduction in printed copies.',
                      durationMin: 60, lang: 'en', explanation: 'Keep the main decision, its reason and its result. Do not add an environmental claim that the text does not support.' }
                ]
            }
        },
        math: {
            'mini-exam:math-1': {
                id: 'mini-exam:math-1', title: 'Übungsklausur Mathematik – Variante 1', durationMin: 20,
                parts: [
                    { type: 'mc', topic: 'funktionen', q: 'Welche Funktion ist achsensymmetrisch zur y-Achse?',
                      options: ['f(x) = x³', 'f(x) = sin(x)', 'f(x) = x²', 'f(x) = eˣ'], answer: 2, explanation: 'Gerade Exponenten → achsensymmetrisch.' },
                    { type: 'math-input', topic: 'funktionen', q: 'Löse x² - 5x + 6 = 0. Gib die kleinere Lösung an.', answers: ['2'], explanation: 'x = 2 oder x = 3.' },
                    { type: 'math-input', topic: 'differentialrechnung', q: 'Ableitung von f(x) = 3x² an der Stelle x = 2. f′(2) = ?', answers: ['12'], explanation: 'f′(x) = 6x → f′(2) = 12.' },
                    { type: 'fill', topic: 'lineare_funktionen', q: 'Steigung der Geraden durch (1,2) und (4,8).', text: 'm = ___', answers: [['2']], explanation: 'm = (8-2)/(4-1) = 2.' },
                    { type: 'mc', topic: 'trigonometrie', q: 'sin(30°) = ?', options: ['0','0,5','1','√2/2'], answer: 1, explanation: 'sin(30°) = 0,5.' },
                    { type: 'math-input', topic: 'integralrechnung', q: 'Berechne das Integral von f(x)=3x² im Intervall [0;2].', answers:['8'], explanation:'Eine Stammfunktion ist F(x)=x³. F(2)−F(0)=8.' },
                    { type: 'math-input', topic: 'exponentialfunktionen', q: 'N(t)=80·0,5^(t/3). Nach wie vielen Stunden sind noch 20 Einheiten vorhanden?', answers:['6'], explanation:'20/80=1/4=0,5²; t/3=2, daher t=6 Stunden.' }
                ]
            },
            'mini-exam:math-2': {
                id: 'mini-exam:math-2', title: 'Übungsklausur Mathematik – Variante 2', durationMin: 20,
                parts: [
                    { type: 'mc', topic: 'quadratische_funktionen', q: 'Wie viele Nullstellen hat f(x) = x² - 4?', options: ['0','1','2','3'], answer: 2, explanation: 'x = ±2.' },
                    { type: 'math-input', topic: 'quadratische_funktionen', q: 'Löse x² - 9 = 0. Gib die positive Lösung an.', answers: ['3'], explanation: 'x = 3.' },
                    { type: 'mc', topic: 'ableitungsregeln', q: 'Ableitung von f(x) = sin(x)?', options: ['cos(x)','-cos(x)','-sin(x)','tan(x)'], answer: 0, explanation: 'd/dx sin(x) = cos(x).' },
                    { type: 'mc', topic: 'integralrechnung', q: '∫ 2x dx = ?', options: ['2','x²','x² + C','2x² + C'], answer: 2, explanation: 'Stammfunktion + Konstante.' },
                    { type: 'math-input', topic: 'integralrechnung', q: 'Bestimme die Fläche unter f(x) = 2x von 0 bis 3.', answers: ['9'], explanation: '∫₀³ 2x dx = x²|₀³ = 9.' },
                    { type: 'mc', topic: 'lineare_gleichungssysteme', q: 'Löse x + y = 3 und x − y = 1. Wie groß ist x?', options: ['0','1','2','-1'], answer: 2, explanation: 'Addieren: 2x = 4, also x = 2.' }
                ]
            },
            'mini-exam:math-3': {
                id: 'mini-exam:math-3', title: 'Übungsklausur Mathematik – Variante 3', durationMin: 20,
                parts: [
                    { type: 'mc', topic: 'logarithmus', q: 'log_2(8) = ?', options: ['2','3','4','8'], answer: 1, explanation: '2³ = 8.' },
                    { type: 'fill', topic: 'logarithmus', q: 'log(100) (Basis 10) = ___', text: 'log(100) = ___', answers: [['2']], explanation: '10² = 100.' },
                    { type: 'mc', topic: 'trigonometrie', q: 'cos(0°) = ?', options: ['0','0,5','1','-1'], answer: 2, explanation: 'cos(0°) = 1.' },
                    { type: 'mc', topic: 'lineare_funktionen', q: 'Welchen Wert hat f(x) = 2x + 3 bei x = 4?', options: ['5','11','7','10'], answer: 1, explanation: '2 · 4 + 3 = 11.' },
                    { type: 'mc', topic: 'lineare_funktionen', q: 'Bestimme die Nullstelle von f(x) = 2x − 1.', options: ['1/6','1/3','1/2','2/3'], answer: 2, explanation: '2x − 1 = 0 ergibt x = 1/2.' },
                    { type: 'mc', topic: 'lineare_funktionen', q: 'Welche Steigung hat f(x) = 5x + 10?', options: ['1','5','10','0,5'], answer: 1, explanation: 'Bei f(x) = mx + b ist m die Steigung: hier 5.' }
                ]
            }
        }
    };

    for(const subject of ['de','en'])for(const [i,b] of Object.values(BUNDLES[subject]).entries()){
        const p=b.parts.find(p=>p.type==='timed-writing');p.modelAnswer=root.ExamModels?.[subject+'-'+(i+1)]||p.explanation;
        if(subject==='de'&&i>0)p.q+=' (etwa 230–300 Wörter)';
    }
    // Map final exam ref used in the plan to a specific variant.
    function resolveBundleId(subject, variant) {
        const v = variant || 1;
        return 'mini-exam:' + subject + '-' + v;
    }
    function listBundles(subject) {
        return [...Object.values(BUNDLES[subject] || {}), ...({de:root.DeutschB1Exams,en:root.EnglishB1Exams,math:root.MathExtendedExams}[subject]||[])];
    }
    function buildBundle(subject, variant) {
        if (!BUNDLES[subject]) return null;
        const id = resolveBundleId(subject, variant);
        return listBundles(subject).find(b=>b.id===id) || listBundles(subject)[0];
    }

    let cleanupActive = null;
    function render(ex) {
        const bundle=buildBundle(ex.subject,ex.variant||1),en=ex.subject==='en';
        if(!bundle)return '<p>Keine Übung verfügbar.</p>';
        const t=(de,english)=>en?english:de;
        return `<div class="exercise" data-bundle-id="${bundle.id}" lang="${en?'en':'de'}">
          <h2>${escapeAttr(bundle.title)}</h2><p>${bundle.description?escapeAttr(bundle.description):t('Eigene Trainingsaufgaben, keine vollständige offizielle Prüfungsarbeit. Lösungen erscheinen nach der Abgabe.','Original practice tasks, not a complete official exam paper. Answers appear after submission.')}</p>
          <p>${bundle.durationMin} min · ${bundle.parts.length} ${t('Aufgaben','tasks')} · ${bundle.parts.reduce((n,p)=>n+Assessment.score(p,null,ex.subject).max,0)} ${t('Trainingspunkte · Eigene Übungswertung, keine Schulnote.','practice points · Local practice scoring, not an official grade.')}</p><div class="timer" data-display aria-label="${t('Verbleibende Zeit','Time remaining')}"></div><p data-status role="status"></p>
          <div class="exercise__actions"><button class="btn btn--primary" data-action="start">${t('Simulation starten','Start simulation')}</button><button class="btn btn--ghost" data-action="finish" disabled>${t('Abgeben und auswerten','Submit and review')}</button></div>
          <p data-progress role="status"></p><nav data-exam-nav class="atlas-tool-actions"></nav><div data-parts></div><div data-result hidden></div><button class="btn" data-action="retry" hidden>${t('Neuer Versuch','New attempt')}</button></div>`;
    }
    function formatTime(s){return String(Math.floor(s/60)).padStart(2,'0')+':'+String(s%60).padStart(2,'0');}
    function isCorrect(){return null;}
    function escapeAttr(s){return ExerciseEngine.escapeHtml(s==null?'':s);}
    function draftKey(id){return Assessment.key(id);}
    function loadDraft(id){try{const d=JSON.parse(localStorage.getItem(draftKey(id))||'null');return d&&Array.isArray(d.answers)&&(d.deadline===null||Number.isFinite(d.deadline))&&(d.startedAt===null||Number.isFinite(d.startedAt))?d:null;}catch{return null;}}
    function bind(container,ex,onResult){
        if(cleanupActive)cleanupActive();
        const bundle=buildBundle(ex.subject,ex.variant||1),rootEl=container.querySelector('[data-bundle-id]');
        if(!bundle||!rootEl)return;
        const en=ex.subject==='en',t=(de,english)=>en?english:de,parts=rootEl.querySelector('[data-parts]'),status=rootEl.querySelector('[data-status]');
        const start=rootEl.querySelector('[data-action=start]'),submit=rootEl.querySelector('[data-action=finish]'),display=rootEl.querySelector('[data-display]');
        const storageKey=draftKey(bundle.id),draft=loadDraft(bundle.id)||{},total=bundle.durationMin*60;
        const touched=new Set(Array.isArray(draft.touched)?draft.touched:[]);
        let deadline=draft.deadline||null,startedAt=draft.startedAt||null,finished=false,interval=null;
        let attempt=null;
        let answers=bundle.parts.map((p,i)=>{const a=draft.answers?.[i];if(p.type==='sort')return Array.isArray(a)&&a.length===p.items.length&&new Set(a).size===p.items.length&&a.every(x=>p.items.includes(x))?a:[...p.items.slice(1),p.items[0]];if(p.type==='mc')return Number.isInteger(a)&&a>=0&&a<p.options.length?a:null;if(p.type==='match')return a&&typeof a==='object'&&!Array.isArray(a)?a:null;if(['fill','cloze','error'].includes(p.type))return Array.isArray(a)?a.map(x=>typeof x==='string'?x:''):null;return typeof a==='string'?a:null;});
        const label=p=>p.q||p.title||t('Bearbeite die Aufgabe.','Complete the task.');
        function controls(p,i){
            const a=answers[i];
            if(p.type==='mc')return p.options.map((v,j)=>`<label class="exam-option"><input type="radio" name="exam-${i}" data-answer="${j}" ${Number(a)===j&&a!==null?'checked':''}><span>${escapeAttr(v)}</span></label>`).join('');
            if(p.type==='sort')return `<p>${t('Bringe die Schritte in die richtige Reihenfolge.','Put the steps in the correct order.')}</p><ol class="exam-sort">${a.map((v,j)=>`<li><span>${escapeAttr(v)}</span><button type="button" class="btn btn--sm" data-up="${j}" aria-label="${t('Nach oben','Move up')}">↑</button><button type="button" class="btn btn--sm" data-down="${j}" aria-label="${t('Nach unten','Move down')}">↓</button></li>`).join('')}</ol>`;
            if(p.type==='match')return p.pairs.map((pair,j)=>`<label class="exam-option"><span>${escapeAttr(pair[0])}</span><select data-match="${j}" aria-label="${escapeAttr(pair[0])}"><option value="">${t('Wählen …','Choose …')}</option>${p.pairs.map((_,k)=>p.pairs.length-1-k).map(k=>`<option value="${k}" ${a?.['L'+j]==='L'+k?'selected':''}>${escapeAttr(p.pairs[k][1])}</option>`).join('')}</select></label>`).join('');
            if(['fill','cloze'].includes(p.type))return '<p class="cloze-text">'+p.text.split('___').map((v,j)=>escapeAttr(v)+(j<p.answers.length?`<input class="input" data-blank="${j}" aria-label="${t('Lücke','Gap')} ${j+1}" value="${escapeAttr(a?.[j]||'')}">`:'')).join('')+'</p>';
            if(p.type==='error')return `<p>${escapeAttr(p.text)}</p>`+p.corrections.map((c,j)=>`<label class="exam-option"><span>${escapeAttr(c.find)}</span><input class="input" data-correction="${j}" aria-label="${t('Korrektur','Correction')} ${j+1}" value="${escapeAttr(a?.[j]||'')}"></label>`).join('');
            if(p.type==='math-input')return `<input class="input" data-text aria-label="${t('Ergebnis','Answer')}" value="${escapeAttr(a||'')}">`;
            return `<textarea class="textarea" data-text rows="8" aria-label="${t('Deine Antwort','Your response')}">${escapeAttr(a||'')}</textarea>`;
        }
        function draw(){parts.innerHTML=bundle.parts.map((p,i)=>`${p.section?`<h2 class="exam-section-title">${escapeAttr(p.section)}</h2>`:''}<fieldset class="exam-part" data-part="${i}" ${!deadline||finished?'disabled':''}><legend>${t('Aufgabe','Task')} ${i+1} · ${Assessment.score(p,null,ex.subject).max} ${t('Punkte','points')}</legend><h3>${escapeAttr(label(p))}</h3>${p.context?`<div class="exam-source-text">${escapeAttr(p.context)}</div>`:''}${Assessment.written(p)?`<details><summary>${t('Bewertungskriterien','Assessment criteria')+' · '+Assessment.rubric(p,ex.subject).length*3+' '+t('Punkte','points')}</summary>${Assessment.criteriaHTML(p,ex.subject)}</details>`:''}${controls(p,i)}</fieldset>`).join('');}
        function progress(){const count=bundle.parts.filter((p,i)=>p.type==='sort'?touched.has(i):Array.isArray(answers[i])?answers[i].length===(p.answers||p.corrections||[]).length&&answers[i].every(x=>String(x).trim()):p.type==='match'?p.pairs.every((_,j)=>answers[i]?.['L'+j]):answers[i]!==null&&String(answers[i]).trim()).length;
            rootEl.querySelector('[data-progress]').textContent=`${count} / ${bundle.parts.length} ${t('Aufgaben mit Eingaben · leere Antworten erhalten keine automatischen Punkte.','tasks with responses · empty answers receive no automatic points.')}`;
            if(!rootEl.querySelector('[data-exam-nav]').children.length)rootEl.querySelector('[data-exam-nav]').innerHTML=bundle.parts.map((p,i)=>`<button type="button" class="btn btn--sm" data-jump="${i}">${i+1}</button>`).join('');}
        rootEl.querySelector('[data-exam-nav]').addEventListener('click',e=>{const b=e.target.closest('[data-jump]');if(b){const f=parts.querySelector(`[data-part="${b.dataset.jump}"]`);f.scrollIntoView({block:'start'});f.setAttribute('tabindex','-1');f.focus();}});
        function remaining(){return deadline?Math.max(0,Math.ceil((deadline-Date.now())/1000)):total;}
        function save(){if(finished)return;progress();try{localStorage.setItem(storageKey,JSON.stringify({answers,deadline,startedAt,touched:[...touched],savedAt:Date.now()}));}catch{status.textContent=t('Speichern nicht möglich. Bleibe auf dieser Seite.','Could not save. Stay on this page.');}}
        function stop(){clearInterval(interval);interval=null;save();}
        cleanupActive=stop;
        function update(){display.textContent=formatTime(remaining());if(!rootEl.isConnected){stop();return;}if(deadline&&remaining()===0&&!finished)finish();}
        function begin(){if(finished||interval)return;if(!deadline){startedAt=Date.now();deadline=startedAt+total*1000;}start.disabled=true;submit.disabled=false;parts.querySelectorAll('fieldset').forEach(f=>f.disabled=false);status.textContent=t('Läuft · Antworten werden gespeichert.','In progress · Answers are saved.');save();update();if(!finished)interval=setInterval(update,1000);}
        function capture(event){const el=event.target,field=el.closest('[data-part]');if(!field||!deadline||finished)return;const i=Number(field.dataset.part);touched.add(i);
            if(el.matches('[data-answer]'))answers[i]=Number(el.dataset.answer);
            else if(el.matches('[data-match]')){answers[i]=answers[i]||{};answers[i]['L'+el.dataset.match]=el.value===''?'':'L'+el.value;}
            else if(el.matches('[data-blank],[data-correction]')){answers[i]=answers[i]||[];answers[i][Number(el.dataset.blank??el.dataset.correction)]=el.value;}
            else if(el.matches('[data-text]'))answers[i]=el.value;
            save();
        }
        parts.addEventListener('input',capture);parts.addEventListener('change',capture);
        parts.addEventListener('click',event=>{const button=event.target.closest('[data-up],[data-down]');if(!button||!deadline||finished)return;const i=Number(button.closest('[data-part]').dataset.part),from=Number(button.dataset.up??button.dataset.down),to=from+(button.hasAttribute('data-up')?-1:1);if(to<0||to>=answers[i].length)return;touched.add(i);[answers[i][from],answers[i][to]]=[answers[i][to],answers[i][from]];save();draw();parts.querySelector(`[data-part="${i}"] [data-${button.hasAttribute('data-up')?'up':'down'}="${to}"]`)?.focus();});
        function showResult(a){attempt=a;const result=rootEl.querySelector('[data-result]');result.hidden=false;result.innerHTML=Assessment.resultHTML(a);Assessment.bindReview(result,a);rootEl.querySelector('[data-action=retry]').hidden=false;}
        function finish(){
            if(finished||!deadline)return;
            let source='',block=[];const results=bundle.parts.map((p,i)=>{if(p.section)block=[];if(p.context&&(!Assessment.written(p)||ex.subject!=='math'))source=p.context;if(ex.subject==='math'&&!Assessment.written(p))block.push(p.q+'\nEingegebenes Ergebnis: '+(answers[i]??'—'));return {...Assessment.score(p,p.type==='sort'&&!touched.has(i)?null:answers[i],ex.subject),context:source+(ex.subject==='math'?'\n'+block.join('\n'):'')};});
            const objective=results.filter(r=>r.correct!==null),correct=objective.filter(r=>r.correct).length,elapsed=Math.min(total,Math.max(0,Math.round((Date.now()-startedAt)/1000)));
            const a={id:'exam-'+startedAt+'-'+bundle.id,subject:ex.subject,bundleId:bundle.id,title:bundle.title,date:new Date().toISOString(),elapsedSec:elapsed,parts:bundle.parts.length,answers:JSON.parse(JSON.stringify(answers)),results,objectiveCorrect:correct,objectiveTotal:objective.length};
            Store.update(s=>{s.examAttempts=s.examAttempts||[];if(!s.examAttempts.some(x=>x.id===a.id)){s.examAttempts.unshift(a);if(root.Learner)results.forEach((r,i)=>{if(typeof r.correct==='boolean')Learner.record(s,{subject:ex.subject,topic:r.topic||'reading',type:r.type,correct:r.correct,exerciseId:a.id+'-'+i,question:r.question});});}return s;});
            if(!Store.load().examAttempts?.some(x=>x.id===a.id)){status.textContent=t('Abgabe konnte nicht gespeichert werden. Kopiere deine Antworten und versuche es erneut.','Submission could not be saved. Copy your answers and try again.');return;}
            finished=true;clearInterval(interval);interval=null;cleanupActive=null;submit.disabled=true;start.disabled=true;parts.querySelectorAll('fieldset').forEach(f=>f.disabled=true);
            try{localStorage.removeItem(storageKey);}catch{}
            showResult(a);status.textContent=t('Abgegeben · Antworten und Ergebnis gespeichert.','Submitted · Answers and results saved.');if(onResult)onResult(null);
            rootEl.dispatchEvent(new CustomEvent('exam-saved',{bubbles:true}));
        }
        rootEl.querySelector('[data-action=retry]').addEventListener('click',()=>{finished=false;attempt=null;deadline=null;startedAt=null;touched.clear();answers=bundle.parts.map(p=>p.type==='sort'?[...p.items.slice(1),p.items[0]]:null);rootEl.querySelector('[data-result]').hidden=true;rootEl.querySelector('[data-action=retry]').hidden=true;start.disabled=false;submit.disabled=true;status.textContent=t('Neuer Versuch bereit. Bisherige Ergebnisse bleiben im Verlauf.','New attempt ready. Previous results remain in your history.');draw();save();update();});
        start.addEventListener('click',begin);submit.addEventListener('click',finish);draw();progress();if(deadline)begin();else update();
    }
    root.Exercises = root.Exercises || {};
    root.Exercises['mini-exam'] = { render, isCorrect, bind, buildBundle, listBundles };
    root.Exercises['mock-exam'] = root.Exercises['mini-exam'];
})(window);
