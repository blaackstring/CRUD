import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    // remotePatterns:[new URL("https://jsonplaceholder.typicode.com"),new URL("plus.unsplash.com")],
    domains: ["jsonplaceholder.typicode.com", "plus.unsplash.com"],
  },
};

export default nextConfig;
