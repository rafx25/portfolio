const role = "Full Stack Developer";
const headline = "I build internal web systems for DOLE Region IV-A.";

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
  intro:
    "I build and maintain the internal systems at DOLE Region IV-A: the HRIS used by about 500 employees, permit and certificate applications, TUPAD biometrics, and reporting for the provinces. Mostly PHP and MySQL, and lately Laravel with React.",

  // One list each, shared by the hero, the OG card, JSON-LD and meta keywords.
  stack: ["PHP", "Slim", "Laravel", "Inertia", "React", "MySQL", "JavaScript", "C#"],
  focus: [
    "REST API design",
    "Role-Based Access Control",
    "Approval workflows",
    "Single sign-on",
    "Database design",
    "Production deployment",
  ],

  // Shown on the resume and the contact section when set.
  phone: "+63 963 478 4940",
  email: "rafxd.25@gmail.com",
  github: "https://github.com/rafx25",
  linkedin: "https://www.linkedin.com/in/rafaeldomer/",
  resumePath: "/resume",
  avatarPath: "/avatar.jpg",
} as const;

export type SiteConfig = typeof site;

export function isPlaceholder(value: string) {
  return value.trim().startsWith("[") && value.trim().endsWith("]");
}
