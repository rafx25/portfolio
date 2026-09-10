import type { ProjectArchitecture } from "@/data/types";

// Rendered from data instead of an image so it stays readable at any width
// and in both themes.
export function ArchitectureDiagram({
  architecture,
}: {
  architecture: ProjectArchitecture;
}) {
  return (
    <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr]">
      <div>
        <ol className="space-y-0">
          {architecture.layers.map((layer, index) => {
            const isLast = index === architecture.layers.length - 1;

            return (
              <li key={layer.label} className="relative">
                <div className="border-border bg-surface rounded-lg border px-4 py-3">
                  <p className="font-mono text-sm font-medium">{layer.label}</p>
                  <p className="text-muted-foreground mt-1 text-sm">{layer.detail}</p>
                </div>

                {!isLast ? (
                  <div
                    className="text-muted-foreground flex h-6 items-center justify-center"
                    aria-hidden
                  >
                    <svg width="10" height="24" viewBox="0 0 10 24" fill="none">
                      <path
                        d="M5 0v18M1 14l4 5 4-5"
                        stroke="currentColor"
                        strokeWidth="1.25"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                ) : null}
              </li>
            );
          })}
        </ol>
      </div>

      <div className="space-y-6">
        <div>
          <h4 className="text-muted-foreground font-mono text-xs tracking-widest uppercase">
            In short
          </h4>
          <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
            {architecture.summary}
          </p>
        </div>

        {architecture.integrations && architecture.integrations.length > 0 ? (
          <div>
            <h4 className="text-muted-foreground font-mono text-xs tracking-widest uppercase">
              Outside the request path
            </h4>
            <ul className="mt-2 space-y-2">
              {architecture.integrations.map((integration) => (
                <li
                  key={integration}
                  className="text-muted-foreground flex gap-2.5 text-sm leading-relaxed"
                >
                  <span
                    className="bg-border-strong mt-2 size-1 shrink-0 rounded-full"
                    aria-hidden
                  />
                  {integration}
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>
    </div>
  );
}
