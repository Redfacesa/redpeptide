import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Quality" };

export default function QualityPage() {
  return (
    <div className="wrap pad">
      <figure className="page-photo">
        <img src="/images/lab.png" alt="Chromatography system and vial rack on a laboratory bench" />
      </figure>
      <div className="page-title">
        <p className="eyebrow">Quality</p>
        <h1>The standard behind the label.</h1>
        <p className="lede">
          A research peptide is only as trustworthy as the join between the vial and its record. This page is the standard RedPeptide is being built to meet. Live lab partnerships are still to be connected.
        </p>
      </div>
      <div className="steps" style={{ marginTop: 22 }}>
        <article className="step">
          <em>01</em>
          <h2 style={{ fontSize: 32, margin: "8px 0" }}>Identity</h2>
          <p className="muted">The sequence class on the label has to match an analytical identity test for that lot, not a generic product photo.</p>
        </article>
        <article className="step">
          <em>02</em>
          <h2 style={{ fontSize: 32, margin: "8px 0" }}>Purity</h2>
          <p className="muted">Chromatographic purity is reported with the method. A single percentage without the chromatogram is not the whole story.</p>
        </article>
        <article className="step">
          <em>03</em>
          <h2 style={{ fontSize: 32, margin: "8px 0" }}>The lot</h2>
          <p className="muted">Fill appearance, storage, and the certificate share one batch code. If the codes differ, the document does not belong to the vial.</p>
        </article>
      </div>
      <section className="section">
        <div className="band">
          <div>
            <h2>What the sample store already shows</h2>
            <p>Each compound has sizes, stock, a specification line, and a path to a certificate preview. Those previews use fictional lot numbers so the layout can be reviewed before a laboratory feed exists.</p>
          </div>
          <div className="stats">
            <div className="stat"><strong>Dry solid</strong>No diluent in the pack.</div>
            <div className="stat"><strong>Plain carton</strong>Discreet outer packaging.</div>
            <div className="stat"><strong>Research only</strong>Not sold as a medicine.</div>
          </div>
        </div>
      </section>
      <Link className="btn" href="/lab-reports">Open lab report previews</Link>
    </div>
  );
}
