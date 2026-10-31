import Link from "next/link";
import { tx } from "@/lib/region";

export default function NotFound() {
  return (
    <div className="wrap pad prose">
      <p className="eyebrow">404</p>
      <h1>{tx("Diese Seite ist nicht im Katalog.", "This page is not in the catalog.")}</h1>
      <p>{tx("Diese Verbindung oder Notiz steht nicht im Novion-Katalog.", "That compound or note is not in the Novion catalog.")}</p>
      <p><Link className="btn" href="/shop">{tx("Zurück zum Shop", "Back to the shop")}</Link></p>
    </div>
  );
}
