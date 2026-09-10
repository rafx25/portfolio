import Link from "next/link";
import { ArrowRight, Download } from "lucide-react";

import { site } from "@/lib/site";
import { Container } from "@/components/ui/container";
import { buttonStyles } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";

const stack = [
  "PHP",
  "Laravel",
  "MySQL",
  "JavaScript",
  "Vue.js",
  "Node.js",
  "C#",
  "REST APIs",
];

const focus = [
  "REST API design",
  "Role-Based Access Control",
  "Approval workflows",
  "Database design",
  "Production deployment",
];

export function Hero() {
  return (
    <section className="pt-16 pb-16 sm:pt-24 sm:pb-24" aria-labelledby="hero-heading">
      <Container>
        <div className="flex items-center gap-4">
          <Avatar size={72} priority />
          <p className="text-muted-foreground flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-xs tracking-widest uppercase">
            <span
              className="bg-accent inline-block size-1.5 rounded-full"
              aria-hidden
            />
            <span>{site.availability}</span>
            <span className="text-border-strong hidden sm:inline" aria-hidden>
              /
            </span>
            <span>{site.location}</span>
          </p>
        </div>

        <h1
          id="hero-heading"
          className="mt-6 max-w-3xl text-3xl leading-[1.15] font-semibold tracking-tight sm:text-4xl lg:text-5xl"
        >
          Full Stack Developer. I build the{" "}
          <span className="text-accent">internal systems</span> a government office runs
          on.
        </h1>

        <p className="text-muted-foreground mt-6 max-w-2xl text-base leading-relaxed sm:text-lg">
          I&rsquo;m {site.name}. Leave and overtime approvals, permit applications,
          certificate issuance, fingerprint enrolment. Real systems, used every day,
          most of them still mine to maintain. PHP and Laravel on MySQL, with Vue on the
          front end.
        </p>

        <ul className="text-muted-foreground mt-6 flex flex-wrap gap-x-5 gap-y-2 text-sm">
          {focus.map((item) => (
            <li key={item} className="flex items-center gap-2">
              <span className="text-accent" aria-hidden>
                ·
              </span>
              {item}
            </li>
          ))}
        </ul>

        <div className="mt-9 flex flex-wrap items-center gap-3">
          <Link href="/#projects" className={buttonStyles()}>
            View projects
            <ArrowRight className="size-4" aria-hidden />
          </Link>
          <a
            href={site.resumePath}
            download
            className={buttonStyles({ variant: "secondary" })}
          >
            <Download className="size-4" aria-hidden />
            Download resume
          </a>
          <Link
            href="/#contact"
            className={buttonStyles({ variant: "ghost", size: "md" })}
          >
            Contact
          </Link>
        </div>

        <div className="border-border mt-12 border-t pt-6">
          <h2 className="text-muted-foreground font-mono text-xs tracking-widest uppercase">
            Working with
          </h2>
          <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-2 font-mono text-sm">
            {stack.map((tech) => (
              <li key={tech} className="text-foreground/80">
                {tech}
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
