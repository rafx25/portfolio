import type { EducationItem, ExperienceItem } from "./types";

// Newest first. Several positions at one organization share one entry.
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
      "Deployed through H&K Business Support, with one year (Nov 2024 to Dec 2025) employed by DOLE directly. I build and maintain the regional office's internal systems, from database design to production support.",
    highlights: [
      "Main developer of PRAMS, the regional Human Resource Information System (HRIS) used by about 500 employees across six field offices for leave, compensatory time-off, overtime and office orders, with multi-level approvals and audit logs.",
      "Designed approval routing that HR configures from a settings screen, so a new Regional Director's preferred flow no longer needs a code change. Reused the same design in TSIOS and the No Pending Case system.",
      "Built single sign-on (SSO) for PRAMS using one-time codes and server-to-server token exchange, so the region's other systems log staff in with one account.",
      "Added a retrieval-augmented generation (RAG) chatbot to PRAMS using the Gemini API, answering employee questions from HR's knowledge base.",
      "Hardened PRAMS sign-in with two-factor authentication (TOTP authenticator apps and backup codes) and a database-backed login lockout, and set up GitHub Actions CI with PHPStan and unit tests.",
      "Built TSIOS (Permit to Operate and electrical inspection certificates) and the No Pending Case system with a small team, from online application to e-signed certificate.",
      "Integrated DigitalPersona fingerprint readers with the TUPAD emergency employment program's web app through a local C# service for 1:N duplicate checks, and built an offline registration page for sites without internet.",
      "Built the Public Employment Service Office (PESO) reporting portal and the Client Satisfaction Measurement system, replacing emailed spreadsheets and paper surveys.",
      "Built the PRAMS Daily Time Record (DTR) module, now in user acceptance testing: ZKTeco biometric push integration, supervisor and HR validation, and leave deductions using the CSC conversion table.",
      "Building two Laravel and React applications: an IT help desk ticketing system with PRAMS single sign-on, and VCS, which replaces six Excel workbooks for tracking office bills.",
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
    summary: "Maintained the company's HRIS, built on JSP.",
    highlights: [
      "Maintained the company's CORE HRIS (Human Resource Information System) built on JSP: fixed bugs, added features and kept employee data accurate for payroll.",
      "Fixed the root causes of recurring user issues instead of correcting the data by hand each cycle.",
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
      "Started in data entry, moved to quality control, and from 2019 also worked as the lab's programmer.",
    highlights: [
      "Built the AlphaLab Record Management System with one other developer: test requests, results, client records and report release. It replaced the Excel files the lab had used for four years.",
      "Added role-based access control for analysts, encoders and admins, and dashboards that replaced manually compiled Excel summaries.",
      "As Quality System Supervisor, checked every test report before release and fixed recurring report errors in the system.",
      "Provided desktop and network support for the site.",
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
