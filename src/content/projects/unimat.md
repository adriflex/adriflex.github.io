---
title: "UniMat"
description: "Bake et unification de matériaux en un clic dans Blender. Transforme une collection multi-matériaux en un seul matériau optimisé pour l'export."
date: 2025-06-01
tags: [blender, addon, materials, workflow]
featured: false
color: "#1d4ed8"
status: wip
cover: "/images/unimat-cover.png"
---

**UniMat** est un add-on Blender qui résout un problème récurrent dans les workflows Blender → moteur de jeu : l'export multi-matériaux.

En un clic, UniMat bake tous les matériaux d'une collection, les unifie en un seul matériau avec atlas UV, et permet de switcher entre le mode procédural (éditable dans Blender) et le mode unifié (optimisé pour l'export). Tout reste non-destructif — le switch est réversible à tout moment.

Conçu à l'origine pour des pipelines Blender → Godot, il s'applique à n'importe quel workflow nécessitant une réduction du nombre de draw calls sans perdre l'éditabilité dans Blender.

*(En cours de finalisation.)*
