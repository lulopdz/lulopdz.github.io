# Personal Academic Website — Luis Lopez Diaz

Fast personal academic portfolio for **Luis Lopez Diaz** (PhD Student in Power Systems, Apex Lab, Carleton University), powered by **Astro** and hosted on GitHub Pages: [https://lulopdz.github.io/](https://lulopdz.github.io/).

---

## ⚡ Quick Start (Local Development)

To view and edit your site locally with instant live preview:

```bash
# Install dependencies (only needed once)
npm install

# Start local development server with Hot Module Reload
npm run dev
```

Open [http://localhost:4321](http://localhost:4321) in your browser. Whenever you edit or create a Markdown file, the browser updates automatically in real-time.

To test the production build locally:

```bash
npm run build
npm run preview
```

---

## 📝 How to Add & Edit Content

All your content is cleanly separated into Markdown files with structured YAML frontmatter:

### 1. Adding a New Paper / Publication
Create a new `.md` file inside `src/content/papers/` (e.g. `src/content/papers/my-new-paper.md`):

```markdown
---
title: "Title of the Publication"
authors: "L. Lopez, Coauthor Name, and Another Coauthor"
venue: "IEEE Transactions on Power Systems, 2024"
year: 2024
link: "https://doi.org/..."
linkLabel: "IEEE Xplore"
order: 1
bibtex: |
  @article{lopez2024title,
    title={Title of the Publication},
    author={Lopez, L. and Coauthor, N.},
    journal={IEEE Transactions on Power Systems},
    year={2024}
  }
---
```
*Note: Your name (`L. Lopez` or `Luis Lopez`) will automatically be bolded/highlighted in the author list.*

### 2. Adding a New Project / Tool
Create a new `.md` file inside `src/content/projects/` (e.g. `src/content/projects/my-new-tool.md`):

```markdown
---
title: "Project Name"
description: "Clear and concise summary of what this tool does."
featured: true          # true places it at the top with a 'Live App' badge
liveDemo: "https://..." # optional
code: "https://..."     # optional
tags:
  - "Julia"
  - "Power Systems"
  - "Flexibility"
order: 1
---
```

### 3. Editing Bio, Research Interests, or LaTeX Math
The About tab is located in `src/pages/index.astro`. You can edit your bio text, update the affiliation badges, or change the KaTeX mathematical formulas directly.

---

## 📂 Project Structure

```
.
├── .github/workflows/
│   └── deploy.yml            # Automated GitHub Actions deployment
├── public/
│   └── assets/images/
│       └── profile.jpg       # Profile picture (center-framed squircle avatar)
├── src/
│   ├── content/
│   │   ├── config.ts         # Zod schemas for content collections
│   │   ├── papers/           # Individual Markdown files for publications
│   │   └── projects/         # Individual Markdown files for tools & projects
│   ├── components/
│   │   ├── Sidebar.astro     # Fixed two-column sidebar with photo & icons
│   │   ├── TabsHeader.astro  # Header with section title, tab buttons & theme toggle
│   │   ├── PaperCard.astro   # Paper card with interactive BibTeX copy
│   │   └── ProjectCard.astro # Project card with live demo & GitHub tags
│   ├── layouts/
│   │   └── Layout.astro      # Base HTML layout, KaTeX math defer, dark/light theme
│   ├── pages/
│   │   └── index.astro       # Main single-page interactive tabbed interface
│   └── styles/
│       └── global.css        # Modern typography, color palettes, and responsive grid
├── astro.config.mjs          # Astro configuration (base '/', site URL)
└── package.json              # Project scripts and dependencies
```

---

## 🚀 Deployment to GitHub Pages

The repository includes a continuous deployment workflow via **GitHub Actions** (`.github/workflows/deploy.yml`).

Whenever you push to the `main` branch:

```bash
git add .
git commit -m "Add new paper"
git push origin main
```

GitHub Actions automatically builds the static site and deploys it to `https://lulopdz.github.io/`.

> **First-time setup in GitHub**:
> Go to your repository on GitHub -> **Settings** -> **Pages** -> under **Build and deployment > Source**, select **GitHub Actions**.
