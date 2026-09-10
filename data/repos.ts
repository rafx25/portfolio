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
  // Example shape — replace with a real repository, or delete the entry.
  // {
  //   name: "portfolio",
  //   description: "This site. Next.js App Router, TypeScript, Tailwind, no CMS.",
  //   url: "https://github.com/YOUR-USERNAME/portfolio",
  //   technologies: ["Next.js", "TypeScript", "Tailwind CSS"],
  // },
];
