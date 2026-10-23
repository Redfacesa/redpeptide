"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { categories, inStock, products, type CategoryId } from "@/lib/catalog";
import { ProductCard } from "@/components/product-card";
import { useStore } from "@/components/store";

const sorts = [
  { id: "featured", label: "Featured" },
  { id: "name", label: "Name" },
  { id: "price-asc", label: "Price, low" },
  { id: "price-desc", label: "Price, high" },
] as const;

export function ShopBrowser() {
  const params = useSearchParams();
  const router = useRouter();
  const store = useStore();
  const [category, setCategory] = useState(params.get("cat") ?? "all");
  const [query, setQuery] = useState(params.get("q") ?? "");
  const [sort, setSort] = useState<(typeof sorts)[number]["id"]>("featured");
  const [availableOnly, setAvailableOnly] = useState(false);

  useEffect(() => {
    setCategory(params.get("cat") ?? "all");
  }, [params]);

  function chooseCategory(id: string) {
    setCategory(id);
    const next = new URLSearchParams(params.toString());
    if (id === "all") next.delete("cat");
    else next.set("cat", id);
    const search = next.toString();
    router.replace(search ? `/shop?${search}` : "/shop", { scroll: false });
  }

  const items = useMemo(() => {
    const q = query.trim().toLowerCase();
    let list = products.map((product) => store.liveProduct(product)).filter((product) => {
      const categoryOk = category === "all" || product.category === category;
      const textOk = !q || `${product.name} ${product.tagline} ${product.summary}`.toLowerCase().includes(q);
      const stockOk = !availableOnly || inStock(product);
      return categoryOk && textOk && stockOk;
    });
    list = [...list].sort((a, b) => {
      if (sort === "name") return a.name.localeCompare(b.name);
      if (sort === "price-asc") return Math.min(...a.variants.map((v) => v.price)) - Math.min(...b.variants.map((v) => v.price));
      if (sort === "price-desc") return Math.min(...b.variants.map((v) => v.price)) - Math.min(...a.variants.map((v) => v.price));
      return Number(Boolean(b.featured)) - Number(Boolean(a.featured));
    });
    return list;
  }, [category, query, sort, availableOnly, store]);

  return (
    <div className="wrap pad">
      <div className="page-title">
        <p className="eyebrow">Catalog</p>
        <h1>Research peptides</h1>
        <p className="lede">Lyophilized compounds sold by vial size. The price list is in South African rand and shown in the currency for the country you opened the site from.</p>
      </div>
      <div className="layout">
        <aside className="filters">
          <h2>Category</h2>
          <button className={`chip ${category === "all" ? "on" : ""}`} onClick={() => chooseCategory("all")}>All</button>
          {categories.map((item) => (
            <button
              key={item.id}
              className={`chip ${category === item.id ? "on" : ""}`}
              onClick={() => chooseCategory(item.id as CategoryId)}
            >
              {item.name}
            </button>
          ))}
          <h2>Availability</h2>
          <label className="check">
            <input type="checkbox" checked={availableOnly} onChange={(event) => setAvailableOnly(event.target.checked)} />
            In stock only
          </label>
        </aside>
        <div>
          <div className="toolbar">
            <input className="search" placeholder="Search the catalog" value={query} onChange={(event) => setQuery(event.target.value)} />
            <select className="field" style={{ width: "auto" }} value={sort} onChange={(event) => setSort(event.target.value as typeof sort)} aria-label="Sort">
              {sorts.map((item) => (
                <option key={item.id} value={item.id}>{item.label}</option>
              ))}
            </select>
            <span className="muted">{items.length} compounds</span>
          </div>
          {items.length === 0 ? (
            <div className="empty">Nothing matches those filters.</div>
          ) : (
            <div className="grid">
              {items.map((product) => (
                <ProductCard key={product.slug} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
