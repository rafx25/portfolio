import { skills } from "@/data/skills";
import type { ProficiencyLevel } from "@/data/types";
import { cn } from "@/lib/utils";
import { Section } from "@/components/ui/section";

const levelStyles: Record<ProficiencyLevel, string> = {
  "Production experience": "border-accent/40 bg-accent-subtle text-foreground",
  "Working knowledge": "border-border bg-surface-muted text-muted-foreground",
  "Currently learning": "border-dashed border-border text-muted-foreground",
};

const legend: { level: ProficiencyLevel; meaning: string }[] = [
  {
    level: "Production experience",
    meaning: "Shipped it, still maintain it, real users on it",
  },
  {
    level: "Working knowledge",
    meaning: "Have used it and can work in it",
  },
  {
    level: "Currently learning",
    meaning: "Studying it. Not claiming more than that",
  },
];

export function Skills() {
  return (
    <Section
      id="stack"
      eyebrow="Stack"
      title="What I use, and how far I have taken it"
      description="No percentage bars. Each item says whether it has been in production, whether I can work in it, or whether I am still learning it."
    >
      <ul className="border-border bg-surface mb-10 grid gap-3 rounded-lg border p-5 sm:grid-cols-3">
        {legend.map(({ level, meaning }) => (
          <li key={level} className="text-sm">
            <span
              className={cn(
                "inline-flex rounded border px-2 py-0.5 font-mono text-[0.7rem]",
                levelStyles[level],
              )}
            >
              {level}
            </span>
            <p className="text-muted-foreground mt-2 text-xs leading-relaxed">
              {meaning}
            </p>
          </li>
        ))}
      </ul>

      <div className="grid gap-x-10 gap-y-10 sm:grid-cols-2">
        {skills.map((group) => (
          <section key={group.category} className="reveal">
            <h3 className="text-base font-semibold tracking-tight">{group.category}</h3>
            <p className="text-muted-foreground mt-1 text-sm">{group.description}</p>
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
                    {/* Colour alone must not carry the level. */}
                    <span className="sr-only"> — {item.level}</span>
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
