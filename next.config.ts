import type { NextConfig } from "next";
import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";

const nextConfig: NextConfig = {
  // Keep production builds reliable in the small-memory hackathon environment.
  experimental: {
    cpus: 1,
  },
};

export default nextConfig;

initOpenNextCloudflareForDev();
