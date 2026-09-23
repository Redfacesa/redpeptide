"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { money } from "@/lib/format";
import { useStore } from "@/components/store";

export default function OrderPage() {
  const params = useParams<{ id: string }>();
  const store = useStore();
  const order = store.orders.find((item) => item.id === params.id);

  if (!store.ready) return <div className="wrap pad">Loading order…</div>;

  if (!order) {
    return (
      <div className="wrap pad prose">
        <h1>Order not on this browser</h1>
        <p>Sample orders stay in local storage on the device that placed them.</p>
        <p><Link className="btn" href="/account">Open account</Link></p>
      </div>
    );
  }

  return (
    <div className="wrap pad">
      <p className="eyebrow">Sample order</p>
      <h1 style={{ fontSize: "clamp(40px, 5vw, 64px)" }}>{order.id}</h1>
      <p className="lede">Saved on this browser. No payment was captured and no parcel was created.</p>
      <div className="split" style={{ marginTop: 20 }}>
        <div className="panel">
          {order.lines.map((line) => (
            <div className="row" key={`${line.slug}-${line.variantId}`}>
              <span>{line.name} · {line.variant} × {line.qty}</span>
              <span>{money(line.price * line.qty)}</span>
            </div>
          ))}
          <div className="row"><span>Delivery</span><span>{order.shippingCost === 0 ? "Free" : money(order.shippingCost)}</span></div>
          <div className="row total"><span>Total</span><strong>{money(order.total)}</strong></div>
        </div>
        <aside className="summary">
          <h2>Ship to</h2>
          <p>{order.name}</p>
          <p>{order.line1}</p>
          <p>{order.postcode} {order.city}</p>
          <p>{order.country}</p>
          <p className="muted" style={{ marginTop: 8 }}>{order.email}</p>
          <p className="muted">{order.shipping === "express" ? "Express" : "Standard"} delivery</p>
          <Link className="btn" href="/shop" style={{ marginTop: 14 }}>Continue browsing</Link>
        </aside>
      </div>
    </div>
  );
}
