import { categories, products, type CategoryId, type Product, type Variant } from "@/lib/catalog";

export type PriceRow = { slug: string; variantId: string; price: number; stock: number; name?: string; label?: string };

export type SavedCatalog = { rows: PriceRow[]; added: Product[] };

const FILE = ".data/catalog-overrides.json";
const categoryIds = new Set<string>(categories.map((category) => category.id));

async function kv() {
  try {
    const { env } = await import(/* webpackIgnore: true */ "cloudflare:workers");
    return (env as { CATALOG?: { get: (key: string) => Promise<string | null>; put: (key: string, value: string) => Promise<void> } }).CATALOG ?? null;
  } catch {
    return null;
  }
}

function parseSaved(raw: string): SavedCatalog {
  const parsed = JSON.parse(raw) as PriceRow[] | SavedCatalog;
  if (Array.isArray(parsed)) return { rows: parsed, added: [] };
  return {
    rows: Array.isArray(parsed.rows) ? parsed.rows : [],
    added: Array.isArray(parsed.added) ? parsed.added : [],
  };
}

export async function readSavedCatalog(): Promise<SavedCatalog> {
  const store = await kv();
  if (store) {
    const saved = await store.get("overrides");
    return saved ? parseSaved(saved) : { rows: [], added: [] };
  }
  try {
    const { readFile } = await import("node:fs/promises");
    return parseSaved(await readFile(FILE, "utf8"));
  } catch {
    return { rows: [], added: [] };
  }
}

export async function writeSavedCatalog(saved: SavedCatalog): Promise<"kv" | "file" | null> {
  const body = JSON.stringify(saved);
  const store = await kv();
  if (store) {
    await store.put("overrides", body);
    return "kv";
  }
  try {
    const { mkdir, writeFile } = await import("node:fs/promises");
    await mkdir(".data", { recursive: true });
    await writeFile(FILE, body);
    return "file";
  } catch {
    return null;
  }
}

function withPrices(product: Product, prices: Map<string, PriceRow>): Product {
  return {
    ...product,
    variants: product.variants.map((variant) => {
      const hit = prices.get(`${product.slug}:${variant.id}`);
      return hit && hit.price > 0 ? { ...variant, price: hit.price, stock: hit.stock } : variant;
    }),
  };
}

function photographed(src: string | undefined) {
  return typeof src === "string" && /\.(jpe?g|png|webp)$/i.test(src);
}

export function mergeCatalog(saved: SavedCatalog): Product[] {
  const prices = new Map(saved.rows.filter((row) => row.price > 0).map((row) => [`${row.slug}:${row.variantId}`, row]));
  const extras = new Map(saved.added.map((product) => [product.slug, product]));
  const known = new Set(products.map((product) => product.slug));
  const merged = products.map((product) => {
    const extra = extras.get(product.slug);
    const variants = [...product.variants];
    if (extra) {
      for (const variant of extra.variants) {
        if (!photographed(variant.image)) continue;
        if (!variants.some((item) => item.id === variant.id)) variants.push(variant);
      }
    }
    return withPrices({ ...product, variants }, prices);
  });
  for (const extra of saved.added) {
    const variants = extra.variants.filter((variant) => photographed(variant.image));
    if (!known.has(extra.slug) && variants.length) merged.push(withPrices({ ...extra, variants }, prices));
  }
  return merged;
}

export async function readMergedCatalog(): Promise<Product[]> {
  return mergeCatalog(await readSavedCatalog());
}

function cleanName(value: string) {
  return value.replace(/[<>]/g, "").trim().slice(0, 80);
}

function cleanSlug(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 60);
}

function researchCopy(name: string): Pick<Product, "tagline" | "summary" | "overview" | "purity" | "appearance" | "storage" | "image"> {
  return {
    tagline: "Lyophilized research vial · Geneva",
    summary: `${name} is listed as a sealed research vial. Laboratory use only. Not a medicine and not a dosing protocol.`,
    overview: `${name} is supplied by Novion Biopharma as a lyophilized research solid. The label states research use only. This page does not give preparation, dose, or human-use instructions.`,
    purity: "> 99% HPLC (specification)",
    appearance: "Lyophilized solid in a sealed vial",
    storage: "2–8 °C. Protect from light. Do not freeze.",
    image: "",
  };
}

function cleanVariant(variant: Variant, slug: string): Variant | null {
  const label = cleanName(variant.label || "");
  const price = Number(variant.price);
  const stock = Math.max(0, Math.floor(Number(variant.stock) || 0));
  const id = cleanSlug(String(variant.id || label)) || "size";
  if (!label || !(price > 0)) return null;
  const mg = Number(variant.mg);
  return {
    id,
    label,
    mg: Number.isFinite(mg) ? mg : 0,
    price,
    sku: `NV-${slug.slice(0, 12).toUpperCase()}-${id}`.slice(0, 32),
    stock,
    image: "",
  };
}

export function catalogFromEditor(incoming: Product[]): { rows: PriceRow[]; added: Product[] } | { error: string } {
  if (!Array.isArray(incoming) || incoming.length === 0) return { error: "The catalog is empty." };
  const rows: PriceRow[] = [];
  const added: Product[] = [];
  const seen = new Set<string>();

  for (const item of incoming) {
    const name = cleanName(item.name || "");
    const slug = cleanSlug(item.slug || name);
    const category = item.category;
    if (!name || !slug || seen.has(slug) || !categoryIds.has(category)) continue;
    seen.add(slug);
    const variants = (item.variants || []).map((variant) => cleanVariant(variant, slug)).filter((variant): variant is Variant => variant !== null);
    if (variants.length === 0) continue;
    for (const variant of variants) {
      rows.push({ slug, variantId: variant.id, price: variant.price, stock: variant.stock, name, label: variant.label });
    }
    const base = products.find((product) => product.slug === slug);
    if (!base) {
      added.push({ slug, name, code: slug.slice(0, 6).toUpperCase(), category: category as CategoryId, ...researchCopy(name), variants });
      continue;
    }
    const extra = variants.filter((variant) => !base.variants.some((item) => item.id === variant.id));
    if (extra.length) {
      added.push({ ...base, name: base.name, variants: extra });
    }
  }

  if (rows.length === 0) return { error: "Add a price before saving." };
  return { rows, added };
}
