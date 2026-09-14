import type { MetadataRoute } from "next";

import { caseStudyProjects } from "@/data/projects";
import { site } from "@/lib/site";

// No lastModified: the build time would mark every page as changed on every
// deploy, and crawlers learn to ignore a date that is always new.
export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["", "/about", "/projects", "/resume", "/colophon"].map(
    (path) => ({
      url: `${site.url}${path}`,
      changeFrequency: "monthly" as const,
      priority: path === "" ? 1 : 0.7,
    }),
  );

  const caseStudies = caseStudyProjects.map((project) => ({
    url: `${site.url}/projects/${project.slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [...staticRoutes, ...caseStudies];
}
