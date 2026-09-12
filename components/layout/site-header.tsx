"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { site } from "@/lib/site";
import { Container } from "@/components/ui/container";
import { ThemeToggle } from "./theme-toggle";

const links = [
  { href: "/#projects", label: "Projects" },
  { href: "/#experience", label: "Experience" },
  { href: "/#stack", label: "Stack" },
  { href: "/about", label: "About" },
  { href: "/#contact", label: "Contact" },
] as const;

const sectionIds = links
  .filter((link) => link.href.startsWith("/#"))
  .map((link) => link.href.slice(2));

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [visibleSection, setVisibleSection] = useState<string | null>(null);

  const isHome = pathname === "/";

  useEffect(() => {
    if (!isHome) return;

    // Whichever section crosses a line drawn across the upper third of the
    // viewport is the one being read. Four rect reads per scroll event is
    // cheap enough not to need throttling, and it avoids depending on frame
    // callbacks, which browsers suspend on hidden tabs.
    const measure = () => {
      const marker = window.innerHeight * 0.35;

      let current: string | null = null;
      for (const id of sectionIds) {
        const rect = document.getElementById(id)?.getBoundingClientRect();
        if (rect && rect.top <= marker && rect.bottom > marker) {
          current = id;
          break;
        }
      }

      setVisibleSection(current);
    };

    // Deferred rather than called here, so this is not a state write during
    // the effect body.
    const initial = window.setTimeout(measure, 0);

    window.addEventListener("scroll", measure, { passive: true });
    window.addEventListener("resize", measure);

    return () => {
      window.clearTimeout(initial);
      window.removeEventListener("scroll", measure);
      window.removeEventListener("resize", measure);
    };
  }, [isHome]);

  // Derived rather than stored, so leaving the home page cannot leave a stale
  // section highlighted.
  const currentSection = isHome ? visibleSection : null;

  function isActive(href: string) {
    if (href.startsWith("/#")) {
      return currentSection === href.slice(2);
    }
    return pathname === href || pathname.startsWith(`${href}/`);
  }

  const closeMenu = () => setOpen(false);
  const onResume = pathname === site.resumePath;

  return (
    <header className="border-border bg-background/80 sticky top-0 z-50 border-b backdrop-blur-md">
      <Container className="relative flex h-16 items-center justify-between gap-4">
        <Link
          href="/"
          className="border-border bg-surface hover:bg-surface-muted inline-flex rounded-full border px-3 py-1.5 font-mono text-sm font-semibold transition-colors"
          aria-label={`${site.shortName} — home`}
        >
          <span className="text-accent"></span>
          {site.shortName}
        </Link>

        <nav
          aria-label="Main"
          className="border-border bg-surface/80 absolute left-1/2 hidden -translate-x-1/2 items-center gap-1 rounded-full border p-1 shadow-sm backdrop-blur-md lg:flex"
        >
          {links.map((link) => {
            const active = isActive(link.href);

            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "rounded-full px-3 py-1.5 text-sm transition-colors",
                  active
                    ? "bg-accent-subtle text-accent font-medium"
                    : "text-muted-foreground hover:bg-surface-muted hover:text-foreground",
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-1">
          <ThemeToggle />
          <Link
            href={site.resumePath}
            aria-current={onResume ? "page" : undefined}
            className={cn(
              "hidden rounded-full border px-3 py-1.5 text-sm font-medium transition-colors sm:inline-flex",
              onResume
                ? "border-accent text-accent"
                : "border-border-strong hover:bg-surface-muted",
            )}
          >
            Resume
          </Link>
          <button
            type="button"
            className="text-muted-foreground hover:bg-surface-muted hover:text-foreground inline-flex size-9 items-center justify-center rounded-full lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? (
              <X className="size-5" aria-hidden />
            ) : (
              <Menu className="size-5" aria-hidden />
            )}
          </button>
        </div>
      </Container>

      <div
        id="mobile-nav"
        hidden={!open}
        className="border-border bg-background border-t lg:hidden"
      >
        <Container className="flex flex-col py-2">
          {links.map((link) => {
            const active = isActive(link.href);

            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={closeMenu}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "rounded-md px-2 py-3 text-sm",
                  active
                    ? "text-accent font-medium"
                    : "text-muted-foreground hover:bg-surface-muted hover:text-foreground",
                )}
              >
                {link.label}
              </Link>
            );
          })}
          <Link
            href={site.resumePath}
            onClick={closeMenu}
            aria-current={onResume ? "page" : undefined}
            className={cn(
              "rounded-md px-2 py-3 text-sm font-medium",
              onResume && "text-accent",
            )}
          >
            Resume
          </Link>
        </Container>
      </div>
    </header>
  );
}
