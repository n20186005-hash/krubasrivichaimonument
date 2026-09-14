import { siteConfig } from '../config';

/**
 * Weather snapshot for the monument.
 * Fetched on the server (render/build time) and cached in-process so that
 * every page of a single build reuses one response.
 */

const TTL_MS = 30 * 60 * 1000;

export interface WeatherDay {
  date: string;
  code: number;
  max: number;
  min: number;
  precip: number;
  sunrise: string;
  sunset: string;
}

export interface WeatherAlert {
  event: string;
}

export interface WeatherSnapshot {
  observedAt: string;
  temperature: number;
  apparent: number;
  humidity: number;
  wind: number;
  windMax: number;
  uvMax: number;
  code: number;
  codeToday: number;
  tempMax: number;
  tempMin: number;
  sunrise: string;
  sunset: string;
  todayPrecip: number;
  alerts: WeatherAlert[];
  days: WeatherDay[];
  stale: boolean;
}

export const weatherApiUrl =
  `https://api.open-meteo.com/v1/forecast?latitude=${siteConfig.coords.lat}&longitude=${siteConfig.coords.lng}` +
  '&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m' +
  '&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max,uv_index_max,wind_speed_10m_max,sunrise,sunset' +
  '&timezone=Asia%2FBangkok&forecast_days=7&wind_speed_unit=kmh&alerts=true';

let cache: { at: number; data: WeatherSnapshot } | null = null;

const round = (n: unknown, fallback = 0) =>
  typeof n === 'number' && Number.isFinite(n) ? Math.round(n) : fallback;

const hhmm = (iso: unknown) => (typeof iso === 'string' && iso.length >= 16 ? iso.slice(11, 16) : '');

export function normalizeWeather(raw: any): WeatherSnapshot {
  const current = raw?.current ?? {};
  const daily = raw?.daily ?? {};
  const times: string[] = Array.isArray(daily.time) ? daily.time : [];

  const days: WeatherDay[] = times.map((t: string, i: number) => ({
    date: t,
    code: round(daily.weather_code?.[i], 3),
    max: round(daily.temperature_2m_max?.[i]),
    min: round(daily.temperature_2m_min?.[i]),
    precip: round(daily.precipitation_probability_max?.[i]),
    sunrise: hhmm(daily.sunrise?.[i]),
    sunset: hhmm(daily.sunset?.[i]),
  }));

  const alerts: WeatherAlert[] = Array.isArray(raw?.alerts)
    ? raw.alerts
        .map((a: any) => (typeof a?.event === 'string' ? { event: a.event.trim() } : null))
        .filter((a: WeatherAlert | null): a is WeatherAlert => !!a && a.event.length > 0)
        .slice(0, 3)
    : [];

  return {
    observedAt: typeof current.time === 'string' ? current.time : '',
    temperature: round(current.temperature_2m),
    apparent: round(current.apparent_temperature),
    humidity: round(current.relative_humidity_2m),
    wind: round(current.wind_speed_10m),
    windMax: round(daily.wind_speed_10m_max?.[0]),
    uvMax: round(daily.uv_index_max?.[0]),
    code: round(current.weather_code, 3),
    codeToday: days[0]?.code ?? round(current.weather_code, 3),
    tempMax: days[0]?.max ?? round(current.temperature_2m),
    tempMin: days[0]?.min ?? round(current.temperature_2m),
    sunrise: days[0]?.sunrise ?? '',
    sunset: days[0]?.sunset ?? '',
    todayPrecip: days[0]?.precip ?? 0,
    alerts,
    days,
    stale: false,
  };
}

/** Server-side fetch with an in-process cache; never throws. */
export async function getWeather(): Promise<WeatherSnapshot | null> {
  if (cache && Date.now() - cache.at < TTL_MS) return cache.data;

  try {
    const res = await fetch(weatherApiUrl, { headers: { accept: 'application/json' } });
    if (!res.ok) throw new Error(`weather ${res.status}`);
    const data = normalizeWeather(await res.json());
    cache = { at: Date.now(), data };
    return data;
  } catch {
    return null;
  }
}

/** Reference values used when the forecast cannot be retrieved. */
export function fallbackWeather(): WeatherSnapshot {
  return {
    observedAt: '',
    temperature: 29,
    apparent: 32,
    humidity: 70,
    wind: 8,
    windMax: 18,
    uvMax: 7,
    code: 2,
    codeToday: 2,
    tempMax: 33,
    tempMin: 22,
    sunrise: '06:12',
    sunset: '18:26',
    todayPrecip: 60,
    alerts: [],
    days: [],
    stale: true,
  };
}
