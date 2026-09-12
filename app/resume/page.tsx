import type { Metadata } from "next";

import { site } from "@/lib/site";
import { education, experience } from "@/data/experience";
import { skills } from "@/data/skills";
import { projects } from "@/data/projects";
import { formatDateRange } from "@/lib/utils";
import { Container } from "@/components/ui/container";
import { PrintButton } from "./print-button";

export const metadata: Metadata = {
  title: "Resume",
  description: `Resume of ${site.name}, ${site.role}. Experience, systems delivered, technical skills and education.`,
  alternates: { canonical: "/resume" },
};

const summary = `Full stack developer with 5+ years building and maintaining workflow-driven web applications for government agencies and private-sector organisations. Delivered HRIS, regulatory permitting, biometric deduplication, reporting and laboratory management systems in PHP, MySQL, JavaScript and Slim Framework. Experienced in role-based access control, multi-level approval workflows, audit logging, legacy system maintenance, document generation and production support. Currently building with Laravel 12, Inertia.js and Vue 3.`;

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-7 break-inside-avoid">
      <h2 className="border-border text-accent border-b pb-1 font-mono text-xs tracking-widest uppercase">
        {title}
      </h2>
      <div className="mt-4">{children}</div>
    </section>
  );
}

export default function ResumePage() {
  const contact = [site.location, site.email, site.github, site.linkedin].filter(
    (v) => !v.startsWith("["),
  );

  const delivered = projects.filter((p) => p.featured || p.screenshots.length > 0);

  return (
    <div className="resume-page py-10 sm:py-14">
      <Container className="max-w-3xl">
        <div className="print:hidden">
          <p className="text-muted-foreground text-sm">
            This is the printable version. Use the button below and choose{" "}
            <span className="text-foreground">Save as PDF</span> as the destination.
          </p>
          <div className="mt-4">
            <PrintButton />
          </div>
          <hr className="border-border mt-8" />
        </div>

        <header className="mt-8 print:mt-0">
          <h1 className="text-3xl font-semibold tracking-tight">{site.name}</h1>
          <p className="text-accent mt-1 text-base font-medium">{site.role}</p>
          <p className="text-muted-foreground mt-3 text-sm leading-relaxed">
            {contact.map((item, i) => (
              <span key={item}>
                {i > 0 ? <span className="mx-2 opacity-40">|</span> : null}
                {item.replace(/^https?:\/\//, "")}
              </span>
            ))}
          </p>
        </header>

        <Section title="Summary">
          <p className="text-muted-foreground text-sm leading-relaxed">{summary}</p>
        </Section>

        <Section title="Technical skills">
          <dl className="space-y-2">
            {skills.map((group) => (
              <div key={group.category} className="text-sm sm:flex sm:gap-4">
                <dt className="w-44 shrink-0 font-medium">{group.category}</dt>
                <dd className="text-muted-foreground">
                  {group.items
                    .filter((i) => i.level !== "Currently learning")
                    .map((i) => i.name)
                    .join(", ")}
                  {group.items.some((i) => i.level === "Currently learning") ? (
                    <span className="opacity-70">
                      {" — learning: "}
                      {group.items
                        .filter((i) => i.level === "Currently learning")
                        .map((i) => i.name)
                        .join(", ")}
                    </span>
                  ) : null}
                </dd>
              </div>
            ))}
          </dl>
        </Section>

        <Section title="Experience">
          <ol className="space-y-6">
            {experience.map((item) => (
              <li
                key={`${item.organization}-${item.start}`}
                className="break-inside-avoid"
              >
                <div className="flex flex-col gap-0.5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
                  <h3 className="text-sm font-semibold">{item.role}</h3>
                  <span className="text-muted-foreground shrink-0 font-mono text-xs">
                    {formatDateRange(item.start, item.end)}
                  </span>
                </div>
                <p className="text-accent text-sm">{item.organization}</p>

                <ul className="mt-2 space-y-1.5">
                  {item.highlights.map((highlight) => (
                    <li
                      key={highlight}
                      className="text-muted-foreground flex gap-2 text-sm leading-relaxed"
                    >
                      <span className="mt-1.5 shrink-0 text-[0.6rem]" aria-hidden>
                        ▪
                      </span>
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
        </Section>

        <Section title="Selected systems">
          <ul className="space-y-2.5">
            {delivered.map((project) => (
              <li key={project.slug} className="break-inside-avoid text-sm">
                <span className="font-medium">{project.name}</span>
                <span className="text-muted-foreground">
                  {" — "}
                  {project.tagline}
                </span>
                <span className="text-muted-foreground block font-mono text-xs">
                  {project.technologies.join(" · ")}
                </span>
              </li>
            ))}
          </ul>
        </Section>

        <Section title="Education">
          <ul className="space-y-1">
            {education.map((item) => (
              <li
                key={item.qualification}
                className="flex flex-col gap-0.5 text-sm sm:flex-row sm:items-baseline sm:justify-between sm:gap-4"
              >
                <span className="font-medium">{item.qualification}</span>
                <span className="text-muted-foreground font-mono text-xs">
                  {item.institution} · {item.start}&ndash;{item.end}
                </span>
              </li>
            ))}
          </ul>
        </Section>
      </Container>
    </div>
  );
}
