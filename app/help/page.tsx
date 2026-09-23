import type { Metadata } from "next";
import { faqs } from "@/lib/catalog";

export const metadata: Metadata = { title: "Help" };

export default function HelpPage() {
  return (
    <div className="wrap pad">
      <div className="page-title">
        <p className="eyebrow">Help</p>
        <h1>Before you order</h1>
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
