/**

 * Portfolio data — single KGK engagement from CRM BA Research (May 2026).

 * Workstreams: Symphony Sync, NIVID Connect, Subform (modules under KGK, not separate projects).

 */

window.CRM_PORTFOLIO_DATA = {

  meta: {

    owner: "Unmesh Desai",

    role: "Zoho CRM Engineer & Solutions Architect",

    client: "KGK InfoTech LLP",

    regions: ["India", "Dubai", "Antwerp", "New York"],

    researchPath: "CRM-Documentation (symphonysync, nivid-connect, subform)",

  },

  project: {

    id: "kgk",

    name: "KGK CRM Program",

    kicker: "KGK InfoTech LLP",

    summary:

      "Enterprise Zoho CRM program for multi-region diamond operations: real-time Kafka integrations (Symphony Sync), Oracle NIVID APIs and RFID (NIVID Connect), and AG Grid deal subform widgets—documented as one engagement in CRM BA Research.",

    status: "live",

    tags: ["Zoho CRM", "Kafka", "FastAPI", "Oracle NIVID", "AG Grid", "Multi-region"],

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

          "Multi-purpose events (demand, live bidding)",

        ],

        deliverables: [

          "Master architecture & data-flow documentation",

          "10 Kafka schema definitions with Zoho model mapping",

          "Webhook route structure (crm, kgk_diamonds, zoho, nivid, user)",

          "Rate limiting, retry, and circuit-breaker configuration",

          "Security model: OAuth2, API keys, JWT RBAC",

        ],

        metrics: {

          kafkaSchemas: 10,

          eventCategories: 3,

          authMethods: 3,

          maxRetries: 3,

        },

      },

      {

        id: "nivid-connect",

        name: "NIVID Connect",

        kicker: "ERP & Inventory APIs",

        summary:

          "Backend ecosystem linking Oracle NIVID, Spacecode RFID devices, and Kafka Connect JDBC pipelines—exposing regional stone operations to CRM and analytics consumers.",

        status: "live",

        tags: ["Oracle", "Kafka Connect", "REST API", "RFID", "Multi-region"],

        modules: [

          "nivid-apis (inventory, KYC, orders, consignment)",

          "spacecode (RFID light/scan, SmartDrawer)",

          "kafka-connect (Oracle → Kafka by region)",

        ],

        deliverables: [

          "Architecture diagram: Spacecode ↔ nivid-apis ↔ Kafka",

          "Regional API matrix (India, Dubai, Antwerp, NY)",

          "JWT/OAuth2 auth and role-gated admin endpoints",

          "Connector management cookbook for JDBC sources",

        ],

        metrics: {

          regions: 4,

          apiRouteGroups: 5,

          coreServices: 3,

        },

      },

      {

        id: "subform",

        name: "Subform Widgets",

        kicker: "CRM UI Extensions",

        summary:

          "AG Grid–based Zoho CRM widgets for deal inventory, transactions, bidding, and dispatch—with dynamic forms, pipeline rules, and NIVID middleware actions.",

        status: "live",

        tags: ["JavaScript", "AG Grid", "Zoho JS SDK", "Widgets"],

        modules: [

          "deal_widget.html",

          "transaction_widget / stone_list / bid2buy / dispatch",

          "dynamic-form.js & global_variables.js",

          "zoho-functions.js API layer",

        ],

        deliverables: [

          "Subform technical documentation & onboarding guide",

          "Action availability matrix (pack, export, consignment, memo-out)",

          "Department-code & pipeline validation rules",

          "Telegram error logging for production monitoring",

        ],

        metrics: {

          widgetTypes: 5,

          bulkActions: 12,

          sharedJsModules: 4,

        },

      },

    ],

    kafkaSchemas: [

      { name: "Orders", flow: "Kafka → CRM", creates: "Deals, stone links, pricing" },

      { name: "Leads", flow: "Kafka → CRM", creates: "Leads + UTM module" },

      { name: "KYC Status", flow: "Kafka → CRM", creates: "Status + workflow triggers" },

      { name: "KYC Create", flow: "Kafka → CRM", creates: "Country-specific KYC layouts" },

      { name: "Appointments", flow: "Kafka → CRM", creates: "Tasks linked to contacts/stones" },

      { name: "Carts", flow: "Kafka → CRM", creates: "Cart & cart-stone connections" },

      { name: "Contact", flow: "Kafka → CRM", creates: "Activity & onboarding updates" },

      { name: "Inventory", flow: "Kafka → CRM", creates: "Multi-location product sync" },

      { name: "KAM", flow: "Kafka → CRM", creates: "Territory & assignment updates" },

      { name: "Multi-Purpose", flow: "Kafka → CRM", creates: "Demand, bidding, bulk assets" },

    ],

    timeline: [

      { period: "2025 — Present", label: "Symphony Sync & CRM Connect", items: 4 },

      { period: "2024 — 2025", label: "Subform widgets & deal operations", items: 5 },

      { period: "2024", label: "NIVID API & Kafka connector rollout", items: 3 },

    ],

    dashboards: {

      kpis: [

        { label: "Kafka schemas documented", value: 10, foot: "Symphony Sync event contracts", tone: "" },

        { label: "KGK workstreams", value: 3, foot: "Symphony · NIVID · Subform", tone: "" },

        { label: "Global regions supported", value: 4, foot: "India, Dubai, Antwerp, NY", tone: "ok" },

        { label: "Widget & UI modules", value: 5, foot: "Deal, transaction, bid, dispatch", tone: "warn" },

      ],

      highlights: [

        { title: "OAuth2 + API key + JWT", desc: "Three auth patterns documented for webhook and NIVID services." },

        { title: "1000 req/min global limit", desc: "Rate limiting and circuit breakers in Symphony Sync ops config." },

        { title: "12+ bulk stone actions", desc: "Subform deal widget actions with pipeline and department rules." },

        { title: "FastAPI on port 8000", desc: "Async webhook server with Kafka producers and Zoho CRM writes." },

      ],

    },

    reports: {

      pageKpis: [

        { label: "KGK reports", value: 6, foot: "From CRM BA research docs", tone: "" },

        { label: "Kafka schemas covered", value: 10, foot: "Integration coverage report", tone: "ok" },

        { label: "Regions in API report", value: 4, foot: "India · Dubai · Antwerp · NY", tone: "" },

        { label: "Workstreams documented", value: 3, foot: "Under single KGK program", tone: "warn" },

      ],

      catalog: [

        {

          id: "integration-coverage",

          title: "Integration Coverage Report",

          description: "Kafka schemas, Zoho modules, and event direction mapped from Symphony Sync documentation.",

          type: "Operational",

          updated: "May 2026",

          kpis: [

            { label: "Kafka schemas", value: 10, foot: "Documented event contracts" },

            { label: "Event categories", value: 3, foot: "crm · kgk_diamonds · multi-purpose" },

            { label: "CRM writes", value: 10, foot: "Schema → module mappings" },

            { label: "Status", value: "Active", foot: "Symphony Sync live", tone: "ok" },

          ],

          sections: [

            {

              title: "Schema → CRM mapping",

              description: "Each Kafka schema and documented Zoho outcome from DataFlow and Models&Schema references.",

              table: {

                headers: ["Schema", "Direction", "CRM outcome", "Status"],

                rowsFrom: "project.kafkaSchemas",

                rowMap: ["name", "flow", "creates", { value: "Active" }],

              },

            },

          ],

        },

        {

          id: "regional-api",

          title: "Regional API Surface Report",

          description: "NIVID endpoint availability across India, Dubai, Antwerp, and New York from nivid-apis docs.",

          type: "Technical",

          updated: "May 2026",

          kpis: [

            { label: "Regions", value: 4, foot: "India, Dubai, Antwerp, NY" },

            { label: "API route groups", value: 5, foot: "nivid-apis surface" },

            { label: "Core services", value: 3, foot: "nivid · spacecode · kafka-connect" },

            { label: "Auth patterns", value: 2, foot: "JWT + OAuth2", tone: "ok" },

          ],

          sections: [

            {

              title: "Regional endpoint matrix",

              description: "Documented bases and key operations per region from NIVID Connect architecture.",

              table: {

                headers: ["Region", "API base", "Key endpoints", "Documented"],

                rows: [

                  ["India", "/api/nivid, /api/nivid/v2", "KYC, orders, consignment, pack/unpack", "Yes"],

                  ["Dubai", "/api/nivid + legacy", "Stones, memo, export, SmartDrawer", "Yes"],

                  ["Antwerp", "/api/nivid/v2", "Consignment, RFID via spacecode", "Yes"],

                  ["New York", "/api/nivid/v2", "Web orders, pull-out stock", "Yes"],

                ],

              },

            },

          ],

        },

        {

          id: "widget-actions",

          title: "Subform Action Governance Report",

          description: "Bulk action enablement rules by pipeline, lead source, department code, and location.",

          type: "Process",

          updated: "May 2026",

          kpis: [

            { label: "Widget types", value: 5, foot: "Deal, transaction, bid, dispatch" },

            { label: "Bulk actions", value: 12, foot: "Pipeline-governed" },

            { label: "Dept codes cited", value: 4, foot: "449, 474, 468, 473" },

            { label: "Rule sources", value: 3, foot: "Pipeline · lead · location", tone: "warn" },

          ],

          sections: [

            {

              title: "Action availability matrix",

              description: "Subform bulk actions and constraints from widget governance documentation.",

              table: {

                headers: ["Action group", "Scope", "Constraints", "Rule source"],

                rows: [

                  ["Keep / Add", "Most pipelines", "Blocked for KGK Website New Arrivals & Bid to Buy", "Dept codes 449,474,468,473"],

                  ["Pack / Unpack", "Operations", "NIVID middleware via org variables", "Deal lock checks"],

                  ["Local Sale", "Local pipeline", "Disabled for KD barcodes, brokers, Intl Sale", "Pipeline rules"],

                  ["Export / Consignment", "Intl pipeline", "Mirror rules vs Local Sale", "Location-specific"],

                  ["Smart Drawer", "Dubai / Antwerp / NY", "Hidden in NY for pull-out preference", "loc-based UI"],

                ],

              },

            },

          ],

        },

        {

          id: "skills-distribution",

          title: "Delivery Skills Distribution",

          description: "Weighted skills demonstrated across documented CRM BA and engineering artifacts.",

          type: "Portfolio",

          updated: "May 2026",

          kpis: [

            { label: "Skills tracked", value: 10, foot: "Weighted proficiency" },

            { label: "Core tier (90%+)", value: 3, foot: "Architecture, REST, data modeling" },

            { label: "Avg weight", value: "87%", foot: "Across skill catalog" },

            { label: "Categories", value: 3, foot: "Platform · integration · UI", tone: "ok" },

          ],

          sections: [

            {

              title: "Weighted skills",

              description: "Proficiency scores derived from CRM BA research and engineering deliverables.",

              table: {

                headers: ["Skill", "Weight", "Tier", "Evidence"],

                rowsFrom: "skills",

                rowMap: ["skill", { fn: "weightPct" }, { fn: "skillTier" }, { value: "KGK BA + engineering docs" }],

              },

            },

          ],

        },

        {

          id: "workstream-deliverables",

          title: "KGK Workstream Deliverables",

          description: "Deliverable counts and documentation outputs per workstream within the KGK program.",

          type: "Executive",

          updated: "May 2026",

          kpis: [

            { label: "Workstreams", value: 3, foot: "Symphony · NIVID · Subform" },

            { label: "Total deliverables", value: 12, foot: "Across KGK workstreams" },

            { label: "Modules documented", value: 14, foot: "Combined module lists" },

            { label: "Live status", value: 3, foot: "All workstreams documented as live", tone: "ok" },

          ],

          sections: [

            {

              title: "Per-workstream summary",

              description: "Deliverable and module counts from each KGK workstream record.",

              table: {

                headers: ["Workstream", "Deliverables", "Modules", "Status"],

                rowsFrom: "project.workstreams",

                rowMap: ["name", { fn: "deliverableCount" }, { fn: "moduleCount" }, "status"],

              },

            },

          ],

        },

        {

          id: "security-compliance",

          title: "Security & Operations Snapshot",

          description: "Auth methods, rate limits, retries, and monitoring patterns from Symphony Sync master docs.",

          type: "Compliance",

          updated: "May 2026",

          kpis: [

            { label: "Auth methods", value: 3, foot: "OAuth2 · API key · JWT" },

            { label: "Max retries", value: 3, foot: "Exponential backoff 2^n s" },

            { label: "Rate limit", value: "1000/min", foot: "Per IP global cap" },

            { label: "Circuit breaker", value: "5/60s", foot: "Webhook processing 120s timeout", tone: "warn" },

          ],

          sections: [

            {

              title: "Controls catalog",

              description: "Security and resilience settings from Symphony Sync MasterDocs.",

              table: {

                headers: ["Control", "Scope", "Configuration", "Source doc"],

                rows: [

                  ["OAuth2", "Zoho CRM integration", "Token refresh", "Symphony Sync"],

                  ["API Key", "Webhook endpoints", "Header validation", "Symphony Sync"],

                  ["JWT", "User management", "RBAC", "NIVID / spacecode"],

                  ["Rate limit", "1000/min per IP", "Endpoint-specific caps", "MasterDocs"],

                  ["Retries", "Max 3", "Exponential backoff 2^n s", "MasterDocs"],

                  ["Circuit breaker", "5 failures / 60s", "Webhook processing 120s timeout", "MasterDocs"],

                ],

              },

            },

          ],

        },

      ],

    },

  },

  skills: [

    { skill: "Zoho CRM Architecture", weight: 95 },

    { skill: "Deluge & Blueprints", weight: 88 },

    { skill: "REST / Webhook Integrations", weight: 92 },

    { skill: "Kafka Event Design", weight: 85 },

    { skill: "FastAPI / Python Services", weight: 80 },

    { skill: "CRM Widgets (JS + AG Grid)", weight: 86 },

    { skill: "Data Modeling & Validation", weight: 90 },

    { skill: "Zoho Analytics / Dashboards", weight: 82 },

    { skill: "ERP Discovery (NIVID)", weight: 78 },

    { skill: "Technical Documentation", weight: 88 },

  ],

  skillCategories: [

    {

      id: "zoho-platform",

      name: "Zoho CRM & Platform",

      proficiency: "Expert",

      summary: "Multi-region CRM architecture, Blueprints, layouts, and governance from KGK and client rollouts.",

      zohoModules: ["Leads", "Contacts", "Accounts", "Deals", "Tasks", "Products", "Inventory", "Custom modules (KYC, UTM)"],

      tools: ["Zoho CRM", "Zoho Creator", "Zoho Analytics", "Deluge", "Blueprints", "Workflow rules", "Validation rules"],

      skills: ["Zoho CRM Architecture", "Deluge & Blueprints", "Data Modeling & Validation", "Zoho Analytics / Dashboards"],

    },

    {

      id: "integrations",

      name: "Integrations & Event Design",

      proficiency: "Advanced",

      summary: "Kafka → Zoho pipelines, FastAPI webhooks, OAuth2, and ERP/API bridges documented in Symphony Sync and NIVID.",

      zohoModules: ["Deals_X_Inventory", "Webhook functions", "Org variables", "External signals"],

      tools: ["REST APIs", "Kafka", "FastAPI", "OAuth2", "JWT", "MySQL", "Kafka Connect JDBC"],

      skills: ["REST / Webhook Integrations", "Kafka Event Design", "FastAPI / Python Services", "ERP Discovery (NIVID)"],

    },

    {

      id: "crm-ui",

      name: "CRM UI & Widgets",

      proficiency: "Advanced",

      summary: "AG Grid subform widgets with pipeline-aware bulk actions and NIVID middleware from Subform documentation.",

      zohoModules: ["Deal subforms", "Transaction widgets", "Stone list", "Bid2Buy", "Dispatch"],

      tools: ["JavaScript", "AG Grid", "Zoho JS SDK", "dynamic-form.js", "zoho-functions.js"],

      skills: ["CRM Widgets (JS + AG Grid)", "Technical Documentation"],

    },

  ],

};


