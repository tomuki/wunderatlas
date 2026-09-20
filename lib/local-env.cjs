// Server-only configuration. Never import this module into a browser script.
const fs=require('node:fs');
const path=require('node:path');
function loadLocalEnv(root){
  // Existing environment wins; .env.local wins over legacy .env.
  for(const name of ['.env.local','.env']){
    const file=path.join(root,name);
    if(!fs.existsSync(file))continue;
    if(typeof process.loadEnvFile!=='function')throw new Error('Wunderatlas benötigt Node.js 22 oder neuer für lokale Konfiguration.');
    try{process.loadEnvFile(file);}catch{throw new Error('Lokale Konfiguration konnte nicht geladen werden: '+name);}
  }
}
module.exports={loadLocalEnv};
