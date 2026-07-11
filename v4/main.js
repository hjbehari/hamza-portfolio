const qs=(s,c=document)=>c.querySelector(s);const qsa=(s,c=document)=>[...c.querySelectorAll(s)];

const progress=qs('.progress span');const header=qs('.site-header');let lastY=0;
function handleScroll(){const max=document.documentElement.scrollHeight-innerHeight;if(progress)progress.style.width=`${Math.max(0,Math.min(100,(scrollY/max)*100))}%`;if(scrollY>lastY&&scrollY>180)header?.classList.add('hidden');else header?.classList.remove('hidden');lastY=scrollY;}
addEventListener('scroll',handleScroll,{passive:true});handleScroll();

const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('in');observer.unobserve(entry.target)}}),{threshold:.12});
qsa('.reveal').forEach(el=>observer.observe(el));

const diagnosis={
  nonprofit:['Can a stranger understand the mission within ten seconds?','Is there enough visible proof to trust the organisation?','Does every important audience have a clear next action?'],
  business:['Can visitors understand the offer without working through jargon?','Does the website prove why this business is worth choosing?','Is the next step obvious, low-friction, and measurable?'],
  service:['Does the online presence match the real quality of the expertise?','Are trust, process, and outcomes visible before the sales call?','Does the inquiry flow attract serious prospects rather than random messages?'],
  creator:['Is attention being converted into an owned audience or clear offer?','Can a brand understand the creator’s value within one minute?','Is there a professional path for collaborations, products, or services?']
};
const list=qs('#diagnosis-list');
qsa('.tab').forEach(tab=>tab.addEventListener('click',()=>{qsa('.tab').forEach(item=>{item.classList.remove('active');item.setAttribute('aria-selected','false')});tab.classList.add('active');tab.setAttribute('aria-selected','true');if(list){list.animate([{opacity:.2,transform:'translateY(8px)'},{opacity:1,transform:'none'}],{duration:260,easing:'ease-out'});list.innerHTML=diagnosis[tab.dataset.type].map(item=>`<li>${item}</li>`).join('')}}));

if(matchMedia('(pointer:fine)').matches&&!matchMedia('(prefers-reduced-motion: reduce)').matches){const portrait=qs('.portrait-shell');portrait?.addEventListener('pointermove',e=>{const r=portrait.getBoundingClientRect();const x=(e.clientX-r.left)/r.width-.5;const y=(e.clientY-r.top)/r.height-.5;portrait.style.transform=`perspective(900px) rotateY(${x*3.5}deg) rotateX(${-y*3.5}deg)`});portrait?.addEventListener('pointerleave',()=>portrait.style.transform='');}
