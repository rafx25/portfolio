import type { Metadata } from "next";

import { Container } from "@/components/ui/container";

export const metadata: Metadata = {
  title: "Colophon",
  description:
    "How this site is built, and why: no CMS, no database, no component library, no animation library.",
  alternates: { canonical: "/colophon" },
};

const decisions = [
  {
    decision: "Next.js App Router, mostly server components",
    reason:
      "All the content is known at build time, so nearly every page is plain static HTML. Only three components run in the browser: the theme toggle, the mobile menu and the contact form. Everything else ships no JavaScript.",
  },
  {
    decision: "No CMS, no database",
    reason:
      "Content sits in typed files under data/. A CMS would add a service to pay for and a schema to keep in sync, in exchange for editing that git already handles. A database would be here only to look full stack, which is the wrong reason to add one.",
  },
  {
    decision: "Contact form over a route handler, delivered by email",
    reason:
      "Same Zod schema on both sides, rate limited per IP, honeypot on the form. Nothing is stored. No store means nothing to leak.",
  },
  {
    decision: "Components written by hand",
    reason:
      "The site needs a button, a badge, a card and a section heading. Installing a component library and its peer dependencies for four primitives is the worse trade.",
  },
  {
    decision: "No animation library",
    reason:
      "One effect: sections fade up on entry, using CSS scroll-driven animation behind a @supports check, and it disappears entirely under prefers-reduced-motion. That is a few lines of CSS.",
  },
  {
    decision: "No syntax highlighter",
    reason:
      "The code samples are short enough to read plain. If that stops being true, Shiki at build time is the upgrade, and it adds nothing to the client bundle.",
  },
  {
    decision: "Architecture diagrams rendered from data",
    reason:
      "They are typed data drawn as lists, not images. They reflow on a phone, work in both themes, are readable by screen readers and search engines, and cannot go stale against the text next to them.",
  },
  {
    decision: "Open Graph image generated at build time",
    reason:
      "next/og builds the card from the same config as the page, so the link preview cannot contradict the site.",
  },
  {
    decision: "Screenshots redacted before upload, not blurred after",
    reason:
      "Every capture came from a test account. Where a real name still appeared, it was covered in the file itself rather than hidden with CSS, which anyone could undo.",
  },
  {
    decision: "CI runs lint, types, tests and build",
    reason:
      "Vercel deploys on push. The GitHub Actions workflow is what stops a broken push becoming a broken deploy.",
  },
];

export default function ColophonPage() {
  return (
    <div className="py-14 sm:py-20">
      <Container>
        <header className="max-w-2xl">
          <p className="text-accent font-mono text-xs tracking-widest uppercase">
            Colophon
          </p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
            How this site is built
          </h1>
          <p className="text-muted-foreground mt-4 text-base leading-relaxed">
            A portfolio is a small system too, so the decisions in it are fair game.
            Here are the ones worth asking about.
          </p>
        </header>

        <dl className="divide-border border-border mt-12 max-w-3xl divide-y border-y">
          {decisions.map((item) => (
            <div key={item.decision} className="py-5">
              <dt className="text-sm font-semibold">{item.decision}</dt>
              <dd className="text-muted-foreground mt-2 text-sm leading-relaxed">
                {item.reason}
              </dd>
            </div>
          ))}
        </dl>

        <p className="text-muted-foreground mt-8 max-w-3xl text-sm leading-relaxed">
          Next.js, TypeScript and Tailwind. Vitest and Testing Library for the tests.
          Deployed on Vercel. AI tools were used while building it. The architecture,
          the review and the decisions above are mine.
        </p>
      </Container>
    </div>
  );
}
