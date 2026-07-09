/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone', // Wichtig für Docker!
  reactStrictMode: true,
  experimental: {
    turbo: {
      rules: {
        '*.svg': ['@svgr/webpack'],
      },
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.supabase.co',
      },
      {
        protocol: 'https',
        hostname: '**.r2.cloudflarestorage.com',
      },
    ],
  },
};
module.exports = nextConfig;
