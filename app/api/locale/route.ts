import { currencyForCountry } from "@/lib/currency";

const wanted = ["EUR", "USD", "GBP", "ZAR", "CAD", "AUD", "NZD", "JPY", "CNY", "INR", "AED", "NGN", "KES", "GHS"];

export async function GET(request: Request) {
  const header = request.headers.get("cf-ipcountry") || "";
  const country = /^[A-Z]{2}$/.test(header) && header !== "XX" && header !== "T1" ? header : "CH";
  const currency = currencyForCountry(country);
  const rates: Record<string, number> = { CHF: 1 };
  try {
    const response = await fetch("https://open.er-api.com/v6/latest/CHF");
    const data = (await response.json()) as { rates?: Record<string, number> };
    if (data.rates) {
      for (const code of wanted) {
        if (typeof data.rates[code] === "number") rates[code] = data.rates[code];
      }
    }
  } catch {
    rates.EUR = 1.07;
    rates.USD = 1.15;
    rates.GBP = 0.9;
    rates.ZAR = 20.4;
  }
  const locale = currency === "CHF" ? "en-CH" : currency === "EUR" ? "en-IE" : currency === "GBP" ? "en-GB" : currency === "ZAR" ? "en-ZA" : "en";
  return Response.json({ country, currency, locale, rates });
}
