---
title: "Bordeciel — Bordeaux dans les nuages"
date: 2026-06-15
tags: [univers, godot, blender, 3d, jeu, texturing]
cover: "/images/bordeciel-main.jpg"
---

Bordeciel est un projet personnel dans Godot : une ville volante inspirée de Bordeaux.

Je l'ai commencé comme un exercice de level design. Construire une zone, marcher dedans, tester les volumes, les rues, les points de vue. Puis le projet a glissé vers quelque chose de plus personnel : une version suspendue de Bordeaux, vue à travers mes souvenirs de sorties en ville, les façades de pierre, les cafés, la Garonne et cette sensation de décor immense quand on arrive depuis la campagne.

Je ne cherche pas à refaire Bordeaux bâtiment par bâtiment. Je pars plutôt de ce que la ville m'évoque : les façades claires, les reflets dans l'eau, la sensation d'une grande sortie en ville. Dans Bordeciel, les bâtiments sont suspendus dans le ciel, les façades se prolongent sous les plateformes comme des reflets, et la campagne reste visible très loin en dessous.

![Vue globale de Bordeciel dans Godot](/images/bordeciel-global-01.webp)

![Plan de travail et références du premier blockout Bordeciel](/images/bordeciel-moodboard-leveldesign.webp)

Le projet est encore en WIP, et c'est assumé. Certaines parties sont encore en blockout, d'autres commencent à trouver leur forme. Pour l'instant, l'objectif est simple : faire exister le lieu, comprendre comment on s'y déplace, et garder assez d'espace pour que l'imaginaire respire.

![Vue depuis une terrasse vers la campagne sous la ville](/images/bordeciel-aerial-view.webp)

## Construire une ville explorable

La prochaine étape sera de donner une raison plus claire d'explorer. J'aimerais partir sur une petite boucle très bordelaise : chercher des canelés cachés, trouver des clés, ouvrir certaines portes, tomber sur des passages et des recoins un peu absurdes.

Ce n'est pas encore fait. Pour l'instant, c'est la direction de gameplay. Bordeciel doit rester un endroit où l'on se promène, où l'on regarde, et où la curiosité suffit à tirer le joueur vers le prochain coin de rue.

![Une zone de café / place encore en blockout](/images/bordeciel-cafe-square-01.webp)

![Une entrée de rue suspendue sous les bâtiments](/images/bordeciel-entrance-05.webp)

## Le bateau volant

Le bateau volant est venu d'un croisement assez naturel : Bordeaux, la Garonne, le ciel comme une mer immense, et une maquette d'ancien bateau vue au Musée d'Aquitaine.

Je l'ai modélisé et texturé dans Blender, puis importé dans Godot comme asset game-ready. C'est aussi le premier élément de Bordeciel que je publie à part, en modèle 3D consultable directement dans le navigateur.

J'ai aussi enregistré une bonne partie de la modélisation. Un timelapse du bateau est en cours de préparation.

<div style="aspect-ratio: 4 / 3; margin: 1.75rem 0 2.25rem; border: 2px solid #001858; overflow: hidden; background: #001858;">
  <iframe
    title="Bordeciel - Flying Garonne Boat"
    src="https://sketchfab.com/models/0e164bcf16ef462bb839123c5d608b55/embed"
    width="100%"
    height="100%"
    frameborder="0"
    allow="autoplay; fullscreen; xr-spatial-tracking"
    allowfullscreen
    mozallowfullscreen="true"
    webkitallowfullscreen="true"
    xr-spatial-tracking
    execution-while-out-of-viewport
    execution-while-not-rendered
    web-share
  ></iframe>
</div>

Lien direct : [Bordeciel - Flying Garonne Boat sur Sketchfab](https://skfb.ly/pKXPP)

## Références, IA et props

Pour les props, je ne cherche pas à laisser l'IA choisir le design à ma place. Je l'utilise plutôt comme un outil de concept rapide.

Par exemple, pour les lampadaires, je pars de photos et de références bordelaises, puis je nourris l'IA avec cette matière pour obtenir des concepts plus lisibles. Ensuite je peux m'en servir comme base de modélisation. C'est une étape intermédiaire : plus claire qu'un tas de photos, mais encore assez libre pour être reconstruite à la main.

![Concepts de lampadaires pour Bordeciel](/images/bordeciel-lampadaires.webp)

## Une campagne vue du ciel

La texture de campagne sous la ville a été un bon cas d'usage pour [PATINA](https://blog.fal.ai/introducing-patina/), le modèle de fal.ai dédié à la génération de matériaux PBR. De mon côté, j'ai commencé à en faire un plugin Blender : on lance la génération depuis Blender, puis l'outil reconstruit un matériau natif avec les maps PBR connectées au bon endroit. (plugin bientôt disponible)

Au départ, j'ai essayé de fabriquer cette vue aérienne en procédural. J'avais un résultat intéressant, mais pas au niveau que je voulais. Trouver une image existante sur internet était presque impossible aussi : trop spécifique, pas la bonne échelle, pas la bonne direction artistique.

Ici, l'IA ne remplace pas juste une tâche existante. Elle rend possible une image que je ne voyais pas vraiment comment produire autrement sans y passer beaucoup trop de temps.

![Texture de campagne vue du ciel générée avec PATINA](/images/bordeciel-skyview-texture.webp)

## Mes outils utilisés sur ce projet

Bordeciel me sert aussi de test grandeur nature pour mes outils Blender -> Godot. Le problème est très concret : si chaque correction demande dix manipulations, on finit par ne plus revenir dans le projet.

Bordeciel était devenu une grosse scène Blender un peu lourde, avec beaucoup de setdress et d'assets mélangés. J'ai donc commencé à structurer mon propre pipeline autour de plusieurs outils maison que j'ai créés pour mes projets.

<div style="display: flex; flex-direction: column; gap: 12px; margin: 1.25rem 0 1.75rem;">
  <div style="border: 2px solid rgba(0, 24, 88, 0.35); padding: 14px; background: rgba(255, 255, 254, 0.55); color: #172C66;">
    <div style="display: flex; justify-content: space-between; gap: 12px; align-items: baseline; flex-wrap: wrap;">
      <strong>Collection Teleporter</strong>
      <span style="font-size: 10px; letter-spacing: 0.04em; text-transform: uppercase; border: 1px solid rgba(0, 24, 88, 0.35); padding: 2px 6px;">bientôt</span>
    </div>
    <span style="font-size: 12px; line-height: 1.6;">Mon outil de progressive asset extraction : construire dans le contexte, envoyer une collection dans son propre fichier `.blend`, puis la retravailler sur place quand il faut.</span>
  </div>
</div>

<div style="display: flex; flex-direction: column; gap: 12px; margin: 1.25rem 0 1.75rem;">
  <div style="border: 2px solid rgba(0, 24, 88, 0.35); padding: 14px; background: rgba(255, 255, 254, 0.55); color: #172C66;">
    <div style="display: flex; justify-content: space-between; gap: 12px; align-items: baseline; flex-wrap: wrap;">
      <strong>Godot Flex Bridge</strong>
      <span style="font-size: 10px; letter-spacing: 0.04em; text-transform: uppercase; border: 1px solid rgba(0, 24, 88, 0.35); padding: 2px 6px;">bientôt</span>
    </div>
    <span style="font-size: 12px; line-height: 1.6;">Mon outil de pipeline pour exporter le setdress Blender sans l'aplatir, puis reconstruire dans Godot les instances, scènes et GLB correspondants.</span>
  </div>
</div>

<div style="display: flex; flex-direction: column; gap: 12px; margin: 1.25rem 0 1.75rem;">
  <a href="https://superhivemarket.com/products/kiln" style="display: block; border: 2px solid #001858; padding: 14px; text-decoration: none; background: #fffffe; color: #001858;">
    <div style="display: flex; justify-content: space-between; gap: 12px; align-items: baseline; flex-wrap: wrap;">
      <strong>Kiln</strong>
      <span style="font-size: 10px; letter-spacing: 0.04em; text-transform: uppercase; color: #001858; border: 1px solid #001858; padding: 2px 6px;">disponible</span>
    </div>
    <span style="font-size: 12px; line-height: 1.6; color: #172C66;">Mon addon Blender pour garder la puissance des matériaux procéduraux, puis les baker en textures PBR prêtes pour le temps réel.</span>
  </a>
</div>

<div style="display: flex; flex-direction: column; gap: 12px; margin: 1.25rem 0 2.25rem;">
  <a href="https://fal.ai/models/fal-ai/patina/material" style="display: block; border: 2px solid #001858; padding: 14px; text-decoration: none; background: #fffffe; color: #001858;">
    <div style="display: flex; justify-content: space-between; gap: 12px; align-items: baseline; flex-wrap: wrap;">
      <strong>PATINA Blender Plugin</strong>
      <span style="font-size: 10px; letter-spacing: 0.04em; text-transform: uppercase; color: #001858; border: 1px solid #001858; padding: 2px 6px;">bientôt</span>
    </div>
    <span style="font-size: 12px; line-height: 1.6; color: #172C66;">Mon plugin pour utiliser le modèle PATINA de fal.ai dans Blender et connecter les maps PBR à un matériau Principled BSDF.</span>
  </a>
</div>

Avec cette structure, je peux ajouter une rue, isoler un asset, le modifier sur place, réexporter, et voir Godot reconstruire les instances. C'est ce qui me permet d'enrichir Bordeciel petit à petit sans transformer le projet en fichier impossible à maintenir.

Pour l'instant, Bordeciel est une base : une ville, un bateau, quelques outils, et une direction de jeu qui commence à se préciser. La suite sera moins de parler du projet, et plus de le rendre explorable.
