// Anything in [SQUARE BRACKETS] still needs filling in.
export const site = {
  name: "[YOUR FULL NAME]",
  shortName: "[YOUR NAME]",
  role: "Full Stack Developer",
  location: "[CITY, PROVINCE, PHILIPPINES]",
  availability: "Open to full-stack and backend roles",

  // Canonical URLs, sitemap, robots, OG tags. Set this in Vercel.
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",

  tagline:
    "Full Stack Developer. I build the internal systems a government office runs on.",
  summary:
    "Approval workflows, role-based access, REST APIs and the database design under them. Most of my production work is PHP and Laravel on MySQL, with Vue on the front end.",

  email: "[YOUR PUBLIC EMAIL]",
  github: "[https://github.com/YOUR-USERNAME]",
  linkedin: "[https://www.linkedin.com/in/YOUR-HANDLE]",
  resumePath: "/resume.pdf",
  avatarPath: "/avatar.jpg",
} as const;

export type SiteConfig = typeof site;

export function isPlaceholder(value: string) {
  return value.trim().startsWith("[") && value.trim().endsWith("]");
}
