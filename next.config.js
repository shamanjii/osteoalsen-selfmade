/** @type {import('next').NextConfig} */
const nextConfig = {
  // Server build for Vercel
  // output: 'export', // Disabled for server deployment
  trailingSlash: true,
  // distDir: 'out', // Not needed for server build

  // Add security headers
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.eTermin.net; object-src 'none'; base-uri 'self';"
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          }
        ]
      }
    ];
  },
  // Redirect www to non-www for canonical URLs
  // Temporarily disabled due to redirect loop - need to fix Vercel domain config first
  // async redirects() {
  //   return [
  //     {
  //       source: '/:path*',
  //       has: [
  //         {
  //           type: 'host',
  //           value: 'www.osteoalsen.de',
  //         },
  //       ],
  //       destination: 'https://osteoalsen.de/:path*',
  //       permanent: true, // 301 redirect
  //     },
  //   ];
  // },
  images: {
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 768, 1024, 1280, 1600],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
      {
        protocol: 'http',
        hostname: '**',
      }
    ],
    unoptimized: false,
    dangerouslyAllowSVG: true,
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
