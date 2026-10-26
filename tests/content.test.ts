import { describe, expect, it } from "vitest";

import {
  projects,
  caseStudyProjects,
  featuredProjects,
  getProject,
} from "@/data/projects";
import { skills } from "@/data/skills";
import { experience } from "@/data/experience";

// These guard the content, not the rendering. Hand-editing a project is where
// a typo quietly produces a broken route or a duplicate page.
describe("project data", () => {
  it("has unique slugs", () => {
    const slugs = projects.map((p) => p.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("uses URL-safe slugs", () => {
    for (const project of projects) {
      expect(project.slug).toMatch(/^[a-z0-9]+(?:-[a-z0-9]+)*$/);
    }
  });

  it("gives every featured project a case study to link to", () => {
    for (const project of featuredProjects) {
      expect(
        project.caseStudy,
        `${project.slug} is featured but has no case study`,
      ).toBeDefined();
    }
  });

  it("resolves every case study slug through getProject", () => {
    for (const project of caseStudyProjects) {
      expect(getProject(project.slug)?.slug).toBe(project.slug);
    }
  });

  it("returns undefined for an unknown slug so the page can 404", () => {
    expect(getProject("does-not-exist")).toBeUndefined();
  });

  it("keeps each case study short", () => {
    for (const project of caseStudyProjects) {
      const study = project.caseStudy;
      expect(study.problem.length, `${project.slug}: problem`).toBeGreaterThan(0);
      expect(study.problem.length, `${project.slug}: problem`).toBeLessThanOrEqual(3);
      expect(study.built.length, `${project.slug}: built`).toBeLessThanOrEqual(6);
      expect(study.decisions.length, `${project.slug}: decisions`).toBeGreaterThan(0);
      expect(study.decisions.length, `${project.slug}: decisions`).toBeLessThanOrEqual(
        3,
      );
      expect(study.outcomes.length, `${project.slug}: outcomes`).toBeLessThanOrEqual(3);
      expect(study.architecture.layers.length).toBeGreaterThan(1);
    }
  });
});

describe("skills data", () => {
  it("uses no percentages anywhere", () => {
    for (const group of skills) {
      for (const item of group.items) {
        expect(item.name).not.toMatch(/\d+\s*%/);
      }
    }
  });

  it("has no duplicate entries within a group", () => {
    for (const group of skills) {
      const names = group.items.map((i) => i.name);
      expect(new Set(names).size, `duplicate in ${group.category}`).toBe(names.length);
    }
  });
});

describe("experience data", () => {
  it("has at most one current position", () => {
    const current = experience
      .flatMap((item) => item.positions)
      .filter((position) => position.end === null);
    expect(current.length).toBeLessThanOrEqual(1);
  });

  it("lists each organization once", () => {
    // The experience list keys on the organization.
    const keys = experience.map((item) => item.organization);
    expect(new Set(keys).size).toBe(keys.length);
  });

  it("gives every organization at least one position", () => {
    for (const item of experience) {
      expect(
        item.positions.length,
        `${item.organization} has no position`,
      ).toBeGreaterThan(0);
    }
  });

  it("keeps first-person pronouns out of the highlights", () => {
    // Resume bullets read as actions, not as a story about "I".
    for (const item of experience) {
      for (const highlight of item.highlights) {
        expect(highlight, item.organization).not.toMatch(/\b(I|my|me)\b/);
      }
    }
  });

  it("has no repeated technology within a role", () => {
    for (const item of experience) {
      expect(
        new Set(item.technologies).size,
        `${item.organization} lists a technology twice`,
      ).toBe(item.technologies.length);
    }
  });

  it("gives every role at least one highlight", () => {
    for (const item of experience) {
      expect(
        item.highlights.length,
        `${item.organization} has no highlights`,
      ).toBeGreaterThan(0);
    }
  });
});
