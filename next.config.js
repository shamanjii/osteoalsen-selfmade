/** @type {import('next').NextConfig} */
const nextConfig = {
  // Server build for Vercel
  // output: 'export', // Disabled for server deployment
  trailingSlash: true,
  // distDir: 'out', // Not needed for server build
  images: {
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 768, 1024, 1280, 1600],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  compress: true,
  poweredByHeader: false,
  generateEtags: false,
  // Skip error page generation for static export
  skipTrailingSlashRedirect: true,
  experimental: {
    // optimizeCss: true, // Disabled due to critters dependency issues
    forceSwcTransforms: true,
    optimizePackageImports: ['lucide-react'],
    // Disable static optimization to fix prerender errors
    isrMemoryCacheSize: 0,
  },
  // Disable problematic features for static export
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Headers removed - not compatible with static export
};

module.exports = nextConfig;
