const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const net = require('node:net');
const {spawn} = require('node:child_process');
(async () => {
  const temp = fs.mkdtempSync(path.join(os.tmpdir(), 'wunder-hosting-'));
  let child;
  const socket = net.createServer();
  await new Promise(r => socket.listen(0, '127.0.0.1', r));
  const port = socket.address().port;
  await new Promise(r => socket.close(r));
  const env = {...process.env, NODE_ENV:'production', PORT:String(port), STUDY_APP_PORT:'1',
    DATA_DIR:temp, GEMINI_API_KEY:'', AI_ALLOWED_EMAILS:'owner@example.test', REGISTRATION_CODE:'test-invitation'};
  async function start() {
    let log = '';
    child = spawn(process.execPath, ['server.js'], {env, stdio:['ignore','pipe','pipe']});
    child.stdout.on('data', d => log += d);
    child.stderr.on('data', d => log += d);
    await new Promise((resolve,reject) => {
      const deadline = Date.now()+10000;
      const timer = setInterval(() => {
        if(log.includes('[study-app]')) {clearInterval(timer);resolve();}
        else if(child.exitCode!==null || Date.now()>deadline) {clearInterval(timer);reject(new Error('Startup failed'));}
      },25);
    });
  }
  async function stop() {if(child && child.exitCode===null) {const exited=new Promise(r=>child.once('exit',r));child.kill();await exited;}}
  const req = (route, body, cookie) => fetch(`http://127.0.0.1:${port}${route}`, {
    method:body?'POST':'GET', headers:{'content-type':'application/json',...(cookie?{cookie}:{})},
    ...(body?{body:JSON.stringify(body)}:{})
  });
  const account={name:'Test',email:'owner@example.test',password:'test-password-123',invitationCode:'test-invitation'};
  try {
    await start();
    assert.equal((await req('/healthz')).status,200);
    assert.equal((await req('/api/ai',{action:'feedback'})).status,401,'production disallows loopback guest');
    assert.equal((await req('/api/auth/register',{...account,invitationCode:''})).status,403);
    const registered=await req('/api/auth/register',account);
    assert.equal(registered.status,200);
    const cookie=registered.headers.get('set-cookie');
    assert.match(cookie,/Secure/);assert.match(cookie,/HttpOnly/);
    const session=cookie.split(';')[0];
    const denied=await req('/api/auth/register',{...account,email:'other@example.test'});
    const other=denied.headers.get('set-cookie').split(';')[0];
    assert.equal((await req('/api/ai',{action:'feedback'},other)).status,403);
    const result=await req('/api/ai',{action:'feedback',prompt:'Test',answer:'Test',subject:'de'},session);
    assert.equal((await result.json()).code,'not_configured');
    for(const route of ['/.env.local','/data/users.json','/server.js','/render.yaml']) assert.equal((await req(route)).status,404);
    await stop();await start();
    const me=await (await req('/api/auth/me',null,session)).json();
    assert.equal(me.user.email,account.email,'session and account survive restart');
    assert.equal((await req('/api/auth/login',account)).status,200);
    console.log('PASS: production PORT, health, invitation-only signup, Secure cookies, AI allowlist, no guest bypass, private files and account/session persistence across restart.');
  } finally {await stop();fs.rmSync(temp,{recursive:true,force:true});}
})().catch(e=>{console.error(e);process.exitCode=1;});
