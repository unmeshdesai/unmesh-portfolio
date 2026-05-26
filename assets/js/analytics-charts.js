(function () {
  const data = window.CRM_PORTFOLIO_DATA;
  const project = data && data.project;
  if (!project || typeof Chart === "undefined") return;

  const charts = project.dashboards && project.dashboards.charts;
  if (!charts) return;

  /* Vibrant palette */
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

  Chart.defaults.color = "#cbd5e1";
  Chart.defaults.font.family = "Inter, system-ui, sans-serif";
  Chart.defaults.font.size = 11;

  const chartDefaults = {
    responsive: true,
    maintainAspectRatio: false,
    resizeDelay: 250,
    animation: { duration: 1400, easing: "easeOutQuart" },
    plugins: {
      legend: {
        labels: {
          color: "#cbd5e1",
          padding: 16,
          boxWidth: 12,
          usePointStyle: true,
          pointStyle: "rectRounded"
        }
      },
      tooltip: {
        backgroundColor: "rgba(15,23,42,.96)",
        borderColor: "rgba(59,130,246,.35)",
        borderWidth: 1,
        titleColor: "#fff",
        bodyColor: "#cbd5e1",
        padding: 12,
        boxPadding: 6,
        cornerRadius: 8,
        usePointStyle: true
      }
    },
    scales: {
      x: { ticks: { color: "#94a3b8" }, grid: { color: "rgba(148,163,184,.08)" }, border: { color: "rgba(148,163,184,.15)" } },
      y: { ticks: { color: "#94a3b8" }, grid: { color: "rgba(148,163,184,.08)" }, border: { color: "rgba(148,163,184,.15)" } }
    }
  };

  function gradient(ctx, top, bottom) {
    const g = ctx.createLinearGradient(0, 0, 0, 320);
    g.addColorStop(0, top);
    g.addColorStop(1, bottom);
    return g;
  }

  /* ─────────────────────────────────────────────────────────
     1. ROLES — doughnut · Roles & hierarchy across 61 active users
     ───────────────────────────────────────────────────────── */
  const schemaEl = document.getElementById("chart-schemas");
  const rolesData = charts.roles || charts.schemas;
  if (schemaEl && rolesData) {
    const palette = [C.blue, C.cyan, C.violet, C.pink, C.amber, C.green, C.teal, C.indigo];
    new Chart(schemaEl, {
      type: "doughnut",
      data: {
        labels: rolesData.labels,
        datasets: [{
          data: rolesData.values,
          backgroundColor: rolesData.labels.map(function (_, i) { return palette[i % palette.length]; }),
          borderColor: "rgba(15,23,42,.6)",
          borderWidth: 2,
          hoverOffset: 16,
          hoverBorderColor: "rgba(255,255,255,.25)"
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: "58%",
        animation: { duration: 1400, easing: "easeOutQuart", animateRotate: true, animateScale: true },
        plugins: {
          legend: {
            position: "right",
            labels: { color: "#cbd5e1", boxWidth: 10, padding: 10, font: { size: 11 }, usePointStyle: true, pointStyle: "circle" }
          },
          tooltip: {
            ...chartDefaults.plugins.tooltip,
            callbacks: {
              label: function (ctx) {
                const n = ctx.parsed;
                return " " + n + " user" + (n === 1 ? "" : "s") + " · " + ctx.label;
              }
            }
          }
        }
      }
    });
  }

  /* ─────────────────────────────────────────────────────────
     2. SKILLS — horizontal bar · capability proficiency
     ───────────────────────────────────────────────────────── */
  const skillsEl = document.getElementById("chart-skills");
  if (skillsEl && charts.skills) {
    const palette = [C.blue, C.cyan, C.violet, C.pink, C.green, C.amber, C.indigo, C.teal, C.rose, C.red];
    new Chart(skillsEl, {
      type: "bar",
      data: {
        labels: charts.skills.labels,
        datasets: [{
          label: "Proficiency",
          data: charts.skills.values,
          backgroundColor: charts.skills.labels.map(function (_, i) { return palette[i % palette.length]; }),
          borderRadius: 8,
          borderSkipped: false,
          maxBarThickness: 24
        }]
      },
      options: {
        ...chartDefaults,
        indexAxis: "y",
        plugins: { ...chartDefaults.plugins, legend: { display: false } },
        scales: {
          x: { ...chartDefaults.scales.x, beginAtZero: true, max: 100, ticks: { ...chartDefaults.scales.x.ticks, stepSize: 25 } },
          y: { ...chartDefaults.scales.y, ticks: { color: "#e2e8f0", font: { size: 11, weight: "600" } }, grid: { display: false } }
        }
      }
    });
  }

  /* ─────────────────────────────────────────────────────────
     3. PROJECTS — horizontal bar · Automation functions by module
     ───────────────────────────────────────────────────────── */
  const projectEl = document.getElementById("chart-projects");
  if (projectEl && charts.projects) {
    const palette = [C.blue, C.cyan, C.violet, C.pink, C.amber, C.green, C.teal, C.indigo, C.rose, C.red];
    new Chart(projectEl, {
      type: "bar",
      data: {
        labels: charts.projects.labels,
        datasets: [{
          label: "Active functions",
          data: charts.projects.values,
          backgroundColor: charts.projects.labels.map(function (_, i) { return palette[i % palette.length]; }),
          borderRadius: 8,
          borderSkipped: false,
          maxBarThickness: 26
        }]
      },
      options: {
        ...chartDefaults,
        indexAxis: "y",
        plugins: { ...chartDefaults.plugins, legend: { display: false } },
        scales: {
          x: { ...chartDefaults.scales.x, ticks: { ...chartDefaults.scales.x.ticks, stepSize: 2 }, beginAtZero: true },
          y: { ...chartDefaults.scales.y, ticks: { color: "#e2e8f0", font: { size: 11, weight: "600" } }, grid: { display: false } }
        }
      }
    });
  }

  /* ─────────────────────────────────────────────────────────
     4. TIMELINE — combo · Automation growth by quarter
     ───────────────────────────────────────────────────────── */
  const timelineEl = document.getElementById("chart-timeline");
  if (timelineEl && charts.timeline) {
    const ctx = timelineEl.getContext("2d");
    new Chart(timelineEl, {
      type: "bar",
      data: {
        labels: charts.timeline.labels,
        datasets: [
          {
            type: "bar",
            label: "Added this quarter",
            data: charts.timeline.bars,
            backgroundColor: gradient(ctx, "rgba(139,92,246,.85)", "rgba(139,92,246,.35)"),
            borderRadius: 6,
            borderSkipped: false,
            maxBarThickness: 28,
            yAxisID: "y"
          },
          {
            type: "line",
            label: "Cumulative active",
            data: charts.timeline.line,
            borderColor: C.cyan,
            backgroundColor: gradient(ctx, "rgba(6,182,212,.35)", "rgba(6,182,212,.02)"),
            fill: true,
            tension: 0.4,
            borderWidth: 3,
            pointRadius: 5,
            pointBackgroundColor: C.pink,
            pointBorderColor: "#fff",
            pointBorderWidth: 2,
            pointHoverRadius: 8,
            yAxisID: "y1"
          }
        ]
      },
      options: {
        ...chartDefaults,
        interaction: { mode: "index", intersect: false },
        scales: {
          x: { ...chartDefaults.scales.x, grid: { display: false } },
          y:  { ...chartDefaults.scales.y, position: "left",  beginAtZero: true,
                title: { display: true, text: "Added", color: "#94a3b8", font: { size: 10 } } },
          y1: { ...chartDefaults.scales.y, position: "right", beginAtZero: true,
                grid: { drawOnChartArea: false },
                title: { display: true, text: "Cumulative", color: "#94a3b8", font: { size: 10 } } }
        }
      }
    });
  }

  /* ─────────────────────────────────────────────────────────
     5. REGIONAL — bar · Active users by region
     ───────────────────────────────────────────────────────── */
  const regionalEl = document.getElementById("chart-regional");
  if (regionalEl && charts.regional) {
    const palette = [C.blue, C.violet, C.cyan, C.amber, C.green];
    new Chart(regionalEl, {
      type: "bar",
      data: {
        labels: charts.regional.labels,
        datasets: [{
          label: "Active users",
          data: charts.regional.values,
          backgroundColor: charts.regional.labels.map(function (_, i) { return palette[i % palette.length]; }),
          borderRadius: 8,
          borderSkipped: false,
          maxBarThickness: 56
        }]
      },
      options: {
        ...chartDefaults,
        plugins: { ...chartDefaults.plugins, legend: { display: false } },
        scales: {
          x: { ...chartDefaults.scales.x, grid: { display: false }, ticks: { color: "#e2e8f0", font: { size: 12, weight: "700" } } },
          y: { ...chartDefaults.scales.y, beginAtZero: true, ticks: { ...chartDefaults.scales.y.ticks, stepSize: 5 } }
        }
      }
    });
  }

  /* ─────────────────────────────────────────────────────────
     6. RADAR — Workstream capability mix
     ───────────────────────────────────────────────────────── */
  const radarEl = document.getElementById("chart-radar");
  if (radarEl && charts.radar) {
    const datasetColors = [
      { stroke: C.cyan,   fill: "rgba(6,182,212,.22)"  },
      { stroke: C.violet, fill: "rgba(139,92,246,.22)" },
      { stroke: C.amber,  fill: "rgba(245,158,11,.22)" }
    ];

    new Chart(radarEl, {
      type: "radar",
      data: {
        labels: charts.radar.labels,
        datasets: charts.radar.datasets.map(function (ds, i) {
          const col = datasetColors[i % datasetColors.length];
          return {
            label: ds.label,
            data: ds.values,
            borderColor: col.stroke,
            backgroundColor: col.fill,
            borderWidth: 2.5,
            pointBackgroundColor: col.stroke,
            pointBorderColor: "#fff",
            pointBorderWidth: 1.5,
            pointRadius: 4,
            pointHoverRadius: 7,
            tension: 0.05
          };
        })
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        animation: { duration: 1400, easing: "easeOutQuart" },
        scales: {
          r: {
            beginAtZero: true,
            min: 0,
            max: 100,
            ticks: { color: "#94a3b8", backdropColor: "transparent", showLabelBackdrop: false, stepSize: 20 },
            grid:        { color: "rgba(148,163,184,.1)" },
            angleLines:  { color: "rgba(148,163,184,.1)" },
            pointLabels: { color: "#e2e8f0", font: { size: 11, weight: "600" } }
          }
        },
        plugins: {
          legend: {
            position: "bottom",
            labels: { color: "#cbd5e1", padding: 14, usePointStyle: true, pointStyle: "circle", boxWidth: 10 }
          },
          tooltip: chartDefaults.plugins.tooltip
        }
      }
    });
  }

})();
