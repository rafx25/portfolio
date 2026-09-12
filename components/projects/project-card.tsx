import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Lock } from "lucide-react";

import type { Project } from "@/data/types";
import { Badge } from "@/components/ui/badge";

export function ProjectCard({ project }: { project: Project }) {
  const hasCaseStudy = project.caseStudy !== undefined;
  const headingId = `project-${project.slug}`;
  const cover = project.screenshots[0];

  return (
    <article
      aria-labelledby={headingId}
      className="border-border bg-surface hover:border-border-strong group relative flex flex-col overflow-hidden rounded-lg border shadow-sm shadow-accent/5 transition-[border-color,box-shadow,transform] hover:-translate-y-0.5 hover:shadow-md hover:shadow-accent/10"
    >
      {cover ? (
        <div className="bg-surface-muted border-border border-b">
          <Image
            src={cover.src}
            alt={cover.alt}
            width={cover.width}
            height={cover.height}
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="h-56 w-full object-cover object-top sm:h-64"
          />
        </div>
      ) : null}

      <div className="flex flex-1 flex-col p-6 sm:p-7">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 id={headingId} className="text-lg font-semibold tracking-tight">
              {hasCaseStudy ? (
                <Link
                  href={`/projects/${project.slug}`}
                  className="after:absolute after:inset-0 after:content-['']"
                >
                  {project.name}
                </Link>
              ) : (
                project.name
              )}
            </h3>
            <p className="text-muted-foreground mt-1 font-mono text-xs">
              {project.type} · {project.period}
            </p>
          </div>
          <span className="border-border text-muted-foreground shrink-0 rounded border px-2 py-0.5 font-mono text-[0.7rem]">
            {project.status}
          </span>
        </div>

        {project.metrics && project.metrics.length > 0 ? (
          <ul className="text-muted-foreground mt-4 flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-xs">
            {project.metrics.map((metric, i) => (
              <li key={metric} className="flex items-center gap-2">
                {i > 0 ? (
                  <span className="text-border-strong" aria-hidden>
                    ·
                  </span>
                ) : null}
                {metric}
              </li>
            ))}
          </ul>
        ) : null}

        <p className="text-muted-foreground mt-3 text-sm leading-relaxed">
          {project.tagline}
        </p>

        <dl className="mt-5 space-y-3 text-sm">
          <div className="flex gap-3">
            <dt className="text-muted-foreground w-28 shrink-0 font-mono text-xs uppercase">
              Role
            </dt>
            <dd>{project.role}</dd>
          </div>
          <div className="flex gap-3">
            <dt className="text-muted-foreground w-28 shrink-0 font-mono text-xs uppercase">
              Hard part
            </dt>
            <dd className="text-muted-foreground">{project.keyChallenge}</dd>
          </div>
        </dl>

        <ul className="mt-5 flex flex-wrap gap-1.5" aria-label="Technologies used">
          {project.technologies.map((tech) => (
            <li key={tech}>
              <Badge>{tech}</Badge>
            </li>
          ))}
        </ul>

        <div className="border-border mt-auto flex items-center justify-between gap-4 border-t pt-4">
          {project.confidential ? (
            <span className="text-muted-foreground flex items-center gap-1.5 font-mono text-[0.7rem]">
              <Lock className="size-3" aria-hidden />
              Source not public
            </span>
          ) : (
            <span />
          )}

          {hasCaseStudy ? (
            <span className="border-border-strong text-accent bg-background/60 flex items-center gap-1 rounded-full border px-3 py-1.5 text-sm font-medium transition-colors group-hover:border-accent/50 group-hover:bg-accent-subtle">
              Read case study
              <ArrowUpRight
                className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                aria-hidden
              />
            </span>
          ) : null}
        </div>
      </div>
    </article>
  );
}
