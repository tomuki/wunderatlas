const {chromium}=require('playwright');const assert=require('node:assert/strict');
(async()=>{const browser=await chromium.launch({headless:true,channel:'chrome'});try{
 const context=await browser.newContext({viewport:{width:1360,height:900}}),page=await context.newPage(),errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.goto('http://localhost:3457/#/bibliothek');await page.locator('[data-library-results]').waitFor();
 assert.equal(await page.locator('.library-topic').count(),29);assert.equal(await page.locator('[data-theme-btn]').count(),1);assert.equal(await page.locator('[data-action=theme]').count(),0);
 await page.locator('[data-library-search]').fill('Argumente abwägen');assert.equal(await page.locator('.library-topic').count(),1);
 await page.locator('[data-save-topic]').click();await page.reload();await page.locator('[data-library-saved]').check();assert.equal(await page.locator('.library-topic').count(),1);
 await page.locator('[data-library-subject]').selectOption('en');await page.waitForURL('**subject=en');assert.equal(await page.locator('.library-topic').count(),30);
 assert.ok(!/[\u0400-\u04ff]/.test(await page.locator('#page-root').innerText()));
 await page.setViewportSize({width:390,height:844});assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));await page.screenshot({path:'/tmp/wunder-library-mobile.png'});await page.setViewportSize({width:1360,height:900});
 await page.goto('http://localhost:3457/#/pruefung');await page.locator('[data-exam-subject]').selectOption('en');await page.waitForURL('**subject=en&variant=4');
 await page.locator('[data-exam-variant]').selectOption('2');await page.waitForURL('**subject=en&variant=2');
 await page.setViewportSize({width:390,height:844});assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));await page.screenshot({path:'/tmp/wunder-exam-mobile.png'});await page.setViewportSize({width:1360,height:900});
 for(const subject of ['de','en','math'])for(let variant=1;variant<=3;variant++){
  await page.goto(`http://localhost:3457/#/pruefung?subject=${subject}&variant=${variant}`);await page.locator('[data-action=start]').waitFor();
  const bundle=await page.evaluate(({subject,variant})=>Exercises['mini-exam'].buildBundle(subject,variant),{subject,variant});
  assert.equal(await page.locator('.exam-part:disabled').count(),bundle.parts.length);
  await page.locator('[data-action=start]').click();assert.ok(await page.locator('[data-action=finish]').isEnabled());
  for(let i=0;i<bundle.parts.length;i++){
   const p=bundle.parts[i],part=page.locator(`[data-part="${i}"]`);
   if(p.type==='mc')await part.locator(`[data-answer="${p.answer}"]`).check();
   else if(['fill','cloze'].includes(p.type))for(let j=0;j<p.answers.length;j++)await part.locator(`[data-blank="${j}"]`).fill(Array.isArray(p.answers[j])?p.answers[j][0]:p.answers[j]);
   else if(p.type==='math-input')await part.locator('[data-text]').fill(Array.isArray(p.answers[0])?p.answers[0][0]:p.answers[0]);
   else if(p.type==='error')for(let j=0;j<p.corrections.length;j++)await part.locator(`[data-correction="${j}"]`).fill(p.corrections[j].replace);
   else if(p.type==='match')for(let j=0;j<p.pairs.length;j++)await part.locator(`[data-match="${j}"]`).selectOption(String(j));
   else if(p.type==='sort')for(let target=0;target<p.items.length;target++){
    let values=await part.locator('.exam-sort li span').allTextContents(),at=values.indexOf(p.items[target]);
    while(at>target){await part.locator(`[data-up="${at}"]`).click();at--;}
   }
   else await part.locator('[data-text]').fill(subject==='en'?'This is my own written response with a reason and a specific example.':'Das ist mein eigener Text mit einer Begründung und einem konkreten Beispiel.');
  }
  const draftKey='fhr-app/draft/'+bundle.id;
  const before=await page.evaluate(key=>JSON.parse(localStorage.getItem(key)),draftKey);
  await page.reload();await page.locator('[data-action=finish]').waitFor();assert.ok(await page.locator('[data-action=start]').isDisabled());
  const after=await page.evaluate(key=>JSON.parse(localStorage.getItem(key)),draftKey);assert.equal(after.deadline,before.deadline);assert.deepEqual(after.answers,before.answers);
  if(subject==='en')assert.ok(!/[\u0400-\u04ff]|Klausur starten|Aufgabe \d|Verbleibende/.test(await page.locator('[data-exam-mount]').innerText()));
  await page.locator('[data-action=finish]').click();assert.ok(await page.locator('[data-result]').isVisible());
  const attempt=await page.evaluate(()=>Store.load().examAttempts[0]);assert.equal(attempt.bundleId,bundle.id);assert.equal(attempt.objectiveCorrect,attempt.objectiveTotal);
  assert.equal(attempt.results.filter(r=>r.correct===null).length,bundle.parts.filter(p=>['free','timed-writing'].includes(p.type)).length);
  await page.evaluate(()=>document.querySelector('[data-action=finish]').dispatchEvent(new Event('click')));
  assert.equal(await page.evaluate(id=>Store.load().examAttempts.filter(a=>a.bundleId===id).length,bundle.id),1);
 }
 // Deadline expiry submits once, including after returning to the route.
 await page.evaluate(()=>localStorage.setItem('fhr-app/draft/mini-exam:en-1',JSON.stringify({answers:[],startedAt:Date.now()-10000,deadline:Date.now()-1000})));
 await page.goto('http://localhost:3457/#/pruefung?subject=en&variant=1');await page.locator('[data-result]:visible').waitFor();
 assert.equal(await page.evaluate(()=>Store.load().examAttempts.filter(a=>a.bundleId==='mini-exam:en-1').length),2);
 await page.goto('http://localhost:3457/#/profil');await page.locator('#p-fontsize').waitFor();assert.equal(await page.locator('#p-theme').count(),0);
 assert.deepEqual(errors,[]);console.log('PASS: library search/save/filter/mobile; one theme control; 9 simulations start, accept all answer types, restore deadline and answers, grade once; expiry and writing self-review; no browser errors');
}finally{await browser.close();}})().catch(e=>{console.error(e);process.exitCode=1;});
