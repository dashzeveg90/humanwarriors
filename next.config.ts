import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      // News stories can upload several photos (up to 5MB each) at once.
      bodySizeLimit: "50mb",
    },
  },
};

export default nextConfig;
