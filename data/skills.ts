import type { SkillGroup } from "./types";

export const skills: SkillGroup[] = [
  {
    category: "Languages",
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
    items: [
      { name: "Slim Framework", level: "Production experience" },
      { name: "Laravel", level: "Production experience" },
      { name: "Plain PHP", level: "Production experience" },
      { name: "REST APIs", level: "Production experience" },
      { name: "PhpSpreadsheet / TCPDF / PhpWord", level: "Production experience" },
      { name: "Node.js / Express", level: "Working knowledge" },
      { name: ".NET", level: "Working knowledge" },
    ],
  },
  {
    category: "Frontend",
    items: [
      { name: "React", level: "Production experience" },
      { name: "Inertia.js", level: "Production experience" },
      { name: "HTML & CSS", level: "Production experience" },
      { name: "Service workers / IndexedDB", level: "Production experience" },
      { name: "Tailwind CSS", level: "Working knowledge" },
      { name: "Next.js", level: "Currently learning" },
    ],
  },
  {
    category: "Databases",
    items: [
      { name: "MySQL / MariaDB", level: "Production experience" },
      { name: "Schema design", level: "Production experience" },
      { name: "Query tuning", level: "Working knowledge" },
      { name: "MongoDB", level: "Working knowledge" },
      { name: "PostgreSQL", level: "Currently learning" },
    ],
  },
  {
    category: "Systems work",
    items: [
      { name: "Approval workflows", level: "Production experience" },
      { name: "Role-based access control", level: "Production experience" },
      { name: "Single sign-on", level: "Production experience" },
      { name: "Audit logging", level: "Production experience" },
      { name: "Excel import / export", level: "Production experience" },
      { name: "SSE / polling notifications", level: "Production experience" },
      { name: "RAG / Gemini API", level: "Working knowledge" },
    ],
  },
  {
    category: "Tools",
    items: [
      { name: "Git & GitHub", level: "Production experience" },
      { name: "cPanel / Hostinger", level: "Production experience" },
      { name: "Vercel", level: "Working knowledge" },
      { name: "GitHub Actions", level: "Working knowledge" },
      { name: "ZAP / Kali Linux (web app testing)", level: "Working knowledge" },
      { name: "Claude Code / Codex", level: "Working knowledge" },
      { name: "Vitest / PHPUnit / Pest", level: "Currently learning" },
    ],
  },
];

export const proficiencyOrder = [
  "Production experience",
  "Working knowledge",
  "Currently learning",
] as const;
