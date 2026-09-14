// Compress every gallery JPEG for faster page loads.
// - re-encodes as progressive mozjpeg
// - caps the longest edge at MAX_EDGE
// - writes to a temp file first, then renames (avoids partial writes on Windows)
import sharp from 'sharp';
import { readdirSync, statSync, renameSync, unlinkSync, mkdirSync } from 'node:fs';
import { resolve, dirname, join, extname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const dir = join(root, 'public', 'gallery');
const MAX_EDGE = Number(process.env.MAX_EDGE || 1600);
const QUALITY = Number(process.env.QUALITY || 78);
const tmpDir = join(root, '.tmp-img');
mkdirSync(tmpDir, { recursive: true });

const files = readdirSync(dir)
  .filter((f) => ['.jpg', '.jpeg'].includes(extname(f).toLowerCase()))
  .sort((a, b) => a.localeCompare(b, 'en', { numeric: true }));

let before = 0;
let after = 0;

for (const file of files) {
  const src = join(dir, file);
  const tmp = join(tmpDir, file);
  before += statSync(src).size;

  const meta = await sharp(src).metadata();
  const resize =
    Math.max(meta.width || 0, meta.height || 0) > MAX_EDGE
      ? { width: MAX_EDGE, height: MAX_EDGE, fit: 'inside', withoutEnlargement: true }
      : undefined;

  await sharp(src)
    .rotate()
    .resize(resize)
    .jpeg({ quality: QUALITY, mozjpeg: true, progressive: true, chromaSubsampling: '4:2:0' })
    .toFile(tmp);

  renameSync(tmp, src);
  const size = statSync(src).size;
  after += size;
  console.log(`${file}  ${(before && (statSync(src).size / 1024)).toFixed(0)}KB  ${meta.width}x${meta.height}`);
}

try {
  unlinkSync(tmpDir);
} catch {
  /* keep the temp dir if the OS still holds a handle */
}

const mb = (n) => (n / 1024 / 1024).toFixed(2);
console.log(`\n${files.length} images: ${mb(before)}MB -> ${mb(after)}MB (-${(((before - after) / before) * 100).toFixed(1)}%)`);
