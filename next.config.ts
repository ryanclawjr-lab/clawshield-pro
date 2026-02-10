import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // output: 'export', // REMOVED - needed for server functions
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
};

export default nextConfig;
