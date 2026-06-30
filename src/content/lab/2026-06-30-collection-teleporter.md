---
title: "Collection Teleporter: a Blender addon for scenes that got too big"
date: 2026-06-30
tags: [blender, addon, pipeline, 3d, tools]
cover: "/images/collection-teleporter-hero.webp"
coverFull: true
status: published
---

Collection Teleporter is a Blender addon I made to move collections between `.blend` files without breaking the way I like to work.

The basic idea is simple: build in context, dispatch when ready, edit in place.

I can export any local collection into a source file when I want to separate it. If a collection is already linked, I can open its source scene, reload its library, or make it editable in place without manually hunting through folders.

I built it because my personal Blender scenes kept reaching that annoying point where everything was still useful in context, but the file itself was getting too heavy and messy to stay comfortable.

<div id="full-tutorial" style="aspect-ratio: 16 / 9; margin: 1.5rem 0 1.5rem; border: 2px solid #001858; overflow: hidden;">
  <iframe
    src="https://www.youtube.com/embed/UEs9F5pETdo"
    title="Collection Teleporter full tutorial"
    width="100%"
    height="100%"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowfullscreen
  ></iframe>
</div>

<div style="display:flex; flex-wrap:wrap; gap:12px; margin: 1.5rem 0 2rem 0;">
  <a href="https://superhivemarket.com/products/collection-teleporter" style="display:inline-flex; align-items:center; justify-content:center; padding: 0.75rem 1.1rem; background:#F582AE; color:#001858; border:2px solid #001858; font-family:Silkscreen, sans-serif; font-size:16px; text-decoration:none;">Buy on SuperHive</a>
</div>

## Quick Demo

The short demo shows the basic loop: send a collection out, keep it linked in the scene, then edit it in place when it needs to change.

<div id="short-demo" style="aspect-ratio: 4 / 5; max-width: 520px; margin: 1.5rem auto 2rem; border: 2px solid #001858; overflow: hidden;">
  <iframe
    src="https://www.youtube.com/embed/Inb9vEyvxfk"
    title="Collection Teleporter short demo"
    width="100%"
    height="100%"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowfullscreen
  ></iframe>
</div>

## Menu And Shortcut

Collection Teleporter lives in the viewport context menu, with the main menu available through `Ctrl+Alt+M`.

![Collection Teleporter menu and export popup](/images/collection-teleporter-menus.webp)

## Export And Link Back

![Collection Teleporter export and link back workflow](/images/collection-teleporter-dispatch.webp)

The main command is **Export and Link Back**. You pick a collection, choose a destination, and Collection Teleporter writes it into an external `.blend` file.

In the original scene, the local collection is replaced by a linked instance at the same position. The scene still looks the same. The difference is that this part of the project now lives in its own source file.

## Edit Linked Collections In Place

![A linked collection made editable in context](/images/collection-teleporter-edit.webp)

Linked collections are great until you need to change them.

Normally, that means opening the source file, guessing the context, making the edit, saving, going back to the main scene, and checking if it still works.

Collection Teleporter gives you a shorter path. **Edit Linked Collection** makes the selected linked asset editable directly in the current scene. When the edit is done, **Export and Link Back** sends it back to its source and restores the linked version in place.

That is where the addon starts to feel useful. I can keep the asset external without treating every small change like a pipeline task.

## Backups At Collection Scale

![Collection Teleporter backup and archive workflow](/images/collection-teleporter-backups.webp)

When **Export and Link Back** replaces an existing collection in a source file, Collection Teleporter creates a backup first by default.

There is also a manual **Backup Collection** command. It works on any collection, even outside the full linkback workflow.

That means I can keep versions while modeling without incrementing the whole Blender file every time. The snapshot happens at collection scale, so I can save the asset I am working on without turning the folder into `scene_v12_final_really_final.blend`.

## Small Workflow Helpers

![Collection Teleporter asset origin and cursor workflow](/images/collection-teleporter-origin.webp)

I also added a few small helpers around the main workflow.

- **Create New Collection from Selection** lets me select objects and turn them into a real scene collection with `Ctrl+G`.
- **Clean Selected Names** removes Blender's `.001` suffixes from selected objects and can rename single-user meshes to match their objects.

Not the headline feature, but exactly the kind of thing I wanted close to the same menu.

## Visual Direction And Motion Design

![Collection Teleporter operating manual style scene](/images/collection-teleporter-scene.webp)

Collection Teleporter is a fairly abstract tool. It moves collections between Blender files, keeps linked instances in place, and lets you edit them later. That is not the easiest thing to communicate with one screenshot.

So I used the launch as an excuse to work on the presentation too: graphic design, small motion pieces, cleaner diagrams, and a visual language that makes the workflow easier to understand.

The point was simple: make a technical workflow easier to read, and a little more fun to look at.

## Availability

Collection Teleporter is available on SuperHive for Blender 5.1 and newer.

The launch price is $15 for the first 14 days, then it goes to $24.

<div style="display:flex; flex-wrap:wrap; gap:12px; margin: 1.5rem 0 2rem 0;">
  <a href="https://superhivemarket.com/products/collection-teleporter" style="display:inline-flex; align-items:center; justify-content:center; padding: 0.75rem 1.1rem; background:#F582AE; color:#001858; border:2px solid #001858; font-family:Silkscreen, sans-serif; font-size:16px; text-decoration:none;">Get Collection Teleporter</a>
  <a href="#full-tutorial" style="display:inline-flex; align-items:center; justify-content:center; padding: 0.75rem 1.1rem; background:#FFFFFE; color:#001858; border:2px solid #001858; font-family:Silkscreen, sans-serif; font-size:16px; text-decoration:none;">Watch the tutorial first</a>
</div>

I built it for my own Blender scenes first, especially for personal game projects like [Bordeciel](/lab/2026-06-15-bordeciel) and [Ashenmoor](/lab/ashenmoor).

If your Blender files also start clean and slowly turn into one giant source scene, it might be your kind of tool too.
