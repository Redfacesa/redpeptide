import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Qualität" };

export default function QualityPage() {
  return (
    <div className="wrap pad">
      <figure className="page-photo">
        <img src="/images/lab.png" alt="Chromatographiesystem und Vial-Rack auf einer Laborbank" />
      </figure>
      <div className="page-title">
        <p className="eyebrow">Qualität</p>
        <h1>Der Standard hinter dem Etikett.</h1>
        <p className="lede">
          Ein Forschungspeptid ist so verlässlich wie die Verbindung zwischen Vial und Akte. Das ist der Standard, auf den die Etiketten von Novion Biopharma geschrieben sind. Die Laborzertifikate werden noch angebunden.
        </p>
        <p>
          Novion zeigt keine ISO-, GMP-, FDA-, Swissmedic- oder anderen Zertifizierungszeichen. Diese Siegel darf man nicht frei kopieren, und ein Zeichen ohne Zertifikat wäre eine falsche Angabe. Die einzige freie Zusicherung auf dieser Seite ist die verschlüsselte Verbindung im Browser. Eine Reinheitszahl bleibt eine Spezifikation, bis der Laborbericht dieser Charge veröffentlicht ist.
        </p>
      </div>
      <div className="steps" style={{ marginTop: 22 }}>
        <article className="step">
          <em>01</em>
          <h2 style={{ fontSize: 32, margin: "8px 0" }}>Identität</h2>
          <p className="muted">Die Sequenzklasse auf dem Etikett muss zu einem Identitätstest dieser Charge passen, nicht zu einem allgemeinen Produktfoto.</p>
        </article>
        <article className="step">
          <em>02</em>
          <h2 style={{ fontSize: 32, margin: "8px 0" }}>Reinheit</h2>
          <p className="muted">Die chromatographische Reinheit wird mit der Methode angegeben. Eine einzelne Prozentzahl ohne Chromatogramm ist nicht die ganze Akte.</p>
        </article>
        <article className="step">
          <em>03</em>
          <h2 style={{ fontSize: 32, margin: "8px 0" }}>Die Charge</h2>
          <p className="muted">Aussehen, Lagerung und Zertifikat teilen einen Chargencode. Weichen die Codes ab, gehört das Dokument nicht zum Vial.</p>
        </article>
      </div>
      <section className="section">
        <div className="band">
          <div>
            <h2>Was der Katalog zeigt</h2>
            <p>Jede Verbindung hat Grössen, Bestand, eine Spezifikationszeile und einen Weg zur Zertifikatsvorschau. Diese Vorschauen verwenden Platzhalter-Chargen, bis die Laboranbindung steht.</p>
          </div>
          <div className="stats">
            <div className="stat"><strong>Trockener Feststoff</strong>Kein Lösungsmittel in der Packung.</div>
            <div className="stat"><strong>Schlichter Karton</strong>Dezente Aussenpackung.</div>
            <div className="stat"><strong>Nur Forschung</strong>Nicht als Arzneimittel verkauft.</div>
          </div>
        </div>
      </section>
      <Link className="btn" href="/lab-reports">Laborvorschauen öffnen</Link>
    </div>
  );
}
