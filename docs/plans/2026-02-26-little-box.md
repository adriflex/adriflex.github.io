# Little Box — Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Ajouter la BD "Little Box" au portfolio adriflex.github.io avec une page projet, un viewer PDF intégré (Google Drive), et un bouton de téléchargement.

**Architecture:** Approche "frontmatter étendu" — ajout de deux champs optionnels (`pdf`, `pdfDownload`) au schéma des projets. `[slug].astro` rend un viewer `<iframe>` conditionnel quand ces champs sont présents. Zéro nouvelle dépendance.

**Tech Stack:** Astro 5, Tailwind v4, TypeScript, Zod, GitHub Pages

**Repo local :** `E:/Documents/portfolio-adrien/`

---

### Task 1 : Copier les images dans public/

**Files:**
- Copier : `E:/Documents/Projet_LittleBox/Export/Posts_promo/Export_images/mail_003.png` → `public/images/little-box-cover.png`
- Copier : `E:/Documents/Projet_LittleBox/Export/Posts_promo/Export_images/003A.png` → `public/images/little-box-page.png`

**Step 1: Copier les deux fichiers**

```bash
cp "E:/Documents/Projet_LittleBox/Export/Posts_promo/Export_images/mail_003.png" \
   "E:/Documents/portfolio-adrien/public/images/little-box-cover.png"

cp "E:/Documents/Projet_LittleBox/Export/Posts_promo/Export_images/003A.png" \
   "E:/Documents/portfolio-adrien/public/images/little-box-page.png"
```

**Step 2: Vérifier la présence des fichiers**

```bash
ls -lh "E:/Documents/portfolio-adrien/public/images/"
```
Expected : 4 fichiers dont `little-box-cover.png` et `little-box-page.png`.

**Step 3: Commit**

```bash
cd "E:/Documents/portfolio-adrien"
git add public/images/little-box-cover.png public/images/little-box-page.png
git commit -m "feat: add Little Box images to public/images"
```

---

### Task 2 : Étendre le schéma Zod des projets

**Files:**
- Modifier : `src/content.config.ts:12-13` (après `link`, avant `status`)

**Step 1: Modifier content.config.ts**

Remplacer :
```ts
    link: z.string().optional(),
    status: z.enum(['published', 'wip', 'archived']).default('published'),
```

Par :
```ts
    link: z.string().optional(),
    pdf: z.string().optional(),
    pdfDownload: z.string().optional(),
    status: z.enum(['published', 'wip', 'archived']).default('published'),
```

**Step 2: Vérifier que le build passe**

```bash
cd "E:/Documents/portfolio-adrien"
npm run build 2>&1 | tail -20
```
Expected : `dist/` généré sans erreur TypeScript/Zod.

**Step 3: Commit**

```bash
git add src/content.config.ts
git commit -m "feat: add pdf and pdfDownload fields to projects schema"
```

---

### Task 3 : Ajouter le viewer PDF dans [slug].astro

**Files:**
- Modifier : `src/pages/projects/[slug].astro:60-73` (après le bloc CTA `entry.data.link`, avant le séparateur `h-px`)

**Step 1: Modifier [slug].astro**

Repérer ce bloc existant (ligne ~60-73) :
```astro
    <!-- CTA si lien externe -->
    {entry.data.link && (
      <a
        href={entry.data.link}
        ...
      >
        Voir le projet ↗
      </a>
    )}

    <!-- Séparateur -->
    <div class="h-px bg-ink/8 mb-10"></div>
```

Insérer entre le CTA et le séparateur :
```astro
    <!-- Viewer PDF -->
    {entry.data.pdf && (
      <div class="mt-8 mb-4">
        <div class="rounded-2xl overflow-hidden border border-ink/8" style="aspect-ratio: 3/4; min-height: 500px;">
          <iframe
            src={entry.data.pdf}
            width="100%"
            height="100%"
            allow="autoplay"
            class="w-full h-full"
          />
        </div>
        {entry.data.pdfDownload && (
          <div class="mt-4">
            <a
              href={entry.data.pdfDownload}
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center gap-2 px-5 py-2.5 border border-ink/20 text-ink/70 font-body text-sm rounded-full hover:border-accent hover:text-accent transition-colors duration-200"
            >
              ↓ Télécharger le PDF
            </a>
          </div>
        )}
      </div>
    )}
```

**Step 2: Build de vérification**

```bash
cd "E:/Documents/portfolio-adrien"
npm run build 2>&1 | tail -20
```
Expected : build sans erreur.

**Step 3: Commit**

```bash
git add src/pages/projects/[slug].astro
git commit -m "feat: add conditional PDF viewer to project pages"
```

---

### Task 4 : Créer le fichier projet little-box.md

**Files:**
- Créer : `src/content/projects/little-box.md`

**Step 1: Créer le fichier**

```markdown
---
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
---

**Little Box** est une BD courte de 10 pages, satire noire du logement moderne.

Imaginée lors de mes années à Londres, où la pression financière était omniprésente — cette histoire place le lecteur face à un appartement intelligent qui devient son pire adversaire. Le principe : tu es viré… par ton propre appart.

Un projet longtemps resté dans les tiroirs, finalement sorti tel quel.

![Une page de la BD](/images/little-box-page.png)
```

**Step 2: Build + vérification de la route**

```bash
cd "E:/Documents/portfolio-adrien"
npm run build 2>&1 | tail -30
```
Expected : la route `/projects/little-box` est listée dans la sortie Astro (`Generating static routes...`).

**Step 3: Vérification visuelle en dev**

```bash
npm run dev
```
Ouvrir `http://localhost:4321/projects/little-box` dans le navigateur.
Vérifier :
- La couverture `mail_003` s'affiche en banner
- Le titre, description, tags sont corrects
- Le viewer PDF Google Drive se charge
- Le bouton "↓ Télécharger le PDF" est présent
- L'image de page `003A` est visible dans le contenu Markdown

**Step 4: Vérifier la listing /projects**

Ouvrir `http://localhost:4321/projects`.
Vérifier que la carte Little Box apparaît.

**Step 5: Commit**

```bash
cd "E:/Documents/portfolio-adrien"
git add src/content/projects/little-box.md
git commit -m "feat: add Little Box project page with PDF viewer"
```

---

### Task 5 : Déployer

**Step 1: Push vers GitHub**

```bash
cd "E:/Documents/portfolio-adrien"
git push
```
Expected : GitHub Actions lance le build automatiquement (~1 min).

**Step 2: Vérifier le déploiement**

```bash
gh run list --limit 3
```
Attendre que le dernier run soit `completed / success`.

**Step 3: Vérifier en production**

Ouvrir `https://adriflex.github.io/projects/little-box`.
Vérifier le viewer PDF et le bouton téléchargement.
