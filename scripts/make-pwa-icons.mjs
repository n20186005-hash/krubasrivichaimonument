// Generates PWA raster icons from public/icons/icon.svg using the bundled sharp.
import sharp from 'sharp';
import { mkdirSync, readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const outDir = resolve(root, 'public/icons');
mkdirSync(outDir, { recursive: true });

const svg = readFileSync(resolve(outDir, 'icon.svg'));

// Maskable variant: full-bleed background, artwork kept inside the safe zone (80%).
const maskableSvg = readFileSync(resolve(outDir, 'icon.svg'), 'utf8')
  .replace('<rect width="512" height="512" rx="104" fill="url(#bg)"/>', '<rect width="512" height="512" fill="url(#bg)"/>')
  .replace('<g fill="#C8A96A">', '<g fill="#C8A96A" transform="translate(51.2 51.2) scale(0.8)">')
  .replace('<rect x="104" y="424"', '<rect x="104" y="424" transform="translate(51.2 51.2) scale(0.8)"');

const jobs = [
  { name: 'icon-192.png', size: 192, input: svg },
  { name: 'icon-512.png', size: 512, input: svg },
  { name: 'maskable-512.png', size: 512, input: Buffer.from(maskableSvg) },
  { name: 'apple-touch-icon.png', size: 180, input: svg },
];

for (const job of jobs) {
  await sharp(job.input, { density: 384 })
    .resize(job.size, job.size)
    .png({ compressionLevel: 9 })
    .toFile(resolve(outDir, job.name));
  console.log('wrote', job.name, job.size + 'x' + job.size);
}

console.log('PWA icons generated.');
