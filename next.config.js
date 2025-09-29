/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
    domains: ['localhost', 'mittosdocabula.netlify.app'],
  },
  assetPrefix: process.env.NODE_ENV === 'production' ? '' : '',
  env: {
    SITE_URL: process.env.NODE_ENV === 'production' 
      ? 'https://mittosdocabula.netlify.app' 
      : 'http://localhost:3000'
  }
}

module.exports = nextConfig