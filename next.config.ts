import type { NextConfig } from "next";

// GitHub Pages serves this as a project site at /diago, so every asset and
// route needs that prefix — but only in the Pages build, never in local dev
// or a future custom-domain deploy, so it's gated behind the CI-only flag
// set by .github/workflows/deploy-pages.yml.
const basePath = process.env.GH_PAGES ? "/diago" : "";

const nextConfig: NextConfig = {
  output: "export",
  // Emits each route as <route>/index.html rather than <route>.html. The VPS
  // nginx vhost has no `location /` fallback and can't be given one from the
  // deploy pipeline (the deploy user is docroot-only), so routes must resolve
  // via plain directory-index lookup or a hard refresh 403s. See deploy-vps.yml.
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  basePath,
  assetPrefix: basePath,
  env: {
    // Inlined at build time so client components can prefix static asset
    // paths themselves — see src/lib/basePath.ts for why that's necessary.
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
};

export default nextConfig;
