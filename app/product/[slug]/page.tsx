import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { products } from "@/lib/catalog";
import { readMergedCatalog } from "@/lib/catalog-store";
import { ProductDetail } from "@/components/product-detail";

export const dynamic = "force-dynamic";

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const catalog = await readMergedCatalog();
  const product = catalog.find((item) => item.slug === slug);
  if (!product) return { title: "Compound" };
  return {
    title: product.name,
    description: product.summary,
    openGraph: {
      title: `${product.name} · Novion Biopharma`,
      description: product.summary,
      images: product.image ? [product.image] : undefined,
    },
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const catalog = await readMergedCatalog();
  const product = catalog.find((item) => item.slug === slug);
  if (!product) notFound();
  const offer = product.variants[0];
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.summary,
    image: product.image ? `https://novion.ch${product.image}` : undefined,
    sku: offer?.sku,
    brand: { "@type": "Brand", name: "Novion Biopharma" },
    offers: {
      "@type": "AggregateOffer",
      priceCurrency: "CHF",
      lowPrice: (Math.min(...product.variants.map((variant) => variant.price)) * 0.049).toFixed(2),
      highPrice: (Math.max(...product.variants.map((variant) => variant.price)) * 0.049).toFixed(2),
      offerCount: product.variants.length,
      availability: product.variants.some((variant) => variant.stock > 0)
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
      url: `https://novion.ch/product/${product.slug}`,
    },
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <ProductDetail product={product} />
    </>
  );
}
