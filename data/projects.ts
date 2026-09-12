import type { Project } from "./types";

// Internal government systems. No production code, schema, endpoint or record is
// reproduced here. Code samples are rewritten from scratch for this site.
// Screenshots use test data; anything identifying was covered before upload.

export const projects: Project[] = [
  {
    slug: "itsd",
    name: "IT Service Desk",
    tagline:
      "Ticketing for the IT unit. Staff across the regional and provincial offices file a ticket, IT assigns and works it, and the reporter can follow it without an account.",
    type: "Internal ticketing system",
    role: "Full Stack Developer",
    period: "2026 — Present",
    organization: "DOLE Regional Office No. IV-A (CALABARZON)",
    status: "UAT",
    technologies: [
      "Laravel 12",
      "PHP 8.2",
      "Inertia.js",
      "Vue 3",
      "TypeScript",
      "Tailwind CSS",
      "MySQL",
      "Pest",
    ],
    metrics: ["HRIS-backed login", "7 ticket states", "public tracking", "Pest tests"],
    keyChallenge:
      "Identity lives in the HRIS, not here. Logging in means verifying against another system's database without copying its users, and without inheriting its habits.",
    featured: true,
    confidential: true,
    screenshots: [
      {
        src: "/projects/itsd-dashboard.png",
        width: 1498,
        height: 845,
        alt: "Service desk dashboard with ticket counts by status and a list of the oldest unresolved tickets",
        caption: "Ticket queue with the oldest unresolved surfaced first. Test data.",
      },
    ],
    caseStudy: {
      overview:
        "The IT unit supports every office in the region. This is where those requests land. An employee files a ticket against a category and their office, IT assigns it, works it and resolves it, and every step is recorded. It is the newest of the systems here and the only one built on Laravel with Inertia and Vue.",
      users:
        "Any employee filing a request, IT staff who pick tickets up and resolve them, and administrators who manage users, offices and categories.",
      problem: [
        "Requests reached IT through whatever channel was nearest. Nothing recorded what was asked, who took it, or whether it was finished.",
        "People who reported a problem had no way to check on it short of asking again.",
        "A new system normally means a new set of accounts to create and keep in step with HR as people join, move office or leave.",
      ],
      responsibilities: [
        "Full stack development: Laravel 12 back end, Inertia with Vue 3 and TypeScript on the front",
        "Schema design for tickets, activity logs, attachments, categories and offices",
        "HRIS-backed authentication over a second, read-only database connection",
        "The ticket status machine and its transition rules",
        "Role middleware and per-action policies",
        "In-app notifications, attachments and the public tracking page",
        "Reports, CSV export and the dashboard queues",
        "Feature tests in Pest covering authorization and the transitions",
      ],
      architecture: {
        summary:
          "A Laravel application with Inertia instead of a separate API. Controllers return typed props straight to Vue pages, so there is no second set of endpoints to keep in sync and no client-side router to maintain. Ticket behaviour lives in service classes rather than controllers, and authentication reaches sideways into the HRIS database rather than keeping its own users.",
        layers: [
          {
            label: "Browser",
            detail:
              "Vue 3 single-file components in TypeScript, Tailwind and Radix primitives",
          },
          {
            label: "Inertia",
            detail:
              "Controllers return props to pages. No JSON API, no separate client router",
          },
          {
            label: "HTTP layer",
            detail:
              "Routes, then auth, then role middleware on the admin and reporting groups",
          },
          {
            label: "Authorization",
            detail:
              "Policies per action, with an admin bypass registered once in a Gate",
          },
          {
            label: "Services",
            detail:
              "Workflow and transitions, ticket numbering, notification fan-out, HRIS login",
          },
          {
            label: "Eloquent / MySQL",
            detail:
              "Tickets, activity logs, attachments, counters, categories, offices",
          },
        ],
        integrations: [
          "A second, read-only MySQL connection to the HRIS database, used for login and office sync",
          "Local disk storage for attachments, outside the web root",
          "Database-backed notifications for in-app alerts",
        ],
      },
      features: [
        {
          title: "Sign in with HRIS credentials",
          detail:
            "There is no separate password to remember. The login verifies against the HRIS account, then creates or refreshes a local mirror of the user and their office. Nobody in HR has to provision anything.",
        },
        {
          title: "Status machine with explicit transitions",
          detail:
            "Seven statuses and one map of what may follow what. Anything not on the map is rejected before it reaches the database, whichever screen it came from.",
        },
        {
          title: "Assignment and reassignment",
          detail:
            "Assigning an open ticket moves it to assigned and stamps the time. Reassignment records who it moved from and to.",
        },
        {
          title: "Public tracking link",
          detail:
            "Each ticket carries an unguessable token. The page behind it shows status, dates and a generalised timeline, and nothing else.",
        },
        {
          title: "Activity log on every change",
          detail:
            "Status changes, assignment, comments and attachments each write a row with the actor, the old value and the new one, inside the same transaction as the change.",
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
          title: "Dashboard queues and reports",
          detail:
            "Counts by status, the oldest unresolved tickets first, and a CSV export for the ones that end up in a report.",
        },
      ],
      challenges: [
        {
          title: "Two systems, one set of people",
          challenge:
            "The service desk needed to know who everybody is, which office they belong to and whether they still work here. The HRIS already knows all three.",
          cause:
            "Giving the service desk its own user table would mean provisioning every employee twice and keeping the copy in step forever. It would drift within a month.",
          solution:
            "A second database connection to the HRIS, read-only and used for one thing. Login verifies the submitted password against the HRIS hash, and only on success does the service desk create or refresh a small local row for that person: name, username, office, and its own role and active flag. The HRIS is the authority on identity. The service desk stays the authority on what you can do here.",
          tradeOff:
            "The service desk is now coupled to another system's schema and to its availability. If the HRIS is unreachable, nobody can log in. The lookup is wrapped so that a failure is reported and treated as a failed login rather than a stack trace, but the dependency is real and it is the price of not maintaining a second directory.",
          result:
            "No second password for staff, no provisioning step, and someone's office follows them automatically. A local deactivation still overrides a valid HRIS login, so the service desk can lock someone out without touching HR data.",
        },
        {
          title: "A legacy column that means the opposite of what it says",
          challenge:
            "In the HRIS, an account row with is_active = 0 is the active one. Reading it the obvious way logs in exactly the wrong people.",
          cause:
            "Inherited semantics. The column has meant that for years and other systems depend on it, so it is not something to fix from the outside.",
          solution:
            "Keep the query faithful to the legacy meaning and confine it. One read-only model owns every HRIS query, with a docblock stating the inversion in plain terms. That convention never crosses the boundary: the service desk's own is_active means what it looks like.",
          tradeOff:
            "The same column name now means two opposite things in one codebase, which is exactly the sort of thing that bites someone later. The mitigation is that only one class can see the legacy side, and it says so at the top.",
          result:
            "Everyone working on the service desk reads is_active the normal way and is right. The one place where that is false is documented at the point where it matters.",
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
            "Ticket creation serialises on one row per year. For this volume that is nothing, but it means the lock must not be held while doing unrelated work, so the numbering runs in its own short transaction rather than inside a longer one.",
          result:
            "Numbers are unique and gapless within a year, and the constraint is enforced by the database rather than by hoping.",
        },
        {
          title: "Status rules were spreading across controllers",
          challenge:
            "Assigning, resolving, putting on hold and reopening each had to set the status, stamp the right timestamps and write a log row. Each screen was growing its own version.",
          cause:
            "The endpoints were built one at a time, and the shared shape only became obvious once there were several.",
          solution:
            "One service holds a map of which status may follow which, and every path goes through it. It rejects an illegal move before anything is written, sets the timestamps belonging to the target status, and writes the activity row in the same transaction as the change. Notifications fire after the transaction commits, not inside it.",
          tradeOff:
            "New statuses mean editing one central map, and a genuinely odd one-off transition has to be expressed in its terms rather than hacked into a controller. That is the trade, and it is worth it.",
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
            "Each ticket gets a long random token and a public page addressed by it. That page builds its response from an explicit list of fields: number, subject, status, priority, office, category, dates, and a timeline where each entry is reduced to a generic label.",
          tradeOff:
            "Anyone with the link sees that much, so the question is what goes in the response, not who is asking. Staff names, internal notes, comments and the resolution text are left out on purpose. It makes the public page less useful than the real one, which is the point.",
          result:
            "The reporter can answer their own question, and the page cannot leak who is working on what or what was said internally.",
        },
      ],
      security: [
        "Passwords are verified against the HRIS hash. The service desk stores a random unusable password so there is no second credential to steal",
        "A local deactivation overrides a successful HRIS login, so someone can be locked out here without touching HR records",
        "The HRIS connection is read-only by convention and used only for login and office lookup. Nothing writes to it",
        "An HRIS outage is caught and reported as a failed login rather than surfacing as an error page",
        "Role middleware guards the admin and reporting route groups; policies check every ticket action; the admin bypass is registered once rather than repeated in each policy",
        "The ticket list is scoped in the query: a requestor sees their own tickets, not a filtered view of everyone's",
        "Attachment downloads check that the attachment belongs to the ticket in the URL before checking anything else, which closes the id-swap",
        "Uploads are stored outside the web root under a generated filename; the original name is kept only as a display label",
        "The public tracking page returns a fixed list of fields and a generalised timeline. Staff names, comments and resolution text are never in the payload",
        "The first administrator is seeded from environment config, and that mechanism promotes but never demotes",
        "No system is ever fully secure. This is the set of controls in place, not a guarantee",
      ],
      database: {
        note: "Generalised. Representative of the shape, not the production schema.",
        entities: [
          {
            name: "users",
            purpose:
              "Local mirror of an HRIS person, plus the role and active flag that belong to this system.",
            notableFields: [
              "username",
              "role",
              "office_id",
              "is_active",
              "hris_user_id",
            ],
            relations: [
              "belongs to offices",
              "has many tickets as requestor and as assignee",
            ],
          },
          {
            name: "tickets",
            purpose: "The request itself, and its lifecycle timestamps.",
            notableFields: [
              "ticket_number",
              "public_token",
              "status",
              "priority",
              "date_reported",
              "date_assigned",
              "date_resolved",
            ],
            relations: [
              "belongs to users twice, offices and categories",
              "has many comments, attachments and activity logs",
            ],
          },
          {
            name: "ticket_activity_logs",
            purpose: "Append-only history: actor, action, old value, new value.",
            notableFields: ["ticket_id", "user_id", "action", "old_value", "new_value"],
            relations: ["belongs to tickets and users"],
          },
          {
            name: "ticket_attachments",
            purpose:
              "Uploaded files, with the stored path kept apart from the display name.",
            notableFields: ["ticket_id", "path", "original_name", "mime", "size"],
            relations: ["belongs to tickets and users"],
          },
          {
            name: "ticket_counters",
            purpose:
              "One row per year. The row that gets locked when a number is issued.",
            notableFields: ["year", "last_number"],
            relations: ["standalone"],
          },
          {
            name: "offices / ticket_categories",
            purpose:
              "Reference data. Offices are synced from the HRIS with an exclusion list.",
            notableFields: ["code", "name", "is_active"],
            relations: ["referenced by tickets"],
          },
        ],
        considerations: [
          "Unique index on ticket_number, and another on the public token, so both are enforced by the database rather than by the code that generates them.",
          "Unique index on the counter year. That is what makes two requests creating the row at once safe.",
          "Composite index on (status, priority) — the queue is almost always read that way.",
          "Index on created_at for the ageing queries behind the dashboard.",
          "Restrictive deletes on the references a ticket depends on, so history cannot be orphaned by tidying up a category.",
          "Activity rows are written in the same transaction as the change they describe.",
        ],
      },
      api: {
        note: "Representative. Inertia routes returning props, not a JSON API.",
        endpoints: [
          {
            method: "POST",
            path: "/tickets",
            purpose: "File a ticket. Number is issued here",
            auth: "Any authenticated user",
          },
          {
            method: "POST",
            path: "/tickets/{ticket}/assign",
            purpose: "Assign or reassign",
            auth: "IT staff or admin, and not on a terminal ticket",
          },
          {
            method: "POST",
            path: "/tickets/{ticket}/status",
            purpose: "Move the ticket, checked against the transition map",
            auth: "Policy decides per target status",
          },
          {
            method: "POST",
            path: "/tickets/{ticket}/resolve",
            purpose: "Resolve with a resolution note",
            auth: "IT staff or admin",
          },
          {
            method: "GET",
            path: "/tickets/{ticket}/attachments/{attachment}/download",
            purpose: "Stream a file after checking it belongs to the ticket",
            auth: "Anyone who may view the ticket",
          },
          {
            method: "GET",
            path: "/track/{token}",
            purpose: "Public status page",
            auth: "None. The token is the only credential",
          },
        ],
        conventions: [
          "Authorization is checked per action through a policy, not once at the top of a controller.",
          "An illegal status change is a validation error naming the from and to states, not a generic failure.",
          "Side effects that touch several tables run in a transaction; notifications fire after it commits.",
          "Reads are scoped in the query rather than filtered after fetching.",
        ],
      },
      code: [
        {
          title: "One map of legal transitions",
          language: "php",
          description:
            "Rewritten for this page. Every path that changes a status goes through the same guard, so an illegal move cannot be reached from any screen.",
          code: `private function transitions(): array
{
    return [
        Status::Open->value       => [Status::Assigned, Status::Cancelled],
        Status::Assigned->value   => [Status::InProgress, Status::OnHold, Status::Open, Status::Cancelled],
        Status::InProgress->value => [Status::OnHold, Status::Resolved, Status::Cancelled],
        Status::OnHold->value     => [Status::InProgress, Status::Cancelled],
        Status::Resolved->value   => [Status::Closed, Status::InProgress],
        Status::Closed->value     => [Status::InProgress],
        Status::Cancelled->value  => [],
    ];
}

public function changeStatus(Ticket $ticket, Status $to, User $actor): void
{
    $from = $ticket->status;

    if ($from === $to || ! in_array($to, $this->transitions()[$from->value] ?? [], true)) {
        throw ValidationException::withMessages([
            'status' => "Cannot move a ticket from {$from->label()} to {$to->label()}.",
        ]);
    }

    DB::transaction(function () use ($ticket, $from, $to, $actor) {
        $ticket->status = $to;
        $this->stampDatesFor($ticket, $from, $to);
        $ticket->save();

        $this->log($ticket, $actor, 'status_changed', $from->value, $to->value);
    });

    // After the commit, so a failed notification cannot roll back the change.
    $this->notifier->fire('status_changed', $ticket->refresh(), $actor);
}`,
        },
        {
          title: "Ticket numbers that survive concurrency",
          language: "php",
          description:
            "Rewritten for this page. The unique index makes creating the row safe under a race; the row lock makes incrementing it safe.",
          code: `public function next(int $year): string
{
    return DB::transaction(function () use ($year) {
        // Unique index on year: if two requests race here, one wins and the
        // other simply reads the row that already exists.
        TicketCounter::firstOrCreate(['year' => $year], ['last_number' => 0]);

        // The second caller blocks here until the first commits.
        $counter = TicketCounter::where('year', $year)->lockForUpdate()->first();

        $counter->last_number++;
        $counter->save();

        return sprintf('IT-%d-%05d', $year, $counter->last_number);
    });
}`,
        },
        {
          title: "The public page decides what it will say",
          language: "php",
          description:
            "Rewritten for this page. The payload is built field by field, so adding a column to the table never quietly publishes it.",
          code: `public function show(string $token): Response
{
    $ticket = Ticket::query()
        ->where('public_token', $token)
        ->with(['office:id,name,code', 'category:id,name', 'activityLogs'])
        ->firstOrFail();

    return Inertia::render('Public/Tickets/Status', [
        'ticket' => [
            'ticket_number' => $ticket->ticket_number,
            'subject'       => $ticket->subject,
            'status'        => $ticket->status->label(),
            'priority'      => $ticket->priority->label(),
            'office'        => $ticket->office?->name,
            'date_reported' => $ticket->date_reported?->toDateTimeString(),
            'date_resolved' => $ticket->date_resolved?->toDateTimeString(),

            // Generic labels only. No staff names, no comments, no resolution text.
            'activity' => $ticket->activityLogs->map(fn ($log) => [
                'label'      => $this->publicLabel($log->action),
                'created_at' => $log->created_at?->toDateTimeString(),
            ]),
        ],
    ]);
}`,
        },
      ],
      outcomes: [
        "Requests to IT are recorded, assigned and closed in one place, with a number the reporter can quote.",
        "Staff sign in with the credentials they already have. There is no account to provision and no second password.",
        "Every ticket has a history: who acted, what changed, and when.",
        "A reporter can check their own ticket without logging in, and without seeing anything internal.",
        "Feature tests cover the authorization rules and the transition map, so the rules that matter are the ones under test.",
        "[Add a figure you can verify once it has been running a while: tickets handled, offices using it, time to first response.]",
      ],
    },
  },
  {
    slug: "prams",
    name: "PRAMS",
    tagline:
      "HRIS for DOLE CALABARZON. Leave, overtime, CTO and office orders route through one approval engine, and the forms that come out the other end are the official government ones.",
    type: "HRIS / workflow platform",
    role: "Full Stack Developer",
    period: "2025 — Present",
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
    ],
    metrics: [
      "~500 employees",
      "6 field offices",
      "4 document types",
      "PDS generation",
    ],
    keyChallenge:
      "Four document types on one approval engine, and every one of them ends in a government form that has to still be correct when it is reprinted two years later.",
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
        "PRAMS is what employees across the regional office and its provincial field offices use to file leave, compensatory time off, overtime and office orders, and what HR uses to keep employee records, work schedules and leave credits. It also produces the paperwork: approved applications print as the official forms, and an employee can generate their own Personal Data Sheet from the profile they maintain.",
      users:
        "Roughly 500 employees across the regional office and six field offices: staff filing requests and maintaining their own profile, supervisors and office heads approving, and HR staff who manage records, credits, schedules and reports.",
      problem: [
        "Requests moved between offices on paper. Nobody could say where a form was or who was holding it.",
        "Leave and CTO credits lived in spreadsheets, so the number an employee believed and the number HR computed did not always agree.",
        "Approval authority moves constantly. People go on leave, posts sit vacant, officers are designated in an acting capacity. On paper you write a name on a line. In software that has to be modelled.",
        "The Personal Data Sheet was filled in by hand, every time it was needed, from information the office already held.",
        "There was no record of who approved what, or when.",
      ],
      responsibilities: [
        "Full stack development on the Slim and MySQL application",
        "Database design for applications, approval routes, credits and audit records",
        "The approval workflow engine, delegation and signatory resolution",
        "Role-based access control and the middleware stack behind it",
        "Official form generation: PDS, leave, overtime, CTO and office order documents",
        "Bulk Excel import and export for employee records and credits",
        "In-app notifications and live approval queues",
        "Deployment, production support and bug fixes",
      ],
      teamNote:
        "[Say here whether you built this alone or with others, and which parts were yours. It is the largest system in this portfolio, so reviewers will ask.]",
      architecture: {
        summary:
          "A Slim 4 application behind a PSR-15 middleware stack, serving a JSON API to a front end of about ninety AMD modules. Slim gives you routing and PSR-7 and very little else, so the layering is built rather than inherited: route files per module, middleware for the cross-cutting rules, DTOs and validators at the boundary, services for the business logic, and models over PDO.",
        layers: [
          {
            label: "Browser",
            detail:
              "Server-rendered pages with AMD JavaScript modules, one per feature area",
          },
          {
            label: "Middleware",
            detail:
              "Session, active-user, CSRF, role, rate limit, security headers, maintenance mode",
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
              "Workflow, delegation, overtime computation, credit ledgers, document generation",
          },
          {
            label: "Models over PDO",
            detail:
              "Prepared statements throughout, transactions around multi-table writes",
          },
          {
            label: "MySQL",
            detail: "Applications, approval routes, credits, audit and login logs",
          },
        ],
        integrations: [
          "PhpSpreadsheet for the official Excel form templates and for bulk import and export",
          "TCPDF, PhpWord, wkhtmltopdf and headless LibreOffice for the printable documents",
          "PHPMailer for outbound mail",
          "Server-Sent Events on the approval screens, interval polling for the notification badge",
          "Attendance data used to check overtime against work schedules",
        ],
      },
      features: [
        {
          title: "Multi-level approvals across four document types",
          detail:
            "Leave, overtime, CTO and office orders each walk an ordered route. Every step records the approver, the decision, the time and any remarks. A rejection returns the request to the filer with the reason attached.",
        },
        {
          title: "Delegated approval authority",
          detail:
            "An approver hands their authority to someone else for a date range. The engine resolves who may act at the moment the decision is submitted, not when the request was filed.",
        },
        {
          title: "Personal Data Sheet generation",
          detail:
            "CS Form No. 212 filled from the employee's own profile: the official spreadsheet template populated section by section, passport photo and e-signature placed into their boxes, and repeating sections that overflow onto cloned annex pages when somebody has more children or eligibilities than the form allows for.",
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
            "Leave, CTO and COC balances are computed from credit and debit rows rather than a stored number, so correcting a record recomputes the balance instead of leaving it wrong.",
        },
        {
          title: "Work schedules and overtime rules",
          detail:
            "An employee's schedule decides which hours count as overtime, how a half day is deducted, and how holidays and special working days are treated.",
        },
        {
          title: "Three kinds of log",
          detail:
            "Approval history, an audit log of record changes, and a login log, kept separate because they answer different questions.",
        },
        {
          title: "Bulk import and export",
          detail:
            "Employee records and credits move in and out as spreadsheets, validated row by row so a bad file reports every problem at once instead of stopping at the first.",
        },
        {
          title: "Live approval queues and notifications",
          detail:
            "The approval screen updates itself while you are looking at it. The notification badge polls. The two use different mechanisms on purpose, which is the trade-off below.",
        },
        {
          title: "Chat, calendar and reports",
          detail:
            "In-app messaging, a calendar of filed requests, holidays and suspensions, and workforce reports exported for the ones that end up on paper.",
        },
      ],
      challenges: [
        {
          title: "A form reprinted a year later showed the wrong signatory",
          challenge:
            "Approved applications print with the approving officer's name and designation. Those were resolved live from whoever currently holds the post, so when an office head changed, every historical form silently reprinted with the new person's name under an old approval.",
          cause:
            "Treating 'who signs this' as a lookup against current data, when it is really a fact about a moment that has already passed.",
          solution:
            "A snapshot table. At the moment a decision is recorded, the printed name and designation for each signatory slot are written alongside the application, keyed by document type, id and slot. The print path reads the snapshot. Where no snapshot exists it falls back to the live resolver, so forms approved before the table existed still print.",
          tradeOff:
            "The same information now lives in two places, and a genuine correction to someone's designation will not propagate to forms already approved. That is the intended behaviour for a signed document, but it does mean a typo caught late has to be fixed as a deliberate act rather than by editing the employee record.",
          result:
            "A reprint matches what was signed. The fallback meant the change shipped without a data migration over historical records.",
        },
        {
          title:
            "The Personal Data Sheet is a frozen government form that keeps changing",
          challenge:
            "The PDS is a fixed government form. The layout, the merged cells and the checkbox positions are set by the CSC, and the filled-in copy has to match the official template exactly. Then a new revision comes out and everything moves.",
          cause:
            "Two incompatible pressures: the output must match a document that is not ours to change, and the form does change, on its own schedule, while old revisions stay valid for records already filed.",
          solution:
            "Each revision is its own service, resolved through a factory keyed by revision year. Nothing is shared by inheritance between revisions. Adding one means copying the latest service, applying the template's changes, and registering it. Every service takes the same input, an employee id, and pulls its data through the one profile service that already aggregates every section.",
          tradeOff:
            "Deliberate duplication. Two revisions means two near-identical files of over a thousand lines each, and a bug in shared logic has to be fixed in both. Factoring out the common parts would couple revisions that are supposed to be frozen, and the next revision would start bending the abstraction. Duplication was the cheaper mistake.",
          result:
            "A new revision does not touch the old one. Records generated under a previous revision keep generating under it.",
        },
        {
          title: "Fitting a person into a form that assumes a smaller life",
          challenge:
            "The PDS gives you a fixed number of rows for children, eligibilities, work experience and training. People routinely have more than fits.",
          cause:
            "It is a paper form. Overflow on paper is an extra sheet, which is a layout problem rather than a data problem.",
          solution:
            "Repeating sections write until the template runs out of rows, then clone the section's annex template and continue on a fresh page, for as many pages as the data needs. Children are the exception and stay on the main sheet.",
          tradeOff:
            "The cell coordinates are derived from the template's own labels and merged ranges rather than hard-coded by eye, which makes the code harder to read than a list of cell references would be. It also means a revision that moves a label is a change in one place instead of fifty.",
          result:
            "Somebody with eleven training records gets a PDS that is correct and printable, without anyone retyping it.",
        },
        {
          title: "Server-Sent Events, kept but put on a short leash",
          challenge:
            "Approvers want the queue to update while they are looking at it. Server-Sent Events do that well. They also hold one PHP worker per open connection, and the application runs on shared hosting with a small fixed worker pool. Staff leave tabs open all day.",
          cause:
            "The cost of SSE is not per update, it is per open tab per minute. A notification badge that every user has open all day is the worst possible thing to put behind it. An approval queue that somebody is actively working is the best.",
          solution:
            "Split them. The notification badge polls a cheap endpoint, and that interval went from three seconds to twenty once it was clear the badge does not need second-level freshness. Live streaming stayed only on the approval screens, and the client closes the stream the moment it is not earning its keep: on navigating away from the route, on the tab being hidden, on unload. It reopens when the tab is visible again. A single shared instance stops a second stream ever being opened, and a stall detector reconnects a connection that has gone quiet.",
          tradeOff:
            "Two mechanisms to understand instead of one, and the badge is up to twenty seconds stale. In exchange a connection only exists while somebody is actually watching a queue, which is the only time it was worth paying for.",
          result:
            "The worker pool stopped being consumed by idle tabs. The screen that benefits from streaming still streams.",
        },
        {
          title: "Delegation stamped the wrong name on pending requests",
          challenge:
            "The first attempt copied the delegate's name onto pending requests when the delegation was created. Requests filed afterwards, and delegations created after filing, still routed to whoever was away.",
          cause:
            "Delegation was treated as a one-time data update instead of a rule that is true for a period of time.",
          solution:
            "Store it as delegator, delegate, scope, start date and end date. Resolve the effective approver when the approval screen loads and again when the decision is submitted.",
          tradeOff:
            "Two lookups per decision instead of reading one column, and 'who can approve this' stops being a simple query.",
          result:
            "Delegation behaves the way the office does, and an approval cannot go through on authority that expired while a tab sat open.",
        },
        {
          title: "Balances drifted away from their own history",
          challenge:
            "The stored balance column stopped matching the records that were supposed to explain it, usually after a cancelled or corrected request.",
          cause:
            "Balance was a number that whichever code path ran happened to update. Cancellation and admin correction missed it.",
          solution:
            "Made the ledger the source of truth. The balance is the sum of credit and debit rows, cached and invalidated on write, with anything touching several rows running in a transaction.",
          tradeOff:
            "Reads cost more than reading one column, and the cache has to be invalidated correctly.",
          result:
            "A corrected record produces a corrected balance, and any balance can be traced to the rows behind it.",
        },
      ],
      security: [
        "Session auth with passwords hashed by password_hash() and checked with password_verify()",
        "Every route group carries its own middleware: session, active-user check, CSRF, role, and a rate limiter tuned per group",
        "Permissions checked in middleware and again in the service before a state change. Hiding a button is not the control",
        "Validation at the HTTP boundary, so nothing downstream sees raw input",
        "Every query is a prepared statement with bound parameters. No string-concatenated SQL",
        "A Content-Security-Policy plus nosniff, DENY framing, HSTS, referrer and permissions policy, set once in middleware",
        "The CSP still allows inline scripts, because the front end predates it. That is written down as known debt rather than presented as done: removing it means moving every inline script to a per-request nonce",
        "API responses may carry personal data, so they are sent with no-store rather than left to browser and proxy caches",
        "HTML is rendered to PDF with JavaScript disabled in the converter",
        "Uploads validated by extension and MIME type, size-limited, renamed on write and stored outside the web root",
        "Audit rows are written in the same transaction as the change they describe",
        "A maintenance-mode middleware can close the application to users without taking the host down",
        "No system is ever fully secure. This is the set of controls in place, not a guarantee",
      ],
      database: {
        note: "Generalised. Table and column names are representative, not the production schema.",
        entities: [
          {
            name: "employees",
            purpose: "Person of record. Everything else hangs off this.",
            notableFields: ["employee_no", "office_id", "position_id", "status"],
            relations: [
              "has many applications",
              "has many approval steps as approver",
              "has one schedule",
            ],
          },
          {
            name: "applications",
            purpose: "One row per filed document, typed by request type.",
            notableFields: ["type", "employee_id", "status", "filed_at", "deleted_at"],
            relations: [
              "belongs to employees",
              "has many approval steps and audit rows",
            ],
          },
          {
            name: "approval_steps",
            purpose: "The route. Ordered rows for who must act and what they decided.",
            notableFields: [
              "level",
              "approver_id",
              "acted_by",
              "decision",
              "remarks",
              "acted_at",
            ],
            relations: ["belongs to applications and employees"],
          },
          {
            name: "delegations",
            purpose:
              "Temporary transfer of approval authority, valid for a date range.",
            notableFields: [
              "delegator_id",
              "delegate_id",
              "scope",
              "starts_on",
              "ends_on",
            ],
            relations: ["belongs to employees, twice"],
          },
          {
            name: "signatory_snapshots",
            purpose: "Printed name and designation per slot, frozen at approval.",
            notableFields: [
              "app_type",
              "app_id",
              "slot_order",
              "printed_name",
              "printed_desig",
            ],
            relations: ["belongs to an application of any type"],
          },
          {
            name: "credit_ledger",
            purpose: "Credit and debit rows. The balance is their sum.",
            notableFields: [
              "employee_id",
              "credit_type",
              "credit",
              "debit",
              "effective_on",
            ],
            relations: ["belongs to employees, optionally to an application"],
          },
          {
            name: "audit_logs / approval_logs / login_logs",
            purpose:
              "Three histories, kept apart because they answer different questions.",
            notableFields: ["actor_id", "action", "target", "created_at"],
            relations: ["reference employees and applications"],
          },
        ],
        considerations: [
          "Unique key on (document type, application id, signatory slot), so a slot cannot be snapshotted twice.",
          "Composite index on (application_id, level). The approval screen always reads a route in order.",
          "Index on (employee_id, status). 'My pending requests' is the most-hit query in the app.",
          "Foreign keys with restrictive deletes. Records are soft-deleted rather than removed.",
          "One transaction covers an application, its approval step, its signatory snapshot and the ledger.",
          "Audit rows go in the same transaction as the change, so a missing audit row means the change did not happen either.",
        ],
      },
      api: {
        note: "Representative shapes. Real paths and payloads are not published.",
        endpoints: [
          {
            method: "POST",
            path: "/api/leave-applications",
            purpose: "File a leave request",
            auth: "Authenticated, own records only",
          },
          {
            method: "PATCH",
            path: "/api/leave-applications/:id/status",
            purpose: "Approve or reject the current step",
            auth: "Resolved approver for that step",
          },
          {
            method: "GET",
            path: "/api/approvals/pending",
            purpose: "Approver queue, including delegated items",
            auth: "Holder of an approval permission",
          },
          {
            method: "GET",
            path: "/api/notifications/poll",
            purpose: "Cheap endpoint the badge polls",
            auth: "Authenticated",
          },
          {
            method: "GET",
            path: "/api/sse/:module/approval",
            purpose: "Live approval queue stream, open only while the screen is",
            auth: "Holder of an approval permission",
          },
          {
            method: "GET",
            path: "/api/profile/pds/export",
            purpose: "Generate the Personal Data Sheet for a revision year",
            auth: "Own profile, or HR",
          },
        ],
        conventions: [
          "Validation runs before authorization, which runs before business logic.",
          "422 for validation with a field-keyed error object, 403 for permissions, 409 when the application is no longer in a state that allows the action.",
          "Submitting the same decision twice does not write two audit rows.",
          "Responses leave out fields the caller is not allowed to see, rather than sending them and hiding them.",
          "Clients get messages, never stack traces or SQL.",
        ],
      },
      code: [
        {
          title: "Freezing the signatory at the moment of approval",
          language: "php",
          description:
            "Rewritten for this page. The decision, the snapshot and the audit row land together or not at all.",
          code: `public function decide(ApprovalStep $step, int $actorId, Decision $decision): void
{
    $this->pdo->beginTransaction();

    try {
        $this->routes->assertCanAct($step, $actorId, new DateTimeImmutable());
        $this->steps->recordDecision($step->id, $decision, $actorId);

        // Who signed this is a fact about now, not a lookup for later.
        $signatory = $this->signatories->resolve($step->approverId);

        $this->snapshots->freeze(
            appType: $step->appType,
            appId: $step->appId,
            slot: $step->level,
            printedName: $signatory->printedName,
            printedDesignation: $signatory->designation,
            decidedBy: $actorId,
        );

        $this->audit->record($actorId, "application.{$decision->value}", $step->appId);

        $this->pdo->commit();
    } catch (Throwable $e) {
        $this->pdo->rollBack();
        throw $e;
    }
}

// Print path: prefer the snapshot, fall back for forms approved before it existed.
public function printedSignatory(string $appType, int $appId, int $slot): Signatory
{
    return $this->snapshots->find($appType, $appId, $slot)
        ?? $this->signatories->resolveLive($appType, $appId, $slot);
}`,
        },
        {
          title: "One PDS service per form revision",
          language: "php",
          description:
            "Rewritten for this page. The two revisions share no code on purpose.",
          code: `final class PdsExportServiceFactory
{
    public const DEFAULT_VERSION = '2026';

    private const SERVICES = [
        '2025' => PdsExportService2025::class,
        '2026' => PdsExportService2026::class,
    ];

    /**
     * Each revision is a frozen government form. A new one is a new class:
     * copy the latest, apply the template's changes, register it here.
     * Nothing is shared, on purpose.
     */
    public static function make(PDO $db, ?string $version = null): PdsExportService
    {
        $version = trim((string) $version) ?: self::DEFAULT_VERSION;

        if (! isset(self::SERVICES[$version])) {
            throw new InvalidArgumentException("Unsupported PDS revision: {$version}");
        }

        $class = self::SERVICES[$version];

        return new $class($db);
    }
}`,
        },
        {
          title: "A stream that closes itself",
          language: "js",
          description:
            "Rewritten for this page. Every open connection ties up a worker, so the browser has to be the one that closes it.",
          code: `// One instance per tab. A second call reuses the first.
if (window.__SSE_INSTANCE__) return window.__SSE_INSTANCE__;

const sse = {
  open(url) {
    if (!window.EventSource || !onApprovalRoute()) return;
    if (source && source.readyState !== EventSource.CLOSED) return;

    source = new EventSource(url);
    source.onmessage = (e) => debounce(() => refreshTable(JSON.parse(e.data)), 250);
    watchForStall();
  },

  close() {
    source?.close();
    source = null;
    clearTimeout(stallTimer);
  },
};

// Leaving the screen, hiding the tab or closing it all end the connection.
window.addEventListener("hashchange", () => onApprovalRoute() || sse.close());
window.addEventListener("beforeunload", sse.close);
document.addEventListener("visibilitychange", () =>
  document.visibilityState === "hidden" ? sse.close() : sse.reopen(),
);`,
        },
        {
          title: "Role middleware",
          language: "php",
          description:
            "Rewritten for this page. A PSR-15 middleware, so it composes onto any route group.",
          code: `final class CheckRole implements MiddlewareInterface
{
    public function __construct(private array $allowed) {}

    public function process(ServerRequestInterface $request, RequestHandlerInterface $handler): ResponseInterface
    {
        $role = $request->getAttribute('session')['role'] ?? null;

        if ($role === null || ! in_array($role, $this->allowed, true)) {
            throw new HttpForbiddenException($request);
        }

        return $handler->handle($request);
    }
}

$app->group('/delegation', $routes)
    ->add(new RateLimiter(ADMIN_MAX_REQ, ADMIN_DEC_SEC))
    ->add(new CheckCsrf())
    ->add(new CheckUserActive())
    ->add(new CheckSession());`,
        },
      ],
      outcomes: [
        "Leave, overtime, CTO and office orders are filed and approved in one system instead of on paper.",
        "Approved applications come out as the official forms, with the signatory who actually approved them.",
        "Employees generate their own Personal Data Sheet from a profile they maintain, instead of filling the form in by hand.",
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
    period: "[YYYY] — [YYYY]",
    organization: "DOLE Regional Office No. IV-A (CALABARZON)",
    status: "In production",
    technologies: ["PHP", "MySQL", "JavaScript", "TCPDF", "PhpWord", "REST API"],
    metrics: ["PTO & CEI", "province-scoped", "licensed evaluators", "ageing queues"],
    keyChallenge:
      "An application passes through inspectors, licensed evaluators, cashiering and a signatory, in different provinces, and the office has to see which ones have been sitting too long at each stage.",
    featured: true,
    confidential: true,
    screenshots: [
      {
        src: "/projects/tsios-dashboard.png",
        width: 1436,
        height: 848,
        alt: "TSIOS dashboard showing enrolled establishments and ageing charts for pending evaluations",
        caption:
          "Dashboard. The ageing panels are the whole point: evaluations pending over three days, orders of payment over five.",
      },
      {
        src: "/projects/tsios-user-access.png",
        width: 1450,
        height: 1581,
        alt: "Account management screen with per-route access tags on each user",
        caption:
          "Account management. Access is a set of route tags per user, not a fixed role. Names and usernames are blank in this screen.",
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
        "TSIOS handles Permit to Operate and Certificate of Electrical Inspection applications. An establishment enrols, files, and is assigned an inspector and an evaluator. Inspection results lead to an order of payment, and payment leads to a certificate. The office side covers assignment, inspection, evaluation, payment, issuance, and the corrections that follow.",
      users:
        "Industrial establishments and contractors filing applications, inspectors and evaluators in the regional and provincial offices, cashiering, and the signatory who issues certificates.",
      problem: [
        "Applications were filed and tracked on paper across a regional office and several provincial offices. Nobody had one view of where anything was.",
        "Work stalls silently. An application waiting on an evaluator or an unpaid order of payment looks the same as one moving normally.",
        "Assignment changes constantly. Inspectors get reassigned, evaluators change, and the record has to follow.",
        "Certificates sometimes need correction or revocation after issuance, and there was no controlled way to do it.",
      ],
      responsibilities: [
        "Full stack development",
        "Database design for establishments, applications, inspections, payments and certificates",
        "The stage-by-stage application workflow and reassignment",
        "Per-route user access and provincial scoping",
        "Ageing reports on the dashboard",
        "Certificate issuance, status modification and revert paths",
        "Deployment and maintenance",
      ],
      teamNote: "[Note which parts were yours if this was shared work.]",
      architecture: {
        summary:
          "A PHP application with no framework behind it. The layering is hand-built: config, controllers grouped by audience, models, and a thin service layer for the parts worth naming. Two faces, a public side where establishments enrol and file and an office side scoped by province and by route permission. An application row carries its stage, and each stage transition writes its own record.",
        layers: [
          {
            label: "Establishment portal",
            detail: "Enrolment, filing, upload, status check",
          },
          { label: "HTTP layer", detail: "Auth, route permission, provincial scope" },
          {
            label: "Workflow services",
            detail: "Assignment, inspection result, order of payment, issuance",
          },
          {
            label: "Reporting",
            detail: "Ageing queries per stage, transaction lists, exports",
          },
          {
            label: "MySQL",
            detail:
              "Establishments, applications, assignments, inspections, payments, certificates",
          },
        ],
        integrations: [
          "Rule 1020 establishment registration as a prerequisite for an account",
          "Letter of Authority and certificate documents generated from templates",
        ],
      },
      features: [
        {
          title: "Establishment enrolment",
          detail:
            "Companies register once and file against that record afterwards, so applications from the same establishment stay linked.",
        },
        {
          title: "Inspector and evaluator assignment",
          detail:
            "Assignment and reassignment are explicit actions with their own records, so the current owner of a file is always known.",
        },
        {
          title: "Mechanical and electrical inspection",
          detail:
            "Inspection results are captured per application and drive what happens next.",
        },
        {
          title: "Order of payment",
          detail:
            "Evaluation produces an order of payment that has to be received before issuance can proceed.",
        },
        {
          title: "Certificate issuance",
          detail:
            "Certificates are generated from a template with their own reference, and issuance is a separate permission.",
        },
        {
          title: "Status modification and revert",
          detail:
            "Corrections after issuance go through controlled actions instead of direct edits.",
        },
        {
          title: "Ageing views",
          detail:
            "The dashboard lists evaluations pending more than three days and orders of payment pending more than five, per province.",
        },
        {
          title: "Per-route access",
          detail:
            "Each account carries the specific routes it can reach, plus the province it is scoped to.",
        },
        {
          title: "Maintenance mode",
          detail:
            "A switch that takes the client side offline during releases without touching the office side.",
        },
        {
          title: "Licensed evaluator assignment",
          detail:
            "Mechanical applications go to a licensed mechanical engineer and electrical ones to a licensed electrical engineer. Each has its own assign and reassign action, because one cannot stand in for the other.",
        },
        {
          title: "Letters of Authority, issued in batches",
          detail:
            "Authority documents are generated for a batch of applications rather than one at a time, with a separate modification path for the ones that have to change after issuing.",
        },
        {
          title: "New applications and renewals",
          detail:
            "A renewal starts from the establishment's previous transaction rather than from an empty form, so the inspection history stays attached to the same unit.",
        },
        {
          title: "Unit enrolment",
          detail:
            "Establishments register the individual machines and electrical installations being certified, so an application is filed against a known unit rather than free text.",
        },
        {
          title: "Public certificate verification",
          detail:
            "A certificate can be checked against the issuance record without an account.",
        },
        {
          title: "Field-level change tracking",
          detail:
            "When a record is edited, only the fields that actually changed are recorded, with their before and after values, rather than a snapshot of the whole row.",
        },
      ],
      challenges: [
        {
          title: "Nobody could see what was stuck",
          challenge:
            "Applications sat at a stage for days. The only way to find them was to ask the person holding them.",
          cause:
            "The application row stored its current stage but not when it entered that stage, so 'how long has this been waiting' had no answer.",
          solution:
            "Timestamped every stage transition and built the dashboard from those timestamps: pending evaluation over three days, pending order of payment over five, grouped by province.",
          tradeOff:
            "One more row per transition, and the thresholds are policy baked into a query. Changing them means changing code rather than a setting.",
          result:
            "Backlogs are visible without asking anyone. The numbers on the dashboard are the same numbers used in reports.",
        },
        {
          title: "Roles did not fit the way the offices actually work",
          challenge:
            "The office is not a clean hierarchy. Someone in a provincial office might evaluate and handle orders of payment but never touch companies. A role called 'evaluator' was either too wide or multiplied into a dozen near-identical roles.",
          cause:
            "Access here is really a set of capabilities per person, and it differs between provinces.",
          solution:
            "Made access a set of route tags on the account, with province as a separate scope. Adding a capability to one person is a checkbox, not a new role.",
          tradeOff:
            "Per-user access is harder to audit than a handful of named roles. It needs a screen that shows exactly what each account can reach, which is why that screen exists.",
          result:
            "Access matches what people actually do. Adding a provincial office does not mean inventing new roles.",
        },
        {
          title: "Issued certificates needed correcting",
          challenge:
            "A certificate would go out with a wrong detail, or need to be pulled back. Editing the record directly would have broken the link between the certificate and the inspection behind it.",
          cause:
            "The first design treated issuance as the end of the line, with nothing after it.",
          solution:
            "Added explicit status modification and revert actions, each behind its own permission and each writing a record of who did it and why. The original stays.",
          tradeOff:
            "More steps for staff than editing a field, and two more permissions to manage.",
          result:
            "Corrections happen without losing the history, and it is always clear which certificate is current.",
        },
      ],
      security: [
        "Establishment accounts are separate from office accounts, with no shared routes",
        "Every office route checks a permission, and queries are scoped to the user's province",
        "Issuance, status modification and revert each require their own permission",
        "Uploaded documents are validated by type and size and served through an authorised route, not from a public folder",
        "Corrections are recorded rather than applied silently",
        "Certificates carry a reference that can be checked against the issuance record",
        "Screenshots here show blank account names; no establishment or account data is published",
      ],
      api: {
        note: "Representative shapes.",
        endpoints: [
          {
            method: "POST",
            path: "/api/applications",
            purpose: "File an application against an enrolled establishment",
            auth: "Establishment account",
          },
          {
            method: "PATCH",
            path: "/api/applications/:id/assignment",
            purpose: "Assign or reassign inspector and evaluator",
            auth: "Office account with assignment permission",
          },
          {
            method: "POST",
            path: "/api/applications/:id/inspection",
            purpose: "Record an inspection result",
            auth: "Assigned inspector",
          },
          {
            method: "POST",
            path: "/api/applications/:id/order-of-payment",
            purpose: "Issue an order of payment",
            auth: "Evaluator",
          },
          {
            method: "POST",
            path: "/api/applications/:id/certificate",
            purpose: "Issue the certificate",
            auth: "Signatory permission",
          },
        ],
        conventions: [
          "Stage transitions are their own endpoints, not a PATCH on a status field, so each one can carry its own permission and payload.",
          "A transition out of order returns 409 with the current stage.",
          "Reads are scoped to the caller's province at the query level, not filtered in the view.",
        ],
      },
      outcomes: [
        "Establishments file and follow their applications online instead of by phone and counter visit.",
        "Backlogs at each stage are visible per province without asking anyone.",
        "Assignment, issuance and corrections all leave a record.",
        "[Add verifiable figures if you have them, such as enrolled establishments or applications processed.]",
      ],
    },
  },

  {
    slug: "no-pending-case",
    name: "No Pending Case System",
    tagline:
      "Online application for the certification that a company has no pending labour case, from filing through verification to a certificate the applicant can track by reference.",
    type: "Records digitisation / certification",
    role: "Full Stack Developer",
    period: "2024 — Present",
    organization: "DOLE Regional Office No. IV-A (CALABARZON)",
    status: "In production",
    technologies: ["PHP", "MySQL", "JavaScript", "TCPDF", "REST API"],
    metrics: ["Company certification", "Rule 1020 check", "public verify"],
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
        "Companies need a certification that they have no pending labour case before certain transactions. This system takes the application online, checks it against case records, routes it for approval, and issues a certificate the applicant can verify by reference number. It replaces a counter process with a manual records search.",
      users:
        "Establishments and contractors applying, records staff who verify, and the signing official who approves issuance.",
      problem: [
        "Verification meant searching records held in more than one place. Two staff could reach different answers for the same company.",
        "Certificates were prepared one at a time, which invites errors in the fields that matter: company name, date, reference.",
        "Nothing tied an issued certificate to the search that justified it, so it could not be checked later.",
        "A third party holding a printed certificate had no way to confirm it was real.",
      ],
      responsibilities: [
        "Full stack development",
        "Database design for applications, case records, verification results and the issuance log",
        "Verification and matching logic, including how partial matches are handled",
        "Approval routing and certificate generation",
        "Per-route access to case data",
        "Deployment and maintenance",
      ],
      teamNote: "[Note which parts were yours if this was shared work.]",
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
          { label: "Approval", detail: "Signing official approves issuance" },
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
          detail: "A certificate cannot be issued without an authorised approval.",
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
          title: "Company names never match exactly",
          challenge:
            "The same company appears as 'ABC Manufacturing Inc.', 'ABC Mfg., Inc' and 'ABC MANUFACTURING INCORPORATED'. Exact matching misses real cases. Loose matching flags everyone.",
          cause:
            "Records were entered by different people over many years with no normalisation at entry.",
          solution:
            "Normalise both sides before comparing: case, spacing, punctuation, common suffixes. Match on the normalised name plus a second identifying field. Anything that only partly matches goes to a review queue.",
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
            "The certificate was the only artefact and nothing linked it back to the system.",
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
        "Input validated and normalised at the boundary, queries parameterised",
        "Generated documents are served through an authorised route",
        "Screenshots here show test data with account names covered",
      ],
      outcomes: [
        "Applications are filed and tracked online instead of at a counter.",
        "Two staff verifying the same company reach the same answer.",
        "Every certificate is traceable to the verification behind it.",
        "A certificate presented by a third party can be confirmed.",
        "[Add verifiable figures if you have them, such as applications processed.]",
      ],
    },
  },

  {
    slug: "biometric-integration",
    name: "TUPAD Biometric Verification",
    tagline:
      "Fingerprint capture and 1:N matching for an emergency employment programme, bridged from a DigitalPersona reader into a web application through a local C# service.",
    type: "Desktop-to-web integration",
    role: "Integration developer",
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
    ],
    metrics: ["1:N matching", "local C# service", "ships as an installer"],
    keyChallenge:
      "A browser cannot reach a USB fingerprint reader, and the matching SDK is native with no PHP binding. Both constraints push the work off the server and onto the workstation, which is a privacy decision as much as a technical one.",
    featured: true,
    confidential: true,
    // No screenshots: the enrolment screen shows a live capture and beneficiary
    // records. There is no version of that image that is safe to publish.
    screenshots: [],
    caseStudy: {
      overview:
        "TUPAD is an emergency employment programme. Beneficiaries are validated on site before they are paid, and a person must not be able to enrol twice under two records. This work is the fingerprint side of that check: capturing a print from a DigitalPersona reader in the field and matching it against everyone already enrolled.",
      users:
        "Field staff running on-site validation, and the programme itself, which depends on each beneficiary appearing exactly once.",
      teamNote:
        "The biometric integration is my work. The rest of the TUPAD system — the work programmes, the approval chain across a dozen roles, the payroll documents — was built by others. This case study covers only the part I did.",
      problem: [
        "Validation happens in the field, in front of the person. A duplicate has to be caught while they are still standing there, not reconciled afterwards.",
        "Browsers cannot talk to a USB fingerprint reader, and the vendor SDK is a native Windows library with no PHP binding.",
        "Records already existed from an earlier round of enrolment, saved without recording which finger had been scanned.",
        "Fingerprint data is sensitive, and a decision about where matching runs is a decision about where that data goes.",
      ],
      responsibilities: [
        "Design of the bridge between the reader and the web application",
        "The local C# service: reader status, capture, template extraction, 1:N matching",
        "The browser-side client that drives it, including timeouts and cancellation",
        "The PHP side: template storage and the candidate query used for matching",
        "Handling the failures that actually happen in the field: no reader, service not running, poor scan, operator closing the dialog mid-capture",
        "Packaging the service as an installer so field offices could deploy it without a developer on site",
      ],
      architecture: {
        summary:
          "The browser never touches the reader. A small C# tray application runs on the validation workstation, owns the vendor SDK, and exposes a narrow HTTP surface on localhost. The page asks PHP for the candidate templates, hands them to the local service along with the freshly captured print, and the local service does the matching with the native SDK.",
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
          "Face enrolment alongside fingerprint, with fully enrolled records protected from deletion",
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
            "This is the honest weak point. The candidate templates leave the server and pass through the browser into the local service, and the server cannot independently confirm a match — it is told the answer. A modified client could lie about the result. For on-site validation with staff operating the machine that is an accepted risk, but it is a real one, and a server-side matcher would be the fix if the threat model ever changed.",
          result:
            "Duplicate enrolments are caught in the field, in front of the person, using the matcher the vendor supports.",
        },
        {
          title: "Older records did not say which finger had been scanned",
          challenge:
            "Matching a right index finger against a left thumb produces a confident non-match. Earlier enrolments were saved without recording the finger at all, so a straight same-finger comparison would silently skip every one of them.",
          cause:
            "The finger position was added to the enrolment flow after records already existed.",
          solution:
            "The query narrows to the same finger when one is given, but keeps the rows where the finger was never recorded. Saving a template now also fills in the finger, so the old rows clear out as people are re-enrolled.",
          tradeOff:
            "A larger candidate set means more comparisons and a slightly higher chance of a borderline score against a finger that was never the right one to compare. The alternative was quietly not checking older beneficiaries at all, which is worse.",
          result:
            "New enrolments get a precise comparison, old ones still get checked, and the untidy rows clear themselves over time rather than needing a migration.",
        },
        {
          title: "A capture blocks, and people close dialogs",
          challenge:
            "A capture waits for a finger. If the operator gives up and closes the dialog, the reader is still waiting and the next capture starts in a bad state.",
          cause:
            "The natural implementation is a request that blocks until the device returns, with nothing on the other end when the user walks away.",
          solution:
            "Every call to the local service carries a timeout suited to what it does — short for a status check, long for a capture that waits on a person — and closing the dialog sends an explicit stop so the service abandons the capture.",
          tradeOff:
            "More states to handle in the client than a single blocking call, and the timeouts are values that had to be chosen rather than derived.",
          result:
            "An unplugged reader is reported in seconds instead of hanging, and abandoning a capture leaves the device ready for the next person.",
        },
      ],
      security: [
        "The local service binds to the loopback address and is not reachable from the network",
        "Only templates are stored. No fingerprint image is persisted by the web application",
        "Template storage and the candidate query sit behind the application's normal session and role checks",
        "Candidate templates do reach the browser and the local service during matching. That is a deliberate consequence of the SDK being native, and it is the main thing I would revisit if this were rebuilt",
        "The server does not independently verify a match result. A server-side matcher would be required to close that gap",
        "Fully enrolled records are protected from deletion, so a validated beneficiary cannot be quietly removed and re-added",
        "No biometric data, sample template, capture screen or beneficiary record appears anywhere in this portfolio",
        "No system is ever fully secure. This is the set of controls in place, not a guarantee",
      ],
      api: {
        note: "Representative shapes. The local service contract and the server endpoints are both simplified here.",
        endpoints: [
          {
            method: "GET",
            path: "http://127.0.0.1:PORT/status",
            purpose: "Is the service up, is a reader attached",
            auth: "Loopback only",
          },
          {
            method: "POST",
            path: "http://127.0.0.1:PORT/capture",
            purpose: "Wait for a finger, return a template and a quality score",
            auth: "Loopback only",
          },
          {
            method: "POST",
            path: "http://127.0.0.1:PORT/match",
            purpose: "1:N compare a probe against supplied candidates",
            auth: "Loopback only",
          },
          {
            method: "POST",
            path: "http://127.0.0.1:PORT/extract",
            purpose: "Convert a browser-captured image into a template",
            auth: "Loopback only",
          },
          {
            method: "GET",
            path: "/api/biometric/templates",
            purpose: "Candidate templates for a given finger",
            auth: "Authenticated field staff",
          },
          {
            method: "POST",
            path: "/api/biometric/save-template",
            purpose: "Store a template against a beneficiary record",
            auth: "Authenticated field staff",
          },
        ],
        conventions: [
          "Device errors come back as a code the UI maps to an instruction, such as checking the USB connection.",
          "A capture returns a quality score so a poor scan can be rejected while the person is still there.",
          "A match returns the score and the threshold, not just a yes or no, so a borderline result can be shown to the operator instead of decided for them.",
        ],
      },
      code: [
        {
          title: "Talking to the local service, with a timeout per operation",
          language: "js",
          description:
            "Rewritten for this page. A status check should fail fast; a capture is waiting on a human and should not.",
          code: `const BASE = "http://127.0.0.1:PORT";

// Short timeout: if the tray app is not running we want to say so immediately.
async function status() {
  try {
    const res = await fetch(\`\${BASE}/status\`, { signal: AbortSignal.timeout(2500) });
    return res.ok ? await res.json() : null;
  } catch {
    return null; // Not running, or no reader. The caller tells the operator.
  }
}

// Long timeout: this one blocks until somebody puts a finger on the reader.
async function capture() {
  const res = await fetch(\`\${BASE}/capture\`, {
    method: "POST",
    signal: AbortSignal.timeout(35000),
  });
  return res.json(); // { success, template, quality, error }
}

// Closing the dialog must not leave the reader waiting for a finger.
async function stopCapture() {
  try {
    await fetch(\`\${BASE}/stop-capture\`, { method: "POST", signal: AbortSignal.timeout(2000) });
  } catch {
    /* best effort */
  }
}`,
        },
        {
          title: "Choosing who to compare against",
          language: "sql",
          description:
            "Rewritten for this page. Narrow to the same finger, but never drop the records that predate the finger being recorded.",
          code: `SELECT beneficiary_id, template, finger_position
FROM   biometric_enrolments
WHERE  template IS NOT NULL
  AND  template <> ''
  AND  (
        finger_position = :finger_position
        OR finger_position IS NULL      -- enrolled before the finger was recorded
        OR finger_position = 'unknown'
       );`,
        },
        {
          title: "The hand-off",
          language: "js",
          description:
            "Rewritten for this page. The server decides who the candidates are; the local service decides whether any of them match.",
          code: `async function checkForDuplicate(fingerPosition) {
  const reader = await status();
  if (!reader?.readerConnected) {
    return { error: "No fingerprint reader detected. Check the USB connection." };
  }

  const probe = await capture();
  if (!probe.success) return { error: probe.error };

  // The server answers "who should this be compared against".
  const { templates } = await api.get("biometric/templates", { finger_position: fingerPosition });

  // The local service answers "does it match any of them", using the native SDK.
  const result = await match(probe.template, templates);

  return result.matched
    ? { duplicate: true, beneficiaryId: result.matchedOsecId, score: result.score }
    : { duplicate: false, template: probe.template };
}`,
        },
      ],
      outcomes: [
        "A duplicate enrolment is caught on site, while the person is still present, rather than surfacing later in a payout list.",
        "Field staff work from the browser they already use; the device code lives in one small service on the laptop.",
        "Fingerprint images are never stored by the web application.",
        "Records enrolled before the finger position was captured are still checked rather than silently skipped.",
        "Deployed across DOLE Regional Office IV-A field offices, installed by the offices themselves.",
      ],
    },
  },

  // Other systems. These get a card with one screenshot, not a case study.
  // Adding a `caseStudy` object to any of them gives it a page.
  {
    slug: "aep",
    name: "AEP",
    tagline:
      "Alien Employment Permit applications, from filing through pre-evaluation and evaluation to ID card release, with exclusion and exemption handled as separate paths and a pickup schedule at the end.",
    type: "Regulatory workflow system",
    role: "Full Stack Developer",
    period: "[YYYY]",
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
    period: "[YYYY]",
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
      "Reporting system for Public Employment Service Offices, covering job placement, youth employability, profiling and welfare programme figures per LGU.",
    type: "Reporting system",
    role: "Full Stack Developer",
    period: "[YYYY]",
    organization: "DOLE Regional Office No. IV-A (CALABARZON)",
    status: "In production",
    technologies: ["Slim 4", "PHP", "MySQL", "PhpSpreadsheet", "SSE"],
    keyChallenge:
      "Dozens of programme forms with different shapes, encoded by LGU staff outside the office, rolling up to one regional figure.",
    featured: false,
    confidential: true,
    screenshots: [
      {
        src: "/projects/peso-dashboard.png",
        width: 1877,
        height: 1444,
        alt: "PESO dashboard with encoded entry counts grouped by programme area",
        caption: "Encoded entries by programme, filtered by province, PESO and period.",
      },
      {
        src: "/projects/peso-user-access.png",
        width: 1494,
        height: 1168,
        alt: "User access dialog with nested programme modules that can be granted individually",
        caption:
          "Access follows the programme structure, down to individual sub-programmes.",
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
