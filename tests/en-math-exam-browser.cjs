const {chromium}=require('playwright'),assert=require('node:assert/strict');
(async()=>{const browser=await chromium.launch({channel:'chrome',headless:true});try{
 const page=await browser.newPage({viewport:{width:390,height:844}}),errors=[];page.on('pageerror',e=>errors.push(e.message));
 for(const subject of ['en','math']){
  await page.goto('http://localhost:3457/#/pruefung?subject='+subject);await page.locator('[data-action=start]').waitFor();
  assert.equal(await page.locator('[data-exam-variant]').inputValue(),'4');
  assert.equal(await page.locator('.exam-part').count(),subject==='en'?32:35);
  assert.equal(await page.locator('[data-display]').innerText(),subject==='en'?'45:00':'140:00');
  assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
  assert.ok(!/[\u0400-\u04ff]/.test(await page.locator('#page-root').innerText()));
  if(subject==='en')assert.ok(!/Aufgabe|Antwort|Verbleibende|Schreibtext/.test(await page.locator('[data-exam-mount]').innerText()));
  await page.locator('[data-action=start]').click();
  const b=await page.evaluate(s=>Exercises['mini-exam'].buildBundle(s,4),subject);
  await page.locator('.exam-section-title').first().scrollIntoViewIfNeeded();await page.screenshot({path:'/tmp/wunder-'+subject+'-full.png'});
  for(let i=0;i<b.parts.length;i++){
   const p=b.parts[i],field=page.locator(`[data-part="${i}"]`);
   if(p.type==='mc')await field.locator(`[data-answer="${i===0?(p.answer+1)%p.options.length:p.answer}"]`).check();
   else if(p.type==='fill')await field.locator('[data-blank]').fill(p.answers[0][0]);
   else if(p.type==='math-input')await field.locator('[data-text]').fill(i===0?'999':String(p.answers[0]).replace('.',','));
   else await field.locator('[data-text]').fill('Mein Ansatz und meine nachvollziehbare Begründung.');
  }
  const key='fhr-app/draft/'+b.id,before=await page.evaluate(k=>JSON.parse(localStorage.getItem(k)),key);
  await page.reload();await page.locator('[data-action=finish]').waitFor();
  const after=await page.evaluate(k=>JSON.parse(localStorage.getItem(k)),key);assert.equal(after.deadline,before.deadline);assert.deepEqual(after.answers,before.answers);
  await page.locator('[data-action=finish]').click();const a=await page.evaluate(()=>Store.load().examAttempts[0]);
  assert.equal(a.objectiveTotal,subject==='en'?32:28);assert.equal(a.objectiveCorrect,subject==='en'?31:27);assert.equal(a.results.filter(r=>r.correct===null).length,subject==='en'?0:7);
 }
 await page.locator('[data-exam-subject]').selectOption('en');await page.waitForURL('**subject=en&variant=4');
 await page.locator('[data-exam-variant]').selectOption('5');await page.waitForURL('**variant=5');assert.equal(await page.locator('.exam-part').count(),2);
 await page.locator('[data-action=start]').click();for(let i=0;i<2;i++)await page.locator(`[data-part="${i}"] textarea`).fill('My own response with a reason and an example.');
 await page.locator('[data-action=finish]').click();assert.equal(await page.evaluate(()=>Store.load().examAttempts[0].results.filter(r=>r.correct===null).length),2);
 assert.deepEqual(errors,[]);console.log('PASS: EN 32 reading / 2 writing; maths 28 results + 7 workings; deliberate errors, decimal commas, persistence, selectors, mobile and language; no browser errors');
}finally{await browser.close();}})().catch(e=>{console.error(e);process.exitCode=1;});
