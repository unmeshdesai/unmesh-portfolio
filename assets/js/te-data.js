/* Translation Excellence — Zoho full-suite implementation data
   Covers: Inventory Rental System, HR ops, Catalyst apps,
   and the complete Zoho One stack. */

window.TE_DATA = {
  meta: {
    client: "Translation Excellence",
    role: "Zoho Implementation Consultant",
    sector: "Translation & Localization",
    status: "live",
    users: 18,
    lastSync: "2026-06"
  },

  pageKpis: [
    { label: "Zoho Apps Deployed",  value: "15",  foot: "Full Zoho One stack"          },
    { label: "Automation Workflows", value: "28",  foot: "Across all modules"           },
    { label: "Catalyst Projects",    value: "2",   foot: "Leave Mgmt + Client Portal"   },
    { label: "Users Onboarded",      value: "18",  foot: "Staff + external clients"     }
  ],

  workstreams: [
    {
      id: "rental-inventory",
      kicker: "Zoho Creator · Inventory",
      name: "Rental & Inventory System",
      summary: "Custom Zoho Creator application managing the full rental lifecycle — equipment movement tracking, real-time availability calendars, warehouse operations, and stock-level monitoring integrated with CRM billing.",
      status: "live",
      tags: ["Zoho Creator", "Deluge", "CRM Integration", "Inventory"],
      modules: [
        "Equipment Master Registry",
        "Movement & Transfer Log",
        "Availability Calendar",
        "Rental Agreement Builder",
        "Warehouse Stock Dashboard",
        "Damage & Maintenance Tracker",
        "Client Billing Sync (CRM)"
      ],
      deliverables: [
        "Real-time inventory state engine",
        "Automated rental agreement PDFs via Zoho Writer",
        "Stock-level alerts via Zoho Flow",
        "CRM deal auto-link on rental checkout",
        "Warehouse barcode scan support"
      ],
      metrics: { equipmentTracked: "120+", rentalCycles: "Continuous", crmSyncDelay: "<2 min" },
      highlight: "Single Creator app eliminated three separate spreadsheets used for inventory tracking — reducing stock discrepancies to near zero."
    },
    {
      id: "hr-people",
      kicker: "Zoho People · Zoho Recruit",
      name: "HR & People Operations",
      summary: "End-to-end HR setup on Zoho People covering attendance, leave policies, shift management, and salary structures — paired with Zoho Recruit for a full talent acquisition pipeline.",
      status: "live",
      tags: ["Zoho People", "Zoho Recruit", "HRMS", "Leave Management"],
      modules: [
        "Employee Database & Profiles",
        "Attendance & Shift Scheduling",
        "Leave Policy Configuration",
        "Appraisal & Performance Cycles",
        "Recruitment Pipeline (Recruit)",
        "Onboarding Checklists",
        "Salary & Payroll Components"
      ],
      deliverables: [
        "Multi-level leave approval workflows",
        "Shift-change request automation",
        "Recruitment-to-onboarding handoff",
        "Appraisal cycle automation",
        "Regularization & attendance sync"
      ],
      metrics: { employeeRecords: "18", leaveTypes: "8", recruitPipeline: "Active" },
      highlight: "Zoho People People-Recruit bridge auto-converts hired candidates into employee records — eliminating manual re-entry."
    },
    {
      id: "catalyst-leave",
      kicker: "Zoho Catalyst · Serverless",
      name: "Catalyst Leave Management App",
      summary: "Standalone serverless Leave Management application built on Zoho Catalyst, providing a clean mobile-first UI independent of Zoho People's admin interface — focused on employee self-service with real-time balance visibility.",
      status: "live",
      tags: ["Zoho Catalyst", "Serverless", "Datastore", "Catalyst Auth"],
      modules: [
        "Catalyst Serverless Functions (Node.js)",
        "Catalyst Datastore (leave records)",
        "Catalyst Auth (employee login)",
        "Email Notifications (Catalyst Mail)",
        "Holiday Calendar Sync",
        "Balance Dashboard UI",
        "Manager Approval Workflow"
      ],
      deliverables: [
        "Apply / cancel / track leave — no Zoho login required",
        "Instant balance display with accrual breakdown",
        "Multi-level approval chain via Catalyst functions",
        "Real-time email notifications on status change",
        "People API sync — Catalyst as read/write layer"
      ],
      metrics: { catalystFunctions: "12", avgResponseTime: "<300ms", dailyActiveUsers: "18" },
      highlight: "Built with zero third-party libraries — pure Catalyst stack, deploys in under 10 seconds via Catalyst CLI."
    },
    {
      id: "catalyst-portal",
      kicker: "Zoho Catalyst · Client Portal",
      name: "Client Portal (Catalyst)",
      summary: "External-facing client portal hosted on Zoho Catalyst, giving Translation Excellence customers a branded web interface to submit translation projects, track delivery status, download completed files, and access invoices — without requiring a Zoho login.",
      status: "live",
      tags: ["Zoho Catalyst", "External Auth", "File Store", "CRM Integration"],
      modules: [
        "Catalyst Web Hosting (branded domain)",
        "Catalyst AppSail (backend runtime)",
        "Catalyst Datastore (project records)",
        "Catalyst File Store (deliverable files)",
        "External Auth (client accounts)",
        "CRM Deal Sync (real-time status)",
        "Invoice PDF Access (Zoho Books)"
      ],
      deliverables: [
        "Project submission form → auto-creates CRM deal",
        "Real-time delivery status tracker (5 stages)",
        "Secure file download portal for translated docs",
        "Invoice history linked to Zoho Books",
        "Client feedback submission → CRM notes"
      ],
      metrics: { portalClients: "Active", crmSyncEvents: "Real-time", fileDeliveries: "Automated" },
      highlight: "Catalyst External Auth eliminates client-side Zoho licensing — unlimited portal users at zero per-seat cost."
    },
    {
      id: "zoho-one-ops",
      kicker: "Zoho One · Full Stack",
      name: "Zoho One Business Operations",
      summary: "Complete Zoho One deployment orchestrating CRM, Projects, Analytics, Social, Calendar, Meeting, Sign, and Workdrive — all under a single tenant with unified SSO and centralized admin through Zoho One dashboard.",
      status: "live",
      tags: ["Zoho One", "Zoho CRM", "Zoho Projects", "Zoho Analytics"],
      modules: [
        "Zoho CRM — Client pipeline & deals",
        "Zoho Projects — Translation delivery tracking",
        "Zoho Analytics — Business intelligence",
        "Zoho Workdrive — Document management",
        "Zoho Sign — Contract e-signatures",
        "Zoho Calendar — Scheduling & deadlines",
        "Zoho Meeting — Client calls",
        "Zoho Social — Brand management",
        "Zoho Survey — Client satisfaction"
      ],
      deliverables: [
        "CRM → Projects auto-project creation on deal close",
        "Analytics dashboards for revenue, delivery & HR",
        "Workdrive team folders for each client project",
        "Sign-integrated contract workflow",
        "Social content calendar integration"
      ],
      metrics: { appsActive: "13", automationsDeployed: "28", analyticsViews: "45+" },
      highlight: "Single Zoho One admin panel manages all 18 users, app permissions, and department groups — no per-app provisioning needed."
    }
  ],

  apps: [
    { name: "Zoho CRM",       icon: "🎯", role: "Client relationships & deal pipeline",         category: "Sales"        },
    { name: "Zoho Creator",   icon: "🔧", role: "Rental & Inventory custom app",                 category: "Operations"   },
    { name: "Zoho Catalyst",  icon: "⚡", role: "Leave Management + Client Portal (serverless)", category: "Platform"     },
    { name: "Zoho People",    icon: "👥", role: "HR, attendance & leave management",             category: "HR"           },
    { name: "Zoho Recruit",   icon: "🔍", role: "Talent acquisition & onboarding",              category: "HR"           },
    { name: "Zoho Projects",  icon: "📋", role: "Translation project delivery tracking",         category: "Operations"   },
    { name: "Zoho Analytics", icon: "📊", role: "Business intelligence & KPI dashboards",        category: "Analytics"    },
    { name: "Zoho One",       icon: "🌐", role: "Unified SSO & admin hub",                       category: "Platform"     },
    { name: "Zoho Workdrive", icon: "📁", role: "Client project documents & deliverables",       category: "Productivity" },
    { name: "Zoho Sign",      icon: "✍️", role: "Contract & NDA e-signatures",                  category: "Productivity" },
    { name: "Zoho Calendar",  icon: "📅", role: "Deadlines, meetings & project milestones",      category: "Productivity" },
    { name: "Zoho Meeting",   icon: "🎥", role: "Client review calls & team standups",           category: "Productivity" },
    { name: "Zoho Social",    icon: "📣", role: "Brand social media scheduling",                 category: "Marketing"    },
    { name: "Zoho Survey",    icon: "📝", role: "Client satisfaction & feedback",                category: "Marketing"    },
    { name: "Zoho Bookings",  icon: "🗓️", role: "Consultation & onboarding appointment booking", category: "Sales"       }
  ],

  appKpis: [
    { label: "Apps in Production",  value: "15", foot: "Zoho One tenant",        tone: "tone-cyan"   },
    { label: "Workflow Automations", value: "28", foot: "Cross-app triggers",     tone: "tone-violet" },
    { label: "Users (all apps)",     value: "18", foot: "Staff + portal clients", tone: "tone-amber"  },
    { label: "Analytics Views",      value: "45", foot: "Reports & dashboards",   tone: "tone-pink"   }
  ],

  catalystKpis: [
    { label: "Catalyst Projects",     value: "2",   foot: "Leave Mgmt + Portal",       tone: "tone-cyan"   },
    { label: "Serverless Functions",  value: "22",  foot: "Across both apps",           tone: "tone-violet" },
    { label: "Portal Clients",        value: "∞",   foot: "Zero per-seat licensing",    tone: "tone-amber"  },
    { label: "Avg API Response",      value: "<300ms", foot: "Catalyst edge functions", tone: "tone-pink"   }
  ],

  timeline: [
    {
      year: "2024 Q1",
      title: "Zoho One Foundation",
      desc: "Initial Zoho One tenant setup, CRM configuration, and Zoho People HR baseline — user provisioning, department groups, and SSO."
    },
    {
      year: "2024 Q3",
      title: "Rental & Inventory System Launch",
      desc: "Zoho Creator app for equipment rental tracking went live. Eliminated manual spreadsheets and enabled real-time availability visibility."
    },
    {
      year: "2025 Q1",
      title: "Catalyst Leave Management App",
      desc: "Serverless leave management portal launched on Zoho Catalyst — employee self-service with real-time balances and multi-level approvals."
    },
    {
      year: "2025 Q3",
      title: "Zoho Projects + Analytics Rollout",
      desc: "Translation project delivery tracked in Zoho Projects with automated CRM deal-to-project creation. Analytics dashboards for revenue and delivery KPIs."
    },
    {
      year: "2026 Q1",
      title: "Client Portal Live",
      desc: "Zoho Catalyst Client Portal launched — external clients can submit projects, track delivery, download files, and access invoices without a Zoho account."
    }
  ]
};
