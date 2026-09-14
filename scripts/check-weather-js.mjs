import { readdirSync, readFileSync, existsSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const assets = resolve(root, 'dist', '_astro');
const files = existsSync(assets) ? readdirSync(assets).filter((f) => f.endsWith('.js')) : [];
const all = files.map((f) => readFileSync(resolve(assets, f), 'utf8')).join('\n');

const need = [
  'wx-dress-row',
  'wx-plan-row',
  'wx-gear-row',
  'wx-risk-thunder',
  'wx-risk-flood',
  'wx-risk-gale',
  'wx-risk-fog',
  'wx-norisk',
  'wx-empty',
  'wx-uv',
  'wx-windmax',
  'api.open-meteo.com',
];
let bad = 0;
for (const n of need) {
  const ok = all.includes(n);
  if (!ok) bad++;
  console.log(`${ok ? 'PASS' : 'FAIL'}  bundled js contains ${n}`);
}

const html = readFileSync(resolve(root, 'dist/th/index.html'), 'utf8');
const visibleHtml = html.replace(/<script[\s\S]*?<\/script>/g, '');
const noInlineUrl = !visibleHtml.includes('api.open-meteo.com');
console.log(`${noInlineUrl ? 'PASS' : 'FAIL'}  html has no api url`);
if (!noInlineUrl) bad++;

console.log(`\njs assets: ${files.length}`);
console.log(bad === 0 ? 'ALL PASS' : `${bad} FAILURE(S)`);
process.exit(bad === 0 ? 0 : 1);
