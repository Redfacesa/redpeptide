import type { Product, Variant } from "@/lib/catalog";

export function ProductPhoto({
  product,
  variant,
  alt,
}: {
  product: Product;
  variant?: Variant;
  alt: string;
}) {
  const src = variant?.image || product.image;
  if (!src) {
    return (
      <div className="mark-photo">
        <span>N</span>
        <strong>{product.name}</strong>
      </div>
    );
  }
  return <img src={src} alt={alt} />;
}
