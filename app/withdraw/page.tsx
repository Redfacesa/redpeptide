"use client";

import { useState } from "react";

export default function WithdrawPage() {
  const [reference, setReference] = useState("");

  function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const order = String(data.get("order") || "").trim();
    const email = String(data.get("email") || "").trim();
    const stamp = new Date().toISOString();
    const id = `WD-${order.replace(/[^a-z0-9]/gi, "").slice(0, 12) || "ORDER"}-${stamp.slice(0, 10).replace(/-/g, "")}`;
    const record = { id, order, email, at: stamp };
    const existing = JSON.parse(localStorage.getItem("nv-withdrawals") || "[]") as unknown[];
    localStorage.setItem("nv-withdrawals", JSON.stringify([...existing, record]));
    setReference(id);
  }

  return (
    <article className="wrap pad prose">
      <p className="eyebrow">Orders</p>
      <h1>Withdraw from a contract</h1>
      <p className="lede">
        Use this page within 14 days of receiving an unopened vial. You do not have to give a reason. Opening the seal ends this right, because the material cannot be returned for health and hygiene reasons.
      </p>
      {reference ? (
        <div className="panel">
          <h2>Withdrawal recorded</h2>
          <p>Reference {reference}. Keep this reference with your order number. The request takes effect when you submit it here.</p>
          <p>Send the unopened vial back only after the desk confirms the return address. A refund of the goods and the least expensive standard delivery follows the returns policy.</p>
        </div>
      ) : (
        <form className="form panel" onSubmit={submit}>
          <label>
            Order number
            <input className="field" name="order" required placeholder="NV-10001" />
          </label>
          <label>
            Email used at checkout
            <input className="field" type="email" name="email" required />
          </label>
          <label>
            Note
            <textarea className="field" name="note" rows={4} placeholder="Optional. You do not need to explain why." />
          </label>
          <button className="btn" type="submit">Confirm withdrawal</button>
        </form>
      )}
    </article>
  );
}
