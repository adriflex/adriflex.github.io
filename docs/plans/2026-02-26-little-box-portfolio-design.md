# Design — Little Box sur le portfolio

**Date :** 2026-02-26
**Statut :** Approuvé

## Objectif

Ajouter la BD "Little Box" au portfolio adriflex.github.io avec :
- Une page projet dédiée
- Un viewer PDF intégré (Google Drive)
- Un bouton de téléchargement

## Assets

| Fichier source | Destination | Usage |
|---|---|---|
| `E:/Documents/Projet_LittleBox/Export/Posts_promo/Export_images/mail_003.png` | `public/images/little-box-cover.png` | Couverture du projet |
| `E:/Documents/Projet_LittleBox/Export/Posts_promo/Export_images/003A.png` | `public/images/little-box-page.png` | Sample de page dans le contenu |

## Fichiers à créer / modifier

### 1. `src/content/projects/little-box.md` (créer)

Frontmatter :
```yaml
title: "Little Box"
description: "BD de 10 pages. Satire noire sur le logement moderne — ton appartement intelligent devient ton pire ennemi."
date: 2025-04-18
tags: [bd, illustration, humour noir]
featured: false
color: "#4A90D9"
cover: "/images/little-box-cover.png"
status: published
pdf: "https://drive.google.com/file/d/1rVBTVODRBoeFqjswrUtQWh1_8EJ8-iUf/preview"
pdfDownload: "https://drive.google.com/uc?id=1rVBTVODRBoeFqjswrUtQWh1_8EJ8-iUf&export=download"
```

Contenu : présentation du projet (contexte London, satire logement) + image 003A.

### 2. `src/content.config.ts` (modifier)

Ajouter dans le schéma `projects` :
```ts
pdf: z.string().optional(),
pdfDownload: z.string().optional(),
```

### 3. `src/pages/projects/[slug].astro` (modifier)

Ajouter après le bloc CTA (`entry.data.link`), avant le séparateur :
- `<iframe>` conditionnel (`entry.data.pdf`) avec aspect-ratio 3/4, bordure `border-ink/8`, coins arrondis
- Bouton "↓ Télécharger le PDF" conditionnel (`entry.data.pdfDownload`), style outline cohérent avec l'existant

## PDF

- **Viewer** : `https://drive.google.com/file/d/1rVBTVODRBoeFqjswrUtQWh1_8EJ8-iUf/preview`
- **Download** : `https://drive.google.com/uc?id=1rVBTVODRBoeFqjswrUtQWh1_8EJ8-iUf&export=download`
- Hébergé sur Google Drive (fichier public) — pas dans le repo git

## Ce qui ne change pas

- Aucune modification aux pages index, projects listing, lab
- Aucune dépendance externe ajoutée
- Pas de MDX — fichier `.md` classique
