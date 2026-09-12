import type { MetadataRoute } from "next";

import { caseStudyProjects } from "@/data/projects";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes = ["", "/about", "/projects", "/resume", "/colophon"].map(
    (path) => ({
      url: `${site.url}${path}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: path === "" ? 1 : 0.7,
    }),
  );

  const caseStudies = caseStudyProjects.map((project) => ({
    url: `${site.url}/projects/${project.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [...staticRoutes, ...caseStudies];
}
