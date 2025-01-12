import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["revendaja.s3.amazonaws.com"],
  },
  async rewrites() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "localhost" }],
        destination: "/",
      },
      {
        source: "/:path*",
        has: [{ type: "host", value: ".*\\.localhost" }], // Subdomínios válidos como "leal.localhost"
        destination: "/routes/storeRoutes/store/:path*",
      },
    ];
  },
};

export default nextConfig;
