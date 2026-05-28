document.addEventListener('DOMContentLoaded', () => {

  const topbarBtn = document.getElementById('mobileToggle');
  const sidebarBtn = document.getElementById('sidebarClose');
  const sidebar = document.querySelector('.sidebar');
  const sidebarSearch = document.querySelector('.sidebar .search');
  const overlay = document.getElementById('mobileOverlay');

  /* =========================================================
     THEME TOGGLE — sun ↔ moon with localStorage persistence.
     The initial theme is set by the inline pre-render script in
     each page's <body> so there's no flash of wrong theme.
     ========================================================= */
  const themeBtns = document.querySelectorAll('.theme-toggle');
  function applyTheme(theme) {
    if (theme === 'light') {
      document.documentElement.setAttribute('data-theme', 'light');
    } else {
      document.documentElement.removeAttribute('data-theme');
    }
    try { localStorage.setItem('theme', theme); } catch (e) {}
    themeBtns.forEach(b => b.setAttribute('aria-pressed', theme === 'light' ? 'true' : 'false'));
  }
  themeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
      applyTheme(current === 'light' ? 'dark' : 'light');
    });
  });

  const MOBILE_BP = '(max-width: 900px)';

  function isMobile() {
    return window.matchMedia(MOBILE_BP).matches;
  }

  if (!isMobile() && localStorage.getItem('navCollapsed') === '1') {
    document.body.classList.add('nav-collapsed');
  }

  /* Keep the menu-close button's tooltip/aria-label in sync with state:
       collapsed → "Show menu"   (clicking will expand)
       expanded  → "Hide menu"   (clicking will collapse) */
  function refreshMenuLabel() {
    const collapsed = document.body.classList.contains('nav-collapsed');
    const label = collapsed ? 'Show menu' : 'Hide menu';
    document.querySelectorAll('.menu-close').forEach(btn => {
      btn.setAttribute('data-tooltip', label);
      btn.setAttribute('aria-label', label);
    });
  }
  refreshMenuLabel();

  function handleToggle() {
    if (isMobile()) {
      if (sidebar) sidebar.classList.toggle('active');
      if (overlay) overlay.classList.toggle('active');
    } else {
      const collapsed = document.body.classList.toggle('nav-collapsed');
      localStorage.setItem('navCollapsed', collapsed ? '1' : '0');
      refreshMenuLabel();
    }
  }

  if (topbarBtn) topbarBtn.addEventListener('click', handleToggle);
  if (sidebarBtn) sidebarBtn.addEventListener('click', handleToggle);

  if (overlay) {
    overlay.addEventListener('click', () => {
      if (sidebar) sidebar.classList.remove('active');
      overlay.classList.remove('active');
    });
  }

  window.matchMedia(MOBILE_BP).addEventListener('change', (e) => {
    if (e.matches) {
      document.body.classList.remove('nav-collapsed');
    } else {
      if (sidebar) sidebar.classList.remove('active');
      if (overlay) overlay.classList.remove('active');
    }
  });

  /* Wrap each nav item's text node (after its <i> icon) in a <span class="nav-text">
     so we can animate max-width + opacity for a horizontal Claude-style fade.
     Also seeds data-tooltip from that label. */
  document.querySelectorAll('.nav a, .nav-project > summary').forEach(el => {
    const iconEl = el.querySelector('i');
    if (!iconEl) return;

    let labelText = '';
    let node = iconEl.nextSibling;
    while (node) {
      const next = node.nextSibling;
      if (node.nodeType === Node.TEXT_NODE && node.textContent.trim()) {
        labelText += node.textContent;
        node.remove();
      } else if (node.nodeType === Node.ELEMENT_NODE && node.classList.contains('nav-text')) {
        labelText = node.textContent;
        node.remove();
      }
      node = next;
    }

    const trimmed = labelText.trim();
    if (trimmed) {
      const span = document.createElement('span');
      span.className = 'nav-text';
      span.textContent = trimmed;
      el.appendChild(span);
      if (!el.dataset.tooltip) el.dataset.tooltip = trimmed;
    }
  });

  /* When sidebar is collapsed, the search bar shows as an icon-only button.
     Clicking it expands the sidebar and focuses the input. */
  if (sidebarSearch) {
    sidebarSearch.addEventListener('mousedown', (e) => {
      if (document.body.classList.contains('nav-collapsed') && !isMobile()) {
        e.preventDefault();
        document.body.classList.remove('nav-collapsed');
        localStorage.setItem('navCollapsed', '0');
        const input = sidebarSearch.querySelector('input');
        if (input) setTimeout(() => input.focus(), 320);
      }
    });
  }

  /* When sidebar is collapsed, clicking a project group's summary should
     navigate to the all-projects page (the hidden sub-menu would otherwise
     just toggle invisibly). */
  document.querySelectorAll('.nav-project > summary').forEach(summary => {
    summary.addEventListener('click', (e) => {
      if (document.body.classList.contains('nav-collapsed') && !isMobile()) {
        e.preventDefault();
        window.location.href = 'crm-projects.html';
      }
    });
  });

});


/* =========================================================
   SMOOTH MOMENTUM SCROLL (Lenis) + ANCHOR EASING
   Desktop wheel/trackpad gets eased inertia scrolling for a
   premium feel; touch keeps native momentum. Loaded from CDN.
   ========================================================= */
(function () {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduce) return;

  const s = document.createElement('script');
  s.src = 'https://cdn.jsdelivr.net/npm/lenis@1/dist/lenis.min.js';
  s.defer = true;
  s.onload = function () {
    if (typeof Lenis === 'undefined') return;

    const lenis = new Lenis({
      duration: 1.05,
      easing: function (t) { return Math.min(1, 1.001 - Math.pow(2, -10 * t)); },
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.6
    });

    function raf(time) { lenis.raf(time); requestAnimationFrame(raf); }
    requestAnimationFrame(raf);
    window.__lenis = lenis;

    /* Smooth-scroll same-page anchor links (#work, #experience, #contact…) */
    document.querySelectorAll('a[href^="#"]').forEach(function (a) {
      a.addEventListener('click', function (e) {
        const id = a.getAttribute('href');
        if (!id || id === '#') return;
        const target = document.querySelector(id);
        if (target) {
          e.preventDefault();
          lenis.scrollTo(target, { offset: -24, duration: 1.1 });
        }
      });
    });
  };
  document.head.appendChild(s);
})();


/* =========================================================
   PAGE TRANSITIONS
   Fade/slide the content out on internal navigation, fade in
   on load — no hard reload flash. External links, new-tab,
   downloads, anchors, mailto/tel are left untouched.
   ========================================================= */
(function () {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduce) return;

  document.addEventListener('click', function (e) {
    /* respect modifier-click (open in new tab) */
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;

    const a = e.target.closest('a');
    if (!a) return;

    const href = a.getAttribute('href');
    if (!href) return;
    if (a.target === '_blank' || a.hasAttribute('download')) return;
    if (href.startsWith('#') || href.startsWith('mailto:') ||
        href.startsWith('tel:') || href.startsWith('http')) return;

    /* internal page navigation — animate out, then go */
    e.preventDefault();
    document.body.classList.add('is-leaving');
    setTimeout(function () { window.location.href = href; }, 280);
  });

  /* If restored from bfcache (back button), clear the leaving state */
  window.addEventListener('pageshow', function (ev) {
    if (ev.persisted) document.body.classList.remove('is-leaving');
  });
})();
