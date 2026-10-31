"use client";

import Link from "next/link";
import { defaultVariant, hasPriceRange, inStock, minPrice, type Product } from "@/lib/catalog";
import { useMoney } from "@/components/currency";
import { ProductPhoto } from "@/components/product-photo";
import { useStore } from "@/components/store";

export function ProductCard({ product: source }: { product: Product }) {
  const store = useStore();
  const product = store.liveProduct(source);
  const { format } = useMoney();
  const variant = defaultVariant(product);
  const wished = store.wished(product.slug);

  return (
    <article className="card">
      <Link href={`/product/${product.slug}`} className="card-art" aria-label={product.name}>
        {product.badge && <span className="flag">{product.badge}</span>}
        <ProductPhoto product={product} variant={variant} alt={`${product.name} Forschungsvial`} />
      </Link>
      <button
        className={`wish ${wished ? "on" : ""}`}
        aria-label={wished ? `${product.name} von der Merkliste nehmen` : `${product.name} merken`}
        onClick={() => store.toggleWish(product.slug)}
      >
        <Heart filled={wished} />
      </button>
      <div className="card-body">
        <h3>
          <Link href={`/product/${product.slug}`}>{product.name}</Link>
        </h3>
        <p className="muted">{product.variants.map((item) => item.label).join(" · ")}</p>
        <div className="card-row">
          <span className="price">
            {hasPriceRange(product) ? "Ab " : ""}
            {format(minPrice(product))}
          </span>
          <button
            className="btn small"
            disabled={!inStock(product)}
            onClick={() => store.add(product.slug, variant.id)}
          >
            {inStock(product) ? "Kaufen" : "Weg"}
          </button>
        </div>
      </div>
    </article>
  );
}

function Heart({ filled }: { filled: boolean }) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
      <path d="M12 19s-7-4.4-7-9a4 4 0 0 1 7-2 4 4 0 0 1 7 2c0 4.6-7 9-7 9z" />
    </svg>
  );
}
