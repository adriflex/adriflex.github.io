# Site Portfolio — Design Refonte 2026-03-05

## Contexte

Site Astro 5 + Tailwind v4 + GitHub Pages (https://adriflex.github.io).
Problèmes identifiés : homepage trop textuelle, navigation fragmentée, aucun moyen de suivre les nouveautés, manque de visibilité artistique.

---

## 1. Homepage — Refonte layout

### Problèmes actuels
- Hero uniquement textuel — ne montre pas le travail artistique
- Section Projets limitée à 3 featured, "tout voir" trop discret
- Lab relégué en bas alors que c'est le contenu le plus actif
- Navigation fragmentée en 3 pages distinctes

### Design cible
Un seul scroll suffit à tout voir.

**Structure de la page :**
1. Hero — texte à gauche + image forte à droite (une illustration ou rendu 3D)
2. Titre "Projets" + grille de TOUS les projets publiés (même layout que /projects)
3. Titre "Lab" + liste de TOUS les posts lab (même layout que /lab)
4. Footer avec formulaire newsletter

Les pages `/projects` et `/lab` restent accessibles en lien direct mais la homepage devient autosuffisante.

**Image hero :** à fournir par Adrien (une illustration ou rendu 3D signature).

---

## 2. Page About — Ajout image portfolio

### Design cible
Layout 2 colonnes sur desktop :
- Colonne gauche : bio + liens (contenu existant)
- Colonne droite : image `artistvsart_003.png` (grille 3×3 de travaux avec photo au centre)

Sur mobile : image en haut, texte en dessous.

**Fichier source :** `E:\Pictures\Social_network\artistvsart_003.png`
**Destination :** `public/images/artistvsart.png`

---

## 3. Newsletter — MailerLite

### Décisions
- Garder MailerLite (44 abonnés existants + 5 jeu vidéo)
- Fusionner en une seule liste "Adrien Rouquié — Updates"
- Formulaire d'abonnement intégré sur le site

### Intégration RSS → MailerLite
- Générer un flux RSS Astro via `@astrojs/rss` couvrant projets + lab
- Configurer MailerLite pour envoyer automatiquement depuis le RSS

### Points d'intégration formulaire sur le site
- Footer (toutes les pages)
- Page About (section dédiée)

---

## 4. Analytics

Cloudflare Web Analytics — gratuit, privacy-friendly, sans cookie banner.
Activation via un tag `<script>` dans le layout Base.astro.
Nécessite de passer le site derrière Cloudflare (ou utiliser le snippet JS direct).

Alternative si Cloudflare non souhaité : Umami self-hosted ou Plausible (payant).

---

## 5. Contact

Lien email dans le footer. Pas de formulaire (pas de backend, pas de maintenance).
Format : `mailto:` avec adresse email d'Adrien.

---

## 6. Révision articles

À faire après les chantiers structurels. Adrien donne ses notes article par article.

---

## Ordre d'implémentation

1. Homepage refonte (layout + hero image)
2. About page (image portfolio)
3. RSS feed (`@astrojs/rss`)
4. Footer newsletter MailerLite + intégration About
5. Analytics
6. Révision articles au cas par cas
