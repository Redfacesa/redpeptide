import type { Metadata } from "next";
import { faqs } from "@/lib/catalog";
import { tx } from "@/lib/region";

export const metadata: Metadata = { title: tx("Hilfe", "Help") };

export default function HelpPage() {
  return (
    <div className="wrap pad">
      <div className="page-title">
        <p className="eyebrow">{tx("Hilfe", "Help")}</p>
        <h1>{tx("Vor der Bestellung", "Before you order")}</h1>
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
