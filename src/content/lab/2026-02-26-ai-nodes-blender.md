---
title: "IA Nodes — un node graph IA dans Blender"
date: 2026-02-26
tags: [blender, addon, ia, workflow]
cover: "/images/ai-nodes-cover.png"
---

L'idée de départ : composer des pipelines de génération IA visuellement, sans quitter Blender. Pas en bricolant des scripts Python à la main — en connectant des nœuds, comme on le fait déjà pour les matériaux ou le compositing.

**IA Nodes** ajoute un type de node tree custom dans Blender. Chaque nœud est une étape du pipeline : entrée texte, appel à un modèle Replicate, jointure de strings, post-traitement via le Compositor, export. On les connecte, on appuie sur Ctrl+R, et la chaîne s'exécute.

---

Quelques détails qui m'ont plu à construire :

- **Zéro dépendance externe** — tout passe par `urllib`, la lib standard de Python. Pas de `pip install`, pas de venv, pas de friction à l'installation.
- **Sockets dynamiques** — le nœud Replicate fetch le schéma du modèle au changement, et reconstruit ses entrées en conséquence. Changer de modèle reconfigure automatiquement les paramètres disponibles.
- **Feedback visuel** — les nœuds passent au rouge pendant l'exécution, au vert quand c'est bon, à l'orange si la topologie a changé depuis le dernier run.
- **Auto-exécution** — les nœuds Viewer se déclenchent seuls quand l'upstream ne contient que des nœuds de données. Pas besoin d'appuyer sur Run juste pour voir un texte.

Le tout tourne sur Blender 5.0. Les modèles disponibles par défaut : FLUX Schnell, FLUX Dev, FLUX 1.1 Pro, SDXL, Claude Haiku pour le texte.

Version 0.1.0 — prototype fonctionnel, sortie publique à venir.
