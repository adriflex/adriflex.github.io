---
title: "Ashenmoor — KESH prend forme"
date: 2026-03-02
tags: [univers, dark-fantasy, blender, godot, ia, 3d]
cover: "/images/kesh-preview.png"
---

Ashenmoor, c'est une envie que j'ai depuis un moment : créer un univers dark fantasy, avec ses personnages, son histoire. C'est une expérimentation — je veux voir jusqu'où je peux aller seul sur ce genre de projet.

Le problème quand on est seul sur quelque chose d'ambitieux, c'est la loi de Pareto : les 20 % de détails prennent 80 % du temps. Ma réponse : un pipeline qui mise sur la vitesse. **Concept art IA → low poly Blender → bake [Kiln](/projects/kiln) → Godot.**

---

Le premier personnage à traverser ce pipeline, c'est KESH — le protagoniste. Il ne combat pas. Il observe. Sa petitesse face aux environnements, c'est son identité visuelle : un témoin invisible dans un monde qui l'ignore.

---

Première étape : générer les character sheets via [Replicate](/lab/2026-02-26-ai-nodes-blender). L'IA sort une direction solide : la peau de pierre sombre, les yeux verts lumineux, le pagne effiloché.

![Kesh — Character sheet généré par IA](/images/kesh-modelsheet.png)

---

De là, je passe en modélisation. Fermer les formes principales comme ça, c'est encore de la modélisation pure — c'est la partie agréable. On peut faire toutes les formes qu'on veut. Ça devient plus long quand on n'arrive pas à se retenir de faire des détails.

J'essaie de garder un vocabulaire de modélisation efficace : low poly, matériaux procéduraux, palette restreinte. Et j'ai un petit faible pour les edges marqués sharp — le côté facetté du low poly, c'est graphiquement plus intéressant.

![Kesh — Low poly Blender](/images/kesh-preview.png)

Le mesh est là. Le personnage est reconnaissable. Mais un modèle, ça s'évalue différemment qu'un concept — les proportions révèlent leurs défauts sous la lumière.

---

Quand je manque de recul, je me fais des retakes. J'ai généré celles-ci avec Nano Banana Pro — le côté amusant de se donner ses propres retakes. C'est redessiné comme à la main, et ça donne plein d'idées d'amélioration.

![Kesh — Notes de retake sur le modèle](/images/kesh-retouches.png)

Torso à allonger, jambes à raccourcir, oreilles à affiner, introduire de l'asymétrie dans les bras. Ce genre de choses se voit quand on compare les silhouettes côte à côte.

---

Après les retakes, j'ai pu tester [Texture Diffusion v2](/lab/2026-02-26-texture-diffusion-v3) sur KESH. Projection de texture à la vitesse de l'éclair — le pipeline concept art → modèle → texture commence à tourner pour de vrai.

Prochaine étape : envoyer KESH dans Godot et commencer le prototype. Une scène, un personnage qui marche, la preuve que le pipeline tient de bout en bout.

→ Voir aussi : [Ashenmoor — l'univers](/lab/ashenmoor)
