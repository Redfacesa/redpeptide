const MIN_RATE = 12;
const MAX_RATE = 40;

let cached: { rate: number; at: number } | null = null;

export function chfToZar(chf: number, zarPerChf: number) {
  return Math.round(chf * zarPerChf);
}

export async function zarPerChf() {
  if (cached && Date.now() - cached.at < 30 * 60 * 1000) return cached.rate;
  const response = await fetch("https://open.er-api.com/v6/latest/CHF");
  const data = (await response.json().catch(() => ({}))) as { rates?: { ZAR?: number } };
  const rate = Number(data.rates?.ZAR);
  if (!response.ok || rate < MIN_RATE || rate > MAX_RATE) {
    throw new Error("Der Franken-Rand-Kurs ist gerade nicht verfügbar.");
  }
  cached = { rate, at: Date.now() };
  return rate;
}
