const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];

const progress = $('.progress span');
const headerLinks = $$('.nav-links a[href^="#"]');
const sections = headerLinks.map(a => $(a.getAttribute('href'))).filter(Boolean);

function onScroll(){
  const max = document.documentElement.scrollHeight - innerHeight;
  progress.style.width = `${Math.max(0, Math.min(100, (scrollY / max) * 100))}%`;
  const active = sections.findLast?.(sec => scrollY + 160 >= sec.offsetTop) || sections.slice().reverse().find(sec => scrollY + 160 >= sec.offsetTop);
  headerLinks.forEach(a => a.classList.toggle('active', active && a.getAttribute('href') === `#${active.id}`));
}
addEventListener('scroll', onScroll, { passive:true });
onScroll();

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      entry.target.classList.add('in-view');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: .12 });
$$('.reveal').forEach(el => revealObserver.observe(el));

const navToggle = $('.nav-toggle');
const nav = $('.nav-links');
navToggle?.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', String(open));
});
$$('.nav-links a').forEach(a => a.addEventListener('click', () => {
  nav.classList.remove('open');
  navToggle?.setAttribute('aria-expanded', 'false');
}));

const cases = {
  brightside: {
    tag: 'Service business website',
    title: 'Brightside Daycare',
    image: 'assets/work-brightside.webp',
    alt: 'Brightside Daycare website screenshot',
    summary: 'A warm, conversion-focused daycare website built around parent trust, safety, care, provider credibility, and tour booking.',
    problem: 'Parents need emotional confidence before they submit a form. The page had to communicate safety, warmth, professionalism, and clear care options fast.',
    direction: 'Use soft visual hierarchy, reassuring proof blocks, provider credibility, enrollment flow, FAQ content, and a tour-first conversion path.',
    goal: 'Increase parent confidence and make the next step feel simple: book a tour or request a consultation.',
    link: 'https://brightsidedaycareny.com'
  },
  inclass: {
    tag: 'Nonprofit growth website',
    title: 'InCLASS Inc.',
    image: 'assets/work-inclass.webp',
    alt: 'InCLASS nonprofit website screenshot',
    summary: 'A nonprofit digital experience structured around students, parents, donors, community programs, and measurable mission support.',
    problem: 'Education nonprofits need clarity for multiple audiences at once: students, parents, donors, partners, and volunteers.',
    direction: 'Organize the site around support pillars, program paths, donor credibility, community CTAs, and a clear mission narrative.',
    goal: 'Build trust, improve program visibility, and guide visitors toward enrollment, donation, partnership, or community action.',
    link: 'https://inclassinc.org'
  },
  megan: {
    tag: 'Creator / artist portfolio',
    title: 'Megan Kashat',
    image: 'assets/work-megan.webp',
    alt: 'Megan Kashat website screenshot',
    summary: 'An expressive artist portfolio designed to turn creative identity into a clear path for original artwork, commissions, and audience connection.',
    problem: 'Artists and creators often have strong personality but weak conversion flow. The work needs to feel emotional and still guide action.',
    direction: 'Build around a bold hero, editorial sections, featured artwork, commission prompts, and a softer community CTA.',
    goal: 'Help visitors understand the artist quickly and move toward viewing work, requesting commissions, or joining the inner circle.',
    link: 'https://hjbehari.github.io/megankashat/'
  },
  realestate: {
    tag: 'Premium landing page concept',
    title: 'Real Estate Should Flirt Back',
    image: 'assets/work-real-estate.webp',
    alt: 'Premium real estate landing page screenshot',
    summary: 'A cinematic real estate concept built to make property browsing feel premium, editorial, and emotionally memorable.',
    problem: 'Most real estate pages look transactional. Premium buyers need atmosphere, story, confidence, and a sense of exclusivity.',
    direction: 'Use luxury editorial typography, motion-led sections, hero storytelling, property cards, and conversion moments that feel private rather than pushy.',
    goal: 'Create an experience that raises perceived value and makes high-ticket inquiry feel natural.',
    link: 'https://hjbehari.github.io/re/'
  },
  redline: {
    tag: 'Experimental automotive UI',
    title: 'Redline Royale',
    image: 'assets/work-redline.webp',
    alt: 'Redline Royale website screenshot',
    summary: 'A bold automotive showroom concept designed to make car browsing feel cinematic, fast, and character-driven.',
    problem: 'Car sites often reduce desire into specifications. The interface needed to sell personality, energy, and showroom drama.',
    direction: 'Use aggressive typography, dark red atmosphere, large visuals, feature cards, and guided model exploration.',
    goal: 'Turn browsing into a premium brand experience that creates stronger inquiry intent.',
    link: 'https://hjbehari.github.io/REDLINE-ROYALE/'
  },
  janobi: {
    tag: 'Brand systems & agency work',
    title: 'Janobi Selected Work',
    image: 'assets/deck-branding-grid.webp',
    alt: 'Janobi selected branding work',
    summary: 'Selected identity, website, content, and campaign visuals showing the breadth of Janobi’s creative and strategic execution.',
    problem: 'Brands need more than beautiful assets. They need a connected system that feels memorable and supports business outcomes.',
    direction: 'Combine brand identity, digital touchpoints, social content, website systems, and growth strategy into one coherent experience.',
    goal: 'Help businesses look credible, communicate faster, and create stronger paths to action.',
    link: 'https://janobi.agency'
  }
};

const modal = $('#caseModal');
const closeModal = $('.modal-close');
const modalImage = $('#caseImage');

$$('[data-case]').forEach(card => {
  card.addEventListener('click', () => openCase(card.dataset.case));
});

function openCase(key){
  const item = cases[key];
  if(!item) return;
  $('#caseTag').textContent = item.tag;
  $('#caseTitle').textContent = item.title;
  $('#caseSummary').textContent = item.summary;
  $('#caseProblem').textContent = item.problem;
  $('#caseDirection').textContent = item.direction;
  $('#caseGoal').textContent = item.goal;
  $('#caseLink').href = item.link;
  modalImage.src = item.image;
  modalImage.alt = item.alt;
  if(typeof modal.showModal === 'function') modal.showModal();
  else modal.setAttribute('open','');
}
function hideModal(){ modal.close?.(); modal.removeAttribute('open'); }
closeModal?.addEventListener('click', hideModal);
modal?.addEventListener('click', (e) => { if(e.target === modal) hideModal(); });
addEventListener('keydown', (e)=>{ if(e.key === 'Escape' && modal.open) hideModal(); });

const toast = $('.toast');
$$('.copy-email').forEach(btn => {
  btn.addEventListener('click', async () => {
    const email = btn.dataset.email;
    try{
      await navigator.clipboard.writeText(email);
      showToast('Email copied.');
    }catch{
      location.href = `mailto:${email}`;
    }
  });
});
function showToast(msg){
  toast.textContent = msg;
  toast.classList.add('show');
  setTimeout(()=>toast.classList.remove('show'), 1800);
}

$('#projectForm')?.addEventListener('submit', (e) => {
  e.preventDefault();
  const data = new FormData(e.currentTarget);
  const type = data.get('type');
  const problem = data.get('problem');
  const subject = encodeURIComponent(`${type} — project context`);
  const body = encodeURIComponent(`Hi Hamza,\n\nI am a ${type}.\n\nHere is what feels stuck:\n${problem}\n\nI would like to discuss the clearest next step.\n`);
  location.href = `mailto:hamza@janobi.agency?subject=${subject}&body=${body}`;
});

// magnetic movement on cards, subtle enough not to annoy
$$('.service-card,.work-card,.router-card,.btn').forEach(el => {
  el.addEventListener('mousemove', (e) => {
    if(matchMedia('(max-width: 760px)').matches) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty('--mx', `${e.clientX - r.left}px`);
    el.style.setProperty('--my', `${e.clientY - r.top}px`);
  });
});

const dot = $('.cursor-dot');
const ring = $('.cursor-ring');
let cx = 0, cy = 0, rx = 0, ry = 0;
addEventListener('mousemove', (e) => { cx = e.clientX; cy = e.clientY; dot.style.transform = `translate(${cx-3.5}px, ${cy-3.5}px)`; }, {passive:true});
function cursorLoop(){
  rx += (cx - rx) * .16; ry += (cy - ry) * .16;
  ring.style.transform = `translate(${rx-19}px, ${ry-19}px)`;
  requestAnimationFrame(cursorLoop);
}
cursorLoop();
$$('a,button,.work-card').forEach(el => {
  el.addEventListener('mouseenter', ()=> ring.classList.add('cursor-hover'));
  el.addEventListener('mouseleave', ()=> ring.classList.remove('cursor-hover'));
});
