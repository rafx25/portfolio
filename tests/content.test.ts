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

  it("describes each case study's problem, challenges and security", () => {
    for (const project of caseStudyProjects) {
      const study = project.caseStudy;
      expect(
        study.problem.length,
        `${project.slug}: no problem statement`,
      ).toBeGreaterThan(0);
      expect(study.challenges.length, `${project.slug}: no challenges`).toBeGreaterThan(
        0,
      );
      expect(
        study.security.length,
        `${project.slug}: no security notes`,
      ).toBeGreaterThan(0);
      expect(study.architecture.layers.length).toBeGreaterThan(1);
    }
  });

  it("states a trade-off for every challenge", () => {
    for (const project of caseStudyProjects) {
      for (const challenge of project.caseStudy.challenges) {
        expect(
          challenge.tradeOff.trim().length,
          `${project.slug} / ${challenge.title} has no trade-off`,
        ).toBeGreaterThan(0);
      }
    }
  });

  it("never claims a system is fully secure", () => {
    const forbidden = /100% secure|fully secure|completely secure|unhackable/i;

    for (const project of caseStudyProjects) {
      for (const note of project.caseStudy.security) {
        // "No system is ever 'fully secure'" is the one allowed use.
        if (note.startsWith("No system is ever")) continue;
        expect(note, `${project.slug}: overclaim in security notes`).not.toMatch(
          forbidden,
        );
      }
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
  it("has at most one current role", () => {
    const current = experience.filter((item) => item.end === null);
    expect(current.length).toBeLessThanOrEqual(1);
  });

  it("keeps organisation and start date unique across roles", () => {
    // The experience list keys on these two together.
    const keys = experience.map((item) => `${item.organization}-${item.start}`);
    expect(new Set(keys).size).toBe(keys.length);
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
