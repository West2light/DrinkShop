import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
  experimental: {
    serverComponentsExternalPackages: ['lightningcss']
  },
  webpack: (config) => {
    config.externals.push({
      'lightningcss': 'lightningcss'
    })
    return config
  }
};

export default nextConfig;
