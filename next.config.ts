import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    dirs: ['app', 'components', 'utils'], // Specify directories to lint
    // During builds, treat ESLint warnings as errors (matches Vercel's behavior)
    ignoreDuringBuilds: false,
  },
};

export default nextConfig;
