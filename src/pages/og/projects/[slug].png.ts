import type { APIRoute, GetStaticPaths } from 'astro';
import { getCollection } from 'astro:content';
import { generateOgImage } from '../../../lib/og-template';

export const getStaticPaths: GetStaticPaths = async () => {
  const projects = await getCollection('projects');
  return projects.map((entry) => ({
    params: { slug: entry.id.replace(/\.md$/, '') },
    props: { entry },
  }));
};

export const GET: APIRoute = async ({ props }) => {
  const { entry } = props as any;
  const png = await generateOgImage({
    title: entry.data.title,
    description: entry.data.description,
    tags: entry.data.tags,
    cover: entry.data.cover,
    status: entry.data.status,
    type: 'project',
  });

  return new Response(png, {
    headers: { 'Content-Type': 'image/png' },
  });
};
