"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { categories, inStock, type CategoryId } from "@/lib/catalog";
import { ProductCard } from "@/components/product-card";
import { useStore } from "@/components/store";

const sorts = [
  { id: "featured", label: "Empfohlen" },
  { id: "name", label: "Name" },
  { id: "price-asc", label: "Preis aufsteigend" },
  { id: "price-desc", label: "Preis absteigend" },
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
    let list = store.catalog.filter((product) => {
      const categoryOk = category === "all" || product.category === category;
      const textOk = !q || `${product.name} ${product.tagline} ${product.summary}`.toLowerCase().includes(q);
      const stockOk = !availableOnly || inStock(product);
      return categoryOk && textOk && stockOk;
    });
    list = [...list].sort((a, b) => {
      if (sort === "name") return a.name.localeCompare(b.name, "de");
      if (sort === "price-asc") return Math.min(...a.variants.map((v) => v.price)) - Math.min(...b.variants.map((v) => v.price));
      if (sort === "price-desc") return Math.min(...b.variants.map((v) => v.price)) - Math.min(...a.variants.map((v) => v.price));
      return Number(Boolean(b.featured)) - Number(Boolean(a.featured));
    });
    return list;
  }, [category, query, sort, availableOnly, store]);

  const visible = categories.filter((item) => store.catalog.some((product) => product.category === item.id));

  return (
    <div className="wrap storefront">
      <div className="store-head">
        <h1>Shop</h1>
        <span className="muted">{items.length} Verbindungen</span>
      </div>
      <div className="chip-rail" aria-label="Kategorien">
        <button className={`chip ${category === "all" ? "on" : ""}`} onClick={() => chooseCategory("all")}>Alle</button>
        {visible.map((item) => (
          <button
            key={item.id}
            className={`chip ${category === item.id ? "on" : ""}`}
            onClick={() => chooseCategory(item.id as CategoryId)}
          >
            {item.name}
          </button>
        ))}
      </div>
      <div className="toolbar">
        <input className="search" placeholder="Suchen" value={query} onChange={(event) => setQuery(event.target.value)} aria-label="Katalog durchsuchen" />
        <select className="field" style={{ width: "auto" }} value={sort} onChange={(event) => setSort(event.target.value as typeof sort)} aria-label="Sortierung">
          {sorts.map((item) => (
            <option key={item.id} value={item.id}>{item.label}</option>
          ))}
        </select>
        <label className="check">
          <input type="checkbox" checked={availableOnly} onChange={(event) => setAvailableOnly(event.target.checked)} />
          Auf Lager
        </label>
      </div>
      {items.length === 0 ? (
        <div className="empty">Nichts passt zu dieser Auswahl.</div>
      ) : (
        <div className="grid">
          {items.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
