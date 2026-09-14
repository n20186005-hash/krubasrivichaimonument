import { buildAdvice, kindOf } from '../src/lib/weather-advice.ts';
import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const zh = JSON.parse(readFileSync(resolve(root, 'src/i18n/zh.json'), 'utf8')).weather.advice;

const base = {
  codeNow: 0,
  codeToday: 0,
  tempNow: 26,
  apparent: 27,
  tempMax: 30,
  tempMin: 22,
  windNow: 8,
  windMax: 15,
  precipProb: 10,
  uvMax: 4,
  alerts: [],
};

const cases = [
  ['sunny + hot + uv', { codeNow: 0, tempNow: 33, tempMax: 35, tempMin: 26, uvMax: 9, apparent: 38 }],
  ['cool clear', {}],
  ['light rain', { codeNow: 61, codeToday: 61, tempMax: 28, tempMin: 24, precipProb: 70 }],
  ['heavy rain', { codeNow: 65, codeToday: 65, tempMax: 27, tempMin: 24, precipProb: 90 }],
  ['thunder', { codeToday: 95, precipProb: 80 }],
  ['gale', { windNow: 46, windMax: 62, codeToday: 3 }],
  ['breezy 5-6', { windNow: 22, windMax: 38 }],
  ['fog', { codeNow: 45, codeToday: 45 }],
  ['cold', { tempNow: 6, tempMax: 9, tempMin: 2, codeNow: 3 }],
  ['big swing', { tempMax: 30, tempMin: 17 }],
  ['overcast', { codeNow: 3, codeToday: 3 }],
  ['official alert', { alerts: ['暴雨橙色预警'], codeToday: 65, precipProb: 90 }],
];

let bad = 0;
for (const [name, patch] of cases) {
  const d = { ...base, ...patch };
  const r = buildAdvice(d, zh);
  const empty = !r.risk.length && !r.dress.length && !r.plan.length && !r.gear.length;
  if (empty) bad++;
  console.log(`\n--- ${name} (kind=${kindOf(d.codeNow)}/${kindOf(d.codeToday)}) ---`);
  if (r.risk.length) console.log(' risk :', r.risk.join(' | '));
  else console.log(' risk : (none)');
  console.log(' dress:', r.dress.join(' | ') || '(none)');
  console.log(' plan :', r.plan.join(' | ') || '(none)');
  console.log(' gear :', r.gear.join('、') || '(none)');
}
console.log(`\n${bad === 0 ? 'ALL PASS' : bad + ' empty result(s)'}`);
process.exit(bad === 0 ? 0 : 1);
