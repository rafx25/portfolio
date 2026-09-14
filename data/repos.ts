// Hand-picked rather than pulled from the GitHub API. A "recently pushed"
// feed says nothing about skill and adds a request that can rate-limit.
// An empty array is fine: the section reads correctly without it.
export interface Repo {
  name: string;
  description: string;
  url: string;
  technologies: string[];
}

export const repos: Repo[] = [
  {
    name: "portfolio",
    description:
      "This site. Next.js App Router and TypeScript, with Vitest tests and a GitHub Actions pipeline that lints, type-checks, tests and builds every push.",
    url: "https://github.com/rafx25/portfolio",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Vitest"],
  },
];
