import { site } from "@/lib/site";
import { experienceSpan, formatDateRange, positionLabel } from "@/lib/utils";
import { education, experience } from "@/data/experience";
import { skills } from "@/data/skills";

// One source for both the printable page and the generated PDF, so the two
// can never say different things.

/**
 * Dashes and accented letters outside the standard PDF encoding come out
 * broken when the text is extracted, so anything bound for the PDF gets plain
 * ASCII instead ("Biñan" becomes "Binan").
 */
export function asciiDashes(value: string) {
  return value
    .replace(/[‒-―−]/g, "-")
    .replace(/[‘’]/g, "'")
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "");
}

// Spells out each acronym once: an ATS may search for either form.
export const resumeSummary = `Full Stack Developer with 6+ years building web applications in PHP, JavaScript and MySQL, from database design and REST APIs to production support. Main developer of the Human Resource Information System (HRIS) used by about 500 employees at the Department of Labor and Employment (DOLE) Region IV-A, and builder of the regional office's permit, certificate, biometric and reporting systems. Experienced in role-based access control (RBAC), single sign-on (SSO), approval workflows and audit logging. Currently building applications in Laravel and React.`;

/** Hyphen rather than an em dash: dash variants trip some date parsers. */
export const resumeDateRange = formatDateRange;

/** The deployed site, or null while building locally. */
function publicSiteUrl() {
  // A PDF built while developing must not advertise localhost.
  const isLocal = /^https?:\/\/(localhost|127\.0\.0\.1)/.test(site.url);
  return isLocal ? null : site.url.replace(/\/+$/, "");
}

function bareUrl(url: string) {
  return url.replace(/^https?:\/\//, "").replace(/\/+$/, "");
}

export function resumeContactLines() {
  const contact = [site.location, site.phone, site.email]
    .filter((v) => v && !v.startsWith("["))
    .join(" | ");

  const links = [publicSiteUrl() ?? "", site.github, site.linkedin]
    .filter((v) => v && !v.startsWith("["))
    .map(bareUrl)
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
  return experience.map((item) => {
    const span = experienceSpan(item);
    // With one position its own dates say the same thing, so skip the span.
    const spanLabel =
      item.positions.length > 1 ? resumeDateRange(span.start, span.end) : null;

    return {
      organization: item.organization,
      meta: asciiDashes([item.location, spanLabel].filter(Boolean).join(" | ")),
      positions: item.positions.map((position) => ({
        title: asciiDashes(positionLabel(position)),
        dates: resumeDateRange(position.start, position.end),
      })),
      highlights: item.highlights.map(asciiDashes),
      // Ties each skill to a job, which ATS tools use to judge recency.
      technologies: item.technologies.join(", "),
    };
  });
}

/** Work outside a job. Kept apart from Experience so an ATS doesn't read it as employment. */
const resumeProjectItems = [
  {
    name: "GACC Worship",
    meta: "Volunteer side project, God's Anointing Christian Church | 2026",
    highlights: [
      "Built an offline worship presentation app for a local church: song lyrics, Bible verses and announcement slides run from one operator screen, with a projector window kept in sync over BroadcastChannel.",
      "Packaged it with Electron as a Windows installer and a portable USB version that places the projector fullscreen on the second display automatically.",
    ],
    technologies: ["JavaScript", "HTML", "CSS", "Electron", "IndexedDB"],
  },
];

export function resumeProjects() {
  return resumeProjectItems.map((item) => ({
    name: item.name,
    meta: asciiDashes(item.meta),
    highlights: item.highlights.map(asciiDashes),
    technologies: item.technologies.join(", "),
  }));
}

export function resumeEducation() {
  return education.map((item) => ({
    qualification: item.qualification,
    meta: `${item.institution} | ${item.start} - ${item.end}`,
  }));
}
