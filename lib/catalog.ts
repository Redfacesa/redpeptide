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
      },
      {
        "id": "30",
        "label": "30 mg",
        "mg": 30,
        "price": 1595,
        "sku": "NV-SEMAGLUT-30",
        "stock": 24,
        "image": "/images/research-vial.svg"
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
      },
      {
        "id": "100",
        "label": "100 mg",
        "mg": 100,
        "price": 3785,
        "sku": "NV-TIRZEPAT-100",
        "stock": 24,
        "image": "/images/research-vial.svg"
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
  },
  {
    "slug": "bpc-157",
    "name": "BPC-157",
    "code": "BPC15",
    "category": "recovery",
    "tagline": "Lyophilized research vial · Geneva",
    "summary": "BPC-157 is listed as a sealed research vial. Laboratory use only. Not a medicine and not a dosing protocol.",
    "overview": "BPC-157 is supplied by Novion Biopharma as a lyophilized research solid. The label states research use only, HPLC purity above 99% as a specification, and Swiss packing. This page does not give preparation, dose, or human-use instructions.",
    "purity": "> 99% HPLC (specification)",
    "appearance": "Lyophilized solid in a sealed vial",
    "storage": "2–8 °C. Protect from light. Do not freeze.",
    "featured": true,
    "image": "/images/research-vial.svg",
    "variants": [
      {
        "id": "10",
        "label": "10 mg",
        "mg": 10,
        "price": 795,
        "sku": "NV-BPC157-10",
        "stock": 24,
        "image": "/images/research-vial.svg"
      },
      {
        "id": "20",
        "label": "20 mg",
        "mg": 20,
        "price": 1395,
        "sku": "NV-BPC157-20",
        "stock": 24,
        "image": "/images/research-vial.svg"
      }
    ]
  },
  {
    "slug": "tb-500",
    "name": "TB-500",
    "code": "TB500",
    "category": "recovery",
    "tagline": "Lyophilized research vial · Geneva",
    "summary": "TB-500 is listed as a sealed research vial. Laboratory use only. Not a medicine and not a dosing protocol.",
    "overview": "TB-500 is supplied by Novion Biopharma as a lyophilized research solid. The label states research use only, HPLC purity above 99% as a specification, and Swiss packing. This page does not give preparation, dose, or human-use instructions.",
    "purity": "> 99% HPLC (specification)",
    "appearance": "Lyophilized solid in a sealed vial",
    "storage": "2–8 °C. Protect from light. Do not freeze.",
    "featured": false,
    "image": "/images/research-vial.svg",
    "variants": [
      {
        "id": "10",
        "label": "10 mg",
        "mg": 10,
        "price": 2190,
        "sku": "NV-TB500-10",
        "stock": 24,
        "image": "/images/research-vial.svg"
      }
    ]
  },
  {
    "slug": "bpc-157-5-mg-tb-500-5-mg",
    "name": "BPC-157 5 mg + TB-500 5 mg",
    "code": "BPC15",
    "category": "recovery",
    "tagline": "Lyophilized research vial · Geneva",
    "summary": "BPC-157 5 mg + TB-500 5 mg is listed as a sealed research vial. Laboratory use only. Not a medicine and not a dosing protocol.",
    "overview": "BPC-157 5 mg + TB-500 5 mg is supplied by Novion Biopharma as a lyophilized research solid. The label states research use only, HPLC purity above 99% as a specification, and Swiss packing. This page does not give preparation, dose, or human-use instructions.",
    "purity": "> 99% HPLC (specification)",
    "appearance": "Lyophilized solid in a sealed vial",
    "storage": "2–8 °C. Protect from light. Do not freeze.",
    "featured": false,
    "image": "/images/research-vial.svg",
    "variants": [
      {
        "id": "10",
        "label": "10 mg",
        "mg": 10,
        "price": 1395,
        "sku": "NV-BPC1575M-10",
        "stock": 24,
        "image": "/images/research-vial.svg"
      }
    ]
  },
  {
    "slug": "bpc-157-10-mg-tb-500-10-mg",
    "name": "BPC-157 10 mg + TB-500 10 mg",
    "code": "BPC15",
    "category": "recovery",
    "tagline": "Lyophilized research vial · Geneva",
    "summary": "BPC-157 10 mg + TB-500 10 mg is listed as a sealed research vial. Laboratory use only. Not a medicine and not a dosing protocol.",
    "overview": "BPC-157 10 mg + TB-500 10 mg is supplied by Novion Biopharma as a lyophilized research solid. The label states research use only, HPLC purity above 99% as a specification, and Swiss packing. This page does not give preparation, dose, or human-use instructions.",
    "purity": "> 99% HPLC (specification)",
    "appearance": "Lyophilized solid in a sealed vial",
    "storage": "2–8 °C. Protect from light. Do not freeze.",
    "featured": false,
    "image": "/images/research-vial.svg",
    "variants": [
      {
        "id": "20",
        "label": "20 mg",
        "mg": 20,
        "price": 1890,
        "sku": "NV-BPC15710-20",
        "stock": 24,
        "image": "/images/research-vial.svg"
      }
    ]
  },
  {
    "slug": "ss-31",
    "name": "SS-31",
    "code": "SS31-",
    "category": "longevity",
    "tagline": "Lyophilized research vial · Geneva",
    "summary": "SS-31 is listed as a sealed research vial. Laboratory use only. Not a medicine and not a dosing protocol.",
    "overview": "SS-31 is supplied by Novion Biopharma as a lyophilized research solid. The label states research use only, HPLC purity above 99% as a specification, and Swiss packing. This page does not give preparation, dose, or human-use instructions.",
    "purity": "> 99% HPLC (specification)",
    "appearance": "Lyophilized solid in a sealed vial",
    "storage": "2–8 °C. Protect from light. Do not freeze.",
    "featured": false,
    "image": "/images/research-vial.svg",
    "variants": [
      {
        "id": "10",
        "label": "10 mg",
        "mg": 10,
        "price": 1595,
        "sku": "NV-SS31-10",
        "stock": 24,
        "image": "/images/research-vial.svg"
      },
      {
        "id": "50",
        "label": "50 mg",
        "mg": 50,
        "price": 3980,
        "sku": "NV-SS31-50",
        "stock": 24,
        "image": "/images/research-vial.svg"
      }
    ]
  },
  {
    "slug": "cjc-1295-no-dac",
    "name": "CJC-1295 no DAC",
    "code": "CJC12",
    "category": "signaling",
    "tagline": "Lyophilized research vial · Geneva",
    "summary": "CJC-1295 no DAC is listed as a sealed research vial. Laboratory use only. Not a medicine and not a dosing protocol.",
    "overview": "CJC-1295 no DAC is supplied by Novion Biopharma as a lyophilized research solid. The label states research use only, HPLC purity above 99% as a specification, and Swiss packing. This page does not give preparation, dose, or human-use instructions.",
    "purity": "> 99% HPLC (specification)",
    "appearance": "Lyophilized solid in a sealed vial",
    "storage": "2–8 °C. Protect from light. Do not freeze.",
    "featured": false,
    "image": "/images/research-vial.svg",
    "variants": [
      {
        "id": "10",
        "label": "10 mg",
        "mg": 10,
        "price": 2390,
        "sku": "NV-CJC1295N-10",
        "stock": 24,
        "image": "/images/research-vial.svg"
      }
    ]
  },
  {
    "slug": "cjc-1295-no-dac-5-mg-ipamorelin-5-mg",
    "name": "CJC-1295 no DAC 5 mg + Ipamorelin 5 mg",
    "code": "CJC12",
    "category": "signaling",
    "tagline": "Lyophilized research vial · Geneva",
    "summary": "CJC-1295 no DAC 5 mg + Ipamorelin 5 mg is listed as a sealed research vial. Laboratory use only. Not a medicine and not a dosing protocol.",
    "overview": "CJC-1295 no DAC 5 mg + Ipamorelin 5 mg is supplied by Novion Biopharma as a lyophilized research solid. The label states research use only, HPLC purity above 99% as a specification, and Swiss packing. This page does not give preparation, dose, or human-use instructions.",
    "purity": "> 99% HPLC (specification)",
    "appearance": "Lyophilized solid in a sealed vial",
    "storage": "2–8 °C. Protect from light. Do not freeze.",
    "featured": false,
    "image": "/images/research-vial.svg",
    "variants": [
      {
        "id": "10",
        "label": "10 mg",
        "mg": 10,
        "price": 1890,
        "sku": "NV-CJC1295N-10",
        "stock": 24,
        "image": "/images/research-vial.svg"
      }
    ]
  },
  {
    "slug": "cjc-1295-with-dac",
    "name": "CJC-1295 with DAC",
    "code": "CJC12",
    "category": "signaling",
    "tagline": "Lyophilized research vial · Geneva",
    "summary": "CJC-1295 with DAC is listed as a sealed research vial. Laboratory use only. Not a medicine and not a dosing protocol.",
    "overview": "CJC-1295 with DAC is supplied by Novion Biopharma as a lyophilized research solid. The label states research use only, HPLC purity above 99% as a specification, and Swiss packing. This page does not give preparation, dose, or human-use instructions.",
    "purity": "> 99% HPLC (specification)",
    "appearance": "Lyophilized solid in a sealed vial",
    "storage": "2–8 °C. Protect from light. Do not freeze.",
    "featured": false,
    "image": "/images/research-vial.svg",
    "variants": [
      {
        "id": "5",
        "label": "5 mg",
        "mg": 5,
        "price": 1690,
        "sku": "NV-CJC1295W-5",
        "stock": 24,
        "image": "/images/research-vial.svg"
      },
      {
        "id": "10",
        "label": "10 mg",
        "mg": 10,
        "price": 3980,
        "sku": "NV-CJC1295W-10",
        "stock": 24,
        "image": "/images/research-vial.svg"
      }
    ]
  },
  {
    "slug": "aod9604",
    "name": "AOD9604",
    "code": "AOD96",
    "category": "metabolic",
    "tagline": "Lyophilized research vial · Geneva",
    "summary": "AOD9604 is listed as a sealed research vial. Laboratory use only. Not a medicine and not a dosing protocol.",
    "overview": "AOD9604 is supplied by Novion Biopharma as a lyophilized research solid. The label states research use only, HPLC purity above 99% as a specification, and Swiss packing. This page does not give preparation, dose, or human-use instructions.",
    "purity": "> 99% HPLC (specification)",
    "appearance": "Lyophilized solid in a sealed vial",
    "storage": "2–8 °C. Protect from light. Do not freeze.",
    "featured": false,
    "image": "/images/research-vial.svg",
    "variants": [
      {
        "id": "10",
        "label": "10 mg",
        "mg": 10,
        "price": 1990,
        "sku": "NV-AOD9604-10",
        "stock": 24,
        "image": "/images/research-vial.svg"
      }
    ]
  },
  {
    "slug": "igf-1-lr3",
    "name": "IGF-1 LR3",
    "code": "IGF1L",
    "category": "signaling",
    "tagline": "Lyophilized research vial · Geneva",
    "summary": "IGF-1 LR3 is listed as a sealed research vial. Laboratory use only. Not a medicine and not a dosing protocol.",
    "overview": "IGF-1 LR3 is supplied by Novion Biopharma as a lyophilized research solid. The label states research use only, HPLC purity above 99% as a specification, and Swiss packing. This page does not give preparation, dose, or human-use instructions.",
    "purity": "> 99% HPLC (specification)",
    "appearance": "Lyophilized solid in a sealed vial",
    "storage": "2–8 °C. Protect from light. Do not freeze.",
    "featured": false,
    "image": "/images/research-vial.svg",
    "variants": [
      {
        "id": "1",
        "label": "1 mg",
        "mg": 1,
        "price": 2885,
        "sku": "NV-IGF1LR3-1",
        "stock": 24,
        "image": "/images/research-vial.svg"
      }
    ]
  },
  {
    "slug": "mots-c",
    "name": "MOTS-c",
    "code": "MOTSC",
    "category": "longevity",
    "tagline": "Lyophilized research vial · Geneva",
    "summary": "MOTS-c is listed as a sealed research vial. Laboratory use only. Not a medicine and not a dosing protocol.",
    "overview": "MOTS-c is supplied by Novion Biopharma as a lyophilized research solid. The label states research use only, HPLC purity above 99% as a specification, and Swiss packing. This page does not give preparation, dose, or human-use instructions.",
    "purity": "> 99% HPLC (specification)",
    "appearance": "Lyophilized solid in a sealed vial",
    "storage": "2–8 °C. Protect from light. Do not freeze.",
    "featured": true,
    "image": "/images/research-vial.svg",
    "variants": [
      {
        "id": "10",
        "label": "10 mg",
        "mg": 10,
        "price": 1095,
        "sku": "NV-MOTSC-10",
        "stock": 24,
        "image": "/images/research-vial.svg"
      },
      {
        "id": "40",
        "label": "40 mg",
        "mg": 40,
        "price": 2785,
        "sku": "NV-MOTSC-40",
        "stock": 24,
        "image": "/images/research-vial.svg"
      }
    ]
  },
  {
    "slug": "mt-1",
    "name": "MT-1",
    "code": "MT1-1",
    "category": "signaling",
    "tagline": "Lyophilized research vial · Geneva",
    "summary": "MT-1 is listed as a sealed research vial. Laboratory use only. Not a medicine and not a dosing protocol.",
    "overview": "MT-1 is supplied by Novion Biopharma as a lyophilized research solid. The label states research use only, HPLC purity above 99% as a specification, and Swiss packing. This page does not give preparation, dose, or human-use instructions.",
    "purity": "> 99% HPLC (specification)",
    "appearance": "Lyophilized solid in a sealed vial",
    "storage": "2–8 °C. Protect from light. Do not freeze.",
    "featured": false,
    "image": "/images/research-vial.svg",
    "variants": [
      {
        "id": "10",
        "label": "10 mg",
        "mg": 10,
        "price": 695,
        "sku": "NV-MT1-10",
        "stock": 24,
        "image": "/images/research-vial.svg"
      }
    ]
  },
  {
    "slug": "melanotan-ii",
    "name": "Melanotan II",
    "code": "MELAN",
    "category": "signaling",
    "tagline": "Lyophilized research vial · Geneva",
    "summary": "Melanotan II is listed as a sealed research vial. Laboratory use only. Not a medicine and not a dosing protocol.",
    "overview": "Melanotan II is supplied by Novion Biopharma as a lyophilized research solid. The label states research use only, HPLC purity above 99% as a specification, and Swiss packing. This page does not give preparation, dose, or human-use instructions.",
    "purity": "> 99% HPLC (specification)",
    "appearance": "Lyophilized solid in a sealed vial",
    "storage": "2–8 °C. Protect from light. Do not freeze.",
    "featured": false,
    "image": "/images/research-vial.svg",
    "variants": [
      {
        "id": "10",
        "label": "10 mg",
        "mg": 10,
        "price": 795,
        "sku": "NV-MELANOTA-10",
        "stock": 24,
        "image": "/images/research-vial.svg"
      }
    ]
  },
  {
    "slug": "epitalon",
    "name": "Epitalon",
    "code": "EPITA",
    "category": "longevity",
    "tagline": "Lyophilized research vial · Geneva",
    "summary": "Epitalon is listed as a sealed research vial. Laboratory use only. Not a medicine and not a dosing protocol.",
    "overview": "Epitalon is supplied by Novion Biopharma as a lyophilized research solid. The label states research use only, HPLC purity above 99% as a specification, and Swiss packing. This page does not give preparation, dose, or human-use instructions.",
    "purity": "> 99% HPLC (specification)",
    "appearance": "Lyophilized solid in a sealed vial",
    "storage": "2–8 °C. Protect from light. Do not freeze.",
    "featured": false,
    "image": "/images/research-vial.svg",
    "variants": [
      {
        "id": "10",
        "label": "10 mg",
        "mg": 10,
        "price": 1195,
        "sku": "NV-EPITALON-10",
        "stock": 24,
        "image": "/images/research-vial.svg"
      },
      {
        "id": "50",
        "label": "50 mg",
        "mg": 50,
        "price": 2190,
        "sku": "NV-EPITALON-50",
        "stock": 24,
        "image": "/images/research-vial.svg"
      }
    ]
  },
  {
    "slug": "ghrp-2",
    "name": "GHRP-2",
    "code": "GHRP2",
    "category": "signaling",
    "tagline": "Lyophilized research vial · Geneva",
    "summary": "GHRP-2 is listed as a sealed research vial. Laboratory use only. Not a medicine and not a dosing protocol.",
    "overview": "GHRP-2 is supplied by Novion Biopharma as a lyophilized research solid. The label states research use only, HPLC purity above 99% as a specification, and Swiss packing. This page does not give preparation, dose, or human-use instructions.",
    "purity": "> 99% HPLC (specification)",
    "appearance": "Lyophilized solid in a sealed vial",
    "storage": "2–8 °C. Protect from light. Do not freeze.",
    "featured": false,
    "image": "/images/research-vial.svg",
    "variants": [
      {
        "id": "10",
        "label": "10 mg",
        "mg": 10,
        "price": 895,
        "sku": "NV-GHRP2-10",
        "stock": 24,
        "image": "/images/research-vial.svg"
      }
    ]
  },
  {
    "slug": "ghrp-6",
    "name": "GHRP-6",
    "code": "GHRP6",
    "category": "signaling",
    "tagline": "Lyophilized research vial · Geneva",
    "summary": "GHRP-6 is listed as a sealed research vial. Laboratory use only. Not a medicine and not a dosing protocol.",
    "overview": "GHRP-6 is supplied by Novion Biopharma as a lyophilized research solid. The label states research use only, HPLC purity above 99% as a specification, and Swiss packing. This page does not give preparation, dose, or human-use instructions.",
    "purity": "> 99% HPLC (specification)",
    "appearance": "Lyophilized solid in a sealed vial",
    "storage": "2–8 °C. Protect from light. Do not freeze.",
    "featured": false,
    "image": "/images/research-vial.svg",
    "variants": [
      {
        "id": "10",
        "label": "10 mg",
        "mg": 10,
        "price": 995,
        "sku": "NV-GHRP6-10",
        "stock": 24,
        "image": "/images/research-vial.svg"
      }
    ]
  },
  {
    "slug": "pt-141",
    "name": "PT-141",
    "code": "PT141",
    "category": "signaling",
    "tagline": "Lyophilized research vial · Geneva",
    "summary": "PT-141 is listed as a sealed research vial. Laboratory use only. Not a medicine and not a dosing protocol.",
    "overview": "PT-141 is supplied by Novion Biopharma as a lyophilized research solid. The label states research use only, HPLC purity above 99% as a specification, and Swiss packing. This page does not give preparation, dose, or human-use instructions.",
    "purity": "> 99% HPLC (specification)",
    "appearance": "Lyophilized solid in a sealed vial",
    "storage": "2–8 °C. Protect from light. Do not freeze.",
    "featured": false,
    "image": "/images/research-vial.svg",
    "variants": [
      {
        "id": "10",
        "label": "10 mg",
        "mg": 10,
        "price": 1095,
        "sku": "NV-PT141-10",
        "stock": 24,
        "image": "/images/research-vial.svg"
      }
    ]
  },
  {
    "slug": "selank",
    "name": "Selank",
    "code": "SELAN",
    "category": "cognitive",
    "tagline": "Lyophilized research vial · Geneva",
    "summary": "Selank is listed as a sealed research vial. Laboratory use only. Not a medicine and not a dosing protocol.",
    "overview": "Selank is supplied by Novion Biopharma as a lyophilized research solid. The label states research use only, HPLC purity above 99% as a specification, and Swiss packing. This page does not give preparation, dose, or human-use instructions.",
    "purity": "> 99% HPLC (specification)",
    "appearance": "Lyophilized solid in a sealed vial",
    "storage": "2–8 °C. Protect from light. Do not freeze.",
    "featured": false,
    "image": "/images/research-vial.svg",
    "variants": [
      {
        "id": "10",
        "label": "10 mg",
        "mg": 10,
        "price": 1095,
        "sku": "NV-SELANK-10",
        "stock": 24,
        "image": "/images/research-vial.svg"
      }
    ]
  },
  {
    "slug": "semax",
    "name": "Semax",
    "code": "SEMAX",
    "category": "cognitive",
    "tagline": "Lyophilized research vial · Geneva",
    "summary": "Semax is listed as a sealed research vial. Laboratory use only. Not a medicine and not a dosing protocol.",
    "overview": "Semax is supplied by Novion Biopharma as a lyophilized research solid. The label states research use only, HPLC purity above 99% as a specification, and Swiss packing. This page does not give preparation, dose, or human-use instructions.",
    "purity": "> 99% HPLC (specification)",
    "appearance": "Lyophilized solid in a sealed vial",
    "storage": "2–8 °C. Protect from light. Do not freeze.",
    "featured": false,
    "image": "/images/research-vial.svg",
    "variants": [
      {
        "id": "10",
        "label": "10 mg",
        "mg": 10,
        "price": 995,
        "sku": "NV-SEMAX-10",
        "stock": 24,
        "image": "/images/research-vial.svg"
      }
    ]
  },
  {
    "slug": "tesamorelin",
    "name": "Tesamorelin",
    "code": "TESAM",
    "category": "signaling",
    "tagline": "Lyophilized research vial · Geneva",
    "summary": "Tesamorelin is listed as a sealed research vial. Laboratory use only. Not a medicine and not a dosing protocol.",
    "overview": "Tesamorelin is supplied by Novion Biopharma as a lyophilized research solid. The label states research use only, HPLC purity above 99% as a specification, and Swiss packing. This page does not give preparation, dose, or human-use instructions.",
    "purity": "> 99% HPLC (specification)",
    "appearance": "Lyophilized solid in a sealed vial",
    "storage": "2–8 °C. Protect from light. Do not freeze.",
    "featured": false,
    "image": "/images/research-vial.svg",
    "variants": [
      {
        "id": "10",
        "label": "10 mg",
        "mg": 10,
        "price": 2190,
        "sku": "NV-TESAMORE-10",
        "stock": 24,
        "image": "/images/research-vial.svg"
      }
    ]
  },
  {
    "slug": "sermorelin",
    "name": "Sermorelin",
    "code": "SERMO",
    "category": "signaling",
    "tagline": "Lyophilized research vial · Geneva",
    "summary": "Sermorelin is listed as a sealed research vial. Laboratory use only. Not a medicine and not a dosing protocol.",
    "overview": "Sermorelin is supplied by Novion Biopharma as a lyophilized research solid. The label states research use only, HPLC purity above 99% as a specification, and Swiss packing. This page does not give preparation, dose, or human-use instructions.",
    "purity": "> 99% HPLC (specification)",
    "appearance": "Lyophilized solid in a sealed vial",
    "storage": "2–8 °C. Protect from light. Do not freeze.",
    "featured": false,
    "image": "/images/research-vial.svg",
    "variants": [
      {
        "id": "10",
        "label": "10 mg",
        "mg": 10,
        "price": 2290,
        "sku": "NV-SERMOREL-10",
        "stock": 24,
        "image": "/images/research-vial.svg"
      }
    ]
  },
  {
    "slug": "thymosin-alpha-1",
    "name": "Thymosin Alpha-1",
    "code": "THYMO",
    "category": "recovery",
    "tagline": "Lyophilized research vial · Geneva",
    "summary": "Thymosin Alpha-1 is listed as a sealed research vial. Laboratory use only. Not a medicine and not a dosing protocol.",
    "overview": "Thymosin Alpha-1 is supplied by Novion Biopharma as a lyophilized research solid. The label states research use only, HPLC purity above 99% as a specification, and Swiss packing. This page does not give preparation, dose, or human-use instructions.",
    "purity": "> 99% HPLC (specification)",
    "appearance": "Lyophilized solid in a sealed vial",
    "storage": "2–8 °C. Protect from light. Do not freeze.",
    "featured": false,
    "image": "/images/research-vial.svg",
    "variants": [
      {
        "id": "10",
        "label": "10 mg",
        "mg": 10,
        "price": 2590,
        "sku": "NV-THYMOSIN-10",
        "stock": 24,
        "image": "/images/research-vial.svg"
      }
    ]
  },
  {
    "slug": "ipamorelin",
    "name": "Ipamorelin",
    "code": "IPAMO",
    "category": "signaling",
    "tagline": "Lyophilized research vial · Geneva",
    "summary": "Ipamorelin is listed as a sealed research vial. Laboratory use only. Not a medicine and not a dosing protocol.",
    "overview": "Ipamorelin is supplied by Novion Biopharma as a lyophilized research solid. The label states research use only, HPLC purity above 99% as a specification, and Swiss packing. This page does not give preparation, dose, or human-use instructions.",
    "purity": "> 99% HPLC (specification)",
    "appearance": "Lyophilized solid in a sealed vial",
    "storage": "2–8 °C. Protect from light. Do not freeze.",
    "featured": false,
    "image": "/images/research-vial.svg",
    "variants": [
      {
        "id": "10",
        "label": "10 mg",
        "mg": 10,
        "price": 1395,
        "sku": "NV-IPAMOREL-10",
        "stock": 24,
        "image": "/images/research-vial.svg"
      }
    ]
  },
  {
    "slug": "mazdutide",
    "name": "Mazdutide",
    "code": "MAZDU",
    "category": "metabolic",
    "tagline": "Lyophilized research vial · Geneva",
    "summary": "Mazdutide is listed as a sealed research vial. Laboratory use only. Not a medicine and not a dosing protocol.",
    "overview": "Mazdutide is supplied by Novion Biopharma as a lyophilized research solid. The label states research use only, HPLC purity above 99% as a specification, and Swiss packing. This page does not give preparation, dose, or human-use instructions.",
    "purity": "> 99% HPLC (specification)",
    "appearance": "Lyophilized solid in a sealed vial",
    "storage": "2–8 °C. Protect from light. Do not freeze.",
    "featured": false,
    "image": "/images/research-vial.svg",
    "variants": [
      {
        "id": "10",
        "label": "10 mg",
        "mg": 10,
        "price": 2785,
        "sku": "NV-MAZDUTID-10",
        "stock": 24,
        "image": "/images/research-vial.svg"
      }
    ]
  },
  {
    "slug": "cagrilintide",
    "name": "Cagrilintide",
    "code": "CAGRI",
    "category": "metabolic",
    "tagline": "Lyophilized research vial · Geneva",
    "summary": "Cagrilintide is listed as a sealed research vial. Laboratory use only. Not a medicine and not a dosing protocol.",
    "overview": "Cagrilintide is supplied by Novion Biopharma as a lyophilized research solid. The label states research use only, HPLC purity above 99% as a specification, and Swiss packing. This page does not give preparation, dose, or human-use instructions.",
    "purity": "> 99% HPLC (specification)",
    "appearance": "Lyophilized solid in a sealed vial",
    "storage": "2–8 °C. Protect from light. Do not freeze.",
    "featured": false,
    "image": "/images/research-vial.svg",
    "variants": [
      {
        "id": "10",
        "label": "10 mg",
        "mg": 10,
        "price": 1990,
        "sku": "NV-CAGRILIN-10",
        "stock": 24,
        "image": "/images/research-vial.svg"
      }
    ]
  },
  {
    "slug": "nad",
    "name": "NAD+",
    "code": "NAD-5",
    "category": "longevity",
    "tagline": "Lyophilized research vial · Geneva",
    "summary": "NAD+ is listed as a sealed research vial. Laboratory use only. Not a medicine and not a dosing protocol.",
    "overview": "NAD+ is supplied by Novion Biopharma as a lyophilized research solid. The label states research use only, HPLC purity above 99% as a specification, and Swiss packing. This page does not give preparation, dose, or human-use instructions.",
    "purity": "> 99% HPLC (specification)",
    "appearance": "Lyophilized solid in a sealed vial",
    "storage": "2–8 °C. Protect from light. Do not freeze.",
    "featured": false,
    "image": "/images/research-vial.svg",
    "variants": [
      {
        "id": "500",
        "label": "500 mg",
        "mg": 500,
        "price": 995,
        "sku": "NV-NAD-500",
        "stock": 24,
        "image": "/images/research-vial.svg"
      },
      {
        "id": "1000",
        "label": "1000 mg",
        "mg": 1000,
        "price": 1395,
        "sku": "NV-NAD-1000",
        "stock": 24,
        "image": "/images/research-vial.svg"
      }
    ]
  },
  {
    "slug": "ghk-cu",
    "name": "GHK-Cu",
    "code": "GHKCU",
    "category": "signaling",
    "tagline": "Lyophilized research vial · Geneva",
    "summary": "GHK-Cu is listed as a sealed research vial. Laboratory use only. Not a medicine and not a dosing protocol.",
    "overview": "GHK-Cu is supplied by Novion Biopharma as a lyophilized research solid. The label states research use only, HPLC purity above 99% as a specification, and Swiss packing. This page does not give preparation, dose, or human-use instructions.",
    "purity": "> 99% HPLC (specification)",
    "appearance": "Lyophilized solid in a sealed vial",
    "storage": "2–8 °C. Protect from light. Do not freeze.",
    "featured": true,
    "image": "/images/research-vial.svg",
    "variants": [
      {
        "id": "50",
        "label": "50 mg",
        "mg": 50,
        "price": 595,
        "sku": "NV-GHKCU-50",
        "stock": 24,
        "image": "/images/research-vial.svg"
      },
      {
        "id": "100",
        "label": "100 mg",
        "mg": 100,
        "price": 795,
        "sku": "NV-GHKCU-100",
        "stock": 24,
        "image": "/images/research-vial.svg"
      }
    ]
  },
  {
    "slug": "wolverine-stack",
    "name": "Wolverine stack",
    "code": "WOLVE",
    "category": "recovery",
    "tagline": "Lyophilized research vial · Geneva",
    "summary": "Wolverine stack is listed as a sealed research vial. Laboratory use only. Not a medicine and not a dosing protocol.",
    "overview": "Wolverine stack is supplied by Novion Biopharma as a lyophilized research solid. The label states research use only, HPLC purity above 99% as a specification, and Swiss packing. This page does not give preparation, dose, or human-use instructions.",
    "purity": "> 99% HPLC (specification)",
    "appearance": "Lyophilized solid in a sealed vial",
    "storage": "2–8 °C. Protect from light. Do not freeze.",
    "featured": false,
    "image": "/images/research-vial.svg",
    "variants": [
      {
        "id": "70",
        "label": "70 mg",
        "mg": 70,
        "price": 2985,
        "sku": "NV-WOLVERIN-70",
        "stock": 24,
        "image": "/images/research-vial.svg"
      }
    ]
  },
  {
    "slug": "kpv-recovery-stack",
    "name": "KPV recovery stack",
    "code": "KPVRE",
    "category": "recovery",
    "tagline": "Lyophilized research vial · Geneva",
    "summary": "KPV recovery stack is listed as a sealed research vial. Laboratory use only. Not a medicine and not a dosing protocol.",
    "overview": "KPV recovery stack is supplied by Novion Biopharma as a lyophilized research solid. The label states research use only, HPLC purity above 99% as a specification, and Swiss packing. This page does not give preparation, dose, or human-use instructions.",
    "purity": "> 99% HPLC (specification)",
    "appearance": "Lyophilized solid in a sealed vial",
    "storage": "2–8 °C. Protect from light. Do not freeze.",
    "featured": false,
    "image": "/images/research-vial.svg",
    "variants": [
      {
        "id": "80",
        "label": "80 mg",
        "mg": 80,
        "price": 3685,
        "sku": "NV-KPVRECOV-80",
        "stock": 24,
        "image": "/images/research-vial.svg"
      }
    ]
  },
  {
    "slug": "kisspeptin-10",
    "name": "Kisspeptin-10",
    "code": "KISSP",
    "category": "signaling",
    "tagline": "Lyophilized research vial · Geneva",
    "summary": "Kisspeptin-10 is listed as a sealed research vial. Laboratory use only. Not a medicine and not a dosing protocol.",
    "overview": "Kisspeptin-10 is supplied by Novion Biopharma as a lyophilized research solid. The label states research use only, HPLC purity above 99% as a specification, and Swiss packing. This page does not give preparation, dose, or human-use instructions.",
    "purity": "> 99% HPLC (specification)",
    "appearance": "Lyophilized solid in a sealed vial",
    "storage": "2–8 °C. Protect from light. Do not freeze.",
    "featured": false,
    "image": "/images/research-vial.svg",
    "variants": [
      {
        "id": "10",
        "label": "10 mg",
        "mg": 10,
        "price": 1690,
        "sku": "NV-KISSPEPT-10",
        "stock": 24,
        "image": "/images/research-vial.svg"
      }
    ]
  },
  {
    "slug": "dsip",
    "name": "DSIP",
    "code": "DSIP-",
    "category": "signaling",
    "tagline": "Lyophilized research vial · Geneva",
    "summary": "DSIP is listed as a sealed research vial. Laboratory use only. Not a medicine and not a dosing protocol.",
    "overview": "DSIP is supplied by Novion Biopharma as a lyophilized research solid. The label states research use only, HPLC purity above 99% as a specification, and Swiss packing. This page does not give preparation, dose, or human-use instructions.",
    "purity": "> 99% HPLC (specification)",
    "appearance": "Lyophilized solid in a sealed vial",
    "storage": "2–8 °C. Protect from light. Do not freeze.",
    "featured": false,
    "image": "/images/research-vial.svg",
    "variants": [
      {
        "id": "10",
        "label": "10 mg",
        "mg": 10,
        "price": 1195,
        "sku": "NV-DSIP-10",
        "stock": 24,
        "image": "/images/research-vial.svg"
      }
    ]
  },
  {
    "slug": "melatonin",
    "name": "Melatonin",
    "code": "MELAT",
    "category": "signaling",
    "tagline": "Lyophilized research vial · Geneva",
    "summary": "Melatonin is listed as a sealed research vial. Laboratory use only. Not a medicine and not a dosing protocol.",
    "overview": "Melatonin is supplied by Novion Biopharma as a lyophilized research solid. The label states research use only, HPLC purity above 99% as a specification, and Swiss packing. This page does not give preparation, dose, or human-use instructions.",
    "purity": "> 99% HPLC (specification)",
    "appearance": "Lyophilized solid in a sealed vial",
    "storage": "2–8 °C. Protect from light. Do not freeze.",
    "featured": false,
    "image": "/images/research-vial.svg",
    "variants": [
      {
        "id": "10",
        "label": "10 mg",
        "mg": 10,
        "price": 1095,
        "sku": "NV-MELATONI-10",
        "stock": 24,
        "image": "/images/research-vial.svg"
      }
    ]
  },
  {
    "slug": "5-amino-1mq",
    "name": "5-Amino-1MQ",
    "code": "5AMIN",
    "category": "metabolic",
    "tagline": "Lyophilized research vial · Geneva",
    "summary": "5-Amino-1MQ is listed as a sealed research vial. Laboratory use only. Not a medicine and not a dosing protocol.",
    "overview": "5-Amino-1MQ is supplied by Novion Biopharma as a lyophilized research solid. The label states research use only, HPLC purity above 99% as a specification, and Swiss packing. This page does not give preparation, dose, or human-use instructions.",
    "purity": "> 99% HPLC (specification)",
    "appearance": "Lyophilized solid in a sealed vial",
    "storage": "2–8 °C. Protect from light. Do not freeze.",
    "featured": false,
    "image": "/images/research-vial.svg",
    "variants": [
      {
        "id": "5",
        "label": "5 mg",
        "mg": 5,
        "price": 695,
        "sku": "NV-5AMINO1M-5",
        "stock": 24,
        "image": "/images/research-vial.svg"
      }
    ]
  },
  {
    "slug": "10-amino-1mq",
    "name": "10-Amino-1MQ",
    "code": "10AMI",
    "category": "metabolic",
    "tagline": "Lyophilized research vial · Geneva",
    "summary": "10-Amino-1MQ is listed as a sealed research vial. Laboratory use only. Not a medicine and not a dosing protocol.",
    "overview": "10-Amino-1MQ is supplied by Novion Biopharma as a lyophilized research solid. The label states research use only, HPLC purity above 99% as a specification, and Swiss packing. This page does not give preparation, dose, or human-use instructions.",
    "purity": "> 99% HPLC (specification)",
    "appearance": "Lyophilized solid in a sealed vial",
    "storage": "2–8 °C. Protect from light. Do not freeze.",
    "featured": false,
    "image": "/images/research-vial.svg",
    "variants": [
      {
        "id": "10",
        "label": "10 mg",
        "mg": 10,
        "price": 895,
        "sku": "NV-10AMINO1-10",
        "stock": 24,
        "image": "/images/research-vial.svg"
      }
    ]
  },
  {
    "slug": "ahk-cu",
    "name": "AHK-Cu",
    "code": "AHKCU",
    "category": "signaling",
    "tagline": "Lyophilized research vial · Geneva",
    "summary": "AHK-Cu is listed as a sealed research vial. Laboratory use only. Not a medicine and not a dosing protocol.",
    "overview": "AHK-Cu is supplied by Novion Biopharma as a lyophilized research solid. The label states research use only, HPLC purity above 99% as a specification, and Swiss packing. This page does not give preparation, dose, or human-use instructions.",
    "purity": "> 99% HPLC (specification)",
    "appearance": "Lyophilized solid in a sealed vial",
    "storage": "2–8 °C. Protect from light. Do not freeze.",
    "featured": false,
    "image": "/images/research-vial.svg",
    "variants": [
      {
        "id": "50",
        "label": "50 mg",
        "mg": 50,
        "price": 595,
        "sku": "NV-AHKCU-50",
        "stock": 24,
        "image": "/images/research-vial.svg"
      }
    ]
  },
  {
    "slug": "snap-8",
    "name": "Snap-8",
    "code": "SNAP8",
    "category": "signaling",
    "tagline": "Lyophilized research vial · Geneva",
    "summary": "Snap-8 is listed as a sealed research vial. Laboratory use only. Not a medicine and not a dosing protocol.",
    "overview": "Snap-8 is supplied by Novion Biopharma as a lyophilized research solid. The label states research use only, HPLC purity above 99% as a specification, and Swiss packing. This page does not give preparation, dose, or human-use instructions.",
    "purity": "> 99% HPLC (specification)",
    "appearance": "Lyophilized solid in a sealed vial",
    "storage": "2–8 °C. Protect from light. Do not freeze.",
    "featured": false,
    "image": "/images/research-vial.svg",
    "variants": [
      {
        "id": "10",
        "label": "10 mg",
        "mg": 10,
        "price": 595,
        "sku": "NV-SNAP8-10",
        "stock": 24,
        "image": "/images/research-vial.svg"
      }
    ]
  },
  {
    "slug": "cbl-514",
    "name": "CBL-514",
    "code": "CBL51",
    "category": "metabolic",
    "tagline": "Lyophilized research vial · Geneva",
    "summary": "CBL-514 is listed as a sealed research vial. Laboratory use only. Not a medicine and not a dosing protocol.",
    "overview": "CBL-514 is supplied by Novion Biopharma as a lyophilized research solid. The label states research use only, HPLC purity above 99% as a specification, and Swiss packing. This page does not give preparation, dose, or human-use instructions.",
    "purity": "> 99% HPLC (specification)",
    "appearance": "Lyophilized solid in a sealed vial",
    "storage": "2–8 °C. Protect from light. Do not freeze.",
    "featured": false,
    "image": "/images/research-vial.svg",
    "variants": [
      {
        "id": "20",
        "label": "20 mg",
        "mg": 20,
        "price": 3980,
        "sku": "NV-CBL514-20",
        "stock": 24,
        "image": "/images/research-vial.svg"
      }
    ]
  },
  {
    "slug": "cagrilintide-5-mg-semaglutide-5-mg",
    "name": "Cagrilintide 5 mg + Semaglutide 5 mg",
    "code": "CAGRI",
    "category": "metabolic",
    "tagline": "Lyophilized research vial · Geneva",
    "summary": "Cagrilintide 5 mg + Semaglutide 5 mg is listed as a sealed research vial. Laboratory use only. Not a medicine and not a dosing protocol.",
    "overview": "Cagrilintide 5 mg + Semaglutide 5 mg is supplied by Novion Biopharma as a lyophilized research solid. The label states research use only, HPLC purity above 99% as a specification, and Swiss packing. This page does not give preparation, dose, or human-use instructions.",
    "purity": "> 99% HPLC (specification)",
    "appearance": "Lyophilized solid in a sealed vial",
    "storage": "2–8 °C. Protect from light. Do not freeze.",
    "featured": false,
    "image": "/images/research-vial.svg",
    "variants": [
      {
        "id": "10",
        "label": "10 mg",
        "mg": 10,
        "price": 2390,
        "sku": "NV-CAGRILIN-10",
        "stock": 24,
        "image": "/images/research-vial.svg"
      }
    ]
  },
  {
    "slug": "aicar",
    "name": "AICAR",
    "code": "AICAR",
    "category": "metabolic",
    "tagline": "Lyophilized research vial · Geneva",
    "summary": "AICAR is listed as a sealed research vial. Laboratory use only. Not a medicine and not a dosing protocol.",
    "overview": "AICAR is supplied by Novion Biopharma as a lyophilized research solid. The label states research use only, HPLC purity above 99% as a specification, and Swiss packing. This page does not give preparation, dose, or human-use instructions.",
    "purity": "> 99% HPLC (specification)",
    "appearance": "Lyophilized solid in a sealed vial",
    "storage": "2–8 °C. Protect from light. Do not freeze.",
    "featured": false,
    "image": "/images/research-vial.svg",
    "variants": [
      {
        "id": "50",
        "label": "50 mg",
        "mg": 50,
        "price": 995,
        "sku": "NV-AICAR-50",
        "stock": 24,
        "image": "/images/research-vial.svg"
      }
    ]
  },
  {
    "slug": "kpv",
    "name": "KPV",
    "code": "KPV-1",
    "category": "recovery",
    "tagline": "Lyophilized research vial · Geneva",
    "summary": "KPV is listed as a sealed research vial. Laboratory use only. Not a medicine and not a dosing protocol.",
    "overview": "KPV is supplied by Novion Biopharma as a lyophilized research solid. The label states research use only, HPLC purity above 99% as a specification, and Swiss packing. This page does not give preparation, dose, or human-use instructions.",
    "purity": "> 99% HPLC (specification)",
    "appearance": "Lyophilized solid in a sealed vial",
    "storage": "2–8 °C. Protect from light. Do not freeze.",
    "featured": false,
    "image": "/images/research-vial.svg",
    "variants": [
      {
        "id": "10",
        "label": "10 mg",
        "mg": 10,
        "price": 995,
        "sku": "NV-KPV-10",
        "stock": 24,
        "image": "/images/research-vial.svg"
      }
    ]
  },
  {
    "slug": "hgh",
    "name": "HGH",
    "code": "HGH-1",
    "category": "signaling",
    "tagline": "Lyophilized research vial · Geneva",
    "summary": "HGH is listed as a sealed research vial. Laboratory use only. Not a medicine and not a dosing protocol.",
    "overview": "HGH is supplied by Novion Biopharma as a lyophilized research solid. The label states research use only, HPLC purity above 99% as a specification, and Swiss packing. This page does not give preparation, dose, or human-use instructions.",
    "purity": "> 99% HPLC (specification)",
    "appearance": "Lyophilized solid in a sealed vial",
    "storage": "2–8 °C. Protect from light. Do not freeze.",
    "featured": false,
    "image": "/images/research-vial.svg",
    "variants": [
      {
        "id": "10",
        "label": "10 IU",
        "mg": 10,
        "price": 1195,
        "sku": "NV-HGH-10",
        "stock": 24,
        "image": "/images/research-vial.svg"
      },
      {
        "id": "24",
        "label": "24 IU",
        "mg": 24,
        "price": 1495,
        "sku": "NV-HGH-24",
        "stock": 24,
        "image": "/images/research-vial.svg"
      },
      {
        "id": "36",
        "label": "36 IU",
        "mg": 36,
        "price": 1690,
        "sku": "NV-HGH-36",
        "stock": 24,
        "image": "/images/research-vial.svg"
      }
    ]
  }
];

export const articles: Article[] = [
  {
    slug: "what-a-certificate-reports",
    title: "What a certificate actually reports",
    date: "12 March 2026",
    kicker: "Quality",
    excerpt: "A purity percentage is one line. Identity and method sit beside it.",
    body: [
      "A vial label can state a target purity. A certificate is the record that ties that figure to a method, a lot, and an identity test.",
      "Novion lists HPLC purity as a specification. Live certificates are attached per lot when the laboratory file is connected.",
    ],
  },
  {
    slug: "why-dry-vials-travel-cold",
    title: "Why dry vials still travel cold",
    date: "2 March 2026",
    kicker: "Dispatch",
    excerpt: "Lyophilized solids are still packed for a short, cold transit.",
    body: [
      "The carton says store at 2–8 °C and do not freeze. Dispatch follows that range even though the solid is dry.",
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
export function getArticle(slug: string) {
  return articles.find((article) => article.slug === slug);
}

export const faqs = [
  { q: "Which currency do I see?", a: "The catalog shows a price in the currency for the country where you open it. The secure payment page confirms the amount before you pay." },
  { q: "Who takes payment?", a: "Checkout continues on the secure payment page. Card and supported local methods are handled there." },
  { q: "Can I return a vial?", a: "You can withdraw before you unseal the vial, and you can report a wrong or damaged shipment. Opened research material is not taken back. Read Returns for the steps." },
  { q: "Is this for human use?", a: "No. Every vial is labeled research use only. The shop does not provide preparation or dosing instructions." },
  { q: "Are the vials certified?", a: "The site does not display ISO, GMP, FDA, Swissmedic, or other certification marks. A purity line is a specification until a laboratory report for that lot is attached." },
];
