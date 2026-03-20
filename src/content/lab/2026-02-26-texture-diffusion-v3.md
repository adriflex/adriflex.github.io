---
title: "Texture Diffusion v2 — reconstruire l'outil depuis zéro"
date: 2026-02-26
tags: [blender, outil, ia, 3d]
cover: "/images/texture-diffusion-v3-cover.png"
---

La [première version de Texture Diffusion](/projects/texture-diffusion) utilisait les normales du modèle comme guide pour ControlNet, avec Stable Diffusion en local. Ça fonctionnait. Mais l'installation de ComfyUI n'est pas facile d'accès pour tout le monde, et l'IA évoluait tellement vite que j'ai préféré attendre de voir comment les choses allaient tourner avant de continuer.

---

Quand j'ai découvert [Replicate](https://replicate.com), ça a débloqué pas mal de choses. L'avantage : on peut tester des dizaines de modèles de marques différentes sans rien changer au workflow. Et quand de nouveaux modèles sortent, ils sont souvent disponibles rapidement sur la plateforme. Plus besoin de GPU local ni d'installation compliquée — on paie au compte-gouttes les images qu'on produit.

Le pipeline dans Blender :

1. `Ctrl+Shift+G` — le viewport est capturé
2. L'image part sur Replicate avec le prompt
3. Le résultat revient configuré en **brosse stencil** — prêt à peindre directement sur le modèle

<img src="/images/td-v2-panel-generate.png" alt="Panel Generate — choix du modèle, capture, prompt tags" style="max-width: 50%;" />

---

En testant différents modèles, je me suis aperçu que les modèles img2img classiques sont un peu difficiles à contrôler. Puis j'ai découvert Nano Banana Pro et Nano Banana 2. Les temps de calcul sont plus longs, mais le contrôle est vraiment fin. On peut même donner jusqu'à plusieurs images de référence pour guider la génération.

---

J'ai aussi créé un système de prompt avancé avec un nuage de mots (tag cloud). Chaque mot ou groupe de mots peut être activé ou désactivé individuellement. L'intérêt : on peut adapter le prompt en fonction du point de vue d'où on se place, sans tout réécrire à chaque fois.

L'add-on propose aussi un workflow complet de texturing multi-vues : on place le modèle sous plusieurs angles, l'IA génère une texture pour tous les points de vue d'un coup, et on assemble le tout avec des masques d'occlusion et des sliders d'intensité par vue. J'ai pu tester ça sur [KESH pour Ashenmoor](/lab/2026-03-02-ashenmoor-kesh).

<img src="/images/td-v2-panel-global.png" alt="Panel Global Texture — workflow multi-vues en 5 étapes" style="max-width: 50%;" />

---

Le prototype tourne. Pour l'instant je l'utilise moi-même sur mes projets pour voir si tout fonctionne bien.

→ Voir aussi : [Texture Diffusion v1](/projects/texture-diffusion)
