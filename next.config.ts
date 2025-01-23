import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["revendaja.s3.amazonaws.com"],
  },
  experimental: {
    middlewarePrefetch: 'flexible',
  }
};

export default nextConfig;
