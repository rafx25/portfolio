import type { ExperienceItem } from "./types";

// Newest first. Highlights lead with a verb. Never write a number you cannot
// back up. [SQUARE BRACKETS] still need filling in.
export const experience: ExperienceItem[] = [
  {
    role: "[YOUR JOB TITLE]",
    organization: "[ORGANIZATION]",
    start: "[MONTH YYYY]",
    end: null,
    location: "[CITY, PHILIPPINES]",
    summary:
      "Build and maintain the internal web systems used for personnel administration and records processing — from database design through to production deployment and day-to-day support.",
    highlights: [
      "Built PRAMS, an HRIS covering leave, overtime, CTO/COC and office orders, on Laravel and MySQL.",
      "Designed a shared multi-level approval engine so each new document type contributes only its route and its validation, instead of its own copy of the workflow logic.",
      "Implemented Role-Based Access Control with dynamic permissions enforced server-side on every route and again before each state change.",
      "Implemented delegation of approval authority resolved at decision time, so absences do not stall approvals.",
      "Integrated a DigitalPersona fingerprint reader with the web application through a local C# service, including 1:N duplicate detection at enrolment.",
      "Diagnosed a production outage caused by Server-Sent Events exhausting the PHP worker pool, and replaced it with interval polling that preserved the user experience.",
      "Implemented audit logging of business-significant actions, written in the same transaction as the change they record.",
      "Automated bulk record handling with validated Excel import and export.",
      "Deployed and maintained these systems in production, including troubleshooting live issues and database fixes.",
      "[Add work on TSIOS, PTO, CEI, AEP, D.O. 174, PESO and CSM here, one verb-led line each.]",
    ],
    technologies: [
      "PHP",
      "Laravel",
      "MySQL / MariaDB",
      "JavaScript",
      "Vue.js",
      "C#",
      "REST API",
      "Git",
    ],
  },
  {
    role: "[EARLIER ROLE - IT / SUPPORT / DEVELOPER]",
    organization: "[EARLIER ORGANIZATION]",
    start: "[START MONTH YYYY]",
    end: "[END MONTH YYYY]",
    location: "[CITY, PHILIPPINES]",
    summary:
      "[Two lines on what this role involved. If it was IT support rather than development, say so plainly. That is where the operational understanding came from.]",
    highlights: [
      "[Verb-led line about what you built, fixed or maintained.]",
      "[Verb-led line about systems, users or processes you supported.]",
      "[Delete this entry entirely if it does not apply.]",
    ],
    technologies: ["[Technology 1]", "[Technology 2]"],
  },
];
