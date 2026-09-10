import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Section } from "@/components/ui/section";

export function About() {
  return (
    <Section
      id="about"
      eyebrow="About"
      title="I work on systems that are already running"
      description="Very little of my work is greenfield. It is adding to software people depend on today, without breaking what already works."
    >
      <div className="grid gap-10 lg:grid-cols-2">
        <div className="reveal text-muted-foreground space-y-4 text-sm leading-relaxed">
          <p>
            My day job is internal government systems: personnel administration, permit
            applications, certificate issuance, reporting. The hard part is rarely the
            code. It is working out what the process actually is, including the
            exceptions nobody wrote down, and then deciding which parts should become
            software and which should stay a human decision.
          </p>
          <p>
            That means a lot of time inside code that already exists. Reading first,
            then changing. Working out why something was built that way before replacing
            it. It also means production support, which is a different skill from
            writing features. A system misbehaving at 9am with staff waiting is where I
            have learned the most.
          </p>
        </div>

        <div className="reveal text-muted-foreground space-y-4 text-sm leading-relaxed">
          <p>
            The stack I ship in is PHP and Laravel on MySQL, with Vue on the front end,
            and C# when a desktop device is involved. I am working through the modern
            JavaScript side properly at the moment. This site is part of that: App
            Router, typed end to end, tested, deployed through CI instead of by hand.
          </p>
          <p>
            I use AI tools every day and I am specific about how. There is a{" "}
            <Link href="/#ai" className="text-foreground underline underline-offset-4">
              section below
            </Link>{" "}
            on where they help and where I do not let them near.
          </p>

          <Link
            href="/about"
            className="text-accent inline-flex items-center gap-1.5 text-sm font-medium underline-offset-4 hover:underline"
          >
            More about how I work
            <ArrowRight className="size-4" aria-hidden />
          </Link>
        </div>
      </div>
    </Section>
  );
}
