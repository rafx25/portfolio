import type { Project } from "./types";

// Internal government systems. No production code, schema, endpoint or record is
// reproduced here.
// Screenshots use test data; anything identifying was covered before upload.

export const projects: Project[] = [
  {
    slug: "itsd",
    name: "Request Processing Desk",
    tagline:
      "IT helpdesk ticketing for the regional and provincial offices. Staff sign in with their PRAMS account, and reporters can check a ticket's status without logging in.",
    type: "Internal ticketing system",
    role: "Full Stack Developer",
    period: "2026 - Present",
    organization: "DOLE Regional Office No. IV-A (CALABARZON)",
    status: "UAT",
    technologies: [
      "Laravel 13",
      "PHP 8.3",
      "React",
      "TypeScript",
      "Sanctum",
      "TanStack Query",
      "Tailwind CSS",
      "MySQL",
      "PHPUnit",
    ],
    metrics: ["PRAMS sign-in", "7 ticket states", "public tracking", "feature tests"],
    featured: true,
    confidential: true,
    screenshots: [
      {
        src: "/projects/rpd-dashboard.png",
        width: 1523,
        height: 896,
        alt: "Request Processing Desk dashboard with ticket counts by status, urgent tickets waiting, and lists of the oldest waiting and most recent tickets",
        caption:
          "Dashboard, with the oldest waiting tickets first. Requester names are covered.",
      },
      {
        src: "/projects/rpd-login-page.png",
        width: 1523,
        height: 790,
        alt: "Request Processing Desk sign-in page with a Sign in with PRAMS button",
        caption:
          "Staff sign in with their PRAMS account. The password form is only for an emergency administrator.",
      },
    ],
    caseStudy: {
      overview:
        "Requests to the IT unit used to come in through chat, calls and walk-ins, and nothing tracked them. The desk gives every request a ticket number, an assignee and a status, and logs every change. It's also the first system that signs users in through PRAMS instead of keeping its own accounts.",
      problem: [
        "There was no record of who asked for what, who handled it, or whether it was done.",
        "Reporters had to follow up manually to find out the status.",
        "A new system usually means another set of accounts to create and maintain.",
      ],
      built: [
        "Laravel 13 API and a React + TypeScript front end (Sanctum session auth, TanStack Query)",
        "Ticket workflow with 7 statuses, assignment, comments, attachments and an activity log",
        "Sign-in through PRAMS single sign-on, with roles assigned on first login",
        "A public tracking page and QR code for each ticket",
        "Dashboard, monthly reports, and feature tests for sign-in, permissions and status changes",
      ],
      architecture: {
        summary:
          "Laravel API with a React single-page front end. Ticket rules live in service classes, and user identity comes from PRAMS.",
        layers: [
          {
            label: "Browser",
            detail: "React, TypeScript, TanStack Query, Tailwind",
          },
          {
            label: "Laravel API",
            detail: "Sanctum session auth, permission and policy checks per action",
          },
          {
            label: "Services",
            detail: "Ticket workflow, numbering, notifications, PRAMS sync",
          },
          {
            label: "MySQL",
            detail: "Tickets, activity logs, attachments, roles",
          },
        ],
      },
      decisions: [
        {
          title: "Login through PRAMS",
          detail:
            "I didn't want a second user list that drifts away from HR's records. Users sign in on PRAMS, the desk exchanges a one-time code for their details server-to-server, and only stores its own roles locally. It re-checks the account every ten minutes, so someone deactivated in PRAMS gets signed out. The downside: nobody new can log in while PRAMS is down.",
        },
        {
          title: "No duplicate ticket numbers",
          detail:
            "Numbers run per year (IT-2026-00001). Reading the last number and adding one breaks when two people submit at the same time, so the yearly counter row is locked in a short transaction before it's incremented.",
        },
        {
          title: "What the public page shows",
          detail:
            "Anyone with the link can open it, so it returns a fixed set of fields: number, status, dates and a simple timeline. Staff names, comments and internal notes are never sent.",
        },
      ],
      outcomes: [
        "IT requests are logged, assigned and closed in one place.",
        "Staff use their PRAMS login. No separate accounts to manage.",
        "Reporters can check their own ticket.",
      ],
    },
  },
  {
    slug: "vcs",
    name: "VCS",
    tagline:
      "Vendor Charges & Settlement System. Tracks the utility, rental, courier and fuel bills of the regional office and five provinces from receipt to payment, replacing six Excel workbooks.",
    type: "Billing monitoring and settlement system",
    role: "Full Stack Developer",
    period: "2026 - Present",
    organization: "DOLE Regional Office No. IV-A (CALABARZON)",
    status: "In development",
    technologies: [
      "Laravel 12",
      "PHP 8.2",
      "Inertia.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Spatie Permission",
      "MySQL",
      "Pest",
    ],
    metrics: ["6 workbooks replaced", "4 reports", "page-level RBAC", "Pest tests"],
    featured: true,
    confidential: true,
    screenshots: [
      {
        src: "/projects/vcs-dashboard.png",
        width: 1523,
        height: 2160,
        alt: "VCS dashboard with bill counts, the bill-out and payment queues, bills per month against last year, and breakdowns by type of expense, province and service provider",
        caption:
          "Dashboard for all provinces, with peso amounts hidden. The two queues show how long the oldest bill has been waiting.",
      },
      {
        src: "/projects/vcs-login-page.png",
        width: 1523,
        height: 790,
        alt: "VCS sign-in page",
        caption: "Sign-in page.",
      },
    ],
    caseStudy: {
      overview:
        "VCS records the fixed expenses of the regional office and five provincial offices: electricity, water, internet, rent, photocopiers, courier and fuel. Each bill is tracked from the day it's received, through bill-out to Accounting, to the ADA or check that pays it. It also produces the monitoring sheets and monthly reports the workbooks were kept for.",
      problem: [
        "Each office kept its own Excel workbook, so there was no total for the region.",
        "Dates, amounts and account numbers were typed by hand, and the mistakes stayed (years like 20226, amounts like 4.899.00).",
        "Finding unpaid bills meant going through every sheet.",
      ],
      built: [
        "Laravel 12 + Inertia + React/TypeScript app, tested with Pest",
        "Bill workflow: received, billed out, paid, including one payment covering several bills and voiding a payment",
        "An importer for the old workbooks that fixes common typing errors and lists every change it made",
        "Page-level permissions (Spatie) and province scoping for provincial encoders",
        "Dashboard and four printable reports with CSV export",
      ],
      architecture: {
        summary:
          "Laravel with Inertia and React. Validation sits in form requests, and shared logic (importer, report builder, account number cleanup) sits in support classes, so the forms and the importer apply the same rules.",
        layers: [
          {
            label: "Browser",
            detail: "React pages in TypeScript, Tailwind",
          },
          {
            label: "Inertia + controllers",
            detail: "Controllers return props to pages, no separate JSON API",
          },
          {
            label: "Access and validation",
            detail: "Page permission on every route, form requests on every write",
          },
          {
            label: "Support classes",
            detail: "Importer, normalizer, report builder",
          },
          {
            label: "MySQL",
            detail: "Service accounts, bills, payments, import batches",
          },
        ],
      },
      decisions: [
        {
          title: "Importing the old workbooks",
          detail:
            "Retyping years of bills wasn't realistic, but importing them as-is would bring all the errors along. The importer finds each table by its column headers, fixes what it can (a year typed as 20226 is corrected using the billing period, account numbers Excel turned into scientific notation are expanded), and lists every fix in a report. There's a preview mode that rolls back, and an import can be undone. Running it again only fills in blank fields, so updated workbooks can be re-imported safely.",
        },
        {
          title: "Province scoping in the query",
          detail:
            "Provincial encoders should only see their own province. Instead of filtering in the UI, the province is applied as a query scope, so lists, dashboards and reports never load another province's rows. Actions on a single bill check it again.",
        },
      ],
      outcomes: [
        "Six workbooks replaced by one system for the whole region.",
        "Unpaid bills, and how long they've been waiting, show on the dashboard.",
        "Existing records were imported instead of retyped.",
      ],
    },
  },
  {
    slug: "prams",
    name: "PRAMS",
    tagline:
      "HRIS used by about 500 DOLE CALABARZON employees for leave, overtime, CTO and office orders. Also the single sign-on for the region's other internal systems.",
    type: "HRIS / workflow platform",
    role: "Full Stack Developer",
    period: "2025 - Present",
    organization: "DOLE Regional Office No. IV-A (CALABARZON)",
    status: "In production",
    technologies: [
      "Slim 4",
      "PHP",
      "MySQL",
      "JavaScript",
      "PhpSpreadsheet",
      "TCPDF",
      "REST API",
      "SSE",
      "Gemini API",
    ],
    metrics: [
      "~500 employees",
      "6 field offices",
      "HR-set approval routes",
      "single sign-on",
    ],
    featured: true,
    confidential: true,
    screenshots: [
      {
        src: "/projects/prams-dashboard.png",
        width: 1885,
        height: 1381,
        alt: "PRAMS dashboard showing application counts, approval breakdown and recent activity",
        caption: "Admin dashboard. Employee names in the birthdays panel are covered.",
      },
      {
        src: "/projects/prams-calendar.png",
        width: 1446,
        height: 1156,
        alt: "HR calendar filtering filed requests by year, office, type and status",
        caption: "Filed requests by date, filtered by office, type and status.",
      },
      {
        src: "/projects/prams-login.png",
        width: 1877,
        height: 843,
        alt: "PRAMS employee portal login screen",
        caption: "Employee portal login.",
      },
    ],
    caseStudy: {
      overview:
        "PRAMS is where employees file leave, CTO, overtime and office orders, and where HR manages credits, schedules and approval routes. Approved requests print as the official government forms. The region's other internal systems use it as their login.",
      teamNote:
        "Built by a small team. My parts: the approval workflows and route engine, delegation, single sign-on, the printed forms, leave and CTO credits, access control, the org chart and the chatbot. The employee profile, PDS export and employee import are mostly a teammate's work.",
      problem: [
        "Leave and overtime requests went around on paper, and nobody knew where a form was.",
        "Leave and CTO balances were kept in spreadsheets and often didn't match what employees expected.",
        "The approval flow changes whenever a new Regional Director or ARD comes in. It was hardcoded, so every change needed a developer.",
      ],
      built: [
        "An approval route engine, and the settings screen HR uses to build routes",
        "Leave, overtime, CTO and office order workflows, with approval delegation",
        "Single sign-on for the other internal systems, with an admin page to register them",
        "Page-level access control and a Roles & Permissions screen",
        "Official form output (PhpSpreadsheet, TCPDF) and credit ledgers with bulk import",
        "Notifications, chat, and a RAG chatbot on the Gemini API that answers from HR's knowledge base",
      ],
      architecture: {
        summary:
          "Slim 4 with a PSR-15 middleware stack, serving a JSON API to a JavaScript front end. Middleware handles session, CSRF, page access and rate limits. Business logic is in services, and models use PDO with prepared statements.",
        layers: [
          {
            label: "Browser",
            detail: "Server-rendered pages with JavaScript modules",
          },
          {
            label: "Middleware",
            detail: "Session, CSRF, role, page access, rate limit",
          },
          {
            label: "Routes + validation",
            detail: "One route file per module, input validated at the boundary",
          },
          {
            label: "Services",
            detail: "Route engine, delegation, credits, forms, single sign-on",
          },
          {
            label: "MySQL",
            detail: "Requests, route versions, credits, audit logs",
          },
        ],
      },
      decisions: [
        {
          title: "Approval routes HR can edit",
          detail:
            "A route is a list of steps, and each step says who approves it: the office head, anyone with a certain role, a specific person, or the filer's unit head. HR maps filer roles (and for leave, conditions like 30+ days or travel abroad) to a route. Each request remembers the route version and step it's on, so editing a route doesn't break requests already in progress. A new director's preferred flow is now a settings change, not a code change.",
        },
        {
          title: "Single sign-on",
          detail:
            "Other systems redirect users to PRAMS, which checks the registered return URL, signs them in and sends back a one-time code. The system exchanges that code server-to-server for the user's details. PRAMS only says who the person is, and each system decides its own permissions. Staff keep one password, and a transfer or resignation applies everywhere at the next login.",
        },
        {
          title: "SSE vs polling",
          detail:
            "I first used Server-Sent Events for live updates. On shared hosting each open connection holds a PHP worker, and staff leave tabs open all day, so the workers ran out. I moved the notification badge to polling every 20 seconds and kept SSE only on the approval screens, closing the stream when the tab is hidden.",
        },
      ],
      outcomes: [
        "Used by about 500 employees across six field offices.",
        "HR updates approval flows without a developer.",
        "Other internal systems log users in through PRAMS.",
      ],
    },
  },

  {
    slug: "tsios",
    name: "TSIOS (PTO / CEI)",
    tagline:
      "Technical Safety Inspection Online System. Establishments apply online for a Permit to Operate or an electrical inspection certificate, and the office handles inspection, payment and issuance in the same system.",
    type: "Regulatory workflow system",
    role: "Full Stack Developer",
    period: "2024 - Present",
    organization: "DOLE Regional Office No. IV-A (CALABARZON)",
    status: "In production",
    technologies: ["PHP", "MySQL", "JavaScript", "TCPDF", "PhpWord", "REST API"],
    metrics: [
      "PTO & CEI",
      "admin-set approval route",
      "e-signed certificates",
      "unit enrollment",
    ],
    featured: true,
    confidential: true,
    screenshots: [
      {
        src: "/projects/tsios-dashboard.png",
        width: 1436,
        height: 848,
        alt: "TSIOS dashboard showing enrolled establishments and charts of pending evaluations",
        caption: "Office dashboard.",
      },
      {
        src: "/projects/tsios-user-access.png",
        width: 1450,
        height: 1581,
        alt: "Account management screen with per-route access tags on each user",
        caption: "Account management. Names and usernames are blank in this screen.",
      },
      {
        src: "/projects/tsios-login.png",
        width: 1494,
        height: 1026,
        alt: "PTO and CEI online application sign-in screen",
        caption:
          "Client sign-in. Rule 1020 registration is a prerequisite for an account.",
      },
    ],
    caseStudy: {
      overview:
        "TSIOS handles Permit to Operate (PTO) and Certificate of Electrical Inspection (CEI) applications. Establishments enroll and apply online, an inspector and an evaluator are assigned, payment follows, and the certificate goes through approval and e-signing before it's emailed to the client.",
      teamNote:
        "Built by a team. My parts: establishment and unit enrollment, the client application pages, inspection and evaluation, certificate issuance, and the approval chain with e-signatures. The dashboard, account management and certificate corrections were done by teammates.",
      problem: [
        "Applications were tracked on paper across the regional and provincial offices.",
        "Certificate review and signing by the Division Head, ARD and RD happened outside the system.",
        "The approval order was hardcoded, and each new Regional Director wanted it changed.",
      ],
      built: [
        "Establishment and unit enrollment, and the client's application pages",
        "Inspection and evaluation steps, with history per unit",
        "Certificate generation from templates, with e-signatures and a QR code for verification",
        "The approval chain (recommend, or return with remarks) and an admin-configurable approval route",
      ],
      architecture: {
        summary:
          "Plain PHP with no framework, split into controllers, models and a small service layer. There's a public side for establishments and an office side scoped by province and permissions.",
        layers: [
          {
            label: "Establishment portal",
            detail: "Enrollment, filing, uploads, status",
          },
          {
            label: "Office side",
            detail: "Permission and province checks on every route",
          },
          {
            label: "Workflow",
            detail: "Inspection, payment, issuance, approval",
          },
          {
            label: "MySQL",
            detail: "Establishments, units, applications, certificates",
          },
        ],
      },
      decisions: [
        {
          title: "Separating who approves from who signs",
          detail:
            "The current RD wants approval to end at the ARD, but the certificate still carries the RD's name and e-signature. So the approval route is a setting (ordered steps, with the accounts allowed to act on each), and the signatory comes from a separate record. If a step is removed, certificates waiting there move to the new last step. The No Pending Case system now uses the same design.",
        },
        {
          title: "Signing inside the system",
          detail:
            "Reviewers recommend or return a certificate with remarks, and every action is logged. On final approval the certificate gets its number and validity, the e-signature is placed, a QR token is generated, and the PDF is emailed to the client.",
        },
      ],
      outcomes: [
        "Establishments apply and track online instead of calling or visiting.",
        "Certificates are approved, signed and sent from the system.",
        "Approval routes change without a code change.",
      ],
    },
  },

  {
    slug: "no-pending-case",
    name: "No Pending Case System",
    tagline:
      "Online application for a certificate that a company has no pending labor case, from filing to verification, approval and a certificate anyone can check by reference number.",
    type: "Records digitization / certification",
    role: "Full Stack Developer",
    period: "2024 - Present",
    organization: "DOLE Regional Office No. IV-A (CALABARZON)",
    status: "In production",
    technologies: ["PHP", "MySQL", "JavaScript", "TCPDF", "REST API"],
    metrics: [
      "Company certification",
      "Rule 1020 check",
      "admin-set approval route",
      "public verify",
    ],
    featured: true,
    confidential: true,
    screenshots: [
      {
        src: "/projects/npc-client.png",
        width: 1446,
        height: 1107,
        alt: "Public landing page with application forms for inside and outside the region, and application tracking",
        caption:
          "Public side. Separate paths for establishments inside and outside the region, plus tracking by reference number.",
      },
      {
        src: "/projects/npc-dashboard.png",
        width: 1446,
        height: 841,
        alt: "Admin dashboard with application counts by outcome and a date range filter",
        caption: "Admin dashboard, counts by outcome over a date range.",
      },
      {
        src: "/projects/npc-user-access.png",
        width: 1450,
        height: 845,
        alt: "Set user access dialog listing routes and submenus that can be granted per account",
        caption:
          "Access is granted per route and submenu. Account name and username are covered.",
      },
    ],
    caseStudy: {
      overview:
        "Some transactions require a company to prove it has no pending labor case. This system takes the application online, checks it against case records, routes it for approval, and issues a certificate with a reference number. It replaced a walk-in process with a manual records search.",
      problem: [
        "Staff searched records by hand, so two people could get different results for the same company.",
        "Certificates were typed one by one, and nothing linked a certificate to the search behind it.",
        "A third party had no way to confirm a certificate was real.",
      ],
      built: [
        "Online application with separate paths for establishments inside and outside the region",
        "A Rule 1020 registration check against the separate registration database",
        "Matching against case records, with partial matches sent to staff for review",
        "An admin-configurable approval route and certificate generation",
        "Public lookup by reference number",
      ],
      architecture: {
        summary:
          "Each stage (application, verification, review, approval, issuance) saves its own record, so any certificate can be traced back to the search it was based on.",
        layers: [
          {
            label: "Public application",
            detail: "Separate paths for inside and outside the region",
          },
          {
            label: "Verification",
            detail: "Search against case records, result saved",
          },
          { label: "Review", detail: "Staff confirm or reject partial matches" },
          { label: "Approval", detail: "Steps and approvers set by the admin" },
          {
            label: "MySQL",
            detail: "Applications, case records, verification results, issuance log",
          },
        ],
      },
      decisions: [
        {
          title: "Saving the search result",
          detail:
            "The certificate says no case was found. If it's questioned a year later, searching again proves nothing because the data has changed. So the system saves what was searched, what came back and when. An issued certificate is never edited; a correction replaces it.",
        },
        {
          title: "Company names that don't match exactly",
          detail:
            'The same company can show up as "ABC Mfg., Inc" or "ABC MANUFACTURING INCORPORATED". Names are normalized (case, punctuation, common suffixes) before matching, and anything that only partly matches goes to a person instead of being decided automatically.',
        },
      ],
      outcomes: [
        "Applications are filed and tracked online.",
        "Every certificate can be traced to the verification behind it.",
        "Anyone can confirm a certificate with its reference number.",
      ],
    },
  },

  {
    slug: "biometric-integration",
    name: "TUPAD BIOS",
    tagline:
      "Fingerprint deduplication and offline registration for TUPAD. A local C# service connects the fingerprint reader to the web app, and an offline page lets field staff register beneficiaries and print IDs without internet.",
    type: "Biometrics and offline-first registration",
    role: "Developer, biometrics and offline registration",
    period: "2026",
    organization: "DOLE Regional Office No. IV-A (CALABARZON)",
    status: "In production",
    technologies: [
      "C#",
      ".NET",
      "DigitalPersona SDK",
      "Slim 4",
      "PHP",
      "MySQL",
      "JavaScript",
      "Service Worker",
      "IndexedDB",
    ],
    metrics: [
      "1:N matching",
      "works offline",
      "printed IDs on site",
      "local C# service",
    ],
    featured: true,
    confidential: true,
    // Only an empty form and test records. No real capture or beneficiary record.
    screenshots: [
      {
        src: "/projects/tupad-offline-registration.png",
        width: 1523,
        height: 1391,
        alt: "Offline beneficiary registration form with personal details, a photo panel and a fingerprint panel",
        caption:
          "Offline registration. The page works without internet: details, photo and fingerprint are saved on the laptop, and the ID prints from there.",
      },
      {
        src: "/projects/tupad-offline-sync.png",
        width: 1523,
        height: 790,
        alt: "Records and sync tab listing one registration not yet synced, with Print ID and Cancel buttons",
        caption:
          "Records waiting to sync. Photos and fingerprints are deleted from the laptop once the server has them. Test record.",
      },
      {
        src: "/projects/tupad-login-page.jpg",
        width: 1523,
        height: 790,
        alt: "TUPAD Biometrics Integrated Online System sign-in page",
        caption: "BIOS sign-in page.",
      },
    ],
    caseStudy: {
      overview:
        "TUPAD is an emergency employment program, and each beneficiary should only be enrolled once. I built two parts of BIOS: fingerprint capture and matching with DigitalPersona readers, and an offline registration page for work sites with no internet.",
      teamNote:
        "The biometric integration and offline registration are mine. The rest of BIOS (work programs, beneficiary records, approvals, payroll documents) was built by others.",
      problem: [
        "Duplicates have to be caught on site, while the person is still there.",
        "Browsers can't access a USB fingerprint reader, and the vendor SDK is a Windows library with no PHP support.",
        "Some work sites have no internet, but registration and ID release happen on the same day.",
      ],
      built: [
        "A C# tray app on the validation laptop that handles the reader: status, capture and 1:N matching with the DigitalPersona SDK",
        "The browser client for it, with timeouts and cancel handling",
        "An installer, so field offices can set it up without a developer",
        "An offline registration page (service worker + IndexedDB) that prints beneficiary IDs with QR codes",
        "Reserved ID number blocks, and sync through the normal upload and review",
      ],
      architecture: {
        summary:
          "The browser never talks to the reader directly. The C# service runs on localhost and owns the SDK. The page gets candidate templates from the PHP server and passes them to the local service for matching.",
        layers: [
          {
            label: "DigitalPersona reader",
            detail: "DP4500 over USB",
          },
          {
            label: "Local C# service",
            detail: "Localhost only: status, capture, match",
          },
          {
            label: "Browser",
            detail: "Calls localhost for the device, the server for data",
          },
          {
            label: "Slim API",
            detail: "Stores templates, returns candidates",
          },
          {
            label: "MySQL",
            detail: "Templates linked to beneficiaries, no images",
          },
        ],
      },
      decisions: [
        {
          title: "Matching outside the server",
          detail:
            "The matcher is part of the native SDK, so matching runs in the local service, not on the PHP server. The downside is that the server is told the result instead of checking it, and a modified client could fake it. For staff-operated laptops on site I accepted that; a server-side matcher would be the fix if that changes.",
        },
        {
          title: "ID numbers while offline",
          detail:
            "While online, the focal person reserves a block of ID numbers for a municipality. Each offline registration takes the next one, so IDs printed on site never clash with numbers assigned elsewhere. Once the laptop is back online, records sync through the same upload and review as everything else, including the fingerprint duplicate check.",
        },
      ],
      outcomes: [
        "Duplicate enrollments are caught on site.",
        "Sites without internet register beneficiaries and release IDs the same day.",
        "Field offices install the service themselves.",
      ],
    },
  },

  // Other systems
  {
    slug: "aep",
    name: "AEP",
    tagline:
      "Alien Employment Permit applications, from filing through evaluation to ID card release, with exclusion and exemption as separate paths and a pickup schedule at the end.",
    type: "Regulatory workflow system",
    role: "Full Stack Developer",
    period: "2025 - 2026",
    organization: "DOLE Regional Office No. IV-A (CALABARZON)",
    status: "In production",
    technologies: ["PHP", "MySQL", "JavaScript", "TCPDF", "PhpWord"],
    featured: false,
    confidential: true,
    screenshots: [
      {
        src: "/projects/aep-dashboard.png",
        width: 1494,
        height: 841,
        alt: "AEP dashboard with filed, approved, released and denied counts split by new and renewal",
        caption: "Period report split by permit type and by new versus renewal.",
      },
      {
        src: "/projects/aep-client.png",
        width: 1446,
        height: 1183,
        alt: "Public AEP landing page with exclusion, exemption and permit application paths",
        caption: "Public side. Three paths, with document upload after filing.",
      },
    ],
  },
  {
    slug: "csm",
    name: "CSM",
    tagline:
      "Client Satisfaction Measurement. The ARTA survey collected online across offices and services, with the analytics the report needs.",
    type: "Survey and analytics",
    role: "Full Stack Developer",
    period: "2025 - Present",
    organization: "DOLE Regional Office No. IV-A (CALABARZON)",
    status: "In production",
    technologies: ["Slim 4", "PHP", "MySQL", "Chart.js", "TCPDF"],
    featured: false,
    confidential: true,
    screenshots: [
      {
        src: "/projects/csm-dashboard.png",
        width: 1877,
        height: 1298,
        alt: "CSM analytics with per-office response counts, office comparison bars and a radar chart of question averages",
        caption: "Analytics by office, with per-question averages on the radar.",
      },
      {
        src: "/projects/csm-form.png",
        width: 1877,
        height: 2324,
        alt: "Bilingual client satisfaction survey form with service quality dimension questions",
        caption:
          "The survey itself. Bilingual, and the wording is fixed by the standard.",
      },
    ],
  },
  {
    slug: "peso",
    name: "PESO Reporting",
    tagline:
      "Reporting system for Public Employment Service Offices, covering job placement, youth employability, profiling and welfare program figures per LGU.",
    type: "Reporting system",
    role: "Full Stack Developer",
    period: "2025 - Present",
    organization: "DOLE Regional Office No. IV-A (CALABARZON)",
    status: "In production",
    technologies: ["Slim 4", "PHP", "MySQL", "PhpSpreadsheet", "SSE"],
    featured: false,
    confidential: true,
    screenshots: [
      {
        src: "/projects/peso-dashboard.png",
        width: 1877,
        height: 1444,
        alt: "PESO dashboard with encoded entry counts grouped by program area",
        caption: "Encoded entries by program, filtered by province, PESO and period.",
      },
      {
        src: "/projects/peso-user-access.png",
        width: 1494,
        height: 1168,
        alt: "User access dialog with nested program modules that can be granted individually",
        caption:
          "Access follows the program structure, down to individual sub-programs.",
      },
    ],
  },
];

export const featuredProjects = projects.filter((p) => p.featured);
export const additionalProjects = projects.filter((p) => !p.featured);

export const caseStudyProjects = projects.filter(
  (p): p is Project & { caseStudy: NonNullable<Project["caseStudy"]> } =>
    p.caseStudy !== undefined,
);

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}
