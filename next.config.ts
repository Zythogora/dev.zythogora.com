import createNextIntlPlugin from "next-intl/plugin";

import type { NextConfig } from "next";

const withNextIntl = createNextIntlPlugin("./src/lib/i18n/index.ts");

const nextConfig: NextConfig = withNextIntl({
  images: {
    remotePatterns: [
      {
        hostname: "storage.ko-fi.com",
        protocol: "https",
        pathname: "/cdn/**",
      },
    ],
  },
});

export default nextConfig;
