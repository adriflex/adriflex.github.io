# Design — Lightbox sur les images cover

**Date :** 2026-02-26
**Statut :** Approuvé

## Contexte

Étendre le lightbox existant (`.prose img`) pour inclure également les images cover/header des pages projet et lab.

## Approche retenue

Classe CSS `lightbox-trigger` ajoutée sur les `<img>` cover. Le selector JS est étendu pour matcher les deux.

## Fichiers

| Fichier | Changement |
|---|---|
| `src/components/Lightbox.astro` | Selector `.prose img` → `.prose img, img.lightbox-trigger` |
| `src/pages/projects/[slug].astro` | Ajouter `lightbox-trigger cursor-zoom-in` sur l'`<img>` cover (ligne 31) |
| `src/pages/lab/[slug].astro` | Ajouter `lightbox-trigger cursor-zoom-in` sur l'`<img>` cover (ligne 41) |
