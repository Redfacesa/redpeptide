export const productImages: Record<string, string> = {
  "bpc-157": "/images/vial-01.png",
  "tb-500": "/images/vial-02.png",
  kpv: "/images/vial-07.png",
  "ara-290": "/images/vial-06.png",
  "ghk-cu": "/images/vial-05.png",
  ipamorelin: "/images/vial-04.png",
  "cjc-1295": "/images/vial-03.png",
  semax: "/images/vial-08.png",
  selank: "/images/vial-09.png",
  "mots-c": "/images/vial-11.png",
  "aod-9604": "/images/vial-10.png",
  epitalon: "/images/vial-13.png",
  "ss-31": "/images/vial-12.png",
};

export function productImage(slug: string) {
  return productImages[slug] ?? "/images/vial-01.png";
}
