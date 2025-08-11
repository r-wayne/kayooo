/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['res.cloudinary.com', 'images.pexels.com']
  },
  env: {
    CUSTOM_KEY: 'my-value',
  },
}

module.exports = nextConfig