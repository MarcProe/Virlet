/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "via.placeholder.com",
      },
      {
        protocol: "https",
        hostname: "*.githubusercontent.com",
      },
    ],
  },
  experimental: {
    // Disable Turbopack for now to avoid compatibility issues
    turbopack: false,
  },
};

export default nextConfig;
