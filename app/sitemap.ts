import type { MetadataRoute } from "next";
import { products } from "@/lib/catalog";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://novion.ch";
  const paths = [
    "",
    "/shop",
    "/quality",
    "/lab-reports",
    "/research-use",
    "/contact",
    "/help",
    "/journal",
    "/legal/privacy",
    "/legal/terms",
    "/legal/shipping",
    "/legal/returns",
    "/legal/cookies",
    "/legal/imprint",
    "/withdraw",
  ];
  return [
    ...paths.map((path) => ({
      url: `${base}${path || "/"}`,
      changeFrequency: "weekly" as const,
      priority: path === "" ? 1 : 0.6,
    })),
    ...products.map((product) => ({
      url: `${base}/product/${product.slug}`,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
  ];
}
