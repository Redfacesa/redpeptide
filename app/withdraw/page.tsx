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
      <p className="eyebrow">Bestellungen</p>
      <h1>Von einem Vertrag zurücktreten</h1>
      <p className="lede">
        Nutzen Sie diese Seite innerhalb von 14 Tagen nach Erhalt eines ungeöffneten Vials. Sie müssen keinen Grund nennen. Das Öffnen des Siegels beendet dieses Recht, weil das Material aus Gesundheits- und Hygienegründen nicht zurückgenommen werden kann.
      </p>
      {reference ? (
        <div className="panel">
          <h2>Widerruf erfasst</h2>
          <p>Referenz {reference}. Bewahren Sie diese Referenz mit Ihrer Bestellnummer auf. Der Antrag wirkt, sobald Sie ihn hier absenden.</p>
          <p>Senden Sie das ungeöffnete Vial erst zurück, wenn der Desk die Rücksendeadresse bestätigt. Eine Rückerstattung der Ware und des günstigsten Standardversands folgt der Rückgaberegel.</p>
        </div>
      ) : (
        <form className="form panel" onSubmit={submit}>
          <label>
            Bestellnummer
            <input className="field" name="order" required placeholder="NV-10001" />
          </label>
          <label>
            E-Mail von der Kasse
            <input className="field" type="email" name="email" required />
          </label>
          <label>
            Notiz
            <textarea className="field" name="note" rows={4} placeholder="Optional. Sie müssen nicht erklären, warum." />
          </label>
          <button className="btn" type="submit">Widerruf bestätigen</button>
        </form>
      )}
    </article>
  );
}
