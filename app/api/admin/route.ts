import { products } from "@/lib/catalog";
import { requireCatalogEditor } from "@/lib/admin-auth";
import { catalogFromEditor, readMergedCatalog, readSavedCatalog, writeSavedCatalog, type PriceRow } from "@/lib/catalog-store";
import type { Product } from "@/lib/catalog";

export async function GET() {
  const [saved, merged] = await Promise.all([readSavedCatalog(), readMergedCatalog()]);
  return Response.json({ rows: saved.rows, added: saved.added, products: merged });
}

export async function POST(request: Request) {
  const editor = await requireCatalogEditor(request);
  if (!editor.ok) return Response.json({ message: editor.message }, { status: editor.status });

  const body = (await request.json()) as { products?: Product[]; rows?: PriceRow[] };
  const incoming = body.products ?? [];
  const built = catalogFromEditor(incoming.length ? incoming : products);
  if ("error" in built) return Response.json({ message: built.error }, { status: 400 });

  const before = await readSavedCatalog();
  const where = await writeSavedCatalog(built);
  if (!where) return Response.json({ message: "The catalog store is not connected." }, { status: 500 });

  const merchantId = process.env.NOVION_MERCHANT_ID || "";
  const apiKey = process.env.REDFACE_API_KEY || "";
  let synced = 0;
  if (merchantId && apiKey) {
    const endpoint = process.env.REDFACE_COMMERCE_API ?? "https://bpzzgilwlkghgfkvkkxx.supabase.co/functions/v1/commerce-api";
    const previous = new Map(before.rows.map((row) => [`${row.slug}:${row.variantId}`, row]));
    for (const row of built.rows) {
      const earlier = previous.get(`${row.slug}:${row.variantId}`);
      const base = products.find((product) => product.slug === row.slug)?.variants.find((variant) => variant.id === row.variantId);
      const changed = earlier
        ? earlier.price !== row.price || earlier.stock !== row.stock
        : !base || base.price !== row.price || base.stock !== row.stock;
      if (!changed) continue;
      const response = await fetch(`${endpoint}/products`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
          "X-Api-Key": apiKey,
        },
        body: JSON.stringify({
          merchant_id: merchantId,
          name: `${row.name ?? row.slug} ${row.label ?? row.variantId}`,
          price: row.price,
          currency: "ZAR",
          stock_quantity: row.stock,
          track_inventory: true,
        }),
      });
      if (response.ok) synced += 1;
    }
  }

  const place = where === "kv" ? "the Novion catalog store" : "the local catalog file";
  const pay = merchantId && apiKey ? ` ${synced} sizes were sent to Redface Pay.` : "";
  return Response.json({ ok: true, message: `Saved to ${place}.${pay}`, products: await readMergedCatalog() });
}
