/** @type {import('next').NextConfig} */

const nextConfig = {
  env: {
    // API_URL: 'https://high-u-hairwig.vercel.app'
    API_URL: 'http://localhost:3000'
  },
  reactStrictMode: true,
  swcMinify: true,
  images: {
    minimumCacheTTL: 60,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "firebasestorage.googleapis.com",
      },
    ],
  },
};

module.exports = nextConfig;
