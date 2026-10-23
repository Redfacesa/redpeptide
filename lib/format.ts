export const FREE_SHIPPING_AT = 2500;
export const STANDARD_RATE = 149;
export const EXPRESS_RATE = 349;

export function shippingCost(subtotal: number, method: "standard" | "express") {
  if (subtotal <= 0) return 0;
  if (method === "express") return EXPRESS_RATE;
  return subtotal >= FREE_SHIPPING_AT ? 0 : STANDARD_RATE;
}

export function zar(value: number) {
  return new Intl.NumberFormat("en-ZA", { style: "currency", currency: "ZAR" }).format(value);
}
