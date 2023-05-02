/** @type {import('next').NextConfig} */
const { i18n } = require("./next-i18next.config");

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['localhost'],
  },
  i18n,
  async rewrites() {
    return [
      {
        source: '/login',
        destination: '/auth/login',
      },
      {
        source: '/register',
        destination: '/auth/register',
      },
      {
        source: '/forgot',
        destination: '/auth/forgot',
      },
    ]
  },
  // async redirects() {
  //   return [
  //     {
  //       source: '/auth/login',
  //       destination: '/login',
  //       permanent: false,
  //     },
  //   ]
  // },
}

module.exports = nextConfig
