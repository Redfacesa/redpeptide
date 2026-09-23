import type { Metadata } from "next";
import { notFound } from "next/navigation";

const pages = {
  privacy: {
    title: "Privacy",
    paragraphs: [
      "This is a draft privacy notice for the sample store. It is not legal advice and it should be replaced before launch.",
      "The sample keeps your cart, wishlist, profile, age confirmation, and orders in local storage on your device. Nothing in those flows is sent to a server.",
      "When a real account and checkout are added, this notice will name the controller, the payment and shipping processors, the retention period, and how to request access or deletion.",
    ],
  },
  terms: {
    title: "Terms",
    paragraphs: [
      "These draft terms describe the sample catalog. Placing a sample order does not create a contract of sale and does not reserve stock.",
      "Compounds are listed for laboratory research by adults. They are not offered as medicines, foods, or cosmetics, and the site does not provide dosing or administration guidance.",
      "Title, risk, returns, and liability clauses will be written against the operating company before any paid order is accepted.",
    ],
  },
  imprint: {
    title: "Imprint",
    paragraphs: [
      "Operator: RedPeptide sample store (details to be completed).",
      "Address, company register, VAT identification number, and the person responsible for content will be published here before launch.",
      "Contact for this prototype: hello@redpeptide.example.",
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
