import type { Project } from "./types";

// Internal government systems. No production code, schema, endpoint or record is
// reproduced here. Code samples are rewritten from scratch for this site.
// Screenshots use test data; anything identifying was covered before upload.

export const projects: Project[] = [
  {
    slug: "prams",
    name: "PRAMS",
    tagline:
      "HRIS for a regional office. Leave, overtime, CTO and office orders file and route through one approval engine.",
    type: "HRIS / workflow platform",
    role: "Full Stack Developer",
    period: "[YYYY] — Present",
    organization: "DOLE Regional Office No. IV-A (CALABARZON)",
    status: "In production",
    technologies: ["Laravel", "PHP", "MySQL", "Vue.js", "Blade", "REST API"],
    keyChallenge:
      "Four document types, each with its own multi-level route, delegated authority and audit trail, without four copies of the workflow code.",
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
      {
        src: "/projects/prams-mobile.png",
        width: 336,
        height: 724,
        alt: "PRAMS dashboard on a phone-sized screen",
        caption: "Same dashboard on a phone. Staff file requests from mobile.",
      },
    ],
    caseStudy: {
      overview:
        "PRAMS is the system employees use to file leave, compensatory time off (CTO), overtime and office orders, and that HR uses to keep employee records, work schedules and balances. It covers the regional office and the provincial field offices under it.",
      users:
        "Employees filing requests, supervisors and division chiefs approving them, and HR staff who maintain records, schedules and balances.",
      problem: [
        "Requests moved on paper between offices. Nobody could say where a form was or who was holding it.",
        "Leave and CTO balances lived in spreadsheets. The number an employee believed and the number HR computed did not always match.",
        "Approval authority changes often. People go on leave, positions sit vacant, officers are designated in an acting capacity. On paper you write a name on a line. In software that has to be modelled.",
        "There was no record of who approved what, or when.",
      ],
      responsibilities: [
        "Full stack development on the Laravel and MySQL application",
        "Database design for requests, approval routes, balances and audit records",
        "Approval workflow engine and delegation",
        "Role-based access control and permission checks",
        "REST endpoints for the Vue components",
        "In-app notifications",
        "Excel import and export",
        "Deployment, production support and bug fixes",
      ],
      teamNote:
        "[Say here whether you built this alone or with others, and which parts were yours. Reviewers ask this first.]",
      architecture: {
        summary:
          "One Laravel application. It serves Blade pages and a JSON API from the same codebase. Business rules sit in service classes, so the same rule runs whether the request came from a form post or from the API.",
        layers: [
          {
            label: "Browser",
            detail: "Blade pages, Vue components for the interactive parts",
          },
          {
            label: "HTTP layer",
            detail:
              "Routes, then auth / role / permission middleware, then controllers",
          },
          { label: "Validation", detail: "Form Request classes. Bad input stops here" },
          {
            label: "Services",
            detail: "Workflow, balance computation, delegation lookup",
          },
          {
            label: "Data access",
            detail:
              "Eloquent models and scopes. Transactions around multi-table writes",
          },
          {
            label: "MySQL",
            detail: "Requests, approval steps, ledger, permissions, audit log",
          },
        ],
        integrations: [
          "Attendance data used to check overtime against work schedules",
          "Excel import and export for bulk employee and balance records",
          "In-app notifications (see the polling trade-off below)",
        ],
      },
      features: [
        {
          title: "Multi-level approvals",
          detail:
            "A request walks an ordered list of steps. Each step stores the approver, the decision, the timestamp and any remarks. A rejection at any level stops the route and sends the request back with the reason attached.",
        },
        {
          title: "Delegated approval authority",
          detail:
            "An approver can hand their authority to someone else for a date range. The engine works out who can act at the moment the decision is submitted, not when the request was filed.",
        },
        {
          title: "Role-based access control",
          detail:
            "Roles hold permissions. Permissions are rows, not constants, so a new one does not need a deploy. Every route checks them, and so does the service before it changes anything.",
        },
        {
          title: "Leave, CTO and COC balances",
          detail:
            "Balances come from credit and debit rows rather than a single stored number. Correcting a record recomputes the balance instead of leaving it wrong.",
        },
        {
          title: "Audit log",
          detail:
            "Every state change writes a row: who, what action, which record, what changed, when. Records are soft-deleted so the history survives.",
        },
        {
          title: "Work schedules",
          detail:
            "An employee's schedule decides which hours count as overtime and how a half day is deducted from leave.",
        },
        {
          title: "Excel import and export",
          detail:
            "Bulk employee and balance records. Validation runs per row and reports every bad row at once instead of stopping at the first.",
        },
        {
          title: "HR calendar",
          detail:
            "Filed requests laid out by date, filtered by office, type and status. Holidays and suspensions show alongside them.",
        },
      ],
      challenges: [
        {
          title: "Server-Sent Events took down the app under real load",
          challenge:
            "Notifications were built on Server-Sent Events. Each open tab holds one long-lived HTTP connection. With a few testers it was fine. With staff actually using it, the app started refusing requests.",
          cause:
            "The app runs on shared PHP hosting. Every SSE connection holds a PHP worker for as long as the tab stays open, and the worker pool is small and fixed. Staff leave tabs open all day, so idle notification streams ate the pool and normal page requests had nothing left.",
          solution:
            "Dropped the stream. The client now polls a small endpoint that returns an unread count, and only fetches the notification list when that count changes. Polling slows down when the tab is hidden.",
          tradeOff:
            "Notifications arrive within the polling interval instead of instantly, and the server takes many small requests instead of a few long ones. In return the worker pool stays free, and a slow poll means a late notification rather than a dead site.",
          result:
            "The refused requests stopped. The delay does not matter for an approval queue. If the app ever moves to a runtime that handles long connections properly, the client side is small enough to swap back.",
        },
        {
          title: "The same approval rules were written four times",
          challenge:
            "Leave, overtime, CTO and office orders each need a multi-level route. Each was built at a different time, and each grew its own version of who approves next, who is allowed to act, and what happens on rejection. Fixing a rule meant finding every copy.",
          cause:
            "The shared behaviour was not obvious until the third document type existed.",
          solution:
            "Pulled sequencing, permission checks, remarks, rejection handling and audit writes into one workflow service with a shared approval-step table keyed by request type and id. A document type now supplies only its route definition and its own validation.",
          tradeOff:
            "The shared engine is more abstract than any one document type needs, and an unusual route has to be expressed in its terms. That cost is paid once. The duplication was being paid on every change.",
          result:
            "Adding a document type is a route definition plus a form. Workflow bugs get fixed in one place.",
        },
        {
          title: "Delegation stamped the wrong name on pending requests",
          challenge:
            "The first version copied the delegate's name onto pending requests when the delegation was created. Requests filed after that, and delegations created after filing, still routed to whoever was away.",
          cause:
            "Delegation was treated as a one-time data update instead of a rule that is true for a period of time.",
          solution:
            "Store it as delegator, delegate, scope, start date, end date. Resolve the effective approver when the approval screen loads and again when the decision is submitted.",
          tradeOff:
            "Two lookups per decision instead of reading one column, and 'who can approve this' is no longer a simple query.",
          result:
            "Delegation behaves the way the office does. An approval cannot go through on authority that expired while the tab sat open.",
        },
        {
          title: "Balances drifted away from their own history",
          challenge:
            "The stored balance column stopped matching the records that were supposed to explain it, usually after a cancelled or corrected request.",
          cause:
            "Balance was a number that whichever code path ran happened to update. Cancellation and admin correction missed it.",
          solution:
            "Made the ledger the source of truth. Balance is the sum of credit and debit rows, cached and invalidated on write. Anything touching several rows runs in a transaction.",
          tradeOff:
            "Reads cost more than reading one column, and the cache has to be invalidated correctly.",
          result:
            "A corrected record produces a corrected balance. Any balance can be traced to the rows behind it.",
        },
      ],
      security: [
        "Session auth with bcrypt-hashed passwords through the framework hasher",
        "Permissions checked on the route and again in the service before a state change. Hiding a button is not the control",
        "Form Request validation at the HTTP boundary, so controllers never see raw input",
        "CSRF tokens on state-changing posts",
        "Queries go through the ORM and query builder. No string-concatenated SQL",
        "Blade escapes output by default, which covers stored XSS from remarks fields",
        "Uploads checked by extension and MIME type, size-limited, renamed on write, stored outside the web root",
        "Audit rows written in the same transaction as the change they describe",
        "Approval permissions granted per role rather than assumed from seniority",
        "Credentials read from environment config, never committed",
        "No system is ever fully secure. This is the list of controls that were in place, not a guarantee",
      ],
      database: {
        note: "Generalised. Table and column names are representative, not the production schema.",
        entities: [
          {
            name: "employees",
            purpose: "Person of record. Everything else hangs off this.",
            notableFields: ["id", "employee_no", "office_id", "position_id", "status"],
            relations: [
              "has many requests",
              "has many approval_steps as approver",
              "has one schedule",
            ],
          },
          {
            name: "requests",
            purpose: "One row per filed document, typed by request type.",
            notableFields: [
              "id",
              "type",
              "employee_id",
              "status",
              "filed_at",
              "deleted_at",
            ],
            relations: [
              "belongs to employees",
              "has many approval_steps",
              "has many audit_logs",
            ],
          },
          {
            name: "approval_steps",
            purpose: "The route. Ordered rows for who must act and what they decided.",
            notableFields: [
              "request_id",
              "level",
              "approver_id",
              "acted_by",
              "decision",
              "remarks",
              "acted_at",
            ],
            relations: ["belongs to requests", "belongs to employees"],
          },
          {
            name: "delegations",
            purpose: "Temporary transfer of approval authority.",
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
            name: "leave_ledger",
            purpose: "Credit and debit rows. Balance is their sum.",
            notableFields: [
              "employee_id",
              "leave_type",
              "credit",
              "debit",
              "effective_on",
              "source_request_id",
            ],
            relations: ["belongs to employees", "optionally belongs to requests"],
          },
          {
            name: "roles, permissions, role_permission",
            purpose: "RBAC stored as data so permissions change without a deploy.",
            notableFields: ["name", "slug"],
            relations: ["many-to-many with employees and with each other"],
          },
          {
            name: "audit_logs",
            purpose: "Append-only history of business actions.",
            notableFields: [
              "actor_id",
              "action",
              "auditable_type",
              "auditable_id",
              "changes",
              "created_at",
            ],
            relations: ["polymorphic to any audited record"],
          },
        ],
        considerations: [
          "Composite index on (request_id, level). The approval screen always reads a route in order.",
          "Index on (employee_id, status). 'My pending requests' is the most-hit query in the app.",
          "Foreign keys with restrictive deletes. Records are soft-deleted, not removed.",
          "One transaction covers a request, its approval step and the ledger together.",
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
            method: "GET",
            path: "/api/leave-applications/:id",
            purpose: "Read one request with its route",
            auth: "Filer, an approver on the route, or an admin",
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
            path: "/api/notifications/unread-count",
            purpose: "Small endpoint the client polls",
            auth: "Authenticated",
          },
        ],
        conventions: [
          "Validation runs before authorization, which runs before business logic.",
          "422 for validation with a field-keyed error object, 403 for permissions, 409 when the request is no longer in a state that allows the action.",
          "Submitting the same decision twice does not write two audit rows.",
          "Responses leave out fields the caller is not allowed to see, rather than sending them and hiding them.",
          "Clients get messages, never stack traces or SQL.",
        ],
      },
      code: [
        {
          title: "Resolving who can approve",
          language: "php",
          description:
            "Delegation has a validity window, so the answer depends on when you ask.",
          code: `final class ApprovalRouteService
{
    public function __construct(private DelegationRepository $delegations) {}

    public function effectiveApprover(ApprovalStep $step, CarbonInterface $at): int
    {
        $delegation = $this->delegations->activeFor(
            delegatorId: $step->approver_id,
            scope: $step->request->type,
            at: $at,
        );

        return $delegation?->delegate_id ?? $step->approver_id;
    }

    public function assertCanAct(ApprovalStep $step, User $user, CarbonInterface $at): void
    {
        if ($step->decision !== null) {
            throw new StepAlreadyDecided($step->id);
        }

        if ($this->effectiveApprover($step, $at) !== $user->id) {
            throw new NotAuthorisedToApprove($step->id);
        }
    }
}`,
        },
        {
          title: "Recording a decision",
          language: "php",
          description:
            "The step, the next step and the audit row land together or not at all.",
          code: `public function decide(ApprovalStep $step, User $actor, Decision $decision): Request
{
    return DB::transaction(function () use ($step, $actor, $decision) {
        $this->routes->assertCanAct($step, $actor, now());

        $step->update([
            'decision' => $decision->value,
            'acted_by' => $actor->id,
            'remarks'  => $decision->remarks,
            'acted_at' => now(),
        ]);

        $request = $decision->isRejection()
            ? $this->routes->reject($step->request, $decision->remarks)
            : $this->routes->advance($step->request);

        $this->audit->record($actor, "request.{$decision->value}", $request, [
            'level' => $step->level,
        ]);

        return $request;
    });
}`,
        },
        {
          title: "Permission middleware",
          language: "php",
          description: "One place decides whether a route is reachable.",
          code: `class EnsurePermission
{
    public function handle(Request $request, Closure $next, string $permission)
    {
        if (! $request->user()?->hasPermission($permission)) {
            abort(403);
        }

        return $next($request);
    }
}

Route::patch('/leave-applications/{application}/status', [LeaveController::class, 'decide'])
    ->middleware(['auth', 'permission:leave.approve']);`,
        },
      ],
      outcomes: [
        "Leave, overtime, CTO and office orders are filed and approved in one system instead of on paper.",
        "Every approved document has a history you can query: who acted, when, with what remarks.",
        "Approvals keep moving when an approver is away.",
        "Adding a document type is a data and validation change, not a new workflow.",
        "[Add a figure you can actually verify, such as number of users or requests processed. Do not estimate.]",
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
    technologies: ["Laravel", "PHP", "MySQL", "JavaScript", "REST API"],
    keyChallenge:
      "An application passes through inspectors, evaluators, cashiering and a signatory, in different provinces, and the office has to see which ones have been sitting too long at each stage.",
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
          "A Laravel application with two faces: a public side where establishments enrol and file, and an office side scoped by province and by route permission. An application row carries its stage; each stage transition writes its own record.",
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
    period: "[YYYY] — [YYYY]",
    organization: "DOLE Regional Office No. IV-A (CALABARZON)",
    status: "In production",
    technologies: ["Laravel", "PHP", "MySQL", "JavaScript", "REST API"],
    keyChallenge:
      "The certificate states that no record exists. Making that defensible a year later means the search behind it has to be reproducible, not re-run.",
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
    name: "Biometric Attendance Integration",
    tagline:
      "Fingerprint enrolment from a DigitalPersona reader into a web application, through a local C# service, with duplicate detection across the whole population.",
    type: "Desktop to web integration",
    role: "Full Stack Developer",
    period: "[YYYY] — [YYYY]",
    organization: "DOLE Regional Office No. IV-A (CALABARZON)",
    status: "In production",
    technologies: ["C#", ".NET", "DigitalPersona SDK", "PHP", "MySQL", "JavaScript"],
    keyChallenge:
      "A browser cannot talk to a USB fingerprint reader. Bridging the two without sending biometric images across the network, and catching the same person enrolled twice.",
    featured: true,
    confidential: true,
    // No screenshots: an enrolment screen shows a live capture, and there is no
    // version of that image that is safe to publish.
    screenshots: [],
    caseStudy: {
      overview:
        "Employees enrol a fingerprint once, and that enrolment identifies them for attendance afterwards. The reader is a USB DigitalPersona device driven by its Windows SDK. The system of record is a PHP web application. This work is the bridge between them.",
      users:
        "HR and admin staff running enrolment, and every employee whose attendance depends on that enrolment being correct and unique.",
      problem: [
        "Browsers cannot reach a USB fingerprint reader. The vendor SDK is a Windows .NET library, so capture has to happen in a native process.",
        "The same person could be enrolled under two employee records, by accident or otherwise, and nothing would catch it. That quietly breaks attendance for both records.",
        "Fingerprint data is sensitive. Whatever the design was, it could not put images on the network or in a web-accessible folder.",
      ],
      responsibilities: [
        "Design of the local service bridge between reader and web application",
        "The C# service: capture, template extraction, matching, local HTTP surface",
        "The web side: enrolment screen, API contract, storage, error handling",
        "Duplicate detection and how a match is shown to the operator",
        "Handling the failures that actually happen: reader unplugged, service not running, bad scan",
      ],
      teamNote:
        "[State whether the enrolment screen or the wider attendance module was shared work, and what was specifically yours.]",
      architecture: {
        summary:
          "The browser never touches the reader. A small C# service on the enrolment workstation owns the SDK and exposes a narrow endpoint on localhost. The page calls localhost. The server only ever receives a template.",
        layers: [
          { label: "Fingerprint reader", detail: "DigitalPersona USB device" },
          {
            label: "Local C# service",
            detail: "Capture, quality check, template extraction, matching",
          },
          {
            label: "Browser",
            detail:
              "Enrolment page calls localhost, receives a template and a quality score",
          },
          {
            label: "Web application",
            detail: "Validates, authorises, repeats the duplicate check, stores",
          },
          { label: "MySQL", detail: "Templates against employee records. No images" },
        ],
        integrations: [
          "Attendance records used by PRAMS to check overtime against work schedules",
        ],
      },
      features: [
        {
          title: "Guided enrolment",
          detail:
            "Several captures per finger with a quality floor. A bad scan is rejected while the person is still there.",
        },
        {
          title: "Template extraction",
          detail:
            "The SDK turns the scan into a template. The image is discarded in the local process.",
        },
        {
          title: "Duplicate detection",
          detail:
            "The candidate template is matched against existing ones before enrolment is accepted.",
        },
        {
          title: "Errors an operator can act on",
          detail:
            "Reader unplugged, service not running, driver failure and low quality each produce a different message.",
        },
        {
          title: "Re-enrolment",
          detail:
            "Replacing an enrolment is an explicit, recorded action rather than a silent overwrite.",
        },
      ],
      challenges: [
        {
          title: "Getting a browser to talk to a USB device",
          challenge:
            "The enrolment screen is a web page. The reader is only reachable through a Windows SDK.",
          cause:
            "Browsers deny pages direct device access, correctly, and the vendor SDK has no web equivalent.",
          solution:
            "A local C# service owns the device and exposes a minimal HTTP endpoint bound to localhost. The page calls it, gets a template and a quality score, and posts the template to the server through the normal authenticated API.",
          tradeOff:
            "Enrolment now needs software installed on the workstation, which is one more thing to deploy and keep running. In return the device code stays on the machine that has the device, and the web app stays a web app.",
          result:
            "Staff enrol from the browser they already use, and the device-specific code sits in one small service that can be replaced without touching the web app.",
        },
        {
          title: "Duplicate enrolments were invisible",
          challenge:
            "Nothing stopped one person being enrolled under two records. It surfaced weeks later as attendance that made no sense.",
          cause:
            "Enrolment was 'save this template to this employee', a write with no awareness of anyone else.",
          solution:
            "Match the candidate against existing templates first. A score above the threshold blocks the save and names the record it collided with. The check runs again on the server, so a client that skips it cannot write a duplicate.",
          tradeOff:
            "Enrolment is slower, and matching cost grows with the number of enrolled fingers. A threshold is also a real trade between false accepts and false rejects, so borderline scores go to the operator instead of being blocked outright.",
          result: "Duplicates are caught while the person is still in the room.",
        },
        {
          title: "Keeping fingerprint images out of the system",
          challenge:
            "The easy implementation sends the scan to the server and processes it there, which puts images on the network and in application storage.",
          cause:
            "Central processing is simpler than installing the SDK on every enrolment workstation.",
          solution:
            "The image never leaves the local process. Only the template crosses the network, over the authenticated session, and only templates are stored. Enrolment needs its own permission and is recorded.",
          tradeOff:
            "Matching logic exists in two places, and the workstation has to be trusted to run the real service.",
          result:
            "If the web application is ever compromised, fingerprint images are not part of what leaks.",
        },
      ],
      security: [
        "The local service binds to localhost and is not reachable from the network",
        "Images are never transmitted or stored. Only vendor templates are persisted",
        "Enrolment requires an authenticated session and its own permission",
        "The duplicate check runs on the server as well as the client",
        "Enrolment, re-enrolment and deletion are recorded",
        "Templates sit under the same access controls as other sensitive HR data",
        "No biometric data, sample template or capture screen appears anywhere in this portfolio",
      ],
      api: {
        note: "Representative shapes.",
        endpoints: [
          {
            method: "POST",
            path: "http://127.0.0.1:PORT/capture",
            purpose:
              "Local service: capture and return a template with a quality score",
            auth: "Localhost only",
          },
          {
            method: "POST",
            path: "/api/biometrics/duplicate-check",
            purpose: "Match a candidate template against existing enrolments",
            auth: "biometrics.enrol permission",
          },
          {
            method: "POST",
            path: "/api/biometrics/enrolments",
            purpose: "Store an enrolment after the server-side check",
            auth: "biometrics.enrol permission",
          },
          {
            method: "DELETE",
            path: "/api/biometrics/enrolments/:id",
            purpose: "Remove an enrolment",
            auth: "biometrics.manage permission",
          },
        ],
        conventions: [
          "Every capture returns a quality score so the UI can reject a bad scan before the operator moves on.",
          "A duplicate returns 409 with the conflicting record id.",
          "Device errors come back with a code the UI maps to an instruction, such as checking the USB connection.",
        ],
      },
      code: [
        {
          title: "Capture and discard the image",
          language: "csharp",
          description: "The image exists inside this method and nowhere else.",
          code: `public sealed class EnrolmentService
{
    private const int MinimumQuality = 60;

    public CaptureResult Capture()
    {
        using var sample = _reader.Acquire(timeout: TimeSpan.FromSeconds(15));

        if (sample.Quality < MinimumQuality)
            return CaptureResult.Rejected("Scan quality too low. Ask for another scan.");

        var template = _extractor.Extract(sample);

        return CaptureResult.Ok(Convert.ToBase64String(template.Bytes), sample.Quality);
    }
}`,
        },
        {
          title: "Duplicate scan",
          language: "csharp",
          description:
            "Matching is a threshold decision, so the score comes back with the result.",
          code: `public DuplicateResult FindDuplicate(byte[] candidate, IReadOnlyList<StoredTemplate> population)
{
    foreach (var enrolled in population)
    {
        var score = _matcher.Compare(candidate, enrolled.Bytes);

        if (score >= _matcher.IdentificationThreshold)
            return DuplicateResult.Match(enrolled.EmployeeId, score);
    }

    return DuplicateResult.None();
}`,
        },
        {
          title: "The server checks again",
          language: "php",
          description:
            "The browser already checked. That was for the operator, not for the database.",
          code: `public function store(EnrolFingerprintRequest $request): JsonResponse
{
    $this->authorize('biometrics.enrol');

    $conflict = $this->biometrics->findDuplicate(
        template: $request->validatedTemplate(),
        excludeEmployeeId: $request->integer('employee_id'),
    );

    if ($conflict !== null) {
        return response()->json([
            'message' => 'This fingerprint is already enrolled under another record.',
            'conflict_employee_id' => $conflict->employeeId,
        ], 409);
    }

    $enrolment = $this->biometrics->enrol($request->validated());
    $this->audit->record($request->user(), 'biometric.enrolled', $enrolment);

    return response()->json(['id' => $enrolment->id], 201);
}`,
        },
      ],
      outcomes: [
        "Enrolment runs from the browser staff already use.",
        "Duplicates are caught at enrolment instead of surfacing later in attendance data.",
        "Fingerprint images never cross the network or reach application storage.",
        "[Add verifiable figures if you have them, such as employees enrolled.]",
      ],
    },
  },

  // Additional systems. These get a card with one screenshot, not a case study.
  // Adding a `caseStudy` object to any of them gives it a page.
  {
    slug: "aep",
    name: "AEP",
    tagline:
      "Alien Employment Permit applications, from filing through evaluation to ID card release, with exclusion and exemption handled as separate paths.",
    type: "Regulatory workflow system",
    role: "Full Stack Developer",
    period: "[YYYY]",
    organization: "DOLE Regional Office No. IV-A (CALABARZON)",
    status: "In production",
    technologies: ["Laravel", "PHP", "MySQL"],
    keyChallenge:
      "Three application types share one pipeline but diverge at evaluation, and each stage has its own permission and its own reporting.",
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
    technologies: ["Laravel", "PHP", "MySQL", "Chart.js"],
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
    technologies: ["Laravel", "PHP", "MySQL"],
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
  {
    slug: "itsd",
    name: "IT Service Desk",
    tagline:
      "Ticketing for the IT unit. Requests come in from every office, get categorised, prioritised and assigned, and the queue shows what has been waiting longest.",
    type: "Internal ticketing system",
    role: "Full Stack Developer",
    period: "[YYYY]",
    organization: "DOLE Regional Office No. IV-A (CALABARZON)",
    status: "In production",
    technologies: ["[Stack — fill in]", "MySQL"],
    keyChallenge:
      "[The hardest part of this one, in a sentence. Ageing? Assignment? Categories?]",
    featured: false,
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
  },
  {
    slug: "do-174",
    name: "D.O. 174",
    tagline: "[One line: what the system does and who uses it.]",
    type: "Internal system",
    role: "Full Stack Developer",
    period: "[YYYY]",
    organization: "DOLE Regional Office No. IV-A (CALABARZON)",
    status: "In production",
    technologies: ["Laravel", "PHP", "MySQL"],
    keyChallenge: "[The hardest part of this one, in a sentence.]",
    featured: false,
    confidential: true,
    screenshots: [],
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
