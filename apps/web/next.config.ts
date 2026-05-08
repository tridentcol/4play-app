import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  transpilePackages: ['@4play/ui', '@4play/core', '@4play/db'],
};

export default nextConfig;
