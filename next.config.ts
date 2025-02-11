import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  eslint: {
    dirs: ["components", "lib", "pages", "public"],
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
