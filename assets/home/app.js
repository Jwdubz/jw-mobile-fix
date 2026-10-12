(()=>{
const W=[
["rainbow","Rainbow Gardens","Wedding Venue"],["stirling","Stirling Club","Wedding And Event Venue"],["rana","Rana Levy","Fine Jewelry And Lapidary"],["generations","Generations Kitchen","Hawaiian Restaurant"],["paina","P\u0101\u2018ina Caf\u00e9","Hawaiian Caf\u00e9"],["prorok","Dylan Prorok","Japanese Tattoo Artist"],["heritage","Heritage Tattoo","Tattoo Studio"],["truheart","Tru Heart Consulting","Outsourced Sales Team"],["purpleflare","Purple Flare Wraps","Wraps And Fleet Graphics"],["starbase","Starbase Wraps","Tesla Wraps And PPF"],["wrapstar","Wrapstar","Wraps, Ceramic Coating And Tint"]];
const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)],root=document.documentElement;
let paused=false;
const lenis=new Lenis({lerp:.1,smoothWheel:true});window.__lenis=lenis;
(function raf(t){lenis.raf(t);requestAnimationFrame(raf)})();
lenis.stop();scrollTo(0,0);
// intro: counter 0-100, then curtain up
const intro=$('#intro'),iN=$('#introN'),iB=$('#introBar'),hv=$('#heroV');
hv.play&&hv.play().catch(()=>{});
requestAnimationFrame(()=>intro.classList.add('go'));
const t0=performance.now(),DUR=1500;
(function tick(t){const p=Math.min(1,(t-t0)/DUR),e=1-Math.pow(1-p,3);iN.textContent=Math.round(e*100);iB.style.width=(e*100)+'%';
 if(p<1)requestAnimationFrame(tick);else setTimeout(()=>{intro.classList.add('out');root.classList.add('ready');try{hv.currentTime=0;hv.play()}catch(_){}lenis.start();setTimeout(()=>intro.remove(),1200)},180)})(t0);
// payoff word lands 0.25s after payoff cut (5.5s), then stays
const po=$('#payoff'),PAY=5.75;
function pay(){if(!po.classList.contains('on')&&root.classList.contains('ready')&&(hv.currentTime>=PAY||paused))po.classList.add('on')}
hv.addEventListener('timeupdate',pay);
// fallback: land even if the film stalls, is blocked from autoplay, or loops past the cue unseen
new MutationObserver((m,o)=>{if(root.classList.contains('ready')){o.disconnect();setTimeout(()=>po.classList.add('on'),Math.max(0,(PAY-(hv.currentTime||0))*1000)+600)}}).observe(root,{attributes:true,attributeFilter:['class']});
// words
const big=$('.words');
(function split(n){[...n.childNodes].forEach(c=>{if(c.nodeType===3){const f=document.createDocumentFragment();c.textContent.split(/(\s+)/).forEach(p=>{if(!p)return;if(/^\s+$/.test(p))f.append(p);else{const s=document.createElement('span');s.className='wd';s.textContent=p;f.append(s)}});c.replaceWith(f)}else if(c.nodeType===1)split(c)})})(big);
const wds=[...big.querySelectorAll('.wd')];
// horizontal track
const track=$('#track'),work=$('.work'),wCount=$('#wCount'),wProg=$('#wProg');const cards=[];
W.forEach((w,i)=>{const a=document.createElement('a');a.className='pc';a.href=`https://${w[0]}.jarrettwroten.com/`;a.target='_blank';a.rel='noopener';a.setAttribute('aria-label',`Open The ${w[1]} Concept`);
a.innerHTML=`<div class="pc-f"><video muted loop playsinline preload="none" poster="/assets/home/film/w-${w[0]}.jpg?v=1011s" src="/assets/home/film/w-${w[0]}.mp4?v=1011s"></video></div><div class="pc-i"><span class="pc-n">${String(i+1).padStart(2,'0')}</span><span class="pc-h">${w[1]}<span class="pc-c">${w[2]}</span></span><span class="pc-o">Open The Concept</span></div>`;
track.append(a);cards.push(a)});
let cur=-1;
function setCur(i){if(i===cur)return;cur=i;cards.forEach((c,j)=>{c.classList.toggle('on',j===i);const v=c.querySelector('video');if(!window.__wn)return;if(Math.abs(j-i)<=1){v.preload='auto';if(!paused)v.play().catch(()=>{})}else v.pause()});wCount.textContent=String(i+1).padStart(2,'0');const wn=$('#wName');wn.querySelectorAll('.nm:not(.gone)').forEach(o=>{o.classList.remove('cur');o.classList.add('gone');setTimeout(()=>o.remove(),1000)});const sp=document.createElement('span');sp.className='nm';sp.innerHTML=W[i][1].replace(/(\S+)$/,'<em>$1</em>');wn.append(sp);sp.style.fontSize='';const aw=wn.clientWidth;if(sp.scrollWidth>aw){sp.style.fontSize=(parseFloat(getComputedStyle(sp).fontSize)*aw/sp.scrollWidth*0.98)+'px'}requestAnimationFrame(()=>requestAnimationFrame(()=>sp.classList.add('cur')))}
// reveals
const obs=$$('.fade,.mask,.me-p');
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{rootMargin:'0px 0px -12% 0px'});obs.forEach(o=>io.observe(o));
// lazy videos
const lz=$$('video[data-src]');
const lio=new IntersectionObserver(es=>es.forEach(e=>{const v=e.target;if(e.isIntersecting){if(!v.src)v.src=v.dataset.src;if(!paused)v.play().catch(()=>{})}else v.pause()}),{rootMargin:'300px'});lz.forEach(v=>lio.observe(v));
new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){if(!paused)hv.play().catch(()=>{})}else hv.pause()})).observe(hv);
// counter
const num=$('#num');let counted=false;
function count(){if(counted)return;counted=true;const to=40114.81,s=performance.now(),D=2400;(function f(t){const p=Math.min(1,(t-s)/D),e=1-Math.pow(1-p,4);num.textContent='$'+(to*e).toLocaleString('en-US',{minimumFractionDigits:2,maximumFractionDigits:2});if(p<1&&!paused)requestAnimationFrame(f);else num.textContent='$40,114.81'})(s)}

// stacked cards + end film + header
const stackCards=$$('.card'),endW=$('.end-v-w'),bar=$('#bar');let last=0;
function onScroll(){const vh=innerHeight,y=scrollY;
 const b=big.getBoundingClientRect();const p=Math.min(1,Math.max(0,(vh*.85-b.top)/(b.height+vh*.3)));const n=Math.round(p*wds.length);wds.forEach((w,i)=>w.classList.toggle('lit',i<n||paused));
 const r=work.getBoundingClientRect(),span=r.height-vh;const q=Math.min(1,Math.max(0,-r.top/span));
 const max=track.scrollWidth-innerWidth;track.style.transform=`translate3d(${-q*max}px,0,0)`;wProg.style.width=(q*100)+'%';
 const center=innerWidth/2;let best=0,bd=1e9;cards.forEach((c,j)=>{const cr=c.getBoundingClientRect();const d=Math.abs(cr.left+cr.width/2-center);if(d<bd){bd=d;best=j}});if(q>=.985)best=cards.length-1;else if(q<=.015)best=0;if(r.top<vh&&r.bottom>0)setCur(best);
 if(innerWidth>860)stackCards.forEach((c,i)=>{const nx=stackCards[i+1];if(!nx){c.style.transform='';return}const nr=nx.getBoundingClientRect(),cr=c.getBoundingClientRect();const k=Math.min(1,Math.max(0,(cr.bottom-nr.top)/cr.height));c.style.transform=`scale(${1-k*.06})`;c.style.filter=`brightness(${1-k*.35})`});
 const er=endW.getBoundingClientRect();const ep=Math.min(1,Math.max(0,(vh-er.top)/(vh*.9)));const ins=18*(1-ep);endW.style.clipPath=`inset(0 ${ins}% 0 ${ins}% round 8px)`;
 bar.classList.toggle('solid',y>vh*.85);if(y>vh*.85&&y>last+2)bar.classList.add('hide');if(y<last-2||y<vh*.85)bar.classList.remove('hide');last=y;
 if(y+vh>=document.documentElement.scrollHeight-40){root.classList.add('done');obs.forEach(o=>o.classList.add('in'))}}
lenis.on('scroll',onScroll);addEventListener('scroll',onScroll,{passive:true});addEventListener('resize',onScroll);onScroll();setCur(0);
{const wk=document.querySelector('.work');new IntersectionObserver((es,o)=>{if(es[0].isIntersecting){window.__wn=1;o.disconnect();const k=cur;cur=-1;setCur(k)}},{rootMargin:'100% 0px'}).observe(wk)}
setInterval(()=>obs.forEach(o=>{if(o.getBoundingClientRect().top<innerHeight)o.classList.add('in')}),900);
// pause
const pp=$('#pp');pp.onclick=()=>{paused=!paused;pp.setAttribute('aria-pressed',paused);pp.querySelector('.pp-t').textContent=paused?'Play':'Pause';root.classList.toggle('paused',paused);
 const vs=$$('video');if(paused){vs.forEach(v=>v.pause());po.classList.add('on');wds.forEach(w=>w.classList.add('lit'));obs.forEach(o=>o.classList.add('in'));num.textContent='$40,114.81'}else{hv.play().catch(()=>{});const c=cards[cur];c&&c.querySelector('video').play().catch(()=>{});lz.forEach(v=>{if(v.src&&v.getBoundingClientRect().top<innerHeight&&v.getBoundingClientRect().bottom>0)v.play().catch(()=>{})})}};
$('#top').onclick=()=>lenis.scrollTo(0,{duration:1.8,easing:t=>t<.5?4*t*t*t:1-Math.pow(-2*t+2,3)/2});
})();
(()=>{const $=s=>document.querySelector(s),root=document.documentElement;
const wrap=$('#heroWrap'),hv=$('#heroV'),hc=$('.hero-c'),secs=[...document.querySelectorAll('[data-theme]')],cards=[...document.querySelectorAll('.pc')],work=$('.work'),tr=$('#track');
let snapT=0,snapping=false;
function loop(){const vh=innerHeight;
 const r=wrap.getBoundingClientRect();const p=Math.min(1,Math.max(0,-r.top/(r.height-vh)));const e=p*p*(3-2*p);
 hv.style.setProperty('--ix',(e*4)+'vw');hv.style.setProperty('--iy',(e*5)+'vh');hv.style.setProperty('--ir',(e*22)+'px');hc.style.transform=`translate3d(0,${-e*14}vh,0)`;hc.style.opacity=1-e*.9;
 let th='dark';for(const s of secs){const b=s.getBoundingClientRect();if(b.top<vh*.5&&b.bottom>vh*.5){th=s.dataset.theme;break}}root.classList.toggle('light',th==='light');
 const cx=innerWidth/2;cards.forEach(c=>{const b=c.getBoundingClientRect();const d=(b.left+b.width/2-cx)/innerWidth;c.style.setProperty('--px',(-d*60)+'px')});
 requestAnimationFrame(loop)}
loop();
// snap the strip to the nearest card when scrolling settles inside it (inertia from Lenis, then snap)
const L=window.__lenis;
addEventListener('scroll',()=>{clearTimeout(snapT);if(snapping)return;snapT=setTimeout(()=>{const r=work.getBoundingClientRect(),vh=innerHeight,span=r.height-vh;if(r.top>0||r.bottom<vh)return;const q=-r.top/span,max=tr.scrollWidth-innerWidth;
 const offs=cards.map(c=>Math.min(1,Math.max(0,(c.offsetLeft+c.offsetWidth/2-innerWidth/2)/max)));let best=offs[0];offs.forEach(o=>{if(Math.abs(o-q)<Math.abs(best-q))best=o});
 const target=scrollY+(best-q)*span;if(Math.abs(target-scrollY)<4)return;snapping=true;(L?L.scrollTo(target,{duration:.9,easing:t=>1-Math.pow(1-t,4),onComplete:()=>snapping=false}):(scrollTo({top:target,behavior:'smooth'}),setTimeout(()=>snapping=false,900)));setTimeout(()=>snapping=false,1100)},160)},{passive:true});
// cursor
const cur=$('#cur');let mx=-100,my=-100,x=-100,y=-100;
addEventListener('pointermove',e=>{if(e.pointerType!=='mouse')return;mx=e.clientX;my=e.clientY;cur.classList.add('on');cur.classList.toggle('big',!!e.target.closest('.pc'));cur.classList.toggle('hide',!e.target.closest('.pc')&&!!e.target.closest('a,button'))});
{const tk=document.getElementById('track');const off=()=>cur.classList.remove('big');tk.addEventListener('pointerleave',off);document.documentElement.addEventListener('pointerleave',()=>cur.classList.remove('on','big'));addEventListener('scroll',()=>{const r=tk.getBoundingClientRect();if(r.bottom<0||r.top>innerHeight||!(document.elementFromPoint(mx,my)||document.body).closest('.pc'))cur.classList.remove('big')},{passive:true})}
(function c(){x+=(mx-x)*.18;y+=(my-y)*.18;cur.style.transform=`translate3d(${x}px,${y}px,0)`;requestAnimationFrame(c)})();
// drag strip
let dn=false,sx=0,sy=0,moved=0;
tr.addEventListener('pointerdown',e=>{if(e.pointerType!=='mouse')return;dn=true;sx=e.clientX;sy=scrollY;moved=0;tr.classList.add('drag');e.preventDefault()});
addEventListener('pointermove',e=>{if(!dn)return;const dx=e.clientX-sx;moved=Math.max(moved,Math.abs(dx));const span=work.offsetHeight-innerHeight,max=tr.scrollWidth-innerWidth;scrollTo(0,sy-dx*span/max)});
addEventListener('pointerup',()=>{dn=false;tr.classList.remove('drag')});
tr.addEventListener('click',e=>{if(moved>6){e.preventDefault();e.stopPropagation()}},true);
})();
(()=>{const $=s=>document.querySelector(s);
const W=[["rainbow","Rainbow Gardens","Wedding Venue"],["stirling","Stirling Club","Event Venue"],["rana","Rana Levy","Fine Jewelry"],["generations","Generations Kitchen","Restaurant"],["paina","P\u0101\u2018ina Caf\u00e9","Caf\u00e9"],["prorok","Dylan Prorok","Tattoo Artist"],["heritage","Heritage Tattoo","Tattoo Studio"],["truheart","Tru Heart Consulting","Sales Team"],["purpleflare","Purple Flare Wraps","Wraps And Fleet"],["starbase","Starbase Wraps","Tesla Wraps"],["wrapstar","Wrapstar","Wraps And Coating"]];
const ml=$('#menuL');W.forEach((w,i)=>{const li=document.createElement('li');li.className='m-in';li.style.transitionDelay=(0.12+i*0.03)+'s';li.innerHTML=`<a href="https://${w[0]}.jarrettwroten.com/" target="_blank" rel="noopener">${w[1]}<span>${w[2]}</span></a>`;ml.append(li)});
const menu=$('#menu'),mb=$('#mbtn'),mc=$('#mclose');let last=null;
function open(){last=document.activeElement;menu.hidden=false;requestAnimationFrame(()=>menu.classList.add('open'));mb.setAttribute('aria-expanded','true');window.__lenis&&window.__lenis.stop();document.documentElement.style.overflow='hidden';setTimeout(()=>mc.focus(),50)}
function close(){menu.classList.remove('open');mb.setAttribute('aria-expanded','false');window.__lenis&&window.__lenis.start();document.documentElement.style.overflow='';setTimeout(()=>{menu.hidden=true},800);(last||mb).focus()}
mb.onclick=open;mc.onclick=close;
addEventListener('keydown',e=>{if(menu.hidden)return;if(e.key==='Escape')close();if(e.key==='Tab'){const f=[...menu.querySelectorAll('a,button')];const a=f[0],z=f[f.length-1];if(e.shiftKey&&document.activeElement===a){e.preventDefault();z.focus()}else if(!e.shiftKey&&document.activeElement===z){e.preventDefault();a.focus()}}});
menu.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>setTimeout(close,100)));
// header CTA: only between hero and finale (one primary CTA per view)
const bar=$('#bar'),hero=$('#heroWrap'),end=$('.end');
function cta(){const vh=innerHeight,h=hero.getBoundingClientRect(),e=end.getBoundingClientRect();bar.classList.toggle('cta',h.bottom<vh*.4&&e.top>vh*.85)}
addEventListener('scroll',cta,{passive:true});cta();
})();

/* walkthrough (opt-in, restored) */
(()=>{const wo=document.getElementById('walkOpen'),dlg=document.getElementById('walkDialog');if(!wo||!dlg)return;
if(!dlg.showModal){wo.addEventListener('click',()=>{location.href='/assets/home/walk/golden-arrival-approved.mp4'});return}
const v=document.getElementById('walkVideo'),sc=document.getElementById('walkScrub'),end=document.getElementById('walkEnd'),cl=document.getElementById('walkClose'),rp=document.getElementById('walkReplay');
const L=()=>window.__lenis||null;
function start(){end.hidden=true;v.currentTime=0;const p=v.play();if(p&&p.catch)p.catch(()=>{})}
wo.addEventListener('click',()=>{dlg.showModal();try{L()&&L().stop()}catch(e){}v.preload='auto';start();cl.focus()});
cl.addEventListener('click',()=>{v.pause();if(dlg.open)dlg.close()});
dlg.addEventListener('close',()=>{v.pause();try{L()&&L().start()}catch(e){}wo.focus()});
rp.addEventListener('click',start);
v.addEventListener('timeupdate',()=>{if(v.duration)sc.value=Math.round(v.currentTime/v.duration*1000)});
v.addEventListener('ended',()=>{end.hidden=false});
sc.addEventListener('input',()=>{if(v.duration){v.pause();v.currentTime=sc.value/1000*v.duration;end.hidden=true}});
sc.addEventListener('change',()=>{if(v.currentTime<v.duration-0.05){const p=v.play();if(p&&p.catch)p.catch(()=>{})}});})();

/* device QA: give the mobile card frame the real track height so the card never runs into the name line */
(function(){const t=document.getElementById('track');if(!t)return;const f=()=>{document.documentElement.style.setProperty('--trackH',t.clientHeight+'px')};f();addEventListener('resize',f,{passive:true});addEventListener('orientationchange',()=>setTimeout(f,300));addEventListener('load',f)})();
