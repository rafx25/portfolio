import type { SkillGroup } from "./types";

// No percentages. "PHP 92%" means nothing and invites a question you cannot
// answer. Three levels:
//   Production experience - shipped and maintained with real users
//   Working knowledge     - used it, productive with it
//   Currently learning    - studying it, nothing more
export const skills: SkillGroup[] = [
  {
    category: "Languages",
    description: "What I write day to day.",
    items: [
      { name: "PHP", level: "Production experience" },
      { name: "JavaScript", level: "Production experience" },
      { name: "SQL", level: "Production experience" },
      { name: "C#", level: "Working knowledge" },
      { name: "TypeScript", level: "Currently learning" },
    ],
  },
  {
    category: "Backend",
    description: "Where most of my production work lives.",
    items: [
      { name: "Slim Framework", level: "Production experience" },
      { name: "Native PHP (no framework)", level: "Production experience" },
      { name: "PhpSpreadsheet / TCPDF / PhpWord", level: "Production experience" },
      { name: "Laravel", level: "Production experience" },
      { name: "REST API design", level: "Production experience" },
      { name: "Node.js", level: "Working knowledge" },
      { name: "Express.js", level: "Working knowledge" },
      { name: ".NET (local service integration)", level: "Working knowledge" },
    ],
  },
  {
    category: "Frontend",
    description: "The interfaces on top of those systems.",
    items: [
      { name: "Vue.js", level: "Production experience" },
      { name: "Inertia.js", level: "Production experience" },
      { name: "HTML & CSS", level: "Production experience" },
      { name: "Tailwind CSS", level: "Working knowledge" },
      { name: "React", level: "Currently learning" },
      { name: "Next.js", level: "Currently learning" },
    ],
  },
  {
    category: "Databases",
    description: "Schema design, queries and the parts that bite in production.",
    items: [
      { name: "MySQL / MariaDB", level: "Production experience" },
      { name: "Schema design & normalisation", level: "Production experience" },
      { name: "Indexing & query tuning", level: "Working knowledge" },
      { name: "MongoDB", level: "Working knowledge" },
      { name: "PostgreSQL", level: "Currently learning" },
    ],
  },
  {
    category: "Architecture & engineering",
    description: "Patterns I have actually had to get right in a live system.",
    items: [
      { name: "Multi-level approval workflows", level: "Production experience" },
      { name: "Role-Based Access Control", level: "Production experience" },
      { name: "Authentication & authorization", level: "Production experience" },
      { name: "Audit logging", level: "Production experience" },
      { name: "Service-layer separation", level: "Production experience" },
      { name: "Soft deletes & data retention", level: "Production experience" },
      {
        name: "Real-time notifications (SSE, polling)",
        level: "Production experience",
      },
      { name: "File upload handling & validation", level: "Production experience" },
      { name: "Excel import / export pipelines", level: "Production experience" },
      {
        name: "Government form generation (PhpSpreadsheet, TCPDF)",
        level: "Production experience",
      },
      { name: "PSR-7 / PSR-15 middleware", level: "Production experience" },
    ],
  },
  {
    category: "Tooling & operations",
    description: "Getting it out the door and keeping it running.",
    items: [
      { name: "Git & GitHub", level: "Production experience" },
      { name: "Production deployment & maintenance", level: "Production experience" },
      { name: "Debugging live issues", level: "Production experience" },
      { name: "Environment configuration & secrets", level: "Production experience" },
      { name: "Shared hosting (cPanel / Hostinger)", level: "Production experience" },
      { name: "Vercel", level: "Working knowledge" },
      { name: "GitHub Actions / CI", level: "Working knowledge" },
      { name: "Vitest / automated testing", level: "Currently learning" },
    ],
  },
];

export const proficiencyOrder = [
  "Production experience",
  "Working knowledge",
  "Currently learning",
] as const;
