import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns:[new URL("randomuser.me"),new URL("plus.unsplash.com")],
  },
};

export default nextConfig;
