"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { countries, getProduct, getVariant } from "@/lib/catalog";
import { money, shippingCost } from "@/lib/format";
import { useStore } from "@/components/store";

type Method = "standard" | "express";

export default function CheckoutPage() {
  const store = useStore();
  const router = useRouter();
  const [method, setMethod] = useState<Method>("standard");
  const [research, setResearch] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    name: "",
    email: "",
    line1: "",
    city: "",
    postcode: "",
    country: "Germany",
    note: "",
  });

  useEffect(() => {
    document.title = "Checkout · RedPeptide";
    if (!store.profile) return;
    setForm((current) => ({
      ...current,
      name: current.name || store.profile?.name || "",
      email: current.email || store.profile?.email || "",
    }));
  }, [store.profile]);

  const lines = useMemo(
    () =>
      store.cart.flatMap((line) => {
        const product = getProduct(line.slug);
        const variant = product && getVariant(product, line.variantId);
        return product && variant ? [{ line, product, variant }] : [];
      }),
    [store.cart],
  );
  const subtotal = lines.reduce((sum, item) => sum + item.variant.price * item.line.qty, 0);
  const delivery = shippingCost(subtotal, method);

  if (!store.ready) {
    return <div className="wrap pad">Loading checkout…</div>;
  }

  function update(key: keyof typeof form, value: string) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  function submit(event: React.FormEvent) {
    event.preventDefault();
    if (lines.length === 0) {
      setError("Add a compound before checkout.");
      return;
    }
    if (!form.name || !form.email.includes("@") || !form.line1 || !form.city || !form.postcode) {
      setError("Name, a valid email, and a full address are required.");
      return;
    }
    if (!research) {
      setError("Confirm the research-use statement to place a sample order.");
      return;
    }
    const order = store.placeOrder({
      ...form,
      shipping: method,
      lines: lines.map(({ line, product, variant }) => ({
        slug: product.slug,
        variantId: variant.id,
        qty: line.qty,
        price: variant.price,
        name: product.name,
        variant: variant.label,
        sku: variant.sku,
      })),
      subtotal,
      shippingCost: delivery,
      total: subtotal + delivery,
    });
    router.push(`/order/${order.id}`);
  }

  if (lines.length === 0) {
    return (
      <div className="wrap pad">
        <h1>Checkout</h1>
        <div className="empty" style={{ marginTop: 16 }}>
          <p>Your cart is empty.</p>
          <p style={{ marginTop: 12 }}><Link className="btn" href="/shop">Return to the shop</Link></p>
        </div>
      </div>
    );
  }

  return (
    <div className="wrap pad">
      <div className="page-title">
        <p className="eyebrow">Checkout</p>
        <h1>Delivery details</h1>
        <p className="lede">Sample checkout. No payment is taken and nothing is reserved in a warehouse.</p>
      </div>
      <form className="split" style={{ marginTop: 18 }} onSubmit={submit}>
        <div className="form">
          <div className="form-row">
            <label>Full name<input className="field" value={form.name} onChange={(event) => update("name", event.target.value)} required /></label>
            <label>Email<input className="field" type="email" value={form.email} onChange={(event) => update("email", event.target.value)} required /></label>
          </div>
          <label>Address<input className="field" value={form.line1} onChange={(event) => update("line1", event.target.value)} required /></label>
          <div className="form-row">
            <label>City<input className="field" value={form.city} onChange={(event) => update("city", event.target.value)} required /></label>
            <label>Postcode<input className="field" value={form.postcode} onChange={(event) => update("postcode", event.target.value)} required /></label>
          </div>
          <label>
            Country
            <select className="field" value={form.country} onChange={(event) => update("country", event.target.value)}>
              {countries.map((country) => (
                <option key={country}>{country}</option>
              ))}
            </select>
          </label>
          <label>Note for the lab (optional)<textarea className="field" rows={3} value={form.note} onChange={(event) => update("note", event.target.value)} /></label>
          <fieldset style={{ border: 0, padding: 0, display: "grid", gap: 8 }}>
            <legend className="eyebrow">Delivery</legend>
            <label className="check"><input type="radio" name="ship" checked={method === "standard"} onChange={() => setMethod("standard")} /> Standard, 2–4 days · {shippingCost(subtotal, "standard") === 0 ? "Free" : money(shippingCost(subtotal, "standard"))}</label>
            <label className="check"><input type="radio" name="ship" checked={method === "express"} onChange={() => setMethod("express")} /> Express, 1–2 days · {money(shippingCost(subtotal, "express"))}</label>
          </fieldset>
          <label className="check">
            <input type="checkbox" checked={research} onChange={(event) => setResearch(event.target.checked)} />
            I am 18 or older and I am ordering for laboratory research, not for human or veterinary use.
          </label>
          {error && <p className="error">{error}</p>}
          <button className="btn" type="submit">Place sample order</button>
        </div>
        <aside className="summary">
          <h2>Order</h2>
          {lines.map(({ line, product, variant }) => (
            <div className="row" key={`${line.slug}-${line.variantId}`}>
              <span>{product.name} · {variant.label} × {line.qty}</span>
              <span>{money(variant.price * line.qty)}</span>
            </div>
          ))}
          <div className="row"><span>Delivery</span><span>{delivery === 0 ? "Free" : money(delivery)}</span></div>
          <div className="row total"><span>Total</span><strong>{money(subtotal + delivery)}</strong></div>
          <p className="muted">Prices are sample figures in EUR. Payment will be added later.</p>
        </aside>
      </form>
    </div>
  );
}
