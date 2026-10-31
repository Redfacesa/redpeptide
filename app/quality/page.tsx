import type { Metadata } from "next";
import Link from "next/link";
import { tx } from "@/lib/region";

export const metadata: Metadata = { title: tx("Qualität", "Quality") };

export default function QualityPage() {
  return (
    <div className="wrap pad">
      <figure className="page-photo">
        <img src="/images/lab.png" alt={tx("Chromatographiesystem und Vial-Rack auf einer Laborbank", "Chromatography system and vial rack on a laboratory bench")} />
      </figure>
      <div className="page-title">
        <p className="eyebrow">{tx("Qualität", "Quality")}</p>
        <h1>{tx("Der Standard hinter dem Etikett.", "The standard behind the label.")}</h1>
        <p className="lede">
          {tx(
            "Ein Forschungspeptid ist so verlässlich wie die Verbindung zwischen Vial und Akte. Das ist der Standard, auf den die Etiketten von Novion Biopharma geschrieben sind. Die Laborzertifikate werden noch angebunden.",
            "A research peptide is only as reliable as the link between the vial and the file. That is the standard the Novion Biopharma labels are written to. Laboratory certificates are still being attached.",
          )}
        </p>
        <p>
          {tx(
            "Novion zeigt keine ISO-, GMP-, FDA-, Swissmedic- oder anderen Zertifizierungszeichen. Diese Siegel darf man nicht frei kopieren, und ein Zeichen ohne Zertifikat wäre eine falsche Angabe. Die einzige freie Zusicherung auf dieser Seite ist die verschlüsselte Verbindung im Browser. Eine Reinheitszahl bleibt eine Spezifikation, bis der Laborbericht dieser Charge veröffentlicht ist.",
            "Novion does not show ISO, GMP, FDA, Swissmedic, SAHPRA, or other certification marks. Those seals cannot be copied freely, and a mark without a certificate would be a false claim. The only assurance on this page is the encrypted connection in the browser. A purity figure stays a specification until that batch's laboratory report is published.",
          )}
        </p>
      </div>
      <div className="steps" style={{ marginTop: 22 }}>
        <article className="step">
          <em>01</em>
          <h2 style={{ fontSize: 32, margin: "8px 0" }}>{tx("Identität", "Identity")}</h2>
          <p className="muted">{tx("Die Sequenzklasse auf dem Etikett muss zu einem Identitätstest dieser Charge passen, nicht zu einem allgemeinen Produktfoto.", "The sequence class on the label has to match an identity test for that batch, not a general product photo.")}</p>
        </article>
        <article className="step">
          <em>02</em>
          <h2 style={{ fontSize: 32, margin: "8px 0" }}>{tx("Reinheit", "Purity")}</h2>
          <p className="muted">{tx("Die chromatographische Reinheit wird mit der Methode angegeben. Eine einzelne Prozentzahl ohne Chromatogramm ist nicht die ganze Akte.", "Chromatographic purity is stated with the method. A single percentage without a chromatogram is not the whole file.")}</p>
        </article>
        <article className="step">
          <em>03</em>
          <h2 style={{ fontSize: 32, margin: "8px 0" }}>{tx("Die Charge", "The batch")}</h2>
          <p className="muted">{tx("Aussehen, Lagerung und Zertifikat teilen einen Chargencode. Weichen die Codes ab, gehört das Dokument nicht zum Vial.", "Appearance, storage, and the certificate share one batch code. If the codes differ, the document does not belong to the vial.")}</p>
        </article>
      </div>
      <section className="section">
        <div className="band">
          <div>
            <h2>{tx("Was der Katalog zeigt", "What the catalog shows")}</h2>
            <p>{tx("Jede Verbindung hat Grössen, Bestand, eine Spezifikationszeile und einen Weg zur Zertifikatsvorschau. Diese Vorschauen verwenden Platzhalter-Chargen, bis die Laboranbindung steht.", "Each compound has sizes, stock, a specification line, and a path to a certificate preview. Those previews use placeholder batches until the laboratory link is in place.")}</p>
          </div>
          <div className="stats">
            <div className="stat"><strong>{tx("Trockener Feststoff", "Dry solid")}</strong>{tx("Kein Lösungsmittel in der Packung.", "No solvent in the pack.")}</div>
            <div className="stat"><strong>{tx("Schlichter Karton", "Plain carton")}</strong>{tx("Dezente Aussenpackung.", "Discreet outer pack.")}</div>
            <div className="stat"><strong>{tx("Nur Forschung", "Research only")}</strong>{tx("Nicht als Arzneimittel verkauft.", "Not sold as a medicine.")}</div>
          </div>
        </div>
      </section>
      <Link className="btn" href="/lab-reports">{tx("Laborvorschauen öffnen", "Open laboratory previews")}</Link>
    </div>
  );
}
