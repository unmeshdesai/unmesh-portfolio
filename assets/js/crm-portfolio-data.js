/**
 * Portfolio data — KGK Group Zoho Implementation.
 * Frozen production snapshot as of meta.lastSync; refresh by re-running
 * the dashboard build with up-to-date numbers from the source-of-truth doc.
 */

window.CRM_PORTFOLIO_DATA = {

  meta: {
    owner: "Unmesh Desai",
    role: "Zoho & Automation Expert",
    client: "KGK Group",
    regions: ["IND", "DXB", "NY", "ANT", "HK"],
    lastSync: "2026-05-26",
    tenant: {
      name: "KGK Group",
      edition: "Enterprise",
      createdAt: "2023-07-31",
      currency: "USD",
      licenses: 62,
      activeUsers: 61
    }
  },

  project: {

    id: "kgk",
    name: "KGK Group Zoho Implementation",
    kicker: "KGK Group",
    summary:
      "Enterprise Zoho CRM program for multi-region diamond operations: real-time Kafka integrations (Symphony Sync), Oracle NIVID APIs and RFID (NIVID Connect), and AG Grid deal subform widgets — running on a 62-user Enterprise tenant since July 2023.",
    status: "live",
    tags: ["Zoho CRM", "Kafka", "FastAPI", "Oracle NIVID", "AG Grid", "Multi-region"],

    /* KPI strip rendered on kgk.html (Overview page) */
    pageKpis: [
      { label: "Modules under management",   value: 42,      foot: "API-supported visible modules" },
      { label: "Active automation functions", value: 45,     foot: "35 workflows + 10 kiosks"      },
      { label: "Regions covered",            value: 5,       foot: "IND · DXB · ANT · NY · HK"     },
      { label: "Production users",           value: "61 / 62", foot: "Active / licensed (Enterprise)" }
    ],

    workstreams: [

      {
        id: "symphony-sync",
        name: "Symphony Sync",
        kicker: "Event Integration",
        summary:
          "Real-time CRM Connect layer: FastAPI webhook application streaming Kafka events into Zoho CRM with schema validation, OAuth2, and multi-topic event processing.",
        status: "live",
        tags: ["FastAPI", "Kafka", "Zoho CRM API", "Webhooks", "OAuth2"],
        modules: [
          "Orders → Deals & Deals_X_Inventory",
          "Leads + UTM attribution",
          "KYC create & status workflows",
          "Appointments (Tasks)",
          "Carts & stone actions",
          "Inventory (multi-location)",
          "KAM assignments",
          "Multi-purpose events (demand, bidding)"
        ],
        deliverables: [
          "Master architecture & data-flow",
          "10 Kafka schema definitions with Zoho model mapping",
          "Webhook route structure (crm, kgk_diamonds, zoho, nivid, user)",
          "Rate limiting, retry, and circuit-breaker configuration",
          "Security model: OAuth2, API keys, JWT RBAC"
        ],
        metrics: {
          kafkaSchemas: 8,
          automationFunctions: 6,
          eventModules: 4
        },
        highlight: "Restart-Kafka kiosk + 5 Kafka-publishing Deluge functions"
      },

      {
        id: "nivid-connect",
        name: "NIVID Connect",
        kicker: "ERP & Inventory APIs",
        summary:
          "Backend ecosystem linking Oracle NIVID, Spacecode RFID devices, and Kafka Connect JDBC pipelines — exposing regional stone operations to CRM and analytics consumers.",
        status: "live",
        tags: ["Oracle", "Kafka Connect", "REST API", "RFID", "Multi-region"],
        modules: [
          "nivid-apis (inventory, KYC, orders, consignment)",
          "spacecode (RFID light/scan, SmartDrawer)",
          "kafka-connect (Oracle → Kafka by region)"
        ],
        deliverables: [
          "Architecture diagram: Spacecode ↔ nivid-apis ↔ Kafka",
          "Regional API matrix (India, Dubai, Antwerp, NY, HK)",
          "JWT/OAuth2 auth and role-gated admin endpoints",
          "Connector management cookbook for JDBC sources"
        ],
        metrics: {
          apiEndpoints: 14,
          regionsLinked: 5,
          delugeFunctions: 4
        },
        highlight: "Sales + Memo sync to NIVID via accounting email pipeline"
      },

      {
        id: "subform",
        name: "Subform Widgets",
        kicker: "CRM UI Extensions",
        summary:
          "AG Grid–based Zoho CRM widgets for deal inventory, transactions, bidding, and dispatch — with dynamic forms, pipeline rules, and NIVID middleware actions.",
        status: "live",
        tags: ["AG Grid", "Widgets", "Custom Buttons", "Pipeline Rules"],
        modules: [
          "Deal Stones (Deals_X_Inventory)",
          "Transaction Stones (Transaction_X_Inventory)",
          "Dispatch Stones (Dispatch_X_Inventory)",
          "Bid2Buy Stones (Live_Bidding)"
        ],
        deliverables: [
          "Four production related-list widgets",
          "Stones-list custom button launcher",
          "Mobile-ready widget package (6 of 9 production widgets)",
          "Pipeline-gated bulk actions"
        ],
        metrics: {
          subformWidgets: 4,
          linkingModules: 4,
          relatedListAutomations: 3
        },
        highlight: "Stones-list custom button + 4 related-list widgets, all mobile-ready"
      }

    ],

    kafkaSchemas: [
      { name: "Orders",       flow: "Kafka → CRM", creates: "Deals, stone links, pricing" },
      { name: "Leads",        flow: "Kafka → CRM", creates: "Leads + UTM module" },
      { name: "KYC Status",   flow: "Kafka → CRM", creates: "Status + workflow triggers" },
      { name: "KYC Create",   flow: "Kafka → CRM", creates: "Country-specific KYC layouts" },
      { name: "Appointments", flow: "Kafka → CRM", creates: "Tasks linked to contacts/stones" },
      { name: "Carts",        flow: "Kafka → CRM", creates: "Cart & cart-stone connections" },
      { name: "Contact",      flow: "Kafka → CRM", creates: "Activity & onboarding updates" },
      { name: "Inventory",    flow: "Kafka → CRM", creates: "Multi-location product sync" },
      { name: "KAM",          flow: "Kafka → CRM", creates: "Territory & assignment updates" },
      { name: "Multi-Purpose",flow: "Kafka → CRM", creates: "Demand, bidding, bulk assets" }
    ],

    timeline: [
      { period: "2024",          label: "NIVID API & Kafka connector rollout",            items: 3 },
      { period: "2024 — 2025",   label: "Subform widgets & deal operations",              items: 5 },
      { period: "2025 Q1",       label: "Automation surge — 13 new functions in one quarter", items: 13 },
      { period: "2025 — Present",label: "Symphony Sync & CRM Connect",                    items: 4 }
    ],

    dashboards: {

      kpis: [
        { label: "Active Deluge functions", value: 45,      foot: "Workflows + kiosk handlers",     tone: ""     },
        { label: "Configured modules",      value: 42,      foot: "API-supported visible",          tone: ""     },
        { label: "Active users",            value: 61,      foot: "Across 5 regions",               tone: "ok"   },
        { label: "Tenant age",              value: "34 mo", foot: "Operating since Jul 2023",       tone: ""     },
        { label: "Private modules",         value: "76%",   foot: "19 of 25 governed modules",      tone: "warn" },
        { label: "Custom widgets",          value: 9,       foot: "Deployed in production (1 retired)", tone: "ok" },
        { label: "Modules automated",       value: 13,      foot: "Carrying at least one workflow", tone: ""     },
        { label: "Assignment rules",        value: 2,       foot: "Lead vetting + SDR routing",     tone: ""     }
      ],

      highlights: [
        { title: "9 production widgets",   desc: "Subforms, web tabs, dashboards — 6 mobile-ready" },
        { title: "2 assignment rules",     desc: "Vetting + Assign SDR, both on Leads" },
        { title: "13 modules automated",   desc: "Out of 42 configured — focus on Lead lifecycle" },
        { title: "10 kiosk handlers",      desc: "Pull-out stones, member account, lead convert" },
        { title: "5 regions, 1 tenant",    desc: "IND, DXB, NY, ANT, HK — single Enterprise org" }
      ],

      /* Executive narrative cards — 3 large insight blocks above the chart grid */
      executive: [
        { icon: "⚡", title: "45 Deluge functions in production",
          body: "35 workflows + 10 kiosk handlers across 13 modules, with the largest concentration on Leads (13), Accounts (9) and Contacts (7)." },
        { icon: "🔒", title: "Private-by-default security — 19 of 25 governed modules",
          body: "Public surface is intentional: Accounts (read-write for account-team collaboration), Products / Dispatch_X_Inventory (read-only for downstream sync), Emails (system)." },
        { icon: "🏢", title: "62-user Enterprise tenant, 61 active",
          body: "KGK Group on Zoho Enterprise since Jul 2023 — 34 months of continuous operations across IND, DXB, ANT, NY, HK." }
      ],

      charts: {

        /* Roles & hierarchy — 61 active users grouped by role family.
           Derived from getUsers (all 4 pages) on 2026-05-26. */
        roles: {
          labels: [
            "Sales (KAM)",
            "Sales Management",
            "Data Entry & Operations",
            "System Admin",
            "Hybrid Sales/Ops",
            "SDR + Accountant"
          ],
          values: [24, 10, 9, 7, 5, 6]
        },

        skills: {
          labels: ["Deluge", "Kafka", "REST APIs", "Zoho Analytics",
                   "Oracle NIVID", "Postgres SQL", "Kiosk Studio", "Widgets / JS"],
          values: [95, 85, 90, 90, 80, 80, 75, 75]
        },

        projects: {
          labels: ["Leads", "Accounts", "Contacts", "International_Transaction",
                   "Deals", "International_Disptaches", "Products", "KYC",
                   "Calls", "Live_Bidding"],
          values: [13, 9, 7, 3, 2, 2, 2, 2, 1, 1]
        },

        timeline: {
          labels: ["24Q1","24Q2","24Q3","24Q4","25Q1","25Q2","25Q3","25Q4","26Q1","26Q2"],
          bars:   [3, 1, 4, 2, 13, 9, 5, 4, 3, 1],
          line:   [3, 4, 8, 10, 23, 32, 37, 41, 44, 45]
        },

        regional: {
          labels: ["IND", "DXB", "NY", "ANT", "HK"],
          values: [20, 17, 12, 10, 1]
        },

        radar: {
          labels: ["Automation", "Integration", "Data Quality", "Reporting", "Security", "Scalability"],
          datasets: [
            { label: "Symphony Sync", values: [85, 95, 80, 70, 85, 90] },
            { label: "NIVID Connect", values: [70, 90, 85, 65, 80, 85] },
            { label: "Subform",       values: [80, 70, 90, 75, 85, 80] }
          ]
        }

      }

    },

    reports: {

      kpis: [
        { label: "Analytics views",   value: 469, foot: "Total assets in the workspace",            tone: ""   },
        { label: "Production dashboards", value: 12, foot: "Executive, Sales, Marketing, NSM, …",   tone: "ok" },
        { label: "Query tables",      value: 116, foot: "Custom SQL joins across CRM + DB",         tone: ""   },
        { label: "Pivot views",       value: 161, foot: "Pivot tables powering dashboards",         tone: "warn" }
      ],

      /* Operational narrative cards — 3 long-form insight blocks */
      operational: [
        { icon: "⚙️", title: "Workflow Automation",
          body: "45 Deluge functions across 13 modules — driving Lead vetting, KYC routing, KAM assignment, Kafka publication, and inventory tag retention." },
        { icon: "📦", title: "Inventory Synchronization",
          body: "100 source tables in Zoho Analytics, synced daily from CRM, website and ZMA. Kafka mirror to KGK_One_Inventory for downstream consumers." },
        { icon: "📈", title: "Analytics Visibility",
          body: "12 production dashboards, 469 total views (161 pivots, 116 query tables, 100 base tables). Refreshed daily for executive consumption." }
      ],

      cards: [

        {
          id: "memo-to-sale",
          name: "Memo-to-Sale Conversion Funnel",
          status: "live",
          kicker: "Revenue lever",
          type: "Operational",
          summary: "What share of memo stones convert to invoiced sales, by KAM, customer tier, stone grade and days-on-memo.",
          dataSources: ["International_Disptaches (Memo)", "International_Transaction (Sales)",
                        "Memo Details", "Sale Details", "Inventory", "Combined Sales Query"],
          impact: "Every 1pp lift in memo→sale conversion ≈ direct revenue gain",
          kpis: [
            { label: "Memos sent (rolling 90d)", value: "—" },
            { label: "Memo → sale conversion",   value: "—" },
            { label: "Avg days on memo",         value: "—" },
            { label: "Top KAM by conversion",    value: "—" }
          ],
          details: { viewLinks: [] }
        },

        {
          id: "demand-match",
          name: "Demand-to-Inventory Match Engine",
          status: "live",
          kicker: "Revenue creation",
          type: "Operational",
          summary: "Match open customer Demands against current inventory across CRM (Add_Demand) and website (public.demand).",
          dataSources: ["Add_Demand", "public.demand", "Inventory", "KGK_One_Inventory", "Demand Query"],
          impact: "Surfaces ready-to-close inventory matches per KAM",
          kpis: [
            { label: "Open demands",         value: "—" },
            { label: "Inventory matches",    value: "—" },
            { label: "Match rate",           value: "—" },
            { label: "Closed-from-match $",  value: "—" }
          ],
          details: { viewLinks: [] }
        },

        {
          id: "bid-to-buy",
          name: "Bid-to-Buy Auction Performance",
          status: "live",
          kicker: "Digital sales channel",
          type: "Technical",
          summary: "Fill rate, average bid vs reserve, time-to-close — by stone category and customer segment.",
          dataSources: ["Live_Bidding", "Stone_Details", "public.customer_product_bid",
                        "pubic.bid", "pubic.bid_to_buy_stones_logs", "Bid to Buy Campaign"],
          impact: "Pricing intelligence for reserves and inventory allocation",
          kpis: [
            { label: "Auction fill rate",       value: "—" },
            { label: "Avg bid vs reserve",      value: "—" },
            { label: "Avg time-to-close",       value: "—" },
            { label: "Top bidder by $",         value: "—" }
          ],
          details: { viewLinks: [] }
        },

        {
          id: "kam-scorecard",
          name: "KAM Productivity Scorecard",
          status: "live",
          kicker: "Sales ops",
          type: "Executive",
          summary: "Calls, memos, AOV, memo:sale ratio, $ closed per KAM, with peer percentile and ramp curve for new joiners.",
          dataSources: ["Users", "Calls", "Tasks", "International_Transaction",
                        "Call_Followup_Tracking", "Sale Details"],
          impact: "Identifies coaching opportunities and top performers",
          kpis: [
            { label: "KAMs tracked",        value: "—" },
            { label: "Memo : Sale ratio",   value: "—" },
            { label: "Avg AOV",             value: "—" },
            { label: "Top KAM $ closed",    value: "—" }
          ],
          details: { viewLinks: [] }
        },

        {
          id: "utm-attribution",
          name: "UTM Multi-Touch Attribution",
          status: "live",
          kicker: "Marketing ROI",
          type: "Portfolio",
          summary: "First / last / linear attribution from UTM + Email + Direct touchpoints to invoiced revenue.",
          dataSources: ["UTM", "public.utm", "Email Campaigns",
                        "CUSTOMER>>UTM>>BID>>ORDER", "International_Transaction"],
          impact: "Channel-attributed revenue, beyond first-touch only",
          kpis: [
            { label: "Touchpoints tracked",     value: "—" },
            { label: "Top channel by $",        value: "—" },
            { label: "Email-attributed $",      value: "—" },
            { label: "Direct-attributed $",     value: "—" }
          ],
          details: { viewLinks: [] }
        },

        {
          id: "kyc-funnel",
          name: "KYC Funnel & Time-to-Compliance",
          status: "live",
          kicker: "Onboarding velocity",
          type: "Process",
          summary: "Pre-KYC stages 2/4/5 → Post-KYC drop-off, median days per stage, by region and source.",
          dataSources: ["Pre-KYC", "Pre KYC Stage 2 - Whats App",
                        "Pre KYC Stage 4 - Whats App", "Pre KYC Stage 5 - Whats App",
                        "Post-KYC", "pubic.kyc", "Stage History"],
          impact: "Time-to-revenue improvement per onboarding bottleneck removed",
          kpis: [
            { label: "Leads in Pre-KYC",        value: "—" },
            { label: "Median days to approve",  value: "—" },
            { label: "Drop-off Pre→Post",       value: "—" },
            { label: "Slowest stage",           value: "—" }
          ],
          details: { viewLinks: [] }
        },

        {
          id: "trade-show-roi",
          name: "Trade Show ROI (JGTD 2025)",
          status: "live",
          kicker: "Event marketing",
          type: "Executive",
          summary: "Leads → KYC → first memo → first sale → 12-mo customer value, with cost-per-acquired-customer.",
          dataSources: ["Trade Show Leads - JGTD 2025", "Trade Show Stones",
                        "JGTD Trade Show", "Clients Visited in Trade Show JGTD 2025",
                        "International_Transaction"],
          impact: "Booth payback and exhibition spend justification",
          kpis: [
            { label: "Show leads captured",     value: "—" },
            { label: "Converted to customer",   value: "—" },
            { label: "Cost per acquisition",    value: "—" },
            { label: "12-mo customer value",    value: "—" }
          ],
          details: { viewLinks: [] }
        },

        {
          id: "cart-abandon",
          name: "Cart Abandonment Recovery",
          status: "live",
          kicker: "Digital revenue",
          type: "Operational",
          summary: "Abandonment rate, recovery channel mix (retargeting vs KAM call), and $ recovered.",
          dataSources: ["Public.cart", "public.line_item", "order",
                        "Cart Abandonment Query", "Add To Cart abandonment Query"],
          impact: "$ recovered per abandoned cart touched",
          kpis: [
            { label: "Abandoned carts (90d)",   value: "—" },
            { label: "Recovery rate",           value: "—" },
            { label: "$ recovered",             value: "—" },
            { label: "Best channel",            value: "—" }
          ],
          details: { viewLinks: [] }
        },

        {
          id: "dormant-recovery",
          name: "Dormant Account Recovery Impact",
          status: "live",
          kicker: "Customer retention",
          type: "Portfolio",
          summary: "Dormant accounts targeted, reactivation rate, and $ reactivated per 100 outreach calls.",
          dataSources: ["Exim Dormant accounts", "Dormant accounts with Contacts",
                        "Dormant Contacts Call Follow Up Query Report", "Calls",
                        "International_Transaction"],
          impact: "Lift in reactivation $ per KAM outreach",
          kpis: [
            { label: "Dormant accounts",        value: "—" },
            { label: "Reactivated",             value: "—" },
            { label: "$ reactivated",           value: "—" },
            { label: "$ per 100 touches",       value: "—" }
          ],
          details: { viewLinks: [] }
        },

        {
          id: "data-hygiene",
          name: "Data Hygiene Cost Quantifier",
          status: "live",
          kicker: "Operational excellence",
          type: "Compliance",
          summary: "$ at risk from duplicates, invalid phones / emails, deactivated owners.",
          dataSources: ["Contact Duplicate Count Query", "Invalid Phone Query",
                        "Invalid Sales Query", "Deactivated Contact Owner",
                        "Customers missing in CRM"],
          impact: "Converts data quality into a CFO-readable risk number",
          kpis: [
            { label: "Duplicate contacts",      value: "—" },
            { label: "Invalid phones",          value: "—" },
            { label: "Records at risk",         value: "—" },
            { label: "$ at risk",               value: "—" }
          ],
          details: { viewLinks: [] }
        }

      ]

    },

    analytics: {
      workspace: "Zoho CRM Analytics",
      totalViews: 469,
      byType: {
        Pivot:        161,
        QueryTable:   116,
        Table:        100,
        AnalysisView:  63,
        Dashboard:     12,
        Report:        10,
        SummaryView:    7
      },
      dashboards: [
        "Executive Dashboard",
        "Global Sales Efficiency Dashboard",
        "Sales Dashboard — Accounts And Sales Person wise",
        "Sales Person Dashboard",
        "India Client Wise Dashboard",
        "Marketing Dashboard",
        "Customer Stock / Purchase Analysis",
        "Competitors Analysis",
        "NSM Scorecard",
        "Product Data Dashboard (KGK Website)",
        "Data Hygiene Monitoring Dashboard",
        "CRM Sales Audit"
      ]
    }

  },

  skills: [
    { skill: "Zoho CRM Architecture",        weight: 95 },
    { skill: "Deluge Scripting",             weight: 92 },
    { skill: "Blueprint & Workflow Design",  weight: 90 },
    { skill: "Zoho Creator Apps",            weight: 88 },
    { skill: "Zoho Analytics & Dashboards",  weight: 85 },
    { skill: "REST API Integrations",        weight: 90 },
    { skill: "JavaScript & CRM Widgets",     weight: 85 },
    { skill: "Kafka & Event Pipelines",      weight: 82 },
    { skill: "SQL (PostgreSQL, MySQL, Oracle)", weight: 80 },
    { skill: "Python & Node.js Services",    weight: 78 },
    { skill: "Business Process Analysis",    weight: 88 },
    { skill: "CRM Migration (HubSpot → Zoho)", weight: 85 },
    { skill: "Technical Documentation",      weight: 82 },
    { skill: "Client Training & Onboarding", weight: 80 }
  ],

  skillCategories: [
    {
      id: "zoho-ecosystem",
      name: "Zoho Ecosystem",
      proficiency: "Expert",
      summary: "End-to-end Zoho One implementation across CRM, Creator, Analytics, Books, Desk and the wider product suite — from architecture to deployment.",
      zohoModules: ["Zoho CRM", "Zoho Creator", "Zoho Analytics", "Zoho Desk", "Zoho Books", "Zoho One", "Zoho Catalyst", "Zoho HRMS", "Zoho Mail"],
      tools: ["Custom modules", "Layouts", "Role hierarchy", "Field-level security", "Audit & governance"],
      skills: ["Zoho CRM Architecture", "Zoho Creator Apps", "Zoho Analytics & Dashboards"]
    },
    {
      id: "automation",
      name: "CRM Automation & Workflows",
      proficiency: "Expert",
      summary: "Deluge scripting, Blueprint-driven workflows, scheduled functions, and bulk processing systems that have automated thousands of operational hours.",
      zohoModules: ["Workflow rules", "Blueprints", "Schedules", "Validation rules", "Scoring rules", "Approval flows"],
      tools: ["Deluge", "Custom Functions", "Webhooks", "Scheduled Functions", "Bulk Edit APIs"],
      skills: ["Deluge Scripting", "Blueprint & Workflow Design", "Business Process Analysis"]
    },
    {
      id: "development",
      name: "Development & Integrations",
      proficiency: "Advanced",
      summary: "REST APIs, webhooks, custom JS widgets, and integrations with Shopify, Stripe, Oracle NIVID, and Kafka pipelines across multiple client systems.",
      zohoModules: ["Webhook functions", "Connections", "Org variables", "External signals", "API Console"],
      tools: ["REST APIs", "JavaScript", "Node.js", "Python", "FastAPI", "AG Grid", "Webhooks", "OAuth2"],
      skills: ["REST API Integrations", "JavaScript & CRM Widgets", "Python & Node.js Services", "CRM Migration (HubSpot → Zoho)"]
    },
    {
      id: "data",
      name: "Data Engineering & Reporting",
      proficiency: "Advanced",
      summary: "Multi-database integrations, ETL pipelines, and executive dashboards across PostgreSQL, MySQL, Oracle, and Kafka — feeding real-time operational analytics.",
      zohoModules: ["Zoho Analytics datasets", "SQL workspaces", "Custom queries", "KPI widgets", "Forecasting models"],
      tools: ["PostgreSQL", "MySQL", "Oracle", "Kafka Connect JDBC", "ETL Pipelines", "Executive Dashboards"],
      skills: ["SQL (PostgreSQL, MySQL, Oracle)", "Kafka & Event Pipelines", "Zoho Analytics & Dashboards", "Technical Documentation", "Client Training & Onboarding"]
    }
  ]

};
