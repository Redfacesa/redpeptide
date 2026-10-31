"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { categories, getVariant } from "@/lib/catalog";
import { FREE_SHIPPING_AT } from "@/lib/format";
import { useMoney } from "@/components/currency";
import { ProductPhoto } from "@/components/product-photo";
import { useStore } from "@/components/store";
import { tx } from "@/lib/region";

const links = [
  { href: "/shop", label: "Shop" },
  { href: "/quality", label: tx("Qualität", "Quality") },
];

export function Shell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const store = useStore();
  const { format } = useMoney();
  const [cartOpen, setCartOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [blocked, setBlocked] = useState(false);

  const locked = cartOpen || searchOpen || (!store.ageOk && store.ready) || menuOpen;

  useEffect(() => {
    document.body.classList.toggle("locked", locked);
    return () => document.body.classList.remove("locked");
  }, [locked]);

  useEffect(() => {
    setCartOpen(false);
    setSearchOpen(false);
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setCartOpen(false);
        setSearchOpen(false);
        setMenuOpen(false);
      }
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setSearchOpen(true);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const hits = useMemo(() => {
    const q = query.trim().toLowerCase();
    const list = !q
      ? store.catalog.slice(0, 6)
      : store.catalog
          .filter((product) =>
            `${product.name} ${product.tagline} ${product.category}`.toLowerCase().includes(q),
          )
          .slice(0, 8);
    return list;
  }, [query, store]);

  const lines = store.cart
    .map((line) => {
      const product = store.findProduct(line.slug);
      const variant = product && getVariant(product, line.variantId);
      if (!product || !variant) return null;
      return { line, product, variant };
    })
    .filter((item): item is NonNullable<typeof item> => item !== null);

  const subtotal = lines.reduce((sum, item) => sum + item.variant.price * item.line.qty, 0);

  if (blocked) {
    return (
      <main className="wrap pad prose">
        <p className="eyebrow">{tx("Forschungskatalog", "Research catalog")}</p>
        <h1>{tx("Diese Seite ist für Erwachsene.", "This page is for adults.")}</h1>
        <p>{tx("Novion Biopharma listet Laborstoffe für Personen ab 18 Jahren.", "Novion Biopharma lists laboratory materials for people aged 18 and over.")}</p>
      </main>
    );
  }

  return (
    <>
      <div className="announce">
        {tx("Nur für die Forschung · Ab 18 Jahren", "Research use only · Ages 18 and over")}
      </div>
      <header className="header">
        <div className="wrap header-row">
          <button className="icon-btn menu-btn" aria-label={tx("Menü öffnen", "Open menu")} onClick={() => setMenuOpen((open) => !open)}>
            <MenuIcon />
          </button>
          <Link href="/" className="brand brand-lockup" aria-label="Novion Biopharma home">
            <span className="brand-mark">N</span>
            Novion
          </Link>
          <nav className="nav" aria-label="Primary">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                aria-current={pathname.startsWith(link.href) ? "page" : undefined}
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="tools">
            <button className="search-launch" onClick={() => setSearchOpen(true)}>
              <SearchIcon />
              <span>{tx("Suchen", "Search")}</span>
            </button>
            <button className="icon-btn search-icon" aria-label={tx("Katalog durchsuchen", "Search the catalog")} onClick={() => setSearchOpen(true)}>
              <SearchIcon />
            </button>
            <Link className="icon-btn" href="/account" aria-label={tx("Konto", "Account")}>
              <UserIcon />
            </Link>
            <Link className="icon-btn" href="/wishlist" aria-label={tx("Merkliste", "Wishlist")}>
              <HeartIcon />
              {store.wishlist.length > 0 && <span className="badge">{store.wishlist.length}</span>}
            </Link>
            <button className="icon-btn" aria-label={tx("Warenkorb öffnen", "Open basket")} onClick={() => setCartOpen(true)}>
              <BagIcon />
              {store.cartCount > 0 && <span className="badge">{store.cartCount}</span>}
            </button>
          </div>
        </div>
        <div className={`wrap mobile-nav ${menuOpen ? "open" : ""}`}>
          {links.map((link) => (
            <Link key={link.href} href={link.href}>
              {link.label}
            </Link>
          ))}
          <Link href="/contact">{tx("Kontakt", "Contact")}</Link>
          <Link href="/help">{tx("Hilfe", "Help")}</Link>
        </div>
      </header>
      <main>{children}</main>
      <footer className="footer">
        <div className="wrap footer-grid">
          <div>
            <Link href="/" className="brand brand-lockup"><span className="brand-mark">N</span>Novion</Link>
            <p style={{ marginTop: 12 }}>
              {tx("Forschungsvials von Novion Biopharma, Genf. Preise in Schweizer Franken.", "Research vials from Novion Biopharma. Prices in South African rand.")}
            </p>
          </div>
          <div>
            <h3>{tx("Katalog", "Catalog")}</h3>
            <Link href="/shop">{tx("Alle Verbindungen", "All compounds")}</Link>
            {categories.filter((category) => store.catalog.some((product) => product.category === category.id)).map((category) => (
              <Link key={category.id} href={`/shop?cat=${category.id}`}>{category.name}</Link>
            ))}
          </div>
          <div>
            <h3>{tx("Labor", "Laboratory")}</h3>
            <Link href="/quality">{tx("Qualitätsstandard", "Quality standard")}</Link>
            <Link href="/lab-reports">{tx("Laborberichte", "Lab reports")}</Link>
            <Link href="/calculator">{tx("Konzentrationsrechner", "Concentration calculator")}</Link>
            <Link href="/journal">{tx("Journal", "Journal")}</Link>
          </div>
          <div>
            <h3>{tx("Unternehmen", "Company")}</h3>
            <Link href="/contact">{tx("Kontakt", "Contact")}</Link>
            <Link href="/help">{tx("Hilfe", "Help")}</Link>
            <Link href="/legal/privacy">{tx("Datenschutz", "Privacy")}</Link>
            <Link href="/legal/terms">{tx("AGB", "Terms")}</Link>
            <Link href="/legal/shipping">{tx("Versand", "Shipping")}</Link>
            <Link href="/legal/returns">{tx("Rückgabe", "Returns")}</Link>
            <Link href="/legal/cookies">Cookies</Link>
            <Link href="/legal/imprint">{tx("Impressum", "Imprint")}</Link>
            <Link href="/research-use">{tx("Forschungshinweis", "Research notice")}</Link>
            <Link href="/withdraw">{tx("Widerruf", "Withdrawal")}</Link>
          </div>
        </div>
        <div className="wrap legal-line">
          <span>© {new Date().getFullYear()} Novion Biopharma</span>
          <span>{tx("Nur für die Laborforschung. Nicht zur Anwendung am Menschen.", "Laboratory research only. Not for use in people.")}</span>
        </div>
      </footer>

      {store.ready && !store.ageOk && (
        <div className="overlay" role="presentation">
          <div className="modal" role="dialog" aria-modal="true" aria-labelledby="age-title">
            <p className="eyebrow">{tx("Zugang", "Access")}</p>
            <h2 id="age-title">{tx("Bitte bestätigen Sie, dass Sie 18 oder älter sind.", "Please confirm that you are 18 or older.")}</h2>
            <p className="muted" style={{ margin: "10px 0 16px" }}>
              {tx("Novion Biopharma listet Forschungsstoffe für das Labor. Der Katalog ist Erwachsenen vorbehalten und enthält keine medizinische Beratung und keine Dosierung.", "Novion Biopharma lists research materials for the laboratory. The catalog is for adults and does not contain medical advice or dosing.")}
            </p>
            <div className="actions">
              <button className="btn secondary" onClick={() => setBlocked(true)}>{tx("Verlassen", "Leave")}</button>
              <button className="btn" onClick={store.confirmAge}>{tx("Katalog öffnen", "Open the catalog")}</button>
            </div>
          </div>
        </div>
      )}

      {cartOpen && (
        <div className="overlay" onClick={() => setCartOpen(false)}>
          <aside className="drawer" role="dialog" aria-modal="true" aria-label={tx("Warenkorb", "Basket")} onClick={(event) => event.stopPropagation()}>
            <div className="row">
              <h2>{tx("Warenkorb", "Basket")}</h2>
              <button className="icon-btn" aria-label={tx("Warenkorb schliessen", "Close basket")} onClick={() => setCartOpen(false)}>✕</button>
            </div>
            {lines.length === 0 ? (
              <div className="empty">{tx("Ihr Warenkorb ist leer.", "Your basket is empty.")}</div>
            ) : (
              lines.map(({ line, product, variant }) => (
                <div className="line" key={`${line.slug}-${line.variantId}`}>
                  <ProductPhoto product={product} variant={variant} alt="" />
                  <div>
                    <strong>{product.name}</strong>
                    <div className="muted">{variant.label} · {variant.sku}</div>
                    <div className="qty" style={{ marginTop: 8 }}>
                      <button aria-label={tx("Menge verringern", "Decrease quantity")} onClick={() => store.setQty(line.slug, line.variantId, line.qty - 1)}>−</button>
                      <input readOnly value={line.qty} aria-label={tx("Menge", "Quantity")} />
                      <button aria-label={tx("Menge erhöhen", "Increase quantity")} onClick={() => store.setQty(line.slug, line.variantId, line.qty + 1)}>+</button>
                    </div>
                  </div>
                  <div className="line-side">
                    <strong>{format(variant.price * line.qty)}</strong>
                    <button className="text-btn" onClick={() => store.remove(line.slug, line.variantId)}>{tx("Entfernen", "Remove")}</button>
                  </div>
                </div>
              ))
            )}
            <div className="row total"><span>{tx("Zwischensumme", "Subtotal")}</span><strong>{format(subtotal)}</strong></div>
            <p className="muted">{tx(`Der Versand wird an der Kasse berechnet. Standardversand kostenlos ab ${format(FREE_SHIPPING_AT)}.`, `Shipping is calculated at checkout. Free standard shipping from ${format(FREE_SHIPPING_AT)}.`)}</p>
            <div className="actions" style={{ marginTop: 14 }}>
              <Link className="btn secondary" href="/cart">{tx("Warenkorb", "Basket")}</Link>
              <button className="btn" disabled={lines.length === 0} onClick={() => router.push("/checkout")}>{tx("Zur Kasse", "Checkout")}</button>
            </div>
          </aside>
        </div>
      )}

      {searchOpen && (
        <div className="overlay" onClick={() => setSearchOpen(false)}>
          <div className="modal search-modal" role="dialog" aria-modal="true" aria-label={tx("Suche", "Search")} onClick={(event) => event.stopPropagation()}>
            <input
              className="search"
              style={{ maxWidth: "none" }}
              autoFocus
              placeholder={tx("Verbindungen suchen", "Search compounds")}
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
            <div style={{ marginTop: 8 }}>
              {hits.length === 0 && <p className="muted">{tx("Keine Treffer.", "No matches.")}</p>}
              {hits.map((product) => (
                <Link className="search-hit" key={product.slug} href={`/product/${product.slug}`}>
                  <span>
                    <strong>{product.name}</strong>
                    <span className="muted"> · {product.tagline}</span>
                  </span>
                  <span>{format(Math.min(...store.liveProduct(product).variants.map((variant) => variant.price)))}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}

      {store.toast && <div className="toast" role="status">{store.toast}</div>}
    </>
  );
}

function SearchIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <circle cx="11" cy="11" r="7" />
      <path d="M20 20l-3.5-3.5" />
    </svg>
  );
}
function UserIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <circle cx="12" cy="8" r="3.2" />
      <path d="M5 19c1.4-3 3.8-4.5 7-4.5S17.6 16 19 19" />
    </svg>
  );
}
function HeartIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M12 19s-7-4.4-7-9a4 4 0 0 1 7-2 4 4 0 0 1 7 2c0 4.6-7 9-7 9z" />
    </svg>
  );
}
function BagIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M6 8h12l-1 12H7L6 8z" />
      <path d="M9 8V7a3 3 0 0 1 6 0v1" />
    </svg>
  );
}
function MenuIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  );
}
