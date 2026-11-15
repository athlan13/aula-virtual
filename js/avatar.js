/* Karakter 3D manusia */

const M=(c,r=.7)=>std(c,r);
function build(){
  const root=new THREE.Group(),body=new THREE.Group();
  root.add(body);
  const skin=M(CFG.skin,.65),shirt=M(CFG.shirt,.8),pants=M(CFG.pants,.85),shoe=M(CFG.shoes,.5),hair=M(CFG.hair,.9);
  const add=(geo,mt,x,y,z,par)=>{
    const m=new THREE.Mesh(geo,mt);
    m.position.set(x,y,z);
    m.castShadow=true;
    (par||body).add(m);
    return m
  };
  const sph=(r,sx,sy,sz)=>{
    const g=new THREE.SphereGeometry(r,24,16);
    g.scale(sx,sy,sz);
    return g
  };
  const torso=add(new THREE.CylinderGeometry(.33,.27,.72,24),shirt,0,1.22,0);
  torso.scale.z=.68;
  const chest=add(sph(.37,1,.5,.62),shirt,0,1.52,0);
  add(sph(.3,1,.7,.7),pants,0,.92,0);
  add(new THREE.CylinderGeometry(.08,.09,.14,12),skin,0,1.7,0);
  const head=new THREE.Group();
  head.position.set(0,1.88,0);
  body.add(head);
  add(sph(.2,.9,1.08,1),skin,0,0,0,head);
  add(sph(.04,1,1,.6),skin,0,-.02,.2,head);
  // nose
  [-.2,.2].forEach(x=>add(sph(.04,.6,1,1),skin,x,-.01,0,head));
  const hg=new THREE.SphereGeometry(.215,28,18,0,Math.PI*2,0,Math.PI*.58);
  hg.scale(.95,1.1,1.05);
  const h1=add(hg,hair,0,.03,-.02,head);
  h1.rotation.x=-.2;
  add(sph(.2,.95,1,.7),hair,0,.04,-.08,head);
  add(sph(.2,.9,.28,.5),hair,0,.15,.1,head).rotation.x=.45;
  const eyes=new THREE.Group();
  head.add(eyes);
  [-.075,.075].forEach(x=>{
    add(sph(.032,1.1,.8,.5),M(0xffffff,.3),x,.03,.178,eyes);
    add(sph(.017,1,1,.5),M(0x1a1210,.2),x,.03,.2,eyes);
    add(new THREE.BoxGeometry(.07,.012,.02),hair,x,.09,.19,head)
  });
  add(new THREE.BoxGeometry(.07,.012,.015),M(0x9c4a46,.5),0,-.1,.185,head);
  function arm(s){
    const p=new THREE.Group();
    p.position.set(s*.42,1.54,0);
    body.add(p);
    add(new THREE.CylinderGeometry(.075,.065,.32,14),shirt,0,-.16,0,p);
    const e=new THREE.Group();
    e.position.y=-.32;
    p.add(e);
    add(new THREE.CylinderGeometry(.06,.05,.3,14),skin,0,-.15,0,e);
    add(sph(.06,1,1.1,.8),skin,0,-.33,0,e);
    return{p,e}
  }
  function leg(s){
    const p=new THREE.Group();
    p.position.set(s*.14,.92,0);
    body.add(p);
    add(new THREE.CylinderGeometry(.11,.09,.44,14),pants,0,-.22,0,p);
    const k=new THREE.Group();
    k.position.y=-.44;
    p.add(k);
    add(new THREE.CylinderGeometry(.085,.07,.44,14),pants,0,-.22,0,k);
    add(new THREE.BoxGeometry(.15,.09,.3),shoe,0,-.46,.05,k);
    return{p,k}
  }
  const aL=arm(1),aR=arm(-1),lL=leg(1),lR=leg(-1);
  return{root,body,head,eyes,chest,aL,aR,lL,lR}
}
const av=build();
av.root.position.set(0,0,7.5);
S.add(av.root);
