import type { Metadata } from "next";
import Link from "next/link";
import { labBatches } from "@/lib/catalog";

export const metadata: Metadata = { title: "Laborberichte" };

export default function LabReportsPage() {
  return (
    <div className="wrap pad">
      <div className="page-title">
        <p className="eyebrow">Labor</p>
        <h1>Zertifikatsvorschauen</h1>
        <p className="lede">
          Diese Karten zeigen, wie eine Chargenakte im Shop stehen wird. Chargennummern und Reinheitszahlen sind Platzhalter, keine Ergebnisse einer ausgestellten Analyse.
        </p>
      </div>
      <div className="grid" style={{ marginTop: 20 }}>
        {labBatches.map((batch) => (
          <article className="panel-card" id={batch.id} key={batch.id} style={{ padding: 16 }}>
            <p className="eyebrow">Spezifikation</p>
            <h2 style={{ fontSize: 32 }}>{batch.product}</h2>
            <table className="table">
              <tbody>
                <tr><th>Charge</th><td>{batch.id}</td></tr>
                <tr><th>Methode</th><td>{batch.method}</td></tr>
                <tr><th>Hauptpeak</th><td>{batch.purity}</td></tr>
                <tr><th>Stand</th><td>Spezifikation</td></tr>
              </tbody>
            </table>
            <Link className="link-arrow" href={`/product/${batch.slug}`}>Verbindung ansehen</Link>
          </article>
        ))}
      </div>
    </div>
  );
}
