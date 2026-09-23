"use client";

import Link from "next/link";
import { getProduct } from "@/lib/catalog";
import { ProductCard } from "@/components/product-card";
import { useStore } from "@/components/store";

export default function WishlistPage() {
  const store = useStore();
  const items = store.wishlist.flatMap((slug) => {
    const product = getProduct(slug);
    return product ? [product] : [];
  });

  return (
    <div className="wrap pad">
      <div className="page-title">
        <p className="eyebrow">Wishlist</p>
        <h1>Saved compounds</h1>
      </div>
      {items.length === 0 ? (
        <div className="empty" style={{ marginTop: 18 }}>
          <p>Nothing saved yet. Use the heart on a compound card.</p>
          <p style={{ marginTop: 12 }}><Link className="btn" href="/shop">Browse the catalog</Link></p>
        </div>
      ) : (
        <div className="grid" style={{ marginTop: 18 }}>
          {items.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
