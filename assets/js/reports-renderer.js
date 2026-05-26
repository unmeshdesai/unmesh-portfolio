(function () {

  const d = window.CRM_PORTFOLIO_DATA;
  const project = d && d.project;
  const reports = project && project.reports;
  if (!reports) return;

  const cards = reports.cards || [];
  const pageKpis = reports.kpis || [];

  const cardsRoot = document.getElementById("report-cards");
  const kpiRoot   = document.getElementById("report-kpis");
  const detail    = document.getElementById("report-detail");
  const body      = document.getElementById("report-body");

  function escapeHtml(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  /* Card type → icon + color tone */
  const TYPE_META = {
    "Operational": { icon: "⚙️", tone: "blue"   },
    "Technical":   { icon: "🔧", tone: "violet" },
    "Process":     { icon: "📋", tone: "amber"  },
    "Portfolio":   { icon: "🎯", tone: "green"  },
    "Executive":   { icon: "📊", tone: "cyan"   },
    "Compliance":  { icon: "🔒", tone: "red"    }
  };

  function metaFor(type) {
    return TYPE_META[type] || { icon: "📄", tone: "blue" };
  }

  /* KPI cards */
  function renderKpis(list, root) {
    if (!root || !list || !list.length) return;
    root.innerHTML = list.map(function (k) {
      return '<article class="panel kpi tilt ' + (k.tone || "") + '">' +
        '<div class="kpi-label">' + escapeHtml(k.label) + '</div>' +
        '<div class="kpi-value" data-counter>' + escapeHtml(k.value) + '</div>' +
        '<div class="kpi-foot">' + escapeHtml(k.foot) + '</div>' +
        '</article>';
    }).join("");
  }

  function findCard(id) {
    return cards.find(function (r) { return r.id === id; });
  }

  function renderCard(id) {
    const rep = findCard(id);
    if (!rep || !detail || !body) return;
    detail.classList.add("active");

    /* Clear the detail KPI grid — mini-KPIs are placeholders right now,
       so rendering them as em-dashes adds visual noise. Skip until the
       values are wired to real Analytics queries. */
    const detailKpis = document.getElementById("report-detail-kpis");
    if (detailKpis) detailKpis.innerHTML = "";

    const sourceTags = (rep.dataSources || []).map(function (s) {
      return '<span class="tag">' + escapeHtml(s) + '</span>';
    }).join("");

    const viewLinks = (rep.details && rep.details.viewLinks) || [];
    const linksHtml = viewLinks.length
      ? '<div style="margin-top:14px"><p style="font-size:11px;color:var(--faint);font-weight:700;margin-bottom:6px">ANALYTICS VIEWS</p>' +
        viewLinks.map(function (v) {
          return '<a class="tag" href="' + escapeHtml(v.url || "#") + '" target="_blank">' + escapeHtml(v.name) + '</a>';
        }).join(" ") + '</div>'
      : "";

    body.innerHTML =
      '<h2 style="font-size:18px;font-weight:700;margin-bottom:4px">' + escapeHtml(rep.name) + '</h2>' +
      '<p style="color:var(--muted);font-size:13px;margin-bottom:14px">' + escapeHtml(rep.summary) + '</p>' +
      '<p style="font-size:12px;color:var(--faint);font-weight:700;margin:14px 0 6px">DATA SOURCES</p>' +
      '<div class="tag-row">' + sourceTags + '</div>' +
      (rep.impact ? '<p style="margin-top:14px;font-size:13px;color:#bfdbfe"><strong>Impact:</strong> ' + escapeHtml(rep.impact) + '</p>' : "") +
      linksHtml;

    history.replaceState(null, "", "#" + id);
    detail.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  /* Render top KPIs */
  if (kpiRoot && pageKpis.length) renderKpis(pageKpis, kpiRoot);

  /* Render report cards */
  if (cardsRoot) {
    cardsRoot.innerHTML = cards.map(function (rep) {
      const m = metaFor(rep.type);
      const statusLabel = (rep.status === "planned") ? "Planned" : "Active";
      const statusClass = (rep.status === "planned") ? "warn" : "live";

      /* Show source tags as the preview "metric" — real data, not em-dashes */
      const previewSources = (rep.dataSources || []).slice(0, 3).map(function (s) {
        return '<span class="tag">' + escapeHtml(s) + '</span>';
      }).join("");
      const extraCount = Math.max(0, (rep.dataSources || []).length - 3);
      const extraTag = extraCount > 0
        ? '<span class="tag" style="opacity:.65">+' + extraCount + ' more</span>'
        : "";

      return '<a class="panel report-card tilt tone-' + m.tone + '" href="#' + rep.id + '" data-id="' + rep.id + '">' +
        '<div class="report-card-head">' +
          '<div class="report-card-icon">' + m.icon + '</div>' +
          '<span class="status-pill ' + statusClass + '">' + escapeHtml(statusLabel) + '</span>' +
        '</div>' +
        (rep.kicker ? '<div class="card-kicker">' + escapeHtml(rep.kicker) + '</div>' : "") +
        '<h3>' + escapeHtml(rep.name) + '</h3>' +
        '<p>' + escapeHtml(rep.summary) + '</p>' +
        '<div class="tag-row" style="margin-top:14px">' + previewSources + extraTag + '</div>' +
        (rep.impact ? '<div class="report-card-foot" style="margin-top:14px">' + escapeHtml(rep.impact) + ' →</div>' : "") +
        '</a>';
    }).join("");

    cardsRoot.querySelectorAll(".report-card").forEach(function (card) {
      card.addEventListener("click", function (e) {
        e.preventDefault();
        renderCard(card.getAttribute("data-id"));
      });
    });
  }

  /* Deep-link handling */
  const hash = location.hash.replace("#", "");
  if (hash && findCard(hash)) renderCard(hash);

})();
