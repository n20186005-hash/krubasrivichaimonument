// Spot-check that the required source-attribution copy & headings actually render.
import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');

const expectations = {
  zh: [
    '评分与评价数同步自谷歌地图（Google Maps）用户评价 · 2026 年 9 月',
    '点击查看谷歌地图全部评价',
    '同步自 Google 地图用户评价，同步时间 2026 年 9 月；版权归原作者与 Google 地图所有',
    '在谷歌地图查看全部评价',
    '评价 ·',
    '同步时间 2026 年 9 月',
    '关于古巴·斯里维差纪念碑（清迈）',
    '如何前往清迈的古巴·斯里维差纪念碑',
    '古巴·斯里维差纪念碑周边地标与景点',
    '古巴·斯里维差纪念碑的历史与意义',
    '本网站所展示的所有图片产权及版权均归原摄影者所有',
    'tourismthailand.org',
  ],
  en: [
    'Rating &amp; review count synced from Google Maps user reviews · September 2026',
    'See all reviews on Google Maps',
    'Synced from Google Maps user reviews, synced September 2026; copyright belongs to the original authors and Google Maps',
    'View all reviews on Google Maps',
    'About Khruba Siwichai Monument (Chiang Mai)',
    'Location &amp; How to Visit Khruba Siwichai Monument in Chiang Mai',
    'Landmarks &amp; Attractions Around Khruba Siwichai Monument',
    'History &amp; Significance of Khruba Siwichai Monument',
    'All photos displayed on this website remain the property and copyright of their original photographers',
  ],
  th: [
    'ซิงก์จากรีวิวของผู้ใช้ Google Maps เวลาซิงก์กันยายน 2026 ลิขสิทธิ์เป็นของผู้เขียนต้นฉบับและ Google Maps',
    'ดูรีวิวทั้งหมดบน Google Maps',
    'เกี่ยวกับอนุสาวรีย์ครูบาศรีวิชัย (เชียงใหม่)',
    'วิธีเดินทางไปอนุสาวรีย์ครูบาศรีวิชัยในเชียงใหม่',
    'โบราณสถานและสถานที่ท่องเที่ยวรอบอนุสาวรีย์ครูบาศรีวิชัย',
    'ประวัติและความสำคัญของอนุสาวรีย์ครูบาศรีวิชัย',
  ],
};

let fail = 0;
for (const [lang, list] of Object.entries(expectations)) {
  const html = readFileSync(resolve(root, 'dist', lang, 'index.html'), 'utf8');
  console.log(`\n--- ${lang} ---`);
  for (const needle of list) {
    const ok = html.includes(needle);
    if (!ok) fail++;
    console.log(`${ok ? 'PASS' : 'FAIL'}  ${needle.slice(0, 70)}`);
  }
}
console.log(`\n${fail === 0 ? 'ALL PASS' : fail + ' MISSING'}`);
process.exit(fail === 0 ? 0 : 1);
