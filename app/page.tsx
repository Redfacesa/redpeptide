import Link from "next/link";
import { categories } from "@/lib/catalog";
import { readMergedCatalog } from "@/lib/catalog-store";
import { ProductCard } from "@/components/product-card";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const products = await readMergedCatalog();

  return (
    <>
      <section className="hero-photo">
        <img src="/images/hero.jpg" alt="Novion Biopharma retatrutide vial and carton on a stone plinth" />
        <div className="hero-scrim">
          <div className="wrap hero-copy">
            <p className="eyebrow light">Novion Biopharma</p>
            <h1>Research compounds. Sealed and labeled.</h1>
            <p>
              Sealed vials for laboratory work. Prices follow the currency where you open the catalog.
            </p>
            <div className="actions">
              <Link className="btn light" href="/shop">View catalog</Link>
              <Link className="btn ghost" href="/quality">Quality standard</Link>
            </div>
          </div>
        </div>
      </section>

      <div className="wrap">
        <div className="trust">
          <div><strong>HPLC identity</strong><span>Method stated with the result</span></div>
          <div><strong>Cold dispatch</strong><span>Dry vials, short transit</span></div>
          <div><strong>Plain carton</strong><span>Discreet outer pack</span></div>
          <div><strong>Your currency</strong><span>Shown for the country you open from</span></div>
          <div><strong>18+ only</strong><span>Research use, not a pharmacy</span></div>
        </div>

        <section className="section">
          <div className="section-head">
            <h2>In the catalog</h2>
            <Link className="link-arrow" href="/shop">All compounds</Link>
          </div>
          <div className="cats">
            {categories.filter((category) => products.some((product) => product.category === category.id)).map((category) => (
              <Link className="cat" key={category.id} href={`/shop?cat=${category.id}`}>
                <h3>{category.name}</h3>
                <p>{category.blurb}</p>
                <p className="muted">{products.filter((product) => product.category === category.id).length} compounds</p>
              </Link>
            ))}
          </div>
        </section>

        <section className="section">
          <div className="section-head">
            <h2>Catalog</h2>
            <Link className="link-arrow" href="/shop">Filter the catalog</Link>
          </div>
          <p className="muted" style={{ marginTop: -8, marginBottom: 16 }}>{products.length} compounds, only the sizes we pack and photograph.</p>
          <div className="grid">
            {products.map((product) => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </div>
        </section>

        <section className="section photo-split">
          <img src="/images/lab.png" alt="Analytical bench with a chromatography system and a rack of vials" />
          <div>
            <p className="eyebrow">Quality</p>
            <h2>The lot number is the product.</h2>
            <p className="muted">
              Identity, chromatographic purity, and appearance are recorded against one batch code. The figures on the lab page are layout previews until a laboratory feed is connected.
            </p>
            <Link className="btn" href="/quality">Read the standard</Link>
          </div>
        </section>

        <section className="section">
          <div className="section-head">
            <h2>Journal</h2>
            <Link className="link-arrow" href="/journal">All notes</Link>
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
      </div>
    </>
  );
}
