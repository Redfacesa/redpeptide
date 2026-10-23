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
    "name": "Metabolic",
    "blurb": "Incretin and fragment research",
    "tone": "#12315f"
  },
  {
    "id": "recovery",
    "name": "Recovery",
    "blurb": "Tissue-signaling sequences",
    "tone": "#12315f"
  },
  {
    "id": "cognitive",
    "name": "Cognitive",
    "blurb": "Nootropic peptide analogs",
    "tone": "#12315f"
  },
  {
    "id": "longevity",
    "name": "Longevity",
    "blurb": "Mitochondrial research solids",
    "tone": "#12315f"
  },
  {
    "id": "signaling",
    "name": "Signaling",
    "blurb": "Secretagogue and copper peptides",
    "tone": "#12315f"
  }
] as const;

export const products: Product[] = [
  {
    "slug": "semaglutide",
    "name": "Semaglutide",
    "code": "SEMAG",
    "category": "metabolic",
    "tagline": "Lyophilized research vial · Geneva",
    "summary": "Semaglutide is listed as a sealed research vial. Laboratory use only. Not a medicine and not a dosing protocol.",
    "overview": "Semaglutide is supplied by Novion Biopharma as a lyophilized research solid. The label states research use only, HPLC purity above 99% as a specification, and Swiss packing. This page does not give preparation, dose, or human-use instructions.",
    "purity": "> 99% HPLC (specification)",
    "appearance": "Lyophilized solid in a sealed vial",
    "storage": "2–8 °C. Protect from light. Do not freeze.",
    "featured": true,
    "image": "/images/sema-10.jpg",
    "variants": [
      {
        "id": "10",
        "label": "10 mg",
        "mg": 10,
        "price": 795,
        "sku": "NV-SEMAGLUT-10",
        "stock": 24,
        "image": "/images/sema-10.jpg"
      },
      {
        "id": "20",
        "label": "20 mg",
        "mg": 20,
        "price": 1195,
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
    "tagline": "Lyophilized research vial · Geneva",
    "summary": "Tirzepatide is listed as a sealed research vial. Laboratory use only. Not a medicine and not a dosing protocol.",
    "overview": "Tirzepatide is supplied by Novion Biopharma as a lyophilized research solid. The label states research use only, HPLC purity above 99% as a specification, and Swiss packing. This page does not give preparation, dose, or human-use instructions.",
    "purity": "> 99% HPLC (specification)",
    "appearance": "Lyophilized solid in a sealed vial",
    "storage": "2–8 °C. Protect from light. Do not freeze.",
    "featured": true,
    "image": "/images/tirz-10.jpg",
    "variants": [
      {
        "id": "10",
        "label": "10 mg",
        "mg": 10,
        "price": 695,
        "sku": "NV-TIRZEPAT-10",
        "stock": 24,
        "image": "/images/tirz-10.jpg"
      },
      {
        "id": "20",
        "label": "20 mg",
        "mg": 20,
        "price": 1195,
        "sku": "NV-TIRZEPAT-20",
        "stock": 24,
        "image": "/images/tirz-20.jpg"
      },
      {
        "id": "30",
        "label": "30 mg",
        "mg": 30,
        "price": 1495,
        "sku": "NV-TIRZEPAT-30",
        "stock": 24,
        "image": "/images/tirz-30.jpg"
      },
      {
        "id": "50",
        "label": "50 mg",
        "mg": 50,
        "price": 2390,
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
    "tagline": "Lyophilized research vial · Geneva",
    "summary": "Retatrutide is listed as a sealed research vial. Laboratory use only. Not a medicine and not a dosing protocol.",
    "overview": "Retatrutide is supplied by Novion Biopharma as a lyophilized research solid. The label states research use only, HPLC purity above 99% as a specification, and Swiss packing. This page does not give preparation, dose, or human-use instructions.",
    "purity": "> 99% HPLC (specification)",
    "appearance": "Lyophilized solid in a sealed vial",
    "storage": "2–8 °C. Protect from light. Do not freeze.",
    "featured": true,
    "image": "/images/reta-10.jpg",
    "variants": [
      {
        "id": "10",
        "label": "10 mg",
        "mg": 10,
        "price": 1195,
        "sku": "NV-RETATRUT-10",
        "stock": 24,
        "image": "/images/reta-10.jpg"
      },
      {
        "id": "30",
        "label": "30 mg",
        "mg": 30,
        "price": 1990,
        "sku": "NV-RETATRUT-30",
        "stock": 24,
        "image": "/images/reta-30.jpg"
      },
      {
        "id": "60",
        "label": "60 mg",
        "mg": 60,
        "price": 3980,
        "sku": "NV-RETATRUT-60",
        "stock": 24,
        "image": "/images/reta-60.jpg"
      }
    ]
  }
];

export const articles: Article[] = [
  {
    slug: "what-a-coa-reports",
    title: "What a certificate actually reports",
    date: "12 March 2026",
    kicker: "Quality",
    excerpt: "A purity percentage is one line. Identity and method sit beside it.",
    body: [
      "A vial label can state a target purity. A certificate is the record that ties that figure to one method, one lot, and one identity test. A percentage on its own does not say which peak was measured, or whether the document belongs to the vial in your hand.",
      "Read the certificate in this order: the compound name, the lot code, the method, the main-peak result, and the date. If any of those lines is missing, the page is a layout, not a finished report.",
      "Novion lists chromatographic purity as a specification. The cards on the lab page are previews with placeholder lot numbers. A live certificate is attached to a lot only when that laboratory file is connected. Until then, the catalog does not treat a preview as an issued analysis.",
      "The shop does not display ISO, GMP, FDA, Swissmedic, or other certification marks. A certificate of analysis is a lot record. It is not a license to use the material in people or animals.",
    ],
  },
  {
    slug: "cold-chain-lyophilized",
    title: "Why dry vials still travel cold",
    date: "2 March 2026",
    kicker: "Dispatch",
    excerpt: "Lyophilized solids are still packed for a short, cold transit.",
    body: [
      "The solid in the vial is lyophilized. It is dry, and it is still packed for a short transit in the range printed on the carton: store at 2–8 °C, and do not freeze.",
      "Cold packing is about the labeled storage condition, not about turning the vial into a liquid. The outer carton is plain. The inner pack is what holds the temperature for the transit window.",
      "On arrival, check the seal before you log the vial. A cracked cap, a wet label, or a carton that arrived open is a shipping problem. Write to the desk with the order number and photographs before you break the seal.",
      "These notes describe how a research solid is packed and stored. They are not preparation instructions, and they are not a protocol for use.",
    ],
  },
  {
    slug: "reading-a-batch-number",
    title: "Read the batch number first",
    date: "18 February 2026",
    kicker: "Laboratory",
    excerpt: "The lot code is the join between the vial, the carton, and any record that claims to describe them.",
    body: [
      "Start with the batch number. It is printed on the vial and repeated on the carton. Those two codes have to match before any other line on a document is useful.",
      "A certificate, a packing note, and a catalog specification can all name the same compound and still describe different fills. The batch number is what makes them the same object. If the codes differ, the document does not belong to that vial.",
      "Keep the lot code with your laboratory record. Quote it if you write about a shipment, a seal, or a document. The desk cannot match a question to a fill from a compound name alone.",
      "The previews in this catalog use placeholder lot numbers. They show where a batch record will sit. They are not results from an issued analysis.",
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
  { q: "How do I track an order?", a: "Sign in on the account page with the email you used at checkout. The order shows pending payment until the desk marks it paid, then packed, then shipped." },
  { q: "Which currency do I see?", a: "The catalog shows a price in the currency for the country where you open it. The secure payment page confirms the amount before you pay." },
  { q: "Who takes payment?", a: "Checkout continues on the secure payment page. Card and supported local methods are handled there." },
  { q: "Can I return a vial?", a: "You can withdraw before you unseal the vial, and you can report a wrong or damaged shipment. Opened research material is not taken back. Read Returns for the steps." },
  { q: "Is this for human use?", a: "No. Every vial is labeled research use only. The shop does not provide preparation or dosing instructions." },
  { q: "Are the vials certified?", a: "The site does not display ISO, GMP, FDA, Swissmedic, or other certification marks. A purity line is a specification until a laboratory report for that lot is attached." },
];
