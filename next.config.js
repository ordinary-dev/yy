/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    images: {
        domains: ['localhost', '127.0.0.1', 'router'],
    },
    i18n: {
        locales: ['en', 'ru'],
        defaultLocale: 'ru',
    },
}

module.exports = nextConfig
