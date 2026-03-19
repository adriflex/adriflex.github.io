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

Chaque endpoint **doit exporter `getStaticPaths`** (même pattern que les pages existantes `projects/[slug].astro` et `lab/[slug].astro`) pour qu'Astro génère toutes les images au build.

Chaque endpoint :
1. Exporte `getStaticPaths` → itère la collection, retourne les slugs
2. Récupère l'entrée de la collection par slug
3. Construit le markup satori (JSX-like object) avec les données
4. Génère le SVG via satori (1200×630)
5. Convertit en PNG via resvg
6. Retourne le PNG en `Response`

**Dérivation du slug** : `entry.id.replace(/\.md$/, '')` — même convention que les pages existantes.

### Cover images dans satori

Les covers sont des chemins publics relatifs (ex: `/images/texture-diffusion-cover.png`). Satori nécessite des URLs absolues ou du base64. À build-time, le site distant n'est pas forcément accessible.

**Approche recommandée** : lire le fichier depuis `public/` sur le disque et le convertir en base64 data URI. Exemple : `fs.readFileSync('public/images/foo.png')` → `data:image/png;base64,...`.

### Intégration dans le layout

**`Base.astro`** — ajouter la prop `ogImage` à l'interface Props :

```html
<meta property="og:type" content="website" />
<meta property="og:title" content={canonicalTitle} />
<meta property="og:description" content={description} />
<meta property="og:url" content={Astro.url.href} />
<meta property="og:image" content={ogImage} />
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:image" content={ogImage} />
```

Note : n'ajouter les meta `og:image` et `twitter:image` que si `ogImage` est défini. Les meta `og:type`, `og:title`, `og:description`, `og:url` sont ajoutés sur toutes les pages.

**`projects/[slug].astro`** et **`lab/[slug].astro`** — passer l'URL de l'og:image au layout. Utiliser `new URL()` pour éviter les doubles slashes :

```typescript
const ogImage = new URL(`og/projects/${slug}.png`, Astro.site).href;
// ou pour lab :
const ogImage = new URL(`og/lab/${slug}.png`, Astro.site).href;
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
  - Si cover existe : image cover (chargée en base64 depuis `public/`)
  - Si pas de cover : dégradé `#8BD3DD` → `#F582AE` (cyan → pink)
- **Barre bas** : 4px, `#F582AE` (pink), pleine largeur

### Badges par type

| Collection | Status     | Label       | Couleur fond |
|-----------|------------|-------------|-------------|
| projects  | published  | Published   | #F582AE     |
| projects  | wip        | WIP         | #8BD3DD     |
| projects  | archived   | Archived    | #001858 (navy, 20% opacity) |
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
- `cover` ✅ (optionnel — chemin relatif public, ex: `/images/foo.png`)
- `status` ✅ (published/wip/archived)
- `color` ✅ (fallback dégradé)

### Lab
- `title` ✅
- `tags` ✅
- `cover` ✅ (optionnel — chemin relatif public)
- `date` ✅
- Pas de description ni status — badge fixe "Lab"

## Pages concernées

- Toutes les pages `projects/[slug]` → og:image auto
- Toutes les pages `lab/[slug]` → og:image auto
- Page d'accueil et About → pas d'og:image dynamique (phase 2 : image statique `public/og-default.png`)

## Fichiers à créer/modifier

### Créer
- `src/assets/fonts/Silkscreen-Regular.ttf`
- `src/assets/fonts/Silkscreen-Bold.ttf`
- `src/assets/fonts/SpaceMono-Regular.ttf`
- `src/pages/og/projects/[slug].png.ts`
- `src/pages/og/lab/[slug].png.ts`
- `src/lib/og-template.ts` — template satori partagé entre les deux endpoints

### Modifier
- `src/layouts/Base.astro` — ajouter prop `ogImage` + meta og complets (og:type, og:title, og:description, og:url, og:image, twitter:card)
- `src/pages/projects/[slug].astro` — passer ogImage au layout via `new URL()`
- `src/pages/lab/[slug].astro` — passer ogImage au layout via `new URL()`
- `package.json` — ajouter satori + @resvg/resvg-js

## Contraintes satori

- Satori utilise un subset de CSS (flexbox uniquement, pas de grid)
- Les images doivent être en URL absolue ou base64 data URI → on utilise base64 depuis le disque
- Les polices doivent être des fichiers TTF/OTF chargés en ArrayBuffer
- `overflow: hidden` ne clip pas correctement les images — éviter border-radius sur les images cover
