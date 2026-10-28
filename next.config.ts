import type { NextConfig } from "next";
import path from "path";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
const pages = process.env.GITHUB_PAGES === "1";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  devIndicators: false,
  // Keep tracing inside this package when nested under another repo checkout
  outputFileTracingRoot: path.join(__dirname),
  ...(pages
    ? {
        output: "export" as const,
        basePath,
        assetPrefix: basePath,
        trailingSlash: true,
        images: { unoptimized: true },
      }
    : {}),
};

export default nextConfig;
