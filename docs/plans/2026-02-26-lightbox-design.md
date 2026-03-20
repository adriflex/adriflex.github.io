# Design — Lightbox pour les images des articles

**Date :** 2026-02-26
**Statut :** Approuvé

## Contexte

Le site portfolio (Astro 5 + Tailwind v4) affiche des images dans les articles projets et lab via du markdown standard. Actuellement, cliquer sur une image ne fait rien. L'objectif est d'afficher l'image en grand dans un overlay sans quitter la page.

## Décisions UX

- **Mode :** image seule (pas de galerie avec navigation)
- **Animation :** fade + scale depuis le centre (opacity 0→1, scale 0.95→1)
- **Fermeture :** clic sur le fond, bouton ×, ou touche Escape
- **Scroll body :** bloqué pendant l'ouverture

## Architecture

**Approche retenue :** Composant Astro dédié `Lightbox.astro`, importé uniquement dans les pages articles.

### Fichiers touchés

| Fichier | Action |
|---|---|
| `src/components/Lightbox.astro` | Créer |
| `src/pages/projects/[slug].astro` | Importer le composant |
| `src/pages/lab/[slug].astro` | Importer le composant |

### Structure HTML

```html
<div id="lightbox" aria-hidden="true">
  <div id="lightbox-backdrop"></div>
  <button id="lightbox-close" aria-label="Fermer">×</button>
  <img id="lightbox-img" src="" alt="" />
</div>
```

### Comportement JS

- Délégation d'événement sur `document` : clic sur `.prose img` → ouvre le lightbox
- Récupère `src` + `alt` de l'image cliquée et les injecte dans `#lightbox-img`
- Clic sur `#lightbox-backdrop` → ferme
- Clic sur `#lightbox-close` → ferme
- Touche `Escape` → ferme
- Ouverture : `document.body.style.overflow = 'hidden'`
- Fermeture : restore overflow

### Styles CSS

- Overlay : `position: fixed`, `inset: 0`, `z-index: 50`
- Fond : `#1A1614` (Ink) à 92% d'opacité
- Image : `max-width: 90vw`, `max-height: 90vh`, `object-fit: contain`, centrée
- Transition overlay : `opacity` 200ms ease
- Transition image : `opacity` + `scale` 250ms ease
- Curseur `zoom-in` sur `.prose img`
- Bouton × : hover color `#E8622A` (Accent)
- État initial masqué : `opacity: 0`, `pointer-events: none`
- État ouvert (classe `.is-open`) : `opacity: 1`, `pointer-events: auto`
