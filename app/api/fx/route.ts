import { zarPerChf } from "@/lib/fx";

export async function GET() {
  try {
    const rate = await zarPerChf();
    return Response.json({ zarPerChf: rate, chargeCurrency: "ZAR" });
  } catch {
    return Response.json({ message: "Der Franken-Rand-Kurs ist gerade nicht verfügbar." }, { status: 503 });
  }
}
