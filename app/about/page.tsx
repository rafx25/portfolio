import type { Metadata } from "next";
import Link from "next/link";
import { FileText } from "lucide-react";

import { site } from "@/lib/site";
import { Container } from "@/components/ui/container";
import { buttonStyles } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import { Experience } from "@/components/sections/experience";
import { Principles } from "@/components/sections/principles";
import { AiEngineering } from "@/components/sections/ai-engineering";

export const metadata: Metadata = {
  title: "About",
  description:
    "How I work: maintaining production systems, turning business processes into software, and using AI tools with a review step that does not get skipped.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <div>
      <Container className="py-14 sm:py-20">
        <header className="flex max-w-2xl flex-col gap-6 sm:flex-row sm:items-center">
          <Avatar
            className="size-32 sm:size-40"
            sizes="(min-width: 640px) 160px, 128px"
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

        <div className="text-muted-foreground mt-10 grid max-w-4xl gap-x-12 gap-y-6 text-sm leading-relaxed lg:grid-cols-2">
          <p>
            I came into development through IT work, and that shaped how I build. I saw
            the processes before I saw any code. Forms moving between desks. The same
            record kept in three places. The one person everyone has to wait for. So
            when I start something now the first question is not which framework, it is
            what the process actually is, including the exceptions nobody documented.
          </p>
          <p>
            Nearly all of it has been internal: personnel administration, permits and
            inspections, certificate issuance, reporting for field offices. Unglamorous
            software, and it does not forgive mistakes. Staff use it every day, the data
            has to be right, and you cannot take it down while you rework it.
          </p>
          <p>
            That made me careful in specific ways. Read the surrounding code before
            changing it. Keep business rules out of controllers so they can be tested
            and reused. Check permissions on the server, every time. Log what the office
            would be asked to prove later. And make the failure modes dull: a bad
            fingerprint scan rejected while the person is still standing there beats a
            broken enrolment found three weeks on.
          </p>
          <p>
            Some of it has been unbuilding. Notifications in PRAMS started as
            Server-Sent Events and had to become polling, because the hosting could not
            hold that many open connections. The case study says so plainly. That
            decision is more interesting than the design it replaced.
          </p>
          <p>
            What I ship in is PHP on MySQL. Slim on most of it, plain PHP on the older
            systems, and Laravel with Vue and Inertia on the service desk, which is the
            newest. C# when a desktop device is in the loop. I am working through the
            modern JavaScript side properly now, and this site is part of that: typed
            end to end, tested, deployed through CI instead of by hand.
          </p>
          <p>
            On AI. I use it daily and I am specific about how. Boilerplate, unfamiliar
            APIs, first drafts of tests. It does not decide the data model, and nothing
            it writes goes in until I have read it and can say why it works. That review
            step is the whole difference between a tool and a liability.
          </p>
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
      <Principles />
      <AiEngineering />
    </div>
  );
}
