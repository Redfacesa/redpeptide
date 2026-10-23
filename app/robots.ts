import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin", "/api/", "/checkout", "/account", "/cart", "/order/"],
    },
    sitemap: "https://novion.ch/sitemap.xml",
    host: "https://novion.ch",
  };
}
