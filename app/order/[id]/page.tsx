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
        setMessage(data.message || "Diese Bestellung gehört nicht zu diesem Konto.");
      })
      .catch(() => setMessage("Die Bestellung konnte nicht geladen werden."));
  }, [store.ready, store.token, params.id]);

  if (!store.ready) return <div className="wrap pad">Bestellung wird geladen…</div>;

  if (!store.token) {
    return (
      <div className="wrap pad prose">
        <p className="eyebrow">Bestellung</p>
        <h1>Melden Sie sich an, um {params.id} zu verfolgen</h1>
        <p>Bestellungen bleiben auf dem Konto, das sie aufgegeben hat.</p>
        <p>
          <Link className="btn" href="/account" onClick={() => sessionStorage.setItem("nv-next", `/order/${params.id}`)}>
            Anmelden
          </Link>
        </p>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="wrap pad prose">
        <h1>Bestellung nicht auf diesem Konto</h1>
        <p>{message || "Melden Sie sich mit der E-Mail von der Kasse an."}</p>
        <p><Link className="btn" href="/account">Konto öffnen</Link></p>
      </div>
    );
  }

  const current = steps.indexOf(order.status);

  return (
    <div className="wrap pad">
      <p className="eyebrow">Bestellung · {statusLabel[order.status]}</p>
      <h1 style={{ fontSize: "clamp(40px, 5vw, 64px)" }}>{order.id}</h1>
      {order.status === "cancelled" ? (
        <p className="lede">Diese Bestellung wurde storniert.</p>
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
          <div className="row"><span>Versand</span><span>{order.shippingCost === 0 ? "Kostenlos" : format(order.shippingCost)}</span></div>
          <div className="row total"><span>Total</span><strong>{format(order.total)}</strong></div>
        </div>
        <aside className="summary">
          <h2>Lieferadresse</h2>
          <p>{order.name}</p>
          <p>{order.line1}</p>
          <p>{order.postcode} {order.city}</p>
          <p>{order.country}</p>
          <p className="muted" style={{ marginTop: 8 }}>{order.email}</p>
          <p className="muted">{order.shipping === "express" ? "Express" : "Standard"}versand</p>
          <Link className="btn" href="/account" style={{ marginTop: 14 }}>Alle Bestellungen</Link>
        </aside>
      </div>
    </div>
  );
}
