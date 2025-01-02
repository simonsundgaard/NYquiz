import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    domains: [],
    unoptimized: true
  },
};

export default nextConfig;
