import type { EducationItem, ExperienceItem } from "./types";

// Newest first. Highlights lead with a verb. Never write a number you cannot
// back up.
export const experience: ExperienceItem[] = [
  {
    role: "Computer Programmer",
    organization: "H&K Business Support Inc. — deployed to DOLE Regional Office IV-A",
    start: "January 2026",
    end: null,
    location: "Calamba City, Laguna",
    summary:
      "Continuous engagement with DOLE Regional Office IV-A since October 2023. Building and maintaining the systems the regional office and its field offices run on, from schema design through to production support.",
    highlights: [
      "Built the DOLE Region IV-A HRIS used by roughly 500 employees across six field offices, covering leave, COC, CTO and overtime requests with multi-level approval chains and full audit logging.",
      "Designed a delegation system so an approver on leave can hand authority to a deputy without breaking the audit trail.",
      "Enforced role-based access at the routing layer, so a permission is checked before a controller runs rather than inside it.",
      "Built in-app notifications and a messaging box. Started on Server-Sent Events, but the hosting could not sustain that many persistent connections, so the notification badge moved to interval polling and streaming stayed on the approval screens.",
      "Structured the backend in layers — controllers, service classes, DTOs and middleware — behind a REST API consumed by a JavaScript single-page front end.",
      "Integrated HID DigitalPersona DP4500 readers with the PHP application through a local .NET service, running 1:N deduplication against the TUPAD registry to catch duplicate enrolments before payouts.",
      "Packaged that service with an installer so field offices could deploy it themselves without a developer on site.",
      "Took the No Pending Case certification fully online: intake, document upload, evaluator routing and certificate issuance. Applicants no longer travel to the regional office to file or check status.",
      "Work directly with end users and adapt priorities as operational requirements change.",
    ],
    technologies: [
      "PHP",
      "Slim Framework",
      "MySQL",
      "JavaScript",
      "C# / .NET",
      "REST API",
      "Git",
    ],
  },
  {
    role: "Labor and Employment Officer II — Developer / Systems Support",
    organization: "Department of Labor and Employment Regional Office IV-A",
    start: "November 2024",
    end: "December 2025",
    location: "Calamba City, Laguna",
    summary:
      "Development and production support for the regional office's reporting and feedback systems, alongside the operational work the role carried.",
    highlights: [
      "Built the PESO Online Report System so employment service offices across Region IV-A could submit monthly reports through one portal instead of emailing spreadsheets, ending the manual re-keying at the regional office.",
      "Built the Client Satisfaction Measurement System to capture and score walk-in feedback for ARTA reporting, replacing paper surveys and manual tallying.",
      "Wrote the reporting queries behind regional monitoring and added Excel export so staff could pull data in the format central office already required.",
      "Owned production support: reproduced reported bugs, wrote the corrective SQL, then fixed the root cause so the same correction did not come back the following month.",
    ],
    technologies: [
      "PHP",
      "Slim Framework",
      "MySQL",
      "JavaScript",
      "PhpSpreadsheet",
      "Chart.js",
    ],
  },
  {
    role: "Computer Programmer",
    organization: "H&K Business Support Inc. — deployed to DOLE Regional Office IV-A",
    start: "October 2023",
    end: "November 2024",
    location: "Calamba City, Laguna",
    summary:
      "Built the regional office's regulatory permitting systems, each as its own codebase, covering the full path from application intake to issued certificate.",
    highlights: [
      "Built four regulatory systems end to end — Technical Safety Inspection, Alien Employment Permit, No Pending Case and D.O. 174 Job Contractor Registration — each covering application intake, document requirements, evaluator review and certificate issuance.",
      "Generated issued permits and certificates as PDFs straight from application data, so the printed document always matches the record.",
      "Moved permit processing off paper: applicants file and track online, and a status check that meant a phone call or an office visit became a page load.",
      "Inherited and extended existing PHP systems, where most of the work was reading someone else's code before adding to it.",
    ],
    technologies: ["PHP", "MySQL", "JavaScript", "Bootstrap", "TCPDF"],
  },
  {
    role: "Application Specialist",
    organization: "Gruppo EMS, Inc.",
    start: "July 2021",
    end: "March 2023",
    location: "Philippines",
    summary:
      "Maintained and extended a corporate HRIS on an older Java stack, in a private-sector manufacturing setting.",
    highlights: [
      "Maintained and extended the CORE HRIS — bug fixes, feature work, and keeping employee data clean enough for payroll-adjacent processes to rely on.",
      "Turned recurring user complaints into permanent code fixes instead of repeating the same manual correction each cycle.",
    ],
    technologies: ["JSP", "XML", "JavaScript", "MySQL"],
  },
  {
    role: "IT Programmer",
    organization: "Alpha Laboratory Calamba Phils., Corp.",
    start: "February 2019",
    end: "May 2021",
    location: "Calamba City, Laguna",
    summary:
      "A concurrent technical role alongside quality work: co-built the laboratory system that replaced the spreadsheets I had been maintaining by hand.",
    highlights: [
      "Co-developed the AlphaLab Record Management System with one other developer, covering test request intake, result entry, client records and report release.",
      "Replaced the spreadsheets I had maintained by hand for four years with a system the lab ran on.",
      "Added role-based access so lab analysts, encoders and administrators each saw only their part of the workflow, plus dashboards that replaced manually compiled Excel summaries.",
      "Kept extending the system over the following two years as the lab's needs shifted — new report formats, extra fields, changes to how results were released.",
    ],
    technologies: ["PHP", "MySQL", "JavaScript", "Bootstrap"],
  },
  {
    role: "Quality System Supervisor",
    organization: "Alpha Laboratory Calamba Phils., Corp.",
    start: "March 2020",
    end: "May 2021",
    location: "Calamba City, Laguna",
    summary:
      "Owned quality control on released test reports while continuing to develop the system that produced them.",
    highlights: [
      "Checked every test report against the lab's release requirements before it reached the client.",
      "Ran desktop IT for the site — computers, printers, network faults, software installs — and covered the Data Specialist role during absences so report turnaround did not stall.",
      "Reviewed and developed the same system at once, so recurring report defects were fixed in code rather than caught again the following month.",
    ],
    technologies: ["PHP", "MySQL", "Quality systems"],
  },
  {
    role: "Data Specialist",
    organization: "Alpha Laboratory Calamba Phils., Corp.",
    start: "May 2015",
    end: "March 2020",
    location: "Calamba City, Laguna",
    summary:
      "Where the operational understanding came from: running the data the lab depended on, before automating it.",
    highlights: [
      "Managed data entry for test requests and results.",
      "Maintained the Excel tracking the lab ran on — the process I later helped replace with software.",
    ],
    technologies: ["Excel", "Data management"],
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
