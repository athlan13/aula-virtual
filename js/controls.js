/* Input keyboard, mouse, joystick, modal panel */

const keys={};
let cy=0,cp=.32,joy={x:0,y:0},near=-1;
addEventListener('keydown',e=>{
  const k=e.key.toLowerCase();
  keys[k]=1;
  if(k==='e')toggle();
  if(k==='escape')closeM();
  if(k.startsWith('arrow'))e.preventDefault()
});
addEventListener('keyup',e=>keys[e.key.toLowerCase()]=0);
let drag=null;
R.domElement.addEventListener('pointerdown',e=>{
  drag={x:e.clientX,y:e.clientY}
});
addEventListener('pointermove',e=>{
  if(!drag)return;
  cy-=(e.clientX-drag.x)*.006;
  cp=Math.max(.05,Math.min(1.1,cp+(e.clientY-drag.y)*.004));
  drag={x:e.clientX,y:e.clientY}
});
addEventListener('pointerup',()=>drag=null);
const J=document.getElementById('joy'),K=document.getElementById('knob');
if(matchMedia('(pointer:coarse)').matches){
  J.style.display='block';
  document.getElementById('help').textContent='Joystick: jalan · seret layar: putar kamera'
}
function jm(e){
  const r=J.getBoundingClientRect(),dx=e.clientX-r.left-60,dy=e.clientY-r.top-60,d=Math.hypot(dx,dy),m=Math.min(d,50)/50,a=Math.atan2(dy,dx);
  joy.x=Math.cos(a)*m;
  joy.y=Math.sin(a)*m;
  K.style.left=(40+joy.x*40)+'px';
  K.style.top=(40+joy.y*40)+'px'
}
J.addEventListener('pointerdown',e=>{
  e.stopPropagation();
  J.setPointerCapture(e.pointerId);
  jm(e)
});
J.addEventListener('pointermove',e=>{
  if(e.buttons||e.pressure)jm(e)
});
J.addEventListener('pointerup',()=>{
  joy={x:0,y:0};
  K.style.left=K.style.top='40px'
});
const H=document.getElementById('hint'),MO=document.getElementById('modal'),CD=document.getElementById('card');
function toggle(){
  if(MO.style.display==='flex')closeM();
  else if(near>=0)openM(near)
}
function openM(i){
  const p=PANELS[i];
  CD.style.borderTopColor=p.c;
  CD.innerHTML='<h2>'+p.t+'</h2><h3 style="color:'+p.c+'">'+p.s+'</h3><ul style="padding-left:20px">'+(p.bars?p.bars.map(b=>'<li>'+b[0]+' – '+b[1]+'%</li>').join(''):p.l.map(l=>'<li>'+l+'</li>').join(''))+'</ul><small>Tekan Esc atau ketuk di luar kartu untuk menutup</small>';
  MO.style.display='flex'
}
function closeM(){
  MO.style.display='none'
}
MO.addEventListener('click',e=>{
  if(e.target===MO)closeM()
});
H.addEventListener('click',toggle);
