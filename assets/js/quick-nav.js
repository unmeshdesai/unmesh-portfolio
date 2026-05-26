/* Quick navigation — filters a static portfolio index as you type.
   To add new destinations, append entries to INDEX below. Tags are matched
   in addition to title/group, so a search for "kafka" surfaces KGK Reports. */

const INDEX = [
  { title: 'Profile',          group: 'Portfolio', url: 'index.html',                    tags: ['home', 'profile', 'about', 'overview'] },
  { title: 'KGK Group Zoho Implementation',  group: 'Projects',  url: 'kgk.html',                      tags: ['kgk', 'crm', 'zoho', 'project', 'group', 'implementation'] },
  { title: 'KGK Dashboards',   group: 'Projects',  url: 'kgk-dashboards.html',           tags: ['kgk', 'dashboards', 'kpi', 'charts', 'analytics'] },
  { title: 'KGK Reports',      group: 'Projects',  url: 'kgk-reports.html',              tags: ['kgk', 'reports', 'symphony', 'nivid', 'subform', 'kafka'] },
  { title: 'Symphony Sync',    group: 'Workstream',url: 'kgk-reports.html',              tags: ['kafka', 'webhook', 'integration', 'sync', 'symphony'] },
  { title: 'NIVID Connect',    group: 'Workstream',url: 'kgk-reports.html',              tags: ['oracle', 'apis', 'rfid', 'nivid'] },
  { title: 'Subform Widget',   group: 'Workstream',url: 'kgk-reports.html',              tags: ['ag-grid', 'widget', 'subform', 'deals'] },
  { title: 'Skills',           group: 'Portfolio', url: 'skills.html',                   tags: ['skills', 'zoho', 'deluge', 'apis', 'kafka', 'creator'] },
  { title: 'Experience',       group: 'Portfolio', url: 'index.html#experience',         tags: ['experience', 'jobs', 'roles', 'career'] },
  { title: 'Work',             group: 'Portfolio', url: 'index.html#work',               tags: ['work', 'projects'] },
  { title: 'Contact',          group: 'Portfolio', url: 'education_contact.html#contact',tags: ['contact', 'email', 'message', 'hire'] },
  { title: 'Send a message',   group: 'Portfolio', url: 'education_contact.html#message',tags: ['contact', 'form', 'message'] },
  { title: 'Resume',           group: 'Portfolio', url: 'Unmesh_Desai_Resume.html',      tags: ['resume', 'cv'] },
];

document.addEventListener('DOMContentLoaded', () => {

  document.querySelectorAll('label.search').forEach(initSearch);

  function initSearch(label) {

    const input = label.querySelector('input');
    if (!input) return;

    label.classList.add('search-bound');

    const dropdown = document.createElement('div');
    dropdown.className = 'search-dropdown';
    dropdown.setAttribute('role', 'listbox');
    label.appendChild(dropdown);

    let activeIndex = -1;
    let currentResults = [];

    function score(item, q) {
      const haystack = [item.title, item.group, ...(item.tags || [])].join(' ').toLowerCase();
      if (!haystack.includes(q)) return -1;
      let s = 0;
      if (item.title.toLowerCase().startsWith(q)) s += 100;
      if (item.title.toLowerCase().includes(q)) s += 50;
      if (item.group.toLowerCase().includes(q)) s += 10;
      (item.tags || []).forEach(t => { if (t.toLowerCase().includes(q)) s += 5; });
      return s;
    }

    function render(results) {
      currentResults = results;
      activeIndex = results.length ? 0 : -1;

      if (!results.length) {
        dropdown.innerHTML = '<div class="search-empty">No matches</div>';
      } else {
        dropdown.innerHTML = results.map((r, i) => (
          '<a class="search-item" role="option" data-i="' + i + '" href="' + r.url + '">' +
            '<span class="search-item-title">' + escapeHtml(r.title) + '</span>' +
            '<span class="search-item-group">' + escapeHtml(r.group) + '</span>' +
          '</a>'
        )).join('');
      }

      updateActive();
    }

    function updateActive() {
      dropdown.querySelectorAll('.search-item').forEach((el, i) => {
        el.classList.toggle('active', i === activeIndex);
      });
    }

    function escapeHtml(s) {
      return String(s)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
    }

    function open() {
      label.classList.add('search-open');
      if (!input.value.trim()) {
        render(INDEX.slice(0, 8));
      }
    }

    function close() {
      label.classList.remove('search-open');
    }

    input.addEventListener('focus', open);

    input.addEventListener('input', () => {
      const q = input.value.trim().toLowerCase();
      if (!q) {
        render(INDEX.slice(0, 8));
        return;
      }
      const scored = INDEX
        .map(item => ({ item, s: score(item, q) }))
        .filter(x => x.s > 0)
        .sort((a, b) => b.s - a.s)
        .slice(0, 10)
        .map(x => x.item);
      render(scored);
    });

    input.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        if (currentResults.length) {
          activeIndex = (activeIndex + 1) % currentResults.length;
          updateActive();
        }
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        if (currentResults.length) {
          activeIndex = (activeIndex - 1 + currentResults.length) % currentResults.length;
          updateActive();
        }
      } else if (e.key === 'Enter') {
        if (activeIndex >= 0 && currentResults[activeIndex]) {
          e.preventDefault();
          window.location.href = currentResults[activeIndex].url;
        }
      } else if (e.key === 'Escape') {
        input.blur();
        close();
      }
    });

    document.addEventListener('click', (e) => {
      if (!label.contains(e.target)) close();
    });
  }

});
