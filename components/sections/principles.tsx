import { principles } from "@/data/engineering";
import { Section } from "@/components/ui/section";

export function Principles() {
  return (
    <Section
      id="principles"
      eyebrow="How I work"
      title="How I work"
      description="Each of these is on the list because ignoring it cost me something in a system that was already live."
    >
      <div className="grid gap-x-10 gap-y-8 sm:grid-cols-2">
        {principles.map((principle) => (
          <div key={principle.title} className="reveal">
            <h3 className="text-sm font-semibold">{principle.title}</h3>
            <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
              {principle.detail}
            </p>
          </div>
        ))}
      </div>
    </Section>
  );
}
