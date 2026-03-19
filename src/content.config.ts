import { defineCollection, z } from 'astro:content';

const projects = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.date(),
    tags: z.array(z.string()).default([]),
    cover: z.string().optional(),
    featured: z.boolean().default(false),
    link: z.string().optional(),
    ctaLabel: z.string().optional(),
    pdf: z.string().optional(),
    pdfDownload: z.string().optional(),
    status: z.enum(['published', 'wip', 'archived']).default('published'),
    color: z.string().default('#f0a500'),
    coverFull: z.boolean().default(true),
  }),
});

const lab = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.date(),
    tags: z.array(z.string()).default([]),
    cover: z.string().optional(),
    coverPosition: z.string().default('center'),
    coverFull: z.boolean().default(true),
  }),
});

export const collections = { projects, lab };
