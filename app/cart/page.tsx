"use client";

import Link from "next/link";
import { getProduct, getVariant } from "@/lib/catalog";
import { FREE_SHIPPING_AT, money, shippingCost } from "@/lib/format";
import { ProductPhoto } from "@/components/product-photo";
import { useStore } from "@/components/store";

export default function CartPage() {
  const store = useStore();
  const lines = store.cart.flatMap((line) => {
    const product = getProduct(line.slug);
    const variant = product && getVariant(product, line.variantId);
    return product && variant ? [{ line, product, variant }] : [];
  });
  const subtotal = lines.reduce((sum, item) => sum + item.variant.price * item.line.qty, 0);
  const standard = shippingCost(subtotal, "standard");

  return (
    <div className="wrap pad">
      <div className="page-title">
        <p className="eyebrow">Cart</p>
        <h1>Your selection</h1>
      </div>
      {lines.length === 0 ? (
        <div className="empty" style={{ marginTop: 18 }}>
          <p>The cart is empty.</p>
          <p style={{ marginTop: 12 }}><Link className="btn" href="/shop">Browse compounds</Link></p>
        </div>
      ) : (
        <div className="cart-layout" style={{ marginTop: 18 }}>
          <div>
            {lines.map(({ line, product, variant }) => (
              <article className="line" key={`${line.slug}-${line.variantId}`}>
                <ProductPhoto slug={product.slug} alt="" />
                <div>
                  <h2 style={{ fontSize: 28 }}><Link href={`/product/${product.slug}`}>{product.name}</Link></h2>
                  <p className="muted">{variant.label} · {variant.sku}</p>
                  <div className="qty" style={{ marginTop: 8 }}>
                    <button aria-label="Decrease" onClick={() => store.setQty(line.slug, line.variantId, line.qty - 1)}>−</button>
                    <input readOnly value={line.qty} aria-label="Quantity" />
                    <button aria-label="Increase" onClick={() => store.setQty(line.slug, line.variantId, line.qty + 1)}>+</button>
                  </div>
                </div>
                <div className="line-side">
                  <strong>{money(variant.price * line.qty)}</strong>
                  <button className="text-btn" onClick={() => store.remove(line.slug, line.variantId)}>Remove</button>
                </div>
              </article>
            ))}
          </div>
          <aside className="summary">
            <h2>Summary</h2>
            <div className="row"><span>Subtotal</span><span>{money(subtotal)}</span></div>
            <div className="row"><span>Standard delivery</span><span>{standard === 0 ? "Free" : money(standard)}</span></div>
            <div className="row total"><span>Estimated</span><strong>{money(subtotal + standard)}</strong></div>
            <p className="muted">
              {subtotal >= FREE_SHIPPING_AT
                ? "Standard delivery is free on this order."
                : `Add ${money(FREE_SHIPPING_AT - subtotal)} for free standard delivery.`}
            </p>
            <Link className="btn full" href="/checkout" style={{ marginTop: 14 }}>Continue to checkout</Link>
          </aside>
        </div>
      )}
    </div>
  );
}
