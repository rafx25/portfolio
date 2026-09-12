import { site } from "@/lib/site";
import { education, experience } from "@/data/experience";
import { skills } from "@/data/skills";
import { projects } from "@/data/projects";

// One source for both the printable page and the generated PDF, so the two
// can never say different things.

/**
 * Dashes outside the standard PDF encoding come out blank when the text is
 * extracted, so anything bound for the PDF gets plain ASCII instead.
 */
export function asciiDashes(value: string) {
  return value.replace(/[‒-―−]/g, "-").replace(/[‘’]/g, "'");
}

export const resumeSummary = `Full stack developer with 6+ years building and maintaining workflow-driven web applications for government agencies and private-sector organisations. Delivered HRIS, regulatory permitting, biometric deduplication, reporting and laboratory management systems in PHP, MySQL, JavaScript and Slim Framework. Experienced in role-based access control, multi-level approval workflows, audit logging, legacy system maintenance, document generation and production support. Currently building with Laravel 12, Inertia.js and Vue 3.`;

/** Hyphen rather than an em dash: dash variants trip some date parsers. */
export function resumeDateRange(start: string, end: string | null) {
  return `${start} - ${end ?? "Present"}`;
}

export function resumeContactLines() {
  const contact = [site.location, site.phone, site.email]
    .filter((v) => v && !v.startsWith("["))
    .join(" | ");

  // A PDF built while developing must not advertise localhost.
  const isLocal = /^https?:\/\/(localhost|127\.0\.0\.1)/.test(site.url);

  const links = [isLocal ? "" : site.url, site.github, site.linkedin]
    .filter((v) => v && !v.startsWith("["))
    .map((v) => v.replace(/^https?:\/\//, "").replace(/\/+$/, ""))
    .join(" | ");

  return { contact, links };
}

export function resumeSkillLines() {
  return skills.map((group) => {
    const shipped = group.items
      .filter((item) => item.level !== "Currently learning")
      .map((item) => item.name)
      .join(", ");

    const learning = group.items
      .filter((item) => item.level === "Currently learning")
      .map((item) => item.name)
      .join(", ");

    return {
      category: group.category,
      value: learning ? `${shipped}. Learning: ${learning}` : shipped,
    };
  });
}

export function resumeExperience() {
  return experience.map((item) => ({
    role: item.role,
    meta: asciiDashes(
      [item.organization, item.location, resumeDateRange(item.start, item.end)]
        .filter(Boolean)
        .join(" | "),
    ),
    highlights: item.highlights.map(asciiDashes),
  }));
}

export function resumeSystems() {
  return projects
    .filter((p) => p.featured || p.screenshots.length > 0)
    .map((p) => ({
      name: p.name,
      detail: asciiDashes(`${p.tagline} Built with ${p.technologies.join(", ")}.`),
    }));
}

export function resumeEducation() {
  return education.map((item) => ({
    qualification: item.qualification,
    meta: `${item.institution} | ${item.start} - ${item.end}`,
  }));
}
