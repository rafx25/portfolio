import Link from "next/link";
import { Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/icons";
import { site, isPlaceholder } from "@/lib/site";
import { Container } from "@/components/ui/container";

const year = new Date().getFullYear();

export function SiteFooter() {
  const socials = [
    { href: site.github, label: "GitHub", Icon: GithubIcon },
    { href: site.linkedin, label: "LinkedIn", Icon: LinkedinIcon },
    { href: `mailto:${site.email}`, label: "Email", Icon: Mail },
  ].filter((s) => !isPlaceholder(s.href.replace("mailto:", "")));

  return (
    <footer className="border-border border-t py-10">
      <Container className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="text-muted-foreground text-sm">
          <p>
            © {year} {site.name}
          </p>
          <p className="mt-1 font-mono text-xs">
            Built with Next.js, TypeScript and Tailwind CSS.
          </p>
        </div>

        <div className="flex items-center gap-1">
          {socials.map(({ href, label, Icon }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith("mailto:") ? undefined : "_blank"}
              rel="noreferrer noopener"
              aria-label={label}
              className="text-muted-foreground hover:bg-surface-muted hover:text-foreground inline-flex size-9 items-center justify-center rounded-md transition-colors"
            >
              <Icon className="size-4" aria-hidden />
            </a>
          ))}
          <Link
            href="/colophon"
            className="text-muted-foreground ml-2 text-xs underline-offset-4 hover:underline"
          >
            Colophon
          </Link>
        </div>
      </Container>
    </footer>
  );
}
