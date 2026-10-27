# Bernard Abuto — Portfolio

Personal website for Bernard Abuto, Machine Learning Research Engineer and AI Systems Engineer, Kenya.

Built with Next.js 16 (App Router), React 19, TypeScript, and Tailwind CSS 4. There is no database or CMS. Every page is prerendered; the only server code is the contact form's Server Action.

## Running locally

Requires Node.js 20 or later.

```bash
npm install
npm run dev        # http://localhost:3000
```

Production build:

```bash
npm run build
npm start
```

Checks:

```bash
npx tsc --noEmit   # types (run after a build so route types exist)
npm run lint
```

## Where things live

| What | Where |
| --- | --- |
| Name, links, email, site description | `src/content/site.ts` |
| Project content, statuses, and "current state" | `src/content/projects.ts` |
| Experience | `src/content/experience.ts` |
| Education and training | `src/content/education.ts` |
| Research pipeline copy, research interests | `src/content/research.ts` |
| Blog posts | `src/content/blog.ts` |
| Contact form topics | `src/content/contact.ts` |
| Contact form sending logic | `src/app/actions/contact.ts` |
| Homepage sections | `src/components/sections/` |
| Project page template | `src/components/projects/ProjectArticle.tsx` |
| Project diagrams | `src/components/projects/*Diagram.tsx` |
| Colours (dark theme), fonts, utilities | `src/app/globals.css`, `src/app/layout.tsx` |

Project pages are generated from `projects.ts` at `/work/[slug]`. To add a project, add an entry there and a matching diagram in `ProjectVisual.tsx`.

When a project changes, update its `components` list (each has a `state`) and its `currentState` first. Those are what keep the site honest.

## Site structure

| Route | Purpose |
| --- | --- |
| `/` | Overview: hero, project list, latest posts, short about, contact call to action |
| `/about` | How I work, resume download, experience, education |
| `/work`, `/work/[slug]` | Full project showcase with diagrams; one page per project |
| `/research` | Research pipeline and interests |
| `/blog`, `/blog/[slug]` | Posts |
| `/contact` | Contact form |

Navigation lives in `navigation` in `src/content/site.ts` (the footer reuses it). Every top-level page opens with `PageHeader` (`src/components/ui/PageHeader.tsx`); its number matches the page's position in the navigation.

## Writing a blog post

Posts live in `src/content/blog.ts` as structured blocks (paragraphs, headings, lists, quotes, code, tables). Wrap inline code in backticks and write links as `[text](https://…)` (relative links like `/blog/slug` stay on-site). Add external references to the post's `sources` list; they render as a numbered "Sources" section.

Each post has two dates: `period` (YYYY-MM, when the work it describes happened — establish it from git history) and `published` (YYYY-MM-DD, when it actually went live). Lists are ordered by `period`; structured data and the sitemap use `published`.

## Portrait

The hero shows `public/images/bernard-portrait.jpg` (4:5 frame). To change it, replace that file and redeploy. If the file is missing, a placeholder is shown instead of a broken image.

## Resume

The downloadable resume (`public/resume/`) is generated from `resume/resume.json` by `resume/build.py`, which produces a PDF and an editable DOCX. See [`resume/README.md`](resume/README.md). The About section and the hero link to it; paths live in `site.resume` in `src/content/site.ts`.

## Contact form

The form sends email through [Resend](https://resend.com) from a Server Action — no extra packages, and your email address is never shown on the site. Messages arrive with Reply-To set to the visitor, so you can reply directly.

1. Create a free Resend account **using the address you want messages delivered to**, and create an API key.
2. In Vercel → Project → Settings → Environment Variables, add `RESEND_API_KEY`. Redeploy.

That is enough: by default the form sends from Resend's test sender (`onboarding@resend.dev`), which can only deliver to your own Resend account address. Optional variables (see `.env.example`):

- `CONTACT_TO_EMAIL` — delivery address (defaults to the email in `src/content/site.ts`).
- `CONTACT_FROM_EMAIL` — a sender on a domain you have verified in Resend, e.g. `Portfolio <hello@your-domain>`.

Without `RESEND_API_KEY`, the form validates input but tells visitors the message couldn't be sent, and logs the reason on the server.

## Deploying to Vercel

1. Push the repository to GitHub.
2. In Vercel, choose **Add New → Project** and import the repository. The framework preset (Next.js) and build settings are detected automatically.
3. Optionally set the production domain (see below), then deploy.

## Configuring the domain

Canonical URLs, Open Graph URLs, the sitemap, and robots.txt all use one value:

```
NEXT_PUBLIC_SITE_URL=https://your-domain.example
```

Set it under **Vercel → Project → Settings → Environment Variables**, or in `.env.local` locally. If it is unset, the site falls back to `https://bernardabuto.vercel.app` (defined in `src/content/site.ts`).

## Notes

- Fonts (Instrument Serif, Inter, IBM Plex Mono) are self-hosted at build time through `next/font`.
- Motion is CSS-only and is switched off under `prefers-reduced-motion`.
- The research pipeline renders all six stage descriptions into the HTML. Inactive ones are hidden visually, so the text stays available to search engines and to visitors without JavaScript.
