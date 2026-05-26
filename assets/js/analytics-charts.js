(function () {
  const data = window.CRM_PORTFOLIO_DATA;
  const project = data && data.project;
  if (!project || typeof Chart === "undefined") return;

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

  const SOFT = {
    blue:    "rgba(59,130,246,.5)",
    cyan:    "rgba(6,182,212,.5)",
    violet:  "rgba(139,92,246,.5)",
    pink:    "rgba(236,72,153,.5)",
    green:   "rgba(16,185,129,.5)",
    amber:   "rgba(245,158,11,.5)",
    red:     "rgba(239,68,68,.5)",
    teal:    "rgba(20,184,166,.5)",
    indigo:  "rgba(99,102,241,.5)",
    rose:    "rgba(244,63,94,.5)"
  };

  Chart.defaults.color = "#cbd5e1";
  Chart.defaults.font.family = "Inter, system-ui, sans-serif";
  Chart.defaults.font.size = 11;

  const chartDefaults = {
    responsive: true,
    maintainAspectRatio: false,
    resizeDelay: 250,
    animation: {
      duration: 1400,
      easing: "easeOutQuart"
    },
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
      x: {
        ticks: { color: "#94a3b8" },
        grid:  { color: "rgba(148,163,184,.08)" },
        border:{ color: "rgba(148,163,184,.15)" }
      },
      y: {
        ticks: { color: "#94a3b8" },
        grid:  { color: "rgba(148,163,184,.08)" },
        border:{ color: "rgba(148,163,184,.15)" }
      }
    }
  };

  /* Helper: create vertical gradient for bar/line fills */
  function gradient(ctx, top, bottom) {
    const g = ctx.createLinearGradient(0, 0, 0, 320);
    g.addColorStop(0, top);
    g.addColorStop(1, bottom);
    return g;
  }

  /* ───────────────────────────────────────────────────────────
     1. KAFKA SCHEMAS → CRM MODULES — categorized doughnut
        Groups the 10 Kafka schemas by what they create in CRM,
        which actually communicates something (vs. equal-height bars).
     ─────────────────────────────────────────────────────────── */
  const schemaEl = document.getElementById("chart-schemas");
  if (schemaEl && project.kafkaSchemas) {

    /* Map each schema name → CRM target group */
    const CRM_TARGET = {
      "Orders":       "Deals & Pipeline",
      "Leads":        "Leads & Attribution",
      "KYC Status":   "KYC & Compliance",
      "KYC Create":   "KYC & Compliance",
      "Appointments": "Tasks & Activity",
      "Carts":        "Carts & Stone Links",
      "Contact":      "Contacts & Onboarding",
      "Inventory":    "Inventory & Products",
      "KAM":          "User Assignments",
      "Multi-purpose":"Demand & Bidding"
    };

    /* Aggregate schemas by CRM target */
    const groups = {};
    project.kafkaSchemas.forEach(function (s) {
      const key = CRM_TARGET[s.name] || s.name;
      if (!groups[key]) groups[key] = [];
      groups[key].push(s.name);
    });

    const labels = Object.keys(groups);
    const counts = labels.map(function (k) { return groups[k].length; });
    const schemaLists = labels.map(function (k) { return groups[k].join(", "); });

    const colorPool = [C.cyan, C.violet, C.pink, C.amber, C.green, C.blue, C.teal, C.indigo, C.rose, C.red];
    const colors = labels.map(function (_, i) { return colorPool[i % colorPool.length]; });

    new Chart(schemaEl, {
      type: "doughnut",
      data: {
        labels: labels,
        datasets: [{
          data: counts,
          backgroundColor: colors,
          borderColor: "rgba(15,23,42,.6)",
          borderWidth: 2,
          hoverOffset: 16,
          hoverBorderColor: "rgba(255,255,255,.2)"
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: "55%",
        animation: { duration: 1400, easing: "easeOutQuart", animateRotate: true, animateScale: true },
        plugins: {
          legend: {
            position: "right",
            labels: {
              color: "#cbd5e1",
              boxWidth: 10,
              padding: 9,
              font: { size: 11 },
              usePointStyle: true,
              pointStyle: "circle"
            }
          },
          tooltip: {
            ...chartDefaults.plugins.tooltip,
            callbacks: {
              label: function (ctx) {
                const i = ctx.dataIndex;
                const n = ctx.parsed;
                return " " + n + " schema" + (n === 1 ? "" : "s") + " · " + schemaLists[i];
              }
            }
          }
        }
      }
    });
  }

  /* ───────────────────────────────────────────────────────────
     2. SKILLS DISTRIBUTION — vibrant doughnut
     ─────────────────────────────────────────────────────────── */
  const skillsEl = document.getElementById("chart-skills");
  if (skillsEl && data.skills) {
    const sorted = [...data.skills].sort(function (a, b) { return b.weight - a.weight; }).slice(0, 8);
    const colors = [C.blue, C.cyan, C.violet, C.pink, C.green, C.amber, C.indigo, C.teal];

    new Chart(skillsEl, {
      type: "doughnut",
      data: {
        labels: sorted.map(function (s) { return s.skill; }),
        datasets: [{
          data: sorted.map(function (s) { return s.weight; }),
          backgroundColor: colors,
          borderColor: "rgba(15,23,42,.6)",
          borderWidth: 2,
          hoverOffset: 14,
          hoverBorderColor: "rgba(255,255,255,.2)"
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
            labels: {
              color: "#cbd5e1",
              boxWidth: 10,
              padding: 8,
              font: { size: 10 },
              usePointStyle: true,
              pointStyle: "circle"
            }
          },
          tooltip: chartDefaults.plugins.tooltip
        }
      }
    });
  }

  /* ───────────────────────────────────────────────────────────
     3. DELIVERABLES VS MODULES — cyan+violet grouped bars
     ─────────────────────────────────────────────────────────── */
  const projectEl = document.getElementById("chart-projects");
  if (projectEl) {
    new Chart(projectEl, {
      type: "bar",
      data: {
        labels: project.workstreams.map(function (w) { return w.name; }),
        datasets: [
          {
            label: "Deliverables",
            data: project.workstreams.map(function (w) { return w.deliverables.length; }),
            backgroundColor: C.cyan,
            borderRadius: 8,
            borderSkipped: false,
            maxBarThickness: 36
          },
          {
            label: "Modules",
            data: project.workstreams.map(function (w) { return w.modules.length; }),
            backgroundColor: C.violet,
            borderRadius: 8,
            borderSkipped: false,
            maxBarThickness: 36
          }
        ]
      },
      options: {
        ...chartDefaults,
        scales: {
          x: { ...chartDefaults.scales.x, grid: { display: false } },
          y: { ...chartDefaults.scales.y, ticks: { ...chartDefaults.scales.y.ticks, stepSize: 1 }, beginAtZero: true }
        }
      }
    });
  }

  /* ───────────────────────────────────────────────────────────
     4. DELIVERY TIMELINE — gradient area line
     ─────────────────────────────────────────────────────────── */
  const timelineEl = document.getElementById("chart-timeline");
  if (timelineEl && project.timeline) {
    const ctx = timelineEl.getContext("2d");

    new Chart(timelineEl, {
      type: "line",
      data: {
        labels: project.timeline.map(function (t) { return t.period; }),
        datasets: [{
          label: "Workstream activity",
          data: project.timeline.map(function (t) { return t.items; }),
          borderColor: C.cyan,
          backgroundColor: gradient(ctx, "rgba(6,182,212,.45)", "rgba(139,92,246,.05)"),
          fill: true,
          tension: 0.4,
          borderWidth: 3,
          pointRadius: 6,
          pointBackgroundColor: C.violet,
          pointBorderColor: "#fff",
          pointBorderWidth: 2,
          pointHoverRadius: 9,
          pointHoverBackgroundColor: C.pink
        }]
      },
      options: {
        ...chartDefaults,
        plugins: { ...chartDefaults.plugins, legend: { display: false } },
        scales: {
          x: { ...chartDefaults.scales.x, grid: { display: false } },
          y: { ...chartDefaults.scales.y, beginAtZero: true }
        }
      }
    });
  }

  /* ───────────────────────────────────────────────────────────
     5. REGIONAL API COVERAGE — polar area (NEW)
     ─────────────────────────────────────────────────────────── */
  const regionalEl = document.getElementById("chart-regional");
  if (regionalEl) {
    const regions = ["India", "Dubai", "Antwerp", "New York"];
    const coverage = [14, 11, 8, 6];

    new Chart(regionalEl, {
      type: "polarArea",
      data: {
        labels: regions,
        datasets: [{
          data: coverage,
          backgroundColor: [SOFT.blue, SOFT.violet, SOFT.cyan, SOFT.amber],
          borderColor: [C.blue, C.violet, C.cyan, C.amber],
          borderWidth: 2,
          hoverBackgroundColor: [C.blue, C.violet, C.cyan, C.amber]
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        animation: { duration: 1400, animateRotate: true, animateScale: true, easing: "easeOutQuart" },
        scales: {
          r: {
            ticks: { color: "#94a3b8", backdropColor: "transparent", showLabelBackdrop: false, stepSize: 4 },
            grid:        { color: "rgba(148,163,184,.12)" },
            angleLines:  { color: "rgba(148,163,184,.12)" },
            pointLabels: { color: "#e2e8f0", font: { size: 12, weight: "600" } }
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

  /* ───────────────────────────────────────────────────────────
     6. WORKSTREAM CAPABILITY MIX — radar (NEW)
     ─────────────────────────────────────────────────────────── */
  const radarEl = document.getElementById("chart-radar");
  if (radarEl && project.workstreams) {
    const axes = ["Deliverables", "Modules", "Tech stack", "Integrations", "Operational depth"];

    function scoreFor(w) {
      return [
        w.deliverables.length,
        w.modules.length,
        w.tags.length,
        Object.keys(w.metrics || {}).reduce(function (n, k) {
          var v = w.metrics[k];
          return n + (typeof v === "number" ? v : 0);
        }, 0) / 3,
        (w.status === "live" ? 6 : w.status === "doc" ? 4 : 2)
      ];
    }

    const datasetColors = [
      { stroke: C.cyan,   fill: "rgba(6,182,212,.22)"  },
      { stroke: C.violet, fill: "rgba(139,92,246,.22)" },
      { stroke: C.amber,  fill: "rgba(245,158,11,.22)" }
    ];

    new Chart(radarEl, {
      type: "radar",
      data: {
        labels: axes,
        datasets: project.workstreams.map(function (w, i) {
          const col = datasetColors[i % datasetColors.length];
          return {
            label: w.name,
            data: scoreFor(w),
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
            ticks: { color: "#94a3b8", backdropColor: "transparent", showLabelBackdrop: false, stepSize: 2 },
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
