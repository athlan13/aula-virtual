/* Hologram F-HOLO di tengah aula */

const HX=0,HZ=-3,HY=2.4,AD=THREE.AdditiveBlending;
const hcv=document.createElement('canvas');
hcv.width=1024;
hcv.height=320;
const hctx=hcv.getContext('2d');
hctx.textAlign='center';
hctx.textBaseline='middle';
hctx.shadowColor='#22d3ee';
hctx.shadowBlur=30;
hctx.fillStyle='#e0fbff';
hctx.font='800 190px Segoe UI,Arial,sans-serif';
hctx.fillText('F-HOLO',512,140);
hctx.shadowBlur=10;
hctx.font='600 54px Segoe UI,Arial,sans-serif';
hctx.fillStyle='#7dd3fc';
hctx.fillText('Farhan Fadillah',512,268);
hctx.shadowBlur=0;
hctx.strokeStyle='#22d3ee';
hctx.lineWidth=4;
[[10,10,1,1],[1014,10,-1,1],[10,310,1,-1],[1014,310,-1,-1]].forEach(a=>{
  hctx.beginPath();
  hctx.moveTo(a[0]+a[2]*60,a[1]);
  hctx.lineTo(a[0],a[1]);
  hctx.lineTo(a[0],a[1]+a[3]*60);
  hctx.stroke()
});
const VS='varying vec2 vUv;void main(){vUv=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}';
const holoMat=new THREE.ShaderMaterial({transparent:true,depthWrite:false,side:THREE.DoubleSide,blending:AD,uniforms:{map:{value:new THREE.CanvasTexture(hcv)},time:{value:0},tint:{value:new THREE.Color(0x22d3ee)}},vertexShader:VS, fragmentShader:['uniform sampler2D map;uniform float time;uniform vec3 tint;varying vec2 vUv;', 'float hh(float n){return fract(sin(n*91.3)*43758.5);}', 'void main(){vec2 uv=vUv;float band=floor(uv.y*24.+time*3.);', 'float g=step(.93,hh(band+floor(time*6.)))*(hh(band)-.5)*.08;uv.x+=g;', 'vec4 t=texture2D(map,uv);float r=texture2D(map,uv+vec2(.004,0.)).r;float b=texture2D(map,uv-vec2(.004,0.)).b;', 'vec3 c=vec3(r,t.g,b)*(.6+.4*tint)+tint*t.a*.35;', 'float scan=.72+.28*sin(vUv.y*260.-time*8.);float fl=.88+.12*sin(time*37.)*sin(time*11.);', 'float fade=smoothstep(0.,.08,vUv.y)*smoothstep(1.,.92,vUv.y);', 'gl_FragColor=vec4(c*scan*fl,t.a*scan*fl*fade);}'].join('\n')});
const holo=new THREE.Group();
holo.position.set(HX,HY,HZ);
S.add(holo);
holo.add(new THREE.Mesh(new THREE.PlaneGeometry(4.2,1.31),holoMat));
const ico=new THREE.Mesh(new THREE.IcosahedronGeometry(1.15,1),new THREE.MeshBasicMaterial({color:0x22d3ee,wireframe:true,transparent:true,opacity:.22,blending:AD,depthWrite:false}));
holo.add(ico);
const hrings=[0,1].map(i=>{
  const r=new THREE.Mesh(new THREE.TorusGeometry(1.95+i*.3,.014,6,120),new THREE.MeshBasicMaterial({color:i?0xa78bfa:0x22d3ee,transparent:true,opacity:.75,blending:AD,depthWrite:false}));
  holo.add(r);
  return r
});
const beamMat=new THREE.ShaderMaterial({transparent:true,depthWrite:false,side:THREE.DoubleSide,blending:AD,uniforms:{time:{value:0}},vertexShader:VS,fragmentShader:'uniform float time;varying vec2 vUv;void main(){float a=(1.-vUv.y)*.45*(.75+.25*sin(vUv.y*40.-time*4.));gl_FragColor=vec4(.13,.83,.93,a);}'});
const beam=new THREE.Mesh(new THREE.CylinderGeometry(1.3,.35,1.6,48,1,true),beamMat);
beam.position.set(HX,1.3,HZ);
S.add(beam);
const disc=new THREE.Mesh(new THREE.CircleGeometry(.85,48),new THREE.MeshBasicMaterial({color:0x22d3ee,transparent:true,opacity:.35,blending:AD,depthWrite:false}));
disc.rotation.x=-Math.PI/2;
disc.position.set(HX,.51,HZ);
S.add(disc);
const ripples=[0,1].map(()=>{
  const m=new THREE.Mesh(new THREE.RingGeometry(.9,.96,64),new THREE.MeshBasicMaterial({color:0x22d3ee,transparent:true,side:THREE.DoubleSide,blending:AD,depthWrite:false}));
  m.rotation.x=-Math.PI/2;
  m.position.set(HX,.53,HZ);
  S.add(m);
  return m
});
const PN=170,ppos=new Float32Array(PN*3),pseed=[];
for(let i=0;i<PN;i++)pseed.push([Math.random()*6.28,Math.random(),.5+Math.random()]);
const pgeo=new THREE.BufferGeometry();
pgeo.setAttribute('position',new THREE.BufferAttribute(ppos,3));
const pts=new THREE.Points(pgeo,new THREE.PointsMaterial({color:0x7dd3fc,size:.06,transparent:true,opacity:.9,blending:AD,depthWrite:false}));
pts.frustumCulled=false;
S.add(pts);
const hl=new THREE.PointLight(0x22d3ee,1.2,12);
hl.position.set(HX,2.2,HZ);
S.add(hl);
const hcA=new THREE.Color(0x22d3ee),hcB=new THREE.Color(0xa78bfa);
function holoUpdate(T){
  holoMat.uniforms.time.value=T;
  beamMat.uniforms.time.value=T;
  holoMat.uniforms.tint.value.copy(hcA).lerp(hcB,.5+.5*Math.sin(T*.5));
  holo.rotation.y=Math.atan2(cam.position.x-HX,cam.position.z-HZ);
  holo.position.y=HY+Math.sin(T*1.2)*.1;
  ico.rotation.y=T*.6;
  ico.rotation.x=T*.3;
  ico.scale.setScalar(1+Math.sin(T*2)*.04);
  hrings[0].rotation.set(1.1+Math.sin(T*.5)*.15,T*.6,0);
  hrings[1].rotation.set(-.9,-T*.45,Math.sin(T*.4)*.3);
  ripples.forEach((m,i)=>{
    const u=(T*.5+i*.5)%1;
    m.scale.setScalar(.55+u*1.5);
    m.material.opacity=(1-u)*.7
  });
  disc.material.opacity=.28+.12*Math.sin(T*3);
  for(let i=0;i<PN;i++){
    const s=pseed[i],u=(s[1]+T*.1*s[2])%1,a=s[0]+T*.8*s[2],r=.3+u*1.0*s[2];
    ppos[i*3]=HX+Math.cos(a)*r;
    ppos[i*3+1]=.6+u*2.4;
    ppos[i*3+2]=HZ+Math.sin(a)*r
  }
  pgeo.attributes.position.needsUpdate=true;
  hl.intensity=1.1+.3*Math.sin(T*3)-(Math.random()<.02?.5:0)
}
