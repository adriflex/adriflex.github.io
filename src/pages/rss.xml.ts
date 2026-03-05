import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';

export async function GET(context: APIContext) {
  const projects = await getCollection('projects', p => p.data.status === 'published');
  const lab = await getCollection('lab');

  const allItems = [
    ...projects.map(p => ({
      title: p.data.title,
      pubDate: p.data.date,
      description: p.data.description,
      link: `/projects/${p.id.replace(/\.md$/, '')}`,
    })),
    ...lab.map(p => ({
      title: p.data.title,
      pubDate: p.data.date,
      description: p.data.title,
      link: `/lab/${p.id.replace(/\.md$/, '')}`,
    })),
  ].sort((a, b) => b.pubDate.valueOf() - a.pubDate.valueOf());

  return rss({
    title: 'Adrien Rouquié — Projets & Lab',
    description: 'Nouveaux projets, devlogs et expérimentations.',
    site: context.site!,
    items: allItems,
  });
}
