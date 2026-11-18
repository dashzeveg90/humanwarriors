import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Always put <meta> tags (Open Graph etc.) in <head> instead of
  // streaming them into <body>, so every social-media link preview
  // crawler finds the shared story's own image.
  htmlLimitedBots: /.*/,
  experimental: {
    serverActions: {
      // News stories can upload several photos (up to 5MB each) at once.
      bodySizeLimit: "50mb",
    },
  },
};

export default nextConfig;
