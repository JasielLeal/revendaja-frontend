import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["revendaja.s3.amazonaws.com"],
  },
  async rewrites() {
    return [
      {
        source: "/",
        has: [
          {
            type: "host",
            value: "(?<subdomain>.+)\\.localhost:3000",
          },
        ],
        destination: "/routes/storeRoutes/store",
      },
      {
        source: "/:path*",
        has: [
          {
            type: "host",
            value: "(?<subdomain>.+)\\.localhost:3000",
          },
        ],
        destination: "/storeRoutes/store/:path*",
      },
    ];
  },
};

export default nextConfig;