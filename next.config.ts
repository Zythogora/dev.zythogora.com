import type { NextConfig } from "next";

import packageJson from "./package.json";

const nextConfig: NextConfig = {
  env: {
    VERSION: packageJson.version,
  },
  eslint: {
    dirs: ["src"],
  },

  // PostHog related
  skipTrailingSlashRedirect: true,
  async rewrites() {
    const postHogReverseProxy = "/ingest";
    const postHogHost = "https://eu.i.posthog.com";
    return [
      {
        source: `${postHogReverseProxy}/static/:path*`,
        destination: `${postHogHost}/static/:path*`,
      },
      {
        source: `${postHogReverseProxy}/:path*`,
        destination: `${postHogHost}/:path*`,
      },
      {
        source: `${postHogReverseProxy}/decide`,
        destination: `${postHogHost}/decide`,
      },
    ];
  },
};

export default nextConfig;
