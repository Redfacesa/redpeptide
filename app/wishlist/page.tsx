"use client";

import Link from "next/link";
import { ProductCard } from "@/components/product-card";
import { useStore } from "@/components/store";
import { tx } from "@/lib/region";

export default function WishlistPage() {
  const store = useStore();
  const items = store.wishlist.flatMap((slug) => {
    const product = store.findProduct(slug);
    return product ? [product] : [];
  });

  return (
    <div className="wrap pad">
      <div className="page-title">
        <p className="eyebrow">{tx("Merkliste", "Wishlist")}</p>
        <h1>{tx("Gespeicherte Verbindungen", "Saved compounds")}</h1>
      </div>
      {items.length === 0 ? (
        <div className="empty" style={{ marginTop: 18 }}>
          <p>{tx("Noch nichts gemerkt. Nutzen Sie das Herz auf einer Karte.", "Nothing saved yet. Use the heart on a card.")}</p>
          <p style={{ marginTop: 12 }}><Link className="btn" href="/shop">{tx("Zum Shop", "To the shop")}</Link></p>
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
