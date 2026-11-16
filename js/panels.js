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
const boards=[];
const pFS=['uniform sampler2D map;uniform float wake,reveal;varying vec2 vUv;', 'void main(){vec4 t=texture2D(map,vUv);float top=1.-vUv.y;float vis=step(top,reveal);float edge=(1.-smoothstep(0.,.03,abs(top-reveal)))*step(reveal,.999);', 'gl_FragColor=vec4(t.rgb*(.4+.6*wake)*vis+vec3(.3,.9,1.)*edge*.9,1.);}'].join('\n');
const gFS=['uniform float time,wake;uniform vec3 col;varying vec2 vUv;', 'void main(){vec2 g=abs(fract(vUv*vec2(32.,20.))-.5);float grid=smoothstep(.47,.5,max(g.x,g.y))*.07;', 'float sc=(.5+.5*sin(vUv.y*300.-time*4.))*.03;float sw=(1.-smoothstep(0.,.06,abs(vUv.y-fract(time*.15))))*.1;', 'gl_FragColor=vec4(col,(grid+sc+sw)*(.5+.8*wake));}'].join('\n');
function titleTex(p){
  const cv=document.createElement('canvas');
  cv.width=1024;
  cv.height=160;
  const c=cv.getContext('2d');
  c.shadowColor=p.c;
  c.shadowBlur=22;
  c.fillStyle='#fff';
  c.font='700 62px Segoe UI,Arial,sans-serif';
  c.fillText(p.t,56,78);
  c.shadowBlur=10;
  c.fillStyle=p.c;
  c.font='600 30px Segoe UI,Arial,sans-serif';
  c.fillText(p.s,56,126);
  const t=new THREE.CanvasTexture(cv);
  t.anisotropy=8;
  t.encoding=THREE.sRGBEncoding;
  return t
}
function panelUpdate(T,dt){
  boards.forEach(b=>{
    const n=near===b.i;
    if(n&&!b.was)b.rev=0;
    b.was=n;
    b.w+=((n?1:0)-b.w)*Math.min(1,dt*3);
    b.rev=Math.min(1,b.rev+dt*.9);
    b.pm.uniforms.wake.value=b.w;
    b.pm.uniforms.reveal.value=b.rev;
    b.gm.uniforms.wake.value=b.w;
    b.gm.uniforms.time.value=T;
    b.tt.material.opacity=.7+.3*b.w;
    b.tt.position.z=.32+Math.sin(T*1.5+b.i)*.03+.05*b.w
  })
}
const frames=[];
PANELS.forEach((p,i)=>{
  const sp=SPOTS[i],g=new THREE.Group();
  g.position.set(sp[0],3.6,sp[1]);
  g.rotation.y=sp[2];
  const fr=new THREE.Mesh(new THREE.BoxGeometry(5.3,3.5,.12),std(0xd4af37,.3,.8));
  g.add(fr);
  const pm=new THREE.ShaderMaterial({uniforms:{map:{value:panelTex(p)},wake:{value:0},reveal:{value:1}},vertexShader:VS,fragmentShader:pFS});
  const pl=new THREE.Mesh(new THREE.PlaneGeometry(5,3.125),pm);
  pl.position.z=.07;
  g.add(pl);
  const gm=new THREE.ShaderMaterial({transparent:true,depthWrite:false,blending:AD,uniforms:{time:{value:0},wake:{value:0},col:{value:new THREE.Color(p.c)}},vertexShader:VS,fragmentShader:gFS});
  const gl2=new THREE.Mesh(new THREE.PlaneGeometry(5,3.125),gm);
  gl2.position.z=.085;
  g.add(gl2);
  const tt=new THREE.Mesh(new THREE.PlaneGeometry(5,.78125),new THREE.MeshBasicMaterial({map:titleTex(p),transparent:true,depthWrite:false}));
  tt.position.set(0,1.17,.32);
  g.add(tt);
  boards.push({pm,gm,tt,w:0,rev:1,i,was:false});
  const lamp=new THREE.Mesh(new THREE.BoxGeometry(2,.08,.2),new THREE.MeshBasicMaterial({color:0xfff1c9}));
  lamp.position.set(0,2,.3);
  g.add(lamp);
  S.add(g);
  frames.push(fr)
});
mkOrns();
