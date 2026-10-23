const COMMERCE = process.env.REDFACE_COMMERCE_API ?? "https://bpzzgilwlkghgfkvkkxx.supabase.co/functions/v1/commerce-api";

export async function POST(request: Request) {
  const body = (await request.json()) as {
    amount?: number;
    label?: string;
    email?: string;
    returnUrl?: string;
    orderId?: string;
    lines?: unknown;
  };
  const amount = Number(body.amount);
  const label = String(body.label || "Novion Biopharma order").slice(0, 80);
  const orderId = String(body.orderId || label).replace(/\s+/g, "-").slice(0, 48);
  const email = String(body.email || "");
  const returnUrl = String(body.returnUrl || "https://novion.ch/account");
  const merchantId = process.env.NOVION_MERCHANT_ID || "";
  const apiKey = process.env.REDFACE_API_KEY || "";

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
        cart_items: body.lines ?? [],
        metadata: { ecosystem_from: "novion", email, brand: "novion" },
      }),
    });
    const data = (await response.json().catch(() => ({}))) as { data?: { checkout_url?: string } };
    if (response.ok && data.data?.checkout_url) {
      return Response.json({ checkoutUrl: data.data.checkout_url });
    }
  }

  const query = new URLSearchParams({
    ecosystem_from: "novion",
    utm_source: "novion",
    utm_medium: "checkout",
    amount: String(Math.round(amount)),
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
