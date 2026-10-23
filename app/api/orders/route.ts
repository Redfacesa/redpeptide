import { fetchUser, isCatalogEditor } from "@/lib/admin-auth";
import { isOrderStatus } from "@/lib/order";
import { createOrder, ordersFor, readOrders, setOrderStatus } from "@/lib/orders";

export async function GET(request: Request) {
  const user = await fetchUser(request);
  if (!user) return Response.json({ message: "Sign in to see orders." }, { status: 401 });
  const desk = isCatalogEditor(user.email);
  const orders = desk ? await readOrders() : await ordersFor(user.email);
  return Response.json({ orders, desk });
}

export async function POST(request: Request) {
  const user = await fetchUser(request);
  if (!user) return Response.json({ message: "Sign in before checkout." }, { status: 401 });
  const body = (await request.json().catch(() => null)) as {
    name?: string;
    line1?: string;
    city?: string;
    postcode?: string;
    country?: string;
    shipping?: string;
    note?: string;
    research?: boolean;
    lines?: { slug?: string; variantId?: string; qty?: number }[];
  } | null;
  if (!body?.research) return Response.json({ message: "Confirm the research-use statement to continue." }, { status: 400 });
  const order = await createOrder({
    email: user.email,
    name: body.name || user.name,
    line1: body.line1 || "",
    city: body.city || "",
    postcode: body.postcode || "",
    country: body.country || "",
    shipping: body.shipping || "",
    note: body.note || "",
    lines: body.lines || [],
  });
  if ("error" in order) return Response.json({ message: order.error }, { status: 400 });
  return Response.json({ order });
}

export async function PATCH(request: Request) {
  const user = await fetchUser(request);
  if (!user) return Response.json({ message: "Sign in to update an order." }, { status: 401 });
  if (!isCatalogEditor(user.email)) return Response.json({ message: "This account cannot update orders." }, { status: 403 });
  const body = (await request.json().catch(() => null)) as { id?: string; status?: string } | null;
  const id = String(body?.id || "");
  const status = String(body?.status || "");
  if (!/^NV-\d{5}$/.test(id) || !isOrderStatus(status)) {
    return Response.json({ message: "Choose an order and a status." }, { status: 400 });
  }
  const order = await setOrderStatus(id, status);
  if (!order) return Response.json({ message: "That order is not on file." }, { status: 404 });
  return Response.json({ order });
}
