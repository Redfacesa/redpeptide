export function money(value: number) {
  return new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: "EUR",
  }).format(value);
}

export const FREE_SHIPPING_AT = 150;
export const STANDARD_RATE = 8.5;
export const EXPRESS_RATE = 18;

export function shippingCost(subtotal: number, method: "standard" | "express") {
  if (subtotal <= 0) return 0;
  if (method === "express") return EXPRESS_RATE;
  return subtotal >= FREE_SHIPPING_AT ? 0 : STANDARD_RATE;
}
