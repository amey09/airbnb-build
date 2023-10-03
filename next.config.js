/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
    serverActionsBodySizeLimit: "2mb",
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "a0.muscache.com",
      },
      {
        protocol: "https",
        hostname: "a1.muscache.com",
      },
    ],
  },
  env: {
    mapbox_key: "I5mSIlQy0fC4xXT45cP2",
  },
};

module.exports = nextConfig;
