const qs=(s,c=document)=>c.querySelector(s);
const qsa=(s,c=document)=>[...c.querySelectorAll(s)];
const reducedMotion=matchMedia('(prefers-reduced-motion: reduce)').matches;
const finePointer=matchMedia('(pointer:fine)').matches;

const progress=qs('.progress span');
const header=qs('.site-header');
let lastY=0;
let ticking=false;

function updateScrollUI(){
  const max=Math.max(1,document.documentElement.scrollHeight-innerHeight);
  const ratio=Math.max(0,Math.min(1,scrollY/max));
  if(progress) progress.style.transform=`scaleX(${ratio})`;
  if(header){
    header.classList.toggle('compact',scrollY>80);
    if(scrollY>lastY&&scrollY>220) header.classList.add('hidden');
    else header.classList.remove('hidden');
  }
  document.documentElement.style.setProperty('--scroll',ratio.toFixed(4));
  lastY=scrollY;
  ticking=false;
}

addEventListener('scroll',()=>{
  if(!ticking){requestAnimationFrame(updateScrollUI);ticking=true;}
},{passive:true});
updateScrollUI();

const observer=new IntersectionObserver(entries=>{
  entries.forEach(entry=>{
    if(!entry.isIntersecting) return;
    entry.target.classList.add('in');
    const group=entry.target.closest('.principles,.work-list,.proof-grid');
    if(group){
      qsa('.reveal',group).forEach((el,index)=>el.style.setProperty('--delay',`${Math.min(index*70,280)}ms`));
    }
    observer.unobserve(entry.target);
  });
},{threshold:.12,rootMargin:'0px 0px -8%'});
qsa('.reveal').forEach(el=>observer.observe(el));

const diagnosis={
  nonprofit:['Can a stranger understand the mission within ten seconds?','Is there enough visible proof to trust the organisation?','Does every important audience have a clear next action?'],
  business:['Can visitors understand the offer without working through jargon?','Does the website prove why this business is worth choosing?','Is the next step obvious, low-friction, and measurable?'],
  service:['Does the online presence match the real quality of the expertise?','Are trust, process, and outcomes visible before the sales call?','Does the inquiry flow attract serious prospects rather than random messages?'],
  creator:['Is attention being converted into an owned audience or clear offer?','Can a brand understand the creator’s value within one minute?','Is there a professional path for collaborations, products, or services?']
};

const list=qs('#diagnosis-list');
qsa('.tab').forEach(tab=>tab.addEventListener('click',()=>{
  qsa('.tab').forEach(item=>{item.classList.remove('active');item.setAttribute('aria-selected','false')});
  tab.classList.add('active');
  tab.setAttribute('aria-selected','true');
  if(!list) return;
  const next=diagnosis[tab.dataset.type].map(item=>`<li>${item}</li>`).join('');
  if(reducedMotion){list.innerHTML=next;return;}
  list.animate([
    {opacity:1,transform:'translateY(0)',filter:'blur(0)'},
    {opacity:0,transform:'translateY(-8px)',filter:'blur(5px)'}
  ],{duration:150,easing:'ease-in',fill:'forwards'}).finished.then(()=>{
    list.innerHTML=next;
    list.animate([
      {opacity:0,transform:'translateY(12px)',filter:'blur(6px)'},
      {opacity:1,transform:'translateY(0)',filter:'blur(0)'}
    ],{duration:380,easing:'cubic-bezier(.22,1,.36,1)',fill:'forwards'});
  });
}));

if(!reducedMotion){
  const heroPieces=qsa('.hero .eyebrow,.hero h1,.hero .lead,.hero .actions,.hero-visual');
  heroPieces.forEach((el,index)=>{
    el.animate([
      {opacity:0,transform:`translateY(${index===4?24:18}px)`,filter:'blur(10px)'},
      {opacity:1,transform:'translateY(0)',filter:'blur(0)'}
    ],{duration:760,delay:120+index*110,easing:'cubic-bezier(.22,1,.36,1)',fill:'both'});
  });
}

if(finePointer&&!reducedMotion){
  const glow=document.createElement('div');
  glow.className='cursor-glow';
  document.body.appendChild(glow);
  let gx=innerWidth/2,gy=innerHeight/2,cx=gx,cy=gy;
  addEventListener('pointermove',e=>{gx=e.clientX;gy=e.clientY},{passive:true});
  const follow=()=>{
    cx+=(gx-cx)*.12;cy+=(gy-cy)*.12;
    glow.style.transform=`translate3d(${cx}px,${cy}px,0)`;
    requestAnimationFrame(follow);
  };
  follow();

  const portrait=qs('.portrait-shell');
  portrait?.addEventListener('pointermove',e=>{
    const r=portrait.getBoundingClientRect();
    const x=(e.clientX-r.left)/r.width-.5;
    const y=(e.clientY-r.top)/r.height-.5;
    portrait.style.setProperty('--rx',`${(-y*4).toFixed(2)}deg`);
    portrait.style.setProperty('--ry',`${(x*4).toFixed(2)}deg`);
    portrait.style.setProperty('--px',`${((x+.5)*100).toFixed(1)}%`);
    portrait.style.setProperty('--py',`${((y+.5)*100).toFixed(1)}%`);
  });
  portrait?.addEventListener('pointerleave',()=>{
    portrait.style.setProperty('--rx','0deg');
    portrait.style.setProperty('--ry','0deg');
  });

  qsa('.button,.nav-cta').forEach(el=>{
    el.addEventListener('pointermove',e=>{
      const r=el.getBoundingClientRect();
      const x=e.clientX-r.left-r.width/2;
      const y=e.clientY-r.top-r.height/2;
      el.style.transform=`translate(${x*.08}px,${y*.12}px)`;
    });
    el.addEventListener('pointerleave',()=>el.style.transform='');
  });

  const cases=qsa('.case');
  cases.forEach(card=>{
    card.addEventListener('pointerenter',()=>{
      card.parentElement?.classList.add('has-active-case');
      card.classList.add('active-case');
    });
    card.addEventListener('pointerleave',()=>{
      card.parentElement?.classList.remove('has-active-case');
      card.classList.remove('active-case');
    });
    card.addEventListener('pointermove',e=>{
      const r=card.getBoundingClientRect();
      card.style.setProperty('--mx',`${e.clientX-r.left}px`);
      card.style.setProperty('--my',`${e.clientY-r.top}px`);
    });
  });

  qsa('.proof-card,.diagnosis-ui').forEach(card=>card.addEventListener('pointermove',e=>{
    const r=card.getBoundingClientRect();
    card.style.setProperty('--mx',`${e.clientX-r.left}px`);
    card.style.setProperty('--my',`${e.clientY-r.top}px`);
  }));
}

if(!reducedMotion){
  const parallaxItems=qsa('.case-art strong,.hero-visual');
  const parallaxObserver=new IntersectionObserver(entries=>{
    entries.forEach(entry=>entry.target.classList.toggle('parallax-active',entry.isIntersecting));
  });
  parallaxItems.forEach(el=>parallaxObserver.observe(el));
  addEventListener('scroll',()=>{
    parallaxItems.forEach(el=>{
      if(!el.classList.contains('parallax-active')) return;
      const r=el.getBoundingClientRect();
      const offset=(innerHeight/2-(r.top+r.height/2))*0.018;
      el.style.setProperty('--parallax',`${Math.max(-10,Math.min(10,offset))}px`);
    });
  },{passive:true});
}
