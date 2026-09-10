import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ShieldAlert } from "lucide-react";

import { caseStudyProjects, getProject } from "@/data/projects";
import { site } from "@/lib/site";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { ArchitectureDiagram } from "@/components/projects/architecture-diagram";
import { ChallengeCard } from "@/components/projects/challenge-card";
import { CodeBlock } from "@/components/projects/code-block";
import { ScreenshotGallery } from "@/components/projects/screenshot-gallery";
import { ProjectJsonLd } from "@/components/seo/json-ld";

/** Every case study is known at build time, so all of them are prerendered. */
export function generateStaticParams() {
  return caseStudyProjects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/projects/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project?.caseStudy) return {};

  const title = `${project.name} — case study`;
  const description = project.tagline;
  const url = `/projects/${project.slug}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      url,
      title: `${project.name} — ${site.name}`,
      description,
    },
    twitter: { card: "summary_large_image", title, description },
  };
}

function CaseSection({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section aria-labelledby={id} className="border-border border-t py-12 sm:py-14">
      <h2 id={id} className="reveal text-xl font-semibold tracking-tight sm:text-2xl">
        {title}
      </h2>
      <div className="mt-6">{children}</div>
    </section>
  );
}

function BulletList({ items }: { items: readonly string[] }) {
  return (
    <ul className="reveal space-y-3">
      {items.map((item) => (
        <li key={item} className="flex gap-3 text-sm leading-relaxed">
          <span className="bg-accent mt-2 size-1 shrink-0 rounded-full" aria-hidden />
          <span className="text-muted-foreground">{item}</span>
        </li>
      ))}
    </ul>
  );
}

export default async function ProjectCaseStudyPage({
  params,
}: PageProps<"/projects/[slug]">) {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project?.caseStudy) notFound();

  const study = project.caseStudy;
  const others = caseStudyProjects.filter((p) => p.slug !== project.slug);

  return (
    <article className="pb-16">
      <ProjectJsonLd project={project} />

      <Container className="pt-10 pb-4">
        <Link
          href="/#projects"
          className="text-muted-foreground hover:text-foreground inline-flex items-center gap-1.5 text-sm underline-offset-4 hover:underline"
        >
          <ArrowLeft className="size-4" aria-hidden />
          All projects
        </Link>

        <header className="mt-8">
          <p className="text-accent font-mono text-xs tracking-widest uppercase">
            {project.type}
          </p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
            {project.name}
          </h1>
          <p className="text-muted-foreground mt-4 max-w-3xl text-base leading-relaxed sm:text-lg">
            {project.tagline}
          </p>

          <dl className="border-border mt-8 grid gap-x-8 gap-y-4 border-y py-5 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { label: "Role", value: project.role },
              { label: "Organisation", value: project.organization },
              { label: "Period", value: project.period },
              { label: "Status", value: project.status },
            ].map((item) => (
              <div key={item.label}>
                <dt className="text-muted-foreground font-mono text-xs tracking-widest uppercase">
                  {item.label}
                </dt>
                <dd className="mt-1.5 text-sm">{item.value}</dd>
              </div>
            ))}
          </dl>

          <ul className="mt-5 flex flex-wrap gap-1.5" aria-label="Technologies used">
            {project.technologies.map((tech) => (
              <li key={tech}>
                <Badge>{tech}</Badge>
              </li>
            ))}
          </ul>

          {project.confidential ? (
            <p className="border-border bg-surface-muted text-muted-foreground mt-6 flex gap-3 rounded-lg border p-4 text-xs leading-relaxed">
              <ShieldAlert className="mt-0.5 size-4 shrink-0" aria-hidden />
              <span>
                This is an internal system. No production source code, schema, endpoint,
                screenshot or record appears here. Architecture, entity names and code
                samples are generalised re-creations written for this portfolio.
              </span>
            </p>
          ) : null}
        </header>
      </Container>

      <Container>
        <CaseSection id="overview" title="Overview">
          <div className="reveal grid gap-6 lg:grid-cols-2">
            <p className="text-muted-foreground text-sm leading-relaxed">
              {study.overview}
            </p>
            <div>
              <h3 className="text-muted-foreground font-mono text-xs tracking-widest uppercase">
                Who uses it
              </h3>
              <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
                {study.users}
              </p>
            </div>
          </div>
        </CaseSection>

        {project.screenshots.length > 0 ? (
          <CaseSection id="screens" title="Screens">
            <div className="reveal">
              <ScreenshotGallery screenshots={project.screenshots} />
            </div>
          </CaseSection>
        ) : null}

        <CaseSection id="problem" title="The problem">
          <BulletList items={study.problem} />
        </CaseSection>

        <CaseSection id="role" title="My role">
          <BulletList items={study.responsibilities} />
          {study.teamNote ? (
            <p className="reveal border-border text-muted-foreground mt-6 border-l-2 pl-4 text-sm leading-relaxed">
              {study.teamNote}
            </p>
          ) : null}
        </CaseSection>

        <CaseSection id="architecture" title="Architecture">
          <div className="reveal">
            <ArchitectureDiagram architecture={study.architecture} />
          </div>
        </CaseSection>

        <CaseSection id="features" title="Key features">
          <dl className="reveal grid gap-x-10 gap-y-6 sm:grid-cols-2">
            {study.features.map((feature) => (
              <div key={feature.title}>
                <dt className="text-sm font-semibold">{feature.title}</dt>
                <dd className="text-muted-foreground mt-1.5 text-sm leading-relaxed">
                  {feature.detail}
                </dd>
              </div>
            ))}
          </dl>
        </CaseSection>

        <CaseSection id="challenges" title="Technical challenges">
          <div className="space-y-5">
            {study.challenges.map((challenge) => (
              <ChallengeCard key={challenge.title} challenge={challenge} />
            ))}
          </div>
        </CaseSection>

        {study.database ? (
          <CaseSection id="database" title="Database design">
            <p className="reveal text-muted-foreground text-xs italic">
              {study.database.note}
            </p>

            <div className="reveal border-border mt-5 overflow-x-auto rounded-lg border">
              <table className="w-full min-w-[46rem] text-left text-sm">
                <caption className="sr-only">
                  Main entities, their purpose and their relationships
                </caption>
                <thead className="bg-surface-muted">
                  <tr>
                    <th scope="col" className="px-4 py-3 font-mono text-xs uppercase">
                      Entity
                    </th>
                    <th scope="col" className="px-4 py-3 font-mono text-xs uppercase">
                      Purpose
                    </th>
                    <th scope="col" className="px-4 py-3 font-mono text-xs uppercase">
                      Notable fields
                    </th>
                    <th scope="col" className="px-4 py-3 font-mono text-xs uppercase">
                      Relations
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-border divide-y">
                  {study.database.entities.map((entity) => (
                    <tr key={entity.name} className="align-top">
                      <th
                        scope="row"
                        className="px-4 py-3 font-mono text-xs font-medium"
                      >
                        {entity.name}
                      </th>
                      <td className="text-muted-foreground px-4 py-3">
                        {entity.purpose}
                      </td>
                      <td className="text-muted-foreground px-4 py-3 font-mono text-xs">
                        {entity.notableFields.join(", ")}
                      </td>
                      <td className="text-muted-foreground px-4 py-3 text-xs">
                        {entity.relations.join("; ")}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <h3 className="reveal mt-8 text-sm font-semibold">Design considerations</h3>
            <div className="mt-3">
              <BulletList items={study.database.considerations} />
            </div>
          </CaseSection>
        ) : null}

        {study.api ? (
          <CaseSection id="api" title="API design">
            <p className="reveal text-muted-foreground text-xs italic">
              {study.api.note}
            </p>

            <ul className="reveal divide-border border-border mt-5 divide-y rounded-lg border">
              {study.api.endpoints.map((endpoint) => (
                <li
                  key={`${endpoint.method}-${endpoint.path}`}
                  className="flex flex-col gap-1.5 p-4 sm:flex-row sm:items-baseline sm:gap-4"
                >
                  <span className="text-accent w-16 shrink-0 font-mono text-xs font-semibold">
                    {endpoint.method}
                  </span>
                  <code className="shrink-0 font-mono text-xs break-all">
                    {endpoint.path}
                  </code>
                  <span className="text-muted-foreground flex-1 text-sm">
                    {endpoint.purpose}
                  </span>
                  <span className="text-muted-foreground shrink-0 font-mono text-[0.7rem]">
                    {endpoint.auth}
                  </span>
                </li>
              ))}
            </ul>

            <h3 className="reveal mt-8 text-sm font-semibold">Conventions</h3>
            <div className="mt-3">
              <BulletList items={study.api.conventions} />
            </div>
          </CaseSection>
        ) : null}

        {study.code && study.code.length > 0 ? (
          <CaseSection id="code" title="Code, simplified">
            <p className="reveal text-muted-foreground max-w-2xl text-sm leading-relaxed">
              Written for this portfolio to show the shape of the implementation. None
              of it is production source.
            </p>
            <div className="reveal mt-6 space-y-5">
              {study.code.map((sample) => (
                <CodeBlock key={sample.title} sample={sample} />
              ))}
            </div>
          </CaseSection>
        ) : null}

        <CaseSection id="security" title="Security considerations">
          <BulletList items={study.security} />
        </CaseSection>

        <CaseSection id="outcomes" title="What changed">
          <BulletList items={study.outcomes} />
        </CaseSection>

        {others.length > 0 ? (
          <nav aria-label="Other case studies" className="border-border border-t pt-10">
            <h2 className="text-muted-foreground font-mono text-xs tracking-widest uppercase">
              Other case studies
            </h2>
            <ul className="mt-4 grid gap-3 sm:grid-cols-2">
              {others.map((other) => (
                <li key={other.slug}>
                  <Link
                    href={`/projects/${other.slug}`}
                    className="border-border bg-surface hover:border-border-strong block rounded-lg border p-4 transition-colors"
                  >
                    <span className="text-sm font-semibold">{other.name}</span>
                    <span className="text-muted-foreground mt-1 block text-sm">
                      {other.tagline}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ) : null}
      </Container>
    </article>
  );
}
