import { caseStudyProjects, getProject } from "@/data/projects";
import { site } from "@/lib/site";
import { ogCard, ogSize } from "@/lib/og-card";

// One card per case study, so a shared link previews that project rather
// than the home page.
export const alt = `Case study — ${site.name}`;
export const size = ogSize;
export const contentType = "image/png";

/** Same list as the page, so every card is rendered at build time. */
export function generateStaticParams() {
  return caseStudyProjects.map((project) => ({ slug: project.slug }));
}

export default async function OpengraphImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project?.caseStudy) {
    return ogCard({
      eyebrow: site.role,
      title: site.headline,
      footer: site.stack.slice(0, 6).join(" · "),
    });
  }

  return ogCard({
    eyebrow: `Case study · ${project.type}`,
    title: project.name,
    subtitle: project.tagline,
    footer: project.technologies.slice(0, 4).join(" · "),
  });
}
