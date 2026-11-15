/* Ornamen hologram + ikon logo di setiap panel */

const ORNG=[()=>new THREE.OctahedronGeometry(.45),()=>new THREE.IcosahedronGeometry(.45,0),()=>new THREE.TorusGeometry(.35,.1,8,24),()=>new THREE.DodecahedronGeometry(.45),()=>new THREE.TetrahedronGeometry(.5),()=>new THREE.TorusKnotGeometry(.3,.09,64,8),()=>new THREE.BoxGeometry(.6,.6,.6),()=>new THREE.OctahedronGeometry(.45,1),()=>new THREE.IcosahedronGeometry(.45,1)];
const bFS=['uniform float time,ph;uniform vec3 col;varying vec2 vUv;', 'void main(){vec2 p=(vUv-.5)*vec2(5.85,4.1);vec2 q=abs(p)-vec2(2.8,1.9);float d=max(q.x,q.y);', 'float edge=(1.-smoothstep(0.,.05,abs(d)))+(1.-smoothstep(0.,.3,abs(d)))*.1;', 'float pulse=pow(.5+.5*sin(atan(p.y,p.x)*2.+time*1.6+ph),5.);', 'float cr=smoothstep(2.2,2.8,abs(p.x))*smoothstep(1.3,1.9,abs(p.y));', 'float a=edge*(.4+.9*pulse+cr*.9);', 'a+=(1.-smoothstep(0.,.04,abs(vUv.y-fract(time*.22+ph*.13))))*.16*step(d,-.05);', 'a*=.9+.1*sin(time*30.)*step(.97,fract(time*.3+ph));', 'gl_FragColor=vec4(col*1.25,a);}'].join('\n');
function rr(c,x,y,w,h,r){
  c.beginPath();
  c.moveTo(x+r,y);
  c.arcTo(x+w,y,x+w,y+h,r);
  c.arcTo(x+w,y+h,x,y+h,r);
  c.arcTo(x,y+h,x,y,r);
  c.arcTo(x,y,x+w,y,r);
  c.closePath()
}
const FN='px Segoe UI,Arial,sans-serif';
const ICONS=[ c=>{
  c.beginPath();
  c.arc(128,90,38,0,6.28);
  c.stroke();
  c.beginPath();
  c.arc(128,235,85,Math.PI,0);
  c.stroke()
}, c=>{
  c.beginPath();
  c.moveTo(128,55);
  c.lineTo(232,105);
  c.lineTo(128,155);
  c.lineTo(24,105);
  c.closePath();
  c.stroke();
  c.beginPath();
  c.moveTo(68,135);
  c.lineTo(68,185);
  c.quadraticCurveTo(128,225,188,185);
  c.lineTo(188,135);
  c.stroke();
  c.beginPath();
  c.moveTo(222,110);
  c.lineTo(222,175);
  c.stroke()
}, c=>{
  c.fillStyle='#34d399';
  [50,90,130,170].forEach((h,k)=>c.fillRect(34+k*50,200-h,34,h));
  c.beginPath();
  c.moveTo(30,105);
  c.lineTo(95,70);
  c.lineTo(140,92);
  c.lineTo(215,35);
  c.stroke();
  c.beginPath();
  c.moveTo(185,32);
  c.lineTo(217,33);
  c.lineTo(212,64);
  c.stroke();
  c.fillStyle='#e0fbff';
  c.textAlign='center';
  c.font='800 44'+FN;
  c.fillText('BEI',128,248)
}, c=>{
  c.textAlign='center';
  c.fillStyle='#7db4ff';
  c.font='800 66'+FN;
  c.fillText('mandiri',128,125);
  c.strokeStyle='#fbbf24';
  c.lineWidth=12;
  c.beginPath();
  c.moveTo(30,150);
  c.quadraticCurveTo(128,185,226,140);
  c.stroke();
  c.fillStyle='#e0fbff';
  c.font='600 26'+FN;
  c.fillText('BANK MANDIRI',128,225)
}, c=>{
  c.textAlign='center';
  c.fillStyle='#f9a8d4';
  c.font='800 112'+FN;
  c.fillText('</>',128,160)
}, c=>{
  const L=[[50,[70,128,186]],[128,[45,100,156,211]],[206,[70,128,186]]];
  c.lineWidth=2.5;
  c.globalAlpha=.55;
  for(let a=0;a<2;a++)L[a][1].forEach(y1=>L[a+1][1].forEach(y2=>{
    c.beginPath();
    c.moveTo(L[a][0],y1);
    c.lineTo(L[a+1][0],y2);
    c.stroke()
  }));
  c.globalAlpha=1;
  c.fillStyle='#fb7185';
  L.forEach(l=>l[1].forEach(y=>{
    c.beginPath();
    c.arc(l[0],y,13,0,6.28);
    c.fill()
  }));
  c.fillStyle='#e0fbff';
  c.textAlign='center';
  c.font='800 40'+FN;
  c.fillText('ML',128,248)
}, c=>{
  rr(c,28,80,200,100,46);
  c.stroke();
  c.lineWidth=10;
  c.beginPath();
  c.moveTo(80,112);
  c.lineTo(80,150);
  c.moveTo(61,131);
  c.lineTo(99,131);
  c.stroke();
  c.fillStyle='#38bdf8';
  [[170,112],[196,138]].forEach(p=>{
    c.beginPath();
    c.arc(p[0],p[1],12,0,6.28);
    c.fill()
  });
  c.fillStyle='#e0fbff';
  c.textAlign='center';
  c.font='800 34'+FN;
  c.fillText('GODOT 2D',128,235)
}, c=>{
  c.beginPath();
  c.moveTo(58,70);
  c.lineTo(58,160);
  c.moveTo(198,70);
  c.lineTo(198,160);
  c.stroke();
  [70,115,160].forEach(y=>{
    c.beginPath();
    c.ellipse(128,y,70,22,0,0,6.28);
    c.stroke()
  });
  c.fillStyle='#e0fbff';
  c.textAlign='center';
  c.font='800 32'+FN;
  c.fillText('SQL · NoSQL',128,235)
}, c=>{
  rr(c,28,70,200,130,16);
  c.stroke();
  c.beginPath();
  c.moveTo(34,82);
  c.lineTo(128,150);
  c.lineTo(222,82);
  c.stroke()
}];
const iFS=['uniform sampler2D map;uniform float time;uniform vec3 tint;varying vec2 vUv;', 'void main(){vec4 t=texture2D(map,vUv);float rr=texture2D(map,vUv+vec2(.006,0.)).r;float bb=texture2D(map,vUv-vec2(.006,0.)).b;', 'vec3 c=vec3(rr,t.g,bb)*.75+tint*t.a*.45;', 'float scan=.7+.3*sin(vUv.y*180.-time*6.);float fl=.9+.1*sin(time*31.)*sin(time*9.);', 'float sw=(1.-smoothstep(0.,.05,abs(vUv.y-fract(time*.4))))*.35*t.a;', 'float edge=smoothstep(0.,.06,vUv.y)*smoothstep(1.,.94,vUv.y);', 'gl_FragColor=vec4((c*scan*fl+sw)*1.3,t.a*scan*fl*edge);}'].join('\n');
function makeIcon(i){
  const cv=document.createElement('canvas');
  cv.width=cv.height=256;
  const c=cv.getContext('2d');
  c.lineWidth=9;
  c.lineCap=c.lineJoin='round';
  c.strokeStyle='#e0fbff';
  c.fillStyle='#e0fbff';
  c.shadowBlur=0;
  ICONS[i](c);
  const G=64,SZ=1.5,cell=SZ/G,DEP=4,img=c.getImageData(0,0,256,256).data,tint=new THREE.Color(PANELS[i].c),pts=[];
  for(let gy=0;gy<G;gy++)for(let gx=0;gx<G;gx++){
    let ba=0,bk=0;
    for(let dy=0;dy<4;dy++)for(let dx=0;dx<4;dx++){
      const k=((gy*4+dy)*256+gx*4+dx)*4;
      if(img[k+3]>ba){
        ba=img[k+3];
        bk=k
      }
    }
    if(ba>120)pts.push([gx,gy,new THREE.Color(img[bk]/255,img[bk+1]/255,img[bk+2]/255).multiplyScalar(.6).add(tint.clone().multiplyScalar(.5))])
  }
  const mat=new THREE.MeshBasicMaterial({transparent:true,opacity:.85,blending:AD,depthWrite:false});
  const im=new THREE.InstancedMesh(new THREE.BoxGeometry(cell*.9,cell*.9,cell*1.4),mat,pts.length*DEP),dm=new THREE.Object3D();
  let cnt=0;
  pts.forEach(p=>{
    for(let z=0;z<DEP;z++){
      dm.position.set((p[0]-G/2+.5)*cell,(G/2-p[1]-.5)*cell,(z-(DEP-1)/2)*cell*1.5);
      dm.updateMatrix();
      im.setMatrixAt(cnt,dm.matrix);
      im.setColorAt(cnt,p[2].clone().multiplyScalar(z===0||z===DEP-1?1:.4));
      cnt++
    }
  });
  im.frustumCulled=false;
  const scan=new THREE.Mesh(new THREE.PlaneGeometry(1.7,.035),new THREE.MeshBasicMaterial({color:tint,transparent:true,opacity:.75,blending:AD,depthWrite:false,side:THREE.DoubleSide}));
  const grp=new THREE.Group();
  grp.add(im,scan);
  grp.userData={mat,scan};
  return grp
}
const orns=[];
function mkOrns(){
  frames.forEach((fr,i)=>{
    const g=fr.parent,col=new THREE.Color(PANELS[i].c);
    const bm=new THREE.ShaderMaterial({transparent:true,depthWrite:false,side:THREE.DoubleSide,blending:AD,uniforms:{time:{value:0},col:{value:col},ph:{value:i*1.7}},vertexShader:VS,fragmentShader:bFS});
    const b=new THREE.Mesh(new THREE.PlaneGeometry(5.85,4.1),bm);
    b.position.z=.1;
    g.add(b);
    const am=()=>new THREE.MeshBasicMaterial({color:col,transparent:true,blending:AD,depthWrite:false,side:THREE.DoubleSide});
    const sh=makeIcon(i);
    sh.position.set(0,2.9,.5);
    g.add(sh);
    const rg=new THREE.Mesh(new THREE.TorusGeometry(.95,.014,6,80),am());
    rg.material.opacity=.7;
    rg.position.copy(sh.position);
    g.add(rg);
    const bc=new THREE.Mesh(new THREE.CylinderGeometry(.45,.05,.8,24,1,true),am());
    bc.material.opacity=.12;
    bc.position.set(0,2.15,.45);
    g.add(bc);
    const fl=new THREE.Mesh(new THREE.RingGeometry(.55,.62,48),am());
    fl.material.opacity=.6;
    fl.rotation.x=-Math.PI/2;
    fl.position.set(0,-3.56,1.9);
    g.add(fl);
    const fd=new THREE.Mesh(new THREE.CircleGeometry(.5,32),am());
    fd.material.opacity=.15;
    fd.rotation.x=-Math.PI/2;
    fd.position.set(0,-3.57,1.9);
    g.add(fd);
    orns.push({bm,sh,rg,fl,fd})
  })
}
function ornUpdate(T){
  orns.forEach((o,i)=>{
    o.bm.uniforms.time.value=T;
    const n=i===near;
    o.sh.rotation.y=Math.sin(T*.7+i)*.9;
    o.sh.position.y=2.9+Math.sin(T*1.4+i)*.08;
    o.sh.userData.mat.opacity=.8+.12*Math.sin(T*9+i)*Math.sin(T*2.3+i)-(Math.random()<.01?.3:0);
    o.sh.userData.scan.position.y=((T*.5+i*.2)%1-.5)*1.6;
    o.sh.scale.setScalar(n?1.35:1);
    o.rg.position.y=o.sh.position.y;
    o.rg.rotation.set(1.2,T*.9+i,0);
    o.fl.material.opacity=n?1:.5+.25*Math.sin(T*2+i);
    o.fl.scale.setScalar(1+((T*.6+i*.3)%1)*(n?.4:.15));
    o.fd.material.opacity=n?.4:.15
  })
}
