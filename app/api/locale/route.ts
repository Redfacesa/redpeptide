import { isZa } from "@/lib/region";

export function GET() {
  if (isZa) return Response.json({ country: "ZA", currency: "ZAR", locale: "en-ZA", rates: { ZAR: 1 } });
  return Response.json({ country: "CH", currency: "CHF", locale: "de-CH", rates: { CHF: 1 } });
}
