import type { CodeSample } from "@/data/types";

const languageLabels: Record<CodeSample["language"], string> = {
  php: "PHP",
  ts: "TypeScript",
  js: "JavaScript",
  csharp: "C#",
  sql: "SQL",
  http: "HTTP",
};

// No highlighter. The samples are short enough to read plain, and Shiki at
// build time is the upgrade if that stops being true.
export function CodeBlock({ sample }: { sample: CodeSample }) {
  return (
    <figure className="border-border bg-surface overflow-hidden rounded-lg border">
      <figcaption className="border-border bg-surface-muted flex flex-wrap items-baseline justify-between gap-2 border-b px-4 py-2.5">
        <span className="text-sm font-medium">{sample.title}</span>
        <span className="text-muted-foreground font-mono text-[0.7rem] uppercase">
          {languageLabels[sample.language]}
        </span>
      </figcaption>

      <p className="border-border text-muted-foreground border-b px-4 py-3 text-sm leading-relaxed">
        {sample.description}
      </p>

      <div className="overflow-x-auto">
        <pre className="p-4 font-mono text-[0.8rem] leading-relaxed">
          <code>{sample.code}</code>
        </pre>
      </div>
    </figure>
  );
}
