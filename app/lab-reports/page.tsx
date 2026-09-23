import type { Metadata } from "next";
import Link from "next/link";
import { labBatches } from "@/lib/catalog";

export const metadata: Metadata = { title: "Lab reports" };

export default function LabReportsPage() {
  return (
    <div className="wrap pad">
      <div className="page-title">
        <p className="eyebrow">Laboratory</p>
        <h1>Certificate previews</h1>
        <p className="lede">
          These cards show how a batch record will sit in the shop. The lot numbers and purity figures are placeholders, not results from an issued analysis.
        </p>
      </div>
      <div className="grid" style={{ marginTop: 20 }}>
        {labBatches.map((batch) => (
          <article className="panel-card" id={batch.id} key={batch.id} style={{ padding: 16 }}>
            <p className="eyebrow">{batch.status}</p>
            <h2 style={{ fontSize: 32 }}>{batch.product}</h2>
            <table className="table">
              <tbody>
                <tr><th>Lot</th><td>{batch.id}</td></tr>
                <tr><th>Method</th><td>{batch.method}</td></tr>
                <tr><th>Main peak</th><td>{batch.purity}</td></tr>
                <tr><th>Dated</th><td>{batch.date}</td></tr>
              </tbody>
            </table>
            <Link className="link-arrow" href={`/product/${batch.slug}`}>View compound →</Link>
          </article>
        ))}
      </div>
    </div>
  );
}
