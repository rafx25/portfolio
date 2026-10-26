import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { stats } from "@/data/stats";
import { Section } from "@/components/ui/section";

export function About() {
  return (
    <Section id="about" eyebrow="About" title="About me">
      <div className="reveal text-muted-foreground mx-auto max-w-3xl space-y-4 text-center">
        <p className="text-base leading-7 sm:text-lg">
          I started as a data encoder at a testing laboratory in 2015. A few years in, I
          helped build the records system that replaced our Excel files, and I&rsquo;ve
          been doing development ever since.
        </p>
        <p className="text-sm leading-7 sm:text-base">
          Since 2023 I&rsquo;ve been at DOLE Region IV-A, building and maintaining the
          office&rsquo;s internal systems: the HRIS, permit and certificate
          applications, biometrics for TUPAD, and reporting for the provinces. I work
          mostly in PHP and MySQL (Slim, plain PHP), and lately Laravel with React.
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
          More about me
          <ArrowRight className="size-4" aria-hidden />
        </Link>
      </p>
    </Section>
  );
}
