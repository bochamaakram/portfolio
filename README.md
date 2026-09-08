# Akram Bouchama — Portfolio

The personal site of [Akram Bouchama](https://akrambouchama.com), a Full Stack
Web Developer based in Marrakech, Morocco. Single-page experience with a
canvas field, theme picker, and an interactive wordmark.

## Stack

- [Vite](https://vite.dev) + React 19 + TypeScript
- [React Router](https://reactrouter.com) for routing
- [Tailwind CSS v4](https://tailwindcss.com)
- [Base UI](https://base-ui.com) for the popover interfaces

## Getting started

Node 22.12+ is required.

```sh
npm ci
npm run dev       # local dev server (default port 3113)
npm run build     # type-check + production build into dist/
npm run preview   # serve the built site locally
```

## Checks

```sh
npm run lint        # eslint
npm run typecheck   # tsc --noEmit
npm run check       # prettier --check
```

`npm run build` runs the type check before bundling, so a clean build also
passes typecheck.

## Project layout

- `public/brand/` — brand assets and the theme social cards under `social/`.
- `src/data/` — the wordmark and "not found" bitmaps that the field renders.
- `src/lib/` — theme system, i18n, SEO, and browser-effect helpers.
- `src/components/` — layout, hero field, theme picker, project picker.
- `src/pages/` — route components.

## Deployment

The site is built with Vite to `dist/` and can be hosted anywhere that
serves static files. The custom domain `akrambouchama.com` is set in `CNAME`
and referenced by canonical URLs, Open Graph tags, and the sitemap. A
`robots.txt` and a single-page `sitemap.xml` are emitted in `public/`.

Netlify: set the build command to `npm run build` and the publish directory
to `dist`. GitHub Pages: use the `pages` workflow in `.github/workflows/`.