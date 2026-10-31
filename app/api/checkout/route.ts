import { orderById } from "@/lib/orders";
import { chfToZar, zarPerChf } from "@/lib/fx";
import { isZa, siteUrl } from "@/lib/region";

const COMMERCE = process.env.REDFACE_COMMERCE_API ?? "https://bpzzgilwlkghgfkvkkxx.supabase.co/functions/v1/commerce-api";

export async function POST(request: Request) {
  const body = (await request.json()) as {
    label?: string;
    email?: string;
    returnUrl?: string;
    orderId?: string;
  };
  const label = String(body.label || "Novion Biopharma order").slice(0, 80);
  const orderId = String(body.orderId || "").replace(/\s+/g, "-").slice(0, 48);
  const email = String(body.email || "");
  const returnUrl = String(body.returnUrl || `${siteUrl}/account`);
  const merchantId = process.env.NOVION_MERCHANT_ID || "";
  const apiKey = process.env.REDFACE_API_KEY || "";
  const order = orderId ? await orderById(orderId) : null;
  if (!order || !(order.total > 0)) {
    return Response.json({ message: isZa ? "That order was not found." : "Die Bestellung wurde nicht gefunden." }, { status: 404 });
  }

  let rate = 1;
  if (!isZa) {
    try {
      rate = await zarPerChf();
    } catch {
      return Response.json({ message: "Der Franken-Rand-Kurs ist gerade nicht verfügbar. Die Zahlung wurde nicht geöffnet." }, { status: 503 });
    }
  }
  const amount = isZa ? Math.round(order.total) : chfToZar(order.total, rate);
  const lines = order.lines.map((line) => ({
    product_name: `${line.name} ${line.variant}`,
    price_zar: isZa ? Math.round(line.price) : chfToZar(line.price, rate),
    quantity: line.qty,
    sku: line.sku,
  }));

  if (merchantId && apiKey && amount > 0) {
    const response = await fetch(`${COMMERCE}/payments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
        "X-Api-Key": apiKey,
        "Idempotency-Key": crypto.randomUUID(),
      },
      body: JSON.stringify({
        merchant_id: merchantId,
        amount,
        currency: "ZAR",
        label,
        cart_items: lines,
        metadata: {
          ecosystem_from: "novion",
          email,
          brand: "novion",
          catalog_currency: isZa ? "ZAR" : "CHF",
          catalog_amount: order.total,
          zar_per_chf: rate,
        },
      }),
    });
    const data = (await response.json().catch(() => ({}))) as { data?: { checkout_url?: string } };
    if (response.ok && data.data?.checkout_url) {
      let checkoutUrl = data.data.checkout_url;
      try {
        const branded = new URL(checkoutUrl);
        branded.searchParams.set("ecosystem_from", "novion");
        branded.searchParams.set("utm_source", "novion");
        checkoutUrl = branded.toString();
      } catch {
        checkoutUrl = data.data.checkout_url;
      }
      return Response.json({ checkoutUrl, amountZar: amount, zarPerChf: rate });
    }
  }

  const query = new URLSearchParams({
    ecosystem_from: "novion",
    utm_source: "novion",
    utm_medium: "checkout",
    amount: String(amount),
    currency: "ZAR",
    label,
    return_url: returnUrl,
  });
  if (email) {
    query.set("email", email);
    query.set("login_hint", email);
  }
  if (merchantId) {
    query.set("merchant_id", merchantId);
    return Response.json({ checkoutUrl: `https://www.redfacepay.co.za/pay/${merchantId}?${query}` });
  }
  query.set("booking_id", orderId);
  return Response.json({ checkoutUrl: `https://www.redfacepay.co.za/pay?${query}` });
}
