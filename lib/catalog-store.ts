export async function catalogKv() {
  try {
    const { env } = await import(/* webpackIgnore: true */ "cloudflare:workers");
    return (
      (env as {
        CATALOG?: {
          get: (key: string) => Promise<string | null>;
          put: (key: string, value: string) => Promise<void>;
        };
      }).CATALOG ?? null
    );
  } catch {
    return null;
  }
}

export type CatalogRow = {
  slug: string;
  variantId: string;
  price: number;
  stock: number;
  name?: string;
  label?: string;
};

export async function readOverrides(): Promise<CatalogRow[] | null> {
  const store = await catalogKv();
  if (!store) return null;
  const saved = await store.get("overrides");
  if (!saved) return null;
  const parsed = JSON.parse(saved) as CatalogRow[];
  return Array.isArray(parsed) ? parsed : null;
}
