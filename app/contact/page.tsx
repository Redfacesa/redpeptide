"use client";

import { useState } from "react";
import { tx } from "@/lib/region";

export default function ContactPage() {
  const [sent, setSent] = useState(false);

  return (
    <div className="wrap pad">
      <div className="page-title">
        <p className="eyebrow">{tx("Kontakt", "Contact")}</p>
        <h1>{tx("Schreiben Sie dem Desk", "Write to the desk")}</h1>
        <p className="lede">{tx("Fragen zu einer Charge, einer Sendung oder einem Dokument. Dieses Formular speichert noch nichts auf einem Server. Es bestätigt nur auf dem Bildschirm.", "Questions about a batch, a shipment, or a document. This form does not yet save anything on a server. It only confirms on the screen.")}</p>
      </div>
      <div className="split" style={{ marginTop: 20 }}>
        {sent ? (
          <div className="panel">
            <h2 style={{ fontSize: 36 }}>{tx("Nachricht notiert.", "Message noted.")}</h2>
            <p className="muted">{tx("Im laufenden Shop erreicht sie den Desk per E-Mail. Vorerst bleibt sie in dieser Browser-Sitzung.", "In the live shop it would reach the desk by email. For now it stays in this browser session.")}</p>
          </div>
        ) : (
          <form
            className="form panel"
            onSubmit={(event) => {
              event.preventDefault();
              setSent(true);
            }}
          >
            <label>{tx("Name", "Name")}<input className="field" name="name" required /></label>
            <label>{tx("E-Mail", "Email")}<input className="field" type="email" name="email" required /></label>
            <label>{tx("Thema", "Topic")}
              <select className="field" name="topic" defaultValue={tx("Bestellung", "Order")}>
                <option>{tx("Bestellung", "Order")}</option>
                <option>{tx("Zertifikat", "Certificate")}</option>
                <option>{tx("Grossmenge", "Bulk quantity")}</option>
                <option>{tx("Etwas anderes", "Something else")}</option>
              </select>
            </label>
            <label>{tx("Nachricht", "Message")}<textarea className="field" name="message" rows={5} required /></label>
            <button className="btn" type="submit">{tx("Nachricht senden", "Send message")}</button>
          </form>
        )}
        <aside className="summary">
          <h2>Desk</h2>
          <p>{tx("Genf · Schweiz", "South Africa")}</p>
          <p className="muted">{tx("Nur Forschungskorrespondenz. Wir beraten nicht zu Anwendung am Menschen, Zubereitung oder Dosis.", "Research correspondence only. We do not advise on use in people, preparation, or dose.")}</p>
        </aside>
      </div>
    </div>
  );
}
