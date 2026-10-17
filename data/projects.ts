import type { Project } from "./types";

// Internal government systems. No production code, schema, endpoint or record is
// reproduced here.
// Screenshots use test data; anything identifying was covered before upload.

export const projects: Project[] = [
  {
    slug: "itsd",
    name: "Request Processing Desk",
    tagline:
      "Ticketing for the IT unit. Staff across the regional and provincial offices sign in with their PRAMS account and file a ticket, IT assigns and works it, and the reporter can follow it without logging in.",
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
    keyChallenge:
      "Identity lives in PRAMS, not here. Staff sign in through PRAMS, and the desk has to notice within minutes when someone joins or leaves the IT unit or is deactivated, without keeping a second set of passwords.",
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
        "The IT unit supports every office in the region, and this is where those requests land. An employee files a ticket against a category and their office, IT assigns it, works it and resolves it, and every step is recorded. It is the first system to sign people in through PRAMS instead of keeping its own passwords.",
      users:
        "Any employee filing a request, IT staff who pick tickets up and resolve them, and administrators who manage users, roles, offices and categories.",
      problem: [
        "Requests reached IT through whatever channel was nearest. Nothing recorded what was asked, who took it, or whether it was finished.",
        "People who reported a problem had no way to check on it short of asking again.",
        "A new system normally means a new set of accounts to create and keep in step with HR as people join, move office or leave.",
      ],
      responsibilities: [
        "Full stack development: a Laravel 13 API and a React and TypeScript single-page front end",
        "Schema design for tickets, activity logs, attachments, categories, offices and roles",
        "Sign-in through PRAMS single sign-on, replacing the earlier HRIS password sign-in",
        "The ticket status machine and its transition rules",
        "Roles, permissions and per-action policies",
        "In-app notifications, attachments and the public tracking page",
        "Reports and the dashboard queues",
        "Feature tests covering sign-in, authorization and the transitions",
      ],
      architecture: {
        summary:
          "A Laravel API with a React single-page front end. Sanctum signs the browser in with the normal session cookie and CSRF protection, so no token is kept in the browser. TanStack Query fetches and caches the data and refreshes lists after every change. Ticket behavior lives in service classes rather than controllers, and identity comes from PRAMS rather than from a user table of its own.",
        layers: [
          {
            label: "Browser",
            detail:
              "React and TypeScript, React Router, TanStack Query, Tailwind and Radix primitives",
          },
          {
            label: "Sanctum",
            detail: "Session cookie and CSRF protection for the single-page app",
          },
          {
            label: "HTTP layer",
            detail:
              "Routes, then auth, then active-account and PRAMS access checks on every API call",
          },
          {
            label: "Authorization",
            detail:
              "Policies per action and permissions per role, with the super administrator allowed once in a Gate",
          },
          {
            label: "Services",
            detail:
              "Workflow and transitions, ticket numbering, notifications, PRAMS sign-in and account sync",
          },
          {
            label: "Eloquent / MySQL",
            detail:
              "Tickets, activity logs, attachments, counters, categories, offices, roles",
          },
        ],
        integrations: [
          "PRAMS single sign-on for sign-in, with a check back every ten minutes",
          "A read-only connection to the HRIS database, now used only to sync the office list",
          "Private disk storage for attachments, outside the web root",
          "Database-backed notifications for in-app alerts",
        ],
      },
      features: [
        {
          title: "Sign in with PRAMS",
          detail:
            "Staff press one button and use the account they already have. On the first sign-in, members of the IT unit get the IT Staff role and everyone else gets the Requestor role, so nobody has to create accounts by hand.",
        },
        {
          title: "Access that keeps up with PRAMS",
          detail:
            "Every ten minutes the desk asks PRAMS about the user again. A new IT unit head becomes an administrator, and a deactivated account is signed out, without waiting for the next login.",
        },
        {
          title: "Status machine with explicit transitions",
          detail:
            "Seven statuses and one map of what may follow what. Anything not on the map is rejected before it reaches the database, whichever screen it came from.",
        },
        {
          title: "Assignment",
          detail:
            "Assigning an open ticket moves it to assigned and stamps the time, and unassigning sends it back to open. Administrators can assign several tickets at once.",
        },
        {
          title: "Public tracking link",
          detail:
            "Each ticket carries an unguessable token and a QR code. The page behind it shows status, dates and a generalized timeline, and nothing else.",
        },
        {
          title: "Activity log on every change",
          detail:
            "Status changes, assignment, comments and attachments each write a row with who did it and what changed, inside the same transaction as the change.",
        },
        {
          title: "Notifications to the people involved",
          detail:
            "The requestor and the current assignee are told when something happens, minus whoever did it. On assignment the new assignee is told directly.",
        },
        {
          title: "Attachments",
          detail:
            "Stored outside the web root under a generated filename, with the original name kept only as a label. Downloads go through a route that checks the ticket first.",
        },
        {
          title: "Sequential ticket numbers",
          detail:
            "One counter per calendar year, so tickets read IT-2026-00001 upward and the number means something to the person quoting it.",
        },
        {
          title: "Dashboard, live lists and reports",
          detail:
            "Counts by status, urgent tickets still waiting, and the oldest unresolved tickets first. Tables, tickets and the dashboard refresh on their own, and a reports page covers the monthly figures.",
        },
      ],
      challenges: [
        {
          title: "Two systems, one set of people",
          challenge:
            "The desk needs to know who everybody is, which office and unit they belong to, and whether they still work here. PRAMS already knows all of it.",
          cause:
            "Giving the desk its own user list would mean creating every employee twice and keeping the copy in step forever. It would drift within a month.",
          solution:
            "The first version read the HRIS database directly and checked the password against the HRIS hash. Once PRAMS had single sign-on, the desk moved to it: the user signs in on PRAMS, the desk exchanges a one-time code for the user's details in a server-to-server call, and keeps a small local row with its own roles and active flag. PRAMS is the authority on who someone is. The desk stays the authority on what they can do here.",
          tradeOff:
            "The desk now depends on PRAMS being up. Someone already signed in keeps working for up to an hour if PRAMS cannot be reached, and an emergency administrator password can be switched on, but nobody new can sign in until PRAMS is back.",
          result:
            "No second password for staff, no account to create, and a person's office and unit follow them automatically. A local deactivation still overrides a valid PRAMS sign-in, so the desk can lock someone out without touching HR data.",
        },
        {
          title: "A legacy column that means the opposite of what it says",
          challenge:
            "In the HRIS, an account row with is_active = 0 is the active one. Reading it the obvious way logs in exactly the wrong people.",
          cause:
            "Inherited meaning. The column has meant that for years and other systems depend on it, so it is not something to fix from the outside.",
          solution:
            "Keep the query faithful to the legacy meaning and keep it in one place. A small set of read-only models owns every HRIS query, with a comment stating the inversion in plain terms. That convention never crosses the boundary: the desk's own is_active means what it looks like.",
          tradeOff:
            "The same column name now means two opposite things in one codebase, which is exactly the sort of thing that bites someone later. The only defense is that just those models can see the legacy side, and they say so at the top.",
          result:
            "Everyone working on the desk reads is_active the normal way and is right. The one place where that is false is documented where it matters.",
        },
        {
          title: "Two people filing at once could get the same ticket number",
          challenge:
            "Ticket numbers run IT-2026-00001 upward. Reading the last number and adding one is fine until two requests do it in the same moment.",
          cause:
            "Read-then-write with nothing holding the row in between. It is a race that testing by hand will almost never reproduce, and production finds immediately.",
          solution:
            "One counter row per year. A unique index on the year means two requests racing to create that row is harmless: one wins, the other just reads it. The row is then locked inside a transaction before the number goes up, so the second request waits for the first and gets the next number.",
          tradeOff:
            "Ticket creation waits on one row per year. For this volume that is nothing, but it means the lock must not be held while doing unrelated work, so the numbering runs in its own short transaction.",
          result:
            "Numbers are unique and gapless within a year, and the constraint is enforced by the database, not by application code.",
        },
        {
          title: "Status rules were spreading across controllers",
          challenge:
            "Assigning, resolving, putting on hold and reopening each had to set the status, stamp the right timestamps and write a log row. Each screen was growing its own version.",
          cause:
            "The endpoints were built one at a time, and the shared shape only became obvious once there were several.",
          solution:
            "One service holds a map of which status may follow which, and every path goes through it. It rejects an illegal move before anything is written, sets the timestamps belonging to the target status, and writes the activity row in the same transaction as the change. Notifications go out after the transaction commits, not inside it.",
          tradeOff:
            "New statuses mean editing one central map, and an odd one-off transition has to fit that map rather than being hacked into a controller.",
          result:
            "Illegal transitions are impossible from any screen. Reopening a resolved ticket clears its resolved and closed dates, so the reports do not count work that was undone.",
        },
        {
          title: "Letting someone check a ticket without an account",
          challenge:
            "People who filed a ticket wanted to know where it had got to, and asking for their status meant asking IT, which is the thing the system was supposed to reduce.",
          cause:
            "Viewing a ticket required logging in, and some reporters go weeks between logins.",
          solution:
            "Each ticket gets a long random token and a public page addressed by it, also printed as a QR code. That page builds its response from an explicit list of fields: number, subject, status, priority, office, category, dates, and a timeline where each entry is reduced to a generic label.",
          tradeOff:
            "Anyone with the link sees that much, so the question is what goes in the response, not who is asking. Staff names, internal notes, comments and the resolution text are left out on purpose. The public page is deliberately less useful than the internal one.",
          result:
            "The reporter can answer their own question, and the page cannot leak who is working on what or what was said internally.",
        },
      ],
      security: [
        "With PRAMS sign-in on, the desk never sees a password. The sign-in carries a state value tied to the browser, and the one-time code is exchanged server to server with the desk's own secret",
        "Every ten minutes the account is checked against PRAMS again; a deactivated PRAMS account is signed out on its next request",
        "A local deactivation overrides a successful PRAMS sign-in, so someone can be locked out here without touching HR records",
        "The HRIS connection is read-only and now used only to sync offices. Nothing writes to it",
        "Every sign-in, failed sign-in and forced sign-out is written to the audit log",
        "Permissions guard the management and reporting routes; policies check every ticket action; the super administrator is allowed once in a Gate rather than in each policy",
        "The ticket list is scoped in the query: a requestor sees their own tickets, not a filtered view of everyone's",
        "Attachment downloads check that the attachment belongs to the ticket in the URL before anything else, which closes the id-swap",
        "Uploads are stored outside the web root under a generated filename; the original name is kept only as a display label",
        "The public tracking page returns a fixed list of fields and a generalized timeline. Staff names, comments and resolution text are never in the payload",
        "The emergency administrator password sign-in is off unless it is switched on in the server config",
      ],
      outcomes: [
        "Requests to IT are recorded, assigned and closed in one place, with a number the reporter can quote.",
        "Staff sign in with their PRAMS account. There is no account to create and no second password.",
        "Every ticket has a history: who acted, what changed, and when.",
        "A reporter can check their own ticket without logging in, and without seeing anything internal.",
        "Feature tests cover sign-in, the authorization rules and the transition map, so the rules that matter are the ones under test.",
      ],
    },
  },
  {
    slug: "vcs",
    name: "VCS",
    tagline:
      "Vendor Charges & Settlement System. Every utility, rental, courier and fuel bill of the regional office and five provinces, tracked from the day it arrives to the ADA that pays it, replacing six Excel workbooks.",
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
    keyChallenge:
      "Six years of hand-typed workbooks had to come in without retyping them, and without importing their typos: dates in the year 20226, amounts like 4.899.00, and account numbers Excel had turned into scientific notation.",
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
        "VCS records the fixed expenses of the regional office and its five provincial offices: electricity, water, telephone and internet lines, rentals, photocopiers, courier, fuel and postage. Each bill is tracked from the day it is received, through bill-out to Accounting, to the ADA, check or official receipt that pays it. It produces the same monitoring sheets, monthly comparisons and signed reports the workbooks were kept for.",
      users:
        "Billing encoders in the regional and provincial offices who log bills, the property officer who manages service accounts and imports, Accounting staff who record payments, the IMSD chief, and auditors with read-only access.",
      problem: [
        'Each operating unit kept its own "Monitoring of Fixed Expenses" workbook, one sheet per meter, line or lease. Nothing added them up across the region.',
        "Dates, amounts and account numbers were typed by hand, and the mistakes stayed in: impossible years, misspelled months, amounts with two decimal points.",
        "Knowing which bills were still waiting for payment meant reading every sheet.",
        "One ADA often pays several bills, and one courier invoice often covers several offices. A spreadsheet row holds neither cleanly.",
        "The monthly comparison against previous years was maintained by hand, separately from the bills it was supposed to summarize.",
      ],
      responsibilities: [
        "Full stack development: Laravel 12 back end, Inertia with React and TypeScript on the front",
        "Schema design for service accounts, bills, office breakdown lines, carried-over totals and import batches",
        "The Excel workbook importer, its date and amount repair rules, and its preview and undo modes",
        "Validation written against the mistakes found in the workbooks",
        "Page-level access control on Spatie Permission, and province scoping",
        "Bill-out and settlement workflow, including voiding a payment",
        "Dashboard, charts and the four printable reports with CSV export",
        "Feature and unit tests in Pest",
      ],
      architecture: {
        summary:
          "A Laravel application with Inertia and React. Controllers validate through form requests and return props to React pages. Anything that is not a single request's concern, such as identifier normalization, the monthly comparison, the report builder and the workbook importer, lives in support classes rather than controllers, so the importer and the forms share one set of rules.",
        layers: [
          {
            label: "Browser",
            detail:
              "React pages in TypeScript, Tailwind, searchable dropdowns and printable charts",
          },
          {
            label: "Inertia",
            detail: "Controllers return props to pages. No separate JSON API",
          },
          {
            label: "Access middleware",
            detail:
              "Every route declares the page it belongs to and the ability it needs",
          },
          {
            label: "Form requests",
            detail:
              "Date, order, amount, duplicate and province rules before anything is written",
          },
          {
            label: "Support classes",
            detail:
              "Normalizer, monthly comparison, report builder, workbook reader, parser and importer",
          },
          {
            label: "Eloquent / MySQL",
            detail:
              "Service accounts, bills, bill lines, carried-over totals, signatories, import batches",
          },
        ],
        integrations: [
          "Excel workbook import, from the admin screen or an Artisan command",
          "Print layouts with the province's signatories, and CSV downloads that open in Excel",
          "Frontend assets built in CI rather than on the host",
        ],
      },
      features: [
        {
          title: "A monitoring sheet per service account",
          detail:
            "Each meter, line, lease and photocopier unit has its own page for the year, laid out like the workbook sheet it replaces, with the three-year monthly comparison underneath.",
        },
        {
          title: "Received, billed out, paid",
          detail:
            "A bill moves through three states, each with its own date. Bill-out is done in bulk from the register, and the date order is enforced: nothing is paid before it is billed out.",
        },
        {
          title: "One payment, many bills",
          detail:
            "Settlement records one ADA, check or OR against every bill it pays. A payment can be voided, which sends the bill back to the payment queue instead of deleting anything.",
        },
        {
          title: "Office breakdowns",
          detail:
            "A courier invoice covering several offices, or a bill carrying a previous balance, is entered once with breakdown lines that must add up to the total. Office and province figures follow the lines, not the bill.",
        },
        {
          title: "Workbook import with a report",
          detail:
            "The six province workbooks are read directly. Every repair the importer makes is listed, a preview runs the whole import and rolls it back, and an import can be undone.",
        },
        {
          title: "Province-bound users",
          detail:
            "A provincial encoder is tied to their province, and every list, dashboard, report and form is limited to it.",
        },
        {
          title: "Page-level access",
          detail:
            "Each page grants view, create, update, delete or generate. Roles are starting templates, and a single user's access can be adjusted without inventing a new role.",
        },
        {
          title: "Dashboard and charts",
          detail:
            "Billed, paid and unpaid for the year, the bill-out and payment queues with the oldest item waiting, month-against-last-year charts, and accounts with no bill logged for last month.",
        },
        {
          title: "Reports",
          detail:
            "Monitoring of Fixed Expenses, Monthly Expense Summary, Unpaid Bills and Payment Register, on screen, printed with the province's signatories, or downloaded for Excel.",
        },
      ],
      challenges: [
        {
          title: "Importing six workbooks without importing their mistakes",
          challenge:
            "Years of bills lived in hand-typed workbooks. Retyping them was not realistic, and importing them as they were would carry every typo into a system that was supposed to fix them.",
          cause:
            "The workbooks were never validated. Dates were typed as text with impossible years and misspelt months, amounts had stray commas and extra decimal points, and Excel had turned long account numbers into scientific notation and dropped the leading zero from phone lines.",
          solution:
            "An importer that finds each table by its column titles rather than fixed positions, and repairs what it can in a predictable way: a year typed with an extra digit is corrected against the billing period, a future date is left blank, a number in scientific notation is expanded and matched to the account it belongs to. Every repair is written into the import report. Anything that cannot be repaired is skipped with a reason.",
          tradeOff:
            "The importer makes decisions on the user's behalf, and a repair can be wrong. That is why every one is listed, a preview mode runs the full import and then rolls the transaction back, and an import can be undone afterwards.",
          result:
            "The existing records come in without retyping, and the person importing can see exactly what was changed and why before committing to it.",
        },
        {
          title: "An import that can be run twice",
          challenge:
            "The workbooks kept being updated while the system was being built. A second import had to add what was new and fill in payments recorded since, without duplicating bills that were already in.",
          cause:
            "A one-shot import assumes the source stops changing. This one did not, and the same bill can also appear on a summary sheet and on its per-unit sheet in the same workbook.",
          solution:
            "Match before inserting. A bill with the same account and billing period, or the same invoice number and amount, is treated as the existing one, and only its blank fields, such as the date paid, the ADA number and who paid, are filled from the workbook.",
          tradeOff:
            "The import never overwrites a value that is already there, so a correction made in the workbook after the first import does not flow through. The system is the authority once a bill is in it.",
          result:
            "Re-importing is safe, and the summary and per-unit sheets meet in one set of bills.",
        },
        {
          title: "Validation written from the actual mistakes",
          challenge:
            'Generic rules such as "must be a date" and "must be a number" would have accepted most of what went wrong in the workbooks.',
          cause:
            "The errors were plausible values: a real date in the wrong order, a payment reference with no payment date, the same invoice logged twice on one account.",
          solution:
            "Rules taken from the workbooks themselves. Dates must be real, not in the future and not before 2000. Bill-out cannot precede receipt, payment cannot precede bill-out, and a payment needs both its mode and its reference. The applicable month must fall within the billing period. Invoice numbers and billing periods cannot repeat on one account. Account, meter and phone identifiers are normalized before they are compared, so formatting differences do not hide a duplicate.",
          tradeOff:
            "Stricter forms, and occasionally a real-world exception the rules did not anticipate has to be handled deliberately rather than typed in.",
          result:
            "The typing errors the workbooks accumulated cannot be entered, and the importer and the forms reject the same things.",
        },
        {
          title: "Access that fits pages, not just roles",
          challenge:
            "Offices wanted to give one person a little more or less than their role, and to confine provincial encoders to their own province.",
          cause:
            "Role-only checks mean a new role for every exception, and a province is a data boundary, not a page permission.",
          solution:
            "Two separate checks. Every route names its page and the ability it needs, and a user's grants start from their roles but can be adjusted per person. Province is a property of the user, applied as a scope on the queries themselves, so a provincial user's bill list, dashboard and reports never contain another province's rows. Actions on a single bill check the province again.",
          tradeOff:
            'Per-user adjustments make "what can this person do" something to look up rather than infer from the role name. The access grid on the user\'s page is the answer.',
          result:
            "An office can adjust access without a developer, and a provincial encoder cannot see or record anything outside their province.",
        },
      ],
      security: [
        "Every route is guarded by the page it belongs to and the ability it needs; hiding a button is not the control",
        "Province scoping is applied in the query, and single-bill actions such as voiding a payment check the province again",
        "Recording a payment only touches bills that are visible to the user and awaiting payment. Anything else in the request is skipped and reported",
        "Form requests validate every write, and identifiers are normalized before duplicate checks",
        "Offices, categories, providers and service accounts in use cannot be deleted, only deactivated, so history is never orphaned",
        "A paid bill cannot be deleted until its payment is voided",
        "Imports run inside a transaction, and each import records who ran it and what it changed",
      ],
      outcomes: [
        "The regional office and five provinces record fixed expenses in one system instead of six workbooks.",
        "Unpaid bills, and how long they have been waiting, are visible without reading every sheet.",
        "The existing workbook data is imported with every repair listed, instead of being retyped.",
        "The monitoring sheets, monthly comparisons and signed reports come out of the same data as the bills.",
        "Feature tests cover validation, settlement, province scoping, reports and the import end to end.",
      ],
    },
  },
  {
    slug: "prams",
    name: "PRAMS",
    tagline:
      "HRIS for DOLE CALABARZON. Leave, overtime, CTO and office orders follow approval routes that HR sets up without a developer, and PRAMS is also the login for the region's other internal systems.",
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
    keyChallenge:
      "Every new Regional Director or Assistant Regional Director decides which requests should pass through their account. HR needed to change the approval flow each time, on their own, without breaking requests already halfway through.",
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
        "PRAMS is where employees of the regional office and its field offices file leave, compensatory time off, overtime and office orders, and where HR keeps credits, work schedules and approval routes. Approved requests print as the official government forms. It is also the login for the region's other internal systems: they send people to PRAMS to sign in instead of keeping their own passwords.",
      users:
        "Roughly 500 employees across the regional office and six field offices: staff filing requests, unit heads, office heads and directors approving, HR staff managing credits, schedules and routes, and the other internal systems that sign their users in through PRAMS.",
      teamNote:
        "PRAMS is built by a small team. This case study covers my part: the approval workflows and the route engine behind them, delegation, single sign-on, the printed forms, leave and CTO credits, access control, employee units and the org chart, and the chatbot. The employee profile, the Personal Data Sheet export and the employee import are mainly a teammate's work; on the PDS I added the 2026 revision's continuation sheets.",
      problem: [
        "Requests moved between offices on paper. Nobody could say where a form was or who was holding it.",
        "Leave and CTO credits lived in spreadsheets, so the number an employee believed and the number HR computed did not always agree.",
        "The approval flow changed every time a new Regional Director or Assistant Regional Director came in: some want certain requests to go through them, others do not. That flow was written into the code, so each change meant waiting for a developer.",
        "Approval authority moves constantly. People go on leave, posts sit vacant, and officers are designated in an acting capacity.",
        "Each new internal system came with its own accounts, so the same employee had several passwords and HR had several lists to keep up to date.",
        "There was no record of who approved what, or when.",
      ],
      responsibilities: [
        "Full stack development on the Slim and MySQL application, as part of a small team",
        "The approval route engine and the screen HR uses to build routes",
        "Leave, overtime, CTO and office order workflows, including delegation and signatory snapshots",
        "Single sign-on for connected systems, and the page that manages them",
        "Page-level access control and the Roles & Permissions screen",
        "Official form output for leave, overtime, CTO and office orders",
        "Leave and COC credit ledgers, with bulk credit import",
        "Employee units, unit heads and the org chart",
        "In-app notifications, live approval queues, chat and the knowledge-base chatbot",
        "Deployment, production support and bug fixes",
      ],
      architecture: {
        summary:
          "A Slim 4 application behind a PSR-15 middleware stack, serving a JSON API to a front end of about ninety AMD modules. Route files per module, middleware for the rules every request shares, validation at the boundary, services for the business logic, and models over PDO. Every form's approvals go through one route engine, and other systems sign in through PRAMS's single sign-on endpoints.",
        layers: [
          {
            label: "Browser",
            detail:
              "Server-rendered pages with AMD JavaScript modules, one per feature area",
          },
          {
            label: "Middleware",
            detail:
              "Session, active user, CSRF, role, page access, rate limit, security headers, maintenance mode",
          },
          {
            label: "Routes",
            detail:
              "One Slim route file per module, each group carrying its own middleware",
          },
          {
            label: "Validation and DTOs",
            detail:
              "Rule-based validation at the boundary. Nothing past it sees raw input",
          },
          {
            label: "Services",
            detail:
              "Route engine, delegation, credit ledgers, overtime computation, form output, single sign-on",
          },
          {
            label: "Models over PDO",
            detail:
              "Prepared statements throughout, transactions around multi-table writes",
          },
          {
            label: "MySQL",
            detail:
              "Requests, routes and their versions, credits, delegations, audit and login logs",
          },
        ],
        integrations: [
          "Single sign-on for the region's other systems: browser sign-in through PRAMS, then server-to-server calls for the user's details",
          "PhpSpreadsheet for the official Excel form templates and for bulk credit import and export",
          "TCPDF, PhpWord, wkhtmltopdf and headless LibreOffice for the printable documents",
          "PHPMailer for outbound mail",
          "Server-Sent Events on the approval screens, interval polling for the notification badge",
          "Attendance data used to check overtime against work schedules",
          "The Gemini API behind the chatbot, which only ever receives the question and knowledge-base text",
        ],
      },
      features: [
        {
          title: "Approval routes HR can edit",
          detail:
            "When a new director wants requests to pass through them, or to skip them, HR changes the route on a settings screen: how many steps, and who approves each one (the office head, anyone holding a role, one named person, or the filer's unit head). A step can end the request when it disapproves, or pass the disapproval on as a recommendation.",
        },
        {
          title: "The right route for each filing",
          detail:
            "Which route a request follows depends on the filer's role, and for leave and CTO on the request itself: 30 days or more, maternity leave, travel abroad. A few employees can be given a route of their own.",
        },
        {
          title: "Multi-level approvals across four document types",
          detail:
            "Leave, overtime, CTO and office orders, plus requests to move CTO dates. Every step records the approver, the decision, the time and any remarks, and each log is labeled with who decided it: head, OIC, unit head, HR or director.",
        },
        {
          title: "Delegated approval authority",
          detail:
            "An approver hands their approvals to someone else for a date range and for chosen request types. The delegate acts only on the steps the approver would have acted on, and the approver gets the requests back the day the delegation ends.",
        },
        {
          title: "Single sign-on for other systems",
          detail:
            "Other internal systems send people to PRAMS to log in, and get back who the person is: office, position, role, units and acting assignments. Each system decides its own access from that, so accounts, transfers and resignations are handled once, in PRAMS.",
        },
        {
          title: "Connected Systems page",
          detail:
            "The super admin registers a system, rotates its secret, names its admins, records acting designations, and previews exactly what a system will receive for any employee.",
        },
        {
          title: "Roles and page access",
          detail:
            "Each role comes with a default set of pages, and one account can be given or denied a page on top of that. The server checks page access on every route, not only the menu.",
        },
        {
          title: "Official form output",
          detail:
            "Approved applications print as the real government forms rather than as a screen dump, generated from templates and converted to PDF.",
        },
        {
          title: "Signatory snapshots",
          detail:
            "The printed name and designation of each signatory are frozen at the moment of approval, so a form reprinted next year still shows who actually signed it.",
        },
        {
          title: "Credit ledgers",
          detail:
            "Leave, CTO and COC balances are computed from credit and debit rows rather than a stored number, so correcting a record recomputes the balance instead of leaving it wrong. HR can credit one employee or a whole roster from a spreadsheet.",
        },
        {
          title: "Work schedules and overtime rules",
          detail:
            "An employee's schedule decides which hours count as overtime, how a half day is deducted, and how holidays and special working days are treated.",
        },
        {
          title: "Units and org chart",
          detail:
            "Employees belong to units with a unit head and an alternate, who can be a step in a route. The org chart shows each office's head or OIC on any date and exports to PNG or PDF.",
        },
        {
          title: "Live approval queues and notifications",
          detail:
            "The approval screen updates itself while you are looking at it. The notification badge polls. The two use different mechanisms on purpose, which is one of the trade-offs below.",
        },
        {
          title: "Chatbot",
          detail:
            "Employees ask how to file, how to approve and what the leave rules are. Answers come from an HR-maintained knowledge base through the Gemini API. Questions about their own balances are answered on the server from their records and never sent to the model, and anything the knowledge base cannot answer goes to HR's chat.",
        },
        {
          title: "Chat, calendar and reports",
          detail:
            "In-app messaging with HR, a calendar of filed requests, holidays and suspensions, and HR analytics exported for the reports that end up on paper.",
        },
      ],
      challenges: [
        {
          title: "Approval paths were written into the code",
          challenge:
            "The approval flow changes whenever the Regional Director or Assistant Regional Director changes. Each one decides which requests go through their account and which stop at the office head or HR. On top of that, who approves depends on the filer's role, the leave type, the number of days and travel abroad. All of it was in hardcoded role lists, repeated in several controllers, the approval table query and the browser. Editing the signatory settings changed who signed the printed form, but not where the request actually went.",
          cause:
            'The flows grew one director and one policy at a time, and each change was added where it was needed at that moment. There was no single place that answered "who acts on this next".',
          solution:
            "A route engine. A route is an ordered list of steps, and each step says who approves it: the office head, anyone holding a role, one named person, or the filer's unit head. HR maps filer roles, and for leave and CTO the conditions of the request, to a route. The approval queue, the buttons on screen and the API all ask the engine the same question, so they cannot disagree.",
          tradeOff:
            '"Who approves this" is now something to look up in the settings, not something you can read in the code, and a wrong route can stall requests. To limit that, filing is blocked when the filer would be the only possible approver of a step, with a message to ask HR to fix the route.',
          result:
            "When a new director comes in, HR sets up the flow they want from a settings screen, without a code change or a deployment. Moving one role to a different flow is two clicks, and so is moving it back.",
        },
        {
          title: "Editing a route while requests are on it",
          challenge:
            "Routes change while requests are waiting on them. If a pending request simply followed the newest version, it could skip a step or land on one that no longer exists.",
          cause:
            "A request only stored its status, not which version of the route it was following or which step it had reached.",
          solution:
            "Each request keeps the route version it was filed under and the step it is waiting at. Saving a route creates a new version. HR can choose to move pending requests onto it: each one goes to the matching step in the new version, and requests waiting at a step that was removed finish on the old version.",
          tradeOff:
            "For a while two versions of the same route are live at once, and the screen has to say how many requests moved and how many stayed.",
          result:
            "A route edit never sends a request backwards, skips an approver, or leaves it waiting at a step that is gone.",
        },
        {
          title: "One login for several systems",
          challenge:
            "Other internal systems needed staff logins. Separate account lists drift: someone transfers or resigns and one system still lets them in.",
          cause: "Identity was being copied into each system instead of asked for.",
          solution:
            "PRAMS became the login. A connected system sends the user to PRAMS, which checks that the return address exactly matches the one registered for that system, signs the user in, and sends them back with a one-time code. The system trades that code for the user's details in a server-to-server call using its own secret. Codes are random, stored hashed, used once and expire quickly. The first version also worked out each system's permissions inside PRAMS. That grew fast, so a day later it was cut back: PRAMS now only says who the person is, and each system decides access itself.",
          tradeOff:
            "Every connected system has to write its own access rules, and if PRAMS is down nobody can log in to them. In exchange PRAMS does not have to know how every other system works.",
          result:
            "Staff keep one password. Transfers and resignations take effect in the connected systems at the next sign-in, and adding a system is a few fields on the Connected Systems page.",
        },
        {
          title: "A form reprinted a year later showed the wrong signatory",
          challenge:
            "Approved applications print with the approving officer's name and designation. Those were resolved live from whoever currently holds the post, so when an office head changed, every historical form silently reprinted with the new person's name under an old approval.",
          cause:
            "Treating 'who signs this' as a lookup against current data, when it is really a fact about a moment that has already passed.",
          solution:
            "A snapshot table. At the moment a decision is recorded, the printed name and designation for each signatory slot are written alongside the application. The print path reads the snapshot. Where no snapshot exists it falls back to the live lookup, so forms approved before the table existed still print.",
          tradeOff:
            "The same information now lives in two places, and a genuine correction to someone's designation will not reach forms already approved. That is right for a signed document, but it means a typo caught late has to be fixed on purpose rather than by editing the employee record.",
          result:
            "A reprint matches what was signed. The fallback meant the change shipped without a data migration over historical records.",
        },
        {
          title: "Delegation that follows the calendar, not the request",
          challenge:
            "The first version copied the delegate's name onto pending requests when the delegation was created. Requests filed afterwards still went to whoever was away, and a head's delegation also blocked steps that were HR's to act on.",
          cause:
            "Delegation was treated as a one-time data update, when it is really a rule that holds for a period of time and only for the head's own steps.",
          solution:
            "Store it as delegator, delegate, request types, start date and end date, and decide it when someone acts. A delegation only applies to a step the head approves, so HR's steps are untouched. Requests filed before the delegation began are handed over too, and the delegate's own requests stay with the head, since nobody may approve their own.",
          tradeOff:
            '"Who can approve this right now" stops being a simple query. It has to check the route step, the head and the delegations in force today.',
          result:
            "Delegation behaves the way the office does. The head gets everything back the day it ends, and the log shows every decision made on the head's behalf.",
        },
        {
          title: "Server-Sent Events only where they are needed",
          challenge:
            "Approvers want the queue to update while they are looking at it. Server-Sent Events do that well. They also hold one PHP worker per open connection, and the application runs on shared hosting with a small fixed worker pool. Staff leave tabs open all day.",
          cause:
            "The cost of SSE is not per update, it is per open tab per minute. A notification badge that every user has open all day is the worst thing to put behind it. An approval queue that somebody is actively working is the best.",
          solution:
            "Split them. The notification badge polls a cheap endpoint, and that interval went from three seconds to twenty once it was clear the badge does not need second-level freshness. Streaming stayed only on the approval screens, and the client closes the stream the moment nobody is watching it: on leaving the page, on the tab being hidden, on unload. It reopens when the tab is visible again, one shared instance stops a second stream from opening, and a stall detector reconnects a connection that has gone quiet.",
          tradeOff:
            "Two mechanisms to understand instead of one, and the badge can be up to twenty seconds behind. In exchange a connection only exists while somebody is actually watching a queue.",
          result:
            "The worker pool stopped being used up by idle tabs. The screen that benefits from streaming still streams.",
        },
        {
          title: "Balances drifted away from their own history",
          challenge:
            "The stored balance column stopped matching the records that were supposed to explain it, usually after a cancelled or corrected request.",
          cause:
            "Balance was a number that whichever code path ran happened to update. Cancellation and admin correction missed it.",
          solution:
            "Made the ledger the source of truth. The balance is the sum of credit and debit rows, cached and cleared on write, with anything touching several rows running in a transaction.",
          tradeOff:
            "Reads cost more than reading one column, and the cache has to be cleared correctly.",
          result:
            "A corrected record produces a corrected balance, and any balance can be traced to the rows behind it.",
        },
      ],
      security: [
        "Session auth with passwords hashed by password_hash() and checked with password_verify()",
        "Every route group carries its own middleware: session, active-user check, CSRF, role, page access, and a rate limiter tuned per group",
        "Page access is checked on the server for every route group, including HR management and settings, so a hidden menu item is not the only barrier",
        "Permissions are checked in middleware and again in the service before a state change",
        "Nobody can approve their own request, and filing is blocked when the filer would be the only approver of a step",
        "Single sign-on only sends a user back to the exact address registered for that system. Login codes are random, single-use, stored hashed and short-lived; system secrets are stored hashed and compared in constant time",
        "Failed single sign-on token requests are counted per IP and rate-limited",
        "A connected system can fetch an employee's e-signature only if the super admin allowed it, and every fetch is written to the audit trail",
        "Profile records can only be changed or deleted by the employee they belong to",
        "Validation at the HTTP boundary, so nothing downstream sees raw input",
        "Every query is a prepared statement with bound parameters. No string-concatenated SQL",
        "A Content-Security-Policy plus nosniff, DENY framing, HSTS, referrer and permissions policy, set once in middleware",
        "The CSP still allows inline scripts, because the front end predates it. That is written down as known debt: removing it means moving every inline script to a per-request nonce",
        "API responses may carry personal data, so they are sent with no-store rather than left to browser and proxy caches",
        "The chatbot masks numbers and emails before a question leaves the server, and never sends employee records to the model",
        "HTML is rendered to PDF with JavaScript disabled in the converter",
        "Uploads validated by extension and MIME type, size-limited, renamed on write and stored outside the web root",
        "Audit rows are written in the same transaction as the change they describe",
      ],
      outcomes: [
        "Leave, overtime, CTO and office orders are filed and approved in one system instead of on paper.",
        "A change of Regional Director or Assistant Regional Director no longer needs a developer: HR updates the approval flow from a settings screen.",
        "Other internal systems sign people in through PRAMS, so staff keep one password and accounts are managed in one place.",
        "Approved applications come out as the official forms, with the signatory who actually approved them.",
        "Every approved document has a history you can query: who acted, when, and with what remarks.",
        "Approvals keep moving when an approver is away.",
        "Used by roughly 500 employees across six field offices.",
      ],
    },
  },

  {
    slug: "tsios",
    name: "TSIOS (PTO / CEI)",
    tagline:
      "Technical Safety Inspection Online System. Establishments apply online for a Permit to Operate or an electrical inspection certificate, and the office runs the inspection, payment and issuance from the same place.",
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
    keyChallenge:
      "Every new Regional Director wants certificates approved along a different route. The current one wants approval to end at the ARD's account, while the certificate still carries the RD's name and e-signature.",
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
        "TSIOS handles Permit to Operate and Certificate of Electrical Inspection applications. An establishment enrolls, files, and is assigned an inspector and an evaluator. Inspection results lead to an order of payment, and payment leads to a certificate that goes through the Division Head, the ARD and the RD before it is released.",
      users:
        "Industrial establishments and contractors filing applications, inspectors and evaluators in the regional and provincial offices, cashiering, and the officials who review and sign certificates.",
      teamNote:
        "TSIOS is built by a team. My parts are establishment and unit enrollment, the client's application pages, the inspection and evaluation steps, certificate issuance, and the approval chain with e-signatures, including the approval route described below. The dashboard, account access and certificate corrections are teammates' work.",
      problem: [
        "Applications were filed and tracked on paper across a regional office and several provincial offices. Nobody had one view of where anything was.",
        "A certificate could be issued in the system, but the review and sign-off by the Division Head, the ARD and the RD still happened outside it.",
        "Certificate approval was then fixed in the code as Division Head, then ARD, then RD. Each new Regional Director wanted a different route, and every change meant a code change.",
      ],
      responsibilities: [
        "Full stack development, as part of a team",
        "Establishment and unit enrollment, and the client's application and transaction pages",
        "The inspection and evaluation steps, with inspection history",
        "Certificate issuance, including correcting company and unit details before a certificate is made",
        "The certificate approval chain and e-signatures on certificates",
        "The certificate approval route the administrator sets up",
        "Maintenance mode, deployment and production support",
      ],
      architecture: {
        summary:
          "A PHP application with no framework behind it. The layering is hand-built: config, controllers grouped by audience, models, and a thin service layer for the parts worth naming. Two faces, a public side where establishments enroll and file and an office side scoped by province and by route permission. An application row carries its stage, and each stage transition writes its own record.",
        layers: [
          {
            label: "Establishment portal",
            detail: "Enrollment, filing, upload, status check",
          },
          { label: "HTTP layer", detail: "Auth, route permission, provincial scope" },
          {
            label: "Workflow services",
            detail: "Assignment, inspection result, order of payment, issuance",
          },
          {
            label: "Certificate approval",
            detail: "Route steps set by the administrator, e-signatures, QR token",
          },
          {
            label: "MySQL",
            detail:
              "Establishments, applications, units, inspections, payments, certificates, approval route",
          },
        ],
        integrations: [
          "Rule 1020 establishment registration as a prerequisite for an account",
          "Certificate documents generated from templates, with e-signatures placed on approval",
          "Email to the client with the signed certificate",
        ],
      },
      features: [
        {
          title: "Establishment enrollment",
          detail:
            "Companies register once and file against that record afterwards, so applications from the same establishment stay linked.",
        },
        {
          title: "Unit enrollment",
          detail:
            "Establishments register the individual machines and electrical installations being certified, with details like voltage, piping diameter and year of make, so an application is filed against a known unit rather than free text.",
        },
        {
          title: "Inspection and evaluation",
          detail:
            "Inspectors record mechanical and electrical inspection results, including a not-recommended path, and evaluators review them before payment. Each unit keeps its inspection history.",
        },
        {
          title: "Certificate issuance",
          detail:
            "Certificates are generated from a template with their own code. Company and unit details can be corrected on the issuance page first, so a typo in the application does not end up on the certificate.",
        },
        {
          title: "Approval with e-signatures",
          detail:
            "Each reviewer recommends or returns the certificate with remarks. On final approval it gets its code and validity, the signatory's e-signature and a QR token, and the signed copy is emailed to the client.",
        },
        {
          title: "Certificate approval route",
          detail:
            "An administrator sets the approval steps for certificates and the accounts that can act on each one. Who approves is kept apart from who signs, so a certificate still carries the RD's name and e-signature even when approval ends at the ARD.",
        },
        {
          title: "Certificate history",
          detail:
            "RD and admin accounts can look up every issued certificate, and the admin timeline shows which approval step made the final decision.",
        },
        {
          title: "Client transaction pages",
          detail:
            "Clients follow each application, read the office's transaction notes, and answer a feedback form.",
        },
        {
          title: "Maintenance mode",
          detail:
            "A switch that takes the client side offline during releases without touching the office side.",
        },
      ],
      challenges: [
        {
          title: "The approval route changed with every Regional Director",
          challenge:
            "Certificate approval was written into the code as Division Head, then ARD, then RD. Each new Regional Director wants a different route. The current one wants approval to end at the ARD's account, while the certificate still carries the RD's name and e-signature.",
          cause:
            "Who approves and who signs were treated as the same thing, and both were fixed in the code, with one screen and one query per approver.",
          solution:
            "Separated the two. The administrator sets the route on a settings page: ordered steps, each with one or more accounts that may act on it, while the name and e-signature on the certificate still come from the signatory record. Each certificate in approval stores the step it is waiting at, and that step is never past the last step of the current route. So when a step is removed, the certificates waiting there move to the new last step right away, and a timeline entry records the move. Approving or returning locks that row, so two approvers cannot act on the same step, and the server checks that the person acting is assigned to it.",
          tradeOff:
            "A shorter route applies to certificates already waiting, not only to new ones. That is what the office wants when a director changes, but it means a route change takes effect the moment it is saved.",
          result:
            "A new director's route is set up from the settings page without a code change, and nobody can approve a step they are not assigned to. The same design now runs certificate approval in the No Pending Case system.",
        },
        {
          title: "Approving and signing certificates inside the system",
          challenge:
            "A certificate needs the Division Head, the ARD and the RD to sign off, and the client needs a signed copy. The system could issue a certificate, but that review and signing still happened outside it.",
          cause:
            "Issuance was built as the last step, with nothing between the draft certificate and the signed one.",
          solution:
            "An approval chain inside TSIOS. Each reviewer recommends or returns the draft with remarks, and every action is logged. A return goes back to the regional focal person, who fixes it and forwards it again from the start. On final approval the certificate gets its code and validity, the signatory's e-signature is placed on it, a QR token is created so it can be verified, and the signed PDF is emailed to the client.",
          tradeOff:
            "The e-signature has to land in the right place on an official layout, for names and designations of different lengths. The name and designation are centered under each other and the signature is sized per signatory, which took a few rounds of adjustment against real certificates.",
          result:
            "Certificates are reviewed, signed and sent from the system, every return has a reason on record, and the client gets the signed copy by email.",
        },
      ],
      security: [
        "Establishment accounts are separate from office accounts, with no shared routes",
        "Every office route checks a permission, and queries are scoped to the user's province",
        "Approving or returning a certificate is checked on the server against the step it is waiting at, and only administrators can change the route",
        "Every approval and return is logged with the reviewer and the remarks",
        "Uploaded documents are validated by type and size and served through an authorized route, not from a public folder",
        "Certificates carry a QR token that can be checked against the issuance record",
        "Screenshots here show blank account names; no establishment or account data is published",
      ],
      outcomes: [
        "Establishments file and follow their applications online instead of by phone and counter visit.",
        "Certificates are reviewed, e-signed and sent to the client from the system.",
        "A change of Regional Director no longer needs a code change to reroute certificate approval.",
      ],
    },
  },

  {
    slug: "no-pending-case",
    name: "No Pending Case System",
    tagline:
      "Online application for the certification that a company has no pending labor case, from filing through verification to a certificate the applicant can track by reference.",
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
    keyChallenge:
      "The certificate says no record exists. To still stand behind that a year later, you have to store what was searched, not search again.",
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
        "Companies need a certification that they have no pending labor case before certain transactions. This system takes the application online, checks it against case records, routes it for approval, and issues a certificate the applicant can verify by reference number. It replaces a counter process with a manual records search.",
      users:
        "Establishments and contractors applying, records staff who verify, and the signing official who approves issuance.",
      problem: [
        "Verification meant searching records held in more than one place. Two staff could reach different answers for the same company.",
        "Certificates were prepared one at a time, which invites errors in the fields that matter: company name, date, reference.",
        "Nothing tied an issued certificate to the search that justified it, so it could not be checked later.",
        "A third party holding a printed certificate had no way to confirm it was real.",
        "Approval followed a fixed chain written into the code. Each new director wanted a different one, and every change meant a code change.",
      ],
      responsibilities: [
        "Full stack development",
        "Database design for applications, case records, verification results and the issuance log",
        "Verification and matching logic, including how partial matches are handled",
        "The certificate approval route the administrator sets up, and certificate generation",
        "Per-route access to case data",
        "Deployment and maintenance",
      ],
      architecture: {
        summary:
          "A pipeline. Each stage writes a record, so an issued certificate can be traced back to the exact verification behind it.",
        layers: [
          {
            label: "Public application",
            detail:
              "Structured intake, separate paths for inside and outside the region",
          },
          {
            label: "Verification",
            detail: "Deterministic search against case records, result stored",
          },
          { label: "Review", detail: "Records staff confirm or flag partial matches" },
          {
            label: "Approval",
            detail:
              "Steps and approvers set by the administrator; the last step approves issuance",
          },
          {
            label: "Issuance",
            detail: "Certificate generated with a reference number",
          },
          {
            label: "MySQL",
            detail: "Applications, case records, verification snapshots, issuance log",
          },
        ],
        integrations: [
          "Rule 1020 establishment registration for applicants inside the region",
        ],
      },
      features: [
        {
          title: "Structured intake",
          detail:
            "Company identity is captured as fields rather than free text, so verification has something reliable to match on.",
        },
        {
          title: "Reproducible verification",
          detail:
            "The same application against the same data gives the same result, and the result is stored rather than recomputed later.",
        },
        {
          title: "Partial matches go to a person",
          detail:
            "A near match is surfaced for review instead of being decided automatically.",
        },
        {
          title: "Approval before issuance",
          detail: "A certificate cannot be issued without an authorized approval.",
        },
        {
          title: "Approval route set by the administrator",
          detail:
            "The administrator decides the approval steps and which accounts act on each one from an Approval Management page, so a new director's preferred route needs no code change.",
        },
        {
          title: "Reference number tracking",
          detail:
            "Applicants follow their application, and third parties can confirm a certificate was issued.",
        },
        {
          title: "Per-route access",
          detail:
            "Most accounts can process applications without being able to read case records.",
        },
        {
          title: "Rule 1020 validation against the registration system",
          detail:
            "An applicant inside the region has to already be registered under Rule 1020. The number they give is checked live against that separate system before the application is accepted, rather than being taken on trust and rejected later.",
        },
      ],
      challenges: [
        {
          title: "Certifying that something does not exist",
          challenge:
            "The certificate says no record was found. If that is questioned a year later, re-running the search proves nothing, because the data has changed since.",
          cause:
            "The obvious implementation looks the answer up when you need it, which gives you today's data instead of the data at issuance.",
          solution:
            "Store the verification with the certificate: what was searched, what came back, and when. The certificate is immutable once issued. A correction supersedes it rather than editing it.",
          tradeOff:
            "More storage, and fixing a wrong certificate is heavier than editing one.",
          result:
            "Any certificate can be explained by exactly what was checked when it was issued.",
        },
        {
          title: "A new director, a new approval route",
          challenge:
            "Certificate approval followed a fixed chain in the code. Each new Regional Director or Assistant Regional Director wanted certificates to pass through them, or not, and each change was a code change.",
          cause:
            "The chain was built as one screen and one query per approver, so the route and the code were the same thing.",
          solution:
            "The same design as in TSIOS. The administrator sets the route on an Approval Management page: ordered steps, each with the accounts that may act on it. Each application in approval stores the step it is waiting at, and that step is never past the last step of the current route, so shortening the route moves waiting applications to the new last step right away. The server checks that the person approving is assigned to that step.",
          tradeOff:
            "A route change applies to applications already waiting, not just new ones. That is what the office wants when a director changes, but it takes effect the moment it is saved.",
          result:
            "A change of director is a settings change instead of a release, and nobody can approve a step they are not assigned to.",
        },
        {
          title: "Company names never match exactly",
          challenge:
            "The same company appears as 'ABC Manufacturing Inc.', 'ABC Mfg., Inc' and 'ABC MANUFACTURING INCORPORATED'. Exact matching misses real cases. Loose matching flags everyone.",
          cause:
            "Records were entered by different people over many years with no normalization at entry.",
          solution:
            "Normalize both sides before comparing: case, spacing, punctuation, common suffixes. Match on the normalized name plus a second identifying field. Anything that only partly matches goes to a review queue.",
          tradeOff:
            "Some applications take longer because a person has to look at them. For a document asserting no pending case, that is the right trade.",
          result:
            "Clear cases are automatic, unclear ones reach someone qualified to judge, and the system never quietly guesses.",
        },
        {
          title: "Checking a registration number that lives in another system",
          challenge:
            "An application from inside the region is only valid if the establishment is registered under Rule 1020. That registration is held by a different system, with its own database.",
          cause:
            "Copying the registration list across would be stale the day after it was copied, and asking staff to check by hand is the manual step the system was built to remove.",
          solution:
            "A second, read-only database connection used for exactly one question: does this Rule 1020 number exist and what establishment does it belong to. The answer is checked at the point the number is entered, so a wrong number is caught by the applicant rather than by a reviewer a week later.",
          tradeOff:
            "The application now depends on another system being reachable. If that database is down, applications from inside the region cannot be validated, and the coupling is to that system's schema rather than to an interface it promises to keep.",
          result:
            "Registration numbers are verified at entry, and nobody maintains a copy of a list that belongs to someone else.",
        },
        {
          title: "Verifying a certificate on paper",
          challenge:
            "Someone handed a printed certificate had no way to tell whether it was genuine.",
          cause:
            "The certificate was the only artifact and nothing linked it back to the system.",
          solution:
            "Each certificate carries a reference that can be looked up. The lookup confirms issuance, date and status. It does not return case details.",
          tradeOff:
            "Reference numbers can be guessed, so the lookup returns the minimum needed to confirm authenticity and nothing worth harvesting.",
          result:
            "Authenticity can be checked without a phone call, and without turning the page into a data source.",
        },
      ],
      security: [
        "Case records are restricted by route permission. Most accounts can process applications without reading them",
        "Authorization checked server-side on every route that touches case data",
        "Issued certificates are immutable. Corrections supersede",
        "The public verification page returns issuance status only",
        "Issuance and approval are recorded with actor and timestamp",
        "Approval actions are checked on the server against the step the application is waiting at, and only the Approval Management page can change the route",
        "Input validated and normalized at the boundary, queries parameterised",
        "Generated documents are served through an authorized route",
        "Screenshots here show test data with account names covered",
      ],
      outcomes: [
        "Applications are filed and tracked online instead of at a counter.",
        "Two staff verifying the same company reach the same answer.",
        "Every certificate is traceable to the verification behind it.",
        "A certificate presented by a third party can be confirmed.",
        "A change of director no longer needs a code change to reroute certificate approval.",
      ],
    },
  },

  {
    slug: "biometric-integration",
    name: "TUPAD BIOS",
    tagline:
      "Biometrics and offline registration for TUPAD, an emergency employment program: fingerprint matching through a local C# service, and a registration page that works without internet and prints beneficiary IDs on the spot.",
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
    keyChallenge:
      "Some work sites have no internet. Beneficiaries still have to be registered, fingerprinted and handed an ID that day, and every record has to reach the server later without clashing with ID numbers given out anywhere else.",
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
        "TUPAD is an emergency employment program. Beneficiaries are validated on site before they are paid, and a person must not be able to enroll twice under two records. My work covers two parts of BIOS: the fingerprint check, capturing a print from a DigitalPersona reader in the field and matching it against everyone already enrolled, and offline registration for sites with no internet, where beneficiaries are registered and given a printed ID on the day and synced later.",
      users:
        "Field staff running on-site validation, and the program itself, which depends on each beneficiary appearing exactly once.",
      teamNote:
        "The biometric integration and the offline registration are my work, along with the fix that keeps TUPAD ID numbers permanent. The rest of BIOS (the work programs, the beneficiary records, the approval chain across a dozen roles, the payroll documents) was built by others. This case study covers only my parts.",
      problem: [
        "Validation happens in the field, in front of the person. A duplicate has to be caught while they are still standing there, not reconciled afterwards.",
        "Browsers cannot talk to a USB fingerprint reader, and the vendor SDK is a native Windows library with no PHP binding.",
        "Records already existed from an earlier round of enrollment, saved without recording which finger had been scanned.",
        "Fingerprint data is sensitive, and a decision about where matching runs is a decision about where that data goes.",
        "Some work sites have no internet at all, but registration and ID release happen on the day.",
      ],
      responsibilities: [
        "Design of the bridge between the reader and the web application",
        "The local C# service: reader status, capture, template extraction, 1:N matching",
        "The browser-side client that drives it, including timeouts and cancellation",
        "The PHP side: template storage and the candidate query used for matching",
        "Handling the failures that actually happen in the field: no reader, service not running, poor scan, operator closing the dialog mid-capture",
        "Packaging the service as an installer so field offices could deploy it without a developer on site",
        "Offline registration: the offline page, on-device storage, reserved ID numbers, printed IDs and sync",
        "Keeping TUPAD ID numbers permanent and unique per work program",
      ],
      architecture: {
        summary:
          "The browser never touches the reader. A small C# tray application runs on the validation workstation, owns the vendor SDK, and exposes a narrow HTTP surface on localhost. The page asks PHP for the candidate templates, hands them to the local service along with the freshly captured print, and the local service does the matching with the native SDK. Offline registration is a separate page with its own service worker, so the main system is not affected.",
        layers: [
          {
            label: "DigitalPersona reader",
            detail: "DP4500, USB, attached to the validation laptop",
          },
          {
            label: "Local C# service",
            detail:
              "Tray app on 127.0.0.1. Owns the SDK: status, capture, extract, match",
          },
          {
            label: "Browser",
            detail: "Calls localhost for the device work and the server for the data",
          },
          {
            label: "Slim API",
            detail: "Stores templates and serves the candidate set for a given finger",
          },
          {
            label: "MySQL",
            detail: "Templates against beneficiary records. No images",
          },
        ],
        integrations: [
          "A second capture path: a WebSDK fingerprint image can be sent to the local service and converted into a template",
          "Face enrollment alongside fingerprint, with fully enrolled records protected from deletion",
          "An offline registration page: a service worker keeps it available without internet, IndexedDB holds the records, and sync sends them through the normal upload and review",
        ],
      },
      features: [
        {
          title: "Reader status before anything else",
          detail:
            "The client asks the local service whether it is running and whether a reader is attached, with a short timeout, so the operator is told the reader is unplugged instead of watching a dialog hang.",
        },
        {
          title: "Capture on the device",
          detail:
            "A capture blocks until a finger is placed, up to a configured timeout, and returns a template with a quality score rather than an image.",
        },
        {
          title: "1:N matching against everyone enrolled",
          detail:
            "The captured print is compared against the stored candidates using the vendor SDK, which returns the matched record, the score and the threshold it was judged against.",
        },
        {
          title: "Finger-aware candidate selection",
          detail:
            "When the finger being scanned is known, the candidate set is narrowed to templates stored for that same finger, plus the older records where the finger was never recorded.",
        },
        {
          title: "A second way in",
          detail:
            "A fingerprint image captured through the browser SDK can be handed to the local service and converted into a template, so a workstation without the tray app capture path is not stuck.",
        },
        {
          title: "Cancellation",
          detail:
            "Closing the dialog mid-capture tells the service to stop, so the reader is not left waiting for a finger that is not coming.",
        },
        {
          title: "Packaged for people who are not developers",
          detail:
            "The service ships as an installer, so a field office can set up a validation laptop themselves rather than waiting for someone to come and configure it.",
        },
        {
          title: "Registration without internet",
          detail:
            "The offline page keeps working with no connection: the form, the photo, the fingerprint through the local service, the next ID number and a printed card-size ID with a QR code.",
        },
        {
          title: "Reserved ID numbers",
          detail:
            "While online, the focal person reserves a block of TUPAD ID numbers for a municipality. Each offline save takes the next one, so IDs printed on site never clash with numbers given out by the normal upload.",
        },
        {
          title: "Sync through the normal review",
          detail:
            "Synced records go through the same upload queue as everyone else's, so validation and review do not change. The printed ID number and QR code stay valid once the record is in.",
        },
        {
          title: "Knowing when it is really online",
          detail:
            "A laptop on Wi-Fi without internet still reports itself online. The page checks whether the server answers, on load, on network changes and every 30 seconds, and syncs as soon as it does.",
        },
      ],
      challenges: [
        {
          title: "Getting a browser to talk to a USB device",
          challenge:
            "The validation screen is a web page. The reader is only reachable through a native Windows SDK.",
          cause:
            "Browsers deny pages direct device access, correctly, and the vendor SDK has no web or PHP equivalent.",
          solution:
            "A small C# tray application on the validation workstation owns the device and exposes a handful of endpoints bound to localhost. The page posts to it for anything involving the reader, and posts to the normal API for anything involving data.",
          tradeOff:
            "Every validation laptop now needs software installed and running, which is one more thing to deploy and support in the field. In exchange the device code stays on the machine that physically has the device, and the web application stays an ordinary web application.",
          result:
            "Staff validate from the browser they already use, and the device-specific code sits in one small service that can be replaced without touching the web side.",
        },
        {
          title: "Matching has to run where the SDK is",
          challenge:
            "Comparing two fingerprint templates is the vendor SDK's job. The SDK is native. The server is PHP.",
          cause:
            "There is no PHP binding for the matcher, and reimplementing biometric matching is not something to attempt.",
          solution:
            "The server stores templates and answers one question: which candidates should this print be compared against. The browser fetches that set and hands it to the local service along with the probe, and the service does the comparison with the native matcher, returning the matched record, the score and the threshold.",
          tradeOff:
            "This is the weak point. The candidate templates leave the server and pass through the browser into the local service, and the server cannot independently confirm a match. It is told the answer. A modified client could lie about the result. For on-site validation with staff operating the machine that is an accepted risk, but it is a real one, and a server-side matcher would be the fix if the threat model ever changed.",
          result:
            "Duplicate enrollments are caught in the field, in front of the person, using the matcher the vendor supports.",
        },
        {
          title: "Older records did not say which finger had been scanned",
          challenge:
            "Matching a right index finger against a left thumb produces a confident non-match. Earlier enrollments were saved without recording the finger at all, so a straight same-finger comparison would silently skip every one of them.",
          cause:
            "The finger position was added to the enrollment flow after records already existed.",
          solution:
            "The query narrows to the same finger when one is given, but keeps the rows where the finger was never recorded. Saving a template now also fills in the finger, so the old rows clear out as people are re-enrolled.",
          tradeOff:
            "A larger candidate set means more comparisons and a slightly higher chance of a borderline score against a finger that was never the right one to compare. The alternative was quietly not checking older beneficiaries at all, which is worse.",
          result:
            "New enrollments get a precise comparison, old ones still get checked, and the untidy rows clear themselves over time rather than needing a migration.",
        },
        {
          title: "A capture blocks, and people close dialogs",
          challenge:
            "A capture waits for a finger. If the operator gives up and closes the dialog, the reader is still waiting and the next capture starts in a bad state.",
          cause:
            "The natural implementation is a request that blocks until the device returns, with nothing on the other end when the user walks away.",
          solution:
            "Every call to the local service carries a timeout suited to what it does (short for a status check, long for a capture that waits on a person), and closing the dialog sends an explicit stop so the service abandons the capture.",
          tradeOff:
            "More states to handle in the client than a single blocking call, and the timeouts are values that had to be chosen rather than derived.",
          result:
            "An unplugged reader is reported in seconds instead of hanging, and abandoning a capture leaves the device ready for the next person.",
        },
        {
          title: "Registering beneficiaries where there is no internet",
          challenge:
            "Some work sites have no connection, but beneficiaries are registered and given their TUPAD ID on the day. A web page that needs the server for every save, and ID numbers that the server hands out at upload, both stop working there.",
          cause:
            "Everything assumed a connection: the page, the save, and the numbering.",
          solution:
            "A separate offline page with its own service worker, which serves the files from the network when it can and from the cache when it cannot, and carries a version so a new release gets past the hosting CDN's week-long cache. Records live in IndexedDB and are written to disk before Save finishes, so one survives the laptop losing power right after. While still online, the focal person reserves a block of ID numbers for the municipality, starting above the work program's target so it never meets the numbers the Excel upload gives out. Each save takes the next number in the same transaction as the record and prints the ID with a random QR token. When the server is reachable again, sync sends the records through the normal upload queue, then saves the photos and fingerprints and deletes them from the laptop.",
          tradeOff:
            "Until it syncs, the data lives in one browser profile on one laptop; clearing site data or using a private window loses it. An ID is printed before anyone reviews the record, so scanning an ID whose record is still being processed says so, and one whose record was cancelled or removed shows as void.",
          result:
            "Sites without internet register beneficiaries and hand out IDs on the day, and the records join the normal review later without any number clashing.",
        },
        {
          title: "Duplicate fingerprints could slip through the sync",
          challenge:
            "On-site validation matches a new fingerprint against everyone enrolled through the local DigitalPersona service. The first version of the offline sync only used the server's simpler image check, so a duplicate fingerprint could pass.",
          cause: "The sync reused the fallback check instead of the real one.",
          solution:
            "Sync now runs the same 1:N match first, including against records saved earlier in the same sync. If the local service is not running, the record is marked as checked by the server only, so the person's identity can be confirmed in on-site validation.",
          tradeOff:
            "Sync is slower, and the full check needs the local service running on the laptop that syncs.",
          result:
            "Offline records get the same duplicate check as on-site ones, or are clearly marked when they could not.",
        },
      ],
      security: [
        "The local service binds to the loopback address and is not reachable from the network",
        "The 1:N match runs on fingerprint templates in the local service",
        "On the offline laptop, photos and fingerprints are deleted as soon as the server has saved them",
        "A printed ID whose record was cancelled or removed in review shows as void when its QR code is scanned",
        "Template storage and the candidate query sit behind the application's normal session and role checks",
        "Candidate templates do reach the browser and the local service during matching. That is a deliberate consequence of the SDK being native, and it is the main thing I would revisit if this were rebuilt",
        "The server does not independently verify a match result. A server-side matcher would be required to close that gap",
        "Fully enrolled records are protected from deletion, so a validated beneficiary cannot be quietly removed and re-added",
        "The screenshots show an empty registration form and a test record. No real biometric data, template or beneficiary record appears in this portfolio",
      ],
      outcomes: [
        "A duplicate enrollment is caught on site, while the person is still present, rather than surfacing later in a payout list.",
        "Field staff work from the browser they already use; the device code lives in one small service on the laptop.",
        "Sites without internet register beneficiaries and hand out printed IDs on the day, then sync when they are back online.",
        "Offline records get the same duplicate fingerprint check as on-site ones, or are marked when they could not.",
        "Records enrolled before the finger position was captured are still checked rather than silently skipped.",
        "Deployed across DOLE Regional Office IV-A field offices, installed by the offices themselves.",
      ],
    },
  },

  // Other systems
  {
    slug: "aep",
    name: "AEP",
    tagline:
      "Alien Employment Permit applications, from filing through pre-evaluation and evaluation to ID card release, with exclusion and exemption handled as separate paths and a pickup schedule at the end.",
    type: "Regulatory workflow system",
    role: "Full Stack Developer",
    period: "2025 - 2026",
    organization: "DOLE Regional Office No. IV-A (CALABARZON)",
    status: "In production",
    technologies: ["PHP", "MySQL", "JavaScript", "TCPDF", "PhpWord"],
    keyChallenge:
      "Three application types share one pipeline but diverge at evaluation, and the output is a generated document with a pickup schedule attached to it.",
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
    keyChallenge:
      "A fixed government survey instrument that cannot be changed, feeding reporting that has to slice by office, service, period and respondent type.",
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
    keyChallenge:
      "Dozens of program forms with different shapes, encoded by LGU staff outside the office, rolling up to one regional figure.",
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
