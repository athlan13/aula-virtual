/* Ornamen hologram + ikon logo di setiap panel */

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
const TX=(c,s,x,y,sz,col,w)=>{
  c.fillStyle=col;
  c.font=(w||700)+' '+sz+FN;
  c.textAlign='center';
  c.fillText(s,x,y)
};
const CI=(c,x,y,r,f)=>{
  c.beginPath();
  c.arc(x,y,r,0,6.283);
  f?c.fill():c.stroke()
};
const LN=(c,a)=>{
  c.beginPath();
  c.moveTo(a[0],a[1]);
  for(let k=2;k<a.length;k+=2)c.lineTo(a[k],a[k+1]);
  c.stroke()
};
// Ikon digambar di kanvas 512x512 lalu ditumpuk berlapis jadi hologram 3D
const LG=(c,im,x,y,w,h)=>{
  if(!im.complete||!im.naturalWidth)return;
  const r=Math.min(w/im.naturalWidth,h/im.naturalHeight),dw=im.naturalWidth*r,dh=im.naturalHeight*r;
  c.drawImage(im,x+(w-dw)/2,y+(h-dh)/2,dw,dh)
};
const ICONS=[ c=>{
  const a='#7dd3fc';
  c.strokeStyle=a;
  c.lineWidth=6;
  CI(c,256,215,168);
  c.lineWidth=2.5;
  CI(c,256,215,186);
  for(let k=0;k<48;k++){
    const t=k/48*6.283,r2=k%4?196:208;
    LN(c,[256+Math.cos(t)*186,215+Math.sin(t)*186,256+Math.cos(t)*r2,215+Math.sin(t)*r2])
  }
  c.fillStyle='rgba(125,211,252,.28)';
  CI(c,256,170,50,1);
  c.strokeStyle='#e0fbff';
  c.lineWidth=9;
  CI(c,256,170,50);
  c.beginPath();
  c.arc(256,335,100,Math.PI*1.1,Math.PI*1.9);
  c.stroke();
  TX(c,'FARHAN FADILLAH',256,458,40,'#e0fbff');
  TX(c,'DATA · IT OPERATIONS · NETWORK',256,496,22,a,500)
}, c=>{
  const a='#a78bfa';
  LG(c,LOGO.ug,86,14,340,340);
  TX(c,'UNIVERSITAS GUNADARMA',256,408,34,'#e0fbff');
  TX(c,'S1 INFORMATIKA · IPK 3.73',256,448,24,a,500);
  TX(c,'PENDIDIKAN · 2021–2025',256,486,22,'#c4b5fd',500)
}, c=>{
  const g='#34d399';
  LG(c,LOGO.idx,56,6,400,400);
  TX(c,'MAGANG IT OPERATIONS',256,446,32,'#e0fbff');
  TX(c,'SYSTEM MANAGEMENT · APR–AGU 2026',256,486,22,g,500)
}, c=>{
  LG(c,LOGO.mandiri,26,40,460,260);
  TX(c,'BANK MANDIRI',256,372,42,'#e0fbff');
  TX(c,'IT INFRASTRUKTUR · ENDPOINT MANAGEMENT',256,416,21,'#fde68a',500);
  TX(c,'MAGANG SEJAK AGUSTUS 2026',256,452,21,'#93c5fd',500)
}, c=>{
  const p='#f472b6';
  c.lineWidth=7;
  c.strokeStyle='#e0fbff';
  rr(c,50,50,412,300,28);
  c.stroke();
  LN(c,[50,105,462,105]);
  [0,1,2].forEach(k=>{
    c.fillStyle=['#fb7185','#fbbf24','#34d399'][k];
    CI(c,88+k*34,78,10,1)
  });
  [[80,150,140,p],[80,190,200,'#7dd3fc'],[110,230,150,'#fbbf24'],[110,270,170,'#34d399'],[80,310,110,p]].forEach(l=>{
    c.fillStyle=l[3];
    c.globalAlpha=.8;
    rr(c,l[0],l[1],l[2],16,8);
    c.fill()
  });
  c.globalAlpha=1;
  TX(c,'</>',400,290,92,p,800);
  TX(c,'SKILLS',256,425,54,'#e0fbff',800);
  TX(c,'PYTHON · SQL · CISCO · TABLEAU · FIGMA',256,474,22,p,500)
}, c=>{
  const r='#fb7185',X=[70,190,322,442],Y=[[170,250,330],[100,175,250,325,400],[100,175,250,325,400],[170,250,330]];
  c.lineWidth=1.6;
  c.globalAlpha=.4;
  c.strokeStyle='#fecdd3';
  for(let a=0;a<3;a++)Y[a].forEach(y1=>Y[a+1].forEach(y2=>LN(c,[X[a],y1,X[a+1],y2])));
  c.globalAlpha=1;
  Y.forEach((ys,k)=>ys.forEach(y=>{
    c.fillStyle='#fff1f2';
    CI(c,X[k],y,k?14:18,1);
    c.strokeStyle=r;
    c.lineWidth=5;
    CI(c,X[k],y,k?21:26)
  }));
  TX(c,'MACHINE LEARNING',256,455,44,'#e0fbff',800);
  TX(c,'RANDOM FOREST · NETWORK SECURITY',256,492,22,r,500)
}, c=>{
  const b='#478cbf';
  c.fillStyle=b;
  [[160,100],[352,100]].forEach(p=>CI(c,p[0],p[1],44,1));
  rr(c,110,110,292,230,70);
  c.fill();
  c.fillStyle='#fff';
  [[205,215],[307,215]].forEach(p=>CI(c,p[0],p[1],42,1));
  c.fillStyle='#1b2a41';
  [[212,222],[300,222]].forEach(p=>CI(c,p[0],p[1],19,1));
  c.fillStyle='#fff';
  rr(c,236,262,40,36,10);
  c.fill();
  TX(c,'GODOT',256,412,66,'#e0fbff',800);
  TX(c,'2D ANDROID GAME',256,452,28,'#7dd3fc',600);
  TX(c,'PENULISAN ILMIAH',256,488,22,'#bae6fd',500)
}, c=>{
  const o='#f97316',w='#e0fbff';
  c.strokeStyle=w;
  c.lineWidth=6;
  LN(c,[58,110,58,210]);
  LN(c,[162,110,162,210]);
  [110,160,210].forEach(y=>{
    c.beginPath();
    c.ellipse(110,y,52,18,0,0,6.283);
    c.stroke()
  });
  c.fillStyle=o;
  [[215,70],[260,120],[305,170]].forEach(b=>c.fillRect(b[0]-17,220-b[1],34,b[1]));
  LN(c,[190,222,330,222]);
  c.strokeStyle=o;
  [[345,80],[455,80],[345,205],[455,205]].forEach(p=>LN(c,[400,140,p[0],p[1]]));
  c.fillStyle=w;
  [[400,140],[345,80],[455,80],[345,205],[455,205]].forEach(p=>CI(c,p[0],p[1],14,1));
  TX(c,'DATABASE',110,262,24,w,600);
  TX(c,'ANALYTICS',260,262,24,w,600);
  TX(c,'NETWORK',400,262,24,w,600);
  TX(c,'TOOLS',256,372,76,w,800);
  TX(c,'PYTHON · TABLEAU · FIGMA · CISCO',256,430,24,o,600);
  TX(c,'POSTGRESQL · MONGODB · MS OFFICE',256,468,24,'#fdba74',500)
}, c=>{
  const t='#22d3ee';
  c.fillStyle='rgba(34,211,238,.2)';
  rr(c,60,100,392,250,26);
  c.fill();
  c.lineWidth=8;
  c.strokeStyle='#e0fbff';
  c.stroke();
  LN(c,[68,114,256,240,444,114]);
  TX(c,'@',256,325,80,t,700);
  TX(c,'CONTACT',256,420,60,'#e0fbff',800);
  TX(c,'MARI TERHUBUNG · CIBITUNG, BEKASI',256,468,22,t,500)
}];
function makeIcon(i){
  const cv=document.createElement('canvas');
  cv.width=cv.height=512;
  const c=cv.getContext('2d');
  c.lineWidth=7;
  c.lineCap=c.lineJoin='round';
  c.strokeStyle='#e0fbff';
  c.fillStyle='#e0fbff';
  c.shadowColor=PANELS[i].c;
  c.shadowBlur=14;
  ICONS[i](c);
  const tex=new THREE.CanvasTexture(cv);
  const LK={1:'ug',2:'idx',3:'mandiri'}[i];
  if(LK&&!LOGO[LK].complete)LOGO[LK].addEventListener('load',()=>{
    c.clearRect(0,0,512,512);
    ICONS[i](c);
    tex.needsUpdate=true
  });
  tex.anisotropy=8;
  tex.encoding=THREE.sRGBEncoding;
  const grp=new THREE.Group(),N=7,SZ=1.9,DZ=.3,mats=[];
  const bd=new THREE.Mesh(new THREE.PlaneGeometry(2.1,2.1),new THREE.MeshBasicMaterial({color:0x050914,transparent:true,opacity:.72,depthWrite:false,side:THREE.DoubleSide}));
  bd.position.z=-.22;
  grp.add(bd);
  const rim=new THREE.LineSegments(new THREE.EdgesGeometry(new THREE.PlaneGeometry(2.1,2.1)),new THREE.LineBasicMaterial({color:new THREE.Color(PANELS[i].c),transparent:true,opacity:.85}));
  rim.position.z=-.22;
  grp.add(rim);
  for(let k=0;k<N;k++){
    const edge=k===0||k===N-1;
    const m=new THREE.MeshBasicMaterial({map:tex,transparent:true,opacity:k===N-1?.6:edge?.2:.04,blending:AD,depthWrite:false,side:THREE.DoubleSide});
    const p=new THREE.Mesh(new THREE.PlaneGeometry(SZ,SZ),m);
    p.position.z=(k/(N-1)-.5)*DZ;
    grp.add(p);
    mats.push(m)
  }
  const scan=new THREE.Mesh(new THREE.PlaneGeometry(SZ+.1,.04),new THREE.MeshBasicMaterial({color:new THREE.Color(PANELS[i].c),transparent:true,opacity:.7,blending:AD,depthWrite:false,side:THREE.DoubleSide}));
  grp.add(scan);
  grp.userData={mat:mats[N-1],scan};
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
    sh.position.set(0,3.05,.5);
    g.add(sh);
    const rg=new THREE.Mesh(new THREE.TorusGeometry(1.2,.014,6,96),am());
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
    o.sh.position.y=3.05+Math.sin(T*1.4+i)*.08;
    o.sh.userData.mat.opacity=.6+.1*Math.sin(T*9+i)*Math.sin(T*2.3+i)-(Math.random()<.01?.25:0);
    o.sh.userData.scan.position.y=((T*.5+i*.2)%1-.5)*1.6;
    o.sh.scale.setScalar(n?1.35:1);
    o.rg.position.y=o.sh.position.y;
    o.rg.rotation.set(1.2,T*.9+i,0);
    o.fl.material.opacity=n?1:.5+.25*Math.sin(T*2+i);
    o.fl.scale.setScalar(1+((T*.6+i*.3)%1)*(n?.4:.15));
    o.fd.material.opacity=n?.4:.15
  })
}
