import type { Lang } from '../i18n/ui';

/** WMO weather code -> localised label (full text + compact chip text). */
export const weatherCodes: Record<number, Record<Lang, { full: string; short: string }>> = {
  0: {
    th: { full: 'ท้องฟ้าโปร่งใส', short: 'แดดจัด' },
    en: { full: 'Clear sky', short: 'Clear' },
    zh: { full: '晴空', short: '晴' },
  },
  1: {
    th: { full: 'โปร่งเป็นส่วนใหญ่', short: 'เกือบโปร่ง' },
    en: { full: 'Mainly clear', short: 'Mostly clear' },
    zh: { full: '晴间少云', short: '少云' },
  },
  2: {
    th: { full: 'มีเมฆบางส่วน', short: 'เมฆบางส่วน' },
    en: { full: 'Partly cloudy', short: 'Partly cloudy' },
    zh: { full: '局部多云', short: '多云' },
  },
  3: {
    th: { full: 'เมฆมาก', short: 'เมฆมาก' },
    en: { full: 'Overcast', short: 'Overcast' },
    zh: { full: '阴天', short: '阴' },
  },
  45: {
    th: { full: 'หมอก', short: 'หมอก' },
    en: { full: 'Fog', short: 'Fog' },
    zh: { full: '雾', short: '雾' },
  },
  48: {
    th: { full: 'หมอกจัด', short: 'หมอก' },
    en: { full: 'Dense fog', short: 'Fog' },
    zh: { full: '浓雾', short: '雾' },
  },
  51: {
    th: { full: 'ฝนปรอยเล็กน้อย', short: 'ฝนปรอย' },
    en: { full: 'Light drizzle', short: 'Drizzle' },
    zh: { full: '小毛毛雨', short: '毛毛雨' },
  },
  53: {
    th: { full: 'ฝนปรอยปานกลาง', short: 'ฝนปรอย' },
    en: { full: 'Drizzle', short: 'Drizzle' },
    zh: { full: '毛毛雨', short: '毛毛雨' },
  },
  55: {
    th: { full: 'ฝนปรอยหนัก', short: 'ฝนปรอย' },
    en: { full: 'Dense drizzle', short: 'Drizzle' },
    zh: { full: '浓毛毛雨', short: '毛毛雨' },
  },
  56: {
    th: { full: 'ฝนปรอยเย็นจัด', short: 'ฝนปรอย' },
    en: { full: 'Freezing drizzle', short: 'Drizzle' },
    zh: { full: '冻毛毛雨', short: '毛毛雨' },
  },
  57: {
    th: { full: 'ฝนปรอยเย็นจัดหนัก', short: 'ฝนปรอย' },
    en: { full: 'Dense freezing drizzle', short: 'Drizzle' },
    zh: { full: '浓冻毛毛雨', short: '毛毛雨' },
  },
  61: {
    th: { full: 'ฝนตกเล็กน้อย', short: 'ฝนตก' },
    en: { full: 'Light rain', short: 'Rain' },
    zh: { full: '小雨', short: '小雨' },
  },
  63: {
    th: { full: 'ฝนตกปานกลาง', short: 'ฝนตก' },
    en: { full: 'Moderate rain', short: 'Rain' },
    zh: { full: '中雨', short: '中雨' },
  },
  65: {
    th: { full: 'ฝนตกหนัก', short: 'ฝนตกหนัก' },
    en: { full: 'Heavy rain', short: 'Heavy rain' },
    zh: { full: '大雨', short: '大雨' },
  },
  66: {
    th: { full: 'ฝนเย็นจัดเล็กน้อย', short: 'ฝนตก' },
    en: { full: 'Light freezing rain', short: 'Rain' },
    zh: { full: '轻度冻雨', short: '冻雨' },
  },
  67: {
    th: { full: 'ฝนเย็นจัดหนัก', short: 'ฝนตก' },
    en: { full: 'Heavy freezing rain', short: 'Rain' },
    zh: { full: '强冻雨', short: '冻雨' },
  },
  71: {
    th: { full: 'หิมะตกเล็กน้อย', short: 'หิมะ' },
    en: { full: 'Light snow', short: 'Snow' },
    zh: { full: '小雪', short: '小雪' },
  },
  73: {
    th: { full: 'หิมะตกปานกลาง', short: 'หิมะ' },
    en: { full: 'Moderate snow', short: 'Snow' },
    zh: { full: '中雪', short: '中雪' },
  },
  75: {
    th: { full: 'หิมะตกหนัก', short: 'หิมะ' },
    en: { full: 'Heavy snow', short: 'Snow' },
    zh: { full: '大雪', short: '大雪' },
  },
  77: {
    th: { full: 'เม็ดหิมะ', short: 'หิมะ' },
    en: { full: 'Snow grains', short: 'Snow' },
    zh: { full: '雪粒', short: '雪' },
  },
  80: {
    th: { full: 'ฝนตกเป็นระยะเล็กน้อย', short: 'ฝนเป็นระยะ' },
    en: { full: 'Light rain showers', short: 'Showers' },
    zh: { full: '小阵雨', short: '阵雨' },
  },
  81: {
    th: { full: 'ฝนตกเป็นระยะปานกลาง', short: 'ฝนเป็นระยะ' },
    en: { full: 'Rain showers', short: 'Showers' },
    zh: { full: '阵雨', short: '阵雨' },
  },
  82: {
    th: { full: 'ฝนตกเป็นระยะหนักมาก', short: 'ฝนหนัก' },
    en: { full: 'Violent rain showers', short: 'Heavy showers' },
    zh: { full: '强阵雨', short: '强阵雨' },
  },
  85: {
    th: { full: 'หิมะตกเป็นระยะเล็กน้อย', short: 'หิมะ' },
    en: { full: 'Light snow showers', short: 'Snow showers' },
    zh: { full: '小阵雪', short: '阵雪' },
  },
  86: {
    th: { full: 'หิมะตกเป็นระยะหนัก', short: 'หิมะ' },
    en: { full: 'Heavy snow showers', short: 'Snow showers' },
    zh: { full: '强阵雪', short: '阵雪' },
  },
  95: {
    th: { full: 'พายุฝนฟ้าคะนอง', short: 'ฟ้าคะนอง' },
    en: { full: 'Thunderstorm', short: 'Thunderstorm' },
    zh: { full: '雷阵雨', short: '雷雨' },
  },
  96: {
    th: { full: 'พายุฝนฟ้าคะนองกับลูกเห็บ', short: 'ฟ้าคะนอง' },
    en: { full: 'Thunderstorm with hail', short: 'Storm' },
    zh: { full: '雷阵雨伴冰雹', short: '雷雨' },
  },
  99: {
    th: { full: 'พายุฝนฟ้าคะนองรุนแรงกับลูกเห็บ', short: 'พายุ' },
    en: { full: 'Severe thunderstorm with hail', short: 'Severe storm' },
    zh: { full: '强雷阵雨伴冰雹', short: '强雷雨' },
  },
};

export const weatherLabel = (code: number, lang: Lang, variant: 'full' | 'short' = 'full') => {
  const entry = weatherCodes[code] ?? weatherCodes[3];
  return entry[lang]?.[variant] ?? entry.en[variant];
};

export const weatherIcon = (code: number) => {
  if (code === 0) return '☀️';
  if (code <= 2) return '🌤️';
  if (code === 3) return '☁️';
  if (code === 45 || code === 48) return '🌫️';
  if (code >= 51 && code <= 57) return '🌦️';
  if (code >= 61 && code <= 67) return '🌧️';
  if (code >= 71 && code <= 77) return '❄️';
  if (code >= 80 && code <= 82) return '🌦️';
  if (code >= 85 && code <= 86) return '🌨️';
  if (code >= 95) return '⛈️';
  return '🌡️';
};
