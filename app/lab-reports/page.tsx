import type { Metadata } from "next";
import Link from "next/link";
import { labBatches } from "@/lib/catalog";
import { tx } from "@/lib/region";

export const metadata: Metadata = { title: tx("Laborberichte", "Laboratory reports") };

export default function LabReportsPage() {
  return (
    <div className="wrap pad">
      <div className="page-title">
        <p className="eyebrow">{tx("Labor", "Laboratory")}</p>
        <h1>{tx("Zertifikatsvorschauen", "Certificate previews")}</h1>
        <p className="lede">
          {tx(
            "Diese Karten zeigen, wie eine Chargenakte im Shop stehen wird. Chargennummern und Reinheitszahlen sind Platzhalter, keine Ergebnisse einer ausgestellten Analyse.",
            "These cards show how a batch file will sit in the shop. Batch numbers and purity figures are placeholders, not the results of an issued analysis.",
          )}
        </p>
      </div>
      <div className="grid" style={{ marginTop: 20 }}>
        {labBatches.map((batch) => (
          <article className="panel-card" id={batch.id} key={batch.id} style={{ padding: 16 }}>
            <p className="eyebrow">{tx("Spezifikation", "Specification")}</p>
            <h2 style={{ fontSize: 32 }}>{batch.product}</h2>
            <table className="table">
              <tbody>
                <tr><th>{tx("Charge", "Batch")}</th><td>{batch.id}</td></tr>
                <tr><th>{tx("Methode", "Method")}</th><td>{batch.method}</td></tr>
                <tr><th>{tx("Hauptpeak", "Main peak")}</th><td>{batch.purity}</td></tr>
                <tr><th>{tx("Stand", "Status")}</th><td>{tx("Spezifikation", "Specification")}</td></tr>
              </tbody>
            </table>
            <Link className="link-arrow" href={`/product/${batch.slug}`}>{tx("Verbindung ansehen", "View compound")}</Link>
          </article>
        ))}
      </div>
    </div>
  );
}
