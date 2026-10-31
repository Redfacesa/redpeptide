"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { countries, getVariant } from "@/lib/catalog";
import { shippingCost, zar } from "@/lib/format";
import { chfToZar } from "@/lib/fx";
import { useMoney } from "@/components/currency";
import { useStore } from "@/components/store";
import { isZa, tx } from "@/lib/region";

type Method = "standard" | "express";

const countryNames: Record<string, string> = {
  Australia: "Australien",
  Austria: "Österreich",
  Belgium: "Belgien",
  Canada: "Kanada",
  France: "Frankreich",
  Germany: "Deutschland",
  Ireland: "Irland",
  Italy: "Italien",
  Japan: "Japan",
  Netherlands: "Niederlande",
  "New Zealand": "Neuseeland",
  Norway: "Norwegen",
  Singapore: "Singapur",
  "South Africa": "Südafrika",
  Spain: "Spanien",
  Sweden: "Schweden",
  Switzerland: "Schweiz",
  "United Arab Emirates": "Vereinigte Arabische Emirate",
  "United Kingdom": "Vereinigtes Königreich",
  "United States": "Vereinigte Staaten",
  Other: "Anderes Land",
};

export default function CheckoutPage() {
  const store = useStore();
  const { format } = useMoney();
  const [method, setMethod] = useState<Method>("standard");
  const [research, setResearch] = useState(false);
  const [error, setError] = useState("");
  const [paying, setPaying] = useState(false);
  const [zarPerChf, setZarPerChf] = useState<number | null>(null);
  const [rateError, setRateError] = useState("");
  const [form, setForm] = useState({
    name: "",
    email: "",
    line1: "",
    city: "",
    postcode: "",
    country: "",
    note: "",
  });

  useEffect(() => {
    document.title = tx("Kasse · Novion Biopharma", "Checkout · Novion Biopharma");
    if (!store.profile) return;
    setForm((current) => ({
      ...current,
      name: current.name || store.profile?.name || "",
      email: current.email || store.profile?.email || "",
    }));
  }, [store.profile]);

  useEffect(() => {
    if (isZa) return;
    let cancel = false;
    fetch("/api/fx")
      .then(async (response) => {
        const data = (await response.json().catch(() => ({}))) as { zarPerChf?: number; message?: string };
        if (cancel) return;
        if (response.ok && data.zarPerChf) {
          setZarPerChf(data.zarPerChf);
          setRateError("");
          return;
        }
        setRateError(data.message || "Der Franken-Rand-Kurs ist gerade nicht verfügbar.");
      })
      .catch(() => {
        if (!cancel) setRateError("Der Franken-Rand-Kurs ist gerade nicht verfügbar.");
      });
    return () => {
      cancel = true;
    };
  }, []);

  const lines = useMemo(
    () =>
      store.cart.flatMap((line) => {
        const product = store.findProduct(line.slug);
        const variant = product && getVariant(product, line.variantId);
        return product && variant ? [{ line, product, variant }] : [];
      }),
    [store],
  );
  const subtotal = lines.reduce((sum, item) => sum + item.variant.price * item.line.qty, 0);
  const delivery = shippingCost(subtotal, method);

  if (!store.ready) {
    return <div className="wrap pad">{tx("Kasse wird geladen…", "Loading checkout…")}</div>;
  }

  function update(key: keyof typeof form, value: string) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  async function submit(event: React.FormEvent) {
    event.preventDefault();
    if (lines.length === 0) {
      setError(tx("Legen Sie eine Verbindung in den Warenkorb.", "Add a compound to the basket."));
      return;
    }
    const email = store.profile?.email || form.email;
    if (!form.name || !email.includes("@") || !form.line1 || !form.city || !form.postcode) {
      setError(tx("Name, eine gültige E-Mail und eine vollständige Adresse sind erforderlich.", "A name, a valid email, and a full address are required."));
      return;
    }
    if (!form.country) {
      setError(tx("Wählen Sie ein Land.", "Choose a country."));
      return;
    }
    if (!research) {
      setError(tx("Bestätigen Sie den Forschungshinweis, um fortzufahren.", "Confirm the research notice to continue."));
      return;
    }
    if (!store.token) {
      setError(tx("Melden Sie sich an, damit die Bestellung verfolgt werden kann.", "Sign in so the order can be tracked."));
      return;
    }
    setPaying(true);
    const saved = await fetch("/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${store.token}` },
      body: JSON.stringify({
        name: form.name,
        line1: form.line1,
        city: form.city,
        postcode: form.postcode,
        country: form.country,
        shipping: method,
        note: form.note,
        research: true,
        lines: lines.map(({ line, product, variant }) => ({
          slug: product.slug,
          variantId: variant.id,
          qty: line.qty,
        })),
      }),
    });
    const savedBody = (await saved.json().catch(() => ({}))) as { message?: string; order?: { id: string; total: number; email: string; lines: { name: string; variant: string; qty: number; price: number; sku: string }[] } };
    if (!saved.ok || !savedBody.order) {
      setPaying(false);
      setError(savedBody.message || tx("Die Bestellung konnte nicht gespeichert werden.", "The order could not be saved."));
      return;
    }
    const order = savedBody.order;
    store.rememberOrder({
      ...form,
      email: order.email,
      shipping: method,
      lines: order.lines.map((line) => ({
        slug: "",
        variantId: line.sku,
        qty: line.qty,
        price: line.price,
        name: line.name,
        variant: line.variant,
        sku: line.sku,
      })),
      subtotal,
      shippingCost: delivery,
      total: order.total,
      id: order.id,
      createdAt: new Date().toISOString(),
      status: "pending",
    });
    store.clearCart();
    const response = await fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        amount: order.total,
        email: order.email,
        label: `Novion ${order.id}`,
        orderId: order.id,
        returnUrl: `${window.location.origin}/order/${order.id}`,
        lines: order.lines.map((line) => ({
          product_name: `${line.name} ${line.variant}`,
          price_zar: line.price,
          quantity: line.qty,
          sku: line.sku,
        })),
      }),
    });
    const data = (await response.json().catch(() => ({}))) as { checkoutUrl?: string; message?: string };
    if (data.checkoutUrl) {
      window.location.href = data.checkoutUrl;
      return;
    }
    setPaying(false);
    setError(data.message || tx("Die Zahlung konnte nicht geöffnet werden.", "Payment could not be opened."));
  }

  if (lines.length === 0) {
    return (
      <div className="wrap pad">
        <h1>{tx("Kasse", "Checkout")}</h1>
        <div className="empty" style={{ marginTop: 16 }}>
          <p>{tx("Ihr Warenkorb ist leer.", "Your basket is empty.")}</p>
          <p style={{ marginTop: 12 }}><Link className="btn" href="/shop">{tx("Zurück zum Shop", "Back to the shop")}</Link></p>
        </div>
      </div>
    );
  }

  return (
    <div className="wrap pad">
      <div className="page-title">
        <p className="eyebrow">{tx("Kasse", "Checkout")}</p>
        <h1>{tx("Lieferung", "Delivery")}</h1>
        <p className="lede">{tx("Lieferangaben für eine Laborbestellung. Die Zahlungsseite bestätigt den Betrag, bevor Sie zahlen.", "Delivery details for a laboratory order. The payment page confirms the amount before you pay.")}</p>
      </div>
      <form className="split" style={{ marginTop: 18 }} onSubmit={submit}>
        <div className="form">
          {!store.profile && (
            <p className="notice">
              <Link href="/account" onClick={() => sessionStorage.setItem("nv-next", "/checkout")}>{tx("Melden Sie sich an oder erstellen Sie ein Konto", "Sign in or create an account")}</Link>{tx(", bevor Sie zahlen. Über dieses Konto verfolgen Sie die Bestellung.", " before you pay. You track the order from that account.")}
            </p>
          )}
          <div className="form-row">
            <label>{tx("Name", "Name")}<input className="field" value={form.name} onChange={(event) => update("name", event.target.value)} required /></label>
            <label>{tx("E-Mail", "Email")}<input className="field" type="email" value={store.profile?.email || form.email} readOnly={Boolean(store.profile)} onChange={(event) => update("email", event.target.value)} required /></label>
          </div>
          <label>{tx("Adresse", "Address")}<input className="field" value={form.line1} onChange={(event) => update("line1", event.target.value)} required /></label>
          <div className="form-row">
            <label>{tx("Ort", "City")}<input className="field" value={form.city} onChange={(event) => update("city", event.target.value)} required /></label>
            <label>{tx("PLZ", "Postal code")}<input className="field" value={form.postcode} onChange={(event) => update("postcode", event.target.value)} required /></label>
          </div>
          <label>
            {tx("Land", "Country")}
            <select className="field" value={form.country} onChange={(event) => update("country", event.target.value)} required>
              <option value="">{tx("Land wählen", "Choose a country")}</option>
              {countries.map((country) => (
                <option key={country} value={country}>{isZa ? country : (countryNames[country] ?? country)}</option>
              ))}
            </select>
          </label>
          <label>{tx("Hinweis für das Labor (optional)", "Note for the laboratory (optional)")}<textarea className="field" rows={3} value={form.note} onChange={(event) => update("note", event.target.value)} /></label>
          <fieldset style={{ border: 0, padding: 0, display: "grid", gap: 8 }}>
            <legend className="eyebrow">{tx("Versand", "Shipping")}</legend>
            <label className="check"><input type="radio" name="ship" checked={method === "standard"} onChange={() => setMethod("standard")} /> {tx("Standard, 2–4 Tage", "Standard, 2–4 days")} · {shippingCost(subtotal, "standard") === 0 ? tx("Kostenlos", "Free") : format(shippingCost(subtotal, "standard"))}</label>
            <label className="check"><input type="radio" name="ship" checked={method === "express"} onChange={() => setMethod("express")} /> {tx("Express, 1–2 Tage", "Express, 1–2 days")} · {format(shippingCost(subtotal, "express"))}</label>
          </fieldset>
          <label className="check">
            <input type="checkbox" checked={research} onChange={(event) => setResearch(event.target.checked)} />
            {tx("Ich bin 18 oder älter und bestelle für die Laborforschung, nicht zur Anwendung an Mensch oder Tier. Ich habe die AGB, die Rückgabe und den Forschungshinweis gelesen.", "I am 18 or older and I am ordering for laboratory research, not for use in people or animals. I have read the terms, the returns page, and the research notice.")}
          </label>
          {error && <p className="error">{error}</p>}
          {rateError && <p className="error">{rateError}</p>}
          <button className="btn" type="submit" disabled={paying || (!isZa && !zarPerChf)}>{paying ? tx("Zahlung wird geöffnet…", "Opening payment…") : tx("Weiter zur Zahlung", "Continue to payment")}</button>
          <p className="muted">{tx("Mit dem Weitergehen akzeptieren Sie die", "By continuing you accept the")} <Link href="/legal/terms">{tx("AGB", "terms")}</Link>, {tx("die", "the")} <Link href="/legal/returns">{tx("Rückgabe", "returns")}</Link> {tx("und den", "and the")} <Link href="/research-use">{tx("Forschungshinweis", "research notice")}</Link>.</p>
        </div>
        <aside className="summary">
          <p className="brand brand-lockup" style={{ marginBottom: 14 }}><span className="brand-mark">N</span>Novion</p>
          <p className="muted" style={{ marginTop: -8, marginBottom: 14 }}>{tx("Biopharma · Genf · nur für die Forschung", "Biopharma · research use only")}</p>
          <h2>{tx("Bestellung", "Order")}</h2>
          {lines.map(({ line, product, variant }) => (
            <div className="row" key={`${line.slug}-${line.variantId}`}>
              <span>{product.name} · {variant.label} × {line.qty}</span>
              <span>{format(variant.price * line.qty)}</span>
            </div>
          ))}
          <div className="row"><span>{tx("Versand", "Shipping")}</span><span>{delivery === 0 ? tx("Kostenlos", "Free") : format(delivery)}</span></div>
          <div className="row total"><span>{tx("Total", "Total")}</span><strong>{format(subtotal + delivery)}</strong></div>
          {!isZa && zarPerChf && (
            <p className="notice">
              Zahlung in Rand: {zar(chfToZar(subtotal + delivery, zarPerChf))}. Kurs heute: 1 CHF = {zarPerChf.toLocaleString("de-CH", { maximumFractionDigits: 2 })} ZAR. Die Zahlungsseite zeigt diesen Rand-Betrag. Visa, Mastercard und Apple Pay bleiben möglich. Ihre Bank kann den Rand-Betrag danach in die Währung Ihrer Karte umrechnen.
            </p>
          )}
        </aside>
      </form>
    </div>
  );
}
