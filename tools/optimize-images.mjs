import { constants as fsConstants } from 'node:fs';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const imagesDir = path.join(root, 'public', 'images');
const backupDir = path.join(root, '.image-originals', 'public', 'images');
const mapPath = path.join(root, '.image-originals', 'image-reference-map.json');
const webpQuality = 86;

const stillExtensions = new Set(['.png', '.jpg', '.jpeg']);

async function exists(filePath) {
  try {
    await fs.access(filePath, fsConstants.F_OK);
    return true;
  } catch {
    return false;
  }
}

async function listFiles(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const entryPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...await listFiles(entryPath));
    } else {
      files.push(entryPath);
    }
  }

  return files;
}

function toPublicPath(filePath) {
  return `/${path.relative(path.join(root, 'public'), filePath).replaceAll(path.sep, '/')}`;
}

function capWidthFor({ width, height }) {
  if (!width || !height) return 2400;
  const ratio = width / height;
  return ratio >= 1.75 ? 3200 : 2400;
}

async function backupOriginal(filePath) {
  const relativePath = path.relative(imagesDir, filePath);
  const targetPath = path.join(backupDir, relativePath);

  if (await exists(targetPath)) return;

  await fs.mkdir(path.dirname(targetPath), { recursive: true });
  await fs.copyFile(filePath, targetPath);
}

const files = await listFiles(imagesDir);
const candidates = files.filter((file) => stillExtensions.has(path.extname(file).toLowerCase()));
const map = {};
const report = [];

for (const filePath of candidates) {
  const metadata = await sharp(filePath).metadata();
  const originalSize = (await fs.stat(filePath)).size;
  const capWidth = capWidthFor(metadata);
  const outputWidth = metadata.width ? Math.min(metadata.width, capWidth) : capWidth;
  const outputPath = filePath.replace(/\.(png|jpe?g)$/i, '.webp');

  await backupOriginal(filePath);
  await sharp(filePath)
    .rotate()
    .resize({ width: outputWidth, withoutEnlargement: true })
    .webp({ quality: webpQuality, effort: 6 })
    .toFile(outputPath);

  const outputSize = (await fs.stat(outputPath)).size;
  map[toPublicPath(filePath)] = toPublicPath(outputPath);
  report.push({
    file: path.basename(filePath),
    from: toPublicPath(filePath),
    to: toPublicPath(outputPath),
    dimensions: `${metadata.width ?? '?'}x${metadata.height ?? '?'}`,
    capWidth,
    originalKB: Math.round(originalSize / 1024),
    webpKB: Math.round(outputSize / 1024),
    savedPercent: Math.round((1 - outputSize / originalSize) * 100),
  });
}

await fs.mkdir(path.dirname(mapPath), { recursive: true });
await fs.writeFile(mapPath, `${JSON.stringify(map, null, 2)}\n`);

console.table(report.sort((a, b) => b.originalKB - a.originalKB));
console.log(`Converted ${report.length} images. Mapping written to ${mapPath}`);
