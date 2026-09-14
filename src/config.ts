import { languagesList, htmlLang, type Lang } from './i18n/ui';

/**
 * Single source of truth for the Khruba Siwichai Monument entity.
 * Every value here is mirrored into JSON-LD, TDK, headings and body copy.
 */
export const siteConfig = {
  domain: 'https://krubasrivichaimonument.com',

  /**
   * Official full name — matches the Google Business Profile listing exactly.
   * GSC: 94 of 109 impressions come from "kruba*" spellings, only 4 from "khruba*",
   * so the primary name must be "Kruba Srivichai"; "Khruba Siwichai" stays an alias.
   */
  name: {
    th: 'อนุสาวรีย์ครูบาศรีวิชัย',
    en: 'Kruba Srivichai Monument',
    zh: '古巴·斯里维差纪念碑',
  },
  /** Common short name / what the domain means */
  nameShort: {
    th: 'ครูบาศรีวิชัย',
    en: 'Kruba Srivichai',
    zh: '古巴·斯里维差',
  },
  /** Alternate names used for entity disambiguation (Knowledge Graph) */
  alternateName: {
    th: [
      'อนุสาวรีย์ครูบาศรีวิชัย',
      'ครูบาศรีวิชัย',
      'อนุสาวรีย์ครูบาศรีวิชัย เชียงใหม่',
      'ครูบาศรีวิชัย เชียงใหม่',
      'Kruba Srivichai Monument',
      'Khruba Siwichai Monument',
    ],
    en: [
      'Khruba Siwichai Monument',
      'Khruba Siwichai',
      'Kruba Srivichai',
      'Kruba Sriwichai Monument',
      'Kruba Srivichai Monument Chiang Mai',
      'Chiang Mai Kruba Srivichai Monument',
      'ครูบาศรีวิชัย',
    ],
    zh: [
      '古巴·斯里维差纪念碑',
      '库巴·西威猜纪念碑',
      '古巴洗威猜纪念碑',
      '清迈古巴·斯里维差纪念碑',
      'Kruba Srivichai Monument',
      'Khruba Siwichai Monument',
    ],
  },
  nameLocal: 'อนุสาวรีย์ครูบาศรีวิชัย (Kruba Srivichai Monument)',

  city: {
    th: 'เชียงใหม่',
    en: 'Chiang Mai',
    zh: '清迈',
  },
  province: {
    th: 'จังหวัดเชียงใหม่',
    en: 'Chiang Mai Province',
    zh: '清迈府',
  },
  country: {
    th: 'ประเทศไทย',
    en: 'Thailand',
    zh: '泰国',
  },
  countryCode: 'TH',
  postalCode: '50300',
  streetAddress: '99 Huay Kaew Rd, Tambon Su Thep, Mueang Chiang Mai District',
  addressFull: '99 Huay Kaew Rd, Tambon Su Thep, Mueang Chiang Mai District, Chiang Mai 50300, Thailand',

  coords: {
    lat: 18.81284892072076,
    lng: 98.94353968260093,
  },
  mapsUrl: 'https://maps.app.goo.gl/DWvrZZa112AD4oMu5',
  googleMapsEmbed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3776.670121781562!2d98.94353968260093!3d18.81284892072076!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30da3a38ac173e53%3A0xdda493501906e893!2sKruba%20Srivichai%20Monument!5e0!3m2!1szh-CN!2sus!4v1784717915145!5m2!1szh-CN!2sus',

  address: '99 Huay Kaew Rd, Tambon Su Thep, Mueang Chiang Mai District, Chiang Mai 50300 泰国',
  plusCode: 'RW7W+4F 清迈 泰国清迈府 Mueang Chiang Mai District',

  openingHours: {
    opens: '00:00',
    closes: '23:59',
    time: '00:00–23:59',
  },
  isAccessibleForFree: true,
  touristType: ['Monument', 'Historical Landmark', 'Sacred Site'],

  /** Latest Google Maps listing data (rating & review count) */
  rating: '4.7',
  reviewCount: '8,679',
  /** Month the rating / review count was last synced from Google Maps */
  ratingSyncedAt: '2026-09',

  phone: '',
  phoneDisplay: '',

  galleryPrefix: 'kruba-srivichai-monument-',
  galleryCount: 18,
  ogImage: '/gallery/kruba-srivichai-monument-1.jpg',

  /** Official tourism authority — authoritative outbound link */
  govtTourismUrl: 'https://www.tourismthailand.org',

  /** Content last reviewed / updated */
  lastUpdated: '2026-09-14',

  /** Core landmarks used for the semantic cluster around the entity */
  nearbyLandmarks: {
    th: ['วัดพระธาตุดอยสุเทพ', 'น้ำตกห้วยแก้ว'],
    en: ['Wat Phra That Doi Suthep', 'Huay Kaew Waterfall'],
    zh: ['素贴山双龙寺', '惠考瀑布'],
  },

  sources: [
    {
      name: {
        th: 'การท่องเที่ยวแห่งประเทศไทย',
        en: 'Tourism Authority of Thailand',
        zh: '泰国国家旅游局',
      },
      url: 'https://www.tourismthailand.org',
    },
    {
      name: {
        th: 'วิกิพีเดีย: ครูบาศรีวิชัย',
        en: 'Wikipedia: Khruba Siwichai',
        zh: '维基百科：克里巴·斯里维差',
      },
      url: 'https://en.wikipedia.org/wiki/Kruba_Srivichai',
    },
    {
      name: {
        th: 'เว็บไซต์จังหวัดเชียงใหม่',
        en: 'Chiang Mai Province',
        zh: '清迈府官方网站',
      },
      url: 'https://www.chiangmai.go.th',
    },
  ],

  sameAs: [
    'https://maps.app.goo.gl/DWvrZZa112AD4oMu5',
    'https://en.wikipedia.org/wiki/Kruba_Srivichai',
    'https://www.tourismthailand.org',
  ],
};

/** Build the "Full name (City)" string used in H1 / title slots. */
export const fullNameWithCity = (lang: Lang) => `${siteConfig.name[lang]} (${siteConfig.city[lang]})`;

/** hreflang tag for a locale (zh -> zh-CN, th -> th, en -> en). */
export const hreflangTag = (lang: Lang) => htmlLang[lang];

export const alternateLocales = (): Lang[] => [...languagesList];
