import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { stats } from "@/data/stats";
import { Section } from "@/components/ui/section";

export function About() {
  return (
    <Section
      id="about"
      eyebrow="About"
      title="Where the work comes from"
      description="Ten years of turning paper processes into systems people use every day."
    >
      <div className="reveal text-muted-foreground mx-auto max-w-3xl space-y-4 text-center">
        <p className="text-base leading-7 sm:text-lg">
          I started at a testing laboratory doing data entry. For four years I kept the
          lab&rsquo;s spreadsheets in order, then helped build the system that replaced
          them. I have been building versions of that ever since.
        </p>
        <p className="text-sm leading-7 sm:text-base">
          Now it is internal systems for a government office: leave and overtime
          approvals, permit applications, certificates, biometric checks. The limits are
          real ones. Personal data, approvals that pass through several people, and
          staff who cannot wait for the system to come back up.
        </p>
        <p className="text-sm leading-7 sm:text-base">
          Most of the code I touch was written by someone else first, so I read it
          before I change it. PHP and MySQL day to day, Slim on most of the systems,
          Laravel with Vue and Inertia on the newest.
        </p>
      </div>

      <dl className="mx-auto mt-12 grid max-w-3xl grid-cols-2 gap-4 sm:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="border-border bg-surface reveal rounded-xl border p-4 text-center"
          >
            <dt className="text-accent text-2xl font-semibold tracking-tight sm:text-3xl">
              {stat.value}
            </dt>
            <dd className="text-muted-foreground mt-1 text-xs leading-snug">
              {stat.label}
            </dd>
          </div>
        ))}
      </dl>

      <p className="mt-10 text-center">
        <Link
          href="/about"
          className="text-accent inline-flex items-center gap-1.5 text-sm font-medium underline-offset-4 hover:underline"
        >
          More about how I work
          <ArrowRight className="size-4" aria-hidden />
        </Link>
      </p>
    </Section>
  );
}
