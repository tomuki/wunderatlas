const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
const ctx={window:{}};vm.createContext(ctx);
vm.runInContext(fs.readFileSync('assets/data/exam-math-extended.js','utf8'),ctx);
vm.runInContext(fs.readFileSync('assets/exercises/math-input.js','utf8'),ctx);
const parts=ctx.window.MathExtendedExams[0].parts.filter(p=>p.type==='math-input');
const round=(x,n)=>Number(x.toFixed(n));
// Independent computations from each stated model, rather than returning stored keys.
const P=n=>120+.4*n,Q=n=>40+.8*n,intersection=(120-40)/(.8-.4);
const f=x=>x*x-6*x+5,g1=x=>3*x*x-12*x+9,N=t=>800*Math.pow(.5,t/4);
const F=x=>-x*x*x/3+2*x*x;
const expected=[Q(100),intersection,P(intersection),Q(300)-P(300),
 (6-Math.sqrt(36-20))/2,(6+Math.sqrt(36-20))/2,f(3),2*2-6,
 (12-Math.sqrt(144-4*3*9))/6,(12+Math.sqrt(144-4*3*9))/6,12/6,g1(2),
 N(8),4*Math.log(50/800)/Math.log(.5),4,round(Math.log(.5)/4,4),
 (4-Math.sqrt(16-12))/2,(4+Math.sqrt(16-12))/2,round(F(3)-F(1)-3*(3-1),3),round(F(4)-F(0),3),
 20/2,(20/2)*(20-20/2),(30-2*2)*(40-2*2),(35-Math.sqrt(35*35-4*150))/2,
 24-(62-2*24),62-2*24,65-2*24,24-(65-2*24)];
assert.equal(parts.length,expected.length);
parts.forEach((p,i)=>assert.ok(Math.abs(p.answers[0]-expected[i])<1e-9,p.q));
const check=ctx.window.Exercises['math-input'].isCorrect;
assert.equal(check({answers:[0]},''),false);assert.equal(check({answers:[0]},'   '),false);assert.equal(check({answers:[0]},'0'),true);
assert.equal(check({answers:[-0.1733]},'-0,1733'),true);
console.log('PASS: 28 numeric keys independently calculated; blank input is not zero; decimal comma accepted');
