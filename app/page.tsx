import Link from "next/link";
import { categories } from "@/lib/catalog";
import { tx } from "@/lib/region";
import { readMergedCatalog } from "@/lib/catalog-store";
import { ProductCard } from "@/components/product-card";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const products = await readMergedCatalog();
  const visible = categories.filter((category) => products.some((product) => product.category === category.id));

  return (
    <div className="wrap storefront">
      <figure className="home-hero">
        <img src="/images/hero.jpg" alt={tx("Novion Retatrutide 10 mg, Vial und Karton", "Novion Retatrutide 10 mg, vial and carton")} />
      </figure>
      <div className="store-head">
        <div>
          <p className="eyebrow">{tx("Novion · Genf", "Novion · South Africa")}</p>
          <h1>{tx("Forschungskatalog", "Research catalog")}</h1>
        </div>
        <p className="muted">{tx("Versiegelte Vials. Preise in CHF.", "Sealed vials. Prices in rand.")}</p>
      </div>
      <div className="chip-rail" aria-label={tx("Kategorien", "Categories")}>
        <Link className="chip on" href="/shop">{tx("Alle", "All")}</Link>
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
