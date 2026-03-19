---
title: "IA Nodes — un node graph IA dans Blender"
date: 2026-02-26
tags: [blender, outil, ia]
cover: "/images/ai-nodes-schema.png"
---

Blender a déjà un node graph pour les matériaux, le compositing, les Geometry Nodes. L'idée : en ajouter un pour l'IA.

**IA Nodes** ajoute un type de node tree dans Blender. Par exemple : un nœud texte avec un prompt simple, connecté à un nœud qui l'enrichit via Claude, connecté à un nœud qui génère une image avec FLUX, connecté à un nœud qui en fait une vidéo. On branche, `Ctrl+R`, la chaîne s'exécute. Tout passe par l'API [Replicate](https://replicate.com).

![IA Nodes en action — génération d'une fiche personnage](/images/ai-nodes-screenshot.png)

---

Mes connaissances en Python et en add-on Blender font que maintenant, avec l'IA, je peux construire des outils assez facilement — du moins sur les domaines que je connais bien. Cet add-on est un bon exemple : le nœud Replicate récupère le schéma du modèle automatiquement et reconstruit ses entrées. Changer de modèle reconfigure tout. Les nœuds changent de couleur pendant l'exécution — rouge en cours, vert terminé, orange si quelque chose a changé.

---

Côté modèles, tout passe par l'API Replicate — on paie à l'image, pas d'abonnement. Les modèles rapides (FLUX Schnell, FLUX Dev) coûtent quelques fractions de centime par image. Les plus puissants comme FLUX 1.1 Pro ou Nano Banana Pro sont un peu plus chers, mais on ne paie que ce qu'on génère. Pas de gaspillage.

---

Honnêtement, depuis que j'ai connecté Claude Code directement à Replicate, j'ai moins eu besoin de passer par ce plugin. Je veux encore voir jusqu'où il pourrait m'être utile et le peaufiner avant de publier.

→ Voir aussi : [Texture Diffusion v2](/lab/2026-02-26-texture-diffusion-v3)
