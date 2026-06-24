---
title: "Kiln"
description: "A Blender addon that bakes procedural materials into export-ready texture sets for GLB/GLTF pipelines."
date: 2026-05-21
tags: [blender, addon, godot, 3d, texturing, jeu]
featured: false
color: "#1d4ed8"
status: published
cover: "/images/kiln-cover-current.png"
coverFull: true
---

Kiln is a Blender addon for baking procedural Principled BSDF materials into export-ready texture sets.

I built it for my own Godot work. The problem was simple: procedural Blender materials look great in Blender, then the node tree disappears when you export to GLB. Every iteration meant unwrapping UVs, baking maps, renaming images, rebuilding a simplified material, and checking the result in the engine.

Kiln handles that boring part.

<div style="display:flex; flex-wrap:wrap; gap:12px; margin: 1.5rem 0 2rem 0;">
  <a href="https://superhivemarket.com/products/kiln" style="display:inline-flex; align-items:center; justify-content:center; padding: 0.75rem 1.1rem; background:#F582AE; color:#001858; border:2px solid #001858; font-family:Silkscreen, sans-serif; font-size:16px; text-decoration:none;">Buy on Superhive</a>
  <a href="https://adriflex.gumroad.com/l/kiln" style="display:inline-flex; align-items:center; justify-content:center; padding: 0.75rem 1.1rem; background:#8BD3DD; color:#001858; border:2px solid #001858; font-family:Silkscreen, sans-serif; font-size:16px; text-decoration:none;">Buy on Gumroad</a>
  <a href="https://www.youtube.com/watch?v=3BmM6CRAbRA" style="display:inline-flex; align-items:center; justify-content:center; padding: 0.75rem 1.1rem; background:#FFFFFE; color:#001858; border:2px solid #001858; font-family:Silkscreen, sans-serif; font-size:16px; text-decoration:none;">Watch demo</a>
</div>

## What Kiln Does

Select a source collection, choose the maps you want, then click **Bake Kiln**.

Kiln creates a separate `[YourCollection]_Kiln` collection with baked PBR materials. Your source collection is never modified, so you can rebake when the material changes and keep the export settings on the `_Kiln` collection between passes.

![Bake procedural materials into export-ready textures](/images/kiln-carousel-01.png)

The output is meant for GLB/GLTF pipelines: Godot, Unity, web builds, or any workflow where the final asset needs image textures instead of a procedural node tree.

## The Basic Workflow

1. Select your source collection.
2. Pick which maps to bake: Color, Roughness, Metallic, Normal, Alpha.
3. Set resolution per map, from 128px to 4096px.
4. Click **Bake Kiln**.
5. Export the `_Kiln` collection with Blender's native GLB/GLTF exporter.

![Kiln creates a separate baked collection](/images/kiln-carousel-02.png)

I kept GLB export outside the addon on purpose. Blender already has a solid exporter, and Kiln's job is to make sure the collection you send to it is clean.

## Materials, UVs and validation

Kiln works with Principled BSDF materials. Other shader setups are detected and reported, but not baked.

The main bake panel keeps the common decisions in one place: map selection, per-map resolution, bake options, naming, UV settings, bake status and validation.

![Kiln bake panel and validator](/images/kiln-carousel-04.png)

For UVs, there are three modes:

- **Smart UV Project** for quick automatic unwraps.
- **Existing Seams** when you already marked the useful cuts.
- **Existing UV** when you want Kiln to use your own UV map as-is.

![Kiln UV methods](/images/kiln-carousel-05.png)

The validator checks the source collection before you bake: unapplied transforms, missing materials, non-Principled shaders, and the usual little problems that only become annoying after export.

## Split Bake

Kiln 0.3 added the feature people kept asking for: **Split Bake**.

Before, one collection produced one baked material and one texture set. Now you can split a single bake into several texture sets in one pass:

- **By Material** - one set per unique material name.
- **By Material Index** - one set per material slot, useful for some Geometry Nodes setups.
- **By Object** - one set per object in the collection.
- **By Mesh Island** - connected mesh islands are grouped into a chosen number of sets, balanced by area.
- **By UDIM** - one set per existing UDIM tile.

Each group becomes a separate mesh in the `_Kiln` collection, with its own material, UVs, and images. The engine side stays clean.

<div style="aspect-ratio: 16 / 9; margin: 1.5rem 0; border: 2px solid #001858; overflow: hidden;">
  <iframe
    src="https://www.youtube.com/embed/FVdZ3VVGG4Y"
    title="Kiln Split Bake update"
    width="100%"
    height="100%"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowfullscreen
  ></iframe>
</div>

The same update also added **Image Filter** options for baked image nodes and a **Bake Preview** that shows how many textures Kiln will generate before you start the bake.

## Demo

This video shows the original workflow, from procedural Blender materials to a GLB imported in Godot.

<div style="aspect-ratio: 16 / 9; margin: 1.5rem 0; border: 2px solid #001858; overflow: hidden;">
  <iframe
    src="https://www.youtube.com/embed/3BmM6CRAbRA"
    title="Kiln workflow demo"
    width="100%"
    height="100%"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowfullscreen
  ></iframe>
</div>

## Availability

Kiln is available on Superhive and Gumroad for $12.

Superhive is the best option if you prefer the Blender marketplace ecosystem. Gumroad is there for direct checkout.

<div style="display:flex; flex-wrap:wrap; gap:12px; margin: 1.5rem 0 2rem 0;">
  <a href="https://superhivemarket.com/products/kiln" style="display:inline-flex; align-items:center; justify-content:center; padding: 0.75rem 1.1rem; background:#F582AE; color:#001858; border:2px solid #001858; font-family:Silkscreen, sans-serif; font-size:16px; text-decoration:none;">Buy on Superhive</a>
  <a href="https://adriflex.gumroad.com/l/kiln" style="display:inline-flex; align-items:center; justify-content:center; padding: 0.75rem 1.1rem; background:#8BD3DD; color:#001858; border:2px solid #001858; font-family:Silkscreen, sans-serif; font-size:16px; text-decoration:none;">Buy on Gumroad</a>
</div>

## Notes

Kiln is an evolution of [UniMat](/lab/unimat), an earlier experiment around the same problem. UniMat proved the workflow was useful, but its architecture was too fragile. Kiln is the rebuilt, published version.

I also use it in my own game pipeline, including [Orb of Avarice](/projects/orb-of-avarice), [Ashenmoor - KESH takes shape](/lab/2026-03-02-ashenmoor-kesh) and [Bordeciel](/lab/2026-06-15-bordeciel).

The public release thread and update notes are on [Blender Artists](https://blenderartists.org/t/kiln-bake-procedural-materials-for-glb-export-godot-unity-web/1636275).
