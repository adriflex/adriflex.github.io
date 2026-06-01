---
title: "Phish at Sphere Las Vegas"
description: "Travail 3D pour Golden Wolf sur les visuels de Phish at Sphere Las Vegas."
date: 2026-06-01
tags: [3d, blender, animation, client, geometry-nodes]
featured: true
color: "#6D4CFF"
status: published
cover: "/images/phish-sphere-castle-hero.jpg"
coverFull: true
---

J'ai travaillé avec **Golden Wolf** sur une série de visuels créés pour **Phish at Sphere Las Vegas**, en collaboration avec **Moment Factory**.

Le projet était assez particulier à aborder : tout était pensé pour la Sphere, donc pour un écran gigantesque, courbe, immersif, et visible par toute la salle. Les éléments devaient être lisibles à grande échelle, tout en gardant assez de vie et de détails pour accompagner le concert.

Pour donner une idée de l'échelle, je parle bien ici de **l'écran intérieur de la salle**, pas de l'Exosphere extérieure : environ **15 000 m²**, jusqu'à **73 m** de haut, en **16K x 16K**.

Sur cette mission, j'ai travaillé comme **artiste 3D généraliste**, principalement dans Blender : modélisation, rigging, animation, shading, setups procéduraux et recherche de line art pour garder un rendu 2D / dessiné à la main.

<div style="aspect-ratio: 16 / 9; margin: 1.75rem 0 2.25rem; border: 2px solid #001858; overflow: hidden; background: #001858;">
  <iframe
    src="https://www.youtube.com/embed/5VdVXbZrpNo"
    title="Phish at Sphere Las Vegas - 3D Work for Golden Wolf"
    width="100%"
    height="100%"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowfullscreen
  ></iframe>
</div>

## La scène du château

Ma contribution principale était autour de la scène du château.

J'ai travaillé sur plusieurs éléments de cette séquence : le château, les rochers flottants, le livre, les chaînes, les tentacules et une partie de l'animation globale de la scène. L'objectif était de produire un rendu dessiné, presque 2D, tout en construisant les éléments en 3D pour pouvoir les animer et les contrôler proprement.

<figure style="margin: 1.75rem 0 2.25rem;">
  <video
    src="/images/phish-sphere-castle-loop.webm"
    autoplay
    loop
    muted
    playsinline
    style="width: 100%; border: 2px solid #001858; display: block;"
  ></video>
  <figcaption style="font-size: 12px; line-height: 1.7; opacity: 0.62; margin-top: 0.65rem;">
    Scène du château : rochers flottants, livre, tentacules, chaînes et éléments 3D animés dans Blender.
  </figcaption>
</figure>

Une partie du travail venait aussi de systèmes que j'avais déjà l'habitude de développer : des outils procéduraux pour générer des rochers, des falaises ou des formes d'îles flottantes assez vite, tout en gardant la main sur le style.

## Chaînes et rig procédural

Les chaînes reposaient sur un setup Geometry Nodes qui dupliquait des maillons le long d'une curve.

J'avais mis en place deux modes. Le premier permettait de générer rapidement une chaîne suspendue, avec une longueur, une courbure et une orientation contrôlables. Le second passait par une chaîne de bones et des contrôleurs, pour pouvoir diriger le mouvement plus précisément dans les plans.

<figure style="margin: 1.75rem 0 2.25rem;">
  <video
    src="/images/phish-sphere-chains-loop.webm"
    autoplay
    loop
    muted
    playsinline
    style="width: 100%; border: 2px solid #001858; display: block;"
  ></video>
  <figcaption style="font-size: 12px; line-height: 1.7; opacity: 0.62; margin-top: 0.65rem;">
    Transitions de chaînes 3D, construites avec Geometry Nodes et animées avec des contrôleurs.
  </figcaption>
</figure>

Les tentacules utilisaient aussi une chaîne de bones avec des contrôleurs. Leur fabrication demandait une petite astuce en plus : si les pics étaient simplement déformés avec le corps, ils perdaient leur orientation et ne collaient plus au design. J'ai donc animé le corps séparément, puis instancié les pics le long de la forme déformée, avec un transfert de shading pour garder une surface propre.

## Produire un rendu dessiné

Le projet avait une direction graphique très illustrée. Une grosse partie du travail consistait donc à faire oublier que certains éléments étaient en 3D.

J'ai testé plusieurs approches de line art dans Blender : des arêtes transformées en tubes via Geometry Nodes, le modifieur Line Art pour générer du Grease Pencil depuis une caméra, et une technique plus classique d'outline avec un mesh dupliqué et retourné.

Chaque méthode avait ses avantages selon les plans. Le but restait le même : garder la souplesse de la 3D, mais avec une image qui reste proche d'un dessin animé à la main.

## Îles flottantes

J'ai aussi travaillé sur des îles flottantes visibles dans d'autres séquences. Ces scènes étaient construites par plusieurs artistes, donc mon rôle était surtout de fournir des éléments 3D lisibles, stylisés et cohérents avec le reste de l'univers.

<figure style="margin: 1.75rem 0 2.25rem;">
  <video
    src="/images/phish-sphere-floating-islands-loop.webm"
    autoplay
    loop
    muted
    playsinline
    style="width: 100%; border: 2px solid #001858; display: block;"
  ></video>
  <figcaption style="font-size: 12px; line-height: 1.7; opacity: 0.62; margin-top: 0.65rem;">
    Îles flottantes créées dans Blender pour une des séquences Gamehendge.
  </figcaption>
</figure>

<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 12px; margin: 1.5rem 0 2.25rem;">
  <figure style="margin: 0;">
    <img src="/images/phish-sphere-skylands.webp" alt="Îles flottantes dans la Sphere" style="border: 2px solid #001858;" />
    <figcaption style="font-size: 12px; line-height: 1.7; opacity: 0.62; margin-top: 0.65rem;">
      Îles flottantes intégrées dans une séquence plus large.
    </figcaption>
  </figure>
  <figure style="margin: 0;">
    <img src="/images/phish-sphere-floating-islands.webp" alt="Séquence Gamehendge avec îles flottantes" style="border: 2px solid #001858;" />
    <figcaption style="font-size: 12px; line-height: 1.7; opacity: 0.62; margin-top: 0.65rem;">
      Assets d'îles flottantes dans le décor du concert.
    </figcaption>
  </figure>
</div>

![Phish Sphere exterior](/images/phish-sphere-exterior.webp)

La Sphere donne une échelle assez rare à ce type de travail. Un petit élément 3D peut se retrouver projeté sur une surface immense, devant une salle entière. Il fallait donc penser les scènes en fonction du point de vue du spectateur, tout en gardant chaque zone de l'écran animée et bien composée.

## Crédits

**Projet :** Phish at Sphere Las Vegas  
**Client :** Golden Wolf / Moment Factory / Sphere  
**Rôle :** 3D Artist / 3D Generalist  
**Outils :** Blender, Geometry Nodes, Grease Pencil, Line Art, Texture Diffusion

Merci à l'équipe Golden Wolf pour la confiance. C'était un projet très particulier à fabriquer : étrange, coloré, technique, et pensé pour un écran qui ne ressemble à aucun autre.
