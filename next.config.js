/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "reqres.in",
        port: "",
        pathname: "/img/faces/**",
      },
      {
        protocol: "https",
        hostname: "i.dummyjson.com",
        port: "",
        pathname: "/data/products/**",
      },
    ],
  },
};

module.exports = nextConfig;