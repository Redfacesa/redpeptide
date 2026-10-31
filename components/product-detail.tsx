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
import { tx } from "@/lib/region";

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
            <span>{variant.stock > 0 ? tx(`${variant.stock} auf Lager`, `${variant.stock} in stock`) : tx("Nicht auf Lager", "Out of stock")}</span>
          </div>
          <p className="eyebrow">{tx("Grösse", "Size")}</p>
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
                <small>{item.stock > 0 ? format(item.price) : tx("Nicht verfügbar", "Unavailable")}</small>
              </button>
            ))}
          </div>
          <div className="buy">
            <div className="qty">
              <button aria-label={tx("Menge verringern", "Decrease quantity")} onClick={() => setQty((value) => Math.max(1, value - 1))}>−</button>
              <input
                aria-label={tx("Menge", "Quantity")}
                value={qty}
                onChange={(event) => {
                  const next = Number(event.target.value);
                  if (Number.isFinite(next)) setQty(Math.max(1, Math.min(variant.stock || 1, next)));
                }}
              />
              <button
                aria-label={tx("Menge erhöhen", "Increase quantity")}
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
              {variant.stock > 0 ? tx("In den Warenkorb", "Add to basket") : tx("Nicht auf Lager", "Out of stock")}
            </button>
            <button className="btn secondary" onClick={() => store.toggleWish(product.slug)}>
              {wished ? tx("Gemerkt", "Saved") : tx("Merken", "Save")}
            </button>
          </div>
          <div className="notice">
            {tx("Nur für die Laborforschung. Nicht zur Anwendung an Mensch oder Tier. Keine Anleitung zu Lösungsmittel oder Anwendung.", "Laboratory research only. Not for use in people or animals. No instructions for solvent or use.")}
          </div>
        </div>
      </div>

      <div className="tabs" role="tablist">
        {(
          [
            ["overview", tx("Überblick", "Overview")],
            ["spec", tx("Spezifikation", "Specification")],
            ["handling", tx("Handhabung", "Handling")],
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
              <tr><th>{tx("Katalogname", "Catalog name")}</th><td>{product.name}</td></tr>
              <tr><th>{tx("Grösse", "Size")}</th><td>{variant.label}</td></tr>
              <tr><th>SKU</th><td>{variant.sku}</td></tr>
              <tr><th>{tx("Reinheit", "Purity")}</th><td>{product.purity}</td></tr>
              <tr><th>{tx("Aussehen", "Appearance")}</th><td>{product.appearance}</td></tr>
              <tr><th>{tx("Form", "Form")}</th><td>{tx("Lyophilisierter Feststoff", "Lyophilized solid")}</td></tr>
              <tr><th>{tx("Lagerung", "Storage")}</th><td>{product.storage}</td></tr>
              <tr><th>{tx("Zweck", "Purpose")}</th><td>{tx("Laborforschung", "Laboratory research")}</td></tr>
            </tbody>
          </table>
        )}
        {tab === "handling" && (
          <p>
            {tx(
              `Lassen Sie das Siegel geschlossen, bis der Chargencode zum Zertifikat passt. ${product.storage} Lassen Sie das Vial vor dem Öffnen Raumtemperatur annehmen, damit kein Kondensat in den Kuchen gelangt. Diese Seite beschreibt weder Rekonstitution noch Dosierung.`,
              `Keep the seal closed until the batch code matches the certificate. ${product.storage} Let the vial reach room temperature before opening so condensate does not enter the cake. This page does not describe reconstitution or dosing.`,
            )}
          </p>
        )}
      </div>

      {related.length > 0 && (
        <section className="section">
          <div className="section-head">
            <h2>{tx("Dazu passend", "Related")}</h2>
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
