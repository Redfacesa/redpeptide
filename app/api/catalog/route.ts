import { readOverrides } from "@/lib/catalog-store";

export async function GET() {
  const rows = await readOverrides();
  return Response.json({ rows: rows ?? [] });
}
