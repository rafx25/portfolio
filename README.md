# Portfolio

A full stack developer portfolio built with the Next.js App Router. It is a
static site with one dynamic endpoint: the content is typed data compiled at
build time, and the only server work at runtime is the contact form.

> **Placeholders.** Personal details are not filled in yet. Anything wrapped in
> `[SQUARE BRACKETS]` still needs replacing — start with `lib/site.ts`, then
> `data/experience.ts` and the `[YYYY]` / `[ORGANIZATION]` fields in
> `data/projects.ts`.

## Tech stack

| Layer      | Choice                                             |
| ---------- | -------------------------------------------------- |
| Framework  | Next.js 16 (App Router, React 19, Turbopack)       |
| Language   | TypeScript,`strict` + `noUncheckedIndexedAccess`   |
| Styling    | Tailwind CSS v4, design tokens in`app/globals.css` |
| Icons      | lucide-react, plus two inlined brand marks         |
| Theme      | next-themes (class strategy, system default)       |
| Validation | Zod, one schema shared by client and server        |
| Email      | Resend (optional — the site works without it)      |
| Testing    | Vitest, Testing Library, jsdom                     |
| Analytics  | Vercel Analytics and Speed Insights                |
| Hosting    | Vercel                                             |

## Features

- Case study pages generated from typed data (`/projects/[slug]`), prerendered
  at build time
- Redacted screenshots of the real systems, served through `next/image`
- Circular profile photo in the hero and on the about page (`public/avatar.png`)
- Architecture diagrams rendered from data rather than shipped as images
- Light and dark themes with no flash on load
- Contact form with shared validation, per-IP rate limiting and a honeypot
- Open Graph image generated at build time from the site config
- `sitemap.xml`, `robots.txt`, canonical URLs and per-page metadata
- Security headers set in `next.config.ts`
- Accessible by construction: semantic landmarks, visible focus, skip link,
  labelled controls, `prefers-reduced-motion` respected

## Architecture

```
app/                    Routes. Server components unless marked "use client".
  page.tsx              Home — composes the sections
  about/                Long-form about page
  projects/             Index, and [slug] case studies (generateStaticParams)
  colophon/             Build decisions for this site
  api/contact/          The only runtime endpoint
  opengraph-image.tsx   OG card, generated at build time
  sitemap.ts robots.ts  SEO route handlers
  error.tsx not-found.tsx

components/
  layout/               Header, footer, theme provider and toggle
  sections/             One component per home-page section
  projects/             Case study building blocks
  seo/                  JSON-LD
  ui/                   Primitives: button, badge, container, section, icons

data/                   All content. Typed, no CMS.
  types.ts              The content model
  projects.ts           Projects and case studies
  experience.ts skills.ts engineering.ts repos.ts

lib/
  site.ts               Personal details, single source of truth
  validation.ts         Zod schema shared by the form and the API route
  rate-limit.ts         Fixed-window limiter
  mail.ts               Resend delivery, configuration read at call time
  utils.ts              cn() and small helpers

tests/                  Vitest — validation, rate limiting, form, content model
docs/                   Local learning notes (git-ignored on purpose)
```

Three decisions worth stating up front, with the reasoning in
[`/colophon`](app/colophon/page.tsx):

1. **No database.** Content is typed files; the contact form sends an email and
   stores nothing. A database added only to look "full stack" is a liability,
   not a feature — the projects demonstrate that skill.
2. **No component library.** The site needs four primitives. Writing them is a
   better trade than installing a library and its peer dependencies.
3. **No animation library.** The one effect is a CSS scroll-driven fade, behind
   `@supports` and disabled under `prefers-reduced-motion`.

## Local setup

Requires Node.js 20 or newer.

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open http://localhost:3000.

## Environment variables

Documented in full in `.env.example`.

| Variable               | Required | Purpose                                                 |
| ---------------------- | -------- | ------------------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL` | Yes      | Canonical URLs, sitemap, Open Graph. No trailing slash. |
| `RESEND_API_KEY`       | No       | Enables contact form delivery. Server-side only.        |
| `CONTACT_FROM_EMAIL`   | No       | Verified sender on your Resend domain.                  |
| `CONTACT_TO_EMAIL`     | No       | Where messages are delivered.                           |

Without the Resend variables the form still renders and validates; the API
returns a clear "not configured" response and the UI points at the email link.
Nothing crashes and nothing leaks.

## Scripts

| Script               | What it does                                   |
| -------------------- | ---------------------------------------------- |
| `npm run dev`        | Development server                             |
| `npm run build`      | Production build                               |
| `npm start`          | Serve the production build                     |
| `npm run lint`       | ESLint                                         |
| `npm run typecheck`  | `tsc --noEmit`                                 |
| `npm run test`       | Vitest, once                                   |
| `npm run test:watch` | Vitest, watching                               |
| `npm run format`     | Prettier                                       |
| `npm run verify`     | lint → typecheck → test → build (what CI runs) |

## Testing

Vitest with Testing Library and jsdom. The suite covers the parts where a bug
would actually cost something:

- the contact schema, including trimming, length caps and the honeypot
- the rate limiter's window, per-key isolation and expiry
- the contact form: validation errors, `aria-invalid` wiring, submission, and
  server error handling
- the content model: unique slugs, featured projects having case studies, every
  challenge stating a trade-off, no percentage claims in the skills data

```bash
npm run test
```

## Deployment

Push to GitHub, import the repository at [vercel.com/new](https://vercel.com/new),
set `NEXT_PUBLIC_SITE_URL` (and the Resend variables if you want the form live),
and deploy. Every later push to `main` redeploys automatically.

The step-by-step version, written for a first deployment, is in
`docs/13-vercel-deployment.md`.

## Security notes

- Security headers (`X-Content-Type-Options`, `X-Frame-Options`,
  `Referrer-Policy`, `Permissions-Policy`, HSTS) set in `next.config.ts`
- Contact input validated server-side; the client-side check is for feedback only
- Per-IP rate limiting on the contact endpoint, with `Retry-After` on rejection
- Honeypot spam screening that answers successfully, so bots learn nothing
- The sender's address goes in `replyTo`, never in `from`; header values are
  stripped of newlines to prevent header injection
- HTML email content is escaped
- No secrets in the repository — `.env*` is git-ignored, `.env.example` is not
- Errors returned to the browser are messages; stack traces stay on the server
- Every project here is an internal government system. No production source,
  schema, endpoint or record appears in this repository. The code samples were
  written for this site rather than copied out of the projects
- Screenshots are captures from test accounts. Where a real name still appeared
  it was painted over in the PNG before upload, not hidden with CSS

## AI-assisted development

AI tools (Claude Code, OpenAI Codex, ChatGPT) were used while building this
site — for boilerplate, drafts, refactoring suggestions and documentation.

The architecture, the technology choices, the trade-offs recorded in
`/colophon`, the review of every line, the tests and the final validation are
the developer's own work and responsibility. Generated code was treated as
untrusted until it was read, understood and tested. That is the same standard
described in the AI-assisted engineering section of the site itself.
