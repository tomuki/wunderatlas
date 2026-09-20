const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict'),{JSDOM}=require('jsdom');
const base=path.resolve(__dirname,'..'),dom=new JSDOM(fs.readFileSync(path.join(base,'index.html'),'utf8'),{url:'http://localhost/',runScripts:'outside-only'}),w=dom.window;
w.matchMedia=()=>({matches:false});w.scrollTo=()=>{};w.HTMLElement.prototype.scrollIntoView=()=>{};
for(const tag of w.document.querySelectorAll('script[src]')){const src=tag.getAttribute('src');if(!src.startsWith('assets/')||['assets/app.js','assets/auth.js'].includes(src))continue;w.eval(fs.readFileSync(path.join(base,src),'utf8'));if(src.endsWith('content-extra.js'))w.ContentExtras.apply();}
const P=w.PracticeSystem,flat=p=>p.weeks.flatMap(w=>w.days.flatMap(d=>d.tasks));
(async()=>{const state=w.Store.load();assert.equal(P.tasks.length,46);assert.equal(new Set(P.tasks.map(t=>t.id)).size,46);
for(const subject of ['de','en','math','grafik'])assert.ok(P.tasks.filter(t=>t.subject===subject).length>=4);
assert.ok(new Set(P.tasks.map(t=>t.format)).size>=10);
for(const t of P.tasks){assert.equal(t.steps.length,t.brief?5:3);assert.ok(t.theory.length>200);assert.ok(t.hint.length>100);assert.equal(t.rubric.length,4);assert.ok(!/[\u0400-\u04ff]/.test(JSON.stringify(t)));}
let simulated={...state,profile:{...state.profile,hoursPerWeek:3,sessionLengthMin:40,availableDays:[0,2,4]}};
for(let day=0;day<230;day+=7){const d=new Date(2026,8,14+day,12),date=d.toISOString().slice(0,10),plan=P.build(simulated,date);assert.equal(plan.weeks.length,4);assert.ok(flat(plan).length>0,'continues after 200 days');for(const week of plan.weeks){assert.ok(week.days.reduce((n,d)=>n+d.tasks.reduce((s,t)=>s+t.durationMin,0),0)<=180);for(const d of week.days){assert.ok(d.tasks.reduce((n,t)=>n+t.durationMin,0)<=40);if(![0,2,4].includes((new Date(d.date+'T12:00:00').getDay()+6)%7))assert.equal(d.tasks.length,0);}}assert.equal(new Set(flat(plan).map(t=>t.id)).size,flat(plan).length);simulated.plan=plan;}
assert.equal(flat(P.build({...state,profile:{...state.profile,availableDays:[]}})).length,0);
assert.equal(flat(P.build({...state,profile:{...state.profile,hoursPerWeek:0}})).length,0);
const weak=P.build({...state,profile:{...state.profile,weakTopics:['en-write'],formatPrefs:['formal']},plan:null},'2026-09-14');assert.equal(flat(weak)[0].subject,'en');assert.match(flat(weak)[0].reason,/unsicher/);
const mastered={...state,practiceWork:{'gr-identity':{completedAt:'2026-01-01',stages:{0:{completedAt:'x'},1:{completedAt:'x'},2:{completedAt:'x'}}}}};assert.ok(!flat(P.build(mastered,'2026-09-14')).some(t=>t.assignmentId==='gr-identity'));
const due={...state,practiceWork:{'de-summary':{completedAt:'2026-09-01',nextReview:'2026-09-10',rating:1,stages:{0:{completedAt:'x'},1:{completedAt:'x'},2:{completedAt:'x'}}}}};assert.ok(flat(P.build(due,'2026-09-14')).some(t=>t.assignmentId==='de-summary'&&t.review));
assert.equal(P.normalise({weakTopics:{de:['grammatik']}}).weakTopics[0],'de/grammatik');assert.equal(P.normalise({levelMATH:'A2'}).mathReadiness,'foundation');
assert.equal(P.support(P.normalise({levelEN:'B1'}),{},P.byId['en-comment']),true);assert.equal(P.support(P.normalise({levelEN:'B2'}),{},P.byId['en-comment']),false);
const mount=w.document.querySelector('#page-root');const before=JSON.stringify(w.Store.load().stats);
for(const t of P.tasks){await w.Pages.praxis(mount,{ref:t.id});assert.equal(mount.querySelectorAll('[data-stage]').length,t.steps.length);assert.ok(mount.querySelector('blockquote'));if(t.subject==='en')assert.ok(!/Aufgabe|Lösung|Selbsteinschätzung|Verstehen/.test(mount.textContent));}
await w.Pages.praxis(mount,{ref:'en-comment'});let a=mount.querySelector('[data-answer]');a.value='My own argument';a.dispatchEvent(new w.Event('input'));await w.Pages.praxis(mount,{ref:'en-comment'});assert.equal(mount.querySelector('[data-answer]').value,'My own argument');
P.finishStage('en-comment',0,'Evidence-based argument','I revised the counterargument',2);P.finishStage('en-comment',0,'Other','Other',3);assert.equal(w.Store.load().practiceWork['en-comment'].stages[0].rating,2);assert.equal(JSON.stringify(w.Store.load().stats),before,'self-assessment does not inflate correctness');
await w.Pages.plan(mount);assert.ok(mount.querySelector('a[href^="#/praxis/"]'));assert.ok(mount.textContent.includes('Neues Thema')||mount.textContent.includes('Fortsetzung'));
await w.Pages.onboarding(mount);for(let i=0;i<3;i++)mount.querySelector('#o-next').click();assert.ok(mount.textContent.includes('Stärken'));
console.log('PASS: 46 works / 170 stages, 230-day rolling simulation, budgets, days, preferences, review, completed projects, language, drafts, honest self-assessment, onboarding');dom.window.close();})().catch(e=>{console.error(e);dom.window.close();process.exitCode=1;});
