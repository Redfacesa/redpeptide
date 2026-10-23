import { countries } from "@/lib/catalog";
import { readMergedCatalog } from "@/lib/catalog-store";
import { shippingCost } from "@/lib/format";
import { isOrderStatus, type Order, type OrderStatus } from "@/lib/order";
import { readStore, writeStore } from "@/lib/storage";

const FILE = ".data/orders.json";
const KEY = "orders";

function clean(value: string, max: number) {
  return value.replace(/[<>]/g, "").trim().slice(0, max);
}

export async function readOrders(): Promise<Order[]> {
  const raw = await readStore(KEY, FILE);
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw) as Order[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

async function writeOrders(orders: Order[]) {
  return writeStore(KEY, FILE, JSON.stringify(orders.slice(0, 400)));
}

export async function ordersFor(email: string) {
  const needle = email.toLowerCase();
  return (await readOrders()).filter((order) => order.email.toLowerCase() === needle);
}

export async function orderById(id: string) {
  return (await readOrders()).find((order) => order.id === id) ?? null;
}

export async function setOrderStatus(id: string, status: OrderStatus) {
  const orders = await readOrders();
  const index = orders.findIndex((order) => order.id === id);
  if (index < 0) return null;
  orders[index] = { ...orders[index], status };
  await writeOrders(orders);
  return orders[index];
}

type DraftLine = { slug?: string; variantId?: string; qty?: number };

export async function createOrder(input: {
  email: string;
  name: string;
  line1: string;
  city: string;
  postcode: string;
  country: string;
  shipping: string;
  note: string;
  lines: DraftLine[];
}): Promise<Order | { error: string }> {
  const name = clean(input.name || "", 80);
  const line1 = clean(input.line1 || "", 120);
  const city = clean(input.city || "", 80);
  const postcode = clean(input.postcode || "", 16);
  const country = clean(input.country || "", 80);
  const note = clean(input.note || "", 400);
  const shipping = input.shipping === "express" ? "express" : input.shipping === "standard" ? "standard" : "";
  if (!name || !line1 || !city || !postcode || !shipping) return { error: "A name and a full address are required." };
  if (!countries.includes(country)) return { error: "Choose a country." };
  if (!Array.isArray(input.lines) || input.lines.length === 0 || input.lines.length > 20) {
    return { error: "Add a compound before checkout." };
  }

  const catalog = await readMergedCatalog();
  const lines = [];
  for (const raw of input.lines) {
    const slug = clean(String(raw.slug || ""), 60);
    const variantId = clean(String(raw.variantId || ""), 60);
    const qty = Math.floor(Number(raw.qty) || 0);
    const product = catalog.find((item) => item.slug === slug);
    const variant = product?.variants.find((item) => item.id === variantId);
    if (!product || !variant) return { error: "A compound in the cart is no longer listed." };
    if (qty < 1 || qty > 20) return { error: "Check the quantity before checkout." };
    if (qty > variant.stock) return { error: `${product.name} ${variant.label} does not have enough stock.` };
    lines.push({
      slug,
      variantId,
      qty,
      price: variant.price,
      name: product.name,
      variant: variant.label,
      sku: variant.sku,
    });
  }

  const subtotal = lines.reduce((sum, line) => sum + line.price * line.qty, 0);
  const shippingCostValue = shippingCost(subtotal, shipping);
  const orders = await readOrders();
  const taken = new Set(orders.map((order) => order.id));
  let id = "";
  for (let attempt = 0; attempt < 8 && !id; attempt += 1) {
    const next = `NV-${Math.floor(10000 + Math.random() * 90000)}`;
    if (!taken.has(next)) id = next;
  }
  if (!id) id = `NV-${String(Date.now()).slice(-5)}`;

  const order: Order = {
    id,
    createdAt: new Date().toISOString(),
    status: "pending",
    email: input.email.toLowerCase(),
    name,
    line1,
    city,
    postcode,
    country,
    shipping,
    note,
    lines,
    subtotal,
    shippingCost: shippingCostValue,
    total: subtotal + shippingCostValue,
  };
  const saved = await writeOrders([order, ...orders]);
  if (!saved) return { error: "The order store is not connected." };
  return order;
}

export function publicOrder(order: Order) {
  return isOrderStatus(order.status) ? order : { ...order, status: "pending" as const };
}
