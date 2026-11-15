/* Panel portofolio di dinding (kanvas -> tekstur) */

// panels
function wrap(c,t,x,y,w,lh){
  let l='';
  for(const a of t.split(' ')){
    const n=l?l+' '+a:a;
    if(c.measureText(n).width>w&&l){
      c.fillText(l,x,y);
      y+=lh;
      l=a
    } else l=n
  }
  c.fillText(l,x,y);
  return y+lh
}
function panelTex(p){
  const cv=document.createElement('canvas');
  cv.width=1024;
  cv.height=640;
  const c=cv.getContext('2d');
  const g=c.createLinearGradient(0,0,1024,640);
  g.addColorStop(0,'#0f172a');
  g.addColorStop(1,'#1e293b');
  c.fillStyle=g;
  c.fillRect(0,0,1024,640);
  c.fillStyle=p.c;
  c.fillRect(0,0,16,640);
  c.fillStyle='#fff';
  c.font='700 58px Segoe UI,Arial,sans-serif';
  c.fillText(p.t,56,100);
  c.fillStyle=p.c;
  c.font='600 30px Segoe UI,Arial,sans-serif';
  c.fillText(p.s,56,150);
  c.font='400 31px Segoe UI,Arial,sans-serif';
  if(p.bars)p.bars.forEach((b,i)=>{
    const y=215+i*48;
    c.fillStyle='#e2e8f0';
    c.fillText(b[0],56,y);
    c.fillStyle='#334155';
    c.fillRect(300,y-24,620,24);
    c.fillStyle=p.c;
    c.fillRect(300,y-24,620*b[1]/100,24);
    c.fillStyle='#e2e8f0';
    c.font='600 22px Segoe UI,Arial,sans-serif';
    c.fillText(b[1]+'%',930,y-4);
    c.font='400 31px Segoe UI,Arial,sans-serif'
  });
  else{
    let y=225;
    p.l.forEach(s=>{
      c.fillStyle=p.c;
      c.fillText('•',56,y);
      c.fillStyle='#cbd5e1';
      y=wrap(c,s,92,y,880,44)+10
    })
  }
  const t=new THREE.CanvasTexture(cv);
  t.anisotropy=8;
  t.encoding=THREE.sRGBEncoding;
  return t
}
const frames=[];
PANELS.forEach((p,i)=>{
  const sp=SPOTS[i],g=new THREE.Group();
  g.position.set(sp[0],3.6,sp[1]);
  g.rotation.y=sp[2];
  const fr=new THREE.Mesh(new THREE.BoxGeometry(5.3,3.5,.12),std(0xd4af37,.3,.8));
  g.add(fr);
  const pl=new THREE.Mesh(new THREE.PlaneGeometry(5,3.125),new THREE.MeshBasicMaterial({map:panelTex(p)}));
  pl.position.z=.07;
  g.add(pl);
  const lamp=new THREE.Mesh(new THREE.BoxGeometry(2,.08,.2),new THREE.MeshBasicMaterial({color:0xfff1c9}));
  lamp.position.set(0,2,.3);
  g.add(lamp);
  S.add(g);
  frames.push(fr)
});
mkOrns();
