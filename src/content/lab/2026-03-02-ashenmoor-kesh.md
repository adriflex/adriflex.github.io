---
title: "Ashenmoor — KESH prend forme"
date: 2026-03-02
tags: [univers, dark-fantasy, blender, godot, ia, wip]
cover: "/images/kesh-preview.png"
---

Ashenmoor est un univers dark fantasy que je développe depuis un moment. Onze personnages, une structure narrative complète, une direction artistique inspirée de Mignola — silhouettes noires, masses graphiques, monde en décomposition lente. Un projet riche sur le papier, mais qui n'existait pas encore en 3D.

Le problème du solo dev sur un projet ambitieux, c'est le ratio effort/résultat. Ma réponse : un pipeline qui mise sur la vitesse plutôt que sur la perfection. **Concept art IA → low poly Blender → bake Kiln → Godot.** Éviter les 20 % de détails qui prennent 80 % du temps.

---

Le premier personnage à traverser ce pipeline, c'est KESH — le protagoniste. Une petite créature, autrefois humaine, transformation en cours. Il ne combat pas. Il observe. Sa petitesse face aux environnements, c'est son identité visuelle centrale : un témoin invisible dans un monde qui l'ignore.

---

Première étape : générer les character sheets via Replicate. Style prompt fixe — *Mike Mignola style, heavy black shadows, bold silhouettes, limited color palette, dark fantasy*. L'IA sort une direction solide : la peau de pierre sombre, les yeux verts lumineux, le pagne effiloché. Le style tient.

![Kesh — Character sheet généré par IA](/images/kesh-modelsheet.png)

Mais la silhouette manque de caractère. Trop compact, trop symétrique, trop générique pour un personnage qui doit se lire au premier regard.

---

C'est là que commence le vrai travail de direction artistique.

![Kesh — Notes de retouche](/images/kesh-retouches.png)

Avant/après sur la silhouette : torso allongé, jambes raccourcies, oreilles affinées, asymétrie organique dans les bras. Ces ajustements ne s'inventent pas — ils se voient quand on compare les silhouettes côte à côte. L'IA génère, moi je dirige.

---

La modélisation suit directement le concept corrigé. Low poly, matériaux procéduraux, palette restreinte.

![Kesh — Low poly Blender](/images/kesh-preview.png)

Le pipeline fonctionne. KESH est reconnaissable depuis le premier concept jusqu'au mesh final. Les proportions tiennent. Les yeux luisent. Le pagne est là.

Prochaine étape : le bake via Kiln, l'export GLB, et l'intégration dans Godot — KESH qui marche dans Ashenmoor. Proof of concept.
