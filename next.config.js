/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configuração flexível para múltiplas plataformas
  output: process.env.BUILD_STANDALONE === 'true' ? 'standalone' : 
         process.env.BUILD_EXPORT === 'true' ? 'export' : undefined,
  
  // Otimizações de performance
  swcMinify: true,
  compress: true,
  poweredByHeader: false,
  
  // Configurações de imagem otimizadas
  images: {
    unoptimized: process.env.BUILD_EXPORT === 'true',
    domains: ['localhost', 'mittosdocabula.netlify.app', 'mittosdocabula.vercel.app'],
    formats: ['image/webp', 'image/avif'],
    minimumCacheTTL: 60,
  },
  
  // Headers de segurança
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
        ],
      },
    ]
  },
  
  // Redirects e rewrites
  async redirects() {
    return [
      {
        source: '/home',
        destination: '/',
        permanent: true,
      },
    ]
  },
  
  // Experimental features para performance
  experimental: {
    scrollRestoration: true,
  },
  
  // Configurações de ambiente
  env: {
    SITE_URL: process.env.VERCEL_URL 
      ? `https://${process.env.VERCEL_URL}`
      : process.env.NETLIFY_URL
      ? process.env.NETLIFY_URL
      : process.env.NODE_ENV === 'production' 
      ? 'https://mittosdocabula.netlify.app' 
      : 'http://localhost:3000',
    API_URL: process.env.NODE_ENV === 'production'
      ? 'https://api.mittosdocabula.com'
      : 'http://localhost:5000'
  },
  
  // Webpack optimizations
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // Otimizações adicionais
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': './src',
    };
    
    // Bundle analyzer em desenvolvimento
    if (process.env.ANALYZE === 'true') {
      const withBundleAnalyzer = require('@next/bundle-analyzer')({
        enabled: true,
      });
      return withBundleAnalyzer(config);
    }
    
    return config;
  },
  
  // Trailing slash baseado na plataforma
  trailingSlash: process.env.BUILD_EXPORT === 'true',
  
  // Asset prefix para CDN (se necessário)
  assetPrefix: process.env.CDN_URL || '',
}

module.exports = nextConfig