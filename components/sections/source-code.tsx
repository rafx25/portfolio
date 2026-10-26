import { ArrowUpRight } from "lucide-react";
import { GithubIcon } from "@/components/ui/icons";

import { repos } from "@/data/repos";
import { site, isPlaceholder } from "@/lib/site";
import { Section } from "@/components/ui/section";
import { Badge } from "@/components/ui/badge";
import { buttonStyles } from "@/components/ui/button";

export function SourceCode() {
  const githubReady = !isPlaceholder(site.github);

  return (
    <Section id="source" eyebrow="Source code" title="Code">
      <div className="reveal grid gap-8 lg:grid-cols-[1.2fr_1fr]">
        <div className="text-muted-foreground space-y-4 text-sm leading-relaxed">
          <p>
            The government systems above aren&rsquo;t mine to publish. I&rsquo;m happy
            to walk through any of them on a call, or do a take-home exercise.
          </p>
          <p>This site&rsquo;s source is public on GitHub.</p>
        </div>

        <div>
          {repos.length > 0 ? (
            <ul className="space-y-3">
              {repos.map((repo) => (
                <li key={repo.name}>
                  <a
                    href={repo.url}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="group border-border bg-surface hover:border-border-strong block rounded-lg border p-4 transition-colors"
                  >
                    <span className="flex items-center gap-2 font-mono text-sm font-medium">
                      <GithubIcon
                        className="text-muted-foreground size-4"
                        aria-hidden
                      />
                      {repo.name}
                      <ArrowUpRight
                        className="text-muted-foreground size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                        aria-hidden
                      />
                    </span>
                    <span className="text-muted-foreground mt-2 block text-sm">
                      {repo.description}
                    </span>
                    <span className="mt-3 flex flex-wrap gap-1.5">
                      {repo.technologies.map((tech) => (
                        <Badge key={tech}>{tech}</Badge>
                      ))}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          ) : null}

          {githubReady ? (
            <a
              href={site.github}
              target="_blank"
              rel="noreferrer noopener"
              className={buttonStyles({
                variant: "secondary",
                size: "sm",
                className: "mt-4",
              })}
            >
              <GithubIcon className="size-4" aria-hidden />
              GitHub profile
            </a>
          ) : null}
        </div>
      </div>
    </Section>
  );
}
