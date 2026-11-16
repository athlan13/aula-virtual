/* Asisten AI hologram Aria (avatar cewek + chat) */

const AIP={x:3.6,z:-2.2};
let nearAI=false,chatOpen=false,speaking=false,voice=false,greeted=false;
const hmV='varying vec3 vN,vW;void main(){vN=normalize(normalMatrix*normal);vW=(modelMatrix*vec4(position,1.)).xyz;gl_Position=projectionMatrix*viewMatrix*vec4(vW,1.);}';
const hmF='uniform float time;uniform vec3 col;varying vec3 vN,vW;void main(){float fr=pow(1.-abs(vN.z),2.);float sc=.55+.45*sin(vW.y*70.-time*3.);float fl=step(.985,fract(sin(floor(time*8.)*12.9)*43758.5))*.35;gl_FragColor=vec4(col*(.7+fr*1.2)+fl,(.25+.55*fr)*sc);}';
const hm=hex=>new THREE.ShaderMaterial({transparent:true,depthWrite:false,blending:AD,uniforms:{time:{value:0},col:{value:new THREE.Color(hex)}},vertexShader:hmV,fragmentShader:hmF});
const mB=hm(0x38bdf8),mH=hm(0xc084fc),mE=hm(0xe0fbff),aiMats=[mB,mH,mE];
const ai=new THREE.Group(),ab=new THREE.Group();
ai.add(ab);
ai.position.set(AIP.x,0,AIP.z);
S.add(ai);
const P=(g,m,x,y,z,par)=>{
  const o=new THREE.Mesh(g,m);
  o.position.set(x,y,z);
  (par||ab).add(o);
  return o
};
const SP=(r,sx,sy,sz)=>{
  const g=new THREE.SphereGeometry(r,20,14);
  g.scale(sx,sy,sz);
  return g
};
const CY=(a,b,h)=>new THREE.CylinderGeometry(a,b,h,18);
P(CY(.27,.2,.6),mB,0,1.26,0);
P(SP(.3,1,.45,.62),mB,0,1.52,0);
P(CY(.2,.5,.78),mB,0,.64,0);
P(CY(.065,.075,.14),mB,0,1.7,0);
const aHead=new THREE.Group();
aHead.position.y=1.9;
ab.add(aHead);
P(SP(.19,.9,1.08,.95),mB,0,0,0,aHead);
P(SP(.215,.98,1.1,1.05),mH,0,.03,-.025,aHead);
P(SP(.2,.95,1.9,.6),mH,0,-.33,-.12,aHead);
P(SP(.2,.9,.3,.5),mH,0,.14,.1,aHead);
[-1,1].forEach(s=>{
  P(SP(.065,1,2.4,1),mH,s*.17,-.2,.02,aHead);
  P(SP(.04,1,1.3,1),mE,s*.21,0,0,aHead);
  P(SP(.024,1,.8,.5),mE,s*.07,.02,.17,aHead);
  P(CY(.05,.04,.26),mB,s*.12,.13,0)
});
P(new THREE.TorusGeometry(.215,.012,6,32,Math.PI),mE,0,0,0,aHead);
const aMouth=P(SP(.03,1.6,.5,.5),mE,0,-.09,.17,aHead);
function aArm(s){
  const p=new THREE.Group();
  p.position.set(s*.34,1.52,0);
  ab.add(p);
  P(CY(.055,.045,.3),mB,0,-.15,0,p);
  const e=new THREE.Group();
  e.position.y=-.3;
  p.add(e);
  P(CY(.045,.035,.28),mB,0,-.14,0,e);
  P(SP(.045,1,1.1,.8),mE,0,-.3,0,e);
  return{p,e}
}
const aL=aArm(1),aR=aArm(-1);
aL.p.rotation.z=.08;
aR.p.rotation.z=-.08;
const bm=()=>new THREE.MeshBasicMaterial({color:0x38bdf8,transparent:true,blending:AD,depthWrite:false,side:THREE.DoubleSide});
const aPad=new THREE.Mesh(new THREE.RingGeometry(.85,.93,48),bm());
aPad.rotation.x=-Math.PI/2;
aPad.position.y=.03;
ai.add(aPad);
const aDisc=new THREE.Mesh(new THREE.CircleGeometry(.85,48),bm());
aDisc.rotation.x=-Math.PI/2;
aDisc.position.y=.02;
aDisc.material.opacity=.16;
ai.add(aDisc);
const aBeam=new THREE.Mesh(new THREE.CylinderGeometry(.85,.6,2.3,32,1,true),bm());
aBeam.position.y=1.15;
aBeam.material.opacity=.05;
ai.add(aBeam);
const aRing=new THREE.Mesh(new THREE.TorusGeometry(.75,.01,6,64),bm());
aRing.material.opacity=.7;
ai.add(aRing);
const aLight=new THREE.PointLight(0x38bdf8,.8,7);
aLight.position.set(0,1.6,.8);
ai.add(aLight);
function aiUpdate(T,dt){
  aiMats.forEach(m=>m.uniforms.time.value=T);
  const tg=Math.atan2(pos.x-AIP.x,pos.z-AIP.z),d=((tg-ai.rotation.y+Math.PI)%(Math.PI*2)+Math.PI*2)%(Math.PI*2)-Math.PI;
  ai.rotation.y+=d*Math.min(1,dt*3);
  ab.position.y=Math.sin(T*1.6)*.025;
  aHead.rotation.y=Math.sin(T*.7)*.22;
  aHead.rotation.z=Math.sin(T*.5)*.04;
  const wave=nearAI&&!chatOpen,k=Math.min(1,dt*6);
  aR.p.rotation.z+=((wave?-2.5+Math.sin(T*7)*.2:-.08)-aR.p.rotation.z)*k;
  aL.p.rotation.x+=((speaking?Math.sin(T*3)*.5:0)-aL.p.rotation.x)*k;
  aR.e.rotation.x=wave?Math.sin(T*7)*.3:0;
  aMouth.scale.y=speaking?1+Math.abs(Math.sin(T*18))*2.4:1;
  aRing.position.y=1.2+Math.sin(T*1.2)*.12;
  aRing.rotation.set(1.3,T*.9,0);
  const u=(T*.5)%1;
  aPad.scale.setScalar(1+u*.15);
  aPad.material.opacity=.8-u*.4;
  aLight.intensity=.6+(speaking?.5*Math.abs(Math.sin(T*12)):.15*Math.sin(T*2))
}
// --- Chat Aria (jawaban dari data PANELS, tanpa server) ---
const aSt=document.createElement('style');
aSt.textContent='#chat{position:fixed;left:50%;bottom:calc(env(safe-area-inset-bottom,0px) + 12px);transform:translateX(-50%);width:min(94vw,480px);max-height:60vh;display:none;flex-direction:column;background:rgba(8,14,32,.9);backdrop-filter:blur(10px);border:1px solid rgba(56,189,248,.4);border-radius:18px;box-shadow:0 0 40px rgba(34,211,238,.2);z-index:5;overflow:hidden;font-size:14px;touch-action:manipulation;user-select:text}#chat .ch{display:flex;align-items:center;gap:8px;padding:10px 14px;border-bottom:1px solid rgba(255,255,255,.1);background:rgba(56,189,248,.1)}#chat .ch b{flex:1}#chat button{background:none;border:1px solid rgba(255,255,255,.2);color:var(--fg);border-radius:8px;padding:4px 9px;cursor:pointer;font-size:13px}#clog{flex:1;overflow-y:auto;padding:12px 14px;display:flex;flex-direction:column;gap:8px;min-height:90px;touch-action:pan-y}#clog div{max-width:88%;padding:8px 11px;border-radius:12px;line-height:1.45}.am{background:rgba(56,189,248,.16);align-self:flex-start;border:1px solid rgba(56,189,248,.3)}.um{background:rgba(167,139,250,.22);align-self:flex-end}#chips{display:flex;flex-wrap:wrap;gap:6px;padding:0 14px 8px}#chips button{border-radius:999px;color:#7dd3fc;border-color:rgba(125,211,252,.4)}#cin{display:flex;gap:8px;padding:8px 14px 12px}#cin input{flex:1;background:rgba(255,255,255,.08);border:1px solid rgba(255,255,255,.2);border-radius:10px;color:var(--fg);padding:9px 11px;font-size:16px;outline:none}';
document.head.appendChild(aSt);
const el=(t,c,x)=>{
  const e=document.createElement(t);
  if(c)e.className=c;
  if(x)e.textContent=x;
  return e
};
const chat=el('div');
chat.id='chat';
const chd=el('div','ch'),clog=el('div'),chips=el('div'),cin=el('div');
clog.id='clog';
chips.id='chips';
cin.id='cin';
const vb=el('button','','🔇'),xb=el('button','','✕');
chd.append(el('b','','Aria · Asisten AI F-HOLO'),vb,xb);
const inp=el('input');
inp.placeholder='Tanya tentang Farhan...';
const sb=el('button','','Kirim');
cin.append(inp,sb);
['Siapa Farhan?','Pengalaman magang','Skill','Skripsi','Kontak','Tentang F-HOLO'].forEach(q=>{
  const b=el('button','',q);
  b.onclick=()=>ask(q);
  chips.appendChild(b)
});
chat.append(chd,clog,chips,cin);
document.body.appendChild(chat);
const sum=i=>{
  const p=PANELS[i];
  return p.t+': '+(p.l?p.l.join('. '):p.bars.map(b=>b[0]+' '+b[1]+'%').join(', '))+'.'
};
const KB=[[/halo|hai\b|^hi\b|hey|selamat/i,()=>'Halo! Saya Aria. Tanyakan apa saja tentang Farhan: profil, magang, skill, skripsi, atau kontak.'], [/aria|kamu siapa|siapa kamu|asisten/i,()=>'Saya Aria, asisten AI hologram F-HOLO. Jawaban saya berasal dari data portofolio Farhan di aula ini.'], [/f-?holo|perusahaan|startup/i,()=>'F-HOLO adalah nama perusahaan yang sedang direncanakan Farhan. Hologram di tengah aula ini adalah logonya.'], [/mandiri/i,()=>sum(3)],[/\bbei\b|bursa/i,()=>sum(2)],[/magang|pengalaman|kerja/i,()=>sum(2)+' '+sum(3)], [/skill|kemampuan|keahlian|bisa apa/i,()=>sum(4)],[/tools|software|teknologi/i,()=>sum(7)], [/skripsi|random forest|machine|\bml\b|keamanan/i,()=>sum(5)],[/game|godot|android|ilmiah/i,()=>sum(6)], [/pendidikan|kuliah|kampus|gunadarma|ipk|lulus/i,()=>sum(1)],[/kontak|hubungi|email|linkedin|lowongan|rekrut|hire/i,()=>sum(8)], [/siapa|profil|tentang|farhan|kenalan/i,()=>sum(0)]];
const answer=q=>{
  for(const[r,f]of KB)if(r.test(q))return f();
  return 'Maaf, saya belum paham. Coba tanya soal profil, pendidikan, magang BEI, magang Mandiri, skill, skripsi, game, atau kontak.'
};
function speak(t){
  if(!voice||!window.speechSynthesis)return;
  speechSynthesis.cancel();
  const u=new SpeechSynthesisUtterance(t);
  u.lang='id-ID';
  u.onend=()=>{
    speaking=false
  };
  speechSynthesis.speak(u);
  setTimeout(()=>{
    speaking=false
  },t.length*80+800)
}
function say(t){
  const m=el('div','am');
  clog.appendChild(m);
  let k=0;
  speaking=true;
  speak(t);
  const iv=setInterval(()=>{
    m.textContent=t.slice(0,++k);
    clog.scrollTop=clog.scrollHeight;
    if(k>=t.length){
      clearInterval(iv);
      if(!voice)setTimeout(()=>{
        speaking=false
      },300)
    }
  },16)
}
function ask(q){
  q=q.trim();
  if(!q)return;
  clog.appendChild(el('div','um',q));
  clog.scrollTop=clog.scrollHeight;
  say(answer(q))
}
sb.onclick=()=>{
  ask(inp.value);
  inp.value=''
};
inp.addEventListener('keydown',e=>{
  if(e.key==='Enter'){
    ask(inp.value);
    inp.value=''
  }
});
vb.onclick=()=>{
  voice=!voice;
  vb.textContent=voice?'🔊':'🔇';
  if(!voice&&window.speechSynthesis)speechSynthesis.cancel()
};
function openChat(){
  chat.style.display='flex';
  chatOpen=true;
  H.style.display='none';
  if(!greeted){
    greeted=true;
    say('Halo, saya Aria, asisten hologram F-HOLO. Tanyakan apa saja tentang Farhan: profil, magang, skill, skripsi, atau kontak.')
  }
  if(!matchMedia('(pointer:coarse)').matches)inp.focus()
}
function closeChat(){
  chat.style.display='none';
  chatOpen=false;
  speaking=false;
  if(window.speechSynthesis)speechSynthesis.cancel();
  for(const k in keys)keys[k]=0
}
xb.onclick=closeChat;
