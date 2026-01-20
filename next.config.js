const isGitHubPages = process.env.GITHUB_PAGES === 'true';
// const basePath = isGitHubPages ? '/osteoalsen-selfmade' : '';
const basePath = '';

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static export for GitHub Pages
  output: 'export',
  trailingSlash: true,
  basePath,
  assetPrefix: basePath,
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },

  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    // Required for static export - images won't be optimized at runtime
    unoptimized: true,
    dangerouslyAllowSVG: true,
  },
  compress: true,
  poweredByHeader: false,
  generateEtags: true,
  experimental: {
    optimizePackageImports: ['lucide-react', 'react', 'react-dom'],
    webpackBuildWorker: true,
  },
  productionBrowserSourceMaps: false,
  reactStrictMode: true,
  typescript: {
    ignoreBuildErrors: true,
  },
};

module.exports = nextConfig;
