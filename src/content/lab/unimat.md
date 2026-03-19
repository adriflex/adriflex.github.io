---
title: "UniMat — unifier les matériaux pour l'export"
date: 2025-06-01
tags: [blender, outil, 3d]
cover: "/images/unimat-cover.png"
---

Dans Blender, on travaille souvent avec plusieurs matériaux sur un même objet ou une même collection. Un matériau pour le bois, un pour le métal, un pour le tissu. En mode édition, c'est pratique. Mais au moment d'exporter vers un moteur de jeu, chaque matériau = un draw call en plus. Ça s'accumule vite.

![UniMat — logo et interface](/images/unimat-00.png)

Dans Substance Painter, ce problème n'existe pas : on peut séparer en zones avec plusieurs matériaux, puis tout exporter dans un seul set de textures via les UDIM. Dans Blender, il n'y a pas d'équivalent intégré. C'est le trou qu'UniMat vient combler.

![Principe : plusieurs matériaux bakés en un seul, prêt pour l'export](/images/unimat-01.png)

UniMat prend une collection Blender avec N matériaux Principled BSDF, bake chaque map (Color, Roughness, Metallic, Normal, Alpha), et réunit le tout dans un seul matériau avec un atlas UV partagé. On passe de plusieurs matériaux procéduraux à un seul set de textures exportable en GLB.

![Export vers Godot, Unreal ou d'autres moteurs via glTF](/images/unimat-02.png)

Le panel propose le choix des maps à baker, la résolution par type, la méthode UV (seams existants, Smart UV Project, ou UV existante), et un système de naming configurable.

![Interface complète — maps, résolution, naming, UV](/images/unimat-03.png)

![Méthodes UV et préférences](/images/unimat-04.png)

**Version expérimentale.** L'add-on fonctionne pour le cas de base, mais il n'est pas fiable à 100%. En particulier, ajouter ou retirer des objets après un premier bake peut poser des problèmes. À utiliser en connaissance de cause.

Depuis, j'ai tout repris de zéro dans un nouvel add-on — [Kiln](/lab/2026-02-27-kiln), qui corrige les problèmes d'architecture et pousse le concept plus loin.

[Code source](https://github.com/adriflex/Unimat)
