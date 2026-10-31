import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Forschungshinweis",
  description: "Verbindungen von Novion Biopharma sind für die Laborforschung durch Erwachsene. Nicht zur Anwendung an Mensch oder Tier.",
};

export default function ResearchPage() {
  return (
    <article className="wrap pad prose">
      <p className="eyebrow">Hinweis</p>
      <h1>Nur Laborforschung</h1>
      <p>
        Novion Biopharma listet lyophilisierte Forschungsfeststoffe für analytische und In-vitro-Arbeit durch Personen ab 18 Jahren.
      </p>
      <p>
        Es sind keine Arzneimittel, Lebensmittel, Kosmetika oder Tierarzneimittel. Sie werden nicht zur Anwendung an Mensch oder Tier angeboten. Diese Seite veröffentlicht keine Anleitung zu Zubereitung, Injektion oder Dosierung, und nichts davon ist medizinische Beratung.
      </p>
      <p>
        Sie sind verantwortlich für die Regeln Ihres Labors und des Landes, in das das Vial geliefert wird. Eine Reinheitszeile auf einer Produktseite ist eine Spezifikation, kein Zertifikat, bis ein Bericht für diese Charge angebunden ist.
      </p>
      <p>
        Lesen Sie vor der Zahlung die <Link href="/legal/terms">AGB</Link>, den <Link href="/legal/shipping">Versand</Link> und die <Link href="/legal/returns">Rückgabe</Link>.
      </p>
    </article>
  );
}
