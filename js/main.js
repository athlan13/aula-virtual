/* Loop animasi utama (jalan, kamera, hologram) */

const clk=new THREE.Clock();
let ph=0,face=Math.PI,mv=0,spd=0;
const pos=av.root.position;
const cpos=new THREE.Vector3(0,3,12);
function tick(){
  requestAnimationFrame(tick);
  const dt=Math.min(clk.getDelta(),.05),T=clk.elapsedTime,modal=MO.style.display==='flex'||chatOpen||!started;
  let ix=modal?0:((keys.d||keys.arrowright?1:0)-(keys.a||keys.arrowleft?1:0)+joy.x),iz=modal?0:((keys.w||keys.arrowup?1:0)-(keys.s||keys.arrowdown?1:0)-joy.y);
  if(!started)cy+=dt*.12;
  const len=Math.min(Math.hypot(ix,iz),1);
  if(len>.08){
    const fx=-Math.sin(cy),fz=-Math.cos(cy),rx=Math.cos(cy),rz=-Math.sin(cy);
    let dx=fx*iz+rx*ix,dz=fz*iz+rz*ix;
    const dl=Math.hypot(dx,dz);
    dx/=dl;
    dz/=dl;
    spd=(keys.shift?6:3.2)*len;
    pos.x+=dx*spd*dt;
    pos.z+=dz*spd*dt;
    const tg=Math.atan2(dx,dz);
    let d=((tg-face+Math.PI)%(Math.PI*2)+Math.PI*2)%(Math.PI*2)-Math.PI;
    face+=d*Math.min(1,dt*10);
    ph+=dt*spd*2.4
  }
  mv+=((len>.08?1:0)-mv)*Math.min(1,dt*8);
  pos.x=Math.max(-14.2,Math.min(14.2,pos.x));
  pos.z=Math.max(-10.2,Math.min(10.2,pos.z));
  COLS.forEach(c=>{
    const dx=pos.x-c[0],dz=pos.z-c[1],d=Math.hypot(dx,dz);
    if(d<.95){
      pos.x=c[0]+dx/d*.95;
      pos.z=c[1]+dz/d*.95
    }
  });
  av.root.rotation.y=face;
  const sw=Math.sin(ph)*.8*mv;
  av.lL.p.rotation.x=sw;
  av.lR.p.rotation.x=-sw;
  av.lL.k.rotation.x=Math.max(0,Math.sin(ph+1.2))*.9*mv;
  av.lR.k.rotation.x=Math.max(0,-Math.sin(ph+1.2))*.9*mv;
  av.aL.p.rotation.x=-sw*.9;
  av.aR.p.rotation.x=sw*.9;
  av.aL.p.rotation.z=.07+Math.sin(T*1.5)*.015;
  av.aR.p.rotation.z=-.07-Math.sin(T*1.5)*.015;
  av.aL.e.rotation.x=-.15-mv*(.2+Math.max(0,-sw)*.6);
  av.aR.e.rotation.x=-.15-mv*(.2+Math.max(0,sw)*.6);
  av.body.position.y=Math.abs(Math.cos(ph))*.05*mv+Math.sin(T*1.8)*.006;
  av.body.rotation.x=.08*mv;
  av.body.rotation.y=Math.sin(ph)*.12*mv;
  av.chest.scale.y=1+Math.sin(T*1.8)*.03;
  av.head.rotation.y=Math.sin(T*.6)*.3*(1-mv)-Math.sin(ph)*.1*mv;
  av.head.rotation.x=Math.sin(T*.9)*.04-.05*mv;
  av.eyes.scale.y=(T%3.6<.12)?.1:1;
  holoUpdate(T);
  ornUpdate(T);
  aiUpdate(T,dt);
  panelUpdate(T,dt);
  near=-1;
  let best=5.2;
  SPOTS.forEach((s,i)=>{
    const d=Math.hypot(pos.x-s[0],pos.z-s[1]);
    if(d<best){
      best=d;
      near=i
    }
  });
  frames.forEach((f,i)=>f.material.emissive.setHex(i===near?0x6b5400:0));
  nearAI=Math.hypot(pos.x-AIP.x,pos.z-AIP.z)<4.2;
  H.style.display=((near>=0||nearAI)&&!modal)?'block':'none';
  if(near>=0)H.textContent='Buka: '+PANELS[near].t+' (E / ketuk)';
  else if(nearAI)H.textContent='Ngobrol dengan Aria (T / ketuk)';
  document.getElementById('loc').textContent=near>=0?PANELS[near].t:'Lobi';
  sun.position.set(pos.x+5,10,pos.z+6);
  sun.target.position.copy(pos);
  const D=camDist,tx=pos.x,tz=pos.z;
  let wx=tx+Math.sin(cy)*Math.cos(cp)*D,wz=tz+Math.cos(cy)*Math.cos(cp)*D,wy=1.5+Math.sin(cp)*D;
  wx=Math.max(-14.5,Math.min(14.5,wx));
  wz=Math.max(-10.5,Math.min(10.5,wz));
  cpos.lerp(new THREE.Vector3(wx,Math.max(.35,Math.min(wy,7.2)),wz),Math.min(1,dt*8));
  if(fp){
    cam.position.set(tx-Math.sin(cy)*.15,1.72,tz-Math.cos(cy)*.15);
    cpos.copy(cam.position);
    cam.lookAt(cam.position.x-Math.sin(cy)*Math.cos(fpp),1.72+Math.sin(fpp),cam.position.z-Math.cos(cy)*Math.cos(fpp))
  } else{
    cam.position.copy(cpos);
    cam.lookAt(tx,1.5,tz)
  }
  R.render(S,cam)
}
addEventListener('resize',()=>{
  R.setSize(innerWidth,innerHeight);
  cam.aspect=innerWidth/innerHeight;
  cam.updateProjectionMatrix()
});
tick();
