<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Project conventions

Content is data. Text the site displays lives in `data/*.ts` and `lib/site.ts`,
never hard-coded inside a component. Adding a project means adding an object to
`data/projects.ts` — the route, metadata, sitemap entry and cross-links follow
from it.

Server components by default. Add `"use client"` only where the browser is
genuinely needed (state, events, browser APIs), and keep it as low in the tree
as possible. Only three files have it today.

Validation lives in `lib/validation.ts` and is imported by both the form and
the API route, so the two cannot drift. The server's copy is the one that
decides; the client's is for feedback.

Placeholders are wrapped in `[SQUARE BRACKETS]`. Do not invent values for them
— leave them for the author. Never invent metrics, dates, employers or
technologies.

No production source, schema, endpoint or record from the systems described in
`data/projects.ts` belongs in this repository. Code samples there are written
from scratch for the site, not copied out of the projects.

Screenshots in `public/projects/` come from test accounts. Where a real name
still appeared it was painted over in the PNG itself. Never add a capture
without checking it for names, employee numbers, case details, email addresses
or internal URLs first, and never hide something with CSS instead of editing
the file.

Before claiming work is done: `npm run verify` (lint, typecheck, test, build).
