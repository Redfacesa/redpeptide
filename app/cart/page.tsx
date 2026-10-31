"use client";

import Link from "next/link";
import { getVariant } from "@/lib/catalog";
import { FREE_SHIPPING_AT, shippingCost } from "@/lib/format";
import { useMoney } from "@/components/currency";
import { ProductPhoto } from "@/components/product-photo";
import { useStore } from "@/components/store";
import { tx } from "@/lib/region";

export default function CartPage() {
  const store = useStore();
  const { format } = useMoney();
  const lines = store.cart.flatMap((line) => {
    const product = store.findProduct(line.slug);
    const variant = product && getVariant(product, line.variantId);
    return product && variant ? [{ line, product, variant }] : [];
  });
  const subtotal = lines.reduce((sum, item) => sum + item.variant.price * item.line.qty, 0);
  const standard = shippingCost(subtotal, "standard");

  return (
    <div className="wrap pad">
      <div className="page-title">
        <p className="eyebrow">{tx("Warenkorb", "Basket")}</p>
        <h1>{tx("Ihre Auswahl", "Your selection")}</h1>
      </div>
      {lines.length === 0 ? (
        <div className="empty" style={{ marginTop: 18 }}>
          <p>{tx("Der Warenkorb ist leer.", "The basket is empty.")}</p>
          <p style={{ marginTop: 12 }}><Link className="btn" href="/shop">{tx("Zum Shop", "To the shop")}</Link></p>
        </div>
      ) : (
        <div className="cart-layout" style={{ marginTop: 18 }}>
          <div>
            {lines.map(({ line, product, variant }) => (
              <article className="line" key={`${line.slug}-${line.variantId}`}>
                <ProductPhoto product={product} variant={variant} alt="" />
                <div>
                  <h2 style={{ fontSize: 28 }}><Link href={`/product/${product.slug}`}>{product.name}</Link></h2>
                  <p className="muted">{variant.label} · {variant.sku}</p>
                  <div className="qty" style={{ marginTop: 8 }}>
                    <button aria-label={tx("Menge verringern", "Decrease quantity")} onClick={() => store.setQty(line.slug, line.variantId, line.qty - 1)}>−</button>
                    <input readOnly value={line.qty} aria-label={tx("Menge", "Quantity")} />
                    <button aria-label={tx("Menge erhöhen", "Increase quantity")} onClick={() => store.setQty(line.slug, line.variantId, line.qty + 1)}>+</button>
                  </div>
                </div>
                <div className="line-side">
                  <strong>{format(variant.price * line.qty)}</strong>
                  <button className="text-btn" onClick={() => store.remove(line.slug, line.variantId)}>{tx("Entfernen", "Remove")}</button>
                </div>
              </article>
            ))}
          </div>
          <aside className="summary">
            <h2>{tx("Übersicht", "Summary")}</h2>
            <div className="row"><span>{tx("Zwischensumme", "Subtotal")}</span><span>{format(subtotal)}</span></div>
            <div className="row"><span>{tx("Standardversand", "Standard shipping")}</span><span>{standard === 0 ? tx("Kostenlos", "Free") : format(standard)}</span></div>
            <div className="row total"><span>{tx("Geschätzt", "Estimated")}</span><strong>{format(subtotal + standard)}</strong></div>
            <p className="muted">
              {subtotal >= FREE_SHIPPING_AT
                ? tx("Der Standardversand ist bei dieser Bestellung kostenlos.", "Standard shipping is free on this order.")
                : tx(`Noch ${format(FREE_SHIPPING_AT - subtotal)} bis zum kostenlosen Standardversand.`, `${format(FREE_SHIPPING_AT - subtotal)} more for free standard shipping.`)}
            </p>
            <Link className="btn full" href="/checkout" style={{ marginTop: 14 }}>{tx("Zur Kasse", "Checkout")}</Link>
          </aside>
        </div>
      )}
    </div>
  );
}
