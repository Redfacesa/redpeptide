"use client";

import Link from "next/link";
import { categoryById, defaultVariant, hasPriceRange, inStock, minPrice, type Product } from "@/lib/catalog";
import { money } from "@/lib/format";
import { useStore } from "@/components/store";
import { Vial } from "@/components/vial";

export function ProductCard({ product }: { product: Product }) {
  const store = useStore();
  const category = categoryById(product.category);
  const variant = defaultVariant(product);
  const wished = store.wished(product.slug);

  return (
    <article className="card">
      <Link href={`/product/${product.slug}`} className="card-art" aria-label={product.name}>
        {product.badge && <span className="flag">{product.badge}</span>}
        <Vial tone={category.tone} code={product.code} />
      </Link>
      <button
        className={`wish ${wished ? "on" : ""}`}
        aria-label={wished ? `Remove ${product.name} from wishlist` : `Save ${product.name}`}
        onClick={() => store.toggleWish(product.slug)}
      >
        {wished ? "♥" : "♡"}
      </button>
      <div className="card-body">
        <p className="eyebrow">{category.name}</p>
        <h3>
          <Link href={`/product/${product.slug}`}>{product.name}</Link>
        </h3>
        <p className="muted">{product.tagline}</p>
        <p className="muted">{product.variants.map((item) => item.label).join(" · ")}</p>
        <div className="card-row">
          <span className="price">
            {hasPriceRange(product) ? "From " : ""}
            {money(minPrice(product))}
          </span>
          <button
            className="btn small"
            disabled={!inStock(product)}
            onClick={() => store.add(product.slug, variant.id)}
          >
            {inStock(product) ? "Add" : "Sold out"}
          </button>
        </div>
      </div>
    </article>
  );
}
