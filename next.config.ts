import type { NextConfig } from "next";

import packageJson from "./package.json";

const nextConfig: NextConfig = {
  env: {
    VERSION: packageJson.version,
  },
  eslint: {
    dirs: ["src"],
  },
};

export default nextConfig;
