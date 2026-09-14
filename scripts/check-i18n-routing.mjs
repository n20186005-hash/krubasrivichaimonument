import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const html = readFileSync(resolve(root, 'dist/th/index.html'), 'utf8');

console.log('html lang attr:', /<html[^>]*lang="([^"]+)"/.exec(html)?.[1]);
console.log('has /zh/ switch:', html.includes('/zh/'));
console.log('has /en/ switch:', html.includes('/en/'));
console.log('has /th/ switch:', html.includes('/th/'));
console.log('hreflang set:', [...html.matchAll(/hreflang="([^"]+)"/g)].map((m) => m[1]).join(','));
console.log('root index redirect:', readFileSync(resolve(root, 'dist/index.html'), 'utf8').slice(0, 200));
