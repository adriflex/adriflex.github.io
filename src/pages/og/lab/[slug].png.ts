import type { APIRoute, GetStaticPaths } from 'astro';
import { getCollection } from 'astro:content';
import { generateOgImage } from '../../../lib/og-template';

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await getCollection('lab');
  return posts.map((entry) => ({
    params: { slug: entry.id.replace(/\.md$/, '') },
    props: { entry },
  }));
};

export const GET: APIRoute = async ({ props }) => {
  const { entry } = props as any;
  const png = await generateOgImage({
    title: entry.data.title,
    tags: entry.data.tags,
    cover: entry.data.cover,
    type: 'lab',
  });

  return new Response(png, {
    headers: { 'Content-Type': 'image/png' },
  });
};
