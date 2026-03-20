# Site Portfolio — Plan d'implémentation Refonte

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Refonte visuelle et fonctionnelle du portfolio — homepage complète, galerie artistique sur About, flux RSS et formulaire newsletter.

**Architecture:** Site statique Astro 5 + Tailwind v4 sur GitHub Pages. Modifications ciblées sur pages et layout existants. Ajout d'un flux RSS via @astrojs/rss. Formulaire MailerLite en composant réutilisable injecté dans footer et About.

**Tech Stack:** Astro 5, Tailwind v4, @astrojs/rss, MailerLite (embed HTML)

---

## Prérequis — à réunir avant de commencer

- [ ] **Image hero** : une illustration ou rendu 3D signature → la copier dans `public/images/hero.jpg`
- [ ] **Code embed formulaire MailerLite** : MailerLite > Forms > Embedded > copier le HTML snippet
- [ ] **Token Cloudflare Analytics** : Cloudflare Dashboard > Web Analytics > Add site > copier le token

---

### Task 1: Copier l'image portfolio About

**Files:**
- Source : `E:\Pictures\Social_network\artistvsart_003.png`
- Destination : `public/images/artistvsart.png`

**Step 1: Copier le fichier**

Depuis le dossier `E:/Documents/portfolio-adrien/` :
```bash
cp "E:/Pictures/Social_network/artistvsart_003.png" public/images/artistvsart.png
```

**Step 2: Vérifier**

```bash
ls public/images/
```
Expected : `artistvsart.png` présent.

**Step 3: Commit**

```bash
git add public/images/artistvsart.png
git commit -m "assets: add portfolio grid image for About page"
```

---

### Task 2: Page About — layout 2 colonnes avec image portfolio

**Files:**
- Modify: `src/pages/about.astro`

Le fichier actuel a : En-tête (lignes 8-21) → Bio div.space-y-5.mb-12 (lignes 22-39) → Séparateur (ligne 42) → Liens (lignes 43-69).

**Step 1: Remplacer les lignes 22-39 (bloc bio)**

Remplacer tout le `<div class="space-y-5 mb-12">` par ce layout 2 colonnes :

```astro
<!-- Layout 2 colonnes : texte gauche + image droite -->
<div class="flex flex-col md:flex-row gap-10 md:gap-16 mb-12">

  <!-- Colonne gauche : bio -->
  <div class="flex-1 space-y-5">
    <p class="font-body text-lg text-ink/80 leading-relaxed">
      Artiste 3D &amp; illustrateur basé à Bordeaux. Spécialisé en personnages et mondes imaginaires —
      style stylisé, humoristique, coloré.
    </p>
    <p class="font-body text-ink/65 leading-relaxed">
      Formation Supinfocom Arles (Mopa) et École Estienne. J'ai travaillé comme Character Artist
      chez <strong class="text-ink font-medium">Passion Pictures</strong> (Londres), CG Supervisor sur
      <em>Tchoupi à la campagne</em>, et actuellement Artiste 3D chez
      <strong class="text-ink font-medium">Golden Wolf</strong>.
    </p>
    <p class="font-body text-ink/65 leading-relaxed">
      En parallèle je crée des projets perso : jeux (Godot), outils (Blender), apps web, BD.
      Ce site en est la vitrine.
    </p>
  </div>

  <!-- Colonne droite : grille de travaux -->
  <div class="md:w-72 shrink-0">
    <img
      src="/images/artistvsart.png"
      alt="Travaux d'Adrien Rouquié — personnages 3D et illustrations"
      class="w-full rounded-2xl border border-ink/8"
    />
  </div>

</div>
```

**Step 2: Vérifier visuellement**

```bash
npm run dev
```
Ouvrir http://localhost:4321/about.
- Desktop : texte à gauche, grille à droite, côte à côte.
- Mobile (redimensionner) : image en haut, texte en dessous.

**Step 3: Commit**

```bash
git add src/pages/about.astro
git commit -m "feat: add portfolio grid image to About page"
```

---

### Task 3: Homepage — afficher tous les projets et tous les labs

**Files:**
- Modify: `src/pages/index.astro`

**Step 1: Remplacer la logique de données (lignes 11-27)**

Remplacer tout le bloc de filtres (featuredProjects, displayProjects, recentLab) par :

```typescript
const publishedProjects = allProjects
  .filter(p => p.data.status === 'published')
  .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());

const allLabSorted = allLab
  .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
```

**Step 2: Mettre à jour les sections HTML**

- Remplacer `{displayProjects.map(p => (` par `{publishedProjects.map(p => (`
- Remplacer `{recentLab.map((post, i) => (` par `{allLabSorted.map((post, i) => (`
- Remplacer `recentLab.length - 1` par `allLabSorted.length - 1`
- Supprimer le conditionnel wrapper `{recentLab.length > 0 && (` et son accolade fermante — toujours afficher le bloc Lab

**Step 3: Vérifier**

```bash
npm run dev
```
Ouvrir http://localhost:4321.
- Grille projets : tous les projets `published` apparaissent (Orb of Avarice, Little Box, Texture Diffusion, Resin Print Toolkit).
- Liste Lab : tous les posts lab, du plus récent au plus ancien.

**Step 4: Commit**

```bash
git add src/pages/index.astro
git commit -m "feat: show all published projects and all lab posts on homepage"
```

---

### Task 4: Homepage — Hero avec image

**Prérequis :** image hero copiée dans `public/images/hero.jpg` (ou `.png`).

**Files:**
- Modify: `src/pages/index.astro`

**Step 1: Remplacer la section hero (lignes 32-71)**

Remplacer `<section class="px-6 pt-20 pb-16 ...">` par :

```astro
<section class="px-6 pt-20 pb-16 max-w-5xl mx-auto">
  <div class="flex flex-col md:flex-row items-center gap-12">

    <!-- Texte -->
    <div class="flex flex-col gap-6 flex-1">
      <div class="flex items-center gap-2">
        <span class="w-8 h-px bg-accent"></span>
        <span class="text-sm font-body text-accent font-medium tracking-wide uppercase">Artiste 3D & Illustrateur</span>
      </div>
      <h1 class="font-display text-[clamp(3rem,8vw,6rem)] font-bold leading-[1.0] tracking-tight text-ink">
        Personnages.<br />
        <span class="text-accent">Mondes.</span><br />
        Outils.
      </h1>
      <p class="font-body text-lg text-ink/60 max-w-md leading-relaxed">
        Je crée des univers stylisés, des jeux, des outils Blender et des apps.
        Basé à Bordeaux, en télétravail pour le monde.
      </p>
      <div class="flex flex-wrap gap-3 pt-2">
        <a
          href="/projects"
          class="inline-flex items-center gap-2 px-6 py-3 bg-ink text-cream font-body font-medium rounded-full hover:bg-accent transition-colors duration-300 text-sm"
        >
          Voir les projets
        </a>
        <a
          href="https://artstation.com/adriflex"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex items-center gap-2 px-6 py-3 border border-ink/20 text-ink font-body font-medium rounded-full hover:border-accent hover:text-accent transition-colors duration-300 text-sm"
        >
          ArtStation ↗
        </a>
      </div>
    </div>

    <!-- Image hero -->
    <div class="md:w-80 shrink-0">
      <img
        src="/images/hero.jpg"
        alt="Adrien Rouquié — Artiste 3D & Illustrateur"
        class="w-full rounded-2xl border border-ink/8 shadow-lg"
      />
    </div>

  </div>
</section>
```

**Step 2: Vérifier**

```bash
npm run dev
```
Ouvrir http://localhost:4321.
- Desktop : texte à gauche, image à droite dans le hero.
- Mobile : image sous le texte.

**Step 3: Commit**

```bash
git add src/pages/index.astro public/images/hero.jpg
git commit -m "feat: add hero image to homepage"
```

---

### Task 5: RSS Feed

**Files:**
- Create: `src/pages/rss.xml.ts`
- Modify: `src/layouts/Base.astro`

**Step 1: Installer @astrojs/rss**

```bash
npm install @astrojs/rss
```

**Step 2: Créer src/pages/rss.xml.ts**

```typescript
import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';

export async function GET(context: APIContext) {
  const projects = await getCollection('projects', p => p.data.status === 'published');
  const lab = await getCollection('lab');

  const allItems = [
    ...projects.map(p => ({
      title: p.data.title,
      pubDate: p.data.date,
      description: p.data.description,
      link: `/projects/${p.id.replace(/\.md$/, '')}`,
    })),
    ...lab.map(p => ({
      title: p.data.title,
      pubDate: p.data.date,
      description: p.data.title,
      link: `/lab/${p.id.replace(/\.md$/, '')}`,
    })),
  ].sort((a, b) => b.pubDate.valueOf() - a.pubDate.valueOf());

  return rss({
    title: 'Adrien Rouquié — Projets & Lab',
    description: 'Nouveaux projets, devlogs et expérimentations.',
    site: context.site!,
    items: allItems,
  });
}
```

**Step 3: Ajouter le lien RSS dans Base.astro**

Dans `src/layouts/Base.astro`, dans le `<head>`, après la ligne favicon (ligne 28), ajouter :

```html
<link rel="alternate" type="application/rss+xml" title="Adrien Rouquié" href="/rss.xml" />
```

**Step 4: Vérifier le build**

```bash
npm run build
```
Expected : pas d'erreur TypeScript, fichier `dist/rss.xml` généré.

**Step 5: Commit**

```bash
git add src/pages/rss.xml.ts src/layouts/Base.astro package.json package-lock.json
git commit -m "feat: add RSS feed covering projects and lab posts"
```

---

### Task 6: Composant NewsletterForm + intégration footer et About

**Prérequis :** avoir le code HTML embed du formulaire MailerLite.
1. Se connecter à MailerLite
2. Forms > Embedded forms > sélectionner ou créer le formulaire
3. Copier le HTML snippet complet (inclut le `<div>` + `<script>`)

**Files:**
- Create: `src/components/NewsletterForm.astro`
- Modify: `src/layouts/Base.astro`
- Modify: `src/pages/about.astro`

**Step 1: Créer src/components/NewsletterForm.astro**

Remplacer `[EMBED_MAILERLITE_HTML_ICI]` par le code copié depuis MailerLite :

```astro
---
// Formulaire d'abonnement newsletter — embed MailerLite
---
<div>
  <p class="font-body text-sm text-ink/60 mb-3">
    Reçois les nouveaux projets et posts Lab par email.
  </p>
  <!-- Coller ici le HTML embed de MailerLite -->
  [EMBED_MAILERLITE_HTML_ICI]
</div>
```

**Step 2: Modifier le footer dans Base.astro**

Ajouter l'import NewsletterForm dans le frontmatter de Base.astro :

```typescript
import NewsletterForm from '../components/NewsletterForm.astro';
```

Remplacer le `<footer>` existant (lignes 61-69) par :

```astro
<footer class="border-t border-ink/8 px-6 py-10 mt-16">
  <div class="max-w-5xl mx-auto flex flex-col md:flex-row justify-between gap-8">

    <!-- Newsletter -->
    <div class="max-w-xs">
      <h3 class="font-display text-sm font-bold mb-3 uppercase tracking-wide text-ink">Rester informé</h3>
      <NewsletterForm />
    </div>

    <!-- Liens + copyright -->
    <div class="flex flex-col items-end justify-between gap-4">
      <div class="flex gap-6 text-sm text-ink/40">
        <a href="https://artstation.com/adriflex" target="_blank" rel="noopener" class="hover:text-accent transition-colors duration-200">ArtStation</a>
        <a href="https://instagram.com/adrien.flex" target="_blank" rel="noopener" class="hover:text-accent transition-colors duration-200">Instagram</a>
        <a href="/rss.xml" class="hover:text-accent transition-colors duration-200">RSS</a>
      </div>
      <span class="text-sm text-ink/40">© {new Date().getFullYear()} Adrien Rouquié</span>
    </div>

  </div>
</footer>
```

**Step 3: Ajouter le formulaire sur la page About**

Ajouter l'import NewsletterForm dans le frontmatter d'about.astro :

```typescript
import NewsletterForm from '../components/NewsletterForm.astro';
```

Ajouter après le bloc des liens (après la `</div>` fermante de la grille de liens) :

```astro
<!-- Séparateur -->
<div class="h-px bg-ink/8 my-12"></div>

<!-- Newsletter -->
<h2 class="font-display text-xl font-bold mb-2 text-ink">Rester informé</h2>
<NewsletterForm />
```

**Step 4: Vérifier**

```bash
npm run dev
```
- Vérifier que le formulaire apparaît dans le footer sur toutes les pages.
- Vérifier qu'il apparaît en bas de la page About.
- Tester l'abonnement avec une adresse email de test.

**Step 5: Commit**

```bash
git add src/components/NewsletterForm.astro src/layouts/Base.astro src/pages/about.astro
git commit -m "feat: add MailerLite newsletter form to footer and About page"
```

---

### Task 7: Analytics Cloudflare

**Prérequis :**
1. Cloudflare Dashboard > Web Analytics > Add a site
2. Entrer `adriflex.github.io` → copier le snippet `<script>` fourni

**Files:**
- Modify: `src/layouts/Base.astro`

**Step 1: Ajouter le snippet dans le `<head>` de Base.astro**

Juste avant `</head>`, ajouter le snippet copié depuis Cloudflare. Il ressemble à :

```html
<!-- Cloudflare Web Analytics -->
<script defer src='https://static.cloudflareinsights.com/beacon.min.js'
  data-cf-beacon='{"token": "TON_TOKEN_ICI"}'></script>
```

**Step 2: Commit**

```bash
git add src/layouts/Base.astro
git commit -m "feat: add Cloudflare Web Analytics"
```

---

### Task 8: Configuration MailerLite RSS automation

Cette task est une configuration dans l'interface MailerLite, pas du code.

1. MailerLite > Automations > Create automation
2. Trigger : "RSS campaign" → URL du flux : `https://adriflex.github.io/rss.xml`
3. Fréquence : hebdomadaire (ou à chaque nouveau post selon préférence)
4. Choisir le template email
5. Activer l'automation

---

### Task 9: Deploy final

```bash
git push
```

Attendre ~1 minute (GitHub Actions), puis vérifier :
- https://adriflex.github.io — homepage avec image hero + tous les projets + tous les labs
- https://adriflex.github.io/about — layout 2 colonnes avec image portfolio
- https://adriflex.github.io/rss.xml — flux RSS valide
- Footer : formulaire newsletter présent sur toutes les pages
