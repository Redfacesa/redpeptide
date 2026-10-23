import { supabasePublishableKey, supabaseUrl } from "@/lib/supabase-public";

const catalogAccount = "info@redfacepay.co.za";

export async function requireCatalogEditor(request: Request): Promise<{ ok: true } | { ok: false; status: number; message: string }> {
  const header = request.headers.get("authorization") || "";
  const token = header.replace(/^Bearer\s+/i, "").trim();
  if (!token) {
    return { ok: false, status: 401, message: "Sign in to update the catalog." };
  }
  const response = await fetch(`${supabaseUrl}/auth/v1/user`, {
    headers: {
      apikey: supabasePublishableKey,
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    return { ok: false, status: 401, message: "That sign-in is no longer valid." };
  }
  const user = (await response.json()) as { email?: string };
  if ((user.email || "").toLowerCase() !== catalogAccount) {
    return { ok: false, status: 403, message: "This account cannot edit the catalog." };
  }
  return { ok: true };
}
