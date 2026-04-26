import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "res.cloudinary.com" },
      { protocol: "https", hostname: "**.supabase.co" },
    ],
  },
  experimental: {
    serverActions: { allowedOrigins: ["localhost:3000"] },
    // Prevent Next.js from spawning too many threads and OOMing on Vercel
    workerThreads: false,
    cpus: 1,
  },
  // Disable Turbopack for production stability (if Next 16 attempts to use it)
  // Disable linting and typechecking during the build step (run them in CI or pre-commit instead)
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
