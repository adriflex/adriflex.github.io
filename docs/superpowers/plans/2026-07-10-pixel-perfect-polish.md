# Pixel-Perfect Portfolio Polish Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Corriger les défauts typographiques visibles et effectuer une révision globale du portfolio sans altérer son échelle ni son identité pixel art.

**Architecture:** La passe reste CSS-first et s’appuie sur les composants Astro existants. Les règles typographiques partagées vivent dans `global.css`, les styles du sommaire restent dans les deux gabarits d’article et les interactions propres aux cartes restent locales. Les variantes graphiques sont regroupées dans le compagnon visuel avant validation finale.

**Tech Stack:** Astro 5.17, Tailwind CSS 4.2, CSS natif, TypeScript côté client, compagnon visuel Superpowers, Git.

## Global Constraints

- Préserver les tailles de police, la densité des pages et les proportions actuelles.
- Conserver les angles courts, les contours francs, les ombres décalées et les animations qui participent déjà au style.
- Traiter les règles de `make-interfaces-feel-better` comme des hypothèses à vérifier, pas comme un système à imposer.
- Éviter tout rendu de produit SaaS lisse, arrondi ou générique.
- Respecter `prefers-reduced-motion` et ne pas ajouter de dépendance d’animation.
- Isoler les essais sur une branche dédiée afin que l’état actuel reste récupérable à tout moment.
- Aucun changement de contenu éditorial.
- Aucune variation graphique n’est conservée sans validation d’Adrien.

---

## File Map

- `src/styles/global.css` : primitives de rendu pixel, wrapping, focus, réduction des mouvements et contour neutre optionnel des médias.
- `src/pages/index.astro` : tags de filtre, compteur, bouton mobile et transitions de filtrage.
- `src/pages/projects/[slug].astro` : rendu du sommaire projet, titres, médias et CTA.
- `src/pages/lab/[slug].astro` : rendu du sommaire laboratoire et parité avec le gabarit projet.
- `src/pages/about.astro` : collaborations, galerie, formulaire et cartes sociales.
- `src/components/ProjectCard.astro` : cadre, survol, état pressé, flèche et tags des cartes.
- `src/layouts/Base.astro` : navigation, liens de pied de page et soulignements.
- `src/components/Lightbox.astro` : cadre média, bouton de fermeture et réduction des mouvements.
- `.superpowers/brainstorm/<session>/content/pixel-polish-review.html` : planche temporaire non versionnée qui rassemble les comparaisons.

### Task 1: Isolate the experiment and capture the baseline

**Files:**
- Reference: `docs/superpowers/specs/2026-07-10-pixel-perfect-polish-design.md`
- Reference: `src/pages/index.astro`
- Reference: `src/pages/projects/[slug].astro`
- Reference: `src/pages/about.astro`

**Interfaces:**
- Consumes: current `main` commit as the immutable visual baseline.
- Produces: branch `codex/pixel-perfect-polish` plus baseline captures for `/`, `/projects/texture-diffusion`, `/lab/2026-06-15-bordeciel` and `/about` at 1440×1000 and 390×844.

- [ ] **Step 1: Create the isolated branch**

Use `superpowers:using-git-worktrees` at execution time. Create or switch the task to `codex/pixel-perfect-polish` without moving or deleting the current workspace.

- [ ] **Step 2: Verify the clean baseline**

Run:

```powershell
git status --short
npm run build
```

Expected: only `.superpowers/brainstorm/` is untracked; Astro exits with code `0`.

- [ ] **Step 3: Start the site and capture representative pages**

Run `npm run dev -- --host 127.0.0.1`, then capture the four routes at 1440×1000 and the home/About routes at 390×844. Keep browser zoom at exactly 100%; record device-pixel ratio with `window.devicePixelRatio` in the capture notes.

- [ ] **Step 4: Record computed typography for the three priority zones**

For one `.tag-btn`, one `.toc-link-h2`, one `.toc-link-h3` and one collaboration name, record `fontFamily`, `fontSize`, `lineHeight`, `letterSpacing`, `transform`, `webkitFontSmoothing` and the element’s `getBoundingClientRect()` coordinates. Flag any non-integer x/y/width/height that can place a glyph on a fractional device pixel.

- [ ] **Step 5: Keep the baseline outside Git**

Do not add `.superpowers/` or capture artifacts to the commit. Confirm with:

```powershell
git status --short
```

Expected: no tracked source change.

### Task 2: Correct the three priority typography zones

**Files:**
- Modify: `src/styles/global.css:17-26`
- Modify: `src/pages/index.astro:84-108`
- Modify: `src/pages/projects/[slug].astro:224-255`
- Modify: `src/pages/lab/[slug].astro:165-190`
- Modify: `src/pages/about.astro:123-166`

**Interfaces:**
- Consumes: computed-style and pixel-coordinate notes from Task 1.
- Produces: `.pixel-font`, `.pixel-label` and `.body-crisp` rendering contracts used by the three target zones.

- [ ] **Step 1: Add explicit rendering contracts**

Replace the broad pixel selector in `global.css` with named contracts while preserving compatibility with existing classes:

```css
.px-font,
.font-display,
.pixel-font,
.prose h1, .prose h2, .prose h3, .prose h4, .prose h5, .prose h6 {
  -webkit-font-smoothing: none;
  -moz-osx-font-smoothing: unset;
  font-smooth: never;
  text-rendering: optimizeSpeed;
}

.pixel-label {
  font-family: var(--font-display);
  font-size: 8px;
  line-height: 16px;
  letter-spacing: 0;
  font-weight: 400;
}

.body-crisp {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-rendering: optimizeLegibility;
}
```

Do not put `.body-crisp` on `html` or `body`.

- [ ] **Step 2: Align tag typography to the font grid**

Keep desktop tag labels at `16px`, mobile labels at `8px` or `16px` after visual comparison, and replace `transition-all` with explicit `transition-[color,border-color,background-color,box-shadow,transform]`. Remove any fractional vertical transform from text children. Add `font-variant-numeric: tabular-nums` to `.tag-count` because its value changes with filter state.

- [ ] **Step 3: Make both TOCs use the same pixel contract**

In both slug templates, add the pixel-rendering declarations to `.toc-link-h2`. Keep `.toc-link-h3` in Space Mono only if the 100% capture is cleaner; otherwise use `var(--font-display)` at an integer multiple of 8px. Do not leave project and lab with different computed typography. Preserve `transition: color 160ms ease, transform 160ms ease`.

- [ ] **Step 4: Stabilize About collaboration labels**

Add a shared `collaboration-name pixel-font` class to the 12 collaboration names. Keep `font-size: 16px` and force an integer `line-height: 24px`; do not change grid spacing or text content. Apply `pixel-label` to the three headings only if it preserves their current 8px size and 3px tracking.

- [ ] **Step 5: Build and inspect at 100%**

Run:

```powershell
npm run build
rg -n "toc-link-h2|toc-link-h3|collaboration-name|tag-count|transition-all" src/pages/index.astro src/pages/projects/[slug].astro src/pages/lab/[slug].astro src/pages/about.astro
```

Expected: build passes; the three priority zones expose explicit classes; no `transition-all` remains on `.tag-btn`.

- [ ] **Step 6: Commit the typography correction**

```powershell
git add src/styles/global.css src/pages/index.astro 'src/pages/projects/[slug].astro' 'src/pages/lab/[slug].astro' src/pages/about.astro
git commit -m "fix: sharpen pixel typography"
```

### Task 3: Apply safe global polish and interaction fixes

**Files:**
- Modify: `src/styles/global.css`
- Modify: `src/layouts/Base.astro:76-128`
- Modify: `src/components/ProjectCard.astro:33-116`
- Modify: `src/pages/index.astro:84-250`
- Modify: `src/pages/projects/[slug].astro:36-142`
- Modify: `src/pages/lab/[slug].astro:37-84`
- Modify: `src/pages/about.astro:77-288`
- Modify: `src/components/Lightbox.astro:12-86`

**Interfaces:**
- Consumes: typography contracts from Task 2.
- Produces: explicit transitions, minimum 40×40px hit areas, balanced headings, pretty short copy, tactile press states and reduced-motion behavior.

- [ ] **Step 1: Add wrapping and motion primitives**

Add to `global.css`:

```css
h1, h2, h3 {
  text-wrap: balance;
}

.text-pretty,
.prose p,
.prose li,
.prose figcaption {
  text-wrap: pretty;
}

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    scroll-behavior: auto !important;
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

Do not apply `text-wrap: pretty` to code blocks or long preformatted content.

- [ ] **Step 2: Replace every relevant `transition-all`**

Use the exact property set each element changes:

- underline spans: `transition-[width]`;
- cards moving and gaining shadows: `transition-[transform,box-shadow,border-color]`;
- overlays changing color: `transition-[background-color]`;
- inputs: `transition-[border-color,box-shadow]`;
- CTA/button: `transition-[transform,background-color,box-shadow]`;
- arrow: `transition-[opacity,transform]`.

Run:

```powershell
rg -n "transition-all" src
```

Expected: no result unless a remaining occurrence is documented in the commit message with a concrete reason.

- [ ] **Step 3: Enforce usable hit areas and press feedback**

Give small buttons and controls at least `min-w-10 min-h-10` without enlarging visible borders unnecessarily. Add `active:scale-[0.96]` only to standalone buttons and CTA links; keep ProjectCard’s existing `scale(0.99)` because the whole card is large and the stronger scale would be distracting. Verify adjacent tag hit areas do not overlap.

- [ ] **Step 4: Preserve focus visibility**

For inputs currently using `outline-none`, add `focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink` while retaining the pink border. Add the same focus-visible treatment to tag buttons, CTA links and the lightbox close button.

- [ ] **Step 5: Keep animations interruptible**

Retain keyframes only for initial page entrances and the decorative cursor blink. Keep hover, filter, lightbox open/close and button press as CSS transitions. Do not add `will-change` unless a real first-frame stutter is reproduced.

- [ ] **Step 6: Verify behavior and build**

Run:

```powershell
npm run build
rg -n "transition-all|will-change:\s*all" src
rg -n "prefers-reduced-motion|active:scale-\[0\.96\]|focus-visible" src
```

Expected: build passes; first audit has no hits; reduced motion, press and focus rules are present.

- [ ] **Step 7: Commit safe global polish**

```powershell
git add src/styles/global.css src/layouts/Base.astro src/components/ProjectCard.astro src/components/Lightbox.astro src/pages/index.astro 'src/pages/projects/[slug].astro' 'src/pages/lab/[slug].astro' src/pages/about.astro
git commit -m "refactor: tighten portfolio interactions"
```

### Task 4: Prepare grouped graphic variants

**Files:**
- Modify experimentally: `src/components/ProjectCard.astro`
- Modify experimentally: `src/components/Lightbox.astro`
- Modify experimentally: `src/pages/about.astro`
- Modify experimentally: `src/pages/projects/[slug].astro`
- Create untracked: `.superpowers/brainstorm/<session>/content/pixel-polish-review.html`

**Interfaces:**
- Consumes: baseline captures from Task 1 and corrected build from Task 3.
- Produces: one grouped comparison with independent choices for image outlines, card frame depth, CTA alignment and media/lightbox framing.

- [ ] **Step 1: Create four optional visual experiments**

Prepare these variants without rounding beyond the existing `2px`:

1. images with inset `outline: 1px solid rgba(0, 0, 0, 0.1); outline-offset: -1px`;
2. project cards with the existing 2px navy frame plus a restrained pixel-offset shadow, not a diffuse SaaS shadow;
3. CTA icon-side padding reduced by exactly `2px` for optical alignment;
4. lightbox media using the existing navy border and offset shadow, with only the neutral inset outline added if it improves edge separation.

- [ ] **Step 2: Capture all options in one review board**

Build a single companion screen with three columns: current, corrected technical version and optional graphic variant. Show home tags/cards, one article TOC/media/CTA and About collaborations/gallery/form. Include 100% crops for text; an enlarged crop may be added beside it but never replace the 100% sample.

- [ ] **Step 3: Collect one grouped decision**

Ask Adrien to select any number of the four experiment families. Treat no click as rejection. Do not commit experimental CSS before this grouped validation.

- [ ] **Step 4: Apply only selected variants**

Remove rejected declarations entirely. Keep selected rules in their owning component, except a site-wide media outline approved for all article images, which belongs in `global.css`.

- [ ] **Step 5: Build and commit selected graphics**

Run:

```powershell
npm run build
git diff --check
```

Expected: both commands pass.

Then stage only approved source files and commit:

```powershell
git commit -m "style: refine pixel-art surfaces"
```

### Task 5: Final regression review and report

**Files:**
- Review: all files changed by Tasks 2–4.
- Do not track: `.superpowers/brainstorm/`.

**Interfaces:**
- Consumes: approved implementation.
- Produces: verified branch and complete Before/After handoff grouped by the `make-interfaces-feel-better` principles.

- [ ] **Step 1: Run final automated checks**

```powershell
npm run build
npm run images:audit
git diff --check main...HEAD
rg -n "transition-all|will-change:\s*all" src
```

Expected: build and image audit exit `0`; diff check is empty; forbidden transition patterns have no results.

- [ ] **Step 2: Review desktop and mobile pages**

At 100% zoom, inspect `/`, `/projects`, `/lab`, one project detail, one lab detail and `/about`. At minimum test 1440×1000 and 390×844. Confirm no clipping, no unexpected wrap, no overlapping hit areas and no changed global scale.

- [ ] **Step 3: Review interaction and accessibility states**

Keyboard through header, tags, cards, CTA, form and lightbox. Confirm focus is visible, Escape closes the lightbox and focus returns to the trigger. Emulate `prefers-reduced-motion: reduce` and confirm page entrances and interactive motion collapse without hiding content.

- [ ] **Step 4: Compare the three priority text zones**

Use side-by-side 100% crops for tags, both TOCs and About collaborations. Confirm the Silkscreen glyph edges align to the pixel grid and that Space Mono remains readable where retained.

- [ ] **Step 5: Produce the required change report**

Report every modification as Markdown tables with `Before` and `After` columns, grouped under Typography, Surfaces, Animations, Performance and Accessibility. Cite the exact source file in each row. Omit empty groups.

- [ ] **Step 6: Commit any final cleanup**

If review found fixes, stage only those source files and run:

```powershell
git commit -m "fix: finish pixel-perfect review"
```

If no tracked cleanup was needed, do not create an empty commit.
