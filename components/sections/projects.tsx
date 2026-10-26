import Image from "next/image";

import { featuredProjects, additionalProjects } from "@/data/projects";
import { Section } from "@/components/ui/section";
import { ProjectCard } from "@/components/projects/project-card";
import { Badge } from "@/components/ui/badge";

export function Projects() {
  return (
    <Section
      id="projects"
      eyebrow="Projects"
      title="Selected work"
      description="Internal systems I built at DOLE Region IV-A. The code is government property, so each project has a short write-up and screenshots instead."
    >
      <div className="grid gap-5 lg:grid-cols-2">
        {featuredProjects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>

      {additionalProjects.length > 0 ? (
        <div className="reveal mt-20">
          <h3 className="text-center text-base font-semibold tracking-tight">
            Other systems
          </h3>
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
