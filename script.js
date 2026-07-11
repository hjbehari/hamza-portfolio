const $ = (selector, context = document) => context.querySelector(selector);
const $$ = (selector, context = document) => [...context.querySelectorAll(selector)];

const SOCIALS = [
  { name: 'LinkedIn', url: 'https://www.linkedin.com/in/hamza-jawaid-935748287/' },
  { name: 'Threads', url: 'https://www.threads.com/@hamza._.jawaid' },
  { name: 'Instagram', url: 'https://www.instagram.com/hamza._.jawaid/' },
  { name: 'Facebook', url: 'https://www.facebook.com/hamza.jawaid.1000' },
  {
    name: 'WhatsApp',
    url: 'https://wa.me/923332218456?text=Hi%20Hamza%2C%20I%20found%20your%20portfolio%20and%20would%20like%20to%20discuss%20a%20project.'
  },
  { name: 'GitHub', url: 'https://github.com/hjbehari' }
];

function fixAssetPaths() {
  $$('img[src^="assets/"]').forEach((image) => {
    image.src = image.getAttribute('src').replace(/^assets\//, '');
  });

  $$('a[href^="assets/"]').forEach((link) => {
    link.href = link.getAttribute('href').replace(/^assets\//, '');
  });

  const ogImage = $('meta[property="og:image"]');
  if (ogImage) ogImage.content = ogImage.content.replace(/^assets\//, '');

  const preload = $('link[rel="preload"][href^="assets/"]');
  if (preload) preload.href = preload.getAttribute('href').replace(/^assets\//, '');
}

function upgradeHeroCopy() {
  const title = $('#hero-title');
  if (title) {
    title.textContent = 'Most brands do not need more noise. They need a system that turns attention into action.';
  }

  const subtitle = $('.hero-sub');
  if (subtitle) {
    subtitle.textContent = 'I help nonprofits, small businesses, service providers, and creators turn unclear marketing into clear websites, stronger content, and growth paths designed to build trust, generate inquiries, and move people.';
  }

  const secondaryCta = $('.hero-actions .btn-secondary');
  if (secondaryCta) {
    secondaryCta.textContent = 'Find Your Roadmap';
    secondaryCta.href = '#roadmap';
  }

  const navigation = $('.nav-links');
  if (navigation && !$('.nav-links a[href="#roadmap"]')) {
    navigation.insertAdjacentHTML('afterbegin', '<a href="#roadmap">Roadmap</a>');
  }
}

function injectEnhancedStyles() {
  if ($('#portfolio-enhancements')) return;

  document.head.insertAdjacentHTML(
    'beforeend',
    `<style id="portfolio-enhancements">
      .roadmap-shell{display:grid;grid-template-columns:.78fr 1.22fr;gap:24px;border:1px solid rgba(255,255,255,.09);border-radius:28px;padding:22px;background:linear-gradient(135deg,rgba(255,255,255,.06),rgba(255,255,255,.02));box-shadow:0 30px 90px rgba(0,0,0,.35);position:relative;overflow:hidden}
      .roadmap-shell:before{content:"";position:absolute;right:-15%;bottom:-35%;width:520px;height:520px;background:radial-gradient(circle,rgba(155,234,202,.12),transparent 70%);pointer-events:none}
      .roadmap-tabs{display:flex;flex-direction:column;gap:10px;position:relative;z-index:1}
      .roadmap-tab{text-align:left;border:1px solid transparent;background:transparent;color:var(--muted);border-radius:20px;padding:20px;cursor:pointer;transition:.25s}
      .roadmap-tab strong{display:block;color:inherit;font-size:1rem;letter-spacing:-.03em}
      .roadmap-tab span{display:block;font-size:.8rem;margin-top:5px;line-height:1.4}
      .roadmap-tab:hover{background:rgba(255,255,255,.04);color:var(--text)}
      .roadmap-tab.active{background:rgba(155,234,202,.08);border-color:rgba(155,234,202,.28);color:var(--accent);box-shadow:inset 0 0 30px rgba(155,234,202,.04)}
      .roadmap-panels{border-left:1px solid rgba(255,255,255,.09);padding-left:24px;display:grid;align-items:center;min-height:470px;position:relative;z-index:1}
      .roadmap-panel{display:none;animation:roadmapFade .32s ease both}
      .roadmap-panel.active{display:block}
      .panel-kicker{display:inline-flex;color:#06100c;background:var(--accent);border-radius:999px;padding:7px 11px;font-size:.76rem;font-weight:900;margin-bottom:24px}
      .roadmap-panel h3{font-family:var(--serif);font-size:clamp(2.1rem,4vw,4.6rem);line-height:.95;font-weight:400;letter-spacing:-.05em;margin-bottom:18px}
      .roadmap-panel p{color:var(--soft);font-size:1.05rem;line-height:1.75;max-width:620px}
      .roadmap-panel ul{display:grid;gap:12px;margin:26px 0 28px;padding:0;list-style:none}
      .roadmap-panel li{display:flex;gap:10px;color:var(--soft);font-weight:700}
      .roadmap-panel li:before{content:"✓";color:var(--accent)}
      .panel-cta{display:inline-flex;align-items:center;border:1px solid var(--line);border-radius:999px;padding:12px 18px;color:var(--text);font-weight:900;background:rgba(255,255,255,.04);transition:.2s}
      .panel-cta:hover{background:var(--accent);color:#06100c}
      .faq-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:16px}
      .faq-item{border:1px solid rgba(255,255,255,.09);background:linear-gradient(180deg,rgba(255,255,255,.055),rgba(255,255,255,.018));border-radius:24px;padding:24px}
      .faq-item summary{cursor:pointer;font-weight:900;font-size:1.05rem}
      .faq-item p{margin:15px 0 0;color:var(--muted);line-height:1.65}
      .social-label{margin-top:1.55rem;color:var(--muted);font-size:.78rem;font-weight:800;letter-spacing:.12em;text-transform:uppercase}
      .social-links{display:flex;flex-wrap:wrap;gap:.7rem;margin-top:1rem}
      .social-link{display:inline-flex;align-items:center;gap:.5rem;padding:.72rem 1rem;border:1px solid rgba(255,255,255,.12);border-radius:999px;color:var(--text);background:rgba(255,255,255,.035);font-size:.86rem;font-weight:800;text-decoration:none;transition:transform .2s ease,border-color .2s ease,background .2s ease,color .2s ease}
      .social-link:hover{transform:translateY(-2px);border-color:rgba(155,234,202,.55);background:rgba(155,234,202,.09);color:var(--accent)}
      .social-link-mark{display:grid;place-items:center;width:1.2rem;height:1.2rem;border-radius:50%;background:rgba(155,234,202,.1);color:var(--accent);font-size:.7rem;font-weight:900}
      .footer-links{flex-wrap:wrap}
      @keyframes roadmapFade{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:none}}
      @media(max-width:1050px){.roadmap-shell{grid-template-columns:1fr}.roadmap-tabs{flex-direction:row;overflow-x:auto;padding-bottom:6px}.roadmap-tab{min-width:240px}.roadmap-panels{border-left:0;border-top:1px solid rgba(255,255,255,.09);padding-left:0;padding-top:24px;min-height:auto}}
      @media(max-width:720px){.faq-grid{grid-template-columns:1fr}}
      @media(max-width:640px){.social-links{gap:.55rem}.social-link{padding:.65rem .85rem;font-size:.8rem}}
    </style>`
  );
}

function injectRoadmap() {
  if ($('#roadmap')) return;

  $('#services')?.insertAdjacentHTML(
    'beforebegin',
    `<section class="section-pad roadmap" id="roadmap">
      <div class="container section-head split reveal">
        <div>
          <p class="eyebrow"><span></span>Intent-driven roadmap</p>
          <h2>Select your baseline. See the system your growth actually needs.</h2>
        </div>
        <p>This is not a generic services menu. Different audiences need different conversion paths, proof, language, and trust architecture.</p>
      </div>
      <div class="container roadmap-shell reveal delay-1">
        <div class="roadmap-tabs" role="tablist" aria-label="Audience roadmap selector">
          <button class="roadmap-tab active" role="tab" aria-selected="true" data-roadmap="nonprofit"><strong>Nonprofit Infrastructure</strong><span>Trust, donors, grants & visibility</span></button>
          <button class="roadmap-tab" role="tab" aria-selected="false" data-roadmap="business"><strong>Small Business Pipeline</strong><span>Clarity, inquiries & local demand</span></button>
          <button class="roadmap-tab" role="tab" aria-selected="false" data-roadmap="service"><strong>Service Authority</strong><span>Expertise, positioning & booking flow</span></button>
          <button class="roadmap-tab" role="tab" aria-selected="false" data-roadmap="creator"><strong>Creator Economics</strong><span>Attention, offers & monetization</span></button>
        </div>
        <div class="roadmap-panels">
          <article class="roadmap-panel active" data-roadmap-panel="nonprofit">
            <span class="panel-kicker">For nonprofit owners</span>
            <h3>Build high-trust donor and program pathways.</h3>
            <p>Your mission should not lose support because the website feels unclear, underdeveloped, or hard to act on.</p>
            <ul><li>Donor journey and action-path clarity</li><li>Google Ad Grants readiness and campaign structure</li><li>Mission proof, program visibility, and trust signals</li></ul>
            <a class="panel-cta" href="mailto:hamza@janobi.agency?subject=Nonprofit%20Growth%20Roadmap">Discuss nonprofit growth</a>
          </article>
          <article class="roadmap-panel" data-roadmap-panel="business">
            <span class="panel-kicker">For small business owners</span>
            <h3>Turn your website into a real inquiry system.</h3>
            <p>Your offer may be strong, but visitors need to understand your value fast enough to take the next step.</p>
            <ul><li>Clear offer hierarchy and landing-page structure</li><li>Local lead capture, booking routes, and credibility blocks</li><li>SEO, content, and paid campaign alignment</li></ul>
            <a class="panel-cta" href="mailto:hamza@janobi.agency?subject=Small%20Business%20Pipeline%20Roadmap">Discuss business growth</a>
          </article>
          <article class="roadmap-panel" data-roadmap-panel="service">
            <span class="panel-kicker">For service providers</span>
            <h3>Make your digital presence match your real expertise.</h3>
            <p>When trust drives sales, your site cannot feel vague. It needs authority, proof, and a clear reason to book.</p>
            <ul><li>Authority-led positioning and message architecture</li><li>Case-study framing, proof blocks, and qualification flow</li><li>Multi-step inquiry and onboarding funnel direction</li></ul>
            <a class="panel-cta" href="mailto:hamza@janobi.agency?subject=Service%20Authority%20Roadmap">Discuss service positioning</a>
          </article>
          <article class="roadmap-panel" data-roadmap-panel="creator">
            <span class="panel-kicker">For creators & influencers</span>
            <h3>Turn attention into owned digital infrastructure.</h3>
            <p>Views are useful, but platforms own the algorithm. You need a hub that turns attention into offers, deals, and audience equity.</p>
            <ul><li>Creator portfolio, media kit, and brand-deal portals</li><li>Direct-to-audience funnels and lead magnets</li><li>Offer architecture for partnerships, products, and services</li></ul>
            <a class="panel-cta" href="mailto:hamza@janobi.agency?subject=Creator%20Growth%20Roadmap">Discuss creator systems</a>
          </article>
        </div>
      </div>
    </section>`
  );
}

function injectFaq() {
  if ($('#faq')) return;

  $('#contact')?.insertAdjacentHTML(
    'beforebegin',
    `<section class="section-pad faq" id="faq">
      <div class="container section-head reveal">
        <p class="eyebrow"><span></span>Before you reach out</p>
        <h2>Quick answers for serious builders.</h2>
      </div>
      <div class="container faq-grid">
        <details class="faq-item reveal" open><summary>What do you actually help with?</summary><p>I help clarify the strategy, structure the offer, shape the website, content, and campaign direction, and coordinate execution with Janobi’s creative and technical team.</p></details>
        <details class="faq-item reveal delay-1"><summary>Do you work with nonprofits?</summary><p>Yes. Nonprofit growth, credibility, donation journeys, Google Ad Grants readiness, program visibility, and community-focused messaging are a major focus.</p></details>
        <details class="faq-item reveal delay-2"><summary>Can this start small?</summary><p>Yes. Some projects start with a focused strategy conversation, audit, landing page, or content and SEO support before expanding into a full growth system.</p></details>
        <details class="faq-item reveal"><summary>What makes this different from just hiring a designer?</summary><p>The work starts with the business problem, audience, and conversion path. The design is built to support trust and action, not just look better.</p></details>
      </div>
    </section>`
  );
}

function socialMarkup() {
  return SOCIALS.map(({ name, url }) => {
    const mark = name === 'WhatsApp' ? 'WA' : name.slice(0, 1).toUpperCase();
    return `<a class="social-link" href="${url}" target="_blank" rel="noopener noreferrer" aria-label="${name}"><span class="social-link-mark" aria-hidden="true">${mark}</span><span>${name}</span></a>`;
  }).join('');
}

function injectSocials() {
  const contactCopy = $('.contact-copy');
  if (contactCopy && !$('.social-links', contactCopy)) {
    contactCopy.insertAdjacentHTML(
      'beforeend',
      `<p class="social-label">Connect elsewhere</p><div class="social-links" aria-label="Hamza Jawaid social profiles">${socialMarkup()}</div>`
    );
  }

  const footerLinks = $('.footer-links');
  if (footerLinks) {
    const existing = new Set($$('a', footerLinks).map((link) => link.textContent.trim().toLowerCase()));
    SOCIALS.forEach(({ name, url }) => {
      if (existing.has(name.toLowerCase())) return;
      footerLinks.insertAdjacentHTML('beforeend', `<a href="${url}" target="_blank" rel="noopener noreferrer">${name}</a>`);
    });
  }
}

function setupRoadmapTabs() {
  $$('.roadmap-tab').forEach((tab) => {
    tab.addEventListener('click', () => {
      const key = tab.dataset.roadmap;
      $$('.roadmap-tab').forEach((item) => {
        item.classList.remove('active');
        item.setAttribute('aria-selected', 'false');
      });
      $$('.roadmap-panel').forEach((panel) => panel.classList.remove('active'));
      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');
      $(`[data-roadmap-panel="${key}"]`)?.classList.add('active');
    });
  });
}

fixAssetPaths();
upgradeHeroCopy();
injectEnhancedStyles();
injectRoadmap();
injectFaq();
injectSocials();
setupRoadmapTabs();

const progress = $('.progress span');
let headerLinks = $$('.nav-links a[href^="#"]');
let sections = headerLinks.map((link) => $(link.getAttribute('href'))).filter(Boolean);

function onScroll() {
  const max = document.documentElement.scrollHeight - innerHeight;
  if (progress) {
    progress.style.width = `${Math.max(0, Math.min(100, (scrollY / max) * 100))}%`;
  }

  const active = sections.findLast?.((section) => scrollY + 160 >= section.offsetTop)
    || sections.slice().reverse().find((section) => scrollY + 160 >= section.offsetTop);

  headerLinks.forEach((link) => {
    link.classList.toggle('active', active && link.getAttribute('href') === `#${active.id}`);
  });
}

addEventListener('scroll', onScroll, { passive: true });
onScroll();

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add('in-view');
    revealObserver.unobserve(entry.target);
  });
}, { threshold: 0.12 });

$$('.reveal').forEach((element) => revealObserver.observe(element));

const navToggle = $('.nav-toggle');
const navigation = $('.nav-links');
navToggle?.addEventListener('click', () => {
  const open = navigation.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', String(open));
});

$$('.nav-links a').forEach((link) => {
  link.addEventListener('click', () => {
    navigation.classList.remove('open');
    navToggle?.setAttribute('aria-expanded', 'false');
  });
});

const cases = {
  brightside: {
    tag: 'Service business website',
    title: 'Brightside Daycare',
    image: 'work-brightside.webp',
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
    image: 'work-inclass.webp',
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
    image: 'work-megan.webp',
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
    image: 'work-real-estate.webp',
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
    image: 'work-redline.webp',
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
    image: 'deck-branding-grid.webp',
    alt: 'Janobi selected branding work',
    summary: 'Selected identity, website, content, and campaign visuals showing the breadth of Janobi’s creative and strategic execution.',
    problem: 'Brands need more than beautiful assets. They need a connected system that feels memorable and supports business outcomes.',
    direction: 'Combine brand identity, digital touchpoints, social content, website systems, and growth strategy into one coherent experience.',
    goal: 'Help businesses look credible, communicate faster, and create stronger paths to action.',
    link: 'https://janobi.agency'
  }
};

const modal = $('#caseModal');
const modalImage = $('#caseImage');

$$('[data-case]').forEach((card) => {
  card.addEventListener('click', () => openCase(card.dataset.case));
});

function openCase(key) {
  const item = cases[key];
  if (!item || !modal) return;

  $('#caseTag').textContent = item.tag;
  $('#caseTitle').textContent = item.title;
  $('#caseSummary').textContent = item.summary;
  $('#caseProblem').textContent = item.problem;
  $('#caseDirection').textContent = item.direction;
  $('#caseGoal').textContent = item.goal;
  $('#caseLink').href = item.link;
  modalImage.src = item.image;
  modalImage.alt = item.alt;

  if (typeof modal.showModal === 'function') modal.showModal();
  else modal.setAttribute('open', '');
}

function hideModal() {
  modal?.close?.();
  modal?.removeAttribute('open');
}

$('.modal-close')?.addEventListener('click', hideModal);
modal?.addEventListener('click', (event) => {
  if (event.target === modal) hideModal();
});
addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && modal?.open) hideModal();
});

const toast = $('.toast');
$$('.copy-email').forEach((button) => {
  button.addEventListener('click', async () => {
    const email = button.dataset.email;
    try {
      await navigator.clipboard.writeText(email);
      showToast('Email copied.');
    } catch {
      location.href = `mailto:${email}`;
    }
  });
});

function showToast(message) {
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 1800);
}

$('#projectForm')?.addEventListener('submit', (event) => {
  event.preventDefault();
  const data = new FormData(event.currentTarget);
  const type = data.get('type');
  const problem = data.get('problem');
  const subject = encodeURIComponent(`${type} — project context`);
  const body = encodeURIComponent(`Hi Hamza,\n\nI am a ${type}.\n\nHere is what feels stuck:\n${problem}\n\nI would like to discuss the clearest next step.\n`);
  location.href = `mailto:hamza@janobi.agency?subject=${subject}&body=${body}`;
});

$$('.service-card,.work-card,.router-card,.faq-item,.btn,.social-link').forEach((element) => {
  element.addEventListener('mousemove', (event) => {
    if (matchMedia('(max-width: 760px)').matches) return;
    const rect = element.getBoundingClientRect();
    element.style.setProperty('--mx', `${event.clientX - rect.left}px`);
    element.style.setProperty('--my', `${event.clientY - rect.top}px`);
  });
});

const dot = $('.cursor-dot');
const ring = $('.cursor-ring');
let cursorX = 0;
let cursorY = 0;
let ringX = 0;
let ringY = 0;

if (dot && ring) {
  addEventListener('mousemove', (event) => {
    cursorX = event.clientX;
    cursorY = event.clientY;
    dot.style.transform = `translate(${cursorX - 3.5}px, ${cursorY - 3.5}px)`;
  }, { passive: true });

  function cursorLoop() {
    ringX += (cursorX - ringX) * 0.16;
    ringY += (cursorY - ringY) * 0.16;
    ring.style.transform = `translate(${ringX - 19}px, ${ringY - 19}px)`;
    requestAnimationFrame(cursorLoop);
  }

  cursorLoop();

  $$('a,button,.work-card,.roadmap-tab').forEach((element) => {
    element.addEventListener('mouseenter', () => ring.classList.add('cursor-hover'));
    element.addEventListener('mouseleave', () => ring.classList.remove('cursor-hover'));
  });
}
