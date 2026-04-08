/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "d15tiq24o07zuq.cloudfront.net",
      },
    ],
  },
};

export default nextConfig;
