import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  experimental: {
    serverActions: {
      bodySizeLimit: "500mb", // Erlaubt Video-Uploads bis zu 500 MB
    },
  },
};

export default nextConfig;