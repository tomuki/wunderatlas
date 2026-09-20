const {chromium}=require('playwright'),assert=require('node:assert/strict');
(async()=>{const browser=await chromium.launch({channel:'chrome',headless:true});try{
 const page=await browser.newPage({viewport:{width:390,height:844}}),errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.goto('http://localhost:3457/#/pruefung?subject=de');await page.locator('[data-action=start]').waitFor();
 assert.equal(await page.locator('[data-exam-variant]').inputValue(),'4');assert.equal(await page.locator('.exam-part').count(),30);
 assert.equal(await page.locator('.exam-source-text').count(),6);assert.equal(await page.locator('[data-display]').innerText(),'65:00');
 assert.equal(await page.locator('.exam-official a[href*="bfu.goethe.de"]').count(),4);
 assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
 assert.ok(!/[\u0400-\u04ff]/.test(await page.locator('#page-root').innerText()));
 await page.locator('.exam-section-title').first().scrollIntoViewIfNeeded();await page.screenshot({path:'/tmp/wunder-de-b1-reading.png'});
 await page.locator('[data-action=start]').click();
 const bundle=await page.evaluate(()=>Exercises['mini-exam'].buildBundle('de',4));
 // One deliberately wrong answer verifies actual scoring, not mere submission.
 for(let i=0;i<30;i++)await page.locator(`[data-part="${i}"] [data-answer="${i===0?1-bundle.parts[i].answer:bundle.parts[i].answer}"]`).check();
 await page.reload();await page.locator('[data-action=finish]').waitFor();assert.equal(await page.locator('input:checked').count(),30);
 await page.locator('[data-action=finish]').click();
 let attempt=await page.evaluate(()=>Store.load().examAttempts[0]);assert.equal(attempt.objectiveCorrect,29);assert.equal(attempt.objectiveTotal,30);
 for(const variant of [5,6]){
 await page.locator('[data-exam-variant]').selectOption(String(variant));await page.waitForURL('**variant='+variant);
 assert.equal(await page.locator('.exam-part').count(),3);await page.locator('[data-action=start]').click();
 for(let i=0;i<3;i++)await page.locator(`[data-part="${i}"] textarea`).fill('Mein eigener Beitrag mit einem konkreten Beispiel.');
 await page.locator('[data-action=finish]').click();attempt=await page.evaluate(()=>Store.load().examAttempts[0]);assert.equal(attempt.results.filter(r=>r.correct===null).length,3);
 assert.ok(await page.locator('[data-result]').isVisible());
 }
 assert.deepEqual(errors,[]);console.log('PASS: B1 default, 30 reading questions, 29/30 score, persistence, 3 writing and 3 speaking tasks, official module links, mobile, German only, no browser errors');
}finally{await browser.close();}})().catch(e=>{console.error(e);process.exitCode=1;});
