import type { Metadata } from "next";
import { faqs } from "@/lib/catalog";

export const metadata: Metadata = { title: "Hilfe" };

export default function HelpPage() {
  return (
    <div className="wrap pad">
      <div className="page-title">
        <p className="eyebrow">Hilfe</p>
        <h1>Vor der Bestellung</h1>
      </div>
      <div className="faq" style={{ marginTop: 18, maxWidth: 760 }}>
        {faqs.map((item) => (
          <details key={item.q}>
            <summary>{item.q}</summary>
            <p>{item.a}</p>
          </details>
        ))}
      </div>
    </div>
  );
}
