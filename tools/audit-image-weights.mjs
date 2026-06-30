import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const contentDir = path.join(root, 'src', 'content');

async function listMarkdownFiles(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const entryPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...await listMarkdownFiles(entryPath));
    } else if (entry.name.endsWith('.md')) {
      files.push(entryPath);
    }
  }

  return files;
}

function findLocalImages(text) {
  const matches = text.matchAll(/\/images\/[^\s)"']+/g);
  return [...new Set([...matches].map((match) => match[0]))];
}

const rows = [];

for (const filePath of await listMarkdownFiles(contentDir)) {
  const text = await fs.readFile(filePath, 'utf8');
  const images = findLocalImages(text);
  let total = 0;

  for (const imagePath of images) {
    const absolutePath = path.join(root, 'public', imagePath);
    try {
      total += (await fs.stat(absolutePath)).size;
    } catch {
      console.warn(`Missing image referenced by ${path.relative(root, filePath)}: ${imagePath}`);
    }
  }

  rows.push({
    MB: Number((total / 1024 / 1024).toFixed(2)),
    images: images.length,
    file: path.relative(root, filePath),
  });
}

console.table(rows.sort((a, b) => b.MB - a.MB));
