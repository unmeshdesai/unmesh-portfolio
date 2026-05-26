(function () {

  const d = window.CRM_PORTFOLIO_DATA;

  const catalog = d && d.project && d.project.reports && d.project.reports.catalog;

  if (!catalog) return;



  const cardsRoot = document.getElementById("report-cards");

  const kpiRoot = document.getElementById("report-kpis");

  const detail = document.getElementById("report-detail");

  const body = document.getElementById("report-body");

  if (!cardsRoot) return;



  function escapeHtml(str) {

    return String(str)

      .replace(/&/g, "&amp;")

      .replace(/</g, "&lt;")

      .replace(/>/g, "&gt;")

      .replace(/"/g, "&quot;");

  }



  function getByPath(path) {

    if (!path) return undefined;

    return path.split(".").reduce(function (obj, key) {

      return obj && obj[key];

    }, d);

  }



  function skillTier(weight) {

    if (weight >= 90) return "Core";

    if (weight >= 82) return "Strong";

    return "Supporting";

  }



  function resolveRowValue(spec, row) {

    if (typeof spec === "string") return row[spec];

    if (spec && spec.value !== undefined) return spec.value;

    if (spec && spec.fn === "weightPct") return row.weight + "%";

    if (spec && spec.fn === "skillTier") return skillTier(row.weight);

    if (spec && spec.fn === "deliverableCount") return String(row.deliverables.length);

    if (spec && spec.fn === "moduleCount") return String(row.modules.length);

    return "";

  }



  function resolveRows(section) {

    const table = section.table;

    if (!table) return [];

    if (table.rows) {

      return table.rows.map(function (r) {

        return Array.isArray(r) ? r : [r.col1, r.col2, r.col3, r.col4].filter(function (_, i) {

          return i < table.headers.length;

        });

      });

    }

    if (table.rowsFrom) {

      const source = getByPath(table.rowsFrom);

      if (!source) return [];

      return source.map(function (row) {

        return table.rowMap.map(function (spec) {

          return resolveRowValue(spec, row);

        });

      });

    }

    return [];

  }



  function renderKpis(kpis, root) {

    if (!root || !kpis || !kpis.length) return;

    root.innerHTML = kpis

      .map(function (k) {

        return (

          '<article class="panel kpi tilt ' +

          (k.tone || "") +

          '"><div class="kpi-label">' +

          escapeHtml(k.label) +

          '</div><div class="kpi-value" data-counter>' +

          escapeHtml(k.value) +

          '</div><div class="kpi-foot">' +

          escapeHtml(k.foot) +

          "</div></article>"

        );

      })

      .join("");

  }



  function renderTable(section) {

    const table = section.table;

    const rows = resolveRows(section);

    const head =

      '<thead><tr>' +

      table.headers.map(function (h) {

        return "<th>" + escapeHtml(h) + "</th>";

      }).join("") +

      "</tr></thead>";

    const bodyRows = rows

      .map(function (cells) {

        return (

          "<tr>" +

          cells

            .map(function (cell) {

              return "<td>" + escapeHtml(cell) + "</td>";

            })

            .join("") +

          "</tr>"

        );

      })

      .join("");

    return (

      '<div class="table-wrap"><table class="crm-table">' +

      head +

      "<tbody>" +

      bodyRows +

      "</tbody></table></div>"

    );

  }



  function findReport(id) {

    return catalog.find(function (r) {

      return r.id === id;

    });

  }



  function renderReport(id) {

    const rep = findReport(id);

    if (!rep || !detail || !body) return;

    detail.classList.add("active");



    const reportKpis = document.getElementById("report-detail-kpis");

    if (reportKpis) renderKpis(rep.kpis, reportKpis);



    const sectionsHtml = (rep.sections || [])

      .map(function (sec) {

        return (

          '<section style="margin-top:16px">' +

          '<h3 style="font-size:14px;font-weight:700">' +

          escapeHtml(sec.title) +

          "</h3>" +

          (sec.description

            ? '<p style="color:var(--muted);font-size:12px;margin:4px 0 10px">' +

              escapeHtml(sec.description) +

              "</p>"

            : "") +

          renderTable(sec) +

          "</section>"

        );

      })

      .join("");



    body.innerHTML =

      '<h2 style="font-size:16px;font-weight:700;margin-bottom:4px">' +

      escapeHtml(rep.title) +

      "</h2>" +

      '<p style="color:var(--muted);font-size:12px;margin-bottom:12px">' +

      escapeHtml(rep.description) +

      " · Updated " +

      escapeHtml(rep.updated) +

      "</p>" +

      sectionsHtml;



    history.replaceState(null, "", "#" + id);

  }



  const pageKpis = d.project.reports.pageKpis;

  if (kpiRoot && pageKpis) {

    renderKpis(pageKpis, kpiRoot);

  }



  cardsRoot.innerHTML = catalog

    .map(function (rep) {

      return (

        '<a class="panel report-card" href="#' +

        rep.id +

        '" data-id="' +

        rep.id +

        '">' +

        '<span class="status-pill doc">' +

        escapeHtml(rep.type) +

        "</span>" +

        "<h3>" +

        escapeHtml(rep.title) +

        "</h3>" +

        '<p style="color:var(--muted);font-size:12px;margin-top:6px">' +

        escapeHtml(rep.description) +

        "</p>" +

        '<div class="meta">Updated ' +

        escapeHtml(rep.updated) +

        "</div></a>"

      );

    })

    .join("");



  cardsRoot.querySelectorAll(".report-card").forEach(function (card) {

    card.addEventListener("click", function (e) {

      e.preventDefault();

      renderReport(card.getAttribute("data-id"));

    });

  });



  const hash = location.hash.replace("#", "");

  if (hash && findReport(hash)) renderReport(hash);

})();

