// Everything the site renders comes from the files in data/. Adding a project
// means adding an object, not editing a component.

export type ProficiencyLevel =
  "Production experience" | "Working knowledge" | "Currently learning";

export interface SkillGroup {
  category: string;
  description: string;
  items: { name: string; level: ProficiencyLevel }[];
}

export interface ExperienceItem {
  role: string;
  organization: string;
  /** Free text, so "2023" on its own is fine. */
  start: string;
  /** null means current. */
  end: string | null;
  location?: string;
  summary: string;
  /** Lead with a verb: Built, Designed, Implemented, Integrated, Deployed. */
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

export interface TechnicalChallenge {
  title: string;
  challenge: string;
  cause: string;
  solution: string;
  tradeOff: string;
  result: string;
}

export interface DatabaseEntity {
  name: string;
  purpose: string;
  notableFields: string[];
  relations: string[];
}

export interface ProjectDatabase {
  note: string;
  entities: DatabaseEntity[];
  considerations: string[];
}

export interface ApiEndpoint {
  method: "GET" | "POST" | "PATCH" | "PUT" | "DELETE";
  path: string;
  purpose: string;
  auth: string;
}

export interface ProjectApi {
  note: string;
  endpoints: ApiEndpoint[];
  conventions: string[];
}

export interface CodeSample {
  title: string;
  language: "php" | "ts" | "js" | "csharp" | "sql" | "http";
  description: string;
  code: string;
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
  users: string;
  problem: string[];
  responsibilities: string[];
  teamNote?: string;
  architecture: ProjectArchitecture;
  features: { title: string; detail: string }[];
  challenges: TechnicalChallenge[];
  security: string[];
  database?: ProjectDatabase;
  api?: ProjectApi;
  code?: CodeSample[];
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
  status: "In production" | "Delivered" | "Maintained" | "UAT";
  technologies: string[];
  /** The hardest part. Shown on the card. */
  keyChallenge: string;
  /** Three or four facts, shown as one line on the card. Must be verifiable. */
  metrics?: string[];
  featured: boolean;
  repoUrl?: string;
  liveUrl?: string;
  confidential: boolean;
  screenshots: Screenshot[];
  /** Only projects with one of these get a /projects/[slug] page. */
  caseStudy?: CaseStudy;
}
