# Arcade sur Papier — Visual Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Migrate the portfolio from Syne/Lora/orange to the "Arcade sur Papier" identity — Silkscreen/Space Mono, Happy Hues #17 palette, pixel-perfect rendering, tag cloud filtering, sectioned grid, pink footer.

**Architecture:** Replace theme variables and Google Fonts in global.css + Base.astro. Rewrite the homepage to replace hero with tag cloud + sectioned grid. Update all components and pages for new palette/typo/corners. Add client-side JS for tag filtering. Keep content collections and Lightbox unchanged.

**Tech Stack:** Astro 5, Tailwind CSS v4, Google Fonts (Silkscreen + Space Mono), vanilla JS for filtering.

**Reference:** Brand mockup at `E:\Documents\Obsidian_Second_Brain\SecondBrain\Communication\brand-mockup-v5-polished.html` and charter at `E:\Documents\Obsidian_Second_Brain\SecondBrain\Communication\Charte visuelle.md`

---

## File Map

| File | Action | Responsibility |
|---|---|---|
| `src/styles/global.css` | **Modify** | Theme vars, pixel-perfect CSS, grain, scanlines, cursor, scrollbar, selection |
| `src/layouts/Base.astro` | **Modify** | Google Fonts, header (logo+nav), footer (pink), body classes |
| `src/pages/index.astro` | **Rewrite** | Remove hero → tag cloud + sectioned grid + client-side filtering |
| `src/components/ProjectCard.astro` | **Rewrite** | Square corners, navy border, badge colors, hover overlay, arrow |
| `src/pages/projects/index.astro` | **Modify** | Redirect to homepage or remove (projects now on index) |
| `src/pages/lab/index.astro` | **Modify** | Redirect to homepage or remove (lab now on index) |
| `src/pages/projects/[slug].astro` | **Modify** | New palette/typo, square corners, pixel separators |
| `src/pages/lab/[slug].astro` | **Modify** | New palette/typo, square corners, pixel separators, back link → / |
| `src/pages/about.astro` | **Modify** | New palette/typo, square corners |
| `src/components/Lightbox.astro` | **Modify** | Update colors (navy backdrop, pink close hover) |
| `src/content.config.ts` | **Keep** | No changes needed — schema already has status, tags, color |

---

### Task 1: Theme Foundation — global.css

**Files:**
- Modify: `src/styles/global.css`

- [ ] **Step 1: Replace theme variables**

Replace the entire `@theme` block and all body styles with the new Arcade sur Papier theme:

```css
@import "tailwindcss";
@plugin "@tailwindcss/typography";

@theme {
  --color-bg: #FEF6E4;
  --color-bg-dark: #F3D2C1;
  --color-navy: #001858;
  --color-para: #172C66;
  --color-accent: #8BD3DD;
  --color-pink: #F582AE;
  --color-peach: #F3D2C1;
  --color-white: #FFFFFE;

  --font-display: "Silkscreen", sans-serif;
  --font-body: "Space Mono", monospace;
}

/* Pixel-perfect rendering for Silkscreen */
.px-font {
  -webkit-font-smoothing: none;
  -moz-osx-font-smoothing: unset;
  font-smooth: never;
  text-rendering: optimizeSpeed;
}

/* Grain texture overlay */
body::before {
  content: "";
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 500;
  opacity: 0.025;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
  background-repeat: repeat;
  background-size: 256px;
  mix-blend-mode: overlay;
}

/* Scanlines CRT */
body::after {
  content: "";
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 501;
  opacity: 0.4;
  background: repeating-linear-gradient(
    0deg,
    transparent,
    transparent 2px,
    rgba(0, 0, 0, 0.006) 2px,
    rgba(0, 0, 0, 0.006) 4px
  );
}

/* Custom pixel cursor */
body {
  cursor: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16'%3E%3Crect x='7' y='0' width='2' height='16' fill='%23001858' opacity='0.4'/%3E%3Crect x='0' y='7' width='16' height='2' fill='%23001858' opacity='0.4'/%3E%3Crect x='7' y='7' width='2' height='2' fill='%23F582AE'/%3E%3C/svg%3E") 8 8, crosshair;
}

/* Smooth transitions */
* {
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}

/* Scrollbar */
::-webkit-scrollbar { width: 8px; }
::-webkit-scrollbar-track { background: var(--color-bg); }
::-webkit-scrollbar-thumb { background: color-mix(in srgb, var(--color-navy) 15%, transparent); border-radius: 4px; }
::-webkit-scrollbar-thumb:hover { background: color-mix(in srgb, var(--color-navy) 25%, transparent); }

/* Selection */
::selection { background: var(--color-accent); color: var(--color-navy); }

/* Cursor zoom on markdown images */
.prose img { cursor: zoom-in; }

/* Pixel separator utility */
.px-sep {
  height: 4px;
  image-rendering: pixelated;
  background: repeating-linear-gradient(90deg, var(--color-pink) 0px, var(--color-pink) 4px, transparent 4px, transparent 8px);
}

/* Blinking cursor animation */
@keyframes blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
}

/* Staggered entrance animation */
@keyframes fadeSlideUp {
  from { opacity: 0; transform: translateY(16px); }
  to { opacity: 1; transform: translateY(0); }
}
```

- [ ] **Step 2: Verify build compiles**

Run: `cd /e/Documents/portfolio-adrien && npm run build`
Expected: Build succeeds (pages will look broken until other tasks complete)

- [ ] **Step 3: Commit**

```bash
git add src/styles/global.css
git commit -m "style: replace theme with Arcade sur Papier — Happy Hues #17, Silkscreen + Space Mono, pixel-perfect CSS"
```

---

### Task 2: Layout Shell — Base.astro

**Files:**
- Modify: `src/layouts/Base.astro`

- [ ] **Step 1: Update Google Fonts + header + footer**

Replace `Base.astro` entirely. Key changes:
- Google Fonts: Silkscreen (400,700) + Space Mono (400,700,italic) — remove Syne + Lora
- Header: Logo "Adriflex" in Silkscreen 32px + nav (Projects, About) — remove Lab link
- Footer: Pink background, navy text, more social links, tagline
- Body class: `bg-bg text-navy font-body`
- Nav: animated underline with `::after` (pink, not accent)
- Logo: blinking cursor `_` after text
- Header: add scroll shadow via inline `<script>`

Reference: lines 1-78 of current Base.astro → complete rewrite.

The full code for Base.astro is in the mockup v5 — adapt from HTML to Astro component.

- [ ] **Step 2: Verify build**

Run: `cd /e/Documents/portfolio-adrien && npm run dev`
Check: Homepage loads with new header + footer

- [ ] **Step 3: Commit**

```bash
git add src/layouts/Base.astro
git commit -m "layout: new header (Adriflex logo, 2-link nav) + pink footer with social links"
```

---

### Task 3: ProjectCard Component

**Files:**
- Modify: `src/components/ProjectCard.astro`

- [ ] **Step 1: Rewrite ProjectCard**

New design:
- Square corners (rounded-sm / 2px)
- Border: 2px solid navy
- Hover: translateY(-6px) + box-shadow pixel (6px 6px 0) + image scale(1.04) + title → pink + arrow slide-in + overlay "View"
- Badge: colored by status (cyan for wip, pink for published, peach for lab)
- Tags: Silkscreen 8px, square corners, navy border
- Add `status` and `statusLabel` to props

Card needs new props: add `status?: string` and `statusLabel?: string`.

- [ ] **Step 2: Verify card renders**

Check: `/projects` page shows cards with new design

- [ ] **Step 3: Commit**

```bash
git add src/components/ProjectCard.astro
git commit -m "component: redesign ProjectCard — square corners, navy border, pixel hover, status badges"
```

---

### Task 4: Homepage — Tag Cloud + Sectioned Grid

**Files:**
- Modify: `src/pages/index.astro`

- [ ] **Step 1: Rewrite homepage**

Replace hero section with:
1. Tag cloud (collect all unique tags from projects + lab, render as clickable buttons)
2. Pixel separator
3. Filter info line
4. Section "En cours" — projects with status='wip'
5. Section "Publiés" — projects with status='published'
6. Section "Lab & expériences" — lab entries

Each section uses a grid of ProjectCard components. Lab entries are rendered as cards too (they need cover images or fallback).

Add `<script>` block for client-side tag filtering:
- Click tag → toggle active class
- Active tag → dim non-matching cards (opacity 0.12, scale 0.96, grayscale)
- Update filter info line with count
- Hide empty sections
- Card tags are also clickable (trigger same filter)
- Clear button to reset

The section labels use Silkscreen 8px uppercase with trailing line.

- [ ] **Step 2: Verify homepage works**

Run: `npm run dev`, check:
- Tag cloud renders with all tags
- Clicking a tag filters cards
- Sections show correct projects
- Cards link to correct detail pages

- [ ] **Step 3: Commit**

```bash
git add src/pages/index.astro
git commit -m "page: redesign homepage — tag cloud filtering, sectioned grid (wip/published/lab), no hero"
```

---

### Task 5: Project Detail Page

**Files:**
- Modify: `src/pages/projects/[slug].astro`

- [ ] **Step 1: Update styling**

Changes:
- Back link: "← Retour" in Silkscreen, pink, hover slides left
- Cover image: rounded-sm (2px), border 2px navy
- Tags: Silkscreen 8px, square, navy border
- WIP badge: cyan bg + navy text (instead of accent)
- Title: Silkscreen 32px (font-display)
- Body: font-body (Space Mono)
- CTA button: Silkscreen 16px, cyan bg, navy text, rounded-sm
- Separator: pixel separator (pink) instead of plain line
- Prose: update color classes (navy/para instead of ink, pink for links)
- PDF viewer: rounded-sm, border 2px navy
- Max-width: keep max-w-2xl
- Back link goes to `/` (homepage) instead of `/projects`

- [ ] **Step 2: Verify detail page**

Check: `/projects/orb-of-avarice` renders with new styling

- [ ] **Step 3: Commit**

```bash
git add src/pages/projects/[slug].astro
git commit -m "page: restyle project detail — pixel separators, navy/pink palette, square corners"
```

---

### Task 6: Lab Detail Page

**Files:**
- Modify: `src/pages/lab/[slug].astro`

- [ ] **Step 1: Update styling**

Same changes as project detail:
- Back link → `/` (homepage)
- Silkscreen headings, Space Mono body
- Navy/pink color scheme
- Square corners, pixel separator
- Prose colors updated

- [ ] **Step 2: Commit**

```bash
git add src/pages/lab/[slug].astro
git commit -m "page: restyle lab detail — consistent with project detail styling"
```

---

### Task 7: About Page

**Files:**
- Modify: `src/pages/about.astro`

- [ ] **Step 1: Update styling**

Changes:
- Title: Silkscreen 32px
- Tag line: remove orange accent line → use Silkscreen label
- Body: Space Mono
- Social cards: square corners, navy border instead of rounded-xl
- Gradient overlay: use navy instead of ink
- Colors: navy/para/pink instead of ink/accent
- Image: rounded-sm, border 2px navy
- Separator: pixel separator
- Update bio text to match positioning ("Je crée des mondes..." not "stylisé, humoristique, coloré")

- [ ] **Step 2: Commit**

```bash
git add src/pages/about.astro
git commit -m "page: restyle about — new palette, square corners, updated bio text"
```

---

### Task 8: Lightbox Update

**Files:**
- Modify: `src/components/Lightbox.astro`

- [ ] **Step 1: Update colors**

Changes:
- Backdrop: `rgba(0, 24, 88, 0.92)` (navy instead of ink)
- Close button border: `rgba(254, 246, 228, 0.2)` (parchment)
- Close button color: `rgba(254, 246, 228, 0.7)` (parchment)
- Close hover: pink (#F582AE) instead of orange
- Image border-radius: 2px instead of 0.5rem

- [ ] **Step 2: Commit**

```bash
git add src/components/Lightbox.astro
git commit -m "component: update Lightbox colors — navy backdrop, pink close button"
```

---

### Task 9: Redirect Projects/Lab Index Pages

**Files:**
- Modify: `src/pages/projects/index.astro`
- Modify: `src/pages/lab/index.astro`

- [ ] **Step 1: Redirect to homepage**

Since all content is now on the homepage, these pages should redirect:

`src/pages/projects/index.astro`:
```astro
---
return Astro.redirect('/', 301);
---
```

`src/pages/lab/index.astro`:
```astro
---
return Astro.redirect('/', 301);
---
```

- [ ] **Step 2: Commit**

```bash
git add src/pages/projects/index.astro src/pages/lab/index.astro
git commit -m "pages: redirect /projects and /lab to homepage"
```

---

### Task 10: Final Verification + Build

- [ ] **Step 1: Full dev test**

Run: `npm run dev`
Check all pages:
- `/` — Tag cloud, sections, filtering, card clicks
- `/projects/orb-of-avarice` — Detail page styling
- `/lab/2026-02-27-kiln` — Lab detail styling
- `/about` — About page styling
- Lightbox works
- Responsive (mobile/tablet)
- Pixel-perfect fonts (no anti-aliasing)

- [ ] **Step 2: Production build**

Run: `npm run build`
Expected: Clean build, no errors

- [ ] **Step 3: Final commit**

```bash
git add -A
git commit -m "chore: final polish — Arcade sur Papier redesign complete"
```
