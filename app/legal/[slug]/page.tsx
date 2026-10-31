import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { zaPages } from "@/lib/legal-za";
import { isZa, tx } from "@/lib/region";

const dePages = {
  privacy: {
    title: isZa ? "Privacy" : "Datenschutz",
    intro: "Dieser Hinweis erklärt, was der Novion-Katalog behält und warum. Es ist die Beschreibung des Betreibers, kein Rechtsgutachten.",
    sections: [
      {
        heading: "Wen das betrifft",
        body: [
          "Novion Biopharma betreibt diesen Katalog. Fragen zu Ihren Angaben laufen über das Kontaktformular.",
          "Der Shop richtet sich an erwachsene Laborkäufer. Er ist kein medizinischer Dienst.",
        ],
      },
      {
        heading: "Was auf Ihrem Gerät bleibt",
        body: [
          "Warenkorb, Merkliste und Altersbestätigung bleiben in diesem Browser. Wenn Sie die Seitendaten löschen, sind sie weg.",
          "Eine Kontoanmeldung bleibt in diesem Browser, bis Sie sich abmelden. Die Anmeldung der Katalogredaktion gilt nur für diese Browser-Sitzung.",
        ],
      },
      {
        heading: "Was an der Kasse gesendet wird",
        body: [
          "Bei der Bestellung behält Novion den Auftrag: Name, E-Mail, Lieferadresse, Verbindungen, Betrag und Status. Diese Akte ist der Weg, wie Sie die Bestellung verfolgen und der Desk sie erfüllt. Die Zahlungsseite erhält die Summe, Ihre E-Mail und die Positionen, damit die Zahlung ausgeführt werden kann. Das Zahlungsunternehmen verarbeitet diese Angaben nach seinem eigenen Hinweis.",
          "Novion verkauft keine Personendaten und setzt keine Werbe-Cookies.",
        ],
      },
      {
        heading: "Ihre Anfragen",
        body: [
          "Sie können über das Kontaktformular eine Kopie der übermittelten Bestellangaben, eine Berichtigung oder eine Löschung verlangen. Einzelne Akten können bleiben, wenn ein Zahlungsstreit oder eine gesetzliche Pflicht das verlangt.",
          "Wenn Sie im Vereinigten Königreich, in der Schweiz oder im Europäischen Wirtschaftsraum leben, können Sie sich auch an die Datenschutzbehörde an Ihrem Wohnort wenden. Dieses Recht hängt nicht davon ab, von wo der Katalog gelesen wird.",
        ],
      },
    ],
  },
  terms: {
    title: isZa ? "Terms of sale" : "Verkaufsbedingungen",
    intro: "Diese Bedingungen gelten für Bestellungen im Katalog von Novion Biopharma. Zwingende Schutzrechte in Ihrem Land bleiben bestehen, wo das Gesetz keinen Verzicht erlaubt.",
    sections: [
      {
        heading: "Was verkauft wird",
        body: [
          "Jeder Artikel ist ein versiegelter Forschungsfeststoff für die Laborarbeit durch Personen ab 18 Jahren. Er ist kein Arzneimittel, Lebensmittel, Kosmetikum oder Tierarzneimittel und wird nicht zur Anwendung an Mensch oder Tier verkauft.",
          "Der Katalog gibt keine Anleitung zu Zubereitung, Rekonstitution, Dosierung oder Behandlung. Nichts auf der Seite ist medizinische Beratung.",
        ],
      },
      {
        heading: "Ihre Bestätigung",
        body: [
          "Mit der Bestellung bestätigen Sie, dass Sie 18 oder älter sind, den Stoff nur für rechtmässige Laborforschung verwenden und den Forschungshinweis sowie die Rückgabe gelesen haben.",
          "Sie sind dafür verantwortlich zu wissen, ob der Stoff am Lieferort eingeführt, gehalten oder verwendet werden darf. Novion kann eine Bestellung ablehnen oder stornieren, die es nicht rechtmässig versenden kann.",
        ],
      },
      {
        heading: "Preis und Zahlung",
        body: [
          isZa
            ? "Catalog prices are in South African rand. Payment is collected in rand. The payment page shows that rand amount. A contract is formed when payment is accepted."
            : "Die Katalogpreise sind in Schweizer Franken. Die Zahlung wird in Rand zum Tageskurs abgebucht. Die Zahlungsseite zeigt den Rand-Betrag, nicht dieselbe Zahl in Franken. Ein Vertrag entsteht, wenn die Zahlung angenommen wird.",
          "Novion kann einen offensichtlichen Preisfehler vor dem Versand korrigieren und statt der Lieferung eine Rückerstattung anbieten.",
        ],
      },
      {
        heading: "Gefahr und Haftung",
        body: [
          "Die Gefahr an einem versiegelten Vial geht über, wenn es dem Transporteur übergeben wird. Bis dahin bleibt Novion für den Verlust der noch nicht versendeten Bestellung verantwortlich.",
          "Der Stoff wird als Forschungsfeststoff mit der für diese Verbindung gedruckten Spezifikation geliefert. Es wird nicht zugesichert, dass er für ein bestimmtes Experiment, eine Diagnose oder ein Ergebnis geeignet ist.",
          "Diese Bedingungen beschränken keine Haftung, die das Gesetz nicht zu beschränken erlaubt, einschliesslich Haftung für Betrug oder für Tod oder Körperverletzung durch Fahrlässigkeit. Im Übrigen ist die Haftung für ein Vial auf den Betrag begrenzt, den Sie für dieses Vial gezahlt haben.",
        ],
      },
      {
        heading: "Recht",
        body: [
          "Diese Bedingungen unterstehen dem Recht der Schweiz. Wenn Sie Konsument sind, behalten Sie die zwingenden Schutzrechte des Landes, in dem Sie leben.",
        ],
      },
    ],
  },
  shipping: {
    title: isZa ? "Shipping" : "Versand",
    intro: "Bestellungen verlassen das Haus als versiegelte Forschungsvials in einem schlichten Aussenkarton.",
    sections: [
      {
        heading: "Abgang",
        body: [
          "Standardversand wird auf 2–4 Tage und Express auf 1–2 Tage nach Zahlung geschätzt. Das sind Schätzungen, keine garantierten Liefertermine. Kostenloser Standardversand gilt, sobald die Bestellung die im Warenkorb gezeigte Schwelle erreicht.",
          "Lagern Sie das Vial nach Ankunft bei 2–8 °C, vor Licht geschützt, und frieren Sie es nicht ein. Der Transport wird kurz gehalten. Der Katalog verspricht kein Temperaturprotokoll, ausser eines liegt dieser Sendung bei.",
        ],
      },
      {
        heading: "Einfuhr",
        body: [
          "Zoll, Einfuhrbewilligungen und lokale Laborregeln sind Sache des Käufers. Abgaben einer Zollbehörde gehören nicht zum Katalogpreis.",
          "Kann ein Ziel die Sendung nicht annehmen, teilt Novion das mit und erstattet eine noch nicht versendete Bestellung.",
        ],
      },
    ],
  },
  returns: {
    title: isZa ? "Returns and withdrawal" : "Rückgabe und Widerruf",
    intro: "Sie können eine ungeöffnete Bestellung rückgängig machen. Geöffnete Forschungsvials werden nicht zurückgenommen.",
    sections: [
      {
        heading: "Vor und nach der Lieferung",
        body: [
          "Sie können innerhalb von 14 Tagen nach dem Tag, an dem Sie das Vial erhalten, ohne Angabe von Gründen vom Kauf zurücktreten, solange das Siegel nicht gebrochen ist. Nutzen Sie die Widerrufsseite und bewahren Sie die Bestätigung auf.",
          "Hat der Katalog Sie nicht auf dieses Recht hingewiesen, kann die Widerrufsfrist länger laufen, wie es das Recht an Ihrem Wohnort verlangt.",
          "Ist das Siegel gebrochen, eignet sich das Vial aus Gesundheits- und Hygienegründen nicht zur Rückgabe und wird nicht zurückgenommen.",
        ],
      },
      {
        heading: "Rückerstattung",
        body: [
          "Ein gültiger Widerruf wird erstattet, einschliesslich des günstigsten angebotenen Standardversands, innerhalb von 14 Tagen nachdem Novion das Vial zurückerhalten hat oder den Nachweis, dass Sie es abgesendet haben. Wo das möglich ist, erfolgt die Erstattung über denselben Zahlungsweg.",
          "Sie tragen die Kosten der Rücksendung eines ungeöffneten Vials, ausser Novion hat den falschen oder einen beschädigten Artikel versendet. Melden Sie eine falsche oder beschädigte Sendung innerhalb von 7 Tagen nach Lieferung mit Bestellnummer und Fotos. Novion ersetzt sie oder erstattet sie.",
          "Diese Seite nimmt Ihnen kein zwingendes Recht, das Sie im Land haben, in dem Sie leben.",
        ],
      },
    ],
  },
  cookies: {
    title: isZa ? "Cookies and storage" : "Cookies und Speicher",
    intro: "Der Katalog nutzt den Speicher, den er zum Betrieb braucht. Er setzt keine Werbe- oder Analyse-Cookies.",
    sections: [
      {
        heading: "Was gespeichert wird",
        body: [
          "Der Browser behält eine Altersbestätigung, den Warenkorb und die Merkliste. Ein Anmeldetoken des Kontos bleibt in diesem Browser, bis Sie sich abmelden.",
          "Bestellungen werden für das Konto gespeichert, das sie aufgegeben hat, damit der Käufer sie verfolgen und der Desk den Status sehen kann. Die private Katalogredaktion behält ein separates Anmeldetoken, bis diese Sitzung endet.",
          "Die Zahlungsseite ist eine eigene Website und kann eigene Cookies nach ihrem eigenen Hinweis setzen. Novion liest diese Cookies nicht.",
        ],
      },
    ],
  },
  imprint: {
    title: isZa ? "Imprint" : "Impressum",
    intro: "Diese Seite benennt den Katalog. Sie erfindet keine Registernummer und keine Zertifizierung.",
    sections: [
      {
        heading: "Betreiber",
        body: [
          isZa
            ? "Novion Biopharma. Enquiries go through the contact form."
            : "Novion Biopharma, Genf. Anfragen laufen über das Kontaktformular.",
          "Hier steht keine Handelsregisternummer, keine Mehrwertsteuernummer und kein Siegel eines Dritten. Solche Angaben werden erst gedruckt, wenn sie tatsächlich ausgestellt sind. Ein Zeichen, das der Betreiber nicht hält, wird nicht gezeigt.",
        ],
      },
      {
        heading: "Katalog",
        body: [
          "Die Produkte sind Forschungsstoffe für erwachsene Laborkäufer. Forschungshinweis, Bedingungen, Versand und Rückgabe gehören zu den Angaben, die Sie vor der Zahlung erhalten.",
        ],
      },
    ],
  },
};

const pages = isZa ? zaPages : dePages;

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
    title: page?.title ?? "Rechtliches",
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
        <Link href="/research-use">{tx("Forschungshinweis", "Research notice")}</Link>
        {" · "}
        <Link href="/withdraw">{tx("Widerruf", "Withdrawal")}</Link>
        {" · "}
        <Link href="/contact">{tx("Kontakt", "Contact")}</Link>
      </p>
    </article>
  );
}
