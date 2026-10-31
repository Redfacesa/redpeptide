"use client";

import { useState } from "react";

export default function ContactPage() {
  const [sent, setSent] = useState(false);

  return (
    <div className="wrap pad">
      <div className="page-title">
        <p className="eyebrow">Kontakt</p>
        <h1>Schreiben Sie dem Desk</h1>
        <p className="lede">Fragen zu einer Charge, einer Sendung oder einem Dokument. Dieses Formular speichert noch nichts auf einem Server. Es bestätigt nur auf dem Bildschirm.</p>
      </div>
      <div className="split" style={{ marginTop: 20 }}>
        {sent ? (
          <div className="panel">
            <h2 style={{ fontSize: 36 }}>Nachricht notiert.</h2>
            <p className="muted">Im laufenden Shop erreicht sie den Desk per E-Mail. Vorerst bleibt sie in dieser Browser-Sitzung.</p>
          </div>
        ) : (
          <form
            className="form panel"
            onSubmit={(event) => {
              event.preventDefault();
              setSent(true);
            }}
          >
            <label>Name<input className="field" name="name" required /></label>
            <label>E-Mail<input className="field" type="email" name="email" required /></label>
            <label>Thema
              <select className="field" name="topic" defaultValue="Bestellung">
                <option>Bestellung</option>
                <option>Zertifikat</option>
                <option>Grossmenge</option>
                <option>Etwas anderes</option>
              </select>
            </label>
            <label>Nachricht<textarea className="field" name="message" rows={5} required /></label>
            <button className="btn" type="submit">Nachricht senden</button>
          </form>
        )}
        <aside className="summary">
          <h2>Desk</h2>
          <p>Genf · Schweiz</p>
          <p className="muted">Nur Forschungskorrespondenz. Wir beraten nicht zu Anwendung am Menschen, Zubereitung oder Dosis.</p>
        </aside>
      </div>
    </div>
  );
}
