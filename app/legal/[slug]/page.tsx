import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

const pages = {
  privacy: {
    title: "Privacy",
    intro: "This notice explains what the Novion catalog keeps and why. It is the operator’s description of the shop, not a lawyer’s opinion.",
    sections: [
      {
        heading: "Who this covers",
        body: [
          "Novion Biopharma operates this catalog. Questions about your information go through the contact form.",
          "The shop is aimed at adult laboratory buyers. It is not a medical service.",
        ],
      },
      {
        heading: "What stays on your device",
        body: [
          "Your cart, wishlist, age confirmation, profile, and order record are stored in this browser. Clearing the site data removes them.",
          "A catalog editor’s sign-in token, if you use the private editor, is kept for that browser session only.",
        ],
      },
      {
        heading: "What is sent at checkout",
        body: [
          "When you pay, the order total, your email, and the line items are sent to the payment page so the charge can be taken. The payment company processes that information under its own notice.",
          "Novion does not sell personal information and does not use advertising cookies.",
        ],
      },
      {
        heading: "Your requests",
        body: [
          "You can ask for a copy of the order details you submitted, a correction, or deletion, using the contact form. Some records may have to be kept where a payment dispute or a legal duty requires it.",
          "If you are in the United Kingdom, Switzerland, or the European Economic Area, you may also complain to the data authority where you live. That right does not depend on where the catalog is read from.",
        ],
      },
    ],
  },
  terms: {
    title: "Terms of sale",
    intro: "These terms cover orders placed on the Novion Biopharma catalog. Mandatory protections in your country still apply where the law does not allow them to be waived.",
    sections: [
      {
        heading: "What is being sold",
        body: [
          "Each item is a sealed research solid for laboratory use by adults aged 18 or older. It is not a medicine, food, cosmetic, or veterinary product, and it is not sold for human or animal administration.",
          "The catalog does not give preparation, reconstitution, dosing, or treatment instructions. Nothing on the site is medical advice.",
        ],
      },
      {
        heading: "Your confirmation",
        body: [
          "By ordering, you confirm that you are 18 or older, that you will use the material only for lawful laboratory research, and that you have read the research notice and the returns policy.",
          "You are responsible for knowing whether the material may be imported, held, or used where it will be delivered. Novion may refuse or cancel an order it cannot ship lawfully.",
        ],
      },
      {
        heading: "Price and payment",
        body: [
          "The price shown in the catalog follows the currency for the country where you open the site. The payment page shows the amount again before you pay. A contract is formed when payment is accepted.",
          "Novion may correct an obvious pricing error before dispatch and offer you a refund instead of shipping.",
        ],
      },
      {
        heading: "Risk and liability",
        body: [
          "Risk in a sealed vial passes when it is handed to the carrier. Until then, Novion remains responsible for loss of the unshipped order.",
          "The material is supplied as a research solid with the specification printed for that compound. It is not warranted fit for a particular experiment, diagnosis, or outcome.",
          "Nothing in these terms limits liability that the law does not allow to be limited, including liability for fraud or for death or personal injury caused by negligence. Otherwise, liability for a vial is limited to the amount you paid for that vial.",
        ],
      },
      {
        heading: "Law",
        body: [
          "These terms are governed by the laws of Switzerland. If you are a consumer, you keep the mandatory protections of the country where you live.",
        ],
      },
    ],
  },
  shipping: {
    title: "Shipping",
    intro: "Orders leave as sealed research vials in a plain outer carton.",
    sections: [
      {
        heading: "Dispatch",
        body: [
          "Standard delivery is estimated at 2–4 days and express at 1–2 days after payment. Those are estimates, not guaranteed delivery dates. Free standard delivery applies once the order reaches the threshold shown in the cart.",
          "Store the vial at 2–8 °C after it arrives, protected from light, and do not freeze it. Transit is arranged to be short. The catalog does not promise a temperature log unless one is included with that shipment.",
        ],
      },
      {
        heading: "Import",
        body: [
          "Customs, import permits, and local laboratory rules are the buyer’s responsibility. Duties charged by a customs authority are not part of the catalog price.",
          "If a destination cannot accept the shipment, Novion will tell you and refund an unshipped order.",
        ],
      },
    ],
  },
  returns: {
    title: "Returns and withdrawal",
    intro: "You can change your mind about an unopened order. Opened research vials are not taken back.",
    sections: [
      {
        heading: "Before and after delivery",
        body: [
          "You may withdraw from the purchase within 14 days after the day you receive the vial, without giving a reason, as long as the seal has not been broken. Use the withdrawal page and keep the confirmation.",
          "If the catalog failed to tell you about this right, the withdrawal period can run longer, as the law where you live requires.",
          "Once the seal is broken, the vial is not suitable for return for health and hygiene reasons, and it will not be accepted back.",
        ],
      },
      {
        heading: "Refunds",
        body: [
          "A valid withdrawal is refunded, including the least expensive standard delivery offered, within 14 days of Novion receiving the vial back or proof that you sent it. Use the same payment method where that is possible.",
          "You pay the cost of sending an unopened vial back, unless Novion shipped the wrong item or a damaged item. Report a wrong or damaged shipment within 7 days of delivery, with the order number and photographs, and Novion will replace it or refund it.",
          "This page does not remove any mandatory right you have in the country where you live.",
        ],
      },
    ],
  },
  cookies: {
    title: "Cookies and storage",
    intro: "The catalog uses the storage it needs to run. It does not use advertising or analytics cookies.",
    sections: [
      {
        heading: "What is stored",
        body: [
          "The browser keeps an age confirmation, the cart, the wishlist, a profile you choose to save, and your order record. Those entries stay on your device.",
          "The private catalog editor keeps a sign-in token in session storage until you sign out or close the session.",
          "The payment page is a separate site and may set its own cookies under its own notice. Novion does not read those cookies.",
        ],
      },
    ],
  },
  imprint: {
    title: "Imprint",
    intro: "This page names the catalog. It does not invent a registration number or a certification.",
    sections: [
      {
        heading: "Operator",
        body: [
          "Novion Biopharma, Geneva. Research correspondence is in English through the contact form.",
          "No trade-register number, VAT number, or third-party seal is printed here. Those particulars are added only after they have actually been issued. A mark the operator does not hold is not displayed.",
        ],
      },
      {
        heading: "Catalog",
        body: [
          "Products are research materials for adult laboratory buyers. The research notice, terms, shipping, and returns pages form part of the information given before you pay.",
        ],
      },
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
  return {
    title: page?.title ?? "Legal",
    description: page?.intro,
  };
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
      <p className="eyebrow">Novion Biopharma</p>
      <h1>{page.title}</h1>
      <p className="lede">{page.intro}</p>
      {page.sections.map((section) => (
        <section key={section.heading}>
          <h2>{section.heading}</h2>
          {section.body.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </section>
      ))}
      <p>
        <Link href="/research-use">Research notice</Link>
        {" · "}
        <Link href="/withdraw">Withdraw an order</Link>
        {" · "}
        <Link href="/contact">Contact</Link>
      </p>
    </article>
  );
}
