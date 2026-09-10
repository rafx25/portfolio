import Image from "next/image";

import { featuredProjects, additionalProjects } from "@/data/projects";
import { Section } from "@/components/ui/section";
import { ProjectCard } from "@/components/projects/project-card";
import { Badge } from "@/components/ui/badge";

export function Projects() {
  return (
    <Section
      id="projects"
      eyebrow="Selected work"
      title="Systems I built and still keep running"
      description="These run inside a government office, so the source is not mine to publish. What I can show is the engineering: the problem, the architecture, the decisions, and what each decision cost."
    >
      <div className="grid gap-5 lg:grid-cols-2">
        {featuredProjects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>

      {additionalProjects.length > 0 ? (
        <div className="reveal mt-16">
          <h3 className="text-base font-semibold tracking-tight">Other systems</h3>
          <p className="text-muted-foreground mt-2 max-w-2xl text-sm">
            Built or maintained alongside the work above. No case study for these, just
            what they do and one screen each.
          </p>

          <ul className="mt-6 grid gap-5 sm:grid-cols-2">
            {additionalProjects.map((project) => {
              const shot = project.screenshots[0];

              return (
                <li
                  key={project.slug}
                  className="border-border bg-surface flex flex-col overflow-hidden rounded-lg border"
                >
                  {shot ? (
                    <div className="bg-surface-muted border-border border-b">
                      <Image
                        src={shot.src}
                        alt={shot.alt}
                        width={shot.width}
                        height={shot.height}
                        sizes="(min-width: 640px) 50vw, 100vw"
                        className="h-44 w-full object-cover object-top"
                      />
                    </div>
                  ) : null}

                  <div className="flex flex-1 flex-col p-5">
                    <h4 className="font-mono text-sm font-semibold">{project.name}</h4>
                    <p className="text-muted-foreground mt-2 flex-1 text-sm leading-relaxed">
                      {project.tagline}
                    </p>
                    <ul className="mt-4 flex flex-wrap gap-1.5">
                      {project.technologies.slice(0, 3).map((tech) => (
                        <li key={tech}>
                          <Badge>{tech}</Badge>
                        </li>
                      ))}
                    </ul>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      ) : null}
    </Section>
  );
}
