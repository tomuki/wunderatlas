const {JSDOM}=require('jsdom');
const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict');
const base=path.resolve(__dirname,'..');
const html=fs.readFileSync(path.join(base,'index.html'),'utf8');
const dom=new JSDOM(html,{url:'http://localhost/',runScripts:'outside-only'}),w=dom.window;
w.matchMedia=()=>({matches:false});w.scrollTo=()=>{};w.HTMLElement.prototype.scrollIntoView=function(){};
const errors=[];w.console.error=(...args)=>errors.push(args.join(' '));
for(const script of w.document.querySelectorAll('script[src]')){
 const src=script.getAttribute('src');if(!src.startsWith('assets/')||src==='assets/app.js'||src==='assets/auth.js')continue;
 w.eval(fs.readFileSync(path.join(base,src),'utf8'));
 if(src.endsWith('content-extra.js'))w.ContentExtras.apply();
}
w.Store.update(s=>{s.plan=w.PlanTemplate.generate(s.profile);return s;});
const mount=w.document.querySelector('#page-root');
(async()=>{
 let count=0;
 for(const route of Object.keys(w.Pages)){
   await w.Pages[route](mount,{});
   assert.ok(mount.querySelector('h1'),route+' has heading');
   assert.ok(!mount.textContent.includes('undefined'),route+' no undefined text');count++;
 }
 for(const [route,ref] of [['deutsch','operatoren'],['englisch','operators'],['mathematik','lineare_funktionen'],['grafik','typografie'],['grafik','g-typ-1']]){
   await w.Pages[route](mount,{ref});assert.ok(mount.querySelector('h1'),route+' detail');count++;
 }
 const fresh=[['englisch','present_continuous_vlada'],['englisch','ing_spelling_vlada'],['englisch','perfect_vlada'],['grafik','valena_logo'],['grafik','valena_carousel'],['englisch','sustainable_design_b1']];
 for(const [route,ref] of fresh){
   await w.Pages[route](mount,{ref});
   const reading=mount.querySelector('#atlas-reading'),practice=mount.querySelector('#lesson-exercises');
   assert.ok(reading && !reading.hidden,ref+' opens explanation first');
   assert.ok(practice.hidden,ref+' practice remains available behind tab');
   assert.ok(reading.textContent.length>1800,ref+' has substantive explanation');
   assert.equal(reading.querySelectorAll('.atlas-recall').length>=4,true,ref+' recall questions');
   reading.querySelector('.atlas-read-cta').click();
   assert.equal(practice.hidden,false,ref+' practice CTA works');
   assert.ok(practice.querySelector('.exercise'),ref+' exercise rendered');count++;
 }
 assert.equal(w.VladaLearningSets.length,6);
 assert.equal(w.VladaLearningSets.reduce((n,s)=>n+s.cards.length,0),26);
 assert.equal(new Set(w.VladaLearningSets.flatMap(s=>s.cards.map(c=>c.id))).size,26);
 // The guided lab and writing draft must never award exercise points.
 await w.Pages.englisch(mount,{ref:'sustainable_design_b1'});
 const attempts=w.Store.load().stats.totalAttempted;
 assert.equal(mount.querySelectorAll('[data-argument-step]:not([hidden])').length,1);
 for(let i=0;i<3;i++)mount.querySelector('[data-step-next]').click();
 assert.equal(mount.querySelectorAll('[data-argument-step]:not([hidden])').length,4);
 assert.ok(mount.querySelector('[data-step-next]').disabled);
 mount.querySelector('[data-reason="circular"]').click();
 assert.ok(mount.querySelector('[data-reason-feedback]').textContent.includes('Good'));
 mount.querySelector('[data-step-reset]').click();
 assert.equal(mount.querySelectorAll('[data-argument-step]:not([hidden])').length,1);
 assert.equal(mount.querySelectorAll('[data-reason][aria-pressed=true]').length,0);
 const draft=mount.querySelector('#atlas-comment-text');
 draft.value='I prefer a digital invitation and a printed poster.';
 draft.dispatchEvent(new w.Event('input'));
 mount.querySelector('[data-criterion]').click();
 mount.querySelector('[data-save-draft]').click();
 await w.Pages.englisch(mount,{});
 assert.ok(mount.querySelector('a[href="#/englisch/sustainable_design_b1"]'));
 await w.Pages.englisch(mount,{ref:'sustainable_design_b1'});
 assert.equal(mount.querySelector('#atlas-comment-text').value,draft.value);
 assert.equal(mount.querySelector('[data-criterion]').checked,true);
 mount.querySelector('#atlas-comment-text').dispatchEvent(new w.Event('input'));
 assert.equal(mount.querySelector('[data-criterion]').checked,false,'editing invalidates old self-check');
 assert.equal(w.Store.load().stats.totalAttempted,attempts);
 const unit=w.ContentEN.byId.sustainable_design_b1;
 assert.equal(unit.exercises.length,6);
 for(const ex of unit.exercises){
   const answer=ex.type==='mc'?ex.answer:ex.type==='sort'?ex.items:ex.answers.map(a=>a[0]);
   assert.ok(w.Exercises[ex.type].isCorrect(ex,answer),ex.id+' accepts model');
   const wrong=ex.type==='mc'?(ex.answer+1)%ex.options.length:ex.type==='sort'?[...ex.items].reverse():ex.answers.map(()=>'?');
   assert.equal(w.Exercises[ex.type].isCorrect(ex,wrong),false,ex.id+' rejects wrong answer');
 }
 await w.Pages.lernkarten(mount,{});
 assert.ok(mount.textContent.includes('Have had'), 'new sets appear in flashcards');
 assert.ok(mount.textContent.includes('Valena'), 'design sets appear in flashcards');
 assert.ok(mount.textContent.includes('Print or digital?'), 'B1 set appears in flashcards');
 assert.equal(errors.length,0,errors.join('\n'));
 // Every generated day must agree with its displayed weekday in local time.
 for(const week of w.Store.load().plan.weeks)for(const day of week.days){
   const weekday=['So','Mo','Di','Mi','Do','Fr','Sa'][new Date(day.date+'T12:00:00').getDay()];
   assert.equal(day.weekday,weekday,day.date);
 }
 console.log(`PASS ${count} rendered routes/details; plan weekdays consistent; no render errors`);dom.window.close();
})().catch(e=>{console.error(e);dom.window.close();process.exitCode=1;});
