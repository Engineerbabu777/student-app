/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['encrypted-tbn0.gstatic.com','pbs.twimg.com',"m.media-amazon.com","res.cloudinary.com",'lh3.googleusercontent.com','images.unsplash.com','www.themoviedb.org','static.toiimg.com'],
  },

  
}

module.exports = nextConfig
