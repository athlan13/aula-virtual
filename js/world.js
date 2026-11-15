/* Scene, renderer, lampu, lantai, dinding, pilar, podium */

const R=new THREE.WebGLRenderer({antialias:true});
R.setPixelRatio(Math.min(devicePixelRatio,2));
R.setSize(innerWidth,innerHeight);
R.outputEncoding=THREE.sRGBEncoding;
R.shadowMap.enabled=true;
R.toneMapping=THREE.ACESFilmicToneMapping;
R.toneMappingExposure=1.15;
document.body.prepend(R.domElement);
const S=new THREE.Scene();
S.background=new THREE.Color(0x0b1020);
S.fog=new THREE.Fog(0x0b1020,18,42);
const cam=new THREE.PerspectiveCamera(60,innerWidth/innerHeight,.1,80);
S.add(new THREE.HemisphereLight(0xbfd4ff,0x2a2438,.9));
const sun=new THREE.DirectionalLight(0xfff1dd,.7);
sun.position.set(5,10,6);
sun.castShadow=true;
sun.shadow.mapSize.set(1024,1024);
Object.assign(sun.shadow.camera,{left:-6,right:6,top:6,bottom:-6,near:1,far:25});
S.add(sun,sun.target);
[[-8,-5],[8,-5],[-8,5],[8,5]].forEach(p=>{
  const l=new THREE.PointLight(0xffd9a0,.9,18);
  l.position.set(p[0],6.8,p[1]);
  S.add(l)
});
const std=(c,r=.7,m=0)=>new THREE.MeshStandardMaterial({color:c,roughness:r,metalness:m});
// floor
const fc=document.createElement('canvas');
fc.width=fc.height=256;
const fx=fc.getContext('2d');
fx.fillStyle='#1c2747';
fx.fillRect(0,0,256,256);
fx.fillStyle='#223059';
fx.fillRect(4,4,248,248);
for(let i=0;i<40;i++){
  fx.strokeStyle='rgba(255,255,255,'+(Math.random()*.05)+')';
  fx.beginPath();
  fx.moveTo(Math.random()*256,0);
  fx.lineTo(Math.random()*256,256);
  fx.stroke()
}
const ft=new THREE.CanvasTexture(fc);
ft.wrapS=ft.wrapT=THREE.RepeatWrapping;
ft.repeat.set(15,11);
ft.encoding=THREE.sRGBEncoding;
const floor=new THREE.Mesh(new THREE.PlaneGeometry(30,22),new THREE.MeshStandardMaterial({map:ft,roughness:.3,metalness:.25}));
floor.rotation.x=-Math.PI/2;
floor.receiveShadow=true;
S.add(floor);
// walls, ceiling, beams
const wm=std(0x182041,.9);
[[30,8,.4,0,4,-11],[30,8,.4,0,4,11],[.4,8,22,-15,4,0],[.4,8,22,15,4,0]].forEach(w=>{
  const m=new THREE.Mesh(new THREE.BoxGeometry(w[0],w[1],w[2]),wm);
  m.position.set(w[3],w[4],w[5]);
  S.add(m)
});
const ceil=new THREE.Mesh(new THREE.PlaneGeometry(30,22),std(0x10162e,1));
ceil.rotation.x=Math.PI/2;
ceil.position.y=8;
S.add(ceil);
for(let x=-12;x<=12;x+=6){
  const b=new THREE.Mesh(new THREE.BoxGeometry(.5,.5,22),std(0x2a3563,.6));
  b.position.set(x,7.75,0);
  S.add(b)
}
const glow=new THREE.MeshBasicMaterial({color:0x7dd3fc});
[[30,.06,.06,0,.15,-10.75],[30,.06,.06,0,.15,10.75],[.06,.06,22,-14.75,.15,0],[.06,.06,22,14.75,.15,0]].forEach(w=>{
  const m=new THREE.Mesh(new THREE.BoxGeometry(w[0],w[1],w[2]),glow);
  m.position.set(w[3],w[4],w[5]);
  S.add(m)
});
// columns
const COLS=[[-6,2],[6,2],[-6,-6],[6,-6]];
COLS.forEach(p=>{
  const c=new THREE.Mesh(new THREE.CylinderGeometry(.45,.5,8,24),std(0x2b3563,.5,.2));
  c.position.set(p[0],4,p[1]);
  c.castShadow=true;
  S.add(c);
  const r=new THREE.Mesh(new THREE.TorusGeometry(.47,.05,8,32),glow);
  r.rotation.x=Math.PI/2;
  r.position.set(p[0],.6,p[1]);
  S.add(r)
});
// centerpiece
const ped=new THREE.Mesh(new THREE.CylinderGeometry(1.2,1.4,.5,32),std(0x2b3563,.4,.4));
ped.position.set(0,.25,-3);
S.add(ped);
