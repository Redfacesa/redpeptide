export type CategoryId = "recovery" | "metabolic" | "cognitive" | "longevity" | "signaling";

export type Variant = {
  id: string;
  label: string;
  mg: number;
  price: number;
  sku: string;
  stock: number;
  image: string;
};

export type Product = {
  slug: string;
  name: string;
  code: string;
  category: CategoryId;
  tagline: string;
  summary: string;
  overview: string;
  purity: string;
  appearance: string;
  storage: string;
  featured?: boolean;
  badge?: string;
  image: string;
  variants: Variant[];
};

export type Article = {
  slug: string;
  title: string;
  date: string;
  kicker: string;
  excerpt: string;
  body: string[];
};

export type LabBatch = {
  id: string;
  product: string;
  slug: string;
  purity: string;
  method: string;
  date: string;
  status: "Specification";
};

export const categories = [
  {
    "id": "metabolic",
    "name": "Stoffwechsel",
    "blurb": "Inkretin-Forschung",
    "tone": "#12315f"
  },
  {
    "id": "recovery",
    "name": "Regeneration",
    "blurb": "Gewebe-Signalwege",
    "tone": "#12315f"
  },
  {
    "id": "cognitive",
    "name": "Kognition",
    "blurb": "Nootrope Analoga",
    "tone": "#12315f"
  },
  {
    "id": "longevity",
    "name": "Langlebigkeit",
    "blurb": "Mitochondriale Feststoffe",
    "tone": "#12315f"
  },
  {
    "id": "signaling",
    "name": "Signalwege",
    "blurb": "Sekretagoga",
    "tone": "#12315f"
  }
] as const;

export const products: Product[] = [
  {
    "slug": "semaglutide",
    "name": "Semaglutide",
    "code": "SEMAG",
    "category": "metabolic",
    "tagline": "Lyophilisiertes Forschungsvial · Genf",
    "summary": "Semaglutide ist als versiegeltes Forschungsvial gelistet. Nur für das Labor. Kein Arzneimittel und keine Dosierungsanleitung.",
    "overview": "Semaglutide wird von Novion Biopharma als lyophilisierter Forschungsfeststoff geliefert. Das Etikett weist auf die reine Forschungsnutzung hin. Diese Seite gibt keine Anleitung zu Zubereitung, Dosis oder Anwendung am Menschen.",
    "purity": "> 99 % HPLC (Spezifikation)",
    "appearance": "Lyophilisierter Feststoff im versiegelten Vial",
    "storage": "2–8 °C. Vor Licht schützen. Nicht einfrieren.",
    "featured": true,
    "image": "/images/sema-10.jpg",
    "variants": [
      {
        "id": "10",
        "label": "10 mg",
        "mg": 10,
        "price": 39,
        "sku": "NV-SEMAGLUT-10",
        "stock": 24,
        "image": "/images/sema-10.jpg"
      },
      {
        "id": "20",
        "label": "20 mg",
        "mg": 20,
        "price": 59,
        "sku": "NV-SEMAGLUT-20",
        "stock": 24,
        "image": "/images/sema-20.jpg"
      }
    ]
  },
  {
    "slug": "tirzepatide",
    "name": "Tirzepatide",
    "code": "TIRZE",
    "category": "metabolic",
    "tagline": "Lyophilisiertes Forschungsvial · Genf",
    "summary": "Tirzepatide ist als versiegeltes Forschungsvial gelistet. Nur für das Labor. Kein Arzneimittel und keine Dosierungsanleitung.",
    "overview": "Tirzepatide wird von Novion Biopharma als lyophilisierter Forschungsfeststoff geliefert. Das Etikett weist auf die reine Forschungsnutzung hin. Diese Seite gibt keine Anleitung zu Zubereitung, Dosis oder Anwendung am Menschen.",
    "purity": "> 99 % HPLC (Spezifikation)",
    "appearance": "Lyophilisierter Feststoff im versiegelten Vial",
    "storage": "2–8 °C. Vor Licht schützen. Nicht einfrieren.",
    "featured": true,
    "image": "/images/tirz-10.jpg",
    "variants": [
      {
        "id": "10",
        "label": "10 mg",
        "mg": 10,
        "price": 34,
        "sku": "NV-TIRZEPAT-10",
        "stock": 24,
        "image": "/images/tirz-10.jpg"
      },
      {
        "id": "20",
        "label": "20 mg",
        "mg": 20,
        "price": 59,
        "sku": "NV-TIRZEPAT-20",
        "stock": 24,
        "image": "/images/tirz-20.jpg"
      },
      {
        "id": "30",
        "label": "30 mg",
        "mg": 30,
        "price": 73,
        "sku": "NV-TIRZEPAT-30",
        "stock": 24,
        "image": "/images/tirz-30.jpg"
      },
      {
        "id": "50",
        "label": "50 mg",
        "mg": 50,
        "price": 117,
        "sku": "NV-TIRZEPAT-50",
        "stock": 24,
        "image": "/images/tirz-50.jpg"
      }
    ]
  },
  {
    "slug": "retatrutide",
    "name": "Retatrutide",
    "code": "RETAT",
    "category": "metabolic",
    "tagline": "Lyophilisiertes Forschungsvial · Genf",
    "summary": "Retatrutide ist als versiegeltes Forschungsvial gelistet. Nur für das Labor. Kein Arzneimittel und keine Dosierungsanleitung.",
    "overview": "Retatrutide wird von Novion Biopharma als lyophilisierter Forschungsfeststoff geliefert. Das Etikett weist auf die reine Forschungsnutzung hin. Diese Seite gibt keine Anleitung zu Zubereitung, Dosis oder Anwendung am Menschen.",
    "purity": "> 99 % HPLC (Spezifikation)",
    "appearance": "Lyophilisierter Feststoff im versiegelten Vial",
    "storage": "2–8 °C. Vor Licht schützen. Nicht einfrieren.",
    "featured": true,
    "image": "/images/reta-10.jpg",
    "variants": [
      {
        "id": "10",
        "label": "10 mg",
        "mg": 10,
        "price": 59,
        "sku": "NV-RETATRUT-10",
        "stock": 24,
        "image": "/images/reta-10.jpg"
      },
      {
        "id": "30",
        "label": "30 mg",
        "mg": 30,
        "price": 250,
        "sku": "NV-RETATRUT-30",
        "stock": 24,
        "image": "/images/reta-30.jpg"
      },
      {
        "id": "60",
        "label": "60 mg",
        "mg": 60,
        "price": 195,
        "sku": "NV-RETATRUT-60",
        "stock": 24,
        "image": "/images/reta-60.jpg"
      }
    ]
  },
  compound("bpc-157", "BPC-157", "BPC15", "recovery", "/images/bpc-10.jpg", [
    size("10", "10 mg", 10, 60, "NV-BPC157-10", "/images/bpc-10.jpg"),
    size("20", "20 mg", 20, 68, "NV-BPC157-20", "/images/bpc-20.jpg"),
  ]),
  compound("tb-500", "TB-500", "TB500", "recovery", "/images/tb-10.jpg", [
    size("10", "10 mg", 10, 60, "NV-TB500-10", "/images/tb-10.jpg"),
  ]),
  compound("bpc-157-tb-500", "BPC-157 + TB-500", "BPCTB", "recovery", "/images/bpc-tb-10.jpg", [
    size("5-5", "5 mg + 5 mg", 10, 68, "NV-BPCTB-10", "/images/bpc-tb-10.jpg"),
    size("10-10", "10 mg + 10 mg", 20, 93, "NV-BPCTB-20", "/images/bpc-tb-20.jpg"),
  ]),
  compound("ss-31", "SS-31", "SS31", "longevity", "/images/ss31-10.jpg", [
    size("10", "10 mg", 10, 78, "NV-SS31-10", "/images/ss31-10.jpg"),
  ]),
  compound("mots-c", "MOTS-c", "MOTSC", "longevity", "/images/mots-10.jpg", [
    size("10", "10 mg", 10, 54, "NV-MOTSC-10", "/images/mots-10.jpg"),
    size("40", "40 mg", 40, 95, "NV-MOTSC-40", "/images/mots-40.jpg"),
  ]),
  compound("aod9604", "AOD9604", "AOD96", "metabolic", "/images/aod-10.jpg", [
    size("10", "10 mg", 10, 98, "NV-AOD9604-10", "/images/aod-10.jpg"),
  ]),
  compound("igf-1-lr3", "IGF-1 LR3", "IGF1", "signaling", "/images/igf-1.jpg", [
    size("1", "1 mg", 1, 141, "NV-IGF1LR3-1", "/images/igf-1.jpg"),
  ]),
  compound("cjc-1295-no-dac", "CJC-1295 ohne DAC", "CJCND", "signaling", "/images/cjc-nodac-10.jpg", [
    size("10", "10 mg", 10, 117, "NV-CJCND-10", "/images/cjc-nodac-10.jpg"),
  ]),
  compound("cjc-1295-with-dac", "CJC-1295 mit DAC", "CJCD", "signaling", "/images/cjc-dac-5.jpg", [
    size("5", "5 mg", 5, 83, "NV-CJCDAC-5", "/images/cjc-dac-5.jpg"),
    size("10", "10 mg", 10, 195, "NV-CJCDAC-10", "/images/cjc-dac-10.jpg"),
  ]),
  compound("cjc-1295-ipa", "CJC-1295 ohne DAC + Ipamorelin", "CJIPA", "signaling", "/images/cjc-ipa-10.jpg", [
    size("5-5", "5 mg + 5 mg", 10, 93, "NV-CJCIPA-10", "/images/cjc-ipa-10.jpg"),
  ]),
  compound("mt-1", "MT-1", "MT1", "signaling", "/images/mt1-10.jpg", [
    size("10", "10 mg", 10, 34, "NV-MT1-10", "/images/mt1-10.jpg"),
  ]),
  compound("mt-2", "MT-2", "MT2", "signaling", "/images/mt2-10.jpg", [
    size("10", "10 mg", 10, 40, "NV-MT2-10", "/images/mt2-10.jpg"),
  ]),
  compound("epithalon", "Epithalon", "EPITH", "longevity", "/images/epithalon-10.jpg", [
    size("10", "10 mg", 10, 60, "NV-EPITH-10", "/images/epithalon-10.jpg"),
    size("50", "50 mg", 50, 107, "NV-EPITH-50", "/images/epithalon-50.jpg"),
  ]),
  compound("ghrp-2", "GHRP-2", "GHRP2", "signaling", "/images/ghrp2-10.jpg", [
    size("10", "10 mg", 10, 44, "NV-GHRP2-10", "/images/ghrp2-10.jpg"),
  ]),
  compound("ghrp-6", "GHRP-6", "GHRP6", "signaling", "/images/ghrp6-10.jpg", [
    size("10", "10 mg", 10, 49, "NV-GHRP6-10", "/images/ghrp6-10.jpg"),
  ]),
  compound("pt-141", "PT-141", "PT141", "signaling", "/images/pt141-10.jpg", [
    size("10", "10 mg", 10, 54, "NV-PT141-10", "/images/pt141-10.jpg"),
  ]),
];

function size(id: string, label: string, mg: number, price: number, sku: string, image: string): Variant {
  return { id, label, mg, price, sku, stock: 24, image };
}

function compound(slug: string, name: string, code: string, category: CategoryId, image: string, variants: Variant[]): Product {
  return {
    slug,
    name,
    code,
    category,
    tagline: "Lyophilisiertes Forschungsvial · Genf",
    summary: `${name} ist als versiegeltes Forschungsvial gelistet. Nur für das Labor. Kein Arzneimittel und keine Dosierungsanleitung.`,
    overview: `${name} wird von Novion Biopharma als lyophilisierter Forschungsfeststoff geliefert. Das Etikett weist auf die reine Forschungsnutzung hin. Diese Seite gibt keine Anleitung zu Zubereitung, Dosis oder Anwendung am Menschen.`,
    purity: "> 99 % HPLC (Spezifikation)",
    appearance: "Lyophilisierter Feststoff im versiegelten Vial",
    storage: "2–8 °C. Vor Licht schützen. Nicht einfrieren.",
    featured: true,
    image,
    variants,
  };
}

export const articles: Article[] = [
  {
    slug: "what-a-coa-reports",
    title: "Was ein Zertifikat tatsächlich ausweist",
    date: "12. März 2026",
    kicker: "Qualität",
    excerpt: "Eine Reinheitszahl ist eine Zeile. Identität und Methode stehen daneben.",
    body: [
      "Ein Vial-Etikett kann eine Zielreinheit nennen. Ein Zertifikat verbindet diese Zahl mit einer Methode, einer Charge und einem Identitätstest. Eine Prozentzahl allein sagt nicht, welcher Peak gemessen wurde und ob das Dokument zu dem Vial in der Hand gehört.",
      "Lesen Sie das Zertifikat in dieser Reihenfolge: Verbindungsname, Chargencode, Methode, Hauptpeak und Datum. Fehlt eine dieser Zeilen, ist die Seite ein Layout und kein fertiger Bericht.",
      "Novion führt die chromatographische Reinheit als Spezifikation. Die Karten auf der Laborseite sind Vorschauen mit Platzhalter-Chargen. Ein echtes Zertifikat hängt an einer Charge, sobald die Laborakte angebunden ist. Bis dahin gilt eine Vorschau nicht als ausgestellte Analyse.",
      "Der Shop zeigt keine ISO-, GMP-, FDA-, Swissmedic- oder anderen Zertifizierungszeichen. Ein Analysenzertifikat ist eine Chargenakte. Es ist keine Erlaubnis, den Stoff an Menschen oder Tieren anzuwenden.",
    ],
  },
  {
    slug: "cold-chain-lyophilized",
    title: "Warum trockene Vials trotzdem gekühlt reisen",
    date: "2. März 2026",
    kicker: "Versand",
    excerpt: "Lyophilisierte Feststoffe werden für einen kurzen, kühlen Transport gepackt.",
    body: [
      "Der Feststoff im Vial ist lyophilisiert. Er ist trocken und wird trotzdem für einen kurzen Transport im Bereich gepackt, der auf dem Karton steht: lagern bei 2–8 °C, nicht einfrieren.",
      "Die Kühlpackung folgt der angegebenen Lagerbedingung. Sie macht das Vial nicht flüssig. Der Aussenkarton ist schlicht. Die Innenpackung hält die Temperatur für das Transportfenster.",
      "Prüfen Sie bei Ankunft das Siegel, bevor Sie das Vial einbuchen. Eine gebrochene Kappe, ein nasses Etikett oder ein offen angekommener Karton ist ein Versandproblem. Schreiben Sie dem Desk mit Bestellnummer und Fotos, bevor Sie das Siegel öffnen.",
      "Diese Notizen beschreiben Packung und Lagerung eines Forschungsfeststoffs. Sie sind keine Zubereitungsanleitung und kein Anwendungsprotokoll.",
    ],
  },
  {
    slug: "reading-a-batch-number",
    title: "Zuerst die Chargennummer lesen",
    date: "18. Februar 2026",
    kicker: "Labor",
    excerpt: "Der Chargencode verbindet Vial, Karton und jedes Dokument, das beides beschreiben will.",
    body: [
      "Beginnen Sie mit der Chargennummer. Sie steht auf dem Vial und noch einmal auf dem Karton. Diese beiden Codes müssen übereinstimmen, bevor eine andere Zeile auf einem Dokument nützlich ist.",
      "Ein Zertifikat, ein Lieferschein und eine Katalogspezifikation können dieselbe Verbindung nennen und trotzdem verschiedene Abfüllungen beschreiben. Die Chargennummer macht sie zum selben Gegenstand. Weichen die Codes ab, gehört das Dokument nicht zu diesem Vial.",
      "Bewahren Sie den Chargencode in der Laborakte auf. Nennen Sie ihn, wenn Sie zu einer Sendung, einem Siegel oder einem Dokument schreiben. Der Desk kann eine Frage nicht allein über den Verbindungsnamen einer Abfüllung zuordnen.",
      "Die Vorschauen in diesem Katalog verwenden Platzhalter-Chargen. Sie zeigen, wo eine Chargenakte stehen wird. Sie sind keine Ergebnisse einer ausgestellten Analyse.",
    ],
  },
];

export const labBatches: LabBatch[] = products.slice(0, 8).map((product) => ({
  id: product.variants[0].sku,
  product: product.name,
  slug: product.slug,
  purity: "> 99%",
  method: "HPLC",
  date: "Specification",
  status: "Specification" as const,
}));

export const countries = [
  "Australia",
  "Austria",
  "Belgium",
  "Canada",
  "France",
  "Germany",
  "Ireland",
  "Italy",
  "Japan",
  "Netherlands",
  "New Zealand",
  "Norway",
  "Singapore",
  "South Africa",
  "Spain",
  "Sweden",
  "Switzerland",
  "United Arab Emirates",
  "United Kingdom",
  "United States",
  "Other",
];

export function categoryById(id: string) {
  return categories.find((category) => category.id === id) ?? categories[0];
}
export function getProduct(slug: string) {
  return products.find((product) => product.slug === slug);
}
export function getVariant(product: Product, id: string) {
  return product.variants.find((variant) => variant.id === id) ?? product.variants[0];
}
export function defaultVariant(product: Product) {
  return product.variants.find((variant) => variant.stock > 0) ?? product.variants[0];
}
export function minPrice(product: Product) {
  return Math.min(...product.variants.map((variant) => variant.price));
}
export function hasPriceRange(product: Product) {
  const prices = product.variants.map((variant) => variant.price);
  return Math.min(...prices) !== Math.max(...prices);
}
export function inStock(product: Product) {
  return product.variants.some((variant) => variant.stock > 0);
}
export function relatedProducts(product: Product) {
  return products.filter((item) => item.category === product.category && item.slug !== product.slug).slice(0, 3);
}
const articleAliases: Record<string, string> = {
  "what-a-certificate-reports": "what-a-coa-reports",
  "why-dry-vials-travel-cold": "cold-chain-lyophilized",
};

export function getArticle(slug: string) {
  const canonical = articleAliases[slug] ?? slug;
  return articles.find((article) => article.slug === canonical);
}

export const faqs = [
  { q: "Wie verfolge ich eine Bestellung?", a: "Melden Sie sich auf der Kontoseite mit der E-Mail an, die Sie an der Kasse verwendet haben. Die Bestellung bleibt auf Zahlung ausstehend, bis der Desk sie als bezahlt, dann gepackt und dann versendet markiert." },
  { q: "In welcher Währung stehen die Preise?", a: "Die Katalogpreise sind in Schweizer Franken. Die Zahlungsseite bestätigt den Betrag, bevor Sie zahlen." },
  { q: "Wer nimmt die Zahlung entgegen?", a: "Die Kasse führt auf die gesicherte Zahlungsseite. Karte und die dort angebotenen Wege werden dort abgewickelt." },
  { q: "Kann ich ein Vial zurückgeben?", a: "Sie können widerrufen, solange das Siegel ungeöffnet ist, und eine falsche oder beschädigte Sendung melden. Geöffnetes Forschungsmaterial wird nicht zurückgenommen. Die Schritte stehen unter Rückgabe." },
  { q: "Ist das für die Anwendung am Menschen?", a: "Nein. Jedes Vial ist nur für die Forschung gekennzeichnet. Der Shop gibt keine Zubereitungs- oder Dosierungsanleitung." },
  { q: "Sind die Vials zertifiziert?", a: "Die Seite zeigt keine ISO-, GMP-, FDA-, Swissmedic- oder anderen Zertifizierungszeichen. Eine Reinheitszeile ist eine Spezifikation, bis ein Laborbericht für diese Charge angebunden ist." },
];
