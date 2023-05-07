/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: false,
    serverComponentsExternalPackages: ["@tremor/react"],
  },
  reactStrictMode: true,
  swcMinify: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "firebasestorage.googleapis.com",
        // port: '',
        // pathname: '/account123/**',
      },
    ],
  },
};

module.exports = nextConfig;
