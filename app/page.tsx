import Link from "next/link";
import { categories } from "@/lib/catalog";
import { readMergedCatalog } from "@/lib/catalog-store";
import { ProductCard } from "@/components/product-card";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const products = await readMergedCatalog();
  const visible = categories.filter((category) => products.some((product) => product.category === category.id));

  return (
    <div className="wrap storefront">
      <div className="store-head">
        <div>
          <p className="eyebrow">Novion · Genf</p>
          <h1>Forschungskatalog</h1>
        </div>
        <p className="muted">Versiegelte Vials. Preise in CHF.</p>
      </div>
      <div className="chip-rail" aria-label="Kategorien">
        <Link className="chip on" href="/shop">Alle</Link>
        {visible.map((category) => (
          <Link className="chip" key={category.id} href={`/shop?cat=${category.id}`}>{category.name}</Link>
        ))}
      </div>
      <div className="grid">
        {products.map((product) => (
          <ProductCard key={product.slug} product={product} />
        ))}
      </div>
    </div>
  );
}
