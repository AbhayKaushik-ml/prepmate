/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: [
      'ap-south-1.graphassets.com',
      'img.clerk.com',
      'images.clerk.dev'
    ],
  },
};

export default nextConfig;
  