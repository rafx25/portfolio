import Link from "next/link";
import { ArrowRight, ChevronDown, FileText } from "lucide-react";

import { site } from "@/lib/site";
import { Container } from "@/components/ui/container";
import { buttonStyles } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";

export function Hero() {
  return (
    <section
      id="home"
      className="relative isolate flex min-h-[calc(100svh-4rem)] scroll-mt-16 items-center overflow-hidden pt-8 pb-12 sm:pt-10 sm:pb-16"
      aria-labelledby="hero-heading"
    >
      {/* A soft glow behind the portrait, the same blue as the lights in it. */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[40rem] bg-[radial-gradient(ellipse_at_78%_30%,var(--accent-subtle),transparent_65%)]"
        aria-hidden
      />

      <Container>
        <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_auto] lg:gap-16">
          <Avatar
            className="w-40 sm:w-48 lg:order-last lg:w-80"
            sizes="(min-width: 1024px) 400px, (min-width: 640px) 240px, 200px"
            priority
          />

          <div className="min-w-0">
            <p className="text-muted-foreground flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-xs uppercase">
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
              className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl"
            >
              {site.name}
            </h1>

            <p className="text-accent mt-3 text-xl font-medium sm:text-2xl">
              {site.role}
            </p>

            <p className="text-muted-foreground mt-5 max-w-2xl text-base leading-relaxed sm:text-lg">
              {site.intro}
            </p>

            <ul className="text-muted-foreground mt-5 flex flex-wrap gap-x-5 gap-y-2 text-sm">
              {site.focus.map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <span className="text-accent" aria-hidden>
                    ·
                  </span>
                  {item}
                </li>
              ))}
            </ul>

            <div className="mt-7 flex flex-wrap items-center gap-3">
              <Link href="/#projects" className={buttonStyles()}>
                View projects
                <ArrowRight className="size-4" aria-hidden />
              </Link>
              <Link
                href={site.resumePath}
                className={buttonStyles({ variant: "secondary" })}
              >
                <FileText className="size-4" aria-hidden />
                Résumé
              </Link>
            </div>
          </div>
        </div>

        <div className="border-border mt-12 border-t pt-6 lg:mt-16">
          <h2 className="text-muted-foreground font-mono text-xs uppercase">
            Working with
          </h2>
          <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-2 font-mono text-sm">
            {site.stack.map((tech) => (
              <li key={tech} className="text-foreground/80">
                {tech}
              </li>
            ))}
          </ul>
        </div>

        {/* Link, not a bare <a href="#projects">: a native hash change bypasses
            the router, which then ignores the next click on Home. */}
        <Link
          href="/#projects"
          className="text-muted-foreground hover:text-foreground mt-10 hidden items-center justify-center gap-2 font-mono text-[0.7rem] uppercase transition-colors lg:flex"
        >
          Scroll
          <ChevronDown className="size-3.5" aria-hidden />
        </Link>
      </Container>
    </section>
  );
}
