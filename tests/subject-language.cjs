const {JSDOM}=require('jsdom');
const fs=require('fs'),path=require('path'),assert=require('node:assert/strict');
const base=path.resolve(__dirname,'..');
const dom=new JSDOM(fs.readFileSync(path.join(base,'index.html'),'utf8'),{url:'http://localhost/',runScripts:'outside-only'}),w=dom.window;
w.matchMedia=()=>({matches:false});w.scrollTo=()=>{};w.HTMLElement.prototype.scrollIntoView=function(){};
for(const script of w.document.querySelectorAll('script[src]')){
 const src=script.getAttribute('src');if(!src.startsWith('assets/')||src==='assets/app.js'||src==='assets/auth.js')continue;
 w.eval(fs.readFileSync(path.join(base,src),'utf8'));if(src.endsWith('content-extra.js'))w.ContentExtras.apply();
}
const mount=w.document.querySelector('#page-root');
const mixed=/[\u0400-\u04ff]|\b(?:Welche|Warum|Ergänze|Aufgabe|Lösung|Lösungen|prüfen|Richtig|Nicht ganz|Reihenfolge|Selbstbewertung|Wortzahl|Länge ausreichend|Mehr Wörter|Korrekturen|Übungen|Zurück|Vorderseite|Rückseite|Umdrehen|Wiederholung|Schwer|Leicht|Nächste|Vorherige|Abschnitte|Erledigt|Stärken|Schwächen)\b/;
function english(node,label){assert.ok(!mixed.test(node.textContent),label+': '+node.textContent.match(mixed));}
(async()=>{
 let count=0;
 for(const lesson of w.ContentEN.list){
  await w.Pages.englisch(mount,{ref:lesson.id});
  english(mount,'lesson '+lesson.id);assert.equal(mount.querySelector('.lesson').lang,'en');count++;
  for(const original of lesson.exercises||[]){
   const ex={...original,subject:'en'},mod=w.Exercises[ex.type];if(!mod)continue;
   const host=w.document.createElement('div');host.innerHTML=mod.render(ex);english(host,lesson.id+' '+ex.type+' render');
  }
 }
 // Inspect runtime feedback, not only initial markup.
 for(const ex of [
  {type:'mc',subject:'en',q:'Choose A',options:['A','B'],answer:0,explanation:'A is correct.'},
  {type:'fill',subject:'en',q:'Complete it',text:'One ___',answers:[['word']],explanation:'Use word.'},
  {type:'free',subject:'en',q:'Write your view',modelAnswer:'An English model.',explanation:'Check your reasons.',minWords:2}
 ]){
  mount.innerHTML=w.Exercises[ex.type].render(ex);w.Exercises[ex.type].bind(mount,ex);
  if(ex.type==='mc')mount.querySelectorAll('[role=radio]')[1].click();
  else{const input=mount.querySelector('input,textarea');input.value='some answer';input.dispatchEvent(new w.Event('input'));}
  mount.querySelector('[data-action=check]').click();english(mount,ex.type+' feedback');
  const model=mount.querySelector('[data-action=model]');if(model){model.click();english(mount,'model');}
 }
 await w.Pages.lernkarten(mount,{});
 mount.querySelector('[data-set-id="vlada-sustainable_design_b1"]').click();english(mount,'English card front');
 mount.querySelector('#lk-flip').click();english(mount,'English card back');
 await w.Pages.deutsch(mount,{ref:'operatoren'});assert.equal(mount.querySelector('.lesson').lang,'de');
 assert.ok(mount.querySelector('#atlas-read-tab').textContent.includes('Verstehen'));
 assert.ok(!/[\u0400-\u04ff]/.test(mount.textContent));
 console.log(`PASS language: ${count} English lessons, all exercise templates, live feedback and cards; German controls retained`);
})().finally(()=>dom.window.close()).catch(e=>{console.error(e);process.exitCode=1;});
