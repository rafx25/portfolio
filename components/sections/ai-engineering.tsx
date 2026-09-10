import { aiWorkflow, aiTools, aiPrinciple } from "@/data/engineering";
import { Section } from "@/components/ui/section";

export function AiEngineering() {
  return (
    <Section
      id="ai"
      eyebrow="AI-assisted engineering"
      title="How I actually use AI tools"
      description="AI sits in my workflow the way a linter does. It speeds up the mechanical parts. It does not decide the data model, and it does not get the last word on whether something is right."
    >
      <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr]">
        <div className="reveal">
          <h3 className="text-base font-semibold tracking-tight">Tools</h3>
          <dl className="mt-4 space-y-4">
            {aiTools.map((tool) => (
              <div key={tool.name}>
                <dt className="text-accent font-mono text-sm">{tool.name}</dt>
                <dd className="text-muted-foreground mt-1 text-sm leading-relaxed">
                  {tool.use}
                </dd>
              </div>
            ))}
          </dl>

          <blockquote className="border-accent bg-accent-subtle/50 mt-8 border-l-2 py-3 pl-4 text-sm leading-relaxed">
            {aiPrinciple}
          </blockquote>

          <p className="text-muted-foreground mt-6 text-sm leading-relaxed">
            The review step is the part that matters. Generated code sounds sure of
            itself about permissions, validation and query building, and it is wrong
            about them often enough that reading it line by line is cheaper than not.
          </p>
        </div>

        <div className="reveal">
          <h3 className="text-base font-semibold tracking-tight">
            Where AI sits in the workflow
          </h3>
          <ol className="mt-4 space-y-0">
            {aiWorkflow.map((item, index) => (
              <li key={item.step} className="relative pb-6 pl-9 last:pb-0">
                {index < aiWorkflow.length - 1 ? (
                  <span
                    className="bg-border absolute top-7 left-[13px] h-full w-px"
                    aria-hidden
                  />
                ) : null}
                <span
                  className="border-border bg-surface text-muted-foreground absolute top-0 left-0 flex size-7 items-center justify-center rounded-full border font-mono text-[0.7rem]"
                  aria-hidden
                >
                  {index + 1}
                </span>
                <p className="text-sm font-medium">{item.step}</p>
                <p className="text-muted-foreground mt-1 text-sm leading-relaxed">
                  {item.detail}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </Section>
  );
}
