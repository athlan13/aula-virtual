/* Layar pembuka (tombol MASUK) */

const intro=document.getElementById('intro'),ibar=document.getElementById('ibar'),igo=document.getElementById('igo'),istat=document.getElementById('istat');
let started=false;
(function(){
  let p=0;
  const iv=setInterval(()=>{
    p=Math.min(100,p+4+Math.random()*7);
    ibar.style.width=p+'%';
    istat.textContent=p<100?'Menyiapkan aula... '+Math.floor(p)+'%':'Siap!';
    if(p>=100){
      clearInterval(iv);
      igo.disabled=false
    }
  },60)
})();
function startWorld(){
  if(started)return;
  started=true;
  intro.classList.add('hide');
  setTimeout(()=>{
    intro.style.display='none'
  },900)
}
igo.addEventListener('click',startWorld);
addEventListener('keydown',e=>{
  if(!started&&!igo.disabled&&(e.key==='Enter'||e.key===' '))startWorld()
});
