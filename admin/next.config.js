/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    API_URL: 'https://high-u-admin.vercel.app'
    // API_URL: 'http://localhost:8000'
  },
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
