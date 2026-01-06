/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["d1rwhvwstyk9gu.cloudfront.net"], // allow this external host
  },
};

module.exports = nextConfig;
