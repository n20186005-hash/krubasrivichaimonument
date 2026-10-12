// Post-build sanity check for the static output in dist/.
import { readFileSync, existsSync, statSync } from 'node:fs';
import { readdirSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const langs = ['th', 'en', 'zh'];
let failures = 0;

const check = (label, ok, extra = '') => {
  if (!ok) failures++;
  console.log(`${ok ? 'PASS' : 'FAIL'}  ${label}${extra ? ' -> ' + extra : ''}`);
};

const SECTIONS = [
  'home',
  'about',
  'history',
  'legacy',
  'rituals',
  'guide',
  'food',
  'weather',
  'seasons',
  'audiences',
  'routes',
  'facilities',
  'gallery',
  'reviews',
  'responsibility',
  'sources',
  'map',
];

for (const lang of langs) {
  const file = resolve(root, 'dist', lang, 'index.html');
  if (!existsSync(file)) {
    check(`${lang}: dist/${lang}/index.html exists`, false);
    continue;
  }
  const html = readFileSync(file, 'utf8');
  console.log(`\n--- ${lang} ---`);

  const title = (html.match(/<title>([\s\S]*?)<\/title>/) || [])[1] || '';
  const desc = (html.match(/<meta name="description" content="([^"]*)"/) || [])[1] || '';
  const canonical = (html.match(/<link rel="canonical" href="([^"]*)"/) || [])[1] || '';
  const h1s = html.match(/<h1[\s\S]*?<\/h1>/g) || [];

  check('title non-empty & <= 70', title.length > 0 && title.length <= 70, `${title} (${title.length})`);
  check('description non-empty & <= 170', desc.length > 0 && desc.length <= 170, `${desc.length} chars`);
  check('canonical absolute', /^https:\/\/krubasrivichaimonument\.com\/(th|en|zh)\/$/.test(canonical), canonical);
  check('exactly one H1', h1s.length === 1, `${h1s.length}`);
  check('og:image + alt', html.includes('property="og:image"') && html.includes('property="og:image:alt"'));
  check('hreflang x-default', html.includes('hreflang="x-default"'));
  check('manifest linked', html.includes('/site.webmanifest'));
  check('service worker registered', html.includes('/sw.js'));
  check('GA4 G-HXM22WWPKP', html.includes('G-HXM22WWPKP'));
  check('review count 8,691 present', html.includes('8,691'));
  check('old review counts 8,621 / 8,679 absent', !html.includes('8,621') && !html.includes('8,679'));

  // GSC: 94 of 109 impressions come from "kruba*" spellings — every page must carry both variants.
  check('primary name "Kruba Srivichai" present', /Kruba Srivichai/.test(html));
  check('alias "Khruba Siwichai" present', /Khruba Siwichai/.test(html));
  check('mobile sticky CTA (map + guide)', html.includes('#guide') && html.includes('maps.app.goo.gl'));
  check('home links to katha sub-page', html.includes(`/${lang}/katha/`));
  check('home links to history sub-page', html.includes(`/${lang}/history/`));
  check('no leftover "Khruba Siwichai Monument" as primary H1', !/<h1[^>]*>[\s\S]*?Khruba Siwichai Monument[\s\S]*?<\/h1>/.test(html));

  // every section renders
  const missing = SECTIONS.filter((id) => !html.includes(`id="${id}"`));
  check(`all ${SECTIONS.length} sections present`, missing.length === 0, missing.join(','));

  // weather
  check('weather has 7 forecast cards', (html.match(/data-wx-day|💧/g) || []).length >= 7, `${(html.match(/💧/g) || []).length}`);
  check('weather has live numbers', /id="wx-temp"/.test(html) && /id="wx-precip"/.test(html));
  check('weather UV + max wind metrics', html.includes('id="wx-uv"') && html.includes('id="wx-windmax"'));
  check('advice blocks (dress/plan/gear)', ['wx-dress-row', 'wx-plan-row', 'wx-gear-row'].every((id) => html.includes(`id="${id}"`)));
  check('risk block + no-risk line', html.includes('id="wx-risk"') && html.includes('id="wx-norisk"'));
  check('advice is not jargon-heavy', !/相对湿度|辐照|relative humidity/i.test(html));
  // no data-source boilerplate in *visible* copy (scripts/styles stripped)
  const visible = html.replace(/<script[\s\S]*?<\/script>/g, '').replace(/<style[\s\S]*?<\/style>/g, '');
  const banned = ['Open-Meteo', 'API key', 'API 密钥', 'no API key', 'keyless', 'free weather API'];
  const hits = banned.filter((b) => visible.toLowerCase().includes(b.toLowerCase()));
  check('no data-source boilerplate in visible copy', hits.length === 0, hits.join(','));

  // facilities
  check('facilities ≥ 8 types', (html.match(/id="facilities"/) || []).length === 1);

  // ld+json
  const ldBlocks = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map((m) => m[1]);
  let parsed = [];
  let ok = true;
  try {
    parsed = ldBlocks.map((b) => JSON.parse(b));
  } catch (e) {
    ok = false;
    check('JSON-LD parses', false, e.message);
  }
  if (ok) {
    const flat = JSON.stringify(parsed);
    check('JSON-LD @id #attraction', flat.includes('#attraction'));
    check('JSON-LD has geo', flat.includes('GeoCoordinates'));
    check('JSON-LD has hasMap', flat.includes('hasMap'));
    check('JSON-LD has FAQPage', flat.includes('FAQPage'));
    check('JSON-LD has ItemList (routes)', flat.includes('ItemList'));
    // GSC: star ratings in the SERP lift CTR, so the Google Maps figures must be in the graph.
    check(
      'JSON-LD aggregateRating 4.7 / 8691',
      flat.includes('"ratingValue":"4.7"') && flat.includes('"reviewCount":8691')
    );
    check('JSON-LD BreadcrumbList @id + item on every level', (() => {
      for (const p of parsed) {
        for (const node of p['@graph'] || []) {
          if (node['@type'] === 'BreadcrumbList') {
            if (!node['@id']) return false;
            return node.itemListElement.every((li) => !!li.item);
          }
        }
      }
      return false;
    })());

    const faqCount = parsed.reduce((n, p) => {
      const g = p['@graph'] || [];
      for (const node of g) if (node['@type'] === 'FAQPage') return n + node.mainEntity.length;
      return n;
    }, 0);
    const detailsCount = (html.match(/<details/g) || []).length;
    check('FAQ count == visible <details> (>=5)', faqCount === detailsCount && faqCount >= 5, `${faqCount} vs ${detailsCount}`);
  }

  check('iframe lazy + referrerpolicy', html.includes('loading="lazy"') && html.includes('referrerpolicy="strict-origin-when-cross-origin"'));
  check('govt tourism outbound', html.includes('tourismthailand.org'));
  check('photo credit', /图片产权|All photos displayed|ภาพทั้งหมด/.test(html));
}

// Content-hub sub-pages: /katha/ (worship guide) and /history/ (life & deeds)
const subPages = [
  {
    slug: 'katha',
    extra: [
      ['Pali chant text present', (html) => html.includes('Namo tassa bhagavato') && html.includes('Iti pi so')],
      ['Thai chant text present', (html) => html.includes('อิติปิ') && html.includes('สัพเพ สัตตา')],
    ],
  },
  {
    slug: 'history',
    extra: [
      ['road figures present', (html) => html.includes('11.5') && html.includes('11,000')],
      ['timeline present', (html) => html.includes('id="timeline"')],
      ['recorded-vs-legend split present', (html) => html.includes('id="legends"')],
      ['cross-link to the katha page', (html) => html.includes(`/katha/`)],
    ],
  },
];

for (const { slug, extra } of subPages) {
  for (const lang of langs) {
    const file = resolve(root, 'dist', lang, slug, 'index.html');
    if (!existsSync(file)) {
      check(`${lang}: dist/${lang}/${slug}/index.html exists`, false);
      continue;
    }
    const html = readFileSync(file, 'utf8');
    console.log(`\n--- ${lang}/${slug} ---`);

    const title = (html.match(/<title>([\s\S]*?)<\/title>/) || [])[1] || '';
    const desc = (html.match(/<meta name="description" content="([^"]*)"/) || [])[1] || '';
    const canonical = (html.match(/<link rel="canonical" href="([^"]*)"/) || [])[1] || '';
    const h1s = html.match(/<h1[\s\S]*?<\/h1>/g) || [];

    check('title non-empty & <= 70', title.length > 0 && title.length <= 70, `${title} (${title.length})`);
    check('description non-empty & <= 170', desc.length > 0 && desc.length <= 170, `${desc.length} chars`);
    check('canonical is this page', canonical === `https://krubasrivichaimonument.com/${lang}/${slug}/`, canonical);
    check('exactly one H1', h1s.length === 1, `${h1s.length}`);
    check(
      `hreflang x-default points at ${slug}`,
      html.includes(`hreflang="x-default" href="https://krubasrivichaimonument.com/th/${slug}/"`)
    );
    check('accuracy disclaimer present', html.includes('id="accuracy"'));
    check('reverse internal link to guide', html.includes(`/${lang}/#guide`) && html.includes(`/${lang}/#map`));

    for (const [label, fn] of extra) check(label, fn(html, lang));

    const ldBlocks = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map((m) => m[1]);
    let parsed = [];
    try {
      parsed = ldBlocks.map((b) => JSON.parse(b));
    } catch (e) {
      check('JSON-LD parses', false, e.message);
    }
    const flat = JSON.stringify(parsed);
    check('JSON-LD breadcrumb has 5 levels', (() => {
      for (const p of parsed) {
        for (const node of p['@graph'] || []) {
          if (node['@type'] === 'BreadcrumbList') return node.itemListElement.length === 5;
        }
      }
      return false;
    })());
    check('no duplicated FAQPage on sub-page', !flat.includes('FAQPage'));
    check('aggregateRating mirrored on sub-page', flat.includes('"ratingValue":"4.7"'));
  }
}

// images
const galleryDir = resolve(root, 'public', 'gallery');
const imgs = readdirSync(galleryDir).filter((f) => /\.(jpg|jpeg)$/i.test(f));
const total = imgs.reduce((n, f) => n + statSync(resolve(galleryDir, f)).size, 0);
console.log('\n--- assets ---');
check('gallery images named kruba-srivichai-monument-N.jpg', imgs.every((f) => /^kruba-srivichai-monument-\d+\.jpg$/.test(f)), imgs.join(','));
check('gallery total size < 15MB', total / 1024 / 1024 < 15, `${(total / 1024 / 1024).toFixed(2)}MB`);

for (const f of ['sw.js', 'site.webmanifest', 'robots.txt', 'sitemap.xml', 'icons/icon.svg', 'icons/icon-192.png', 'icons/icon-512.png', 'icons/maskable-512.png']) {
  check(`dist/${f} exists`, existsSync(resolve(root, 'dist', f)));
}

console.log(`\n${failures === 0 ? 'ALL PASS' : failures + ' FAILURE(S)'}`);
process.exit(failures === 0 ? 0 : 1);
