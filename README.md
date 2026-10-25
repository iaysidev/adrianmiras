# Adrian Miras — Portfolio

A light, glossy portfolio built with Astro, TypeScript, GSAP, Lenis and a small WebGL shader. Includes a homepage with a draggable 3D card carousel, a filterable project index, five Markdown case studies, a 404 page, and metadata. The previous version of the site is kept in `_backup-pre-redesign/` (ignored by git).

## Local development

Requires Node 22.22 or newer. The project was created using Node 24 and Astro 7.4.1.

```powershell
cd 'C:\Users\U S E R - P C\Documents\adrian-miras-portfolio'
npm install
npm run dev
```

Open the Local URL printed by Astro, normally `http://127.0.0.1:4321`.

```powershell
npm run check
npm run build
npm run verify:links
npm run preview
```

Build output is written to `dist/`. The lockfile records the installed versions.

## Adding your assets

All asset settings are in **`src/data/site.ts`**. Until images are supplied, each project shows colourful CSS artwork from `src/components/CardArt.astro`; it is a placeholder and does not represent actual project deliverables (screen readers are told so).

Video is optional and degrades gracefully:

- **Showreel** — set `site.reel` to `{ mp4: '/video/reel.mp4', poster: '/video/reel-poster.webp' }`. It appears under the "person behind the pixels" statement and grows as you scroll.
- **Project previews** — add `preview: { mp4: '/video/projects/<slug>-preview.mp4', poster: '…' }` to a `projectMedia` entry. Previews play muted while a card is hovered (or while visible on touch screens) and in the case-study cover.
- Export previews as short 720p H.264 loops (≈3–4 MB), the reel at 1080p (≤15 MB), and images as ~1,600px-wide WebP.

1. Put your portrait in `public/images/portrait/`, for example `adrian.webp`.
2. Set `site.portrait` to `'/images/portrait/adrian.webp'` and check the alt text. A transparent cutout suits the orange hero shape; a regular portrait also works.
3. Put project covers and screenshots in `public/images/projects/`. Organize them into subfolders if useful.
4. Update each project's `cover`, `coverAlt`, and `gallery` in `projectMedia`.
5. Put your resume in `public/resume.pdf`, then set `site.resume` to `'/resume.pdf'`.
6. Set `site.github` and `site.linkedin` to your actual profile URLs.

Example:

```ts
'kasiguru-web': {
  cover: '/images/projects/kasiguru-web/cover.webp',
  coverAlt: 'Describe the actual screen shown in this image',
  gallery: [
    {
      src: '/images/projects/kasiguru-web/mobile.webp',
      alt: 'Describe the actual mobile layout',
      caption: 'Explain what this image demonstrates.',
    },
  ],
},
```

The hero and about section share the configured portrait. Project cards and their case-study pages share each project's cover. Resume and profile links appear automatically when their settings are populated.

These public-relative files retain their original filenames. Export appropriately sized WebP/AVIF images (roughly 1,200–1,600px wide for most project images) before adding them. The current slots use native image tags so assets can be added without changing component imports. Astro's `Image`/`Picture` pipeline can be used later if automatic image transforms are preferred.

## Updating content

- `src/content/projects/*.md`: summaries, categories, order, contributions, and case-study narratives.
- `src/content.config.ts`: validated content schema.
- `src/data/site.ts`: contact details, assets, and experience.
- `src/data/tools.ts`: toolkit categories, tool names, and logo metadata.
- `src/pages/index.astro`: homepage copy and sections.
- `src/styles/global.css`: colour tokens, typography, glass/pill components, layout, and responsive styles.
- `src/components/CardArt.astro`: the colourful placeholder artwork for each project and discipline.

Set a project's `draft: true` to remove it from both listings and generated routes. Set `featured: false` to retain it on the work index while removing it from the homepage. The homepage displays the first four featured projects by `order`.

The supplied project descriptions are included; individual contribution details, project technologies, dates, evidence, and results have not been invented. The current case studies clearly indicate that documentation and assets are still being added. Review the tool list and employment information against your current experience.

## Preparing to launch on Vercel

This is currently a local review version. To prepare the final public portfolio:

1. Replace placeholder imagery and finish case-study narratives and credits.
2. Add your resume and professional links.
3. Replace the SVG social preview with a 1,200 × 630 PNG/JPG and update its path in `BaseLayout.astro` for broad social platform support.
4. Connect the repository to Vercel using the Astro preset. Build command: `npm run build`; output directory: `dist`.
5. Set `SITE_URL` in the deployment environment to the actual production origin, for example your verified Vercel domain or personal domain. This enables correct canonical URLs and sitemap entries.
6. Set `site.readyToIndex` to `true` when the content is ready for search indexing. Until then, the pages include `noindex` and `robots.txt` disallows crawling.
7. Run checks and a production build, then inspect the deployed site and its contact/download links.

The site is static and uses a direct email link. No form service, backend, credentials, analytics, or database is required.

## Design

Dark and glowing, based on the Gcore site. The palette is strictly **orange, black, grey and white**: near-black pages (`#0A0A0A`), dark glass cards with hairline borders, grey supporting text, white headlines, and orange (`#FF5B1F`, with `#FF8A4C` and `#C2410C`) for buttons, tags, icon glows and light. Headlines use Plus Jakarta Sans at medium weight, with the closing words in grey; body copy uses Inter. The hero sits on an orange planet-horizon arc (white-hot crest, glowing band, light rays), the Experience section has a dotted orange planet, and the About statement is the one light (`#F5F5F4`) section. Tool logos are shown in greyscale so brand colours don't break the palette.

## Motion and interaction

Motion is on by default for every page (set `motion={false}` on the layout to opt out). It is progressive enhancement: without JavaScript, or with **reduced motion** set in the operating system, every section is still complete and readable.

- **Hero carousel** (`CardCarousel.astro`, `src/scripts/motion/carousel.ts`): project and discipline cards sit on a concave 3D arc. It drifts slowly, can be dragged with inertia (GSAP Draggable), steps with the arrow buttons, brings a focused card to the front, and turns as you scroll. Without motion it is a plain swipeable row.
- **Smooth scrolling** with Lenis, synced to GSAP ScrollTrigger.
- **Headlines** rise line by line; the about statement brightens word by word; cards and panels fade up as they enter.
- **Selected work**: project cards stick and stack; earlier cards shrink and dim as the next one slides over.
- **Expertise**: logo and artwork tiles float around the heading at different parallax speeds, over circuit lines with orange light pulses travelling along them (`Circuit.astro`).
- **Horizons**: a WebGL shader (`src/scripts/three/horizon.ts`, no library) draws the hero arc and the Experience planet; both rise as you scroll. It loads only when a section approaches, and a CSS glow stands in when WebGL, motion, or a capable device is not available.
- **Toolkit marquee** speeds up briefly while scrolling. **Cursor**: a dot-and-ring cursor with labels on fine pointers. **Page transitions** use Astro's view transitions.
- One page-wide **Pause motion** button stops everything that moves on its own (carousel drift, marquee, floating tiles, glow, video previews, smooth scrolling); scroll-linked effects stay under the visitor's control.

Scripts live in `src/scripts/motion/` (`index.ts` is the entry point; `state.ts` holds the pause and reduced-motion state) and `src/scripts/lifecycle.ts` re-runs page setup after each client-side navigation.

## Toolkit

The `#tools` strip shows all 22 tools from `src/data/tools.ts` as logo chips in a looping marquee, with the full list available to screen readers. Logos are stored in `public/images/logos/`; sources and pinned collection versions are documented in that folder's `SOURCES.md`. `node fetch-tool-logos.mjs` regenerates them and requires network access.

## Verification of the current local version

- Astro diagnostics: 0 errors, 0 warnings, 0 hints.
- Production build: successful, eight HTML pages, each with one `h1`.
- Build link check (`npm run verify:links`): 275 internal file and anchor references resolved.
- Browser check (Chrome, 1440×900 and 390×844 touch): homepage sections, carousel arrows, stacked cards, horizon shader, contact card, footer, work index and a case study rendered without console errors and without horizontal overflow.
- Not yet verified in a browser: dragging the carousel, the reduced-motion layout, and the mobile menu. Check those before launch.

To repeat the HTTP check while the dev server is running:

```powershell
node verify-build.mjs --url=http://127.0.0.1:4321
```
