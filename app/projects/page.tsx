import type { Metadata } from "next";

import { projects } from "@/data/projects";
import { Container } from "@/components/ui/container";
import { ProjectCard } from "@/components/projects/project-card";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Internal business systems built and maintained in production: HRIS and approval workflows, a biometric integration, and records digitisation.",
  alternates: { canonical: "/projects" },
};

export default function ProjectsPage() {
  return (
    <div className="py-14 sm:py-20">
      <Container>
        <header className="max-w-2xl">
          <p className="text-accent font-mono text-xs tracking-widest uppercase">
            Projects
          </p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
            Every system, in one list
          </h1>
          <p className="text-muted-foreground mt-4 text-base leading-relaxed">
            The ones with case studies are worth reading first. The rest are listed so
            the picture is complete.
          </p>
        </header>

        <div className="mt-12 grid gap-5 lg:grid-cols-2">
          {projects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </Container>
    </div>
  );
}
