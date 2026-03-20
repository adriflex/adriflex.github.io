import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';
import fs from 'node:fs';
import path from 'node:path';

const silkscreenRegular = fs.readFileSync(
  path.resolve('src/assets/fonts/Silkscreen-Regular.ttf')
);
const silkscreenBold = fs.readFileSync(
  path.resolve('src/assets/fonts/Silkscreen-Bold.ttf')
);
const spaceMono = fs.readFileSync(
  path.resolve('src/assets/fonts/SpaceMono-Regular.ttf')
);

const FONTS = [
  { name: 'Silkscreen', data: silkscreenRegular, weight: 400 as const, style: 'normal' as const },
  { name: 'Silkscreen', data: silkscreenBold, weight: 700 as const, style: 'normal' as const },
  { name: 'Space Mono', data: spaceMono, weight: 400 as const, style: 'normal' as const },
];

const COLORS = {
  bg: '#FEF6E4',
  navy: '#001858',
  para: '#172C66',
  pink: '#F582AE',
  cyan: '#8BD3DD',
  peach: '#F3D2C1',
};

const BADGES: Record<string, { label: string; bg: string }> = {
  published: { label: 'Published', bg: COLORS.pink },
  wip: { label: 'WIP', bg: COLORS.cyan },
  archived: { label: 'Archived', bg: '#CCD0D8' },
  lab: { label: 'Lab', bg: COLORS.peach },
};

export interface OgData {
  title: string;
  description?: string;
  tags: string[];
  cover?: string;
  status?: string;
  type: 'project' | 'lab';
}

function loadCoverBase64(coverPath: string): string | undefined {
  try {
    const filePath = path.resolve('public', coverPath.replace(/^\//, ''));
    const buffer = fs.readFileSync(filePath);
    const ext = path.extname(filePath).replace('.', '');
    const mime = ext === 'jpg' ? 'image/jpeg' : `image/${ext}`;
    return `data:${mime};base64,${buffer.toString('base64')}`;
  } catch {
    return undefined;
  }
}

export async function generateOgImage(data: OgData): Promise<Buffer> {
  const coverDataUri = data.cover ? loadCoverBase64(data.cover) : undefined;
  const badgeKey = data.type === 'lab' ? 'lab' : (data.status || 'published');
  const badge = BADGES[badgeKey] || BADGES.published;

  const desc = data.description
    ? (data.description.length > 80 ? data.description.slice(0, 80) + '…' : data.description)
    : null;

  // Background: cover image or gradient fallback
  const backgroundChildren: any = coverDataUri
    ? {
        type: 'img',
        props: {
          src: coverDataUri,
          style: { width: '100%', height: '100%', objectFit: 'cover' as const },
        },
      }
    : '';

  const markup = {
    type: 'div',
    props: {
      style: {
        display: 'flex',
        flexDirection: 'column' as const,
        width: '1200px',
        height: '630px',
        fontFamily: 'Space Mono',
      },
      children: [
        // Top: cover image (~60%)
        {
          type: 'div',
          props: {
            style: {
              display: 'flex',
              width: '100%',
              height: '370px',
              ...(coverDataUri
                ? {}
                : { backgroundImage: `linear-gradient(135deg, ${COLORS.cyan} 0%, ${COLORS.pink} 100%)` }),
            },
            children: backgroundChildren,
          },
        },
        // Bottom: parchment band (~40%)
        {
          type: 'div',
          props: {
            style: {
              display: 'flex',
              flexDirection: 'column' as const,
              width: '100%',
              height: '256px',
              backgroundColor: COLORS.bg,
              padding: '24px 48px 28px 48px',
              justifyContent: 'center',
              borderBottom: `4px solid ${COLORS.pink}`,
            },
            children: [
              // ADRIFLEX + Badge row
              {
                type: 'div',
                props: {
                  style: {
                    display: 'flex',
                    alignItems: 'center',
                    gap: '14px',
                    marginBottom: '12px',
                  },
                  children: [
                    {
                      type: 'div',
                      props: {
                        style: {
                          display: 'flex',
                          fontFamily: 'Silkscreen',
                          fontSize: '20px',
                          color: COLORS.pink,
                          textTransform: 'uppercase' as const,
                          letterSpacing: '3px',
                        },
                        children: 'ADRIFLEX',
                      },
                    },
                    {
                      type: 'div',
                      props: {
                        style: {
                          display: 'flex',
                          fontFamily: 'Silkscreen',
                          fontSize: '18px',
                          padding: '6px 18px',
                          backgroundColor: badge.bg,
                          color: COLORS.navy,
                        },
                        children: badge.label,
                      },
                    },
                  ],
                },
              },
              // Title
              {
                type: 'div',
                props: {
                  style: {
                    display: 'flex',
                    fontFamily: 'Silkscreen',
                    fontWeight: 700,
                    fontSize: '48px',
                    color: COLORS.navy,
                    lineHeight: 1.2,
                    marginBottom: desc ? '10px' : '14px',
                  },
                  children: data.title,
                },
              },
              // Description (projects only)
              ...(desc
                ? [{
                    type: 'div',
                    props: {
                      style: {
                        display: 'flex',
                        fontSize: '20px',
                        color: COLORS.para,
                        opacity: 0.6,
                        lineHeight: 1.4,
                        marginBottom: '14px',
                      },
                      children: desc,
                    },
                  }]
                : []),
              // Tags
              ...(data.tags.length > 0
                ? [{
                    type: 'div',
                    props: {
                      style: { display: 'flex', flexWrap: 'wrap' as const, gap: '10px' },
                      children: data.tags.slice(0, 4).map((tag) => ({
                        type: 'div',
                        props: {
                          style: {
                            display: 'flex',
                            fontSize: '16px',
                            padding: '5px 16px',
                            border: '1px solid rgba(0,24,88,0.15)',
                            color: COLORS.navy,
                            opacity: 0.6,
                          },
                          children: tag,
                        },
                      })),
                    },
                  }]
                : []),
            ],
          },
        },
      ],
    },
  };

  const svg = await satori(markup as any, {
    width: 1200,
    height: 630,
    fonts: FONTS,
  });

  const resvg = new Resvg(svg, { fitTo: { mode: 'width', value: 1200 } });
  const pngData = resvg.render();
  return pngData.asPng();
}
