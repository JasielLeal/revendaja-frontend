import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/:path*",
        has: [
          {
            type: "host",
            value: "(?<subdomain>.+)\\.localhost:3000",
          },
        ],
        destination: "/storeRoutes/home/:path*",
      },
    ];
  },
};

export default nextConfig;
