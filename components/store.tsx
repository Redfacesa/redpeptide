"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { getProduct, getVariant, type Product } from "@/lib/catalog";

export type CartLine = { slug: string; variantId: string; qty: number };

export type Profile = { name: string; email: string };

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
  email: string;
  name: string;
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
  profile: Profile | null;
  saveProfile: (profile: Profile) => void;
  signOut: () => void;
  orders: Order[];
  placeOrder: (order: Omit<Order, "id" | "createdAt">) => Order;
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
  const [profile, setProfile] = useState<Profile | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [toast, setToast] = useState<string | null>(null);
  const [overrides, setOverrides] = useState<Record<string, { price: number; stock: number }>>({});

  useEffect(() => {
    setAgeOk(localStorage.getItem(keys.age) === "1");
    setCart(read<CartLine[]>(keys.cart, []));
    setWishlist(read<string[]>(keys.wish, []));
    setProfile(read<Profile | null>(keys.profile, null));
    setOrders(read<Order[]>(keys.orders, []));
    setReady(true);
    fetch("/api/admin")
      .then((response) => response.json())
      .then((payload) => {
        const data = payload as { rows?: { slug: string; variantId: string; price: number; stock: number }[] | null };
        const next: Record<string, { price: number; stock: number }> = {};
        for (const row of data.rows ?? []) {
          if (row.price > 0) next[`${row.slug}:${row.variantId}`] = { price: row.price, stock: row.stock };
        }
        setOverrides(next);
      })
      .catch(() => undefined);
  }, []);

  useEffect(() => {
    if (!ready) return;
    localStorage.setItem(keys.cart, JSON.stringify(cart));
    localStorage.setItem(keys.wish, JSON.stringify(wishlist));
    localStorage.setItem(keys.orders, JSON.stringify(orders));
    if (profile) localStorage.setItem(keys.profile, JSON.stringify(profile));
  }, [ready, cart, wishlist, orders, profile]);

  useEffect(() => {
    if (!toast) return;
    const timer = window.setTimeout(() => setToast(null), 2400);
    return () => window.clearTimeout(timer);
  }, [toast]);

  const api = useMemo<StoreValue>(() => {
    const liveProduct = (product: Product): Product => ({
      ...product,
      variants: product.variants.map((variant) => {
        const hit = overrides[`${product.slug}:${variant.id}`];
        return hit ? { ...variant, price: hit.price, stock: hit.stock } : variant;
      }),
    });
    return {
      ready,
      ageOk,
      liveProduct,
      confirmAge: () => {
        localStorage.setItem(keys.age, "1");
        setAgeOk(true);
      },
      cart,
      add: (slug, variantId, qty = 1) => {
        const found = getProduct(slug);
        const product = found && liveProduct(found);
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
        const found = getProduct(slug);
        const product = found && liveProduct(found);
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
      profile,
      saveProfile: (next) => {
        setProfile(next);
        setToast("Profile saved on this browser");
      },
      signOut: () => {
        setProfile(null);
        localStorage.removeItem(keys.profile);
      },
      orders,
      placeOrder: (draft) => {
        const order: Order = {
          ...draft,
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
  }, [ready, ageOk, cart, wishlist, profile, orders, toast, overrides]);

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
