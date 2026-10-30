export const FREE_SHIPPING_AT = 125;
export const STANDARD_RATE = 8;
export const EXPRESS_RATE = 18;

export function shippingCost(subtotal: number, method: "standard" | "express") {
  if (subtotal <= 0) return 0;
  if (method === "express") return EXPRESS_RATE;
  return subtotal >= FREE_SHIPPING_AT ? 0 : STANDARD_RATE;
}

export function zar(value: number) {
  return new Intl.NumberFormat("en-ZA", { style: "currency", currency: "ZAR" }).format(value);
}

export function chf(value: number) {
  return new Intl.NumberFormat("en-CH", { style: "currency", currency: "CHF" }).format(value);
}
