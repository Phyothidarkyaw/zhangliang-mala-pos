import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "minio.teapos.shop",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "upload.wikimedia.org",
        pathname: "/**",
      },
      {
        protocol: 'https',
        hostname: 'www.zhangliangsd.com',
        port: '',        // usually empty
        pathname: '/**', // allow all paths
      },
    ],
  },
};

export default nextConfig;
