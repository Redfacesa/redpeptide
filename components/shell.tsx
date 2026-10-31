"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { categories, getVariant } from "@/lib/catalog";
import { FREE_SHIPPING_AT } from "@/lib/format";
import { useMoney } from "@/components/currency";
import { ProductPhoto } from "@/components/product-photo";
import { useStore } from "@/components/store";

const links = [
  { href: "/shop", label: "Shop" },
  { href: "/quality", label: "Qualität" },
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
        <p className="eyebrow">Forschungskatalog</p>
        <h1>Diese Seite ist für Erwachsene.</h1>
        <p>Novion Biopharma listet Laborstoffe für Personen ab 18 Jahren.</p>
      </main>
    );
  }

  return (
    <>
      <div className="announce">
        Nur für die Forschung · Ab 18 Jahren
      </div>
      <header className="header">
        <div className="wrap header-row">
          <button className="icon-btn menu-btn" aria-label="Menü öffnen" onClick={() => setMenuOpen((open) => !open)}>
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
              <span>Suchen</span>
            </button>
            <button className="icon-btn search-icon" aria-label="Katalog durchsuchen" onClick={() => setSearchOpen(true)}>
              <SearchIcon />
            </button>
            <Link className="icon-btn" href="/account" aria-label="Konto">
              <UserIcon />
            </Link>
            <Link className="icon-btn" href="/wishlist" aria-label="Merkliste">
              <HeartIcon />
              {store.wishlist.length > 0 && <span className="badge">{store.wishlist.length}</span>}
            </Link>
            <button className="icon-btn" aria-label="Warenkorb öffnen" onClick={() => setCartOpen(true)}>
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
          <Link href="/contact">Kontakt</Link>
          <Link href="/help">Hilfe</Link>
        </div>
      </header>
      <main>{children}</main>
      <footer className="footer">
        <div className="wrap footer-grid">
          <div>
            <Link href="/" className="brand brand-lockup"><span className="brand-mark">N</span>Novion</Link>
            <p style={{ marginTop: 12 }}>
              Forschungsvials von Novion Biopharma, Genf. Preise in Schweizer Franken.
            </p>
          </div>
          <div>
            <h3>Katalog</h3>
            <Link href="/shop">Alle Verbindungen</Link>
            {categories.filter((category) => store.catalog.some((product) => product.category === category.id)).map((category) => (
              <Link key={category.id} href={`/shop?cat=${category.id}`}>{category.name}</Link>
            ))}
          </div>
          <div>
            <h3>Labor</h3>
            <Link href="/quality">Qualitätsstandard</Link>
            <Link href="/lab-reports">Laborberichte</Link>
            <Link href="/calculator">Konzentrationsrechner</Link>
            <Link href="/journal">Journal</Link>
          </div>
          <div>
            <h3>Unternehmen</h3>
            <Link href="/contact">Kontakt</Link>
            <Link href="/help">Hilfe</Link>
            <Link href="/legal/privacy">Datenschutz</Link>
            <Link href="/legal/terms">AGB</Link>
            <Link href="/legal/shipping">Versand</Link>
            <Link href="/legal/returns">Rückgabe</Link>
            <Link href="/legal/cookies">Cookies</Link>
            <Link href="/legal/imprint">Impressum</Link>
            <Link href="/research-use">Forschungshinweis</Link>
            <Link href="/withdraw">Widerruf</Link>
          </div>
        </div>
        <div className="wrap legal-line">
          <span>© {new Date().getFullYear()} Novion Biopharma</span>
          <span>Nur für die Laborforschung. Nicht zur Anwendung am Menschen.</span>
        </div>
      </footer>

      {store.ready && !store.ageOk && (
        <div className="overlay" role="presentation">
          <div className="modal" role="dialog" aria-modal="true" aria-labelledby="age-title">
            <p className="eyebrow">Zugang</p>
            <h2 id="age-title">Bitte bestätigen Sie, dass Sie 18 oder älter sind.</h2>
            <p className="muted" style={{ margin: "10px 0 16px" }}>
              Novion Biopharma listet Forschungsstoffe für das Labor. Der Katalog ist Erwachsenen vorbehalten und enthält keine medizinische Beratung und keine Dosierung.
            </p>
            <div className="actions">
              <button className="btn secondary" onClick={() => setBlocked(true)}>Verlassen</button>
              <button className="btn" onClick={store.confirmAge}>Katalog öffnen</button>
            </div>
          </div>
        </div>
      )}

      {cartOpen && (
        <div className="overlay" onClick={() => setCartOpen(false)}>
          <aside className="drawer" role="dialog" aria-modal="true" aria-label="Warenkorb" onClick={(event) => event.stopPropagation()}>
            <div className="row">
              <h2>Warenkorb</h2>
              <button className="icon-btn" aria-label="Warenkorb schliessen" onClick={() => setCartOpen(false)}>✕</button>
            </div>
            {lines.length === 0 ? (
              <div className="empty">Ihr Warenkorb ist leer.</div>
            ) : (
              lines.map(({ line, product, variant }) => (
                <div className="line" key={`${line.slug}-${line.variantId}`}>
                  <ProductPhoto product={product} variant={variant} alt="" />
                  <div>
                    <strong>{product.name}</strong>
                    <div className="muted">{variant.label} · {variant.sku}</div>
                    <div className="qty" style={{ marginTop: 8 }}>
                      <button aria-label="Menge verringern" onClick={() => store.setQty(line.slug, line.variantId, line.qty - 1)}>−</button>
                      <input readOnly value={line.qty} aria-label="Menge" />
                      <button aria-label="Menge erhöhen" onClick={() => store.setQty(line.slug, line.variantId, line.qty + 1)}>+</button>
                    </div>
                  </div>
                  <div className="line-side">
                    <strong>{format(variant.price * line.qty)}</strong>
                    <button className="text-btn" onClick={() => store.remove(line.slug, line.variantId)}>Entfernen</button>
                  </div>
                </div>
              ))
            )}
            <div className="row total"><span>Zwischensumme</span><strong>{format(subtotal)}</strong></div>
            <p className="muted">Der Versand wird an der Kasse berechnet. Standardversand kostenlos ab {format(FREE_SHIPPING_AT)}.</p>
            <div className="actions" style={{ marginTop: 14 }}>
              <Link className="btn secondary" href="/cart">Warenkorb</Link>
              <button className="btn" disabled={lines.length === 0} onClick={() => router.push("/checkout")}>Zur Kasse</button>
            </div>
          </aside>
        </div>
      )}

      {searchOpen && (
        <div className="overlay" onClick={() => setSearchOpen(false)}>
          <div className="modal search-modal" role="dialog" aria-modal="true" aria-label="Suche" onClick={(event) => event.stopPropagation()}>
            <input
              className="search"
              style={{ maxWidth: "none" }}
              autoFocus
              placeholder="Verbindungen suchen"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
            <div style={{ marginTop: 8 }}>
              {hits.length === 0 && <p className="muted">Keine Treffer.</p>}
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
