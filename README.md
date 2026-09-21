# lulopdz.github.io

[![Deploy to GitHub Pages](https://github.com/lulopdz/lulopdz.github.io/actions/workflows/deploy.yml/badge.svg)](https://github.com/lulopdz/lulopdz.github.io/actions/workflows/deploy.yml)
[![Built with Astro](https://img.shields.io/badge/Built%20with-Astro%205-BC52EE?logo=astro&logoColor=white)](https://astro.build)
[![Hosted on GitHub Pages](https://img.shields.io/badge/Hosted%20on-GitHub%20Pages-222?logo=github)](https://lulopdz.github.io)

Source code for the personal academic website of **Luis Lopez**, PhD Candidate in power and energy systems planning at the [Apex Lab](https://carleton.ca/apex/), Carleton University.

**Live site:** <https://lulopdz.github.io>

---

## Table of Contents

- [About the Site](#about-the-site)
- [Technology Stack](#technology-stack)
- [Getting Started](#getting-started)
- [Previewing Changes Locally](#previewing-changes-locally)
- [Managing Content](#managing-content)
- [Project Structure](#project-structure)
- [Deployment](#deployment)
- [License](#license)

---

## About the Site

The website is a compact academic portfolio designed to present a research profile, a publication record, and a set of open tools in a fast, accessible and distraction-free format. It is organised into five sections:

| Section | Purpose |
| --- | --- |
| **About** | Short biography, affiliations and links to the résumé and extended CV. |
| **Papers** | Publication list grouped by year, with *Selected* / *All* / per-year filters and one-click BibTeX copy for every entry. |
| **Teaching** | Teaching appointments grouped by year, each linking to a course-materials page generated from a folder of files. |
| **Tools** | Open resources and software (e.g. a LaTeX thesis template), filterable by tag. |
| **Contact** | Email, GitHub and Google Scholar links. |

Key characteristics:

- **Static and dependency-light.** The site is pre-rendered to plain HTML/CSS at build time; there is no client-side framework and no runtime data fetching. The only client-side JavaScript is a ~3 KB inlined module for tabs, theme and filters.
- **Content as data.** Publications and tools live in Markdown files with typed YAML frontmatter, validated at build time with Zod schemas. Adding a paper is a matter of adding a file.
- **Optimised images.** The profile photo is resized and converted to WebP at build time (`astro:assets`), with 1x/2x variants served through `srcset`.
- **Light and dark themes**, with the preference persisted in `localStorage` and the system preference used as default.
- **Deep-linkable sections** via URL hashes (`/#papers`, `/#teaching`, `/#tools`, `/#contact`).
- **Automatic author highlighting** in publication entries.
- **Search and social ready.** Canonical URL, Open Graph and Twitter Card metadata, schema.org `Person` structured data, sitemap and `robots.txt` are generated at build time.

---

## Technology Stack

| Layer | Technology | Notes |
| --- | --- | --- |
| Static site generator | [Astro](https://astro.build) 5.x | Static output, file-based build format. |
| Content management | Astro Content Layer (`glob` loader) + [Zod](https://zod.dev) | Schemas defined in `src/content.config.ts`. |
| Image optimisation | `astro:assets` (Sharp) | Build-time resize, WebP conversion and `srcset` generation. |
| Templating | `.astro` components | No UI framework; zero JavaScript shipped by Astro itself. |
| Styling | Vanilla CSS with custom properties | Single global stylesheet, "Nordic Slate" palette, light/dark tokens. |
| Typography | [Inter](https://fonts.google.com/specimen/Inter), [JetBrains Mono](https://fonts.google.com/specimen/JetBrains+Mono) | Loaded from Google Fonts. |
| Icons | [Font Awesome](https://fontawesome.com) 6, [Academicons](https://jpswalsh.github.io/academicons/) | Loaded from cdnjs. |
| Interactivity | Vanilla TypeScript (`src/scripts/interactions.ts`) | Bundled, minified and inlined by Astro; tab switching, theme toggle, filters, BibTeX copy. |
| SEO | [`@astrojs/sitemap`](https://docs.astro.build/en/guides/integrations-guide/sitemap/), JSON-LD | Sitemap index, Open Graph / Twitter Card tags in `BaseLayout.astro`; `Person` schema on the home page. |
| CI/CD | [GitHub Actions](https://github.com/features/actions) | Builds and publishes to GitHub Pages on every push to `main`. |
| Hosting | [GitHub Pages](https://pages.github.com) | Served from the `lulopdz.github.io` user site. |

---

## Getting Started

### Prerequisites

- **Node.js** 18.17.1 or newer (Node 20 LTS is used in CI and pinned in `.nvmrc`; `nvm use` picks it up automatically).
- **npm** 9 or newer (bundled with Node).
- **Git**.

Verify your installation:

```bash
node --version
npm --version
```

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/lulopdz/lulopdz.github.io.git
cd lulopdz.github.io

# 2. Install dependencies (reproducible install from package-lock.json)
npm ci
```

> If `npm ci` fails because the lockfile is out of sync, fall back to `npm install`.

### Available Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Starts the development server at `http://localhost:4321` with hot module replacement. |
| `npm run build` | Produces the optimised production build in `dist/`. |
| `npm run preview` | Serves the contents of `dist/` locally, exactly as they will be deployed. |

---

## Previewing Changes Locally

Always verify changes in the browser before committing. Two workflows are available depending on what you need.

### 1. Live development (while editing)

```bash
npm run dev
```

Open <http://localhost:4321>. Every change to `.astro`, `.css` or Markdown files is reflected in the browser immediately without a manual reload. Use this mode for iterating on content and styling.

To expose the dev server on your local network (e.g. to test on a phone):

```bash
npm run dev -- --host
```

### 2. Production preview (before pushing)

The development server is not byte-for-byte identical to the deployed site. Before pushing to `main`, build the site and serve the actual output:

```bash
npm run build
npm run preview
```

Open <http://localhost:4321> and confirm that:

- all five tabs render and the URL hashes (`/#papers`, `/#teaching`, `/#tools`, `/#contact`) open the correct tab on load;
- the theme toggle works in both directions and the choice persists after a reload;
- images and icons load (no 404s in the browser console);
- publication filters and the *BibTeX* copy button behave as expected;
- the layout holds at narrow widths (use the browser's device toolbar).

A build that fails locally will also fail in CI, so a successful `npm run build` is the minimum bar before committing.

### 3. Commit and publish

```bash
git add .
git commit -m "Describe the change"
git push origin main
```

The GitHub Actions workflow builds and deploys automatically (see [Deployment](#deployment)).

---

## Managing Content

All site content is stored as Markdown files with YAML frontmatter under `src/content/`. The frontmatter is validated against the schemas in [`src/content.config.ts`](src/content.config.ts); a build will fail with a descriptive error if a required field is missing or has the wrong type.

### Publications — `src/content/papers/`

Create one file per publication. The file name is free-form but a `YYYY-NN-short-title.md` convention keeps the directory sorted.

```markdown
---
title: "Title of the Publication"
authors: "Luis Lopez, Coauthor Name, Another Coauthor"
venue: "IEEE Transactions on Power Systems"
year: 2025
link: "https://doi.org/..."       # optional
linkLabel: "IEEE Xplore"          # optional, default: "Paper"
featured: true                    # optional, shows under the "Selected" filter
type: "journal"                   # optional: journal | conference | preprint | other
order: 1                          # optional, sort order within the same year
bibtex: |                         # optional, enables the BibTeX button
  @article{lopez2025title,
    title   = {Title of the Publication},
    author  = {Lopez, Luis and Name, Coauthor},
    journal = {IEEE Transactions on Power Systems},
    year    = {2025}
  }
---
```

Publications are sorted by `year` (descending) and then by `order` (ascending). The author name (`L. Lopez`, `Luis Lopez`, `Luis Lopez Diaz`) is highlighted automatically.

### Teaching — `src/content/teaching/`

One file per course appointment. Entries are grouped by `year` (newest first) and sorted by `order` within a year; `current: true` adds a live *Current* badge.

```markdown
---
course: "Fluid Mechanics I"
code: "MAAE 2300"
institution: "Carleton University"
institutionUrl: "https://carleton.ca/mae/"   # optional
role: "Teaching Assistant"
term: "Fall 2026"
year: 2026
current: true                                # optional, default: false
materialsDir: "maae2300"                     # optional, folder under public/teaching/
materialsLabel: "Course Materials"           # optional, button text
order: 1
---
```

**Course materials.** When `materialsDir` is set, the card shows a *Course Materials* button that opens `/teaching/<materialsDir>/`, a page generated at build time from the contents of `public/teaching/<materialsDir>/`. To publish material, drop the files (PDF, ZIP, notebooks, ...) in that folder and rebuild; no other change is needed. Files are listed in name order, so a numeric prefix controls the sequence. The display title is derived from the file name: the numeric prefix is dropped, `--` becomes an em dash, single `-`/`_` become spaces and the original capitalisation is kept.

```
public/teaching/maae2300/
├── 01-Introduction.pdf                                   -> "Introduction"
├── 02-Tutorial-1--Fluid-Properties.pdf                   -> "Tutorial 1 — Fluid Properties"
└── 03-Tutorial-2--Fluid-Statics.pdf                      -> "Tutorial 2 — Fluid Statics"
```

### Tools and projects — `src/content/projects/`

```markdown
---
title: "Tool Name"
description: "One or two sentences describing what the tool does."
image: "/assets/images/tools/banner.svg"  # optional, banner shown at the top of the card
link: "https://..."                        # optional, primary action
linkLabel: "Open on Overleaf"              # optional, default: "Access"
code: "https://github.com/..."             # optional, adds a "Code" button
featured: true                             # optional, highlights the card
inProgress: false                          # optional, shows a status badge
statusBadge: "Under Active Development"    # optional, text for the status badge
tags: ["LaTeX", "Template"]                # used to build the tag filters
order: 1
---
```

### Biography, contact details and sidebar

- Biography and contact cards: [`src/pages/index.astro`](src/pages/index.astro)
- Sidebar (name, affiliation, social links): [`src/components/Sidebar.astro`](src/components/Sidebar.astro)
- Profile photo: replace [`src/assets/profile.jpg`](src/assets/profile.jpg) with any reasonably large JPEG/PNG; Astro produces the optimised variants on build.
- Résumé and CV: replace the PDFs in [`public/cv/`](public/cv/) keeping the same file names (`luis-lopez-resume.pdf`, `luis-lopez-cv.pdf`) so existing links stay valid.
- Social preview card: [`public/og-image.jpg`](public/og-image.jpg) (1200×630) is referenced by the Open Graph and Twitter tags in `Layout.astro`.
- Page metadata (title, description): [`src/layouts/Layout.astro`](src/layouts/Layout.astro)
- Colours, typography and layout: [`src/styles/global.css`](src/styles/global.css)

---

## Project Structure

```
.
├── .github/workflows/
│   └── deploy.yml              # CI: build with Astro and deploy to GitHub Pages
├── public/                     # Static assets copied verbatim to the build output
│   ├── assets/images/tools/    # SVG banners for the Tools cards
│   ├── cv/                     # Résumé and extended CV (PDF)
│   ├── teaching/<course>/      # Course materials, listed automatically at /teaching/<course>/
│   ├── apple-touch-icon.png    # 180×180 icon for iOS home screens
│   ├── favicon.svg             # Primary icon (+ 32/96 px PNG fallbacks)
│   ├── og-image.jpg            # 1200×630 social preview card
│   └── robots.txt
├── src/
│   ├── assets/
│   │   └── profile.jpg         # Source photo, optimised by astro:assets at build time
│   ├── components/
│   │   ├── Sidebar.astro       # Profile card with photo, affiliation and social links
│   │   ├── TabsHeader.astro    # Section title, tab navigation and theme toggle
│   │   ├── PaperCard.astro     # Publication entry with BibTeX toggle/copy
│   │   ├── TeachingCard.astro  # Course appointment card (role, term, materials link)
│   │   ├── ThemeToggle.astro   # Light/dark switch shared by all pages
│   │   └── ProjectCard.astro   # Tool card with banner, tags and actions
│   ├── content/
│   │   ├── papers/             # One Markdown file per publication
│   │   ├── projects/           # One Markdown file per tool/project
│   │   └── teaching/           # One Markdown file per course appointment
│   ├── content.config.ts       # Collection loaders and Zod schemas
│   ├── layouts/
│   │   ├── BaseLayout.astro    # HTML shell: metadata, SEO tags, fonts, theme bootstrap
│   │   └── Layout.astro        # Home-page chrome (sidebar + tabs) on top of BaseLayout
│   ├── pages/
│   │   ├── index.astro         # The main page: About, Papers, Teaching, Tools, Contact
│   │   └── teaching/[course]/  # Generated course-materials index pages
│   ├── scripts/
│   │   └── interactions.ts     # Client-side behaviour (tabs, theme, filters, BibTeX)
│   └── styles/
│       └── global.css          # Design tokens, layout and component styles
├── .nvmrc                      # Node version used locally and in CI
├── astro.config.mjs            # Site URL, base path, sitemap integration and build format
├── package.json
└── package-lock.json
```

---

## Deployment

Deployment is fully automated by [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml):

1. Every push to `main` (or a manual *Run workflow* trigger) checks out the repository on `ubuntu-latest` with the Node version from `.nvmrc`.
2. Dependencies are installed with `npm ci` (cached between runs) and `astro build` is executed. The `--site` and `--base` flags are injected from `actions/configure-pages`, so the build adapts automatically if the repository is ever served from a sub-path.
3. The `dist/` directory is uploaded as a Pages artifact and published with `actions/deploy-pages`.

The workflow status and the URL of the last deployment are visible in the repository's **Actions** tab.

**One-time repository setup:** in *Settings → Pages → Build and deployment*, set **Source** to **GitHub Actions**.

---

## License

The source code of this website may be used as a reference or starting point for your own academic site. All written content, publication data and images are © Luis Lopez and are not covered by that permission. Please replace personal content before reusing the template.
