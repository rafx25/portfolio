import type { TechnicalChallenge } from "@/data/types";

const parts = [
  { key: "challenge", label: "Challenge" },
  { key: "cause", label: "Why it happened" },
  { key: "solution", label: "Solution" },
  { key: "tradeOff", label: "Trade-off" },
  { key: "result", label: "Result" },
] as const;

export function ChallengeCard({ challenge }: { challenge: TechnicalChallenge }) {
  return (
    <article className="reveal border-border bg-surface rounded-lg border p-6 sm:p-7">
      <h3 className="text-base font-semibold tracking-tight">{challenge.title}</h3>

      <dl className="mt-5 space-y-4">
        {parts.map((part) => (
          <div key={part.key} className="sm:grid sm:grid-cols-[9rem_1fr] sm:gap-4">
            <dt className="text-accent font-mono text-xs tracking-wide uppercase">
              {part.label}
            </dt>
            <dd className="text-muted-foreground mt-1 text-sm leading-relaxed sm:mt-0">
              {challenge[part.key]}
            </dd>
          </div>
        ))}
      </dl>
    </article>
  );
}
