"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  categoryById,
  defaultVariant,
  relatedProducts,
  type Product,
} from "@/lib/catalog";
import { useMoney } from "@/components/currency";
import { ProductCard } from "@/components/product-card";
import { ProductPhoto } from "@/components/product-photo";
import { useStore } from "@/components/store";

export function ProductDetail({ product: source }: { product: Product }) {
  const store = useStore();
  const product = store.liveProduct(source);
  const { format } = useMoney();
  const category = categoryById(product.category);
  const initial = defaultVariant(product);
  const [variantId, setVariantId] = useState(initial.id);
  const [qty, setQty] = useState(1);
  const [tab, setTab] = useState<"overview" | "spec" | "handling">("overview");
  const variant = product.variants.find((item) => item.id === variantId) ?? initial;
  const related = useMemo(() => relatedProducts(product), [product]);
  const wished = store.wished(product.slug);

  return (
    <div className="wrap pad">
      <div className="product">
        <div className="product-art">
          <ProductPhoto product={product} variant={variant} alt={`${product.name} ${variant.label}`} />
        </div>
        <div>
          <p className="crumbs">
            <Link href="/shop">Shop</Link> / <Link href={`/shop?cat=${category.id}`}>{category.name}</Link>
          </p>
          <p className="eyebrow">{category.name}</p>
          <h1>{product.name}</h1>
          <p className="lede">{product.tagline}</p>
          <p className="price-lg">{format(variant.price)}</p>
          <div className="specs">
            <span>{product.purity}</span>
            <span>{variant.sku}</span>
            <span>{variant.stock > 0 ? `${variant.stock} auf Lager` : "Nicht auf Lager"}</span>
          </div>
          <p className="eyebrow">Grösse</p>
          <div className="option-row">
            {product.variants.map((item) => (
              <button
                key={item.id}
                className={`option ${item.id === variant.id ? "on" : ""}`}
                disabled={item.stock <= 0}
                onClick={() => {
                  setVariantId(item.id);
                  setQty(1);
                }}
              >
                <strong>{item.label}</strong>
                <small>{item.stock > 0 ? format(item.price) : "Nicht verfügbar"}</small>
              </button>
            ))}
          </div>
          <div className="buy">
            <div className="qty">
              <button aria-label="Menge verringern" onClick={() => setQty((value) => Math.max(1, value - 1))}>−</button>
              <input
                aria-label="Menge"
                value={qty}
                onChange={(event) => {
                  const next = Number(event.target.value);
                  if (Number.isFinite(next)) setQty(Math.max(1, Math.min(variant.stock || 1, next)));
                }}
              />
              <button
                aria-label="Menge erhöhen"
                onClick={() => setQty((value) => Math.min(variant.stock || 1, value + 1))}
              >
                +
              </button>
            </div>
            <button
              className="btn"
              disabled={variant.stock <= 0}
              onClick={() => store.add(product.slug, variant.id, qty)}
            >
              {variant.stock > 0 ? "In den Warenkorb" : "Nicht auf Lager"}
            </button>
            <button className="btn secondary" onClick={() => store.toggleWish(product.slug)}>
              {wished ? "Gemerkt" : "Merken"}
            </button>
          </div>
          <div className="notice">
            Nur für die Laborforschung. Nicht zur Anwendung an Mensch oder Tier. Keine Anleitung zu Lösungsmittel oder Anwendung.
          </div>
        </div>
      </div>

      <div className="tabs" role="tablist">
        {(
          [
            ["overview", "Überblick"],
            ["spec", "Spezifikation"],
            ["handling", "Handhabung"],
          ] as const
        ).map(([id, label]) => (
          <button key={id} className={`chip ${tab === id ? "on" : ""}`} onClick={() => setTab(id)} role="tab" aria-selected={tab === id}>
            {label}
          </button>
        ))}
      </div>
      <div className="panel" role="tabpanel">
        {tab === "overview" && <p>{product.overview}</p>}
        {tab === "spec" && (
          <table className="table">
            <tbody>
              <tr><th>Katalogname</th><td>{product.name}</td></tr>
              <tr><th>Grösse</th><td>{variant.label}</td></tr>
              <tr><th>SKU</th><td>{variant.sku}</td></tr>
              <tr><th>Reinheit</th><td>{product.purity}</td></tr>
              <tr><th>Aussehen</th><td>{product.appearance}</td></tr>
              <tr><th>Form</th><td>Lyophilisierter Feststoff</td></tr>
              <tr><th>Lagerung</th><td>{product.storage}</td></tr>
              <tr><th>Zweck</th><td>Laborforschung</td></tr>
            </tbody>
          </table>
        )}
        {tab === "handling" && (
          <p>
            Lassen Sie das Siegel geschlossen, bis der Chargencode zum Zertifikat passt. {product.storage} Lassen Sie das Vial vor dem Öffnen Raumtemperatur annehmen, damit kein Kondensat in den Kuchen gelangt. Diese Seite beschreibt weder Rekonstitution noch Dosierung.
          </p>
        )}
      </div>

      {related.length > 0 && (
        <section className="section">
          <div className="section-head">
            <h2>Dazu passend</h2>
          </div>
          <div className="grid">
            {related.map((item) => (
              <ProductCard key={item.slug} product={item} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
