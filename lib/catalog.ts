export type CategoryId =
  | "recovery"
  | "metabolic"
  | "cognitive"
  | "longevity"
  | "signaling";

export type Variant = {
  id: string;
  label: string;
  mg: number;
  price: number;
  sku: string;
  stock: number;
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
  status: "Preview";
};

export const categories: {
  id: CategoryId;
  name: string;
  blurb: string;
  tone: string;
}[] = [
  {
    id: "recovery",
    name: "Recovery",
    blurb: "Tissue-signaling sequences",
    tone: "#9e2432",
  },
  {
    id: "metabolic",
    name: "Metabolic",
    blurb: "Mitochondrial and fragment research",
    tone: "#b56a2b",
  },
  {
    id: "cognitive",
    name: "Cognitive",
    blurb: "Nootropic peptide analogs",
    tone: "#2f4d73",
  },
  {
    id: "longevity",
    name: "Longevity",
    blurb: "Mitochondrial and telomere models",
    tone: "#1f6b56",
  },
  {
    id: "signaling",
    name: "Signaling",
    blurb: "Secretagogue and copper peptides",
    tone: "#6a4578",
  },
];

export const products: Product[] = [
  {
    slug: "bpc-157",
    name: "BPC-157",
    code: "BPC",
    category: "recovery",
    tagline: "Pentadecapeptide · lyophilized",
    summary:
      "Synthetic body-protection compound supplied as a dry solid for identity and signaling research.",
    overview:
      "BPC-157 is a 15-residue synthetic peptide used in laboratory studies of tissue signaling. RedPeptide lists it as a lyophilized research solid with a published sequence class of GEPPPGKPADDAGLV. This catalog entry is not a protocol for human or veterinary use.",
    purity: "≥ 99% HPLC (specification)",
    appearance: "White to off-white lyophilized powder",
    storage: "−20 °C, dry, protected from light",
    featured: true,
    badge: "Core",
    variants: [
      { id: "5", label: "5 mg", mg: 5, price: 42, sku: "RP-BPC-05", stock: 48 },
      { id: "10", label: "10 mg", mg: 10, price: 68, sku: "RP-BPC-10", stock: 32 },
    ],
  },
  {
    slug: "tb-500",
    name: "TB-500",
    code: "TB5",
    category: "recovery",
    tagline: "Thymosin β4 fragment · lyophilized",
    summary:
      "Research fragment supplied for actin-binding and cell-migration assays.",
    overview:
      "TB-500 refers to a synthetic fragment studied alongside thymosin β4 in cell-migration models. Vials contain lyophilized peptide only. Solvent is not included. For laboratory research.",
    purity: "≥ 99% HPLC (specification)",
    appearance: "White lyophilized cake",
    storage: "−20 °C, dry, protected from light",
    featured: true,
    variants: [
      { id: "5", label: "5 mg", mg: 5, price: 48, sku: "RP-TB5-05", stock: 22 },
      { id: "10", label: "10 mg", mg: 10, price: 79, sku: "RP-TB5-10", stock: 14 },
    ],
  },
  {
    slug: "kpv",
    name: "KPV",
    code: "KPV",
    category: "recovery",
    tagline: "Lys-Pro-Val tripeptide · lyophilized",
    summary:
      "C-terminal α-MSH tripeptide for in-vitro inflammatory-signaling work.",
    overview:
      "KPV is the Lys-Pro-Val tripeptide corresponding to the C-terminus of α-MSH. It is offered as a research solid for receptor and cytokine assays, not as a finished preparation.",
    purity: "≥ 98% HPLC (specification)",
    appearance: "White crystalline lyophilizate",
    storage: "−20 °C, dry, protected from light",
    variants: [
      { id: "10", label: "10 mg", mg: 10, price: 54, sku: "RP-KPV-10", stock: 18 },
    ],
  },
  {
    slug: "ara-290",
    name: "ARA-290",
    code: "ARA",
    category: "recovery",
    tagline: "Innate repair receptor peptide · lyophilized",
    summary:
      "Pyroglutamate helix-B peptide used in innate-repair receptor research.",
    overview:
      "ARA-290 is an 11-residue peptide derived from the helix-B surface of erythropoietin and studied at the innate repair receptor. Supplied lyophilized for analytical and in-vitro use.",
    purity: "≥ 99% HPLC (specification)",
    appearance: "White lyophilized powder",
    storage: "−20 °C, dry, protected from light",
    badge: "New",
    variants: [
      { id: "10", label: "10 mg", mg: 10, price: 64, sku: "RP-ARA-10", stock: 11 },
    ],
  },
  {
    slug: "ghk-cu",
    name: "GHK-Cu",
    code: "GHK",
    category: "signaling",
    tagline: "Copper tripeptide · lyophilized",
    summary:
      "Glycyl-L-histidyl-L-lysine copper complex for extracellular-matrix research.",
    overview:
      "GHK-Cu is the copper complex of the human tripeptide GHK, widely used in skin and matrix models. The vial contains the lyophilized complex only.",
    purity: "≥ 98% HPLC (specification)",
    appearance: "Blue to violet lyophilized powder",
    storage: "−20 °C, dry, protected from light",
    featured: true,
    variants: [
      { id: "50", label: "50 mg", mg: 50, price: 36, sku: "RP-GHK-50", stock: 40 },
      { id: "100", label: "100 mg", mg: 100, price: 58, sku: "RP-GHK-100", stock: 26 },
    ],
  },
  {
    slug: "ipamorelin",
    name: "Ipamorelin",
    code: "IPA",
    category: "signaling",
    tagline: "Pentapeptide secretagogue · lyophilized",
    summary:
      "Selective ghrelin-receptor peptide for secretagogue assays.",
    overview:
      "Ipamorelin is a pentapeptide growth-hormone secretagogue used in receptor research. It is sold as a dry research compound with no diluent and no administration guidance.",
    purity: "≥ 99% HPLC (specification)",
    appearance: "White lyophilized powder",
    storage: "−20 °C, dry, protected from light",
    variants: [
      { id: "5", label: "5 mg", mg: 5, price: 39, sku: "RP-IPA-05", stock: 27 },
      { id: "10", label: "10 mg", mg: 10, price: 64, sku: "RP-IPA-10", stock: 16 },
    ],
  },
  {
    slug: "cjc-1295",
    name: "CJC-1295",
    code: "CJC",
    category: "signaling",
    tagline: "No DAC · lyophilized",
    summary:
      "Modified GHRH fragment (without DAC) for receptor-binding studies.",
    overview:
      "This listing is the modified GRF 1-29 analog without drug-affinity complex. It is provided as a lyophilized solid for laboratory characterization.",
    purity: "≥ 99% HPLC (specification)",
    appearance: "White lyophilized cake",
    storage: "−20 °C, dry, protected from light",
    variants: [
      { id: "5", label: "5 mg", mg: 5, price: 45, sku: "RP-CJC-05", stock: 19 },
    ],
  },
  {
    slug: "semax",
    name: "Semax",
    code: "SMX",
    category: "cognitive",
    tagline: "ACTH(4-7) analog · lyophilized",
    summary:
      "Heptapeptide analog studied in cognitive and neurotrophic models.",
    overview:
      "Semax is a synthetic ACTH(4-7) analog with a Pro-Gly-Pro tail, used in neuroscience research. RedPeptide supplies the lyophilized peptide for laboratory work only.",
    purity: "≥ 99% HPLC (specification)",
    appearance: "White lyophilized powder",
    storage: "−20 °C, dry, protected from light",
    featured: true,
    badge: "New",
    variants: [
      { id: "10", label: "10 mg", mg: 10, price: 46, sku: "RP-SMX-10", stock: 21 },
    ],
  },
  {
    slug: "selank",
    name: "Selank",
    code: "SLK",
    category: "cognitive",
    tagline: "Tuftsin analog · lyophilized",
    summary:
      "Heptapeptide tuftsin analog for neuroimmune research models.",
    overview:
      "Selank is a synthetic tuftsin analog (Thr-Lys-Pro-Arg-Pro-Gly-Pro) studied in anxiety and immune-signaling models. Catalog material is lyophilized peptide, research use only.",
    purity: "≥ 99% HPLC (specification)",
    appearance: "White lyophilized powder",
    storage: "−20 °C, dry, protected from light",
    variants: [
      { id: "10", label: "10 mg", mg: 10, price: 46, sku: "RP-SLK-10", stock: 17 },
    ],
  },
  {
    slug: "mots-c",
    name: "MOTS-c",
    code: "MOT",
    category: "metabolic",
    tagline: "Mitochondrial ORF peptide · lyophilized",
    summary:
      "Mitochondrial-derived peptide for metabolic-pathway research.",
    overview:
      "MOTS-c is a 16-residue peptide encoded in the mitochondrial 12S rRNA and studied in metabolic regulation models. Offered here as a high-purity lyophilized solid.",
    purity: "≥ 99% HPLC (specification)",
    appearance: "White lyophilized powder",
    storage: "−20 °C, dry, protected from light",
    featured: true,
    badge: "New",
    variants: [
      { id: "10", label: "10 mg", mg: 10, price: 72, sku: "RP-MOT-10", stock: 15 },
      { id: "40", label: "40 mg", mg: 40, price: 198, sku: "RP-MOT-40", stock: 6 },
    ],
  },
  {
    slug: "aod-9604",
    name: "AOD-9604",
    code: "AOD",
    category: "metabolic",
    tagline: "hGH fragment 176–191 · lyophilized",
    summary:
      "C-terminal growth-hormone fragment for lipid-metabolism assays.",
    overview:
      "AOD-9604 corresponds to the modified hGH 176–191 fragment used in adipocyte research. Supplied as a lyophilized research peptide.",
    purity: "≥ 98% HPLC (specification)",
    appearance: "White lyophilized powder",
    storage: "−20 °C, dry, protected from light",
    variants: [
      { id: "5", label: "5 mg", mg: 5, price: 52, sku: "RP-AOD-05", stock: 4 },
    ],
  },
  {
    slug: "epitalon",
    name: "Epitalon",
    code: "EPT",
    category: "longevity",
    tagline: "Ala-Glu-Asp-Gly · lyophilized",
    summary:
      "Synthetic tetrapeptide used in telomerase and pineal research models.",
    overview:
      "Epitalon (epithalon) is the tetrapeptide Ala-Glu-Asp-Gly. It is listed for laboratory studies. No usage protocol is provided with the vial.",
    purity: "≥ 99% HPLC (specification)",
    appearance: "White lyophilized powder",
    storage: "−20 °C, dry, protected from light",
    featured: true,
    variants: [
      { id: "10", label: "10 mg", mg: 10, price: 44, sku: "RP-EPT-10", stock: 30 },
      { id: "50", label: "50 mg", mg: 50, price: 128, sku: "RP-EPT-50", stock: 9 },
    ],
  },
  {
    slug: "ss-31",
    name: "SS-31",
    code: "SS31",
    category: "longevity",
    tagline: "Elamipretide · lyophilized",
    summary:
      "Mitochondria-targeted tetrapeptide for bioenergetic research.",
    overview:
      "SS-31 (elamipretide) is a synthetic tetrapeptide that concentrates in the inner mitochondrial membrane in experimental models. The 20 mg size in this sample catalog is shown as unavailable.",
    purity: "≥ 99% HPLC (specification)",
    appearance: "White to pale yellow lyophilizate",
    storage: "−20 °C, dry, protected from light",
    variants: [
      { id: "10", label: "10 mg", mg: 10, price: 96, sku: "RP-SS31-10", stock: 8 },
      { id: "20", label: "20 mg", mg: 20, price: 164, sku: "RP-SS31-20", stock: 0 },
    ],
  },
];

export const articles: Article[] = [
  {
    slug: "what-a-coa-reports",
    title: "What a peptide certificate of analysis actually reports",
    date: "12 March 2026",
    kicker: "Quality",
    excerpt:
      "A purity percentage is one line on a chromatogram. Identity, counter-ion, and the method behind the number matter just as much.",
    body: [
      "A certificate of analysis is a batch record, not a marketing badge. For a research peptide it should tie a lot number to an identity test and a purity method — typically reverse-phase HPLC, sometimes with mass confirmation.",
      "“99%” describes the main peak under a stated method. It does not, by itself, describe residual solvents, water content, counter-ion, or whether the sequence is the one printed on the label. Those are separate lines.",
      "On this sample store, certificate cards are previews. When production batches go live, each vial lot will point at its own document instead of a shared illustration.",
    ],
  },
  {
    slug: "cold-chain-lyophilized",
    title: "Why lyophilized vials still travel cold",
    date: "2 March 2026",
    kicker: "Dispatch",
    excerpt:
      "A dry cake is more stable than a solution, and it still prefers a short, cold trip from bench to bench.",
    body: [
      "Lyophilization removes water so the peptide can be stored as a solid. That solid is more stable than a reconstituted solution, which is why research suppliers ship dry vials rather than ready liquids.",
      "Stability is not the same as indifference. Heat and humidity still accelerate degradation, so a serious dispatch uses insulated packaging and a short transit window, then asks the lab to return the vial to −20 °C.",
      "RedPeptide’s sample checkout shows that promise as a shipping choice. Live labels, couriers, and cut-off times will be connected later.",
    ],
  },
  {
    slug: "reading-a-batch-number",
    title: "How to read a batch number before you open the vial",
    date: "18 February 2026",
    kicker: "Laboratory",
    excerpt:
      "The lot code is the join between the label in your hand and the chromatogram in the archive.",
    body: [
      "Match the lot code on the vial to the lot code on the certificate before the seal is broken. If they differ, the document is not evidence for that container.",
      "A useful code is unique, dated, and stored with the chromatogram, the fill weight, and the appearance check. Pretty labels without that join are not a quality system.",
      "The lab-report page in this prototype uses fictional lot numbers so the layout can be reviewed. They are not live analytical results.",
    ],
  },
];

export const labBatches: LabBatch[] = [
  { id: "RP26-0142", product: "BPC-157 10 mg", slug: "bpc-157", purity: "99.3%", method: "RP-HPLC", date: "04 Mar 2026", status: "Preview" },
  { id: "RP26-0155", product: "TB-500 5 mg", slug: "tb-500", purity: "99.1%", method: "RP-HPLC", date: "06 Mar 2026", status: "Preview" },
  { id: "RP26-0160", product: "GHK-Cu 50 mg", slug: "ghk-cu", purity: "98.7%", method: "RP-HPLC", date: "08 Mar 2026", status: "Preview" },
  { id: "RP26-0174", product: "Semax 10 mg", slug: "semax", purity: "99.4%", method: "RP-HPLC + MS", date: "11 Mar 2026", status: "Preview" },
  { id: "RP26-0188", product: "MOTS-c 10 mg", slug: "mots-c", purity: "99.0%", method: "RP-HPLC", date: "14 Mar 2026", status: "Preview" },
  { id: "RP26-0192", product: "Epitalon 10 mg", slug: "epitalon", purity: "99.2%", method: "RP-HPLC", date: "16 Mar 2026", status: "Preview" },
];

export const faqs = [
  {
    q: "Who can order?",
    a: "This catalog is for adults (18+) purchasing materials for laboratory research. It is not a pharmacy and it does not supply medicines, dosing guidance, or products for human or veterinary administration.",
  },
  {
    q: "Is checkout live?",
    a: "Not yet. The sample checkout checks the form, applies shipping, and stores the order in this browser. Payment, stock reservation, and email confirmation will be connected later.",
  },
  {
    q: "Where do you ship?",
    a: "The sample store lists the European Union, Switzerland, and the United Kingdom. Transit times on the checkout page are placeholders until a courier account is attached.",
  },
  {
    q: "What is included in a vial?",
    a: "Lyophilized peptide only. Diluent, syringes, and reconstitution instructions are not part of the product. The calculator on this site is a mass-over-volume worksheet for the bench, not a use protocol.",
  },
  {
    q: "Are the certificates real?",
    a: "The report cards are layout previews with fictional lot numbers. Live, batch-specific certificates will replace them before any real sale.",
  },
  {
    q: "How do returns work?",
    a: "Sealed research vials with an intact lot match can be reviewed for replacement if the shipment arrives damaged or the lot does not match its certificate. Opened vials are not restocked. This policy is a draft for the sample store.",
  },
];

export function categoryById(id: CategoryId) {
  return categories.find((category) => category.id === id)!;
}

export function getProduct(slug: string) {
  return products.find((product) => product.slug === slug);
}

export function getVariant(product: Product, variantId: string) {
  return product.variants.find((variant) => variant.id === variantId);
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

export function defaultVariant(product: Product) {
  return product.variants.find((variant) => variant.stock > 0) ?? product.variants[0];
}

export function relatedProducts(product: Product) {
  return products
    .filter((item) => item.category === product.category && item.slug !== product.slug)
    .slice(0, 3);
}

export function getArticle(slug: string) {
  return articles.find((article) => article.slug === slug);
}

export const countries = [
  "Germany",
  "Austria",
  "Switzerland",
  "France",
  "Netherlands",
  "Belgium",
  "Italy",
  "Spain",
  "United Kingdom",
  "Other EU",
];
