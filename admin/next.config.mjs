/** @type {import('next').NextConfig} */
const nextConfig = {
  productionBrowserSourceMaps: false,
  images: {
    domains: ["res.cloudinary.com"], // Add Cloudinary as a valid image source
  },
};

export default nextConfig;
