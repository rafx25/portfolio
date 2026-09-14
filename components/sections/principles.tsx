import { principles } from "@/data/engineering";
import { Section } from "@/components/ui/section";

export function Principles() {
  return (
    <Section
      id="principles"
      eyebrow="Principles"
      title="How I work"
      description="Each one is here because ignoring it cost me something in a live system."
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
