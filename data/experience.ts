import type { EducationItem, ExperienceItem } from "./types";

// Newest first. Several positions at the same organization share one entry,
// so the highlights are not split across three near-identical headings.
export const experience: ExperienceItem[] = [
  {
    organization: "Department of Labor and Employment (DOLE) Regional Office IV-A",
    location: "Calamba City, Laguna",
    positions: [
      {
        title: "Computer Programmer",
        employer: "H&K Business Support Inc.",
        start: "January 2026",
        end: null,
      },
      {
        title: "Labor and Employment Officer II (Developer / Systems Support)",
        start: "November 2024",
        end: "December 2025",
      },
      {
        title: "Computer Programmer",
        employer: "H&K Business Support Inc.",
        start: "October 2023",
        end: "November 2024",
      },
    ],
    summary:
      "At the regional office since October 2023: deployed through H&K Business Support, with a year in between employed by DOLE directly. Building and maintaining the systems the regional office and its field offices run on, from schema design through to production support.",
    highlights: [
      "Main developer on the DOLE Region IV-A HRIS (PRAMS), built with a small team and used by roughly 500 employees across six field offices for leave, COC, CTO and overtime requests, with multi-level approvals and full audit logging.",
      "Built an approval route engine so HR can change the approval flow from a settings screen whenever a new Regional Director or Assistant Regional Director wants requests to pass through them or not, with no code change. Pending requests stay on the route they were filed under.",
      "Built single sign-on so the region's other internal systems log staff in through PRAMS (one-time codes, server-to-server token exchange, rate-limited endpoints), with an admin page to register systems and rotate their secrets.",
      "Designed approval delegation: an approver on leave hands their approvals to a deputy for a date range, only on their own steps, and the log records every decision made on their behalf.",
      "Built page-level access control and a Roles & Permissions screen; every route checks page access on the server before a controller runs.",
      "Built in-app notifications and messaging. Moved the notification badge from Server-Sent Events to interval polling when the hosting could not hold that many open connections, and kept streaming on the approval screens.",
      "Built a retrieval-augmented (RAG) AI assistant into the HRIS on the Gemini API, so employees can ask about their records and HR processes and get answers grounded in the system's own data.",
      "Built four regulatory systems end to end (Technical Safety Inspection, Alien Employment Permit, No Pending Case and D.O. 174 Job Contractor Registration), from application intake and document requirements to evaluator review and certificate issuance. Applicants file and track online instead of calling or visiting the regional office.",
      "Generated issued permits and certificates as PDFs straight from application data, so the printed document always matches the record.",
      "Integrated HID DigitalPersona DP4500 readers with the PHP application through a local .NET service, running 1:N deduplication against the TUPAD registry to catch duplicate enrollments before payouts. Packaged the service with an installer so field offices set it up without a developer on site.",
      "Built the PESO Online Report System so employment service offices across Region IV-A submit monthly reports through one portal instead of emailing spreadsheets, ending the manual re-keying at the regional office.",
      "Built the Client Satisfaction Measurement System to capture and score walk-in feedback for ARTA reporting, replacing paper surveys and manual tallying.",
      "Built the Request Processing Desk, an IT ticketing system on Laravel and React: staff sign in through PRAMS single sign-on, and reporters can track a ticket without an account.",
      "Building VCS on Laravel, Inertia and React to replace the region's six fixed-expense workbooks: bills tracked from receipt to payment, page-level access with province scoping, and an importer that repairs and reports the workbooks' typing errors.",
      "Owned production support: reproduced reported bugs, wrote the corrective SQL, then fixed the root cause so the same correction did not come back the following month.",
    ],
    technologies: [
      "PHP",
      "Slim Framework",
      "Laravel",
      "React",
      "MySQL",
      "JavaScript",
      "C# / .NET",
      "REST API",
      "PhpSpreadsheet",
      "TCPDF",
      "Chart.js",
      "Git",
    ],
  },
  {
    organization: "Gruppo EMS, Inc.",
    location: "Biñan City, Laguna",
    positions: [
      { title: "Application Specialist", start: "July 2021", end: "March 2023" },
    ],
    summary:
      "Maintained and extended a corporate HRIS on an older Java stack, in a private-sector manufacturing setting.",
    highlights: [
      "Maintained and extended the CORE HRIS: bug fixes, feature work, and keeping employee data clean enough for payroll-adjacent processes to rely on.",
      "Turned recurring user complaints into permanent code fixes instead of repeating the same manual correction each cycle.",
    ],
    technologies: ["JSP", "XML", "JavaScript", "MySQL"],
  },
  {
    organization: "Alpha Laboratory Calamba Phils., Corp.",
    location: "Calamba City, Laguna",
    positions: [
      { title: "IT Programmer", start: "February 2019", end: "May 2021" },
      { title: "Quality System Supervisor", start: "March 2020", end: "May 2021" },
      { title: "Data Specialist", start: "May 2015", end: "March 2020" },
    ],
    summary:
      "Six years at one testing laboratory. Data entry first, then quality control, with a developer role alongside both from 2019 that produced the system the lab moved onto.",
    highlights: [
      "Co-developed the AlphaLab Record Management System with one other developer, covering test request intake, result entry, client records and report release. It replaced the Excel tracking the lab had run on for four years.",
      "Added role-based access so lab analysts, encoders and administrators each saw only their part of the workflow, plus dashboards that replaced manually compiled Excel summaries.",
      "As Quality System Supervisor, checked every test report against the lab's release requirements before it reached the client, and fixed recurring report defects in the system rather than catching them again each month.",
      "Ran desktop IT for the site (computers, printers, network faults, software installs) and covered data entry during absences so report turnaround did not stall.",
    ],
    technologies: ["PHP", "MySQL", "JavaScript", "Bootstrap", "Excel"],
  },
];

export const education: EducationItem[] = [
  {
    qualification: "Bachelor of Science in Information Technology",
    institution: "City College of Calamba",
    start: "2010",
    end: "2014",
  },
];
