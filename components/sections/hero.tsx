import Link from "next/link";
import { ArrowRight, ChevronDown, FileText } from "lucide-react";

import { site } from "@/lib/site";
import { Container } from "@/components/ui/container";
import { buttonStyles } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";

const stack = [
  "PHP",
  "Slim",
  "Laravel",
  "Inertia",
  "Vue.js",
  "MySQL",
  "JavaScript",
  "C#",
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
    <section
      id="home"
      className="flex min-h-[calc(100svh-4rem)] scroll-mt-16 items-center pt-8 pb-12 text-center sm:pt-10 sm:pb-16"
      aria-labelledby="hero-heading"
    >
      <Container>
        <div className="mx-auto flex max-w-4xl flex-col items-center">
          <Avatar
            className="shadow-accent/15 mx-auto size-24 shadow-sm sm:size-28 lg:size-36"
            sizes="(min-width: 1024px) 144px, (min-width: 640px) 112px, 96px"
            priority
          />

          <div className="mt-6 min-w-0">
            <p className="text-muted-foreground flex flex-wrap items-center justify-center gap-x-2 gap-y-1 font-mono text-xs uppercase">
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

            <h1
              id="hero-heading"
              className="text-accent mt-4 text-4xl font-semibold sm:text-5xl"
            >
              {site.name}
            </h1>

            <p className="mt-3 text-xl font-medium sm:text-2xl">{site.role}</p>

            <hr className="bg-accent mx-auto mt-4 h-1 w-8 rounded border-0" />

            <p className="text-muted-foreground mx-auto mt-5 max-w-2xl text-base leading-relaxed sm:text-lg">
              I build the internal systems a government agency depends on: approval
              workflows for leave and overtime, permit and certificate applications,
              biometric verification, and the official forms these processes produce.
              Around 500 employees across six field offices use them daily.
            </p>

            <ul className="text-muted-foreground mt-5 flex flex-wrap justify-center gap-x-5 gap-y-2 text-sm">
              {focus.map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <span className="text-accent" aria-hidden>
                    ·
                  </span>
                  {item}
                </li>
              ))}
            </ul>

            <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
              <Link href="/#projects" className={buttonStyles()}>
                View projects
                <ArrowRight className="size-4" aria-hidden />
              </Link>
              <Link
                href={site.resumePath}
                className={buttonStyles({ variant: "secondary" })}
              >
                <FileText className="size-4" aria-hidden />
                Resume
              </Link>
              <Link
                href="/#contact"
                className={buttonStyles({ variant: "ghost", size: "md" })}
              >
                Contact
              </Link>
            </div>
          </div>
        </div>

        <div className="border-border mx-auto mt-12 max-w-3xl border-t pt-6">
          <h2 className="text-muted-foreground font-mono text-xs uppercase">
            Working with
          </h2>
          <ul className="mt-3 flex flex-wrap justify-center gap-x-4 gap-y-2 font-mono text-sm">
            {stack.map((tech) => (
              <li key={tech} className="text-foreground/80">
                {tech}
              </li>
            ))}
          </ul>
        </div>

        <a
          href="#projects"
          className="text-muted-foreground hover:text-foreground mt-10 hidden items-center justify-center gap-2 font-mono text-[0.7rem] uppercase transition-colors lg:flex"
        >
          Scroll
          <ChevronDown className="size-3.5" aria-hidden />
        </a>
      </Container>
    </section>
  );
}
