import type { Metadata } from "next";
import { Suspense } from "react";
import { ShopBrowser } from "@/components/shop-browser";

export const metadata: Metadata = { title: "Shop" };

export default function ShopPage() {
  return (
    <Suspense fallback={<div className="wrap pad">Loading catalog…</div>}>
      <ShopBrowser />
    </Suspense>
  );
}
