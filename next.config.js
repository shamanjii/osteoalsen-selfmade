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
            value: "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.eTermin.net https://www.googletagmanager.com https://www.google-analytics.com https://ssl.google-analytics.com https://eu-assets.i.posthog.com; object-src 'none'; base-uri 'self'; connect-src 'self' https://www.google-analytics.com https://analytics.google.com https://www.googletagmanager.com https://*.google-analytics.com https://region1.google-analytics.com https://eu.i.posthog.com https://eu-assets.i.posthog.com; img-src 'self' data: https: blob:;"
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
    formats: ['image/avif', 'image/webp'], // PERFORMANCE: AVIF first (better compression)
    deviceSizes: [640, 750, 828, 1080, 1200, 1920], // PERFORMANCE: Optimized for real device sizes
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
    minimumCacheTTL: 31536000, // PERFORMANCE: Cache images for 1 year
    contentDispositionType: 'inline', // PERFORMANCE: Faster image rendering
  },
  compress: true,
  poweredByHeader: false,
  generateEtags: true, // PERFORMANCE: Enable ETags for better browser caching
  // Skip error page generation for static export
  skipTrailingSlashRedirect: true,
  experimental: {
    // optimizeCss: true, // Disabled due to critters dependency issues
    optimizePackageImports: ['lucide-react', 'react', 'react-dom'], // PERFORMANCE: Tree-shake React
    webpackBuildWorker: true, // PERFORMANCE: Faster builds with workers
    serverMinification: true, // PERFORMANCE: Minify server code
  },
  // PERFORMANCE: Optimize production builds
  productionBrowserSourceMaps: false, // Disable source maps in production
  reactStrictMode: true,
  // Disable problematic features for static export
  typescript: {
    ignoreBuildErrors: true,
  },
  // Headers removed - not compatible with static export
};

module.exports = nextConfig;
