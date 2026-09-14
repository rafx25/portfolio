import type { Metadata } from "next";

import { site } from "@/lib/site";
import { education, experience } from "@/data/experience";
import { skills } from "@/data/skills";
import { projects } from "@/data/projects";
import { resumeContactLines } from "@/lib/resume-content";
import { Container } from "@/components/ui/container";
import { PrintButton } from "./print-button";

export const metadata: Metadata = {
  title: "Résumé",
  description: `Résumé of ${site.name}, ${site.role}. Experience, systems delivered, technical skills and education.`,
  alternates: { canonical: "/resume" },
};

const summary = `Full stack developer with 6+ years building and maintaining workflow-driven web applications for government agencies and private-sector organisations. Delivered HRIS, regulatory permitting, biometric deduplication, reporting and laboratory management systems in PHP, MySQL, JavaScript and Slim Framework. Experienced in role-based access control, multi-level approval workflows, audit logging, legacy system maintenance, document generation and production support. Currently building with Laravel 12, Inertia.js and Vue 3.`;

/** Hyphen rather than an em dash: dash variants trip some date parsers. */
function dateRange(start: string, end: string | null) {
  return `${start} - ${end ?? "Present"}`;
}

/**
 * Applicant tracking systems read the PDF as a flat stream of text, so this
 * page is a single column from top to bottom. No side-by-side blocks, no
 * layout tables, no icons, and headings use the wording those parsers expect.
 */
function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-5">
      <h2 className="border-border break-after-avoid border-b pb-1 text-sm font-bold tracking-wide uppercase">
        {title}
      </h2>
      <div className="mt-3">{children}</div>
    </section>
  );
}

export default function ResumePage() {
  const { contact, links } = resumeContactLines();
  const delivered = projects.filter((p) => p.featured || p.screenshots.length > 0);

  return (
    <div className="resume-page py-10 sm:py-14">
      <Container className="max-w-3xl">
        <div className="print:hidden">
          <p className="text-muted-foreground text-sm">
            Single column and readable by applicant tracking systems. The download is a
            generated PDF, not a screenshot, so the text stays selectable.
          </p>
          <div className="mt-4">
            <PrintButton />
          </div>
          <hr className="border-border mt-8" />
        </div>

        <header className="mt-8 print:mt-0">
          <h1 className="text-2xl font-bold tracking-tight uppercase">{site.name}</h1>
          <p className="mt-1 text-base font-semibold">{site.role}</p>
          <p className="text-muted-foreground mt-2 text-sm">{contact}</p>
          {links ? <p className="text-muted-foreground text-sm">{links}</p> : null}
        </header>

        <Section title="Professional Summary">
          <p className="text-sm leading-relaxed">{summary}</p>
        </Section>

        <Section title="Core Technical Skills">
          <ul className="space-y-1.5">
            {skills.map((group) => (
              <li key={group.category} className="text-sm leading-relaxed">
                <span className="font-semibold">{group.category}: </span>
                {group.items
                  .filter((item) => item.level !== "Currently learning")
                  .map((item) => item.name)
                  .join(", ")}
                {group.items.some((item) => item.level === "Currently learning") ? (
                  <>
                    {". Learning: "}
                    {group.items
                      .filter((item) => item.level === "Currently learning")
                      .map((item) => item.name)
                      .join(", ")}
                  </>
                ) : null}
              </li>
            ))}
          </ul>
        </Section>

        <Section title="Professional Experience">
          {experience.map((item) => (
            <div
              key={`${item.organization}-${item.start}`}
              className="mt-4 break-inside-avoid first:mt-0"
            >
              <h3 className="text-sm font-bold">{item.role}</h3>
              <p className="text-muted-foreground text-sm">
                {[item.organization, item.location, dateRange(item.start, item.end)]
                  .filter(Boolean)
                  .join(" | ")}
              </p>

              <ul className="mt-1.5 space-y-1">
                {item.highlights.map((highlight) => (
                  <li
                    key={highlight}
                    className="pl-4 -indent-4 text-sm leading-relaxed"
                  >
                    {"• "}
                    {highlight}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </Section>

        <Section title="Delivered Systems">
          <ul className="space-y-2">
            {delivered.map((project) => (
              <li
                key={project.slug}
                className="break-inside-avoid pl-4 -indent-4 text-sm leading-relaxed"
              >
                {"• "}
                <span className="font-semibold">{project.name}</span>
                {" — "}
                {project.tagline} Built with {project.technologies.join(", ")}.
              </li>
            ))}
          </ul>
        </Section>

        <Section title="Education">
          {education.map((item) => (
            <div key={item.qualification} className="text-sm leading-relaxed">
              <p className="font-semibold">{item.qualification}</p>
              <p className="text-muted-foreground">
                {item.institution} | {item.start} - {item.end}
              </p>
            </div>
          ))}
        </Section>
      </Container>
    </div>
  );
}
