import { education, experience } from "@/data/experience";
import { formatDateRange } from "@/lib/utils";
import { Section } from "@/components/ui/section";
import { Badge } from "@/components/ui/badge";

export function Experience() {
  return (
    <Section
      id="experience"
      eyebrow="Experience"
      title="How I got here"
      description="Data entry to full stack, mostly spent replacing manual work with systems people depend on."
    >
      <ol className="space-y-12">
        {experience.map((item) => (
          <li
            key={`${item.organization}-${item.start}`}
            className="reveal border-border relative border-l pl-6 sm:pl-8"
          >
            <span
              className="bg-accent absolute top-1.5 -left-[4.5px] size-2 rounded-full"
              aria-hidden
            />

            <p className="text-muted-foreground font-mono text-xs tracking-wide">
              {formatDateRange(item.start, item.end)}
              {item.location ? ` · ${item.location}` : null}
            </p>

            <h3 className="mt-2 text-lg font-semibold tracking-tight">{item.role}</h3>
            <p className="text-accent text-sm">{item.organization}</p>

            <p className="text-muted-foreground mt-3 max-w-2xl text-sm leading-relaxed">
              {item.summary}
            </p>

            <ul className="mt-5 space-y-2">
              {item.highlights.map((highlight) => (
                <li key={highlight} className="flex gap-3 text-sm leading-relaxed">
                  <span
                    className="bg-border-strong mt-2 size-1 shrink-0 rounded-full"
                    aria-hidden
                  />
                  <span>{highlight}</span>
                </li>
              ))}
            </ul>

            <ul className="mt-5 flex flex-wrap gap-1.5" aria-label="Technologies">
              {item.technologies.map((tech) => (
                <li key={tech}>
                  <Badge>{tech}</Badge>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ol>

      <div className="border-border reveal mt-14 border-t pt-8">
        <h3 className="text-muted-foreground font-mono text-xs tracking-widest uppercase">
          Education
        </h3>
        <ul className="mt-4 space-y-3">
          {education.map((item) => (
            <li
              key={item.qualification}
              className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6"
            >
              <span className="text-sm font-medium">{item.qualification}</span>
              <span className="text-muted-foreground text-sm">
                {item.institution} · {item.start}&ndash;{item.end}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
