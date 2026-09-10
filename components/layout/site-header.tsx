"use client";

import Link from "next/link";
import { useState } from "react";
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

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  // Closing on click rather than on a route change also covers same-page
  // anchors, which do not change the pathname at all.
  const closeMenu = () => setOpen(false);

  return (
    <header className="border-border bg-background/85 sticky top-0 z-50 border-b backdrop-blur-md">
      <Container className="flex h-16 items-center justify-between gap-4">
        <Link
          href="/"
          className="font-mono text-sm font-semibold tracking-tight"
          aria-label={`${site.shortName} — home`}
        >
          <span className="text-accent">/</span>
          {site.shortName}
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-1 md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-muted-foreground hover:bg-surface-muted hover:text-foreground rounded-md px-3 py-2 text-sm transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-1">
          <ThemeToggle />
          <a
            href={site.resumePath}
            download
            className="border-border-strong hover:bg-surface-muted hidden rounded-md border px-3 py-1.5 text-sm font-medium transition-colors sm:inline-flex"
          >
            Resume
          </a>
          <button
            type="button"
            className="text-muted-foreground hover:bg-surface-muted hover:text-foreground inline-flex size-9 items-center justify-center rounded-md md:hidden"
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
        className={cn("border-border bg-background border-t md:hidden")}
      >
        <Container className="flex flex-col py-2">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={closeMenu}
              className="text-muted-foreground hover:bg-surface-muted hover:text-foreground rounded-md px-2 py-3 text-sm"
            >
              {link.label}
            </Link>
          ))}
          <a
            href={site.resumePath}
            download
            onClick={closeMenu}
            className="rounded-md px-2 py-3 text-sm font-medium"
          >
            Download resume
          </a>
        </Container>
      </div>
    </header>
  );
}
