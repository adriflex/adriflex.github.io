---
title: "Texture Diffusion v1"
description: "Add-on Blender qui utilise les normal maps du modèle 3D pour guider la génération IA et texturer l'objet entier."
date: 2023-06-01
tags: [blender, outil, ia, 3d]
featured: false
color: "#7c3aed"
status: published
link: "https://superhivemarket.com/products/textures-diffusion"
ctaLabel: "Voir sur SuperHive Market ↗"
cover: "/images/texture-diffusion-cover.png"
---

La première version de Texture Diffusion. L'idée : utiliser la géométrie 3D d'un modèle Blender pour guider Stable Diffusion et générer une texture complète de l'objet.

Le workflow repose sur les normal maps. L'add-on rend les normales du modèle sous différents angles, les envoie à ControlNet comme guide de génération, et récupère les résultats pour les remapper proprement sur le mesh. C'est la forme 3D qui contraint l'IA, pas l'inverse.

![Le pipeline Texture Diffusion — des normales au texturing final](/images/texture-diffusion-workflow.png)

![Normal maps → texturing IA — exemple sur un modèle de rats](/images/texture-diffusion-rats.png)

Ça a été conçu au moment où Stable Diffusion et ControlNet débarquaient. À l'époque, l'idée de laisser la géométrie guider la génération n'était pas encore répandue. L'add-on tourne avec ComfyUI ou n'importe quel backend Stable Diffusion compatible ControlNet.

![Résultat sur un visage — détails de peau générés à partir des normales](/images/texture-diffusion-face.png)

Distribué sur Blender Market et Gumroad, avec 44 ventes et quasi aucun marketing.

[Documentation complète](https://adriflex.gitbook.io/textures-diffusion) — [Code source](https://github.com/adriflex/Textures_diffusion) — [Thread Blender Artists](https://blenderartists.org/t/textures-diffusion-a-tool-for-high-quality-texturing-with-stable-diffusion/1488263)
