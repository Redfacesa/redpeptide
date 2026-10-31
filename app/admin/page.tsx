"use client";

import { useEffect, useState } from "react";
import { categories, type CategoryId, type Product } from "@/lib/catalog";
import { supabasePublishableKey, supabaseUrl } from "@/lib/supabase-public";
import { chf, zar } from "@/lib/format";
import { orderStatuses, type Order, type OrderStatus } from "@/lib/order";
import { isZa } from "@/lib/region";

const tokenKey = "nv-catalog-token";

type Draft = { name: string; category: CategoryId; label: string; price: string; stock: string; image: string };

const emptyDraft: Draft = { name: "", category: "metabolic", label: "", price: "", stock: "24", image: "" };
const money = isZa ? zar : chf;
const moneyName = isZa ? "rand" : "francs";

type DeskFilter = "all" | "open" | "done" | "cancelled";

const deskStatus: Record<OrderStatus, string> = {
  pending: "Not completed",
  paid: "Paid",
  packed: "Packed",
  shipped: "Shipped",
  cancelled: "Cancelled",
};

function orderGroup(status: OrderStatus): Exclude<DeskFilter, "all"> {
  if (status === "cancelled") return "cancelled";
  if (status === "pending") return "open";
  return "done";
}

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
  const [deskFilter, setDeskFilter] = useState<DeskFilter>("all");
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
      setMessage("Name, size, and a franc price are required.");
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
          <p className="lede">Sign in to see every order, the delivery address, and the catalog.</p>
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
        <h1>Sales desk</h1>
        <p className="lede">Every checkout is listed here with the buyer, the phone number, and the full delivery address. Payment is not confirmed until you mark the order paid.</p>
      </div>
      <button className="text-btn" style={{ marginTop: 12 }} onClick={signOut}>Sign out</button>
      <SalesDesk orders={orders} filter={deskFilter} onFilter={setDeskFilter} onStatus={setStatus} />
      <section style={{ marginTop: 42 }}>
        <h2 style={{ fontSize: 32 }}>Catalog</h2>
        <p className="muted">Change a price in {moneyName}, change stock, or add a compound. Saving publishes it on the shop.</p>
      </section>
      <div className="table-wrap" style={{ marginTop: 18 }}>
        <table className="table">
          <thead>
            <tr><th>Compound</th><th>Size</th><th>Price</th><th>Stock</th></tr>
          </thead>
          <tbody>
            {items.flatMap((product) =>
              product.variants.map((variant) => (
                <tr key={`${product.slug}-${variant.id}`}>
                  <td>{product.name}</td>
                  <td>{variant.label}</td>
                  <td>
                    <input aria-label={`${product.name} ${variant.label} price`} inputMode="decimal" value={variant.price} onChange={(event) => updatePrice(product.slug, variant.id, "price", event.target.value)} />
                    <small className="muted"> {money(Number(variant.price) || 0)}</small>
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
              Price in {moneyName}
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
    </div>
  );
}

function SalesDesk({
  orders,
  filter,
  onFilter,
  onStatus,
}: {
  orders: Order[];
  filter: DeskFilter;
  onFilter: (filter: DeskFilter) => void;
  onStatus: (id: string, status: OrderStatus) => void;
}) {
  const open = orders.filter((order) => orderGroup(order.status) === "open");
  const done = orders.filter((order) => orderGroup(order.status) === "done");
  const cancelled = orders.filter((order) => orderGroup(order.status) === "cancelled");
  const visible = orders.filter((order) => filter === "all" || orderGroup(order.status) === filter);
  const sum = (list: Order[]) => list.reduce((total, order) => total + order.total, 0);

  return (
    <section style={{ marginTop: 22 }}>
      <div className="desk-stats">
        <article className="desk-stat">
          <p>Not completed</p>
          <strong>{open.length}</strong>
          <span>{money(sum(open))} still awaiting payment</span>
        </article>
        <article className="desk-stat">
          <p>Successful</p>
          <strong>{done.length}</strong>
          <span>{money(sum(done))} paid, packed, or shipped</span>
        </article>
        <article className="desk-stat">
          <p>Cancelled</p>
          <strong>{cancelled.length}</strong>
          <span>{money(sum(cancelled))} will not be sent</span>
        </article>
      </div>
      <div className="chip-rail" style={{ marginTop: 16 }} aria-label="Order groups">
        {([
          ["all", `All ${orders.length}`],
          ["open", `Not completed ${open.length}`],
          ["done", `Successful ${done.length}`],
          ["cancelled", `Cancelled ${cancelled.length}`],
        ] as const).map(([id, label]) => (
          <button key={id} className={`chip ${filter === id ? "on" : ""}`} type="button" onClick={() => onFilter(id)}>{label}</button>
        ))}
      </div>
      {visible.length === 0 ? (
        <div className="empty" style={{ marginTop: 16 }}>No orders in this group.</div>
      ) : (
        <div className="desk-list">
          {visible.map((order) => (
            <article className="order-file" key={order.id}>
              <header>
                <div>
                  <p className="eyebrow">{order.id}</p>
                  <h2>{order.name}</h2>
                  <p className="muted">{new Date(order.createdAt).toLocaleString(isZa ? "en-ZA" : "de-CH")}</p>
                </div>
                <label>
                  Status
                  <select className="field" aria-label={`${order.id} status`} value={order.status} onChange={(event) => onStatus(order.id, event.target.value as OrderStatus)}>
                    {orderStatuses.map((status) => (
                      <option key={status} value={status}>{deskStatus[status]}</option>
                    ))}
                  </select>
                </label>
              </header>
              <div className="order-grid">
                <div>
                  <p className="eyebrow">Buyer</p>
                  <p>{order.email}</p>
                  <p>{order.phone?.trim() || "No phone on this order"}</p>
                </div>
                <div>
                  <p className="eyebrow">Delivery address</p>
                  <p>{order.line1}</p>
                  <p>{order.postcode} {order.city}</p>
                  <p>{order.country}</p>
                  <p className="muted">{order.shipping === "express" ? "Express" : "Standard"} · {order.shippingCost === 0 ? "Free shipping" : money(order.shippingCost)}</p>
                </div>
                <div>
                  <p className="eyebrow">Amount</p>
                  <p>Goods {money(order.subtotal)}</p>
                  <p>Shipping {order.shippingCost === 0 ? "Free" : money(order.shippingCost)}</p>
                  <p><strong>{money(order.total)}</strong></p>
                </div>
              </div>
              <ul className="order-lines">
                {order.lines.map((line) => (
                  <li key={`${line.sku}-${line.variantId}`}>
                    <span>{line.name} · {line.variant} × {line.qty}</span>
                    <span>{line.sku}</span>
                    <span>{money(line.price * line.qty)}</span>
                  </li>
                ))}
              </ul>
              {order.note ? <p className="notice">Note: {order.note}</p> : null}
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
