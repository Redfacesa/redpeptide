import type { Metadata } from "next";

export const metadata: Metadata = { title: "Research notice" };

export default function ResearchPage() {
  return (
    <article className="wrap pad prose">
      <p className="eyebrow">Notice</p>
      <h1>Laboratory research only</h1>
      <p>
        RedPeptide is a catalog of research peptides. Products are lyophilized solids intended for analytical and in-vitro laboratory work by adults.
      </p>
      <p>
        They are not medicines, not foods, and not offered for human or veterinary administration. The site does not publish dosing, injection, or treatment protocols.
      </p>
      <p>
        Buyers are responsible for complying with the rules that apply to their laboratory, institution, and country. The checkout on this sample store does not complete a sale.
      </p>
    </article>
  );
}
