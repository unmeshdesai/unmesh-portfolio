(function () {
  const data = window.CRM_PORTFOLIO_DATA;
  const project = data && data.project;
  if (!project || typeof Chart === "undefined") return;

  const charts = project.dashboards && project.dashboards.charts;
  if (!charts) return;

  /* Vibrant data palette — identical on both themes */
  const C = {
    blue:    "#3b82f6",
    cyan:    "#06b6d4",
    violet:  "#8b5cf6",
    pink:    "#ec4899",
    green:   "#10b981",
    amber:   "#f59e0b",
    red:     "#ef4444",
    teal:    "#14b8a6",
    indigo:  "#6366f1",
    rose:    "#f43f5e"
  };

  Chart.defaults.font.family = "Inter, system-ui, sans-serif";
  Chart.defaults.font.size = 11;

  /* Theme-dependent chrome colors (axes, labels, grid, tooltip).
     Recomputed on every render so a theme switch repaints correctly. */
  function tokens() {
    const light = document.documentElement.getAttribute("data-theme") === "light";
    return light
      ? {
          label:      "#334155",
          labelBold:  "#0f172a",
          tick:       "#475569",
          grid:       "rgba(15,23,42,.08)",
          border:     "rgba(15,23,42,.15)",
          segBorder:  "#ffffff",
          ttBg:       "rgba(255,255,255,.97)",
          ttTitle:    "#0f172a",
          ttBody:     "#475569",
          ttBorder:   "rgba(15,23,42,.15)"
        }
      : {
          label:      "#cbd5e1",
          labelBold:  "#e2e8f0",
          tick:       "#94a3b8",
          grid:       "rgba(148,163,184,.08)",
          border:     "rgba(148,163,184,.15)",
          segBorder:  "rgba(15,23,42,.6)",
          ttBg:       "rgba(15,23,42,.96)",
          ttTitle:    "#fff",
          ttBody:     "#cbd5e1",
          ttBorder:   "rgba(59,130,246,.35)"
        };
  }

  function gradient(ctx, top, bottom) {
    const g = ctx.createLinearGradient(0, 0, 0, 320);
    g.addColorStop(0, top);
    g.addColorStop(1, bottom);
    return g;
  }

  let instances = [];
  function track(c) { if (c) instances.push(c); return c; }
  function destroyAll() {
    instances.forEach(function (c) { try { c.destroy(); } catch (e) {} });
    instances = [];
  }

  function render() {
    const T = tokens();
    Chart.defaults.color = T.label;

    const base = {
      responsive: true,
      maintainAspectRatio: false,
      resizeDelay: 250,
      animation: { duration: 1100, easing: "easeOutQuart" },
      plugins: {
        legend: {
          labels: { color: T.label, padding: 16, boxWidth: 12, usePointStyle: true, pointStyle: "rectRounded" }
        },
        tooltip: {
          backgroundColor: T.ttBg,
          borderColor: T.ttBorder,
          borderWidth: 1,
          titleColor: T.ttTitle,
          bodyColor: T.ttBody,
          padding: 12,
          boxPadding: 6,
          cornerRadius: 8,
          usePointStyle: true
        }
      },
      scales: {
        x: { ticks: { color: T.tick }, grid: { color: T.grid }, border: { color: T.border } },
        y: { ticks: { color: T.tick }, grid: { color: T.grid }, border: { color: T.border } }
      }
    };

    destroyAll();

    /* 1. ROLES — doughnut */
    const schemaEl = document.getElementById("chart-schemas");
    const rolesData = charts.roles || charts.schemas;
    if (schemaEl && rolesData) {
      const palette = [C.blue, C.cyan, C.violet, C.pink, C.amber, C.green, C.teal, C.indigo];
      track(new Chart(schemaEl, {
        type: "doughnut",
        data: {
          labels: rolesData.labels,
          datasets: [{
            data: rolesData.values,
            backgroundColor: rolesData.labels.map(function (_, i) { return palette[i % palette.length]; }),
            borderColor: T.segBorder,
            borderWidth: 2,
            hoverOffset: 16,
            hoverBorderColor: T.segBorder
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          cutout: "58%",
          animation: { duration: 1100, easing: "easeOutQuart", animateRotate: true, animateScale: true },
          plugins: {
            legend: { position: "right", labels: { color: T.label, boxWidth: 10, padding: 10, font: { size: 11 }, usePointStyle: true, pointStyle: "circle" } },
            tooltip: Object.assign({}, base.plugins.tooltip, {
              callbacks: { label: function (ctx) { const n = ctx.parsed; return " " + n + " user" + (n === 1 ? "" : "s") + " · " + ctx.label; } }
            })
          }
        }
      }));
    }

    /* 2. SKILLS — horizontal bar */
    const skillsEl = document.getElementById("chart-skills");
    if (skillsEl && charts.skills) {
      const palette = [C.blue, C.cyan, C.violet, C.pink, C.green, C.amber, C.indigo, C.teal, C.rose, C.red];
      track(new Chart(skillsEl, {
        type: "bar",
        data: {
          labels: charts.skills.labels,
          datasets: [{
            label: "Proficiency",
            data: charts.skills.values,
            backgroundColor: charts.skills.labels.map(function (_, i) { return palette[i % palette.length]; }),
            borderRadius: 8, borderSkipped: false, maxBarThickness: 24
          }]
        },
        options: Object.assign({}, base, {
          indexAxis: "y",
          plugins: Object.assign({}, base.plugins, { legend: { display: false } }),
          scales: {
            x: { ticks: { color: T.tick, stepSize: 25 }, grid: { color: T.grid }, border: { color: T.border }, beginAtZero: true, max: 100 },
            y: { ticks: { color: T.labelBold, font: { size: 11, weight: "600" } }, grid: { display: false } }
          }
        })
      }));
    }

    /* 3. PROJECTS — horizontal bar */
    const projectEl = document.getElementById("chart-projects");
    if (projectEl && charts.projects) {
      const palette = [C.blue, C.cyan, C.violet, C.pink, C.amber, C.green, C.teal, C.indigo, C.rose, C.red];
      track(new Chart(projectEl, {
        type: "bar",
        data: {
          labels: charts.projects.labels,
          datasets: [{
            label: "Active functions",
            data: charts.projects.values,
            backgroundColor: charts.projects.labels.map(function (_, i) { return palette[i % palette.length]; }),
            borderRadius: 8, borderSkipped: false, maxBarThickness: 26
          }]
        },
        options: Object.assign({}, base, {
          indexAxis: "y",
          plugins: Object.assign({}, base.plugins, { legend: { display: false } }),
          scales: {
            x: { ticks: { color: T.tick, stepSize: 2 }, grid: { color: T.grid }, border: { color: T.border }, beginAtZero: true },
            y: { ticks: { color: T.labelBold, font: { size: 11, weight: "600" } }, grid: { display: false } }
          }
        })
      }));
    }

    /* 4. TIMELINE — combo bar + line */
    const timelineEl = document.getElementById("chart-timeline");
    if (timelineEl && charts.timeline) {
      const ctx = timelineEl.getContext("2d");
      track(new Chart(timelineEl, {
        type: "bar",
        data: {
          labels: charts.timeline.labels,
          datasets: [
            {
              type: "bar", label: "Added this quarter", data: charts.timeline.bars,
              backgroundColor: gradient(ctx, "rgba(139,92,246,.85)", "rgba(139,92,246,.35)"),
              borderRadius: 6, borderSkipped: false, maxBarThickness: 28, yAxisID: "y"
            },
            {
              type: "line", label: "Cumulative active", data: charts.timeline.line,
              borderColor: C.cyan, backgroundColor: gradient(ctx, "rgba(6,182,212,.35)", "rgba(6,182,212,.02)"),
              fill: true, tension: 0.4, borderWidth: 3, pointRadius: 5,
              pointBackgroundColor: C.pink, pointBorderColor: "#fff", pointBorderWidth: 2, pointHoverRadius: 8, yAxisID: "y1"
            }
          ]
        },
        options: Object.assign({}, base, {
          interaction: { mode: "index", intersect: false },
          scales: {
            x:  { ticks: { color: T.tick }, grid: { display: false }, border: { color: T.border } },
            y:  { ticks: { color: T.tick }, grid: { color: T.grid }, border: { color: T.border }, position: "left", beginAtZero: true,
                  title: { display: true, text: "Added", color: T.tick, font: { size: 10 } } },
            y1: { ticks: { color: T.tick }, grid: { drawOnChartArea: false }, border: { color: T.border }, position: "right", beginAtZero: true,
                  title: { display: true, text: "Cumulative", color: T.tick, font: { size: 10 } } }
          }
        })
      }));
    }

    /* 5. REGIONAL — vertical bar */
    const regionalEl = document.getElementById("chart-regional");
    if (regionalEl && charts.regional) {
      const palette = [C.blue, C.violet, C.cyan, C.amber, C.green];
      track(new Chart(regionalEl, {
        type: "bar",
        data: {
          labels: charts.regional.labels,
          datasets: [{
            label: "Active users",
            data: charts.regional.values,
            backgroundColor: charts.regional.labels.map(function (_, i) { return palette[i % palette.length]; }),
            borderRadius: 8, borderSkipped: false, maxBarThickness: 56
          }]
        },
        options: Object.assign({}, base, {
          plugins: Object.assign({}, base.plugins, { legend: { display: false } }),
          scales: {
            x: { ticks: { color: T.labelBold, font: { size: 12, weight: "700" } }, grid: { display: false }, border: { color: T.border } },
            y: { ticks: { color: T.tick, stepSize: 5 }, grid: { color: T.grid }, border: { color: T.border }, beginAtZero: true }
          }
        })
      }));
    }

    /* 6. RADAR — workstream capability mix */
    const radarEl = document.getElementById("chart-radar");
    if (radarEl && charts.radar) {
      const datasetColors = [
        { stroke: C.cyan,   fill: "rgba(6,182,212,.22)"  },
        { stroke: C.violet, fill: "rgba(139,92,246,.22)" },
        { stroke: C.amber,  fill: "rgba(245,158,11,.22)" }
      ];
      track(new Chart(radarEl, {
        type: "radar",
        data: {
          labels: charts.radar.labels,
          datasets: charts.radar.datasets.map(function (ds, i) {
            const col = datasetColors[i % datasetColors.length];
            return {
              label: ds.label, data: ds.values,
              borderColor: col.stroke, backgroundColor: col.fill, borderWidth: 2.5,
              pointBackgroundColor: col.stroke, pointBorderColor: "#fff", pointBorderWidth: 1.5,
              pointRadius: 4, pointHoverRadius: 7, tension: 0.05
            };
          })
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          animation: { duration: 1100, easing: "easeOutQuart" },
          scales: {
            r: {
              beginAtZero: true, min: 0, max: 100,
              ticks: { color: T.tick, backdropColor: "transparent", showLabelBackdrop: false, stepSize: 20 },
              grid:        { color: T.grid },
              angleLines:  { color: T.grid },
              pointLabels: { color: T.labelBold, font: { size: 11, weight: "600" } }
            }
          },
          plugins: {
            legend: { position: "bottom", labels: { color: T.label, padding: 14, usePointStyle: true, pointStyle: "circle", boxWidth: 10 } },
            tooltip: base.plugins.tooltip
          }
        }
      }));
    }
  }

  render();

  /* Repaint charts when the theme attribute flips */
  const observer = new MutationObserver(function (mutations) {
    for (const m of mutations) {
      if (m.attributeName === "data-theme") { render(); break; }
    }
  });
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });

})();
