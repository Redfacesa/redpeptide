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
    document.title = "Konto · Novion Biopharma";
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
        <p className="eyebrow">Konto</p>
        <h1>{store.profile ? "Ihre Bestellungen" : "Anmelden"}</h1>
        <p className="lede">
          {store.profile
            ? "Jede Bestellung bleibt auf Zahlung ausstehend, bis die Zahlung bestätigt ist, und geht dann zu gepackt und versendet."
            : "Legen Sie ein Konto an, um zu bestellen und den Weg von der Zahlung bis zum Versand zu sehen."}
        </p>
      </div>
      <div className="split" style={{ marginTop: 18 }}>
        {store.profile ? (
          <div className="panel">
            <p className="eyebrow">Angemeldet</p>
            <h2 style={{ fontSize: 32 }}>{store.profile.name || "Konto"}</h2>
            <p className="muted">{store.profile.email}</p>
            <button className="btn secondary" style={{ marginTop: 16 }} type="button" onClick={store.signOut}>Abmelden</button>
          </div>
        ) : (
          <form className="form panel" onSubmit={submit}>
            <div className="actions">
              <button className={mode === "in" ? "btn" : "btn secondary"} type="button" onClick={() => setMode("in")}>Anmelden</button>
              <button className={mode === "up" ? "btn" : "btn secondary"} type="button" onClick={() => setMode("up")}>Konto erstellen</button>
            </div>
            {mode === "up" && (
              <label>Name<input className="field" value={name} onChange={(event) => setName(event.target.value)} required /></label>
            )}
            <label>E-Mail<input className="field" type="email" autoComplete="username" value={email} onChange={(event) => setEmail(event.target.value)} required /></label>
            <label>Passwort<input className="field" type="password" autoComplete={mode === "up" ? "new-password" : "current-password"} minLength={8} value={password} onChange={(event) => setPassword(event.target.value)} required /></label>
            {message && <p className={message.startsWith("Prüfen Sie") ? "notice" : "error"}>{message}</p>}
            <button className="btn" type="submit" disabled={busy}>{busy ? "Prüfen…" : mode === "up" ? "Konto erstellen" : "Anmelden"}</button>
          </form>
        )}
        <div>
          <h2 style={{ fontSize: 32, marginBottom: 10 }}>Bestellungen</h2>
          {!store.profile && <div className="empty">Melden Sie sich an, um die Bestellungen dieses Kontos zu sehen.</div>}
          {store.profile && store.orders.length === 0 && <div className="empty">Für dieses Konto gibt es noch keine Bestellung.</div>}
          {store.profile && store.orders.map((order) => (
            <Link className="line" key={order.id} href={`/order/${order.id}`} style={{ display: "flex" }}>
              <div>
                <strong>{order.id}</strong>
                <div className="muted">{new Date(order.createdAt).toLocaleString("de-CH")} · {statusLabel[order.status] || "Zahlung ausstehend"}</div>
              </div>
              <strong>{format(order.total)}</strong>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
