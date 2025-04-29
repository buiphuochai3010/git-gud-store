import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: false,
  env: {
    PORT: process.env.PORT,
  },
};

export default nextConfig;
