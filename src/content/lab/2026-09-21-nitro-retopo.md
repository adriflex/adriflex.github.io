---
title: "Nitro Retopo: segment, repair and redraw topology in Blender"
date: 2026-09-21
tags: [blender, addon, retopology, 3d, tools]
cover: "/images/nitro-retopo-knight.png"
coverFull: true
status: published
---

I've been turning some long-standing needs from my work as a 3D character artist into a Blender addon. **Nitro Retopo is now available on SuperHive.**

The starting point is a familiar problem: I like a model's shape, but its geometry makes it difficult to keep working on. Parts are fused together, the mesh is dense, and editing one area can mean spending a lot of time preparing it first.

Nitro Retopo brings segmentation, mesh repair and retopology into the same workflow. I draw boundaries on the surface, separate the parts I want to work on, repair openings and draw new topology, choosing how it flows inside each patch.

The idea is to define whole regions with a few strokes, while keeping control over the result. It is useful for dense meshes from sculpting, 3D scans and AI generation.

## Trying it on a character

I've been using it on an AI-generated knight, working on individual parts down to separate hair strands. The image below shows the character and its topology.

![Knight used to demonstrate Nitro Retopo, with its topology visible](/images/nitro-retopo-knight.png)

I developed the addon with substantial help from AI coding tools, shaping and testing the workflow through my own 3D work. The artist still decides how to divide the surface and where further editing is needed for the intended use.

<!-- Add the approved Nitro Retopo demo here when its YouTube URL is available. -->

## Available on SuperHive

Nitro Retopo is available for **Blender 5.2 and newer**. The product page includes the tool overview and installation guide.

[Discover Nitro Retopo on SuperHive](https://superhivemarket.com/products/nitro-retopo)
