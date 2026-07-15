const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
if(!reduced){
  const observer=new IntersectionObserver(entries=>{
    entries.forEach(entry=>{
      if(!entry.isIntersecting)return;
      entry.target.animate([
        {opacity:0,transform:'translateY(26px)',filter:'blur(8px)'},
        {opacity:1,transform:'translateY(0)',filter:'blur(0)'}
      ],{duration:760,easing:'cubic-bezier(.22,1,.36,1)',fill:'both'});
      observer.unobserve(entry.target);
    });
  },{threshold:.12,rootMargin:'0px 0px -8%'});
  document.querySelectorAll('[data-reveal]').forEach(el=>observer.observe(el));
}
