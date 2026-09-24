# Bùi Nguyên Phong — Engineering Portfolio

A lightweight personal portfolio focused on learning and building toward Data Engineering. Includes a JobLake case study based on the actual pipeline and web repositories, a responsive architecture diagram, a real application screenshot, and the supplied résumé.

## Run locally

Node.js 24 and npm are required.

```sh
npm ci
npm run dev
```

```sh
npm run typecheck
npm run build
npm start
```

## Update content

- `src/content/portfolio.ts`: name, headline, introduction, focus, skills, experience, education, project links, and contacts. Empty optional contact values are hidden.
- `src/content/joblake.ts`: case-study facts, source revisions, decisions, problems, lessons, and proposed improvements.
- `src/app/projects/joblake/page.tsx`: detailed technical narrative and case-study sections.
- `src/components/architecture.tsx`: the implemented data flow. Update when the system changes.
- `public/resume.pdf`: supplied résumé dated 23 September 2026. Replace with a new public résumé and keep the configured link consistent.
- `public/joblake.webp`: screenshot of the real website, captured 24 September 2026.

Do not turn learning areas into claims of professional experience. Review current source code before changing architectural claims. The frontend repository is private; the portfolio deliberately links only to public pipeline source and the live website.

## Deployment

Next.js App Router, TypeScript, Tailwind CSS, and locally bundled Be Vietnam Pro fonts. Both content routes are prerendered. No database, authentication, analytics service, or environment secrets are required by this portfolio.

Import `godwindk3/portfolio` into Vercel with the Next.js preset, repository root, Node 24.x, and the default build command. Production follows `main`; branch pushes can create previews. No paid services are required.

## Source review

See `docs/source-review.md` for the factual basis and the distinction between implemented features and future work.
