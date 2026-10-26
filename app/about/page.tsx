import type { Metadata } from "next";
import Link from "next/link";
import { FileText } from "lucide-react";

import { site } from "@/lib/site";
import { Container } from "@/components/ui/container";
import { buttonStyles } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import { Experience } from "@/components/sections/experience";

export const metadata: Metadata = {
  title: "About",
  description: `About ${site.name}, full stack developer at DOLE Region IV-A.`,
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <div>
      <Container className="py-14 sm:py-20">
        <header className="flex max-w-2xl flex-col gap-6 sm:flex-row sm:items-center">
          <Avatar
            className="w-32 sm:w-40"
            sizes="(min-width: 640px) 200px, 160px"
            priority
          />
          <div>
            <p className="text-accent font-mono text-xs tracking-widest uppercase">
              About
            </p>
            <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
              {site.name}
            </h1>
            <p className="text-muted-foreground mt-3 text-base leading-relaxed">
              {site.role} · {site.location}
            </p>
          </div>
        </header>

        <div className="text-muted-foreground mt-10 max-w-2xl space-y-5 text-sm leading-relaxed">
          <p>
            I got into development through IT support and data work. My first job was as
            a data encoder at a testing laboratory in Calamba. After a few years I moved
            into quality control, and in 2019 I started building the lab&rsquo;s records
            system with another developer, which replaced the Excel files we had been
            using.
          </p>
          <p>
            After that I spent almost two years at Gruppo EMS maintaining their HRIS,
            then joined DOLE Region IV-A in 2023. There I build and support the
            office&rsquo;s internal systems: PRAMS (our HRIS), permit and certificate
            applications, TUPAD biometrics, and reporting for the provinces. Most of it
            is PHP and MySQL on Slim or plain PHP. The newer systems are Laravel with
            React.
          </p>
          <p>
            Right now I&rsquo;m getting better at TypeScript and modern JavaScript
            tooling. This site is one of the ways I&rsquo;m practicing that.
          </p>
          <p>I&rsquo;m open to full stack and backend roles.</p>
        </div>

        <div className="mt-10 flex flex-wrap gap-3">
          <Link href={site.resumePath} className={buttonStyles()}>
            <FileText className="size-4" aria-hidden />
            View resume
          </Link>
          <Link href="/#contact" className={buttonStyles({ variant: "secondary" })}>
            Get in touch
          </Link>
        </div>
      </Container>

      <Experience />
    </div>
  );
}
