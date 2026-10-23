import { products } from "@/lib/catalog";

type Row = { slug: string; variantId: string; price: number; stock: number; name?: string; label?: string };

const FILE = ".data/catalog-overrides.json";

async function kv() {
  try {
    const { env } = await import(/* webpackIgnore: true */ "cloudflare:workers");
    return (env as { CATALOG?: { get: (k: string) => Promise<string | null>; put: (k: string, v: string) => Promise<void> } }).CATALOG ?? null;
  } catch {
    return null;
  }
}

async function readFileRows(): Promise<Row[] | null> {
  try {
    const { readFile } = await import("node:fs/promises");
    const parsed = JSON.parse(await readFile(FILE, "utf8")) as Row[];
    return Array.isArray(parsed) ? parsed : null;
  } catch {
    return null;
  }
}

async function writeFileRows(rows: Row[]) {
  const { mkdir, writeFile } = await import("node:fs/promises");
  await mkdir(".data", { recursive: true });
  await writeFile(FILE, JSON.stringify(rows));
}

export async function GET() {
  const store = await kv();
  if (store) {
    const saved = await store.get("overrides");
    return Response.json({ rows: saved ? JSON.parse(saved) : null, products: products.length });
  }
  return Response.json({ rows: await readFileRows(), products: products.length });
}

export async function POST(request: Request) {
  const password = request.headers.get("x-admin-password") || "";
  const expected = process.env.ADMIN_PASSWORD || "";
  if (!expected || password !== expected) {
    return Response.json({ message: "Set ADMIN_PASSWORD on the worker, then sign in with it." }, { status: 401 });
  }
  const body = (await request.json()) as { rows?: Row[] };
  const rows = body.rows ?? [];
  const store = await kv();
  let saved = false;
  if (store) {
    await store.put("overrides", JSON.stringify(rows));
    saved = true;
  } else {
    try {
      await writeFileRows(rows);
      saved = true;
    } catch {
      saved = false;
    }
  }

  const merchantId = process.env.NOVION_MERCHANT_ID || "";
  const apiKey = process.env.REDFACE_API_KEY || "";
  let synced = 0;
  if (merchantId && apiKey) {
    const endpoint = process.env.REDFACE_COMMERCE_API ?? "https://bpzzgilwlkghgfkvkkxx.supabase.co/functions/v1/commerce-api";
    for (const row of rows) {
      const product = products.find((item) => item.slug === row.slug);
      const variant = product?.variants.find((item) => item.id === row.variantId);
      if (!product || !variant || !(row.price > 0)) continue;
      const response = await fetch(`${endpoint}/products`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
          "X-Api-Key": apiKey,
        },
        body: JSON.stringify({
          merchant_id: merchantId,
          name: `${product.name} ${variant.label}`,
          price: row.price,
          currency: "ZAR",
          stock_quantity: row.stock,
          track_inventory: true,
        }),
      });
      if (response.ok) synced += 1;
    }
  }

  const where = store ? "the Novion catalog store" : saved ? "the local catalog file" : "nowhere — the catalog store is not connected";
  const pay = merchantId && apiKey ? ` ${synced} sizes were sent to Redface Pay.` : " Add NOVION_MERCHANT_ID and REDFACE_API_KEY to sync the Redface Pay product database.";
  return Response.json({ ok: saved, message: `Saved to ${where}.${pay}` });
}
