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
