import { aiNote, aiPrinciple } from "@/data/engineering";
import { Container } from "@/components/ui/container";

export function AiEngineering() {
  return (
    <section
      id="ai"
      aria-labelledby="ai-heading"
      className="border-border scroll-mt-24 border-t py-12 sm:py-14"
    >
      <Container>
        <div className="border-border bg-surface reveal rounded-lg border p-5 sm:p-6">
          <div className="grid gap-5 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
            <div>
              <p className="text-accent font-mono text-xs font-semibold uppercase">
                {aiNote.eyebrow}
              </p>
              <h2 id="ai-heading" className="mt-2 text-xl font-semibold tracking-tight">
                {aiNote.title}
              </h2>
            </div>

            <div>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {aiNote.summary}
              </p>
              <blockquote className="border-accent mt-4 border-l-2 pl-4 text-sm leading-relaxed">
                {aiPrinciple}
              </blockquote>
              <ul className="mt-4 flex flex-wrap gap-2">
                {aiNote.checks.map((check) => (
                  <li
                    key={check}
                    className="border-border bg-background text-muted-foreground rounded border px-2.5 py-1 font-mono text-[0.7rem]"
                  >
                    {check}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
