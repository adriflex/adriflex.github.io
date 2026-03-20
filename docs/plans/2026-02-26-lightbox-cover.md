# Lightbox Cover Images Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Étendre le lightbox existant pour inclure les images cover des pages projet et lab.

**Architecture:** Ajouter la classe `lightbox-trigger` sur les `<img>` cover, et mettre à jour le selector JS du composant Lightbox existant.

**Tech Stack:** Astro 5, Tailwind v4, vanilla JS TypeScript.

---

### Task 1 : Étendre le selector dans `Lightbox.astro`

**Files:**
- Modify: `src/components/Lightbox.astro`

**Step 1 : Trouver la ligne du selector**

Dans le bloc `<script>`, localiser :
```ts
if (target.matches('.prose img')) {
```

**Step 2 : Remplacer par**

```ts
if (target.matches('.prose img, img.lightbox-trigger')) {
```

**Step 3 : Vérifier**

Relire le fichier et confirmer que la ligne est bien modifiée.

---

### Task 2 : Ajouter `lightbox-trigger` sur la cover de `projects/[slug].astro`

**Files:**
- Modify: `src/pages/projects/[slug].astro`

**Step 1 : Trouver la ligne**

Localiser l'`<img>` cover (ligne ~31) :
```astro
<img src={entry.data.cover} alt={entry.data.title} class="w-full h-full object-cover" />
```

**Step 2 : Remplacer par**

```astro
<img src={entry.data.cover} alt={entry.data.title} class="w-full h-full object-cover lightbox-trigger cursor-zoom-in" />
```

---

### Task 3 : Ajouter `lightbox-trigger` sur la cover de `lab/[slug].astro`

**Files:**
- Modify: `src/pages/lab/[slug].astro`

**Step 1 : Trouver la ligne**

Localiser l'`<img>` cover (ligne ~41) :
```astro
<img src={entry.data.cover} alt={entry.data.title} class="w-full h-auto object-cover" />
```

**Step 2 : Remplacer par**

```astro
<img src={entry.data.cover} alt={entry.data.title} class="w-full h-auto object-cover lightbox-trigger cursor-zoom-in" />
```

---

### Task 4 : Build + commit

**Step 1 : Build**

```bash
npm run build
```
Expected : aucune erreur, 13 pages générées.

**Step 2 : Commit**

```bash
git add src/components/Lightbox.astro "src/pages/projects/[slug].astro" "src/pages/lab/[slug].astro"
git commit -m "feat: extend lightbox to cover images"
```
