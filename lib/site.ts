// Anything in [SQUARE BRACKETS] still needs filling in.
const role = "Full Stack Developer";
const headline = "I build the internal systems a government agency depends on.";

export const site = {
  name: "Rafael P. Domer",
  shortName: "RAF",
  role,
  location: "Calamba City, Laguna",
  availability: "Open to full-stack and backend roles",

  // Canonical URLs, sitemap, robots, OG tags. Set this in Vercel.
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",

  // The headline is the OG card; the tagline is the meta description.
  headline,
  tagline: `${role}. ${headline}`,
  summary:
    "Approval workflows, role-based access control, REST APIs and the database design beneath them. Most of it runs on PHP and MySQL, with Slim on the recent systems and plain PHP on the older ones. The newest is built with Laravel, Vue and Inertia.",
  intro:
    "I build the internal systems a government agency depends on: approval workflows for leave and overtime, permit and certificate applications, biometric verification, and the official forms these processes produce. Around 500 employees across six field offices use them daily.",

  // One list each, shared by the hero, the OG card, JSON-LD and meta keywords.
  stack: ["PHP", "Slim", "Laravel", "Inertia", "Vue.js", "MySQL", "JavaScript", "C#"],
  focus: [
    "REST API design",
    "Role-Based Access Control",
    "Approval workflows",
    "Database design",
    "Production deployment",
  ],

  // Shown on the resume page only, and only when set. Left blank on purpose:
  // a phone number on a public page gets scraped.
  phone: "",
  email: "rafxd.25@gmail.com",
  github: "https://github.com/rafx25",
  linkedin: "https://www.linkedin.com/in/rafael-domer-3126a1255/",
  resumePath: "/resume",
  avatarPath: "/avatar.png",
} as const;

export type SiteConfig = typeof site;

export function isPlaceholder(value: string) {
  return value.trim().startsWith("[") && value.trim().endsWith("]");
}
