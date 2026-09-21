---
title: "Nitro Retopo: a different way to rework dense meshes"
date: 2026-09-21
tags: [blender, addon, retopology, 3d, tools]
cover: "/images/nitro-retopo-cover-005.png"
coverFull: true
coverAfterHeader: true
coverFit: contain
status: published
---

I've been turning some long-standing needs from my work as a 3D character artist into a Blender addon. **Nitro Retopo lets me separate parts of a dense mesh, repair them and draw new topology.**

The idea is simple: keep working on a shape I like, even when its geometry is difficult to edit. It works with dense meshes from sculpting, 3D scans and AI generation.

<div style="margin:1.25rem 0 1.5rem;">
  <a href="https://superhivemarket.com/products/nitro-retopo" style="display:inline-flex;align-items:center;justify-content:center;padding:0.85rem 1.2rem;background:#F582AE;color:#001858;border:2px solid #001858;box-shadow:4px 4px 0 #001858;font-family:Silkscreen,sans-serif;font-size:16px;text-decoration:none;">Get Nitro Retopo on SuperHive ↗</a>
</div>

## Draw the regions, choose the flow

I draw boundaries directly on the surface to divide it into patches. Curves, straight lines and freehand strokes let me describe the parts I want to work on.

<img src="/images/nitro-retopo-drawing.gif" alt="Drawing curved and straight boundaries on a mesh in Blender" width="960" height="610" loading="lazy" />

From there, I can separate pieces, fill openings or bridge boundaries. For retopology, I choose the corners and explore different patch layouts and orientations. A few strokes define whole regions while I keep control over the result.

<img src="/images/nitro-retopo-patterns.gif" alt="Switching between topology patterns, changing their orientation and adding an inset" width="960" height="610" loading="lazy" />

## Trying it on a character

I've been using Nitro Retopo on this AI-generated knight, working on individual parts down to separate hair strands. Here is the full character before and after, with its topology visible.

<img src="/images/nitro-retopo-knight.png" alt="Full knight before and after retopology, with the dense source on the left and new topology on the right" width="828" height="1101" loading="lazy" style="display:block;width:100%;max-width:480px;height:auto;margin:1.5rem auto;border:0;border-radius:0;background:transparent;box-shadow:none;" />

I developed the addon with substantial help from AI coding tools, shaping and testing the workflow through my own 3D work. Further editing depends on the model and what I want to use it for.

<!-- Add the approved Nitro Retopo demo here when its YouTube URL is available. -->

**Available for Blender 5.2 and newer.** The product page has the full tool overview and installation guide.

<div style="margin:1.5rem 0 2rem;">
  <a href="https://superhivemarket.com/products/nitro-retopo" style="display:inline-flex;align-items:center;justify-content:center;padding:0.85rem 1.2rem;background:#F582AE;color:#001858;border:2px solid #001858;box-shadow:4px 4px 0 #001858;font-family:Silkscreen,sans-serif;font-size:16px;text-decoration:none;">Get Nitro Retopo on SuperHive ↗</a>
</div>
