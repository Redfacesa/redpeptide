"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { getVariant, products, type Product } from "@/lib/catalog";
import { customerTokenKey, readCustomer, requestCustomerAccount, requestCustomerSession } from "@/lib/customer-auth";
import type { Order } from "@/lib/order";

export type { Order } from "@/lib/order";

export type CartLine = { slug: string; variantId: string; qty: number };

export type Profile = { name: string; email: string };

type StoreValue = {
  ready: boolean;
  ageOk: boolean;
  confirmAge: () => void;
  cart: CartLine[];
  add: (slug: string, variantId: string, qty?: number) => void;
  setQty: (slug: string, variantId: string, qty: number) => void;
  remove: (slug: string, variantId: string) => void;
  clearCart: () => void;
  wishlist: string[];
  toggleWish: (slug: string) => void;
  wished: (slug: string) => boolean;
  token: string | null;
  profile: Profile | null;
  saveProfile: (profile: Profile) => void;
  signInCustomer: (email: string, password: string) => Promise<string | null>;
  signUpCustomer: (name: string, email: string, password: string) => Promise<string | null>;
  signOut: () => void;
  orders: Order[];
  rememberOrder: (order: Order) => void;
  placeOrder: (order: Omit<Order, "id" | "createdAt" | "status">) => Order;
  catalog: Product[];
  findProduct: (slug: string) => Product | undefined;
  liveProduct: (product: Product) => Product;
  toast: string | null;
  cartCount: number;
};

const StoreContext = createContext<StoreValue | null>(null);

const keys = {
  age: "rp-age",
  cart: "rp-cart",
  wish: "rp-wish",
  profile: "rp-profile",
  orders: "rp-orders",
};

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [ready, setReady] = useState(false);
  const [ageOk, setAgeOk] = useState(true);
  const [cart, setCart] = useState<CartLine[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [token, setToken] = useState<string | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [toast, setToast] = useState<string | null>(null);
  const [catalog, setCatalog] = useState<Product[]>(products);

  useEffect(() => {
    setAgeOk(localStorage.getItem(keys.age) === "1");
    setCart(read<CartLine[]>(keys.cart, []));
    setWishlist(read<string[]>(keys.wish, []));
    const savedToken = localStorage.getItem(customerTokenKey);
    const savedOrders = read<Order[]>(keys.orders, []).map((order) => ({ ...order, status: order.status || "pending" }));
    setOrders(savedOrders);
    if (savedToken) {
      setToken(savedToken);
      readCustomer(savedToken).then(async (user) => {
        if (!user) {
          localStorage.removeItem(customerTokenKey);
          setToken(null);
          return;
        }
        setProfile({ name: user.name, email: user.email });
        const response = await fetch("/api/orders", { headers: { Authorization: `Bearer ${savedToken}` } });
        const data = (await response.json().catch(() => ({}))) as { orders?: Order[] };
        if (response.ok && data.orders) setOrders(data.orders);
      });
    }
    setReady(true);
    fetch("/api/admin")
      .then((response) => response.json())
      .then((payload) => {
        const data = payload as { products?: Product[] };
        if (data.products?.length) setCatalog(data.products);
      })
      .catch(() => undefined);
  }, []);

  useEffect(() => {
    if (!ready) return;
    localStorage.setItem(keys.cart, JSON.stringify(cart));
    localStorage.setItem(keys.wish, JSON.stringify(wishlist));
    localStorage.setItem(keys.orders, JSON.stringify(orders));
    if (profile) localStorage.setItem(keys.profile, JSON.stringify(profile));
    else localStorage.removeItem(keys.profile);
  }, [ready, cart, wishlist, orders, profile]);

  useEffect(() => {
    if (!toast) return;
    const timer = window.setTimeout(() => setToast(null), 2400);
    return () => window.clearTimeout(timer);
  }, [toast]);

  const api = useMemo<StoreValue>(() => {
    const findProduct = (slug: string) => catalog.find((product) => product.slug === slug);
    const liveProduct = (product: Product) => findProduct(product.slug) ?? product;
    return {
      ready,
      ageOk,
      catalog,
      findProduct,
      liveProduct,
      confirmAge: () => {
        localStorage.setItem(keys.age, "1");
        setAgeOk(true);
      },
      cart,
      add: (slug, variantId, qty = 1) => {
        const product = findProduct(slug);
        const variant = product && getVariant(product, variantId);
        if (!product || !variant) return;
        if (variant.stock <= 0) {
          setToast(`${product.name} ${variant.label} is out of stock`);
          return;
        }
        setCart((current) => {
          const next = [...current];
          const index = next.findIndex(
            (line) => line.slug === slug && line.variantId === variantId,
          );
          const existing = index >= 0 ? next[index].qty : 0;
          const desired = Math.min(variant.stock, existing + qty);
          if (index >= 0) next[index] = { slug, variantId, qty: desired };
          else next.push({ slug, variantId, qty: desired });
          return next;
        });
        setToast(`${product.name} ${variant.label} added to cart`);
      },
      setQty: (slug, variantId, qty) => {
        const product = findProduct(slug);
        const variant = product && getVariant(product, variantId);
        const capped = variant ? Math.min(variant.stock, qty) : qty;
        setCart((current) =>
          capped <= 0
            ? current.filter(
                (line) => !(line.slug === slug && line.variantId === variantId),
              )
            : current.map((line) =>
                line.slug === slug && line.variantId === variantId
                  ? { ...line, qty: capped }
                  : line,
              ),
        );
      },
      remove: (slug, variantId) => {
        setCart((current) =>
          current.filter((line) => !(line.slug === slug && line.variantId === variantId)),
        );
      },
      clearCart: () => {
        setCart([]);
      },
      wishlist,
      toggleWish: (slug) => {
        setWishlist((current) =>
          current.includes(slug) ? current.filter((item) => item !== slug) : [...current, slug],
        );
      },
      wished: (slug) => wishlist.includes(slug),
      token,
      profile,
      saveProfile: (next) => {
        setProfile(next);
        setToast("Profile saved on this browser");
      },
      signInCustomer: async (email, password) => {
        const session = await requestCustomerSession(email, password);
        if ("error" in session) return session.error;
        localStorage.setItem(customerTokenKey, session.token);
        setToken(session.token);
        setProfile({ name: session.name, email: session.email });
        const response = await fetch("/api/orders", { headers: { Authorization: `Bearer ${session.token}` } });
        const data = (await response.json().catch(() => ({}))) as { orders?: Order[] };
        if (response.ok && data.orders) setOrders(data.orders);
        return null;
      },
      signUpCustomer: async (name, email, password) => {
        const session = await requestCustomerAccount(name, email, password);
        if ("error" in session) return session.error;
        if ("confirm" in session) return "Check your email to confirm the account, then sign in.";
        localStorage.setItem(customerTokenKey, session.token);
        setToken(session.token);
        setProfile({ name: session.name, email: session.email });
        return null;
      },
      signOut: () => {
        setProfile(null);
        setToken(null);
        localStorage.removeItem(customerTokenKey);
        localStorage.removeItem(keys.profile);
      },
      orders,
      rememberOrder: (order) => {
        setOrders((current) => [order, ...current.filter((item) => item.id !== order.id)]);
      },
      placeOrder: (draft) => {
        const order: Order = {
          ...draft,
          status: "pending",
          id: `NV-${Math.floor(10000 + Math.random() * 90000)}`,
          createdAt: new Date().toISOString(),
        };
        setOrders((current) => [order, ...current]);
        setCart([]);
        return order;
      },
      toast,
      cartCount: cart.reduce((sum, line) => sum + line.qty, 0),
    };
  }, [ready, ageOk, cart, wishlist, profile, orders, toast, catalog, token]);

  return <StoreContext.Provider value={api}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const value = useContext(StoreContext);
  if (!value) throw new Error("useStore must be used within StoreProvider");
  return value;
}

function read<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}
