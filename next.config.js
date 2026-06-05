/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ['lowdb'],
  },
};

module.exports = nextConfig;
