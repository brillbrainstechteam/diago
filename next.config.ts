import type { NextConfig } from "next";

// GitHub Pages serves this as a project site at /diago, so every asset and
// route needs that prefix — but only in the Pages build, never in local dev
// or a future custom-domain deploy, so it's gated behind the CI-only flag
// set by .github/workflows/deploy-pages.yml.
const basePath = process.env.GH_PAGES ? "/diago" : "";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  basePath,
  assetPrefix: basePath,
};

export default nextConfig;
