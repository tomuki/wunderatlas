/* Run with NODE_PATH pointing at the project's jsdom installation. No network. */
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const {JSDOM} = require('jsdom');
const base = path.resolve(__dirname,'..');
const dom = new JSDOM('<div id="test"></div><div id="toast-root"></div>',{url:'http://localhost/',runScripts:'outside-only'});
const w = dom.window;
w.matchMedia=()=>({matches:false});
w.HTMLElement.prototype.scrollIntoView=function(){};
for(const name of ['state','review','exercises/engine','exercises/multiple-choice','exercises/fill-blank','exercises/sort-order','exercises/sequential']) w.eval(fs.readFileSync(path.join(base,'assets',name+'.js'),'utf8'));
const mount=w.document.querySelector('#test');
let checks=0;
function ok(test,message){assert.ok(test,message);checks++;}
function btn(action){return mount.querySelector(`[data-action="${action}"]`);}
function button(text){return [...mount.querySelectorAll('button')].find(b=>b.textContent===text);}
const exercises=[{type:'mc',id:'test-a',subject:'de',topic:'test',q:'Choose A',options:['A','B'],answer:0},{type:'mc',id:'test-b',subject:'de',topic:'test',q:'Choose B',options:['A','B'],answer:1}];
function start(){w.SequentialExercises.run({mount,exercises,subject:'de',topic:'test',lessonId:'test',adaptive:false,backHref:'#/deutsch'});}
function pick(i){mount.querySelectorAll('[role="radio"]')[i].click();}
async function reset(){btn('reset').click();await Promise.resolve();}
(async()=>{
 start();ok(btn('check').disabled,'empty check disabled');
 pick(0);ok(!btn('check').disabled,'selection enables check');
 await reset();ok(!btn('check').hidden&&btn('check').disabled,'reset restores visible disabled check');
 pick(0);btn('check').click();ok(btn('check').hidden,'checked hides check');ok(btn('next')&&!btn('next').hidden,'one next action');
 ok(w.Store.load().stats.totalAttempted===1,'one score');
 btn('check').click();ok(w.Store.load().stats.totalAttempted===1,'double submit no extra score');
 await reset();pick(1);btn('check').click();ok(btn('next')&&!btn('next').hidden,'dedup never suppresses next');
 ok(mount.textContent.includes('Nicht ganz.'),'retry feedback reflects current answer');
 ok(w.Store.load().stats.totalAttempted===1,'retry does not inflate score');
 btn('next').click();ok(!btn('check').hidden&&btn('check').disabled,'new exercise starts unanswered');
 button('← Zurück').click();ok(mount.querySelector('[role="radio"][aria-checked=true]').textContent==='B','back preserves answer');
 ok(mount.textContent.includes('Nicht ganz.'),'back preserves feedback');
 btn('show-all').click();ok(mount.querySelectorAll('.exercise').length===0,'overview contains no duplicate live forms');
 mount.querySelector('.seq-overview-item').click();ok(mount.textContent.includes('Nicht ganz.'),'overview restores cached attempt');
 btn('next').click();pick(1);btn('check').click();btn('finish').click();ok(mount.textContent.includes('Lerneinheit abgeschlossen'),'finish recap');
 ok(w.Store.load().completed.filter(c=>c.taskId==='lesson:de:test').length===1,'completion exactly once');
 start();pick(0);btn('check').click();ok(btn('next')&&!btn('next').hidden,'reopened lesson progresses');
 start();btn('show-all').click();mount.querySelectorAll('.seq-overview-item')[1].click();pick(1);btn('check').click();btn('finish').click();
 ok(!mount.querySelector('.seq-recap'),'cannot finish with unanswered exercises');
 ok(mount.textContent.includes('Choose A'),'finish directs to missing exercise');
 // Sorting tasks without q/id used to lack any deduplication key.
 const sort={type:'sort',title:'Order these',items:['A','B'],subject:'de',topic:'sort-test'};
 const before=w.Store.load().stats.totalAttempted;
 w.ExerciseEngine.registerResult('de','sort-test',true,sort,['A','B']);
 w.ExerciseEngine.registerResult('de','sort-test',true,sort,['A','B']);
 ok(w.Store.load().stats.totalAttempted===before+1,'sort title/content provides dedup key');
 // Keyboard radio behavior.
 start();const first=mount.querySelector('[role=radio]');first.dispatchEvent(new w.KeyboardEvent('keydown',{key:'ArrowRight',bubbles:true}));
 ok(mount.querySelectorAll('[role=radio]')[1].getAttribute('aria-checked')==='true','arrow key selects radio');
 ok(mount.querySelectorAll('[role=radio][tabindex="0"]').length===1,'single tab stop for radiogroup');
 console.log(`PASS ${checks} targeted lifecycle assertions`);dom.window.close();
})().catch(e=>{console.error(e);dom.window.close();process.exitCode=1;});
