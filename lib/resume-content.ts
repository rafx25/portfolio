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

export const resumeSummary = `Full stack developer with 6+ years building internal web systems in PHP, MySQL and JavaScript. Main developer of the DOLE Region IV-A HRIS (about 500 users), and builder of the regional office's permit, certificate, biometric and reporting systems. Recent work in Laravel, React and TypeScript.`;

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
    };
  });
}

export function resumeEducation() {
  return education.map((item) => ({
    qualification: item.qualification,
    meta: `${item.institution} | ${item.start} - ${item.end}`,
  }));
}
