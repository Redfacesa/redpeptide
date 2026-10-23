import { supabasePublishableKey, supabaseUrl } from "@/lib/supabase-public";

const catalogAccount = "info@redfacepay.co.za";

export async function fetchUser(request: Request): Promise<{ email: string; name: string } | null> {
  const header = request.headers.get("authorization") || "";
  const token = header.replace(/^Bearer\s+/i, "").trim();
  if (!token) return null;
  const response = await fetch(`${supabaseUrl}/auth/v1/user`, {
    headers: {
      apikey: supabasePublishableKey,
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) return null;
  const user = (await response.json()) as { email?: string; user_metadata?: { name?: string } };
  if (!user.email) return null;
  return { email: user.email, name: user.user_metadata?.name || "" };
}

export async function requireCatalogEditor(request: Request): Promise<{ ok: true } | { ok: false; status: number; message: string }> {
  const user = await fetchUser(request);
  if (!user) return { ok: false, status: 401, message: "Sign in to update the catalog." };
  if (user.email.toLowerCase() !== catalogAccount) {
    return { ok: false, status: 403, message: "This account cannot edit the catalog." };
  }
  return { ok: true };
}

export function isCatalogEditor(email: string) {
  return email.toLowerCase() === catalogAccount;
}
