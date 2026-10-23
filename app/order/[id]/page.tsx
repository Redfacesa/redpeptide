"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useMoney } from "@/components/currency";
import { useStore } from "@/components/store";
import { statusLabel, type Order, type OrderStatus } from "@/lib/order";

const steps: OrderStatus[] = ["pending", "paid", "packed", "shipped"];

export default function OrderPage() {
  const params = useParams<{ id: string }>();
  const store = useStore();
  const { format } = useMoney();
  const [remote, setRemote] = useState<Order | null>(null);
  const [message, setMessage] = useState("");
  const local = store.orders.find((item) => item.id === params.id);
  const order = remote || local;

  useEffect(() => {
    if (!store.ready || !store.token || !params.id) return;
    fetch(`/api/orders/${params.id}`, { headers: { Authorization: `Bearer ${store.token}` } })
      .then(async (response) => {
        const data = (await response.json().catch(() => ({}))) as { order?: Order; message?: string };
        if (response.ok && data.order) {
          setRemote(data.order);
          store.rememberOrder(data.order);
          return;
        }
        setMessage(data.message || "That order is not on this account.");
      })
      .catch(() => setMessage("The order could not be loaded."));
  }, [store.ready, store.token, params.id]);

  if (!store.ready) return <div className="wrap pad">Loading order…</div>;

  if (!store.token) {
    return (
      <div className="wrap pad prose">
        <p className="eyebrow">Order</p>
        <h1>Sign in to track {params.id}</h1>
        <p>Orders are kept on the account that placed them.</p>
        <p>
          <Link className="btn" href="/account" onClick={() => sessionStorage.setItem("nv-next", `/order/${params.id}`)}>
            Sign in
          </Link>
        </p>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="wrap pad prose">
        <h1>Order not on this account</h1>
        <p>{message || "Sign in with the email used at checkout."}</p>
        <p><Link className="btn" href="/account">Open account</Link></p>
      </div>
    );
  }

  const current = steps.indexOf(order.status);

  return (
    <div className="wrap pad">
      <p className="eyebrow">Order · {statusLabel[order.status]}</p>
      <h1 style={{ fontSize: "clamp(40px, 5vw, 64px)" }}>{order.id}</h1>
      {order.status === "cancelled" ? (
        <p className="lede">This order was cancelled.</p>
      ) : (
        <ol className="track">
          {steps.map((step, index) => (
            <li className={index <= current ? "on" : ""} key={step}>{statusLabel[step]}</li>
          ))}
        </ol>
      )}
      <div className="split" style={{ marginTop: 20 }}>
        <div className="panel">
          {order.lines.map((line) => (
            <div className="row" key={`${line.sku}-${line.variant}`}>
              <span>{line.name} · {line.variant} × {line.qty}</span>
              <span>{format(line.price * line.qty)}</span>
            </div>
          ))}
          <div className="row"><span>Delivery</span><span>{order.shippingCost === 0 ? "Free" : format(order.shippingCost)}</span></div>
          <div className="row total"><span>Total</span><strong>{format(order.total)}</strong></div>
        </div>
        <aside className="summary">
          <h2>Ship to</h2>
          <p>{order.name}</p>
          <p>{order.line1}</p>
          <p>{order.postcode} {order.city}</p>
          <p>{order.country}</p>
          <p className="muted" style={{ marginTop: 8 }}>{order.email}</p>
          <p className="muted">{order.shipping === "express" ? "Express" : "Standard"} delivery</p>
          <Link className="btn" href="/account" style={{ marginTop: 14 }}>All orders</Link>
        </aside>
      </div>
    </div>
  );
}
