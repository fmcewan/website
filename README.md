# fmcewan.dev

Personal portfolio site.

## Stack

- [Astro](https://astro.build) — framework
- [React](https://react.dev) — interactive components
- TypeScript
- CSS Modules

## Structure

```
frontend/
  src/
    components/   # Nav, Footer
    content/
      blog/       # Markdown posts
    layouts/      # Base HTML layout
    pages/        # index, notes, tools, reads
    styles/       # Per-page CSS
  public/         # Static assets
backend/          # TBD
```

## Running locally

```bash
cd frontend
npm install
npm run dev
```

## Building

```bash
npm run build
npm run preview
```

## Content

Blog posts live in `src/content/blog/` as Markdown files with the following frontmatter:

```md
---
title: Post title
date: 2026-05-28
description: Optional description
draft: false
---
```

## Deployment

Deployed via GitHub Pages.
