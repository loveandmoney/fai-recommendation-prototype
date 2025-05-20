import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  devIndicators: false,
  images: {
    remotePatterns: [new URL('https://cdn.sanity.io/**')],
  },
};

export default nextConfig;
