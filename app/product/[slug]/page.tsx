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
  return { title: product?.name ?? "Compound" };
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
  return <ProductDetail product={product} />;
}
