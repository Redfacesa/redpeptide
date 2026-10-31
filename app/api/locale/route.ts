export async function GET() {
  return Response.json({ country: "CH", currency: "CHF", locale: "en-CH", rates: { CHF: 1 } });
}
