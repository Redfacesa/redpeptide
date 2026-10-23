"use client";

import { useEffect, useState } from "react";
import { categories, type CategoryId, type Product } from "@/lib/catalog";
import { supabasePublishableKey, supabaseUrl } from "@/lib/supabase-public";
import { zar } from "@/lib/format";
import { orderStatuses, statusLabel, type Order, type OrderStatus } from "@/lib/order";

const tokenKey = "nv-catalog-token";

type Draft = { name: string; category: CategoryId; label: string; price: string; stock: string; image: string };

const emptyDraft: Draft = { name: "", category: "metabolic", label: "", price: "", stock: "24", image: "" };

function slugify(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 60);
}

export default function AdminPage() {
  const [token, setToken] = useState<string | null>(null);
  const [ready, setReady] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [items, setItems] = useState<Product[]>([]);
  const [draft, setDraft] = useState<Draft>(emptyDraft);
  const [orders, setOrders] = useState<Order[]>([]);
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    const saved = sessionStorage.getItem(tokenKey);
    if (saved) setToken(saved);
    setReady(true);
  }, []);

  useEffect(() => {
    if (!token) return;
    fetch("/api/admin")
      .then((response) => response.json())
      .then((payload) => {
        const data = payload as { products?: Product[] };
        if (data.products) setItems(data.products);
      })
      .catch(() => setMessage("The catalog could not be loaded."));
    fetch("/api/orders", { headers: { Authorization: `Bearer ${token}` } })
      .then((response) => response.json())
      .then((payload) => {
        const data = payload as { orders?: Order[]; desk?: boolean };
        if (data.desk === false) {
          sessionStorage.removeItem(tokenKey);
          setToken(null);
          setMessage("This account cannot edit the catalog.");
          return;
        }
        if (data.orders) setOrders(data.orders);
      })
      .catch(() => undefined);
  }, [token]);

  async function signIn(event: React.FormEvent) {
    event.preventDefault();
    setBusy(true);
    setMessage("");
    const response = await fetch(`${supabaseUrl}/auth/v1/token?grant_type=password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apikey: supabasePublishableKey,
        Authorization: `Bearer ${supabasePublishableKey}`,
      },
      body: JSON.stringify({ email, password }),
    });
    const data = (await response.json().catch(() => ({}))) as { access_token?: string };
    setBusy(false);
    if (!response.ok || !data.access_token) {
      setMessage("Those details were not accepted.");
      return;
    }
    sessionStorage.setItem(tokenKey, data.access_token);
    setPassword("");
    setToken(data.access_token);
  }

  function signOut() {
    sessionStorage.removeItem(tokenKey);
    setToken(null);
    setItems([]);
    setMessage("");
  }

  function updatePrice(slug: string, variantId: string, key: "price" | "stock", value: string) {
    const next = key === "stock" ? Math.max(0, Math.floor(Number(value) || 0)) : Number(value);
    setItems((current) =>
      current.map((product) =>
        product.slug === slug
          ? { ...product, variants: product.variants.map((variant) => (variant.id === variantId ? { ...variant, [key]: next } : variant)) }
          : product,
      ),
    );
  }

  function addCompound() {
    const name = draft.name.trim();
    const label = draft.label.trim();
    const price = Number(draft.price);
    const stock = Math.max(0, Math.floor(Number(draft.stock) || 0));
    if (!name || !label || !(price > 0)) {
      setMessage("Name, size, and a rand price are required.");
      return;
    }
    if (!draft.image) {
      setMessage("Add a photograph of the vial or carton.");
      return;
    }
    const slug = slugify(name);
    const id = slugify(label) || "size";
    const variant = { id, label, mg: Number.parseFloat(label) || 0, price, sku: "", stock, image: draft.image };
    setItems((current) => {
      const existing = current.find((product) => product.slug === slug);
      if (!existing) {
        return [
          ...current,
          {
            slug,
            name,
            code: slug.slice(0, 6).toUpperCase(),
            category: draft.category,
            tagline: "",
            summary: "",
            overview: "",
            purity: "",
            appearance: "",
            storage: "",
            image: draft.image,
            variants: [variant],
          },
        ];
      }
      const variants = existing.variants.some((item) => item.id === id)
        ? existing.variants.map((item) => (item.id === id ? { ...item, ...variant } : item))
        : [...existing.variants, variant];
      return current.map((product) => (product.slug === slug ? { ...product, variants } : product));
    });
    setDraft(emptyDraft);
    setMessage(`${name} ${label} is in the list. Save the catalog to publish it.`);
  }

  async function uploadImage(file: File) {
    if (!token) return;
    setBusy(true);
    setMessage("");
    const body = new FormData();
    body.set("file", file);
    const response = await fetch("/api/admin/media", {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body,
    });
    const data = (await response.json().catch(() => ({}))) as { url?: string; message?: string };
    setBusy(false);
    if (!response.ok || !data.url) {
      setMessage(data.message || "The photograph could not be stored.");
      return;
    }
    setDraft((current) => ({ ...current, image: data.url || "" }));
  }

  async function setStatus(id: string, status: OrderStatus) {
    if (!token) return;
    const response = await fetch("/api/orders", {
      method: "PATCH",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({ id, status }),
    });
    const data = (await response.json().catch(() => ({}))) as { order?: Order; message?: string };
    if (!response.ok || !data.order) {
      setMessage(data.message || "The order status could not be saved.");
      return;
    }
    setOrders((current) => current.map((order) => (order.id === id ? data.order || order : order)));
  }

  async function save() {
    if (!token) return;
    setBusy(true);
    setMessage("");
    const response = await fetch("/api/admin", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({ products: items }),
    });
    const data = (await response.json().catch(() => ({}))) as { message?: string; products?: Product[] };
    setBusy(false);
    if (response.status === 401 || response.status === 403) {
      signOut();
      setMessage(data.message || "Sign in again.");
      return;
    }
    if (data.products) setItems(data.products);
    setMessage(data.message || (response.ok ? "Saved." : "Could not save."));
  }

  if (!ready) return <div className="wrap pad">Loading…</div>;

  if (!token) {
    return (
      <div className="wrap pad">
        <div className="page-title">
          <p className="eyebrow">Novion admin</p>
          <h1>Catalog sign in</h1>
          <p className="lede">Prices stay in South African rand. The shop shows them in the visitor’s currency.</p>
        </div>
        <form className="form panel" style={{ maxWidth: 420, marginTop: 18 }} onSubmit={signIn}>
          <label>
            Email
            <input className="field" type="email" autoComplete="username" value={email} onChange={(event) => setEmail(event.target.value)} required />
          </label>
          <label>
            Password
            <input className="field" type="password" autoComplete="current-password" value={password} onChange={(event) => setPassword(event.target.value)} required />
          </label>
          {message && <p className="error">{message}</p>}
          <button className="btn" type="submit" disabled={busy}>{busy ? "Checking…" : "Sign in"}</button>
        </form>
      </div>
    );
  }

  return (
    <div className="wrap pad">
      <div className="page-title">
        <p className="eyebrow">Novion admin</p>
        <h1>Catalog</h1>
        <p className="lede">Change a rand price, change stock, or add a compound. Saving publishes it on the shop.</p>
      </div>
      <button className="text-btn" style={{ marginTop: 12 }} onClick={signOut}>Sign out</button>
      <div className="table-wrap" style={{ marginTop: 18 }}>
        <table className="table">
          <thead>
            <tr><th>Compound</th><th>Size</th><th>ZAR</th><th>Stock</th></tr>
          </thead>
          <tbody>
            {items.flatMap((product) =>
              product.variants.map((variant) => (
                <tr key={`${product.slug}-${variant.id}`}>
                  <td>{product.name}</td>
                  <td>{variant.label}</td>
                  <td>
                    <input aria-label={`${product.name} ${variant.label} price`} inputMode="decimal" value={variant.price} onChange={(event) => updatePrice(product.slug, variant.id, "price", event.target.value)} />
                    <small className="muted"> {zar(Number(variant.price) || 0)}</small>
                  </td>
                  <td>
                    <input aria-label={`${product.name} ${variant.label} stock`} inputMode="numeric" value={variant.stock} onChange={(event) => updatePrice(product.slug, variant.id, "stock", event.target.value)} />
                  </td>
                </tr>
              )),
            )}
          </tbody>
        </table>
      </div>
      <section className="panel" style={{ marginTop: 22, maxWidth: 720 }}>
        <h2 style={{ fontSize: 28 }}>Add a compound</h2>
        <div className="form" style={{ marginTop: 12 }}>
          <label>
            Name
            <input className="field" value={draft.name} onChange={(event) => setDraft({ ...draft, name: event.target.value })} />
          </label>
          <label>
            Range
            <select className="field" value={draft.category} onChange={(event) => setDraft({ ...draft, category: event.target.value as CategoryId })}>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>{category.name}</option>
              ))}
            </select>
          </label>
          <div className="form-row">
            <label>
              Size
              <input className="field" placeholder="10 mg" value={draft.label} onChange={(event) => setDraft({ ...draft, label: event.target.value })} />
            </label>
            <label>
              Price in rand
              <input className="field" inputMode="decimal" value={draft.price} onChange={(event) => setDraft({ ...draft, price: event.target.value })} />
            </label>
            <label>
              Stock
              <input className="field" inputMode="numeric" value={draft.stock} onChange={(event) => setDraft({ ...draft, stock: event.target.value })} />
            </label>
          </div>
          <label>
            Photograph
            <input className="field" type="file" accept="image/jpeg,image/png,image/webp" onChange={(event) => {
              const file = event.target.files?.[0];
              if (file) uploadImage(file);
            }} />
          </label>
          {draft.image && <img className="photo-pick" src={draft.image} alt="Photograph for the new compound" />}
          <button className="btn secondary" type="button" onClick={addCompound}>Add to list</button>
        </div>
      </section>
      <button className="btn" style={{ marginTop: 16 }} disabled={busy} onClick={save}>{busy ? "Saving…" : "Save catalog"}</button>
      {message && <p className="muted" style={{ marginTop: 12 }}>{message}</p>}
      <section style={{ marginTop: 36 }}>
        <h2 style={{ fontSize: 32 }}>Orders</h2>
        <p className="muted">A new checkout is pending until you mark it paid, packed, or shipped.</p>
        {orders.length === 0 ? (
          <div className="empty" style={{ marginTop: 12 }}>No orders yet.</div>
        ) : (
          <div className="table-wrap" style={{ marginTop: 12 }}>
            <table className="table">
              <thead>
                <tr><th>Order</th><th>Buyer</th><th>Items</th><th>ZAR</th><th>Status</th></tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.id}>
                    <td>
                      {order.id}
                      <div className="muted">{new Date(order.createdAt).toLocaleString()}</div>
                    </td>
                    <td>
                      {order.name}
                      <div className="muted">{order.email}</div>
                      <div className="muted">{order.city}, {order.country}</div>
                    </td>
                    <td>{order.lines.map((line) => `${line.name} ${line.variant} × ${line.qty}`).join(", ")}</td>
                    <td>{zar(order.total)}</td>
                    <td>
                      <select aria-label={`${order.id} status`} value={order.status} onChange={(event) => setStatus(order.id, event.target.value as OrderStatus)}>
                        {orderStatuses.map((status) => (
                          <option key={status} value={status}>{statusLabel[status]}</option>
                        ))}
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}
