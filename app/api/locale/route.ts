export async function GET() {
  return Response.json({ country: "CH", currency: "CHF", locale: "de-CH", rates: { CHF: 1 } });
}
