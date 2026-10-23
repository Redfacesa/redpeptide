import { readMergedCatalog } from "@/lib/catalog-store";

export async function GET() {
  return Response.json({ products: await readMergedCatalog() });
}
