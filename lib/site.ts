// Anything in [SQUARE BRACKETS] still needs filling in.
export const site = {
  name: "Rafael P. Domer",
  shortName: "RAF",
  role: "Full Stack Developer",
  location: "Calamba City, Laguna",
  availability: "Open to full-stack and backend roles",

  // Canonical URLs, sitemap, robots, OG tags. Set this in Vercel.
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",

  tagline:
    "Full Stack Developer. I build the internal systems a government agency depends on.",
  summary:
    "Approval workflows, role-based access control, REST APIs and the database design beneath them. Most of it runs on PHP and MySQL, with Slim on the recent systems and plain PHP on the older ones. The newest is built with Laravel, Vue and Inertia.",

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
