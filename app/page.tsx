import Link from "next/link";
import { articles, categories } from "@/lib/catalog";
import { readMergedCatalog } from "@/lib/catalog-store";
import { ProductCard } from "@/components/product-card";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const products = await readMergedCatalog();

  return (
    <>
      <section className="hero">
        <div className="wrap hero-grid">
          <div className="hero-copy">
            <p className="eyebrow">Novion Biopharma · Geneva</p>
            <h1>Research compounds. Sealed and labeled.</h1>
            <p>
              Sealed vials for laboratory work. Prices follow the currency where you open the catalog.
            </p>
            <div className="actions">
              <Link className="btn" href="/shop">View catalog</Link>
              <Link className="btn secondary" href="/quality">Quality standard</Link>
            </div>
          </div>
          <figure className="hero-stage">
            <img src="/images/hero.jpg" alt="Novion retatrutide 10 mg vial and carton" />
          </figure>
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
            {articles.map((article) => (
              <Link className="story" key={article.slug} href={`/journal/${article.slug}`}>
                <p className="eyebrow">{article.kicker}</p>
                <h3>{article.title}</h3>
                <p>{article.excerpt}</p>
                <span className="date">{article.date}</span>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
