(function(){
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isCoarsePointer = window.matchMedia('(pointer: coarse)').matches;
  const isNarrow = window.matchMedia('(max-width: 900px)').matches;

  /* =========================================================
     SCROLL REVEAL + COUNTERS
     ========================================================= */

  function activateAll(){
    document.querySelectorAll('.reveal, .reveal-stagger, .section-head').forEach(el => {
      el.classList.add('is-visible');
    });
    document.querySelectorAll('[data-counter]').forEach(setFinalValue);
  }

  function parseCounter(node){
    const raw = node.textContent.trim();
    const numMatch = raw.match(/[\d,]+/);
    if (!numMatch) return null;
    const target = parseInt(numMatch[0].replace(/,/g, ''), 10);
    if (isNaN(target)) return null;
    const prefix = raw.slice(0, numMatch.index);
    const suffix = raw.slice(numMatch.index + numMatch[0].length);
    return { target, prefix, suffix };
  }

  function setFinalValue(node){
    if (!node.dataset.counterParsed) return;
    const t = parseInt(node.dataset.target, 10);
    node.textContent = node.dataset.prefix + t.toLocaleString() + node.dataset.suffix;
  }

  function animateCounter(node){
    const target = parseInt(node.dataset.target, 10);
    const prefix = node.dataset.prefix || '';
    const suffix = node.dataset.suffix || '';
    const duration = 1500;
    const start = performance.now();

    function tick(t){
      const p = Math.min(1, (t - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      const val = Math.round(target * eased);
      node.textContent = prefix + val.toLocaleString() + suffix;
      if (p < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  /* =========================================================
     WORD-BY-WORD HERO TITLE REVEAL
     ========================================================= */

  function splitWords(el){
    if (!el || el.dataset.split === '1') return;
    const text = el.textContent.trim().replace(/\s+/g, ' ');
    el.dataset.split = '1';
    el.innerHTML = '';
    const words = text.split(' ');
    words.forEach((w, i) => {
      const span = document.createElement('span');
      span.className = 'word';
      span.textContent = w;
      span.style.animationDelay = (0.08 + i * 0.09) + 's';
      el.appendChild(span);
      if (i < words.length - 1) el.appendChild(document.createTextNode(' '));
    });
  }

  /* =========================================================
     ROTATING ROLE PILL
     ========================================================= */

  function attachRoleCycler(el){
    let roles;
    try { roles = JSON.parse(el.dataset.roles); }
    catch (e) { return; }
    if (!Array.isArray(roles) || roles.length < 2) return;

    let i = 0;
    el.textContent = roles[0];

    setInterval(() => {
      i = (i + 1) % roles.length;
      el.style.opacity = '0';
      setTimeout(() => {
        el.textContent = roles[i];
        el.style.opacity = '1';
      }, 280);
    }, 3200);
  }

  /* =========================================================
     3D CARD TILT + SHINE
     ========================================================= */

  function attachTilt(card){
    let rect = null;
    let raf = 0;
    let pending = null;

    function apply(){
      if (!pending) return;
      const { x, y } = pending;
      const rotY = (x - 0.5) * 9;
      const rotX = (0.5 - y) * 9;
      card.style.transform =
        `perspective(900px) rotateX(${rotX.toFixed(2)}deg) rotateY(${rotY.toFixed(2)}deg) translateY(-6px)`;
      card.style.setProperty('--mx', (x * 100).toFixed(1) + '%');
      card.style.setProperty('--my', (y * 100).toFixed(1) + '%');
      pending = null;
      raf = 0;
    }

    card.addEventListener('pointerenter', () => {
      rect = card.getBoundingClientRect();
      card.classList.add('tilt-active');
    });
    card.addEventListener('pointermove', (e) => {
      if (!rect) rect = card.getBoundingClientRect();
      pending = {
        x: (e.clientX - rect.left) / rect.width,
        y: (e.clientY - rect.top) / rect.height
      };
      if (!raf) raf = requestAnimationFrame(apply);
    });
    card.addEventListener('pointerleave', () => {
      card.classList.remove('tilt-active');
      card.style.transform = '';
      rect = null;
    });
  }

  /* =========================================================
     MAGNETIC BUTTON
     ========================================================= */

  function attachMagnetic(btn){
    btn.addEventListener('pointermove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      btn.style.transform = `translate(${(x * 0.22).toFixed(1)}px, ${(y * 0.28).toFixed(1)}px)`;
    });
    btn.addEventListener('pointerleave', () => {
      btn.style.transform = '';
    });
  }

  /* =========================================================
     HERO SPOTLIGHT — cursor-following radial glow
     ========================================================= */

  function attachSpotlight(el){
    el.addEventListener('pointermove', (e) => {
      const rect = el.getBoundingClientRect();
      el.style.setProperty('--mx', ((e.clientX - rect.left) / rect.width * 100).toFixed(1) + '%');
      el.style.setProperty('--my', ((e.clientY - rect.top) / rect.height * 100).toFixed(1) + '%');
    });
  }

  /* =========================================================
     PARTICLE LAYER — generate 12 floating dots
     ========================================================= */

  function buildParticles(container){
    if (!container || container.children.length) return;
    for (let i = 0; i < 12; i++) {
      container.appendChild(document.createElement('span'));
    }
  }

  /* =========================================================
     MARQUEE — duplicate items so the loop seam is invisible
     ========================================================= */

  function setupMarquee(track){
    if (!track || track.dataset.cloned === '1') return;
    track.dataset.cloned = '1';
    const items = Array.from(track.children);
    items.forEach(item => {
      const clone = item.cloneNode(true);
      clone.setAttribute('aria-hidden', 'true');
      track.appendChild(clone);
    });
  }

  /* =========================================================
     BOOTSTRAP
     ========================================================= */

  if (prefersReduced || !('IntersectionObserver' in window)) {
    document.addEventListener('DOMContentLoaded', () => {
      activateAll();
      const track = document.querySelector('.marquee-track');
      if (track) setupMarquee(track);
    });
    return;
  }

  document.addEventListener('DOMContentLoaded', () => {

    /* Word-split hero h1 — runs immediately so CSS animation can play on load */
    document.querySelectorAll('[data-split-words]').forEach(splitWords);

    /* Rotating role pill */
    document.querySelectorAll('[data-roles]').forEach(attachRoleCycler);

    /* Build particle field */
    buildParticles(document.querySelector('.hero-particles'));

    /* Marquee — duplicate items for seamless loop */
    setupMarquee(document.querySelector('.marquee-track'));

    /* Tilt + magnetic + spotlight only on devices with a precise pointer */
    if (!isCoarsePointer && !isNarrow) {
      document.querySelectorAll('.tilt').forEach(attachTilt);
      document.querySelectorAll('.btn.magnetic').forEach(attachMagnetic);
      document.querySelectorAll('[data-spotlight]').forEach(attachSpotlight);
    }

    /* Pre-parse counters */
    document.querySelectorAll('[data-counter]').forEach(node => {
      const parsed = parseCounter(node);
      if (!parsed) return;
      node.dataset.target = parsed.target;
      node.dataset.prefix = parsed.prefix;
      node.dataset.suffix = parsed.suffix;
      node.dataset.counterParsed = '1';
      node.textContent = parsed.prefix + '0' + parsed.suffix;
    });

    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        el.classList.add('is-visible');
        if (el.dataset.counterParsed && !el.dataset.counterRan) {
          el.dataset.counterRan = '1';
          animateCounter(el);
        }
        io.unobserve(el);
      });
    }, {
      threshold: 0.18,
      rootMargin: '0px 0px -60px 0px'
    });

    document.querySelectorAll('.reveal, .reveal-stagger, .section-head, [data-counter]').forEach(el => {
      io.observe(el);
    });
  });
})();
