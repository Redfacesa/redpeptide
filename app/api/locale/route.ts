import { currencyForCountry } from "@/lib/currency";

const wanted = ["EUR", "USD", "GBP", "CHF", "CAD", "AUD", "NZD", "JPY", "CNY", "INR", "AED", "NGN", "KES", "GHS"];

export async function GET(request: Request) {
  const header = request.headers.get("cf-ipcountry") || "";
  const country = /^[A-Z]{2}$/.test(header) ? header : "ZA";
  const currency = currencyForCountry(country);
  const rates: Record<string, number> = { ZAR: 1 };
  try {
    const response = await fetch("https://open.er-api.com/v6/latest/ZAR");
    const data = (await response.json()) as { rates?: Record<string, number> };
    if (data.rates) {
      for (const code of wanted) {
        if (typeof data.rates[code] === "number") rates[code] = data.rates[code];
      }
    }
  } catch {
    rates.EUR = 0.052;
    rates.USD = 0.056;
    rates.GBP = 0.044;
    rates.CHF = 0.049;
  }
  const locale = currency === "ZAR" ? "en-ZA" : currency === "EUR" ? "de-CH" : "en";
  return Response.json({ country, currency, locale, rates });
}
