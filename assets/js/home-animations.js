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
      if (p < 1) {
        requestAnimationFrame(tick);
      } else if (!prefersReduced) {
        /* brief "pop" when the count lands */
        node.classList.add('counter-pop');
        setTimeout(function(){ node.classList.remove('counter-pop'); }, 600);
      }
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
     HERO CONSTELLATION — ambient idle animation.
     Drifting nodes + links that form/break; reaches toward the
     cursor on desktop. Pauses when tab is hidden or hero scrolls
     out of view. Desktop only (mobile keeps the lighter particles).
     ========================================================= */

  function setupHeroNetwork(){
    const host = document.querySelector('.hero-backdrop');
    if (!host || prefersReduced) return;

    /* Replace the simple rising particles with the richer network */
    const particles = host.querySelector('.hero-particles');
    if (particles) particles.style.display = 'none';

    const canvas = document.createElement('canvas');
    canvas.className = 'hero-network';
    canvas.setAttribute('aria-hidden', 'true');
    host.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const NODE_COUNT = 36;
    const LINK_DIST = 132;
    const MOUSE_DIST = 180;

    let w = 0, h = 0, nodes = [], raf = 0, active = false;
    const mouse = { x: null, y: null };

    function palette(){
      const light = document.documentElement.getAttribute('data-theme') === 'light';
      return light
        ? { node: '37,99,235',  line: '37,99,235',  mouse: '124,58,237' }
        : { node: '96,165,250', line: '56,189,248', mouse: '139,92,246' };
    }
    let pal = palette();

    function resize(){
      const rect = host.getBoundingClientRect();
      w = rect.width; h = rect.height;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = w + 'px';
      canvas.style.height = h + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function initNodes(){
      nodes = [];
      const count = Math.max(16, Math.min(NODE_COUNT, Math.round(w / 34)));
      for (let i = 0; i < count; i++){
        nodes.push({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.32,
          vy: (Math.random() - 0.5) * 0.32,
          r: Math.random() * 1.4 + 1.1
        });
      }
    }

    function draw(){
      ctx.clearRect(0, 0, w, h);

      for (let i = 0; i < nodes.length; i++){
        const n = nodes[i];
        n.x += n.vx; n.y += n.vy;
        if (n.x < 0 || n.x > w) n.vx *= -1;
        if (n.y < 0 || n.y > h) n.vy *= -1;
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(' + pal.node + ',0.6)';
        ctx.fill();
      }

      for (let i = 0; i < nodes.length; i++){
        const a = nodes[i];
        for (let j = i + 1; j < nodes.length; j++){
          const b = nodes[j];
          const dx = a.x - b.x, dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < LINK_DIST){
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = 'rgba(' + pal.line + ',' + ((1 - dist / LINK_DIST) * 0.42).toFixed(3) + ')';
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
        if (mouse.x != null){
          const dx = a.x - mouse.x, dy = a.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < MOUSE_DIST){
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.strokeStyle = 'rgba(' + pal.mouse + ',' + ((1 - dist / MOUSE_DIST) * 0.55).toFixed(3) + ')';
            ctx.lineWidth = 1;
            ctx.stroke();
            a.x -= dx * 0.0009;
            a.y -= dy * 0.0009;
          }
        }
      }
    }

    function loop(){ draw(); if (active) raf = requestAnimationFrame(loop); }
    function setActive(on){
      if (on && !active){ active = true; raf = requestAnimationFrame(loop); }
      else if (!on && active){ active = false; cancelAnimationFrame(raf); }
    }

    resize();
    initNodes();
    setActive(true);

    window.addEventListener('resize', function(){ resize(); initNodes(); }, { passive: true });

    const hero = host.closest('.hero');
    if (hero && !isCoarsePointer){
      hero.addEventListener('pointermove', function(e){
        const rect = canvas.getBoundingClientRect();
        mouse.x = e.clientX - rect.left;
        mouse.y = e.clientY - rect.top;
      });
      hero.addEventListener('pointerleave', function(){ mouse.x = mouse.y = null; });
    }

    document.addEventListener('visibilitychange', function(){
      setActive(!document.hidden);
    });

    if ('IntersectionObserver' in window){
      new IntersectionObserver(function(entries){
        setActive(!document.hidden && entries[0].isIntersecting);
      }, { threshold: 0 }).observe(host);
    }

    /* repaint with theme-correct colors when the theme flips */
    new MutationObserver(function(){ pal = palette(); }).observe(
      document.documentElement, { attributes: true, attributeFilter: ['data-theme'] }
    );
  }

  /* =========================================================
     SCROLL PROGRESS BAR + HERO PARALLAX
     One rAF-throttled scroll handler drives both.
     ========================================================= */

  function setupScrollFX(){
    const bar = document.createElement('div');
    bar.className = 'scroll-progress';
    document.body.appendChild(bar);

    const heroBackdrop = document.querySelector('.hero-backdrop');
    const doc = document.documentElement;
    let ticking = false;

    function update(){
      const max = doc.scrollHeight - doc.clientHeight;
      const progress = max > 0 ? doc.scrollTop / max : 0;
      bar.style.transform = 'scaleX(' + progress.toFixed(4) + ')';

      /* gentle parallax drift on the hero ambient layer */
      if (heroBackdrop && doc.scrollTop < window.innerHeight) {
        heroBackdrop.style.transform = 'translateY(' + (doc.scrollTop * 0.18).toFixed(1) + 'px)';
      }
      ticking = false;
    }

    window.addEventListener('scroll', function(){
      if (!ticking) { requestAnimationFrame(update); ticking = true; }
    }, { passive: true });

    update();
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

    /* Scroll progress bar + hero parallax */
    setupScrollFX();

    /* Ambient hero constellation — runs on mobile + desktop.
       Node count auto-scales to width and it pauses when off-screen
       or the tab is hidden, so mobile stays light. */
    setupHeroNetwork();

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
