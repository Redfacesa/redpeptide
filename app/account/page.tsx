"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useMoney } from "@/components/currency";
import { useStore } from "@/components/store";

export default function AccountPage() {
  const store = useStore();
  const { format } = useMoney();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    document.title = "Account · Novion Biopharma";
    if (!store.profile) return;
    setName(store.profile.name);
    setEmail(store.profile.email);
  }, [store.profile]);

  const mine = store.profile
    ? store.orders.filter((order) => order.email.toLowerCase() === store.profile?.email.toLowerCase())
    : [];

  return (
    <div className="wrap pad">
      <div className="page-title">
        <p className="eyebrow">Account</p>
        <h1>Customer profile</h1>
        <p className="lede">A local demo profile. It lives in this browser only. Sign-in, passwords, and email receipts arrive with the backend.</p>
      </div>
      <div className="split" style={{ marginTop: 18 }}>
        <form
          className="form panel"
          onSubmit={(event) => {
            event.preventDefault();
            if (!name || !email.includes("@")) return;
            store.saveProfile({ name, email });
          }}
        >
          <label>Name<input className="field" value={name} onChange={(event) => setName(event.target.value)} /></label>
          <label>Email<input className="field" type="email" value={email} onChange={(event) => setEmail(event.target.value)} /></label>
          <div className="actions">
            <button className="btn" type="submit">Save profile</button>
            {store.profile && (
              <button className="btn secondary" type="button" onClick={store.signOut}>Sign out</button>
            )}
          </div>
        </form>
        <div>
          <h2 style={{ fontSize: 32, marginBottom: 10 }}>Orders</h2>
          {!store.profile && <div className="empty">Save a profile to see orders placed with the same email.</div>}
          {store.profile && mine.length === 0 && <div className="empty">No sample orders for {store.profile.email} yet.</div>}
          {mine.map((order) => (
            <Link className="line" key={order.id} href={`/order/${order.id}`} style={{ display: "flex" }}>
              <div>
                <strong>{order.id}</strong>
                <div className="muted">{new Date(order.createdAt).toLocaleString()}</div>
              </div>
              <strong>{format(order.total)}</strong>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
