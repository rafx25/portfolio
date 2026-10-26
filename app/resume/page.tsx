import type { Metadata } from "next";

import { site } from "@/lib/site";
import {
  resumeContactLines,
  resumeEducation,
  resumeExperience,
  resumeSkillLines,
  resumeSummary,
} from "@/lib/resume-content";
import { Container } from "@/components/ui/container";
import { PrintButton } from "./print-button";

export const metadata: Metadata = {
  title: "Resume",
  description: `Resume of ${site.name}, ${site.role}. Experience, skills and education.`,
  alternates: { canonical: "/resume" },
};

/**
 * Applicant tracking systems read the PDF as a flat stream of text, so this
 * page is a single column from top to bottom. No side-by-side blocks, no
 * layout tables, no icons, and headings use the wording those parsers expect.
 */
function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-5">
      <h2 className="border-border break-after-avoid border-b pb-1 text-sm font-bold uppercase">
        {title}
      </h2>
      <div className="mt-3">{children}</div>
    </section>
  );
}

export default function ResumePage() {
  const { contact, links } = resumeContactLines();

  return (
    <div className="resume-page py-10 sm:py-14">
      <Container className="max-w-3xl">
        <div className="print:hidden">
          <PrintButton />
          <hr className="border-border mt-8" />
        </div>

        <header className="mt-8 print:mt-0">
          <h1 className="text-2xl font-bold tracking-tight uppercase">{site.name}</h1>
          <p className="mt-1 text-base font-semibold">{site.role}</p>
          <p className="text-muted-foreground mt-2 text-sm">{contact}</p>
          {links ? <p className="text-muted-foreground text-sm">{links}</p> : null}
        </header>

        <Section title="Summary">
          <p className="text-sm leading-relaxed">{resumeSummary}</p>
        </Section>

        <Section title="Technical Skills">
          <ul className="space-y-1.5">
            {resumeSkillLines().map((group) => (
              <li key={group.category} className="text-sm leading-relaxed">
                <span className="font-semibold">{group.category}: </span>
                {group.value}
              </li>
            ))}
          </ul>
        </Section>

        <Section title="Experience">
          {resumeExperience().map((item) => (
            <div key={item.organization} className="mt-5 first:mt-0">
              <div className="break-inside-avoid">
                <h3 className="text-sm font-bold">{item.organization}</h3>
                <p className="text-muted-foreground text-sm">{item.meta}</p>
                <ul className="mt-1 text-sm">
                  {item.positions.map((position) => (
                    <li key={`${position.title}-${position.dates}`}>
                      <span className="font-semibold">{position.title}</span>
                      {` | ${position.dates}`}
                    </li>
                  ))}
                </ul>
              </div>

              <ul className="mt-1.5 space-y-1">
                {item.highlights.map((highlight) => (
                  <li
                    key={highlight}
                    className="break-inside-avoid pl-4 -indent-4 text-sm leading-relaxed"
                  >
                    {"• "}
                    {highlight}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </Section>

        <Section title="Education">
          {resumeEducation().map((item) => (
            <div key={item.qualification} className="text-sm leading-relaxed">
              <p className="font-semibold">{item.qualification}</p>
              <p className="text-muted-foreground">{item.meta}</p>
            </div>
          ))}
        </Section>
      </Container>
    </div>
  );
}
