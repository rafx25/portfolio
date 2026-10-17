import { site } from "@/lib/site";
import { experienceSpan, formatDateRange, positionLabel } from "@/lib/utils";
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

export const resumeSummary = `Full stack developer with 6+ years building and maintaining workflow-driven web applications for government agencies and private-sector organizations. Delivered HRIS, regulatory permitting, biometric deduplication, reporting and laboratory management systems in PHP, MySQL, JavaScript and Slim Framework. Experienced in role-based access control, configurable multi-level approval workflows, single sign-on, audit logging, legacy system maintenance, document generation and production support. Built a RAG-based AI assistant for the HRIS on the Gemini API. Currently building with Laravel 12, Inertia.js and React.`;

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
    const listed = group.items.filter((item) => item.resume !== false);

    const shipped = listed
      .filter((item) => item.level !== "Currently learning")
      .map((item) => item.name)
      .join(", ");

    const learning = listed
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
    };
  });
}

/**
 * One line per system. The experience bullets already describe the work, so
 * this is the index a reader skims, with the case studies for the detail.
 */
export function resumeSystems() {
  return projects
    .filter((p) => p.featured || p.screenshots.length > 0)
    .map((p) => {
      const status = p.status === "UAT" ? "in UAT" : p.status.toLowerCase();

      return {
        name: p.name,
        detail: asciiDashes(
          `${p.type} (${status}). ${p.technologies.slice(0, 4).join(", ")}.`,
        ),
      };
    });
}

/** Where the full case studies live, or null when there is no public site. */
export function resumeCaseStudiesLink() {
  const url = publicSiteUrl();
  return url ? `Case studies: ${bareUrl(url)}/projects` : null;
}

export function resumeEducation() {
  return education.map((item) => ({
    qualification: item.qualification,
    meta: `${item.institution} | ${item.start} - ${item.end}`,
  }));
}
