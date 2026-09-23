import { productImage } from "@/lib/images";

export function ProductPhoto({
  slug,
  alt,
}: {
  slug: string;
  alt: string;
}) {
  return <img src={productImage(slug)} alt={alt} />;
}
