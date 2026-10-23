import { fetchUser, isCatalogEditor } from "@/lib/admin-auth";
import { orderById } from "@/lib/orders";

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const user = await fetchUser(request);
  if (!user) return Response.json({ message: "Sign in to track this order." }, { status: 401 });
  const { id } = await params;
  const order = await orderById(id);
  if (!order) return Response.json({ message: "That order is not on file." }, { status: 404 });
  if (!isCatalogEditor(user.email) && order.email.toLowerCase() !== user.email.toLowerCase()) {
    return Response.json({ message: "That order is not on file." }, { status: 404 });
  }
  return Response.json({ order });
}
