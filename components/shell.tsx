"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { getProduct, getVariant, products } from "@/lib/catalog";
import { money } from "@/lib/format";
import { ProductPhoto } from "@/components/product-photo";
import { useStore } from "@/components/store";

const links = [
  { href: "/shop", label: "Shop" },
  { href: "/quality", label: "Quality" },
  { href: "/lab-reports", label: "Lab reports" },
  { href: "/calculator", label: "Calculator" },
  { href: "/journal", label: "Journal" },
];

export function Shell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const store = useStore();
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
    if (!q) return products.slice(0, 6);
    return products
      .filter((product) =>
        `${product.name} ${product.tagline} ${product.category}`.toLowerCase().includes(q),
      )
      .slice(0, 8);
  }, [query]);

  const lines = store.cart
    .map((line) => {
      const product = getProduct(line.slug);
      const variant = product && getVariant(product, line.variantId);
      if (!product || !variant) return null;
      return { line, product, variant };
    })
    .filter((item): item is NonNullable<typeof item> => item !== null);

  const subtotal = lines.reduce((sum, item) => sum + item.variant.price * item.line.qty, 0);

  if (blocked) {
    return (
      <main className="wrap pad prose">
        <p className="eyebrow">Research catalog</p>
        <h1>This site is for adults.</h1>
        <p>RedPeptide lists laboratory materials for people 18 and older.</p>
      </main>
    );
  }

  return (
    <>
      <div className="announce">
        Laboratory research only · 18+ · Certificate preview on every listed batch · Sample storefront
      </div>
      <header className="header">
        <div className="wrap header-row">
          <button className="icon-btn menu-btn" aria-label="Open menu" onClick={() => setMenuOpen((open) => !open)}>
            <MenuIcon />
          </button>
          <Link href="/" className="brand" aria-label="RedPeptide home">
            RedPeptide
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
              <span>Search</span>
            </button>
            <button className="icon-btn search-icon" aria-label="Search catalog" onClick={() => setSearchOpen(true)}>
              <SearchIcon />
            </button>
            <Link className="icon-btn" href="/account" aria-label="Account">
              <UserIcon />
            </Link>
            <Link className="icon-btn" href="/wishlist" aria-label="Wishlist">
              <HeartIcon />
              {store.wishlist.length > 0 && <span className="badge">{store.wishlist.length}</span>}
            </Link>
            <button className="icon-btn" aria-label="Open cart" onClick={() => setCartOpen(true)}>
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
          <Link href="/contact">Contact</Link>
          <Link href="/help">Help</Link>
        </div>
      </header>
      <main>{children}</main>
      <footer className="footer">
        <div className="wrap footer-grid">
          <div>
            <Link href="/" className="brand">RedPeptide</Link>
            <p style={{ marginTop: 12 }}>
              Reference-style catalog for lyophilized research peptides. Company registration, payments, and live certificates come next.
            </p>
          </div>
          <div>
            <h3>Catalog</h3>
            <Link href="/shop">All compounds</Link>
            <Link href="/shop?cat=recovery">Recovery</Link>
            <Link href="/shop?cat=cognitive">Cognitive</Link>
            <Link href="/wishlist">Wishlist</Link>
          </div>
          <div>
            <h3>Laboratory</h3>
            <Link href="/quality">Quality standard</Link>
            <Link href="/lab-reports">Lab reports</Link>
            <Link href="/calculator">Concentration calculator</Link>
            <Link href="/journal">Journal</Link>
          </div>
          <div>
            <h3>Company</h3>
            <Link href="/contact">Contact</Link>
            <Link href="/help">Help</Link>
            <Link href="/legal/privacy">Privacy</Link>
            <Link href="/legal/terms">Terms</Link>
            <Link href="/legal/imprint">Imprint</Link>
            <Link href="/research-use">Research notice</Link>
          </div>
        </div>
        <div className="wrap legal-line">
          <span>© {new Date().getFullYear()} RedPeptide sample store</span>
          <span>For laboratory research only. Not for human use.</span>
        </div>
      </footer>

      {store.ready && !store.ageOk && (
        <div className="overlay" role="presentation">
          <div className="modal" role="dialog" aria-modal="true" aria-labelledby="age-title">
            <p className="eyebrow">Access notice</p>
            <h2 id="age-title">Confirm you are 18 or older.</h2>
            <p className="muted" style={{ margin: "10px 0 16px" }}>
              RedPeptide lists research peptides for laboratory use. The catalog is limited to adults and does not provide medical advice or dosing guidance.
            </p>
            <div className="actions">
              <button className="btn secondary" onClick={() => setBlocked(true)}>Leave</button>
              <button className="btn" onClick={store.confirmAge}>Enter the catalog</button>
            </div>
          </div>
        </div>
      )}

      {cartOpen && (
        <div className="overlay" onClick={() => setCartOpen(false)}>
          <aside className="drawer" role="dialog" aria-modal="true" aria-label="Cart" onClick={(event) => event.stopPropagation()}>
            <div className="row">
              <h2>Cart</h2>
              <button className="icon-btn" aria-label="Close cart" onClick={() => setCartOpen(false)}>✕</button>
            </div>
            {lines.length === 0 ? (
              <div className="empty">Your cart is empty.</div>
            ) : (
              lines.map(({ line, product, variant }) => (
                <div className="line" key={`${line.slug}-${line.variantId}`}>
                  <ProductPhoto slug={product.slug} alt="" />
                  <div>
                    <strong>{product.name}</strong>
                    <div className="muted">{variant.label} · {variant.sku}</div>
                    <div className="qty" style={{ marginTop: 8 }}>
                      <button aria-label="Decrease quantity" onClick={() => store.setQty(line.slug, line.variantId, line.qty - 1)}>−</button>
                      <input readOnly value={line.qty} aria-label="Quantity" />
                      <button aria-label="Increase quantity" onClick={() => store.setQty(line.slug, line.variantId, line.qty + 1)}>+</button>
                    </div>
                  </div>
                  <div className="line-side">
                    <strong>{money(variant.price * line.qty)}</strong>
                    <button className="text-btn" onClick={() => store.remove(line.slug, line.variantId)}>Remove</button>
                  </div>
                </div>
              ))
            )}
            <div className="row total"><span>Subtotal</span><strong>{money(subtotal)}</strong></div>
            <p className="muted">Shipping is calculated at checkout. Free standard delivery from €150.</p>
            <div className="actions" style={{ marginTop: 14 }}>
              <Link className="btn secondary" href="/cart">View cart</Link>
              <button className="btn" disabled={lines.length === 0} onClick={() => router.push("/checkout")}>Checkout</button>
            </div>
          </aside>
        </div>
      )}

      {searchOpen && (
        <div className="overlay" onClick={() => setSearchOpen(false)}>
          <div className="modal search-modal" role="dialog" aria-modal="true" aria-label="Search" onClick={(event) => event.stopPropagation()}>
            <input
              className="search"
              style={{ maxWidth: "none" }}
              autoFocus
              placeholder="Search compounds"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
            <div style={{ marginTop: 8 }}>
              {hits.length === 0 && <p className="muted">No matches.</p>}
              {hits.map((product) => (
                <Link className="search-hit" key={product.slug} href={`/product/${product.slug}`}>
                  <span>
                    <strong>{product.name}</strong>
                    <span className="muted"> · {product.tagline}</span>
                  </span>
                  <span>{money(Math.min(...product.variants.map((variant) => variant.price)))}</span>
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
