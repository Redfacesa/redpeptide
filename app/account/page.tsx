"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useMoney } from "@/components/currency";
import { useStore } from "@/components/store";
import { statusLabel } from "@/lib/order";

export default function AccountPage() {
  const store = useStore();
  const { format } = useMoney();
  const router = useRouter();
  const [mode, setMode] = useState<"in" | "up">("in");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    document.title = "Account · Novion Biopharma";
  }, []);

  function afterSignIn() {
    const next = sessionStorage.getItem("nv-next");
    sessionStorage.removeItem("nv-next");
    if (next && next.startsWith("/") && !next.startsWith("//")) router.push(next);
  }

  async function submit(event: React.FormEvent) {
    event.preventDefault();
    setBusy(true);
    setMessage("");
    const error = mode === "up"
      ? await store.signUpCustomer(name, email, password)
      : await store.signInCustomer(email, password);
    setBusy(false);
    setPassword("");
    if (error) {
      setMessage(error);
      return;
    }
    afterSignIn();
  }

  return (
    <div className="wrap pad">
      <div className="page-title">
        <p className="eyebrow">Account</p>
        <h1>{store.profile ? "Your orders" : "Sign in"}</h1>
        <p className="lede">
          {store.profile
            ? "Each order stays pending until payment is confirmed, then moves to packed and shipped."
            : "Create an account to place an order and follow it from pending payment through to dispatch."}
        </p>
      </div>
      <div className="split" style={{ marginTop: 18 }}>
        {store.profile ? (
          <div className="panel">
            <p className="eyebrow">Signed in</p>
            <h2 style={{ fontSize: 32 }}>{store.profile.name || "Account"}</h2>
            <p className="muted">{store.profile.email}</p>
            <button className="btn secondary" style={{ marginTop: 16 }} type="button" onClick={store.signOut}>Sign out</button>
          </div>
        ) : (
          <form className="form panel" onSubmit={submit}>
            <div className="actions">
              <button className={mode === "in" ? "btn" : "btn secondary"} type="button" onClick={() => setMode("in")}>Sign in</button>
              <button className={mode === "up" ? "btn" : "btn secondary"} type="button" onClick={() => setMode("up")}>Create account</button>
            </div>
            {mode === "up" && (
              <label>Name<input className="field" value={name} onChange={(event) => setName(event.target.value)} required /></label>
            )}
            <label>Email<input className="field" type="email" autoComplete="username" value={email} onChange={(event) => setEmail(event.target.value)} required /></label>
            <label>Password<input className="field" type="password" autoComplete={mode === "up" ? "new-password" : "current-password"} minLength={8} value={password} onChange={(event) => setPassword(event.target.value)} required /></label>
            {message && <p className={message.startsWith("Check your email") ? "notice" : "error"}>{message}</p>}
            <button className="btn" type="submit" disabled={busy}>{busy ? "Checking…" : mode === "up" ? "Create account" : "Sign in"}</button>
          </form>
        )}
        <div>
          <h2 style={{ fontSize: 32, marginBottom: 10 }}>Orders</h2>
          {!store.profile && <div className="empty">Sign in to see the orders placed with this account.</div>}
          {store.profile && store.orders.length === 0 && <div className="empty">No orders for this account yet.</div>}
          {store.profile && store.orders.map((order) => (
            <Link className="line" key={order.id} href={`/order/${order.id}`} style={{ display: "flex" }}>
              <div>
                <strong>{order.id}</strong>
                <div className="muted">{new Date(order.createdAt).toLocaleString()} · {statusLabel[order.status] || "Pending payment"}</div>
              </div>
              <strong>{format(order.total)}</strong>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
