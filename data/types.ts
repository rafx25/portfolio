// Everything the site renders comes from the files in data/. Adding a project
// means adding an object, not editing a component.

export type ProficiencyLevel =
  "Production experience" | "Working knowledge" | "Currently learning";

export interface SkillGroup {
  category: string;
  items: { name: string; level: ProficiencyLevel }[];
}

export interface Position {
  title: string;
  /** Free text, so "2023" on its own is fine. */
  start: string;
  /** null means current. */
  end: string | null;
  /** Set when the position was held through another company. */
  employer?: string;
}

/** One organization, with every position held there, newest first. */
export interface ExperienceItem {
  organization: string;
  location?: string;
  positions: Position[];
  summary: string;
  highlights: string[];
  technologies: string[];
}

export interface EducationItem {
  qualification: string;
  institution: string;
  start: string;
  end: string;
}

export interface ArchitectureLayer {
  label: string;
  detail: string;
}

export interface ProjectArchitecture {
  summary: string;
  layers: ArchitectureLayer[];
  /** Anything outside the main request path. */
  integrations?: string[];
}

export interface Screenshot {
  src: string;
  alt: string;
  caption: string;
  /** Intrinsic pixel size, so next/image reserves the correct space. */
  width: number;
  height: number;
}

export interface CaseStudy {
  overview: string;
  problem: string[];
  built: string[];
  teamNote?: string;
  architecture: ProjectArchitecture;
  /** Two or three design decisions, in plain prose. */
  decisions: { title: string; detail: string }[];
  outcomes: string[];
}

export interface Project {
  slug: string;
  name: string;
  tagline: string;
  type: string;
  role: string;
  period: string;
  organization: string;
  status: "In production" | "Delivered" | "Maintained" | "UAT" | "In development";
  technologies: string[];
  /** Three or four facts, shown as one line on the card. */
  metrics?: string[];
  featured: boolean;
  repoUrl?: string;
  liveUrl?: string;
  confidential: boolean;
  screenshots: Screenshot[];
  /** Only projects with one of these get a /projects/[slug] page. */
  caseStudy?: CaseStudy;
}
