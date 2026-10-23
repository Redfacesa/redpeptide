import type { Metadata } from "next";
import { notFound } from "next/navigation";

const pages = {
  privacy: {
    title: "Privacy",
    paragraphs: [
      "This privacy notice covers the Novion Biopharma catalog. It is not legal advice.",
      "The shop keeps your cart, wishlist, profile, age confirmation, and order record in local storage on your device.",
      "Checkout sends the order total, email, and line items to Redface Pay so the rand amount can be charged. The controller, retention period, and access requests will be named here with the company details.",
    ],
  },
  terms: {
    title: "Terms",
    paragraphs: [
      "Compounds are listed for laboratory research by adults. They are not offered as medicines, foods, or cosmetics, and the site does not provide dosing or administration guidance.",
      "A completed Redface Pay payment is a purchase of the listed research material. The amount charged is the South African rand total shown at checkout.",
      "Title, risk, and returns follow the terms published with the operating company in Geneva.",
    ],
  },
  imprint: {
    title: "Imprint",
    paragraphs: [
      "Operator: Novion Biopharma, Geneva, Switzerland. Company register and VAT details will be published here before launch.",
      "Catalog prices are set in South African rand. Checkout is processed by Redface Pay.",
      "Research correspondence is handled from Geneva.",
    ],
  },
} as const;

export function generateStaticParams() {
  return Object.keys(pages).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const page = pages[slug as keyof typeof pages];
  return { title: page?.title ?? "Legal" };
}

export default async function LegalPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const page = pages[slug as keyof typeof pages];
  if (!page) notFound();

  return (
    <article className="wrap pad prose">
      <p className="eyebrow">Draft</p>
      <h1>{page.title}</h1>
      {page.paragraphs.map((paragraph) => (
        <p key={paragraph}>{paragraph}</p>
      ))}
    </article>
  );
}
