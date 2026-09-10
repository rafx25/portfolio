import { site, isPlaceholder } from "@/lib/site";
import type { Project } from "@/data/types";

// JSON-LD has no slot in the Metadata API, so it goes in as a script tag.
// Input is our own typed data; escaping "<" stops a stray value closing the tag.
function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}

export function PersonJsonLd() {
  const sameAs = [site.github, site.linkedin].filter((url) => !isPlaceholder(url));

  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "Person",
        name: site.name,
        jobTitle: site.role,
        description: site.tagline,
        url: site.url,
        ...(sameAs.length > 0 ? { sameAs } : {}),
        knowsAbout: [
          "PHP",
          "Laravel",
          "MySQL",
          "REST API design",
          "Vue.js",
          "Role-Based Access Control",
          "Database design",
        ],
      }}
    />
  );
}

export function ProjectJsonLd({ project }: { project: Project }) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "CreativeWork",
        name: project.name,
        headline: project.tagline,
        abstract: project.caseStudy?.overview,
        creator: { "@type": "Person", name: site.name },
        url: `${site.url}/projects/${project.slug}`,
        keywords: project.technologies.join(", "),
      }}
    />
  );
}
