export interface Principle {
  title: string;
  detail: string;
}

export const principles: Principle[] = [
  {
    title: "Read it before you change it",
    detail:
      "Almost everything I work on already exists and already has users. Finding out why something was written that way is usually faster than rewriting it and discovering the reason later.",
  },
  {
    title: "Permission checks run on the server",
    detail:
      "Hiding a button in the UI is not a permission check. The check runs on the route, and again in the service before it changes anything.",
  },
  {
    title: "Validate where input comes in",
    detail:
      "Input gets validated at the edge of the system. Nothing after that has to wonder whether a value can be trusted.",
  },
  {
    title: "Business rules do not live in controllers",
    detail:
      "A controller takes a request, hands it to something that knows the rule, and returns a response. The same rule often has to run from a form post and from an API call, and I only want to write it once.",
  },
  {
    title: "Log what the office would be asked to prove",
    detail:
      "Who approved what, when, and what changed. In government systems that gets audited, so the audit row goes in the same transaction as the change itself.",
  },
  {
    title: "Handle the failures that actually happen",
    detail:
      "The reader gets unplugged. The connection drops halfway through an approval. The import file has one bad row out of four hundred. Those are not edge cases, they are Tuesday.",
  },
  {
    title: "Boring code is easier to keep",
    detail:
      "Someone reads this in two years without today's context, and it is often me. Obvious beats clever.",
  },
  {
    title: "Secrets never go in the repo",
    detail: "Environment config only. There is no judgement call in this one.",
  },
  {
    title: "Test the paths that cost money",
    detail:
      "Not every line. Approval transitions, permission checks, balance computation, the places where being wrong is expensive.",
  },
];

export interface AiWorkflowStep {
  step: string;
  detail: string;
}

export const aiWorkflow: AiWorkflowStep[] = [
  {
    step: "Understand the requirement",
    detail:
      "What is the office actually asking for, and which existing rules does it touch. No tool does this part for me.",
  },
  {
    step: "Decide the design",
    detail:
      "Data model, where the logic sits, what happens when it fails. Settled before anything gets generated.",
  },
  {
    step: "Use the AI",
    detail:
      "Boilerplate, an unfamiliar API, a second opinion on an approach, a first draft of tests or docs.",
  },
  {
    step: "Read every line",
    detail:
      "If I cannot explain why it works, it does not go in. A fair amount gets rewritten here.",
  },
  {
    step: "Test it",
    detail: "Against the real cases, not just the one the happy path covers.",
  },
  {
    step: "Check the security",
    detail:
      "Is the permission checked on the server. Is the input validated. Is anything being concatenated into a query. Generated code sounds sure about all three and is wrong often enough to matter.",
  },
  {
    step: "Read the diff",
    detail:
      "Before committing. It catches files a tool touched that I did not ask it to.",
  },
  { step: "Deploy, then watch it", detail: "Rather than assuming it went fine." },
];

export const aiTools = [
  {
    name: "Claude Code",
    use: "Finding my way around unfamiliar code, refactoring, first drafts of tests and documentation.",
  },
  {
    name: "OpenAI Codex",
    use: "Implementation drafts, and repetitive code that follows a pattern already in the project.",
  },
  {
    name: "ChatGPT",
    use: "Research, comparing two approaches, talking through a design before I commit to it.",
  },
] as const;

export const aiPrinciple =
  "I treat AI-generated code as untrusted until I have read it, understood it and tested it.";
