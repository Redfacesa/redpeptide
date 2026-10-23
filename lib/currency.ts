export const currencyByCountry: Record<string, string> = {
  ZA: "ZAR",
  CH: "CHF",
  LI: "CHF",
  GB: "GBP",
  US: "USD",
  CA: "CAD",
  AU: "AUD",
  NZ: "NZD",
  JP: "JPY",
  CN: "CNY",
  IN: "INR",
  AE: "AED",
  NG: "NGN",
  KE: "KES",
  GH: "GHS",
};

const euro = new Set(["AT", "BE", "DE", "EE", "ES", "FI", "FR", "GR", "IE", "IT", "LT", "LU", "LV", "NL", "PT", "SI", "SK"]);

export function currencyForCountry(code: string) {
  const country = code.toUpperCase();
  if (currencyByCountry[country]) return currencyByCountry[country];
  if (euro.has(country)) return "EUR";
  return "ZAR";
}

export function formatMoney(zarAmount: number, currency: string, rate: number, locale: string) {
  const value = currency === "ZAR" ? zarAmount : zarAmount * rate;
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    maximumFractionDigits: currency === "JPY" ? 0 : 2,
  }).format(value);
}
