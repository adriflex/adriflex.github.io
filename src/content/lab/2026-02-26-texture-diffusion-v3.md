---
title: "Texture Diffusion v3 — reconstruire l'outil depuis zéro"
date: 2026-02-26
tags: [blender, addon, ia, wip]
cover: "/images/texture-diffusion-v3-cover.png"
---

J'ai vendu la première version de Texture Diffusion sur Blender Market il y a quelques années. L'idée de départ : utiliser les normales d'un modèle 3D comme guide pour Stable Diffusion, via ControlNet, et remapper automatiquement le résultat sur la géométrie. Ça fonctionnait. Les gens achetaient.

Puis j'ai tenté une v2 en mode "live paint" avec ComfyUI. L'outil capturait le viewport en temps réel, envoyait à ComfyUI, récupérait le résultat. En théorie, élégant. En pratique : communication asynchrone entre Blender et ComfyUI ingérable, installation cauchemardesque pour les utilisateurs, et l'IA évoluait trop vite pour que ça vaille le coup de finir. J'ai abandonné.

---

La v3 part d'une contrainte claire : **zéro dépendance locale**. Plus de Stable Diffusion en local, plus de ComfyUI, plus de GPU requis côté utilisateur. Tout passe par l'API [Replicate](https://replicate.com) — accès cloud à des dizaines de modèles, appel simple, résultat en quelques secondes.

Le pipeline se résume à une seule action :

1. Appuyer sur le raccourci dans Blender
2. Le viewport est capturé
3. L'image part sur les serveurs Replicate avec le prompt et la force img2img
4. Le résultat revient automatiquement configuré en **brosse stencil** dans Blender — prête à peindre

Capture → génère → peint. Sans quitter Blender. Sans toucher à un fichier.

---

Le prototype tourne. La mécanique de base est validée. Ce qui manque avant de sortir une version publique : peaufiner l'UX, écrire une documentation correcte, et faire une démo vidéo qui montre le workflow en action.

La vidéo est en cours.
