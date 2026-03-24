import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      allowedOrigins: ["localhost:3000"],
    },
  },

  transpilePackages: ["shared"],
  reactCompiler: true,
};

export default nextConfig;
