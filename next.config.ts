import type { NextConfig } from "next";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.dirname(fileURLToPath(import.meta.url));

const nextConfig: NextConfig = {
  reactStrictMode: true,
  webpack: (config) => {
    config.resolve.alias = {
      ...(typeof config.resolve.alias === "object" && !Array.isArray(config.resolve.alias) ? config.resolve.alias : {}),
      "cloudflare:workers": path.join(root, "lib/cloudflare-workers-stub.ts"),
    };
    return config;
  },
};

export default nextConfig;
