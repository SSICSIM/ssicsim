/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // S3 sends no Cache-Control, so without this Vercel re-optimizes every
    // image after 60s. Cache for 31 days; give a replaced image a new filename.
    minimumCacheTTL: 2678400,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "d15tiq24o07zuq.cloudfront.net",
      },
    ],
  },
};

export default nextConfig;
