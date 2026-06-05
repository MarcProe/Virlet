/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Use Webpack instead of Turbopack for better CSS support
  experimental: {
    appOnly: false,
  },
}

module.exports = nextConfig
