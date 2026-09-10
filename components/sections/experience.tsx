import { experience } from "@/data/experience";
import { formatDateRange } from "@/lib/utils";
import { Section } from "@/components/ui/section";
import { Badge } from "@/components/ui/badge";

export function Experience() {
  return (
    <Section
      id="experience"
      eyebrow="Experience"
      title="Where the production experience comes from"
      description="Building for an office that has to keep working while you change the software teaches things a side project does not."
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
    </Section>
  );
}
