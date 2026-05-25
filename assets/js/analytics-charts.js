(function () {

  const data = window.CRM_PORTFOLIO_DATA;

  const project = data && data.project;

  if (!project || typeof Chart === "undefined") return;



  const workstreams = project.workstreams;

  const blue = "#226DB4";

  const blueSoft = "rgba(34, 109, 180, 0.15)";

  const green = "#219E4A";

  const orange = "#F9B21D";

  const muted = "#8B93A7";



  const chartDefaults = {

    responsive: true,

    maintainAspectRatio: false,

    plugins: {

      legend: {

        labels: { boxWidth: 10, font: { size: 11 }, color: "#5A5A72" },

      },

    },

    scales: {

      x: {

        ticks: { font: { size: 11 }, color: muted },

        grid: { color: "#E2E4EF" },

      },

      y: {

        ticks: { font: { size: 11 }, color: muted },

        grid: { color: "#E2E4EF" },

        beginAtZero: true,

      },

    },

  };



  const schemaEl = document.getElementById("chart-schemas");

  if (schemaEl) {

    new Chart(schemaEl, {

      type: "bar",

      data: {

        labels: project.kafkaSchemas.map((s) => s.name),

        datasets: [

          {

            label: "Schema coverage",

            data: project.kafkaSchemas.map(() => 1),

            backgroundColor: blueSoft,

            borderColor: blue,

            borderWidth: 1,

          },

        ],

      },

      options: {

        ...chartDefaults,

        plugins: { ...chartDefaults.plugins, legend: { display: false } },

        scales: {

          ...chartDefaults.scales,

          y: { ...chartDefaults.scales.y, ticks: { display: false }, max: 1.2 },

        },

      },

    });

  }



  const skillsEl = document.getElementById("chart-skills");

  if (skillsEl && data.skills) {

    const sorted = [...data.skills].sort((a, b) => b.weight - a.weight).slice(0, 8);

    new Chart(skillsEl, {

      type: "doughnut",

      data: {

        labels: sorted.map((s) => s.skill),

        datasets: [

          {

            data: sorted.map((s) => s.weight),

            backgroundColor: [blue, green, orange, "#0974B0", "#5A5A72", "#CE2232", "#089949", "#B8D4EF"],

            borderWidth: 0,

          },

        ],

      },

      options: {

        responsive: true,

        maintainAspectRatio: false,

        plugins: {

          legend: { position: "right", labels: { boxWidth: 10, font: { size: 10 } } },

        },

      },

    });

  }



  const projectEl = document.getElementById("chart-projects");

  if (projectEl) {

    new Chart(projectEl, {

      type: "bar",

      data: {

        labels: workstreams.map((w) => w.name),

        datasets: [

          {

            label: "Deliverables",

            data: workstreams.map((w) => w.deliverables.length),

            backgroundColor: blue,

            borderRadius: 4,

          },

          {

            label: "Modules / components",

            data: workstreams.map((w) => w.modules.length),

            backgroundColor: green,

            borderRadius: 4,

          },

        ],

      },

      options: {

        ...chartDefaults,

        scales: {

          ...chartDefaults.scales,

          x: { ...chartDefaults.scales.x, stacked: false },

          y: { ...chartDefaults.scales.y, ticks: { stepSize: 1 } },

        },

      },

    });

  }



  const timelineEl = document.getElementById("chart-timeline");

  if (timelineEl) {

    new Chart(timelineEl, {

      type: "line",

      data: {

        labels: project.timeline.map((t) => t.period),

        datasets: [

          {

            label: "Workstreams",

            data: project.timeline.map((t) => t.items),

            borderColor: blue,

            backgroundColor: blueSoft,

            fill: true,

            tension: 0.35,

          },

        ],

      },

      options: {

        ...chartDefaults,

        plugins: { ...chartDefaults.plugins, legend: { display: false } },

      },

    });

  }

})();

