import { languagesList, htmlLang, type Lang } from './i18n/ui';

export const siteConfig = {
  domain: 'https://krubasrivichaimonument.com',

  name: {
    th: 'อนุสาวรีย์ครูบาศรีวิชัย',
    en: 'Kruba Srivichai Monument',
    zh: '古巴·斯里维差纪念碑',
  },
  nameShort: {
    th: 'ครูบาศรีวิชัย',
    en: 'Kruba Srivichai',
    zh: '古巴·斯里维差',
  },
  nameLocal: 'อนุสาวรีย์ครูบาศรีวิชัย (Kruba Srivichai Monument)',

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
  rating: '4.7',
  reviewCount: '8,621',

  phone: '',
  phoneDisplay: '',

  galleryPrefix: 'kruba-srivichai-monument-',
  galleryCount: 18,
  ogImage: '/gallery/kruba-srivichai-monument-1.jpg',

  sources: [
    {
      name: {
        th: 'การท่องเที่ยวแห่งประเทศไทย',
        en: 'Tourism Thailand',
        zh: '泰国国家旅游局',
      },
      url: 'https://www.tourismthailand.org',
    },
    {
      name: {
        th: 'วิกิพีเดีย: ครูบาศรีวิชัย',
        en: 'Wikipedia: Kruba Srivichai',
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
