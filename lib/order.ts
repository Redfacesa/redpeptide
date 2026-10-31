import { isZa } from "@/lib/region";

export const orderStatuses = ["pending", "paid", "packed", "shipped", "cancelled"] as const;

export type OrderStatus = (typeof orderStatuses)[number];

export const statusLabel: Record<OrderStatus, string> = isZa
  ? {
      pending: "Payment pending",
      paid: "Paid",
      packed: "Packed",
      shipped: "Shipped",
      cancelled: "Cancelled",
    }
  : {
      pending: "Zahlung ausstehend",
      paid: "Bezahlt",
      packed: "Gepackt",
      shipped: "Versendet",
      cancelled: "Storniert",
    };

export type OrderLine = {
  slug: string;
  variantId: string;
  qty: number;
  price: number;
  name: string;
  variant: string;
  sku: string;
};

export type Order = {
  id: string;
  createdAt: string;
  status: OrderStatus;
  email: string;
  name: string;
  phone?: string;
  line1: string;
  city: string;
  postcode: string;
  country: string;
  shipping: "standard" | "express";
  note: string;
  lines: OrderLine[];
  subtotal: number;
  shippingCost: number;
  total: number;
};

export function isOrderStatus(value: string): value is OrderStatus {
  return (orderStatuses as readonly string[]).includes(value);
}
