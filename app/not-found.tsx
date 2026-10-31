import Link from "next/link";

export default function NotFound() {
  return (
    <div className="wrap pad prose">
      <p className="eyebrow">404</p>
      <h1>Diese Seite ist nicht im Katalog.</h1>
      <p>Diese Verbindung oder Notiz steht nicht im Novion-Katalog.</p>
      <p><Link className="btn" href="/shop">Zurück zum Shop</Link></p>
    </div>
  );
}
