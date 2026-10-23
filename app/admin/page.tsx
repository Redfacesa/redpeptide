"use client";

import { useEffect, useMemo, useState } from "react";
import { products as catalog } from "@/lib/catalog";
import { zar } from "@/lib/format";

type Row = { slug: string; variantId: string; name: string; label: string; price: number; stock: number };

export default function AdminPage() {
  const initial = useMemo<Row[]>(
    () =>
      catalog.flatMap((product) =>
        product.variants.map((variant) => ({
          slug: product.slug,
          variantId: variant.id,
          name: product.name,
          label: variant.label,
          price: variant.price,
          stock: variant.stock,
        })),
      ),
    [],
  );
  const [rows, setRows] = useState(initial);
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("Prices are the ZAR list. Saving writes them to the Novion catalog store and, when the merchant key is set, to Redface Pay.");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    fetch("/api/admin")
      .then((response) => response.json())
      .then((payload) => {
        const data = payload as { rows?: Row[] | null };
        if (!data.rows?.length) return;
        setRows((current) =>
          current.map((row) => {
            const hit = data.rows?.find((item) => item.slug === row.slug && item.variantId === row.variantId);
            return hit ? { ...row, price: hit.price, stock: hit.stock } : row;
          }),
        );
      })
      .catch(() => undefined);
  }, []);

  function update(index: number, key: "price" | "stock", value: string) {
    setRows((current) => current.map((row, i) => (i === index ? { ...row, [key]: Number(value) } : row)));
  }

  async function save() {
    setBusy(true);
    setMessage("");
    const response = await fetch("/api/admin", {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-admin-password": password },
      body: JSON.stringify({ rows }),
    });
    const data = (await response.json().catch(() => ({}))) as { message?: string };
    setBusy(false);
    setMessage(data.message || (response.ok ? "Saved." : "Could not save."));
  }

  return (
    <div className="wrap pad">
      <div className="page-title">
        <p className="eyebrow">Novion admin</p>
        <h1>Catalog prices</h1>
        <p className="lede">Original prices stay in South African rand. The shopfront converts them for the visitor’s country.</p>
      </div>
      <label className="field" style={{ maxWidth: 320, margin: "18px 0" }}>
        Admin password
        <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} />
      </label>
      <div className="table-wrap">
        <table className="table">
          <thead>
            <tr><th>Compound</th><th>Size</th><th>ZAR</th><th>Stock</th></tr>
          </thead>
          <tbody>
            {rows.map((row, index) => (
              <tr key={`${row.slug}-${row.variantId}`}>
                <td>{row.name}</td>
                <td>{row.label}</td>
                <td>
                  <input aria-label={`${row.name} price`} inputMode="decimal" value={row.price} onChange={(event) => update(index, "price", event.target.value)} />
                  <small className="muted"> {zar(row.price)}</small>
                </td>
                <td>
                  <input aria-label={`${row.name} stock`} inputMode="numeric" value={row.stock} onChange={(event) => update(index, "stock", event.target.value)} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button className="btn" style={{ marginTop: 16 }} disabled={busy} onClick={save}>{busy ? "Saving…" : "Save catalog"}</button>
      {message && <p className="muted" style={{ marginTop: 12 }}>{message}</p>}
    </div>
  );
}
