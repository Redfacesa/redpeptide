import type { Metadata } from "next";
import Link from "next/link";
import { tx } from "@/lib/region";

export const metadata: Metadata = {
  title: tx("Forschungshinweis", "Research notice"),
  description: tx(
    "Verbindungen von Novion Biopharma sind für die Laborforschung durch Erwachsene. Nicht zur Anwendung an Mensch oder Tier.",
    "Compounds from Novion Biopharma are for laboratory research by adults. Not for use in people or animals.",
  ),
};

export default function ResearchPage() {
  return (
    <article className="wrap pad prose">
      <p className="eyebrow">{tx("Hinweis", "Notice")}</p>
      <h1>{tx("Nur Laborforschung", "Laboratory research only")}</h1>
      <p>
        {tx(
          "Novion Biopharma listet lyophilisierte Forschungsfeststoffe für analytische und In-vitro-Arbeit durch Personen ab 18 Jahren.",
          "Novion Biopharma lists lyophilized research solids for analytical and in-vitro work by people aged 18 and over.",
        )}
      </p>
      <p>
        {tx(
          "Es sind keine Arzneimittel, Lebensmittel, Kosmetika oder Tierarzneimittel. Sie werden nicht zur Anwendung an Mensch oder Tier angeboten. Diese Seite veröffentlicht keine Anleitung zu Zubereitung, Injektion oder Dosierung, und nichts davon ist medizinische Beratung.",
          "They are not medicines, foods, cosmetics, or veterinary products. They are not offered for use in people or animals. This site publishes no preparation, injection, or dosing instructions, and none of it is medical advice.",
        )}
      </p>
      <p>
        {tx(
          "Sie sind verantwortlich für die Regeln Ihres Labors und des Landes, in das das Vial geliefert wird. Eine Reinheitszeile auf einer Produktseite ist eine Spezifikation, kein Zertifikat, bis ein Bericht für diese Charge angebunden ist.",
          "You are responsible for the rules of your laboratory and of the country the vial is delivered to. A purity line on a product page is a specification, not a certificate, until a report is attached to that batch.",
        )}
      </p>
      <p>
        {tx("Lesen Sie vor der Zahlung die", "Before you pay, read the")} <Link href="/legal/terms">{tx("AGB", "terms")}</Link>, {tx("den", "the")} <Link href="/legal/shipping">{tx("Versand", "shipping")}</Link> {tx("und die", "and the")} <Link href="/legal/returns">{tx("Rückgabe", "returns")}</Link>.
      </p>
    </article>
  );
}
