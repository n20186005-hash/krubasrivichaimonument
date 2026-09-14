/**
 * Turns raw weather numbers into plain-language, actionable advice for visitors.
 *
 * Everything is phrased for a non-specialist: no "relative humidity", no
 * "irradiance", no probabilities dressed up as certainties. The site sits at
 * the foot of Doi Suthep, so the wording leans on mountain scenarios
 * (slippery stone steps, valleys and low ground, lightning on open ground,
 * visibility on the mountain road) rather than coastal ones.
 *
 * Rules follow a fixed priority so that the most safety-relevant line wins,
 * and anything that does not apply is simply not rendered.
 */

export type WeatherKind =
  | 'clear'
  | 'partly'
  | 'overcast'
  | 'fog'
  | 'drizzle'
  | 'rain'
  | 'heavy'
  | 'snow'
  | 'showers'
  | 'thunder';

/** WMO code groups. */
const HEAVY_RAIN = new Set([63, 65, 66, 67, 81, 82]);

export const kindOf = (code: number): WeatherKind => {
  if (code >= 95) return 'thunder';
  if (code === 0 || code === 1) return 'clear';
  if (code === 2) return 'partly';
  if (code === 3) return 'overcast';
  if (code === 45 || code === 48) return 'fog';
  if (code >= 51 && code <= 57) return 'drizzle';
  if (code >= 71 && code <= 77) return 'snow';
  if (code >= 85 && code <= 86) return 'snow';
  if (code >= 80 && code <= 82) return HEAVY_RAIN.has(code) ? 'heavy' : 'showers';
  if (code >= 61 && code <= 67) return HEAVY_RAIN.has(code) ? 'heavy' : 'rain';
  return 'overcast';
};

export interface AdviceData {
  codeNow: number;
  codeToday: number;
  tempNow: number;
  apparent: number;
  tempMax: number;
  tempMin: number;
  windNow: number;
  windMax: number;
  precipProb: number;
  uvMax: number;
  alerts: string[];
}

export interface AdviceResult {
  risk: string[];
  dress: string[];
  plan: string[];
  gear: string[];
}

/** Every string the engine can emit. Values may contain `{event}`. */
export type AdviceStrings = Record<string, string>;

const fill = (tpl: string | undefined, event: string) =>
  (tpl ?? '').replace(/\{event\}/g, event);

export function buildAdvice(d: AdviceData, s: AdviceStrings): AdviceResult {
  const nowKind = kindOf(d.codeNow);
  const todayKind = kindOf(d.codeToday);

  const thunder = nowKind === 'thunder' || todayKind === 'thunder';
  const heavyRain = nowKind === 'heavy' || todayKind === 'heavy';
  const lightRain =
    !heavyRain &&
    (nowKind === 'rain' ||
      nowKind === 'showers' ||
      nowKind === 'drizzle' ||
      todayKind === 'rain' ||
      todayKind === 'showers' ||
      todayKind === 'drizzle');
  const snow = nowKind === 'snow' || todayKind === 'snow';
  const fog = nowKind === 'fog' || todayKind === 'fog';

  const windPeak = Math.max(d.windNow, d.windMax);
  const gale = windPeak >= 50; // from Beaufort 7
  const breezy = !gale && windPeak >= 29; // Beaufort 5–6

  const hot = d.tempNow >= 32 || d.apparent >= 33 || d.tempMax >= 32;
  const cold = d.tempMax <= 10;
  const swing = d.tempMax - d.tempMin > 8;
  const wet = d.precipProb >= 60;
  const uv = d.uvMax >= 5;

  /* ---------- risk (highest priority, always shown on top) ---------- */
  const risk: string[] = [];
  for (const event of d.alerts.slice(0, 3)) risk.push(fill(s.riskAlert, event));
  if (thunder) risk.push(s.riskThunder);
  if (heavyRain) risk.push(s.riskFlood);
  if (gale) risk.push(s.riskGale);
  if (fog) risk.push(s.riskFog);

  /* ---------- what to wear (single best line) ---------- */
  let dress = '';
  if (snow) dress = s.dressSnow;
  else if (cold) dress = s.dressCold;
  else if (hot) dress = s.dressHot;
  else if (heavyRain) dress = s.dressRain;
  else if (breezy) dress = s.dressWind;
  else if (swing) dress = s.dressLayers;
  else dress = s.dressNormal;

  /* ---------- how to plan the visit (single best line) ---------- */
  let plan = '';
  if (d.alerts.length) plan = s.planAlert;
  else if (thunder) plan = s.planThunder;
  else if (heavyRain) plan = s.planHeavy;
  else if (lightRain) plan = s.planLightRain;
  else if (wet) plan = s.planRainChance;
  else if (snow) plan = s.planSnow;
  else if (hot) plan = s.planHot;
  else if (fog) plan = s.planFog;
  else if (nowKind === 'overcast' || todayKind === 'overcast') plan = s.planOvercast;
  else plan = s.planSunny;

  /* ---------- what to carry (every applicable item) ---------- */
  const gear: string[] = [];
  if (heavyRain) gear.push(s.gearRaincoat);
  else if (lightRain || wet) gear.push(s.gearUmbrella);
  if (uv) gear.push(s.gearSunscreen);
  if (hot) gear.push(s.gearWater);
  if (cold) gear.push(s.gearWarm);
  if (fog) gear.push(s.gearMask);

  return {
    risk,
    dress: dress ? [dress] : [],
    plan: plan ? [plan] : [],
    gear: gear.filter(Boolean),
  };
}

export const adviceFromSnapshot = (d: AdviceData, s: AdviceStrings) => buildAdvice(d, s);
