"use client";

import { useState } from "react";
import { tx } from "@/lib/region";

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
      <p className="eyebrow">{tx("Bestellungen", "Orders")}</p>
      <h1>{tx("Von einem Vertrag zurücktreten", "Withdraw from a contract")}</h1>
      <p className="lede">
        {tx(
          "Nutzen Sie diese Seite innerhalb von 14 Tagen nach Erhalt eines ungeöffneten Vials. Sie müssen keinen Grund nennen. Das Öffnen des Siegels beendet dieses Recht, weil das Material aus Gesundheits- und Hygienegründen nicht zurückgenommen werden kann.",
          "Use this page within 14 days of receiving an unopened vial. You do not have to give a reason. Opening the seal ends this right, because the material cannot be taken back for health and hygiene reasons.",
        )}
      </p>
      {reference ? (
        <div className="panel">
          <h2>{tx("Widerruf erfasst", "Withdrawal recorded")}</h2>
          <p>{tx(`Referenz ${reference}. Bewahren Sie diese Referenz mit Ihrer Bestellnummer auf. Der Antrag wirkt, sobald Sie ihn hier absenden.`, `Reference ${reference}. Keep this reference with your order number. The request takes effect when you submit it here.`)}</p>
          <p>{tx("Senden Sie das ungeöffnete Vial erst zurück, wenn der Desk die Rücksendeadresse bestätigt. Eine Rückerstattung der Ware und des günstigsten Standardversands folgt der Rückgaberegel.", "Send the unopened vial back only after the desk confirms the return address. A refund of the goods and the cheapest standard shipping follows the returns rule.")}</p>
        </div>
      ) : (
        <form className="form panel" onSubmit={submit}>
          <label>
            {tx("Bestellnummer", "Order number")}
            <input className="field" name="order" required placeholder="NV-10001" />
          </label>
          <label>
            {tx("E-Mail von der Kasse", "Email from checkout")}
            <input className="field" type="email" name="email" required />
          </label>
          <label>
            {tx("Notiz", "Note")}
            <textarea className="field" name="note" rows={4} placeholder={tx("Optional. Sie müssen nicht erklären, warum.", "Optional. You do not have to explain why.")} />
          </label>
          <button className="btn" type="submit">{tx("Widerruf bestätigen", "Confirm withdrawal")}</button>
        </form>
      )}
    </article>
  );
}
