import { supabasePublishableKey, supabaseUrl } from "@/lib/supabase-public";

export const customerTokenKey = "nv-customer-token";

export type CustomerSession = { token: string; email: string; name: string };

const headers = {
  "Content-Type": "application/json",
  apikey: supabasePublishableKey,
  Authorization: `Bearer ${supabasePublishableKey}`,
};

type AuthUser = { email?: string; user_metadata?: { name?: string } };

export async function requestCustomerSession(email: string, password: string): Promise<CustomerSession | { error: string }> {
  const response = await fetch(`${supabaseUrl}/auth/v1/token?grant_type=password`, {
    method: "POST",
    headers,
    body: JSON.stringify({ email, password }),
  });
  const data = (await response.json().catch(() => ({}))) as { access_token?: string; user?: AuthUser };
  if (!response.ok || !data.access_token || !data.user?.email) {
    return { error: "Those details were not accepted." };
  }
  return {
    token: data.access_token,
    email: data.user.email,
    name: data.user.user_metadata?.name || "",
  };
}

export async function requestCustomerAccount(
  name: string,
  email: string,
  password: string,
): Promise<CustomerSession | { error: string } | { confirm: true }> {
  const response = await fetch(`${supabaseUrl}/auth/v1/signup`, {
    method: "POST",
    headers,
    body: JSON.stringify({ email, password, data: { name } }),
  });
  const data = (await response.json().catch(() => ({}))) as {
    access_token?: string;
    user?: AuthUser;
    msg?: string;
    message?: string;
    error_code?: string;
  };
  if (data.access_token && data.user?.email) {
    return { token: data.access_token, email: data.user.email, name };
  }
  const detail = `${data.error_code || ""} ${data.msg || ""} ${data.message || ""}`.toLowerCase();
  if (detail.includes("already")) return { error: "That email already has an account. Sign in instead." };
  if (!response.ok) return { error: "The account could not be created. Use at least 8 characters and try again." };
  return { confirm: true };
}

export async function readCustomer(token: string): Promise<{ email: string; name: string } | null> {
  const response = await fetch(`${supabaseUrl}/auth/v1/user`, {
    headers: { apikey: supabasePublishableKey, Authorization: `Bearer ${token}` },
  });
  if (!response.ok) return null;
  const user = (await response.json()) as AuthUser;
  if (!user.email) return null;
  return { email: user.email, name: user.user_metadata?.name || "" };
}
