import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Research notice",
  description: "Novion Biopharma compounds are for laboratory research by adults. Not for human or veterinary use.",
};

export default function ResearchPage() {
  return (
    <article className="wrap pad prose">
      <p className="eyebrow">Notice</p>
      <h1>Laboratory research only</h1>
      <p>
        Novion Biopharma lists lyophilized research solids for analytical and in-vitro laboratory work by adults aged 18 or older.
      </p>
      <p>
        They are not medicines, foods, cosmetics, or veterinary products. They are not offered for human or animal administration. This site does not publish preparation, injection, or dosing instructions, and nothing here is medical advice.
      </p>
      <p>
        You are responsible for the rules that apply to your laboratory and to the country where the vial will be delivered. A purity line on a product page is a specification, not a certificate, until a report for that lot is attached.
      </p>
      <p>
        Read the <Link href="/legal/terms">terms</Link>, <Link href="/legal/shipping">shipping</Link>, and <Link href="/legal/returns">returns</Link> pages before you pay.
      </p>
    </article>
  );
}
