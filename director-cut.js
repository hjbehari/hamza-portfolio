(() => {
  'use strict';

  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const finePointer = matchMedia('(pointer:fine)').matches;

  function optimizeImages() {
    const hero = $('.hero-visual img');
    $$('img').forEach((img) => {
      img.decoding = 'async';
      if (img === hero) {
        img.loading = 'eager';
        img.fetchPriority = 'high';
      } else {
        img.loading = 'lazy';
        img.fetchPriority = 'low';
      }
      if (!img.width && img.naturalWidth) img.width = img.naturalWidth;
      if (!img.height && img.naturalHeight) img.height = img.naturalHeight;
    });
  }

  function setupReveals() {
    if (reduced) return;
    const singles = $$('section .section-intro, section .section-head, .about-image, .about-copy, .contact-copy, .hubspot-form-shell');
    const groups = $$('.audience-grid, .service-grid, .work-board, .metric-grid, .review-grid, .process-list, .router-grid, .faq-grid');
    singles.forEach((el) => el.classList.add('dc-reveal'));
    groups.forEach((el) => el.classList.add('dc-stagger'));

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('dc-visible');
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });

    [...singles, ...groups].forEach((el) => observer.observe(el));
  }

  function setupHeader() {
    const header = $('.site-header');
    if (!header) return;
    let lastY = scrollY;
    let ticking = false;
    addEventListener('scroll', () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const y = scrollY;
        header.classList.toggle('dc-scrolled', y > 24);
        header.classList.toggle('dc-hidden', y > 220 && y > lastY + 8);
        if (y < lastY - 8) header.classList.remove('dc-hidden');
        lastY = y;
        ticking = false;
      });
    }, { passive: true });
  }

  function setupSpotlight() {
    if (!finePointer || reduced) return;
    const targets = $$('.service-card,.work-card,.review-card,.audience-card,.router-card,.metric-card,.faq-item');
    targets.forEach((el) => {
      el.addEventListener('pointermove', (event) => {
        const rect = el.getBoundingClientRect();
        el.style.setProperty('--mx', `${event.clientX - rect.left}px`);
        el.style.setProperty('--my', `${event.clientY - rect.top}px`);
      }, { passive: true });
    });
  }

  function setupHeroTilt() {
    const visual = $('.hero-visual');
    if (!visual || !finePointer || reduced) return;
    let frame = 0;
    visual.addEventListener('pointermove', (event) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const rect = visual.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width - 0.5;
        const y = (event.clientY - rect.top) / rect.height - 0.5;
        visual.style.transform = `perspective(1100px) rotateY(${x * 3.2}deg) rotateX(${-y * 2.8}deg) translate3d(0,0,0)`;
      });
    }, { passive: true });
    visual.addEventListener('pointerleave', () => {
      visual.style.transition = 'transform .7s cubic-bezier(.22,1,.36,1)';
      visual.style.transform = '';
      setTimeout(() => { visual.style.transition = ''; }, 750);
    });
  }

  function setupParallax() {
    if (reduced || innerWidth < 901) return;
    const items = $$('.about-image img,.work-feature .work-image img');
    items.forEach((img) => img.classList.add('dc-parallax'));
    let ticking = false;
    const update = () => {
      items.forEach((img) => {
        const rect = img.parentElement.getBoundingClientRect();
        if (rect.bottom < 0 || rect.top > innerHeight) return;
        const progress = (innerHeight - rect.top) / (innerHeight + rect.height);
        img.style.transform = `translate3d(0,${(progress - 0.5) * 18}px,0) scale(1.035)`;
      });
      ticking = false;
    };
    addEventListener('scroll', () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    }, { passive: true });
    update();
  }

  function animateMetric(el) {
    const raw = el.textContent.trim();
    const match = raw.match(/([\d,.]+)/);
    if (!match) return;
    const target = Number(match[1].replace(/,/g, ''));
    if (!Number.isFinite(target) || target <= 0) return;
    const prefix = raw.slice(0, match.index);
    const suffix = raw.slice(match.index + match[1].length);
    const start = performance.now();
    const duration = 1100;
    const step = (now) => {
      const p = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      const value = Math.round(target * eased);
      el.textContent = `${prefix}${value.toLocaleString()}${suffix}`;
      if (p < 1) requestAnimationFrame(step);
      else el.textContent = raw;
    };
    requestAnimationFrame(step);
  }

  function setupCounters() {
    if (reduced) return;
    const metrics = $$('.metric-card strong,.hero-proof strong').filter((el) => /\d/.test(el.textContent));
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        animateMetric(entry.target);
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.65 });
    metrics.forEach((el) => observer.observe(el));
  }

  function setupMagneticButtons() {
    if (!finePointer || reduced) return;
    $$('.btn,.panel-cta,.review-link').forEach((button) => {
      button.addEventListener('pointermove', (event) => {
        const rect = button.getBoundingClientRect();
        const x = event.clientX - rect.left - rect.width / 2;
        const y = event.clientY - rect.top - rect.height / 2;
        button.style.transform = `translate3d(${x * 0.06}px,${y * 0.08 - 3}px,0)`;
      }, { passive: true });
      button.addEventListener('pointerleave', () => { button.style.transform = ''; });
    });
  }

  function cleanupLegacyFormHandler() {
    const oldForm = $('form#projectForm');
    if (!oldForm) return;
    oldForm.removeAttribute('id');
  }

  function markReady() {
    requestAnimationFrame(() => document.body.classList.add('dc-ready'));
  }

  optimizeImages();
  cleanupLegacyFormHandler();
  setupReveals();
  setupHeader();
  setupSpotlight();
  setupHeroTilt();
  setupParallax();
  setupCounters();
  setupMagneticButtons();
  markReady();
})();
