/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["m.media-amazon.com","res.cloudinary.com",'lh3.googleusercontent.com','images.unsplash.com','www.themoviedb.org','static.toiimg.com'],
  },
  // typescript: {
  //   // !! WARN !!
  //   // Dangerously allow production builds to successfully complete even if
  //   // your project has type errors.
  //   // !! WARN !!
  //   ignoreBuildErrors: true,
  // },
}

module.exports = nextConfig
