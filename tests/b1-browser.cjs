/* Real-browser QA for the B1 lesson; isolated browser storage, no real account. */
const {chromium}=require('playwright');
const assert=require('node:assert/strict');
(async()=>{
 const browser=await chromium.launch({headless:true,channel:process.env.BROWSER_CHANNEL || 'chrome'});
 try{
  const context=await browser.newContext({viewport:{width:1360,height:900},reducedMotion:'reduce'});
  const page=await context.newPage(),errors=[];
  page.on('pageerror',e=>errors.push(e.message));
  await page.goto('http://localhost:3457/#/englisch/sustainable_design_b1');
  await page.locator('[data-argument-lab]').waitFor();
  assert.equal(await page.locator('#lesson-exercises').isVisible(),false);
  for(let i=0;i<3;i++)await page.locator('[data-step-next]').click();
  assert.equal(await page.locator('[data-argument-step]:visible').count(),4);
  await page.locator('[data-reason="concrete"]').click();
  assert.match(await page.locator('[data-reason-feedback]').innerText(),/Yes:/);
  const draft='I think our class should use both formats because some visitors are not online.';
  await page.locator('#atlas-comment-text').fill(draft);
  await page.locator('[data-criterion="0"]').check();
  await page.locator('[data-save-draft]').click();
  await page.reload();
  await page.locator('#atlas-comment-text').waitFor();
  assert.equal(await page.locator('#atlas-comment-text').inputValue(),draft);
  assert.ok(await page.locator('[data-criterion="0"]').isChecked());
  assert.equal(await page.evaluate(()=>Store.load().stats.totalAttempted),0);
  await page.locator('.atlas-read-cta').click();
  await page.getByText('Optional foundation exercises',{exact:true}).click();
  for(let i=0;i<6;i++){
   const ex=await page.evaluate(i=>ContentEN.byId.sustainable_design_b1.exercises[i],i);
   if(ex.type==='mc')await page.locator('#lesson-exercises [role="radio"]').nth(ex.answer).click();
   else if(ex.type==='fill'){
    for(let j=0;j<ex.answers.length;j++)await page.locator('#lesson-exercises [data-blank]').nth(j).fill(ex.answers[j][0]);
   }else{
    // Exercise actual arrow controls, including when initial shuffle is already ordered.
    await page.locator('.sort-item').first().locator('[data-move="down"]').click();
    for(let target=0;target<ex.items.length;target++){
     let current=await page.locator('.sort-item span:not(.sort-item__handle)').allTextContents();
     let at=current.indexOf(ex.items[target]);
     while(at>target){await page.locator('.sort-item').nth(at).locator('[data-move="up"]').click();at--;}
    }
   }
   await page.locator('#lesson-exercises [data-action="check"]').click();
   assert.ok(await page.locator('.exercise__feedback--ok').isVisible(),ex.id);
   if(i<5)await page.locator('#lesson-exercises [data-action="next"]').click();
   else await page.locator('#lesson-exercises [data-action="finish"]').click();
  }
  assert.ok(await page.locator('.seq-recap').isVisible());
  assert.equal(await page.evaluate(()=>Store.load().completed.filter(c=>c.taskId==='lesson:en:sustainable_design_b1').length),1);
  assert.equal(await page.evaluate(()=>Store.load().stats.totalAttempted),6);
  await page.reload();
  await page.locator('.atlas-read-cta').click();
  await page.getByText('Optional foundation exercises',{exact:true}).click();
  await page.locator('#lesson-exercises [role="radio"]').first().click();
  await page.locator('#lesson-exercises [data-action="check"]').click();
  await page.locator('#lesson-exercises [data-action="reset"]').click();
  assert.ok(await page.locator('#lesson-exercises [data-action="check"]').isDisabled());
  assert.equal(await page.evaluate(()=>Store.load().stats.totalAttempted),6);
  await page.locator('#atlas-read-tab').click();
  await page.setViewportSize({width:390,height:844});
  await page.locator('[data-argument-lab]').scrollIntoViewIfNeeded();
  assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),'mobile overflow');
  await page.screenshot({path:'/tmp/wunderatlas-b1-mobile.png'});
  await page.setViewportSize({width:1360,height:900});
  await page.locator('[data-argument-lab]').scrollIntoViewIfNeeded();
  await page.screenshot({path:'/tmp/wunderatlas-b1-desktop.png'});
  await page.locator('[data-step-reset]').focus();
  await page.keyboard.press('Enter');
  assert.equal(await page.locator('[data-argument-step]:visible').count(),1);
  await page.locator('[data-step-next]').focus();
  await page.keyboard.press('Enter');
  assert.equal(await page.locator('[data-argument-step]:visible').count(),2);
  assert.equal(await page.locator('[data-argument-step]').first().evaluate(el=>getComputedStyle(el).animationName),'none');
  await page.evaluate(()=>{document.documentElement.style.fontSize='200%';});
  assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),'200% text overflow');
  assert.equal(await page.evaluate(()=>Store.defaultState().profile.levelDE),'B1');
  assert.deepEqual(errors,[]);
  console.log('PASS browser: reading first, lab, draft reload, all 6 exercises, completion, reset/dedup, mobile width, keyboard, reduced motion, 200% text, B1 default; no page errors');
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
