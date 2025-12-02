import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["revendaja.s3.amazonaws.com", "images.unsplash.com", "revendaja.s3.us-east-2.amazonaws.com"],
  },
  allowedDevOrigins: [
    "www.*.localhost:3000",
    "www.lealperfumaria.localhost",
    "www.*.localhost",

    // adicione aqui outros subdomínios que usar
  ],
};

export default nextConfig;
