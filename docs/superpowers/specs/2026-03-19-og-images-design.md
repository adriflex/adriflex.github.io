# OG Images — Design Spec

**Date:** 2026-03-19
**Status:** Approved

## Objectif

Générer automatiquement une image de preview (og:image) pour chaque page projet et article Lab du portfolio Astro. Ces images s'affichent quand un lien est partagé sur LinkedIn, Discord, Slack, X, etc.

## Approche technique

**Satori au build-time** — Astro génère les images PNG pendant le build via l'endpoint API d'Astro + satori (HTML/CSS → SVG) + @resvg/resvg-js (SVG → PNG). Aucune dépendance externe au runtime.

### Dépendances à ajouter

- `satori` — conversion HTML/CSS → SVG
- `@resvg/resvg-js` — conversion SVG → PNG
- Polices : fichiers `.ttf` de Silkscreen (display) et Space Mono (body) dans `src/assets/fonts/`

### Endpoints Astro

Deux fichiers endpoint qui génèrent les images à la demande au build :

- `src/pages/og/projects/[slug].png.ts` — pour les projets
- `src/pages/og/lab/[slug].png.ts` — pour les articles Lab

Chaque endpoint :
1. Récupère l'entrée de la collection par slug
2. Construit le markup satori (JSX-like object) avec les données
3. Génère le SVG via satori (1200×630)
4. Convertit en PNG via resvg
5. Retourne le PNG en `Response`

### Intégration dans le layout

**`Base.astro`** — ajouter les props `ogImage` et `type` (project/lab) :

```html
<meta property="og:image" content={ogImage} />
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:image" content={ogImage} />
```

**`projects/[slug].astro`** et **`lab/[slug].astro`** — passer l'URL de l'og:image au layout :

```
ogImage={`${Astro.site}og/projects/${slug}.png`}
ogImage={`${Astro.site}og/lab/${slug}.png`}
```

## Design visuel

### Layout (1200×630px)

```
┌──────────────────────────────────────────────────────┐
│ ADRIFLEX                                 ┌──────────┐│
│                                          │          ││
│ [Published] ou [WIP] ou [Lab]            │  COVER   ││
│                                          │  IMAGE   ││
│ Titre du projet                          │   ou     ││
│ Description courte                       │ DÉGRADÉ  ││
│                                          │          ││
│ [tag1] [tag2] [tag3]                     │          ││
│                                          └──────────┘│
│▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔│
└──────────────────────────────────────────────────────┘
```

- **Fond** : `#FEF6E4` (bg/parchment)
- **Zone gauche (~55%)** : contenu texte
  - Label "ADRIFLEX" : Silkscreen, 14px, `#F582AE` (pink), uppercase, letter-spacing
  - Badge type : même style que le site
    - Published : fond `#F582AE`, texte `#001858`
    - WIP : fond `#8BD3DD`, texte `#001858`
    - Lab : fond `#F3D2C1`, texte `#001858`
  - Titre : Silkscreen bold, ~40px, `#001858` (navy)
  - Description : Space Mono, ~16px, `#172C66` à 60% opacité (projets seulement — les articles Lab n'ont pas de description dans le schema)
  - Tags : Space Mono, ~11px, bordure `#001858` à 15% opacité
- **Zone droite (~45%)** : visuel
  - Si cover existe : image cover du projet/article
  - Si pas de cover : dégradé `#8BD3DD` → `#F582AE` (cyan → pink)
- **Barre bas** : 4px, `#F582AE` (pink), pleine largeur

### Badges par type

| Collection | Status     | Label       | Couleur fond |
|-----------|------------|-------------|-------------|
| projects  | published  | Published   | #F582AE     |
| projects  | wip        | WIP         | #8BD3DD     |
| lab       | —          | Lab         | #F3D2C1     |

### Polices

- **Silkscreen** (titres, label, badge) — fichier TTF nécessaire pour satori
- **Space Mono** (description, tags) — fichier TTF nécessaire pour satori

Satori ne supporte pas Google Fonts directement — il faut embarquer les fichiers `.ttf` dans le projet (`src/assets/fonts/`).

## Données disponibles par collection

### Projects
- `title` ✅
- `description` ✅
- `tags` ✅
- `cover` ✅ (optionnel)
- `status` ✅ (published/wip/archived)
- `color` ✅ (fallback dégradé)

### Lab
- `title` ✅
- `tags` ✅
- `cover` ✅ (optionnel)
- `date` ✅
- Pas de description ni status — badge fixe "Lab"

## Pages concernées

- Toutes les pages `projects/[slug]` → og:image auto
- Toutes les pages `lab/[slug]` → og:image auto
- Page d'accueil et About → pas d'og:image dynamique (on peut ajouter une image statique plus tard)

## Fichiers à créer/modifier

### Créer
- `src/assets/fonts/Silkscreen-Regular.ttf`
- `src/assets/fonts/Silkscreen-Bold.ttf`
- `src/assets/fonts/SpaceMono-Regular.ttf`
- `src/pages/og/projects/[slug].png.ts`
- `src/pages/og/lab/[slug].png.ts`
- `src/lib/og-template.ts` — template satori partagé entre les deux endpoints

### Modifier
- `src/layouts/Base.astro` — ajouter meta og:image + twitter:card
- `src/pages/projects/[slug].astro` — passer ogImage au layout
- `src/pages/lab/[slug].astro` — passer ogImage au layout
- `package.json` — ajouter satori + @resvg/resvg-js

## Contraintes satori

- Satori utilise un subset de CSS (flexbox uniquement, pas de grid)
- Les images (cover) doivent être en URL absolue ou en base64
- Les polices doivent être des fichiers TTF/OTF chargés en ArrayBuffer
- Pas de `border-radius` sur les images dans certains cas
