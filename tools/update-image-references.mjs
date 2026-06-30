import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const mapPath = path.join(root, '.image-originals', 'image-reference-map.json');
const sourceDirs = [
  path.join(root, 'src'),
];

const replacements = JSON.parse(await fs.readFile(mapPath, 'utf8'));
const sourceExtensions = new Set(['.astro', '.md', '.ts', '.js', '.css']);

async function listFiles(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const entryPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...await listFiles(entryPath));
    } else if (sourceExtensions.has(path.extname(entry.name).toLowerCase())) {
      files.push(entryPath);
    }
  }

  return files;
}

let changedFiles = 0;
let changedReferences = 0;

for (const dir of sourceDirs) {
  const files = await listFiles(dir);

  for (const filePath of files) {
    let text = await fs.readFile(filePath, 'utf8');
    const original = text;

    for (const [from, to] of Object.entries(replacements)) {
      const matches = text.split(from).length - 1;
      if (matches > 0) {
        changedReferences += matches;
        text = text.replaceAll(from, to);
      }
    }

    if (text !== original) {
      await fs.writeFile(filePath, text);
      changedFiles += 1;
      console.log(path.relative(root, filePath));
    }
  }
}

console.log(`Updated ${changedReferences} image references in ${changedFiles} files.`);
