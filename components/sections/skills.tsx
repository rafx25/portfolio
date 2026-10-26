import { proficiencyOrder, skills } from "@/data/skills";
import type { ProficiencyLevel } from "@/data/types";
import { cn } from "@/lib/utils";
import { Section } from "@/components/ui/section";

const levelStyles: Record<ProficiencyLevel, string> = {
  "Production experience": "border-accent/40 bg-accent-subtle text-foreground",
  "Working knowledge": "border-border bg-surface-muted text-muted-foreground",
  "Currently learning": "border-dashed border-border text-muted-foreground",
};

export function Skills() {
  return (
    <Section id="stack" eyebrow="Stack" title="Skills">
      <ul className="mb-10 flex flex-wrap justify-center gap-3">
        {proficiencyOrder.map((level) => (
          <li key={level}>
            <span
              className={cn(
                "inline-flex rounded border px-2 py-0.5 font-mono text-[0.7rem]",
                levelStyles[level],
              )}
            >
              {level}
            </span>
          </li>
        ))}
      </ul>

      <div className="grid gap-x-10 gap-y-10 sm:grid-cols-2">
        {skills.map((group) => (
          <section key={group.category} className="reveal">
            <h3 className="text-base font-semibold tracking-tight">{group.category}</h3>
            <ul className="mt-4 flex flex-wrap gap-1.5">
              {group.items.map((item) => (
                <li key={item.name}>
                  <span
                    className={cn(
                      "inline-flex items-center rounded border px-2 py-1 text-xs",
                      levelStyles[item.level],
                    )}
                  >
                    {item.name}
                    {/* Color alone must not carry the level. */}
                    <span className="sr-only">, {item.level}</span>
                  </span>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </Section>
  );
}
