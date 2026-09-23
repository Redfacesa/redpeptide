import Link from "next/link";
import { categories, products } from "@/lib/catalog";
import { money } from "@/lib/format";
import { ProductCard } from "@/components/product-card";
import { Vial } from "@/components/vial";

export default function HomePage() {
  const featured = products.filter((product) => product.featured);
  const spotlight = products.find((product) => product.slug === "bpc-157")!;

  return (
    <div className="wrap">
      <section className="hero">
        <div className="hero-grid">
          <div>
            <p className="eyebrow">EU research catalog</p>
            <h1>Peptides held to a laboratory standard.</h1>
            <p className="lede">
              Lyophilized compounds for analytical and in-vitro work. A size, a purity specification, and a certificate slot on every batch — the structure of a real supplier, before payments go live.
            </p>
            <div className="actions">
              <Link className="btn" href="/shop">Browse the catalog</Link>
              <Link className="btn secondary" href="/quality">Quality standard</Link>
            </div>
          </div>
          <div className="stage">
            <div>
              <p className="stage-kicker">Featured lot</p>
              <h2>{spotlight.name}</h2>
              <p>{spotlight.tagline}. From {money(Math.min(...spotlight.variants.map((variant) => variant.price)))}.</p>
              <div className="stage-meta">
                <div><strong>5–10 mg</strong>Vial sizes</div>
                <div><strong>≥99%</strong>HPLC spec</div>
              </div>
              <div className="actions" style={{ marginTop: 22 }}>
                <Link className="btn light" href={`/product/${spotlight.slug}`}>View compound</Link>
              </div>
            </div>
            <Vial tone="#e7b4bc" code={spotlight.code} />
          </div>
        </div>
        <div className="trust">
          <div><strong>HPLC identity</strong>Purity is a method, not a slogan.</div>
          <div><strong>Cold dispatch</strong>Dry vials, short transit.</div>
          <div><strong>Discreet pack</strong>Plain outer carton.</div>
          <div><strong>EU, CH, UK</strong>Coverage in the sample checkout.</div>
          <div><strong>18+ only</strong>Research use, not a pharmacy.</div>
        </div>
      </section>

      <section className="section">
        <div className="section-head">
          <div>
            <p className="eyebrow">01 — Ranges</p>
            <h2>Shop by research area</h2>
          </div>
        </div>
        <div className="cats">
          {categories.map((category) => (
            <Link className="cat" key={category.id} href={`/shop?cat=${category.id}`}>
              <span className="swatch" style={{ background: category.tone }} />
              <div>
                <h3>{category.name}</h3>
                <p>{category.blurb}</p>
                <p>{products.filter((product) => product.category === category.id).length} compounds</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="section-head">
          <div>
            <p className="eyebrow">02 — Catalog</p>
            <h2>Featured peptides</h2>
          </div>
          <Link className="link-arrow" href="/shop">View all compounds →</Link>
        </div>
        <div className="grid">
          {featured.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      </section>

      <section className="section">
        <div className="band">
          <div>
            <p className="eyebrow" style={{ color: "#e7c2a2" }}>03 — Standard</p>
            <h2>No compound ships as a story without a lot number.</h2>
            <p>
              The quality page describes the checks this catalog is built around: identity, chromatographic purity, appearance, and a certificate tied to the vial. The numbers on the lab page are previews until a real lab feed is connected.
            </p>
            <div className="actions" style={{ marginTop: 18 }}>
              <Link className="btn light" href="/quality">Read the standard</Link>
            </div>
          </div>
          <div className="stats">
            <div className="stat"><strong>Lot-matched</strong>Certificate and vial share one code.</div>
            <div className="stat"><strong>Dry fill</strong>Lyophilized solid. Solvent is not included.</div>
            <div className="stat"><strong>−20 °C</strong>Storage after the parcel is opened.</div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section-head">
          <div>
            <p className="eyebrow">04 — Journal</p>
            <h2>Notes from the bench</h2>
          </div>
          <Link className="link-arrow" href="/journal">All notes →</Link>
        </div>
        <div className="news">
          <Link className="story" href="/journal/what-a-coa-reports">
            <p className="eyebrow">Quality</p>
            <h3>What a certificate actually reports</h3>
            <p>A purity percentage is one line. Identity and method sit beside it.</p>
            <span className="date">12 March 2026</span>
          </Link>
          <Link className="story" href="/journal/cold-chain-lyophilized">
            <p className="eyebrow">Dispatch</p>
            <h3>Why dry vials still travel cold</h3>
            <span className="date">2 March 2026</span>
          </Link>
          <Link className="story" href="/journal/reading-a-batch-number">
            <p className="eyebrow">Laboratory</p>
            <h3>Read the batch number first</h3>
            <span className="date">18 February 2026</span>
          </Link>
        </div>
      </section>

      <section className="cta">
        <h2>Ready to look through the catalog?</h2>
        <Link className="btn" href="/shop">Open the shop</Link>
      </section>
    </div>
  );
}
