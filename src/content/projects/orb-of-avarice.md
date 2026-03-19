---
title: "Orb of Avarice"
description: "Mini-jeu de donjon. Protège ton trésor en écrasant les intrus avec une grosse sphère métallique."
date: 2026-03-01
tags: [jeu, godot, 3d, humour-noir]
featured: true
color: "#c0392b"
link: "https://adriflex.itch.io/orb-of-avarice"
ctaLabel: "Jouer sur itch.io ↗"
status: published
cover: "/images/orb-of-avarice.png"
---

À la base, c'était un exercice pour apprendre Godot. Une sphère, un donjon, des ennemis à écraser. Le truc a pris forme.

Le pitch : ton trésor est attaqué par des intrus. Ta seule arme, une immense sphère métallique. Tu écrases tout ce qui bouge.

<div style="position:relative;padding-bottom:56.25%;height:0;overflow:hidden;margin:2rem 0;border-radius:2px;border:2px solid #001858;">
<iframe src="https://www.youtube.com/embed/cFkdmPCCXm4" style="position:absolute;top:0;left:0;width:100%;height:100%;border:0;" allow="accelerometer;autoplay;clipboard-write;encrypted-media;gyroscope;picture-in-picture" allowfullscreen></iframe>
</div>

La caméra tourne librement autour de l'arène. On peut détruire les coffres pour récupérer les pièces avant les voleurs.

![Gameplay — l'Orbe dans le donjon](/images/orb-gameplay-01.png)

Le donjon est modélisé dans Blender avec des Geometry Nodes, baké, exporté en GLB vers Godot. Le pipeline est rapide : je peux itérer entre la 3D et le jeu sans friction. Depuis la première version, j'ai retravaillé les graphismes pas mal.

![L'Orbe écrase les intrus dans la tour](/images/orb-gameplay-02.png)

À la fin du niveau, un écran de score te propose de capturer ton résultat pour le partager. **#IM_THE_ORB**

![Écran Game Over — partage ton score](/images/orb-gameover.png)

<a href="https://adriflex.itch.io/orb-of-avarice" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-2 px-6 py-3 bg-accent font-display px-font text-[16px] rounded-[2px] transition-all duration-200 hover:shadow-[4px_4px_0_rgba(139,211,221,0.3)] hover:-translate-y-0.5 no-underline hover:no-underline mt-4 mb-2" style="color: #001858 !important; text-decoration: none !important;">Jouer sur itch.io ↗</a>
